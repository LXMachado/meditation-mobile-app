import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { tracks } from '@/data/tracks';
import type { ThemeMode, Track } from '@/types';

type AppState = {
  profile: {
    displayName: string;
    avatarUrl: string;
  };
  currentTrackId: string | null;
  isPlaying: boolean;
  playbackPosition: number;
  favorites: string[];
  recentlyPlayed: string[];
  volume: number;
  isLooping: boolean;
  sleepTimerMinutes: number | null;
  notificationsEnabled: boolean;
  themeMode: ThemeMode;
  setCurrentTrack: (trackId: string | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setPlaybackPosition: (playbackPosition: number) => void;
  toggleFavorite: (trackId: string) => void;
  addRecentlyPlayed: (trackId: string) => void;
  setVolume: (volume: number) => void;
  setIsLooping: (isLooping: boolean) => void;
  setSleepTimerMinutes: (minutes: number | null) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: {
        displayName: 'Alex',
        avatarUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      },
      currentTrackId: tracks[0]?.id ?? null,
      isPlaying: false,
      playbackPosition: 0,
      favorites: ['abyssal-echoes', 'deep-sleep'],
      recentlyPlayed: ['midnight-rainfall', 'abyssal-echoes', 'lucid-focus'],
      volume: 0.65,
      isLooping: false,
      sleepTimerMinutes: null,
      notificationsEnabled: true,
      themeMode: 'dark',
      setCurrentTrack: (trackId) => set({ currentTrackId: trackId }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setPlaybackPosition: (playbackPosition) => set({ playbackPosition }),
      toggleFavorite: (trackId) =>
        set((state) => ({
          favorites: state.favorites.includes(trackId)
            ? state.favorites.filter((id) => id !== trackId)
            : [trackId, ...state.favorites],
        })),
      addRecentlyPlayed: (trackId) =>
        set((state) => ({
          recentlyPlayed: [trackId, ...state.recentlyPlayed.filter((id) => id !== trackId)].slice(0, 8),
        })),
      setVolume: (volume) => set({ volume }),
      setIsLooping: (isLooping) => set({ isLooping }),
      setSleepTimerMinutes: (sleepTimerMinutes) => set({ sleepTimerMinutes }),
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
      setThemeMode: (themeMode) => set({ themeMode }),
    }),
    {
      name: 'submerged-sanctuary-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        currentTrackId: state.currentTrackId,
        playbackPosition: state.playbackPosition,
        favorites: state.favorites,
        recentlyPlayed: state.recentlyPlayed,
        volume: state.volume,
        isLooping: state.isLooping,
        sleepTimerMinutes: state.sleepTimerMinutes,
        notificationsEnabled: state.notificationsEnabled,
        themeMode: state.themeMode,
      }),
    },
  ),
);

export const selectCurrentTrack = (state: AppState): Track | undefined =>
  tracks.find((track) => track.id === state.currentTrackId);
