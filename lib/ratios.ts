import type { Measurements, RatioId, Target } from "./types";

export type RatioDef = {
  id: RatioId;
  label: string;
  tier: 1 | 2;
  weight: number;
  target: Target;
  source: string;
  compute: (m: Measurements) => number | null;
  tip: (actual: number) => string;
};

export const RATIOS: RatioDef[] = [
  {
    id: "shoulder_hip",
    label: "Shoulder-to-Hip",
    tier: 1,
    weight: 2,
    target: { kind: "floor", value: 1.4 },
    source: "Pazhoohi 2019, 2023",
    compute: (m) => (m.hipCm > 0 ? m.shoulderCm / m.hipCm : null),
    tip: (a) =>
      a < 1.4
        ? "Build lateral deltoids and upper back; reduce waist and hip size."
        : "At or above the attractiveness plateau. Maintain.",
  },
  {
    id: "waist_chest",
    label: "Waist-to-Chest",
    tier: 1,
    weight: 2,
    target: { kind: "ceiling", value: 0.7 },
    source: "Coy 2014",
    compute: (m) => (m.chestCm > 0 ? m.waistCm / m.chestCm : null),
    tip: (a) =>
      a > 0.7
        ? "Lower body-fat; develop chest and upper back for V-taper."
        : "On target.",
  },
  {
    id: "waist_hip",
    label: "Waist-to-Hip",
    tier: 1,
    weight: 2,
    target: { kind: "range", low: 0.85, high: 0.9 },
    source: "Furnham 2001",
    compute: (m) => (m.hipCm > 0 ? m.waistCm / m.hipCm : null),
    tip: (a) =>
      a > 0.9
        ? "Reduce waist circumference (diet + cardio)."
        : a < 0.85
          ? "Unusual for males — double-check your measurements."
          : "In the ideal band.",
  },
  {
    id: "body_fat",
    label: "Body Fat %",
    tier: 1,
    weight: 2,
    target: { kind: "range", low: 10, high: 15 },
    source: "Brierley 2016",
    compute: (m) => (m.bodyFatPct ?? null),
    tip: (a) =>
      a > 15
        ? "Caloric deficit plus strength training."
        : a < 8
          ? "Medically risky below 8% for extended periods."
          : "Ideal range.",
  },
  {
    id: "bicep_wrist",
    label: "Bicep-to-Wrist",
    tier: 2,
    weight: 1,
    target: { kind: "point", value: 2.52 },
    source: "McCallum (tradition)",
    compute: (m) => (m.wristCm > 0 ? m.bicepFlexedCm / m.wristCm : null),
    tip: (a) =>
      a < 2.52
        ? "Add bicep and brachialis volume (chin-ups, curls)."
        : "At or above the McCallum target.",
  },
  {
    id: "bicep_calf",
    label: "Bicep ≈ Calf",
    tier: 2,
    weight: 1,
    target: { kind: "point", value: 1.0 },
    source: "Steve Reeves (tradition)",
    compute: (m) => (m.calfCm > 0 ? m.bicepFlexedCm / m.calfCm : null),
    tip: (a) =>
      a < 1
        ? "Arms lagging calves — prioritize upper-arm work."
        : a > 1
          ? "Calves lagging arms — single-leg calf raises."
          : "Match achieved.",
  },
  {
    id: "shoulder_height",
    label: "Shoulder-to-Height",
    tier: 2,
    weight: 1,
    target: { kind: "range", low: 0.245, high: 0.275 },
    source: "Anthropometric reference",
    compute: (m) => (m.heightCm > 0 ? m.shoulderCm / m.heightCm : null),
    tip: (a) =>
      a < 0.245
        ? "Build shoulder width (overhead press, pike pushups)."
        : a > 0.275
          ? "Exceptional shoulder width — hold what you have."
          : "In range.",
  },
  {
    id: "chest_waist",
    label: "Chest-to-Waist",
    tier: 2,
    weight: 1,
    target: { kind: "floor", value: 1.4 },
    source: "Bodybuilding standard",
    compute: (m) => (m.waistCm > 0 ? m.chestCm / m.waistCm : null),
    tip: (a) =>
      a < 1.4
        ? "Widen chest or narrow waist for a stronger V-taper."
        : "On target.",
  },
];

export const RATIO_BY_ID: Record<RatioId, RatioDef> = Object.fromEntries(
  RATIOS.map((r) => [r.id, r]),
) as Record<RatioId, RatioDef>;
