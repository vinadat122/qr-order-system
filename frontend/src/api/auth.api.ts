import axios from "axios";
import { apiClient, ApiResponse } from "@/api/axios";
import type { LoginPayload, LoginResponse, RegisterPayload, UserRole } from "@/types/api";

const ACCOUNTS_KEY = "demo_admin_accounts";
const defaultAccount = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@pos.local",
  password: "password",
  role: "ADMIN" as UserRole,
};

type StoredAccount = typeof defaultAccount;

function getStoredAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [defaultAccount];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [defaultAccount];
    const parsed = JSON.parse(raw) as StoredAccount[];
    if (!Array.isArray(parsed)) return [defaultAccount];
    return parsed;
  } catch {
    return [defaultAccount];
  }
}

function saveStoredAccounts(accounts: StoredAccount[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function createOrEnsureDefaultAccount() {
  const accounts = getStoredAccounts();
  const exists = accounts.find((account) => account.email === defaultAccount.email);
  if (!exists) {
    accounts.push(defaultAccount);
    saveStoredAccounts(accounts);
  }
  return accounts;
}

function findLocalAccount(username: string, password: string) {
  const accounts = createOrEnsureDefaultAccount();
  return accounts.find(
    (account) => account.email.toLowerCase() === username.toLowerCase() && account.password === password
  );
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", payload);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const localAccount = findLocalAccount(payload.username, payload.password);
        if (localAccount) {
          return {
            token: "demo-token",
            user: {
              id: localAccount.id,
              name: localAccount.name,
              email: localAccount.email,
              role: localAccount.role,
            },
          };
        }
      }
      throw error;
    }
  },
  register: async (payload: RegisterPayload) => {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/register", payload);
      return response.data.data;
    } catch (error) {
      if (typeof window === "undefined") {
        throw error;
      }

      const accounts = createOrEnsureDefaultAccount();
      const existing = accounts.find((account) => account.email.toLowerCase() === payload.email.toLowerCase());
      if (existing) {
        throw new Error("Email đã tồn tại. Vui lòng dùng email khác.");
      }

      const newAccount: StoredAccount = {
        id: `admin-${Date.now()}`,
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role ?? "ADMIN",
      };
      accounts.push(newAccount);
      saveStoredAccounts(accounts);

      return {
        token: "demo-token",
        user: {
          id: newAccount.id,
          name: newAccount.name,
          email: newAccount.email,
          role: newAccount.role,
        },
      };
    }
  },
  refreshToken: async () => {
    const response = await apiClient.post<ApiResponse<{ token: string }>>("/auth/refresh");
    return response.data.data;
  },
};
