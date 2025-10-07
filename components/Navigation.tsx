'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export function Navigation() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'events'>('leaderboard');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leaderRef = useRef<HTMLButtonElement | null>(null);
  const eventsRef = useRef<HTMLButtonElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Load active tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab') as 'leaderboard' | 'events' | null;
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabClick = (tab: 'leaderboard' | 'events') => {
    // Enable animation only when user interacts
    setShouldAnimate(true);
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    const target = activeTab === 'leaderboard' ? leaderRef.current : eventsRef.current;
    if (!container || !target) return;
    // Use offsetLeft/offsetWidth relative to the positioned container for pixel-perfect alignment
    const left = target.offsetLeft;
    const width = target.offsetWidth;
    setIndicatorStyle({ left, width });
  }, [activeTab]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const onResize = () => updateIndicator();
    window.addEventListener('resize', onResize);
    const raf = requestAnimationFrame(updateIndicator);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [updateIndicator]);

  // After an animated change, reset animation flag so non-interactive updates don't animate
  useEffect(() => {
    if (!shouldAnimate) return;
    const timer = setTimeout(() => setShouldAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab, shouldAnimate]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-footer flex flex-col items-center justify-center px-section-padding py-0">
      <div className="grow max-w-section w-full relative border-x border-border-muted">
        <div className="flex flex-col items-center justify-center max-w-inherit overflow-hidden px-0 py-[32px] relative size-full">
          <div className="bg-background-default relative rounded-full z-[2] [box-shadow:0_0_0_1px_theme(colors.border.muted)]">
            <div ref={containerRef} className="relative flex items-center justify-center overflow-hidden p-[8px] rounded-inherit">
              {/* Sliding indicator behind labels */}
              <motion.div
                className="absolute top-[8px] bottom-[8px] rounded-full bg-background-strong [box-shadow:0_0_0_1px_theme(colors.border.strong)]"
                animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                transition={shouldAnimate ? { 
                  duration: 0.2,
                  ease: [0.25, 0.1, 0.25, 1]
                } : { duration: 0 }}
              />
              <Link href="/" onClick={() => handleTabClick('leaderboard')}>
                <button
                  ref={leaderRef}
                  className="group relative z-[1] cursor-pointer flex gap-[8px] items-center justify-center overflow-visible px-[16px] py-[12px] rounded-full shrink-0"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={activeTab === 'leaderboard' ? 'text-content-strong' : 'text-content-default group-hover:text-content-strong'}>
                    <path d="M23.75 7.50002C23.7504 7.08889 23.6542 6.68342 23.4691 6.31628C23.2841 5.94914 23.0154 5.6306 22.6847 5.38632C22.354 5.14204 21.9705 4.97885 21.5652 4.90991C21.1599 4.84096 20.7441 4.86818 20.3512 4.98937C19.9583 5.11057 19.5994 5.32235 19.3034 5.60765C19.0074 5.89296 18.7825 6.24381 18.6469 6.63194C18.5113 7.02006 18.4688 7.43462 18.5227 7.8422C18.5767 8.24977 18.7256 8.63898 18.9575 8.97846L16.446 12.0722L14.1875 6.88127C14.5994 6.5346 14.8948 6.06967 15.0335 5.54949C15.1723 5.02931 15.1477 4.47905 14.9632 3.97328C14.7787 3.46752 14.4432 3.03072 14.002 2.72209C13.5609 2.41346 13.0356 2.24792 12.4972 2.24792C11.9588 2.24792 11.4335 2.41346 10.9924 2.72209C10.5512 3.03072 10.2157 3.46752 10.0312 3.97328C9.84667 4.47905 9.82213 5.02931 9.96089 5.54949C10.0996 6.06967 10.395 6.5346 10.8069 6.88127L8.55408 12.0694L6.04251 8.97565C6.36515 8.50291 6.52443 7.93768 6.49612 7.36604C6.4678 6.7944 6.25343 6.24768 5.88566 5.80915C5.51788 5.37061 5.01686 5.06429 4.45889 4.93683C3.90092 4.80938 3.31659 4.86778 2.79488 5.10313C2.27317 5.33849 1.84268 5.73791 1.56897 6.24056C1.29526 6.7432 1.19333 7.32154 1.2787 7.88747C1.36407 8.45341 1.63207 8.97594 2.04188 9.37547C2.45169 9.77501 2.98084 10.0297 3.54876 10.1006L4.90626 18.2466C4.96462 18.5968 5.14532 18.915 5.4162 19.1445C5.68708 19.374 6.0306 19.5 6.38564 19.5H18.6144C18.9694 19.5 19.3129 19.374 19.5838 19.1445C19.8547 18.915 20.0354 18.5968 20.0938 18.2466L21.4503 10.1044C22.0852 10.0251 22.6692 9.7167 23.0927 9.23712C23.5162 8.75754 23.7499 8.13981 23.75 7.50002ZM12.5 3.75002C12.7225 3.75002 12.94 3.816 13.125 3.93962C13.31 4.06324 13.4542 4.23894 13.5394 4.44451C13.6245 4.65007 13.6468 4.87627 13.6034 5.0945C13.56 5.31273 13.4528 5.51319 13.2955 5.67052C13.1382 5.82785 12.9377 5.935 12.7195 5.97841C12.5013 6.02182 12.2751 5.99954 12.0695 5.91439C11.8639 5.82924 11.6882 5.68505 11.5646 5.50004C11.441 5.31504 11.375 5.09753 11.375 4.87502C11.375 4.57666 11.4935 4.29051 11.7045 4.07953C11.9155 3.86855 12.2016 3.75002 12.5 3.75002ZM2.75001 7.50002C2.75001 7.27752 2.816 7.06001 2.93961 6.87501C3.06323 6.69 3.23893 6.54581 3.4445 6.46066C3.65006 6.37551 3.87626 6.35323 4.09449 6.39664C4.31272 6.44005 4.51318 6.5472 4.67051 6.70453C4.82784 6.86186 4.93499 7.06232 4.9784 7.28055C5.02181 7.49878 4.99953 7.72498 4.91438 7.93054C4.82923 8.13611 4.68504 8.31181 4.50003 8.43543C4.31503 8.55904 4.09752 8.62502 3.87501 8.62502C3.57665 8.62502 3.2905 8.5065 3.07952 8.29552C2.86854 8.08454 2.75001 7.79839 2.75001 7.50002ZM18.6144 18H6.38564L5.08064 10.1738L8.16783 13.9688C8.23775 14.0561 8.32632 14.1267 8.42706 14.1754C8.52779 14.224 8.63814 14.2495 8.75002 14.25C8.78388 14.2502 8.81771 14.248 8.85127 14.2435C8.97904 14.2261 9.10017 14.1761 9.20297 14.0982C9.30577 14.0204 9.38677 13.9174 9.43814 13.7991L12.185 7.48034C12.3942 7.50657 12.6058 7.50657 12.815 7.48034L15.5619 13.7991C15.6133 13.9174 15.6943 14.0204 15.7971 14.0982C15.8999 14.1761 16.021 14.2261 16.1488 14.2435C16.1823 14.248 16.2162 14.2502 16.25 14.25C16.3619 14.2495 16.4722 14.224 16.573 14.1754C16.6737 14.1267 16.7623 14.0561 16.8322 13.9688L19.9194 10.17L18.6144 18ZM21.125 8.62502C20.9025 8.62502 20.685 8.55904 20.5 8.43543C20.315 8.31181 20.1708 8.13611 20.0857 7.93054C20.0005 7.72498 19.9782 7.49878 20.0216 7.28055C20.065 7.06232 20.1722 6.86186 20.3295 6.70453C20.4869 6.5472 20.6873 6.44005 20.9055 6.39664C21.1238 6.35323 21.35 6.37551 21.5555 6.46066C21.7611 6.54581 21.9368 6.69 22.0604 6.87501C22.184 7.06001 22.25 7.27752 22.25 7.50002C22.25 7.79839 22.1315 8.08454 21.9205 8.29552C21.7095 8.5065 21.4234 8.62502 21.125 8.62502Z" fill="currentColor"/>
                  </svg>
                  <span className={`text-body-default text-center ${activeTab === 'leaderboard' ? 'text-content-strong' : 'text-content-default group-hover:text-content-strong'}`}>
                    Leaderboard
                  </span>
                </button>
              </Link>
              <Link href="/events" onClick={() => handleTabClick('events')}>
                <button
                  ref={eventsRef}
                  className="group relative z-[1] cursor-pointer flex gap-[8px] items-center justify-center overflow-visible px-[16px] py-[12px] rounded-full shrink-0"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={activeTab === 'events' ? 'text-content-strong' : 'text-content-default group-hover:text-content-strong'}>
                    <path d="M22.8809 4.09406C22.813 3.98848 22.7196 3.90165 22.6093 3.84154C22.4991 3.78143 22.3755 3.74995 22.25 3.75H14.75C14.606 3.75006 14.4651 3.79154 14.3441 3.86951C14.2231 3.94748 14.1271 4.05863 14.0675 4.18969L13.2444 6H3.12499C2.97971 6.00001 2.83757 6.04222 2.71582 6.12149C2.59408 6.20076 2.49798 6.31368 2.4392 6.44654C2.38042 6.57939 2.36148 6.72646 2.3847 6.86987C2.40792 7.01328 2.47229 7.14686 2.56999 7.25437L5.86155 10.875L2.56999 14.4956C2.47229 14.6031 2.40792 14.7367 2.3847 14.8801C2.36148 15.0235 2.38042 15.1706 2.4392 15.3035C2.49798 15.4363 2.59408 15.5492 2.71582 15.6285C2.83757 15.7078 2.97971 15.75 3.12499 15.75H9.97718C10.1211 15.7499 10.262 15.7085 10.3831 15.6305C10.5041 15.5525 10.6001 15.4414 10.6597 15.3103L11.4828 13.5H17.3356L14.0675 20.6897C14.0236 20.7797 13.9982 20.8777 13.9928 20.9777C13.9874 21.0777 14.0021 21.1778 14.036 21.2721C14.0699 21.3663 14.1223 21.4529 14.1902 21.5265C14.2581 21.6002 14.3401 21.6595 14.4313 21.7009C14.5225 21.7424 14.6211 21.7652 14.7212 21.7679C14.8213 21.7707 14.921 21.7533 15.0143 21.7169C15.1076 21.6805 15.1927 21.6258 15.2645 21.5559C15.3364 21.4861 15.3935 21.4026 15.4325 21.3103L22.9325 4.81031C22.9845 4.69614 23.007 4.57075 22.998 4.44562C22.989 4.32048 22.9487 4.19961 22.8809 4.09406ZM9.49436 14.25H4.81999L7.42999 11.3794C7.55542 11.2413 7.62492 11.0615 7.62492 10.875C7.62492 10.6885 7.55542 10.5087 7.42999 10.3706L4.81999 7.5H12.5628L9.49436 14.25ZM18.0172 12H12.1644L15.2328 5.25H21.0856L18.0172 12Z" fill="currentColor"/>
                  </svg>
                  <span className={`text-body-default text-center ${activeTab === 'events' ? 'text-content-strong' : 'text-content-default group-hover:text-content-strong'}`}>
                    Events
                  </span>
                </button>
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
