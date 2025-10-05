import { LapTime } from '../supabase/types';

/**
 * Group lap times by date (event)
 * @param lapTimes - Array of lap times
 * @returns Map of date string to lap times array
 */
export function groupByEvent(lapTimes: LapTime[]): Map<string, LapTime[]> {
  const grouped = new Map<string, LapTime[]>();

  for (const lap of lapTimes) {
    const dateKey = lap.date.split('T')[0]; // Extract YYYY-MM-DD
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(lap);
  }

  return grouped;
}

/**
 * Group lap times by session (date + time)
 * @param lapTimes - Array of lap times
 * @returns Map of session key to lap times array
 */
export function groupBySession(lapTimes: LapTime[]): Map<string, LapTime[]> {
  const grouped = new Map<string, LapTime[]>();

  for (const lap of lapTimes) {
    const sessionKey = `${lap.date}_${lap.session_time}`;
    if (!grouped.has(sessionKey)) {
      grouped.set(sessionKey, []);
    }
    grouped.get(sessionKey)!.push(lap);
  }

  return grouped;
}

/**
 * Group lap times by driver
 * @param lapTimes - Array of lap times
 * @returns Map of driver name to lap times array
 */
export function groupByDriver(lapTimes: LapTime[]): Map<string, LapTime[]> {
  const grouped = new Map<string, LapTime[]>();

  for (const lap of lapTimes) {
    if (!grouped.has(lap.driver_name)) {
      grouped.set(lap.driver_name, []);
    }
    grouped.get(lap.driver_name)!.push(lap);
  }

  return grouped;
}

/**
 * Get unique session times within an event
 * @param lapTimes - Array of lap times from a single event
 * @returns Sorted array of unique session times
 */
export function getUniqueSessions(lapTimes: LapTime[]): string[] {
  const sessions = new Set(lapTimes.map((lap) => lap.session_time));
  return Array.from(sessions).sort();
}

/**
 * Sort lap times by place within session
 * @param lapTimes - Array of lap times
 * @returns Sorted array
 */
export function sortByPlace(lapTimes: LapTime[]): LapTime[] {
  return [...lapTimes].sort((a, b) => {
    if (a.place === null) return 1;
    if (b.place === null) return -1;
    return a.place - b.place;
  });
}

/**
 * Sort lap times by lap time (fastest first)
 * @param lapTimes - Array of lap times
 * @returns Sorted array
 */
export function sortByLapTime(lapTimes: LapTime[]): LapTime[] {
  return [...lapTimes].sort((a, b) => a.lap_time_seconds - b.lap_time_seconds);
}
