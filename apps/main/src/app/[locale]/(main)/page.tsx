import { HeroBanner } from '@wmt/ui';
import ClientCarousel from '@/components/home/ClientCarousel';

export default async function Home() {
  return (
    <>
      <main>
        {/* Hero */}
        <HeroBanner
          backgroundImageUrl="https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/test-cover.webp"
          backgroundAlt="Medical professionals"
          title={
            <>
              Better Care
              <br />
              Trust Always
            </>
          }
          description={
            <>
              Empowering healthcare with Medical Technology
              <br />
              from 30+ leading global medical brands.
            </>
          }
          ctaLabel="Get Demo"
        />

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
