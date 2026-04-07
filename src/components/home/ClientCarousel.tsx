'use client';

const clients = Array.from({ length: 18 }, (_, i) => `Client ${i + 1}`);
const row1 = clients.slice(0, 9);
const row2 = clients.slice(9, 18);

function CarouselRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-12 w-max"
        style={{
          animation: `${reverse ? 'scrollRight' : 'scrollLeft'} 20s linear infinite`,
        }}
      >
        {doubled.map((name, i) => (
          <span key={i} className="text-white/40 text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ClientCarousel() {
  return (
    <div className="flex flex-col gap-6 mt-8 max-w-7xl mx-auto px-6 md:px-12">
      <CarouselRow items={row1} />
      <CarouselRow items={row2} reverse />
    </div>
  );
}
