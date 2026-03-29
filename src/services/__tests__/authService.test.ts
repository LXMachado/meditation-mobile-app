import { authService } from '../authService';

jest.useFakeTimers();

describe('AuthService', () => {
  describe('signIn', () => {
    it('returns a user for valid credentials', async () => {
      const promise = authService.signIn('alex@example.com', 'password123');
      jest.advanceTimersByTime(900);
      const user = await promise;

      expect(user).toEqual({
        id: 'user-alex@example.com',
        fullName: 'Alex',
        email: 'alex@example.com',
        avatarUrl: expect.stringContaining('dicebear.com'),
      });
    });

    it('derives display name from email', async () => {
      const promise = authService.signIn('john.doe@example.com', 'pass');
      jest.advanceTimersByTime(900);
      const user = await promise;

      expect(user.fullName).toBe('John Doe');
    });

    it('throws for emails containing "fail"', async () => {
      const promise = authService.signIn('fail@example.com', 'pass');
      jest.advanceTimersByTime(900);

      await expect(promise).rejects.toThrow('We could not sign you in');
    });

    it('generates avatar URL from email seed', async () => {
      const promise = authService.signIn('test@example.com', 'pass');
      jest.advanceTimersByTime(900);
      const user = await promise;

      expect(user.avatarUrl).toContain('seed=test%40example.com');
    });
  });

  describe('signUp', () => {
    it('returns a user for new registration', async () => {
      const promise = authService.signUp('Jane Doe', 'jane@example.com', 'Password1');
      jest.advanceTimersByTime(1100);
      const user = await promise;

      expect(user).toEqual({
        id: 'user-jane@example.com',
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        avatarUrl: expect.stringContaining('dicebear.com'),
      });
    });

    it('throws for emails containing "taken"', async () => {
      const promise = authService.signUp('Taken', 'taken@example.com', 'Pass1234');
      jest.advanceTimersByTime(1100);

      await expect(promise).rejects.toThrow('That email is already in use');
    });
  });

  describe('forgotPassword', () => {
    it('returns the email', async () => {
      const promise = authService.forgotPassword('user@example.com');
      jest.advanceTimersByTime(900);
      const result = await promise;

      expect(result).toEqual({ email: 'user@example.com' });
    });
  });

  describe('signOut', () => {
    it('resolves without error', async () => {
      const promise = authService.signOut();
      jest.advanceTimersByTime(250);
      await expect(promise).resolves.toBeUndefined();
    });
  });
});
