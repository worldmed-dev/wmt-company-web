'use client';

import { motion } from 'framer-motion';

const PAGE_TRANSITION = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1],
} as const;

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={`${className ?? ''} will-change-transform will-change-opacity`}
      initial={{ x: 18, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={PAGE_TRANSITION}
    >
      {children}
    </motion.div>
  );
}
