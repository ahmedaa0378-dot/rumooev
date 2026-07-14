'use client';

import { useState } from 'react';
import { Building2, Bike, Check, ChevronDown } from 'lucide-react';
import { SavingsCalculator } from './SavingsCalculator';
import { RiderCalculator } from './RiderCalculator';
import { PricingTable } from './PricingTable';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import {
  SLIDER_STEPS,
  DEFAULT_STEP_INDEX,
  tierForFleet,
  RIDER_KM_DEFAULT,
} from '@/lib/pricing';
import { cn } from '@/lib/utils';

type Mode = 'business' | 'rider';

// Every-plan-includes strip (CONTENT.md PRC-2).
const INCLUDES = [
  '24-Month Lease-to-Own',
  'Preventive Maintenance',
  'Breakdown Support',
  'Fleet Support',
  'Dedicated Account Manager',
  'Ownership Transfer After 24 Months',
];

function NeonToggle({
  active,
  onClick,
  icon: Icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Building2;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group relative flex items-center gap-4 rounded-card border-2 bg-ink p-5 text-left transition-all duration-300 md:p-6',
        active
          ? 'border-brand-green shadow-[0_0_36px_rgba(22,163,74,0.55)]'
          : 'border-white/10 shadow-[0_0_16px_rgba(22,163,74,0.15)] hover:border-brand-green/50 hover:shadow-[0_0_28px_rgba(22,163,74,0.35)]',
      )}
    >
      <span
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors',
          active ? 'bg-brand-green text-white' : 'bg-brand-green/15 text-brand-green',
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-h3-card font-semibold text-white">{title}</span>
        <span className="block text-caption text-white/60">{subtitle}</span>
      </span>
      {active && (
        <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden="true" />
        </span>
      )}
    </button>
  );
}

export function PricingSwitcher() {
  const [mode, setMode] = useState<Mode>('business');
  const [stepIndex, setStepIndex] = useState(DEFAULT_STEP_INDEX);
  const [kmPerDay, setKmPerDay] = useState(RIDER_KM_DEFAULT);
  const activeTier = tierForFleet(SLIDER_STEPS[stepIndex]);

  return (
    <section className="bg-paper pb-16 pt-28 md:pb-24 md:pt-[150px]">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="Flexible plans. Maximum value."
            subtitle="Transparent per-scooter pricing that gets better as your fleet grows. Pick your path to estimate the numbers."
            align="center"
          />
        </Reveal>

        {/* Neon toggle */}
        <Reveal className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <NeonToggle
            active={mode === 'business'}
            onClick={() => setMode('business')}
            icon={Building2}
            title="Business Lease"
            subtitle="Fleets from 50 scooters · Lease-to-Own"
          />
          <NeonToggle
            active={mode === 'rider'}
            onClick={() => setMode('rider')}
            icon={Bike}
            title="Riders"
            subtitle="Rent the Ultra · from ₹260/day"
          />
        </Reveal>

        {/* Selected calculator */}
        <div className="mx-auto mt-10 max-w-3xl">
          {mode === 'business' ? (
            <div>
              <SavingsCalculator stepIndex={stepIndex} onStepChange={setStepIndex} />

              {/* Every-plan-includes strip */}
              <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
                {INCLUDES.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-paper px-3.5 py-2 text-caption font-medium text-ink"
                  >
                    <Check className="h-4 w-4 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Collapsible full tier table (public tiers — CLAUDE.md rule 6) */}
              <details className="group mt-8 rounded-card border border-line bg-paper">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-body-m font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  See all 6 pricing tiers
                  <ChevronDown
                    className="h-5 w-5 text-brand-green transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-t border-line p-6">
                  <PricingTable activeLabel={activeTier.label} />
                  <p className="mt-5 text-caption text-slate-text">
                    All prices exclusive of GST. Battery swapping services are optional and billed
                    separately based on fleet size, battery requirements, and deployment location.
                    Fleets of 50–99 scooters: contact us for a custom quote.
                  </p>
                </div>
              </details>
            </div>
          ) : (
            <RiderCalculator kmPerDay={kmPerDay} onKmChange={setKmPerDay} />
          )}
        </div>
      </div>
    </section>
  );
}
