import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RevenueChart } from "@/models/chart";
const chartConfig = {
  revenue: {
    label: "Doanh thu thực tế",
    color: "#2563eb",
  },
  expectedRevenue: {
    label: "Doanh thu ước tính",
    color: "#60a5fa",
  },
} satisfies ChartConfig;
const chartMonthlyConfig = {
  revenue: {
    label: "Doanh thu thực tế",
    color: "#2563eb",
  },
} satisfies ChartConfig;
export function MyBarChart({ data }: { data: RevenueChart[] }) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => `Tháng ${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar
          dataKey="expectedRevenue"
          fill="var(--color-expectedRevenue)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
export function BarChartMonthly({ data }: { data: RevenueChart[] }) {
  return (
    <div className="overflow-auto">
      <ChartContainer config={chartMonthlyConfig} className="w-screen-2xl">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `Ngày ${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
