import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProductCategories } from '@/lib/categories';
import { connection } from 'next/server';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const categories = await getProductCategories();
  return (
    <>
      <div id="navbar-wrapper" className="fixed top-0 left-0 right-0 z-50">
        <Navbar categories={categories} />
      </div>
      {children}
      <Footer categories={categories} />
    </>
  );
}
