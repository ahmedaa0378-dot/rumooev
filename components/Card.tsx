import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** 40px brand-green-light chip holding a 24px outline icon (DESIGN.md §7). */
export function IconChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light text-ink',
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

type CardProps = {
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  /** Turns the whole card into a link with an arrow affordance handled by caller. */
  href?: string;
  className?: string;
  /** mist fill instead of white (for use on white sections that need contrast). */
  fill?: 'white' | 'mist';
  padding?: 'default' | 'compact';
};

export function Card({
  icon,
  title,
  children,
  href,
  className,
  fill = 'white',
  padding = 'default',
}: CardProps) {
  const classes = cn(
    'group relative flex flex-col rounded-card border border-line transition-all duration-200 ease-out-soft',
    fill === 'white' ? 'bg-paper' : 'bg-mist',
    padding === 'default' ? 'p-8' : 'p-6',
    'hover:border-brand-green/40 hover:shadow-hover',
    href && 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green',
    className,
  );

  const inner = (
    <>
      {icon && <IconChip className="mb-5">{icon}</IconChip>}
      {title && (
        <h3 className="font-display text-h3-card-m font-semibold text-ink md:text-h3-card">
          {title}
        </h3>
      )}
      {children && (
        <div className={cn('text-body-m text-slate-text', Boolean(title) && 'mt-2.5')}>{children}</div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return <div className={classes}>{inner}</div>;
}
