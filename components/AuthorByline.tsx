/**
 * AuthorByline — avatar + author name + credentials + reviewer + date.
 * Stacks cleanly on mobile.
 */
export function AuthorByline({
  authorName,
  authorCredentials,
  authorHref = "/editorial-standards",
  reviewedBy,
  reviewerCredentials,
  date,
  initials,
}: {
  authorName: string;
  authorCredentials?: string;
  authorHref?: string;
  reviewedBy?: string;
  reviewerCredentials?: string;
  date: string;
  initials?: string;
}) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const computedInitials =
    initials ??
    authorName
      .split(" ")
      .slice(0, 2)
      .map((s) => s[0])
      .join("")
      .toUpperCase();

  return (
    <div className="flex items-start gap-3">
      <div
        aria-hidden
        className="w-10 h-10 rounded-pill bg-teal-50 text-teal-700 flex items-center justify-center text-[13px] font-semibold shrink-0"
      >
        {computedInitials}
      </div>
      <div className="text-[14px] leading-relaxed">
        <div className="text-ink">
          By{" "}
          <a href={authorHref} className="font-semibold hover:text-teal-700">
            {authorName}
          </a>
          {authorCredentials && (
            <span className="text-ink-muted">, {authorCredentials}</span>
          )}
        </div>
        <div className="text-ink-muted">
          {reviewedBy && (
            <>
              Reviewed by{" "}
              <span className="text-ink">
                {reviewedBy}
                {reviewerCredentials ? `, ${reviewerCredentials}` : ""}
              </span>
              {" · "}
            </>
          )}
          <time dateTime={date}>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
}
