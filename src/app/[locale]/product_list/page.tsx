import { getCategoryById, getProductCategories } from '@/lib/categories';
import ProductListClient from '@/components/product/ProductListClient';

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categoryId = category ? parseInt(category) : null;

  const [allCategories, currentCategory] = await Promise.all([
    getProductCategories(),
    categoryId ? getCategoryById(categoryId) : getProductCategories().then((cats) => cats[0] ?? null),
  ]);

  return (
    <ProductListClient
      allCategories={allCategories}
      currentCategory={currentCategory}
    />
  );
}
