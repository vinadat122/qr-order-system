import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useState } from "react";

import { getOrdersBySession } from "@/services/order.service";

export const Route = createFileRoute("/tracking")({
  component: TrackingPage,
});

function TrackingPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(
      fetchOrders,

      5000,
    );

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const sessionId = 11;

      console.log(sessionId);

      if (!sessionId) return;

      const data = await getOrdersBySession(Number(sessionId));

      console.log(data);

      setOrders([...data].sort((a, b) => b.orderId - a.orderId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-black mb-8">Order Tracking</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="border border-border p-6 rounded-2xl">
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-xl">Order #{order.orderId}</div>

                <div className="text-sm text-muted-foreground">Status: {order.status}</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {order.items?.map((item: any, index: number) => (
                <div key={index} className="flex justify-between border-b border-border pb-2">
                  <div>{item.foodName}</div>

                  <div>x{item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
