import type { Variants, Transition } from 'framer-motion';

// Shared motion tokens — the complete motion inventory lives in DESIGN.md §8.
// Everything is opacity-forward with small translate; reduced-motion is handled
// by the <Reveal> component and the global CSS guard.

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const fadeUpTransition: Transition = {
  duration: 0.5,
  ease: EASE_OUT,
};

// Scroll reveal: fade up 16px, once (DESIGN.md §8.2).
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: fadeUpTransition },
};

// Stagger container for card grids — children rise 80ms apart (DESIGN.md §8.3).
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: fadeUpTransition },
};
