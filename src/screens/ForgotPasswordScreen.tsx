import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthButton } from '@/components/AuthButton';
import { AuthInput } from '@/components/AuthInput';
import { AuthShell } from '@/components/AuthShell';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/schemas/authSchemas';
import { useAuthStore } from '@/store/useAuthStore';
import { theme } from '@/theme/theme';
import type { AuthStackParamList } from '@/navigation/types';

export function ForgotPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await requestPasswordReset(values.email);
      setSuccessMessage(`Reset link sent to ${response.email}`);
      navigation.navigate('AuthSuccess', {
        variant: 'reset-email-sent',
        email: response.email,
      });
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Unable to send reset email right now.',
      });
    }
  });

  return (
    <AuthShell
      onBack={() => navigation.goBack()}
      subtitle="Enter your email to receive a reset link."
      title="Find your way back"
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
              onChangeText={(text) => {
                setSuccessMessage(null);
                onChange(text);
              }}
              placeholder="name@sanctuary.com"
              value={value}
            />
          )}
        />

        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
        {errors.root?.message ? <Text style={styles.error}>{errors.root.message}</Text> : null}

        <AuthButton disabled={!isValid} label="Send Reset Link" loading={isSubmitting} onPress={onSubmit} />

        <Pressable onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Return to login</Text>
        </Pressable>
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  success: {
    color: theme.colors.secondary,
    fontFamily: theme.typography.body,
    fontSize: 13,
    lineHeight: 20,
  },
  error: {
    color: theme.colors.error,
    fontFamily: theme.typography.body,
    fontSize: 13,
  },
  link: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 13,
    textAlign: 'center',
  },
});
