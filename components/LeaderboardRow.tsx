import Link from 'next/link';
import Image from 'next/image';

interface LeaderboardRowProps {
  place: number;
  driverName: string;
  timestamp: string;
  lapTime: string;
  gap?: string;
  showGap?: boolean;
}

export function LeaderboardRow({
  place,
  driverName,
  timestamp,
  lapTime,
  gap,
  showGap = true,
}: LeaderboardRowProps) {
  const isTopThree = place <= 3;
  
  const getMedalColor = (position: number) => {
    switch (position) {
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

  const borderColor = getMedalColor(place);

  if (isTopThree) {
    return (
      <Link
        prefetch={false}
        href={`/drivers/${encodeURIComponent(driverName)}`}
        className="bg-background-muted border-b border-border-muted w-full block hover:bg-background-default"
      >
        <div className="flex flex-col gap-small isolate items-start justify-center p-default relative w-full">
          <div className="flex isolate items-center pr-[8px] pl-0 py-0 relative w-full z-[4]">
            <div className="bg-background-default border border-border-muted flex flex-col gap-[8px] items-center justify-center mr-[-8px] p-[8px] relative rounded-full shrink-0 size-[40px] z-[2]">
              <div className="flex flex-col grow justify-center min-h-px min-w-px text-body-default text-center text-white w-full">
                <p className="leading-[24px]">{place}</p>
              </div>
            </div>
            <div className="bg-background-default border border-border-muted flex flex-col gap-[8px] items-center justify-center mr-[-8px] pb-[8px] pt-[6px] px-[8px] relative rounded-full shrink-0 size-[40px] z-[1]">
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
                  className={`col-start-1 row-start-1 w-full h-full ${borderColor} mix-blend-hue`}
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
          <div className="flex gap-[8px] items-start relative w-full z-[3]">
            <div className="basis-0 flex flex-col gap-[4px] grow items-start min-h-px min-w-px">
              <p className="text-body-large leading-[28px] text-white uppercase w-full">
                {driverName}
              </p>
              <p className="text-body-small leading-[16px] text-content-default tracking-[0.1px] w-full">
                {timestamp}
              </p>
            </div>
            <div className="flex flex-col gap-[4px] items-end justify-center text-right whitespace-nowrap">
              <p className="text-body-large leading-[28px] text-white uppercase">
                {lapTime}
              </p>
              {showGap && gap && (
                <p className="text-body-small leading-[16px] text-content-default tracking-[0.1px]">
                  {gap}
                </p>
              )}
            </div>
          </div>
          <div className={`absolute ${borderColor} bottom-0 left-0 top-0 w-[4px] z-[2]`} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      prefetch={false}
      href={`/drivers/${encodeURIComponent(driverName)}`}
      className="bg-background-muted border-b border-border-muted w-full block hover:bg-background-default"
    >
      <div className="flex gap-small isolate items-center overflow-hidden p-default relative w-full">
        <div className="bg-background-default border border-border-muted flex flex-col gap-[8px] items-center justify-center p-[8px] relative rounded-full shrink-0 size-[40px] z-[3]">
          <div className="flex flex-col grow justify-center min-h-px min-w-px text-body-default text-center text-white w-full">
            <p className="leading-[24px]">{place}</p>
          </div>
        </div>
        <div className="basis-0 flex gap-[8px] grow items-start min-h-px min-w-px relative z-[2]">
          <div className="basis-0 flex flex-col gap-[4px] grow items-start min-h-px min-w-px">
            <p className="text-body-default leading-[24px] text-white w-full">
              {driverName}
            </p>
            <p className="text-body-small leading-[16px] text-content-default tracking-[0.1px] w-full">
              {timestamp}
            </p>
          </div>
          <div className="flex flex-col gap-[4px] items-end justify-center text-right whitespace-nowrap">
            <p className="text-body-default leading-[24px] text-white">
              {lapTime}
            </p>
            {showGap && gap && (
              <p className="text-body-small leading-[16px] text-content-default tracking-[0.1px]">
                {gap}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
