'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/Button';
import { BookRideButton } from '@/components/BookRideButton';
import { Figure } from '@/components/Figure';
import BackgroundScene from '@/components/ui/aurora-section-hero';
import { IMAGES } from '@/lib/images';

// HOME-1 copy — verbatim from CONTENT.md.
const HEADLINE = ['Lease', 'today.', 'Own', 'tomorrow.'];
const BADGES = ['24-Month Lease-to-Own', '95% Uptime SLA', 'Pan-India Support'];
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Homepage hero (HOME-1) over the aurora light-beam background: left text block,
 * right scooter image. Orchestrated entrance preserved (DESIGN.md §8.1); reduced
 * motion collapses to short fades and the background freezes (see globals.css).
 */
export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number, y = 16) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay, ease: EASE },
        };

  return (
    <section className="relative isolate flex items-center overflow-hidden bg-ink lg:min-h-[92vh]">
      {/* Animated neon light-beam background */}
      <BackgroundScene beamCount={60} />

      <div className="container-x relative z-10 grid items-center gap-10 pb-20 pt-28 md:pt-32 lg:grid-cols-2 lg:gap-8">
        {/* Text block — left aligned, max 560px */}
        <div className="max-w-[560px]">
          <motion.p className="eyebrow" {...rise(0)}>
            Enterprise EV Fleet Leasing
          </motion.p>

          {/* Single thin green line under the eyebrow */}
          <motion.div
            className="mt-4 h-0.5 w-12 origin-left rounded-full bg-brand-green"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : 0.08, ease: EASE }}
          />

          <h1 className="mt-7 font-display text-h1-hero-m font-bold leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_0_32px_rgba(22,163,74,0.5),0_0_8px_rgba(34,197,94,0.4)] md:text-h1-hero">
            {HEADLINE.map((word, i) => (
              <Fragment key={i}>
                <motion.span
                  className="inline-block"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{
                    duration: reduce ? 0.2 : 0.4,
                    delay: reduce ? 0 : 0.12 + i * 0.06,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
                {/* Space as a sibling text node so it survives inline-block trimming */}
                {i < HEADLINE.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>

          <motion.p className="mt-6 max-w-prose text-body-m text-white/75 md:text-body" {...rise(0.4)}>
            Deploy an electric delivery fleet with zero upfront investment. Pay a fixed monthly lease
            for 24 months — then every scooter belongs to your company.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap gap-4" {...rise(0.48)}>
            <BookRideButton
              size="lg"
              className="shadow-[0_0_28px_rgba(22,163,74,0.5)] hover:shadow-[0_0_40px_rgba(22,163,74,0.7)]"
            >
              Book a Ride
            </BookRideButton>
            <Button href="/pricing" variant="secondary-dark" size="lg">
              Explore Pricing
            </Button>
          </motion.div>

          <motion.ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2" {...rise(0.6)}>
            {BADGES.map((badge) => (
              <li
                key={badge}
                className="rounded-pill border border-white/15 bg-white/[0.03] px-3 py-1.5 text-caption font-medium text-white/80 backdrop-blur-sm"
              >
                {badge}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Scooter image — right column, capped so it doesn't dominate the hero */}
        <motion.div
          className="relative mx-auto w-full max-w-[520px] lg:mr-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : 0.2, ease: EASE }}
        >
          <Figure
            asset={IMAGES.heroScooter}
            ratio="aspect-[4/5]"
            frame="framed"
            tone="dark"
            priority
            sizes="(max-width: 1024px) 80vw, 520px"
          />
        </motion.div>
      </div>
    </section>
  );
}
