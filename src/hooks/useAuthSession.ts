import { useMemo } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

export function useAuthSession() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  return useMemo(
    () => ({
      status,
      user,
      isHydrated,
      isAuthenticated: status === 'authenticated',
      isGuest: status === 'guest',
      displayName: user?.fullName ?? 'Guest',
      avatarUrl:
        user?.avatarUrl ??
        'https://api.dicebear.com/9.x/glass/png?seed=guest-sanctuary',
    }),
    [isHydrated, status, user],
  );
}
