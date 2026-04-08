'use client';

type Brand = { id: number; logo_url: string };

function CarouselRow({ brands, reverse }: { brands: Brand[]; reverse?: boolean }) {
  const doubled = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade left */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--ci-primary), transparent)' }} />
      {/* Fade right */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--ci-primary), transparent)' }} />
      <div
        className="flex items-center gap-12 w-max"
        style={{ animation: `${reverse ? 'scrollRight' : 'scrollLeft'} 80s linear infinite` }}
      >
        {doubled.map((brand, i) => (
          <img
            key={i}
            src={brand.logo_url}
            alt={`Brand ${brand.id}`}
            className="h-9 w-auto object-contain brightness-0 invert opacity-50"
          />
        ))}
      </div>
    </div>
  );
}

export default function CarouselClient({ row1, row2 }: { row1: Brand[]; row2: Brand[] }) {
  return (
    <div className="flex flex-col gap-8 mt-8 max-w-7xl mx-auto px-6 md:px-12">
      <CarouselRow brands={row1} />
      <CarouselRow brands={row2} reverse />
    </div>
  );
}
