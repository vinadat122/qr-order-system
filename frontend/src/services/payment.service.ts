import axiosClient from "@/api/axiosClient";

export const getBill = async (sessionId: number) => {
  const response = await axiosClient.get(`/payments/${sessionId}`);

  return response.data;
};

export const payBill = async (sessionId: number) => {
  const response = await axiosClient.post(`/payments/${sessionId}`);

  return response.data;
};
