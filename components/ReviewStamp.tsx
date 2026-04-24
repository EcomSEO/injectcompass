export function ReviewStamp({
  updatedAt,
  readingTime,
  author = "The InjectCompass Editorial Team",
}: {
  updatedAt: string;
  readingTime: number;
  author?: string;
}) {
  const formatted = new Date(updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <p className="text-[12.5px] text-stone flex flex-wrap items-center gap-2">
      <span className="caps-label text-stone">By</span>
      <span className="text-clinical-deep">{author}</span>
      <span aria-hidden className="text-clinical/35">·</span>
      <span className="caps-label text-stone">Updated</span>
      <span className="num text-clinical-deep">{formatted}</span>
      <span aria-hidden className="text-clinical/35">·</span>
      <span className="num text-clinical-deep">{readingTime} min read</span>
    </p>
  );
}
