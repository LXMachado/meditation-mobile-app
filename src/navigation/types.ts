import type { AuthSuccessPayload } from '@/types/auth';

export type RootStackParamList = {
  Auth: undefined;
  Tabs: undefined;
  Session: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  AuthSuccess: AuthSuccessPayload;
};

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Player: undefined;
  Profile: undefined;
};
