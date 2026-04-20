'use client';

const row1 = Array.from({ length: 10 }, (_, i) => i + 1);
const row2 = Array.from({ length: 10 }, (_, i) => i + 11);

function CarouselRow({ items, reverse }: { items: number[]; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }} />
      <div
        className="flex gap-8 w-max"
        style={{ animation: `${reverse ? 'scrollRight' : 'scrollLeft'} 40s linear infinite` }}
      >
        {doubled.map((n, i) => (
          <div
            key={i}
            className="shrink-0 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center text-gray-300 text-sm font-bold"
            style={{ width: '18vw', aspectRatio: '3/4' }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CareerCarousel() {
  return (
    <section className="py-16 bg-white">
      <div className="flex flex-col gap-8">
        <CarouselRow items={row1} />
        <CarouselRow items={row2} reverse />
      </div>
    </section>
  );
}
