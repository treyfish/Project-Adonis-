import Link from "next/link";
import { COPY } from "@/lib/copy";

const FEATURES = [
  "Full per-ratio scores with gap analysis",
  "4-week calisthenics program targeting your weakest ratios",
  "Remeasurement tracking with progress charts",
  "Full Greek statue progression + unlock quotes",
  "PDF export of your progress report",
  "Daily Stoic reminder (push)",
];

export default function Paywall() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10 md:py-14">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">Paid</p>
      <h1 className="serif mt-1 text-3xl md:text-4xl">{COPY.paywall.title}</h1>
      <span className="gold-rule mt-3" aria-hidden />
      <p className="mt-3 max-w-md text-sm text-stone-muted">{COPY.paywall.sub}</p>
      <p className="mt-2 serif text-2xl text-[var(--color-gold)]">{COPY.paywall.price}</p>

      <ul className="mt-6 space-y-3">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]"
              aria-hidden
            />
            <p className="text-sm">{f}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-sm border border-dashed border-[var(--color-line)] p-5 text-sm text-stone-muted">
        Checkout isn&apos;t wired up yet. Toggle paid features locally by setting{" "}
        <code className="font-mono text-xs">localStorage.setItem(&apos;adonis.dev.paid&apos;, &apos;true&apos;)</code>{" "}
        in your browser console and refreshing.
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="text-sm text-stone-muted hover:text-[var(--color-stone)]"
        >
          ← Home
        </Link>
      </div>
    </div>
  );
}
