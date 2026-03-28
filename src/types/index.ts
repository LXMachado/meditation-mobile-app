export type TrackCategory = 'nature' | 'ambient' | 'binaural' | 'guided';
export type TrackMood = 'sleep' | 'focus' | 'relax';
export type DurationFilter = 'short' | 'medium' | 'long';
export type ThemeMode = 'dark' | 'light';

export type Track = {
  id: string;
  title: string;
  subtitle: string;
  category: TrackCategory;
  mood: TrackMood;
  duration: number;
  audioUrl: string;
  artwork: string;
  featured?: boolean;
  description: string;
};

export type MeditationStep = {
  id: string;
  label: string;
  title: string;
  instruction: string;
  seconds: number;
};

export type Session = {
  id: string;
  title: string;
  subtitle: string;
  totalSeconds: number;
  steps: MeditationStep[];
};

export type PlaybackSnapshot = {
  currentTrackId: string | null;
  playbackPosition: number;
  volume: number;
  isLooping: boolean;
};
