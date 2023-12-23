import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronsLeft className="2-4 h-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronLeft className="2-4 h-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronRight className="2-4 h-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronsRight className="2-4 h-4" />
            <span className="sr-only">última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
