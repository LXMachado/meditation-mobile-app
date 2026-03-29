import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '@/theme/theme';

type AuthButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function AuthButton({ label, onPress, disabled = false, loading = false }: AuthButtonProps) {
  return (
    <Pressable disabled={disabled || loading} onPress={onPress} style={disabled ? styles.disabled : undefined}>
      <LinearGradient colors={[theme.colors.primary, theme.colors.primaryContainer]} style={styles.button}>
        {loading ? (
          <ActivityIndicator color={theme.colors.onPrimary} />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: theme.radii.pill,
    justifyContent: 'center',
    minHeight: 58,
  },
  label: {
    color: theme.colors.onPrimary,
    fontFamily: theme.typography.strong,
    fontSize: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  disabled: {
    opacity: 0.55,
  },
});
