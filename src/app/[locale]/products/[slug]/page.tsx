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

  console.log('=== ProductSlugPage ===')
  console.log('slug:', slug)

  const [currentCategory, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductCategories(),
  ]);

  console.log('currentCategory:', currentCategory?.name_en ?? 'NULL')
  console.log('allCategories count:', allCategories.length)

  if (!currentCategory) notFound();

  return (
    <ProductListClient
      allCategories={allCategories}
      currentCategory={currentCategory}
      initialSubId={sub ? parseInt(sub) : null}
    />
  );
}
