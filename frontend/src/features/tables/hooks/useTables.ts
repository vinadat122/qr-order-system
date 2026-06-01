import { useMemo, useState } from "react";
import { TableStatus } from "@/enums/tableStatus";
import type { TableResponse, TableSessionResponse } from "@/types/api";

const initialTables: TableResponse[] = Array.from({ length: 12 }).map((_, index) => ({
  id: `T${index + 1}`,
  name: `Table ${index + 1}`,
  status: index % 3 === 0 ? TableStatus.EMPTY : index % 3 === 1 ? TableStatus.OCCUPIED : TableStatus.DIRTY,
  capacity: 4,
  currentSessionId: index % 3 === 1 ? `SESSION-${index + 20}` : undefined,
}));

const sessions: TableSessionResponse[] = initialTables
  .filter((table) => table.currentSessionId)
  .map((table) => ({
    id: table.currentSessionId!,
    tableId: table.id,
    token: `qr-${table.id.toLowerCase()}`,
    status: table.status,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  }));

export function useTables() {
  const [tables, setTables] = useState<TableResponse[]>(initialTables);
  const [selected, setSelected] = useState<TableResponse | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sessionsState] = useState<TableSessionResponse[]>(sessions);

  const openTable = (table: TableResponse) => {
    setSelected(table);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  const updateStatus = (tableId: string, status: TableStatus) => {
    setTables((prev) => prev.map((table) => (table.id === tableId ? { ...table, status } : table)));
  };

  const createSession = (tableId: string) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId
          ? { ...table, status: TableStatus.OCCUPIED, currentSessionId: `SESSION-${Date.now()}` }
          : table
      )
    );
  };

  const currentSession = useMemo(
    () => sessionsState.find((session) => session.tableId === selected?.id) ?? null,
    [sessionsState, selected]
  );

  return {
    tables,
    selected,
    isDrawerOpen,
    currentSession,
    openTable,
    closeDrawer,
    updateStatus,
    createSession,
  };
}
