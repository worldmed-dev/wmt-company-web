'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCategoryBar } from './CategoryBarContext';

const NAVBAR_H = 96;
const CATEGORY_BAR_H = 56;

export function AppShell({ navbar, children }: { navbar: React.ReactNode; children: React.ReactNode }) {
  const { title, pinned } = useCategoryBar();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {navbar}
      </div>

      <AnimatePresence>
        {pinned && (
          <motion.div
            key="category-bar"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 z-[49] flex items-center px-4 py-4 sm:px-6 lg:px-8"
            style={{
              top: `${NAVBAR_H}px`,
              height: `${CATEGORY_BAR_H}px`,
              backgroundColor: 'var(--ci-primary-deep)',
            }}
          >
            <div className="mx-auto w-full max-w-7xl py-3">
              <h1 className="text-[18px] font-bold text-white">{title}</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
