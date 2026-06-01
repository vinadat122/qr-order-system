import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useState } from "react";

import { getBill, payBill } from "@/services/payment.service";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({
    meta: [
      {
        title: "Payments — POS Admin",
      },
    ],
  }),

  component: PaymentsPage,
});

function PaymentsPage() {
  const [bill, setBill] = useState<any>(null);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBill();
  }, []);

  const fetchBill = async (): Promise<void> => {
    try {
      // TEMP HARD-CODE

      const data = await getBill(11);

      setBill(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      await payBill(11);

      setPaid(true);

      alert("Payment success");

      fetchBill();
    } catch (error) {
      console.log(error);

      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!bill) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Payment Management</h1>

        <p className="text-sm text-muted-foreground">View and manage payments and transactions</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-950">
            <tr>
              <th className="px-6 py-4 uppercase tracking-[0.2em] text-muted-foreground">
                Session
              </th>

              <th className="px-6 py-4 uppercase tracking-[0.2em] text-muted-foreground">
                Total Amount
              </th>

              <th className="px-6 py-4 uppercase tracking-[0.2em] text-muted-foreground">Status</th>

              <th className="px-6 py-4 uppercase tracking-[0.2em] text-muted-foreground">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-white/10 hover:bg-slate-950 transition-colors">
              <td className="px-6 py-4 font-semibold">#{bill.sessionId}</td>

              <td className="px-6 py-4 font-black text-brand">${bill.totalAmount}</td>

              <td className="px-6 py-4">
                <span className="rounded-full px-3 py-1 text-xs font-black bg-amber-500/10 text-amber-200">
                  {paid ? "PAID" : "UNPAID"}
                </span>
              </td>

              <td className="px-6 py-4">
                {!paid && (
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="rounded-2xl bg-green-500 hover:bg-green-400 px-4 py-2 text-xs font-black uppercase text-black"
                  >
                    {" "}
                    {loading ? "Processing..." : "Confirm Payment"}{" "}
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
