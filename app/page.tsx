import { hubs } from "@/lib/content/hubs";
import { featuredPost, latestPosts } from "@/lib/content/posts";
import { HubCard } from "@/components/HubCard";
import { PostCard } from "@/components/PostCard";
import { EmailCapture } from "@/components/EmailCapture";
import Link from "next/link";

export default function HomePage() {
  const featured = featuredPost();
  const recent = latestPosts(6);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] text-clinical">
            Injections, done right.
          </h1>
          <p className="mt-6 text-xl text-charcoal/80 max-w-2xl leading-relaxed">
            Calculators, step-numbered technique guides, and printable cheat sheets —
            for people prescribed injectable medications. Patient-education only.
            Not medical advice.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/peptide-calculator"
              className="inline-flex items-center rounded-md bg-clinical px-6 py-3 text-paper hover:bg-moss transition"
            >
              Open the Peptide Calculator →
            </Link>
            <Link
              href="#email-capture"
              className="inline-flex items-center rounded-md border border-clinical/30 px-6 py-3 text-clinical hover:border-clinical transition"
            >
              Get the cheat sheet
            </Link>
          </div>
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-6xl px-6 py-14 border-t border-clinical/10">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wide text-amber">
              The tool this site is built around
            </span>
          </div>
          <PostCard post={featured} variant="feature" />
        </section>
      )}

      <section id="hubs" className="mx-auto max-w-6xl px-6 py-16 border-t border-clinical/10">
        <h2 className="font-serif text-3xl text-clinical mb-8">The guides</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hubs.map((hub) => (<HubCard key={hub.slug} hub={hub} />))}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 border-t border-clinical/10">
          <h2 className="font-serif text-3xl text-clinical mb-8">Latest</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((p) => (<PostCard key={p.slug} post={p} />))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-12 border-t border-clinical/10">
        <EmailCapture />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-clinical/10">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-serif text-lg text-clinical mb-2">Every procedure cited.</h3>
            <p className="text-sm text-charcoal/70">Published nursing-education literature. No vibes.</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-clinical mb-2">Every calculator unit-tested.</h3>
            <p className="text-sm text-charcoal/70">Math in CI. No math bugs in production.</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-clinical mb-2">Printable cheat sheet on every technique post.</h3>
            <p className="text-sm text-charcoal/70">One page. Refrigerator-ready.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
