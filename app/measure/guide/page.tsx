import Link from "next/link";
import { COPY } from "@/lib/copy";

const SPOTS = [
  {
    label: "Height",
    hint: "Standing, heels together, back against a wall. Measure barefoot.",
  },
  {
    label: "Weight",
    hint: "Morning, empty bladder, no clothes.",
  },
  {
    label: "Shoulder width",
    hint: "Tape across the back at the widest point, relaxed arms down. Solo-friendly — no calipers needed.",
  },
  {
    label: "Chest",
    hint: "Tape at the nipple line, arms at sides, exhale normally. Do not flex.",
  },
  {
    label: "Waist",
    hint: "Tape at the navel, relaxed belly. Don't suck in.",
  },
  {
    label: "Hips",
    hint: "Tape at the widest point of the glutes, feet together.",
  },
  {
    label: "Wrist",
    hint: "Narrowest point, just above the wrist bone. Dominant side.",
  },
  {
    label: "Flexed bicep",
    hint: "Arm parallel to floor, peak contraction. Measure at the largest point. A partner helps; solo is OK.",
  },
  {
    label: "Calf",
    hint: "Widest point, standing flat-footed.",
  },
  {
    label: "Body fat (optional)",
    hint: "Caliper or visual-estimate chart. If unsure, leave blank.",
  },
];

export default function Guide() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">
        Guide
      </p>
      <h1 className="serif mt-1 text-3xl md:text-4xl">{COPY.guide.title}</h1>
      <span className="gold-rule mt-3" aria-hidden />
      <p className="mt-3 max-w-xl text-sm text-stone-muted">{COPY.guide.sub}</p>

      <ol className="mt-8 space-y-4">
        {SPOTS.map((s, i) => (
          <li key={s.label} className="card rounded-sm p-5 fade-in">
            <p className="text-xs uppercase tracking-[0.16em] text-stone-muted">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="serif mt-1 text-xl">{s.label}</p>
            <p className="mt-1 text-sm text-stone-muted">{s.hint}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm text-stone-muted hover:text-[var(--color-stone)]"
        >
          ← Home
        </Link>
        <Link
          href="/measure"
          className="inline-flex h-11 items-center rounded-sm bg-[var(--color-gold)] px-5 text-sm font-medium tracking-wide text-[var(--color-card)] hover:bg-[var(--color-gold-soft)]"
        >
          Start measuring →
        </Link>
      </div>
    </div>
  );
}
