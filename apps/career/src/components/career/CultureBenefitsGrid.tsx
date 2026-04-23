import { BENEFIT_CARDS } from '@/lib/culture';

export default function CultureBenefitsGrid() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {BENEFIT_CARDS.map((benefit, index) => (
        <article
          key={benefit.id}
          className="rounded-[2rem] border border-[#112246]/10 bg-white p-6 md:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#112246]/48">
              {benefit.eyebrow}
            </p>
            <span className="rounded-full border border-[#112246]/10 bg-[#f7f9fc] px-3 py-1 text-[11px] font-bold text-[#112246]/36">
              0{index + 1}
            </span>
          </div>
          <h3 className="mt-5 text-2xl font-bold leading-tight text-[#112246]">
            {benefit.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#112246]/70 md:text-[15px]">
            {benefit.description}
          </p>
          <p className="mt-7 text-sm font-semibold text-[#112246]/62">
            {benefit.note}
          </p>
        </article>
      ))}
    </div>
  );
}
