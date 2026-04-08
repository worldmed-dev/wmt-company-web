'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const inputClass = "w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all";
const labelClass = "block text-xs font-bold text-white/60 uppercase tracking-widest mb-1.5";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', company: '', department: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
        alt="Contact"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight mb-3">Contact Us</h1>
              <p className="text-white/50 text-sm leading-relaxed">
                Our team is ready to assist you with any inquiries about our medical devices and solutions.
              </p>
            </div>
            {[
              { icon: EnvelopeIcon, label: 'Email', value: 'info@worldmed.co.th' },
              { icon: PhoneIcon, label: 'Phone', value: '+66 2 XXX XXXX' },
              { icon: MapPinIcon, label: 'Address', value: 'Bangkok, Thailand' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</p>
                  <p className="text-sm text-white font-medium mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                  <PaperAirplaneIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm">We'll get back to you within 1-2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@hospital.com" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+66 8X XXX XXXX" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Company / Hospital</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Bangkok Hospital" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Department / Unit</label>
                    <input type="text" name="department" value={form.department} onChange={handleChange} placeholder="ICU, Cardiology..." className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} required className={`${inputClass} resize-none`} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
