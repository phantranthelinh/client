import { API } from "@/app/api";
import { useQuery } from "@tanstack/react-query";
export const useGetProductById = (productId?: string) => {
  return useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await API.get(`/api/products/${productId}`);
      return response.data;
    },
  });
};
