import ClientCarousel from '@/components/home/ClientCarousel';

export default async function Home() {
  return (
    <>
      <main>
        {/* Hero */}
        <div className="relative w-full h-screen overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
            alt="Medical professionals"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#122246] via-[#122246]/40 to-transparent" />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 md:px-12">
            <h1 className="text-3xl md:text-5xl tracking-tight text-white uppercase leading-tight">
              <span className="font-normal">Better Care</span><br />
              <span className="font-bold">Trust Always</span>
            </h1>
            <p className="mt-4 text-white/80 text-[20px] font-normal max-w-xl">
              Empowering healthcare with Medical Technology<br />
              from 30+ leading global medical brands.
            </p>
            <button className="mt-8 px-8 py-3 bg-white text-[#122246] text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/90 transition-colors">
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
      </main>
    </>
  );
}
