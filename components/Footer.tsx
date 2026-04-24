import Link from "next/link";
import { hubs } from "@/lib/content/hubs";
import { Wordmark } from "./editorial/Wordmark";
import { SITE } from "@/lib/content/site";

const tools = [
  { slug: "peptide-calculator", name: "Peptide Calculator" },
  { slug: "reconstitution-calculator", name: "Reconstitution Calculator" },
  { slug: "syringe-converter", name: "Syringe Converter" },
  { slug: "dose-schedule-builder", name: "Dose Schedule Builder" },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-paper border-t border-clinical/20">
      {/* Masthead row */}
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-clinical/20">
          <div>
            <Wordmark size="lg" asLink={false} />
            <p className="mt-3 font-serif text-lg text-clinical-deep italic max-w-md leading-snug">
              {SITE.taglineLong}
            </p>
          </div>
          <div className="max-w-md text-sm text-stone leading-relaxed">
            A small editorial team writing from published nursing-education
            literature, peer-reviewed injection-technique research, and
            manufacturer package inserts. Not a clinic. Not medical advice.
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 mt-10">
          <div className="md:col-span-3">
            <h4 className="eyebrow text-stone mb-4">Calculators</h4>
            <ul className="space-y-2.5 text-[15px]">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-clinical-deep hover:text-clinical transition"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="eyebrow text-stone mb-4">The five hubs</h4>
            <ul className="grid grid-cols-1 gap-y-2.5">
              {hubs.map((hub, i) => (
                <li key={hub.slug}>
                  <Link
                    href={`/guides/${hub.slug}`}
                    className="group flex items-center gap-3 text-clinical-deep hover:text-clinical transition"
                  >
                    <span className="num text-clinical/50 group-hover:text-clinical text-sm w-7 tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px]">{hub.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow text-stone mb-4">The masthead</h4>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/about" className="text-clinical-deep hover:text-clinical transition">About</Link></li>
              <li><Link href="/editorial-standards" className="text-clinical-deep hover:text-clinical transition">Editorial standards</Link></li>
              <li><Link href="/methodology" className="text-clinical-deep hover:text-clinical transition">Methodology</Link></li>
              <li><Link href="/medical-disclaimer" className="text-clinical-deep hover:text-clinical transition">Medical disclaimer</Link></li>
              <li><Link href="/contact" className="text-clinical-deep hover:text-clinical transition">Contact & corrections</Link></li>
              <li><Link href="/newsletter" className="text-clinical-deep hover:text-clinical transition">Newsletter</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow text-stone mb-4">Fine print</h4>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/affiliate-disclosure" className="text-clinical-deep hover:text-clinical transition">Affiliate disclosure</Link></li>
              <li><Link href="/privacy" className="text-clinical-deep hover:text-clinical transition">Privacy</Link></li>
              <li><Link href="/terms" className="text-clinical-deep hover:text-clinical transition">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Imprint strip */}
      <div className="border-t border-clinical/15 bg-clinical-tint/40">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[11px] tracking-[0.14em] uppercase text-stone">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© {new Date().getFullYear()} InjectCompass</span>
            <span aria-hidden className="text-clinical/40">·</span>
            <span>{SITE.volume} · {SITE.issue}</span>
            <span aria-hidden className="text-clinical/40">·</span>
            <span>Not medical advice</span>
          </div>
          <div className="normal-case tracking-normal text-stone/90 text-xs max-w-xl md:text-right leading-relaxed">
            Educational and patient-education purposes only. We do not link to
            research-peptide vendors. We do not accept payment from drug
            manufacturers or telehealth clinics.
          </div>
        </div>
      </div>
    </footer>
  );
}
