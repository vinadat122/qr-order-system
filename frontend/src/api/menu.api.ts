import { apiClient, ApiResponse } from "@/api/axios";
import type { MenuItemResponse } from "@/types/api";

export const menuApi = {
  list: async () => {
    const response = await apiClient.get<ApiResponse<MenuItemResponse[]>>("/menu");
    return response.data.data;
  },
  getById: async (itemId: string) => {
    const response = await apiClient.get<ApiResponse<MenuItemResponse>>(
      `/menu/${itemId}`
    );
    return response.data.data;
  },
};
