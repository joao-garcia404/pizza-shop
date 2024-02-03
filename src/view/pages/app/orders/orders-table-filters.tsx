import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/view/components/ui/select";

import { Search, X } from "lucide-react";

const ordersFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrdersFiltersSchema = z.infer<typeof ordersFiltersSchema>;

export function OrdersTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } = useForm<OrdersFiltersSchema>({
    resolver: zodResolver(ordersFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  });

  function handleFilter(filters: OrdersFiltersSchema) {
    setSearchParams((prevState) => {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          prevState.set(key, value);
        } else {
          prevState.delete(key);
        }
      })

      prevState.set("page", "1");

      return prevState;
    })
  }

  function handleClearFilters() {
    setSearchParams((prevState) => {
      prevState.delete("orderId");
      prevState.delete("customerName");
      prevState.delete("status");

      prevState.set("page", "1");

      return prevState;
    })

    reset({
      customerName: '',
      orderId: '',
      status: 'all'
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              value={value}
              onValueChange={onChange}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entrega</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button type="button" onClick={handleClearFilters} variant="outline" size="xs">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
