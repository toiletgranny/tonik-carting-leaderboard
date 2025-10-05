'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navigation() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'events'>('leaderboard');

  // Load active tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab') as 'leaderboard' | 'events' | null;
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabClick = (tab: 'leaderboard' | 'events') => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-footer flex flex-col items-center justify-center px-section-padding py-0">
      <div className="grow max-w-section w-full relative [box-shadow:inset_1px_0_0_theme(colors.border.muted),inset_-1px_0_0_theme(colors.border.muted)]">
        <div className="flex flex-col items-center justify-center max-w-inherit overflow-hidden px-0 py-[32px] relative size-full">
          <div className="bg-background-default relative rounded-full z-[2] [box-shadow:0_0_0_1px_theme(colors.border.muted)]">
            <div className="flex items-center justify-center overflow-hidden p-[8px] relative rounded-inherit">
              <Link href="/" onClick={() => handleTabClick('leaderboard')}>
                {activeTab === 'leaderboard' ? (
                  <button 
                    className="bg-background-strong cursor-pointer flex gap-[8px] items-center justify-center overflow-visible px-[16px] py-[12px] relative rounded-full shrink-0 transition-colors [box-shadow:0_0_0_1px_theme(colors.border.strong)]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-content-strong">
                      <path d="M7.5 10.5V17.25H10.5V10.5H7.5ZM13.5 6.75V17.25H16.5V6.75H13.5ZM1.5 14.25V17.25H4.5V14.25H1.5ZM19.5 11.25V17.25H22.5V11.25H19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-body-default text-center text-content-strong leading-[24px]">
                      Leaderboard
                    </span>
                  </button>
                ) : (
                  <button className="group flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative rounded-full shrink-0 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-content-default group-hover:text-content-strong transition-colors">
                      <path d="M7.5 10.5V17.25H10.5V10.5H7.5ZM13.5 6.75V17.25H16.5V6.75H13.5ZM1.5 14.25V17.25H4.5V14.25H1.5ZM19.5 11.25V17.25H22.5V11.25H19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-body-default text-center text-content-default group-hover:text-content-strong leading-[24px] transition-colors">
                      Leaderboard
                    </span>
                  </button>
                )}
              </Link>
              <Link href="/events" onClick={() => handleTabClick('events')}>
                {activeTab === 'events' ? (
                  <button 
                    className="bg-background-strong cursor-pointer flex gap-[8px] items-center justify-center overflow-visible px-[16px] py-[12px] relative rounded-full shrink-0 transition-colors [box-shadow:0_0_0_1px_theme(colors.border.strong)]"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-content-strong">
                      <path d="M2.25 8.25C2.25 7.00736 3.25736 6 4.5 6H19.5C20.7426 6 21.75 7.00736 21.75 8.25V19.5C21.75 20.7426 20.7426 21.75 19.5 21.75H4.5C3.25736 21.75 2.25 20.7426 2.25 19.5V8.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.75 3.75V7.5M8.25 3.75V7.5M2.25 10.5H21.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-body-default text-center text-content-strong leading-[24px]">
                      Events
                    </span>
                  </button>
                ) : (
                  <button className="group flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative rounded-full shrink-0 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-content-default group-hover:text-content-strong transition-colors">
                      <path d="M2.25 8.25C2.25 7.00736 3.25736 6 4.5 6H19.5C20.7426 6 21.75 7.00736 21.75 8.25V19.5C21.75 20.7426 20.7426 21.75 19.5 21.75H4.5C3.25736 21.75 2.25 20.7426 2.25 19.5V8.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.75 3.75V7.5M8.25 3.75V7.5M2.25 10.5H21.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-body-default text-center text-content-default group-hover:text-content-strong leading-[24px] transition-colors">
                      Events
                    </span>
                  </button>
                )}
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden z-[1]">
            <div 
              className="absolute bg-background-muted inset-0"
              style={{
                maskImage: 'url(/footer-gradient-mask.svg)',
                WebkitMaskImage: 'url(/footer-gradient-mask.svg)',
                maskSize: '520px 128px',
                WebkitMaskSize: '520px 128px',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
