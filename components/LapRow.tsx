'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LapTime } from '@/lib/supabase/types';

interface LapRowProps {
  lap: LapTime;
  showGap: boolean;
  gap?: string;
  isTopThree: boolean;
  // session: used on event details pages → links to driver and shows driver name
  // driver: used on driver details pages → links to event and shows session time
  variant: 'session' | 'driver';
}

export function LapRow({ lap, showGap, gap, isTopThree, variant }: LapRowProps) {
  const getMedalColor = (place: number) => {
    switch (place) {
      case 1:
        return 'bg-accent-gold';
      case 2:
        return 'bg-accent-silver';
      case 3:
        return 'bg-accent-bronze';
      default:
        return '';
    }
  };

  const getBorderColor = (place: number) => {
    switch (place) {
      case 1:
        return 'bg-accent-gold';
      case 2:
        return 'bg-accent-silver';
      case 3:
        return 'bg-accent-bronze';
      default:
        return '';
    }
  };

  const { href, title } = (() => {
    if (variant === 'session') {
      return {
        href: `/drivers/${encodeURIComponent(lap.driver_name)}`,
        title: lap.driver_name,
      };
    }

    // variant === 'driver'
    const eventDate = lap.date.split('T')[0];
    return {
      href: `/events/${eventDate}`,
      title: lap.session_time,
    };
  })();

  if (!isTopThree) {
    // Variant 4+: Simple place number, no medal, no colored border
    return (
      <Link href={href} className="bg-background-muted hover:bg-background-default border-b border-border-muted w-full block relative overflow-hidden group">
        <div className="flex gap-small isolate items-center p-default relative w-full">
          <div className="bg-background-default border border-border-muted flex flex-col items-center justify-center relative rounded-full shrink-0 size-[32px] z-[3]">
            <p className="text-body-default text-center text-content-strong leading-[24px]">
              {lap.place}
            </p>
          </div>
          <div className="basis-0 flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0 z-[2]">
            <div className="basis-0 flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
              <p className="text-body-default text-content-strong overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                {title}
              </p>
            </div>
            <div className="flex gap-[8px] items-baseline justify-end relative shrink-0">
              {showGap && gap && (
                <p className="text-body-small text-content-default">
                  {gap}
                </p>
              )}
              <p className="text-body-default text-content-strong text-right">
                {lap.lap_time_display}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Variant 1-3: Top 3 with medal and colored border
  return (
    <Link href={href} className="bg-background-muted hover:bg-background-default border-b border-border-muted w-full block relative overflow-hidden group">
      <div className="flex gap-small isolate items-center p-default relative w-full">
        <div className="flex isolate items-center pl-0 pr-[8px] py-0 relative shrink-0 z-[4]">
          {/* Place number */}
          <div className="bg-background-default border border-border-muted flex flex-col items-center justify-center mr-[-8px] relative rounded-full shrink-0 size-[32px] z-[2]">
            <p className="text-body-default text-center text-content-strong leading-[24px]">
              {lap.place}
            </p>
          </div>
          {/* Medal icon */}
          <div className="bg-background-default border border-border-muted flex flex-col gap-[8px] items-center justify-center mr-[-8px] pb-[8px] pt-[6px] px-[8px] relative rounded-full shrink-0 size-[32px] z-[1]">
            <div className="grid grid-cols-1 grid-rows-1 w-[24px] h-[24px] relative">
              <div 
                className="col-start-1 row-start-1 w-full h-full" 
                style={{
                  maskImage: 'url(/trophy-mask.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(/trophy-mask.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              >
                <Image
                  src="/trophy.png"
                  alt="Trophy"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <div 
                className={`col-start-1 row-start-1 w-full h-full ${getMedalColor(lap.place || 1)} mix-blend-hue`}
                style={{
                  maskImage: 'url(/trophy-mask.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(/trophy-mask.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>
        <div className="basis-0 flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0 z-[3]">
          <div className="basis-0 flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
            <p className="text-body-default text-content-strong overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
              {title}
            </p>
          </div>
          <div className="flex gap-[8px] items-baseline justify-end relative shrink-0">
            {showGap && gap && (
              <p className="text-body-small text-content-default">
                {gap}
              </p>
            )}
            <p className="text-body-default text-content-strong text-right">
              {lap.lap_time_display}
            </p>
          </div>
        </div>
        {/* Colored left border */}
        <div className={`absolute ${getBorderColor(lap.place || 1)} bottom-0 left-0 top-0 w-[4px] z-[2]`} />
      </div>
    </Link>
  );
}


