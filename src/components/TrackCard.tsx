import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import type { Track } from '@/types';
import { theme } from '@/theme/theme';
import { formatMinutes } from '@/utils/format';
import { FavoriteButton } from '@/components/FavoriteButton';

type TrackCardProps = {
  track: Track;
  favorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  variant?: 'grid' | 'hero' | 'list';
};

export function TrackCard({
  track,
  favorite = false,
  onPress,
  onToggleFavorite,
  variant = 'grid',
}: TrackCardProps) {
  if (variant === 'list') {
    return (
      <Pressable onPress={onPress} style={styles.listCard}>
        <ImageBackground imageStyle={styles.listImage} source={{ uri: track.artwork }} style={styles.listArt} />
        <View style={styles.listBody}>
          <Text style={styles.listTitle}>{track.title}</Text>
          <Text style={styles.listSubtitle}>{track.subtitle}</Text>
          <Text style={styles.listMeta}>
            {track.category.toUpperCase()} • {formatMinutes(track.duration)}
          </Text>
        </View>
        <FavoriteButton active={favorite} onPress={onToggleFavorite} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={variant === 'hero' ? styles.heroCard : styles.card}>
      <ImageBackground imageStyle={styles.image} source={{ uri: track.artwork }} style={styles.image}>
        <LinearGradient
          colors={['transparent', 'rgba(11,13,30,0.9)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.topActions}>
          <FavoriteButton active={favorite} onPress={onToggleFavorite} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>{track.title}</Text>
          <Text numberOfLines={2} style={styles.subtitle}>
            {track.description}
          </Text>
          <Text style={styles.meta}>
            {track.mood.toUpperCase()} • {formatMinutes(track.duration)}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.lg,
    height: 220,
    overflow: 'hidden',
    width: 180,
  },
  heroCard: {
    borderRadius: 28,
    height: 380,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topActions: {
    alignItems: 'flex-end',
    padding: 16,
  },
  footer: {
    gap: 6,
    padding: 18,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.typography.title,
    fontSize: 22,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 13,
    lineHeight: 20,
  },
  meta: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.5,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  listCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLow,
    borderRadius: theme.radii.md,
    flexDirection: 'row',
    gap: 14,
    padding: 14,
  },
  listArt: {
    borderRadius: 16,
    height: 76,
    overflow: 'hidden',
    width: 76,
  },
  listImage: {
    borderRadius: 16,
  },
  listBody: {
    flex: 1,
    gap: 4,
  },
  listTitle: {
    color: theme.colors.text,
    fontFamily: theme.typography.title,
    fontSize: 16,
  },
  listSubtitle: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.body,
    fontSize: 13,
  },
  listMeta: {
    color: theme.colors.primary,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
