import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePaidOrder = (orderId: string) => {
  const url = `/api/orders/${orderId}/paid`;

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await API.put(url);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS, orderId],
      });
    },
  });
};
