import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/theme/theme';

type PasswordFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function PasswordField({ label, error, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrap, error ? styles.inputError : null]}>
        <TextInput
          autoCapitalize="none"
          placeholderTextColor="rgba(165, 168, 209, 0.5)"
          secureTextEntry={!visible}
          style={styles.input}
          {...props}
        />
        <Pressable onPress={() => setVisible((current) => !current)} style={styles.toggle}>
          <Ionicons
            color={theme.colors.textMuted}
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
          />
        </Pressable>
      </View>
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
  inputWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(31, 35, 68, 0.7)',
    borderRadius: 18,
    flexDirection: 'row',
    minHeight: 58,
    paddingLeft: 18,
  },
  input: {
    color: theme.colors.text,
    flex: 1,
    fontFamily: theme.typography.body,
    fontSize: 16,
  },
  toggle: {
    alignItems: 'center',
    height: 58,
    justifyContent: 'center',
    width: 54,
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
