import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { TAddress } from "@/models/address";
import { useQuery } from "@tanstack/react-query";
export const useGetUserAddress = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_ADDRESSES],
    queryFn: async () => {
      const response = await API.get(`/api/users/address`);
      return response.data as TAddress[];
    },
  });
};
