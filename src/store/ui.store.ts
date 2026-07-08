import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { NotificationPayload } from '@/types/entities';

interface UiStore {
  theme: 'light' | 'dark' | 'auto';
  sidebarOpen: boolean;
  notifications: NotificationPayload[];
  pageLoading: boolean;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: NotificationPayload) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setPageLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiStore>()(
  devtools(
    persist(
      (set) => ({
        theme: 'auto',
        sidebarOpen: true,
        notifications: [],
        pageLoading: false,
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              {
                ...notification,
                id: notification.id || `notif-${Date.now()}`,
              },
              ...state.notifications,
            ],
          })),
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
        clearNotifications: () => set({ notifications: [] }),
        setPageLoading: (loading) => set({ pageLoading: loading }),
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    { name: 'UiStore' }
  )
);
