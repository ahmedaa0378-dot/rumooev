'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { BookRideButton } from './BookRideButton';
import { NAV_LINKS, SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const isHome = pathname === '/';
  // Transparent white-out over the dark homepage hero until the user scrolls 40px.
  const overHero = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the sheet whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + '/'),
    [pathname],
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[72px] transition-colors duration-300 ease-out-soft',
        overHero ? 'bg-transparent' : 'border-b border-line bg-paper',
      )}
    >
      <nav
        aria-label="Primary"
        className="container-x flex h-full items-center justify-between"
      >
        <Logo onLight={!overHero} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative inline-flex items-center py-2 text-[15px] font-medium transition-colors',
                    overHero ? 'text-white/85 hover:text-white' : 'text-ink hover:text-brand-green',
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-green" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <BookRideButton variant={overHero ? 'secondary-dark' : 'primary'}>
            Book a Ride
          </BookRideButton>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-btn lg:hidden',
            overHero ? 'text-white' : 'text-ink',
          )}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <MobileSheet reduce={!!reduce} onClose={() => setOpen(false)} isActive={isActive} />
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileSheet({
  onClose,
  isActive,
  reduce,
}: {
  onClose: () => void;
  isActive: (href: string) => boolean;
  reduce: boolean;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Lock body scroll, trap focus, close on Escape, restore focus on unmount.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        sheetRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
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
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      ref={sheetRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container-x flex h-[72px] items-center justify-between border-b border-line">
        <Logo onLight />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-ink"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-between py-8">
        <ul className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.04 * i + 0.05, duration: 0.3 }}
            >
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'block py-3 font-display text-[28px] font-semibold tracking-[-0.01em]',
                  isActive(link.href) ? 'text-brand-green' : 'text-ink',
                )}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-col gap-4">
          <BookRideButton size="lg" className="w-full">
            Book a Ride
          </BookRideButton>
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="text-center text-body-m font-medium text-slate-text"
          >
            {SITE.phoneDisplay}
          </a>
        </div>
      </nav>
    </motion.div>
  );
}
