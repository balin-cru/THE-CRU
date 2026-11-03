// Projektdaten. Nur belegte Angaben aus dem Brand-Skill; nichts frei getextet.
// Posterframes und Vimeo-IDs fehlen noch und stehen als Platzhalter.

export interface Projekt {
  slug: string;
  titel: string;
  subline: string;
  tags: string[];
  /** Posterframe im Format 2.39:1, sobald vorhanden. */
  poster?: string;
  /** Posterframe im Format 4:5 für Mobile. */
  posterHoch?: string;
  /** Direkter Dateilink des 15-Sekunden-Loops auf Vimeo. */
  loop?: string;
  /** Vimeo-ID des ganzen Films. */
  vimeo?: string;
  platzhalter: string;
}

/** Die drei Dokumentarfilme auf der Startseite, in dieser Reihenfolge. */
export const homeProjekte: Projekt[] = [
  {
    slug: "janik-riebli",
    titel: "Janik Riebli",
    subline: "Spitzensport trifft Hofübernahme.",
    tags: ["Documentary", "Human Story", "Obwalden"],
    platzhalter: "[POSTERFRAME_JANIK_RIEBLI]",
  },
  {
    slug: "leandro-rohner",
    titel: "Leandro Rohner",
    subline: "Auf der Pirsch in den Schweizer Alpen.",
    tags: ["Documentary", "Wildlife", "Portrait"],
    platzhalter: "[POSTERFRAME_LEANDRO_ROHNER]",
  },
  {
    slug: "baden-ist",
    titel: "Baden ist",
    subline: "Gesichter und Geschichten der Quartiere.",
    tags: ["Branded Content", "Documentary", "Kultur"],
    platzhalter: "[POSTERFRAME_BADEN_IST]",
  },
];

/** Die vier Bereiche, Reihenfolge fix: THE DOC CRU zuerst und am grössten. */
export const leistungen = [
  {
    name: "THE SOCIAL CRU",
    text: "Reels, Social-Kampagnen, Short-Form-Storytelling, Paid Social.",
  },
  {
    name: "THE DRONE CRU",
    text: "FPV- und Luftaufnahmen. Neue Perspektiven.",
  },
  {
    name: "THE DESIGN CRU",
    text: "Illustration und Art Direction, von Hand gezeichnet.",
  },
];

/** Gründer und Team. Keine erfundenen Biografien. */
export const team = [
  { name: "Balin Imfeld", rolle: "Founder / Director", telefon: "+41 76 802 60 78", telefonHref: "tel:+41768026078", platzhalter: "[BTS_BALIN]" },
  { name: "Ephraim Tännler", rolle: "Founder / DoP", telefon: "+41 79 844 32 28", telefonHref: "tel:+41798443228", platzhalter: "[BTS_EPHRAIM]" },
  { name: "Katy Tännler", rolle: "Design / Illustration", platzhalter: "[BTS_KATY]" },
];

/** Kunden, für die THE CRU gearbeitet hat. Logos liegen noch nicht vor. */
export const kunden = [
  "El Tony Mate",
  "Bucherer",
  "Stadt Baden",
  "Vettrust",
  "WoodUpp",
  "Gasser Felstechnik",
  "Küchler Technik",
  "Eberli AG",
  "CU Camper",
  "EVZ",
  "ABNOX",
];
