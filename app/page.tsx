import { PageShell } from '@/components/PageShell';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { getLeaderboard } from '@/lib/data/queries';
import type { LeaderboardEntry } from '@/lib/supabase/types';
import { formatDate, calculateTimeDelta } from '@/lib/utils/time';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function LeaderboardPage() {
  const leaderboard: LeaderboardEntry[] = await getLeaderboard();

  return (
    <PageShell headerTitle="Leaderboard">
      {leaderboard.length === 0 ? (
        <div className="flex items-center justify-center w-full p-default">
          <p className="text-content-default">No lap times recorded yet.</p>
        </div>
      ) : (
        leaderboard.map((entry: LeaderboardEntry, index: number) => {
          const place = index + 1;
          const showGap = place > 1;
          const gap = showGap
            ? calculateTimeDelta(
                entry.lap_time_seconds,
                leaderboard[index - 1].lap_time_seconds
              )
            : undefined;

          return (
            <LeaderboardRow
              key={entry.driver_name}
              place={place}
              driverName={entry.driver_name}
              timestamp={formatDate(entry.date, 'long')}
              lapTime={entry.lap_time_display}
              gap={gap}
              showGap={showGap}
            />
          );
        })
      )}
    </PageShell>
  );
}