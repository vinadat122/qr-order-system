import axiosClient from "@/api/axiosClient";
import { MenuItemResponse } from "@/types/api";

export const getFoods = async (): Promise<MenuItemResponse[]> => {
  const response = await axiosClient.get("/foods");

  return response.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    categoryId: item.categoryId || "",
    price: item.price,
  }));
};
