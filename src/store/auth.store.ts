import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from '@/types/api';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        token: null,
        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
