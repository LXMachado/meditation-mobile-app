import { useEffect } from 'react';

import { tracks } from '@/data/tracks';
import { audioService } from '@/services/audioService';
import { selectCurrentTrack, useAppStore } from '@/store/useAppStore';

export function useAudioPlayer() {
  const currentTrack = useAppStore(selectCurrentTrack);
  const currentTrackId = useAppStore((state) => state.currentTrackId);
  const isPlaying = useAppStore((state) => state.isPlaying);
  const playbackPosition = useAppStore((state) => state.playbackPosition);
  const volume = useAppStore((state) => state.volume);
  const isLooping = useAppStore((state) => state.isLooping);
  const sleepTimerMinutes = useAppStore((state) => state.sleepTimerMinutes);

  useEffect(() => {
    audioService.init().catch(() => undefined);
  }, []);

  return {
    tracks,
    currentTrack,
    currentTrackId,
    isPlaying,
    playbackPosition,
    volume,
    isLooping,
    sleepTimerMinutes,
    playTrack: audioService.playTrack.bind(audioService),
    togglePlayback: audioService.togglePlayback.bind(audioService),
    seekTo: audioService.seekTo.bind(audioService),
    setVolume: audioService.setVolume.bind(audioService),
    setLooping: audioService.setLooping.bind(audioService),
    setSleepTimer: audioService.setSleepTimer.bind(audioService),
    playNext: audioService.playNext.bind(audioService),
    playPrevious: audioService.playPrevious.bind(audioService),
  };
}
