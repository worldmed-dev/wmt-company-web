import Image from 'next/image';
import ClientCarousel from '@/components/home/ClientCarousel';

export default async function Home() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pb-10 pt-24 md:pb-12 md:pt-24">
          <div className="relative mx-auto min-h-[36rem] w-full max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-white md:min-h-[46rem]">
            <Image
              src="https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/test-cover.webp"
              alt="Medical professionals"
              fill
              preload
              quality={80}
              sizes="(max-width: 1448px) calc(100vw - 3rem), 1400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/12 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-12 md:pb-8">
              <h1 className="text-3xl uppercase leading-tight tracking-tight text-white md:text-[3.35rem]">
                <span className="font-normal">Better Care</span>
                <br />
                <span className="font-bold">Trust Always</span>
              </h1>
              <p className="mt-4 max-w-xl text-[20px] font-normal text-white/80">
                Empowering healthcare with Medical Technology
                <br />
                from 30+ leading global medical brands.
              </p>
              <button
                type="button"
                className="mt-8 inline-flex rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Get Demo
              </button>
            </div>
          </div>
        </section>

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
