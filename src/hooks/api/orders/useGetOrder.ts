import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { Order } from "@/models/order";
import { useQuery } from "@tanstack/react-query";
export const useGetOrder = (orderId: string) => {
  const url = `/api/orders/${orderId}`;
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderId],
    queryFn: async () => {
      const response = await API.get(url);
      return response.data as Partial<Order>;
    },
    enabled: !!orderId,
  });
};

export const useGetPendingOrder = () => {
  const url = `/api/orders/pending`;
  return useQuery({
    queryKey: [QUERY_KEYS.PENDING_ORDERS],
    queryFn: async () => {
      const response = await API.get(url);
      return response.data ?? ([] as Order[]);
    },
  });
};
