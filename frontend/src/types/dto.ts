export type LoginDTO = {
  username: string;
  password: string;
};

export type RegisterDTO = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role?: string;
};

export type MenuItemDTO = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  available?: boolean;
  stock?: number;
};

export type CategoryDTO = {
  name: string;
};

export type OrderCreateDTO = {
  tableId?: string;
  sessionId?: string;
  items: Array<{
    itemId: string;
    quantity: number;
    options?: Record<string, string>;
  }>;
  paymentMethod?: string;
};
