import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, UtensilsCrossed, Zap, Building2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { CTABand } from '@/components/CTABand';
import { SpecTable } from '@/components/SpecTable';
import { Figure } from '@/components/Figure';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { IMAGES } from '@/lib/images';
import type { ImageAsset } from '@/lib/images';
import { cn } from '@/lib/utils';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { webPageSchema, breadcrumbSchema, scooterProductSchema } from '@/lib/schema';

const description =
  'Three electric scooters for last-mile delivery — Rumoo Lite, HS and Ultra. 40 km/h, 80–100 km range, 1.8 kWh swappable battery, 180 kg loading capacity.';

export const metadata: Metadata = pageMetadata({
  title: 'The Fleet — Rumoo Lite, HS & Ultra',
  description,
  path: '/scooters',
  ogTitle: 'The Fleet · RumooEV',
  ogDescription:
    'Rumoo Lite, HS and Ultra — built for efficiency, designed for deliveries. One shared spec sheet, swappable batteries, no charging downtime.',
});

// SCT-2 — model showcase, verbatim from CONTENT.md.
const MODELS: {
  name: string;
  badge: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
  asset: ImageAsset;
}[] = [
  {
    name: 'Rumoo Lite',
    badge: 'For business fleets',
    copy: 'The workhorse of enterprise fleets. Compact, dependable, and built for all-day last-mile duty.',
    ctaLabel: 'Plan a fleet',
    ctaHref: '/contact',
    asset: IMAGES.lite,
  },
  {
    name: 'Rumoo HS',
    badge: 'For business fleets',
    copy: 'Sharper styling, same fleet-grade reliability. Built for teams that ride hard every shift.',
    ctaLabel: 'Plan a fleet',
    ctaHref: '/contact',
    asset: IMAGES.hs,
  },
  {
    name: 'Rumoo Ultra',
    badge: 'For riders',
    copy: "The rider's scooter. Available on daily plans from ₹260/day, with battery swaps and maintenance included.",
    ctaLabel: 'Ride with Rumoo',
    ctaHref: '/riders',
    asset: IMAGES.ultra,
  },
];

// SCT-4
const USE_CASES = [
  { icon: ShoppingBag, label: 'E-commerce' },
  { icon: UtensilsCrossed, label: 'Food Delivery' },
  { icon: Zap, label: 'Quick Commerce' },
  { icon: Building2, label: 'Corporate & Campuses' },
];

export default function ScootersPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/scooters',
            name: 'The Fleet — Rumoo Lite, HS & Ultra',
            description,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Scooters', path: '/scooters' },
          ]),
          ...MODELS.map((m) =>
            scooterProductSchema({ name: m.name, image: m.asset.src, description: m.copy }),
          ),
        ]}
      />

      {/* SCT-1 — Hero */}
      <PageHero
        eyebrow="The fleet"
        title="Built for efficiency. Designed for deliveries."
        subtitle="Three models. One job: keep your deliveries moving."
        align="center"
      />

      {/* SCT-2 — Model showcase */}
      <section className="section-soft section-y">
        <div className="container-x flex flex-col gap-16 md:gap-24">
          {MODELS.map((m, i) => {
            const imageRight = i % 2 === 1;
            return (
              <Reveal key={m.name}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={cn(imageRight && 'lg:order-2')}>
                    <Figure
                      asset={m.asset}
                      ratio="aspect-[4/3]"
                      frame="framed"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                  <div className={cn(imageRight && 'lg:order-1')}>
                    <span className="inline-block rounded-pill bg-brand-green-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-green">
                      {m.badge}
                    </span>
                    <h2 className="mt-4 font-display text-h2-section-m font-bold tracking-[-0.02em] text-ink md:text-[34px]">
                      {m.name}
                    </h2>
                    <p className="mt-3 max-w-md text-body-m text-slate-text md:text-body">{m.copy}</p>
                    <Link
                      href={m.ctaHref}
                      className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-green"
                    >
                      {m.ctaLabel}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SCT-3 — Shared specifications */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Specifications"
              title="One spec sheet across the fleet."
              subtitle="Lite, HS and Ultra share the same published specifications."
              align="center"
            />
          </Reveal>
          <Reveal className="mt-12">
            <SpecTable />
          </Reveal>
        </div>
      </section>

      {/* SCT-4 — Use cases */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Use cases" title="Perfect for last-mile delivery" align="center" />
          </Reveal>
          <RevealGroup className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {USE_CASES.map((u) => (
              <RevealItem key={u.label} className="h-full">
                <div className="flex h-full flex-col items-center gap-3 rounded-card border border-line bg-paper p-6 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light text-ink">
                    <u.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="text-body-m font-medium text-ink">{u.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SCT-5 — CTA band */}
      <CTABand title="See the fleet in action." ctaLabel="Book a Ride" openModal />
    </>
  );
}
