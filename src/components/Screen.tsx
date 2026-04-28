import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppStore } from '@/store/useAppStore';
import { theme } from '@/theme/theme';

type ScreenProps = PropsWithChildren<{
  scrollable?: boolean;
  padded?: boolean;
}>;

type GradientColors = readonly [string, string, ...string[]];

export function Screen({ children, scrollable = true, padded = true }: ScreenProps) {
  const themeMode = useAppStore((state) => state.themeMode);
  const colors: readonly [string, string, ...string[]] =
    themeMode === 'dark'
      ? [theme.colors.surface, '#11162C', theme.colors.surface]
      : ['#F3F4FF', '#E7EBFF', '#F9FAFF'];

  const content = (
    <View style={[styles.content, padded && styles.padded]}>
      {children}
    </View>
  );

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {scrollable ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  content: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});
