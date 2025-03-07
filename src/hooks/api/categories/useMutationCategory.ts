import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { Category } from "@/models/category";
import { methodType } from "@/models/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationCategory = () => {
  const queryClient = useQueryClient();
  const apiMethods = {
    create: (data: Category) => API.post("/api/categories", data),
    update: (data: Category) => {
      const { id, ...rest } = data;
      return API.put(`/api/categories/${id}`, rest);
    },
    delete: (data: Category) => API.delete(`/api/categories/${data._id}`),
  };

  const mutationFn = async ({
    type,
    data,
  }: {
    type: methodType;
    data: { [key: string]: string | number };
  }) => {
    const method = apiMethods[type];
    if (!method) {
      throw new Error(`Invalid type: ${type}`);
    }
    return method(data as Category);
  };

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_CATEGORY],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] }); // Call the existing client
    },
  });
};
