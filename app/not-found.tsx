import Link from 'next/link';
import { PageShell } from '@/components/PageShell';

export default function NotFound() {
  return (
    <PageShell headerTitle="404" headerSubtitle="Page not found">
      <div className="flex flex-col items-center justify-center max-w-inherit overflow-x-hidden overflow-y-auto pb-footer pt-0 px-0 relative size-full">
        <div className="flex flex-col gap-default items-center p-default text-center">
          <p className="text-body-large text-content-default">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="bg-background-strong border border-border-strong px-[16px] py-[12px] rounded-full text-body-default text-white hover:bg-background-default transition-colors"
          >
            Go to Leaderboard
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
