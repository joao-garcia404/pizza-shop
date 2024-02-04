import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { formatDistanceToNow } from "date-fns";

import {
  GetOrdersRes,
  OrderStatus as OrderStatusType,
  approveOrder,
  cancelOrder,
  deliverOrder,
  dispatchOrder,
} from "@/app/services/orders";

import { currencyFormatter } from "@/app/utils/currencyFormatter";

import { Button } from "@/view/components/ui/button";
import { Dialog, DialogTrigger } from "@/view/components/ui/dialog";
import { TableCell, TableRow } from "@/view/components/ui/table";

import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";

import { ArrowRight, Search, X } from "lucide-react";

interface OrderTableRowProps {
  order: {
    orderId: string;
    status: OrderStatusType;
    customerName: string;
    total: number;
    createdAt: string;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const queryClient = useQueryClient();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  function updteOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersRes>({
      queryKey: ["orders"],
    });

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData<GetOrdersRes>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status };
          }

          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: (_, { orderId }) =>
        updteOrderStatusOnCache(orderId, "canceled"),
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: (_, { orderId }) =>
        updteOrderStatusOnCache(orderId, "processing"),
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: (_, { orderId }) =>
        updteOrderStatusOnCache(orderId, "delivering"),
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: (_, { orderId }) =>
        updteOrderStatusOnCache(orderId, "delivered"),
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {currencyFormatter(order.total / 100)}
      </TableCell>

      <TableCell>
        {order.status === "pending" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancellingOrder
          }
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
