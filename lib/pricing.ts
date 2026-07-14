// B2B pricing tiers (CONTENT.md PRC-2) + the savings-calculator model (SITEMAP
// PRC-3). All rupee assumptions are placeholders marked TO_VALIDATE with Rumoo.

export type PricingTier = {
  label: string;
  min: number;
  max: number;
  weekly: number;
  monthly: number;
  custom?: boolean;
};

// Per scooter, 24-month Lease-to-Own. Exact figures from CONTENT.md PRC-2.
export const PRICING_TIERS: PricingTier[] = [
  { label: '100–249', min: 100, max: 249, weekly: 1270, monthly: 5500 },
  { label: '250–499', min: 250, max: 499, weekly: 1240, monthly: 5350 },
  { label: '500–999', min: 500, max: 999, weekly: 1210, monthly: 5200 },
  { label: '1,000–2,499', min: 1000, max: 2499, weekly: 1180, monthly: 5000 },
  { label: '2,500–4,999', min: 2500, max: 4999, weekly: 1120, monthly: 4800 },
  { label: '5,000+', min: 5000, max: Infinity, weekly: 1050, monthly: 4500, custom: true },
];

// Discrete slider stops (SITEMAP PRC-3). 50 is below the published tiers
// (50–99 = custom quote); we use the first tier's rate as an indicative figure.
export const SLIDER_STEPS = [50, 100, 250, 500, 1000, 2500, 5000];
export const DEFAULT_STEP_INDEX = 1; // 100

export function tierForFleet(n: number): PricingTier {
  if (n < 100) return PRICING_TIERS[0];
  return (
    PRICING_TIERS.find((t) => n >= t.min && n <= t.max) ??
    PRICING_TIERS[PRICING_TIERS.length - 1]
  );
}

// Single source of truth for the calculator. TO_VALIDATE with Rumoo.
export const ASSUMPTIONS = {
  buyPricePerScooter: 60000, // TO_VALIDATE
  maintenancePerScooter24mo: 9600, // TO_VALIDATE
  insurancePerScooter24mo: 3600, // TO_VALIDATE
  batteryReplacementPerScooter: 6000, // TO_VALIDATE
  downtimeCostBuyPerScooter: 4800, // TO_VALIDATE
  downtimeCostLeasePerScooter: 1200, // TO_VALIDATE
  otherCostsBuyPerScooter: 3000, // TO_VALIDATE — tax, registration, AMC
};

const TENURE_MONTHS = 24;

export type Inclusion = { label: string; buyCost: number };

export type SavingsResult = {
  fleet: number;
  tier: PricingTier;
  monthlyTotal: number;
  buyUpfront: number;
  inclusions: Inclusion[];
  buyExtrasPerScooter: number;
  buyExtrasTotal: number;
  leaseTco: number;
  buyTco: number;
  /** Only when genuinely true do we surface a savings figure (SITEMAP PRC-3). */
  leaseCheaper: boolean;
  savings: number;
};

export function computeSavings(fleet: number): SavingsResult {
  const tier = tierForFleet(fleet);
  const monthlyTotal = fleet * tier.monthly;
  const buyUpfront = fleet * ASSUMPTIONS.buyPricePerScooter;

  // Lease inclusions and what each would cost you if you bought instead.
  const inclusions: Inclusion[] = [
    { label: 'Maintenance', buyCost: ASSUMPTIONS.maintenancePerScooter24mo },
    { label: 'Insurance', buyCost: ASSUMPTIONS.insurancePerScooter24mo },
    { label: 'Battery', buyCost: ASSUMPTIONS.batteryReplacementPerScooter },
    { label: 'Breakdown support', buyCost: ASSUMPTIONS.downtimeCostBuyPerScooter },
    { label: 'Replacement vehicle', buyCost: ASSUMPTIONS.otherCostsBuyPerScooter },
  ];
  const buyExtrasPerScooter = inclusions.reduce((s, i) => s + i.buyCost, 0);
  const buyExtrasTotal = fleet * buyExtrasPerScooter;

  const leaseTco =
    fleet * (tier.monthly * TENURE_MONTHS + ASSUMPTIONS.downtimeCostLeasePerScooter);
  const buyTco = fleet * (ASSUMPTIONS.buyPricePerScooter + buyExtrasPerScooter);
  const leaseCheaper = leaseTco < buyTco;

  return {
    fleet,
    tier,
    monthlyTotal,
    buyUpfront,
    inclusions,
    buyExtrasPerScooter,
    buyExtrasTotal,
    leaseTco,
    buyTco,
    leaseCheaper,
    savings: Math.max(0, buyTco - leaseTco),
  };
}

/* ---------------------------------------------------------------------------
   Rider (B2C) comparison: owning a petrol bike vs. renting a Rumoo Ultra.
   Every petrol-side figure is an ILLUSTRATIVE ESTIMATE (TO_VALIDATE) — not an
   official Rumoo number. The Rumoo side stays anchored on "from ₹260/day"
   (CLAUDE.md rule 5); we never publish a B2C rate card.
--------------------------------------------------------------------------- */
export const RIDER_ASSUMPTIONS = {
  petrolBikePrice: 90000, // TO_VALIDATE
  downPayment: 15000, // TO_VALIDATE
  emiPerMonth: 2800, // TO_VALIDATE — ~36-month loan
  fuelPricePerLitre: 105, // TO_VALIDATE
  petrolMileageKmpl: 45, // TO_VALIDATE
  maintenancePerMonth: 700, // TO_VALIDATE
  insurancePerMonth: 600, // TO_VALIDATE — ~₹7,200/yr
  ridingDaysPerMonth: 26, // TO_VALIDATE
  rumooPerDay: 260, // CONTENT.md — "from ₹260/day"
};

export const RIDER_KM_MIN = 30;
export const RIDER_KM_MAX = 120;
export const RIDER_KM_DEFAULT = 60;

export type RiderLine = { label: string; value: number };

export type RiderResult = {
  kmPerDay: number;
  days: number;
  petrolLines: RiderLine[];
  petrolMonthly: number;
  rumooMonthly: number;
  petrolUpfront: number;
  monthlyDiff: number;
  rumooCheaper: boolean;
};

export function computeRider(kmPerDay: number): RiderResult {
  const a = RIDER_ASSUMPTIONS;
  const days = a.ridingDaysPerMonth;
  const monthlyKm = kmPerDay * days;
  const fuelMonthly = (monthlyKm / a.petrolMileageKmpl) * a.fuelPricePerLitre;

  const petrolLines: RiderLine[] = [
    { label: 'Bike EMI', value: a.emiPerMonth },
    { label: 'Petrol', value: fuelMonthly },
    { label: 'Maintenance', value: a.maintenancePerMonth },
    { label: 'Insurance', value: a.insurancePerMonth },
  ];
  const petrolMonthly = petrolLines.reduce((s, l) => s + l.value, 0);
  const rumooMonthly = a.rumooPerDay * days;
  const monthlyDiff = petrolMonthly - rumooMonthly;

  return {
    kmPerDay,
    days,
    petrolLines,
    petrolMonthly,
    rumooMonthly,
    petrolUpfront: a.downPayment,
    monthlyDiff,
    rumooCheaper: monthlyDiff > 0,
  };
}
