"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QuoteCard } from "./components/QuoteCard";
import { RankCard } from "./components/RankCard";
import { COPY } from "@/lib/copy";
import { getOrCreateAnonId } from "@/lib/gating";
import { quoteForDay } from "@/lib/quotes";
import { rankFor } from "@/lib/ranks";
import { composite, scoreAll, topWeaknesses } from "@/lib/scoring";
import { getLatestMeasurement } from "@/lib/storage";
import type { Measurements, Quote } from "@/lib/types";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [latest, setLatest] = useState<Measurements | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    setLatest(getLatestMeasurement());
    const id = getOrCreateAnonId();
    setQuote(quoteForDay(id));
    setMounted(true);
  }, []);

  const scores = useMemo(() => (latest ? scoreAll(latest) : null), [latest]);
  const score = useMemo(() => (scores ? composite(scores) : null), [scores]);
  const rank = score != null ? rankFor(score) : null;
  const weak = scores ? topWeaknesses(scores, 2) : [];

  return (
    <div className="mx-auto max-w-3xl px-5 pt-10 md:pt-14 pb-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="serif text-3xl md:text-4xl tracking-wide">{COPY.appTitle}</h1>
          <span className="gold-rule mt-3" aria-hidden />
          <p className="mt-3 max-w-md text-sm text-stone-muted">{COPY.tagline}</p>
        </div>
      </header>

      <section className="mt-8 space-y-5">
        {quote && <QuoteCard quote={quote} />}

        {mounted && (
          <>
            {latest && score != null && rank ? (
              <RankCard rank={rank} score={score} />
            ) : (
              <div className="card rounded-sm p-6 md:p-8 fade-in">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  Begin
                </p>
                <h2 className="serif mt-1 text-3xl md:text-4xl">
                  {COPY.dashboard.emptyHeadline}
                </h2>
                <p className="mt-2 max-w-md text-sm text-stone-muted">
                  {COPY.dashboard.emptySub}
                </p>
                <Link
                  href="/measure/guide"
                  className="mt-5 inline-flex h-11 items-center rounded-sm bg-[var(--color-gold)] px-5 text-sm font-medium tracking-wide text-[var(--color-card)] hover:bg-[var(--color-gold-soft)]"
                >
                  {COPY.dashboard.beginCta}
                </Link>
              </div>
            )}

            {latest && weak.length > 0 && (
              <div className="card rounded-sm p-6 fade-in">
                <p className="text-xs uppercase tracking-[0.18em] text-stone-muted">
                  {COPY.dashboard.weakestLabel}
                </p>
                <ul className="mt-3 space-y-3">
                  {weak.map((w) => (
                    <li key={w.id}>
                      <p className="text-sm font-medium">
                        {w.label}{" "}
                        <span className="text-stone-muted">· {Math.round(w.score ?? 0)}/100</span>
                      </p>
                      <p className="text-sm text-stone-muted">{w.tip}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-3">
                  <Link
                    href="/measure"
                    className="inline-flex h-10 items-center rounded-sm border border-[var(--color-gold)] px-4 text-sm tracking-wide text-[var(--color-gold)]"
                  >
                    {COPY.dashboard.remeasureCta}
                  </Link>
                  <Link
                    href="/results"
                    className="inline-flex h-10 items-center rounded-sm px-4 text-sm tracking-wide text-stone-muted hover:text-[var(--color-stone)]"
                  >
                    Full results
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
