/**
 * Per-locale affiliate-disclosure framework.
 *
 * Important: InjectCompass currently has NO active affiliate
 * relationships. Each translation explicitly states this and
 * documents the framework that will apply if affiliate links are
 * later added — including the country-appropriate disclosure label.
 */

import type { Locale } from "@/i18n/routing";
import type { PrivacyContent } from "./privacy-policy";

export const affiliateLabelByLocale: Record<Locale, string> = {
  en: "Sponsored",
  de: "Werbung",
  fr: "Publicité",
  it: "Pubblicità",
  es: "Publicidad",
  nl: "Advertentie",
  pl: "Reklama",
  sv: "Annons",
  pt: "Publicidade",
  ro: "Publicitate",
  cs: "Reklama",
  no: "Annonse",
};

const REPORT_EMAIL = "hello@injectcompass.com";

export const affiliateDisclosureContent: Record<Locale, PrivacyContent> = {
  en: {
    title: "Affiliate Disclosure",
    intro:
      "InjectCompass currently has no commercial affiliate relationships. This page documents the framework that will apply should that change.",
    lastUpdated: "Last updated: 27 April 2026",
    sections: [
      { heading: "Current status", body: "As of the date above, no link on this site pays us a commission. We do not accept payment for placement and we do not run sponsored review programmes." },
      { heading: "If we add affiliate links", body: `Where a link is commercial, it will carry the label « Sponsored » immediately adjacent to the link or as a small pill at the start of the section. The label is the same word that we use across the EU – in your locale it appears in your language ("${affiliateLabelByLocale.en}").` },
      { heading: "Commercial intent is always identified", body: "Under the EU Unfair Commercial Practices Directive (Directive 2005/29/EC), commercial relationships must be clearly recognisable. We meet that obligation by labelling each individual commercial link, by stating the relationship at the top of any article that includes one, and by maintaining this disclosure page." },
      { heading: "Editorial independence", body: "Our reviews and rankings are based on documented evidence and editorial methodology. A vendor's commission rate plays no role in whether or how we cover them." },
      { heading: "How to report concerns", body: `If you believe a piece of content is misleading or fails to disclose a commercial relationship, please write to ${REPORT_EMAIL}. We respond within seven days.` },
    ],
  },
  de: {
    title: "Werbekennzeichnung",
    intro:
      "InjectCompass unterhält derzeit keine kommerziellen Affiliate-Partnerschaften. Diese Seite dokumentiert das Kennzeichnungs-Framework, das bei einer Änderung dieses Status zur Anwendung kommt.",
    lastUpdated: "Stand: 27. April 2026",
    sections: [
      { heading: "Aktueller Status", body: "Zum Zeitpunkt dieser Erklärung sind keine Links auf dieser Website provisionspflichtig. Wir nehmen keine Zahlungen für Platzierungen entgegen und führen keine bezahlten Testberichte durch." },
      { heading: "Falls Affiliate-Links hinzukommen", body: `Werbliche Links werden unmittelbar neben dem Link oder als kleines Label am Anfang des Abschnitts mit der Angabe „Werbung“ („${affiliateLabelByLocale.de}“) gekennzeichnet. Eine pauschale Kennzeichnung im Footer ersetzt diese individuelle Markierung gemäß deutscher Rechtsprechung zu § 5a UWG nicht.` },
      { heading: "Erkennbarkeit des kommerziellen Charakters", body: "Nach § 5a Abs. 4 UWG sowie nach der EU-Richtlinie 2005/29/EG muss der kommerzielle Charakter von Inhalten unmittelbar erkennbar sein. Werbliche Beiträge werden zusätzlich am Beitragsanfang als „Werbung“ gekennzeichnet, einzelne Affiliate-Links erhalten den Hinweis am Link selbst." },
      { heading: "Redaktionelle Unabhängigkeit", body: "Bewertungen und Empfehlungen folgen unserer dokumentierten redaktionellen Methodik. Provisionshöhe oder kommerzielle Beziehungen haben keinen Einfluss auf die Auswahl oder Reihenfolge." },
      { heading: "Beanstandungen", body: `Sollten Sie einen Verstoß gegen die Kennzeichnungspflicht vermuten, wenden Sie sich bitte an ${REPORT_EMAIL}. Wir reagieren innerhalb von sieben Tagen.` },
    ],
  },
  fr: {
    title: "Divulgation d'affiliation",
    intro:
      "InjectCompass n'entretient à ce jour aucune relation d'affiliation commerciale. La présente page décrit le cadre applicable au cas où cette situation évoluerait.",
    lastUpdated: "Dernière mise à jour : 27 avril 2026",
    sections: [
      { heading: "Situation actuelle", body: "À la date ci-dessus, aucun lien présent sur le Site ne donne lieu à une commission. Nous n'acceptons aucune rémunération pour publication et n'organisons pas de programmes de tests rémunérés." },
      { heading: "En cas d'ajout de liens d'affiliation", body: `Tout lien commercial sera signalé par la mention « Publicité » placée à proximité immédiate du lien ou en début de paragraphe. Conformément à la loi du 9 juin 2023 sur l'influence commerciale, l'étiquette retenue est en français ("${affiliateLabelByLocale.fr}").` },
      { heading: "Identification du caractère commercial", body: "L'article L.121-1 du Code de la consommation et la directive 2005/29/CE imposent que le caractère commercial d'un contenu soit identifiable. Nous y répondons par un étiquetage individuel des liens, par une mention en tête d'article et par la présente page." },
      { heading: "Indépendance éditoriale", body: "Nos analyses suivent une méthodologie documentée. Le taux de commission d'un partenaire ne joue aucun rôle dans le contenu publié." },
      { heading: "Signalement", body: `Pour signaler une absence de divulgation ou un contenu trompeur, écrivez à ${REPORT_EMAIL}. Une réponse vous parviendra sous sept jours.` },
    ],
  },
  it: {
    title: "Divulgazione di affiliazione",
    intro:
      "InjectCompass non intrattiene attualmente alcun rapporto di affiliazione commerciale. La presente pagina documenta il quadro applicabile qualora questa situazione mutasse.",
    lastUpdated: "Ultimo aggiornamento: 27 aprile 2026",
    sections: [
      { heading: "Stato attuale", body: "Alla data odierna, nessun link presente sul Sito genera commissioni. Non accettiamo corrispettivi per pubblicazione né realizziamo recensioni sponsorizzate." },
      { heading: "Eventuale introduzione di link di affiliazione", body: `Eventuali link commerciali saranno contrassegnati dall'etichetta « Pubblicità » in prossimità del link o all'inizio della sezione. Conformemente al Codice IAP – Digital Chart e alla Delibera AGCOM 197/25/CONS, l'etichetta è in italiano ("${affiliateLabelByLocale.it}").` },
      { heading: "Identificabilità del carattere commerciale", body: "Il D.Lgs. 145/2007 e la Direttiva 2005/29/CE richiedono che la natura commerciale di un contenuto sia immediatamente percepibile. Adempiamo tramite etichettatura del singolo link, dichiarazione in apertura di articolo e la presente pagina." },
      { heading: "Indipendenza editoriale", body: "Le valutazioni seguono una metodologia documentata. Il tasso di commissione non influenza i contenuti." },
      { heading: "Segnalazioni", body: `Per segnalare una mancata divulgazione, scrivere a ${REPORT_EMAIL}. Risponderemo entro sette giorni.` },
    ],
  },
  es: {
    title: "Divulgación de afiliación",
    intro:
      "InjectCompass no mantiene actualmente ninguna relación de afiliación comercial. Esta página documenta el marco aplicable en caso de que dicha situación cambie.",
    lastUpdated: "Última actualización: 27 de abril de 2026",
    sections: [
      { heading: "Situación actual", body: "A la fecha indicada, ningún enlace del Sitio genera comisiones. No aceptamos pagos por inserción ni realizamos reseñas patrocinadas." },
      { heading: "Si se introducen enlaces de afiliación", body: `Cualquier enlace comercial se marcará con la etiqueta « Publicidad » situada junto al enlace o al inicio del apartado. Conforme al Código de Conducta AEA/AUTOCONTROL/IAB Spain (vigente desde octubre de 2025) la etiqueta se muestra en español ("${affiliateLabelByLocale.es}").` },
      { heading: "Identificabilidad de la naturaleza comercial", body: "La Ley 3/1991 de Competencia Desleal y la Directiva 2005/29/CE exigen que la naturaleza comercial de un contenido sea reconocible. Cumplimos identificando individualmente cada enlace, mediante una mención al inicio del artículo y a través de la presente página." },
      { heading: "Independencia editorial", body: "Las recomendaciones se basan en una metodología documentada. La tasa de comisión no influye en la cobertura editorial." },
      { heading: "Comunicación de quejas", body: `Si detecta una falta de divulgación, contacte con ${REPORT_EMAIL}. Responderemos en un plazo de siete días.` },
    ],
  },
  nl: {
    title: "Affiliate-disclosure",
    intro:
      "InjectCompass onderhoudt op dit moment geen commerciële affiliate-relaties. Deze pagina beschrijft het kader dat van toepassing wordt indien dit verandert.",
    lastUpdated: "Laatst bijgewerkt: 27 april 2026",
    sections: [
      { heading: "Huidige situatie", body: "Op de hierboven vermelde datum genereert geen enkele link op deze Website commissie. Wij aanvaarden geen betaling voor plaatsing en voeren geen gesponsorde reviews uit." },
      { heading: "Indien affiliate-links worden toegevoegd", body: `Commerciële links worden gemarkeerd met « Advertentie » direct bij de link of als label aan het begin van de sectie. Conform de Reclamecode Social Media & Influencer Marketing wordt het label in het Nederlands getoond ("${affiliateLabelByLocale.nl}").` },
      { heading: "Herkenbaarheid van commerciële inhoud", body: "Op grond van de Wet oneerlijke handelspraktijken en richtlijn 2005/29/EG moet het commerciële karakter onmiddellijk herkenbaar zijn. Wij voldoen daaraan door labels per link, een vermelding aan het begin van het artikel en deze pagina." },
      { heading: "Redactionele onafhankelijkheid", body: "Onze beoordelingen volgen een gedocumenteerde redactionele methodologie. Commissietarieven spelen geen rol." },
      { heading: "Melding van klachten", body: `Als u onjuiste of ontbrekende disclosure vermoedt, mail dan ${REPORT_EMAIL}. Wij reageren binnen zeven dagen.` },
    ],
  },
  pl: {
    title: "Ujawnienie partnerstwa",
    intro:
      "InjectCompass nie utrzymuje obecnie żadnych komercyjnych relacji partnerskich. Niniejsza strona opisuje ramy, które obowiązywać będą w przypadku zmiany tego stanu.",
    lastUpdated: "Ostatnia aktualizacja: 27 kwietnia 2026 r.",
    sections: [
      { heading: "Aktualny stan", body: "Na dzień powyższy żaden link w Serwisie nie generuje prowizji. Nie przyjmujemy płatności za publikację ani nie prowadzimy programów sponsorowanych recenzji." },
      { heading: "W razie dodania linków afiliacyjnych", body: `Linki komercyjne zostaną oznaczone etykietą « Reklama » bezpośrednio przy linku lub na początku sekcji. Zgodnie z wytycznymi UOKiK etykieta podawana jest w języku polskim ("${affiliateLabelByLocale.pl}").` },
      { heading: "Rozpoznawalność charakteru komercyjnego", body: "Ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym oraz Dyrektywa 2005/29/WE wymagają, aby komercyjny charakter treści był natychmiast rozpoznawalny. Spełniamy ten obowiązek poprzez indywidualne oznaczanie linków, wzmiankę na początku artykułu oraz niniejszą stronę." },
      { heading: "Niezależność redakcyjna", body: "Recenzje opierają się na udokumentowanej metodologii. Wysokość prowizji nie wpływa na treść." },
      { heading: "Zgłoszenia", body: `Wątpliwości można zgłaszać na ${REPORT_EMAIL}. Odpowiemy w ciągu siedmiu dni.` },
    ],
  },
  sv: {
    title: "Affilieringsupplysning",
    intro:
      "InjectCompass har för närvarande inga kommersiella affiliate-relationer. Denna sida beskriver det ramverk som gäller om situationen skulle ändras.",
    lastUpdated: "Senast uppdaterad: 27 april 2026",
    sections: [
      { heading: "Aktuell status", body: "Per datumet ovan genererar ingen länk på Webbplatsen provision. Vi tar inte betalt för placering och gör inga sponsrade recensioner." },
      { heading: "Vid tillägg av affiliatelänkar", body: `Kommersiella länkar markeras med « Annons » i direkt anslutning till länken eller som etikett i början av avsnittet. I enlighet med Konsumentverkets vägledning visas etiketten på svenska ("${affiliateLabelByLocale.sv}").` },
      { heading: "Identifierbarhet av reklam", body: "Marknadsföringslagen (2008:486) och direktiv 2005/29/EG kräver att kommersiellt innehåll är omedelbart identifierbart. Vi uppfyller detta genom märkning per länk, en notering i början av artikeln samt denna sida." },
      { heading: "Redaktionellt oberoende", body: "Våra omdömen följer en dokumenterad metodik. Provisionsnivåer påverkar inte innehållet." },
      { heading: "Anmälan", body: `Misstänker du bristande märkning? Skriv till ${REPORT_EMAIL}. Vi svarar inom sju dagar.` },
    ],
  },
  pt: {
    title: "Divulgação de afiliação",
    intro:
      "A InjectCompass não mantém atualmente quaisquer relações de afiliação comercial. A presente página documenta o regime aplicável caso essa situação se altere.",
    lastUpdated: "Última atualização: 27 de abril de 2026",
    sections: [
      { heading: "Situação atual", body: "À data indicada, nenhuma ligação no Site gera comissão. Não aceitamos pagamentos por colocação nem realizamos análises patrocinadas." },
      { heading: "Em caso de introdução de ligações de afiliação", body: `Quaisquer ligações comerciais passarão a ostentar a indicação « Publicidade » junto à ligação ou no início da secção. De acordo com o Código da Publicidade, a indicação é apresentada em português ("${affiliateLabelByLocale.pt}").` },
      { heading: "Identificação do carácter comercial", body: "O Decreto-Lei n.º 57/2008 e a Diretiva 2005/29/CE exigem que o carácter comercial de um conteúdo seja imediatamente identificável. Cumprimos por meio da identificação individual de cada ligação, da indicação no início do artigo e da presente página." },
      { heading: "Independência editorial", body: "As recomendações seguem uma metodologia documentada. O valor da comissão não condiciona a cobertura editorial." },
      { heading: "Reclamações", body: `Para reportar falta de divulgação contacte ${REPORT_EMAIL}. Respondemos em sete dias.` },
    ],
  },
  ro: {
    title: "Dezvăluire afiliere",
    intro:
      "InjectCompass nu deține în prezent nicio relație comercială de afiliere. Prezenta pagină descrie cadrul aplicabil în cazul în care situația se modifică.",
    lastUpdated: "Ultima actualizare: 27 aprilie 2026",
    sections: [
      { heading: "Stadiul actual", body: "La data de mai sus, niciun link de pe Site nu generează comisioane. Nu acceptăm plăți pentru poziționare și nu realizăm recenzii sponsorizate." },
      { heading: "În cazul adăugării de linkuri de afiliere", body: `Orice link comercial va purta marcajul « Publicitate » alături de link sau la începutul secțiunii. În conformitate cu Legea nr. 363/2007, marcajul este afișat în limba română ("${affiliateLabelByLocale.ro}").` },
      { heading: "Identificarea caracterului comercial", body: "Legea nr. 363/2007 și Directiva 2005/29/CE impun ca natura comercială a conținutului să fie imediat identificabilă. Îndeplinim această obligație prin etichetarea fiecărui link, o mențiune la începutul articolului și prezenta pagină." },
      { heading: "Independență editorială", body: "Recenziile noastre urmează o metodologie documentată. Comisionul nu influențează acoperirea editorială." },
      { heading: "Sesizări", body: `Sesizările privind lipsa de divulgare se transmit la ${REPORT_EMAIL}. Răspundem în șapte zile.` },
    ],
  },
  cs: {
    title: "Affiliate prohlášení",
    intro:
      "InjectCompass v současnosti neudržuje žádné komerční affiliate vztahy. Tato stránka popisuje rámec, který bude platit, pokud se to změní.",
    lastUpdated: "Poslední aktualizace: 27. dubna 2026",
    sections: [
      { heading: "Aktuální stav", body: "K uvedenému datu žádný odkaz na tomto Webu negeneruje provizi. Nepřijímáme platby za umístění ani neprovádíme sponzorované recenze." },
      { heading: "Pokud budou affiliate odkazy přidány", body: `Komerční odkazy budou označeny štítkem « Reklama » bezprostředně u odkazu nebo na začátku oddílu. V souladu se zákonem č. 40/1995 Sb. o regulaci reklamy je označení uvedeno v češtině ("${affiliateLabelByLocale.cs}").` },
      { heading: "Rozpoznatelnost reklamního charakteru", body: "Zákon č. 634/1992 Sb. o ochraně spotřebitele a směrnice 2005/29/ES vyžadují, aby komerční charakter obsahu byl okamžitě rozpoznatelný. Splňujeme to označením jednotlivých odkazů, poznámkou na začátku článku a touto stránkou." },
      { heading: "Redakční nezávislost", body: "Naše doporučení vycházejí z dokumentované metodiky. Výše provize nehraje roli." },
      { heading: "Hlášení", body: `Podezření na chybějící označení nahlaste na ${REPORT_EMAIL}. Odpovíme do sedmi dnů.` },
    ],
  },
  no: {
    title: "Affiliate-erklæring",
    intro:
      "InjectCompass har for tiden ingen kommersielle affiliate-forhold. Denne siden beskriver rammeverket som vil gjelde dersom situasjonen endres.",
    lastUpdated: "Sist oppdatert: 27. april 2026",
    sections: [
      { heading: "Dagens situasjon", body: "Per datoen over genererer ingen lenker på Nettstedet provisjon. Vi mottar ikke betaling for plassering og driver ikke sponsede anmeldelser." },
      { heading: "Hvis affiliate-lenker innføres", body: `Alle kommersielle lenker vil bli merket « Annonse » rett ved lenken eller i begynnelsen av avsnittet. I tråd med markedsføringsloven og Forbrukertilsynets veiledning vises merket på norsk ("${affiliateLabelByLocale.no}").` },
      { heading: "Identifiserbarhet av kommersielt innhold", body: "Markedsføringsloven og direktiv 2005/29/EF krever at kommersielt innhold er umiddelbart identifiserbart. Vi oppfyller kravet ved å merke hver lenke, ved en merknad innledningsvis i artikkelen og gjennom denne siden." },
      { heading: "Redaksjonell uavhengighet", body: "Anmeldelser følger en dokumentert metodikk. Provisjonsnivå påvirker ikke dekning." },
      { heading: "Varsling", body: `Mistanke om manglende merking meldes til ${REPORT_EMAIL}. Vi svarer innen sju dager.` },
    ],
  },
};
