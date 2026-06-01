import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useState } from "react";

import { getOrdersBySession } from "@/services/order.service";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      {
        title: "Orders — POS Admin",
      },
    ],
  }),

  component: OrdersPage,
});

function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (): Promise<void> => {
    try {
      // TEMP HARD-CODE

      const data = await getOrdersBySession(11);

      // newest first

      setOrders([...data].sort((a, b) => b.orderId - a.orderId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>

        <p className="text-sm text-muted-foreground">View, track, and manage all orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-black">Order #{order.orderId}</p>

                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-black uppercase text-brand">
                  {order.status}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-950 p-4">
              <p className="text-sm text-muted-foreground">Items</p>

              <ul className="mt-3 space-y-2">
                {order.items?.map((item: any, index: number) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>
                      {item.foodName} × {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
