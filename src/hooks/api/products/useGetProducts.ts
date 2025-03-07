import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetProducts = (isAdmin: boolean = false) => {
  const url = isAdmin ? "/api/products/all" : "/api/products";
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: async () => {
      const response = await API.get(url);
      return response.data;
    },
  });
};
