import { Zap } from 'lucide-react';
import { Button } from './Button';
import { BookRideButton } from './BookRideButton';
import { Reveal } from './Reveal';

type CTABandProps = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  /** Navigate here. Omit when `openModal` is set. */
  ctaHref?: string;
  /** Open the global request modal instead of navigating. */
  openModal?: boolean;
};

/**
 * Dark call-to-action band (DESIGN.md §5): ink bg, centered white H2, one line
 * of subtext, one primary button. Faint bolt mark at 4% opacity, right-aligned.
 */
export function CTABand({ title, subtitle, ctaLabel, ctaHref, openModal }: CTABandProps) {
  return (
    <section className="bg-ink">
      <div className="container-x section-y">
        <div className="relative overflow-hidden">
          {/* Translucent brand bolt — decorative texture only. */}
          <Zap
            className="pointer-events-none absolute -right-6 top-1/2 hidden h-64 w-64 -translate-y-1/2 text-white/[0.04] sm:block"
            strokeWidth={1}
            aria-hidden="true"
          />
          <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 className="font-display text-h2-section-m font-bold tracking-[-0.02em] text-white md:text-h2-section">
              {title}
            </h2>
            {subtitle && <p className="text-body-m md:text-body max-w-prose text-white/70">{subtitle}</p>}
            {openModal ? (
              <BookRideButton size="lg">{ctaLabel}</BookRideButton>
            ) : (
              <Button href={ctaHref ?? '/contact'} size="lg">
                {ctaLabel}
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
