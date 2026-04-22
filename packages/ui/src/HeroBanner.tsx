import Image from 'next/image';

type HeroBannerProps = {
  backgroundImageUrl: string;
  backgroundAlt: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

export function HeroBanner({
  backgroundImageUrl,
  backgroundAlt,
  title,
  description,
  ctaLabel,
  ctaHref = "#",
  className = "",
}: HeroBannerProps) {
  return (
    <div
      className={["relative min-h-screen w-full overflow-hidden bg-[#122246]", className].filter(Boolean).join(" ")}
      style={{ height: '100svh' }}
    >
      <Image
        src={backgroundImageUrl}
        alt={backgroundAlt}
        fill
        preload
        quality={80}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#122246] via-[#122246]/20 to-transparent" />

      <div className="absolute bottom-10 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6 md:px-12">
        <h1 className="text-3xl font-normal uppercase leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-[20px] font-normal text-white/80">
            {description}
          </p>
        )}
        {ctaLabel && (
          <a
            href={ctaHref}
            className="mt-8 inline-flex rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/20"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}
