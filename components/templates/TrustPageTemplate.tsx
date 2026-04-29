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
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Breadcrumbs
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <div className="mt-8">
        <Eyebrow tone="clinical">{eyebrow}</Eyebrow>
      </div>
      <h1 className="font-serif text-display-lg text-on-dark mt-4 leading-[1.08]">
        {title}
      </h1>
      <ClinicalRule className="mt-8" />
      <div className="mt-10 space-y-6 text-body text-on-dark-muted leading-relaxed [&_h2]:font-serif [&_h2]:text-h2 [&_h2]:text-on-dark [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-h3 [&_h3]:text-on-dark [&_h3]:mt-8 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:marker:text-aqua/60 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:marker:text-aqua/60 [&_a]:text-aqua [&_a]:underline [&_a]:decoration-aqua/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-aqua [&_a]:transition-colors [&_strong]:text-on-dark [&_strong]:font-semibold [&_blockquote]:border-l-2 [&_blockquote]:border-aqua [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-on-dark [&_code]:bg-midnight-card [&_code]:text-aqua [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.95em] [&_code]:font-mono">
        {children}
      </div>
    </article>
  );
}
