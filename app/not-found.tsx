import Link from "next/link";
import { hubs } from "@/lib/content/hubs";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ClinicalRule } from "@/components/editorial/DotRule";

/**
 * 404 — clinical-reference "not found" page.
 * Voice: nurse-educator. Reassuring, step-numbered, never alarmist.
 * Header (with MedicalDisclaimerStrip above masthead) + Footer are applied by
 * the root layout — this component only renders <main>.
 */
export default function NotFound() {
  return (
    <main>
      <section className="border-b border-clinical/15">
        <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20 pb-14 md:pb-20">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8 fade-up">
              <Eyebrow tone="clinical">404 · Reference not found</Eyebrow>

              <h1 className="display-headline text-clinical-deep mt-5 text-[2.4rem] sm:text-5xl md:text-[3.6rem] leading-[1.06]">
                This page isn&apos;t in our reference.
              </h1>

              <div className="mt-8 max-w-2xl text-charcoal/85 text-[17px] leading-[1.7] space-y-4">
                <p>
                  The link you followed points to a page we haven&apos;t
                  published, or to an older draft we&apos;ve since archived.
                  Nothing is broken on your end.
                </p>
                <p>
                  A few places will usually get you to what you were looking
                  for: the five reference hubs below, the calculators in the
                  top navigation, or the home page. If you arrived here from a
                  bookmark, it may be worth updating it once you land on the
                  current version of the page.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/" className="btn-primary">
                  Back to home <span aria-hidden>&rarr;</span>
                </Link>
                <Link href="/#hubs" className="btn-secondary">
                  See the five hubs
                </Link>
              </div>
            </div>

            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-clinical/15 fade-up-delay-1">
              <div className="eyebrow text-stone mb-4">Status</div>
              <dl className="space-y-3 text-[14px]">
                <div className="flex items-baseline gap-3">
                  <dt className="caps-label text-stone w-24 shrink-0">Code</dt>
                  <dd className="num text-clinical-deep">404</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="caps-label text-stone w-24 shrink-0">Meaning</dt>
                  <dd className="text-clinical-deep">Reference not found</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="caps-label text-stone w-24 shrink-0">Action</dt>
                  <dd className="text-clinical-deep">
                    Return home or open a hub below
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-clinical/15">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <Eyebrow tone="clinical">The table of contents</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-clinical-deep mt-3 leading-tight">
                Try one of the five hubs.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0 border-t border-clinical/20">
            {hubs.map((hub, i) => (
              <Link
                key={hub.slug}
                href={`/guides/${hub.slug}`}
                className="group relative flex flex-col p-6 border-b lg:border-b-0 lg:border-r border-clinical/15 last:border-r-0 hover:bg-clinical-tint/50 transition"
              >
                <span className="rank-numeral text-[2.5rem] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg text-clinical-deep leading-tight mb-2">
                  {hub.name}
                </h3>
                <p className="text-[13.5px] text-charcoal/70 leading-relaxed flex-1">
                  {hub.oneLiner}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-clinical group-hover:text-clinical-deep text-xs font-medium uppercase tracking-[0.14em]">
                  Open hub <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <ClinicalRule />
          <p className="mt-6 caps-label text-stone">
            InjectCompass &middot; Reference not found &middot;{" "}
            <span className="num normal-case tracking-normal">404</span>
          </p>

          {/* Clinical-book footer: fake chart-paper pagination, monospace, stone. */}
          <div
            aria-hidden
            className="mt-10 flex items-center gap-3 num text-[11px] tracking-[0.14em] uppercase text-stone/80"
          >
            <span className="h-px flex-1 bg-stone/20" />
            <span>404 &middot; page 404 of 404</span>
            <span className="h-px flex-1 bg-stone/20" />
          </div>
        </div>
      </section>
    </main>
  );
}
