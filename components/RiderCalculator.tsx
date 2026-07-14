'use client';

import { Check, Fuel, Bike } from 'lucide-react';
import { computeRider, RIDER_KM_MIN, RIDER_KM_MAX } from '@/lib/pricing';
import { inr } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * Rider (B2C) comparison: owning a petrol bike (EMI + fuel + upkeep) vs. renting
 * the Rumoo Ultra from ₹260/day. Petrol-side figures are illustrative estimates
 * (see RIDER_ASSUMPTIONS, TO_VALIDATE); the Rumoo side stays anchored on
 * "from ₹260/day". No fabricated "% saved" claim — an estimated monthly gap is
 * only surfaced when renting genuinely works out lower.
 */
export function RiderCalculator({
  kmPerDay,
  onKmChange,
}: {
  kmPerDay: number;
  onKmChange: (v: number) => void;
}) {
  const r = computeRider(kmPerDay);

  return (
    <div className="rounded-card border-2 border-brand-green/30 bg-mist p-6 shadow-subtle md:p-10">
      {/* Usage input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="rider-km" className="text-caption font-medium uppercase tracking-[0.06em] text-slate-text">
          Distance you ride per day
        </label>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[40px] font-bold leading-none text-ink md:text-[52px]">
            {kmPerDay}
          </span>
          <span className="text-body-m text-slate-text">km / day</span>
        </div>
      </div>
      <input
        id="rider-km"
        type="range"
        min={RIDER_KM_MIN}
        max={RIDER_KM_MAX}
        step={10}
        value={kmPerDay}
        onChange={(e) => onKmChange(Number(e.target.value))}
        aria-valuetext={`${kmPerDay} km per day`}
        className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-pill bg-line accent-brand-green"
      />
      <p className="mt-3 text-caption text-slate-text">
        Assumes about <span className="font-semibold text-ink">{r.days} riding days</span> a month.
      </p>

      {/* Two-column comparison */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Petrol bike */}
        <div className="flex flex-col rounded-card border border-line bg-paper p-5">
          <div className="flex items-center gap-2 text-slate-text">
            <Fuel className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            <span className="text-body-m font-semibold text-ink">Buy a petrol bike</span>
          </div>
          <p className="mt-3 text-caption text-slate-text">Upfront</p>
          <p className="font-display text-[22px] font-bold text-ink">
            {inr(r.petrolUpfront)}
            <span className="ml-1 text-caption font-normal text-slate-text">down + loan</span>
          </p>
          <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
            {r.petrolLines.map((l) => (
              <li key={l.label} className="flex items-center justify-between text-body-m">
                <span className="text-slate-text">{l.label}</span>
                <span className="text-ink">{inr(l.value)}</span>
              </li>
            ))}
            <li className="mt-1 flex items-center justify-between border-t border-line pt-3 text-body-m font-semibold">
              <span className="text-ink">Per month</span>
              <span className="text-ink">{inr(r.petrolMonthly)}</span>
            </li>
          </ul>
        </div>

        {/* Rumoo Ultra */}
        <div className="flex flex-col rounded-card border-2 border-brand-green/40 bg-brand-green-light/40 p-5">
          <div className="flex items-center gap-2">
            <Bike className="h-5 w-5 text-brand-green" strokeWidth={1.75} aria-hidden="true" />
            <span className="text-body-m font-semibold text-ink">Rent the Rumoo Ultra</span>
          </div>
          <p className="mt-3 text-caption text-slate-text">Upfront</p>
          <p className="font-display text-[22px] font-bold text-brand-green">
            ₹0<span className="ml-1 text-caption font-normal text-slate-text">no loan</span>
          </p>
          <ul className="mt-4 flex flex-col gap-2 border-t border-brand-green/20 pt-4">
            {['No EMI', 'No fuel bills', 'Maintenance included', 'Battery swaps included'].map((f) => (
              <li key={f} className="flex items-center gap-2 text-body-m text-ink">
                <Check className="h-4 w-4 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
                {f}
              </li>
            ))}
            <li className="mt-1 flex items-center justify-between border-t border-brand-green/20 pt-3 text-body-m font-semibold">
              <span className="text-ink">Per month, from</span>
              <span className="text-brand-green">{inr(r.rumooMonthly)}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Honest headline — only when renting is genuinely lower */}
      {r.rumooCheaper ? (
        <p className="mt-6 font-display text-h3-card font-semibold text-ink md:text-[26px]">
          That&apos;s about <span className="text-brand-green">{inr(r.monthlyDiff)}/month</span> less —
          with <span className="text-brand-green">₹0</span> upfront and no loan.
        </p>
      ) : (
        <p className="mt-6 font-display text-h3-card font-semibold text-ink md:text-[26px]">
          <span className="text-brand-green">₹0 upfront, no loan, no fuel bills</span> — pay only for
          the days you ride.
        </p>
      )}

      <p className="mt-5 rounded-card bg-ink px-5 py-4 text-body-m font-medium text-white">
        Plans from ₹260/day. Pay as you earn — the scooter, maintenance and breakdown support are
        included.
      </p>

      <p className="mt-5 text-caption text-slate-text">
        Petrol-bike figures are illustrative estimates for comparison, exclusive of taxes. Your
        actual costs depend on the bike, fuel price, usage and city. Final Rumoo plan pricing depends
        on your city and rental duration — we&apos;ll confirm before you book.
      </p>
    </div>
  );
}
