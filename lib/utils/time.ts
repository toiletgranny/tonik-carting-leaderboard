/**
 * Format a lap time in seconds to a display string
 * @param seconds - Time in seconds (e.g., 44.956 or 71.701)
 * @returns Formatted string (e.g., "44.956" or "1:11.701")
 */
export function formatLapTime(seconds: number): string {
  if (seconds < 60) {
    return seconds.toFixed(3);
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toFixed(3).padStart(6, '0')}`;
}

/**
 * Calculate the delta between two lap times
 * @param currentTime - Current lap time in seconds
 * @param previousTime - Previous lap time in seconds
 * @returns Formatted delta string (e.g., "+0.109" or "+1:23.456")
 */
export function calculateTimeDelta(
  currentTime: number,
  previousTime: number
): string {
  const delta = currentTime - previousTime;

  if (delta === 0) {
    return '0.000';
  }

  const sign = delta > 0 ? '+' : '';

  if (Math.abs(delta) < 60) {
    return `${sign}${delta.toFixed(3)}`;
  }

  const minutes = Math.floor(Math.abs(delta) / 60);
  const seconds = Math.abs(delta) % 60;
  return `${sign}${minutes}:${seconds.toFixed(3).padStart(6, '0')}`;
}

/**
 * Format a date to a readable string
 * @param date - ISO date string or Date object
 * @param format - Format type ('short', 'long', or 'time')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'time' = 'short'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  switch (format) {
    case 'long':
      return dateObj.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'time':
      return dateObj.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
    case 'short':
    default:
      return dateObj.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
  }
}

/**
 * Format a date and time together
 * @param date - ISO date string or Date object
 * @returns Formatted string like "29/08/2024 20:15"
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(dateObj, 'short')} ${formatDate(dateObj, 'time')}`;
}
