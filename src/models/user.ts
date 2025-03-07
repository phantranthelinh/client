export type UseDTo = Pick<User, "email" | "password">;
export type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
};
export type UpsertProfile = {
  name: string;
  password: string;
};
