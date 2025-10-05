import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { Calendar } from '@/components/Calendar';
import { DriverLapRow } from '@/components/DriverLapRow';
import { getDriverStats } from '@/lib/data/queries';
import { formatLapTime } from '@/lib/utils/time';
import { groupByEvent } from '@/lib/utils/grouping';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface DriverDetailsPageProps {
  params: {
    name: string;
  };
}

export default async function DriverDetailsPage({ params }: DriverDetailsPageProps) {
  const driverName = decodeURIComponent(params.name);

  const stats = await getDriverStats(driverName);

  if (!stats) {
    notFound();
  }

  const eventGroups = groupByEvent(stats.all_laps);
  const sortedEvents = Array.from(eventGroups.entries()).sort(
    ([dateA], [dateB]) => dateB.localeCompare(dateA)
  );

  return (
    <div className="bg-black flex flex-col gap-px items-center relative min-h-screen">
      <Header title={driverName.toUpperCase()} subtitle="Le Mans Jaryszki ・ 90 kg" showBackButton={true} />
      
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
            
            {/* Statistics Section */}
            <div className="border-b border-border-muted relative shrink-0 w-full">
              <div className="flex flex-col isolate items-start overflow-hidden relative w-full">
                {/* Statistics header - sticky */}
                <div 
                  className="bg-black border-b border-border-muted shrink-0 sticky top-0 w-full"
                  style={{
                    backgroundImage: 'url(/pattern.svg)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: '8px 8px',
                  }}
                >
                  <div className="flex gap-small isolate items-center p-default relative w-full">
                    <p className="basis-0 text-body-large text-content-strong leading-[28px] uppercase grow min-h-px min-w-px z-[1]">
                      Statistics
                    </p>
                  </div>
                </div>
                {/* Stats grid */}
                <div className="bg-border-muted flex flex-wrap gap-px items-start relative shrink-0 w-full">
                  <div className="basis-0 bg-background-muted flex flex-col gap-[4px] grow isolate items-start justify-center min-h-px min-w-[256px] p-default shrink-0">
                    <p className="text-body-small text-content-default leading-[16px] tracking-[0.1px] w-full overflow-ellipsis overflow-hidden whitespace-nowrap z-[2]">
                      Best Lap
                    </p>
                    <p className="text-body-large text-content-strong leading-[28px] uppercase w-full overflow-ellipsis overflow-hidden whitespace-nowrap z-[1]">
                      {stats.best_lap.lap_time_display}
                    </p>
                  </div>
                  <div className="basis-0 bg-background-muted flex flex-col gap-[4px] grow isolate items-start justify-center min-h-px min-w-[256px] p-default shrink-0">
                    <p className="text-body-small text-content-default leading-[16px] tracking-[0.1px] w-full overflow-ellipsis overflow-hidden whitespace-nowrap z-[2]">
                      Average Lap
                    </p>
                    <p className="text-body-large text-content-strong leading-[28px] uppercase w-full overflow-ellipsis overflow-hidden whitespace-nowrap z-[1]">
                      {formatLapTime(stats.average_time)}
                    </p>
                  </div>
                  <div className="basis-0 bg-background-muted flex flex-col gap-[4px] grow isolate items-start justify-center min-h-px min-w-[256px] p-default shrink-0">
                    <p className="text-body-small text-content-default leading-[16px] tracking-[0.1px] w-full overflow-ellipsis overflow-hidden whitespace-nowrap z-[2]">
                      Total Laps Recorded
                    </p>
                    <p className="text-body-large text-content-strong leading-[28px] uppercase w-full overflow-ellipsis overflow-hidden whitespace-nowrap z-[1]">
                      {stats.total_laps}
                    </p>
                  </div>
                  <div className="basis-0 bg-background-muted flex flex-col gap-[4px] grow isolate items-start justify-center min-h-px min-w-[256px] p-default shrink-0">
                    <p className="text-body-small text-content-default leading-[16px] tracking-[0.1px] w-full overflow-ellipsis overflow-hidden whitespace-nowrap z-[2]">
                      Total Events Recorded
                    </p>
                    <p className="text-body-large text-content-strong leading-[28px] uppercase w-full overflow-ellipsis overflow-hidden whitespace-nowrap z-[1]">
                      {stats.events_count}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lap History by Event */}
            <div className="flex flex-col items-start relative shrink-0 w-full">
              {sortedEvents.map(([eventDate, laps]) => {
                const sortedLaps = [...laps].sort(
                  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                );

                const date = new Date(eventDate);
                const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                const day = date.getDate().toString();
                const fullDate = date.toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                // Get the fastest lap for this event to calculate gaps
                const fastestLap = sortedLaps[0];

                return (
                  <div key={eventDate} className="border-b border-border-muted relative shrink-0 w-full">
                    <div className="flex flex-col isolate items-start relative w-full">
                      {/* Event header - sticky */}
                      <div 
                        className="bg-black border-b border-border-muted shrink-0 sticky top-0 w-full z-[4]"
                        style={{
                          backgroundImage: 'url(/pattern.svg)',
                          backgroundRepeat: 'repeat',
                          backgroundSize: '8px 8px',
                        }}
                      >
                        <div className="flex gap-small isolate items-center p-default relative w-full">
                          <Calendar month={month} day={day} className="z-[2]" />
                          <p className="basis-0 text-body-large text-content-strong leading-[28px] uppercase grow min-h-px min-w-px z-[1]">
                            {fullDate}
                          </p>
                        </div>
                      </div>
                      {/* Lap times for this event */}
                      {sortedLaps.map((lap, index) => {
                        const isTopThree = lap.place !== null && lap.place <= 3;
                        const showGap = index > 0;
                        const gap = showGap && fastestLap
                          ? `+${(lap.lap_time_seconds - fastestLap.lap_time_seconds).toFixed(3)}`
                          : undefined;

                        return (
                          <DriverLapRow
                            key={`${lap.session_time}-${lap.place}`}
                            lap={lap}
                            showGap={showGap}
                            gap={gap}
                            isTopThree={isTopThree}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
