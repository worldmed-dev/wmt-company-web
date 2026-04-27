import "./globals.css";
import { Noto_Sans_Thai } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { connection } from 'next/server';
import { SmoothScrollProvider } from '@wmt/ui';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  return (
    <html lang="en" className="h-full antialiased">
      <body className={`min-h-full flex flex-col font-sans ${notoSansThai.variable}`}>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
