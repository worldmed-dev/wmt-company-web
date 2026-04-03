import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <Hero />

        {/* Clients placeholder */}
        <section className="py-20 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#0f172a]">Our Client</h2>
          <div className="mt-8 flex justify-center gap-12 text-gray-300 text-xs font-semibold tracking-widest uppercase">
            {['Client A', 'Client B', 'Client C', 'Client D', 'Client E'].map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
