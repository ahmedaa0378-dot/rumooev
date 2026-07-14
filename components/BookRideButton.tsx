'use client';

import type { ReactNode } from 'react';
import { Button } from './Button';
import { useRequestModal } from './RequestModalProvider';

/**
 * "Book a Ride" CTA — opens the global request modal instead of navigating.
 * Mirrors Button's variants/sizes so it drops in wherever the CTA appears.
 */
export function BookRideButton({
  children = 'Book a Ride',
  variant = 'primary',
  size,
  className,
}: {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'secondary-dark';
  size?: 'md' | 'lg';
  className?: string;
}) {
  const { open } = useRequestModal();
  return (
    <Button variant={variant} size={size} className={className} onClick={() => open()}>
      {children}
    </Button>
  );
}
