import Link from 'next/link';
import {
  ArrowRight,
  Layers,
  Wrench,
  ShieldCheck,
  BatteryCharging,
  LifeBuoy,
  KeyRound,
  Zap,
  UtensilsCrossed,
  Truck,
  ShoppingBag,
  Building2,
  Bike,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SectionHeading } from '@/components/SectionHeading';
import { CTABand } from '@/components/CTABand';
import { StatCounter } from '@/components/StatCounter';
import { ModelCard } from '@/components/ModelCard';
import { OwnershipRail } from '@/components/OwnershipRail';
import { Hero } from '@/components/home/Hero';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { IMAGES } from '@/lib/images';
import { organizationSchema, webPageSchema } from '@/lib/schema';

// HOME-5 — What we handle
const HANDLE = [
  { icon: Layers, title: 'Fleet Leasing', body: 'Flexible tiers from 50 to 5,000+ scooters.' },
  { icon: Wrench, title: 'Maintenance', body: 'Preventive servicing and repairs included.' },
  { icon: ShieldCheck, title: 'Insurance', body: 'Comprehensive coverage on every vehicle.' },
  {
    icon: BatteryCharging,
    title: 'Battery Swapping',
    body: 'Optional subscription — swap in minutes, skip charging downtime.',
  },
  { icon: LifeBuoy, title: '24/7 Support', body: 'Breakdown assistance and a dedicated account manager.' },
  { icon: KeyRound, title: 'Ownership Transfer', body: 'Every scooter becomes your asset after 24 months.' },
];

// HOME-6 — Industries
const INDUSTRIES = [
  { icon: Zap, label: 'Quick Commerce' },
  { icon: UtensilsCrossed, label: 'Food Delivery' },
  { icon: Truck, label: 'Logistics & Courier' },
  { icon: ShoppingBag, label: 'E-commerce' },
  { icon: Building2, label: 'Corporate & Campus' },
];

// HOME-8 — Deployment (condensed): 4 milestones from the 7-step timeline
const MILESTONES = [
  'Requirements & proposal',
  'Agreement & documentation',
  'Scooter prep & delivery',
  'Go-live & support',
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema,
          webPageSchema({
            path: '/',
            name: 'RumooEV — Enterprise EV Fleet Lease-to-Own in India',
            description:
              'RumooEV: enterprise EV fleet leasing in India on a 24-month Lease-to-Own plan. After 24 months, every scooter belongs to your company. Pan-India.',
          }),
        ]}
      />

      {/* HOME-1 — Hero (dark) */}
      <Hero />

      {/* HOME-2 — Ownership story (white) — the signature section */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="A fleet that becomes your asset."
              align="center"
            />
          </Reveal>
          <OwnershipRail />
          <Reveal className="mt-14 flex justify-center">
            <p className="max-w-2xl rounded-card border border-brand-green/20 bg-[#ebf7ef] px-8 py-6 text-center text-body-m text-slate-text md:text-body">
              Most leases end with giving the vehicles back.{' '}
              <span className="font-semibold text-ink">Ours ends with you owning them.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOME-3 — Two audiences (mist) */}
      <section className="section-soft section-y">
        <div className="container-x">
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            <RevealItem className="h-full">
              <AudienceCard
                icon={<Building2 className="h-6 w-6" strokeWidth={1.5} />}
                label="For Businesses"
                body="Enterprise fleets from 50 scooters. Lease-to-Own, fully managed, deployed pan-India."
                ctaLabel="Explore fleet leasing"
                href="/business"
              />
            </RevealItem>
            <RevealItem className="h-full">
              <AudienceCard
                icon={<Bike className="h-6 w-6" strokeWidth={1.5} />}
                label="For Riders"
                body="Deliver on your own terms. Rent the Rumoo Ultra from ₹260/day, battery swaps and maintenance included."
                ctaLabel="Ride with Rumoo"
                href="/riders"
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* HOME-4 — Stats band (white) */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            <RevealItem>
              <StatCounter value={24} unit="months" label="to full ownership" />
            </RevealItem>
            <RevealItem>
              <StatCounter value={95} unit="%" label="fleet uptime commitment" />
            </RevealItem>
            <RevealItem>
              <StatCounter display="15–20" unit="days" label="from agreement to on-road" />
            </RevealItem>
            <RevealItem>
              <StatCounter display="24–48" unit="hrs" label="replacement vehicle window" />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* HOME-5 — What we handle (mist) */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="One partner" title="One lease. Everything handled." align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {HANDLE.map((item) => (
              <RevealItem key={item.title} className="h-full">
                <Card
                  className="h-full"
                  icon={<item.icon className="h-6 w-6" strokeWidth={1.5} />}
                  title={item.title}
                >
                  {item.body}
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* HOME-6 — Industries (white) */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title="Built for businesses that deliver."
              subtitle="From dark stores to distribution hubs, Rumoo fleets run last-mile operations across India."
              align="center"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRIES.map((tile) => (
              <RevealItem key={tile.label} className="h-full">
                <div className="flex h-full flex-col items-center gap-3 rounded-card border border-line bg-paper p-6 text-center transition-colors duration-200 hover:border-brand-green/40">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light text-ink">
                    <tile.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="text-body-m font-medium text-ink">{tile.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* HOME-7 — The scooters (mist) */}
      <section className="section-soft section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="The fleet" title="Meet the fleet." align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            <RevealItem className="h-full">
              <ModelCard
                name="Rumoo Lite"
                builtFor="Built for business fleets"
                asset={IMAGES.lite}
                href="/scooters"
                ctaLabel="See full specifications"
              />
            </RevealItem>
            <RevealItem className="h-full">
              <ModelCard
                name="Rumoo HS"
                builtFor="Built for business fleets"
                asset={IMAGES.hs}
                href="/scooters"
                ctaLabel="See full specifications"
              />
            </RevealItem>
            <RevealItem className="h-full">
              <ModelCard
                name="Rumoo Ultra"
                builtFor="Built for riders"
                asset={IMAGES.ultra}
                href="/scooters"
                ctaLabel="See full specifications"
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* HOME-8 — Deployment (condensed) (white) */}
      <section className="section-y bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Deployment"
              title="On the road in 15–20 days."
              align="center"
            />
          </Reveal>
          <Reveal className="mt-14">
            <CondensedStepper milestones={MILESTONES} />
          </Reveal>
          <Reveal className="mt-12 flex justify-center">
            <Button href="/business#deployment" variant="secondary">
              See the full timeline
            </Button>
          </Reveal>
        </div>
      </section>

      {/* HOME-9 — CTA band (dark) */}
      <CTABand
        title="Start with a pilot fleet."
        subtitle="Test Rumoo with a small deployment before you scale. We'll build the pilot plan with you."
        ctaLabel="Book a Ride"
        openModal
      />
    </>
  );
}

/* --- Local section pieces --- */

function AudienceCard({
  icon,
  label,
  body,
  ctaLabel,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  body: string;
  ctaLabel: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-card border border-line bg-paper p-8 transition-all duration-200 ease-out-soft hover:border-brand-green/40 hover:shadow-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green md:p-10"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light text-ink">
        {icon}
      </span>
      <h3 className="mt-6 font-display text-h3-card font-semibold text-ink md:text-[26px]">{label}</h3>
      <p className="mt-3 max-w-md text-body-m text-slate-text md:text-body">{body}</p>
      <span className="mt-8 inline-flex items-center gap-1.5 text-body-m font-semibold text-brand-green">
        {ctaLabel}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

function CondensedStepper({ milestones }: { milestones: string[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-4 md:gap-4">
      {milestones.map((label, i) => (
        <li key={label} className="relative flex gap-4 md:flex-col md:gap-4">
          {/* Connecting line (desktop) */}
          {i < milestones.length - 1 && (
            <span className="absolute left-[14px] top-8 h-[calc(100%+1rem)] w-0.5 bg-line md:left-auto md:right-[-0.5rem] md:top-[14px] md:h-0.5 md:w-[calc(100%-1.75rem)]" />
          )}
          <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green font-display text-caption font-bold text-white">
            {i + 1}
          </span>
          <p className="pt-0.5 text-body-m font-medium text-ink md:pt-2">{label}</p>
        </li>
      ))}
    </ol>
  );
}
