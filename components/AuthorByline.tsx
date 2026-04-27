/**
 * AuthorByline — avatar + author name + credentials + reviewer + date.
 * Stacks cleanly on mobile.
 *
 * If `avatarUrl` is provided, the round avatar shows the real headshot;
 * otherwise it falls back to a teal-pill with author initials.
 *
 * Date formatting is locked to en-US in UTC so the SSR markup matches
 * what the client renders on hydration (avoids React #418 hydration
 * warnings driven by browser-locale or timezone variance).
 */
export function AuthorByline({
  authorName,
  authorCredentials,
  authorHref = "/editorial-standards",
  reviewedBy,
  reviewerCredentials,
  date,
  initials,
  avatarUrl,
}: {
  authorName: string;
  authorCredentials?: string;
  authorHref?: string;
  reviewedBy?: string;
  reviewerCredentials?: string;
  date: string;
  initials?: string;
  avatarUrl?: string | null;
}) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
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
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt=""
          aria-hidden
          className="w-10 h-10 rounded-pill object-cover shrink-0 border border-rule"
          width={40}
          height={40}
        />
      ) : (
        <div
          aria-hidden
          className="w-10 h-10 rounded-pill bg-teal-50 text-teal-700 flex items-center justify-center text-[13px] font-semibold shrink-0"
        >
          {computedInitials}
        </div>
      )}
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
