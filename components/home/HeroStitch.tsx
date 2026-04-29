import { Link } from "@/i18n/navigation";
import { DoseCalculatorCard } from "./DoseCalculatorCard";

/**
 * HeroStitch — the dark-navy + bright-teal hero matching the Stitch
 * design (2026-04-29). Two-column on desktop:
 *  - left: BUSINESS-SECTION eyebrow + serif H1 + dek + primary CTA
 *  - right: glassmorphic Dose Calculator card with form fields + the
 *    instant-result row
 *
 * Voice rules (per CLAUDE.md): clinical, neutral, never wellness.
 * This hero ships the brand promise — "the gold standard for peptide
 * administration" — without overstating it.
 */
export function HeroStitch() {
  return (
    <section className="relative bg-midnight overflow-hidden border-b border-midnight-rule">
      {/* Subtle aqua glow behind the right card */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 30%, rgba(94, 234, 212, 0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-container px-6 pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left column */}
          <div className="lg:col-span-7">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-aqua/85">
              Editorial · Peptide administration
            </div>
            <h1
              className="mt-5 font-serif text-white text-[2.6rem] md:text-[3.6rem] lg:text-[3.9rem] leading-[1.04] tracking-[-0.01em] max-w-[18ch]"
            >
              The gold standard for peptide administration.
            </h1>
            <p className="mt-6 text-[17px] md:text-[19px] leading-[1.55] text-white/75 max-w-2xl">
              Nurse-reviewed administration guides, calculators, and
              technique references — written against the published
              prescribing information and primary trial literature, not
              vendor marketing.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={"/guides/injection-technique" as never}
                className="inline-flex items-center gap-2 px-6 py-3 bg-aqua text-midnight-deep rounded-full hover:bg-aqua-soft transition text-[14px] font-semibold"
              >
                Browse the library →
              </Link>
              <Link
                href={"/methodology" as never}
                className="inline-flex items-center gap-2 px-5 py-3 border border-aqua/30 text-aqua hover:bg-aqua/10 rounded-full transition text-[13.5px]"
              >
                How we score
              </Link>
            </div>
          </div>

          {/* Right column — Dose Calculator card */}
          <div className="lg:col-span-5">
            <DoseCalculatorCard />
          </div>
        </div>
      </div>
    </section>
  );
}
