// Registry of brand image assets. Files live in /public/images. Flip `available`
// to false to fall back to a labeled placeholder via <Figure>.

export type ImageAsset = {
  src: string;
  alt: string;
  /** Set true once the file physically exists in /public/images. */
  available: boolean;
};

export const IMAGES = {
  heroScooter: {
    // Cropped from Rumoo_HERO.png — rider + branded delivery box, text panel removed.
    src: '/images/hero-scooter.jpg',
    alt: 'Rumoo delivery rider on an electric scooter with a RumooEV delivery box',
    available: true,
  },
  lite: {
    src: '/images/rumoo-lite.jpeg',
    alt: 'Rumoo Lite electric scooter',
    available: true,
  },
  hs: {
    src: '/images/rumoo-hs.jpeg',
    alt: 'Rumoo HS electric scooter',
    available: true,
  },
  ultra: {
    src: '/images/rumoo-ultra.jpeg',
    alt: 'Rumoo Ultra electric scooter',
    available: true,
  },
} satisfies Record<string, ImageAsset>;
