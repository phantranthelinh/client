import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { Ward } from "@/entities/provinces";
import { useQuery } from "@tanstack/react-query";

const useGetWards = (districtId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WARDS, districtId],
    queryFn: async () => {
      const response = await API.get(`/api/provinces/wards/${districtId}`);
      return response.data as Ward[];
    },
    enabled: districtId != "",
  });
};

export default useGetWards;
