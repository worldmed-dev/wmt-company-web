'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { toSlug, type CategoryWithSubs, type SubCategory } from '@wmt/shared';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import FilterCard from './FilterCard';
import ProductCard from './ProductCard';

type Props = {
  currentCategory: CategoryWithSubs | null;
  initialSubSlugs?: string[];
};

function resolveSelectedSubIds(subCategories: SubCategory[], selectedSlugs: string[]) {
  if (selectedSlugs.length === 0) return [];
  return subCategories
    .filter((sub) => selectedSlugs.includes(toSlug(sub.name_en)))
    .map((sub) => sub.id);
}

export default function ProductListClient({ currentCategory, initialSubSlugs = [] }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isEn = locale === 'en';

  const categoryName = currentCategory
    ? (isEn ? currentCategory.name_en : currentCategory.name_th)
    : '';

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [navbarHidden, setNavbarHidden] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const navbarEl = document.querySelector<HTMLElement>('#navbar-wrapper');
    if (!sentinel || !navbarEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hidden = !entry.isIntersecting;
        setNavbarHidden(hidden);
        navbarEl.style.transform = hidden ? 'translateY(-100%)' : 'translateY(0)';
        navbarEl.style.transition = 'transform 0.4s cubic-bezier(0, 0, 0.2, 1)';
      },
      { threshold: 0, rootMargin: '0px' }
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      navbarEl.style.transform = '';
      navbarEl.style.transition = '';
    };
  }, []);

  const subCategories: SubCategory[] = currentCategory?.sub_categories ?? [];
  const initialSubSlugsKey = initialSubSlugs.join('|');
  const [selectedSubs, setSelectedSubs] = useState<number[]>(() =>
    resolveSelectedSubIds(subCategories, initialSubSlugs)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  useEffect(() => {
    setSelectedSubs(resolveSelectedSubIds(currentCategory?.sub_categories ?? [], initialSubSlugs));
  }, [currentCategory, initialSubSlugsKey]);

  const syncSelectedSubs = (nextSelectedSubs: number[]) => {
    setSelectedSubs(nextSelectedSubs);
    const params = new URLSearchParams(window.location.search);
    params.delete('sub');
    nextSelectedSubs
      .map((subId) => subCategories.find((sub) => sub.id === subId))
      .filter((sub): sub is SubCategory => Boolean(sub))
      .forEach((sub) => params.append('sub', toSlug(sub.name_en)));
    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };

  const toggleSub = (id: number) => {
    syncSelectedSubs(
      selectedSubs.includes(id)
        ? selectedSubs.filter((subId) => subId !== id)
        : [...selectedSubs, id]
    );
  };

  const filteredSubCategories = subCategories.filter((sub) => {
    if (selectedSubs.length > 0 && !selectedSubs.includes(sub.id)) return false;
    if (!normalizedQuery) return true;
    return (
      sub.name_en.toLowerCase().includes(normalizedQuery) ||
      sub.name_th.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <>
      {/* Sentinel — sits at top of page content, below navbar */}
      <div ref={sentinelRef} className="h-px" style={{ marginTop: '96px' }} />

      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky z-[49] flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          top: navbarHidden ? '0px' : '96px',
          height: '56px',
          backgroundColor: 'var(--ci-primary-deep)',
          transition: 'top 0.4s cubic-bezier(0, 0, 0.2, 1)',
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="text-[18px] font-bold text-white">{categoryName}</h1>
        </div>
      </motion.div>

      <div className="min-h-screen bg-gray-50 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterCard
              subCategories={subCategories}
              selectedSubs={selectedSubs}
              onToggle={toggleSub}
              onClear={() => syncSelectedSubs([])}
              isEn={isEn}
            />
          </aside>

          {/* Main */}
          <main className="flex-1">
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
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`lg:hidden flex items-center justify-center min-w-[3.5rem] aspect-square rounded-full border transition-colors shrink-0 ${
                  filterOpen ? 'bg-[#15233E] border-[#15233E] text-white' : 'bg-white border-gray-300 text-[#15233E]'
                }`}
              >
                <FunnelIcon className="w-5 h-5" />
              </button>
            </div>

            {filterOpen && (
              <div className="lg:hidden mb-6">
                <FilterCard
                  subCategories={subCategories}
                  selectedSubs={selectedSubs}
                  onToggle={toggleSub}
                  onClear={() => syncSelectedSubs([])}
                  isEn={isEn}
                  showSearch
                  onSearch={() => setFilterOpen(false)}
                />
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
              {filteredSubCategories.map((sub) => (
                <ProductCard
                  key={sub.id}
                  name="Product Name"
                  subCategory={isEn ? sub.name_en : sub.name_th}
                />
              ))}
            </div>

            {filteredSubCategories.length === 0 && (
              <div className="mt-6 rounded-[32px] border border-dashed border-[#15233E]/15 bg-white px-6 py-12 text-center text-[#2C3E5D]/70 shadow-sm">
                <p className="text-base font-semibold">
                  {isEn ? 'No matching subcategories found.' : 'ไม่พบหมวดหมู่ย่อยที่ตรงกับตัวกรอง'}
                </p>
                <p className="mt-2 text-sm text-[#2C3E5D]/50">
                  {isEn
                    ? 'Try clearing the filter or searching with a different keyword.'
                    : 'ลองล้างตัวกรองหรือค้นหาด้วยคำอื่น'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
      </div>
    </>
  );
}
