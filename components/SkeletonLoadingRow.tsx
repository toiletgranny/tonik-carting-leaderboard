import { Skeleton } from './Skeleton';

interface SkeletonLoadingRowProps {
  className?: string;
}

export function SkeletonLoadingRow({ className = '' }: SkeletonLoadingRowProps) {
  return (
    <div className={`bg-background-muted border-b border-border-muted h-[80px] relative shrink-0 w-full ${className}`}>
      <div className="flex gap-small isolate items-center p-default relative size-full">
        {/* Place number skeleton */}
        <div className="flex isolate items-center pl-0 pr-[8px] py-0 relative shrink-0 z-[2]">
          <Skeleton className="mr-[-8px] rounded-full shrink-0 size-[32px] z-[1]" />
        </div>
        
        {/* Content skeleton */}
        <div className="basis-0 flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0 z-[1]">
          {/* Name/time skeleton */}
          <div className="basis-0 flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
            <Skeleton className="h-[24px] rounded-[4px] shrink-0 w-[128px]" />
          </div>
          
          {/* Lap time skeleton */}
          <div className="flex gap-[8px] items-baseline justify-end relative shrink-0">
            <Skeleton className="h-[24px] rounded-[4px] shrink-0 w-[64px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
