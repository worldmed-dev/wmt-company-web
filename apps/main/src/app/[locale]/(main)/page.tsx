import Image from 'next/image';
import ClientCarousel from '@/components/home/ClientCarousel';
import HeroSectionWrapper from '@/components/home/HeroSectionWrapper';
import ScrollTextSection from '@/components/home/ScrollTextSection';
import ProductsServicesSection from '@/components/home/ProductsServicesSection';

export default async function Home() {
  return (
    <>
      <main>
        <HeroSectionWrapper />

        <ScrollTextSection />

        <ProductsServicesSection />

        {/* Clients */}
        <section className="relative z-10 py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#112246]/40">Our Global Partner</h2>
          </div>
          <ClientCarousel />
        </section>

        {/* Our Key Business */}
        <section className="relative z-10 py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#122246] mb-12 text-center">Our Key Business</h2>
          </div>
        </section>
      </main>
    </>
  );
}
