import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthButton } from '@/components/AuthButton';
import { AuthInput } from '@/components/AuthInput';
import { AuthShell } from '@/components/AuthShell';
import { PasswordField } from '@/components/PasswordField';
import { signUpSchema, type SignUpFormValues } from '@/schemas/authSchemas';
import { useAuthStore } from '@/store/useAuthStore';
import { theme } from '@/theme/theme';
import type { AuthStackParamList } from '@/navigation/types';

export function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const prepareRegistration = useAuthStore((state) => state.prepareRegistration);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = handleSubmit(async (values) => {
    try {
      const user = await prepareRegistration(values.fullName, values.email, values.password);
      navigation.navigate('AuthSuccess', {
        variant: 'account-created',
        email: user.email,
        user,
      });
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Unable to create your account right now.',
      });
    }
  });

  return (
    <AuthShell
      onBack={() => navigation.goBack()}
      subtitle="Enter the sanctuary and discover a deeper state of calm through guided immersion."
      title="Begin your journey."
    >
      <View style={styles.form}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onBlur, onChange, value } }) => (
            <AuthInput
              autoCapitalize="words"
              error={errors.fullName?.message}
              label="Full name"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Alex Rivers"
              value={value}
            />
          )}
        />

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
              placeholder="alex@sanctuary.com"
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <PasswordField
              error={errors.password?.message}
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="At least 8 characters"
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onBlur, onChange, value } }) => (
            <PasswordField
              error={errors.confirmPassword?.message}
              label="Confirm password"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Repeat your password"
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="acceptTerms"
          render={({ field: { onChange, value } }) => (
            <Pressable onPress={() => onChange(!value)} style={styles.checkboxRow}>
              <View style={[styles.checkbox, value && styles.checkboxActive]}>
                {value ? <Ionicons color={theme.colors.onPrimary} name="checkmark" size={14} /> : null}
              </View>
              <Text style={styles.checkboxText}>I agree to the terms and privacy policy.</Text>
            </Pressable>
          )}
        />
        {errors.acceptTerms?.message ? <Text style={styles.formError}>{errors.acceptTerms.message}</Text> : null}
        {errors.root?.message ? <Text style={styles.formError}>{errors.root.message}</Text> : null}

        <AuthButton disabled={!isValid || !acceptTerms} label="Create Account" loading={isSubmitting} onPress={onSubmit} />

        <Pressable onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.bottomText}>
            Already have an account? <Text style={styles.bottomLink}>Sign In</Text>
          </Text>
        </Pressable>
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 18,
  },
  checkboxRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: 'rgba(31, 35, 68, 0.7)',
    borderRadius: 10,
    height: 22,
    justifyContent: 'center',
    width: 22,
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
  },
  checkboxText: {
    color: theme.colors.textMuted,
    flex: 1,
    fontFamily: theme.typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  formError: {
    color: theme.colors.error,
    fontFamily: theme.typography.body,
    fontSize: 13,
  },
  bottomText: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  bottomLink: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
  },
});
