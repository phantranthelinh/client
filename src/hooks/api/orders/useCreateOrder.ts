/* eslint-disable @typescript-eslint/no-explicit-any */
import { API } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrder = () => {
  const url = "/api/orders";
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await API.post(url, data);
      return response.data;
    },
  });
};

export const useUpdateOrder = (orderId: string) => {
  const url = `/api/orders/${orderId}`;
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await API.put(url, data);
      return response.data;
    },
  });
};
