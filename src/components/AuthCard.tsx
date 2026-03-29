import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type AuthCardProps = PropsWithChildren;

export function AuthCard({ children }: AuthCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(31, 35, 68, 0.45)',
    borderRadius: 32,
    padding: 24,
  },
});
