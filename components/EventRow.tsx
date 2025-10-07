import Link from 'next/link';
import { Calendar } from './Calendar';
import { IconButton } from './IconButton';

interface EventRowProps {
  eventDate: string;
  sessionCount: number;
  driverCount: number;
  totalLaps: number;
  fastestDriver: string;
}

export function EventRow({
  eventDate,
  sessionCount,
  driverCount,
  totalLaps,
  fastestDriver,
}: EventRowProps) {
  const date = new Date(eventDate);
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString();
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`/events/${eventDate}`}
      className="bg-background-muted hover:bg-background-default border-b border-border-muted w-full block group"
    >
      <div className="flex flex-col gap-small isolate items-start justify-center p-default relative w-full">
        {/* Header with Calendar */}
        <div className="flex isolate items-center pl-0 pr-[8px] py-0 relative shrink-0 w-full z-[3]">
          <Calendar month={month} day={day} />
        </div>

        {/* Content */}
        <div className="flex gap-[8px] items-start relative shrink-0 w-full z-[2]">
          <div className="basis-0 flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
            <p className="text-body-large text-content-strong uppercase w-full">
              {formattedDate}
            </p>
            <div className="flex flex-wrap gap-[4px] items-start relative shrink-0 w-full">
              <div className="flex gap-[4px] items-center text-body-small text-content-default whitespace-nowrap">
                <span>{sessionCount}</span>
                <span>{sessionCount === 1 ? 'session' : 'sessions'}</span>
              </div>
              <span className="text-body-small text-content-default">
                ・
              </span>
              <div className="flex gap-[4px] items-center text-body-small text-content-default whitespace-nowrap">
                <span>{driverCount}</span>
                <span>{driverCount === 1 ? 'participant' : 'participants'}</span>
              </div>
              <span className="text-body-small text-content-default">
                ・
              </span>
              <div className="flex gap-[4px] items-center text-body-small text-content-default whitespace-nowrap">
                <span>Best:</span>
                <span>{fastestDriver}</span>
              </div>
            </div>
          </div>

          {/* Icon Button with Chevron */}
          <div className="flex flex-col items-center justify-center relative self-stretch shrink-0">
            <IconButton>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-content-default group-hover:text-content-strong"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          </div>
        </div>
      </div>
    </Link>
  );
}
