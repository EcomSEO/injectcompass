/**
 * Per-locale cookie policy + the canonical cookie inventory.
 */

import type { Locale } from "@/i18n/routing";

export type CookieRow = {
  name: string;
  category: "necessary" | "analytics" | "marketing";
  purpose: string;
  duration: string;
  provider: string;
};

/**
 * Canonical, complete cookie inventory.
 * The currently-active set is the `necessary` category — analytics
 * and marketing rows are kept as documented placeholders so that the
 * cookie banner is honest about every cookie that *could* be set if
 * the operator activates GA4 / Meta Pixel later.
 */
export const COOKIE_INVENTORY: CookieRow[] = [
  {
    name: "ic_consent",
    category: "necessary",
    purpose: "Stores your cookie banner choice (consent version, timestamp, granular categories).",
    duration: "13 months",
    provider: "InjectCompass (first-party)",
  },
  {
    name: "ic_session",
    category: "necessary",
    purpose: "Session continuity across page navigations. No personal data.",
    duration: "Session",
    provider: "InjectCompass (first-party)",
  },
  {
    name: "_ga, _ga_<id>",
    category: "analytics",
    purpose: "Aggregated, pseudonymous usage analytics. Only set if you accept analytics cookies.",
    duration: "13 months",
    provider: "Google Analytics 4 (placeholder, not currently active)",
  },
  {
    name: "_fbp",
    category: "marketing",
    purpose: "Conversion measurement for advertising. Only set if you accept marketing cookies.",
    duration: "3 months",
    provider: "Meta Pixel (placeholder, not currently active)",
  },
];

export type CookiePolicyContent = {
  title: string;
  intro: string;
  lastUpdated: string;
  tableHeading: string;
  columns: { name: string; category: string; purpose: string; duration: string; provider: string };
  categoryLabels: { necessary: string; analytics: string; marketing: string };
  withdrawHeading: string;
  withdrawBody: string;
  contactHeading: string;
  contactBody: string;
};

const tableHeading = {
  en: "Cookies on this site",
  de: "Cookies auf dieser Website",
  fr: "Cookies sur ce site",
  it: "Cookie utilizzati",
  es: "Cookies del Sitio",
  nl: "Cookies op deze Website",
  pl: "Pliki cookies",
  sv: "Kakor på denna webbplats",
  pt: "Cookies do Site",
  ro: "Cookie-uri utilizate",
  cs: "Soubory cookie",
  no: "Informasjonskapsler",
};

const labels = {
  en: { necessary: "Necessary", analytics: "Analytics", marketing: "Marketing" },
  de: { necessary: "Notwendig", analytics: "Analyse", marketing: "Marketing" },
  fr: { necessary: "Nécessaires", analytics: "Mesure d'audience", marketing: "Marketing" },
  it: { necessary: "Necessari", analytics: "Statistici", marketing: "Marketing" },
  es: { necessary: "Necesarios", analytics: "Analíticos", marketing: "Marketing" },
  nl: { necessary: "Noodzakelijk", analytics: "Analytisch", marketing: "Marketing" },
  pl: { necessary: "Niezbędne", analytics: "Analityczne", marketing: "Marketingowe" },
  sv: { necessary: "Nödvändiga", analytics: "Analys", marketing: "Marknadsföring" },
  pt: { necessary: "Necessários", analytics: "Análise", marketing: "Marketing" },
  ro: { necessary: "Necesare", analytics: "Analiză", marketing: "Marketing" },
  cs: { necessary: "Nezbytné", analytics: "Analytické", marketing: "Marketingové" },
  no: { necessary: "Nødvendige", analytics: "Analyse", marketing: "Markedsføring" },
};

const columns = {
  en: { name: "Name", category: "Category", purpose: "Purpose", duration: "Duration", provider: "Provider" },
  de: { name: "Name", category: "Kategorie", purpose: "Zweck", duration: "Dauer", provider: "Anbieter" },
  fr: { name: "Nom", category: "Catégorie", purpose: "Finalité", duration: "Durée", provider: "Fournisseur" },
  it: { name: "Nome", category: "Categoria", purpose: "Finalità", duration: "Durata", provider: "Fornitore" },
  es: { name: "Nombre", category: "Categoría", purpose: "Finalidad", duration: "Duración", provider: "Proveedor" },
  nl: { name: "Naam", category: "Categorie", purpose: "Doel", duration: "Duur", provider: "Aanbieder" },
  pl: { name: "Nazwa", category: "Kategoria", purpose: "Cel", duration: "Okres", provider: "Dostawca" },
  sv: { name: "Namn", category: "Kategori", purpose: "Syfte", duration: "Varaktighet", provider: "Leverantör" },
  pt: { name: "Nome", category: "Categoria", purpose: "Finalidade", duration: "Duração", provider: "Fornecedor" },
  ro: { name: "Nume", category: "Categorie", purpose: "Scop", duration: "Durată", provider: "Furnizor" },
  cs: { name: "Název", category: "Kategorie", purpose: "Účel", duration: "Doba", provider: "Poskytovatel" },
  no: { name: "Navn", category: "Kategori", purpose: "Formål", duration: "Varighet", provider: "Leverandør" },
};

export const cookiePolicyContent: Record<Locale, CookiePolicyContent> = {
  en: {
    title: "Cookie Policy",
    intro:
      "This page explains how InjectCompass uses cookies and similar technologies. Strictly necessary cookies are always active. Analytics and marketing cookies are only set after you give consent through our cookie banner.",
    lastUpdated: "Last updated: 27 April 2026",
    tableHeading: tableHeading.en,
    columns: columns.en,
    categoryLabels: labels.en,
    withdrawHeading: "Withdrawing or changing consent",
    withdrawBody: "You can change your choice at any time by clicking « Cookie preferences » in the footer. The banner re-opens; your new choice is saved immediately.",
    contactHeading: "Contact",
    contactBody: "Questions about cookies: privacy@injectcompass.com.",
  },
  de: {
    title: "Cookie-Richtlinie",
    intro:
      "Diese Seite erläutert den Einsatz von Cookies und ähnlichen Technologien auf injectcompass.com. Technisch notwendige Cookies sind stets aktiv. Analyse- und Marketing-Cookies werden ausschließlich nach Ihrer aktiven Einwilligung über den Consent-Banner gesetzt (§ 25 TDDDG).",
    lastUpdated: "Stand: 27. April 2026",
    tableHeading: tableHeading.de,
    columns: columns.de,
    categoryLabels: labels.de,
    withdrawHeading: "Einwilligung widerrufen oder ändern",
    withdrawBody: "Ihre Auswahl können Sie jederzeit über den Link „Cookie-Einstellungen“ im Footer mit Wirkung für die Zukunft ändern. Der Banner öffnet sich erneut, Ihre neue Auswahl wird unmittelbar gespeichert.",
    contactHeading: "Kontakt",
    contactBody: "Fragen zu Cookies: privacy@injectcompass.com.",
  },
  fr: {
    title: "Politique relative aux cookies",
    intro:
      "Cette page explique comment InjectCompass utilise les cookies et technologies similaires. Les cookies strictement nécessaires sont toujours actifs. Les cookies de mesure d'audience et de marketing ne sont déposés qu'avec votre consentement préalable, conformément à l'article 82 de la loi Informatique et Libertés.",
    lastUpdated: "Dernière mise à jour : 27 avril 2026",
    tableHeading: tableHeading.fr,
    columns: columns.fr,
    categoryLabels: labels.fr,
    withdrawHeading: "Retirer ou modifier votre consentement",
    withdrawBody: "Vous pouvez modifier votre choix à tout moment en cliquant sur « Préférences cookies » en pied de page. Le bandeau s'ouvre de nouveau ; votre nouveau choix est enregistré immédiatement.",
    contactHeading: "Contact",
    contactBody: "Pour toute question : privacy@injectcompass.com.",
  },
  it: {
    title: "Informativa sui cookie",
    intro:
      "La presente pagina descrive come InjectCompass utilizza cookie e tecnologie analoghe. I cookie strettamente necessari sono sempre attivi. I cookie analitici e di marketing vengono installati esclusivamente previo consenso, ai sensi dell'art. 122 del Codice Privacy.",
    lastUpdated: "Ultimo aggiornamento: 27 aprile 2026",
    tableHeading: tableHeading.it,
    columns: columns.it,
    categoryLabels: labels.it,
    withdrawHeading: "Revoca e modifica del consenso",
    withdrawBody: "È possibile modificare la propria scelta in qualsiasi momento cliccando su « Preferenze cookie » nel piè di pagina. Il banner riapparirà; la nuova scelta sarà memorizzata immediatamente.",
    contactHeading: "Contatti",
    contactBody: "Per quesiti sui cookie: privacy@injectcompass.com.",
  },
  es: {
    title: "Política de cookies",
    intro:
      "Esta página explica cómo InjectCompass utiliza cookies y tecnologías similares. Las cookies estrictamente necesarias están siempre activas. Las cookies analíticas y de marketing solo se instalan tras su consentimiento, conforme al art. 22 de la LSSI.",
    lastUpdated: "Última actualización: 27 de abril de 2026",
    tableHeading: tableHeading.es,
    columns: columns.es,
    categoryLabels: labels.es,
    withdrawHeading: "Retirar o modificar el consentimiento",
    withdrawBody: "Puede modificar su elección en cualquier momento haciendo clic en « Preferencias de cookies » en el pie de página. El banner volverá a aparecer y su nueva elección se guardará de inmediato.",
    contactHeading: "Contacto",
    contactBody: "Consultas: privacy@injectcompass.com.",
  },
  nl: {
    title: "Cookiebeleid",
    intro:
      "Deze pagina legt uit hoe InjectCompass cookies en vergelijkbare technologieën gebruikt. Strikt noodzakelijke cookies zijn altijd actief. Analytische en marketingcookies worden alleen geplaatst nadat u toestemming geeft via de cookiebanner (art. 11.7a Telecommunicatiewet).",
    lastUpdated: "Laatst bijgewerkt: 27 april 2026",
    tableHeading: tableHeading.nl,
    columns: columns.nl,
    categoryLabels: labels.nl,
    withdrawHeading: "Toestemming intrekken of wijzigen",
    withdrawBody: "U kunt uw keuze op ieder moment wijzigen via de link « Cookievoorkeuren » in de footer. De banner opent opnieuw en uw nieuwe keuze wordt direct opgeslagen.",
    contactHeading: "Contact",
    contactBody: "Vragen over cookies: privacy@injectcompass.com.",
  },
  pl: {
    title: "Polityka cookies",
    intro:
      "Niniejsza strona wyjaśnia, w jaki sposób InjectCompass wykorzystuje pliki cookies i podobne technologie. Pliki niezbędne są zawsze aktywne. Pliki analityczne i marketingowe są ustawiane wyłącznie po wyrażeniu zgody zgodnie z art. 173 Prawa telekomunikacyjnego.",
    lastUpdated: "Ostatnia aktualizacja: 27 kwietnia 2026 r.",
    tableHeading: tableHeading.pl,
    columns: columns.pl,
    categoryLabels: labels.pl,
    withdrawHeading: "Wycofanie lub zmiana zgody",
    withdrawBody: "Wybór można zmienić w dowolnym momencie poprzez link « Preferencje cookies » w stopce. Baner pojawi się ponownie; nowy wybór zapisuje się natychmiast.",
    contactHeading: "Kontakt",
    contactBody: "Pytania: privacy@injectcompass.com.",
  },
  sv: {
    title: "Kakpolicy",
    intro:
      "Denna sida beskriver hur InjectCompass använder kakor och liknande tekniker. Strikt nödvändiga kakor är alltid aktiva. Analys- och marknadsföringskakor placeras endast efter ditt samtycke i enlighet med 6 kap. 18 § lagen om elektronisk kommunikation.",
    lastUpdated: "Senast uppdaterad: 27 april 2026",
    tableHeading: tableHeading.sv,
    columns: columns.sv,
    categoryLabels: labels.sv,
    withdrawHeading: "Återkalla eller ändra samtycke",
    withdrawBody: "Du kan ändra ditt val när som helst via länken « Kakinställningar » i sidfoten. Bannern öppnas på nytt; det nya valet sparas omedelbart.",
    contactHeading: "Kontakt",
    contactBody: "Frågor om kakor: privacy@injectcompass.com.",
  },
  pt: {
    title: "Política de cookies",
    intro:
      "Esta página explica a forma como a InjectCompass utiliza cookies e tecnologias semelhantes. Os cookies estritamente necessários estão sempre ativos. Os cookies analíticos e de marketing só são instalados após o seu consentimento, nos termos do artigo 5.º da Lei n.º 41/2004.",
    lastUpdated: "Última atualização: 27 de abril de 2026",
    tableHeading: tableHeading.pt,
    columns: columns.pt,
    categoryLabels: labels.pt,
    withdrawHeading: "Retirar ou alterar o consentimento",
    withdrawBody: "Pode alterar a sua escolha a qualquer momento através do link « Preferências de cookies » no rodapé. O banner reabre e a nova escolha é guardada de imediato.",
    contactHeading: "Contactos",
    contactBody: "Questões sobre cookies: privacy@injectcompass.com.",
  },
  ro: {
    title: "Politica privind cookie-urile",
    intro:
      "Această pagină explică modul în care InjectCompass utilizează cookie-uri și tehnologii similare. Cookie-urile strict necesare sunt active permanent. Cookie-urile de analiză și marketing se instalează numai după acordul dumneavoastră exprimat prin banner, conform art. 4 din Legea nr. 506/2004.",
    lastUpdated: "Ultima actualizare: 27 aprilie 2026",
    tableHeading: tableHeading.ro,
    columns: columns.ro,
    categoryLabels: labels.ro,
    withdrawHeading: "Retragerea sau modificarea consimțământului",
    withdrawBody: "Vă puteți modifica alegerea oricând prin linkul « Preferințe cookie » din subsol. Banner-ul se redeschide, iar noua alegere este salvată imediat.",
    contactHeading: "Contact",
    contactBody: "Întrebări: privacy@injectcompass.com.",
  },
  cs: {
    title: "Zásady používání cookies",
    intro:
      "Tato stránka popisuje, jak InjectCompass používá soubory cookie a podobné technologie. Nezbytné cookies jsou aktivní vždy. Analytické a marketingové cookies se ukládají pouze po Vašem souhlasu vyjádřeném prostřednictvím lišty (§ 89 zákona č. 127/2005 Sb.).",
    lastUpdated: "Poslední aktualizace: 27. dubna 2026",
    tableHeading: tableHeading.cs,
    columns: columns.cs,
    categoryLabels: labels.cs,
    withdrawHeading: "Odvolání nebo změna souhlasu",
    withdrawBody: "Souhlas můžete kdykoli změnit prostřednictvím odkazu « Nastavení cookies » v zápatí. Lišta se znovu zobrazí; nová volba se uloží okamžitě.",
    contactHeading: "Kontakt",
    contactBody: "Dotazy: privacy@injectcompass.com.",
  },
  no: {
    title: "Erklæring om informasjonskapsler",
    intro:
      "Denne siden forklarer hvordan InjectCompass bruker informasjonskapsler og lignende teknologier. Strengt nødvendige kapsler er alltid aktive. Analyse- og markedsføringskapsler settes kun etter ditt samtykke i henhold til ekomloven § 2-7b.",
    lastUpdated: "Sist oppdatert: 27. april 2026",
    tableHeading: tableHeading.no,
    columns: columns.no,
    categoryLabels: labels.no,
    withdrawHeading: "Trekke tilbake eller endre samtykke",
    withdrawBody: "Du kan endre valget når som helst via lenken « Innstillinger for informasjonskapsler » i bunnteksten. Banneret åpnes på nytt og det nye valget lagres umiddelbart.",
    contactHeading: "Kontakt",
    contactBody: "Spørsmål: privacy@injectcompass.com.",
  },
};
