'use client';

import { useEffect, useRef, useState } from 'react';

export type SiteCategoryBarNavItem = {
  label: string;
  href: string;
};

export type SiteCategoryBarProps = {
  name: string;
  navItems?: SiteCategoryBarNavItem[];
  navbarId?: string;
  navbarHeight?: number;
  /** Initial active section id (without #) */
  defaultActiveSection?: string;
};

export function SiteCategoryBar({
  name,
  navItems = [],
  navbarId,
  navbarHeight = 80,
  defaultActiveSection,
}: SiteCategoryBarProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [activeSection, setActiveSection] = useState(
    defaultActiveSection ?? navItems[0]?.href.slice(1) ?? ''
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const navbarEl = navbarId ? document.querySelector<HTMLElement>(`#${navbarId}`) : null;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hidden = !entry.isIntersecting;
        setNavbarHidden(hidden);
        if (navbarEl) {
          navbarEl.style.transform = hidden ? 'translateY(-100%)' : 'translateY(0)';
          navbarEl.style.transition = 'transform 0.4s cubic-bezier(0, 0, 0.2, 1)';
        }
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (navbarEl) {
        navbarEl.style.transform = '';
        navbarEl.style.transition = '';
      }
    };
  }, [navbarId]);

  useEffect(() => {
    if (navItems.length === 0) return;
    const observers: IntersectionObserver[] = [];
    navItems.forEach((item) => {
      const id = item.href.startsWith('#') ? item.href.slice(1) : item.href;
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [navItems]);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href.startsWith('#') ? href : `#${href}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px" />
      <div
        className="sticky z-[49] flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          top: navbarHidden ? '0px' : `${navbarHeight}px`,
          height: '56px',
          backgroundColor: 'var(--ci-primary-deep)',
          transition: 'top 0.4s cubic-bezier(0, 0, 0.2, 1)',
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <span className="text-[15px] font-bold text-white shrink-0">{name}</span>
          {navItems.length > 0 && (
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const id = item.href.startsWith('#') ? item.href.slice(1) : item.href;
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleAnchor(e, item.href)}
                    className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap ${
                      isActive ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
