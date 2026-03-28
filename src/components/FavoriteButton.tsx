import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/theme/theme';

type FavoriteButtonProps = {
  active: boolean;
  onPress?: () => void;
};

export function FavoriteButton({ active, onPress }: FavoriteButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Ionicons
        color={active ? theme.colors.error : theme.colors.textMuted}
        name={active ? 'heart' : 'heart-outline'}
        size={18}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(31, 35, 68, 0.75)',
    borderRadius: theme.radii.pill,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
});
