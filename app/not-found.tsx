import Link from 'next/link';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';

export default function NotFound() {
  return (
    <div className="bg-black flex flex-col gap-px items-center relative min-h-screen">
      <Header title="404" subtitle="Page not found" />
      
      <main className="basis-0 bg-black flex flex-col grow min-h-px min-w-px overflow-hidden px-section-padding py-0 relative w-full">
        <div className="basis-0 bg-black border-x border-border-muted grow max-w-section min-h-px min-w-px relative w-full">
          <div className="flex flex-col items-center justify-center max-w-inherit overflow-x-hidden overflow-y-auto pb-footer pt-0 px-0 relative size-full">
            <div className="flex flex-col gap-default items-center p-default text-center">
              <p className="text-body-large text-content-default">
                The page you're looking for doesn't exist.
              </p>
              <Link
                href="/"
                className="bg-background-strong border border-border-strong px-[16px] py-[12px] rounded-full text-body-default text-white hover:bg-background-default transition-colors"
              >
                Go to Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
