"use client";

import { FormEvent, useState } from "react";

export function EmailCapture({
  headline = "Your First Injection, a one-page cheat sheet.",
  subhead = "A printable, step-numbered PDF covering supplies, technique, site rotation, and the three questions to ask your prescriber. Free.",
  variant = "inline",
  buttonLabel = "Send me the cheat sheet",
}: {
  headline?: string;
  subhead?: string;
  variant?: "inline" | "end-of-article";
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 400));
    setStatus("ok");
  }

  const wrapper =
    variant === "end-of-article"
      ? "my-12 p-8 rounded-sm bg-clinical-tint/60 border border-clinical/20"
      : "my-10 p-8 rounded-sm bg-paper border border-clinical/20";

  return (
    <section id="email-capture" className={wrapper}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="caps-label text-clinical mb-2">The Dispatch</div>
        <h2 className="font-serif text-2xl md:text-[1.85rem] text-clinical-deep leading-tight">
          {headline}
        </h2>
        <p className="mt-3 text-charcoal/80 leading-relaxed">{subhead}</p>
        {status === "ok" ? (
          <p className="mt-6 text-clinical-deep font-serif italic">
            Thank you, check your inbox for the one-page cheat sheet.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="email-field flex-1 relative">
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-sm border border-clinical/25 border-b-paper-rule px-4 py-3 bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary justify-center disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : buttonLabel}
            </button>
          </form>
        )}
        <p className="mt-4 text-xs text-stone max-w-md mx-auto">
          By subscribing, you agree to our{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          . One practical email per week. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
