"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { currentUser, userHasAccess } from "@/lib/gating";
import type { Feature } from "@/lib/types";

type Props = {
  feature: Feature;
  title?: string;
  sub?: string;
  children?: ReactNode;
};

export function PaywallLock({ feature, title = "Paid", sub, children }: Props) {
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setAllowed(userHasAccess(currentUser(), feature));
    setReady(true);
  }, [feature]);

  if (!ready) return null;
  if (allowed) return <>{children}</>;

  return (
    <div className="card rounded-sm p-6 md:p-8 fade-in relative overflow-hidden">
      <span className="gold-rule mb-4" aria-hidden />
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">Paid</p>
      <h3 className="serif mt-1 text-2xl">{title}</h3>
      {sub && <p className="mt-2 text-sm text-stone-muted max-w-md">{sub}</p>}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href="/paywall"
          className="inline-flex h-11 items-center rounded-sm bg-[var(--color-gold)] px-4 text-sm font-medium tracking-wide text-[var(--color-card)] hover:bg-[var(--color-gold-soft)]"
        >
          Learn more
        </Link>
        <span className="text-xs uppercase tracking-[0.18em] text-stone-muted">
          $7–10 / month
        </span>
      </div>
    </div>
  );
}
