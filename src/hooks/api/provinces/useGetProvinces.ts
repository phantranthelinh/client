import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { Province } from "@/entities/provinces";
import { useQuery } from "@tanstack/react-query";

const useGetProvinces = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROVINCES],
    queryFn: async () => {
      const response = await API.get("/api/provinces");
      return response.data as Province[];
    },
  });
};

export default useGetProvinces;
