/**
 * Forbidden health-claim patterns under the EU Health Claims
 * Regulation (EC) No 1924/2006 and country-specific overlays
 * documented in the April 2026 compliance audit.
 *
 * Patterns are matched as whole-ish words against rendered content.
 * The audit script (scripts/audit-claims.mjs) consumes this list.
 */

export type ForbiddenClaim = {
  /** Locale this pattern applies to. "*" applies everywhere. */
  locale: "*" | "en" | "de" | "fr" | "it" | "es" | "nl" | "pl" | "sv" | "pt" | "ro" | "cs" | "no";
  /** Word/phrase fragment, lowercased. Match is `\b<pattern>\b`-like. */
  pattern: string;
  /** Free-form description for audit output. */
  reason: string;
};

export const FORBIDDEN_CLAIMS: ForbiddenClaim[] = [
  // English baseline
  { locale: "en", pattern: "treats", reason: "Medicinal claim ('treats <disease>') prohibited under Reg. 1924/2006." },
  { locale: "en", pattern: "cures", reason: "Medicinal claim ('cures') prohibited." },
  { locale: "en", pattern: "heals", reason: "Medicinal claim ('heals') prohibited." },
  { locale: "en", pattern: "prevents disease", reason: "Disease-prevention claim prohibited." },
  { locale: "en", pattern: "prevents cancer", reason: "Disease-prevention claim prohibited." },

  // German
  { locale: "de", pattern: "behandelt", reason: "Heilbehauptung ('behandelt') unzulässig (HWG / Reg. 1924/2006)." },
  { locale: "de", pattern: "heilt", reason: "Heilbehauptung ('heilt') unzulässig." },
  { locale: "de", pattern: "verhindert krankheit", reason: "Krankheitsverhütungsangabe unzulässig." },

  // French
  { locale: "fr", pattern: "traite", reason: "Allégation thérapeutique interdite (CJUE / Reg. 1924/2006)." },
  { locale: "fr", pattern: "guérit", reason: "Allégation thérapeutique interdite." },
  { locale: "fr", pattern: "prévient la maladie", reason: "Allégation de prévention de maladie interdite." },

  // Italian
  { locale: "it", pattern: "cura", reason: "Indicazione terapeutica vietata (Reg. 1924/2006 / Codice del Consumo)." },
  { locale: "it", pattern: "guarisce", reason: "Indicazione terapeutica vietata." },
  { locale: "it", pattern: "previene la malattia", reason: "Affermazione di prevenzione della malattia vietata." },

  // Spanish
  { locale: "es", pattern: "trata", reason: "Reivindicación terapéutica prohibida (Reg. 1924/2006)." },
  { locale: "es", pattern: "cura", reason: "Reivindicación terapéutica prohibida." },
  { locale: "es", pattern: "previene la enfermedad", reason: "Reivindicación de prevención de enfermedad prohibida." },

  // Dutch
  { locale: "nl", pattern: "geneest", reason: "Medische claim ('geneest') verboden (Reg. 1924/2006)." },
  { locale: "nl", pattern: "behandelt ziekte", reason: "Medische claim verboden." },

  // Polish
  { locale: "pl", pattern: "leczy", reason: "Niedozwolone oświadczenie lecznicze (Rozp. 1924/2006)." },
  { locale: "pl", pattern: "zapobiega chorobie", reason: "Niedozwolone oświadczenie o zapobieganiu chorobie." },

  // Swedish
  { locale: "sv", pattern: "botar", reason: "Otillåtet hälsopåstående (Förordning 1924/2006)." },
  { locale: "sv", pattern: "förebygger sjukdom", reason: "Otillåtet hälsopåstående om sjukdomsförebyggande." },

  // Portuguese
  { locale: "pt", pattern: "trata", reason: "Alegação terapêutica proibida (Reg. 1924/2006)." },
  { locale: "pt", pattern: "cura", reason: "Alegação terapêutica proibida." },
  { locale: "pt", pattern: "previne a doença", reason: "Alegação de prevenção de doença proibida." },

  // Romanian
  { locale: "ro", pattern: "tratează", reason: "Mențiune terapeutică interzisă (Reg. 1924/2006)." },
  { locale: "ro", pattern: "vindecă", reason: "Mențiune terapeutică interzisă." },
  { locale: "ro", pattern: "previne boala", reason: "Mențiune privind prevenirea bolii interzisă." },

  // Czech
  { locale: "cs", pattern: "léčí", reason: "Léčebné tvrzení zakázáno (nařízení 1924/2006)." },
  { locale: "cs", pattern: "vyléčí", reason: "Léčebné tvrzení zakázáno." },
  { locale: "cs", pattern: "předchází nemoci", reason: "Tvrzení o prevenci nemoci zakázáno." },

  // Norwegian
  { locale: "no", pattern: "helbreder", reason: "Helsepåstand om helbredelse forbudt (forordning 1924/2006)." },
  { locale: "no", pattern: "forebygger sykdom", reason: "Helsepåstand om sykdomsforebygging forbudt." },
];

/**
 * Returns the regex used by the audit script. Boundary handling is
 * lenient (Unicode word characters around the pattern) so that
 * accented forms still match.
 */
export function buildClaimRegex(pattern: string): RegExp {
  // Escape any regex metachars in the pattern, then wrap with lenient
  // word boundaries that accept letters/digits/diacritics on either
  // side as the boundary character set.
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, "iu");
}
