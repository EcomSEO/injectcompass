/**
 * National regulatory authorities (medicines + data protection) per
 * locale, used by the Footer's "Regulatory authorities" strip.
 */

import type { Locale } from "@/i18n/routing";

export type Authority = { name: string; url: string };

export const AUTHORITIES_BY_LOCALE: Record<Locale, Authority[]> = {
  en: [{ name: "Health authorities: contact your national medicines agency", url: "https://www.ema.europa.eu/" }],
  de: [
    { name: "BfArM (medicines)", url: "https://www.bfarm.de" },
    { name: "BfDI (data protection)", url: "https://www.bfdi.bund.de" },
  ],
  fr: [
    { name: "ANSM (médicaments)", url: "https://ansm.sante.fr" },
    { name: "CNIL (données personnelles)", url: "https://www.cnil.fr" },
  ],
  it: [
    { name: "AIFA (farmaci)", url: "https://www.aifa.gov.it" },
    { name: "Garante (privacy)", url: "https://www.garanteprivacy.it" },
  ],
  es: [
    { name: "AEMPS (medicamentos)", url: "https://www.aemps.gob.es" },
    { name: "AEPD (protección de datos)", url: "https://www.aepd.es" },
  ],
  nl: [
    { name: "CBG-MEB (geneesmiddelen)", url: "https://www.cbg-meb.nl" },
    { name: "AP (gegevensbescherming)", url: "https://www.autoriteitpersoonsgegevens.nl" },
  ],
  pl: [
    { name: "GIS (nadzór sanitarny)", url: "https://www.gov.pl/web/gis" },
    { name: "UODO (ochrona danych)", url: "https://www.uodo.gov.pl" },
  ],
  sv: [
    { name: "Läkemedelsverket", url: "https://www.lakemedelsverket.se" },
    { name: "IMY (dataskydd)", url: "https://www.imy.se" },
  ],
  pt: [
    { name: "INFARMED (medicamentos)", url: "https://www.infarmed.pt" },
    { name: "CNPD (proteção de dados)", url: "https://www.cnpd.pt" },
  ],
  ro: [
    { name: "ANSVSA (siguranța alimentară)", url: "https://www.ansvsa.ro" },
    { name: "ANSPDCP (protecția datelor)", url: "https://www.dataprotection.ro" },
  ],
  cs: [
    { name: "SZPI (potraviny)", url: "https://www.szpi.gov.cz" },
    { name: "ÚOOÚ (ochrana údajů)", url: "https://www.uoou.cz" },
  ],
  no: [
    { name: "Mattilsynet (mattrygghet)", url: "https://www.mattilsynet.no" },
    { name: "Datatilsynet (personvern)", url: "https://www.datatilsynet.no" },
  ],
};
