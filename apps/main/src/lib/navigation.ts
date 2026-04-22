import { createNavigation } from 'next-intl/navigation';

export const { useRouter, usePathname, Link } = createNavigation({
  locales: ['en', 'th'] as const,
  defaultLocale: 'en',
  localePrefix: 'always',
});
