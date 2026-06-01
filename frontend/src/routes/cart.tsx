import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { useState } from "react";

import { Trash2, Plus, Minus } from "lucide-react";

import { useCart } from "@/store/cart.store";

import { createOrder } from "@/services/order.service";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      {
        title: "Your Cart — The Asian Way",
      },

      {
        name: "description",

        content: "Review your cart and orders.",
      },
    ],
  }),

  component: CartPage,
});

function CartPage() {
  const {
    items,

    updateQuantity,

    removeItem,

    totalPrice,

    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const sessionId = 11;

      if (!sessionId) {
        alert("Session not found");

        return;
      }

      const body = {
        sessionId: Number(sessionId),

        items: items.map((entry) => ({
          foodId: entry.item.id,

          quantity: entry.quantity,
        })),
      };

      console.log(body);

      await createOrder(body);

      clearCart();

      navigate({
        to: "/tracking",
      });
    } catch (error) {
      console.log(error);

      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-black uppercase mb-8">Your Cart</h1>

      <div className="bg-card border border-border p-6 rounded-2xl">
        <h2 className="font-black mb-4 uppercase">Current Selection</h2>

        {items.length === 0 ? (
          <div className="text-muted-foreground">
            Your cart is empty.
            <Link to="/menu" className="text-brand ml-1">
              Browse menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div
                key={it.item.id}
                className="flex items-center justify-between border-b border-border pb-4"
              >
                <div>
                  <div className="font-bold">{it.item.name}</div>

                  <div className="text-sm text-muted-foreground">${it.item.price} each</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        it.item.id,

                        it.quantity - 1,
                      )
                    }
                    className="p-2 rounded-lg bg-muted"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="font-bold">{it.quantity}</div>

                  <button
                    onClick={() =>
                      updateQuantity(
                        it.item.id,

                        it.quantity + 1,
                      )
                    }
                    className="p-2 rounded-lg bg-muted"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => removeItem(it.item.id)}
                    className="p-2 rounded-lg text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground uppercase font-black">Total</div>

              <div className="text-2xl font-black text-brand">${totalPrice}</div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-6 bg-brand text-zinc-950 py-4 rounded-xl font-black uppercase"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
