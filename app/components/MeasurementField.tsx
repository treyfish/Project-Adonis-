"use client";

import { useId } from "react";

type Props = {
  label: string;
  hint?: string;
  unit: "cm" | "in" | "kg" | "lb" | "%";
  value: number | "";
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number | "") => void;
  optional?: boolean;
  error?: string | null;
};

export function MeasurementField({
  label,
  hint,
  unit,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  optional,
  error,
}: Props) {
  const id = useId();
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        {optional && (
          <span className="text-xs uppercase tracking-[0.14em] text-stone-muted">
            Optional
          </span>
        )}
      </span>
      {hint && <span className="mt-0.5 block text-xs text-stone-muted">{hint}</span>}
      <span className="mt-2 flex items-stretch rounded-sm border border-[var(--color-line)] bg-[var(--color-card)] focus-within:border-[var(--color-gold)]">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") onChange("");
            else {
              const n = Number(v);
              onChange(Number.isFinite(n) ? n : "");
            }
          }}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-lg tabular-nums outline-none"
        />
        <span className="flex items-center px-3 text-sm text-stone-muted">{unit}</span>
      </span>
      {error && <span className="mt-1 block text-xs text-[var(--color-blue)]">{error}</span>}
    </label>
  );
}
