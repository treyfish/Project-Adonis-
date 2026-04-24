export type Measurements = {
  heightCm: number;
  weightKg: number;
  shoulderCm: number;
  chestCm: number;
  waistCm: number;
  hipCm: number;
  wristCm: number;
  bicepFlexedCm: number;
  calfCm: number;
  bodyFatPct?: number;
  takenAt: string;
};

export type RatioId =
  | "shoulder_hip"
  | "waist_chest"
  | "waist_hip"
  | "body_fat"
  | "bicep_wrist"
  | "bicep_calf"
  | "shoulder_height"
  | "chest_waist";

export type Target =
  | { kind: "point"; value: number }
  | { kind: "range"; low: number; high: number }
  | { kind: "floor"; value: number }
  | { kind: "ceiling"; value: number };

export type RatioScore = {
  id: RatioId;
  label: string;
  tier: 1 | 2;
  weight: number;
  actual: number | null;
  score: number | null;
  target: Target;
  source: string;
  tip: string;
};

export type RankId = "kouros" | "hermes" | "ares" | "apollo" | "herakles" | "zeus";

export type Rank = {
  id: RankId;
  min: number;
  max: number;
  title: string;
  statue: string;
  meaning: string;
};

export type QuoteTheme =
  | "discipline"
  | "endurance"
  | "vanity"
  | "mortality"
  | "beginning"
  | "equanimity";

export type Quote = {
  id: string;
  text: string;
  author: "Seneca" | "Epictetus" | "Marcus Aurelius";
  source: string;
  theme: QuoteTheme;
};

export type Feature = "workouts" | "progress_full" | "ratio_full" | "pdf_export" | "push";

export type User = {
  id: string;
  subscription?: { status: "active" | "inactive" };
} | null;
