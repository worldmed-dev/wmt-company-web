import Link from 'next/link';
import Image from 'next/image';
import CareerCarousel from '@/components/career/CareerCarousel';
import CultureBenefitsGrid from '@/components/career/CultureBenefitsGrid';
import DepartmentScroller from '@/components/career/DepartmentScroller';
import LeadershipScroller from '@/components/career/LeadershipScroller';
import { getDepartmentCareers } from '@/lib/departmentCareers';
import { getLeadershipTeamMembers } from '@/lib/leadershipTeam';
import { getMainSiteUrl, joinSiteUrl } from '@wmt/shared';

const FUTURE_TEAMMATE_FALLBACK_NAMES = [
  'Commercial & Growth',
  'Product & Digital',
  'Operations & Supply',
  'Clinical & Quality',
  'People & Culture',
  'Finance & Planning',
] as const;

const FUTURE_TEAMMATE_ACCENTS = [
  'linear-gradient(135deg, #18315f 0%, #2f5aa6 52%, #ff8300 100%)',
  'linear-gradient(135deg, #0f2347 0%, #1b4c88 55%, #79a9ff 100%)',
  'linear-gradient(135deg, #112246 0%, #345d89 52%, #d8e7ff 100%)',
  'linear-gradient(135deg, #18294d 0%, #2a4470 50%, #8ab1e6 100%)',
  'linear-gradient(135deg, #173054 0%, #385e96 48%, #ffb36b 100%)',
  'linear-gradient(135deg, #13284e 0%, #21406c 52%, #6f8ec9 100%)',
] as const;

const mainSiteUrl = getMainSiteUrl();

export default async function CareerPage() {
  const [leadershipMembers, departmentCareers] = await Promise.all([
    getLeadershipTeamMembers(),
    getDepartmentCareers(),
  ]);
  const leadershipCards =
    leadershipMembers.length > 0
      ? leadershipMembers
      : Array.from({ length: 4 }, (_, index) => ({
          id: `placeholder-${index}`,
          name: 'Leadership Team',
          role: 'Profile coming soon',
          imageUrl: null,
        }));
  const futureTeammateDepartments =
    departmentCareers.length > 0
      ? departmentCareers
      : FUTURE_TEAMMATE_FALLBACK_NAMES.map((name, index) => ({
          id: `department-fallback-${index}`,
          name,
        }));
  const futureTeammateCards = futureTeammateDepartments.map((department, index) => ({
    ...department,
    accent: FUTURE_TEAMMATE_ACCENTS[index % FUTURE_TEAMMATE_ACCENTS.length],
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="w-full min-h-[72vh] md:min-h-[82vh] flex flex-col items-center justify-center pt-24 pb-0 md:pt-32 md:pb-0">
        <h1
          className="text-4xl md:text-6xl text-[#112246] leading-tight text-center"
          style={{ fontFamily: 'var(--font-architects-daughter)' }}
        >
          Bring your true self.<br />
          Do your best work.
        </h1>
        <button
          className="mt-8 px-8 py-3 border border-[#112246]/20 bg-[#112246]/10 backdrop-blur-md text-[#112246] text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#112246]/20 transition-colors"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          Join Us
        </button>
      </div>
      <CareerCarousel />
      <section id="our-team" className="scroll-mt-32 bg-[#112246] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Work at WORLDMED
            </h2>
            <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
              We take our work seriously, but never ourselves. Expect big challenges, impactful projects, and a team that knows how to celebrate every win together.
            </p>
            <button className="mt-8 rounded-full border border-white/15 bg-white/10 px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/18">
              Learn more about our team
            </button>
          </div>
          <div className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/18 via-white/10 to-white/5">
              <Image
                src="https://ylxyojvodlhajgvuorll.supabase.co/storage/v1/object/public/Image/employee_works/Sing%20and%20team.webp"
                alt="World Med team at work"
                fill
                sizes="(max-width: 1024px) calc(100vw - 3rem), 46vw"
                quality={80}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#112246]/55">
              Meet the leadership
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#112246] md:text-5xl">
              The people guiding how we grow, lead, and build together.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#112246]/72 md:text-lg">
              Meet the team shaping our culture, setting direction, and helping every part of World Med move forward with clarity.
            </p>
          </div>
          <LeadershipScroller items={leadershipCards} />
        </div>
      </section>
      <section id="culture" className="scroll-mt-32 bg-[#f4f7fb] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#112246]/55">
              Benefits and perks
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#112246] md:text-5xl">
              The kind of support that helps good people do great work.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#112246]/72 md:text-lg">
              We are building more than a job description. These are some of the ways we support growth, balance, and the everyday experience of doing meaningful work here.
            </p>
          </div>
          <CultureBenefitsGrid />
        </div>
      </section>
      <section id="job" className="scroll-mt-32 bg-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#112246]/55">
              Your future teammate
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#112246] md:text-5xl">
              Find the department where your energy fits best.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#112246]/72 md:text-lg">
              Every team brings a different rhythm, mindset, and kind of excellence. Explore the departments you could grow with next.
            </p>
          </div>
          <DepartmentScroller items={futureTeammateCards} />
        </div>
      </section>
      <section id="internship" className="scroll-mt-32 bg-[#112246] px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-white/12 bg-white/8 p-8 md:p-10 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/58">
                  Internship
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Start with hands-on experience that feels like real work.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                  We are open to interns who want meaningful exposure across commercial, operations,
                  digital, and support teams. If you are curious, proactive, and ready to learn fast,
                  we would love to hear from you.
                </p>
              </div>
              <Link
                href={joinSiteUrl(mainSiteUrl, '/en/contact')}
                className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/12 px-8 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/20"
              >
                Ask About Internships
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
