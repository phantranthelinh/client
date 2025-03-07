import { Loading } from "@/components/common/Loading";
import Layout from "@/components/dashboard/layout";
import {
  BarChartMonthly,
  MyBarChart,
} from "@/components/dashboard/revenue/Barchart";
import { Card } from "@/components/ui/card";
import {
  useGetDataChart,
  useGetDataChartMonthly,
} from "@/hooks/api/revenue/useGetDataChart";
import { RevenueChart } from "@/models/chart";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/dashboard/revenue/")({
  component: RevenuePage,
});

function RevenuePage() {
  const { data, isLoading } = useGetDataChart();

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { data: dataChartMonthly, isLoading: loadingMonthly } =
    useGetDataChartMonthly(month);

  return (
    <Layout>
      <h2 className="mb-4 text-3xl">Doanh thu</h2>
      <div className="gap-4 grid grid-cols-2">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h6 className="text-2xl">Doanh thu tháng {month}</h6>
            <div className="flex max-w-[200px]">
              <select
                onChange={(e) => setMonth(Number(e.target.value))}
                className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
              >
                <option selected>Chọn tháng</option>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Tháng {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loadingMonthly ? (
            <Loading />
          ) : (
            <BarChartMonthly data={dataChartMonthly.data as RevenueChart[]} />
          )}
        </Card>
        <Card className="p-4 w-full">
          <h6 className="text-2xl">Doanh thu trong năm</h6>
          {isLoading ? (
            <Loading />
          ) : (
            <MyBarChart data={data as RevenueChart[]} />
          )}
        </Card>
      </div>
    </Layout>
  );
}
