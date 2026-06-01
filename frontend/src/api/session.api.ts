import { apiClient, ApiResponse } from "@/api/axios";
import type { TableSessionResponse } from "@/types/api";

export const sessionApi = {
  create: async (tableId: string) => {
    const response = await apiClient.post<ApiResponse<TableSessionResponse>>(
      `/sessions`,
      { tableId }
    );
    return response.data.data;
  },
  getByToken: async (token: string) => {
    const response = await apiClient.get<ApiResponse<TableSessionResponse>>(
      `/sessions/${token}`
    );
    return response.data.data;
  },
};
