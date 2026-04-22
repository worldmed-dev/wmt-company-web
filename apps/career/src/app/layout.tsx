import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import { getProductCategories } from '@/lib/categories';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getProductCategories();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Navbar categories={categories} />
        {children}
      </body>
    </html>
  );
}
