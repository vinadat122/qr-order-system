import { apiClient, ApiResponse } from "@/api/axios";
import type { PaymentResponse } from "@/types/api";

export const paymentApi = {
  charge: async (orderId: string, method: string) => {
    const response = await apiClient.post<ApiResponse<PaymentResponse>>(
      `/payments`,
      { orderId, method }
    );
    return response.data.data;
  },
  getReceipt: async (paymentId: string) => {
    const response = await apiClient.get<ApiResponse<PaymentResponse>>(
      `/payments/${paymentId}`
    );
    return response.data.data;
  },
};
