import type { AuthUser } from '@/types/auth';

function sleep(ms = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildAvatar(email: string) {
  return `https://api.dicebear.com/9.x/glass/png?seed=${encodeURIComponent(email.toLowerCase())}`;
}

function titleCase(value: string) {
  return value
    .split(/[._-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

class AuthService {
  async signIn(email: string, password: string): Promise<AuthUser> {
    await sleep();

    if (email.toLowerCase().includes('fail')) {
      throw new Error('We could not sign you in. Check your details and try again.');
    }

    const fullName = titleCase(email.split('@')[0]) || 'Sanctuary Member';

    return {
      id: `user-${email.toLowerCase()}`,
      fullName,
      email,
      avatarUrl: buildAvatar(email),
    };
  }

  async signUp(fullName: string, email: string, password: string): Promise<AuthUser> {
    await sleep(1100);

    if (email.toLowerCase().includes('taken')) {
      throw new Error('That email is already in use. Try signing in instead.');
    }

    return {
      id: `user-${email.toLowerCase()}`,
      fullName,
      email,
      avatarUrl: buildAvatar(email),
    };
  }

  async forgotPassword(email: string): Promise<{ email: string }> {
    await sleep(900);
    return { email };
  }

  async signOut() {
    await sleep(250);
  }
}

export const authService = new AuthService();
