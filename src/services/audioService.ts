import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
  type AVPlaybackStatus,
} from 'expo-av';

import { tracks } from '@/data/tracks';
import { clamp } from '@/utils/format';
import { useAppStore } from '@/store/useAppStore';
import type { Track } from '@/types';

class AudioService {
  private sound: Audio.Sound | null = null;
  private initialized = false;
  private sleepTimer: ReturnType<typeof setTimeout> | null = null;

  async init() {
    if (this.initialized) {
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    this.initialized = true;
  }

  async playTrack(track: Track, positionMillis = 0) {
    await this.init();

    const state = useAppStore.getState();

    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }

    const sound = new Audio.Sound();
    sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    await sound.loadAsync(
      { uri: track.audioUrl },
      {
        shouldPlay: true,
        positionMillis,
        isLooping: state.isLooping,
        volume: state.volume,
      },
    );

    this.sound = sound;

    useAppStore.setState({
      currentTrackId: track.id,
      isPlaying: true,
      playbackPosition: positionMillis,
    });
    state.addRecentlyPlayed(track.id);
  }

  async togglePlayback() {
    if (!this.sound) {
      const fallbackTrack =
        tracks.find((track) => track.id === useAppStore.getState().currentTrackId) ?? tracks[0];

      if (fallbackTrack) {
        await this.playTrack(fallbackTrack, useAppStore.getState().playbackPosition);
      }

      return;
    }

    const status = await this.sound.getStatusAsync();
    if (!status.isLoaded) {
      return;
    }

    if (status.isPlaying) {
      await this.sound.pauseAsync();
      useAppStore.getState().setIsPlaying(false);
    } else {
      await this.sound.playAsync();
      useAppStore.getState().setIsPlaying(true);
    }
  }

  async seekTo(positionMillis: number) {
    if (!this.sound) {
      return;
    }

    const status = await this.sound.getStatusAsync();
    if (!status.isLoaded) {
      return;
    }

    const nextPosition = clamp(positionMillis, 0, status.durationMillis ?? positionMillis);
    await this.sound.setPositionAsync(nextPosition);
    useAppStore.getState().setPlaybackPosition(nextPosition);
  }

  async setVolume(volume: number) {
    const nextVolume = clamp(volume, 0, 1);
    useAppStore.getState().setVolume(nextVolume);

    if (this.sound) {
      await this.sound.setVolumeAsync(nextVolume);
    }
  }

  async setLooping(isLooping: boolean) {
    useAppStore.getState().setIsLooping(isLooping);

    if (this.sound) {
      await this.sound.setIsLoopingAsync(isLooping);
    }
  }

  async playNext() {
    const currentTrackId = useAppStore.getState().currentTrackId;
    const currentIndex = tracks.findIndex((track) => track.id === currentTrackId);
    const nextTrack = tracks[(currentIndex + 1 + tracks.length) % tracks.length];
    await this.playTrack(nextTrack);
  }

  async playPrevious() {
    const currentTrackId = useAppStore.getState().currentTrackId;
    const currentIndex = tracks.findIndex((track) => track.id === currentTrackId);
    const previousTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    await this.playTrack(previousTrack);
  }

  setSleepTimer(minutes: number | null) {
    if (this.sleepTimer) {
      clearTimeout(this.sleepTimer);
      this.sleepTimer = null;
    }

    useAppStore.getState().setSleepTimerMinutes(minutes);

    if (!minutes) {
      return;
    }

    this.sleepTimer = setTimeout(async () => {
      await this.pause();
      useAppStore.getState().setSleepTimerMinutes(null);
    }, minutes * 60 * 1000);
  }

  async pause() {
    if (!this.sound) {
      return;
    }

    const status = await this.sound.getStatusAsync();
    if (status.isLoaded && status.isPlaying) {
      await this.sound.pauseAsync();
    }

    useAppStore.getState().setIsPlaying(false);
  }

  async cleanup() {
    if (this.sleepTimer) {
      clearTimeout(this.sleepTimer);
      this.sleepTimer = null;
    }

    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
  }

  private onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }

    useAppStore.setState({
      isPlaying: status.isPlaying,
      playbackPosition: status.positionMillis,
    });

    if (status.didJustFinish && !status.isLooping) {
      useAppStore.setState({
        isPlaying: false,
        playbackPosition: 0,
      });
    }
  };
}

export const audioService = new AudioService();
