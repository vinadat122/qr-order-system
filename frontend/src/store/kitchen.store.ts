import { create } from "zustand";

export type KitchenTicket = {
  id: string;
  tableNumber?: string;
  itemName: string;
  quantity: number;
  note?: string;
  status: "PENDING" | "PREPARING" | "READY" | "SERVED";
  createdAt: string;
};

export type KitchenState = {
  tickets: KitchenTicket[];
  addTicket: (t: KitchenTicket) => void;
  updateStatus: (id: string, status: KitchenTicket["status"]) => void;
  removeTicket: (id: string) => void;
};

export const useKitchenStore = create<KitchenState>((set, get) => ({
  tickets: [],
  addTicket: (t) => set((s) => ({ tickets: [t, ...s.tickets] })),
  updateStatus: (id, status) =>
    set((s) => ({ tickets: s.tickets.map((t) => (t.id === id ? { ...t, status } : t)) })),
  removeTicket: (id) => set((s) => ({ tickets: s.tickets.filter((t) => t.id !== id) })),
}));
