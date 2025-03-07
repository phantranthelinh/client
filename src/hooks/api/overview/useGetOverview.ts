import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { Overview } from "@/models/overview";
import { useQuery } from "@tanstack/react-query";
export const useGetOverviews = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.OVERVIEW],
    queryFn: async () => {
      const response = await API.get(`/api/overviews`);
      return response.data as Overview;
    },
  });
};
