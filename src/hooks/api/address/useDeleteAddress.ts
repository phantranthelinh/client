import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await API.delete(`/api/users/address/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_ADDRESSES],
      });
    },
  });
};
