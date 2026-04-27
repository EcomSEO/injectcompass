"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Eyebrow } from "@/components/editorial/Eyebrow";
import { ClinicalRule } from "@/components/editorial/DotRule";

/**
 * Runtime error boundary. Clinical-reference voice — reassuring, never
 * alarmist. The Header + Footer are applied by the root layout; this
 * component renders <main> only.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for observability; never surface raw errors to the reader.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="border-b border-clinical/15">
        <div className="mx-auto max-w-6xl px-6 pt-14 md:pt-20 pb-14 md:pb-20">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8 fade-up">
              <Eyebrow tone="alert">Error &middot; System check</Eyebrow>

              <h1 className="display-headline text-clinical-deep mt-5 text-[2.4rem] sm:text-5xl md:text-[3.6rem] leading-[1.06]">
                Something broke on our side.
              </h1>

              <div className="mt-8 max-w-2xl text-charcoal/85 text-[17px] leading-[1.7] space-y-4">
                <p>
                  The page you requested didn&apos;t finish loading. This is
                  our problem, not yours. It does not affect any information
                  you have saved or printed from this site.
                </p>
                <p>
                  Try reloading the page first. If it happens again, the home
                  page and the five reference hubs are reachable from the
                  buttons below. Nothing you were reading has been lost.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="btn-primary"
                >
                  Try again <span aria-hidden>&rarr;</span>
                </button>
                <Link href="/" className="btn-secondary">
                  Back to home
                </Link>
              </div>
            </div>

            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-clinical/15 fade-up-delay-1">
              <div className="eyebrow text-stone mb-4">Status</div>
              <dl className="space-y-3 text-[14px]">
                <div className="flex items-baseline gap-3">
                  <dt className="caps-label text-stone w-24 shrink-0">State</dt>
                  <dd className="text-clinical-deep">Application error</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="caps-label text-stone w-24 shrink-0">Scope</dt>
                  <dd className="text-clinical-deep">
                    This page only &mdash; the rest of the site is unaffected
                  </dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="caps-label text-stone w-24 shrink-0">Action</dt>
                  <dd className="text-clinical-deep">
                    Reload, or return to the home page
                  </dd>
                </div>
                {error?.digest && (
                  <div className="flex items-baseline gap-3 pt-2 border-t border-clinical/15">
                    <dt className="caps-label text-stone w-24 shrink-0">Ref</dt>
                    <dd className="num text-stone text-xs break-all">
                      {error.digest}
                    </dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <ClinicalRule />
          <p className="mt-6 caps-label text-stone">
            InjectCompass &middot; System check &middot;{" "}
            <span className="num normal-case tracking-normal">Error</span>
          </p>
        </div>
      </section>
    </main>
  );
}
