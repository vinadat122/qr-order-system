import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useMemo, useState } from "react";

import { getOrdersBySession, updateOrderStatus } from "@/services/order.service";

export const Route = createFileRoute("/admin/kitchen")({
  head: () => ({
    meta: [
      {
        title: "Kitchen — POS Admin",
      },
    ],
  }),

  component: KitchenDashboardPage,
});

function KitchenDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(
      fetchOrders,

      5000,
    );

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async (): Promise<void> => {
    try {
      // TEMP
      // sau này fetch all orders

      const data = await getOrdersBySession(11);

      setOrders([...data].sort((a, b) => b.orderId - a.orderId));
    } catch (error) {
      console.log(error);
    }
  };

  const activeQueue = useMemo(
    () => orders.filter((order) => order.status !== "DONE"),

    [orders],
  );

  const handlePreparing = async (orderId: number) => {
    try {
      await updateOrderStatus(
        orderId,

        "PREPARING",
      );

      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (orderId: number) => {
    try {
      await updateOrderStatus(
        orderId,

        "DONE",
      );

      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Kitchen Dashboard</h1>

        <p className="text-sm text-muted-foreground">Real-time kitchen queue and order status</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
          <h2 className="font-bold mb-4">Active Kitchen Queue</h2>

          <div className="space-y-4">
            {activeQueue.map((order) => (
              <div key={order.orderId} className="rounded-3xl bg-slate-950 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-black">Order #{order.orderId}</p>
                  </div>

                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-black uppercase text-amber-200">
                    {order.status}
                  </span>
                </div>

                <div className="mt-3 text-sm text-muted-foreground">
                  {order.items?.map((item: any, index: number) => (
                    <p key={index} className="leading-6">
                      {item.quantity}x {item.foodName}
                    </p>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  {" "}
                  {order.status === "PENDING" && (
                    <button
                      onClick={() => handlePreparing(order.orderId)}
                      className="rounded-2xl bg-yellow-500 px-4 py-2 text-xs font-black uppercase text-black"
                    >
                      {" "}
                      Preparing{" "}
                    </button>
                  )}{" "}
                  {order.status === "PREPARING" && (
                    <button
                      onClick={() => handleDone(order.orderId)}
                      className="rounded-2xl bg-green-500 px-4 py-2 text-xs font-black uppercase text-slate-950"
                    >
                      {" "}
                      Done{" "}
                    </button>
                  )}{" "}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
          <h2 className="font-bold mb-4">Kitchen Summary</h2>

          <div className="grid gap-4">
            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-sm text-muted-foreground">Orders in queue</p>

              <p className="mt-2 text-3xl font-black">{activeQueue.length}</p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-sm text-muted-foreground">Preparing</p>

              <p className="mt-2 text-3xl font-black">
                {orders.filter((order) => order.status === "PREPARING").length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-sm text-muted-foreground">Completed</p>

              <p className="mt-2 text-3xl font-black">
                {orders.filter((order) => order.status === "DONE").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
