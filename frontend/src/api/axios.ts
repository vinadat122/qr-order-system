import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/store/auth.store";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const rawClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

const getAccessToken = () =>
  typeof window !== "undefined" ? window.localStorage.getItem("pos-auth-access") : null;

const getRefreshToken = () =>
  typeof window !== "undefined" ? window.localStorage.getItem("pos-auth-refresh") : null;

const clearAuth = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("pos-auth-access");
    window.localStorage.removeItem("pos-auth-refresh");
  }
  useAuthStore.getState().clearAuth();
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers?.["x-refresh-attempted"] &&
      originalRequest.url !== "/auth/refresh"
    ) {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearAuth();
        return Promise.reject(error);
      }

      try {
        const response = await rawClient.post(
          "/auth/refresh",
          { refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data?.data;
        if (data?.accessToken) {
          useAuthStore.getState().updateToken(data.accessToken, data.refreshToken);
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
            originalRequest.headers["x-refresh-attempted"] = "true";
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        clearAuth();
      }
    }
    return Promise.reject(error);
  }
);

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
