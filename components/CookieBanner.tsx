"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pfl:cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // ignore
    }
  }, []);

  function accept(choice: "accept" | "reject") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 bg-paper-soft border border-clinical/25 rounded-sm shadow-card p-4"
    >
      <p className="text-sm text-charcoal/90 leading-relaxed">
        We use a small number of cookies for analytics and session continuity.
        No advertising cookies. See our{" "}
        <a
          href="/privacy"
          className="underline text-clinical-deep hover:text-clinical focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical focus-visible:ring-offset-2"
        >
          Privacy Policy
        </a>
        .
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => accept("reject")}
          className="text-sm min-h-[44px] px-4 py-2 text-charcoal/70 hover:text-clinical-deep cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical focus-visible:ring-offset-2"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => accept("accept")}
          className="text-sm min-h-[44px] px-4 py-2 rounded-sm bg-clinical text-paper hover:bg-clinical-deep cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical focus-visible:ring-offset-2"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
