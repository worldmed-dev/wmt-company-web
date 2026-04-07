import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import { getProductCategories } from '@/lib/categories';

const montserrat = Montserrat({ variable: '--font-montserrat', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'World Med Trading',
  description: "Pioneering Thailand's Medical Devices",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [messages, categories] = await Promise.all([
    getMessages(),
    getProductCategories(),
  ]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navbar categories={categories} />
      {children}
    </NextIntlClientProvider>
  );
}
