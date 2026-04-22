'use client';

import { Link } from '@/lib/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { toSlug, type CategoryWithSubs } from '@wmt/shared';
import { SiteFooter, type SiteFooterSection } from '@wmt/ui';

type Props = {
  categories: CategoryWithSubs[];
};

export default function Footer({ categories }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const isEn = locale === 'en';
  const linkClass = "text-sm text-white/60 transition-colors hover:text-white";
  const socialClass = "flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white/60 transition-colors hover:border-white/40 hover:text-white";

  const sections: SiteFooterSection[] = [
    {
      title: t('nav.products'),
      items: categories.slice(0, 5).map((cat) => (
        <Link
          key={cat.id}
          href={`/products/${toSlug(cat.name_en)}` as never}
          className={linkClass}
        >
          {isEn ? cat.name_en : cat.name_th}
        </Link>
      )),
    },
    {
      title: t('nav.company'),
      items: [
        <a key="about" href="#" className={linkClass}>{isEn ? 'About Us' : 'เกี่ยวกับเรา'}</a>,
        <a key="partners" href="#" className={linkClass}>{isEn ? 'Our Global Partners' : 'พันธมิตรทั่วโลก'}</a>,
        <a key="news" href="#" className={linkClass}>{isEn ? 'News & Press' : 'ข่าวสาร'}</a>,
        <a key="contact" href="#" className={linkClass}>{isEn ? 'Contact Us' : 'ติดต่อเรา'}</a>,
      ],
    },
    {
      title: t('nav.solution'),
      items: [
        <a key="integration" href="#" className={linkClass}>{isEn ? 'Hospital Integration' : 'การเชื่อมต่อโรงพยาบาล'}</a>,
        <a key="monitoring" href="#" className={linkClass}>{isEn ? 'Remote Monitoring' : 'การติดตามระยะไกล'}</a>,
        <a key="training" href="#" className={linkClass}>{isEn ? 'Training & Support' : 'การฝึกอบรมและสนับสนุน'}</a>,
      ],
    },
    {
      title: t('nav.career'),
      items: [
        <a key="positions" href="#" className={linkClass}>{isEn ? 'Open Positions' : 'ตำแหน่งงานว่าง'}</a>,
      ],
      extra: (
        <>
          <h4 className="mb-3 mt-6 text-xs font-bold uppercase tracking-widest text-white/80">
            {isEn ? 'Follow Us' : 'ติดตามเรา'}
          </h4>
          <div className="flex gap-2">
            {['FB', 'LI', 'YT'].map((social) => (
              <a key={social} href="#" className={socialClass}>
                {social}
              </a>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <SiteFooter
      sections={sections}
      copyright={<p>© 2025 World Med Trading. {isEn ? 'All rights reserved.' : 'สงวนลิขสิทธิ์'}</p>}
      legalItems={[
        <a key="privacy" href="#" className="transition-colors hover:text-white/60">{isEn ? 'Privacy Policy' : 'นโยบายความเป็นส่วนตัว'}</a>,
        <a key="terms" href="#" className="transition-colors hover:text-white/60">{isEn ? 'Terms of Service' : 'ข้อกำหนดการใช้งาน'}</a>,
      ]}
    />
  );
}
