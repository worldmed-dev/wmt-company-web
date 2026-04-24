'use client';

import { motion, AnimatePresence } from 'framer-motion';

const TRANSITION_IN = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
} as const;

const TRANSITION_OUT = {
  duration: 0.5,
  ease: [0.4, 0, 1, 1],
} as const;

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
  pathname?: string;
};

export function PageTransition({ children, className, pathname }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={`${className ?? ''} will-change-transform will-change-opacity overflow-x-hidden`}
        initial={{ x: '60px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0, transition: TRANSITION_OUT }}
        transition={TRANSITION_IN}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
