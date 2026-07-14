// Indian-format currency helpers. CLAUDE.md rule 8: ₹ symbol, Indian grouping
// (₹1,32,000), never "Rs." / "INR".

export function inr(n: number): string {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function trim(x: number): string {
  return x.toFixed(2).replace(/\.?0+$/, '');
}

/** Compact Indian format: ₹60 lakh, ₹6 crore, else full grouping. */
export function inrCompact(n: number): string {
  if (n >= 1e7) return `₹${trim(n / 1e7)} crore`;
  if (n >= 1e5) return `₹${trim(n / 1e5)} lakh`;
  return inr(n);
}
