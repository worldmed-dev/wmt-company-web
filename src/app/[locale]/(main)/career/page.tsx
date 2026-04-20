import CareerCarousel from '@/components/career/CareerCarousel';

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="w-full h-screen flex flex-col items-center justify-center px-6 md:px-12">
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
    </div>
  );
}
