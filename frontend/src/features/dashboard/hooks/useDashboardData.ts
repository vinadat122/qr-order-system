import { useMemo } from "react";
import type { OrderResponse } from "@/types/api";

const revenueSeries = [
  { month: "Jan", value: 7200 },
  { month: "Feb", value: 8600 },
  { month: "Mar", value: 9300 },
  { month: "Apr", value: 7800 },
  { month: "May", value: 10200 },
  { month: "Jun", value: 11800 },
];

const payments = [
  { label: "PayPal", value: 42 },
  { label: "VNPAY", value: 30 },
  { label: "Momo", value: 28 },
];

const recentOrders: OrderResponse[] = [
  {
    id: "ORD-1001",
    tableId: "T03",
    sessionId: "S-2026-05-24-01",
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
    id: "ORD-1002",
    tableId: "T07",
    sessionId: "S-2026-05-24-02",
    items: [],
    subtotal: 120,
    tax: 7,
    serviceCharge: 4,
    discount: 0,
    total: 131,
    status: "PREPARING",
    paymentMethod: "MOMO",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ORD-1003",
    tableId: "T01",
    sessionId: "S-2026-05-24-03",
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

export function useDashboardData() {
  return useMemo(
    () => ({
      metrics: {
        revenueToday: 19800,
        ordersToday: 46,
        activeTables: 12,
        topDish: "Spicy Miso Ramen",
      },
      revenueSeries,
      payments,
      recentOrders,
      kitchenSummary: [
        { label: "Pending", value: 8 },
        { label: "Preparing", value: 5 },
        { label: "Ready", value: 6 },
        { label: "Served", value: 11 },
      ],
    }),
    []
  );
}
