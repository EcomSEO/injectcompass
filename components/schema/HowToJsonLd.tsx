import { SITE } from "@/lib/content/site";
import { canonical } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type HowToStep = {
  /** Step heading (rendered into HowToStep.name). */
  name: string;
  /** Step body / description (rendered into HowToStep.text). */
  text: string;
  /** Optional schematic illustration only — never needle-in-skin photography. */
  image?: string;
};

/**
 * HowTo JSON-LD for technique / procedure articles.
 *
 * Per `_shared/schema-library.md` §11 + the brand-book §12, every
 * step-numbered technique post emits HowTo. Step images are schematic
 * illustrations or DrugImage references only — never needle-in-skin
 * photography. Caller is responsible for filtering out non-procedure
 * posts before rendering this component.
 */
export function HowToJsonLd({
  path,
  name,
  description,
  totalTimeIso = "PT5M",
  supplies = [],
  tools = [],
  steps,
}: {
  path: string;
  name: string;
  description: string;
  totalTimeIso?: string;
  supplies?: string[];
  tools?: string[];
  steps: HowToStep[];
}) {
  if (!steps || steps.length === 0) return null;
  const url = canonical(path);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        totalTime: totalTimeIso,
        supply: supplies.map((s) => ({ "@type": "HowToSupply", name: s })),
        tool: tools.map((t) => ({ "@type": "HowToTool", name: t })),
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${url}#step${i + 1}`,
          image: s.image
            ? s.image.startsWith("http")
              ? s.image
              : `${SITE.url}${s.image}`
            : undefined,
        })),
      }}
    />
  );
}
