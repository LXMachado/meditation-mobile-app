import { getGreeting } from '../greeting';

describe('getGreeting', () => {
  it('returns Good morning before 12:00', () => {
    expect(getGreeting(new Date('2026-01-01T00:00:00'))).toBe('Good morning');
    expect(getGreeting(new Date('2026-01-01T06:30:00'))).toBe('Good morning');
    expect(getGreeting(new Date('2026-01-01T11:59:00'))).toBe('Good morning');
  });

  it('returns Good afternoon from 12:00 to 17:59', () => {
    expect(getGreeting(new Date('2026-01-01T12:00:00'))).toBe('Good afternoon');
    expect(getGreeting(new Date('2026-01-01T15:00:00'))).toBe('Good afternoon');
    expect(getGreeting(new Date('2026-01-01T17:59:00'))).toBe('Good afternoon');
  });

  it('returns Good evening from 18:00 onwards', () => {
    expect(getGreeting(new Date('2026-01-01T18:00:00'))).toBe('Good evening');
    expect(getGreeting(new Date('2026-01-01T21:00:00'))).toBe('Good evening');
    expect(getGreeting(new Date('2026-01-01T23:59:00'))).toBe('Good evening');
  });

  it('defaults to current date when no argument provided', () => {
    const result = getGreeting();
    expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(result);
  });
});
