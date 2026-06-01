import { TableStatus } from "@/enums/tableStatus";
import { OrderStatus } from "@/enums/orderStatus";
import { PaymentMethod } from "@/enums/paymentMethod";

export type UserRole = "ADMIN" | "STAFF" | "KITCHEN";

export type User = {
  id: string;
  username?: string;
  name: string;
  fullName: string;
  email: string;
  role: UserRole;
  active?: boolean;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  username: string;
  password: string;
  role?: UserRole;
  active?: boolean;
};

export type CreateUserPayload = {
  fullName: string;
  username: string;
  password: string;
  role: UserRole;
  active: boolean;
};

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
}

export interface MenuItemResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  available: boolean;

  category: CategoryResponse;
}

export type MenuItemOption = {
  id: string;
  label: string;
  required: boolean;
  choices: {
    id: string;
    label: string;
    price: number;
  }[];
};

export type OrderItemResponse = {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
  status: OrderStatus;
  options?: Record<string, string>;
};

export type OrderResponse = {
  id: string;
  tableId?: string;
  sessionId?: string;
  items: OrderItemResponse[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  createdAt: string;
};

export type PaymentResponse = {
  id: string;
  orderId: string;
  method: PaymentMethod;
  amount: number;
  status: string;
  reference?: string;
};

export type TableSessionResponse = {
  id: string;
  tableId: string;
  token: string;
  status: string;
  createdAt: string;
  expiresAt?: string;
};
