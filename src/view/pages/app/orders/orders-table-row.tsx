import { useState } from "react";

import { formatDistanceToNow } from "date-fns";

import { Button } from "@/view/components/ui/button";
import { Dialog, DialogTrigger } from "@/view/components/ui/dialog";
import { TableCell, TableRow } from "@/view/components/ui/table";

import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";

import { ArrowRight, Search, X } from "lucide-react";
import { currencyFormatter } from "@/app/utils/currencyFormatter";

interface OrderTableRowProps {
  order: {
    orderId: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
    createdAt: string;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
