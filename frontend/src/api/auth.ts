import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const loginAdmin = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data as { token: string; admin: AdminProfile };
};

export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data as AdminProfile;
};
