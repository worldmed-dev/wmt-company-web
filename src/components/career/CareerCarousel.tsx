import { getEmployerBrandingCards, type EmployerBrandingCard } from '@/lib/employerBranding';

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

function CarouselRow({ items, reverse }: { items: EmployerBrandingCard[]; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }} />
      <div
        className="flex gap-8 w-max group-hover/career-carousel:[animation-play-state:paused]"
        style={{ animation: `${reverse ? 'scrollRight' : 'scrollLeft'} 40s linear infinite` }}
      >
        {doubled.map((card, i) => {
          const hoverOverlayColor = getHoverOverlayColor(card.color);
          const quoteIsThai = containsThai(card.quote);

          return (
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
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundColor: `${hoverOverlayColor}eb` }}
              />
              <div className="absolute inset-0 flex items-center justify-center px-5 py-8 text-center opacity-0 transition-opacity duration-300 -translate-y-4 group-hover:opacity-100">
                <p className={`max-w-[85%] text-[11px] leading-relaxed text-white md:text-xs ${quoteIsThai ? 'font-normal' : 'font-bold'}`}>
                  {card.quote}
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-left text-sm font-semibold text-white">{card.name}</p>
                <p className="mt-1 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">{card.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function CareerCarousel() {
  const cards = await getEmployerBrandingCards();
  const row1 = cards.slice(0, 10);
  const row2 = cards.slice(10, 20);

  return (
    <section className="group/career-carousel py-16 bg-white">
      <div className="flex flex-col gap-8">
        <CarouselRow items={row1} />
        <CarouselRow items={row2} reverse />
      </div>
    </section>
  );
}
