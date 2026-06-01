import { useMemo, useState } from "react";
import type { OrderResponse } from "@/types/api";

const initialOrders: OrderResponse[] = [
  {
    id: "ORD-2001",
    tableId: "T03",
    sessionId: "S-2026-05-24-11",
    items: [],
    subtotal: 68,
    tax: 4,
    serviceCharge: 3,
    discount: 0,
    total: 75,
    status: "PENDING",
    paymentMethod: "CASH",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ORD-2002",
    tableId: "T05",
    sessionId: "S-2026-05-24-12",
    items: [],
    subtotal: 115,
    tax: 7,
    serviceCharge: 4,
    discount: 5,
    total: 121,
    status: "PAID",
    paymentMethod: "MOMO",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ORD-2003",
    tableId: "T02",
    sessionId: "S-2026-05-24-13",
    items: [],
    subtotal: 42,
    tax: 3,
    serviceCharge: 2,
    discount: 0,
    total: 47,
    status: "READY",
    paymentMethod: "VNPAY",
    createdAt: new Date().toISOString(),
  },
];

export function useOrders() {
  const [orders, setOrders] = useState<OrderResponse[]>(initialOrders);
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "PAID" | "CLOSED">("ALL");

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) =>
        filter === "ALL"
          ? true
          : filter === "OPEN"
          ? order.status === "PENDING" || order.status === "PREPARING" || order.status === "READY"
          : filter === "PAID"
          ? order.status === "SERVED"
          : order.status === "CLOSED"
      ),
    [orders, filter]
  );

  const updateStatus = (orderId: string, status: OrderResponse["status"]) =>
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));

  return { orders: filteredOrders, filter, setFilter, updateStatus, rawOrders: orders };
}
