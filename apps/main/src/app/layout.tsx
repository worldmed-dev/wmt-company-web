import './globals.css';
import { Noto_Sans_Thai } from 'next/font/google';
import { SmoothScrollProvider } from '@wmt/ui';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full antialiased" suppressHydrationWarning>
      <body className={`min-h-full flex flex-col font-sans ${notoSansThai.variable}`} suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
