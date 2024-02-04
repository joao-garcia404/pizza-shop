import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { subDays } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";
import colors from "tailwindcss/colors";

import type { DateRange } from "react-day-picker";

import { getDailyRevenueInPeriod } from "@/app/services/dashboard";
import { currencyFormatter } from "@/app/utils/currencyFormatter";

import { Label } from "@/view/components/ui/label";
import { DateRangePicker } from "@/view/components/ui/date-range-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/view/components/ui/card";

export function RevenueChart() {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period", selectedDate],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: selectedDate?.from,
        to: selectedDate?.to,
      }),
  });

  const chartData = useMemo(() => {
    if (!dailyRevenueInPeriod) return [];

    return dailyRevenueInPeriod.map((item) => ({
      date: item.date,
      receipt: item.receipt / 100,
    }));
  }, [dailyRevenueInPeriod]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>

          <DateRangePicker date={selectedDate} onDateChange={setSelectedDate} />
        </div>
      </CardHeader>

      <CardContent>
        {chartData && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                width={80}
                stroke="#888"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => currencyFormatter(value)}
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                dataKey="receipt"
                stroke={colors.violet[500]}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
