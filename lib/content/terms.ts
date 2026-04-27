/**
 * Per-locale Terms of Service for InjectCompass.
 *
 * Native legal register per locale; same structure as privacy-policy.ts.
 */

import type { Locale } from "@/i18n/routing";
import type { PrivacyContent, PrivacySection } from "./privacy-policy";

export type TermsContent = PrivacyContent;

const CONTACT_EMAIL = "hello@injectcompass.com";
const JURISDICTION = "[Operator's chosen jurisdiction]";

const sections = (entries: PrivacySection[]) => entries;

export const termsContent: Record<Locale, TermsContent> = {
  en: {
    title: "Terms of Service",
    intro:
      "By accessing injectcompass.com (the \"Site\"), you agree to these Terms. If you do not agree, please do not use the Site.",
    lastUpdated: "Last updated: 27 April 2026",
    sections: sections([
      { heading: "1. Educational content", body: "InjectCompass publishes patient-education and reference content about injectable medications. Nothing on the Site constitutes medical, pharmaceutical, or legal advice. We do not diagnose, treat, cure or prevent any disease. Always consult a licensed prescriber before starting, stopping or changing any injectable medication." },
      { heading: "2. Accuracy", body: "Content is provided \"as is\" without warranty. We update articles regularly but evidence and regulations evolve. If you spot an error, write to corrections@injectcompass.com." },
      { heading: "3. Intellectual property", body: "All content is owned by or licensed to the operator. You may share excerpts with attribution. You may not republish full articles, train AI models on the content at scale, or use our marks in a way that implies endorsement." },
      { heading: "4. User obligations", body: "You agree not to scrape the Site at industrial scale, attempt to bypass security controls, or use the Site for unlawful purposes." },
      { heading: "5. Affiliate links", body: "Some links may be affiliate links. Where this is the case, the link is labelled and disclosed. See our affiliate disclosure for details." },
      { heading: "6. No warranties", body: "We disclaim all warranties to the maximum extent permitted by law, including warranties of merchantability, fitness for a particular purpose, and non-infringement." },
      { heading: "7. Limitation of liability", body: "To the maximum extent permitted by law, we are not liable for indirect, incidental or consequential damages. Our total aggregate liability for any claim is limited to EUR 100." },
      { heading: "8. Changes", body: "We may update these Terms. Continued use after a change constitutes acceptance of the updated Terms." },
      { heading: "9. Governing law", body: `These Terms are governed by the laws of ${JURISDICTION}. Mandatory consumer protections under your country of residence remain unaffected.` },
      { heading: "10. Contact", body: `Questions: ${CONTACT_EMAIL}.` },
    ]),
  },
  de: {
    title: "Nutzungsbedingungen",
    intro:
      "Mit dem Zugriff auf injectcompass.com („Website“) akzeptieren Sie diese Nutzungsbedingungen. Sind Sie mit den Bedingungen nicht einverstanden, nutzen Sie die Website bitte nicht.",
    lastUpdated: "Stand: 27. April 2026",
    sections: sections([
      { heading: "1. Geltungsbereich und Inhalte", body: "InjectCompass stellt patientenbildende Referenzinhalte zu Injektionsarzneimitteln bereit. Die Inhalte ersetzen keine ärztliche, pharmazeutische oder rechtliche Beratung. Wir diagnostizieren nicht und stellen keine Heilversprechen. Konsultieren Sie stets eine verschreibungsberechtigte Ärztin oder einen verschreibungsberechtigten Arzt, bevor Sie eine Injektionstherapie beginnen, beenden oder ändern." },
      { heading: "2. Aktualität und Haftungsausschluss", body: "Die Inhalte werden regelmäßig aktualisiert. Trotz sorgfältiger Prüfung übernehmen wir keine Gewähr für Aktualität, Vollständigkeit oder Richtigkeit. Hinweise auf Fehler richten Sie bitte an corrections@injectcompass.com." },
      { heading: "3. Urheberrecht", body: "Alle Inhalte sind urheberrechtlich geschützt. Eine Verwertung außerhalb der gesetzlichen Schranken bedarf unserer schriftlichen Zustimmung. Zitate sind unter Angabe der Quelle zulässig. Eine maschinelle Auswertung großen Umfangs (insbesondere Training generativer Modelle) ist untersagt (§ 44b UrhG)." },
      { heading: "4. Pflichten der Nutzer:innen", body: "Sie verpflichten sich, die Website nicht missbräuchlich zu nutzen, insbesondere keine automatisierten Massenabfragen durchzuführen oder Sicherheitsmaßnahmen zu umgehen." },
      { heading: "5. Affiliate-Links", body: "Einzelne Links können Affiliate-Links sein. Diese sind ausdrücklich als „Werbung“ gekennzeichnet. Einzelheiten finden Sie in unserer Werbekennzeichnung." },
      { heading: "6. Gewährleistung", body: "Soweit gesetzlich zulässig, schließen wir jede ausdrückliche oder konkludente Gewährleistung aus, insbesondere hinsichtlich Marktgängigkeit, Eignung für einen bestimmten Zweck und Rechtsmangelfreiheit." },
      { heading: "7. Haftungsbeschränkung", body: "Wir haften nur für Vorsatz und grobe Fahrlässigkeit sowie für Schäden, die auf einer Verletzung wesentlicher Vertragspflichten beruhen. In diesem Fall ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt. Die Haftung nach dem Produkthaftungsgesetz und für Verletzungen von Leben, Körper oder Gesundheit bleibt unberührt." },
      { heading: "8. Änderungen", body: "Wir behalten uns vor, diese Bedingungen zu ändern. Wesentliche Änderungen kennzeichnen wir am Anfang dieser Seite mit einem aktualisierten Stand." },
      { heading: "9. Anwendbares Recht und Gerichtsstand", body: `Es gilt das Recht von ${JURISDICTION}, mit Ausnahme der Bestimmungen des internationalen Privatrechts. Zwingende Verbraucherschutzrechte des gewöhnlichen Aufenthaltsstaates bleiben unberührt.` },
      { heading: "10. Kontakt", body: `Anfragen: ${CONTACT_EMAIL}.` },
    ]),
  },
  fr: {
    title: "Conditions d'utilisation",
    intro:
      "En accédant à injectcompass.com (le « Site »), vous acceptez les présentes Conditions. Si vous ne les acceptez pas, veuillez ne pas utiliser le Site.",
    lastUpdated: "Dernière mise à jour : 27 avril 2026",
    sections: sections([
      { heading: "1. Objet et nature des contenus", body: "InjectCompass publie des contenus pédagogiques de référence sur les médicaments injectables. Les contenus n'ont pas vocation à se substituer à un avis médical, pharmaceutique ou juridique. Le Site n'établit aucun diagnostic et ne propose aucun traitement. Consultez systématiquement un professionnel de santé habilité à prescrire avant de débuter, modifier ou interrompre un traitement injectable." },
      { heading: "2. Exactitude", body: "Les contenus sont mis à disposition « en l'état », sans garantie. Nous procédons à des mises à jour régulières mais les données scientifiques et la réglementation évoluent. Tout signalement d'erreur peut être adressé à corrections@injectcompass.com." },
      { heading: "3. Propriété intellectuelle", body: "L'ensemble des contenus est protégé par le droit d'auteur. Toute reproduction substantielle nécessite notre accord écrit. La citation courte avec mention de la source est autorisée (art. L.122-5 CPI). L'extraction par moissonnage automatisé en vue d'entraîner des modèles génératifs est expressément réservée." },
      { heading: "4. Obligations de l'utilisateur", body: "Vous vous engagez à utiliser le Site dans le respect de la loi, à ne pas contourner les mesures de sécurité, ni à effectuer d'extraction automatisée massive." },
      { heading: "5. Liens d'affiliation", body: "Certains liens peuvent constituer des liens d'affiliation. Ils sont alors clairement signalés comme « Publicité ». Voir notre divulgation d'affiliation." },
      { heading: "6. Garanties", body: "Dans la limite autorisée par la loi, nous excluons toute garantie expresse ou implicite, notamment d'aptitude à un usage particulier ou d'absence de contrefaçon." },
      { heading: "7. Limitation de responsabilité", body: "Dans la limite autorisée par la loi, nous ne saurions être tenus responsables des dommages indirects ou consécutifs. Notre responsabilité globale est limitée à 100 €. Les dispositions impératives du droit de la consommation demeurent applicables." },
      { heading: "8. Modifications", body: "Les présentes Conditions peuvent être modifiées. La poursuite de l'utilisation du Site après modification vaut acceptation." },
      { heading: "9. Loi applicable et juridiction", body: `Les présentes Conditions sont régies par le droit de ${JURISDICTION}, sans préjudice des dispositions impératives du droit du consommateur de votre pays de résidence.` },
      { heading: "10. Contact", body: `Toute question : ${CONTACT_EMAIL}.` },
    ]),
  },
  it: {
    title: "Termini di Servizio",
    intro:
      "Accedendo a injectcompass.com (il « Sito »), l'utente accetta i presenti Termini. In caso di disaccordo, si invita l'utente a non utilizzare il Sito.",
    lastUpdated: "Ultimo aggiornamento: 27 aprile 2026",
    sections: sections([
      { heading: "1. Natura dei contenuti", body: "InjectCompass pubblica contenuti educativi di riferimento sui medicinali iniettabili. I contenuti non costituiscono parere medico, farmaceutico o legale. Il Sito non diagnostica né cura alcuna malattia. Consultare sempre un medico prescrittore prima di iniziare, modificare o sospendere una terapia iniettiva." },
      { heading: "2. Accuratezza", body: "I contenuti sono forniti « così come sono », senza garanzie. Le segnalazioni di errore possono essere inviate a corrections@injectcompass.com." },
      { heading: "3. Proprietà intellettuale", body: "Tutti i contenuti sono protetti dalla legge sul diritto d'autore (Legge 633/1941). È consentita la citazione con indicazione della fonte. La riproduzione integrale e l'estrazione massiva ai fini di addestramento di modelli di IA sono espressamente vietate." },
      { heading: "4. Obblighi dell'utente", body: "L'utente si impegna a non utilizzare il Sito per finalità illecite, a non eludere le misure di sicurezza e a non effettuare estrazioni automatizzate di grandi volumi di dati." },
      { heading: "5. Link di affiliazione", body: "Alcuni link possono essere link di affiliazione. In tal caso sono segnalati con l'indicazione « Pubblicità ». Si rinvia alla divulgazione di affiliazione." },
      { heading: "6. Garanzie", body: "Nei limiti consentiti dalla legge, sono escluse garanzie espresse o implicite di commerciabilità, idoneità a uno scopo particolare e non violazione di diritti di terzi." },
      { heading: "7. Limitazione di responsabilità", body: "Nei limiti consentiti dalla legge, non rispondiamo dei danni indiretti o consequenziali. La responsabilità complessiva è limitata a 100 €. Restano fermi i diritti inderogabili del consumatore." },
      { heading: "8. Modifiche", body: "I presenti Termini possono essere modificati. L'uso continuato del Sito costituisce accettazione delle modifiche." },
      { heading: "9. Legge applicabile e foro", body: `I presenti Termini sono regolati dalla legge di ${JURISDICTION}, fatte salve le norme imperative a tutela del consumatore.` },
      { heading: "10. Contatti", body: `Per quesiti: ${CONTACT_EMAIL}.` },
    ]),
  },
  es: {
    title: "Términos del Servicio",
    intro:
      "Al acceder a injectcompass.com (el « Sitio »), usted acepta los presentes Términos. Si no está de acuerdo, le rogamos no utilice el Sitio.",
    lastUpdated: "Última actualización: 27 de abril de 2026",
    sections: sections([
      { heading: "1. Naturaleza del contenido", body: "InjectCompass publica contenidos divulgativos de referencia sobre medicamentos inyectables. Los contenidos no constituyen consejo médico, farmacéutico ni jurídico. El Sitio no diagnostica ni trata enfermedad alguna. Consulte siempre a un profesional sanitario habilitado antes de iniciar, modificar o suspender un tratamiento inyectable." },
      { heading: "2. Exactitud", body: "Los contenidos se prestan « tal cual », sin garantía. Los avisos de error pueden remitirse a corrections@injectcompass.com." },
      { heading: "3. Propiedad intelectual", body: "Todos los contenidos están protegidos por la legislación sobre propiedad intelectual (Real Decreto Legislativo 1/1996). La cita corta con indicación de la fuente está permitida. La reproducción íntegra y la minería masiva con fines de entrenamiento de modelos de IA quedan reservadas." },
      { heading: "4. Obligaciones del usuario", body: "El usuario se obliga a no utilizar el Sitio con fines ilícitos, a no eludir las medidas de seguridad y a no realizar extracciones automatizadas masivas." },
      { heading: "5. Enlaces de afiliación", body: "Algunos enlaces pueden ser enlaces de afiliación. En tal caso se identifican como « Publicidad ». Véase la divulgación de afiliación." },
      { heading: "6. Garantías", body: "En la medida permitida por la ley, se excluyen las garantías expresas o implícitas, en particular de comerciabilidad, adecuación a un fin determinado y no infracción." },
      { heading: "7. Limitación de responsabilidad", body: "En la medida permitida por la ley, no respondemos de daños indirectos o consecuentes. La responsabilidad agregada se limita a 100 €. Los derechos imperativos del consumidor permanecen intactos." },
      { heading: "8. Modificaciones", body: "Podemos modificar estos Términos. El uso continuado del Sitio supone la aceptación de los cambios." },
      { heading: "9. Ley aplicable y jurisdicción", body: `Los presentes Términos se rigen por la ley de ${JURISDICTION}, sin perjuicio de las disposiciones imperativas de protección al consumidor del país de residencia.` },
      { heading: "10. Contacto", body: `Consultas: ${CONTACT_EMAIL}.` },
    ]),
  },
  nl: {
    title: "Gebruiksvoorwaarden",
    intro:
      "Door injectcompass.com (de « Website ») te bezoeken, aanvaardt u deze Voorwaarden. Indien u niet akkoord gaat, verzoeken wij u de Website niet te gebruiken.",
    lastUpdated: "Laatst bijgewerkt: 27 april 2026",
    sections: sections([
      { heading: "1. Aard van de inhoud", body: "InjectCompass publiceert patiëntenvoorlichting en referentiemateriaal over injecteerbare geneesmiddelen. De inhoud vormt geen medisch, farmaceutisch of juridisch advies. De Website diagnosticeert noch behandelt enige aandoening. Raadpleeg altijd een bevoegde voorschrijver voordat u een injecteerbare behandeling start, wijzigt of stopt." },
      { heading: "2. Juistheid", body: "De inhoud wordt « as is » aangeboden, zonder garantie. Onjuistheden kunnen worden gemeld via corrections@injectcompass.com." },
      { heading: "3. Intellectuele eigendom", body: "Alle inhoud is auteursrechtelijk beschermd. Korte citaten met bronvermelding zijn toegestaan. Volledige overname en grootschalige tekst- en datamining ten behoeve van het trainen van AI-modellen zijn voorbehouden." },
      { heading: "4. Gebruikersverplichtingen", body: "U verbindt zich ertoe de Website niet voor onrechtmatige doeleinden te gebruiken, beveiligingsmaatregelen niet te omzeilen en geen geautomatiseerde grootschalige extractie uit te voeren." },
      { heading: "5. Affiliate-links", body: "Sommige links kunnen affiliate-links zijn. Deze zijn aangeduid als « Advertentie ». Zie onze affiliate-disclosure." },
      { heading: "6. Garanties", body: "Voor zover wettelijk toegestaan worden alle expliciete of impliciete garanties uitgesloten, waaronder verkoopbaarheid, geschiktheid voor een bepaald doel en niet-inbreuk." },
      { heading: "7. Aansprakelijkheid", body: "Voor zover wettelijk toegestaan zijn wij niet aansprakelijk voor indirecte of gevolgschade. De totale aansprakelijkheid is beperkt tot € 100. Dwingendrechtelijke consumentenrechten blijven onverlet." },
      { heading: "8. Wijzigingen", body: "Deze Voorwaarden kunnen worden gewijzigd. Voortgezet gebruik na wijziging geldt als aanvaarding." },
      { heading: "9. Toepasselijk recht", body: `Op deze Voorwaarden is het recht van ${JURISDICTION} van toepassing, onverminderd dwingende consumentenbescherming in het land van uw gewone verblijfplaats.` },
      { heading: "10. Contact", body: `Vragen: ${CONTACT_EMAIL}.` },
    ]),
  },
  pl: {
    title: "Regulamin",
    intro:
      "Korzystając z injectcompass.com (« Serwis »), akceptują Państwo niniejszy Regulamin. W razie braku akceptacji prosimy nie korzystać z Serwisu.",
    lastUpdated: "Ostatnia aktualizacja: 27 kwietnia 2026 r.",
    sections: sections([
      { heading: "1. Charakter treści", body: "InjectCompass publikuje materiały edukacyjne dotyczące leków iniekcyjnych. Treści nie stanowią porady medycznej, farmaceutycznej ani prawnej. Serwis nie diagnozuje ani nie leczy. Przed rozpoczęciem, zmianą lub przerwaniem terapii iniekcyjnej należy skonsultować się z lekarzem uprawnionym do wystawiania recept." },
      { heading: "2. Aktualność", body: "Treści udostępniane są « w stanie, w jakim się znajdują », bez gwarancji. Błędy można zgłaszać na adres corrections@injectcompass.com." },
      { heading: "3. Prawa autorskie", body: "Wszystkie treści chronione są prawem autorskim (ustawa z dnia 4 lutego 1994 r.). Krótkie cytaty z podaniem źródła są dozwolone. Zwielokrotnianie w celach komercyjnych oraz eksploracja tekstu i danych do trenowania modeli sztucznej inteligencji są zastrzeżone." },
      { heading: "4. Obowiązki Użytkownika", body: "Użytkownik zobowiązuje się do niekorzystania z Serwisu w sposób sprzeczny z prawem, do nieobchodzenia zabezpieczeń i niewykonywania zautomatyzowanego pobierania danych na masową skalę." },
      { heading: "5. Linki afiliacyjne", body: "Niektóre linki mogą być linkami afiliacyjnymi i są oznaczone jako « Reklama ». Szczegóły w polityce ujawnień partnerskich." },
      { heading: "6. Brak gwarancji", body: "W zakresie dozwolonym przez prawo wyłączamy wszelkie gwarancje, w szczególności co do przydatności do określonego celu." },
      { heading: "7. Ograniczenie odpowiedzialności", body: "W zakresie dozwolonym przez prawo nie odpowiadamy za szkody pośrednie ani następcze. Łączna odpowiedzialność ograniczona jest do równowartości 100 EUR. Bezwzględnie obowiązujące przepisy o ochronie konsumentów pozostają w mocy." },
      { heading: "8. Zmiany", body: "Regulamin może ulec zmianie. Dalsze korzystanie z Serwisu oznacza akceptację zmian." },
      { heading: "9. Prawo właściwe", body: `Regulamin podlega prawu ${JURISDICTION}, z zastrzeżeniem bezwzględnie obowiązujących przepisów o ochronie konsumentów państwa zwykłego pobytu Użytkownika.` },
      { heading: "10. Kontakt", body: `Pytania: ${CONTACT_EMAIL}.` },
    ]),
  },
  sv: {
    title: "Användarvillkor",
    intro:
      "Genom att besöka injectcompass.com (« Webbplatsen ») godkänner du dessa villkor. Om du inte godkänner villkoren ber vi dig att inte använda Webbplatsen.",
    lastUpdated: "Senast uppdaterad: 27 april 2026",
    sections: sections([
      { heading: "1. Innehållets karaktär", body: "InjectCompass publicerar utbildande referensmaterial om injicerbara läkemedel. Innehållet utgör inte medicinsk, farmaceutisk eller juridisk rådgivning. Webbplatsen ställer inga diagnoser och behandlar inga sjukdomar. Rådfråga alltid en legitimerad förskrivare innan du påbörjar, ändrar eller avslutar en injektionsbehandling." },
      { heading: "2. Riktighet", body: "Innehållet tillhandahålls « i befintligt skick », utan garantier. Felaktigheter kan rapporteras till corrections@injectcompass.com." },
      { heading: "3. Immateriella rättigheter", body: "Allt innehåll är skyddat av upphovsrättslagen (1960:729). Citat med källangivelse är tillåtna. Storskalig text- och datautvinning för träning av AI-modeller är förbehållen." },
      { heading: "4. Användarens åtaganden", body: "Du åtar dig att inte använda Webbplatsen i strid med lag, inte kringgå säkerhetsåtgärder och inte utföra storskalig automatiserad datautvinning." },
      { heading: "5. Affiliatelänkar", body: "Vissa länkar kan vara affiliatelänkar. De märks då med « Annons ». Se vår affilieringsupplysning." },
      { heading: "6. Garantier", body: "I den mån lag tillåter friskriver vi oss från alla uttryckliga och underförstådda garantier, inklusive säljbarhet och lämplighet för visst ändamål." },
      { heading: "7. Ansvarsbegränsning", body: "I den mån lag tillåter ansvarar vi inte för indirekta skador eller följdskador. Det sammanlagda ansvaret är begränsat till 100 EUR. Tvingande konsumenträttigheter påverkas inte." },
      { heading: "8. Ändringar", body: "Villkoren kan komma att uppdateras. Fortsatt användning innebär att du godkänner ändringarna." },
      { heading: "9. Tillämplig lag", body: `Dessa villkor regleras av lagen i ${JURISDICTION}, utan att inkräkta på tvingande konsumenträttigheter i ditt hemvistland.` },
      { heading: "10. Kontakt", body: `Frågor: ${CONTACT_EMAIL}.` },
    ]),
  },
  pt: {
    title: "Termos de Utilização",
    intro:
      "Ao aceder a injectcompass.com (o « Site »), aceita os presentes Termos. Se não concordar, abstenha-se de utilizar o Site.",
    lastUpdated: "Última atualização: 27 de abril de 2026",
    sections: sections([
      { heading: "1. Natureza do conteúdo", body: "A InjectCompass publica conteúdos educativos de referência sobre medicamentos injetáveis. Os conteúdos não constituem aconselhamento médico, farmacêutico ou jurídico. O Site não diagnostica nem trata qualquer patologia. Consulte sempre um profissional de saúde com competência prescritora antes de iniciar, alterar ou suspender uma terapêutica injetável." },
      { heading: "2. Exatidão", body: "Os conteúdos são disponibilizados « tal como estão », sem garantia. Erros podem ser comunicados para corrections@injectcompass.com." },
      { heading: "3. Propriedade intelectual", body: "Todos os conteúdos estão protegidos pelo Código do Direito de Autor e dos Direitos Conexos. São permitidas citações com indicação da fonte. A reprodução integral e a recolha automatizada para treino de modelos de IA são reservadas." },
      { heading: "4. Obrigações do utilizador", body: "Compromete-se a não utilizar o Site para fins ilícitos, a não contornar medidas de segurança e a não realizar extrações automatizadas em larga escala." },
      { heading: "5. Ligações de afiliação", body: "Algumas ligações podem ser de afiliação, sendo então identificadas como « Publicidade ». Consulte a divulgação de afiliação." },
      { heading: "6. Garantias", body: "Na medida permitida por lei, excluímos garantias expressas ou implícitas, incluindo comerciabilidade e adequação a um fim específico." },
      { heading: "7. Limitação de responsabilidade", body: "Na medida permitida por lei, não respondemos por danos indiretos ou consequentes. A responsabilidade total está limitada a 100 €. Os direitos imperativos do consumidor mantêm-se inalterados." },
      { heading: "8. Alterações", body: "Os Termos podem ser alterados. A utilização continuada do Site corresponde à aceitação das alterações." },
      { heading: "9. Lei aplicável", body: `Os presentes Termos regem-se pela lei de ${JURISDICTION}, sem prejuízo das normas imperativas de proteção do consumidor do país de residência habitual.` },
      { heading: "10. Contactos", body: `Questões: ${CONTACT_EMAIL}.` },
    ]),
  },
  ro: {
    title: "Termeni și Condiții",
    intro:
      "Prin accesarea injectcompass.com (« Site-ul »), acceptați prezenții Termeni. Dacă nu sunteți de acord, vă rugăm să nu utilizați Site-ul.",
    lastUpdated: "Ultima actualizare: 27 aprilie 2026",
    sections: sections([
      { heading: "1. Natura conținutului", body: "InjectCompass publică materiale educaționale de referință privind medicamentele injectabile. Conținutul nu reprezintă consultanță medicală, farmaceutică sau juridică. Site-ul nu diagnostichează și nu tratează nicio afecțiune. Consultați întotdeauna un medic prescriptor înainte de a începe, modifica sau întrerupe o terapie injectabilă." },
      { heading: "2. Acuratețe", body: "Conținutul este oferit « ca atare », fără garanții. Erorile pot fi semnalate la corrections@injectcompass.com." },
      { heading: "3. Proprietate intelectuală", body: "Întregul conținut este protejat prin Legea nr. 8/1996 privind drepturile de autor. Citarea cu indicarea sursei este permisă. Reproducerea integrală și extragerea automatizată în vederea antrenării modelelor de inteligență artificială sunt rezervate." },
      { heading: "4. Obligațiile utilizatorului", body: "Utilizatorul se obligă să nu folosească Site-ul în scopuri ilegale, să nu eludeze măsurile de securitate și să nu efectueze extrageri automate la scară largă." },
      { heading: "5. Linkuri de afiliere", body: "Unele linkuri pot fi linkuri de afiliere, marcate ca « Publicitate ». A se vedea dezvăluirea de afiliere." },
      { heading: "6. Garanții", body: "În limita permisă de lege, excludem garanțiile exprese sau implicite, inclusiv privind vandabilitatea și adecvarea pentru un anumit scop." },
      { heading: "7. Limitarea răspunderii", body: "În limita permisă de lege, nu răspundem pentru daune indirecte sau pe cale de consecință. Răspunderea totală este limitată la 100 EUR. Drepturile imperative ale consumatorilor rămân neafectate." },
      { heading: "8. Modificări", body: "Termenii pot fi modificați. Continuarea utilizării Site-ului reprezintă acceptarea modificărilor." },
      { heading: "9. Lege aplicabilă", body: `Termenii sunt guvernați de legea ${JURISDICTION}, fără a aduce atingere dispozițiilor imperative privind protecția consumatorilor din statul de reședință obișnuită.` },
      { heading: "10. Contact", body: `Întrebări: ${CONTACT_EMAIL}.` },
    ]),
  },
  cs: {
    title: "Podmínky používání",
    intro:
      "Vstupem na injectcompass.com (« Web ») přijímáte tyto podmínky. Pokud s nimi nesouhlasíte, Web prosím nepoužívejte.",
    lastUpdated: "Poslední aktualizace: 27. dubna 2026",
    sections: sections([
      { heading: "1. Povaha obsahu", body: "InjectCompass zveřejňuje vzdělávací referenční obsah o injekčně podávaných léčivých přípravcích. Obsah nenahrazuje lékařskou, lékárenskou ani právní radu. Web nestanovuje diagnózu a neléčí žádné onemocnění. Před zahájením, změnou či ukončením injekční terapie vždy konzultujte oprávněného předepisujícího lékaře." },
      { heading: "2. Aktuálnost", body: "Obsah je poskytován « tak, jak je », bez záruky. Chyby lze hlásit na corrections@injectcompass.com." },
      { heading: "3. Duševní vlastnictví", body: "Veškerý obsah je chráněn autorským zákonem č. 121/2000 Sb. Krátké citace s uvedením zdroje jsou povoleny. Hromadné rozmnožování a vytěžování dat za účelem trénování modelů umělé inteligence je vyhrazeno." },
      { heading: "4. Povinnosti uživatele", body: "Uživatel se zavazuje nepoužívat Web v rozporu s právními předpisy, neobcházet bezpečnostní opatření a neprovádět hromadné automatizované stahování dat." },
      { heading: "5. Affiliate odkazy", body: "Některé odkazy mohou být affiliate odkazy a jsou označeny jako « Reklama ». Viz naše affiliate prohlášení." },
      { heading: "6. Záruky", body: "V rozsahu povoleném zákonem vylučujeme veškeré výslovné i konkludentní záruky, včetně záruk prodejnosti a vhodnosti pro určitý účel." },
      { heading: "7. Omezení odpovědnosti", body: "V rozsahu povoleném zákonem neodpovídáme za nepřímé ani následné škody. Celková odpovědnost je omezena na 100 EUR. Tím nejsou dotčena kogentní ustanovení o ochraně spotřebitele." },
      { heading: "8. Změny", body: "Tyto podmínky mohou být změněny. Pokračováním v používání Webu vyjadřujete souhlas se změnami." },
      { heading: "9. Rozhodné právo", body: `Podmínky se řídí právem ${JURISDICTION}, aniž by tím byla dotčena kogentní ustanovení o ochraně spotřebitele státu obvyklého bydliště.` },
      { heading: "10. Kontakt", body: `Dotazy: ${CONTACT_EMAIL}.` },
    ]),
  },
  no: {
    title: "Bruksvilkår",
    intro:
      "Ved å bruke injectcompass.com (« Nettstedet ») godtar du disse vilkårene. Hvis du ikke godtar vilkårene, ber vi deg om å ikke bruke Nettstedet.",
    lastUpdated: "Sist oppdatert: 27. april 2026",
    sections: sections([
      { heading: "1. Innholdets karakter", body: "InjectCompass publiserer pasientopplysende referanseinnhold om injiserbare legemidler. Innholdet utgjør ikke medisinsk, farmasøytisk eller juridisk rådgivning. Nettstedet stiller ikke diagnoser og behandler ikke sykdommer. Rådfør deg alltid med en autorisert forskrivende lege før du starter, endrer eller avslutter en injeksjonsbehandling." },
      { heading: "2. Riktighet", body: "Innholdet leveres « som det er », uten garantier. Feil kan rapporteres til corrections@injectcompass.com." },
      { heading: "3. Immaterielle rettigheter", body: "Alt innhold er vernet av åndsverkloven. Korte sitater med kildeangivelse er tillatt. Storskala tekst- og datautvinning for trening av KI-modeller er forbeholdt." },
      { heading: "4. Brukerens forpliktelser", body: "Du forplikter deg til å ikke bruke Nettstedet i strid med lov, ikke omgå sikkerhetstiltak og ikke utføre storskala automatisert datainnhenting." },
      { heading: "5. Affiliate-lenker", body: "Enkelte lenker kan være affiliate-lenker og er merket « Annonse ». Se vår affiliate-erklæring." },
      { heading: "6. Garantier", body: "Så langt loven tillater fraskriver vi oss enhver uttrykkelig eller underforstått garanti, herunder salgbarhet og egnethet for et bestemt formål." },
      { heading: "7. Ansvarsbegrensning", body: "Så langt loven tillater er vi ikke ansvarlige for indirekte tap eller følgetap. Det samlede ansvaret er begrenset til 100 EUR. Ufravikelige forbrukerrettigheter berøres ikke." },
      { heading: "8. Endringer", body: "Vilkårene kan endres. Fortsatt bruk av Nettstedet anses som aksept av endringene." },
      { heading: "9. Lovvalg", body: `Disse vilkårene reguleres av loven i ${JURISDICTION}, uten å påvirke ufravikelige forbrukerrettigheter i ditt bostedsland.` },
      { heading: "10. Kontakt", body: `Spørsmål: ${CONTACT_EMAIL}.` },
    ]),
  },
};
