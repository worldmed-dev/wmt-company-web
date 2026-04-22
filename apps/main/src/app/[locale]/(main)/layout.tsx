import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProductCategories } from '@/lib/categories';
import { connection } from 'next/server';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const categories = await getProductCategories();
  return (
    <>
      <Navbar categories={categories} />
      {children}
      <Footer categories={categories} />
    </>
  );
}
