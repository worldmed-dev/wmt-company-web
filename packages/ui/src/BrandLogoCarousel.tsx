'use client';

type Brand = { id: number; logo_url: string };

function CarouselRow({ brands, reverse }: { brands: Brand[]; reverse?: boolean }) {
  const doubled = [...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, var(--ci-primary), transparent)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, var(--ci-primary), transparent)' }}
      />
      <div
        className="flex w-max items-center gap-6 md:gap-10"
        style={{ animation: `${reverse ? 'scrollRight' : 'scrollLeft'} 80s linear infinite` }}
      >
        {doubled.map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="flex h-12 w-[9rem] shrink-0 items-center justify-center md:h-14 md:w-[11rem] lg:w-[12rem]"
          >
            <img
              src={brand.logo_url}
              alt={`Brand ${brand.id}`}
              className="max-h-full w-auto max-w-full object-contain brightness-0 invert opacity-50"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrandLogoCarousel({ row1, row2 }: { row1: Brand[]; row2: Brand[] }) {
  return (
    <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-10 px-6 md:px-12">
      <CarouselRow brands={row1} />
      <CarouselRow brands={row2} reverse />
    </div>
  );
}
