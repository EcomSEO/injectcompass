import { postBodies, PostSection } from "@/lib/content/post-bodies";

export function PostBodyRenderer({ slug }: { slug: string }) {
  const body = postBodies[slug];
  if (!body) {
    return (
      <div className="prose prose-lg mt-8 text-charcoal/60 italic">
        <p>Content for this post is in editorial review. See related posts below.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <p className="text-lg text-charcoal leading-relaxed">{body.intro}</p>
      {body.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} />
      ))}
    </div>
  );
}

function SectionRenderer({ section }: { section: PostSection }) {
  const { heading, kind = "prose", body, items, sources } = section;

  if (kind === "callout-red") {
    return (
      <aside className="my-8 p-5 border-l-4 border-alert bg-alert/5 rounded-r">
        {heading && (
          <p className="font-serif text-lg text-alert font-semibold mb-2">{heading}</p>
        )}
        {items && (
          <ul className="list-disc pl-5 space-y-1 text-charcoal/90">
            {items.map((item, i) => (<li key={i}>{item}</li>))}
          </ul>
        )}
      </aside>
    );
  }

  if (kind === "callout-amber") {
    return (
      <aside className="my-8 p-5 border-l-4 border-amber bg-amber/5 rounded-r">
        {heading && (
          <p className="font-serif text-lg text-clinical font-semibold mb-2">{heading}</p>
        )}
        {items && (
          <ul className="list-disc pl-5 space-y-1 text-charcoal/90">
            {items.map((item, i) => (<li key={i}>{item}</li>))}
          </ul>
        )}
        {body && <p className="text-charcoal/90">{body}</p>}
      </aside>
    );
  }

  if (kind === "steps" && items) {
    return (
      <section className="mt-10">
        {heading && (
          <h2 className="font-serif text-2xl text-clinical mb-4">{heading}</h2>
        )}
        <ol className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-clinical text-paper font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-1 text-charcoal/90 leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (kind === "sources" && sources) {
    return (
      <section className="mt-10 pt-8 border-t border-clinical/10">
        <h2 className="font-serif text-xl text-clinical mb-4">{heading ?? "Sources"}</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-charcoal/80">
          {sources.map((source, i) => (
            <li key={i}>
              {source.url ? (
                <a
                  href={source.url}
                  rel="noopener"
                  target="_blank"
                  className="text-clinical hover:underline"
                >
                  {source.label}
                </a>
              ) : (
                source.label
              )}
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section className="mt-10">
      {heading && (
        <h2 className="font-serif text-2xl text-clinical mb-3">{heading}</h2>
      )}
      {body && <p className="text-charcoal/90 leading-relaxed">{body}</p>}
      {items && (
        <ul className="list-disc pl-5 space-y-1 text-charcoal/90">
          {items.map((item, i) => (<li key={i}>{item}</li>))}
        </ul>
      )}
    </section>
  );
}
