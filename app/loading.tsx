import { Logo } from '@/components/Logo';
import { PageShell } from '@/components/PageShell';
import { Skeleton } from '@/components/Skeleton';
import { SkeletonLoadingRow } from '@/components/SkeletonLoadingRow';

export default function Loading() {
  return (
    <PageShell
      headerSlot={(
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
      )}
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonLoadingRow key={index} />
      ))}
    </PageShell>
  );
}