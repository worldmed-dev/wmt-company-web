'use client';

import { useEffect, useRef, useState } from 'react';

const NAVBAR_H = 112;

const NAV_ITEMS = [
  { label: 'How We Do', href: '#how-we-do' },
  { label: 'Role Opening', href: '#role-opening' },
  { label: 'What We Look For', href: '#what-we-look-for' },
];

export default function DepartmentCategoryBar({ name }: { name: string }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('how-we-do');

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const navbarEl = document.querySelector<HTMLElement>('#career-navbar');
    if (!sentinel || !navbarEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hidden = !entry.isIntersecting;
        setNavbarHidden(hidden);
        navbarEl.style.transform = hidden ? 'translateY(-100%)' : 'translateY(0)';
        navbarEl.style.transition = 'transform 0.4s cubic-bezier(0, 0, 0.2, 1)';
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
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px" style={{ marginTop: `${NAVBAR_H}px` }} />
      <div
        className="sticky z-[49] flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          top: navbarHidden ? '0px' : `${NAVBAR_H}px`,
          height: '56px',
          backgroundColor: 'var(--ci-primary-deep)',
          transition: 'top 0.4s cubic-bezier(0, 0, 0.2, 1)',
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <span className="text-[15px] font-bold text-white shrink-0">{name}</span>
          <nav className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchor(e, item.href)}
                  className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
