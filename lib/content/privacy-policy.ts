/**
 * Per-locale Privacy Policy bodies for InjectCompass.
 *
 * Each entry contains a native-language title, a list of sections, and
 * a last-updated label. The TrustPageTemplate renders these.
 *
 * Country-specific Data Protection Authority (DPA) is referenced in
 * each version. Headings are in the native language. Bodies are written
 * in the appropriate legal register for that jurisdiction.
 *
 * Operator placeholders ({{operator}}, {{address}}) are kept generic so
 * the site operator can populate them without re-translation work. The
 * email contact is unified at privacy@injectcompass.com.
 */

import type { Locale } from "@/i18n/routing";

export type PrivacySection = { heading: string; body: string };
export type PrivacyContent = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: PrivacySection[];
};

const CONTACT_EMAIL = "privacy@injectcompass.com";
const OPERATOR = "[Operator Name]";
const ADDRESS = "[Address]";

export const privacyPolicyContent: Record<Locale, PrivacyContent> = {
  en: {
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains how InjectCompass collects, uses, and shares personal data when you visit injectcompass.com. We process data in accordance with the EU General Data Protection Regulation (Regulation (EU) 2016/679, GDPR) and applicable national laws.",
    lastUpdated: "Last updated: 27 April 2026",
    sections: [
      {
        heading: "1. Controller",
        body: `The data controller for this website is ${OPERATOR}, ${ADDRESS}. You can reach us by email at ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Data we collect",
        body: "We collect (a) information you actively provide (newsletter email address, correspondence) and (b) information collected automatically (request logs, anonymised analytics: pages viewed, referring URL, approximate region, device type, browser). We do not collect names, precise location data, or payment information.",
      },
      {
        heading: "3. Purposes and legal basis",
        body: "Newsletter delivery and replies to correspondence: contract / pre-contractual measures (Art. 6(1)(b) GDPR). Aggregate analytics, security logs and fraud prevention: legitimate interests (Art. 6(1)(f) GDPR). Cookies that are not strictly necessary: your consent (Art. 6(1)(a) GDPR and Art. 5(3) ePrivacy Directive).",
      },
      {
        heading: "4. Cookies",
        body: "We use a small set of strictly necessary cookies. Optional analytics or marketing cookies are only placed after you give consent through our cookie banner. You can withdraw consent at any time via the \"Cookie preferences\" link in the footer. Full details are in our cookie policy.",
      },
      {
        heading: "5. Recipients and processors",
        body: "We share data with processors who act on our instructions: Vercel (hosting, EU/US), Supabase (asset storage, EU), Beehiiv (newsletter, US) and Google Search Console / Bing Webmaster Tools (search performance). Each operates under its own privacy policy and a written processing agreement with us.",
      },
      {
        heading: "6. International transfers",
        body: "Where data is transferred outside the EEA, we rely on the European Commission's Standard Contractual Clauses (Art. 46 GDPR) or an adequacy decision. You may request a copy of the safeguards by writing to " + CONTACT_EMAIL + ".",
      },
      {
        heading: "7. Retention",
        body: "Newsletter data: until you unsubscribe. Aggregated analytics: up to 26 months. Correspondence: up to 3 years. Security logs: up to 90 days.",
      },
      {
        heading: "8. Your rights",
        body: "You have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20), and objection (Art. 21). You may also lodge a complaint with your national supervisory authority.",
      },
      {
        heading: "9. Contact",
        body: "Questions or requests: " + CONTACT_EMAIL + ".",
      },
    ],
  },
  de: {
    title: "Datenschutzerklärung",
    intro:
      "Diese Datenschutzerklärung informiert Sie gemäß Art. 13 der Datenschutz-Grundverordnung (DSGVO) sowie dem deutschen Bundesdatenschutzgesetz (BDSG) und dem Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG) über die Verarbeitung personenbezogener Daten beim Besuch von injectcompass.com.",
    lastUpdated: "Stand: 27. April 2026",
    sections: [
      {
        heading: "1. Verantwortlicher",
        body: `Verantwortlich im Sinne der DSGVO ist ${OPERATOR}, ${ADDRESS}. Sie erreichen uns per E-Mail unter ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Erhobene Daten",
        body: "Wir verarbeiten (a) von Ihnen aktiv übermittelte Daten (E-Mail-Adresse für den Newsletter, Korrespondenz) und (b) automatisch erhobene Daten (Server-Logs, pseudonyme Analyse: aufgerufene Seiten, Referrer, ungefähre Region, Gerätetyp, Browser). Wir erheben keine Klarnamen, keine präzisen Standortdaten und keine Zahlungsdaten.",
      },
      {
        heading: "3. Zwecke und Rechtsgrundlagen",
        body: "Newsletter-Versand und Beantwortung von Anfragen: Vertragserfüllung bzw. vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Aggregierte Reichweitenmessung, Sicherheitsprotokolle und Missbrauchsabwehr: berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO). Nicht erforderliche Cookies und vergleichbare Speichervorgänge: Einwilligung gemäß § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.",
      },
      {
        heading: "4. Cookies und Einwilligungsverwaltung",
        body: "Wir setzen ausschließlich technisch notwendige Cookies, soweit Sie keine weitergehende Einwilligung erteilen. Analyse- oder Marketing-Cookies werden erst nach Ihrer aktiven Einwilligung über unseren Consent-Banner gesetzt. Ihre Einwilligung können Sie jederzeit über den Link „Cookie-Einstellungen“ im Footer mit Wirkung für die Zukunft widerrufen. Eine vollständige Übersicht aller Cookies finden Sie in unserer Cookie-Richtlinie.",
      },
      {
        heading: "5. Empfänger und Auftragsverarbeiter",
        body: "Wir geben Daten an sorgfältig ausgewählte Auftragsverarbeiter weiter, die ausschließlich auf unsere Weisung tätig werden: Vercel Inc. (Hosting), Supabase Inc. (Speicherung von Mediendateien), Beehiiv Inc. (Newsletter-Versand) sowie die Search-Console-Dienste von Google und Microsoft. Mit allen Auftragsverarbeitern bestehen Verträge gemäß Art. 28 DSGVO.",
      },
      {
        heading: "6. Übermittlung in Drittländer",
        body: "Soweit personenbezogene Daten in Länder außerhalb des EWR übermittelt werden, erfolgt dies auf Grundlage der Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 DSGVO) oder eines Angemessenheitsbeschlusses. Eine Kopie der Garantien stellen wir Ihnen auf Anfrage zur Verfügung.",
      },
      {
        heading: "7. Speicherdauer",
        body: "Newsletter-Daten: bis zur Abmeldung. Aggregierte Analyse-Daten: bis zu 26 Monate. Korrespondenz: bis zu 3 Jahre. Sicherheitsprotokolle: bis zu 90 Tage.",
      },
      {
        heading: "8. Ihre Rechte",
        body: "Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit widerrufen (Art. 7 Abs. 3 DSGVO).",
      },
      {
        heading: "9. Beschwerderecht",
        body: "Sie können sich jederzeit an die zuständige Aufsichtsbehörde wenden, in Deutschland an den Bundesbeauftragten für den Datenschutz und die Informationsfreiheit (BfDI), Graurheindorfer Straße 153, 53117 Bonn, bfdi.bund.de.",
      },
      {
        heading: "10. Kontakt",
        body: "Anfragen zum Datenschutz richten Sie bitte an " + CONTACT_EMAIL + ".",
      },
    ],
  },
  fr: {
    title: "Politique de Confidentialité",
    intro:
      "La présente politique de confidentialité décrit la manière dont InjectCompass collecte, utilise et partage des données à caractère personnel lors de votre visite sur injectcompass.com, conformément au Règlement (UE) 2016/679 (RGPD) et à la Loi Informatique et Libertés modifiée.",
    lastUpdated: "Dernière mise à jour : 27 avril 2026",
    sections: [
      {
        heading: "1. Responsable du traitement",
        body: `Le responsable du traitement est ${OPERATOR}, ${ADDRESS}. Vous pouvez nous contacter par courriel à l'adresse ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Données collectées",
        body: "Nous traitons (a) les données que vous nous communiquez (adresse électronique d'inscription à la newsletter, correspondance) et (b) les données collectées automatiquement (journaux de connexion, mesure d'audience pseudonymisée : pages consultées, référent, région approximative, type d'appareil, navigateur). Nous ne collectons ni votre identité civile, ni vos données de localisation précise, ni vos données bancaires.",
      },
      {
        heading: "3. Finalités et bases légales",
        body: "Envoi de la newsletter et réponse aux demandes : exécution d'un contrat ou de mesures précontractuelles (art. 6, §1, b RGPD). Mesure d'audience agrégée, journalisation de sécurité, prévention de la fraude : intérêt légitime (art. 6, §1, f RGPD). Cookies non strictement nécessaires : consentement (art. 6, §1, a RGPD et art. 82 de la loi Informatique et Libertés).",
      },
      {
        heading: "4. Cookies",
        body: "Nous utilisons un nombre limité de cookies strictement nécessaires. Les cookies de mesure d'audience non exemptés et les cookies marketing ne sont déposés qu'après votre consentement explicite via notre bandeau. Vous pouvez retirer votre consentement à tout moment via le lien « Préférences cookies » en pied de page. La liste détaillée figure dans notre politique cookies.",
      },
      {
        heading: "5. Destinataires et sous-traitants",
        body: "Vos données sont communiquées à des sous-traitants agissant sur nos instructions : Vercel (hébergement), Supabase (stockage de médias), Beehiiv (diffusion de la newsletter) et Google Search Console / Bing Webmaster Tools (suivi du référencement). Chaque prestataire est lié par un accord conforme à l'article 28 RGPD.",
      },
      {
        heading: "6. Transferts hors UE",
        body: "Lorsqu'un transfert de données hors EEE est nécessaire, il est encadré par les Clauses Contractuelles Types adoptées par la Commission européenne (art. 46 RGPD) ou par une décision d'adéquation. Une copie des garanties peut être obtenue sur demande à " + CONTACT_EMAIL + ".",
      },
      {
        heading: "7. Durées de conservation",
        body: "Données newsletter : jusqu'à la désinscription. Données d'audience agrégées : jusqu'à 26 mois. Correspondance : jusqu'à 3 ans. Journaux de sécurité : jusqu'à 90 jours.",
      },
      {
        heading: "8. Vos droits",
        body: "Vous disposez des droits d'accès (art. 15), de rectification (art. 16), d'effacement (art. 17), de limitation (art. 18), de portabilité (art. 20) et d'opposition (art. 21 RGPD), ainsi que du droit de définir des directives relatives à votre sort numérique post mortem (art. 85 LIL).",
      },
      {
        heading: "9. Réclamation",
        body: "Vous pouvez introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL), 3 place de Fontenoy – TSA 80715, 75334 Paris Cedex 07, www.cnil.fr.",
      },
      {
        heading: "10. Contact",
        body: "Pour toute question : " + CONTACT_EMAIL + ".",
      },
    ],
  },
  it: {
    title: "Informativa sulla Privacy",
    intro:
      "La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano injectcompass.com ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR) e del D.lgs. 196/2003 come modificato dal D.lgs. 101/2018.",
    lastUpdated: "Ultimo aggiornamento: 27 aprile 2026",
    sections: [
      {
        heading: "1. Titolare del trattamento",
        body: `Titolare del trattamento è ${OPERATOR}, ${ADDRESS}. È possibile contattarci all'indirizzo ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Dati trattati",
        body: "Trattiamo (a) i dati che l'interessato ci fornisce attivamente (indirizzo e-mail per la newsletter, corrispondenza) e (b) i dati raccolti automaticamente (log di connessione, statistiche pseudonimizzate: pagine visitate, referrer, regione approssimativa, tipo di dispositivo, browser). Non raccogliamo nominativi, dati di geolocalizzazione precisa o dati di pagamento.",
      },
      {
        heading: "3. Finalità e basi giuridiche",
        body: "Invio della newsletter e risposta alle richieste: esecuzione di un contratto o misure precontrattuali (art. 6, §1, lett. b GDPR). Statistiche aggregate, log di sicurezza e prevenzione delle frodi: legittimo interesse (art. 6, §1, lett. f GDPR). Cookie non strettamente necessari: consenso (art. 6, §1, lett. a GDPR e art. 122 del Codice Privacy).",
      },
      {
        heading: "4. Cookie",
        body: "Utilizziamo cookie tecnici strettamente necessari. Cookie analitici e di marketing vengono attivati solo previo consenso espresso reso tramite il banner. Il consenso è revocabile in qualsiasi momento dal link « Preferenze cookie » nel piè di pagina. L'elenco completo è disponibile nella cookie policy.",
      },
      {
        heading: "5. Destinatari e responsabili del trattamento",
        body: "I dati possono essere comunicati a responsabili del trattamento nominati ai sensi dell'art. 28 GDPR: Vercel (hosting), Supabase (archiviazione contenuti), Beehiiv (newsletter), Google Search Console e Bing Webmaster Tools (monitoraggio SEO).",
      },
      {
        heading: "6. Trasferimenti extra-SEE",
        body: "Eventuali trasferimenti di dati al di fuori dello Spazio Economico Europeo avvengono sulla base delle Clausole Contrattuali Standard della Commissione europea (art. 46 GDPR) o di una decisione di adeguatezza.",
      },
      {
        heading: "7. Conservazione",
        body: "Dati newsletter: fino alla disiscrizione. Statistiche aggregate: fino a 26 mesi. Corrispondenza: fino a 3 anni. Log di sicurezza: fino a 90 giorni.",
      },
      {
        heading: "8. Diritti dell'interessato",
        body: "L'interessato può esercitare i diritti previsti dagli articoli 15-22 GDPR (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione) scrivendo a " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Reclamo",
        body: "È possibile proporre reclamo al Garante per la protezione dei dati personali, Piazza Venezia 11, 00187 Roma, www.garanteprivacy.it.",
      },
      {
        heading: "10. Contatti",
        body: "Per qualsiasi richiesta: " + CONTACT_EMAIL + ".",
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    intro:
      "La presente Política de Privacidad describe el tratamiento de los datos personales de los usuarios que visitan injectcompass.com, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).",
    lastUpdated: "Última actualización: 27 de abril de 2026",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        body: `El responsable del tratamiento es ${OPERATOR}, ${ADDRESS}. Puede dirigirse a nosotros a través del correo ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Datos tratados",
        body: "Tratamos (a) los datos que usted nos facilita activamente (dirección de correo para la suscripción a la newsletter, correspondencia) y (b) los datos recogidos automáticamente (registros de conexión, métricas seudonimizadas: páginas visitadas, referente, región aproximada, tipo de dispositivo, navegador). No recopilamos nombre completo, ubicación precisa ni datos de pago.",
      },
      {
        heading: "3. Finalidades y bases jurídicas",
        body: "Envío de la newsletter y atención de consultas: ejecución de un contrato o medidas precontractuales (art. 6.1.b RGPD). Estadísticas agregadas, registros de seguridad y prevención del fraude: interés legítimo (art. 6.1.f RGPD). Cookies no estrictamente necesarias: consentimiento (art. 6.1.a RGPD y art. 22 LSSI).",
      },
      {
        heading: "4. Cookies",
        body: "Utilizamos cookies estrictamente necesarias. Las cookies analíticas o de marketing solo se instalan tras el consentimiento expreso del usuario a través del banner de cookies. El consentimiento puede revocarse en cualquier momento desde el enlace « Preferencias de cookies » del pie de página. La relación completa figura en la política de cookies.",
      },
      {
        heading: "5. Destinatarios y encargados del tratamiento",
        body: "Sus datos pueden ser comunicados a encargados del tratamiento que actúan por nuestra cuenta conforme al art. 28 RGPD: Vercel (hosting), Supabase (almacenamiento), Beehiiv (envío de newsletter), Google Search Console y Bing Webmaster Tools (analítica SEO).",
      },
      {
        heading: "6. Transferencias internacionales",
        body: "Las transferencias internacionales fuera del EEE se realizan al amparo de las Cláusulas Contractuales Tipo de la Comisión Europea (art. 46 RGPD) o de una decisión de adecuación.",
      },
      {
        heading: "7. Conservación",
        body: "Datos de la newsletter: hasta que solicite la baja. Métricas agregadas: hasta 26 meses. Correspondencia: hasta 3 años. Registros de seguridad: hasta 90 días.",
      },
      {
        heading: "8. Derechos",
        body: "Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad (arts. 15-22 RGPD) escribiendo a " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Reclamación",
        body: "Tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), C/ Jorge Juan 6, 28001 Madrid, www.aepd.es.",
      },
      {
        heading: "10. Contacto",
        body: "Para cualquier consulta: " + CONTACT_EMAIL + ".",
      },
    ],
  },
  nl: {
    title: "Privacybeleid",
    intro:
      "Dit Privacybeleid beschrijft hoe InjectCompass persoonsgegevens verwerkt wanneer u injectcompass.com bezoekt, in overeenstemming met de Algemene Verordening Gegevensbescherming (Verordening (EU) 2016/679, AVG) en de Uitvoeringswet AVG (UAVG).",
    lastUpdated: "Laatst bijgewerkt: 27 april 2026",
    sections: [
      {
        heading: "1. Verwerkingsverantwoordelijke",
        body: `Verwerkingsverantwoordelijke is ${OPERATOR}, ${ADDRESS}. U kunt ons bereiken via ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Welke gegevens wij verwerken",
        body: "Wij verwerken (a) gegevens die u zelf verstrekt (e-mailadres bij nieuwsbriefinschrijving, correspondentie) en (b) gegevens die automatisch worden verzameld (serverlogs, gepseudonimiseerde statistieken: bezochte pagina's, referrer, regio bij benadering, apparaattype, browser). Wij verzamelen geen namen, exacte locatie of betaalgegevens.",
      },
      {
        heading: "3. Doeleinden en grondslagen",
        body: "Versturen van de nieuwsbrief en beantwoorden van vragen: uitvoering van een overeenkomst (art. 6 lid 1 sub b AVG). Geaggregeerde statistieken, beveiligingslogs en fraudepreventie: gerechtvaardigd belang (art. 6 lid 1 sub f AVG). Niet strikt noodzakelijke cookies: toestemming (art. 6 lid 1 sub a AVG en art. 11.7a Telecommunicatiewet).",
      },
      {
        heading: "4. Cookies",
        body: "Wij gebruiken een beperkt aantal strikt noodzakelijke cookies. Analytische en marketingcookies worden uitsluitend geplaatst na uw toestemming via de cookiebanner. U kunt uw toestemming op ieder moment intrekken via de link « Cookievoorkeuren » in de footer. De volledige lijst vindt u in ons cookiebeleid.",
      },
      {
        heading: "5. Ontvangers en verwerkers",
        body: "Wij delen gegevens met verwerkers die in opdracht van ons handelen op basis van een verwerkersovereenkomst (art. 28 AVG): Vercel (hosting), Supabase (mediaopslag), Beehiiv (nieuwsbrief) en Google Search Console / Bing Webmaster Tools.",
      },
      {
        heading: "6. Doorgifte buiten de EER",
        body: "Indien gegevens buiten de Europese Economische Ruimte worden doorgegeven, gebeurt dit op basis van de modelcontractbepalingen van de Europese Commissie (art. 46 AVG) of een adequaatheidsbesluit.",
      },
      {
        heading: "7. Bewaartermijnen",
        body: "Nieuwsbriefgegevens: tot uitschrijving. Geaggregeerde statistieken: tot 26 maanden. Correspondentie: tot 3 jaar. Beveiligingslogs: tot 90 dagen.",
      },
      {
        heading: "8. Uw rechten",
        body: "U heeft het recht op inzage, rectificatie, wissing, beperking, dataportabiliteit en bezwaar (art. 15-22 AVG). Een verzoek kunt u indienen via " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Klacht",
        body: "U kunt een klacht indienen bij de Autoriteit Persoonsgegevens (AP), Postbus 93374, 2509 AJ Den Haag, www.autoriteitpersoonsgegevens.nl.",
      },
      {
        heading: "10. Contact",
        body: "Voor vragen kunt u terecht op " + CONTACT_EMAIL + ".",
      },
    ],
  },
  pl: {
    title: "Polityka Prywatności",
    intro:
      "Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu injectcompass.com zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) oraz ustawą z dnia 10 maja 2018 r. o ochronie danych osobowych.",
    lastUpdated: "Ostatnia aktualizacja: 27 kwietnia 2026 r.",
    sections: [
      {
        heading: "1. Administrator danych",
        body: `Administratorem danych jest ${OPERATOR}, ${ADDRESS}. Kontakt: ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Zakres przetwarzanych danych",
        body: "Przetwarzamy (a) dane przekazane przez Państwa (adres e-mail przy zapisie do newslettera, korespondencja) oraz (b) dane gromadzone automatycznie (logi serwera, pseudonimizowane statystyki: odwiedzane podstrony, źródło wejścia, przybliżony region, typ urządzenia, przeglądarka). Nie gromadzimy danych identyfikujących bezpośrednio (imię, nazwisko, dokładna lokalizacja, dane płatnicze).",
      },
      {
        heading: "3. Cele i podstawy prawne",
        body: "Wysyłka newslettera i odpowiedzi na zapytania: wykonanie umowy lub działania przed jej zawarciem (art. 6 ust. 1 lit. b RODO). Statystyki, logi bezpieczeństwa i przeciwdziałanie nadużyciom: prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO). Pliki cookies inne niż niezbędne: zgoda (art. 6 ust. 1 lit. a RODO oraz art. 173 Prawa telekomunikacyjnego).",
      },
      {
        heading: "4. Pliki cookies",
        body: "Stosujemy wyłącznie niezbędne pliki cookies. Cookies analityczne i marketingowe są umieszczane dopiero po wyrażeniu zgody za pośrednictwem banera. Zgodę można wycofać w dowolnym momencie poprzez link « Preferencje cookies » w stopce. Pełen wykaz znajduje się w polityce cookies.",
      },
      {
        heading: "5. Odbiorcy danych",
        body: "Dane mogą być powierzone podmiotom przetwarzającym działającym na nasze zlecenie (art. 28 RODO): Vercel (hosting), Supabase (przechowywanie zasobów), Beehiiv (newsletter), Google Search Console i Bing Webmaster Tools.",
      },
      {
        heading: "6. Przekazywanie do państw trzecich",
        body: "Przekazywanie danych poza EOG odbywa się w oparciu o Standardowe Klauzule Umowne Komisji Europejskiej (art. 46 RODO) lub decyzję stwierdzającą odpowiedni stopień ochrony.",
      },
      {
        heading: "7. Okres przechowywania",
        body: "Dane newslettera: do momentu wypisania. Zagregowane statystyki: do 26 miesięcy. Korespondencja: do 3 lat. Logi bezpieczeństwa: do 90 dni.",
      },
      {
        heading: "8. Prawa osób, których dane dotyczą",
        body: "Przysługują Państwu prawa dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz sprzeciwu (art. 15-22 RODO). Wniosek można złożyć pisząc na adres " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Skarga",
        body: "Mają Państwo prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl.",
      },
      {
        heading: "10. Kontakt",
        body: "Pytania prosimy kierować na adres " + CONTACT_EMAIL + ".",
      },
    ],
  },
  sv: {
    title: "Integritetspolicy",
    intro:
      "Denna integritetspolicy beskriver hur InjectCompass behandlar personuppgifter när du besöker injectcompass.com, i enlighet med dataskyddsförordningen (EU) 2016/679 (GDPR) och kompletterande svensk lagstiftning (lag (2018:218) med kompletterande bestämmelser till EU:s dataskyddsförordning).",
    lastUpdated: "Senast uppdaterad: 27 april 2026",
    sections: [
      {
        heading: "1. Personuppgiftsansvarig",
        body: `Personuppgiftsansvarig är ${OPERATOR}, ${ADDRESS}. Du når oss på ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Vilka uppgifter vi behandlar",
        body: "Vi behandlar (a) uppgifter som du själv lämnar (e-postadress för nyhetsbrev, korrespondens) och (b) uppgifter som samlas in automatiskt (serverloggar, pseudonymiserad statistik: besökta sidor, hänvisande sida, ungefärlig region, enhetstyp, webbläsare). Vi samlar inte in namn, exakt position eller betalningsuppgifter.",
      },
      {
        heading: "3. Ändamål och rättsliga grunder",
        body: "Utskick av nyhetsbrev och besvarande av frågor: avtal eller åtgärder före avtal (art. 6.1 b GDPR). Aggregerad statistik, säkerhetsloggar och bedrägeribekämpning: berättigat intresse (art. 6.1 f GDPR). Icke nödvändiga kakor: samtycke (art. 6.1 a GDPR samt 6 kap. 18 § lagen om elektronisk kommunikation).",
      },
      {
        heading: "4. Kakor",
        body: "Vi använder ett begränsat antal nödvändiga kakor. Analys- och marknadsföringskakor placeras endast efter ditt samtycke via vår kakbanner. Du kan när som helst återkalla samtycket via länken « Kakinställningar » i sidfoten. Fullständig förteckning finns i vår kakpolicy.",
      },
      {
        heading: "5. Mottagare och biträden",
        body: "Vi delar uppgifter med personuppgiftsbiträden som agerar enligt vårt uppdrag (art. 28 GDPR): Vercel (hosting), Supabase (lagring), Beehiiv (nyhetsbrev) samt Google Search Console och Bing Webmaster Tools.",
      },
      {
        heading: "6. Överföring till tredje land",
        body: "Överföringar utanför EES sker med stöd av EU-kommissionens standardavtalsklausuler (art. 46 GDPR) eller ett adekvansbeslut.",
      },
      {
        heading: "7. Lagringstider",
        body: "Uppgifter för nyhetsbrev: till dess prenumerationen avslutas. Aggregerad statistik: upp till 26 månader. Korrespondens: upp till 3 år. Säkerhetsloggar: upp till 90 dagar.",
      },
      {
        heading: "8. Dina rättigheter",
        body: "Du har rätt till tillgång, rättelse, radering, begränsning, dataportabilitet och invändning (art. 15-22 GDPR). Begäran skickas till " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Klagomål",
        body: "Du kan lämna klagomål till Integritetsskyddsmyndigheten (IMY), Box 8114, 104 20 Stockholm, www.imy.se.",
      },
      {
        heading: "10. Kontakt",
        body: "Frågor besvaras på " + CONTACT_EMAIL + ".",
      },
    ],
  },
  pt: {
    title: "Política de Privacidade",
    intro:
      "A presente Política de Privacidade descreve a forma como a InjectCompass trata dados pessoais quando visita injectcompass.com, em cumprimento do Regulamento (UE) 2016/679 (RGPD) e da Lei n.º 58/2019, de 8 de agosto.",
    lastUpdated: "Última atualização: 27 de abril de 2026",
    sections: [
      {
        heading: "1. Responsável pelo tratamento",
        body: `O responsável pelo tratamento é ${OPERATOR}, ${ADDRESS}. Pode contactar-nos através de ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Dados tratados",
        body: "Tratamos (a) os dados que nos fornece (endereço de correio eletrónico para a newsletter, correspondência) e (b) os dados recolhidos automaticamente (registos de acesso, estatísticas pseudonimizadas: páginas visitadas, referenciador, região aproximada, tipo de dispositivo, navegador). Não recolhemos nome completo, localização exata nem dados de pagamento.",
      },
      {
        heading: "3. Finalidades e fundamentos jurídicos",
        body: "Envio da newsletter e resposta a pedidos: execução de contrato ou diligências pré-contratuais (art. 6.º, n.º 1, al. b RGPD). Estatísticas agregadas, registos de segurança e prevenção de fraude: interesse legítimo (art. 6.º, n.º 1, al. f RGPD). Cookies não estritamente necessários: consentimento (art. 6.º, n.º 1, al. a RGPD e art. 5.º da Lei n.º 41/2004).",
      },
      {
        heading: "4. Cookies",
        body: "Utilizamos um conjunto reduzido de cookies estritamente necessários. Cookies analíticos e de marketing apenas são instalados após o seu consentimento, através do banner. Pode retirar o consentimento a qualquer momento através do link « Preferências de cookies » no rodapé. A lista completa consta da política de cookies.",
      },
      {
        heading: "5. Destinatários e subcontratantes",
        body: "Os dados podem ser partilhados com subcontratantes que atuam por nossa conta (art. 28.º RGPD): Vercel (alojamento), Supabase (armazenamento), Beehiiv (envio da newsletter), Google Search Console e Bing Webmaster Tools.",
      },
      {
        heading: "6. Transferências internacionais",
        body: "As transferências para fora do EEE são realizadas ao abrigo das Cláusulas Contratuais-Tipo da Comissão Europeia (art. 46.º RGPD) ou de uma decisão de adequação.",
      },
      {
        heading: "7. Prazos de conservação",
        body: "Dados da newsletter: até cancelamento. Estatísticas agregadas: até 26 meses. Correspondência: até 3 anos. Registos de segurança: até 90 dias.",
      },
      {
        heading: "8. Direitos do titular",
        body: "Pode exercer os direitos de acesso, retificação, apagamento, limitação, portabilidade e oposição (arts. 15.º a 22.º RGPD), por correio eletrónico para " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Reclamação",
        body: "Pode apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), Av. D. Carlos I, 134, 1.º, 1200-651 Lisboa, www.cnpd.pt.",
      },
      {
        heading: "10. Contactos",
        body: "Para quaisquer questões: " + CONTACT_EMAIL + ".",
      },
    ],
  },
  ro: {
    title: "Politică de Confidențialitate",
    intro:
      "Prezenta Politică de Confidențialitate descrie modul în care InjectCompass prelucrează datele cu caracter personal atunci când vizitați injectcompass.com, în conformitate cu Regulamentul (UE) 2016/679 (RGPD) și cu Legea nr. 190/2018 privind măsurile de punere în aplicare a RGPD.",
    lastUpdated: "Ultima actualizare: 27 aprilie 2026",
    sections: [
      {
        heading: "1. Operatorul de date",
        body: `Operatorul de date este ${OPERATOR}, ${ADDRESS}. Ne puteți contacta la ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Categoriile de date prelucrate",
        body: "Prelucrăm (a) datele pe care ni le furnizați direct (adresa de e-mail pentru newsletter, corespondența) și (b) datele colectate automat (jurnale de acces, statistici pseudonimizate: pagini vizitate, sursa de trafic, regiunea aproximativă, tipul dispozitivului, browser). Nu colectăm numele complet, localizarea precisă sau datele de plată.",
      },
      {
        heading: "3. Scopuri și temei juridic",
        body: "Transmiterea newsletter-ului și răspunsul la solicitări: executarea unui contract sau măsuri precontractuale (art. 6 alin. (1) lit. b RGPD). Statistici agregate, jurnale de securitate și prevenirea fraudei: interes legitim (art. 6 alin. (1) lit. f RGPD). Cookie-uri care nu sunt strict necesare: consimțământ (art. 6 alin. (1) lit. a RGPD și art. 4 din Legea nr. 506/2004).",
      },
      {
        heading: "4. Cookie-uri",
        body: "Folosim un set restrâns de cookie-uri strict necesare. Cookie-urile de analiză și marketing se instalează numai după acordul dumneavoastră prin intermediul banner-ului. Consimțământul poate fi retras oricând prin linkul « Preferințe cookie » din subsolul paginii. Lista completă este disponibilă în politica privind cookie-urile.",
      },
      {
        heading: "5. Destinatari și împuterniciți",
        body: "Datele pot fi comunicate persoanelor împuternicite care acționează pe baza instrucțiunilor noastre (art. 28 RGPD): Vercel (găzduire), Supabase (stocare), Beehiiv (newsletter), Google Search Console și Bing Webmaster Tools.",
      },
      {
        heading: "6. Transferuri internaționale",
        body: "Transferurile în afara SEE se realizează în baza Clauzelor Contractuale Standard ale Comisiei Europene (art. 46 RGPD) sau a unei decizii privind nivelul adecvat de protecție.",
      },
      {
        heading: "7. Durata de păstrare",
        body: "Date newsletter: până la dezabonare. Statistici agregate: până la 26 de luni. Corespondență: până la 3 ani. Jurnale de securitate: până la 90 de zile.",
      },
      {
        heading: "8. Drepturile dumneavoastră",
        body: "Beneficiați de drepturile prevăzute la art. 15-22 RGPD: acces, rectificare, ștergere, restricționare, portabilitate și opoziție. Solicitările se trimit la " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Plângere",
        body: "Aveți dreptul să depuneți plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, București, www.dataprotection.ro.",
      },
      {
        heading: "10. Contact",
        body: "Întrebările se transmit la " + CONTACT_EMAIL + ".",
      },
    ],
  },
  cs: {
    title: "Zásady ochrany osobních údajů",
    intro:
      "Tyto Zásady ochrany osobních údajů popisují, jak společnost InjectCompass zpracovává osobní údaje při návštěvě injectcompass.com v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb., o zpracování osobních údajů.",
    lastUpdated: "Poslední aktualizace: 27. dubna 2026",
    sections: [
      {
        heading: "1. Správce",
        body: `Správcem osobních údajů je ${OPERATOR}, ${ADDRESS}. Kontakt: ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Rozsah zpracovávaných údajů",
        body: "Zpracováváme (a) údaje, které nám aktivně poskytnete (e-mailová adresa pro odběr newsletteru, korespondence), a (b) údaje získané automaticky (logy serveru, pseudonymizované statistiky: navštívené stránky, odkazující zdroj, přibližný region, typ zařízení, prohlížeč). Neshromažďujeme jméno, přesnou polohu ani platební údaje.",
      },
      {
        heading: "3. Účely a právní základy",
        body: "Zasílání newsletteru a vyřízení dotazů: plnění smlouvy nebo opatření před uzavřením smlouvy (čl. 6 odst. 1 písm. b GDPR). Agregované statistiky, bezpečnostní logy a prevence zneužití: oprávněný zájem (čl. 6 odst. 1 písm. f GDPR). Cookies, které nejsou nezbytně nutné: souhlas (čl. 6 odst. 1 písm. a GDPR a § 89 zákona č. 127/2005 Sb.).",
      },
      {
        heading: "4. Cookies",
        body: "Používáme pouze omezený počet nezbytně nutných cookies. Analytické a marketingové cookies jsou ukládány až po Vašem souhlasu vyjádřeném prostřednictvím lišty. Souhlas můžete kdykoli odvolat odkazem « Nastavení cookies » v zápatí. Úplný seznam je uveden v zásadách používání cookies.",
      },
      {
        heading: "5. Příjemci a zpracovatelé",
        body: "Údaje sdílíme se zpracovateli, kteří jednají podle našich pokynů (čl. 28 GDPR): Vercel (hosting), Supabase (úložiště), Beehiiv (rozesílka newsletteru), Google Search Console a Bing Webmaster Tools.",
      },
      {
        heading: "6. Předávání mimo EHP",
        body: "Předávání údajů mimo EHP probíhá na základě Standardních smluvních doložek Evropské komise (čl. 46 GDPR) nebo rozhodnutí o odpovídající ochraně.",
      },
      {
        heading: "7. Doba uchovávání",
        body: "Údaje pro newsletter: do odhlášení odběru. Agregované statistiky: až 26 měsíců. Korespondence: až 3 roky. Bezpečnostní logy: až 90 dní.",
      },
      {
        heading: "8. Vaše práva",
        body: "Máte právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost a vznést námitku (čl. 15-22 GDPR). Žádost zasílejte na " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Stížnost",
        body: "Můžete podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ), Pplk. Sochora 27, 170 00 Praha 7, www.uoou.cz.",
      },
      {
        heading: "10. Kontakt",
        body: "Dotazy směřujte na " + CONTACT_EMAIL + ".",
      },
    ],
  },
  no: {
    title: "Personvernerklæring",
    intro:
      "Denne personvernerklæringen beskriver hvordan InjectCompass behandler personopplysninger når du besøker injectcompass.com, i samsvar med EUs personvernforordning (forordning (EU) 2016/679, GDPR) slik den er gjennomført i norsk personopplysningslov.",
    lastUpdated: "Sist oppdatert: 27. april 2026",
    sections: [
      {
        heading: "1. Behandlingsansvarlig",
        body: `Behandlingsansvarlig er ${OPERATOR}, ${ADDRESS}. Du kan kontakte oss på ${CONTACT_EMAIL}.`,
      },
      {
        heading: "2. Hvilke opplysninger vi behandler",
        body: "Vi behandler (a) opplysninger du selv oppgir (e-postadresse ved nyhetsbrevpåmelding, korrespondanse) og (b) opplysninger som samles inn automatisk (tjenerlogger, pseudonymisert statistikk: besøkte sider, henvisende kilde, omtrentlig region, enhetstype, nettleser). Vi samler ikke inn navn, eksakt posisjon eller betalingsopplysninger.",
      },
      {
        heading: "3. Formål og rettslig grunnlag",
        body: "Utsending av nyhetsbrev og besvaring av henvendelser: oppfyllelse av avtale eller tiltak før avtaleinngåelse (art. 6 nr. 1 b GDPR). Aggregert statistikk, sikkerhetslogger og bedrageribekjempelse: berettiget interesse (art. 6 nr. 1 f GDPR). Informasjonskapsler som ikke er strengt nødvendige: samtykke (art. 6 nr. 1 a GDPR og ekomloven § 2-7b).",
      },
      {
        heading: "4. Informasjonskapsler",
        body: "Vi bruker et begrenset antall strengt nødvendige informasjonskapsler. Analyse- og markedsføringskapsler settes kun etter at du har gitt samtykke via samtykkebanneret. Samtykke kan trekkes tilbake når som helst via lenken « Innstillinger for informasjonskapsler » i bunnteksten. Full oversikt finnes i vår erklæring om informasjonskapsler.",
      },
      {
        heading: "5. Mottakere og databehandlere",
        body: "Opplysninger deles med databehandlere som handler på våre vegne i henhold til art. 28 GDPR: Vercel (drift), Supabase (lagring), Beehiiv (nyhetsbrev) samt Google Search Console og Bing Webmaster Tools.",
      },
      {
        heading: "6. Overføring til tredjeland",
        body: "Overføring av opplysninger ut av EØS skjer på grunnlag av EU-kommisjonens standard personvernbestemmelser (art. 46 GDPR) eller en beslutning om tilstrekkelig beskyttelsesnivå.",
      },
      {
        heading: "7. Lagringstid",
        body: "Nyhetsbrevdata: inntil avmelding. Aggregert statistikk: inntil 26 måneder. Korrespondanse: inntil 3 år. Sikkerhetslogger: inntil 90 dager.",
      },
      {
        heading: "8. Dine rettigheter",
        body: "Du har rett til innsyn, retting, sletting, begrensning, dataportabilitet og innsigelse (art. 15-22 GDPR). Henvendelser sendes til " + CONTACT_EMAIL + ".",
      },
      {
        heading: "9. Klage",
        body: "Du kan klage til Datatilsynet, Postboks 458 Sentrum, 0105 Oslo, www.datatilsynet.no.",
      },
      {
        heading: "10. Kontakt",
        body: "Spørsmål rettes til " + CONTACT_EMAIL + ".",
      },
    ],
  },
};
