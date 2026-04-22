'use client';

import { useState } from 'react';
import type { EmployerBrandingCard } from '@/lib/employerBranding';

type CareerCarouselClientProps = {
  row1: EmployerBrandingCard[];
  row2: EmployerBrandingCard[];
};

type TiltState = {
  rotateX: number;
  rotateY: number;
  translateY: number;
  scale: number;
  glareX: number;
  glareY: number;
  glareOpacity: number;
};

const IDLE_TILT_STATE: TiltState = {
  rotateX: 0,
  rotateY: 0,
  translateY: 0,
  scale: 1,
  glareX: 50,
  glareY: 50,
  glareOpacity: 0,
};

function containsThai(text: string) {
  return /[\u0E00-\u0E7F]/.test(text);
}

function getHoverOverlayColor(color: string) {
  switch (color.trim().toLowerCase()) {
    case 'orange':
      return '#FF8300';
    case 'blue':
    default:
      return '#112246';
  }
}

function InteractiveCareerCard({ card }: { card: EmployerBrandingCard }) {
  const [tilt, setTilt] = useState<TiltState>(IDLE_TILT_STATE);
  const hoverOverlayColor = getHoverOverlayColor(card.color);
  const quoteIsThai = containsThai(card.quote);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width;
    const pointerY = (event.clientY - bounds.top) / bounds.height;
    const clampX = Math.min(Math.max(pointerX, 0), 1);
    const clampY = Math.min(Math.max(pointerY, 0), 1);

    setTilt({
      rotateX: (0.5 - clampY) * 16,
      rotateY: (clampX - 0.5) * 18,
      translateY: -12,
      scale: 1.025,
      glareX: clampX * 100,
      glareY: clampY * 100,
      glareOpacity: 0.12,
    });
  }

  function resetTilt() {
    setTilt(IDLE_TILT_STATE);
  }

  return (
    <div className="shrink-0" style={{ width: '16vw', perspective: '1400px' }}>
      <div
        className="group relative overflow-hidden rounded-2xl border border-black/5 bg-gray-100 text-gray-300 text-sm font-bold"
        style={{
          aspectRatio: '3 / 4',
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${tilt.translateY}px) scale(${tilt.scale})`,
          transformStyle: 'preserve-3d',
          transition:
            'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow:
            tilt.translateY !== 0
              ? '0 14px 24px rgba(17, 34, 70, 0.12)'
              : '0 6px 16px rgba(17, 34, 70, 0.06)',
          willChange: 'transform',
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        {card.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[#112246]/30 transition-opacity duration-300 group-hover:opacity-0">
            {card.id}
          </span>
        )}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: `${hoverOverlayColor}eb` }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,${tilt.glareOpacity}), transparent 24%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 py-8 text-center opacity-0 transition-opacity duration-300 -translate-y-4 group-hover:opacity-100"
          style={{ transform: `translateZ(28px) translateY(-1rem)` }}
        >
          <p
            className={`max-w-[85%] text-[11px] leading-relaxed text-white md:text-xs ${
              quoteIsThai ? 'font-normal' : 'font-bold'
            }`}
          >
            {card.quote}
          </p>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ transform: 'translateZ(34px)' }}
        >
          <p className="text-left text-sm font-semibold text-white">{card.name}</p>
          <p className="mt-1 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
            {card.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function CarouselRow({ items, reverse }: { items: EmployerBrandingCard[]; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }}
      />
      <div className="px-4 py-6 md:px-6 md:py-8">
        <div
          className="flex w-max gap-8 group-hover/career-carousel:[animation-play-state:paused]"
          style={{ animation: `${reverse ? 'scrollRight' : 'scrollLeft'} 40s linear infinite` }}
        >
          {doubled.map((card, index) => (
            <InteractiveCareerCard key={`${card.id}-${index}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CareerCarouselClient({
  row1,
  row2,
}: CareerCarouselClientProps) {
  return (
    <section className="group/career-carousel bg-white py-16">
      <div className="flex flex-col">
        <CarouselRow items={row1} />
        <CarouselRow items={row2} reverse />
      </div>
    </section>
  );
}
