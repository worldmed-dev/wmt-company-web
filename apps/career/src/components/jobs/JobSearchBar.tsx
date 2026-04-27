'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const PLACEHOLDERS = ['Ready to Explore?', 'Find your next Opportunity'];

function useTypingPlaceholder(texts: string[]) {
  const [display, setDisplay] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    const current = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 60);
    } else if (!deleting && charIndex === current.length) {
      if (textIndex === texts.length - 1) { done.current = true; return; }
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  return display;
}

export default function JobSearchBar() {
  const placeholder = useTypingPlaceholder(PLACEHOLDERS);

  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#112246]/40" />
      <input
        type="text"
        placeholder={placeholder || ' '}
        className="w-full pl-16 pr-8 py-6 rounded-full border border-[#112246]/15 bg-[#f4f7fb] focus:outline-none focus:border-[#112246]/40 text-[#112246] text-lg text-center shadow-sm"
      />
    </div>
  );
}
