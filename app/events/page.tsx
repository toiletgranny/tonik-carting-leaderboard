import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { EventRow } from '@/components/EventRow';
import { getEventsSummary } from '@/lib/data/queries';

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getEventsSummary();

  return (
    <div className="bg-black flex flex-col gap-px items-center relative min-h-screen">
      <Header title="Events" />
      
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
            {events.length === 0 ? (
              <div className="flex items-center justify-center w-full p-default">
                <p className="text-content-default">No events recorded yet.</p>
              </div>
            ) : (
              events.map((event) => (
                <EventRow
                  key={event.event_date}
                  eventDate={event.event_date}
                  sessionCount={event.session_count}
                  driverCount={event.driver_count}
                  totalLaps={event.total_laps}
                  fastestDriver={event.fastest_driver}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
