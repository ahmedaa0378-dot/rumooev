import type { Metadata } from 'next';
import { Wallet, Handshake, TrendingUp, KeyRound, Leaf } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { CTABand } from '@/components/CTABand';
import { CompareTable, type CompareRow } from '@/components/CompareTable';
import { Stepper, type Step } from '@/components/Stepper';
import { Card } from '@/components/Card';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { webPageSchema, breadcrumbSchema } from '@/lib/schema';

const description =
  'Leasing an electric fleet keeps working capital free and costs predictable, includes maintenance — and still ends in 100% ownership. See lease vs buy.';

export const metadata: Metadata = pageMetadata({
  title: 'Why lease instead of buy?',
  description,
  path: '/why-rumoo',
  ogTitle: 'Why Rumoo · Lease vs Buy',
  ogDescription:
    'Lease smart. Stay agile. Scale faster — and still end up owning the fleet. A clear lease-vs-buy comparison.',
});

// WHY-2
const COMPARE: CompareRow[] = [
  {
    dimension: 'Capital outlay',
    lease: 'No large upfront investment — working capital stays free',
    buy: 'High upfront cost blocked in vehicles',
  },
  {
    dimension: 'Cash flow',
    lease: 'Predictable monthly payments',
    buy: 'Irregular, unplanned repair expenses',
  },
  {
    dimension: 'Maintenance',
    lease: 'Included — preventive, breakdown, roadside',
    buy: 'All costs and coordination are on you',
  },
  {
    dimension: 'Downtime',
    lease: 'Replacement support keeps uptime high',
    buy: 'Delays in repairs disrupt deliveries',
  },
  {
    dimension: 'Flexibility',
    lease: 'Scale up or upgrade as you grow',
    buy: 'Scaling is slow and capital-heavy',
  },
  {
    dimension: 'Ownership risk',
    lease: 'None during the lease — we carry it',
    buy: 'Depreciation and resale risk are yours',
  },
  {
    dimension: 'End of term',
    lease: 'You own the fleet, free and clear',
    buy: 'You own an aging fleet you financed alone',
  },
];

// WHY-3
const BOTTOM_LINE = [
  { icon: Wallet, title: 'Better cash flow', body: 'Your money keeps working in your business.' },
  { icon: Handshake, title: 'Lower operating burden', body: 'One partner handles the entire fleet.' },
  { icon: TrendingUp, title: 'Focus on growth', body: 'You serve customers; we keep wheels turning.' },
  { icon: KeyRound, title: 'An asset at the end', body: '24 months of leasing ends in 100% ownership.' },
];

// WHY-4
const COVERAGE = [
  'Preventive maintenance on schedule',
  '24/7 breakdown & towing support',
  'Genuine spare parts',
  'Trained, certified technicians',
];
const COMMITMENTS = [
  'Breakdown acknowledgment within 15 minutes',
  'Technician assigned within 2 hours',
  'On-site resolution within 24 hours*',
  'Replacement within 3–5 working days*',
];
const PROCESS: Step[] = [
  { title: 'Raise request' },
  { title: 'Diagnosis' },
  { title: 'Resolution' },
  { title: 'Replacement (if required)' },
  { title: 'Follow-up' },
];

// WHY-5
const SUSTAINABILITY = [
  'Zero tailpipe emissions across your fleet.',
  'Lower energy cost per kilometre than petrol.',
  'Deliveries your customers — and your ESG report — can feel good about.',
];

export default function WhyRumooPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/why-rumoo',
            name: 'Why lease instead of buy?',
            description,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Why Rumoo', path: '/why-rumoo' },
          ]),
        ]}
      />

      {/* WHY-1 — Hero */}
      <PageHero
        eyebrow="Why Rumoo"
        title="Why lease instead of buy?"
        subtitle="Lease smart. Stay agile. Scale faster — and still end up owning the fleet."
        align="center"
      />

      {/* WHY-2 — Lease vs Buy */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Lease vs Buy" title="A clearer way to run a fleet." align="center" />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-4xl">
            <CompareTable rows={COMPARE} />
          </Reveal>
        </div>
      </section>

      {/* WHY-3 — The bottom line */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="The bottom line" title="What you actually get." align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BOTTOM_LINE.map((b) => (
              <RevealItem key={b.title} className="h-full">
                <Card className="h-full" icon={<b.icon className="h-6 w-6" strokeWidth={1.5} />} title={b.title}>
                  {b.body}
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* WHY-4 — Service & replacement policy */}
      <section id="service" className="section-soft section-y scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Service policy" title="Reliable support. Minimal downtime." align="center" />
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-card border border-line bg-paper p-8">
                <h3 className="font-display text-h3-card font-semibold text-ink">Coverage</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {COVERAGE.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-body-m text-slate-text">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="h-full rounded-card border border-line bg-paper p-8">
                <h3 className="font-display text-h3-card font-semibold text-ink">We commit to</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {COMMITMENTS.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-body-m text-slate-text">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <p className="mb-8 text-center text-caption font-semibold uppercase tracking-[0.06em] text-brand-green">
              The service process
            </p>
            <Stepper steps={PROCESS} />
          </Reveal>

          <p className="mx-auto mt-12 max-w-prose text-center text-caption text-slate-text">
            *Timelines may vary by location, spares availability and issue severity.
          </p>
        </div>
      </section>

      {/* WHY-5 — Sustainability */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Sustainability" title="Greener operations, quieter cities." align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {SUSTAINABILITY.map((line) => (
              <RevealItem key={line} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-paper p-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                    <Leaf className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-body-m text-ink">{line}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* WHY-6 — CTA band */}
      <CTABand title="Make the smarter fleet decision." ctaLabel="Book a Ride" openModal />
    </>
  );
}
