'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, staggerContainer, staggerChild } from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** 'item' fades a single block; 'group' staggers direct <Reveal.Item> children. */
  as?: 'div' | 'section' | 'li' | 'ul';
  delay?: number;
};

/**
 * Scroll-triggered fade-up reveal (DESIGN.md §8.2). Fires once when in view.
 * Under prefers-reduced-motion it renders final values with no transform.
 */
export function Reveal({ children, className, as = 'div', delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : fadeUp;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A container whose direct <RevealItem> children stagger in (DESIGN.md §8.3).
 */
export function RevealGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={reduce ? undefined : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : staggerChild;

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
