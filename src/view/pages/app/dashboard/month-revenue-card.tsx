import { useQuery } from "@tanstack/react-query";

import { DollarSign } from "lucide-react";

import { getMonthRevenue } from "@/app/services/dashboard";
import { currencyFormatter } from "@/app/utils/currencyFormatter";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/view/components/ui/card";

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ["metrics", "month-revenue"],
    queryFn: getMonthRevenue,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {currencyFormatter(monthRevenue.receipt / 100)}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenue.diffFromLastMonth}%
                  </span>{" "}
                  Em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    -{monthRevenue.diffFromLastMonth}%
                  </span>{" "}
                  Em relação ao mês passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
