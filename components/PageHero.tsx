import type { ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Buttons row under the copy. */
  actions?: ReactNode;
  /** Optional right-column media (image, panel). Switches to a 2-col layout. */
  media?: ReactNode;
  align?: 'left' | 'center';
};

/**
 * Clean, light inner-page hero (per the agreed direction — the neon beam hero
 * stays a homepage-only signature). Includes top padding to clear the fixed
 * 72px navbar. Uses `h1` for the page title.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  actions,
  media,
  align = 'left',
}: PageHeroProps) {
  const hasMedia = Boolean(media);
  return (
    <section className="border-b border-line/70 bg-paper pb-16 pt-28 md:pb-24 md:pt-[150px]">
      <div
        className={cn(
          'container-x',
          hasMedia && 'grid items-center gap-10 lg:grid-cols-2 lg:gap-12',
        )}
      >
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align={hasMedia ? 'left' : align}
          />
          {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
        </Reveal>
        {hasMedia && <Reveal delay={0.1}>{media}</Reveal>}
      </div>
    </section>
  );
}
