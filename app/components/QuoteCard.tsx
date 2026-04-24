import type { Quote } from "@/lib/types";

type Props = {
  quote: Quote;
  variant?: "default" | "compact";
};

export function QuoteCard({ quote, variant = "default" }: Props) {
  const large = variant === "default";
  return (
    <figure
      className={`card rounded-sm px-6 py-8 fade-in ${large ? "md:px-10 md:py-12" : ""}`}
    >
      <span className="gold-rule mb-5" aria-hidden />
      <blockquote
        className={`serif italic leading-snug text-[var(--color-stone)] ${
          large ? "text-2xl md:text-[1.75rem]" : "text-lg"
        }`}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm uppercase tracking-[0.15em] text-stone-muted">
        — {quote.author}
        <span className="text-stone-muted/70">, {quote.source}</span>
      </figcaption>
    </figure>
  );
}
