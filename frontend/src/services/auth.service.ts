import { apiClient } from "@/api/axios";
import type { LoginPayload, LoginResponse, RegisterPayload } from "@/types/api";

export const authService = {
  login: async (payload: LoginPayload) => {
    const res = await apiClient.post(`/auth/login`, payload);
    return res.data.data as LoginResponse;
  },
  register: async (payload: RegisterPayload) => {
    const res = await apiClient.post(`/auth/register`, payload);
    return res.data.data as LoginResponse;
  },
  refresh: async () => {
    const res = await apiClient.post(`/auth/refresh`);
    return res.data.data as { accessToken: string; refreshToken?: string };
  },
};
