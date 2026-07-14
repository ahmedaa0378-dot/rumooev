'use client';

import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FieldType = 'text' | 'tel' | 'email' | 'date' | 'select' | 'textarea';

export type LeadField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  /** Read-only fixed value (e.g. a locked model). */
  fixedValue?: string;
  /** Span both columns of the 2-col grid. */
  full?: boolean;
  /** Conditionally show based on current values. */
  showWhen?: (values: Record<string, string>) => boolean;
};

type LeadFormProps = {
  fields: LeadField[];
  formType: string;
  submitLabel: string;
  successTitle?: string;
  successMessage: string;
  /** Extra payload merged into the POST body (e.g. source page). */
  extra?: Record<string, string>;
  /** Pre-filled field values (e.g. the chatbot pre-selecting an interest). */
  initialValues?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,}$/;

const inputBase =
  'w-full rounded-btn border bg-paper px-4 text-body-m text-ink placeholder:text-slate-text/50 ' +
  'transition-colors focus:border-brand-green focus:outline-none focus:ring-4 focus:ring-brand-green/15';

export function LeadForm({
  fields,
  formType,
  submitLabel,
  successTitle = 'Thank you.',
  successMessage,
  extra,
  initialValues,
}: LeadFormProps) {
  const reduce = useReducedMotion();
  const initial: Record<string, string> = {};
  fields.forEach((f) => (initial[f.name] = f.fixedValue ?? initialValues?.[f.name] ?? ''));

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [website, setWebsite] = useState(''); // honeypot

  const visible = fields.filter((f) => !f.showWhen || f.showWhen(values));

  function set(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const f of visible) {
      const val = (values[f.name] ?? '').trim();
      if (f.required && !val) next[f.name] = 'This field is required.';
      else if (val && f.type === 'email' && !EMAIL_RE.test(val)) next[f.name] = 'Enter a valid email.';
      else if (val && f.type === 'tel' && !PHONE_RE.test(val)) next[f.name] = 'Enter a valid phone number.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const payload: Record<string, string> = { type: formType, ...extra, website };
      visible.forEach((f) => (payload[f.name] = values[f.name] ?? ''));
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        role="status"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-card border border-brand-green/30 bg-brand-green-light/50 px-8 py-12 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green">
          <Check className="h-7 w-7 text-white" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-h3-card font-semibold text-ink">{successTitle}</h3>
        <p className="mt-2 max-w-sm text-body-m text-slate-text">{successMessage}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot — hidden from users */}
      <div aria-hidden className="hidden">
        <label htmlFor={`${formType}-website`}>Website</label>
        <input
          id={`${formType}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {visible.map((f) => {
        const err = errors[f.name];
        const fieldId = `${formType}-${f.name}`;
        return (
          <div key={f.name} className={cn('flex flex-col gap-1.5', (f.full || f.type === 'textarea') && 'sm:col-span-2')}>
            <label htmlFor={fieldId} className="text-caption font-medium text-ink">
              {f.label}
              {!f.required && <span className="ml-1 text-slate-text/60">(optional)</span>}
            </label>

            {f.type === 'select' ? (
              <select
                id={fieldId}
                name={f.name}
                value={values[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                aria-invalid={!!err}
                className={cn(inputBase, 'h-[52px]', err ? 'border-error' : 'border-line')}
              >
                <option value="" disabled>
                  Select…
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                id={fieldId}
                name={f.name}
                rows={4}
                value={values[f.name]}
                placeholder={f.placeholder}
                onChange={(e) => set(f.name, e.target.value)}
                aria-invalid={!!err}
                className={cn(inputBase, 'resize-y py-3', err ? 'border-error' : 'border-line')}
              />
            ) : (
              <input
                id={fieldId}
                name={f.name}
                type={f.type}
                value={values[f.name]}
                placeholder={f.placeholder}
                readOnly={f.fixedValue !== undefined}
                onChange={(e) => set(f.name, e.target.value)}
                aria-invalid={!!err}
                className={cn(
                  inputBase,
                  'h-[52px]',
                  err ? 'border-error' : 'border-line',
                  f.fixedValue !== undefined && 'bg-mist text-slate-text',
                )}
              />
            )}

            {err && <p className="text-caption text-error">{err}</p>}
          </div>
        );
      })}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-btn bg-brand-green px-8 text-[16px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-brand-green-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green disabled:pointer-events-none disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : submitLabel}
        </button>
        {status === 'error' && (
          <p className="mt-3 text-caption text-error">
            Something went wrong. Please try again or WhatsApp us at +91 90990 95698.
          </p>
        )}
      </div>
    </form>
  );
}
