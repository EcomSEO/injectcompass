export function SourcesList({
  sources,
}: {
  sources: Array<{ label: string; url: string }>;
}) {
  if (!sources || sources.length === 0) return null;
  return (
    <section className="mt-12 pt-8 border-t border-clinical/20">
      <div className="caps-label text-clinical mb-3">References</div>
      <h2 className="font-serif text-xl text-clinical-deep mb-4">Sources</h2>
      <ol className="list-decimal pl-5 space-y-2.5 text-[14.5px] text-charcoal/85">
        {sources.map((s, i) => (
          <li key={i}>
            <a
              href={s.url}
              rel="noopener"
              target="_blank"
              className="text-clinical underline underline-offset-2 hover:text-clinical-deep"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
