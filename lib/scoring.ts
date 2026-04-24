import { RATIOS } from "./ratios";
import type { Measurements, RatioScore, Target } from "./types";

const clamp = (x: number) => Math.max(0, Math.min(100, x));

const pointScore = (actual: number, target: number): number => {
  if (target === 0) return 0;
  return clamp(100 - (Math.abs(actual - target) / target) * 100);
};

export function scoreRatio(actual: number, t: Target): number {
  switch (t.kind) {
    case "point":
      return pointScore(actual, t.value);
    case "floor":
      return actual >= t.value ? 100 : pointScore(actual, t.value);
    case "ceiling":
      return actual <= t.value ? 100 : pointScore(actual, t.value);
    case "range": {
      if (actual >= t.low && actual <= t.high) return 100;
      const mid = (t.low + t.high) / 2;
      if (mid === 0) return 0;
      const d = actual < t.low ? t.low - actual : actual - t.high;
      return clamp(100 - (d / mid) * 100);
    }
  }
}

export function scoreAll(m: Measurements): RatioScore[] {
  return RATIOS.map((def) => {
    const actual = def.compute(m);
    const score =
      actual != null && Number.isFinite(actual) ? scoreRatio(actual, def.target) : null;
    const tip = actual != null ? def.tip(actual) : "Add this measurement to see a tip.";
    return {
      id: def.id,
      label: def.label,
      tier: def.tier,
      weight: def.weight,
      actual,
      score,
      target: def.target,
      source: def.source,
      tip,
    };
  });
}

export function composite(scores: RatioScore[]): number {
  const present = scores.filter(
    (s): s is RatioScore & { score: number } =>
      s.score != null && Number.isFinite(s.score),
  );
  if (present.length === 0) return 0;
  const totalW = present.reduce((n, s) => n + s.weight, 0);
  const sum = present.reduce((n, s) => n + s.score * s.weight, 0);
  return Math.round(sum / totalW);
}

export function topWeaknesses(scores: RatioScore[], n = 2): RatioScore[] {
  return scores
    .filter((s) => s.score != null && s.score < 100)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, n);
}
