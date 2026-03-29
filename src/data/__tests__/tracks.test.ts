import { tracks, meditationSession, categories } from '../tracks';

describe('tracks', () => {
  it('contains at least one track', () => {
    expect(tracks.length).toBeGreaterThan(0);
  });

  it('every track has required fields', () => {
    for (const track of tracks) {
      expect(track.id).toBeTruthy();
      expect(track.title).toBeTruthy();
      expect(track.category).toBeTruthy();
      expect(track.mood).toBeTruthy();
      expect(track.duration).toBeGreaterThan(0);
      expect(track.audioUrl).toMatch(/^https?:\/\//);
      expect(track.artwork).toMatch(/^https?:\/\//);
    }
  });

  it('has unique track ids', () => {
    const ids = tracks.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has valid categories', () => {
    const validCategories = categories.map((c) => c.id);
    for (const track of tracks) {
      expect(validCategories).toContain(track.category);
    }
  });

  it('has at least one featured track', () => {
    expect(tracks.some((t) => t.featured)).toBe(true);
  });
});

describe('meditationSession', () => {
  it('has required fields', () => {
    expect(meditationSession.id).toBeTruthy();
    expect(meditationSession.title).toBeTruthy();
    expect(meditationSession.totalSeconds).toBeGreaterThan(0);
    expect(meditationSession.steps.length).toBeGreaterThan(0);
  });

  it('step durations sum to totalSeconds', () => {
    const sum = meditationSession.steps.reduce((acc, step) => acc + step.seconds, 0);
    expect(sum).toBe(meditationSession.totalSeconds);
  });

  it('every step has required fields', () => {
    for (const step of meditationSession.steps) {
      expect(step.id).toBeTruthy();
      expect(step.label).toBeTruthy();
      expect(step.title).toBeTruthy();
      expect(step.instruction).toBeTruthy();
      expect(step.seconds).toBeGreaterThan(0);
    }
  });
});

describe('categories', () => {
  it('contains categories', () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it('every category has id, label, and icon', () => {
    for (const cat of categories) {
      expect(cat.id).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(cat.icon).toBeTruthy();
    }
  });

  it('has unique category ids', () => {
    const ids = categories.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
