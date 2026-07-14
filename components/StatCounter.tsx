'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type StatCounterProps = {
  /** Numeric target to count up to. Omit for non-numeric displays (ranges). */
  value?: number;
  /** Pre-formatted display used when the figure isn't a single integer (e.g. "15–20"). */
  display?: string;
  unit?: string;
  label: string;
  className?: string;
};

/**
 * Big green figure (Poppins 700) with a caption. Countable values count up over
 * 1.2s once in view (DESIGN.md §8.4). Reduced motion renders the final value.
 */
export function StatCounter({ value, display, unit, label, className }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(value !== undefined && !reduce ? 0 : (value ?? 0));

  useEffect(() => {
    if (value === undefined || !inView) return;
    if (reduce) {
      setCount(value);
      return;
    }
    const duration = 1200;
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  const figure = display ?? String(count);
  const tightUnit = unit === '%';

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)}>
      <div className="font-display font-bold leading-none tracking-[-0.02em] text-brand-green">
        <span className="text-[44px] md:text-[52px]">{figure}</span>
        {unit && (
          <span className={cn('text-[24px] md:text-[28px]', tightUnit ? '' : 'ml-1.5')}>
            {unit}
          </span>
        )}
      </div>
      <span className="text-body-m text-slate-text">{label}</span>
    </div>
  );
}
