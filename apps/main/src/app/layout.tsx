import './globals.css';
import { SmoothScrollProvider } from '@wmt/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
