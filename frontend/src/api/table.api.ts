import { apiClient, ApiResponse } from "@/api/axios";
import type { TableResponse } from "@/types/api";

export const tableApi = {
  list: async () => {
    const response = await apiClient.get<ApiResponse<TableResponse[]>>("/tables");
    return response.data.data;
  },
  updateStatus: async (tableId: string, status: string) => {
    const response = await apiClient.patch<ApiResponse<TableResponse>>(
      `/tables/${tableId}/status`,
      { status }
    );
    return response.data.data;
  },
  createSession: async (tableId: string) => {
    const response = await apiClient.post<ApiResponse<{ sessionId: string }>>(
      `/tables/${tableId}/session`,
      {}
    );
    return response.data.data;
  },
};
