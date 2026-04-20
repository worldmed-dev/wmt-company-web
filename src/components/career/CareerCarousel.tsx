import { getEmployerBrandingCards, type EmployerBrandingCard } from '@/lib/employerBranding';

function CarouselRow({ items, reverse }: { items: EmployerBrandingCard[]; reverse?: boolean }) {
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
        {doubled.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            className="group relative shrink-0 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center text-gray-300 text-sm font-bold border border-black/5"
            style={{ width: '16vw', aspectRatio: '3/4' }}
          >
            {card.imageUrl ? (
              <img
                src={card.imageUrl}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <span className="text-[#112246]/30 transition-opacity duration-300 group-hover:opacity-0">{card.id}</span>
            )}
            <div className="absolute inset-0 bg-[#112246]/92 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center px-5 py-8 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="max-w-[85%] text-sm leading-relaxed text-white">
                {card.quote}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-left text-sm font-semibold text-white">{card.name}</p>
              <p className="mt-1 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">{card.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function CareerCarousel() {
  const cards = await getEmployerBrandingCards();
  const row1 = cards.slice(0, 10);
  const row2 = cards.slice(10, 20);

  return (
    <section className="py-16 bg-white">
      <div className="flex flex-col gap-8">
        <CarouselRow items={row1} />
        <CarouselRow items={row2} reverse />
      </div>
    </section>
  );
}
