import { create } from "zustand";

import { persist } from "zustand/middleware";

import type { User } from "@/types/api";

export type AuthState = {
  accessToken: string | null;

  refreshToken: string | null;

  user: User | null;

  setAuth: (
    accessToken: string,

    refreshToken: string,

    user: User,
  ) => void;

  updateToken: (
    accessToken: string,

    refreshToken?: string,
  ) => void;

  clearAuth: () => void;

  isAuthenticated: boolean;

  role: User["role"] | null;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,

      refreshToken: null,

      user: null,

      setAuth: (
        accessToken,

        refreshToken,

        user,
      ) => {
        set({
          accessToken,

          refreshToken,

          user,
        });
      },

      updateToken: (
        accessToken,

        refreshToken,
      ) => {
        set((state) => ({
          accessToken,

          refreshToken: refreshToken ?? state.refreshToken,
        }));
      },

      clearAuth: () => {
        set({
          accessToken: null,

          refreshToken: null,

          user: null,
        });
      },

      get isAuthenticated() {
        return !!get().accessToken && !!get().user;
      },

      get role() {
        return get().user?.role ?? null;
      },
    }),

    {
      name: "pos-auth",
    },
  ),
);
