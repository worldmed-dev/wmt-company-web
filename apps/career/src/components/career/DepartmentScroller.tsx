'use client';

import { useRef, useState } from 'react';

type DepartmentScrollerItem = {
  id: string;
  name: string;
  accent: string;
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
}: {
  item: DepartmentScrollerItem;
  isDragging: boolean;
}) {
  const { firstLine, secondLine } = splitDepartmentLines(item.name);

  return (
    <article
      className={`group relative shrink-0 overflow-hidden rounded-[2rem] border border-black/5 bg-[#dfe7f5] transition-all duration-500 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_28%),linear-gradient(to_top,rgba(17,34,70,0.96),rgba(17,34,70,0.42)_58%,rgba(17,34,70,0.16))]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="pointer-events-none select-none text-6xl font-bold tracking-[0.18em] text-white/16 md:text-7xl">
          {getInitials(item.name)}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="min-h-[4.75rem] md:min-h-[5.25rem]">
          <p className="text-balance text-left text-base leading-tight font-bold uppercase text-[#FF8300] md:text-lg">
            <span className="block">{firstLine}</span>
            {secondLine ? <span className="block">{secondLine}</span> : null}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function DepartmentScroller({ items }: DepartmentScrollerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    dragging: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    dragStateRef.current = {
      dragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
    };

    setIsDragging(true);
    viewport.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;

    if (!viewport || !dragStateRef.current.dragging) {
      return;
    }

    event.preventDefault();

    const distance = event.clientX - dragStateRef.current.startX;
    viewport.scrollLeft = dragStateRef.current.scrollLeft - distance;
  }

  function endDrag(pointerId?: number) {
    const viewport = viewportRef.current;

    if (!viewport || !dragStateRef.current.dragging) {
      return;
    }

    dragStateRef.current.dragging = false;
    setIsDragging(false);

    if (typeof pointerId === 'number' && viewport.hasPointerCapture(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }
  }

  return (
    <div className="mt-12">
      <div
        ref={viewportRef}
        className="overflow-x-auto select-none touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => endDrag(event.pointerId)}
        onPointerCancel={(event) => endDrag(event.pointerId)}
      >
        <div className="flex w-max items-stretch gap-5 px-1">
          {items.map((item) => (
            <DepartmentCard key={item.id} item={item} isDragging={isDragging} />
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-start pl-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#112246]/46">
          Drag to explore
        </p>
      </div>
    </div>
  );
}
