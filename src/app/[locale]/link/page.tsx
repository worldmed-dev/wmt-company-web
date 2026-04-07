import { GlobeAltIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const links = [
  {
    label: 'Our Products',
    desc: 'Explore our full range of medical devices',
    href: '/products',
    icon: GlobeAltIcon,
  },
  {
    label: 'Contact Us',
    desc: 'Get in touch with our sales team',
    href: 'mailto:info@worldmed.co.th',
    icon: EnvelopeIcon,
  },
  {
    label: 'Call Us',
    desc: '+66 2 XXX XXXX',
    href: 'tel:+6620000000',
    icon: PhoneIcon,
  },
  {
    label: 'Our Location',
    desc: 'Bangkok, Thailand',
    href: 'https://maps.google.com',
    icon: MapPinIcon,
  },
];

export default function LinkBioPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{ backgroundColor: 'var(--ci-primary)' }}
    >
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ backgroundColor: '#3b5bdb' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ backgroundColor: '#1971c2' }} />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">

        {/* Logo & Profile */}
        <img
          src="/wmt-logo.webp"
          alt="World Med Logo"
          className="h-16 w-auto brightness-0 invert mb-6"
        />
        <h1 className="text-white text-xl font-bold tracking-tight text-center">World Med Trading</h1>
        <p className="text-white/50 text-sm mt-1 text-center tracking-wide">
          Pioneering Thailand's Medical Devices
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-white/20 my-8" />

        {/* Links */}
        <div className="w-full flex flex-col gap-3">
          {links.map(({ label, desc, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/20 backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold">{label}</p>
                <p className="text-white/50 text-xs mt-0.5 truncate">{desc}</p>
              </div>
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors shrink-0" />
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="mt-10 flex gap-4">
          {['Facebook', 'LinkedIn', 'YouTube'].map((s) => (
            <a
              key={s}
              href="#"
              className="px-4 py-2 rounded-full border border-white/20 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xs font-semibold tracking-wide transition-all"
            >
              {s}
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-12 text-white/20 text-xs tracking-widest uppercase">worldmed.co.th</p>
      </div>
    </div>
  );
}
