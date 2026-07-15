import type { Metadata } from 'next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ContactForm } from '@/components/ContactForm';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { webPageSchema, breadcrumbSchema, officeSchemas } from '@/lib/schema';

const description =
  'Talk to RumooEV about an EV fleet pilot, pricing or a rider booking. Call or WhatsApp +91 90990 95698, or email business@rumooev.com.';

export const metadata: Metadata = pageMetadata({
  title: 'Contact / Book a Ride',
  description,
  path: '/contact',
  ogTitle: 'Contact · RumooEV',
  ogDescription:
    "Tell us about your operation and we'll come back with a plan — usually within one business day.",
});

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: '/contact', name: 'Contact / Book a Ride', description }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          ...officeSchemas,
        ]}
      />
      <section className="bg-paper pb-16 pt-28 md:pb-24 md:pt-[150px]">
        <div className="container-x">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Let's talk fleets."
            subtitle="Tell us about your operation and we'll come back with a plan — usually within one business day."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Details */}
          <Reveal>
            <div className="flex flex-col gap-6">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="group flex items-start gap-4 rounded-card border border-line bg-paper p-6 transition-colors hover:border-brand-green/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                  <Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-caption font-medium text-slate-text">Call or WhatsApp</span>
                  <span className="block text-body font-semibold text-ink">{SITE.phoneDisplay}</span>
                </span>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-start gap-4 rounded-card border border-line bg-paper p-6 transition-colors hover:border-brand-green/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                  <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-caption font-medium text-slate-text">Email</span>
                  <span className="block text-body font-semibold text-ink">{SITE.email}</span>
                </span>
              </a>

              <div className="flex items-start gap-4 rounded-card border border-line bg-paper p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-caption font-medium text-slate-text">Offices</span>
                  <span className="block text-body font-semibold text-ink">{SITE.offices}</span>
                  <span className="block text-caption text-slate-text">{SITE.presence}</span>
                </span>
              </div>

              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-btn bg-whatsapp px-6 py-3.5 text-[16px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
              >
                <WhatsAppGlyph />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.05}>
            <div className="rounded-card border border-line bg-mist p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
      </section>
    </>
  );
}
