'use client';

import { SiteCategoryBar, type SiteCategoryBarNavItem } from '@wmt/ui';

const DEFAULT_NAV_ITEMS: SiteCategoryBarNavItem[] = [
  { label: 'How We Do', href: '#how-we-do' },
  { label: 'Role Opening', href: '#role-opening' },
  { label: 'What We Look For', href: '#what-we-look-for' },
];

export default function DepartmentCategoryBar({
  name,
  navItems = DEFAULT_NAV_ITEMS,
}: {
  name: string;
  navItems?: SiteCategoryBarNavItem[];
}) {
  return (
    <SiteCategoryBar
      name={name}
      navItems={navItems}
      navbarId="career-navbar"
      navbarHeight={80}
    />
  );
}
