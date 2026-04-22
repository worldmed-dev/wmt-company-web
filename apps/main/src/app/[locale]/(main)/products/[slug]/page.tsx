import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/categories';
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

  const currentCategory = await getCategoryBySlug(slug);

  if (!currentCategory) notFound();

  return (
    <ProductListClient
      currentCategory={currentCategory}
      initialSubSlug={sub ?? null}
    />
  );
}
