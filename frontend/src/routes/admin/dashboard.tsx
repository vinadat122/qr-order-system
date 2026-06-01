import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useState } from "react";

import axiosClient from "@/api/axiosClient";

import { getOrdersBySession } from "@/services/order.service";

import { getBill } from "@/services/payment.service";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      {
        title: "Dashboard — POS Admin",
      },
    ],
  }),

  component: DashboardPage,
});

function DashboardPage() {
  const [tables, setTables] = useState<any[]>([]);

  const [orders, setOrders] = useState<any[]>([]);

  const [bill, setBill] = useState<any>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async (): Promise<void> => {
    try {
      // TABLES

      const tableResponse = await axiosClient.get("/tables");

      setTables(tableResponse.data);

      // ORDERS

      const orderData = await getOrdersBySession(11);

      setOrders([...orderData].sort((a, b) => b.orderId - a.orderId));

      // PAYMENT

      const billData = await getBill(11);

      setBill(billData);
    } catch (error) {
      console.log(error);
    }
  };

  const activeTables = tables.filter((table) => table.status !== "EMPTY").length;

  const pendingOrders = orders.filter(
    (order) => order.status !== "DONE" && order.status !== "PAID",
  ).length;

  const revenueToday = bill?.totalAmount || 0;

  const avgOrder = orders.length > 0 ? (revenueToday / orders.length).toFixed(2) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-sm text-muted-foreground">Restaurant overview and quick actions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          {
            label: "Active Tables",
            value: activeTables,
          },

          {
            label: "Pending Orders",
            value: pendingOrders,
          },

          {
            label: "Revenue Today",
            value: `$${revenueToday}`,
          },

          {
            label: "Avg. Order",
            value: `$${avgOrder}`,
          },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-slate-800 border border-white/10 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>

            <p className="mt-3 text-3xl font-black text-brand">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* RECENT ORDERS */}

        <div className="rounded-2xl bg-slate-800 border border-white/10 p-6">
          <h2 className="font-bold mb-4">Recent Orders</h2>

          <ul className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <li key={order.orderId} className="rounded-2xl bg-slate-900 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">Order #{order.orderId}</p>
                  </div>

                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-black text-brand">
                    {order.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{order.items?.length} items</p>
              </li>
            ))}
          </ul>
        </div>

        {/* KITCHEN QUEUE */}

        <div className="rounded-2xl bg-slate-800 border border-white/10 p-6">
          <h2 className="font-bold mb-4">Kitchen Queue</h2>

          <ul className="space-y-3">
            {orders

              .filter((order) => order.status !== "DONE" && order.status !== "PAID")

              .map((order) => (
                <li key={order.orderId} className="rounded-2xl bg-slate-900 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">Order #{order.orderId}</p>

                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">{order.items?.length} items</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
