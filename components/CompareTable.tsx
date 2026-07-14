import { Fragment } from 'react';
import { Check, X } from 'lucide-react';

export type CompareRow = { dimension: string; lease: string; buy: string };

/**
 * Lease vs Buy comparison (WHY-2). Rumoo column carries green checks + a
 * brand-green-light header chip; the Buy column uses neutral grey crosses —
 * informative, not cartoonishly negative (DESIGN.md §5). Desktop = 3-col grid,
 * mobile = stacked cards.
 */
export function CompareTable({ rows }: { rows: CompareRow[] }) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-card border border-line md:block">
        <div className="grid grid-cols-[1fr_1.4fr_1.4fr]">
          <div className="bg-mist px-6 py-5" />
          <div className="bg-brand-green-light px-6 py-5">
            <span className="rounded-pill bg-brand-green px-3 py-1 text-caption font-semibold text-white">
              Lease with Rumoo
            </span>
          </div>
          <div className="bg-mist px-6 py-5 text-body-m font-semibold text-slate-text">Buy &amp; own</div>

          {rows.map((r) => (
            <Fragment key={r.dimension}>
              <div className="border-t border-line px-6 py-5 text-body-m font-semibold text-ink">
                {r.dimension}
              </div>
              <div className="flex items-start gap-2.5 border-t border-line bg-brand-green-light/25 px-6 py-5 text-body-m text-ink">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
                {r.lease}
              </div>
              <div className="flex items-start gap-2.5 border-t border-line px-6 py-5 text-body-m text-slate-text">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-text/50" strokeWidth={2} aria-hidden="true" />
                {r.buy}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {rows.map((r) => (
          <div key={r.dimension} className="rounded-card border border-line bg-paper p-5">
            <p className="text-body-m font-semibold text-ink">{r.dimension}</p>
            <div className="mt-3 flex items-start gap-2.5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
              <p className="text-body-m text-ink">
                <span className="font-semibold text-brand-green">Rumoo: </span>
                {r.lease}
              </p>
            </div>
            <div className="mt-2.5 flex items-start gap-2.5">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-text/50" strokeWidth={2} aria-hidden="true" />
              <p className="text-body-m text-slate-text">
                <span className="font-semibold">Buy: </span>
                {r.buy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
