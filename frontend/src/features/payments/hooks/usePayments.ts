import { useMemo, useState } from "react";
import type { PaymentResponse } from "@/types/api";
import { PaymentMethod } from "@/enums/paymentMethod";

const initialPayments: PaymentResponse[] = [
  { id: "P-1001", orderId: "ORD-2001", method: PaymentMethod.CASH, amount: 75, status: "COMPLETED", payer: "Guest", reference: "" } as any,
  { id: "P-1002", orderId: "ORD-2002", method: PaymentMethod.MOMO, amount: 121, status: "REFUNDED", payer: "Nguyen Van B", reference: "MOMO12345" } as any,
  { id: "P-1003", orderId: "ORD-2003", method: PaymentMethod.VNPAY, amount: 47, status: "COMPLETED", payer: "Hoang Thi C", reference: "VNPAY67890" } as any,
];

export function usePayments() {
  const [payments, setPayments] = useState<PaymentResponse[]>(initialPayments);
  const [filter, setFilter] = useState<"ALL" | "CASH" | "MOMO" | "VNPAY">("ALL");
  const [selectedPayment, setSelectedPayment] = useState<PaymentResponse | null>(null);

  const filtered = useMemo(
    () =>
      payments.filter((payment) => (filter === "ALL" ? true : payment.method === filter)),
    [payments, filter]
  );

  const openDetail = (payment: PaymentResponse) => setSelectedPayment(payment);
  const closeDetail = () => setSelectedPayment(null);
  const refund = (id: string) =>
    setPayments((prev) => prev.map((payment) => (payment.id === id ? { ...payment, status: "REFUNDED" } : payment)));

  return { payments: filtered, filter, setFilter, selectedPayment, openDetail, closeDetail, refund };
}
