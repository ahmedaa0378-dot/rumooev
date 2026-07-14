import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'secondary-dark';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-sans font-semibold ' +
  'leading-none transition-all duration-200 ease-out-soft select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green ' +
  'disabled:pointer-events-none disabled:opacity-50 min-h-[44px]';

const sizes: Record<Size, string> = {
  md: 'text-[16px] px-7 py-[14px]',
  lg: 'text-[17px] px-8 py-[16px]',
};

const variants: Record<Variant, string> = {
  // Primary: green fill, lifts 1px and darkens on hover.
  primary:
    'bg-brand-green text-white hover:bg-brand-green-dark hover:-translate-y-px active:translate-y-0',
  // Secondary on white: ink outline that fills ink on hover.
  secondary:
    'border-[1.5px] border-ink text-ink bg-transparent hover:bg-ink hover:text-white',
  // Secondary on dark: white outline that fills white on hover.
  'secondary-dark':
    'border-[1.5px] border-white text-white bg-transparent hover:bg-white hover:text-ink',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>)
  | (CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>);

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } = props;
    void _v; void _s; void _c; void _ch;

    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  void _v; void _s; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
