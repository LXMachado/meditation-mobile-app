import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '@/theme/theme';

type CategoryCardProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export function CategoryCard({ label, icon, onPress }: CategoryCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons color={theme.colors.primary} name={icon} size={22} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHigh,
    borderRadius: theme.radii.lg,
    gap: 14,
    justifyContent: 'center',
    padding: 18,
    width: 148,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(180, 181, 255, 0.12)',
    borderRadius: theme.radii.pill,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  label: {
    color: theme.colors.text,
    fontFamily: theme.typography.label,
    fontSize: 12,
    letterSpacing: 1.4,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
