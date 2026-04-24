type Tier =
  | "Category reference"
  | "Primary reference"
  | "Clinical reference"
  | "Pen-device reference"
  | "Longer-length reference"
  | "Budget reference"
  | "Travel reference"
  | "High-volume reference"
  | "Mail-back reference"
  | "Non-commercial reference"
  | "Reference text"
  | "Skip"
  | string;

function classFor(tier: string): string {
  const t = tier.toLowerCase();
  if (t.includes("skip") || t.includes("avoid")) return "tier-badge tier-badge-skip";
  if (t.includes("budget")) return "tier-badge tier-badge-budget";
  if (t.includes("category") || t.includes("primary")) return "tier-badge";
  if (t.includes("reference")) return "tier-badge tier-badge-mid";
  return "tier-badge";
}

export function TierBadge({ tier }: { tier: Tier }) {
  return <span className={classFor(tier)}>{tier}</span>;
}
