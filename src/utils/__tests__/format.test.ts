import { formatDuration, formatMinutes, mapDurationFilter, clamp } from '../format';

describe('formatDuration', () => {
  it('formats 0 seconds', () => {
    expect(formatDuration(0)).toBe('0:00');
  });

  it('formats seconds less than 60', () => {
    expect(formatDuration(45)).toBe('0:45');
  });

  it('formats minutes and seconds', () => {
    expect(formatDuration(125)).toBe('2:05');
  });

  it('pads single-digit seconds', () => {
    expect(formatDuration(61)).toBe('1:01');
  });

  it('formats exactly 60 seconds', () => {
    expect(formatDuration(60)).toBe('1:00');
  });

  it('formats large durations', () => {
    expect(formatDuration(3600)).toBe('60:00');
  });

  it('formats 1 second', () => {
    expect(formatDuration(1)).toBe('0:01');
  });
});

describe('formatMinutes', () => {
  it('formats 0 seconds as 0 min', () => {
    expect(formatMinutes(0)).toBe('0 min');
  });

  it('rounds up 31 seconds to 1 min', () => {
    expect(formatMinutes(31)).toBe('1 min');
  });

  it('rounds down 29 seconds to 0 min', () => {
    expect(formatMinutes(29)).toBe('0 min');
  });

  it('formats 60 seconds as 1 min', () => {
    expect(formatMinutes(60)).toBe('1 min');
  });

  it('formats 90 seconds as 2 min', () => {
    expect(formatMinutes(90)).toBe('2 min');
  });

  it('formats 2700 seconds as 45 min', () => {
    expect(formatMinutes(2700)).toBe('45 min');
  });
});

describe('mapDurationFilter', () => {
  it('returns short for durations <= 600', () => {
    expect(mapDurationFilter(0)).toBe('short');
    expect(mapDurationFilter(300)).toBe('short');
    expect(mapDurationFilter(600)).toBe('short');
  });

  it('returns medium for durations <= 1800 and > 600', () => {
    expect(mapDurationFilter(601)).toBe('medium');
    expect(mapDurationFilter(1200)).toBe('medium');
    expect(mapDurationFilter(1800)).toBe('medium');
  });

  it('returns long for durations > 1800', () => {
    expect(mapDurationFilter(1801)).toBe('long');
    expect(mapDurationFilter(3600)).toBe('long');
  });
});

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to min when value is below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps to max when value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('returns max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('handles negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });
});
