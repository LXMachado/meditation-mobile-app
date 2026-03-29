import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { theme } from '@/theme/theme';

type AuthInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function AuthInput({ label, error, style, ...props }: AuthInputProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        placeholderTextColor="rgba(165, 168, 209, 0.5)"
        style={[styles.input, error ? styles.inputError : null, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 2.2,
    paddingHorizontal: 2,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(31, 35, 68, 0.7)',
    borderRadius: 18,
    color: theme.colors.text,
    fontFamily: theme.typography.body,
    fontSize: 16,
    minHeight: 58,
    paddingHorizontal: 18,
  },
  inputError: {
    borderColor: 'rgba(253, 111, 133, 0.45)',
    borderWidth: 1,
  },
  error: {
    color: theme.colors.error,
    fontFamily: theme.typography.body,
    fontSize: 12,
    lineHeight: 18,
  },
});
