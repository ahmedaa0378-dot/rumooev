import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PricingSwitcher } from '@/components/PricingSwitcher';
import { Accordion } from '@/components/Accordion';
import { SectionHeading } from '@/components/SectionHeading';
import { CTABand } from '@/components/CTABand';
import { Reveal } from '@/components/Reveal';
import { BUSINESS_FAQ } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent per-scooter pricing for RumooEV enterprise EV fleet leasing — six fleet-size tiers on a 24-month Lease-to-Own plan, plus a savings calculator. GST extra; battery swapping optional.',
  openGraph: {
    title: 'Pricing · RumooEV',
    description:
      'Transparent per-scooter Lease-to-Own pricing that gets better as your fleet grows. See tiers and estimate what leasing frees up.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: BUSINESS_FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* PRC-1 hero + two-audience switcher (Business Lease / Rider comparison) */}
      <PricingSwitcher />

      {/* PRC-4 — Rider teaser */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl">
            <Link
              href="/riders"
              className="group flex flex-col items-start justify-between gap-4 rounded-card border border-line bg-paper p-8 transition-all duration-200 hover:border-brand-green/40 hover:shadow-hover sm:flex-row sm:items-center"
            >
              <p className="text-body md:text-[19px]">
                <span className="font-semibold text-ink">Riding solo?</span>{' '}
                <span className="text-slate-text">
                  The Rumoo Ultra is available on daily plans from ₹260/day.
                </span>
              </p>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-green">
                Ride with Rumoo
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PRC-5 — Pricing FAQ */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Pricing questions, answered." align="center" />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <Accordion items={BUSINESS_FAQ} />
          </Reveal>
        </div>
      </section>

      {/* PRC-6 — CTA band */}
      <CTABand
        title="Get a proposal built for your fleet."
        ctaLabel="Request a Proposal"
        openModal
      />
    </>
  );
}
