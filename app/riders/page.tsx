import type { Metadata } from 'next';
import { Route, BatteryCharging, Wrench, IndianRupee } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/Card';
import { Accordion } from '@/components/Accordion';
import { LeadForm, type LeadField } from '@/components/LeadForm';
import { Figure } from '@/components/Figure';
import { Button } from '@/components/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { IMAGES } from '@/lib/images';
import { RIDER_FAQ } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Ride with Rumoo — Rent the Ultra from ₹260/day',
  description:
    'Delivery riders: rent the Rumoo Ultra from ₹260/day. 80–100 km range, swappable battery with no charging downtime, and maintenance and breakdown support included. Pay as you earn.',
  openGraph: {
    title: 'Ride with Rumoo · Rent the Ultra',
    description:
      'Your scooter. Your earnings. From ₹260 a day — battery swaps, maintenance and support included.',
  },
};

// RID-2
const WHY = [
  {
    icon: Route,
    title: 'Go further',
    body: '80–100 km on a single charge at delivery pace — 40 km/h.',
  },
  {
    icon: BatteryCharging,
    title: 'Never wait to charge',
    body: 'Swappable battery. Swap in minutes and get back on the road.',
  },
  {
    icon: Wrench,
    title: 'Zero maintenance worries',
    body: 'Servicing, repairs and breakdown support included.',
  },
  {
    icon: IndianRupee,
    title: 'Simple daily pricing',
    body: 'Plans from ₹260/day. Pay as you earn.',
  },
];

// RID-3
const HOW = [
  { title: 'Enquire', body: 'Fill the form or WhatsApp us.' },
  { title: 'Verify', body: "Share your documents — we'll complete a quick verification." },
  { title: 'Ride', body: 'Pick up your Ultra and start earning.' },
];

// RID-4
const BOOKING_FIELDS: LeadField[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'city', label: 'City', type: 'text', required: true },
  { name: 'model', label: 'Preferred model', type: 'text', fixedValue: 'Rumoo Ultra' },
  { name: 'startDate', label: 'Start date', type: 'date', required: true },
];

export default function RidersPage() {
  return (
    <>
      {/* RID-1 — Hero */}
      <PageHero
        eyebrow="For Riders"
        title="Your scooter. Your earnings. From ₹260 a day."
        subtitle="Rent the Rumoo Ultra and start delivering — battery swaps, maintenance and support are on us."
        actions={<Button href="#book" size="lg">Book Your Scooter</Button>}
        media={
          <Figure
            asset={IMAGES.ultra}
            ratio="aspect-[4/3]"
            frame="framed"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
      />

      {/* RID-2 — Why ride Rumoo */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Why Rumoo" title="Ride more. Earn more. Worry less." align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <RevealItem key={w.title} className="h-full">
                <Card className="h-full" icon={<w.icon className="h-6 w-6" strokeWidth={1.5} />} title={w.title}>
                  {w.body}
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* RID-3 — How it works */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Three steps to the road." align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {HOW.map((s, i) => (
              <RevealItem key={s.title} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-paper p-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green font-display text-body font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-h3-card font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-body-m text-slate-text">{s.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* RID-4 — Booking form */}
      <section id="book" className="section-soft section-y scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Book now" title="Book your Rumoo Ultra" align="center" />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-2xl rounded-card border border-line bg-paper p-6 md:p-10">
            <LeadForm
              fields={BOOKING_FIELDS}
              formType="rider"
              submitLabel="Request Booking"
              successTitle="Request received."
              successMessage="We'll reach you on WhatsApp within 24 hours."
            />
          </Reveal>
        </div>
      </section>

      {/* RID-5 — Rider FAQ */}
      <section id="faq" className="section-y bg-paper scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Rider questions, answered." align="center" />
          </Reveal>
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <Accordion items={RIDER_FAQ} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
