import { create } from "zustand";
import type { TableResponse } from "@/types/api";
import { TableStatus } from "@/enums/tableStatus";

export type TableStore = {
  tables: TableResponse[];
  setTables: (tables: TableResponse[]) => void;
  updateTableStatus: (tableId: string, status: TableStatus) => void;
};

export const useTableStore = create<TableStore>((set) => ({
  tables: [],
  setTables: (tables) => set({ tables }),
  updateTableStatus: (tableId, status) =>
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, status } : table
      ),
    })),
}));
