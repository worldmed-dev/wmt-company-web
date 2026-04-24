'use client';

import { usePathname } from 'next/navigation';
import { PageTransition } from '@wmt/ui';

export default function MainTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <PageTransition pathname={pathname}>{children}</PageTransition>;
}
