"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PaywallLock } from "../components/PaywallLock";
import { COPY } from "@/lib/copy";
import { composite, scoreAll } from "@/lib/scoring";
import { getMeasurements } from "@/lib/storage";
import type { Measurements } from "@/lib/types";

export default function Progress() {
  const [measurements, setMeasurements] = useState<Measurements[] | null>(null);
  useEffect(() => {
    setMeasurements(getMeasurements());
  }, []);

  const series = useMemo(() => {
    if (!measurements) return [];
    return [...measurements].reverse().map((m) => ({
      at: m.takenAt,
      score: composite(scoreAll(m)),
    }));
  }, [measurements]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:py-14 space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
          Progress
        </p>
        <h1 className="serif mt-1 text-3xl md:text-4xl">{COPY.progress.title}</h1>
        <span className="gold-rule mt-3" aria-hidden />
        <p className="mt-3 max-w-xl text-sm text-stone-muted">{COPY.progress.sub}</p>
      </header>

      {series.length < 2 ? (
        <div className="card rounded-sm p-6 fade-in">
          <p className="text-sm text-stone-muted">{COPY.progress.needMore}</p>
          <Link
            href="/measure"
            className="mt-4 inline-flex h-10 items-center rounded-sm border border-[var(--color-gold)] px-4 text-sm tracking-wide text-[var(--color-gold)]"
          >
            Remeasure
          </Link>
        </div>
      ) : (
        <section className="card rounded-sm p-6 fade-in">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-muted">
            Composite over time · free tier
          </p>
          <svg viewBox="0 0 400 140" className="mt-4 w-full h-36" aria-label="Progress chart">
            <line x1="0" y1="120" x2="400" y2="120" stroke="currentColor" strokeOpacity={0.1} />
            {series.map((p, i) => {
              if (i === 0) return null;
              const prev = series[i - 1];
              const x1 = ((i - 1) / (series.length - 1)) * 400;
              const x2 = (i / (series.length - 1)) * 400;
              const y1 = 120 - (prev.score / 100) * 110;
              const y2 = 120 - (p.score / 100) * 110;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-gold)"
                  strokeWidth={2}
                />
              );
            })}
            {series.map((p, i) => {
              const x = (i / Math.max(1, series.length - 1)) * 400;
              const y = 120 - (p.score / 100) * 110;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={4}
                  fill="var(--color-card)"
                  stroke="var(--color-gold)"
                  strokeWidth={1.5}
                />
              );
            })}
          </svg>
          <p className="mt-2 text-xs text-stone-muted">
            {series.length} measurements · latest {series[series.length - 1].score}/100
          </p>
        </section>
      )}

      <PaywallLock
        feature="progress_full"
        title={COPY.progress.lockedTitle}
        sub={COPY.progress.lockedSub}
      >
        <></>
      </PaywallLock>
    </div>
  );
}
