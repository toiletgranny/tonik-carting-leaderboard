'use client';

import { useEffect } from 'react';
import { PageShell } from '@/components/PageShell';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell headerTitle="Error" headerSubtitle="Something went wrong">
      <div className="flex flex-col items-center justify-center max-w-inherit overflow-x-hidden overflow-y-auto pb-footer pt-0 px-0 relative size-full">
        <div className="flex flex-col gap-default items-center p-default text-center">
          <p className="text-body-large text-content-default">
            {error.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={reset}
            className="bg-background-strong border border-border-strong px-[16px] py-[12px] rounded-full text-body-default text-white hover:bg-background-default transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </PageShell>
  );
}
