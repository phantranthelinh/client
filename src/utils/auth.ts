import { getFromLocal } from "./local-storage.util";

export const isAuthenticated = () => {
  const token = getFromLocal("token");
  if (!token) return false;
  return true;
};
