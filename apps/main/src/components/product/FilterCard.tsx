'use client';

import { useState } from 'react';
import { CheckIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import type { SubCategory } from '@wmt/shared';

type Props = {
  subCategories: SubCategory[];
  selectedSubs: number[];
  onToggle: (id: number) => void;
  onClear: () => void;
  isEn: boolean;
  showSearch?: boolean;
  onSearch?: () => void;
};

export default function FilterCard({
  subCategories,
  selectedSubs,
  onToggle,
  onClear,
  isEn,
  showSearch,
  onSearch,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-2 text-[#2C3E5D]">
          <FunnelIcon className="h-4 w-4" />
          <span className="text-sm font-bold">{isEn ? 'Filter' : 'กรอง'}</span>
        </div>
      </div>

      <div className="px-6 py-4">
        <button onClick={() => setOpen(!open)} className="mb-3 flex w-full items-center justify-between">
          <span className="text-sm font-bold text-[#2C3E5D]">
            {isEn ? 'By Category' : 'หมวดหมู่'}
            <span className="ml-1.5 text-xs font-medium text-gray-400">({subCategories.length})</span>
          </span>
          <ChevronDownIcon
            className="h-4 w-4 text-gray-400"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            transition: 'grid-template-rows 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="overflow-hidden">
            <div className="space-y-2.5 pb-1">
              {subCategories.map((sub) => {
                const checked = selectedSubs.includes(sub.id);
                return (
                  <label
                    key={sub.id}
                    className="group flex cursor-pointer items-center gap-3"
                    onClick={() => onToggle(sub.id)}
                  >
                    <div
                      className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border"
                      style={{
                        backgroundColor: checked ? '#15233E' : 'transparent',
                        borderColor: checked ? '#15233E' : '#d1d5db',
                        transition:
                          'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <CheckIcon
                        className="h-3 w-3 stroke-2 text-white"
                        style={{
                          opacity: checked ? 1 : 0,
                          transform: checked ? 'scale(1)' : 'scale(0.5)',
                          transition:
                            'opacity 150ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      />
                    </div>
                    <span
                      className="text-sm text-gray-600"
                      style={{ transition: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                      {isEn ? sub.name_en : sub.name_th}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <hr className="mb-4 border-gray-100" />
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="flex-1 rounded-xl bg-[#15233E] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f335c]"
          >
            {isEn ? 'Clear All' : 'ล้างทั้งหมด'}
          </button>
          {showSearch && onSearch && (
            <button
              onClick={onSearch}
              className="flex-1 rounded-xl border-2 border-[#15233E] bg-white px-4 py-3 text-sm font-semibold text-[#15233E] transition-colors hover:bg-gray-50"
            >
              {isEn ? 'Search' : 'ค้นหา'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
