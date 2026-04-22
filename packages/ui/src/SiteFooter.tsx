import type { ReactNode } from "react";

export type SiteFooterSection = {
  title: string;
  items: ReactNode[];
  extra?: ReactNode;
};

type SiteFooterProps = {
  sections: SiteFooterSection[];
  copyright: ReactNode;
  legalItems: ReactNode[];
};

export function SiteFooter({ sections, copyright, legalItems }: SiteFooterProps) {
  return (
    <footer style={{ backgroundColor: "var(--ci-primary)" }} className="pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={`${section.title}-${index}`}>{item}</li>
                ))}
              </ul>
              {section.extra}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row">
          <div>{copyright}</div>
          <div className="flex gap-6">
            {legalItems.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
