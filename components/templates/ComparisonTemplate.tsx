import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { relatedPosts } from "@/lib/content/posts";
import { Breadcrumbs } from "../Breadcrumbs";
import { ReviewStamp } from "../ReviewStamp";
import { AffiliateDisclosure } from "../AffiliateDisclosure";
import { AuthorBio } from "../AuthorBio";
import { RelatedPosts } from "../RelatedPosts";
import { SourcesList } from "../SourcesList";
import { EmailCapture } from "../EmailCapture";
import { PostReviewStamp } from "../MedicalDisclaimer";
import { ArticleJsonLd } from "../schema/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../schema/BreadcrumbJsonLd";
import { FaqJsonLd } from "../schema/FaqJsonLd";
import { ItemListJsonLd } from "../schema/ItemListJsonLd";
import { WideArticleShell } from "./PageShell";
import { Eyebrow } from "../editorial/Eyebrow";
import { DotRule, ClinicalRule } from "../editorial/DotRule";
import { TierBadge } from "../editorial/TierBadge";
import { MethodologyBlock } from "../editorial/MethodologyBlock";
import { WhatWouldChangeOurMind } from "../editorial/WhatWouldChangeOurMind";

export function ComparisonTemplate({ post }: { post: Post }) {
  const hub = getHub(post.hub);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/#hubs" },
    hub ? { label: hub.name, href: `/guides/${hub.slug}` } : { label: "" },
    { label: post.title },
  ];
  const related = relatedPosts(post);

  const skips = (post.products ?? []).filter((p) =>
    p.tier.toLowerCase().includes("skip")
  );
  const picks = (post.products ?? []).filter(
    (p) => !p.tier.toLowerCase().includes("skip")
  );

  return (
    <>
      <ArticleJsonLd
        path={`/${post.slug}`}
        headline={post.h1}
        description={post.description}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <BreadcrumbJsonLd crumbs={crumbs} />
      {post.faq && <FaqJsonLd faq={post.faq} />}
      {post.products && (
        <ItemListJsonLd
          items={post.products.map((p) => ({ rank: p.rank, name: p.name }))}
        />
      )}

      <WideArticleShell
        aside={
          <nav className="space-y-6">
            <div>
              <Eyebrow tone="stone">On this page</Eyebrow>
              <ul className="mt-3 space-y-2 text-[14px]">
                {post.ourPick && (
                  <li>
                    <a href="#our-pick" className="text-clinical-deep hover:text-clinical">
                      Reference pick
                    </a>
                  </li>
                )}
                <li>
                  <a href="#short-list" className="text-clinical-deep hover:text-clinical">
                    The ranked list
                  </a>
                </li>
                {skips.length > 0 && (
                  <li>
                    <a href="#skips" className="text-clinical-deep hover:text-clinical">
                      What we'd skip
                    </a>
                  </li>
                )}
                <li>
                  <a href="#methodology" className="text-clinical-deep hover:text-clinical">
                    Methodology
                  </a>
                </li>
                {post.faq && post.faq.length > 0 && (
                  <li>
                    <a href="#faq" className="text-clinical-deep hover:text-clinical">
                      FAQ
                    </a>
                  </li>
                )}
                <li>
                  <a href="#change-mind" className="text-clinical-deep hover:text-clinical">
                    What would revise this page
                  </a>
                </li>
                <li>
                  <a href="#sources" className="text-clinical-deep hover:text-clinical">
                    Sources
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-clinical/15">
              <Eyebrow tone="stone">The reference</Eyebrow>
              <dl className="mt-3 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between">
                  <dt className="text-stone">Compared</dt>
                  <dd className="text-clinical-deep num">{picks.length} products</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone">Cited</dt>
                  <dd className="text-clinical-deep num">
                    {(post.sources ?? []).length} sources
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone">Read time</dt>
                  <dd className="text-clinical-deep num">{post.readingTime} min</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone">Last updated</dt>
                  <dd className="text-clinical-deep num">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(post.updatedAt))}
                  </dd>
                </div>
              </dl>
            </div>
          </nav>
        }
      >
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Eyebrow tone="clinical">The Comparison</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {hub.shortName}</span>
          )}
        </div>

        <h1 className="display-headline text-clinical-deep mt-4 text-[2.15rem] md:text-[2.9rem] leading-[1.06]">
          {post.h1}
        </h1>

        <p className="mt-6 text-lg md:text-[1.18rem] text-charcoal/85 max-w-[60ch] leading-[1.55]">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ReviewStamp
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
        </div>

        {post.medicalDisclaimer === "required" && (
          <PostReviewStamp reviewedOn={post.updatedAt} />
        )}

        <div className="mt-4">
          <AffiliateDisclosure />
        </div>

        <ClinicalRule className="mt-10" />

        {/* Reference pick, hero callout with blue accent bar */}
        {post.ourPick && (
          <section id="our-pick" className="mt-10">
            <div className="relative overflow-hidden bg-paper border border-clinical/30 rounded-sm p-7 md:p-10">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-clinical" />
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <TierBadge tier={post.ourPick.tier} />
                <Eyebrow tone="clinical">Reference pick</Eyebrow>
              </div>
              <h2 className="font-serif text-[1.8rem] md:text-[2.2rem] text-clinical-deep leading-[1.1]">
                {post.ourPick.name}
              </h2>
              <p className="mt-5 text-[16px] text-charcoal/90 leading-relaxed max-w-[62ch]">
                {post.ourPick.reason}
              </p>
            </div>
          </section>
        )}

        {/* Ranked reference list */}
        {picks.length > 0 && (
          <section id="short-list" className="mt-14">
            <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
              <div>
                <Eyebrow tone="clinical">The ranked list</Eyebrow>
                <h2 className="font-serif text-3xl text-clinical-deep mt-2 leading-tight">
                  Referenced across the literature, in order.
                </h2>
              </div>
              <div className="caps-label text-stone">
                {picks.length} references
              </div>
            </div>

            <ol className="space-y-4">
              {picks.map((p) => {
                const isFirst = p.rank === 1;
                return (
                  <li
                    key={p.rank}
                    id={`pick-${p.rank}`}
                    className={`relative bg-paper border rounded-sm p-6 md:p-7 transition ${
                      isFirst
                        ? "border-clinical/45 shadow-soft"
                        : "border-clinical/15 hover:border-clinical/35"
                    }`}
                  >
                    {isFirst && (
                      <span
                        aria-hidden
                        className="absolute top-0 left-0 w-1 h-full bg-clinical"
                      />
                    )}
                    <div className="grid grid-cols-[auto_1fr] gap-5 md:gap-7">
                      <div className="flex flex-col items-start pt-1">
                        <span className="rank-numeral">
                          {String(p.rank).padStart(2, "0")}
                        </span>
                        <div className="mt-2 h-0.5 w-7 bg-clinical/40 rounded-full" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <TierBadge tier={p.tier} />
                        </div>
                        <h3 className="font-serif text-[1.4rem] text-clinical-deep leading-tight">
                          {p.name}
                        </h3>
                        <p className="mt-3 text-[15.5px] text-charcoal/85 leading-relaxed">
                          {p.summary}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {skips.length > 0 && (
          <section id="skips" className="mt-14">
            <div className="bg-stone/[0.04] border border-stone/20 rounded-sm p-7 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-stone" />
                <Eyebrow tone="stone">What we'd skip, and why</Eyebrow>
              </div>
              <div className="space-y-5">
                {skips.map((p) => (
                  <div
                    key={p.rank}
                    className="pl-5 border-l-2 border-stone/40"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-lg text-clinical-deep">
                        {p.name}
                      </h3>
                      <TierBadge tier={p.tier} />
                    </div>
                    <p className="text-[14.5px] text-charcoal/85 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div id="methodology">
          <MethodologyBlock />
        </div>

        {post.faq && post.faq.length > 0 && (
          <section id="faq" className="mt-14">
            <Eyebrow tone="clinical">The FAQ</Eyebrow>
            <h2 className="font-serif text-3xl text-clinical-deep mt-2 mb-6 leading-tight">
              What the literature answers next.
            </h2>
            <dl className="divide-y divide-clinical/15 border-y border-clinical/15">
              {post.faq.map((f, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-[1fr_2fr] gap-5 py-6 first:pt-0 last:pb-0"
                >
                  <dt className="font-serif text-lg text-clinical-deep leading-snug">
                    {f.q}
                  </dt>
                  <dd className="text-[15.5px] text-charcoal/85 leading-relaxed">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div id="change-mind">
          <WhatWouldChangeOurMind>
            <p>
              A new manufacturer Instructions-for-Use revision. A peer-reviewed
              injection-technique paper that reports a different outcome. An
              FDA label update. A change to USP chapter guidance. We revise
              this page within a week of the cited source changing and mark
              what changed at the bottom.
            </p>
          </WhatWouldChangeOurMind>
        </div>

        <DotRule className="my-14" />

        <div id="sources">
          <SourcesList sources={post.sources ?? []} />
        </div>

        <AuthorBio />
        <RelatedPosts posts={related} />

        <div className="mt-14">
          <EmailCapture variant="end-of-article" />
        </div>
      </WideArticleShell>
    </>
  );
}
