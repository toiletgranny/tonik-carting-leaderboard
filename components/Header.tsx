'use client';

import { Logo } from './Logo';
import { IconButton } from './IconButton';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export function Header({ title, subtitle = "Le Mans Jaryszki ・ 90 kg", showBackButton = false }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-black border-b border-border-muted w-full">
      <div className="flex flex-col items-center justify-center px-section-padding py-0">
        <div className="flex flex-col gap-default items-start max-w-section overflow-hidden px-0 py-large w-full">
          <div className="flex gap-small items-center">
            {showBackButton && (
              <div className="flex items-center h-full">
                <div className="flex gap-[8px] h-full items-center relative shrink-0">
                  <IconButton onClick={() => router.back()} ariaLabel="Go back">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-content-default group-hover:text-content-strong transition-colors"
                    >
                      <path 
                        d="M15 18L9 12L15 6" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </IconButton>
                  <div className="bg-border-muted h-full shrink-0 w-px" />
                </div>
              </div>
            )}
            <Logo className="overflow-hidden relative shrink-0 size-[32px] text-white" />
          </div>
          <div className="flex flex-col gap-[8px] items-start justify-end min-h-[112px] uppercase w-full">
            <p className="text-body-default text-content-default leading-[24px] w-full">
              {subtitle}
            </p>
            <h1 className="text-title text-content-strong font-medium leading-[48px] tracking-[-0.2px] w-full">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
