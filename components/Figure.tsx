import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import type { ImageAsset } from '@/lib/images';
import { cn } from '@/lib/utils';

type FigureProps = {
  asset: ImageAsset;
  /** aspect-ratio utility, e.g. 'aspect-[4/3]'. */
  ratio?: string;
  className?: string;
  /** 'framed' = rounded 20px block; 'bare' = no radius (cut-out style). */
  frame?: 'framed' | 'bare';
  priority?: boolean;
  sizes?: string;
  tone?: 'light' | 'dark';
};

/**
 * Renders `next/image` when the asset exists; otherwise a labeled neutral
 * placeholder (DESIGN.md §7 — never a stock photo). The placeholder shows the
 * intended filename so it's obvious which asset to drop into /public/images.
 */
export function Figure({
  asset,
  ratio = 'aspect-[4/3]',
  className,
  frame = 'framed',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  tone = 'light',
}: FigureProps) {
  const rounded = frame === 'framed' ? 'rounded-img' : '';

  if (asset.available) {
    return (
      <div className={cn('relative overflow-hidden', ratio, rounded, className)}>
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const filename = asset.src.split('/').pop();
  const onDark = tone === 'dark';

  return (
    <div
      role="img"
      aria-label={asset.alt}
      className={cn(
        'relative flex items-center justify-center overflow-hidden border',
        ratio,
        rounded,
        onDark ? 'border-white/10 bg-white/[0.04]' : 'border-line bg-mist',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon
          className={cn('h-8 w-8', onDark ? 'text-white/40' : 'text-slate-text/50')}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span
          className={cn(
            'font-mono text-caption',
            onDark ? 'text-white/50' : 'text-slate-text/70',
          )}
        >
          {filename}
        </span>
      </div>
    </div>
  );
}
