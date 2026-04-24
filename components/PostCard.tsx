import Link from "next/link";
import type { Post } from "@/lib/content/posts";
import { getHub } from "@/lib/content/hubs";

const typeLabel: Record<Post["postType"], string> = {
  pillar: "Guide",
  comparison: "Comparison",
  cluster: "Explainer",
  listicle: "Reference list",
};

export function PostCard({
  post,
  variant = "compact",
}: {
  post: Post;
  variant?: "compact" | "feature";
}) {
  const hub = getHub(post.hub);
  if (variant === "feature") {
    return (
      <Link
        href={`/${post.slug}`}
        className="group block p-7 md:p-8 bg-paper border border-clinical/20 rounded-sm hover:border-clinical/40 transition"
      >
        <div className="caps-label text-clinical mb-2">
          {hub?.shortName} · {typeLabel[post.postType]}
        </div>
        <h3 className="font-serif text-[1.55rem] text-clinical-deep mt-1 mb-3 leading-tight group-hover:text-clinical transition">
          {post.title}
        </h3>
        <p className="text-charcoal/85 text-[15px] leading-relaxed">
          {post.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-clinical text-sm font-medium">
          Read the reference <span aria-hidden>→</span>
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={`/${post.slug}`}
      className="group block p-5 bg-paper border border-clinical/15 rounded-sm hover:border-clinical/35 transition h-full"
    >
      <div className="caps-label text-stone">
        {hub?.shortName} · {typeLabel[post.postType]}
      </div>
      <h3 className="font-serif text-lg text-clinical-deep mt-2 mb-2 leading-snug group-hover:text-clinical transition">
        {post.title}
      </h3>
      <p className="text-sm text-charcoal/70 line-clamp-2 leading-relaxed">
        {post.description}
      </p>
      <span className="mt-3 inline-block text-xs num text-stone">
        {post.readingTime} min read
      </span>
    </Link>
  );
}
