import { SiteFooter } from '@wmt/ui';
import { getMainSiteUrl } from '@wmt/shared';

const linkClass = 'text-sm text-white/60 transition-colors hover:text-white';
const socialClass =
  'flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white/60 transition-colors hover:border-white/40 hover:text-white';

const mainSiteUrl = getMainSiteUrl();

const sections = [
  {
    title: 'Career',
    items: [
      <a key="open" href="/#open-positions" className={linkClass}>Open Positions</a>,
      <a key="departments" href="/#departments" className={linkClass}>Departments</a>,
      <a key="internship" href="/#internship" className={linkClass}>Internship</a>,
      <a key="culture" href="/culture" className={linkClass}>Culture & Benefits</a>,
    ],
  },
  {
    title: 'Company',
    items: [
      <a key="about" href={mainSiteUrl} className={linkClass}>About World Med</a>,
      <a key="products" href={`${mainSiteUrl}/products`} className={linkClass}>Products</a>,
      <a key="contact" href={`${mainSiteUrl}/contact`} className={linkClass}>Contact Us</a>,
    ],
  },
  {
    title: 'Follow Us',
    items: [
      <a key="fb" href="#" className={linkClass}>Facebook</a>,
      <a key="li" href="#" className={linkClass}>LinkedIn</a>,
      <a key="yt" href="#" className={linkClass}>YouTube</a>,
    ],
    extra: (
      <div className="mt-4 flex gap-2">
        {['FB', 'LI', 'YT'].map((s) => (
          <a key={s} href="#" className={socialClass}>{s}</a>
        ))}
      </div>
    ),
  },
];

export default function Footer() {
  return (
    <SiteFooter
      sections={sections}
      copyright={<p>© 2025 World Med Trading. All rights reserved.</p>}
      legalItems={[
        <a key="privacy" href="#" className="transition-colors hover:text-white/60">Privacy Policy</a>,
        <a key="terms" href="#" className="transition-colors hover:text-white/60">Terms of Service</a>,
      ]}
    />
  );
}
