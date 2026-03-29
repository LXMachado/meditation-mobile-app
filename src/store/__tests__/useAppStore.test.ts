import { useAppStore } from '../useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentTrackId: 'abyssal-echoes',
      isPlaying: false,
      playbackPosition: 0,
      favorites: ['abyssal-echoes', 'deep-sleep'],
      recentlyPlayed: ['midnight-rainfall', 'abyssal-echoes', 'lucid-focus'],
      volume: 0.65,
      isLooping: false,
      sleepTimerMinutes: null,
      notificationsEnabled: true,
      themeMode: 'dark',
    });
  });

  it('has expected default state', () => {
    const state = useAppStore.getState();
    expect(state.currentTrackId).toBe('abyssal-echoes');
    expect(state.isPlaying).toBe(false);
    expect(state.favorites).toEqual(['abyssal-echoes', 'deep-sleep']);
    expect(state.themeMode).toBe('dark');
  });

  it('setCurrentTrack updates currentTrackId', () => {
    useAppStore.getState().setCurrentTrack('forest-hush');
    expect(useAppStore.getState().currentTrackId).toBe('forest-hush');
  });

  it('setCurrentTrack accepts null', () => {
    useAppStore.getState().setCurrentTrack(null);
    expect(useAppStore.getState().currentTrackId).toBeNull();
  });

  it('setIsPlaying toggles playback state', () => {
    useAppStore.getState().setIsPlaying(true);
    expect(useAppStore.getState().isPlaying).toBe(true);
  });

  it('setPlaybackPosition updates position', () => {
    useAppStore.getState().setPlaybackPosition(120);
    expect(useAppStore.getState().playbackPosition).toBe(120);
  });

  describe('toggleFavorite', () => {
    it('removes existing favorite', () => {
      useAppStore.getState().toggleFavorite('abyssal-echoes');
      expect(useAppStore.getState().favorites).not.toContain('abyssal-echoes');
    });

    it('adds new favorite at the beginning', () => {
      useAppStore.getState().toggleFavorite('forest-hush');
      expect(useAppStore.getState().favorites[0]).toBe('forest-hush');
      expect(useAppStore.getState().favorites).toContain('abyssal-echoes');
    });
  });

  describe('addRecentlyPlayed', () => {
    it('adds track to the beginning', () => {
      useAppStore.getState().addRecentlyPlayed('forest-hush');
      expect(useAppStore.getState().recentlyPlayed[0]).toBe('forest-hush');
    });

    it('moves existing track to the beginning', () => {
      useAppStore.getState().addRecentlyPlayed('lucid-focus');
      expect(useAppStore.getState().recentlyPlayed[0]).toBe('lucid-focus');
    });

    it('limits to 8 entries', () => {
      const ids = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      ids.forEach((id) => useAppStore.getState().addRecentlyPlayed(id));
      expect(useAppStore.getState().recentlyPlayed.length).toBeLessThanOrEqual(8);
    });
  });

  it('setVolume updates volume', () => {
    useAppStore.getState().setVolume(0.5);
    expect(useAppStore.getState().volume).toBe(0.5);
  });

  it('setIsLooping toggles loop state', () => {
    useAppStore.getState().setIsLooping(true);
    expect(useAppStore.getState().isLooping).toBe(true);
  });

  it('setSleepTimerMinutes updates timer', () => {
    useAppStore.getState().setSleepTimerMinutes(30);
    expect(useAppStore.getState().sleepTimerMinutes).toBe(30);

    useAppStore.getState().setSleepTimerMinutes(null);
    expect(useAppStore.getState().sleepTimerMinutes).toBeNull();
  });

  it('setNotificationsEnabled toggles notifications', () => {
    useAppStore.getState().setNotificationsEnabled(false);
    expect(useAppStore.getState().notificationsEnabled).toBe(false);
  });

  it('setThemeMode updates theme', () => {
    useAppStore.getState().setThemeMode('light');
    expect(useAppStore.getState().themeMode).toBe('light');
  });
});
