import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme/theme';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export function SectionHeader({
  eyebrow,
  title,
  actionLabel,
  onPressAction,
}: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.titleWrap}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {actionLabel ? (
        <Pressable onPress={onPressAction}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  titleWrap: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    color: theme.colors.primaryDim,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.typography.title,
    fontSize: 24,
  },
  action: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
});
