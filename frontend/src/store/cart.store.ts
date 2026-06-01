import { create } from "zustand";
import type { MenuItemResponse } from "@/types/api";

export type CartItem = {
  item: MenuItemResponse;
  quantity: number;
  options?: Record<string, string>;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  customer?: Record<string, any>;
  createdAt: string;
};

export type CartState = {
  items: CartItem[];
  orders: Order[];
  addItem: (item: MenuItemResponse, quantity?: number, options?: Record<string, string>) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customer?: Record<string, any>) => Order | null;
  getSubtotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  orders: [],
  addItem: (item, quantity = 1, options) => {
    set((state) => {
      const index = state.items.findIndex((entry) => entry.item.id === item.id);
      if (index >= 0) {
        const items = [...state.items];
        items[index] = {
          ...items[index],
          quantity: items[index].quantity + quantity,
          options: options ?? items[index].options,
        };
        return { items };
      }
      return { items: [...state.items, { item, quantity, options }] };
    });
  },
  removeItem: (itemId) => set((state) => ({ items: state.items.filter((entry) => entry.item.id !== itemId) })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items
        .map((entry) => (entry.item.id === itemId ? { ...entry, quantity } : entry))
        .filter((entry) => entry.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
  placeOrder: (customer) => {
    const state = get();
    if (state.items.length === 0) return null;
    const order: Order = {
      id: `order_${Date.now()}`,
      items: state.items,
      total: state.items.reduce((s, i) => s + i.item.price * i.quantity, 0),
      customer,
      createdAt: new Date().toISOString(),
    };
    set({ orders: [order, ...state.orders], items: [] });
    return order;
  },
  getSubtotal: () => get().items.reduce((sum, item) => sum + item.item.price * item.quantity, 0),
}));

// Convenience hook to match previous `useCart()` API used across the app
import { useMemo } from "react";

export const useCart = () => {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const cart = useMemo(() => items.map((it) => ({ id: it.item.id, name: it.item.name, desc: (it.item as any).description || it.item.name, price: it.item.price, quantity: it.quantity })), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.item.price * i.quantity, 0), [items]);
  const orders = useCartStore((s) => s.orders);
  const placeOrder = useCartStore((s) => s.placeOrder);

  return { items, cart, addItem, removeItem, updateQuantity, clearCart, totalPrice, orders, placeOrder };
};
