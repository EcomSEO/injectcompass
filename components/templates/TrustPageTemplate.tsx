import { ReactNode } from "react";
import { Breadcrumbs } from "../Breadcrumbs";
import { Eyebrow } from "../editorial/Eyebrow";
import { ClinicalRule } from "../editorial/DotRule";

export function TrustPageTemplate({
  title,
  eyebrow = "Editorial",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <Breadcrumbs
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <div className="mt-6">
        <Eyebrow tone="clinical">{eyebrow}</Eyebrow>
      </div>
      <h1 className="font-serif text-3xl md:text-5xl text-clinical-deep mt-3 leading-[1.08]">
        {title}
      </h1>
      <ClinicalRule className="mt-7" />
      <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-charcoal/90 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-clinical-deep [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-clinical-deep [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-clinical [&_a]:underline [&_strong]:text-clinical-deep">
        {children}
      </div>
    </article>
  );
}
