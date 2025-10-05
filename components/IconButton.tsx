'use client';

import { ReactNode } from 'react';

interface IconButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function IconButton({ onClick, children, className = '', ariaLabel }: IconButtonProps) {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`group flex items-center justify-center overflow-hidden p-0 relative rounded-[4px] shrink-0 size-[32px] hover:bg-background-strong transition-colors ${className}`}
      {...(onClick && ariaLabel ? { 'aria-label': ariaLabel } : {})}
      {...(onClick ? { type: 'button' } : {})}
    >
      {children}
    </Component>
  );
}
