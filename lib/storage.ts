import type { Measurements } from "./types";

const KEY = "adonis.measurements";

export function getMeasurements(): Measurements[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Measurements[];
  } catch {
    return [];
  }
}

export function saveMeasurement(m: Measurements): Measurements[] {
  const list = getMeasurements();
  list.unshift(m);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  }
  return list;
}

export function getLatestMeasurement(): Measurements | null {
  return getMeasurements()[0] ?? null;
}

export function clearMeasurements(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(KEY);
  }
}
