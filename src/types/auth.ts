export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type AuthStatus = 'anonymous' | 'authenticated' | 'guest';

export type AuthSuccessVariant = 'account-created' | 'reset-email-sent';

export type AuthSuccessPayload = {
  variant: AuthSuccessVariant;
  email?: string;
  user?: AuthUser;
};
