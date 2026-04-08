'use client';

import { Link } from '@/lib/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { CategoryWithSubs } from '@/lib/types';
import { toSlug } from '@/lib/slug';

type Props = {
  categories: CategoryWithSubs[];
};

export default function Footer({ categories }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const isEn = locale === 'en';

  return (
    <footer style={{ backgroundColor: 'var(--ci-primary)' }} className="text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{t('nav.products')}</h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products/${toSlug(cat.name_en)}` as never} className="text-white/60 text-sm hover:text-white transition-colors">
                    {isEn ? cat.name_en : cat.name_th}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{t('nav.company')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{isEn ? 'About Us' : 'เกี่ยวกับเรา'}</a></li>
              <li><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{isEn ? 'Our Global Partners' : 'พันธมิตรทั่วโลก'}</a></li>
              <li><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{isEn ? 'News & Press' : 'ข่าวสาร'}</a></li>
              <li><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{isEn ? 'Contact Us' : 'ติดต่อเรา'}</a></li>
            </ul>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{t('nav.solution')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{isEn ? 'Hospital Integration' : 'การเชื่อมต่อโรงพยาบาล'}</a></li>
              <li><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{isEn ? 'Remote Monitoring' : 'การติดตามระยะไกล'}</a></li>
              <li><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{isEn ? 'Training & Support' : 'การฝึกอบรมและสนับสนุน'}</a></li>
            </ul>
          </div>

          {/* Career & Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{t('nav.career')}</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="#" className="text-white/60 text-sm hover:text-white transition-colors">{isEn ? 'Open Positions' : 'ตำแหน่งงานว่าง'}</a></li>
            </ul>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-white/80">{isEn ? 'Follow Us' : 'ติดตามเรา'}</h4>
            <div className="flex gap-2">
              {['FB', 'LI', 'YT'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 text-xs font-bold transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2025 World Med Trading. {isEn ? 'All rights reserved.' : 'สงวนลิขสิทธิ์'}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">{isEn ? 'Privacy Policy' : 'นโยบายความเป็นส่วนตัว'}</a>
            <a href="#" className="hover:text-white/60 transition-colors">{isEn ? 'Terms of Service' : 'ข้อกำหนดการใช้งาน'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
