import { describe, expect, it } from "vitest";
import { composite, scoreAll, scoreRatio, topWeaknesses } from "./scoring";
import { RATIOS } from "./ratios";
import type { Measurements } from "./types";

const baseline: Measurements = {
  heightCm: 180,
  weightKg: 82,
  shoulderCm: 50, // tape across back
  chestCm: 105,
  waistCm: 80,
  hipCm: 95,
  wristCm: 17,
  bicepFlexedCm: 40,
  calfCm: 39,
  bodyFatPct: 12,
  takenAt: "2026-04-24T00:00:00.000Z",
};

describe("scoreRatio", () => {
  it("scores a point target: perfect match = 100", () => {
    expect(scoreRatio(2.52, { kind: "point", value: 2.52 })).toBe(100);
  });

  it("scores a point target: 50% off = 50", () => {
    expect(scoreRatio(1.26, { kind: "point", value: 2.52 })).toBeCloseTo(50, 5);
  });

  it("scores inside a range = 100", () => {
    expect(scoreRatio(0.88, { kind: "range", low: 0.85, high: 0.9 })).toBe(100);
  });

  it("scores outside a range proportional to the nearer bound", () => {
    expect(scoreRatio(0.95, { kind: "range", low: 0.85, high: 0.9 })).toBeLessThan(100);
    expect(scoreRatio(0.95, { kind: "range", low: 0.85, high: 0.9 })).toBeGreaterThan(0);
  });

  it("floor: at or above target = 100", () => {
    expect(scoreRatio(1.5, { kind: "floor", value: 1.4 })).toBe(100);
    expect(scoreRatio(1.4, { kind: "floor", value: 1.4 })).toBe(100);
  });

  it("floor: below target scored against value", () => {
    expect(scoreRatio(0.7, { kind: "floor", value: 1.4 })).toBeCloseTo(50, 5);
  });

  it("ceiling: at or below target = 100", () => {
    expect(scoreRatio(0.5, { kind: "ceiling", value: 0.7 })).toBe(100);
    expect(scoreRatio(0.7, { kind: "ceiling", value: 0.7 })).toBe(100);
  });

  it("ceiling: above target scored against value", () => {
    expect(scoreRatio(1.05, { kind: "ceiling", value: 0.7 })).toBeCloseTo(50, 5);
  });

  it("clamps scores to 0–100", () => {
    expect(scoreRatio(100, { kind: "point", value: 1 })).toBe(0);
    expect(scoreRatio(-100, { kind: "point", value: 1 })).toBe(0);
  });
});

describe("scoreAll", () => {
  it("produces one score per ratio", () => {
    const scores = scoreAll(baseline);
    expect(scores).toHaveLength(RATIOS.length);
  });

  it("handles missing body_fat as null", () => {
    const { bodyFatPct, ...rest } = baseline;
    void bodyFatPct;
    const scores = scoreAll({ ...rest } as Measurements);
    const bf = scores.find((s) => s.id === "body_fat");
    expect(bf?.score).toBeNull();
  });

  it("handles divide-by-zero inputs gracefully", () => {
    const m: Measurements = { ...baseline, hipCm: 0, chestCm: 0, wristCm: 0, calfCm: 0, heightCm: 0, waistCm: 0 };
    const scores = scoreAll(m);
    for (const s of scores) {
      if (s.id === "body_fat") continue;
      expect(s.actual).toBeNull();
      expect(s.score).toBeNull();
    }
  });
});

describe("composite", () => {
  it("weighted mean skips nulls", () => {
    const scores = scoreAll({ ...baseline, bodyFatPct: undefined });
    const c = composite(scores);
    expect(c).toBeGreaterThanOrEqual(0);
    expect(c).toBeLessThanOrEqual(100);
  });

  it("baseline profile produces a defensible composite", () => {
    const scores = scoreAll(baseline);
    const c = composite(scores);
    expect(c).toBeGreaterThan(60);
    expect(c).toBeLessThanOrEqual(100);
  });

  it("empty scores → 0", () => {
    expect(composite([])).toBe(0);
  });
});

describe("topWeaknesses", () => {
  it("returns the two lowest non-perfect scores", () => {
    const scores = scoreAll(baseline);
    const weak = topWeaknesses(scores, 2);
    expect(weak.length).toBeLessThanOrEqual(2);
    for (const w of weak) expect(w.score).toBeLessThan(100);
  });
});
