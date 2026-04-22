'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  getCareerSiteUrl,
  getMainSiteUrl,
  joinSiteUrl,
  toSlug,
  type CategoryWithSubs,
} from '@wmt/shared';

type MenuItem = {
  title: string;
  href?: string;
  sub?: { title: string; href?: string }[];
};

type Menu = {
  key: string;
  label: string;
  left: { title: string; desc: string };
  items: MenuItem[];
};

const mainSiteUrl = getMainSiteUrl();
const careerSiteUrl = getCareerSiteUrl();

const staticMenus = (categories: CategoryWithSubs[]): Menu[] => [
    {
      key: 'products',
      label: 'PRODUCTS',
      left: {
        title: 'PRODUCTS',
        desc: 'Explore our full range\nof medical devices',
      },
      items: categories.map((cat) => ({
        title: cat.name_en,
        href: joinSiteUrl(mainSiteUrl, `/en/products/${toSlug(cat.name_en)}`),
        sub: cat.sub_categories?.map((sub) => ({
          title: sub.name_en,
          href: joinSiteUrl(
            mainSiteUrl,
            `/en/products/${toSlug(cat.name_en)}?sub=${toSlug(sub.name_en)}`
          ),
        })),
      })),
    },
    {
      key: 'solution',
      label: 'SOLUTION',
      left: {
        title: 'SOLUTION',
        desc: 'End-to-end solutions\nfor healthcare providers',
      },
      items: [
        {
          title: 'HOSPITAL INTEGRATION',
          sub: [{ title: 'HIS' }, { title: 'PACS' }, { title: 'EMR' }],
        },
        { title: 'CLINICAL WORKFLOW' },
        {
          title: 'REMOTE MONITORING',
          sub: [{ title: 'TELEHEALTH' }, { title: 'WEARABLES' }],
        },
        {
          title: 'TRAINING & SUPPORT',
          sub: [{ title: 'ON-SITE TRAINING' }, { title: 'E-LEARNING' }],
        },
      ],
    },
    {
      key: 'company',
      label: 'COMPANY',
      left: {
        title: 'COMPANY',
        desc: "Pioneering Thailand's\nMedical Devices",
      },
      items: [
        { title: 'ABOUT US', sub: [{ title: 'OUR STORY' }, { title: 'MISSION & VISION' }] },
        { title: 'LEADERSHIP TEAM' },
        {
          title: 'OUR GLOBAL PARTNERS',
          sub: [{ title: 'PARTNER DIRECTORY' }, { title: 'BECOME A PARTNER' }],
        },
        {
          title: 'NEWS & PRESS',
          sub: [{ title: 'PRESS RELEASES' }, { title: 'EVENTS' }],
        },
        {
          title: 'CONTACT US',
          sub: [{ title: 'GENERAL INQUIRY' }, { title: 'SALES CONTACT' }, { title: 'TECHNICAL SUPPORT' }],
        },
      ],
    },
  ];

function MegaMenu({ menu, onClose }: { menu: Menu; onClose: () => void }) {
  const [activeItem, setActiveItem] = useState<MenuItem>(menu.items.find((item) => item.sub) ?? menu.items[0]);

  return (
    <div
      className="flex w-full border-y border-black/10 bg-white/40 shadow-2xl backdrop-blur-3xl"
      style={{ animation: 'megaMenuIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
    >
      <div className="flex w-1/5 shrink-0 flex-col justify-center border-r border-black/10 p-10">
        <h2 className="mb-2 text-4xl font-black italic tracking-tighter text-[#112246]">
          {menu.left.title}
        </h2>
        <p className="whitespace-pre-line text-xs font-semibold leading-relaxed tracking-[0.15em] text-[#112246]/50">
          {menu.left.desc}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-y-1 p-8">
        {menu.items.map((item) => (
          <Link
            key={item.title}
            href={item.href ?? '#'}
            onMouseEnter={() => setActiveItem(item)}
            onClick={onClose}
            className={`flex items-center justify-between rounded-xl px-4 py-2.5 transition-colors ${
              activeItem.title === item.title ? 'bg-[#112246]/10' : 'hover:bg-[#112246]/10'
            }`}
          >
            <span
              className={`text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                activeItem.title === item.title ? 'text-[#112246]' : 'text-[#112246]/60'
              }`}
            >
              {item.title}
            </span>
            {item.sub && (
              <ChevronRightIcon
                className={`h-4 w-4 transition-colors ${
                  activeItem.title === item.title ? 'text-[#112246]' : 'text-[#112246]/30'
                }`}
              />
            )}
          </Link>
        ))}
      </div>
      <div className="flex w-1/3 flex-col gap-y-1 border-l border-black/10 bg-black/5 p-8">
        {activeItem.sub ? (
          activeItem.sub.map((sub) => (
            <Link
              key={sub.title}
              href={sub.href ?? '#'}
              onClick={onClose}
              className="group/sub flex items-center justify-between rounded-xl px-4 py-2.5 transition-colors hover:bg-[#112246]/10"
            >
              <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#112246]/60 transition-colors group-hover/sub:text-[#112246]">
                {sub.title}
              </span>
              <ChevronRightIcon className="h-4 w-4 text-[#112246]/30 transition-colors group-hover/sub:text-[#112246]" />
            </Link>
          ))
        ) : (
          <p className="px-4 pt-2 text-xs tracking-[0.15em] text-[#112246]/20">-</p>
        )}
      </div>
    </div>
  );
}

export default function Navbar({ categories }: { categories: CategoryWithSubs[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menus = staticMenus(categories);

  return (
    <>
      <nav
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
        }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="border-b border-white/10">
          <div className="mx-auto flex h-28 max-w-[1400px] items-center justify-between px-6 py-4">
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
              {menus.map((menu) => (
                <button
                  key={menu.key}
                  onMouseEnter={() => setOpenMenu(menu.key)}
                  className="relative flex items-center text-sm font-bold uppercase tracking-[0.15em] text-[#112246]"
                >
                  {menu.label}
                  <ChevronDownIcon
                    className={`absolute -bottom-5 left-1/2 h-4 w-4 -translate-x-1/2 transition-all duration-200 ${
                      openMenu === menu.key ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                    }`}
                  />
                </button>
              ))}
              <Link
                href={careerSiteUrl}
                onClick={() => setOpenMenu(null)}
                className="text-sm font-bold uppercase tracking-[0.15em] text-[#112246] transition-colors"
              >
                CAREER
              </Link>
            </div>

            <div className="hidden items-center gap-6 lg:flex">
              <button className="text-[#112246]/70 hover:text-[#112246]">
                <MagnifyingGlassIcon className="h-5 w-5 stroke-2" />
              </button>
              <span className="text-sm font-bold text-[#112246]">EN</span>
              <Link
                href={joinSiteUrl(mainSiteUrl, '/en/contact')}
                className="rounded-full border border-[#112246]/20 bg-[#112246]/10 px-6 py-2 text-xs font-black uppercase tracking-wider text-[#112246] transition-all hover:bg-[#112246]/20"
              >
                Contact Us
              </Link>
            </div>

            <button className="p-2 text-[#112246] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menus.map(
          (menu) =>
            openMenu === menu.key && <MegaMenu key={menu.key} menu={menu} onClose={() => setOpenMenu(null)} />
        )}
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-black/70 pt-28 backdrop-blur-2xl lg:hidden"
          style={{ animation: 'megaMenuIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <div className="flex flex-col gap-1 px-6 py-6">
            {menus.map(({ key, label, items }) => (
              <div key={key} className="border-b border-white/10">
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                  className="flex w-full items-center justify-between py-3 text-sm font-bold uppercase tracking-[0.15em] text-white"
                >
                  {label}
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${mobileExpanded === key ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === key && (
                  <div className="flex flex-col gap-1 pb-3">
                    {items.map((item) => (
                      <div key={item.title}>
                        <Link
                          href={item.href ?? '#'}
                          className="flex px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
                        >
                          {item.title}
                        </Link>
                        {item.sub?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href ?? '#'}
                            className="flex px-6 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-white"
                          >
                            - {sub.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={careerSiteUrl}
              onClick={() => {
                setMobileOpen(false);
                setMobileExpanded(null);
                setOpenMenu(null);
              }}
              className="border-b border-white/10 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white"
            >
              CAREER
            </Link>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-bold text-white">EN</span>
              <Link
                href={joinSiteUrl(mainSiteUrl, '/en/contact')}
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
