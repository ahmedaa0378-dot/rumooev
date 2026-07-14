import Link from 'next/link';
import { Logo } from './Logo';
import { FOOTER_COLUMNS, LEGAL_LINE, SITE } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-body-m text-white/60">{SITE.brandLine}</p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="text-caption font-semibold uppercase tracking-[0.08em] text-white/50">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-m text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="lg:col-span-2">
            <h3 className="text-caption font-semibold uppercase tracking-[0.08em] text-white/50">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-body-m text-white/75">
              <li>
                <a href={`tel:${SITE.phoneRaw}`} className="transition-colors hover:text-white">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="text-white/60">{SITE.offices}</li>
              <li className="text-white/60">{SITE.presence}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sign-off + legal */}
      <div className="border-t border-charcoal">
        <div className="container-x flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-body-m font-semibold text-brand-green">{SITE.signOff}</p>
          <p className="text-caption text-white/45">{LEGAL_LINE}</p>
        </div>
      </div>
    </footer>
  );
}
