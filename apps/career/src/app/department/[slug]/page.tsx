import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getDepartmentBySlug, getDepartmentCareers } from '@/lib/departmentCareers';
import { toSlug } from '@wmt/shared';
import DepartmentCategoryBar from '@/components/layout/DepartmentCategoryBar';

export async function generateStaticParams() {
  const departments = await getDepartmentCareers();
  return departments.map((d) => ({ slug: toSlug(d.name) }));
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = await getDepartmentBySlug(slug);

  if (!department) notFound();

  return (
    <div className="min-h-screen bg-white">
      <DepartmentCategoryBar name={department.name} />

      {/* Hero section — 2 column */}
      <section className="page-x py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

            {/* Left — text */}
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#112246]/50">
                Department
              </p>
              <h1 className="mt-4 text-4xl font-bold text-[#112246] md:text-5xl lg:text-6xl">
                {department.name.split(' ').slice(0, -1).join(' ')}<br />
                {department.name.split(' ').slice(-1)}
              </h1>
              <p className="mt-6 text-base leading-8 text-[#112246]/60 md:text-lg max-w-md">
                Join a team that moves fast, thinks clearly,
                and takes pride in doing meaningful work every day.
              </p>
              <button className="mt-8 rounded-full border border-[#112246]/20 bg-[#112246]/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#112246] transition-colors hover:bg-[#112246]/20">
                View Open Positions
              </button>
            </div>

            {/* Right — image */}
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
                {department.image_url ? (
                  <Image
                    src={department.image_url}
                    alt={department.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#112246] to-[#2f5aa6]" />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* How We Do */}
      <section id="how-we-do" className="scroll-mt-14 page-x py-20 md:py-28 bg-[#f4f7fb]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

            {/* Left — text */}
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#112246]/50">How We Do</p>
              <h2 className="mt-4 text-3xl font-bold text-[#112246] md:text-4xl">The way we work</h2>
              <p className="mt-5 max-w-md text-base leading-8 text-[#112246]/60">
                ทีม People Operations ของเราไม่ได้แค่แก้ปัญหา แต่เราเปลี่ยนทุกความท้าทายให้เป็นโอกาสในการพัฒนาคน

เราใช้ข้อมูลมาวางแผนเพื่อ 'ดันคนเก่ง' ให้เติบโต และสร้างวัฒนธรรมองค์กรที่แข็งแกร่งผ่านกิจกรรมที่สร้างสรรค์ เราพร้อมดูแลครอบคลุมทุกมิติ เพื่อสร้างสถานที่ทำงานที่สนับสนุนให้ทุกคนก้าวขึ้นเป็นผู้นำ และเติบโตไปพร้อมกับความเป็นเลิศขององค์กร
              </p>
            </div>

            {/* Right — stacked cards */}
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
                {/* Image card — top-right */}
                <div className="absolute top-0 right-0 w-[75%] aspect-[4/3] rounded-[2rem] overflow-hidden">
                  {department.image_url ? (
                    <Image src={department.image_url} alt={department.name} fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[#112246] to-[#2f5aa6]" />
                  )}
                </div>

                {/* Quote + name group — bottom-left */}
                <div className="absolute flex flex-col" style={{ bottom: '8%', left: '-8%', width: '75%' }}>
                  <div className="aspect-[4/3] rounded-[2rem] bg-[#112246] p-6 flex flex-col">
                    <p className="text-8xl font-bold text-white/20 leading-none">&ldquo;</p>
                    <p className="mt-2 text-sm font-medium leading-7 text-white">
                      Working here changed how I think about impact. Every day I come in knowing the work we do reaches real patients.
                    </p>
                    <p className="text-8xl font-bold text-white/20 leading-none text-right">&rdquo;</p>
                  </div>
                  <div className="mt-3 px-1">
                    <p className="text-xs font-bold text-[#112246]">Ammarat C.</p>
                    <p className="text-[11px] text-[#112246]/50">People Operations · 3 years</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Role Opening */}
      <section id="role-opening" className="scroll-mt-14 page-x py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">

            {/* Left — role cards */}
            <div className="flex-1 lg:w-1/2 flex flex-col gap-4">
              {[
                { title: 'Senior Sales Executive', type: 'Full-time', location: 'Bangkok' },
                { title: 'Clinical Application Specialist', type: 'Full-time', location: 'Bangkok' },
                { title: 'Product Manager', type: 'Full-time', location: 'Bangkok' },
                { title: 'Marketing Coordinator', type: 'Full-time', location: 'Bangkok' },
              ].map((role) => (
                <div
                  key={role.title}
                  className="rounded-[1.5rem] border border-[#112246]/10 bg-[#f4f7fb] p-6 hover:border-[#112246]/20 transition-colors cursor-pointer"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#112246]/40">{role.type} · {role.location}</p>
                  <h3 className="mt-2 text-base font-bold text-[#112246]">{role.title}</h3>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#112246]/40 hover:text-[#112246] transition-colors">{department.name} →</p>
                </div>
              ))}
            </div>

            {/* Right — text */}
            <div className="w-full lg:w-1/2 shrink-0 flex flex-col justify-center self-stretch">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#112246]/50">Role Opening</p>
              <h2 className="mt-4 text-3xl font-bold text-[#112246] md:text-4xl">Open positions</h2>
              <p className="mt-5 text-base leading-8 text-[#112246]/60">
                Explore current openings and find the role that fits your skills and ambitions.
                We're always looking for driven individuals who want to make a real impact in healthcare.
                Whether you're early in your career or bringing years of experience, there's a place for you here.
              </p>
              <button className="mt-8 self-start rounded-full bg-ci-primary-deep px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-ci-primary-deep/80">
                View All Jobs
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section id="what-we-look-for" className="scroll-mt-14 page-x py-20 md:py-28 bg-[#112246]">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/50">What We Look For</p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Who fits here</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
            We look for people who are curious, accountable, and energised by meaningful challenges. If that sounds like you, we'd love to connect.
          </p>
        </div>
      </section>
    </div>
  );
}
