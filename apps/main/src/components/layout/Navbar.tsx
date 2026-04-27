'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '@/lib/navigation';
import { ChevronDownIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getCareerSiteUrl, toSlug, type CategoryWithSubs } from '@wmt/shared';

type MenuItem = { title: string; href?: string; sub?: { title: string; href?: string }[] };
type Menu = {
  key: string;
  label: string;
  left: { title: string; desc: string };
  items: MenuItem[];
};

const staticMenus = (t: ReturnType<typeof useTranslations>, locale: string, categories: CategoryWithSubs[]) => {
  const isEn = locale === 'en';
  return [
    {
      key: 'products',
      label: t('nav.products'),
      left: { title: isEn ? 'PRODUCTS' : 'สินค้า', desc: isEn ? 'Explore our full range\nof medical devices' : 'สำรวจผลิตภัณฑ์\nทางการแพทย์ของเรา' },
      items: categories.map((cat) => ({
        title: isEn ? cat.name_en : cat.name_th,
        href: `/products/${toSlug(cat.name_en)}`,
        sub: cat.sub_categories?.map((sub) => ({
          title: isEn ? sub.name_en : sub.name_th,
          href: `/products/${toSlug(cat.name_en)}?sub=${toSlug(sub.name_en)}`,
        })),
      })),
    },
    {
      key: 'solution',
      label: t('nav.solution'),
      left: { title: isEn ? 'SOLUTION' : 'โซลูชัน', desc: isEn ? 'End-to-end solutions\nfor healthcare providers' : 'โซลูชันครบวงจร\nสำหรับผู้ให้บริการด้านสุขภาพ' },
      items: [
        { title: isEn ? 'HOSPITAL INTEGRATION' : 'การเชื่อมต่อโรงพยาบาล', sub: [{ title: 'HIS' }, { title: 'PACS' }, { title: 'EMR' }] },
        { title: isEn ? 'CLINICAL WORKFLOW' : 'กระบวนการทางคลินิก' },
        { title: isEn ? 'REMOTE MONITORING' : 'การติดตามระยะไกล', sub: [{ title: isEn ? 'TELEHEALTH' : 'เทเลเฮลธ์' }, { title: isEn ? 'WEARABLES' : 'อุปกรณ์สวมใส่' }] },
        { title: isEn ? 'TRAINING & SUPPORT' : 'การฝึกอบรมและสนับสนุน', sub: [{ title: isEn ? 'ON-SITE TRAINING' : 'ฝึกอบรมในสถานที่' }, { title: isEn ? 'E-LEARNING' : 'อีเลิร์นนิง' }] },
      ],
    },
    {
      key: 'company',
      label: t('nav.company'),
      left: { title: isEn ? 'COMPANY' : 'บริษัท', desc: isEn ? "Pioneering Thailand's\nMedical Devices" : 'ผู้นำด้านเครื่องมือแพทย์\nในประเทศไทย' },
      items: [
        { title: isEn ? 'ABOUT US' : 'เกี่ยวกับเรา', sub: [{ title: isEn ? 'OUR STORY' : 'เรื่องราวของเรา' }, { title: isEn ? 'MISSION & VISION' : 'พันธกิจและวิสัยทัศน์' }] },
        { title: isEn ? 'LEADERSHIP TEAM' : 'ทีมผู้บริหาร' },
        { title: isEn ? 'OUR GLOBAL PARTNERS' : 'พันธมิตรทั่วโลก', sub: [{ title: isEn ? 'PARTNER DIRECTORY' : 'รายชื่อพันธมิตร' }, { title: isEn ? 'BECOME A PARTNER' : 'เป็นพันธมิตรกับเรา' }] },
        { title: isEn ? 'NEWS & PRESS' : 'ข่าวสาร', sub: [{ title: isEn ? 'PRESS RELEASES' : 'ข่าวประชาสัมพันธ์' }, { title: isEn ? 'EVENTS' : 'กิจกรรม' }] },
        { title: isEn ? 'CONTACT US' : 'ติดต่อเรา', sub: [{ title: isEn ? 'GENERAL INQUIRY' : 'สอบถามทั่วไป' }, { title: isEn ? 'SALES CONTACT' : 'ฝ่ายขาย' }, { title: isEn ? 'TECHNICAL SUPPORT' : 'ฝ่ายเทคนิค' }] },
      ],
    },
  ] as Menu[];
};

function MegaMenu({ menu, onClose }: { menu: Menu; onClose: () => void }) {
  const [activeItem, setActiveItem] = useState<MenuItem>(menu.items.find((i) => i.sub) ?? menu.items[0]);

  return (
    <div
      className="w-full backdrop-blur-3xl bg-white/40 shadow-2xl border-y border-black/10 flex"
      style={{ animation: 'megaMenuIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
    >
      <div className="w-1/5 p-10 border-r border-black/10 flex flex-col justify-center shrink-0">
        <h2 className="text-[#112246] text-4xl font-black italic  mb-2">{menu.left.title}</h2>
        <p className="text-[#112246]/50 text-xs font-semibold leading-relaxed  whitespace-pre-line">{menu.left.desc}</p>
      </div>
      <div className="flex-1 p-8 flex flex-col gap-y-1">
        {menu.items.map((item) => (
          <Link key={item.title} href={(item.href ?? '#') as never} onMouseEnter={() => setActiveItem(item)} onClick={onClose}
            className={`flex items-center justify-between py-2.5 px-4 rounded-xl transition-colors ${activeItem.title === item.title ? 'bg-[#112246]/10' : 'hover:bg-[#112246]/10'}`}>
            <span className={`text-[16px] font-semibold  uppercase transition-colors ${activeItem.title === item.title ? 'text-[#112246]' : 'text-[#112246]/60'}`}>
              {item.title}
            </span>
            {item.sub && <ChevronRightIcon className={`w-4 h-4 transition-colors ${activeItem.title === item.title ? 'text-[#112246]' : 'text-[#112246]/30'}`} />}
          </Link>
        ))}
      </div>
      <div className="w-1/3 p-8 bg-black/5 border-l border-black/10 flex flex-col gap-y-1">
        {activeItem.sub ? (
          activeItem.sub.map((sub) => (
            <Link key={sub.title} href={(sub.href ?? '#') as never} onClick={onClose} className="group/sub flex items-center justify-between py-2.5 px-4 rounded-xl hover:bg-[#112246]/10 transition-colors">
              <span className="text-[#112246]/60 text-[16px] font-semibold  uppercase group-hover/sub:text-[#112246] transition-colors">{sub.title}</span>
              <ChevronRightIcon className="w-4 h-4 text-[#112246]/30 group-hover/sub:text-[#112246] transition-colors" />
            </Link>
          ))
        ) : (
          <p className="text-[#112246]/20 text-xs  px-4 pt-2">—</p>
        )}
      </div>
    </div>
  );
}

export default function Navbar({ categories }: { categories: CategoryWithSubs[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const careerSiteUrl = getCareerSiteUrl();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menus = staticMenus(t, locale, categories);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next as 'en' | 'th' });
  };

  return (
    <>
      <nav
        className="w-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
        }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div>
          <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between py-4">

            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer" onMouseEnter={() => setOpenMenu(null)}>
              <Image
                src="/wmt-logo.webp"
                alt="World Med Logo"
                width={275}
                height={80}
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-12">
              {menus.map((menu) => (
                <button key={menu.key} onMouseEnter={() => setOpenMenu(menu.key)}
                  className="relative flex items-center text-[18px] font-bold text-[#112246]  uppercase">
                  {menu.label}
                  <ChevronDownIcon className={`absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-4 transition-all duration-200 ${openMenu === menu.key ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`} />
                </button>
              ))}
              <a
                href={careerSiteUrl}
                onClick={() => setOpenMenu(null)}
                onMouseEnter={() => setOpenMenu(null)}
                className="text-[18px] font-bold text-[#112246]/70 hover:text-[#112246] uppercase transition-colors"
              >
                {t('nav.career')}
              </a>
            </div>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-6" onMouseEnter={() => setOpenMenu(null)}>
              <button className="text-[#112246]/70 hover:text-[#112246]">
                <MagnifyingGlassIcon className="w-5 h-5 stroke-2" />
              </button>
              <div className="relative group" onMouseEnter={() => setOpenMenu(null)}>
                <button className="flex items-center gap-1 text-sm font-bold text-[#112246]">
                  {locale === 'en' ? 'EN' : 'TH'}
                  <ChevronDownIcon className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-36 backdrop-blur-md bg-white/80 border border-[#112246]/20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button onClick={() => switchLocale('en')} className={`w-full px-4 py-2.5 text-left text-sm font-bold transition-colors hover:bg-[#112246]/10 ${locale === 'en' ? 'text-[#112246]' : 'text-[#112246]/60'}`}>
                    {t('nav.lang_en')}
                  </button>
                  <button onClick={() => switchLocale('th')} className={`w-full px-4 py-2.5 text-left text-sm font-bold transition-colors hover:bg-[#112246]/10 ${locale === 'th' ? 'text-[#112246]' : 'text-[#112246]/60'}`}>
                    {t('nav.lang_th')}
                  </button>
                </div>
              </div>
              <a href="#" className="border border-[#112246]/20 bg-[#112246]/10 backdrop-blur-md text-[#112246] px-6 py-2 rounded-full text-xs font-black uppercase hover:bg-[#112246]/20 transition-all ">
                {t('nav.contact')}
              </a>
            </div>

            {/* Hamburger */}
            <button className="lg:hidden text-[#112246] p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Panels */}
        {menus.map((menu) => openMenu === menu.key && (
          <MegaMenu key={menu.key} menu={menu} onClose={() => setOpenMenu(null)} />
        ))}
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-40 pt-24 backdrop-blur-2xl bg-black/70 lg:hidden overflow-y-auto"
          style={{ animation: 'megaMenuIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <div className="flex flex-col px-6 py-6 gap-1">
            {menus.map(({ key, label, items }) => (
              <div key={key} className="border-b border-white/10">
                <button onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                  className="w-full flex items-center justify-between py-3 text-sm font-bold text-white  uppercase">
                  {label}
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileExpanded === key ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === key && (
                  <div className="pb-3 flex flex-col gap-1">
                    {items.map((item) => (
                      <div key={item.title}>
                        <Link href={(item.href ?? '#') as never} className="py-2 px-3 text-xs font-bold text-white/70 hover:text-white  uppercase transition-colors flex">{item.title}</Link>
                        {item.sub?.map((sub) => (
                          <Link key={sub.title} href={(sub.href ?? '#') as never} className="py-1.5 px-6 text-[11px] font-bold text-white/40 hover:text-white  uppercase transition-colors flex">— {sub.title}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={careerSiteUrl}
              onClick={() => {
                setMobileOpen(false);
                setMobileExpanded(null);
                setOpenMenu(null);
              }}
              className="py-3 text-sm font-bold text-white/70  uppercase border-b border-white/10"
            >
              {t('nav.career')}
            </a>
            <div className="mt-6 flex items-center gap-4">
              <button onClick={() => switchLocale('en')} className={`text-sm font-bold ${locale === 'en' ? 'text-white' : 'text-white/50'}`}>EN</button>
              <button onClick={() => switchLocale('th')} className={`text-sm font-bold ${locale === 'th' ? 'text-white' : 'text-white/50'}`}>TH</button>
              <a href="#" className="border border-white/20 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-black uppercase hover:bg-white/20 transition-all ">
                {t('nav.contact')}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
