import type { Metadata } from "next";
import Link from "next/link";
import { PeptideCalculator } from "@/components/PeptideCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/schema/BreadcrumbJsonLd";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ClinicalRule } from "@/components/editorial/DotRule";
import { ClinicalCallout } from "@/components/editorial/ClinicalCallout";
import { ReviewStamp } from "@/components/ReviewStamp";

export const metadata: Metadata = pageMetadata({
  title: "Peptide Calculator with Visual Syringe",
  description:
    "Calculate peptide dose in insulin-syringe units from mg-in-vial + bacteriostatic water + target dose. Math is unit-tested. Educational reference only — verify with your prescriber.",
  path: "/peptide-calculator",
});

export default function PeptideCalculatorPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/#tools" },
    { label: "Peptide Calculator" },
  ];

  return (
    <>
      <BreadcrumbJsonLd crumbs={crumbs} />
      <main className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-6">
          <Eyebrow tone="clinical">The Calculator</Eyebrow>
        </div>

        <h1 className="display-headline text-clinical-deep mt-3 text-[2.15rem] md:text-[2.85rem] leading-[1.05]">
          Peptide Calculator
        </h1>

        <div className="mt-5">
          <ReviewStamp updatedAt="2026-04-21" readingTime={8} />
        </div>

        <ClinicalRule className="mt-7" />

        <p className="mt-7 text-[1.08rem] md:text-[1.14rem] leading-[1.65] text-charcoal/85 max-w-[62ch]">
          Enter the amount of peptide in your vial, the volume of bacteriostatic
          water you're adding, and your target dose. The calculator returns the
          number of units to draw on a U-100 insulin syringe, with the exact
          tick mark highlighted on the visual syringe.
        </p>

        <ClinicalCallout variant="check" title="Educational reference — not medical advice">
          This is patient-education material for individuals who have been
          prescribed injectable medications. It is not a substitute for your
          prescriber's instructions or the manufacturer package insert. Many
          compounds discussed in published research literature are not
          FDA-approved for human use.
        </ClinicalCallout>

        <PeptideCalculator />

        <section className="mt-12">
          <Eyebrow tone="clinical">How it works</Eyebrow>
          <h2 className="font-serif text-2xl text-clinical-deep mt-2 mb-4">
            The math behind the calculator
          </h2>
          <p className="text-charcoal/90 leading-relaxed">
            Every peptide vial is a dry powder that must be reconstituted with
            bacteriostatic water before it can be drawn into a syringe. Once
            reconstituted, the peptide is in solution at a concentration
            determined by the dry amount divided by the volume of diluent
            added, per the USP &lt;797&gt; compounded sterile preparation
            reference.
          </p>
          <p className="mt-4 text-charcoal/90 leading-relaxed">
            On a U-100 insulin syringe, 100 units equal 1 millilitre. So the
            number of units to draw for a given dose equals the target dose
            divided by the concentration, scaled to the U-100 graduation.
          </p>

          <div className="my-6 p-4 md:p-5 bg-paper border border-clinical/25 rounded-sm font-mono text-[13.5px] text-clinical-deep leading-loose">
            <div>concentration (mg/mL) = peptide_mg ÷ bac_water_mL</div>
            <div>mL_per_dose = dose_mcg ÷ (concentration × 1000)</div>
            <div>units_per_dose = mL_per_dose × 100</div>
          </div>
        </section>

        <section className="mt-10">
          <Eyebrow tone="clinical">Worked example</Eyebrow>
          <h2 className="font-serif text-2xl text-clinical-deep mt-2 mb-4">
            5 mg vial, 2 mL diluent, 250 mcg target dose
          </h2>
          <ul className="text-charcoal/90 leading-relaxed space-y-2 list-disc pl-6">
            <li>
              <strong>Concentration:</strong>{" "}
              <span className="num">5 mg ÷ 2 mL = 2.5 mg/mL = 2,500 mcg/mL</span>
            </li>
            <li>
              <strong>Volume per dose:</strong>{" "}
              <span className="num">250 mcg ÷ 2,500 mcg/mL = 0.1 mL</span>
            </li>
            <li>
              <strong>Units per dose:</strong>{" "}
              <span className="num">0.1 mL × 100 = 10 units</span> on a U-100
              insulin syringe
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <Eyebrow tone="clinical">Rounding convention</Eyebrow>
          <h2 className="font-serif text-2xl text-clinical-deep mt-2 mb-4">
            Rounded to the nearest whole unit
          </h2>
          <p className="text-charcoal/90 leading-relaxed">
            U-100 insulin syringes do not subdivide below 1 unit, so the
            calculator rounds to the nearest whole unit. The unrounded value is
            shown secondarily. When rounding creates a &gt;2% dose error, the
            calculator displays a warning and suggests adjusting bacteriostatic
            water volume to bring the dose onto a cleaner tick mark.
          </p>
        </section>

        <section className="mt-10">
          <Eyebrow tone="amber">When the output looks wrong</Eyebrow>
          <h2 className="font-serif text-2xl text-clinical-deep mt-2 mb-4">
            Edge cases the calculator flags
          </h2>
          <ul className="text-charcoal/90 leading-relaxed space-y-2 list-disc pl-6">
            <li>
              If units &gt; 100, the whole dose cannot be drawn on a single
              U-100 syringe — reconstitute with less diluent, or split the
              dose.
            </li>
            <li>
              If units round to 0, concentration is too low — reconstitute with
              less diluent.
            </li>
            <li>
              If rounding error &gt; 2%, adjust bac water volume by 0.1–0.5 mL
              to land on a cleaner mark.
            </li>
            <li>
              If concentration &gt; 50 mg/mL, double-check inputs — that is
              unusually high.
            </li>
          </ul>
        </section>

        <section className="mt-12 border-t border-clinical/15 pt-10">
          <Eyebrow tone="clinical">Related references</Eyebrow>
          <h2 className="font-serif text-2xl text-clinical-deep mt-2 mb-4">
            Continue reading
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/how-to-reconstitute-peptides"
                className="text-clinical underline"
              >
                How to reconstitute peptides — the complete procedure
              </Link>
            </li>
            <li>
              <Link
                href="/bacteriostatic-water-vs-sterile-water"
                className="text-clinical underline"
              >
                Bacteriostatic water vs sterile water
              </Link>
            </li>
            <li>
              <Link
                href="/subcutaneous-injection"
                className="text-clinical underline"
              >
                Subcutaneous injection — the complete guide
              </Link>
            </li>
            <li>
              <Link
                href="/needle-sizes-for-peptide-injection"
                className="text-clinical underline"
              >
                Needle sizes for peptide injection — 29G vs 30G vs 31G
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
