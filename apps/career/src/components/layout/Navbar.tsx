'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { getMainSiteUrl, joinSiteUrl } from '@wmt/shared';

const mainSiteUrl = getMainSiteUrl();

const careerNavItems = [
  { label: 'Our Team', href: '/#our-team' },
  { label: 'Culture', href: '/culture' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Internship', href: '/#internship' },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <nav
        id="career-navbar"
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
        }}
      >
        <div className="border-b border-white/10">
          <div className="mx-auto flex h-28 max-w-[1400px] items-center justify-between page-x py-4">
            <Link href={joinSiteUrl(mainSiteUrl, '/en')} className="flex cursor-pointer items-center">
              <Image
                src="/wmt-logo.webp"
                alt="World Med Logo"
                width={275}
                height={80}
                className="h-20 w-auto"
                priority
              />
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              {careerNavItems.map((item) => (
                item.href.startsWith('/#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-bold uppercase tracking-[0.15em] text-[#112246] transition-colors hover:text-[#112246]/70"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-bold uppercase tracking-[0.15em] text-[#112246] transition-colors hover:text-[#112246]/70"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <span className="text-sm font-bold text-[#112246]">EN</span>
              <Link
                href={joinSiteUrl(mainSiteUrl, '/en/contact')}
                className="rounded-full border border-[#112246]/20 bg-[#112246]/10 px-6 py-2 text-xs font-black uppercase tracking-wider text-[#112246] transition-all hover:bg-[#112246]/20"
              >
                Contact Us
              </Link>
            </div>

            <button className="p-2 text-[#112246] lg:hidden" onClick={() => setMobileOpen((open) => !open)}>
              {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-40 overflow-y-auto bg-black/70 pt-28 backdrop-blur-2xl lg:hidden"
          style={{ animation: 'megaMenuIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <div className="flex flex-col gap-1 px-6 py-6">
            {careerNavItems.map((item) => (
              item.href.startsWith('/#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="border-b border-white/10 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="border-b border-white/10 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white"
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-bold text-white">EN</span>
              <Link
                href={joinSiteUrl(mainSiteUrl, '/en/contact')}
                onClick={closeMobileMenu}
                className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
