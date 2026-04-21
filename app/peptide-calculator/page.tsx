import type { Metadata } from "next";
import Link from "next/link";
import { PeptideCalculator } from "@/components/PeptideCalculator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/schema/BreadcrumbJsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title:
    "Peptide Calculator with Visual Syringe",
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

        <h1 className="font-serif text-4xl md:text-5xl text-clinical mt-4 leading-tight">
          Peptide Calculator
        </h1>
        <p className="mt-4 text-lg text-charcoal/80 max-w-2xl">
          Enter the amount of peptide in your vial, the volume of bacteriostatic
          water you&apos;re adding, and your target dose. The calculator returns
          the number of units to draw on a U-100 insulin syringe, with the exact
          tick mark highlighted on the visual syringe below.
        </p>

        <aside
          role="note"
          className="mt-6 p-4 border-l-4 border-clinical bg-clinical/5 text-sm text-charcoal/90"
        >
          <strong className="text-clinical block mb-1">
            Educational reference — not medical advice
          </strong>
          This is patient-education material for individuals who have been
          prescribed injectable medications. It is not a substitute for your
          prescriber&apos;s instructions or the manufacturer package insert.
          Many peptide compounds are not FDA-approved for human use.
        </aside>

        <PeptideCalculator />

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-clinical mb-4">How this calculator works</h2>
          <p className="text-charcoal/90 leading-relaxed">
            Every peptide vial is a dry powder that has to be reconstituted with
            bacteriostatic water before it can be drawn into a syringe. Once
            reconstituted, the peptide is in solution at a concentration
            determined by the dry amount divided by the volume of water added.
          </p>
          <p className="mt-4 text-charcoal/90 leading-relaxed">
            On a U-100 insulin syringe, 100 units equal 1 millilitre. So the
            number of units to draw for a given dose is the target dose divided
            by the concentration, scaled to units.
          </p>

          <div className="my-6 p-4 bg-paper border border-clinical/20 rounded font-mono text-sm text-charcoal/90">
            <div className="mb-2">concentration (mg/mL) = peptide_mg ÷ bac_water_mL</div>
            <div className="mb-2">mL_per_dose = dose_mcg ÷ (concentration × 1000)</div>
            <div>units_per_dose = mL_per_dose × 100</div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-clinical mb-4">Worked example</h2>
          <p className="text-charcoal/90 leading-relaxed mb-3">
            A typical research-protocol reconstitution: 5 mg of peptide in the
            vial, 2 mL of bacteriostatic water added, 250 mcg target dose.
          </p>
          <ul className="text-charcoal/90 leading-relaxed space-y-1 list-disc pl-6">
            <li><strong>Concentration:</strong> 5 mg ÷ 2 mL = 2.5 mg/mL = 2,500 mcg/mL</li>
            <li><strong>Volume per dose:</strong> 250 mcg ÷ 2,500 mcg/mL = 0.1 mL</li>
            <li><strong>Units per dose:</strong> 0.1 mL × 100 = 10 units on a U-100 insulin syringe</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-clinical mb-4">Rounding rules</h2>
          <p className="text-charcoal/90 leading-relaxed">
            U-100 insulin syringes do not subdivide below 1 unit, so the
            calculator rounds to the nearest whole unit. We show both the
            rounded value and the unrounded calculation. When the rounding
            error exceeds 2%, the calculator displays a warning and suggests
            adjusting the bacteriostatic-water volume to bring the dose onto a
            cleaner tick mark.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-clinical mb-4">When the output looks wrong</h2>
          <ul className="text-charcoal/90 leading-relaxed space-y-2 list-disc pl-6">
            <li>If units are over 100, you cannot draw the whole dose on a single U-100 syringe — reconstitute with less water, or split the dose.</li>
            <li>If units round to 0, your concentration is too low — reconstitute with less water.</li>
            <li>If rounding error is over 2%, adjust bacteriostatic-water volume by 0.1–0.5 mL to land on a cleaner mark.</li>
            <li>If the concentration exceeds 50 mg/mL, double-check your inputs — that is unusually high.</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-clinical/10 pt-10">
          <h2 className="font-serif text-2xl text-clinical mb-4">Related tools and guides</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/how-to-reconstitute-peptides" className="text-clinical underline">
                How to reconstitute peptides — the complete procedure
              </Link>
            </li>
            <li>
              <Link href="/bacteriostatic-water-vs-sterile-water" className="text-clinical underline">
                Bacteriostatic water vs sterile water
              </Link>
            </li>
            <li>
              <Link href="/subcutaneous-injection" className="text-clinical underline">
                Subcutaneous injection — the complete guide
              </Link>
            </li>
            <li>
              <Link href="/needle-sizes-for-peptide-injection" className="text-clinical underline">
                Needle sizes for peptide injection — 29G vs 30G vs 31G
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
