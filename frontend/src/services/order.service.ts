import axiosClient from "@/api/axiosClient";

export const createOrder = async (body: any) => {
  const response = await axiosClient.post("/orders", body);

  return response.data;
};

export const getOrdersBySession = async (sessionId: number) => {
  const response = await axiosClient.get(`/orders/session/${sessionId}`);

  return response.data;
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const response = await axiosClient.put(`/orders/${orderId}/status?status=${status}`);
  return response.data;
};
