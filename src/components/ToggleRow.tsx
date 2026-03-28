import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme/theme';

type ToggleRowProps = {
  label: string;
  value: boolean;
  onToggle: () => void;
};

export function ToggleRow({ label, value, onToggle }: ToggleRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={onToggle} style={[styles.toggle, value && styles.toggleActive]}>
        <View style={[styles.knob, value && styles.knobActive]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 15,
  },
  toggle: {
    backgroundColor: 'rgba(65, 69, 105, 0.45)',
    borderRadius: theme.radii.pill,
    padding: 3,
    width: 54,
  },
  toggleActive: {
    backgroundColor: theme.colors.primaryContainer,
  },
  knob: {
    backgroundColor: 'rgba(227, 227, 255, 0.7)',
    borderRadius: theme.radii.pill,
    height: 22,
    width: 22,
  },
  knobActive: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.onPrimary,
  },
});
