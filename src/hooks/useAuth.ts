import { useAuthContext } from "@/providers/AuthProvider";

export function useAuth() {
  const { isAuthenticated, loading, token, login, logout, validateToken } = useAuthContext();
  return { isAuthenticated, loading, token, login, logout, validateToken };
}
