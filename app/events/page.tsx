import { PageShell } from '@/components/PageShell';
import { EventRow } from '@/components/EventRow';
import { getEventsSummary } from '@/lib/data/queries';
import type { EventSummaryWithDriver } from '@/lib/supabase/types';

export const revalidate = 60;

export default async function EventsPage() {
  const events: EventSummaryWithDriver[] = await getEventsSummary();

  return (
    <PageShell headerTitle="Events">
      {events.length === 0 ? (
        <div className="flex items-center justify-center w-full p-default">
          <p className="text-content-default">No events recorded yet.</p>
        </div>
      ) : (
        events.map((event: EventSummaryWithDriver) => (
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
    </PageShell>
  );
}
