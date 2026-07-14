'use client';

import { Check } from 'lucide-react';
import { computeSavings, SLIDER_STEPS } from '@/lib/pricing';
import { inr, inrCompact } from '@/lib/format';

/**
 * Savings calculator (SITEMAP PRC-3). Framed on capital preservation + total
 * cost of operations, NOT a fabricated savings %. A total-savings figure only
 * appears if lease TCO is genuinely lower than buy TCO; otherwise it leads with
 * zero capex, bundled inclusions and end-of-term ownership.
 *
 * Controlled by the parent so the pricing table can highlight the matching tier.
 */
export function SavingsCalculator({
  stepIndex,
  onStepChange,
}: {
  stepIndex: number;
  onStepChange: (i: number) => void;
}) {
  const fleet = SLIDER_STEPS[stepIndex];
  const r = computeSavings(fleet);

  return (
    <div className="rounded-card border-2 border-brand-green/30 bg-mist p-6 shadow-subtle md:p-10">
      {/* Fleet-size input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="fleet-size" className="text-caption font-medium uppercase tracking-[0.06em] text-slate-text">
          Your fleet size
        </label>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[40px] font-bold leading-none text-ink md:text-[52px]">
            {fleet.toLocaleString('en-IN')}
          </span>
          <span className="text-body-m text-slate-text">scooters</span>
        </div>
      </div>

      <input
        id="fleet-size"
        type="range"
        min={0}
        max={SLIDER_STEPS.length - 1}
        step={1}
        value={stepIndex}
        onChange={(e) => onStepChange(Number(e.target.value))}
        aria-valuetext={`${fleet} scooters`}
        className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-pill bg-line accent-brand-green"
      />
      <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-text">
        {SLIDER_STEPS.map((s) => (
          <span key={s}>{s.toLocaleString('en-IN')}</span>
        ))}
      </div>
      <p className="mt-3 text-caption text-slate-text">
        Tenure: <span className="font-semibold text-ink">24 months</span>, Lease-to-Own (fixed)
      </p>

      {/* Output 1 — upfront capital */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-brand-green/30 bg-brand-green-light/50 p-5">
          <p className="text-caption font-medium text-slate-text">Upfront capital — Lease with Rumoo</p>
          <p className="mt-1 font-display text-[28px] font-bold text-brand-green">₹0*</p>
        </div>
        <div className="rounded-card border border-line bg-paper p-5">
          <p className="text-caption font-medium text-slate-text">Upfront capital — Buy &amp; own</p>
          <p className="mt-1 font-display text-[28px] font-bold text-ink">{inrCompact(r.buyUpfront)}</p>
        </div>
      </div>
      <p className="mt-2 text-caption text-slate-text">*A refundable deposit of 2 months&apos; lease applies.</p>

      {/* Dynamic headline */}
      <p className="mt-6 font-display text-h3-card font-semibold text-ink md:text-[26px]">
        <span className="text-brand-green">{inrCompact(r.buyUpfront)}</span> of working capital stays
        in your business.
      </p>

      {/* Output 2 — monthly */}
      <div className="mt-8 rounded-card border border-line bg-paper p-5">
        <p className="text-caption font-medium text-slate-text">Your fixed monthly cost — everything included</p>
        <p className="mt-1 font-display text-[28px] font-bold text-ink">
          {inr(r.monthlyTotal)}
          <span className="ml-2 text-body-m font-normal text-slate-text">/ month</span>
        </p>
        <p className="mt-1 text-caption text-slate-text">
          That&apos;s {inr(r.tier.monthly)} per scooter{r.tier.custom ? ' (custom enterprise pricing)' : ''}.
        </p>
      </div>

      {/* Inclusions with struck-through buy-side equivalents */}
      <div className="mt-8">
        <p className="text-caption font-semibold uppercase tracking-[0.06em] text-slate-text">
          Bundled in the lease — what you&apos;d pay separately if you bought
        </p>
        <ul className="mt-3 flex flex-col gap-2.5">
          {r.inclusions.map((inc) => (
            <li key={inc.label} className="flex items-center justify-between gap-4 text-body-m">
              <span className="flex items-center gap-2 text-ink">
                <Check className="h-4 w-4 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
                {inc.label}
              </span>
              <span className="text-slate-text line-through decoration-slate-text/50">
                {inr(inc.buyCost)}<span className="text-[11px]"> /scooter</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-3 text-body-m font-semibold text-ink">
          <span>Bundled free per scooter</span>
          <span className="text-brand-green">{inr(r.buyExtrasPerScooter)}</span>
        </div>
      </div>

      {/* Only surface a savings figure if lease TCO is genuinely lower */}
      {r.leaseCheaper && (
        <p className="mt-6 rounded-card bg-brand-green-light px-5 py-4 font-display text-body font-semibold text-ink">
          Estimated 24-month total advantage: {inrCompact(r.savings)}
        </p>
      )}

      {/* Ownership line */}
      <p className="mt-6 flex items-start gap-2 rounded-card bg-ink px-5 py-4 text-body-m font-medium text-white">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
        After 24 months, all {fleet.toLocaleString('en-IN')} scooters belong to you.
      </p>

      <p className="mt-5 text-caption text-slate-text">
        All values are estimates, exclusive of GST. Actual figures depend on usage, routes and
        deployment location.
      </p>
    </div>
  );
}
