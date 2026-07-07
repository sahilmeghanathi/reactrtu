import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextValue = {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  validateToken: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_TOKEN_KEY = "authToken";

async function fakeVerifyToken(token: string | null) {
  // Placeholder for real token validation (call API). Simulate async verify.
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(Boolean(token)), 300);
  });
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const validateToken = useCallback(async () => {
    setLoading(true);
    const ok = await fakeVerifyToken(token);
    setLoading(false);
    return ok;
  }, [token]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await validateToken();
    })();
    return () => {
      mounted = false;
    };
  }, [validateToken]);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    } catch {}
    navigate("/dashboard");
  }, [navigate]);

  const logout = useCallback(() => {
    setToken(null);
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch {}
    navigate("/login");
  }, [navigate]);

  const value = useMemo(
    () => ({ isAuthenticated: false, loading, token, login, logout, validateToken }),
    [token, loading, login, logout, validateToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

export default AuthProvider;
