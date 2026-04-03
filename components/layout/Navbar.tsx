'use client';

import { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type MenuItem = { title: string; sub?: string[] };
type Menu = { label: string; left: { title: string; desc: string }; items: MenuItem[] };

const menus: Menu[] = [
  {
    label: 'PRODUCTS',
    left: { title: 'PRODUCTS', desc: 'Explore our full range\nof medical devices' },
    items: [
      { title: 'CRITICAL CARE & EMERGENCY', sub: ['ICU VENTILATORS', 'DEFIBRILLATORS', 'PATIENT MONITORS', 'INFUSION PUMPS'] },
      { title: 'SURGERY & ANESTHESIOLOGY', sub: ['ANESTHESIA MACHINES', 'SURGICAL LIGHTS', 'ELECTROSURGICAL UNITS'] },
      { title: 'OB/GYN & NEONATOLOGY', sub: ['FETAL MONITORS', 'INCUBATORS', 'PHOTOTHERAPY UNITS'] },
      { title: 'GENERAL WARDS & INTERNAL MEDICINE' },
      { title: 'CARDIOLOGY & PULMONOLOGY', sub: ['ECG MACHINES', 'HOLTER MONITORS', 'SPIROMETERS'] },
      { title: 'ENDOSCOPY & GASTROENTEROLOGY' },
      { title: 'RADIOLOGY & MEDICAL IMAGING', sub: ['ULTRASOUND', 'X-RAY SYSTEMS', 'MRI ACCESSORIES'] },
      { title: 'SLEEP MEDICINE CENTER', sub: ['POLYSOMNOGRAPHY', 'CPAP DEVICES'] },
    ],
  },
  {
    label: 'SOLUTION',
    left: { title: 'SOLUTION', desc: 'End-to-end solutions\nfor healthcare providers' },
    items: [
      { title: 'HOSPITAL INTEGRATION', sub: ['HIS CONNECTIVITY', 'PACS INTEGRATION', 'EMR SOLUTIONS'] },
      { title: 'CLINICAL WORKFLOW', sub: ['WORKFLOW AUTOMATION', 'SCHEDULING SYSTEMS'] },
      { title: 'REMOTE MONITORING', sub: ['TELEHEALTH PLATFORM', 'WEARABLE INTEGRATION'] },
      { title: 'DATA ANALYTICS' },
      { title: 'TRAINING & SUPPORT', sub: ['ON-SITE TRAINING', 'E-LEARNING', 'CERTIFICATION PROGRAMS'] },
      { title: 'MAINTENANCE SERVICES', sub: ['PREVENTIVE MAINTENANCE', 'REPAIR SERVICES', 'SPARE PARTS'] },
    ],
  },
  {
    label: 'COMPANY',
    left: { title: 'COMPANY', desc: "Pioneering Thailand's\nMedical Devices" },
    items: [
      { title: 'ABOUT US', sub: ['OUR STORY', 'MISSION & VISION', 'CORE VALUES'] },
      { title: 'LEADERSHIP TEAM' },
      { title: 'OUR GLOBAL PARTNERS', sub: ['PARTNER DIRECTORY', 'BECOME A PARTNER'] },
      { title: 'AWARDS & RECOGNITION' },
      { title: 'SUSTAINABILITY' },
      { title: 'NEWS & PRESS', sub: ['PRESS RELEASES', 'MEDIA COVERAGE', 'EVENTS'] },
      { title: 'CONTACT US', sub: ['GENERAL INQUIRY', 'SALES CONTACT', 'TECHNICAL SUPPORT'] },
    ],
  },
];

function MegaMenu({ menu }: { menu: Menu }) {
  const [activeItem, setActiveItem] = useState<MenuItem>(menu.items.find((i) => i.sub) ?? menu.items[0]);

  return (
    <div className="w-full backdrop-blur-2xl bg-white/10 shadow-2xl border-y border-white/20 flex">
      {/* Left */}
      <div className="w-1/5 p-10 border-r border-white/10 flex flex-col justify-center shrink-0">
        <h2 className="text-white text-4xl font-black italic tracking-tighter mb-2">{menu.left.title}</h2>
        <p className="text-white/50 text-xs font-medium leading-relaxed tracking-[0.15em] whitespace-pre-line">{menu.left.desc}</p>
      </div>

      {/* Mid */}
      <div className="flex-1 p-8 flex flex-col gap-y-1">
        {menu.items.map((item) => (
          <a
            key={item.title}
            href="#"
            onMouseEnter={() => setActiveItem(item)}
            className={`flex items-center justify-between py-2.5 px-4 rounded-xl transition-colors ${activeItem.title === item.title ? 'bg-white/10' : 'hover:bg-white/10'}`}
          >
            <span className={`text-[13px] font-bold tracking-[0.15em] uppercase transition-colors ${activeItem.title === item.title ? 'text-white' : 'text-white/70'}`}>
              {item.title}
            </span>
            {item.sub && <ChevronRightIcon className={`w-4 h-4 transition-colors ${activeItem.title === item.title ? 'text-white' : 'text-white/30'}`} />}
          </a>
        ))}
      </div>

      {/* Right — submenu */}
      <div className="w-1/3 p-8 bg-white/5 border-l border-white/10 flex flex-col gap-y-1">
        {activeItem.sub ? (
          activeItem.sub.map((sub) => (
            <a key={sub} href="#" className="group/sub flex items-center justify-between py-2.5 px-4 rounded-xl hover:bg-white/10 transition-colors">
              <span className="text-white/70 text-[13px] font-bold tracking-[0.15em] uppercase group-hover/sub:text-white transition-colors">{sub}</span>
              <ChevronRightIcon className="w-4 h-4 text-white/30 group-hover/sub:text-white transition-colors" />
            </a>
          ))
        ) : (
          <p className="text-white/20 text-xs tracking-[0.15em] px-4 pt-2">NO SUBMENU</p>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        onMouseLeave={() => setOpenMenu(null)}
      >
        {/* Top bar */}
        <div className="border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 h-28 flex items-center justify-between py-4">

            {/* Logo */}
            <div className="flex items-center cursor-pointer">
              <img src="/wmt-logo.webp" alt="World Med Logo" className="h-20 w-auto brightness-0 invert" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {menus.map((menu) => (
                <button
                  key={menu.label}
                  onMouseEnter={() => setOpenMenu(menu.label)}
                  className="relative flex items-center text-sm font-bold text-white tracking-[0.15em] uppercase"
                >
                  {menu.label}
                  <ChevronDownIcon className={`absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-4 transition-all duration-200 ${openMenu === menu.label ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`} />
                </button>
              ))}
              <a href="#" className="text-sm font-bold text-white/70 hover:text-white uppercase tracking-[0.15em] transition-colors">
                CAREER
              </a>
            </div>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="text-white/70 hover:text-white">
                <MagnifyingGlassIcon className="w-5 h-5 stroke-2" />
              </button>
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-bold text-white">
                  EN
                  <ChevronDownIcon className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-36 backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button className="w-full px-4 py-2.5 text-left text-sm font-bold text-white hover:bg-white/10 transition-colors tracking-wide">English</button>
                  <button className="w-full px-4 py-2.5 text-left text-sm font-bold text-white/70 hover:bg-white/10 hover:text-white transition-colors tracking-wide">ภาษาไทย</button>
                </div>
              </div>
              <a href="#" className="border-2 border-white text-white px-6 py-2 rounded-full text-xs font-black uppercase hover:bg-white hover:text-slate-900 transition-all tracking-wider">
                Contact Us
              </a>
            </div>

            {/* Hamburger */}
            <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Panels */}
        {menus.map((menu) => (
          openMenu === menu.label && (
            <MegaMenu key={menu.label} menu={menu} />
          )
        ))}
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-28 backdrop-blur-2xl bg-black/70 lg:hidden overflow-y-auto">
          <div className="flex flex-col px-6 py-6 gap-1">
            {menus.map(({ label, items }) => (
              <div key={label} className="border-b border-white/10">
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === label ? null : label)}
                  className="w-full flex items-center justify-between py-3 text-sm font-bold text-white tracking-[0.15em] uppercase"
                >
                  {label}
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileExpanded === label ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === label && (
                  <div className="pb-3 flex flex-col gap-1">
                    {items.map((item) => (
                      <div key={item.title}>
                        <a href="#" className="py-2 px-3 text-xs font-bold text-white/70 hover:text-white tracking-[0.15em] uppercase transition-colors flex">
                          {item.title}
                        </a>
                        {item.sub?.map((sub) => (
                          <a key={sub} href="#" className="py-1.5 px-6 text-[11px] font-bold text-white/40 hover:text-white tracking-[0.15em] uppercase transition-colors flex">
                            — {sub}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#" className="py-3 text-sm font-bold text-white/70 tracking-[0.15em] uppercase border-b border-white/10">CAREER</a>
            <div className="mt-6 flex items-center gap-4">
              <button className="text-sm font-bold text-white">EN</button>
              <a href="#" className="border-2 border-white text-white px-6 py-2 rounded-full text-xs font-black uppercase hover:bg-white hover:text-slate-900 transition-all tracking-wider">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
