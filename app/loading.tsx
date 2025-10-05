import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';
import { Skeleton } from '@/components/Skeleton';
import { SkeletonLoadingRow } from '@/components/SkeletonLoadingRow';

export default function Loading() {
  return (
    <div className="bg-black flex flex-col gap-px items-center relative min-h-screen">
      {/* Header with skeleton */}
      <div className="bg-black border-b border-border-muted w-full">
        <div className="flex flex-col items-center justify-center px-section-padding py-0">
          <div className="flex flex-col gap-default items-start max-w-section overflow-hidden px-0 py-large w-full">
            <div className="flex gap-small items-center">
              <Logo className="overflow-hidden relative shrink-0 size-[32px] text-white" />
            </div>
            <div className="flex flex-col gap-[8px] items-start justify-end min-h-[112px] uppercase w-full">
              <p className="text-body-default text-content-default leading-[24px] w-full">
                Le Mans Jaryszki ・ 90 kg
              </p>
              <Skeleton className="h-[48px] rounded-[4px] shrink-0 w-[256px]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content with skeleton rows */}
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
            {Array.from({ length: 9 }).map((_, index) => (
              <SkeletonLoadingRow key={index} />
            ))}
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}