/**
 * Safety-critical peptide dosing math.
 * All functions are pure, unit-tested, and conservative in their rounding.
 *
 * Convention: U-100 insulin syringes (1 mL = 100 units).
 * "Verify with your prescriber" must display alongside every output.
 */

export type PeptideCalcInputs = {
  peptideAmountMg: number;      // total mg in the vial
  bacWaterMl: number;           // volume of bacteriostatic water added
  desiredDoseMcg: number;       // target dose per injection
};

export type PeptideCalcOutput = {
  concentrationMgPerMl: number;
  unitsPerDose: number;         // rounded to nearest whole unit
  unitsPerDoseExact: number;    // unrounded value for transparency
  mlPerDose: number;
  dosesPerVial: number;
  roundingErrorPercent: number; // |exact - rounded| / exact × 100
  warnings: string[];
};

const U100_UNITS_PER_ML = 100;

export function calculatePeptideDose(
  inputs: PeptideCalcInputs,
): PeptideCalcOutput {
  const warnings: string[] = [];

  const { peptideAmountMg, bacWaterMl, desiredDoseMcg } = inputs;

  // Input validation
  if (peptideAmountMg <= 0) {
    return errorOutput("Peptide amount must be greater than 0 mg");
  }
  if (bacWaterMl <= 0) {
    return errorOutput("Bacteriostatic water volume must be greater than 0 mL");
  }
  if (desiredDoseMcg <= 0) {
    return errorOutput("Desired dose must be greater than 0 mcg");
  }

  const concentrationMgPerMl = peptideAmountMg / bacWaterMl;
  const concentrationMcgPerMl = concentrationMgPerMl * 1000;

  if (concentrationMgPerMl > 50) {
    warnings.push(
      "Concentration exceeds 50 mg/mL — unusual. Verify inputs.",
    );
  }

  const mlPerDose = desiredDoseMcg / concentrationMcgPerMl;
  const unitsPerDoseExact = mlPerDose * U100_UNITS_PER_ML;
  const unitsPerDose = Math.round(unitsPerDoseExact);

  // Conservative flag: if rounded dose differs from exact by >2%, warn
  const roundingErrorPercent =
    unitsPerDoseExact > 0
      ? Math.abs(unitsPerDoseExact - unitsPerDose) / unitsPerDoseExact * 100
      : 0;

  if (roundingErrorPercent > 2) {
    warnings.push(
      `Rounding to ${unitsPerDose} units introduces a ${roundingErrorPercent.toFixed(1)}% dose error. Consider adjusting bac water volume.`,
    );
  }

  if (unitsPerDose > 100) {
    warnings.push(
      "Dose exceeds a full U-100 insulin syringe. Either split the injection or reduce concentration.",
    );
  }

  if (unitsPerDose < 1) {
    warnings.push(
      "Dose rounds to zero units at this concentration. Increase bac water volume to dilute the solution.",
    );
  }

  const dosesPerVial = mlPerDose > 0 ? Math.floor(bacWaterMl / mlPerDose) : 0;

  return {
    concentrationMgPerMl: round(concentrationMgPerMl, 3),
    unitsPerDose,
    unitsPerDoseExact: round(unitsPerDoseExact, 2),
    mlPerDose: round(mlPerDose, 3),
    dosesPerVial,
    roundingErrorPercent: round(roundingErrorPercent, 1),
    warnings,
  };
}

function errorOutput(message: string): PeptideCalcOutput {
  return {
    concentrationMgPerMl: 0,
    unitsPerDose: 0,
    unitsPerDoseExact: 0,
    mlPerDose: 0,
    dosesPerVial: 0,
    roundingErrorPercent: 0,
    warnings: [message],
  };
}

function round(n: number, places: number): number {
  const factor = Math.pow(10, places);
  return Math.round(n * factor) / factor;
}

// Reconstitution calculator — inverse: given concentration target, compute bac water volume
export type ReconstitutionInputs = {
  peptideAmountMg: number;
  targetConcentrationMgPerMl: number;
};

export type ReconstitutionOutput = {
  bacWaterMl: number;
  warnings: string[];
};

export function calculateReconstitution(
  inputs: ReconstitutionInputs,
): ReconstitutionOutput {
  const warnings: string[] = [];

  if (inputs.peptideAmountMg <= 0) {
    return { bacWaterMl: 0, warnings: ["Peptide amount must be > 0 mg"] };
  }
  if (inputs.targetConcentrationMgPerMl <= 0) {
    return {
      bacWaterMl: 0,
      warnings: ["Target concentration must be > 0 mg/mL"],
    };
  }

  const bacWaterMl = inputs.peptideAmountMg / inputs.targetConcentrationMgPerMl;

  if (bacWaterMl > 10) {
    warnings.push(
      `${round(bacWaterMl, 2)} mL is a large volume for a single vial — verify your target concentration.`,
    );
  }
  if (bacWaterMl < 0.5) {
    warnings.push(
      `${round(bacWaterMl, 2)} mL is very low — reconstitution may be difficult at this volume.`,
    );
  }

  return { bacWaterMl: round(bacWaterMl, 2), warnings };
}
