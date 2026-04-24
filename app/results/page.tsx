"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PaywallLock } from "../components/PaywallLock";
import { QuoteCard } from "../components/QuoteCard";
import { RankCard } from "../components/RankCard";
import { RatioBar } from "../components/RatioBar";
import { COPY } from "@/lib/copy";
import { currentUser, userHasAccess } from "@/lib/gating";
import { quoteForContext } from "@/lib/quotes";
import { rankFor } from "@/lib/ranks";
import { composite, scoreAll, topWeaknesses } from "@/lib/scoring";
import { getMeasurements } from "@/lib/storage";
import type { Measurements, Quote } from "@/lib/types";

export default function Results() {
  const [measurements, setMeasurements] = useState<Measurements[] | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const list = getMeasurements();
    setMeasurements(list);
    setPaid(userHasAccess(currentUser(), "ratio_full"));
  }, []);

  const latest = measurements?.[0] ?? null;
  const previous = measurements?.[1] ?? null;
  const scores = useMemo(() => (latest ? scoreAll(latest) : null), [latest]);
  const score = useMemo(() => (scores ? composite(scores) : null), [scores]);
  const prevScore = useMemo(() => {
    if (!previous) return null;
    return composite(scoreAll(previous));
  }, [previous]);
  const rank = score != null ? rankFor(score) : null;
  const weak = scores ? topWeaknesses(scores, 2) : [];
  const weakIds = new Set(weak.map((w) => w.id));

  useEffect(() => {
    if (!latest || score == null) {
      setQuote(null);
      return;
    }
    const delta = prevScore == null ? 0 : score - prevScore;
    setQuote(quoteForContext(latest.takenAt, delta));
  }, [latest, prevScore, score]);

  if (measurements && measurements.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-14 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">Results</p>
        <h1 className="serif mt-2 text-3xl">No measurements yet.</h1>
        <p className="mt-2 text-sm text-stone-muted">
          Start with a reading to see your composite score and rank.
        </p>
        <Link
          href="/measure/guide"
          className="mt-6 inline-flex h-11 items-center rounded-sm bg-[var(--color-gold)] px-5 text-sm font-medium text-[var(--color-card)] hover:bg-[var(--color-gold-soft)]"
        >
          Begin measuring
        </Link>
      </div>
    );
  }

  if (!scores || !rank || score == null) {
    return <div className="mx-auto max-w-3xl px-5 py-14 text-sm text-stone-muted">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:py-14 space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
          Results
        </p>
        <h1 className="serif mt-1 text-3xl md:text-4xl">{COPY.results.title}</h1>
        <span className="gold-rule mt-3" aria-hidden />
      </header>

      <RankCard rank={rank} score={score} />

      {weak.length > 0 && (
        <section className="card rounded-sm p-6 fade-in">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-muted">
            {COPY.results.tipsTitle}
          </p>
          <ul className="mt-3 space-y-4">
            {weak.map((w) => (
              <li key={w.id} className="border-l-2 border-[var(--color-gold)] pl-3">
                <p className="text-sm font-medium">
                  {w.label}{" "}
                  <span className="text-stone-muted">· {Math.round(w.score ?? 0)}/100</span>
                </p>
                <p className="mt-1 text-sm text-stone-muted">{w.tip}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="card rounded-sm px-6 py-3 fade-in">
        <p className="py-3 text-xs uppercase tracking-[0.18em] text-stone-muted">
          {COPY.results.allRatiosTitle}
        </p>
        {scores.map((r) => {
          const locked = !paid && !weakIds.has(r.id);
          return <RatioBar key={r.id} ratio={r} locked={locked} />;
        })}
      </section>

      {!paid && (
        <PaywallLock
          feature="ratio_full"
          title="Full ratio breakdown"
          sub="Unlock every score, every tip, and a 4-week calisthenics program targeted at your weakest ratios."
        >
          <></>
        </PaywallLock>
      )}

      {quote && <QuoteCard quote={quote} variant="compact" />}

      <div className="flex items-center justify-between gap-4 pt-2">
        <Link href="/" className="text-sm text-stone-muted hover:text-[var(--color-stone)]">
          ← Home
        </Link>
        <Link
          href="/measure"
          className="inline-flex h-11 items-center rounded-sm border border-[var(--color-gold)] px-5 text-sm tracking-wide text-[var(--color-gold)]"
        >
          Remeasure
        </Link>
      </div>
    </div>
  );
}
