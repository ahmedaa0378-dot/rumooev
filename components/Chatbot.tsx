'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Send, Building2, Bike, Phone, RotateCcw, ArrowRight } from 'lucide-react';
import { useRequestModal } from './RequestModalProvider';
import { BUSINESS_FAQ, RIDER_FAQ } from '@/lib/faq';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

const BOT_NAME = 'Rumoo Assistant';
const DISMISS_KEY = 'rumoo-chat-dismissed';

type Msg = { from: 'bot' | 'user'; text: string };
type View = 'root' | 'business' | 'rider';

const GREETING: Msg = {
  from: 'bot',
  text: "👋 Hi! I'm the Rumoo Assistant. Are you here to lease a fleet for your business, or to rent a scooter as a rider?",
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('fill-current', className)} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  );
}

function Avatar({ size }: { size: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink"
      style={{ width: size, height: size }}
    >
      <Image src="/images/rumoo-icon.jpg" alt="" width={64} height={64} className="h-full w-full object-cover" />
    </span>
  );
}

export function Chatbot() {
  const reduce = useReducedMotion();
  const { open: openRequest } = useRequestModal();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('root');
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [engaged, setEngaged] = useState(false); // asked something → reveal the final CTA
  const [input, setInput] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);
  const lastUserRef = useRef<HTMLDivElement>(null);

  const lastUserIdx = messages.reduce((acc, m, i) => (m.from === 'user' ? i : acc), -1);

  // Auto-open once per session, ~1.5s after load.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // On a new turn, bring the latest question to the top so its answer is right
  // there; if there's no question yet (greeting), just show the bottom.
  useEffect(() => {
    const c = threadRef.current;
    if (!c) return;
    const el = lastUserRef.current;
    if (el) {
      const delta = el.getBoundingClientRect().top - c.getBoundingClientRect().top;
      c.scrollBy({ top: delta - 8, behavior: reduce ? 'auto' : 'smooth' });
    } else {
      c.scrollTop = c.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, open]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeChat();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function closeChat() {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  }

  function pickBranch(branch: 'business' | 'rider') {
    setMessages((m) => [
      ...m,
      { from: 'user', text: branch === 'business' ? 'Business fleet' : 'Rider' },
      {
        from: 'bot',
        text:
          branch === 'business'
            ? 'Great — tap any question below and I’ll answer it right here.'
            : 'Nice! Tap any question below and I’ll answer it right here.',
      },
    ]);
    setView(branch);
    setEngaged(false);
  }

  function askFaq(q: string, a: string) {
    setMessages((m) => [...m, { from: 'user', text: q }, { from: 'bot', text: a }]);
    setEngaged(true);
  }

  function startOver() {
    setView('root');
    setMessages([GREETING]);
    setEngaged(false);
  }

  function sendText(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((m) => [
      ...m,
      { from: 'user', text },
      {
        from: 'bot',
        text: 'Thanks! For anything specific, the quickest route is our form — our team replies within a business day. Tap a question below, or the button.',
      },
    ]);
    if (view !== 'root') setEngaged(true);
  }

  function toForm() {
    openRequest({
      interest:
        view === 'rider'
          ? 'Rent a scooter as a rider'
          : view === 'business'
            ? 'Lease a fleet for my business'
            : 'Something else',
    });
  }

  const faqs = view === 'business' ? BUSINESS_FAQ : view === 'rider' ? RIDER_FAQ : [];

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open chat with ${BOT_NAME}`}
            className="group fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full ring-2 ring-brand-green/70 ring-offset-2 ring-offset-paper transition-transform hover:scale-105"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Avatar size={64} />
            <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-paper bg-brand-green" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`${BOT_NAME} chat`}
            className="fixed bottom-4 right-4 z-40 flex h-[76vh] max-h-[600px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-[20px] border border-line bg-paper shadow-hover"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 bg-ink px-4 py-3">
              <Avatar size={38} />
              <div className="min-w-0 flex-1">
                <p className="font-display text-body font-semibold leading-tight text-white">{BOT_NAME}</p>
                <p className="flex items-center gap-1.5 text-caption text-white/60">
                  <span className="h-2 w-2 rounded-full bg-brand-green" />
                  Online
                </p>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* One scrolling conversation — bubbles + questions + actions all here */}
            <div
              ref={threadRef}
              className="relative flex flex-1 flex-col gap-3 overflow-y-auto bg-mist/40 p-4"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  ref={i === lastUserIdx ? lastUserRef : undefined}
                  className={cn('flex', m.from === 'bot' ? 'justify-start' : 'justify-end')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-body-m',
                      m.from === 'bot'
                        ? 'rounded-tl-sm bg-paper text-ink shadow-subtle'
                        : 'rounded-br-sm bg-brand-green text-white',
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Quick replies live at the end of the same thread */}
              {view === 'root' ? (
                <div className="mt-1 flex flex-col gap-2">
                  <QuickBtn onClick={() => pickBranch('business')} icon={<Building2 className="h-5 w-5" strokeWidth={1.75} />}>
                    Business fleet
                  </QuickBtn>
                  <QuickBtn onClick={() => pickBranch('rider')} icon={<Bike className="h-5 w-5" strokeWidth={1.75} />}>
                    Rider
                  </QuickBtn>
                </div>
              ) : (
                <div className="mt-1 flex flex-col gap-2">
                  {faqs.map((f) => (
                    <button
                      key={f.q}
                      type="button"
                      onClick={() => askFaq(f.q, f.a)}
                      className="rounded-btn border border-line bg-paper px-3.5 py-2 text-left text-caption font-medium text-ink transition-colors hover:border-brand-green/50 hover:bg-brand-green-light/40"
                    >
                      {f.q}
                    </button>
                  ))}

                  <div className="mt-1 flex items-center gap-2">
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-btn border border-line bg-paper px-3 py-2 text-caption font-medium text-ink transition-colors hover:border-brand-green/50"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> WhatsApp
                    </a>
                    <a
                      href={`tel:${SITE.phoneRaw}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-btn border border-line bg-paper px-3 py-2 text-caption font-medium text-ink transition-colors hover:border-brand-green/50"
                    >
                      <Phone className="h-4 w-4 text-brand-green" strokeWidth={1.75} /> Call
                    </a>
                    <button
                      type="button"
                      onClick={startOver}
                      aria-label="Start over"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-btn border border-line text-slate-text transition-colors hover:border-brand-green/50 hover:text-ink"
                    >
                      <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>

                  {/* Final step — appears only after you've asked something */}
                  {engaged && (
                    <button
                      type="button"
                      onClick={toForm}
                      className="mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-btn bg-brand-green px-4 py-2.5 text-body-m font-semibold text-white shadow-[0_0_20px_rgba(22,163,74,0.35)] transition-colors hover:bg-brand-green-dark"
                    >
                      {view === 'rider' ? 'Book your Ultra' : 'Get a proposal'}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Input (fixed) */}
            <form onSubmit={sendText} className="flex shrink-0 items-center gap-2 border-t border-line bg-paper p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                aria-label="Type your question"
                className="h-10 flex-1 rounded-btn border border-line bg-paper px-3.5 text-body-m text-ink placeholder:text-slate-text/50 focus:border-brand-green focus:outline-none focus:ring-4 focus:ring-brand-green/15"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-brand-green text-white transition-colors hover:bg-brand-green-dark disabled:opacity-50"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function QuickBtn({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-3 rounded-btn border border-line bg-paper px-4 py-3 text-left text-body-m font-semibold text-ink transition-all hover:border-brand-green hover:bg-brand-green-light/40"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-light text-brand-green">
        {icon}
      </span>
      {children}
    </button>
  );
}
