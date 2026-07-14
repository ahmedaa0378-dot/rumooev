import { BatteryCharging } from 'lucide-react';

// SCT-3 — shared spec sheet. All three models publish the same specs
// (CLAUDE.md rule 4). No motor wattage anywhere (rule 2).
const SPECS: { label: string; value: string }[] = [
  { label: 'Top Speed', value: '40 km/h' },
  { label: 'Range', value: '80–100 km per charge' },
  { label: 'Battery', value: '1.8 kWh swappable lithium-ion' },
  { label: 'Charging Time', value: '3–4 hours (0 to 100%)' },
  { label: 'Loading Capacity', value: '180 kg' },
  { label: 'Vehicle Weight', value: '70 kg' },
  { label: 'Tyres', value: 'Tubeless' },
  { label: 'Key Features', value: 'Anti-theft alarm · Keyless entry · USB charging · Digital display' },
];

export function SpecTable() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Spec table */}
      <div className="lg:col-span-2">
        <dl className="overflow-hidden rounded-card border border-line">
          {SPECS.map((s, i) => (
            <div
              key={s.label}
              className={`grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4 ${
                i > 0 ? 'border-t border-line' : ''
              } ${i % 2 === 1 ? 'bg-mist/40' : 'bg-paper'}`}
            >
              <dt className="text-body-m font-semibold text-ink">{s.label}</dt>
              <dd className="text-body-m text-slate-text sm:col-span-2">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Swappable-battery callout */}
      <aside className="flex flex-col rounded-card border-2 border-brand-green/30 bg-brand-green-light/50 p-6 lg:p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-white">
          <BatteryCharging className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-h3-card font-semibold text-ink">No charging downtime.</h3>
        <p className="mt-2.5 text-body-m text-slate-text">
          Every Rumoo runs on a swappable battery — swap in minutes and keep the fleet moving. Battery
          swapping subscriptions available as an add-on.
        </p>
      </aside>
    </div>
  );
}
