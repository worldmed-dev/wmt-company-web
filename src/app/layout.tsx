import { Montserrat, Anton, Lato, Architects_Daughter } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ variable: '--font-montserrat', subsets: ['latin'] });
const anton = Anton({ variable: '--font-anton', subsets: ['latin'], weight: '400' });
const lato = Lato({ variable: '--font-lato', subsets: ['latin'], weight: ['300', '400', '700'] });
const architectsDaughter = Architects_Daughter({ variable: '--font-architects-daughter', subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${montserrat.variable} ${anton.variable} ${lato.variable} ${architectsDaughter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
