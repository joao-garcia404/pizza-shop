import { useQuery } from "@tanstack/react-query";

import { formatDistanceToNow } from "date-fns";

import { getOrderDetails } from "@/app/services/orders";
import { currencyFormatter } from "@/app/utils/currencyFormatter";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/view/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/view/components/ui/table";

interface OrderDetailsProps {
  open: boolean;
  orderId: string;
}

export function OrderDetails({ open, orderId }: OrderDetailsProps) {
  const { data: order } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  });

  if (!open || !order) return null;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {order.id}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    {order.status}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.phone ?? "Não informado"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.email}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end">
                {formatDistanceToNow(new Date(order.createdAt), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.orderItems.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {currencyFormatter(item.priceInCents / 100)}
                  </TableCell>
                  <TableCell className="text-right">
                    {currencyFormatter(
                      (item.priceInCents * item.quantity) / 100,
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido:</TableCell>
              <TableCell className="text-right font-medium">
                {currencyFormatter(order.totalInCents / 100)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
