import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { FeedbackType } from "@/lib/schemas/feedback";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useAddReview = (productSlug: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FeedbackType) => {
      const response = await API.post(`/api/reviews/${productSlug}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEWS] });
    },
  });
};
