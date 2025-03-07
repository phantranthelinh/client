import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetReviews = (productSlug: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REVIEWS],
    queryFn: async () => {
      const response = await API.get(`/api/reviews/${productSlug}`);
      return response.data;
    },
  });
};
