export function AuthorBio() {
  return (
    <section className="mt-14 p-6 md:p-7 border border-clinical/20 rounded-sm bg-paper">
      <div className="caps-label text-clinical mb-3">The editorial team</div>
      <h3 className="font-serif text-lg text-clinical-deep mb-3">
        About The InjectCompass Editorial Team
      </h3>
      <p className="text-charcoal/85 leading-relaxed text-[15px]">
        The InjectCompass Editorial Team is a small group of writers working
        from published nursing-education literature, manufacturer package
        inserts, and peer-reviewed injection-technique research. Our content is
        reviewed against published best practice before publication. We are
        adding a named credentialed reviewer (RN, NP, or PharmD) to the
        masthead; until then, readers should verify all guidance with their own
        prescriber and the manufacturer package insert that came with their
        medication. If you spot an error, write to corrections@injectcompass.com
        — we want to know.
      </p>
    </section>
  );
}
