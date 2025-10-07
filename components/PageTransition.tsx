'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useNavigation } from './NavigationContext';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { direction } = useNavigation();
  const isBack = direction === 'back';

  return (
    <motion.div
      initial={{ opacity: 0, x: isBack ? -8 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isBack ? 8 : -8 }}
      transition={{ 
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

