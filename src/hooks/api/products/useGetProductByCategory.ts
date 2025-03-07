import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetProductByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_BY_CATEGORY, categorySlug],
    queryFn: async () => {
      const response = await API.get(`/api/products/category/${categorySlug}`);
      return response.data;
    },
  });
};
