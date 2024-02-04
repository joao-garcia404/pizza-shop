import { Search } from "lucide-react";

import { Button } from "@/view/components/ui/button";
import { Skeleton } from "@/view/components/ui/skeleton";
import { TableCell, TableRow } from "@/view/components/ui/table";

export function OrdersTableSkeleton() {
  return Array.from({ length: 10 }).map((_, idx) => {
    return (
      <TableRow key={idx}>
        <TableCell>
          <Button disabled variant="outline" size="xs">
            <Search className="h-3 w-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[172px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[148px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[110px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[64px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>

        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
      </TableRow>
    );
  });
}
