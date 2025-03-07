import { getFromLocal, storeInLocal } from "@/utils/local-storage.util";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getToken = () => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("access_token");
  if (token) {
    storeInLocal("token", token);
    return token;
  }
  return getFromLocal("token");
};

API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // window.location.href = "/login";
      // return;
    } else if (error.response.status === 500) {
      // handle server error
    } else {
      // handle other errors
    }
    return Promise.reject(error);
  }
);
export { API };

export type ApiResponse<T = unknown> = {
  message: string;
  data: T;
};

export type ApiError = {
  response: {
    data: {
      message: string;
    };
  };
};

export const getAPIUrl = () => import.meta.env.VITE_API_URL || "";
