'use client';

import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ['3.5rem', '0rem']);
  const padding = useTransform(scrollYProgress, [0, 0.4], ['2rem', '0rem']);

  return (
    <section ref={ref} className="relative w-full h-screen bg-white">
      <motion.div
        className="relative w-full h-full overflow-hidden"
        style={{ borderRadius, padding }}
      >
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 'inherit' }}>
          <Image
            src="https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/cover_test.jpg"
            alt="Medical professionals"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/12 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12 md:pb-16">
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
      </motion.div>
    </section>
  );
}
