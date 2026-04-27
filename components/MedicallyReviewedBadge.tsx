import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

/**
 * Healthline signature trust badge.
 * Pill: teal-50 bg, teal-700 text, check icon, links the reviewer name.
 *
 * Optional `imageUrl` slot for a real reviewer avatar; falls back to the
 * shield icon if not provided. Reviewer initials are shown when there is
 * no avatar but the caller passes `showInitials`.
 */
export async function MedicallyReviewedBadge({
  reviewerName,
  credentials,
  reviewerHref = "/editorial-standards",
  imageUrl,
}: {
  reviewerName: string;
  credentials: string;
  reviewerHref?: string;
  imageUrl?: string;
}) {
  const t = await getTranslations("trust");
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-reviewed-bg text-reviewed-text text-[13px] font-medium">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className="w-5 h-5 rounded-full object-cover shrink-0"
        />
      ) : (
        <CheckShield className="w-4 h-4 shrink-0" />
      )}
      <span>
        {t("medically_reviewed_by")}{" "}
        <Link
          href={reviewerHref}
          className="underline decoration-teal-600/30 hover:decoration-teal-700 underline-offset-2"
        >
          {reviewerName}, {credentials}
        </Link>
      </span>
    </div>
  );
}

function CheckShield({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M8 1.5 2.5 3.5v4c0 3 2.3 5.7 5.5 7 3.2-1.3 5.5-4 5.5-7v-4L8 1.5Z"
        fill="currentColor"
        opacity="0.18"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="m5.5 8 2 2 3.5-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
