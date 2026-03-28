import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { ToggleRow } from '@/components/ToggleRow';
import { TrackCard } from '@/components/TrackCard';
import { tracks } from '@/data/tracks';
import { useAppStore } from '@/store/useAppStore';
import { theme } from '@/theme/theme';

export function ProfileScreen() {
  const favorites = useAppStore((state) => state.favorites);
  const themeMode = useAppStore((state) => state.themeMode);
  const notificationsEnabled = useAppStore((state) => state.notificationsEnabled);
  const profile = useAppStore((state) => state.profile);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const setThemeMode = useAppStore((state) => state.setThemeMode);
  const setNotificationsEnabled = useAppStore((state) => state.setNotificationsEnabled);

  const favoriteTracks = tracks.filter((track) => favorites.includes(track.id));

  return (
    <Screen>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: profile.avatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.profileText}>
          <Text style={styles.eyebrow}>Deep breath, {profile.displayName}</Text>
          <Text style={styles.title}>Your Sanctuary</Text>
        </View>
      </View>

      <View style={styles.card}>
        <SectionHeader title="Preferences" />
        <View style={styles.cardContent}>
          <ToggleRow
            label="Dark mode"
            onToggle={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            value={themeMode === 'dark'}
          />
          <ToggleRow
            label="Pulse notifications"
            onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
            value={notificationsEnabled}
          />
        </View>
      </View>

      <View style={styles.card}>
        <SectionHeader title="Favorites" />
        <View style={styles.listWrap}>
          {favoriteTracks.map((track) => (
            <TrackCard
              key={track.id}
              favorite
              onToggleFavorite={() => toggleFavorite(track.id)}
              track={track}
              variant="list"
            />
          ))}
        </View>
      </View>

      <View style={styles.accountGrid}>
        <View style={styles.accountCard}>
          <Text style={styles.accountTitle}>Notifications</Text>
          <Text style={styles.accountText}>UI is wired now and ready for real scheduling later.</Text>
        </View>
        <View style={styles.accountCard}>
          <Text style={styles.accountTitle}>Future API</Text>
          <Text style={styles.accountText}>The data and playback layers are isolated for backend swap-in.</Text>
        </View>
      </View>

      <Pressable style={styles.logout}>
        <Text style={styles.logoutLabel}>Ascend & log out</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
    marginBottom: 20,
    marginTop: 8,
  },
  avatar: {
    borderRadius: 44,
    height: 88,
    width: 88,
  },
  profileText: {
    flex: 1,
    gap: 6,
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
    fontFamily: theme.typography.display,
    fontSize: 36,
  },
  card: {
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: 28,
    marginBottom: 16,
    padding: 20,
  },
  cardContent: {
    gap: 18,
    marginTop: 18,
  },
  listWrap: {
    gap: 12,
    marginTop: 18,
  },
  accountGrid: {
    gap: 14,
    marginTop: 4,
  },
  accountCard: {
    backgroundColor: theme.colors.surfaceHigh,
    borderRadius: 24,
    gap: 8,
    padding: 18,
  },
  accountTitle: {
    color: theme.colors.text,
    fontFamily: theme.typography.title,
    fontSize: 18,
  },
  accountText: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 14,
    lineHeight: 21,
  },
  logout: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.pill,
    marginTop: 20,
    paddingVertical: 16,
  },
  logoutLabel: {
    color: theme.colors.onPrimary,
    fontFamily: theme.typography.strong,
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
});
