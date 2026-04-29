'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT = 'A Leading Medical Solutions Provider Delivering Quality Hospital Products and Professional Services.';

export default function ScrollTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const words = wordsRef.current;
    if (!words.length) return;

    gsap.set(words, { opacity: 0.15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    });

    tl.to(words, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const words = TEXT.split(' ');

  return (
    <section ref={containerRef} className="relative z-10 bg-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-[2rem] font-bold leading-snug text-[#112246] md:text-[2.75rem] lg:text-[3.5rem]">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { if (el) wordsRef.current[i] = el; }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
