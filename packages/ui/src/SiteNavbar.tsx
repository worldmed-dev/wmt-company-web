'use client';

import { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteNavbarProps = {
  logoSrc?: string;
  logoHref?: string;
  logoHeight?: string;
  navItems: SiteNavItem[];
  rightSlot?: React.ReactNode;
  mobileRightSlot?: React.ReactNode;
  navId?: string;
  hideOnScrollDown?: boolean;
  fixed?: boolean;
  desktopNavSlot?: React.ReactNode;
  mobileNavSlot?: React.ReactNode;
  /** Rendered below the navbar row, inside the nav element (for mega menus) */
  belowNavSlot?: React.ReactNode;
};

export function SiteNavbar({
  logoSrc = '/wmt-logo.webp',
  logoHref = '/',
  logoHeight = 'h-16',
  navItems,
  rightSlot,
  mobileRightSlot,
  navId,
  hideOnScrollDown = false,
  fixed = false,
  desktopNavSlot,
  mobileNavSlot,
  belowNavSlot,
}: SiteNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (hideOnScrollDown) {
        setHidden(y > lastScrollY.current && y > 100);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideOnScrollDown]);

  return (
    <>
      <nav
        id={navId}
        className={`w-full transition-transform duration-300 ease-out ${fixed ? 'fixed top-0 left-0 right-0 z-50' : ''}`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-16 lg:px-24 py-4">
          {/* Logo */}
          <a href={logoHref} className="flex cursor-pointer items-center">
            <img
              src={logoSrc}
              alt="Logo"
              className={`${logoHeight} w-auto object-contain`}
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-12">
            {desktopNavSlot ?? navItems.map((item) => (
              item.href.startsWith('/#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[16px] font-bold uppercase text-[#112246] transition-colors hover:text-[#112246]/70"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[16px] font-bold uppercase text-[#112246] transition-colors hover:text-[#112246]/70"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          {/* Right slot */}
          <div className="hidden lg:flex items-center gap-6">
            {rightSlot}
          </div>

          {/* Hamburger */}
          <button className="p-2 text-[#112246] lg:hidden" onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
        {belowNavSlot}
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-40 overflow-y-auto bg-black/70 pt-20 backdrop-blur-2xl lg:hidden"
          style={{ animation: 'megaMenuIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <div className="flex flex-col gap-1 px-6 py-6">
            {mobileNavSlot ?? navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-3 text-sm font-bold uppercase text-white"
              >
                {item.label}
              </a>
            ))}
            {mobileRightSlot && (
              <div className="mt-6 flex items-center gap-4">
                {mobileRightSlot}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
