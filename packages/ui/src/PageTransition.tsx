'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const TRANSITION_IN = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
} as const;

const TRANSITION_OUT = {
  duration: 0.5,
  ease: [0.4, 0, 1, 1],
} as const;

const variants = {
  enter: (dir: number) => ({ x: dir === 1 ? '60px' : '-60px', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir === 1 ? '-60px' : '60px', opacity: 0 }),
};

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
  pathname?: string;
};

export function PageTransition({ children, className, pathname }: PageTransitionProps) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const handlePopState = () => setDirection(-1);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      const t = setTimeout(() => setDirection(1), 1500);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={TRANSITION_IN}
        className={`${className ?? ''} will-change-transform will-change-opacity overflow-x-hidden`}
        style={{ ['--exit-transition' as string]: JSON.stringify(TRANSITION_OUT) }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
