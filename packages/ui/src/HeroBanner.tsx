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
  ctaHref,
  className = "",
}: HeroBannerProps) {
  return (
    <section
      className={["bg-[#f4f7fb] px-4 pb-14 pt-32 md:px-10 md:pb-16 md:pt-36 lg:px-12", className].filter(Boolean).join(" ")}
    >
      <div className="relative mx-auto min-h-[30rem] w-full max-w-[1180px] overflow-hidden rounded-[2.5rem] border border-[#122246]/10 bg-[#122246] shadow-[0_32px_90px_rgba(18,34,70,0.2)] md:min-h-[38rem]">
        <Image
          src={backgroundImageUrl}
          alt={backgroundAlt}
          fill
          preload
          quality={80}
          sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1280px) calc(100vw - 6rem), 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122246] via-[#122246]/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-12 md:pb-8">
          <h1 className="text-3xl uppercase leading-tight tracking-tight text-white md:text-[3.35rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-[20px] font-normal text-white/80">
              {description}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className="mt-8 inline-flex rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              {ctaLabel}
            </a>
          )}
          {ctaLabel && !ctaHref && (
            <button
              type="button"
              className="mt-8 inline-flex rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
