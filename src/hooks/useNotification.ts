import { useCallback } from 'react';
import { useUiStore } from '@/store/ui.store';
import { NotificationPayload } from '@/types/entities';
import { toast } from 'sonner';

export function useNotification() {
  const addNotification = useUiStore((state) => state.addNotification);
  const removeNotification = useUiStore((state) => state.removeNotification);

  const notify = useCallback(
    (notification: Omit<NotificationPayload, 'id'>) => {
      const id = `notif-${Date.now()}`;
      addNotification({ ...notification, id });

      if (notification.duration !== 0) {
        setTimeout(() => {
          removeNotification(id);
        }, notification.duration || 3000);
      }

      return id;
    },
    [addNotification, removeNotification]
  );

  const success = useCallback(
    (message: string, duration?: number) => {
      toast.success(message, { duration });
      return notify({ type: 'success', message, duration });
    },
    [notify]
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      toast.error(message, { duration });
      return notify({ type: 'error', message, duration });
    },
    [notify]
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      toast.message(message, { duration });
      return notify({ type: 'info', message, duration });
    },
    [notify]
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      toast.warning ? toast.warning(message, { duration }) : toast.message(message, { duration });
      return notify({ type: 'warning', message, duration });
    },
    [notify]
  );

  return { notify, success, error, info, warning, remove: removeNotification };
}
