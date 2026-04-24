import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";
import { relatedPosts } from "@/lib/content/posts";
import { Breadcrumbs } from "../Breadcrumbs";
import { ReviewStamp } from "../ReviewStamp";
import { AuthorBio } from "../AuthorBio";
import { RelatedPosts } from "../RelatedPosts";
import { SourcesList } from "../SourcesList";
import { EmailCapture } from "../EmailCapture";
import { PostReviewStamp } from "../MedicalDisclaimer";
import { ArticleJsonLd } from "../schema/ArticleJsonLd";
import { BreadcrumbJsonLd } from "../schema/BreadcrumbJsonLd";
import { ItemListJsonLd } from "../schema/ItemListJsonLd";
import { ArticleShell } from "./PageShell";
import { Eyebrow } from "../editorial/Eyebrow";
import { DotRule, ClinicalRule } from "../editorial/DotRule";

export function ListicleTemplate({ post }: { post: Post }) {
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
      {post.items && (
        <ItemListJsonLd
          items={post.items.map((i) => ({ rank: i.rank, name: i.name }))}
        />
      )}

      <ArticleShell>
        <Breadcrumbs crumbs={crumbs} />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Eyebrow tone="clinical">The Reference List</Eyebrow>
          {hub && (
            <span className="caps-label text-stone">· {hub.shortName}</span>
          )}
        </div>

        <h1 className="display-headline text-clinical-deep mt-4 text-[2rem] md:text-[2.65rem] leading-[1.06]">
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

        <p className="mt-7 text-[1.06rem] md:text-[1.12rem] leading-[1.65] text-charcoal/90 max-w-[60ch]">
          {post.description}
        </p>

        {post.items && post.items.length > 0 && (
          <ol className="mt-12 space-y-0 border-t border-clinical/15">
            {post.items.map((item) => (
              <li
                key={item.rank}
                className="grid grid-cols-[auto_1fr] gap-5 md:gap-7 py-7 border-b border-clinical/15"
              >
                <div className="pt-1">
                  <span className="step-numeral tnum">
                    {String(item.rank).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h2 className="font-serif text-[1.3rem] md:text-[1.45rem] text-clinical-deep leading-snug">
                    {item.name}
                  </h2>
                  <p className="mt-2.5 text-[15px] text-charcoal/85 leading-relaxed max-w-[62ch]">
                    {item.summary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}

        <DotRule className="my-14" />

        <SourcesList sources={post.sources ?? []} />
        <AuthorBio />
        <RelatedPosts posts={related} />

        <div className="mt-14">
          <EmailCapture variant="end-of-article" />
        </div>
      </ArticleShell>
    </>
  );
}
