import React, { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '@/theme/theme';

type GradientButtonProps = PropsWithChildren<{
  label: string;
  onPress?: () => void;
  compact?: boolean;
}>;

export function GradientButton({ label, onPress, compact = false }: GradientButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, compact && styles.compact]}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: theme.radii.pill,
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 24,
  },
  compact: {
    minHeight: 44,
    paddingHorizontal: 18,
  },
  label: {
    color: theme.colors.onPrimary,
    fontFamily: theme.typography.strong,
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
