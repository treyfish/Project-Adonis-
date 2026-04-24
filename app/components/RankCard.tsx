import type { Rank } from "@/lib/types";
import { StatueSilhouette } from "./StatueSilhouette";

type Props = {
  rank: Rank;
  score: number;
  compact?: boolean;
};

export function RankCard({ rank, score, compact }: Props) {
  return (
    <section
      className={`card relative overflow-hidden rounded-sm fade-in ${
        compact ? "p-5" : "p-6 md:p-8"
      }`}
      aria-label={`Rank ${rank.title}, ${rank.statue}`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-40 md:w-52 opacity-20 text-[var(--color-gold)]"
        aria-hidden
      >
        <StatueSilhouette rank={rank.id} className="h-full w-full" />
      </div>
      <div className="relative flex items-end gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-stone-muted">
            Composite
          </p>
          <p className={`serif leading-none ${compact ? "text-5xl" : "text-6xl md:text-7xl"}`}>
            {Math.round(score)}
            <span className="text-stone-muted text-2xl"> / 100</span>
          </p>
        </div>
      </div>
      <div className="relative mt-5 flex items-baseline gap-3">
        <span className="gold-rule" aria-hidden />
        <p className="text-xs uppercase tracking-[0.18em] text-stone-muted">{rank.title}</p>
      </div>
      <h2 className="relative mt-1 serif text-3xl md:text-4xl">{rank.statue}</h2>
      <p className="relative mt-2 max-w-md text-sm text-stone-muted">{rank.meaning}</p>
    </section>
  );
}
