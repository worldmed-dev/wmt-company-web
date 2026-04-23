import type { Metadata } from 'next';
import Link from 'next/link';
import CareerCarousel from '@/components/career/CareerCarousel';
import CultureBenefitsGrid from '@/components/career/CultureBenefitsGrid';
import { CULTURE_PILLARS, CULTURE_STATS } from '@/lib/culture';
import { getMainSiteUrl, joinSiteUrl } from '@wmt/shared';

export const metadata: Metadata = {
  title: 'Culture | World Med Careers',
  description: 'Explore how World Med works together, grows together, and supports great work.',
};

const mainSiteUrl = getMainSiteUrl();

export default function CulturePage() {
  return (
    <main className="bg-[#f4f7fb] text-[#112246]">
      <section className="relative overflow-hidden bg-[#112246] px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-8rem] top-20 h-56 w-56 rounded-full bg-[#ff8300]/18 blur-3xl" />
          <div className="absolute right-[-6rem] top-8 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-[#6d93d4]/18 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/58">
              World Med Culture
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl">
              Serious about impact.
              <br />
              Human in how we get there.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
              Our culture is built around trust, clarity, and the kind of support that helps
              good people do work they can be proud of. We move fast, stay grounded, and make
              room for people to grow.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#job"
                className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/12 px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/20"
              >
                Explore Jobs
              </Link>
              <Link
                href={joinSiteUrl(mainSiteUrl, '/en/contact')}
                className="inline-flex items-center justify-center rounded-full border border-white/16 px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/88 transition-colors hover:bg-white/10"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {CULTURE_STATS.map((stat) => (
              <article
                key={stat.id}
                className="rounded-[1.75rem] border border-white/12 bg-white/10 p-6 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold tracking-tight text-white">{stat.value}</p>
                <p className="mt-3 text-sm leading-6 text-white/72">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CareerCarousel />

      <section className="bg-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#112246]/55">
              How we work
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#112246] md:text-5xl">
              The habits and values that shape everyday work here.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#112246]/72 md:text-lg">
              Culture is not a poster on the wall for us. It shows up in how feedback is given,
              how ideas move, and how teams help each other stay effective without burning out.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {CULTURE_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="rounded-[2rem] border border-[#112246]/10 bg-[#f7f9fc] p-7 md:p-8"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#112246]/48">
                  {pillar.label}
                </p>
                <h3 className="mt-5 text-2xl font-bold leading-tight text-[#112246]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#112246]/72 md:text-[15px]">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#112246]/55">
              Benefits and perks
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#112246] md:text-5xl">
              Support that keeps great work sustainable.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#112246]/72 md:text-lg">
              We want people to feel stretched in the right ways, supported when it counts, and
              connected to work that feels meaningful over time.
            </p>
          </div>
          <CultureBenefitsGrid />
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] border border-[#112246]/10 bg-[#112246] px-8 py-10 md:px-10 md:py-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/58">
              Ready to join
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Find a team where your work can matter early and often.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/72 md:text-lg">
              Explore open roles, or reach out if you are interested in internships and future
              opportunities at World Med.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#job"
              className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/12 px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/20"
            >
              View Jobs
            </Link>
            <Link
              href="/#internship"
              className="inline-flex items-center justify-center rounded-full border border-white/16 px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/88 transition-colors hover:bg-white/10"
            >
              Internship Info
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
