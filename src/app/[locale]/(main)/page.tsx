import ClientCarousel from '@/components/home/ClientCarousel';

export default async function Home() {
  return (
    <>
      <main>
        {/* Hero */}
        <div className="relative w-full h-screen overflow-hidden">
          <img
            src="https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/test-cover.webp"
            alt="Medical professionals"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#122246] via-[#122246]/20 to-transparent" />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 md:px-12">
            <h1 className="text-3xl md:text-5xl tracking-tight text-white uppercase leading-tight font-normal">
              Better Care<br />
              Trust Always
            </h1>
            <p className="mt-4 text-white/80 text-[20px] font-normal max-w-xl">
              Empowering healthcare with Medical Technology<br />
              from 30+ leading global medical brands.
            </p>
            <button className="mt-8 px-8 py-3 border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/20 transition-colors">
              Get Demo
            </button>
          </div>
        </div>

        {/* Clients */}
        <section className="py-20" style={{ backgroundColor: 'var(--ci-primary)' }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Our Global Partner</h2>
          </div>
          <ClientCarousel />
        </section>

        {/* Our Key Business */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#122246] mb-12 text-center">Our Key Business</h2>
          </div>
        </section>
      </main>
    </>
  );
}
