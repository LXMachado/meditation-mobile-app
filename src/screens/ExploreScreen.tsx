import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { TrackCard } from '@/components/TrackCard';
import { tracks } from '@/data/tracks';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAppStore } from '@/store/useAppStore';
import { theme } from '@/theme/theme';
import { mapDurationFilter } from '@/utils/format';
import type { DurationFilter, TrackCategory, TrackMood } from '@/types';

const moods: Array<TrackMood | 'all'> = ['all', 'sleep', 'focus', 'relax'];
const categories: Array<TrackCategory | 'all'> = ['all', 'nature', 'ambient', 'binaural', 'guided'];
const durations: Array<DurationFilter | 'all'> = ['all', 'short', 'medium', 'long'];

export function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [selectedMood, setSelectedMood] = useState<TrackMood | 'all'>('sleep');
  const [selectedCategory, setSelectedCategory] = useState<TrackCategory | 'all'>('all');
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter | 'all'>('all');
  const { playTrack } = useAudioPlayer();
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchesSearch =
        !search ||
        `${track.title} ${track.subtitle} ${track.description}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesMood = selectedMood === 'all' || track.mood === selectedMood;
      const matchesCategory = selectedCategory === 'all' || track.category === selectedCategory;
      const matchesDuration =
        selectedDuration === 'all' || mapDurationFilter(track.duration) === selectedDuration;

      return matchesSearch && matchesMood && matchesCategory && matchesDuration;
    });
  }, [search, selectedMood, selectedCategory, selectedDuration]);

  return (
    <Screen padded={false} scrollable={false}>
      <FlatList
        contentContainerStyle={styles.content}
        data={filteredTracks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <View style={styles.header}>
              <Text style={styles.title}>
                Find your <Text style={styles.emphasis}>inner resonance</Text>.
              </Text>
              <TextInput
                onChangeText={setSearch}
                placeholder="Search soundscapes, meditations, or moods..."
                placeholderTextColor={theme.colors.textMuted}
                style={styles.input}
                value={search}
              />
            </View>

            <FilterRow
              label="Mood"
              options={moods}
              selected={selectedMood}
              onChange={(value) => setSelectedMood(value as TrackMood | 'all')}
            />
            <FilterRow
              label="Category"
              options={categories}
              selected={selectedCategory}
              onChange={(value) => setSelectedCategory(value as TrackCategory | 'all')}
            />
            <FilterRow
              label="Duration"
              options={durations}
              selected={selectedDuration}
              onChange={(value) => setSelectedDuration(value as DurationFilter | 'all')}
            />

            <SectionHeader eyebrow="Library" title={`${filteredTracks.length} tracks for this state`} />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TrackCard
              favorite={favorites.includes(item.id)}
              onPress={() => playTrack(item)}
              onToggleFavorite={() => toggleFavorite(item.id)}
              track={item}
              variant="list"
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

type FilterRowProps<T extends string> = {
  label: string;
  options: T[];
  selected: T;
  onChange: (value: T) => void;
};

function FilterRow<T extends string>({ label, options, selected, onChange }: FilterRowProps<T>) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterLabel}>{label}</Text>
      <View style={styles.filterRow}>
        {options.map((option) => {
          const active = selected === option;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 16,
  },
  headerContent: {
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.typography.display,
    fontSize: 38,
    lineHeight: 46,
  },
  emphasis: {
    color: theme.colors.primary,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.radii.pill,
    color: theme.colors.text,
    fontFamily: theme.typography.body,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterGroup: {
    gap: 10,
    marginBottom: 16,
  },
  filterLabel: {
    color: theme.colors.textMuted,
    fontFamily: theme.typography.label,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: theme.colors.surfaceHigh,
    borderRadius: theme.radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: theme.colors.secondary,
  },
  chipText: {
    color: theme.colors.text,
    fontFamily: theme.typography.label,
    fontSize: 13,
    textTransform: 'capitalize',
  },
  chipTextActive: {
    color: '#083411',
  },
  listWrap: {
    gap: 12,
    marginTop: 16,
  },
  listItem: {
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 120,
    paddingTop: 12,
  },
});
