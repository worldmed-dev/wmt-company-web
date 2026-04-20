import Image from 'next/image';
import CareerCarousel from '@/components/career/CareerCarousel';

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="w-full min-h-[72vh] md:min-h-[82vh] flex flex-col items-center justify-center px-6 py-24 md:px-12 md:py-32">
        <h1
          className="text-4xl md:text-6xl text-[#112246] leading-tight text-center"
          style={{ fontFamily: 'var(--font-architects-daughter)' }}
        >
          Bring your true self.<br />
          Do your best work.
        </h1>
        <button
          className="mt-8 px-8 py-3 border border-[#112246]/20 bg-[#112246]/10 backdrop-blur-md text-[#112246] text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#112246]/20 transition-colors"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          Join Us
        </button>
      </div>
      <CareerCarousel />
      <section className="bg-[#112246] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Work at WORLDMED
            </h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              We take our work seriously, but never ourselves. Expect big challenges, impactful projects, and a team that knows how to celebrate every win together.
            </p>
            <button className="mt-8 rounded-full border border-white/15 bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/18">
              Learn more about our team
            </button>
          </div>
          <div className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/18 via-white/10 to-white/5">
              <Image
                src="https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/employee_works/Sing%20and%20team.webp"
                alt="World Med team at work"
                fill
                sizes="(max-width: 1024px) calc(100vw - 3rem), 46vw"
                quality={80}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
