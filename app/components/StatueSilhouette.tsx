import type { RankId } from "@/lib/types";

type Props = {
  rank: RankId;
  className?: string;
};

const COMMON_PROPS = {
  viewBox: "0 0 200 400",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function StatueSilhouette({ rank, className }: Props) {
  switch (rank) {
    case "kouros":
      return (
        <svg {...COMMON_PROPS} className={className} aria-hidden>
          <title>Kouros silhouette</title>
          <path d="M100 30 q-14 4 -14 20 q0 10 4 16 q-2 10 2 18 l-4 4 q-24 12 -28 40 l-4 40 q10 -4 20 -4 l2 80 l-4 80 q0 12 8 16 q8 -4 8 -16 l4 -80 l0 -40 l4 40 l4 80 q0 12 8 16 q8 -4 8 -16 l-4 -80 l2 -80 q10 0 20 4 l-4 -40 q-4 -28 -28 -40 l-4 -4 q4 -8 2 -18 q4 -6 4 -16 q0 -16 -14 -20 z" />
        </svg>
      );
    case "hermes":
      return (
        <svg {...COMMON_PROPS} className={className} aria-hidden>
          <title>Hermes silhouette</title>
          <path d="M100 28 q-14 3 -14 19 q0 11 4 17 q-2 10 3 18 q-4 4 -8 6 q-22 8 -26 32 q-3 22 -4 40 q10 0 22 -5 q-1 10 0 22 l-3 70 q-2 18 4 40 q-10 20 -6 40 q10 -6 14 -18 q2 -22 6 -40 l4 -54 q0 -12 2 -22 q2 10 2 22 l4 54 q4 18 6 40 q4 12 14 18 q4 -20 -6 -40 q6 -22 4 -40 l-3 -70 q1 -12 0 -22 q12 5 22 5 q-1 -18 -4 -40 q-4 -24 -26 -32 q-4 -2 -8 -6 q5 -8 3 -18 q4 -6 4 -17 q0 -16 -14 -19 z" />
          <path d="M82 38 q-6 -8 -12 -4 q2 6 10 8" />
          <path d="M118 38 q6 -8 12 -4 q-2 6 -10 8" />
        </svg>
      );
    case "ares":
      return (
        <svg {...COMMON_PROPS} className={className} aria-hidden>
          <title>Ares silhouette</title>
          <path d="M100 28 q-16 4 -16 22 q0 12 6 18 q-2 12 4 20 q-4 4 -10 8 q-28 10 -32 42 l-2 36 q12 -2 22 -2 l8 8 q-2 18 0 36 l-4 70 q-2 20 4 44 q-10 20 -4 40 q12 -6 16 -18 q2 -24 6 -44 l6 -54 q2 -14 0 -26 q4 14 4 26 l6 54 q4 20 6 44 q4 12 16 18 q6 -20 -4 -40 q6 -24 4 -44 l-4 -70 q2 -18 0 -36 l8 -8 q10 0 22 2 l-2 -36 q-4 -32 -32 -42 q-6 -4 -10 -8 q6 -8 4 -20 q6 -6 6 -18 q0 -18 -16 -22 z" />
        </svg>
      );
    case "apollo":
      return (
        <svg {...COMMON_PROPS} className={className} aria-hidden>
          <title>Apollo silhouette</title>
          <path d="M100 26 q-14 4 -14 20 q0 12 5 18 q-3 10 3 20 q-4 4 -10 7 q-26 10 -32 36 q-3 22 -4 44 q14 -2 24 -4 q-2 10 0 22 l-4 74 q-2 20 5 42 q-10 20 -4 42 q12 -6 15 -18 q2 -22 6 -42 l5 -56 q2 -14 2 -28 q0 14 2 28 l5 56 q4 20 6 42 q3 12 15 18 q6 -22 -4 -42 q7 -22 5 -42 l-4 -74 q2 -12 0 -22 q10 2 24 4 q-1 -22 -4 -44 q-6 -26 -32 -36 q-6 -3 -10 -7 q6 -10 3 -20 q5 -6 5 -18 q0 -16 -14 -20 z" />
          <path d="M100 48 q-10 4 -10 16 q0 12 10 14 q10 -2 10 -14 q0 -12 -10 -16 z" />
        </svg>
      );
    case "herakles":
      return (
        <svg {...COMMON_PROPS} className={className} aria-hidden>
          <title>Herakles silhouette</title>
          <path d="M100 26 q-16 4 -16 22 q0 12 6 18 q-2 10 4 20 q-4 4 -10 8 q-30 10 -36 40 q-3 24 -4 44 q14 -2 26 -4 l10 10 q-2 18 0 36 l-4 70 q-2 22 4 44 q-12 20 -4 42 q14 -6 18 -18 q2 -22 6 -44 l6 -54 q2 -16 2 -32 q0 16 2 32 l6 54 q4 22 6 44 q4 12 18 18 q8 -22 -4 -42 q6 -22 4 -44 l-4 -70 q2 -18 0 -36 l10 -10 q12 2 26 4 q-1 -20 -4 -44 q-6 -30 -36 -40 q-6 -4 -10 -8 q6 -10 4 -20 q6 -6 6 -18 q0 -18 -16 -22 z" />
          <path d="M60 110 q-8 -4 -12 2 q4 10 14 10" />
          <path d="M140 110 q8 -4 12 2 q-4 10 -14 10" />
        </svg>
      );
    case "zeus":
      return (
        <svg {...COMMON_PROPS} className={className} aria-hidden>
          <title>Zeus silhouette</title>
          <path d="M100 22 q-18 4 -18 24 q0 12 6 20 q-2 12 6 22 q-4 4 -10 8 q-32 10 -38 42 q-3 26 -4 48 q16 -4 28 -4 l10 10 q-2 20 0 38 l-4 72 q-2 22 4 44 q-14 22 -4 46 q16 -6 20 -20 q2 -24 6 -44 l6 -56 q2 -16 2 -34 q0 18 2 34 l6 56 q4 20 6 44 q4 14 20 20 q10 -24 -4 -46 q6 -22 4 -44 l-4 -72 q2 -18 0 -38 l10 -10 q12 0 28 4 q-1 -22 -4 -48 q-6 -32 -38 -42 q-6 -4 -10 -8 q8 -10 6 -22 q6 -8 6 -20 q0 -20 -18 -24 z" />
          <path d="M86 38 q-6 4 -6 10 q6 2 10 -2" />
          <path d="M114 38 q6 4 6 10 q-6 2 -10 -2" />
          <path d="M96 56 q2 8 4 12 q2 -4 4 -12" />
        </svg>
      );
  }
}
