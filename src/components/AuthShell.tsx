import React, { PropsWithChildren } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { AuthCard } from '@/components/AuthCard';
import { theme } from '@/theme/theme';

type AuthShellProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  onBack?: () => void;
  showClose?: boolean;
  footerImage?: boolean;
};

export function AuthShell({
  title,
  subtitle,
  onBack,
  children,
  showClose = false,
  footerImage = false,
}: AuthShellProps) {
  return (
    <LinearGradient colors={[theme.colors.surface, '#11162C', theme.colors.surface]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          {onBack ? (
            <Pressable onPress={onBack} style={styles.iconButton}>
              <Ionicons color={theme.colors.primary} name={showClose ? 'close' : 'arrow-back'} size={20} />
            </Pressable>
          ) : (
            <View style={styles.iconSpacer} />
          )}
          <Text style={styles.brand}>Submerged</Text>
          <View style={styles.iconSpacer} />
        </View>

        <View style={styles.hero}>
          <View style={styles.orbWrap}>
            <LinearGradient
              colors={[theme.colors.secondary, theme.colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.orb}
            >
              <Ionicons color={theme.colors.onPrimary} name="water-outline" size={28} />
            </LinearGradient>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <AuthCard>{children}</AuthCard>

        {footerImage ? (
          <ImageBackground
            imageStyle={styles.footerImageStyle}
            source={{
              uri: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
            }}
            style={styles.footerImage}
          >
            <View style={styles.footerOverlay} />
          </ImageBackground>
        ) : null}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  iconSpacer: {
    width: 40,
  },
  brand: {
    color: theme.colors.primary,
    fontFamily: theme.typography.title,
    fontSize: 26,
    letterSpacing: 2,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  orbWrap: {
    marginBottom: 22,
  },
  orb: {
    alignItems: 'center',
    borderRadius: theme.radii.pill,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.typography.display,
    fontSize: 38,
    lineHeight: 44,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 10,
    maxWidth: 320,
    textAlign: 'center',
  },
  footerImage: {
    borderRadius: 28,
    flex: 1,
    marginTop: 18,
    minHeight: 120,
    overflow: 'hidden',
  },
  footerImageStyle: {
    borderRadius: 28,
  },
  footerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11,13,30,0.45)',
  },
});
