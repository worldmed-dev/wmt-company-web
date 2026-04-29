'use client';

import { useState, useEffect } from 'react';

const TABS = [
  { key: 'products', label: 'Products' },
  { key: 'services', label: 'Services' },
] as const;

const MOCK = {
  products: [
    {
      title: 'Imaging Systems',
      desc: 'Advanced diagnostic imaging solutions for hospitals and clinics. Our portfolio includes MRI, CT, and ultrasound systems from leading global brands.',
      tag: 'Radiology',
      image: 'https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/cover_test.jpg',
    },
    {
      title: 'Patient Monitoring',
      desc: 'Real-time vital sign monitoring for critical care environments. Seamlessly integrated with hospital information systems.',
      tag: 'ICU',
      image: 'https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/cover_test.jpg',
    },
    {
      title: 'Surgical Equipment',
      desc: 'Precision instruments for minimally invasive procedures. Trusted by surgeons across Thailand.',
      tag: 'Surgery',
      image: 'https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/cover_test.jpg',
    },
  ],
  services: [
    {
      title: 'Installation & Setup',
      desc: 'Professional on-site installation and commissioning of medical devices by certified engineers.',
      tag: 'Technical',
      image: 'https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/cover_test.jpg',
    },
    {
      title: 'Training Programs',
      desc: 'Hands-on training for clinical staff and biomedical engineers to maximize device performance.',
      tag: 'Education',
      image: 'https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/cover_test.jpg',
    },
    {
      title: 'Maintenance & Repair',
      desc: 'Preventive maintenance and rapid repair services nationwide to minimize downtime.',
      tag: 'Support',
      image: 'https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/cover_image/cover_test.jpg',
    },
  ],
};

export default function ProductsServicesSection() {
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [activeItem, setActiveItem] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const items = MOCK[activeTab];
  const current = items[activeItem] ?? items[0];

  const handleTabChange = (tab: 'products' | 'services') => {
    setActiveTab(tab);
    setActiveItem(0);
  };

  if (!mounted) return null;

  return (
    <section className="relative z-10 bg-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] border border-[#112246]/8 overflow-hidden">

          {/* Tabs */}
          <div className="flex justify-center gap-1 p-4 border-b border-[#112246]/8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#112246] text-white'
                    : 'text-[#112246]/50 hover:text-[#112246]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row">

            {/* Left — text + item list */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#112246]/40 border border-[#112246]/15 rounded-full px-3 py-0.5 mb-4">
                  {current.tag}
                </span>
                <h3 className="text-2xl font-bold text-[#112246] md:text-3xl">{current.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#112246]/60">{current.desc}</p>
                <button className="mt-8 rounded-full bg-[#112246] px-6 py-2.5 text-sm font-bold uppercase text-white hover:bg-[#112246]/80 transition-colors">
                  Learn More
                </button>
              </div>

              {/* Item selector */}
              <div className="mt-10 flex flex-col gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => setActiveItem(i)}
                    className={`text-left px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
                      activeItem === i
                        ? 'bg-[#112246]/8 text-[#112246]'
                        : 'text-[#112246]/40 hover:text-[#112246]'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — image */}
            <div className="lg:w-1/2 shrink-0">
              <div className="relative h-64 lg:h-full min-h-[320px]">
                <img
                  src={current.image}
                  alt={current.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
