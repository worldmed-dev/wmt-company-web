'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

const NAVBAR_OFFSET_PX = 112;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let lenis: Lenis | null = null;

    function startLenis() {
      if (mediaQuery.matches || lenis) {
        return;
      }

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.08,
        anchors: {
          offset: NAVBAR_OFFSET_PX,
        },
      });
    }

    function stopLenis() {
      lenis?.destroy();
      lenis = null;
    }

    function handleReducedMotionChange() {
      if (mediaQuery.matches) {
        stopLenis();
        return;
      }

      startLenis();
    }

    startLenis();
    mediaQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      stopLenis();
    };
  }, []);

  return <>{children}</>;
}
