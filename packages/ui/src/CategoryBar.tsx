'use client';

import { useEffect } from 'react';

const NAVBAR_H = 112; // h-28 = 7rem = 112px

type Props = {
  title: string;
  isProductSlugPage: boolean;
};

export function CategoryBar({ title, isProductSlugPage }: Props) {
  useEffect(() => {
    if (!isProductSlugPage) {
      document.documentElement.style.setProperty('--main-navbar-translate-y', '0%');
      document.documentElement.style.setProperty('--category-bar-translate-y', '-100%');
      return;
    }

    const onScroll = () => {
      const progress = Math.min(Math.max(window.scrollY, 0), NAVBAR_H);
      const pct = (progress / NAVBAR_H) * 100;

      document.documentElement.style.setProperty('--main-navbar-translate-y', `-${pct}%`);
      document.documentElement.style.setProperty('--category-bar-translate-y', `${pct - 100}%`);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.documentElement.style.setProperty('--main-navbar-translate-y', '0%');
      document.documentElement.style.setProperty('--category-bar-translate-y', '-100%');
    };
  }, [isProductSlugPage]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[49] flex min-h-[112px] w-full items-center px-4 py-6 sm:px-6 lg:px-8"
      style={{
        backgroundColor: 'var(--ci-primary-deep)',
        transform: 'translateY(var(--category-bar-translate-y, -100%))',
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="text-[18px] font-bold text-white">{title}</h1>
      </div>
    </div>
  );
}
