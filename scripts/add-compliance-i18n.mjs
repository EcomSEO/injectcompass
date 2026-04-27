#!/usr/bin/env node
/**
 * One-off helper to add the compliance-related namespaces to every
 * dictionary file. Idempotent: keys that already exist are not
 * overwritten.
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dictDir = path.join(__dirname, "..", "i18n", "dictionaries");

/* eslint quote-props: "off" */
const additions = {
  en: {
    cookieConsent: {
      aria_label: "Cookie consent",
      heading: "We use cookies",
      body: "We use strictly necessary cookies to operate the site. Optional analytics or marketing cookies are only used after you consent. You can change your choice any time.",
      read_more: "Read the cookie policy",
      accept_all: "Accept all",
      reject_all: "Reject all",
      customize: "Customize",
      customize_heading: "Cookie preferences",
      customize_body: "Choose which categories of cookies you want to allow.",
      necessary_label: "Necessary",
      necessary_desc: "Required for the site to function. Always on.",
      analytics_label: "Analytics",
      analytics_desc: "Aggregated, pseudonymous traffic measurement.",
      marketing_label: "Marketing",
      marketing_desc: "Conversion measurement for advertising. Off by default.",
      save_choices: "Save choices",
    },
    educationalBanner: {
      aria_label: "Educational notice",
      eyebrow: "Educational only — not medical advice.",
      body: "InjectCompass content is educational. Always consult a licensed prescriber before starting, stopping, or adjusting any injectable medication.",
    },
    wadaBanner: {
      eyebrow: "WADA notice.",
      body: "Some compounds discussed are on the WADA Prohibited List. Athletes subject to anti-doping testing should consult their sport's regulatory body.",
    },
    regulatoryAuthorities: { heading: "Regulatory authorities" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Impressum" },
    footer_extra: {
      cookie_preferences: "Cookie preferences",
      cookies_link: "Cookie policy",
      impressum_link: "Impressum",
    },
  },
  de: {
    cookieConsent: {
      aria_label: "Cookie-Einwilligung",
      heading: "Wir verwenden Cookies",
      body: "Wir setzen ausschließlich technisch notwendige Cookies. Analyse- oder Marketing-Cookies werden erst nach Ihrer Einwilligung gesetzt. Sie können Ihre Auswahl jederzeit anpassen.",
      read_more: "Cookie-Richtlinie lesen",
      accept_all: "Alle akzeptieren",
      reject_all: "Alle ablehnen",
      customize: "Anpassen",
      customize_heading: "Cookie-Einstellungen",
      customize_body: "Wählen Sie die Kategorien, denen Sie zustimmen möchten.",
      necessary_label: "Notwendig",
      necessary_desc: "Für den Betrieb der Website erforderlich. Immer aktiv.",
      analytics_label: "Analyse",
      analytics_desc: "Pseudonyme, aggregierte Reichweitenmessung.",
      marketing_label: "Marketing",
      marketing_desc: "Erfolgsmessung für Werbung. Standardmäßig deaktiviert.",
      save_choices: "Auswahl speichern",
    },
    educationalBanner: {
      aria_label: "Hinweis zur Patientenaufklärung",
      eyebrow: "Nur zur Patientenaufklärung — keine medizinische Beratung.",
      body: "Die Inhalte von InjectCompass dienen der Patientenaufklärung. Konsultieren Sie stets eine verschreibungsberechtigte Ärztin oder einen Arzt, bevor Sie eine Injektionstherapie beginnen, ändern oder beenden.",
    },
    wadaBanner: {
      eyebrow: "WADA-Hinweis.",
      body: "Einige der besprochenen Substanzen stehen auf der WADA-Verbotsliste. Sportler:innen mit Anti-Doping-Verpflichtungen sollten sich an ihren Sportverband wenden.",
    },
    regulatoryAuthorities: { heading: "Zuständige Behörden" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Impressum" },
    footer_extra: {
      cookie_preferences: "Cookie-Einstellungen",
      cookies_link: "Cookie-Richtlinie",
      impressum_link: "Impressum",
    },
  },
  fr: {
    cookieConsent: {
      aria_label: "Consentement aux cookies",
      heading: "Nous utilisons des cookies",
      body: "Nous utilisons des cookies strictement nécessaires au fonctionnement du site. Les cookies de mesure d'audience ou de marketing ne sont activés qu'avec votre consentement. Vous pouvez modifier votre choix à tout moment.",
      read_more: "Lire la politique cookies",
      accept_all: "Tout accepter",
      reject_all: "Tout refuser",
      customize: "Personnaliser",
      customize_heading: "Préférences cookies",
      customize_body: "Choisissez les catégories que vous souhaitez autoriser.",
      necessary_label: "Nécessaires",
      necessary_desc: "Indispensables au fonctionnement du site. Toujours actifs.",
      analytics_label: "Mesure d'audience",
      analytics_desc: "Statistiques agrégées et pseudonymisées.",
      marketing_label: "Marketing",
      marketing_desc: "Mesure de performance publicitaire. Désactivé par défaut.",
      save_choices: "Enregistrer mes choix",
    },
    educationalBanner: {
      aria_label: "Avis pédagogique",
      eyebrow: "Information éducative — ne constitue pas un avis médical.",
      body: "Les contenus d'InjectCompass sont à visée pédagogique. Consultez toujours un professionnel de santé habilité à prescrire avant de débuter, modifier ou arrêter un traitement injectable.",
    },
    wadaBanner: {
      eyebrow: "Avis AMA.",
      body: "Certains composés mentionnés figurent sur la Liste des interdictions de l'AMA. Les sportifs soumis à un contrôle antidopage doivent consulter leur fédération.",
    },
    regulatoryAuthorities: { heading: "Autorités de tutelle" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Mentions légales" },
    footer_extra: {
      cookie_preferences: "Préférences cookies",
      cookies_link: "Politique cookies",
      impressum_link: "Mentions légales",
    },
  },
  it: {
    cookieConsent: {
      aria_label: "Consenso ai cookie",
      heading: "Utilizziamo cookie",
      body: "Utilizziamo cookie strettamente necessari al funzionamento del sito. I cookie analitici o di marketing si attivano solo previo consenso. Può modificare la propria scelta in qualsiasi momento.",
      read_more: "Leggi la cookie policy",
      accept_all: "Accetta tutto",
      reject_all: "Rifiuta tutto",
      customize: "Personalizza",
      customize_heading: "Preferenze cookie",
      customize_body: "Scegli le categorie che desideri autorizzare.",
      necessary_label: "Necessari",
      necessary_desc: "Indispensabili per il funzionamento del sito. Sempre attivi.",
      analytics_label: "Statistici",
      analytics_desc: "Statistiche aggregate e pseudonimizzate.",
      marketing_label: "Marketing",
      marketing_desc: "Misurazione delle conversioni pubblicitarie. Disattivati per impostazione predefinita.",
      save_choices: "Salva le scelte",
    },
    educationalBanner: {
      aria_label: "Avviso educativo",
      eyebrow: "Solo a scopo educativo — non costituisce parere medico.",
      body: "I contenuti di InjectCompass hanno finalità educative. Consultare sempre un medico prescrittore prima di iniziare, modificare o interrompere una terapia iniettiva.",
    },
    wadaBanner: {
      eyebrow: "Avviso WADA.",
      body: "Alcuni composti descritti rientrano nell'Elenco delle Sostanze Proibite WADA. Gli atleti soggetti a controlli antidoping devono rivolgersi al proprio organismo federale.",
    },
    regulatoryAuthorities: { heading: "Autorità competenti" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Note legali" },
    footer_extra: {
      cookie_preferences: "Preferenze cookie",
      cookies_link: "Cookie policy",
      impressum_link: "Note legali",
    },
  },
  es: {
    cookieConsent: {
      aria_label: "Consentimiento de cookies",
      heading: "Utilizamos cookies",
      body: "Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio. Las cookies analíticas o de marketing solo se activan con su consentimiento. Puede modificar su elección en cualquier momento.",
      read_more: "Leer la política de cookies",
      accept_all: "Aceptar todo",
      reject_all: "Rechazar todo",
      customize: "Personalizar",
      customize_heading: "Preferencias de cookies",
      customize_body: "Elija las categorías que desea permitir.",
      necessary_label: "Necesarias",
      necessary_desc: "Imprescindibles para el funcionamiento del sitio. Siempre activas.",
      analytics_label: "Analíticas",
      analytics_desc: "Métricas agregadas y seudonimizadas.",
      marketing_label: "Marketing",
      marketing_desc: "Medición de conversión publicitaria. Desactivadas por defecto.",
      save_choices: "Guardar elecciones",
    },
    educationalBanner: {
      aria_label: "Aviso educativo",
      eyebrow: "Información educativa — no constituye consejo médico.",
      body: "Los contenidos de InjectCompass son educativos. Consulte siempre a un profesional sanitario habilitado antes de iniciar, modificar o suspender un tratamiento inyectable.",
    },
    wadaBanner: {
      eyebrow: "Aviso AMA.",
      body: "Algunos compuestos tratados figuran en la Lista de Prohibiciones de la AMA. Los deportistas sometidos a controles antidopaje deben consultar a su federación.",
    },
    regulatoryAuthorities: { heading: "Autoridades reguladoras" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Aviso legal" },
    footer_extra: {
      cookie_preferences: "Preferencias de cookies",
      cookies_link: "Política de cookies",
      impressum_link: "Aviso legal",
    },
  },
  nl: {
    cookieConsent: {
      aria_label: "Cookie-toestemming",
      heading: "We gebruiken cookies",
      body: "We gebruiken strikt noodzakelijke cookies voor het functioneren van de website. Analytische of marketingcookies worden uitsluitend met uw toestemming geplaatst. U kunt uw keuze op ieder moment wijzigen.",
      read_more: "Cookiebeleid lezen",
      accept_all: "Alles accepteren",
      reject_all: "Alles weigeren",
      customize: "Aanpassen",
      customize_heading: "Cookievoorkeuren",
      customize_body: "Kies de categorieën die u wilt toestaan.",
      necessary_label: "Noodzakelijk",
      necessary_desc: "Onmisbaar voor de werking van de site. Altijd actief.",
      analytics_label: "Analytisch",
      analytics_desc: "Geaggregeerde, gepseudonimiseerde meting.",
      marketing_label: "Marketing",
      marketing_desc: "Conversiemeting voor advertenties. Standaard uit.",
      save_choices: "Keuzes opslaan",
    },
    educationalBanner: {
      aria_label: "Educatieve melding",
      eyebrow: "Alleen educatief — geen medisch advies.",
      body: "InjectCompass biedt educatieve content. Raadpleeg altijd een bevoegde voorschrijver voordat u een injecteerbare behandeling start, wijzigt of stopt.",
    },
    wadaBanner: {
      eyebrow: "WADA-melding.",
      body: "Sommige besproken stoffen staan op de WADA-verbodslijst. Sporters die onder dopingcontrole vallen, dienen hun sportbond te raadplegen.",
    },
    regulatoryAuthorities: { heading: "Toezichthouders" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Colofon" },
    footer_extra: {
      cookie_preferences: "Cookievoorkeuren",
      cookies_link: "Cookiebeleid",
      impressum_link: "Colofon",
    },
  },
  pl: {
    cookieConsent: {
      aria_label: "Zgoda na cookies",
      heading: "Używamy plików cookies",
      body: "Stosujemy wyłącznie pliki cookies niezbędne do działania serwisu. Pliki analityczne i marketingowe są aktywowane wyłącznie po wyrażeniu zgody. Wybór można zmienić w dowolnej chwili.",
      read_more: "Polityka cookies",
      accept_all: "Akceptuję wszystkie",
      reject_all: "Odrzuć wszystkie",
      customize: "Dostosuj",
      customize_heading: "Preferencje cookies",
      customize_body: "Wybierz kategorie, na które wyrażasz zgodę.",
      necessary_label: "Niezbędne",
      necessary_desc: "Niezbędne do działania witryny. Zawsze aktywne.",
      analytics_label: "Analityczne",
      analytics_desc: "Zagregowane statystyki pseudonimowe.",
      marketing_label: "Marketingowe",
      marketing_desc: "Pomiar skuteczności reklam. Domyślnie wyłączone.",
      save_choices: "Zapisz wybór",
    },
    educationalBanner: {
      aria_label: "Informacja edukacyjna",
      eyebrow: "Treści wyłącznie edukacyjne — nie stanowią porady medycznej.",
      body: "Treści serwisu InjectCompass mają charakter edukacyjny. Przed rozpoczęciem, zmianą lub zakończeniem terapii iniekcyjnej zawsze skonsultuj się z lekarzem uprawnionym do wystawiania recept.",
    },
    wadaBanner: {
      eyebrow: "Komunikat WADA.",
      body: "Niektóre omawiane substancje znajdują się na Liście Substancji i Metod Zabronionych WADA. Sportowcy podlegający kontroli antydopingowej powinni skonsultować się ze swoim związkiem sportowym.",
    },
    regulatoryAuthorities: { heading: "Organy nadzoru" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Nota prawna" },
    footer_extra: {
      cookie_preferences: "Preferencje cookies",
      cookies_link: "Polityka cookies",
      impressum_link: "Nota prawna",
    },
  },
  sv: {
    cookieConsent: {
      aria_label: "Samtycke till kakor",
      heading: "Vi använder kakor",
      body: "Vi använder strikt nödvändiga kakor för att webbplatsen ska fungera. Analys- eller marknadsföringskakor används endast efter ditt samtycke. Du kan ändra ditt val när som helst.",
      read_more: "Läs kakpolicyn",
      accept_all: "Acceptera alla",
      reject_all: "Avvisa alla",
      customize: "Anpassa",
      customize_heading: "Kakinställningar",
      customize_body: "Välj de kategorier du vill tillåta.",
      necessary_label: "Nödvändiga",
      necessary_desc: "Krävs för att webbplatsen ska fungera. Alltid aktiva.",
      analytics_label: "Analys",
      analytics_desc: "Aggregerad, pseudonymiserad statistik.",
      marketing_label: "Marknadsföring",
      marketing_desc: "Mätning av annonsprestanda. Avstängt som standard.",
      save_choices: "Spara val",
    },
    educationalBanner: {
      aria_label: "Pedagogiskt meddelande",
      eyebrow: "Endast utbildande — utgör inte medicinsk rådgivning.",
      body: "Innehållet på InjectCompass är utbildande. Rådfråga alltid en legitimerad förskrivare innan du påbörjar, ändrar eller avslutar en injektionsbehandling.",
    },
    wadaBanner: {
      eyebrow: "WADA-information.",
      body: "Vissa diskuterade substanser finns på WADA:s dopinglista. Idrottare som omfattas av antidopingtester bör kontakta sitt förbund.",
    },
    regulatoryAuthorities: { heading: "Tillsynsmyndigheter" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Utgivare" },
    footer_extra: {
      cookie_preferences: "Kakinställningar",
      cookies_link: "Kakpolicy",
      impressum_link: "Utgivare",
    },
  },
  pt: {
    cookieConsent: {
      aria_label: "Consentimento de cookies",
      heading: "Utilizamos cookies",
      body: "Utilizamos cookies estritamente necessários ao funcionamento do site. Os cookies analíticos ou de marketing apenas são ativados após o seu consentimento. Pode alterar a sua escolha a qualquer momento.",
      read_more: "Ler a política de cookies",
      accept_all: "Aceitar tudo",
      reject_all: "Rejeitar tudo",
      customize: "Personalizar",
      customize_heading: "Preferências de cookies",
      customize_body: "Escolha as categorias que pretende autorizar.",
      necessary_label: "Necessários",
      necessary_desc: "Indispensáveis ao funcionamento do site. Sempre ativos.",
      analytics_label: "Análise",
      analytics_desc: "Estatísticas agregadas e pseudonimizadas.",
      marketing_label: "Marketing",
      marketing_desc: "Medição da eficácia publicitária. Desativados por defeito.",
      save_choices: "Guardar escolhas",
    },
    educationalBanner: {
      aria_label: "Aviso educativo",
      eyebrow: "Apenas educativo — não substitui aconselhamento médico.",
      body: "Os conteúdos da InjectCompass são educativos. Consulte sempre um profissional de saúde habilitado a prescrever antes de iniciar, alterar ou suspender uma terapêutica injetável.",
    },
    wadaBanner: {
      eyebrow: "Aviso AMA.",
      body: "Alguns compostos referidos constam da Lista de Proibições da AMA. Os atletas sujeitos a controlo antidopagem devem consultar a sua federação.",
    },
    regulatoryAuthorities: { heading: "Autoridades reguladoras" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Ficha técnica" },
    footer_extra: {
      cookie_preferences: "Preferências de cookies",
      cookies_link: "Política de cookies",
      impressum_link: "Ficha técnica",
    },
  },
  ro: {
    cookieConsent: {
      aria_label: "Consimțământ cookie",
      heading: "Folosim cookie-uri",
      body: "Folosim cookie-uri strict necesare pentru funcționarea site-ului. Cookie-urile de analiză sau marketing sunt activate doar cu consimțământul dvs. Vă puteți modifica alegerea oricând.",
      read_more: "Citește politica cookie",
      accept_all: "Acceptă tot",
      reject_all: "Respinge tot",
      customize: "Personalizează",
      customize_heading: "Preferințe cookie",
      customize_body: "Alegeți categoriile pe care doriți să le permiteți.",
      necessary_label: "Necesare",
      necessary_desc: "Indispensabile pentru funcționarea site-ului. Active permanent.",
      analytics_label: "Analiză",
      analytics_desc: "Statistici agregate și pseudonimizate.",
      marketing_label: "Marketing",
      marketing_desc: "Măsurarea performanței publicitare. Dezactivate implicit.",
      save_choices: "Salvează alegerile",
    },
    educationalBanner: {
      aria_label: "Mențiune educațională",
      eyebrow: "Conținut exclusiv educațional — nu reprezintă sfat medical.",
      body: "Conținutul InjectCompass este de natură educațională. Consultați întotdeauna un medic prescriptor înainte de a începe, modifica sau întrerupe o terapie injectabilă.",
    },
    wadaBanner: {
      eyebrow: "Aviz WADA.",
      body: "Unele substanțe discutate figurează pe Lista interzisă WADA. Sportivii supuși controalelor antidoping trebuie să se adreseze federației lor.",
    },
    regulatoryAuthorities: { heading: "Autorități de reglementare" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Date editor" },
    footer_extra: {
      cookie_preferences: "Preferințe cookie",
      cookies_link: "Politica cookie",
      impressum_link: "Date editor",
    },
  },
  cs: {
    cookieConsent: {
      aria_label: "Souhlas s cookies",
      heading: "Používáme cookies",
      body: "Používáme pouze nezbytné cookies. Analytické a marketingové cookies jsou aktivovány pouze s Vaším souhlasem. Volbu můžete kdykoli změnit.",
      read_more: "Zásady používání cookies",
      accept_all: "Přijmout vše",
      reject_all: "Odmítnout vše",
      customize: "Přizpůsobit",
      customize_heading: "Nastavení cookies",
      customize_body: "Vyberte kategorie, které chcete povolit.",
      necessary_label: "Nezbytné",
      necessary_desc: "Nutné pro fungování webu. Vždy aktivní.",
      analytics_label: "Analytické",
      analytics_desc: "Agregovaná pseudonymizovaná statistika.",
      marketing_label: "Marketingové",
      marketing_desc: "Měření výkonu reklamy. Ve výchozím stavu vypnuto.",
      save_choices: "Uložit volbu",
    },
    educationalBanner: {
      aria_label: "Vzdělávací upozornění",
      eyebrow: "Pouze vzdělávací obsah — nejedná se o lékařské doporučení.",
      body: "Obsah InjectCompass je vzdělávací povahy. Před zahájením, změnou nebo ukončením injekční terapie vždy konzultujte oprávněného předepisujícího lékaře.",
    },
    wadaBanner: {
      eyebrow: "Upozornění WADA.",
      body: "Některé zmíněné látky jsou na seznamu zakázaných látek WADA. Sportovci podléhající antidopingovým kontrolám by se měli obrátit na svůj svaz.",
    },
    regulatoryAuthorities: { heading: "Dozorové orgány" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Tiráž" },
    footer_extra: {
      cookie_preferences: "Nastavení cookies",
      cookies_link: "Zásady cookies",
      impressum_link: "Tiráž",
    },
  },
  no: {
    cookieConsent: {
      aria_label: "Samtykke til informasjonskapsler",
      heading: "Vi bruker informasjonskapsler",
      body: "Vi bruker strengt nødvendige informasjonskapsler for å drifte nettstedet. Analyse- og markedsføringskapsler aktiveres kun etter ditt samtykke. Du kan endre valget når som helst.",
      read_more: "Les erklæringen om informasjonskapsler",
      accept_all: "Godta alle",
      reject_all: "Avvis alle",
      customize: "Tilpass",
      customize_heading: "Innstillinger for informasjonskapsler",
      customize_body: "Velg kategoriene du vil tillate.",
      necessary_label: "Nødvendige",
      necessary_desc: "Nødvendige for at nettstedet skal fungere. Alltid aktive.",
      analytics_label: "Analyse",
      analytics_desc: "Aggregert, pseudonymisert statistikk.",
      marketing_label: "Markedsføring",
      marketing_desc: "Måling av annonseeffektivitet. Av som standard.",
      save_choices: "Lagre valg",
    },
    educationalBanner: {
      aria_label: "Informasjon",
      eyebrow: "Kun til opplæring — utgjør ikke medisinsk rådgivning.",
      body: "Innholdet på InjectCompass er opplærende. Rådfør deg alltid med en autorisert forskrivende lege før du starter, endrer eller avslutter en injeksjonsbehandling.",
    },
    wadaBanner: {
      eyebrow: "WADA-merknad.",
      body: "Enkelte omtalte stoffer står på WADAs forbudsliste. Utøvere som er underlagt antidoping-tester bør kontakte sitt særforbund.",
    },
    regulatoryAuthorities: { heading: "Tilsynsmyndigheter" },
    swedenRestricted: {
      title: "Innehåll inte tillgängligt",
      body: "Innehåll om denna substans är inte tillgängligt på svenska enligt svensk lagstiftning. För mer information, kontakta Läkemedelsverket.",
    },
    impressum: { heading: "Impressum", linkLabel: "Kolofon" },
    footer_extra: {
      cookie_preferences: "Innstillinger for informasjonskapsler",
      cookies_link: "Erklæring om informasjonskapsler",
      impressum_link: "Kolofon",
    },
  },
};

function deepMergePreserve(existing, additions) {
  if (existing === undefined) return additions;
  if (typeof existing !== "object" || existing === null) return existing;
  if (Array.isArray(existing)) return existing;
  const out = { ...existing };
  for (const [k, v] of Object.entries(additions)) {
    if (k in out && typeof out[k] === "object" && out[k] !== null && !Array.isArray(out[k]) && typeof v === "object") {
      out[k] = deepMergePreserve(out[k], v);
    } else if (!(k in out)) {
      out[k] = v;
    }
  }
  return out;
}

let updated = 0;
for (const [locale, payload] of Object.entries(additions)) {
  const filePath = path.join(dictDir, `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(raw);

  // Top-level keys: cookieConsent, educationalBanner, wadaBanner,
  // regulatoryAuthorities, swedenRestricted, impressum.
  for (const [k, v] of Object.entries(payload)) {
    if (k === "footer_extra") {
      // Merge footer_extra entries into the existing footer namespace
      json.footer = deepMergePreserve(json.footer ?? {}, v);
      continue;
    }
    json[k] = deepMergePreserve(json[k], v);
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
  updated++;
}

console.log(`Updated ${updated} dictionary files.`);
