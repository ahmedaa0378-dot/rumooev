import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { CTABand } from '@/components/CTABand';
import { Stepper, type Step } from '@/components/Stepper';
import { Figure } from '@/components/Figure';
import { BookRideButton } from '@/components/BookRideButton';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { IMAGES } from '@/lib/images';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { webPageSchema, breadcrumbSchema, leaseServiceSchema } from '@/lib/schema';

const description =
  "RumooEV's 24-month Lease-to-Own program: a fully managed electric delivery fleet today, a company-owned asset after 24 months. Insurance & upkeep included.";

export const metadata: Metadata = pageMetadata({
  title: 'Enterprise Fleet Leasing (Lease-to-Own)',
  description,
  path: '/business',
  ogTitle: 'Enterprise Fleet Leasing · RumooEV',
  ogDescription:
    'A fully managed electric fleet today — a company-owned asset tomorrow. 24-month Lease-to-Own, deployed pan-India in 15–20 days.',
});

// BIZ-2 — reuses HOME-2 step copy
const STEPS = [
  {
    n: 'Lease',
    body: 'Choose your fleet size. No capital outlay, no bank loans. We deploy in 15–20 days.',
  },
  {
    n: 'Operate',
    body: 'One fixed monthly cost covers maintenance, insurance, breakdown support and replacements. You run deliveries; we run the fleet.',
  },
  {
    n: 'Own',
    body: 'After 24 months, 100% ownership of every scooter transfers to your company. No residual payments. No return logistics.',
  },
];

// BIZ-3
const INCLUDED = [
  'High-quality Rumoo scooters built for last-mile reliability',
  'Comprehensive insurance',
  'Preventive maintenance & servicing',
  '24/7 breakdown support',
  'Replacement vehicle within 24–48 hours',
  'Dedicated account manager',
  'Fleet support team',
  'Ownership transfer after 24 months',
];

// BIZ-4
const ADDONS = [
  'Battery Swapping Subscription',
  'Additional Battery Packs',
  'Fast Charging Solutions',
  'GPS & Fleet Analytics',
  'On-site Service Engineer',
];

// BIZ-5
const TERMS: { term: string; value: string }[] = [
  { term: 'Tenure', value: '24 months, Lease-to-Own' },
  { term: 'Minimum fleet size', value: '50 scooters' },
  { term: 'Onboarding deposit', value: "2 months' lease (refundable)" },
  { term: 'Payment', value: 'Monthly advance · 15-day credit · weekly billing · custom' },
  { term: 'Fleet uptime', value: '95% commitment' },
  { term: 'Replacement vehicle', value: 'within 24–48 hours' },
  { term: 'Taxes', value: 'GST extra, as applicable' },
  { term: 'Territory', value: 'Pan-India' },
];

// BIZ-6
const TIMELINE: Step[] = [
  { day: 'Day 0–1', title: 'Requirement Discussion', body: 'We understand your business needs, fleet size, and operations.' },
  { day: 'Day 2–4', title: 'Proposal & Agreement', body: 'Tailored solution and lease agreement finalized.' },
  { day: 'Day 5–7', title: 'Documentation & Processing', body: 'Quick verification to get everything in place.' },
  { day: 'Day 8–12', title: 'Scooter Preparation', body: 'Vehicles prepared, quality-checked, and ready.' },
  { day: 'Day 13–16', title: 'Delivery & Onboarding', body: 'We deliver the fleet and train your team.' },
  { day: 'Day 17–18', title: 'Go-Live Check & QA', body: 'Final quality check and document handover.' },
  { day: 'Day 19–20', title: 'On-Road & Operational', body: 'Your fleet is live, with support always on.' },
];

// BIZ-7
const COMMITMENTS = [
  { value: '15 min', label: 'Breakdown acknowledgment' },
  { value: '2 hrs', label: 'Technician assignment' },
  { value: '24 hrs*', label: 'On-site resolution' },
  { value: '3–5 days*', label: 'Replacement (if required)' },
];

export default function BusinessPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/business',
            name: 'Enterprise Fleet Leasing (Lease-to-Own)',
            description,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Business', path: '/business' },
          ]),
          leaseServiceSchema,
        ]}
      />

      {/* BIZ-1 — Hero */}
      <PageHero
        eyebrow="For Businesses"
        title="The lease that ends in ownership."
        subtitle="Rumoo's 24-month Lease-to-Own program gives you a fully managed electric fleet today — and a company-owned asset tomorrow."
        actions={<BookRideButton size="lg">Book a Ride</BookRideButton>}
        media={
          <Figure
            asset={IMAGES.lite}
            ratio="aspect-[4/3]"
            frame="framed"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
      />

      {/* BIZ-2 — How Lease-to-Own works */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="A fleet that becomes your asset." align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <RevealItem key={s.n} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-paper p-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green font-display text-body font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-h3-card font-semibold text-ink">{s.n}</h3>
                  <p className="mt-2.5 text-body-m text-slate-text">{s.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8">
            <div className="flex items-start gap-3 rounded-card border border-brand-green/30 bg-brand-green-light px-8 py-6">
              <Check className="mt-0.5 h-6 w-6 shrink-0 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
              <p className="text-body-m font-medium text-ink md:text-body">
                After 24 months, 100% ownership of the scooters is transferred to your company.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BIZ-3 — Everything included */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Included" title="Every plan includes" align="center" />
          </Reveal>
          <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-4 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <RevealItem key={item}>
                <div className="flex items-start gap-3 border-b border-line pb-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-light">
                    <Check className="h-4 w-4 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="text-body-m text-ink">{item}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* BIZ-4 — Optional add-ons */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Add-ons" title="Add what your operation needs" align="center" />
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            {ADDONS.map((a) => (
              <span
                key={a}
                className="rounded-pill border border-line bg-paper px-5 py-2.5 text-body-m font-medium text-ink"
              >
                {a}
              </span>
            ))}
          </Reveal>
          <p className="mx-auto mt-6 max-w-prose text-center text-caption text-slate-text">
            Optional services are charged separately based on fleet size and deployment location.
          </p>
        </div>
      </section>

      {/* BIZ-5 — Commercial terms */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Commercial terms" title="Clear terms, no surprises." align="center" />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <dl className="overflow-hidden rounded-card border border-line">
              {TERMS.map((t, i) => (
                <div
                  key={t.term}
                  className={`grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4 ${
                    i > 0 ? 'border-t border-line' : ''
                  }`}
                >
                  <dt className="text-body-m font-semibold text-ink">{t.term}</dt>
                  <dd className="text-body-m text-slate-text sm:col-span-2">{t.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* BIZ-6 — Deployment timeline */}
      <section id="deployment" className="section-soft section-y scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Deployment"
              title="From onboarding to on-road in 15–20 days."
              align="center"
            />
          </Reveal>
          <Reveal className="mt-14">
            <Stepper steps={TIMELINE} />
          </Reveal>
          <p className="mx-auto mt-12 max-w-prose text-center text-caption text-slate-text">
            Timeline may vary based on fleet size, location and documentation readiness.
          </p>
        </div>
      </section>

      {/* BIZ-7 — Service commitments */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Service" title="Response times we commit to." align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {COMMITMENTS.map((c) => (
              <RevealItem key={c.label}>
                <div className="flex h-full flex-col rounded-card border border-line bg-paper p-6 text-center">
                  <span className="font-display text-[32px] font-bold leading-none text-brand-green md:text-[38px]">
                    {c.value}
                  </span>
                  <span className="mt-3 text-body-m text-slate-text">{c.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mx-auto mt-8 max-w-prose text-center text-caption text-slate-text">
            *May vary by location, spares availability and severity of the issue.
          </p>
        </div>
      </section>

      {/* BIZ-8 — CTA band */}
      <CTABand title="Let's plan your fleet." ctaLabel="Book a Ride" openModal />
    </>
  );
}
