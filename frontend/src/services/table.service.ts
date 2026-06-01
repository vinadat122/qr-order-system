import { apiClient } from "@/api/axios";
import type { TableSessionResponse } from "@/types/api";

export const tableService = {
  list: async () => {
    const res = await apiClient.get(`/tables`);
    return res.data.data;
  },
  createSession: async (tableId: string) => {
    const res = await apiClient.post(`/sessions`, { tableId });
    return res.data.data as TableSessionResponse;
  },
  getSessionByToken: async (token: string) => {
    const res = await apiClient.get(`/sessions/${token}`);
    return res.data.data as TableSessionResponse;
  },
  updateTableStatus: async (tableId: string, status: string) => {
    const res = await apiClient.patch(`/tables/${tableId}/status`, { status });
    return res.data.data;
  },
};
