import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark'; // light = on white/mist, dark = on ink/charcoal
  as?: 'h1' | 'h2';
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
  as = 'h2',
  className,
  titleClassName,
}: SectionHeadingProps) {
  const Heading = as;
  const onDark = tone === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'center' && 'mx-auto max-w-2xl',
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading
        className={cn(
          'font-display font-bold tracking-[-0.02em]',
          as === 'h1'
            ? 'text-h1-hero-m md:text-h1-hero'
            : 'text-h2-section-m md:text-h2-section',
          onDark ? 'text-white' : 'text-ink',
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            'text-body-m md:text-body max-w-prose',
            align === 'center' && 'mx-auto',
            onDark ? 'text-white/70' : 'text-slate-text',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
