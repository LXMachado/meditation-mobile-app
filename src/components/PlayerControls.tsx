import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '@/theme/theme';

type PlayerControlsProps = {
  isPlaying: boolean;
  isLooping: boolean;
  onTogglePlayback: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleLoop: () => void;
};

export function PlayerControls({
  isPlaying,
  isLooping,
  onTogglePlayback,
  onNext,
  onPrevious,
  onToggleLoop,
}: PlayerControlsProps) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onToggleLoop} style={styles.sideButton}>
        <Ionicons
          color={isLooping ? theme.colors.primary : theme.colors.textMuted}
          name="repeat"
          size={22}
        />
      </Pressable>
      <View style={styles.center}>
        <Pressable onPress={onPrevious}>
          <Ionicons color={theme.colors.text} name="play-skip-back" size={34} />
        </Pressable>
        <Pressable onPress={onTogglePlayback}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryContainer]}
            style={styles.playButton}
          >
            <Ionicons
              color={theme.colors.onPrimary}
              name={isPlaying ? 'pause' : 'play'}
              size={30}
            />
          </LinearGradient>
        </Pressable>
        <Pressable onPress={onNext}>
          <Ionicons color={theme.colors.text} name="play-skip-forward" size={34} />
        </Pressable>
      </View>
      <View style={styles.sideButton}>
        <Text style={styles.sideLabel}>Flow</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 26,
  },
  playButton: {
    alignItems: 'center',
    borderRadius: theme.radii.pill,
    height: 78,
    justifyContent: 'center',
    width: 78,
  },
  sideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
  },
  sideLabel: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
