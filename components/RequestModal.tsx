'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { LeadForm, type LeadField } from './LeadForm';
import { Logo } from './Logo';
import BackgroundScene from './ui/aurora-section-hero';

const FIELDS: LeadField[] = [
  {
    name: 'interest',
    label: 'I want to',
    type: 'select',
    options: [
      'Lease a fleet for my business',
      'Rent a scooter as a rider',
      'Explore a partnership',
      'Something else',
    ],
    required: true,
    full: true,
  },
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'city', label: 'City', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: false, full: true },
  {
    name: 'fleetSize',
    label: 'Approx. fleet size',
    type: 'text',
    showWhen: (v) => v.interest === 'Lease a fleet for my business',
  },
  { name: 'message', label: 'Anything else?', type: 'textarea', required: false, full: true },
];

const TRUST = ['24-month Lease-to-Own', 'Deployed pan-India in 15–20 days', '95% uptime, fully managed'];

export function RequestModal({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Record<string, string>;
}) {
  return (
    <AnimatePresence>
      {isOpen && <ModalContent onClose={onClose} initialValues={initialValues} />}
    </AnimatePresence>
  );
}

function ModalContent({
  onClose,
  initialValues,
}: {
  onClose: () => void;
  initialValues?: Record<string, string>;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  // Scroll lock, focus trap, Escape, focus restore.
  useEffect(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    // focus the first field, not the close button
    const items = focusables();
    (items.find((el) => el.tagName === 'SELECT' || el.tagName === 'INPUT') ?? items[0])?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      restoreFocus.current?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book a ride — request form"
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[20px] bg-paper shadow-hover"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left neon panel (desktop) */}
        <div className="relative hidden shrink-0 overflow-hidden bg-ink p-8 md:flex md:w-[45%] md:flex-col md:justify-between">
          <BackgroundScene beamCount={22} />
          <div className="relative z-10">
            <Logo />
            <h2 className="mt-8 font-display text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-white [text-shadow:0_0_28px_rgba(22,163,74,0.45)]">
              Let&apos;s get you moving.
            </h2>
            <p className="mt-3 max-w-xs text-body-m text-white/70">
              Tell us a bit about you — we&apos;ll come back within one business day.
            </p>
          </div>
          <ul className="relative z-10 mt-8 flex flex-col gap-3">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-body-m text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/20">
                  <Check className="h-4 w-4 text-brand-green" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right form panel — min-h-0 lets it scroll inside the capped modal */}
        <div className="relative min-h-0 w-full overflow-y-auto p-6 md:w-[55%] md:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-slate-text transition-colors hover:bg-mist hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <span className="eyebrow">Book a ride</span>
          <h3 className="mt-2 font-display text-h2-section-m font-bold tracking-[-0.02em] text-ink">
            Submit a request
          </h3>
          <p className="mt-2 text-body-m text-slate-text">
            Fleet lease or a solo rental — one quick form.
          </p>

          <div className="mt-6">
            <LeadForm
              fields={FIELDS}
              formType="request"
              submitLabel="Send request"
              successTitle="Request received."
              successMessage="Our team will reach out within one business day."
              initialValues={initialValues}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
