import { cn } from '@/lib/utils';

export type Step = { day?: string; title: string; body?: string };

/**
 * Deployment/process timeline (DESIGN.md §5). Desktop: horizontal rail with
 * numbered green nodes joined by a connecting line, day range + copy beneath.
 * Mobile: vertical left-aligned rail.
 */
export function Stepper({ steps }: { steps: Step[] }) {
  const num = (i: number) => String(i + 1).padStart(2, '0');

  return (
    <div>
      {/* Desktop — horizontal */}
      <ol className="relative hidden lg:grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {/* connecting line, centered on the 28px nodes */}
        <span
          aria-hidden
          className="absolute top-[13px] h-0.5 bg-line"
          style={{ left: `${50 / steps.length}%`, right: `${50 / steps.length}%` }}
        />
        {steps.map((s, i) => (
          <li key={i} className="relative flex flex-col items-center px-3 text-center">
            <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-brand-green font-display text-[13px] font-bold text-white">
              {num(i)}
            </span>
            {s.day && (
              <span className="mt-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-brand-green">
                {s.day}
              </span>
            )}
            <h3 className="mt-1.5 font-display text-body font-semibold text-ink">{s.title}</h3>
            {s.body && <p className="mt-2 text-caption text-slate-text">{s.body}</p>}
          </li>
        ))}
      </ol>

      {/* Mobile — vertical */}
      <ol className="flex flex-col lg:hidden">
        {steps.map((s, i) => (
          <li key={i} className={cn('relative flex gap-4', i < steps.length - 1 && 'pb-8')}>
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute left-[13px] top-7 h-full w-0.5 bg-line" />
            )}
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green font-display text-[13px] font-bold text-white">
              {num(i)}
            </span>
            <div className="pt-0.5">
              {s.day && (
                <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-brand-green">
                  {s.day}
                </span>
              )}
              <h3 className="mt-0.5 font-display text-body font-semibold text-ink">{s.title}</h3>
              {s.body && <p className="mt-1.5 text-body-m text-slate-text">{s.body}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
