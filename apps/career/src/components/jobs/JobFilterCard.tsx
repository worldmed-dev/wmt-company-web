'use client';

import { useState } from 'react';
import { CheckIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

type FilterSection = {
  label: string;
  key: string;
  options: string[];
};

type Props = {
  sections: FilterSection[];
  selected: Record<string, string[]>;
  onToggle: (key: string, value: string) => void;
  onClear: () => void;
};

function FilterGroup({
  section,
  selected,
  onToggle,
}: {
  section: FilterSection;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="px-6 py-4 border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="mb-3 flex w-full items-center justify-between">
        <span className="text-sm font-bold text-[#2C3E5D]">
          {section.label}
          <span className="ml-1.5 text-xs font-medium text-gray-400">({section.options.length})</span>
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
            {section.options.map((option) => {
              const checked = selected.includes(option);
              return (
                <label key={option} className="group flex cursor-pointer items-center gap-3" onClick={() => onToggle(option)}>
                  <div
                    className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border"
                    style={{
                      backgroundColor: checked ? '#112246' : 'transparent',
                      borderColor: checked ? '#112246' : '#d1d5db',
                      transition: 'background-color 150ms ease, border-color 150ms ease',
                    }}
                  >
                    <CheckIcon
                      className="h-3 w-3 stroke-2 text-white"
                      style={{
                        opacity: checked ? 1 : 0,
                        transform: checked ? 'scale(1)' : 'scale(0.5)',
                        transition: 'opacity 150ms ease, transform 150ms ease',
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{option}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobFilterCard({ sections, selected, onToggle, onClear }: Props) {
  const totalSelected = Object.values(selected).flat().length;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-2 text-[#2C3E5D]">
          <FunnelIcon className="h-4 w-4" />
          <span className="text-sm font-bold">Filter</span>
          {totalSelected > 0 && (
            <span className="ml-1 rounded-full bg-[#112246] px-2 py-0.5 text-[10px] font-bold text-white">
              {totalSelected}
            </span>
          )}
        </div>
        {totalSelected > 0 && (
          <button onClick={onClear} className="text-xs font-semibold text-[#112246]/50 hover:text-[#112246] transition-colors">
            Clear all
          </button>
        )}
      </div>

      {sections.map((section) => (
        <FilterGroup
          key={section.key}
          section={section}
          selected={selected[section.key] ?? []}
          onToggle={(value) => onToggle(section.key, value)}
        />
      ))}
    </div>
  );
}
