import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { IMPRESSUM } from "@/lib/content/impressum";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") return {};
  return pageMetadata({
    title: "Impressum",
    description:
      "Impressum und Anbieterkennzeichnung gemäß § 5 TMG / § 18 Abs. 2 MStV.",
    path: "/impressum",
  });
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Impressum is a German legal requirement; for non-DE locales we
  // redirect to the privacy page so the URL is never a dead end.
  if (locale !== "de") {
    redirect("/privacy");
  }

  return (
    <TrustPageTemplate title="Impressum">
      <h2>Anbieter</h2>
      <p>
        {IMPRESSUM.operator}<br />
        {IMPRESSUM.address}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${IMPRESSUM.email}`}>{IMPRESSUM.email}</a>
        <br />
        Telefon: {IMPRESSUM.phone}
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {IMPRESSUM.responsiblePerson}<br />
        {IMPRESSUM.address}
      </p>

      <h2>Registereintrag</h2>
      <p>{IMPRESSUM.registry}</p>

      <h2>Umsatzsteuer-ID</h2>
      <p>{IMPRESSUM.vatId}</p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">
          ec.europa.eu/consumers/odr
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht
        bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
        die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
        jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
        Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
        Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
        Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Eine maschinelle Auswertung im
        Sinne des § 44b UrhG zur Schulung generativer KI-Modelle ist
        ausdrücklich nicht gestattet.
      </p>

      <h2>Hinweis zu medizinischen Inhalten</h2>
      <p>
        Die auf injectcompass.com bereitgestellten Inhalte dienen
        ausschließlich der Patientenaufklärung und ersetzen keine ärztliche
        oder pharmazeutische Beratung. Konsultieren Sie stets eine
        verschreibungsberechtigte Ärztin oder einen verschreibungsberechtigten
        Arzt, bevor Sie eine Injektionstherapie beginnen, ändern oder beenden.
      </p>
    </TrustPageTemplate>
  );
}
