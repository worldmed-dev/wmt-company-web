'use client';

type Brand = { id: number; logo_url: string };

function CarouselRow({ brands, reverse }: { brands: Brand[]; reverse?: boolean }) {
  const doubled = [...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, white, transparent)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, white, transparent)' }}
      />
      <div
        className="flex w-max items-center gap-12"
        style={{ animation: `${reverse ? 'scrollRight' : 'scrollLeft'} 80s linear infinite` }}
      >
        {doubled.map((brand, index) => (
          <img
            key={`${brand.id}-${index}`}
            src={brand.logo_url}
            alt={`Brand ${brand.id}`}
            className="h-8 max-w-[8rem] w-auto object-contain brightness-0 opacity-20 md:max-w-[8.5rem]"
          />
        ))}
      </div>
    </div>
  );
}

export function BrandLogoCarousel({ row1, row2 }: { row1: Brand[]; row2: Brand[] }) {
  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-8 px-6 md:px-12">
      <CarouselRow brands={row1} />
      <CarouselRow brands={row2} reverse />
    </div>
  );
}
