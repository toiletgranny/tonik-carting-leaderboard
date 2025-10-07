'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type NavigationDirection = 'forward' | 'back';

interface NavigationContextType {
  direction: NavigationDirection;
  setDirection: (direction: NavigationDirection) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  direction: 'forward',
  setDirection: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<NavigationDirection>('forward');

  return (
    <NavigationContext.Provider value={{ direction, setDirection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

