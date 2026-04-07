'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/navigation';
import { useLocale } from 'next-intl';
import type { CategoryWithSubs, SubCategory } from '@/lib/types';
import { toSlug } from '@/lib/slug';

type Props = {
  allCategories: CategoryWithSubs[];
  currentCategory: CategoryWithSubs | null;
  initialSubId?: number | null;
};

export default function ProductListClient({ allCategories, currentCategory, initialSubId }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const isEn = locale === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubs, setSelectedSubs] = useState<number[]>(initialSubId ? [initialSubId] : []);

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
      <div className="relative w-full h-[350px] lg:h-[450px] bg-[#1a2340]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#15233E] via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 lg:-mt-24">

        {/* Title */}
        <div className="bg-white rounded-t-[32px] shadow-sm p-6 lg:p-10 mb-8 flex items-center min-h-[100px]">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#2C3E5D]">{categoryName}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

              {/* By Category */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-[#2C3E5D]">
                    {isEn ? 'By Category' : 'หมวดหมู่'} ({subCategories.length})
                  </h3>
                </div>
                <div className="space-y-3">
                  {subCategories.map((sub) => (
                    <label key={sub.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSubs.includes(sub.id)}
                        onChange={() => toggleSub(sub.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#15233E] focus:ring-[#15233E]"
                      />
                      <span className="text-sm text-gray-600">
                        {isEn ? sub.name_en : sub.name_th}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* All Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-[#2C3E5D] mb-4">
                  {isEn ? 'All Categories' : 'ทุกหมวดหมู่'}
                </h3>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.name_en)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                        currentCategory?.id === cat.id
                          ? 'bg-[#15233E] text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {isEn ? cat.name_en : cat.name_th}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedSubs([])}
                className="w-full py-3 px-4 bg-[#15233E] hover:bg-[#1f335c] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {isEn ? 'Clear All' : 'ล้างทั้งหมด'}
              </button>
            </div>
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
