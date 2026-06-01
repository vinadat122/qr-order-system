import { createFileRoute } from "@tanstack/react-router";

import { useEffect, useMemo, useState } from "react";

import axiosClient from "@/api/axiosClient";

export const Route = createFileRoute("/admin/tables")({
  head: () => ({
    meta: [
      {
        title: "Tables — POS Admin",
      },
    ],
  }),

  component: TablesPage,
});

function TablesPage() {
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async (): Promise<void> => {
    try {
      const response = await axiosClient.get("/tables");

      // sort theo table number

      setTables([...response.data].sort((a, b) => a.tableNumber - b.tableNumber));
    } catch (error) {
      console.log(error);
    }
  };

  const summary = useMemo(
    () => ({
      empty: tables.filter((table) => table.status === "EMPTY").length,

      occupied: tables.filter((table) => table.status === "OCCUPIED").length,

      reserved: tables.filter((table) => table.status === "RESERVED").length,
    }),

    [tables],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Table Management</h1>

        <p className="text-sm text-muted-foreground">
          Manage seating, reservations, and table status
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Empty",
            value: summary.empty,
            color: "bg-emerald-500/15 text-emerald-200",
          },

          {
            label: "Occupied",
            value: summary.occupied,
            color: "bg-amber-500/15 text-amber-200",
          },

          {
            label: "Reserved",
            value: summary.reserved,
            color: "bg-sky-500/15 text-sky-200",
          },
        ].map((item) => (
          <div key={item.label} className={`rounded-3xl border border-white/10 p-6 ${item.color}`}>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {item.label}
            </p>

            <p className="mt-4 text-4xl font-black">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => (
          <div key={table.id} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Table {table.tableNumber}</h2>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              QR: {table.qrToken?.slice(0, 8)}
              ...
            </p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span
                className={`

                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-black
                  uppercase

                  ${
                    table.status === "EMPTY"
                      ? "bg-emerald-500/15 text-emerald-200"
                      : table.status === "OCCUPIED"
                        ? "bg-amber-500/15 text-amber-200"
                        : "bg-sky-500/15 text-sky-200"
                  }
                `}
              >
                {table.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
