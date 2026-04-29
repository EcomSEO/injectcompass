import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * 301 redirects for slugs that belong on sister sites per the
 * 2026-04-29 topic-boundary lock. Inbound links to research-peptide
 * compounds (BPC-157, TB-500, etc.) on injectcompass were 404-ing
 * (e.g. /bpc-157 reported by the operator on 2026-04-29). Those
 * compounds live on pepvise.com. Telling the browser the new
 * canonical home preserves SEO equity instead of soft-404-ing.
 *
 * GLP-1 patient-education slugs route to peptips.com under the same
 * lock (peptips owns "what is X" / "ozempic vs Y" / side-effect
 * management; injectcompass keeps procedure + technique only).
 */
const RESEARCH_PEPTIDE_SLUGS = [
  "bpc-157",
  "tb-500",
  "ghk-cu",
  "ghk-cu-peptide",
  "mots-c",
  "aod-9604",
  "cjc-1295",
  "ipamorelin",
  "tesamorelin",
  "sermorelin",
];

const GLP1_PATIENT_ED_SLUGS = [
  "ozempic-vs-wegovy",
  "wegovy-vs-zepbound",
  "mounjaro-vs-ozempic",
  "what-is-ozempic",
  "what-is-wegovy",
  "what-is-mounjaro",
  "what-is-tirzepatide",
  "what-is-semaglutide",
  "ozempic-side-effects",
  "wegovy-side-effects",
  "mounjaro-side-effects",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    const localePrefix = "/:locale(de|fr|it|es|nl|pl|sv|pt|ro|cs|no)";
    return [
      ...RESEARCH_PEPTIDE_SLUGS.flatMap((slug) => [
        {
          source: `/${slug}`,
          destination: `https://pepvise.com/${slug}`,
          permanent: true,
        },
        {
          source: `${localePrefix}/${slug}`,
          destination: `https://pepvise.com/:locale/${slug}`,
          permanent: true,
        },
      ]),
      ...GLP1_PATIENT_ED_SLUGS.flatMap((slug) => [
        {
          source: `/${slug}`,
          destination: `https://peptips.com/${slug}`,
          permanent: true,
        },
        {
          source: `${localePrefix}/${slug}`,
          destination: `https://peptips.com/:locale/${slug}`,
          permanent: true,
        },
      ]),
    ];
  },
};

export default withNextIntl(nextConfig);
