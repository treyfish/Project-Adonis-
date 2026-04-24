import type { RatioScore } from "@/lib/types";

type Props = {
  ratio: RatioScore;
  locked?: boolean;
};

function targetLabel(t: RatioScore["target"]): string {
  switch (t.kind) {
    case "point":
      return `≈ ${t.value}`;
    case "range":
      return `${t.low} – ${t.high}`;
    case "floor":
      return `≥ ${t.value}`;
    case "ceiling":
      return `≤ ${t.value}`;
  }
}

function axisRange(t: RatioScore["target"]): { min: number; max: number } {
  switch (t.kind) {
    case "point":
      return { min: 0, max: t.value * 2 };
    case "range": {
      const span = t.high - t.low;
      return { min: Math.max(0, t.low - span * 2), max: t.high + span * 2 };
    }
    case "floor":
      return { min: 0, max: t.value * 1.6 };
    case "ceiling":
      return { min: 0, max: t.value * 2 };
  }
}

export function RatioBar({ ratio, locked }: Props) {
  const { min, max } = axisRange(ratio.target);
  const span = max - min || 1;
  const actualPct =
    ratio.actual == null ? 0 : Math.max(0, Math.min(100, ((ratio.actual - min) / span) * 100));

  const band =
    ratio.target.kind === "range"
      ? {
          leftPct: Math.max(0, Math.min(100, ((ratio.target.low - min) / span) * 100)),
          widthPct: Math.max(
            0,
            Math.min(100, ((ratio.target.high - ratio.target.low) / span) * 100),
          ),
        }
      : null;

  const targetLinePct =
    ratio.target.kind === "floor" || ratio.target.kind === "ceiling" || ratio.target.kind === "point"
      ? Math.max(0, Math.min(100, ((ratio.target.value - min) / span) * 100))
      : null;

  return (
    <div className="border-b border-[var(--color-line)] py-4 last:border-b-0">
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--color-stone)]">
            {ratio.label}
            {ratio.tier === 1 && (
              <span
                className="ml-2 align-middle text-[10px] uppercase tracking-[0.15em] text-[var(--color-gold)]"
                title="Peer-reviewed science"
              >
                Tier 1
              </span>
            )}
          </p>
          <p className="text-xs text-stone-muted">
            target {targetLabel(ratio.target)} · {ratio.source}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="serif text-2xl leading-none tabular-nums">
            {locked ? "—" : ratio.actual == null ? "—" : ratio.actual.toFixed(2)}
          </p>
          <p className="text-xs uppercase tracking-[0.14em] text-stone-muted">
            {locked ? "locked" : ratio.score == null ? "no data" : `${Math.round(ratio.score)}/100`}
          </p>
        </div>
      </div>
      <div className="relative mt-3 h-2 rounded-full bg-[var(--color-marble)]">
        {band && (
          <div
            className="absolute top-0 h-full rounded-full bg-[var(--color-gold)]/25"
            style={{ left: `${band.leftPct}%`, width: `${band.widthPct}%` }}
            aria-hidden
          />
        )}
        {targetLinePct != null && (
          <div
            className="absolute -top-1 h-4 w-px bg-[var(--color-gold)]/70"
            style={{ left: `${targetLinePct}%` }}
            aria-hidden
          />
        )}
        {ratio.actual != null && !locked && (
          <div
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-gold)] bg-[var(--color-card)]"
            style={{ left: `${actualPct}%` }}
            aria-hidden
          />
        )}
      </div>
      {!locked && ratio.actual != null && ratio.tip && (
        <p className="mt-2 text-sm text-stone-muted">{ratio.tip}</p>
      )}
    </div>
  );
}
