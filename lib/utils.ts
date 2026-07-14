// Minimal className joiner — avoids pulling in clsx per the "no extra libs" spirit.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
