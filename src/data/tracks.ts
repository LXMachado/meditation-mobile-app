import type { Session, Track } from '@/types';

export const tracks: Track[] = [
  {
    id: 'abyssal-echoes',
    title: 'Abyssal Echoes',
    subtitle: 'Deep shelf drift',
    category: 'ambient',
    mood: 'relax',
    duration: 2700,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    artwork:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    description: 'A wide, slow ambient layer built for decompression and evening resets.',
  },
  {
    id: 'midnight-rainfall',
    title: 'Midnight Rainfall',
    subtitle: 'Rain and low synth wash',
    category: 'nature',
    mood: 'sleep',
    duration: 3000,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    artwork:
      'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80',
    description: 'Dense rainfall textures for sleep onset and overnight looping.',
  },
  {
    id: 'forest-hush',
    title: 'Forest Hush',
    subtitle: 'Birdsong and pine air',
    category: 'nature',
    mood: 'relax',
    duration: 1500,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    artwork:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    description: 'Cool woodland ambience with a light dawn texture.',
  },
  {
    id: 'deep-sleep',
    title: 'Deep Sleep',
    subtitle: 'Delta-wave binaural set',
    category: 'binaural',
    mood: 'sleep',
    duration: 2700,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    artwork:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    description: 'A steady low-frequency bed tuned for bedtime routines.',
  },
  {
    id: 'lucid-focus',
    title: 'Lucid Focus',
    subtitle: 'Alpha concentration',
    category: 'binaural',
    mood: 'focus',
    duration: 1800,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    artwork:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp, minimal tones for reading, coding, and desk flow.',
  },
  {
    id: 'shoreline-breath',
    title: 'Shoreline Breath',
    subtitle: 'Guided breathwork',
    category: 'guided',
    mood: 'relax',
    duration: 900,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    artwork:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    description: 'A short guided breathing session built for transitions between tasks.',
  },
  {
    id: 'ocean-veil',
    title: 'Ocean Veil',
    subtitle: 'Tidal white noise',
    category: 'ambient',
    mood: 'sleep',
    duration: 3600,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    artwork:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    description: 'Long-form ocean wash designed for uninterrupted looping.',
  },
  {
    id: 'still-water',
    title: 'Still Water',
    subtitle: 'Guided settling practice',
    category: 'guided',
    mood: 'focus',
    duration: 1200,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    artwork:
      'https://images.unsplash.com/photo-1437623889155-075d40e2e59f?auto=format&fit=crop&w=1200&q=80',
    description: 'Body scan and attention reset for midday recalibration.',
  },
];

export const meditationSession: Session = {
  id: 'deep-sea-drift',
  title: 'Deep Sea Drift',
  subtitle: 'Guided breath and settling',
  totalSeconds: 16 * 60,
  steps: [
    {
      id: 'arrival',
      label: 'Phase 01',
      title: 'Inhale',
      instruction: 'Let your breath sink like a pebble through cool, still water.',
      seconds: 240,
    },
    {
      id: 'hold',
      label: 'Phase 02',
      title: 'Hold',
      instruction: 'Rest in the pause and feel the body widen around the breath.',
      seconds: 240,
    },
    {
      id: 'release',
      label: 'Phase 03',
      title: 'Exhale',
      instruction: 'Soften the jaw and lengthen the exhale until the shoulders drop.',
      seconds: 240,
    },
    {
      id: 'stillness',
      label: 'Phase 04',
      title: 'Float',
      instruction: 'Stay with the silence between waves and let attention settle.',
      seconds: 240,
    },
  ],
};

export const categories = [
  { id: 'nature', label: 'Nature Sounds', icon: 'leaf-outline' },
  { id: 'ambient', label: 'Ambient Music', icon: 'moon-outline' },
  { id: 'binaural', label: 'Binaural Beats', icon: 'pulse-outline' },
  { id: 'guided', label: 'Guided', icon: 'sparkles-outline' },
] as const;
