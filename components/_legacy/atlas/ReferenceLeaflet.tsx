/**
 * ReferenceLeaflet — folded technical-leaflet sidebar block for footnotes
 * and citations. Numbered references in dense small text on warm-paper
 * ground with a folded corner.
 */

export type LeafletRef = {
  label: string;
  url?: string;
  detail?: string;
};

export function ReferenceLeaflet({
  refs,
  title = "References · Leaflet",
  caption,
}: {
  refs: LeafletRef[];
  title?: string;
  caption?: string;
}) {
  return (
    <aside className="atlas-leaflet mt-12">
      <div className="atlas-label atlas-label-slate mb-3">{title}</div>
      {caption && (
        <p className="text-slate text-sm mb-4 leading-snug">{caption}</p>
      )}
      <ol>
        {refs.map((r, i) => (
          <li key={i}>
            <span className="text-ink-deep">
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-surgical underline underline-offset-2 decoration-ink/30 hover:decoration-surgical"
                >
                  {r.label}
                </a>
              ) : (
                r.label
              )}
              {r.detail && (
                <span className="block text-slate text-xs mt-0.5">{r.detail}</span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
