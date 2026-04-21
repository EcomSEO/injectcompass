"use client";

import { useState } from "react";
import { calculatePeptideDose } from "@/lib/calculators/peptide-math";
import { SyringeSvg } from "./SyringeSvg";

export function PeptideCalculator() {
  const [peptideMg, setPeptideMg] = useState<string>("5");
  const [bacWaterMl, setBacWaterMl] = useState<string>("2");
  const [doseMcg, setDoseMcg] = useState<string>("250");

  const result = calculatePeptideDose({
    peptideAmountMg: Number(peptideMg) || 0,
    bacWaterMl: Number(bacWaterMl) || 0,
    desiredDoseMcg: Number(doseMcg) || 0,
  });

  return (
    <section className="my-8 p-6 md:p-8 bg-paper border border-clinical/20 rounded-lg">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-serif text-xl text-clinical mb-4">Inputs</h3>
          <div className="space-y-4">
            <LabeledInput
              label="Peptide in vial"
              suffix="mg"
              value={peptideMg}
              onChange={setPeptideMg}
              min={0}
              step={0.1}
            />
            <LabeledInput
              label="Bacteriostatic water added"
              suffix="mL"
              value={bacWaterMl}
              onChange={setBacWaterMl}
              min={0}
              step={0.1}
            />
            <LabeledInput
              label="Desired dose per injection"
              suffix="mcg"
              value={doseMcg}
              onChange={setDoseMcg}
              min={0}
              step={1}
            />
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl text-clinical mb-4">Output</h3>
          <div className="space-y-3 font-mono text-sm">
            <OutputRow
              label="Concentration"
              value={`${result.concentrationMgPerMl} mg/mL`}
            />
            <OutputRow
              label="Units per dose"
              value={String(result.unitsPerDose)}
              emphasis
            />
            <OutputRow
              label="mL per dose"
              value={`${result.mlPerDose} mL`}
            />
            <OutputRow
              label="Doses per vial"
              value={String(result.dosesPerVial)}
            />
            <OutputRow
              label="Rounding error"
              value={`${result.roundingErrorPercent}%`}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SyringeSvg units={result.unitsPerDose} />
      </div>

      {result.warnings.length > 0 && (
        <div className="mt-6 p-4 border-l-4 border-amber bg-amber/5">
          <p className="font-serif text-sm text-clinical font-semibold mb-2">
            Before you inject — notes on this calculation:
          </p>
          <ul className="text-sm text-charcoal/90 list-disc pl-5 space-y-1">
            {result.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 p-4 border-l-4 border-alert bg-alert/5">
        <p className="font-serif text-sm text-alert font-semibold mb-1">
          Verify with your prescriber before administering.
        </p>
        <p className="text-xs text-charcoal/80">
          This calculator is an educational reference tool. It is not medical
          advice, a dose recommendation, or a prescription. Math is
          unit-tested and conservative, but any human administration must be
          verified against your prescriber&apos;s instructions and the
          manufacturer package insert.
        </p>
      </div>
    </section>
  );
}

function LabeledInput({
  label,
  suffix,
  value,
  onChange,
  min,
  step,
}: {
  label: string;
  suffix: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-charcoal/80 mb-1">{label}</span>
      <div className="flex items-stretch">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-l-md border border-clinical/20 px-3 py-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-clinical/40"
        />
        <span className="inline-flex items-center px-3 bg-clinical/10 border border-l-0 border-clinical/20 rounded-r-md text-sm font-mono text-charcoal/80">
          {suffix}
        </span>
      </div>
    </label>
  );
}

function OutputRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between py-2 border-b border-clinical/10 ${
        emphasis ? "text-base md:text-lg text-clinical font-semibold" : ""
      }`}
    >
      <span className="font-sans text-charcoal/70">{label}</span>
      <span>{value}</span>
    </div>
  );
}
