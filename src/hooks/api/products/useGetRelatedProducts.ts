import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetRelatedProducts = (productSlug: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.RELATED_PRODUCTS],
    queryFn: async () => {
      const response = await API.get(`/api/products/related/${productSlug}`);
      return response.data;
    },
    enabled: !!productSlug,
  });
};
