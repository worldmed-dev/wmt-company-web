import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductCategories } from '@/lib/categories';
import ProductListClient from '@/components/product/ProductListClient';

export default async function ProductSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}) {
  const { slug } = await params;
  const { sub } = await searchParams;

  const [currentCategory, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductCategories(),
  ]);

  if (!currentCategory) notFound();

  return (
    <ProductListClient
      allCategories={allCategories}
      currentCategory={currentCategory}
      initialSubSlug={sub ?? null}
    />
  );
}
