"use client";

import { useEffect, useRef, useState } from "react";
import { readDevPaid, setDevPaid } from "@/lib/gating";

const TAPS_REQUIRED = 5;
const WINDOW_MS = 2500;

export function DevPaidToggle() {
  const [paid, setPaid] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const taps = useRef<number[]>([]);

  useEffect(() => {
    setPaid(readDevPaid());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  function onTap() {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < WINDOW_MS), now];
    if (taps.current.length >= TAPS_REQUIRED) {
      taps.current = [];
      const next = !readDevPaid();
      setDevPaid(next);
      setPaid(next);
      setToast(next ? "Paid preview on" : "Paid preview off");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onTap}
        onTouchEnd={(e) => {
          e.preventDefault();
          onTap();
        }}
        aria-label={
          paid
            ? "Developer: paid preview on. Tap 5 times to disable."
            : "Developer: tap 5 times to enable paid preview."
        }
        className="block h-3 w-12 mt-3 rounded-sm bg-transparent p-0 cursor-default"
      >
        <span
          className="block h-[2px] w-full"
          style={{
            background: paid
              ? "linear-gradient(90deg, var(--color-gold-soft), var(--color-gold))"
              : "linear-gradient(90deg, var(--color-gold), var(--color-gold-soft))",
            boxShadow: paid ? "0 0 0 2px rgba(184,134,11,0.25)" : undefined,
          }}
          aria-hidden
        />
      </button>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4 fade-in"
        >
          <div className="card rounded-sm px-4 py-2 text-sm tracking-wide shadow-sm">
            <span className="text-[var(--color-gold)]">●</span>{" "}
            <span className="serif italic">{toast}</span>
          </div>
        </div>
      )}
    </>
  );
}
