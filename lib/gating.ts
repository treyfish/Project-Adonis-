import type { Feature, User } from "./types";

const FEATURE_GATES: Record<Feature, boolean> = {
  workouts: true,
  progress_full: true,
  ratio_full: true,
  pdf_export: true,
  push: true,
};

export function isPaidFeature(f: Feature): boolean {
  return FEATURE_GATES[f];
}

export function userHasAccess(user: User, f: Feature): boolean {
  if (!isPaidFeature(f)) return true;
  return user?.subscription?.status === "active";
}

const DEV_FLAG = "adonis.dev.paid";

export function readDevPaid(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DEV_FLAG) === "true";
}

export function setDevPaid(on: boolean): void {
  if (typeof window === "undefined") return;
  if (on) window.localStorage.setItem(DEV_FLAG, "true");
  else window.localStorage.removeItem(DEV_FLAG);
}

export function currentUser(): User {
  if (typeof window === "undefined") return null;
  const paid = readDevPaid();
  const id = window.localStorage.getItem("adonis.userId") ?? ensureAnonId();
  return {
    id,
    subscription: paid ? { status: "active" } : { status: "inactive" },
  };
}

function ensureAnonId(): string {
  if (typeof window === "undefined") return "anon";
  const existing = window.localStorage.getItem("adonis.userId");
  if (existing) return existing;
  const id =
    "u_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  window.localStorage.setItem("adonis.userId", id);
  return id;
}

export function getOrCreateAnonId(): string {
  return ensureAnonId();
}
