import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { CTABand } from '@/components/CTABand';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { webPageSchema, breadcrumbSchema } from '@/lib/schema';

const description =
  "RumooEV is a fleet partner, not a manufacturer — we deploy electric scooters to businesses on a 24-month Lease-to-Own program and manage everything.";

export const metadata: Metadata = pageMetadata({
  title: 'About RumooEV',
  description,
  path: '/about',
  ogTitle: 'About · RumooEV',
  ogDescription:
    'Accelerating enterprise electric mobility in India — deploy EV fleets without heavy upfront investment.',
});

const OFFICES = [
  { region: 'Gujarat', note: 'Registered office & operations' },
  { region: 'Telangana', note: 'Operations hub, Hyderabad' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: '/about', name: 'About RumooEV', description }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      {/* ABT-1 — Mission & vision */}
      <PageHero
        eyebrow="About RumooEV"
        title="Electric mobility, without the barriers."
        align="center"
      />

      <section className="bg-paper pb-16 md:pb-24">
        <div className="container-x">
          <RevealGroup className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <RevealItem className="h-full">
              <div className="h-full rounded-card border border-line bg-mist p-8">
                <span className="eyebrow">Mission</span>
                <p className="mt-3 text-body-m text-ink md:text-body">
                  Accelerate enterprise electric mobility in India by helping businesses deploy EV
                  fleets without heavy upfront investment.
                </p>
              </div>
            </RevealItem>
            <RevealItem className="h-full">
              <div className="h-full rounded-card border border-line bg-mist p-8">
                <span className="eyebrow">Vision</span>
                <p className="mt-3 text-body-m text-ink md:text-body">
                  Become India&apos;s largest Enterprise EV Fleet Lease-to-Own platform.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ABT-2 — What we do */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="What we do" title="A fleet partner, not a manufacturer." align="center" />
          </Reveal>
          <Reveal className="mx-auto mt-8 max-w-prose">
            <p className="text-body-m text-slate-text md:text-body">
              RumooEV is not a scooter manufacturer. We&apos;re a fleet partner. We buy electric
              scooters, deploy them to businesses on a 24-month Lease-to-Own program, and manage
              everything — maintenance, insurance, support — for one predictable monthly cost. When
              the lease ends, the fleet belongs to our customer. For individual riders, we offer the
              Rumoo Ultra on simple daily plans.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ABT-3 — Presence */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Presence"
              title="Pan-India operations."
              subtitle="Deployments and service support across India."
              align="center"
            />
          </Reveal>
          <RevealGroup className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {OFFICES.map((o) => (
              <RevealItem key={o.region} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-paper p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                    <MapPin className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-h3-card font-semibold text-ink">{o.region}</h3>
                  <p className="mt-1.5 text-body-m text-slate-text">{o.note}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ABT-4 — CTA band */}
      <CTABand title="Partner with Rumoo." ctaLabel="Get in Touch" openModal />
    </>
  );
}
