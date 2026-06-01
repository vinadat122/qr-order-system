import { apiClient } from "@/api/axios";
import type { MenuItemResponse } from "@/types/api";

export const menuService = {
  list: async (): Promise<MenuItemResponse[]> => {
    const res = await apiClient.get(`/menu`);
    return res.data.data as MenuItemResponse[];
  },
  getById: async (id: string): Promise<MenuItemResponse> => {
    const res = await apiClient.get(`/menu/${id}`);
    return res.data.data as MenuItemResponse;
  },
  create: async (payload: FormData | Record<string, any>) => {
    const res = await apiClient.post(`/menu`, payload);
    return res.data.data;
  },
  update: async (id: string, payload: Record<string, any>) => {
    const res = await apiClient.patch(`/menu/${id}`, payload);
    return res.data.data;
  },
  remove: async (id: string) => {
    const res = await apiClient.delete(`/menu/${id}`);
    return res.data.data;
  },
};
