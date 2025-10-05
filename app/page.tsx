import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { getLeaderboard } from '@/lib/data/queries';
import { formatDate, calculateTimeDelta } from '@/lib/utils/time';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();

  return (
    <div className="bg-black flex flex-col gap-px items-center relative min-h-screen">
      <Header title="Leaderboard" />
      
      <main 
        className="basis-0 bg-black flex flex-col items-center grow min-h-px min-w-px overflow-hidden px-section-padding py-0 relative w-full"
        style={{
          backgroundImage: 'url(/pattern.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '8px 8px',
        }}
      >
        <div className="basis-0 bg-black border-x border-border-muted grow max-w-section min-h-px min-w-px relative w-full">
          <div className="flex flex-col items-start max-w-inherit overflow-x-hidden overflow-y-auto pb-footer pt-0 px-0 relative size-full">
            {leaderboard.length === 0 ? (
              <div className="flex items-center justify-center w-full p-default">
                <p className="text-content-default">No lap times recorded yet.</p>
              </div>
            ) : (
              leaderboard.map((entry, index) => {
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
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}