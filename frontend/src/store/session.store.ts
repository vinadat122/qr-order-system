import { create } from "zustand";
import type { TableSessionResponse } from "@/types/api";

export type SessionState = {
  currentSession: TableSessionResponse | null;
  setSession: (session: TableSessionResponse) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  currentSession: null,
  setSession: (session) => set({ currentSession: session }),
  clearSession: () => set({ currentSession: null }),
}));
