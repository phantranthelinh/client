import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { RevenueChart } from "@/models/chart";
import { useQuery } from "@tanstack/react-query";

export const useGetDataChart = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.REVENUE_CHART],
    queryFn: async () => {
      const response = await API.get("/api/revenue/chart");
      return response.data as RevenueChart[];
    },
  });
};

export const useGetDataChartMonthly = (month: number) => {
  const url = `/api/revenue/chart-monthly/${month ? "?month=" + month : ""}`;
  return useQuery({
    queryKey: [QUERY_KEYS.CHART_MONTHLY, month],
    queryFn: async () => {
      const response = await API.get(url);
      return response.data;
    },
  });
};
