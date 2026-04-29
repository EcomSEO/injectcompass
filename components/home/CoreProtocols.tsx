import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { articleImage } from "@/lib/content/images";
import Image from "next/image";

/**
 * CoreProtocols — three featured procedure-pillars, dark-card style.
 * Each card has the article image, "Medically reviewed" pill on the
 * first card per the Stitch mockup, the title + dek + reviewer chip,
 * and a Read Guide CTA. Per the network-isolation lock the reviewer
 * chip is Sara Lin RN BSN (kept on injectcompass per
 * docs/cross-site-author-audit.md).
 */
export function CoreProtocols({ posts }: { posts: Post[] }) {
  const featured = posts.slice(0, 3);

  return (
    <section className="bg-midnight">
      <div className="mx-auto max-w-container px-6 py-16 md:py-20">
        <div className="mb-10 md:mb-12">
          <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-aqua/85">
            Core protocols
          </span>
          <h2 className="mt-3 font-serif text-white text-[1.85rem] md:text-[2.3rem] leading-tight max-w-2xl">
            Procedure-pillars, written against the prescribing
            information.
          </h2>
          <p className="mt-3 text-[15px] text-white/65 max-w-2xl leading-relaxed">
            No vendor-funnel framing. Each guide cites the published
            label, the trial protocol, and the failure modes patients
            actually encounter.
          </p>
        </div>

        <ul className="grid md:grid-cols-3 gap-5">
          {featured.map((p, i) => {
            const hub = getHub(p.hub);
            const img = articleImage(p.slug, p.hub);
            return (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}` as never}
                  className="group block bg-midnight-raised border border-midnight-rule rounded-xl overflow-hidden hover:border-aqua/40 transition"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-midnight-deep">
                    {img ? (
                      <Image
                        src={img}
                        alt={p.h1}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-midnight-rule to-midnight-deep" />
                    )}
                    {i === 0 && p.medicalDisclaimer === "required" && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-midnight-deep/85 backdrop-blur-sm border border-aqua/30 text-aqua text-[10px] font-mono uppercase tracking-[0.14em]">
                        Medically reviewed
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-aqua/80">
                      {hub?.name ?? "Library"}
                    </span>
                    <h3 className="mt-2 font-serif text-white text-[1.25rem] leading-snug group-hover:text-aqua-soft transition">
                      {p.h1}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-white/65 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-white/55">
                        Sara Lin · RN BSN
                      </span>
                      <span className="inline-flex items-center gap-1 text-aqua text-[12px] font-mono uppercase tracking-[0.14em] group-hover:gap-2 transition-[gap]">
                        Read guide →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
