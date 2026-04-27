import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { relatedPosts } from "@/lib/content/posts";
import { Breadcrumbs } from "../Breadcrumbs";
import { ReviewStamp } from "../ReviewStamp";
import { AuthorBio } from "../AuthorBio";
import { RelatedPosts } from "../RelatedPosts";
import { SourcesList } from "../SourcesList";
import { EmailCapture } from "../EmailCapture";
import { PostBodyRenderer } from "../PostBodyRenderer";
import { PostReviewStamp } from "../MedicalDisclaimer";
import { ArticleJsonLd } from "../schema/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../schema/BreadcrumbJsonLd";
import { FaqJsonLd } from "../schema/FaqJsonLd";
import { ArticleShell } from "./PageShell";
import { Eyebrow } from "../editorial/Eyebrow";
import { DotRule, ClinicalRule } from "../editorial/DotRule";
import { KeyTakeaway } from "../editorial/KeyTakeaway";

export function ClusterTemplate({ post }: { post: Post }) {
  const hub = getHub(post.hub);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/#hubs" },
    hub ? { label: hub.name, href: `/guides/${hub.slug}` } : { label: "" },
    { label: post.title },
  ];
  const related = relatedPosts(post);

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

      <ArticleShell>
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Eyebrow tone="clinical">The Explainer</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {hub.shortName}</span>
          )}
        </div>

        <h1 className="display-headline text-clinical-deep mt-4 text-[2rem] md:text-[2.6rem] leading-[1.08]">
          {post.h1}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <ReviewStamp
            updatedAt={post.updatedAt}
            readingTime={post.readingTime}
          />
        </div>

        {post.medicalDisclaimer === "required" && (
          <PostReviewStamp reviewedOn={post.updatedAt} />
        )}

        <ClinicalRule className="mt-7" />

        <p className="mt-8 text-[1.06rem] leading-[1.72] text-charcoal/90 max-w-[62ch]">
          {post.description}
        </p>

        <KeyTakeaway variant="key-takeaway" title="The short answer">
          The direct-answer paragraph sits here for readers who need the answer
          now. The rest of the page earns that answer, with numbered steps,
          published sources, and the edge cases that matter.
        </KeyTakeaway>

        <PostBodyRenderer slug={post.slug} />

        {post.faq && post.faq.length > 0 && (
          <section className="mt-12">
            <Eyebrow tone="clinical">The FAQ</Eyebrow>
            <h2 className="font-serif text-2xl md:text-[1.65rem] text-clinical-deep mt-2 mb-5 leading-tight">
              What the literature answers next.
            </h2>
            <dl className="divide-y divide-clinical/15 border-y border-clinical/15">
              {post.faq.map((f, i) => (
                <div key={i} className="py-5 first:pt-0 last:pb-0">
                  <dt className="font-serif text-lg text-clinical-deep leading-snug mb-2">
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

        <DotRule className="my-12" />

        <SourcesList sources={post.sources ?? []} />
        <AuthorBio />
        <RelatedPosts posts={related} />

        <div className="mt-12">
          <EmailCapture variant="end-of-article" />
        </div>
      </ArticleShell>
    </>
  );
}
