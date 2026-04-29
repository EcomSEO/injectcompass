"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

/**
 * MasterCalculator — the home-page interactive calculator with the
 * U-100 syringe SVG visualisation. Unit-mark calculation:
 *   ml_to_inject = desired_dose_mcg / concentration_mcg_per_ml
 *   units = ml_to_inject × 100 (U-100 syringe convention)
 *
 * The SVG renders a horizontal U-100 syringe with the computed unit
 * mark highlighted. Educational reference only — links to the full
 * /peptide-calculator tool page (WebApplication schema) for the
 * complete reconstitution worked-example flow.
 */
export function MasterCalculator() {
  const [concentration, setConcentration] = useState("2.5"); // mg/mL
  const [dose, setDose] = useState("250"); // mcg

  const conc_mg_ml = Number(concentration) || 0;
  const dose_mcg = Number(dose) || 0;
  const conc_mcg_ml = conc_mg_ml * 1000;
  const ml_to_inject = conc_mcg_ml > 0 ? dose_mcg / conc_mcg_ml : 0;
  const units = Math.round(ml_to_inject * 100);
  const unitsValid = units >= 0 && units <= 100;

  // Mark position along a 100u syringe (0 to 100), clamped for SVG.
  const markPct = Math.min(100, Math.max(0, units));

  return (
    <section className="bg-midnight">
      <div className="mx-auto max-w-container px-6 pb-16 md:pb-20">
        <div
          className="rounded-2xl border border-aqua/20 bg-midnight-raised/60 p-6 md:p-9"
          style={{
            background:
              "linear-gradient(135deg, rgba(14, 42, 53, 0.85) 0%, rgba(6, 27, 35, 0.95) 100%)",
            boxShadow: "0 24px 60px -20px rgba(94, 234, 212, 0.12)",
          }}
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Inputs */}
            <div className="lg:col-span-5">
              <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-aqua/85">
                The Master Calculator
              </span>
              <h3 className="mt-3 font-serif text-white text-[1.7rem] leading-tight">
                Vial → syringe, without the math.
              </h3>
              <p className="mt-2 text-[14px] text-white/65 leading-relaxed">
                Enter the reconstituted concentration and your dose. The
                U-100 syringe below shows the unit mark to draw to.
              </p>

              <div className="mt-6 space-y-4">
                <Field label="Concentration (mg/mL)">
                  <NumberInput value={concentration} setValue={setConcentration} />
                </Field>
                <Field label="Desired dose (mcg)">
                  <NumberInput value={dose} setValue={setDose} />
                </Field>
                <Field label="Syringe type">
                  <select
                    className="w-full bg-midnight-deep/80 border border-midnight-rule rounded-md px-3 py-2 text-[14px] text-white/90 focus:outline-none focus:border-aqua/60"
                    defaultValue="u100"
                  >
                    <option value="u100">U-100 insulin syringe (1 mL)</option>
                  </select>
                </Field>
              </div>

              <Link
                href={"/peptide-calculator" as never}
                className="mt-6 inline-flex items-center gap-1.5 text-aqua text-[12.5px] font-mono uppercase tracking-[0.14em] hover:gap-2.5 transition-[gap]"
              >
                Open the full calculator →
              </Link>
            </div>

            {/* Result + syringe */}
            <div className="lg:col-span-7">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-white/55">
                  Your dose
                </span>
                <span
                  className="font-mono text-aqua tnum"
                  style={{
                    fontSize: "44px",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {unitsValid ? units : "—"}
                </span>
                <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-white/65">
                  units
                </span>
              </div>

              {/* Schematic U-100 syringe (no needle-in-skin imagery) */}
              <div className="relative">
                <svg
                  viewBox="0 0 800 130"
                  className="w-full h-auto"
                  aria-label={`U-100 insulin syringe with the ${units}-unit mark highlighted`}
                  role="img"
                >
                  {/* Plunger end */}
                  <rect x="0" y="55" width="60" height="20" rx="3" fill="#16384A" />
                  {/* Barrel */}
                  <rect x="60" y="40" width="620" height="50" rx="6" fill="#0E2A35" stroke="#16384A" strokeWidth="2" />
                  {/* Liquid fill (up to current mark) */}
                  <rect
                    x="60"
                    y="42"
                    width={620 * (markPct / 100)}
                    height="46"
                    rx="6"
                    fill="rgba(94, 234, 212, 0.22)"
                  />
                  {/* Tick marks 0..100 by 10 */}
                  {Array.from({ length: 11 }).map((_, i) => {
                    const x = 60 + (620 * i) / 10;
                    return (
                      <g key={i}>
                        <line
                          x1={x}
                          y1="32"
                          x2={x}
                          y2="40"
                          stroke="#5EEAD4"
                          strokeOpacity="0.4"
                          strokeWidth="1.5"
                        />
                        <text
                          x={x}
                          y="24"
                          textAnchor="middle"
                          fill="#5EEAD4"
                          fillOpacity="0.55"
                          style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: "11px" }}
                        >
                          {i * 10}
                        </text>
                      </g>
                    );
                  })}
                  {/* Highlighted unit-mark line */}
                  <line
                    x1={60 + 620 * (markPct / 100)}
                    y1="30"
                    x2={60 + 620 * (markPct / 100)}
                    y2="100"
                    stroke="#5EEAD4"
                    strokeWidth="3"
                  />
                  <circle
                    cx={60 + 620 * (markPct / 100)}
                    cy="65"
                    r="6"
                    fill="#5EEAD4"
                  />
                  {/* Hub + needle (schematic, no skin) */}
                  <rect x="680" y="58" width="30" height="14" fill="#16384A" />
                  <rect x="710" y="62" width="80" height="6" fill="#5EEAD4" fillOpacity="0.55" />
                </svg>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.14em] text-white/55">
                  <span>0 units</span>
                  <span className="text-aqua">
                    Mark · {unitsValid ? `${units} u` : "—"}
                  </span>
                  <span>100 units</span>
                </div>
              </div>

              <p className="mt-5 text-[12px] text-white/45 leading-relaxed max-w-xl">
                Educational reference only. Confirm your reconstitution
                math + first dose-draw with your prescriber or pharmacist.
                The {units > 100 ? "computed dose exceeds the 100-unit barrel — split into two draws." : "unit mark above is the half-way point on the plunger barrel."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
