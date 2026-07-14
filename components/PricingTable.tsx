import { inr } from '@/lib/format';
import { PRICING_TIERS } from '@/lib/pricing';
import { cn } from '@/lib/utils';

/**
 * B2B pricing table (CONTENT.md PRC-2). No vertical rules, mist header, hairline
 * rows (DESIGN.md §5). The row matching `activeLabel` (driven by the calculator)
 * highlights in brand-green-light.
 */
export function PricingTable({ activeLabel }: { activeLabel?: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-line">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Per-scooter lease pricing by fleet size, 24-month Lease-to-Own
        </caption>
        <thead>
          <tr className="bg-mist">
            <th scope="col" className="px-5 py-4 text-caption font-semibold uppercase tracking-[0.06em] text-slate-text">
              Fleet size
            </th>
            <th scope="col" className="px-5 py-4 text-caption font-semibold uppercase tracking-[0.06em] text-slate-text">
              Weekly lease
            </th>
            <th scope="col" className="px-5 py-4 text-right text-caption font-semibold uppercase tracking-[0.06em] text-slate-text">
              Monthly lease
            </th>
          </tr>
        </thead>
        <tbody>
          {PRICING_TIERS.map((t) => {
            const active = t.label === activeLabel;
            return (
              <tr
                key={t.label}
                className={cn(
                  'border-t border-line transition-colors duration-200',
                  active ? 'bg-brand-green-light' : 'bg-paper',
                )}
              >
                <th
                  scope="row"
                  className={cn(
                    'px-5 py-4 text-body-m font-medium',
                    active ? 'text-ink' : 'text-ink',
                  )}
                >
                  {t.label}
                  {t.custom && (
                    <span className="ml-2 rounded-pill bg-ink px-2 py-0.5 align-middle text-[11px] font-semibold text-white">
                      Custom
                    </span>
                  )}
                </th>
                <td className="px-5 py-4 text-body-m text-slate-text">{inr(t.weekly)}</td>
                <td className="px-5 py-4 text-right font-display text-[20px] font-semibold text-ink">
                  {inr(t.monthly)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
