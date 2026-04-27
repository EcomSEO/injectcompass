/**
 * Mid-article newsletter inline CTA. teal-50 bg, headline, email input + button.
 * No vendor wired — just shape (form posts to /newsletter).
 */
export function NewsletterInline({
  headline = "Get evidence-based injection guidance",
  dek = "One short, well-cited brief in your inbox each week. Free, no spam, unsubscribe anytime.",
}: {
  headline?: string;
  dek?: string;
}) {
  return (
    <aside className="my-10 rounded-md bg-teal-50 border border-teal-100 p-6 md:p-8">
      <div className="md:flex md:items-center md:gap-8">
        <div className="md:flex-1">
          <div className="eyebrow mb-2">Newsletter</div>
          <h3 className="text-[20px] md:text-[22px] font-bold text-ink leading-snug">
            {headline}
          </h3>
          <p className="mt-2 text-[15px] text-ink-muted leading-relaxed">{dek}</p>
        </div>
        <form
          action="/newsletter"
          method="get"
          className="mt-5 md:mt-0 md:w-[360px] flex gap-2"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            aria-label="Email address"
            className="flex-1 h-11 px-4 rounded-pill bg-white border border-rule focus:border-teal-500 outline-none text-[14px] text-ink placeholder:text-ink-soft"
          />
          <button
            type="submit"
            className="h-11 px-5 rounded-pill bg-teal-500 text-white text-[14px] font-semibold hover:bg-teal-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
