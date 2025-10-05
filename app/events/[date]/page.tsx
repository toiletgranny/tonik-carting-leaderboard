import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { LapRow } from '@/components/LapRow';
import { getEventLapTimes } from '@/lib/data/queries';
import { getUniqueSessions } from '@/lib/utils/grouping';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface EventDetailsPageProps {
  params: {
    date: string;
  };
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { date } = params;

  const lapTimes = await getEventLapTimes(date);

  if (lapTimes.length === 0) {
    notFound();
  }

  const sessions = getUniqueSessions(lapTimes);

  const eventDate = new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-black flex flex-col gap-px items-center relative min-h-screen">
      <Header title={eventDate} subtitle="Event Details" showBackButton={true} />
      
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
            {sessions.map((sessionTime) => {
              const sessionLaps = lapTimes.filter(
                (lap) => lap.session_time === sessionTime
              ).sort((a, b) => {
                if (a.place === null) return 1;
                if (b.place === null) return -1;
                return a.place - b.place;
              });

              // Get the fastest lap for this session to calculate gaps
              const fastestLap = sessionLaps[0];

              return (
                <div key={sessionTime} className="border-b border-border-muted relative shrink-0 w-full">
                  <div className="flex flex-col isolate items-start relative w-full">
                    {/* Session header - sticky */}
                    <div 
                      className="bg-black border-b border-border-muted shrink-0 sticky top-0 w-full z-[12]"
                      style={{
                        backgroundImage: 'url(/pattern.svg)',
                        backgroundRepeat: 'repeat',
                        backgroundSize: '8px 8px',
                      }}
                    >
                      <div className="flex flex-col isolate items-start justify-center p-default relative w-full">
                        <p className="text-body-large text-content-strong leading-[28px] uppercase w-full z-[1]">
                          {sessionTime}
                        </p>
                      </div>
                    </div>
                    {/* Lap times */}
                    {sessionLaps.map((lap, index) => {
                      const isTopThree = lap.place !== null && lap.place <= 3;
                      const showGap = index > 0;
                      const gap = showGap && fastestLap
                        ? `+${(lap.lap_time_seconds - fastestLap.lap_time_seconds).toFixed(3)}`
                        : undefined;

                      return (
                        <LapRow
                          key={`${lap.driver_name}-${lap.place}`}
                          lap={lap}
                          showGap={showGap}
                          gap={gap}
                          isTopThree={isTopThree}
                          variant="session"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
