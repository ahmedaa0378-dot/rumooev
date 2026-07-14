import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Site logo — the RumooEV brand lockup (background-removed transparent PNG).
 * The art is chrome/silver + green, which reads on dark backgrounds but washes
 * out on white. So on light surfaces we sit it on a small dark "chip" (invisible
 * on dark bands, gives it contrast on white). Pass `onLight` on white surfaces.
 */
export function Logo({
  onLight = false,
  className,
}: {
  onLight?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="RumooEV — home"
      className={cn(
        'inline-flex items-center rounded-lg',
        onLight && 'bg-ink px-2.5 py-1',
        className,
      )}
    >
      <Image
        src="/images/rumoo-logo.png"
        alt="RumooEV — Electric Mobility. Endless Possibilities."
        width={384}
        height={253}
        priority
        sizes="160px"
        className="h-16 w-auto md:h-20"
      />
    </Link>
  );
}
