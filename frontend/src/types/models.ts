import type { UserRole } from "@/types/api";

export type UserModel = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  active?: boolean;
};

export type MenuItemModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  available?: boolean;
  stock?: number;
};

export type CategoryModel = {
  id: string;
  name: string;
  createdAt: string;
};

export type TableModel = {
  id: string;
  name: string;
  capacity: number;
  status: string;
  currentSessionId?: string;
};

export type TableSessionModel = {
  id: string;
  tableId: string;
  token: string;
  status: string;
  createdAt: string;
  expiresAt?: string;
};

export type OrderItemModel = {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
  status: string;
  options?: Record<string, string>;
};

export type ReviewModel = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};
