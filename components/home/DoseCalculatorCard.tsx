"use client";

import { useState } from "react";

/**
 * DoseCalculatorCard — glassmorphic dose-calculator widget for the
 * Stitch hero. Form fields: peptide type, dose (mcg), vial size (mg),
 * water volume (mL). Computes the U-100 syringe units (rounded to
 * nearest whole) inline.
 *
 * Educational reference only. Renders the same math the
 * /peptide-calculator full page uses. The full tool lives at
 * /peptide-calculator with the WebApplication schema; this hero card
 * is a marketing surface that links into it.
 */
export function DoseCalculatorCard() {
  const [doseMcg, setDoseMcg] = useState<string>("250");
  const [vialMg, setVialMg] = useState<string>("5");
  const [waterMl, setWaterMl] = useState<string>("2");

  // u100 syringe: 100 units = 1 mL
  const dose = Number(doseMcg) || 0;
  const vial = Number(vialMg) || 0;
  const water = Number(waterMl) || 0;

  let units: number | null = null;
  if (dose > 0 && vial > 0 && water > 0) {
    const concentration_mcg_per_ml = (vial * 1000) / water;
    const ml_to_inject = dose / concentration_mcg_per_ml;
    units = Math.round(ml_to_inject * 100);
  }

  return (
    <div
      className="rounded-2xl border border-aqua/20 bg-midnight-raised/80 backdrop-blur-sm p-5 md:p-6 shadow-2xl"
      style={{ boxShadow: "0 24px 60px -20px rgba(94, 234, 212, 0.2)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-aqua/85">
          Dose Calculator
        </span>
        <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-white/40">
          Educational
        </span>
      </div>

      <div className="grid gap-3.5">
        <Field label="Compound class">
          <select
            className="w-full bg-midnight-deep/80 border border-midnight-rule rounded-md px-3 py-2 text-[14px] text-white/90 focus:outline-none focus:border-aqua/60"
            defaultValue="research"
          >
            <option value="research">Research peptide</option>
            <option value="approved">Approved injectable (GLP-1)</option>
            <option value="growth">Growth-hormone-axis</option>
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Dose (mcg)">
            <NumberInput value={doseMcg} setValue={setDoseMcg} />
          </Field>
          <Field label="Vial (mg)">
            <NumberInput value={vialMg} setValue={setVialMg} />
          </Field>
        </div>

        <Field label="BAC water (mL)">
          <NumberInput value={waterMl} setValue={setWaterMl} />
        </Field>
      </div>

      {/* Instant result */}
      <div className="mt-5 pt-4 border-t border-midnight-rule">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55 mb-2">
          Instant result
        </div>
        <div className="flex items-baseline gap-3">
          <span
            className="font-mono text-aqua tnum"
            style={{ fontSize: "44px", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
          >
            {units == null ? "—" : units}
          </span>
          <span className="text-[13px] text-white/65 font-mono uppercase tracking-[0.14em]">
            units · U-100 syringe
          </span>
        </div>
        <p className="mt-3 text-[11.5px] text-white/45 leading-relaxed">
          Calculation cross-check: {dose || 0} mcg ÷ ({vial || 0} mg ÷{" "}
          {water || 0} mL × 1000) × 100. Confirm your dose-draw with your
          pharmacist on the first reconstitution.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.16em] uppercase text-white/55 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

function NumberInput({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full bg-midnight-deep/80 border border-midnight-rule rounded-md px-3 py-2 text-[14px] text-white/95 tnum focus:outline-none focus:border-aqua/60"
      style={{ fontVariantNumeric: "tabular-nums" }}
    />
  );
}
