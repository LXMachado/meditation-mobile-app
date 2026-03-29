import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { authService } from '@/services/authService';
import type { AuthStatus, AuthUser } from '@/types/auth';

type AuthState = {
  status: AuthStatus;
  user: AuthUser | null;
  isHydrated: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  prepareRegistration: (fullName: string, email: string, password: string) => Promise<AuthUser>;
  completeRegistration: (user: AuthUser) => void;
  requestPasswordReset: (email: string) => Promise<{ email: string }>;
  continueAsGuest: () => void;
  signOut: () => Promise<void>;
  markHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: 'anonymous',
      user: null,
      isHydrated: false,
      signIn: async (email, password) => {
        const user = await authService.signIn(email, password);
        set({ status: 'authenticated', user });
        return user;
      },
      prepareRegistration: async (fullName, email, password) => {
        return authService.signUp(fullName, email, password);
      },
      completeRegistration: (user) => set({ status: 'authenticated', user }),
      requestPasswordReset: async (email) => authService.forgotPassword(email),
      continueAsGuest: () => set({ status: 'guest', user: null }),
      signOut: async () => {
        await authService.signOut();
        set({ status: 'anonymous', user: null });
      },
      markHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'submerged-sanctuary-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        status: state.status,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
