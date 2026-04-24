'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toSlug } from '@wmt/shared';

type DepartmentScrollerItem = {
  id: string;
  name: string;
  accent: string;
  image_url?: string | null;
};

type DepartmentScrollerProps = {
  items: DepartmentScrollerItem[];
};

function getInitials(name: string) {
  return name
    .split(/[\s&/+-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function splitDepartmentLines(name: string) {
  const parts = name.split(' ').filter(Boolean);

  if (parts.length <= 1) {
    return {
      firstLine: name,
      secondLine: null,
    };
  }

  let bestIndex = 1;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let index = 1; index < parts.length; index += 1) {
    const firstLine = parts.slice(0, index).join(' ');
    const secondLine = parts.slice(index).join(' ');
    const score = Math.abs(firstLine.length - secondLine.length);

    if (score < bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return {
    firstLine: parts.slice(0, bestIndex).join(' '),
    secondLine: parts.slice(bestIndex).join(' '),
  };
}

function DepartmentCard({
  item,
  isDragging,
  onCardClick,
}: {
  item: DepartmentScrollerItem;
  isDragging: boolean;
  onCardClick: (e: React.MouseEvent) => void;
}) {
  const { firstLine, secondLine } = splitDepartmentLines(item.name);

  return (
    <Link
      href={`/department/${toSlug(item.name)}`}
      onClick={onCardClick}
      className={`group relative shrink-0 overflow-hidden rounded-[2rem] border border-black/5 bg-[#dfe7f5] transition-all duration-500 ${
        isDragging ? 'cursor-grabbing' : 'cursor-pointer'
      }`}
      style={{
        width: 'min(68vw, 18.75rem)',
        aspectRatio: '3 / 4',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{ background: item.accent }}
      />
      {item.image_url && (
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#112246]/90 via-[#112246]/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 pt-16">
        <p className="text-balance text-left text-base leading-tight font-bold uppercase text-white md:text-lg">
          <span className="block">{firstLine}</span>
          {secondLine ? <span className="block">{secondLine}</span> : null}
        </p>
      </div>
    </Link>
  );
}

export default function DepartmentScroller({ items }: DepartmentScrollerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0, didDrag: false });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    dragStateRef.current = { startX: e.clientX, startScrollLeft: viewport.scrollLeft, didDrag: false };

    const handleMouseMove = (e: MouseEvent) => {
      const distance = e.clientX - dragStateRef.current.startX;
      if (Math.abs(distance) > 4) dragStateRef.current.didDrag = true;
      viewport.scrollLeft = dragStateRef.current.startScrollLeft - distance;
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (dragStateRef.current.didDrag) e.preventDefault();
  };

  const CARD_WIDTH = 300 + 20; // min(68vw, 18.75rem) + gap-5

  const scrollBy = (dir: 1 | -1) => {
    viewportRef.current?.scrollBy({ left: dir * CARD_WIDTH, behavior: 'smooth' });
  };

  return (
    <div className="mt-12">
      <div
        ref={viewportRef}
        className="overflow-x-auto touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex w-max items-stretch gap-5 px-1">
          {items.map((item) => (
            <DepartmentCard key={item.id} item={item} isDragging={false} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between pl-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#112246]/46">
          Drag to explore
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#112246]/20 text-[#112246] transition-colors hover:bg-[#112246]/10"
          >
            &#8592;
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#112246]/20 text-[#112246] transition-colors hover:bg-[#112246]/10"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
