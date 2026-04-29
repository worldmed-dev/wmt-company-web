'use client';

import Link from 'next/link';
import { SiteNavbar } from '@wmt/ui';
import { getMainSiteUrl, joinSiteUrl } from '@wmt/shared';

const mainSiteUrl = getMainSiteUrl();

const careerNavItems = [
  { label: 'Our Team', href: '/#our-team' },
  { label: 'Culture', href: '/culture' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Internship', href: '/#internship' },
];

export default function Navbar() {
  return (
    <SiteNavbar
      logoHref={joinSiteUrl(mainSiteUrl, '/en')}
      logoHeight="h-16"
      navItems={careerNavItems}
      navId="career-navbar"
      fixed
      rightSlot={
        <span className="text-sm font-bold text-[#112246]">EN</span>
      }
      mobileRightSlot={
        <span className="text-sm font-bold text-white">EN</span>
      }
    />
  );
}
