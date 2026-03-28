export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatMinutes(totalSeconds: number) {
  return `${Math.round(totalSeconds / 60)} min`;
}

export function mapDurationFilter(duration: number) {
  if (duration <= 600) {
    return 'short';
  }

  if (duration <= 1800) {
    return 'medium';
  }

  return 'long';
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
