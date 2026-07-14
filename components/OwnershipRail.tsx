'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// HOME-2 step copy — verbatim from CONTENT.md.
const STEPS = [
  {
    n: 1,
    name: 'Lease',
    body: 'Choose your fleet size. No capital outlay, no bank loans. We deploy in 15–20 days.',
  },
  {
    n: 2,
    name: 'Operate',
    body: 'One fixed monthly cost covers maintenance, insurance, breakdown support and replacements. You run deliveries; we run the fleet.',
  },
  {
    n: 3,
    name: 'Own',
    body: 'After 24 months, 100% ownership of every scooter transfers to your company. No residual payments. No return logistics.',
  },
];

// Progress thresholds at which each step card lights up as the fill passes it.
const STEP_THRESHOLDS = [0.12, 0.5, 0.82];
const OWNED_THRESHOLD = 0.9;

/**
 * The site's signature moment (DESIGN.md §6): a horizontal rail that fills green
 * on scroll while a scooter glyph travels along it; the right endpoint flips
 * from "Leased" to a filled green "Owned" chip near the end. Under reduced
 * motion the rail renders fully filled, the chip is "Owned", and all cards active.
 */
export function OwnershipRail() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.55'],
  });

  const fillWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const glyphLeft = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [activeStep, setActiveStep] = useState(reduce ? 3 : 0);
  const [owned, setOwned] = useState(reduce ? true : false);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    const step = v >= STEP_THRESHOLDS[2] ? 3 : v >= STEP_THRESHOLDS[1] ? 2 : v >= STEP_THRESHOLDS[0] ? 1 : 0;
    setActiveStep((prev) => (prev === step ? prev : step));
    setOwned((prev) => {
      const next = v >= OWNED_THRESHOLD;
      return prev === next ? prev : next;
    });
  });

  return (
    <div ref={sectionRef}>
      {/* Rail */}
      <div className="mt-14 md:mt-16">
        <div className="relative">
          {/* Endpoint labels */}
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-caption font-medium uppercase tracking-[0.08em] text-slate-text">
                Day 1
              </p>
              <p className="mt-1 font-display text-body font-semibold text-ink">Leased</p>
            </div>
            <div className="text-right">
              <p className="text-caption font-medium uppercase tracking-[0.08em] text-slate-text">
                Month 24
              </p>
              {/* Flipping chip */}
              <div className="mt-1 flex justify-end">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-display text-body font-semibold transition-colors duration-300',
                    owned
                      ? 'bg-brand-green text-white'
                      : 'border border-line bg-paper text-ink',
                  )}
                >
                  {owned && <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />}
                  {owned ? 'Owned by you' : 'Leased'}
                </span>
              </div>
            </div>
          </div>

          {/* Track + fill + glyph */}
          <div className="relative h-1.5 rounded-pill bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-pill bg-brand-green"
              style={{ width: reduce ? '100%' : fillWidth }}
            />
            {/* Endpoint nodes */}
            <span className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-green bg-brand-green" />
            <span
              className={cn(
                'absolute right-0 top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300',
                owned ? 'border-brand-green bg-brand-green' : 'border-line bg-paper',
              )}
            />
            {/* Traveling scooter glyph */}
            <motion.div
              className="absolute top-1/2 z-10 -translate-y-1/2"
              style={{ left: reduce ? '100%' : glyphLeft }}
            >
              <span className="flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-hover">
                <ScooterGlyph />
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Step cards */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step) => {
          const active = activeStep >= step.n;
          return (
            <div
              key={step.n}
              className={cn(
                'flex flex-col rounded-card border bg-paper p-8 transition-all duration-300',
                active ? 'border-brand-green shadow-subtle' : 'border-line',
              )}
            >
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full font-display text-body font-bold transition-colors duration-300',
                  active ? 'bg-brand-green text-white' : 'bg-mist text-slate-text',
                )}
              >
                {step.n}
              </span>
              <h3 className="mt-5 font-display text-h3-card font-semibold text-ink">{step.name}</h3>
              <p className="mt-2.5 text-body-m text-slate-text">{step.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Minimal stylized scooter glyph (side view), sized for the traveling puck. */
function ScooterGlyph() {
  return (
    <svg
      viewBox="0 0 48 32"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="25" r="4.5" />
      <circle cx="39" cy="25" r="4.5" />
      <path d="M9 25 H35 M35 25 V8 M35 8 H43 M35 25 H39" />
    </svg>
  );
}
