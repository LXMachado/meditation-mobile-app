import React, { useMemo } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

import { PlayerControls } from '@/components/PlayerControls';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { tracks } from '@/data/tracks';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { theme } from '@/theme/theme';
import { formatDuration } from '@/utils/format';

const sleepOptions = [10, 20, 30, 45] as const;

export function PlayerScreen() {
  const {
    currentTrack,
    playbackPosition,
    isPlaying,
    volume,
    isLooping,
    sleepTimerMinutes,
    togglePlayback,
    seekTo,
    setVolume,
    setLooping,
    setSleepTimer,
    playNext,
    playPrevious,
  } = useAudioPlayer();

  const track = currentTrack ?? tracks[0];

  const progressMax = useMemo(() => track.duration * 1000, [track.duration]);

  return (
    <Screen>
      <View style={styles.heroWrap}>
        <ImageBackground imageStyle={styles.heroImage} source={{ uri: track.artwork }} style={styles.hero}>
          <View style={styles.heroOverlay} />
        </ImageBackground>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.category}>{track.category}</Text>
        <Text style={styles.description}>{track.description}</Text>
      </View>

      <View style={styles.playerPanel}>
        <ProgressBar
          maximumValue={progressMax}
          onSlidingComplete={seekTo}
          value={Math.min(playbackPosition, progressMax)}
        />
        <View style={styles.timeRow}>
          <Text style={styles.time}>{formatDuration(Math.floor(playbackPosition / 1000))}</Text>
          <Text style={styles.time}>{formatDuration(track.duration)}</Text>
        </View>

        <PlayerControls
          isLooping={isLooping}
          isPlaying={isPlaying}
          onNext={playNext}
          onPrevious={playPrevious}
          onToggleLoop={() => setLooping(!isLooping)}
          onTogglePlayback={togglePlayback}
        />

        <View style={styles.utilityRow}>
          {sleepOptions.map((option) => {
            const active = sleepTimerMinutes === option;
            return (
              <Pressable
                key={option}
                onPress={() => setSleepTimer(active ? null : option)}
                style={[styles.utilityChip, active && styles.utilityChipActive]}
              >
                <Ionicons
                  color={active ? theme.colors.onPrimary : theme.colors.primary}
                  name="moon-outline"
                  size={16}
                />
                <Text style={[styles.utilityLabel, active && styles.utilityLabelActive]}>{option} min</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.volumeRow}>
          <Ionicons color={theme.colors.textMuted} name="volume-low-outline" size={18} />
          <Slider
            maximumTrackTintColor="rgba(165,168,209,0.25)"
            maximumValue={1}
            minimumTrackTintColor={theme.colors.textMuted}
            onSlidingComplete={setVolume}
            style={{ flex: 1 }}
            thumbTintColor={theme.colors.text}
            value={volume}
          />
          <Ionicons color={theme.colors.textMuted} name="volume-high-outline" size={18} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    marginTop: 10,
  },
  hero: {
    aspectRatio: 1,
    borderRadius: 36,
    overflow: 'hidden',
  },
  heroImage: {
    borderRadius: 36,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(180,181,255,0.08)',
  },
  info: {
    alignItems: 'center',
    gap: 8,
    marginTop: 28,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.typography.display,
    fontSize: 34,
  },
  category: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  description: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  playerPanel: {
    backgroundColor: 'rgba(31,35,68,0.4)',
    borderRadius: 28,
    gap: 18,
    marginTop: 28,
    padding: 20,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.4,
  },
  utilityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  utilityChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(31,35,68,0.7)',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  utilityChipActive: {
    backgroundColor: theme.colors.primary,
  },
  utilityLabel: {
    color: theme.colors.text,
    fontFamily: theme.typography.label,
    fontSize: 12,
  },
  utilityLabelActive: {
    color: theme.colors.onPrimary,
  },
  volumeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
