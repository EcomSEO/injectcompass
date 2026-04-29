import { HeroStitch } from "@/components/home/HeroStitch";
import { CoreProtocols } from "@/components/home/CoreProtocols";
import { MasterCalculator } from "@/components/home/MasterCalculator";
import { TheEssentials } from "@/components/home/TheEssentials";
import { ScienceBackedCallouts } from "@/components/home/ScienceBackedCallouts";
import { posts } from "@/lib/content/posts";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

/**
 * HomePage — re-skinned to the 2026-04-29 Stitch design (dark navy
 * ground + bright teal accent). Sections:
 *   - HeroStitch (BUSINESS-SECTION eyebrow + serif H1 + DoseCalculatorCard)
 *   - CoreProtocols (3 procedure-pillar cards, image-led)
 *   - MasterCalculator (vial -> syringe interactive with U-100 SVG)
 *   - TheEssentials (3 affiliate-supply cards with AffiliateLabel)
 *   - ScienceBackedCallouts (Two Independent Reviewers / Wrong-Source)
 *
 * Voice rules from CLAUDE.md preserved: clinical, neutral, no
 * vendor-funnel framing. Affiliate compliance preserved: AffiliateLabel
 * + rel="sponsored nofollow" on every Shop CTA. ZERO peptide-vendor
 * cross-sell. ZERO telehealth.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const corePosts = posts.filter((p) => p.status === "published").slice(0, 3);

  return (
    <main className="bg-midnight">
      <HeroStitch />
      <CoreProtocols posts={corePosts} />
      <MasterCalculator />
      <TheEssentials />
      <ScienceBackedCallouts />
    </main>
  );
}
