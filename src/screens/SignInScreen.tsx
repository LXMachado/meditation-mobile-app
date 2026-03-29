import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthButton } from '@/components/AuthButton';
import { AuthInput } from '@/components/AuthInput';
import { AuthShell } from '@/components/AuthShell';
import { PasswordField } from '@/components/PasswordField';
import { signInSchema, type SignInFormValues } from '@/schemas/authSchemas';
import { useAuthStore } from '@/store/useAuthStore';
import { theme } from '@/theme/theme';
import type { AuthStackParamList } from '@/navigation/types';

export function SignInScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const signIn = useAuthStore((state) => state.signIn);
  const continueAsGuest = useAuthStore((state) => state.continueAsGuest);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<SignInFormValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    }
  });

  return (
    <AuthShell
      footerImage
      subtitle="Enter your sanctuary to continue your journey."
      title="Welcome back to peace"
    >
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthInput
              autoComplete="email"
              autoCorrect={false}
              error={errors.email?.message}
              keyboardType="email-address"
              label="Email address"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="name@sanctuary.com"
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <PasswordField
              autoComplete="password"
              error={errors.password?.message}
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="••••••••"
              value={value}
            />
          )}
        />

        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.inlineLink}>Forgot password?</Text>
        </Pressable>

        {errors.root?.message ? <Text style={styles.formError}>{errors.root.message}</Text> : null}

        <AuthButton disabled={!isValid} label="Sign In" loading={isSubmitting} onPress={onSubmit} />

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or connect with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <SocialPlaceholder label="Google" />
          <SocialPlaceholder label="Apple" />
        </View>

        <View style={styles.bottomLinks}>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.bottomText}>
              New to the sanctuary? <Text style={styles.bottomLink}>Create Account</Text>
            </Text>
          </Pressable>
          <Pressable onPress={continueAsGuest}>
            <Text style={styles.guestLink}>Continue as Guest</Text>
          </Pressable>
        </View>
      </View>
    </AuthShell>
  );
}

function SocialPlaceholder({ label }: { label: string }) {
  return (
    <Pressable style={styles.socialButton}>
      <Text style={styles.socialLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 18,
  },
  inlineLink: {
    alignSelf: 'flex-end',
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
    fontSize: 12,
  },
  formError: {
    color: theme.colors.error,
    fontFamily: theme.typography.body,
    fontSize: 13,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  divider: {
    backgroundColor: 'rgba(65, 69, 105, 0.35)',
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
  },
  socialButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(31, 35, 68, 0.65)',
    borderRadius: theme.radii.pill,
    flex: 1,
    minHeight: 54,
    justifyContent: 'center',
  },
  socialLabel: {
    color: theme.colors.text,
    fontFamily: theme.typography.label,
    fontSize: 13,
  },
  bottomLinks: {
    alignItems: 'center',
    gap: 14,
    marginTop: 8,
  },
  bottomText: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 14,
  },
  bottomLink: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
  },
  guestLink: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
});
