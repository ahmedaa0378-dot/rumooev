import Link from 'next/link';
import { ArrowRight, Gauge, Route, BatteryCharging } from 'lucide-react';
import { Figure } from './Figure';
import type { ImageAsset } from '@/lib/images';

type ModelCardProps = {
  name: string;
  builtFor: string;
  asset: ImageAsset;
  href: string;
  ctaLabel: string;
};

// Shared spec line — HOME-7. All models publish the same sheet (CLAUDE.md rule 4).
const SHARED_SPECS = [
  { icon: Gauge, label: '40 km/h top speed' },
  { icon: Route, label: '80–100 km range' },
  { icon: BatteryCharging, label: 'Swappable battery' },
];

export function ModelCard({ name, builtFor, asset, href, ctaLabel }: ModelCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-paper transition-all duration-200 ease-out-soft hover:border-brand-green/40 hover:shadow-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
    >
      <Figure asset={asset} ratio="aspect-[4/3]" frame="bare" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-pill bg-brand-green-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-brand-green">
          {builtFor}
        </span>
        <h3 className="mt-4 font-display text-h3-card font-semibold text-ink">{name}</h3>
        <ul className="mt-4 flex flex-col gap-2">
          {SHARED_SPECS.map((spec) => (
            <li key={spec.label} className="flex items-center gap-2 text-caption text-slate-text">
              <spec.icon className="h-4 w-4 text-brand-green" strokeWidth={1.75} aria-hidden="true" />
              {spec.label}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-1.5 text-body-m font-semibold text-brand-green">
          {ctaLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
