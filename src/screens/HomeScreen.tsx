import React, { useMemo } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { categories, meditationSession, tracks } from '@/data/tracks';
import { CategoryCard } from '@/components/CategoryCard';
import { GradientButton } from '@/components/GradientButton';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { TrackCard } from '@/components/TrackCard';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useAppStore } from '@/store/useAppStore';
import { theme } from '@/theme/theme';
import { formatDuration } from '@/utils/format';
import { getGreeting } from '@/utils/greeting';
import type { RootStackParamList } from '@/navigation/types';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { playTrack } = useAudioPlayer();
  const { displayName } = useAuthSession();
  const favorites = useAppStore((state) => state.favorites);
  const recentlyPlayed = useAppStore((state) => state.recentlyPlayed);
  const playbackPosition = useAppStore((state) => state.playbackPosition);
  const currentTrackId = useAppStore((state) => state.currentTrackId);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);

  const featuredTrack = tracks.find((track) => track.featured) ?? tracks[0];
  const continueTrack = tracks.find((track) => track.id === currentTrackId) ?? tracks[1];
  const recentTracks = useMemo(
    () =>
      recentlyPlayed
        .map((id) => tracks.find((track) => track.id === id))
        .filter((track): track is (typeof tracks)[number] => Boolean(track)),
    [recentlyPlayed],
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Welcome back</Text>
        <Text style={styles.greeting}>{getGreeting()}, {displayName}</Text>
      </View>

      <TrackCard
        favorite={favorites.includes(featuredTrack.id)}
        onPress={() => playTrack(featuredTrack)}
        onToggleFavorite={() => toggleFavorite(featuredTrack.id)}
        track={featuredTrack}
        variant="hero"
      />

      <View style={styles.continueCard}>
        <View style={styles.continueBody}>
          <Text style={styles.continueEyebrow}>Continue listening</Text>
          <Text style={styles.continueTitle}>{continueTrack.title}</Text>
          <Text style={styles.continueSubtitle}>{continueTrack.subtitle}</Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min((playbackPosition / continueTrack.duration / 1000) * 100, 100)}%` },
              ]}
            />
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{formatDuration(Math.floor(playbackPosition / 1000))}</Text>
            <Text style={styles.metaText}>{formatDuration(continueTrack.duration)}</Text>
          </View>
        </View>
        <Pressable onPress={() => playTrack(continueTrack, playbackPosition)} style={styles.playCircle}>
          <Ionicons color={theme.colors.onPrimary} name="play" size={22} />
        </Pressable>
      </View>

      <View style={styles.statsCard}>
        <Ionicons color={theme.colors.secondary} name="sparkles-outline" size={28} />
        <Text style={styles.statsValue}>128</Text>
        <Text style={styles.statsLabel}>Minutes of focus this week</Text>
      </View>

      <SectionHeader actionLabel="View all" title="Explore Depths" />
      <FlatList
        contentContainerStyle={styles.horizontalList}
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CategoryCard icon={item.icon} label={item.label} />}
        showsHorizontalScrollIndicator={false}
      />

      <SectionHeader title="Your Recent Journeys" />
      <FlatList
        contentContainerStyle={styles.horizontalList}
        data={recentTracks}
        horizontal
        keyExtractor={(item) => item!.id}
        renderItem={({ item }) =>
          item ? (
            <TrackCard
              favorite={favorites.includes(item.id)}
              onPress={() => playTrack(item)}
              onToggleFavorite={() => toggleFavorite(item.id)}
              track={item}
            />
          ) : null
        }
        showsHorizontalScrollIndicator={false}
      />

      <ImageBackground source={{ uri: tracks[5].artwork }} style={styles.sessionCard} imageStyle={styles.sessionImage}>
        <View style={styles.sessionOverlay}>
          <Text style={styles.sessionEyebrow}>Meditation Session</Text>
          <Text style={styles.sessionTitle}>{meditationSession.title}</Text>
          <Text style={styles.sessionDescription}>
            Step-based breath flow with a pulsing orb and guided timing.
          </Text>
          <GradientButton label="Start session" onPress={() => navigation.navigate('Session')} />
        </View>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 6,
    marginBottom: 20,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  greeting: {
    color: theme.colors.text,
    fontFamily: theme.typography.display,
    fontSize: 42,
    lineHeight: 50,
  },
  continueCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: 28,
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
    padding: 20,
  },
  continueBody: {
    flex: 1,
    gap: 6,
  },
  continueEyebrow: {
    color: theme.colors.secondary,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  continueTitle: {
    color: theme.colors.text,
    fontFamily: theme.typography.title,
    fontSize: 22,
  },
  continueSubtitle: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 14,
  },
  progressTrack: {
    backgroundColor: 'rgba(165, 168, 209, 0.2)',
    borderRadius: theme.radii.pill,
    height: 6,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radii.pill,
    height: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.3,
  },
  playCircle: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.pill,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  statsCard: {
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: 28,
    gap: 8,
    marginTop: 16,
    padding: 20,
  },
  statsValue: {
    color: theme.colors.text,
    fontFamily: theme.typography.display,
    fontSize: 38,
  },
  statsLabel: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 14,
  },
  horizontalList: {
    gap: 14,
    paddingVertical: 16,
  },
  sessionCard: {
    height: 280,
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  sessionImage: {
    borderRadius: 28,
  },
  sessionOverlay: {
    backgroundColor: 'rgba(11,13,30,0.55)',
    borderRadius: 28,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 22,
  },
  sessionEyebrow: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sessionTitle: {
    color: theme.colors.text,
    fontFamily: theme.typography.title,
    fontSize: 28,
    marginTop: 8,
  },
  sessionDescription: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
    marginTop: 10,
  },
});
