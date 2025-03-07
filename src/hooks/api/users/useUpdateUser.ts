import { API } from "@/app/api";
import { UpsertProfile } from "@/models/user";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (data: Partial<UpsertProfile>) => {
      const response = await API.put(`/api/users/profile`, data);
      return response.data;
    },
  });
};
