"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useReducer, useState } from "react";
import { MeasurementField } from "../components/MeasurementField";
import { COPY } from "@/lib/copy";
import { saveMeasurement } from "@/lib/storage";
import type { Measurements } from "@/lib/types";

type FormState = {
  heightCm: number | "";
  weightKg: number | "";
  shoulderCm: number | "";
  chestCm: number | "";
  waistCm: number | "";
  hipCm: number | "";
  wristCm: number | "";
  bicepFlexedCm: number | "";
  calfCm: number | "";
  bodyFatPct: number | "";
};

const INITIAL: FormState = {
  heightCm: "",
  weightKg: "",
  shoulderCm: "",
  chestCm: "",
  waistCm: "",
  hipCm: "",
  wristCm: "",
  bicepFlexedCm: "",
  calfCm: "",
  bodyFatPct: "",
};

type Action = { type: "set"; key: keyof FormState; value: number | "" } | { type: "reset" };

function reducer(state: FormState, action: Action): FormState {
  if (action.type === "reset") return INITIAL;
  return { ...state, [action.key]: action.value };
}

const FIELDS: Array<{
  key: keyof FormState;
  label: string;
  hint: string;
  unit: "cm" | "kg" | "%";
  min?: number;
  max?: number;
  step?: number;
  optional?: boolean;
}> = [
  { key: "heightCm", label: "Height", hint: "Barefoot, heels together, against a wall.", unit: "cm", min: 100, max: 230, step: 0.5 },
  { key: "weightKg", label: "Weight", hint: "Morning, empty bladder.", unit: "kg", min: 30, max: 200, step: 0.1 },
  { key: "shoulderCm", label: "Shoulder width", hint: "Tape across the back at the widest point.", unit: "cm", min: 30, max: 70, step: 0.5 },
  { key: "chestCm", label: "Chest", hint: "Nipple line, relaxed, normal exhale.", unit: "cm", min: 60, max: 160, step: 0.5 },
  { key: "waistCm", label: "Waist", hint: "At the navel, relaxed belly.", unit: "cm", min: 50, max: 160, step: 0.5 },
  { key: "hipCm", label: "Hips", hint: "Widest point of the glutes.", unit: "cm", min: 60, max: 160, step: 0.5 },
  { key: "wristCm", label: "Wrist", hint: "Narrowest point, just above the wrist bone.", unit: "cm", min: 12, max: 25, step: 0.1 },
  { key: "bicepFlexedCm", label: "Flexed bicep", hint: "Arm parallel, peak contraction.", unit: "cm", min: 20, max: 60, step: 0.1 },
  { key: "calfCm", label: "Calf", hint: "Widest point, standing.", unit: "cm", min: 20, max: 60, step: 0.1 },
  { key: "bodyFatPct", label: "Body fat %", hint: "Optional. Caliper or visual estimate.", unit: "%", min: 3, max: 45, step: 0.5, optional: true },
];

export default function MeasureForm() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [error, setError] = useState<string | null>(null);

  const missing = useMemo(
    () => FIELDS.filter((f) => !f.optional && state[f.key] === ""),
    [state],
  );

  const warning = useMemo(() => {
    if (typeof state.waistCm === "number" && typeof state.chestCm === "number") {
      if (state.waistCm > state.chestCm)
        return "Waist larger than chest — double-check both measurements.";
    }
    if (typeof state.bodyFatPct === "number" && state.bodyFatPct < 8) {
      return "Below 8% body fat is medically risky for extended periods.";
    }
    return null;
  }, [state]);

  const canSubmit = missing.length === 0;

  function onSubmit() {
    if (!canSubmit) {
      setError(`Missing: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }
    setError(null);
    const m: Measurements = {
      heightCm: state.heightCm as number,
      weightKg: state.weightKg as number,
      shoulderCm: state.shoulderCm as number,
      chestCm: state.chestCm as number,
      waistCm: state.waistCm as number,
      hipCm: state.hipCm as number,
      wristCm: state.wristCm as number,
      bicepFlexedCm: state.bicepFlexedCm as number,
      calfCm: state.calfCm as number,
      bodyFatPct: state.bodyFatPct === "" ? undefined : (state.bodyFatPct as number),
      takenAt: new Date().toISOString(),
    };
    saveMeasurement(m);
    router.push("/results");
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 md:py-14">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">Measure</p>
      <h1 className="serif mt-1 text-3xl md:text-4xl">{COPY.measure.title}</h1>
      <span className="gold-rule mt-3" aria-hidden />
      <p className="mt-3 max-w-xl text-sm text-stone-muted">{COPY.measure.sub}</p>
      <p className="mt-2 text-xs text-stone-muted">
        <Link className="underline" href="/measure/guide">
          {COPY.measure.guideCta}
        </Link>
      </p>

      <div className="mt-8 space-y-5">
        {FIELDS.map((f) => (
          <MeasurementField
            key={f.key}
            label={f.label}
            hint={f.hint}
            unit={f.unit}
            value={state[f.key]}
            min={f.min}
            max={f.max}
            step={f.step}
            optional={f.optional}
            onChange={(v) => dispatch({ type: "set", key: f.key, value: v })}
          />
        ))}
      </div>

      {warning && (
        <div className="mt-6 rounded-sm border border-[var(--color-blue)]/40 bg-[var(--color-blue)]/5 p-4 text-sm text-[var(--color-blue)]">
          {warning}
        </div>
      )}
      {error && (
        <div className="mt-6 rounded-sm border border-red-500/40 bg-red-500/5 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <Link href="/" className="text-sm text-stone-muted hover:text-[var(--color-stone)]">
          ← Home
        </Link>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`inline-flex h-11 items-center rounded-sm px-5 text-sm font-medium tracking-wide ${
            canSubmit
              ? "bg-[var(--color-gold)] text-[var(--color-card)] hover:bg-[var(--color-gold-soft)]"
              : "bg-[var(--color-marble)] text-stone-muted cursor-not-allowed"
          }`}
        >
          {COPY.measure.submitCta}
        </button>
      </div>
    </div>
  );
}
