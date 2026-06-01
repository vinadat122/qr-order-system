import { apiClient, ApiResponse } from "@/api/axios";
import type { OrderResponse } from "@/types/api";

export const orderApi = {
  list: async () => {
    const response = await apiClient.get<ApiResponse<OrderResponse[]>>("/orders");
    return response.data.data;
  },
  getById: async (orderId: string) => {
    const response = await apiClient.get<ApiResponse<OrderResponse>>(
      `/orders/${orderId}`
    );
    return response.data.data;
  },
  create: async (payload: FormData | Record<string, unknown>) => {
    const response = await apiClient.post<ApiResponse<OrderResponse>>(
      "/orders",
      payload
    );
    return response.data.data;
  },
  updateStatus: async (orderId: string, status: string) => {
    const response = await apiClient.patch<ApiResponse<OrderResponse>>(
      `/orders/${orderId}/status`,
      { status }
    );
    return response.data.data;
  },
};
