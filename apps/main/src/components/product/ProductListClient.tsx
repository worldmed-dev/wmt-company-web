'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { toSlug, type CategoryWithSubs, type SubCategory } from '@wmt/shared';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import FilterCard from './FilterCard';
import ProductCard from './ProductCard';

type Props = {
  currentCategory: CategoryWithSubs | null;
  initialSubSlug?: string | null;
};

export default function ProductListClient({ currentCategory, initialSubSlug }: Props) {
  const locale = useLocale();
  const isEn = locale === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero */}
      <div className="relative w-full aspect-[3/2] md:aspect-auto md:h-[80vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
          alt="Medical professionals"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15233E] via-[#15233E]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 lg:-mt-24">

        {/* Title */}
        <div className="bg-gray-50 rounded-t-[32px] p-6 lg:p-10 mb-8 flex items-center min-h-[100px]">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#2C3E5D]">{categoryName}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
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
            <div className="relative mb-4 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={isEn ? 'Search' : 'ค้นหา'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-32 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#15233E] focus:ring-1 focus:ring-[#15233E] text-gray-700 bg-white shadow-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-[#15233E] hover:bg-[#1f335c] text-white text-sm font-medium rounded-full transition-colors">
                    <MagnifyingGlassIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{isEn ? 'Search' : 'ค้นหา'}</span>
                  </button>
                </div>
              </div>
              {/* Mobile filter button */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`lg:hidden flex items-center justify-center min-w-[3.5rem] aspect-square rounded-full border transition-colors shrink-0 ${
                  filterOpen ? 'bg-[#15233E] border-[#15233E] text-white' : 'bg-white border-gray-300 text-[#15233E]'
                }`}
              >
                <FunnelIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile FilterCard */}
            {filterOpen && (
              <div className="lg:hidden mb-6">
                <FilterCard
                  subCategories={subCategories}
                  selectedSubs={selectedSubs}
                  onToggle={toggleSub}
                  onClear={() => setSelectedSubs([])}
                  isEn={isEn}
                  showSearch
                  onSearch={() => setFilterOpen(false)}
                />
              </div>
            )}

            {/* Product Grid */}
            <div className="mt-6 grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
              {subCategories.map((sub) => {
                const subName = isEn ? sub.name_en : sub.name_th;
                return (
                  <ProductCard
                    key={sub.id}
                    name="Product Name"
                    subCategory={subName}
                  />
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
