import { useAuthStore } from '../useAuthStore';
import type { AuthUser } from '@/types/auth';

jest.mock('@/services/authService', () => ({
  authService: {
    signIn: jest.fn(async (email: string, _password: string) => ({
      id: `user-${email.toLowerCase()}`,
      fullName: 'Test User',
      email,
      avatarUrl: 'https://avatar.example.com',
    })),
    signUp: jest.fn(async (fullName: string, email: string, _password: string) => ({
      id: `user-${email.toLowerCase()}`,
      fullName,
      email,
      avatarUrl: 'https://avatar.example.com',
    })),
    forgotPassword: jest.fn(async (email: string) => ({ email })),
    signOut: jest.fn(async () => {}),
  },
}));

const mockUser: AuthUser = {
  id: 'user-test@example.com',
  fullName: 'Test User',
  email: 'test@example.com',
  avatarUrl: 'https://avatar.example.com',
};

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      status: 'anonymous',
      user: null,
      isHydrated: false,
    });
  });

  it('has expected default state', () => {
    const state = useAuthStore.getState();
    expect(state.status).toBe('anonymous');
    expect(state.user).toBeNull();
    expect(state.isHydrated).toBe(false);
  });

  describe('signIn', () => {
    it('sets status to authenticated and stores user', async () => {
      const user = await useAuthStore.getState().signIn('test@example.com', 'password');
      const state = useAuthStore.getState();

      expect(state.status).toBe('authenticated');
      expect(state.user).toEqual(user);
      expect(state.user?.email).toBe('test@example.com');
    });

    it('returns the authenticated user', async () => {
      const user = await useAuthStore.getState().signIn('test@example.com', 'password');
      expect(user.id).toBe('user-test@example.com');
    });
  });

  describe('prepareRegistration', () => {
    it('returns user from signUp without changing auth state', async () => {
      const user = await useAuthStore.getState().prepareRegistration('Jane', 'jane@example.com', 'pass');
      expect(user.email).toBe('jane@example.com');
      expect(useAuthStore.getState().status).toBe('anonymous');
      expect(useAuthStore.getState().user).toBeNull();
    });
  });

  describe('completeRegistration', () => {
    it('sets status to authenticated with the provided user', () => {
      useAuthStore.getState().completeRegistration(mockUser);
      const state = useAuthStore.getState();

      expect(state.status).toBe('authenticated');
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('requestPasswordReset', () => {
    it('returns the email', async () => {
      const result = await useAuthStore.getState().requestPasswordReset('test@example.com');
      expect(result).toEqual({ email: 'test@example.com' });
    });
  });

  describe('continueAsGuest', () => {
    it('sets status to guest with no user', () => {
      useAuthStore.getState().continueAsGuest();
      const state = useAuthStore.getState();

      expect(state.status).toBe('guest');
      expect(state.user).toBeNull();
    });
  });

  describe('signOut', () => {
    it('resets to anonymous with no user', async () => {
      useAuthStore.setState({ status: 'authenticated', user: mockUser });

      await useAuthStore.getState().signOut();
      const state = useAuthStore.getState();

      expect(state.status).toBe('anonymous');
      expect(state.user).toBeNull();
    });
  });

  describe('markHydrated', () => {
    it('sets isHydrated to true', () => {
      useAuthStore.getState().markHydrated();
      expect(useAuthStore.getState().isHydrated).toBe(true);
    });
  });
});
