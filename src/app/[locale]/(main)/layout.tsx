import Navbar from '@/components/layout/Navbar';
import { getProductCategories } from '@/lib/categories';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const categories = await getProductCategories();
  return (
    <>
      <Navbar categories={categories} />
      {children}
    </>
  );
}
