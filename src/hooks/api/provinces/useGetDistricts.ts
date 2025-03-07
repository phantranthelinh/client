import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { District } from "@/entities/provinces";
import { useQuery } from "@tanstack/react-query";

const useGetDistrict = (provinceId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.DISTRICTS, provinceId],
    queryFn: async () => {
      const response = await API.get(`/api/provinces/districts/${provinceId}`);
      return response.data as District[];
    },
    enabled: provinceId !== "",
  });
};

export default useGetDistrict;
