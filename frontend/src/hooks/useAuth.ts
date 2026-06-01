import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return { token, user, setAuth, clearAuth, isAuthenticated: !!token };
}
