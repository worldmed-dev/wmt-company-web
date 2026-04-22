'use client';

import { useState } from "react";
import { CheckIcon, ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/outline";

export type ProductFilterOption = {
  id: number;
  label: string;
};

type ProductFilterCardProps = {
  options: ProductFilterOption[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onClear: () => void;
  title: string;
  sectionLabel: string;
  clearLabel: string;
  showSearch?: boolean;
  searchLabel?: string;
  onSearch?: () => void;
};

export function ProductFilterCard({
  options,
  selectedIds,
  onToggle,
  onClear,
  title,
  sectionLabel,
  clearLabel,
  showSearch,
  searchLabel,
  onSearch,
}: ProductFilterCardProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-2 text-[#2C3E5D]">
          <FunnelIcon className="h-4 w-4" />
          <span className="text-sm font-bold">{title}</span>
        </div>
      </div>

      <div className="px-6 py-4">
        <button onClick={() => setOpen(!open)} className="mb-3 flex w-full items-center justify-between">
          <span className="text-sm font-bold text-[#2C3E5D]">
            {sectionLabel}
            <span className="ml-1.5 text-xs font-medium text-gray-400">({options.length})</span>
          </span>
          <ChevronDownIcon
            className="h-4 w-4 text-gray-400"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="overflow-hidden">
            <div className="space-y-2.5 pb-1">
              {options.map((option) => {
                const checked = selectedIds.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className="group flex cursor-pointer items-center gap-3"
                    onClick={() => onToggle(option.id)}
                  >
                    <div
                      className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border"
                      style={{
                        backgroundColor: checked ? "#15233E" : "transparent",
                        borderColor: checked ? "#15233E" : "#d1d5db",
                        transition:
                          "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <CheckIcon
                        className="h-3 w-3 stroke-2 text-white"
                        style={{
                          opacity: checked ? 1 : 0,
                          transform: checked ? "scale(1)" : "scale(0.5)",
                          transition:
                            "opacity 150ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      />
                    </div>
                    <span
                      className="text-sm text-gray-600"
                      style={{ transition: "color 150ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                    >
                      {option.label}
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
            {clearLabel}
          </button>
          {showSearch && onSearch && searchLabel && (
            <button
              onClick={onSearch}
              className="flex-1 rounded-xl border-2 border-[#15233E] bg-white px-4 py-3 text-sm font-semibold text-[#15233E] transition-colors hover:bg-gray-50"
            >
              {searchLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
