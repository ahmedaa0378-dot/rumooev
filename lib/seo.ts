// Shared SEO metadata helper. Next.js does NOT deep-merge `openGraph`/`twitter`
// between the root layout and a page — a page that defines either REPLACES the
// root's. So every page builds a complete, self-contained OG + Twitter + canonical
// block through this helper (reusing that page's own copy verbatim).
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

// og:image — landscape social-share variant (public/images/og-image.jpg),
// declared at the social standard of 1200×630. Absolute URL: crawlers require
// it, and Next resolves relative ones against localhost in dev.
//
// FOLLOW-UP: og-image.jpg is currently a copy of the portrait hero photo
// (808×960) as a placeholder. Replace it with a proper 1200×630 landscape crop
// from the original brochure photography — no code change needed, just swap the
// file. The 1200×630 declared below matches the target, not the placeholder.
export const OG_IMAGE = {
  url: `${SITE.url}/images/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Rumoo delivery rider on an electric scooter with a RumooEV delivery box',
};

type PageMetaOpts = {
  /** Meta <title> — the root template appends " · RumooEV". */
  title: string;
  /** Meta description (keep under 160 chars). */
  description: string;
  /** Route path, e.g. '/pricing' or '/'. Used for canonical + og:url. */
  path: string;
  /** Optional OG/Twitter title override (defaults to `title`). */
  ogTitle?: string;
  /** Optional OG/Twitter description override (defaults to `description`). */
  ogDescription?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: PageMetaOpts): Metadata {
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'RumooEV',
      locale: 'en_IN',
      url: path,
      title: socialTitle,
      description: socialDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: socialDescription,
      images: [OG_IMAGE.url],
    },
  };
}
