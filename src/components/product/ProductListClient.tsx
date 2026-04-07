'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/navigation';
import { useLocale } from 'next-intl';
import type { CategoryWithSubs, SubCategory } from '@/lib/types';
import { toSlug } from '@/lib/slug';
import FilterCard from './FilterCard';

type Props = {
  allCategories: CategoryWithSubs[];
  currentCategory: CategoryWithSubs | null;
  initialSubSlug?: string | null;
};

export default function ProductListClient({ allCategories, currentCategory, initialSubSlug }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const isEn = locale === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const matchedSub = currentCategory?.sub_categories?.find((s) => toSlug(s.name_en) === initialSubSlug);
  const [selectedSubs, setSelectedSubs] = useState<number[]>(matchedSub ? [matchedSub.id] : []);

  const categoryName = currentCategory
    ? (isEn ? currentCategory.name_en : currentCategory.name_th)
    : '';

  const subCategories: SubCategory[] = currentCategory?.sub_categories ?? [];

  const toggleSub = (id: number) => {
    setSelectedSubs((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCategoryChange = (nameEn: string) => {
    router.push(`/products/${toSlug(nameEn)}` as never);
    setSelectedSubs([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
          alt="Medical professionals"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15233E] via-[#15233E]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 lg:-mt-24">

        {/* Title */}
        <div className="bg-white rounded-t-[32px] p-6 lg:p-10 mb-8 flex items-center min-h-[100px]">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#2C3E5D]">{categoryName}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <FilterCard
              subCategories={subCategories}
              selectedSubs={selectedSubs}
              onToggle={toggleSub}
              onClear={() => setSelectedSubs([])}
              isEn={isEn}
            />
          </aside>

          {/* Main */}
          <main className="flex-1">
            {/* Search */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder={isEn ? 'Search' : 'ค้นหา'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-32 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#15233E] focus:ring-1 focus:ring-[#15233E] text-gray-700 bg-white shadow-sm"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <button className="px-6 py-2.5 bg-[#15233E] hover:bg-[#1f335c] text-white text-sm font-medium rounded-full transition-colors">
                  {isEn ? 'Search' : 'ค้นหา'}
                </button>
              </div>
            </div>

            {/* Product Grid — placeholder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {Array(6).fill(null).map((_, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="w-full aspect-square bg-[#F5F7FA] rounded-3xl mb-4" />
                  <div className="px-1">
                    <h4 className="text-lg font-bold text-[#15233E] mb-1">Product Name</h4>
                    <p className="text-sm text-gray-400 font-medium">{categoryName}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
