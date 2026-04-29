import { Link } from "@/i18n/navigation";

/**
 * ScienceBackedCallouts — two trust callouts matching the Stitch
 * "SCIENCE-BACKED & MEDICALLY VETTED" section. Both link out to
 * primary-source policy pages (methodology + medical disclaimer)
 * rather than carrying floating prose. Icon + headline + dek + link.
 */
export function ScienceBackedCallouts() {
  return (
    <section className="bg-midnight">
      <div className="mx-auto max-w-container px-6 pb-20 md:pb-24">
        <div className="mb-8">
          <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-aqua/85">
            Science-backed · medically vetted
          </span>
          <h2 className="mt-3 font-serif text-white text-[1.6rem] md:text-[1.85rem] leading-tight max-w-2xl">
            Two independent reviewers. One source-of-truth document on
            wrong-source supply.
          </h2>
        </div>

        <ul className="grid md:grid-cols-2 gap-5">
          <li className="rounded-xl border border-midnight-rule bg-midnight-raised/60 p-6 hover:border-aqua/30 transition">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-aqua/85 mb-2">
              How we vet
            </div>
            <h3 className="font-serif text-white text-[1.2rem] leading-snug">
              Two independent reviewers
            </h3>
            <p className="mt-3 text-[13.5px] text-white/65 leading-relaxed">
              Every guide on InjectCompass is read against the cited
              prescribing information by an RN editor and an independent
              medical reviewer before publication. Neither has a
              consulting relationship with any pharmaceutical
              manufacturer or compounding pharmacy. The reviewer&apos;s
              editorial-independence letter is on file.
            </p>
            <Link
              href={"/methodology" as never}
              className="mt-5 inline-flex items-center gap-1.5 text-aqua text-[12.5px] font-mono uppercase tracking-[0.14em] hover:gap-2.5 transition-[gap]"
            >
              Read methodology v1.2 →
            </Link>
          </li>

          <li className="rounded-xl border border-midnight-rule bg-midnight-raised/60 p-6 hover:border-aqua/30 transition">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-amber-300/85 mb-2">
              Wrong-source disclaimer
            </div>
            <h3 className="font-serif text-white text-[1.2rem] leading-snug">
              Wrong source = stop.
            </h3>
            <p className="mt-3 text-[13.5px] text-white/65 leading-relaxed">
              InjectCompass is an editorial reference for the patient
              already-prescribed by a clinician. We do not link to
              peptide vendors, telehealth prescribers, or compounded-
              pharmacy retailers. If a guide on this site is your route
              to obtaining the medication, you have the wrong source —
              stop and consult your prescriber.
            </p>
            <Link
              href={"/medical-disclaimer" as never}
              className="mt-5 inline-flex items-center gap-1.5 text-aqua text-[12.5px] font-mono uppercase tracking-[0.14em] hover:gap-2.5 transition-[gap]"
            >
              Read full disclaimer →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
