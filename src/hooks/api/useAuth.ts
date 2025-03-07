import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { User } from "@/models/user";
import {
  getFromLocal,
  removeFromLocal,
  storeInLocal,
} from "@/utils/local-storage.util";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useAuth = () => {
  const navigate = useNavigate();

  const isLogged = getFromLocal("token") ? true : false;

  const { isSuccess: isAuthenticated, data } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: async () => {
      const response = await API.get("/api/users/profile");
      return response.data;
    },
    retry: 5,
    enabled: isLogged,
  });

  const { mutateAsync: login } = useMutation({
    mutationFn: async (data: User) => {
      const response = await API.post("/api/users/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      storeInLocal("token", data.token);
      if (data.isAdmin) {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: register } = useMutation({
    mutationFn: async (data: User) => {
      const response = await API.post("/api/users/register", data);
      return response.data;
    },
    onSuccess: () => {
      navigate({
        to: "/",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const logout = () => {
    removeFromLocal("token");
    navigate({
      to: "/login",
    });
  };
  return {
    login,
    logout,
    isAuthenticated,
    isLogged,
    data,
    register,
  };
};
export type AuthContext = ReturnType<typeof useAuth>;
