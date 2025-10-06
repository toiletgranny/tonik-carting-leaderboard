import { supabase } from '../supabase/client';
import { LapTime, LeaderboardEntry, EventSummary, EventSummaryWithDriver } from '../supabase/types';
import { groupByDriver, sortByLapTime } from '../utils/grouping';

/**
 * Get leaderboard data with time deltas
 * Returns best lap time for each driver, sorted by time
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('lap_time_seconds', { ascending: true });

  if (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }

  return (data || []) as LeaderboardEntry[];
}

/**
 * Get all lap times with optional filters
 */
export async function getLapTimes(options?: {
  driverName?: string;
  eventDate?: string;
  includeOnly?: boolean;
}) {
  let query = supabase.from('lap_times').select('*');

  if (options?.driverName) {
    query = query.eq('driver_name', options.driverName);
  }

  if (options?.eventDate) {
    // Filter by date (YYYY-MM-DD format)
    query = query.gte('date', `${options.eventDate}T00:00:00`)
                 .lt('date', `${options.eventDate}T23:59:59`);
  }

  if (options?.includeOnly !== false) {
    query = query.eq('include', true);
  }

  query = query.order('date', { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching lap times:', error);
    throw error;
  }

  return (data || []) as LapTime[];
}

/**
 * Get events summary with fastest driver info
 */
export async function getEventsSummary(): Promise<EventSummaryWithDriver[]> {
  const { data: summaryData, error: summaryError } = await supabase
    .from('events_summary')
    .select('*')
    .order('event_date', { ascending: false });

  if (summaryError) {
    console.error('Error fetching events summary:', summaryError);
    throw summaryError;
  }

  if (!summaryData || summaryData.length === 0) {
    return [];
  }

  // Get the fastest driver for each event
  const typedSummary: EventSummary[] = summaryData as unknown as EventSummary[];

  const eventsWithDrivers: EventSummaryWithDriver[] = await Promise.all(
    typedSummary.map(async (event: EventSummary): Promise<EventSummaryWithDriver> => {
      const { data: fastestLap, error: lapError } = await supabase
        .from('lap_times')
        .select('driver_name')
        .eq('include', true)
        .gte('date', `${event.event_date}T00:00:00`)
        .lt('date', `${event.event_date}T23:59:59`)
        .order('lap_time_seconds', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (lapError) {
        console.error('Error fetching fastest lap for event:', lapError);
      }

      return {
        ...event,
        fastest_driver: (fastestLap as { driver_name: string } | null)?.driver_name || 'Unknown',
      };
    })
  );

  return eventsWithDrivers;
}

/**
 * Get lap times for a specific event date
 */
export async function getEventLapTimes(eventDate: string) {
  return getLapTimes({ eventDate, includeOnly: true });
}

/**
 * Get statistics for a specific driver
 */
export async function getDriverStats(driverName: string) {
  const lapTimes = await getLapTimes({ driverName, includeOnly: true });

  if (lapTimes.length === 0) {
    return null;
  }

  const sorted = sortByLapTime(lapTimes);
  const bestLap = sorted[0];

  const totalTime = lapTimes.reduce(
    (sum, lap) => sum + lap.lap_time_seconds,
    0
  );
  const avgTime = totalTime / lapTimes.length;

  // Get unique event dates
  const uniqueEvents = new Set(
    lapTimes.map((lap) => lap.date.split('T')[0])
  );

  return {
    driver_name: driverName,
    best_lap: bestLap,
    average_time: avgTime,
    total_laps: lapTimes.length,
    events_count: uniqueEvents.size,
    all_laps: lapTimes,
  };
}

/**
 * Get all unique driver names
 */
export async function getDriverNames() {
  const { data, error } = await supabase
    .from('lap_times')
    .select('driver_name')
    .eq('include', true);

  if (error) {
    console.error('Error fetching driver names:', error);
    throw error;
  }

  const uniqueNames = Array.from(
    new Set(data?.map((item) => item.driver_name) || [])
  );

  return uniqueNames.sort();
}

/**
 * Get all unique event dates
 */
export async function getEventDates() {
  const { data, error } = await supabase
    .from('lap_times')
    .select('date')
    .eq('include', true);

  if (error) {
    console.error('Error fetching event dates:', error);
    throw error;
  }

  const uniqueDates = Array.from(
    new Set(data?.map((item) => item.date.split('T')[0]) || [])
  );

  return uniqueDates.sort((a, b) => b.localeCompare(a)); // Descending
}
