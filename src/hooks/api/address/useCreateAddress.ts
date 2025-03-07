import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const response = await API.post(`/api/users/address`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_ADDRESSES],
      });
    },
  });
};
