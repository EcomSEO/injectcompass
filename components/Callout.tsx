/**
 * Legacy <Callout> kept for backwards compatibility with PostBodyRenderer.
 * New code should use <ClinicalCallout> from components/editorial/ClinicalCallout.tsx.
 */

import type { ReactNode } from "react";
import { ClinicalCallout } from "./editorial/ClinicalCallout";

type Variant = "note" | "key-takeaway" | "warning" | "source";

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  const mapped =
    variant === "warning" ? "caution" : variant === "key-takeaway" ? "tip" : "check";
  return (
    <ClinicalCallout variant={mapped as "caution" | "tip" | "check"} title={title}>
      {children}
    </ClinicalCallout>
  );
}
