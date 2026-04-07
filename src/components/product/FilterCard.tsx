'use client';

import { useState } from 'react';
import { ChevronDownIcon, FunnelIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { SubCategory } from '@/lib/types';

type Props = {
  subCategories: SubCategory[];
  selectedSubs: number[];
  onToggle: (id: number) => void;
  onClear: () => void;
  isEn: boolean;
};

export default function FilterCard({ subCategories, selectedSubs, onToggle, onClear, isEn }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-[#2C3E5D]">
          <FunnelIcon className="w-4 h-4" />
          <span className="text-sm font-bold">{isEn ? 'Filter' : 'กรอง'}</span>
        </div>
      </div>

      {/* By Category */}
      <div className="px-6 py-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between mb-3"
        >
          <span className="text-sm font-bold text-[#2C3E5D]">
            {isEn ? 'By Category' : 'หมวดหมู่'}
            <span className="ml-1.5 text-xs font-medium text-gray-400">({subCategories.length})</span>
          </span>
          <ChevronDownIcon
            className="w-4 h-4 text-gray-400"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: `transform 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
          />
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            transition: `grid-template-rows 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        >
          <div className="overflow-hidden">
            <div className="space-y-2.5 pb-1">
              {subCategories.map((sub) => {
                const checked = selectedSubs.includes(sub.id);
                return (
                  <label
                    key={sub.id}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => onToggle(sub.id)}
                  >
                    <div
                      className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: checked ? '#15233E' : 'transparent',
                        borderColor: checked ? '#15233E' : '#d1d5db',
                        transition: `background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)`,
                      }}
                    >
                      <CheckIcon
                        className="w-3 h-3 text-white stroke-2"
                        style={{
                          opacity: checked ? 1 : 0,
                          transform: checked ? 'scale(1)' : 'scale(0.5)',
                          transition: `opacity 150ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                        }}
                      />
                    </div>
                    <span
                      className="text-sm text-gray-600"
                      style={{ transition: `color 150ms cubic-bezier(0.4, 0, 0.2, 1)` }}
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
        <hr className="border-gray-100 mb-4" />
        <button
          onClick={onClear}
          className="w-full py-3 px-4 bg-[#15233E] hover:bg-[#1f335c] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {isEn ? 'Clear All' : 'ล้างทั้งหมด'}
        </button>
      </div>
    </div>
  );
}
