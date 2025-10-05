import { ReactNode } from 'react';
import { Header } from './Header';

interface PageShellProps {
  children: ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  showBackButton?: boolean;
  headerSlot?: ReactNode;
  contentClassName?: string;
}

export function PageShell({
  children,
  headerTitle,
  headerSubtitle,
  showBackButton,
  headerSlot,
  contentClassName,
}: PageShellProps) {
  return (
    <div className="bg-black flex flex-col gap-px items-center relative min-h-screen">
      {headerSlot ?? (
        headerTitle ? (
          <Header title={headerTitle} subtitle={headerSubtitle} showBackButton={showBackButton} />
        ) : null
      )}

      <main 
        className="basis-0 bg-black flex flex-col items-center grow min-h-px min-w-px overflow-hidden px-section-padding py-0 relative w-full"
        style={{
          backgroundImage: 'url(/pattern.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '8px 8px',
        }}
      >
        <div className="basis-0 bg-black border-x border-border-muted grow max-w-section min-h-px min-w-px relative w-full">
          <div className={contentClassName ?? "flex flex-col items-start max-w-inherit overflow-x-hidden overflow-y-auto pb-footer pt-0 px-0 relative size-full"}>
            {children}
          </div>
        </div>
      </main>

      {/* Navigation moved to app/layout to persist across route changes */}
    </div>
  );
}


