import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { methodType } from "@/models/common";
import { ProductDto } from "@/models/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationProduct = () => {
  const queryClient = useQueryClient();
  const apiMethods = {
    create: (data: ProductDto) => API.post("/api/products", data),
    update: (data: ProductDto) => {
      const { id, ...productUpdate } = data;
      return API.put(`/api/products/${id}`, productUpdate);
    },
    delete: (data: ProductDto) => API.delete(`/api/products/${data._id}`),
  };

  const mutationFn = async ({
    type,
    data,
  }: {
    type: methodType;
    data: ProductDto;
  }) => {
    const method = apiMethods[type];
    if (!method) {
      throw new Error(`Invalid type: ${type}`);
    }
    return method(data as ProductDto);
  };

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_PRODUCT],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] }); // Call the existing client
    },
  });
};
