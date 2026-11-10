// Inhalte der Website. Nur belegte Angaben aus dem Brand-Skill und von EPHI; nichts frei erfunden.
// Was fehlt, steht als sichtbarer Platzhalter in eckigen Klammern.

export type Kategorie = "doku" | "werbung" | "social";

export const kategorien: { id: Kategorie; name: string }[] = [
  { id: "doku", name: "Dokumentarfilm" },
  { id: "werbung", name: "Werbung und Branded" },
  { id: "social", name: "Social Media" },
];

export interface Bild { src: string; alt: string; w: number; h: number }

export interface Projekt {
  slug: string;
  titel: string;
  /** Titel mit Schweizer Anführungszeichen, falls nötig. */
  anzeige?: string;
  subline: string;
  tags: string[];
  kategorien: Kategorie[];
  /** Belegte Sätze zur Geschichte. */
  geschichte: string[];
  /** Farbton der Platzhalterfläche, solange kein Bild da ist. */
  tint: string;
  /** Titelbild (liegt in public/bilder). */
  bild?: Bild & { fokus?: string };
  bilder?: Bild[];
  /** Vimeo-ID des ganzen Films; fehlt sie, läuft der Platzhalterfilm. */
  vimeo?: string;
  kunde?: string;
  jahr?: string;
}

export const projekte: Projekt[] = [
  {
    slug: "janik-riebli",
    titel: "Janik Riebli",
    subline: "Spitzensport trifft Hofübernahme.",
    tags: ["Documentary", "Human Story", "Obwalden"],
    kategorien: ["doku"],
    geschichte: [
      "Der Obwaldner Langläufer Janik Riebli startet in seine letzte Saison als Profisportler. Danach übernimmt er den Hof seiner Eltern.",
      "Eine Geschichte über Anfänge, eine intensive Lehrzeit, Spitzensport und die Verbundenheit mit der Heimat.",
    ],
    tint: "t-janik",
    bild: { src: "bilder/janik-riebli.jpg", alt: "Janik Riebli sitzt auf einer Wiese vor dem Hof seiner Eltern", w: 2400, h: 1350, fokus: "54% 40%" },
    bilder: [
      { src: "bilder/janik-riebli.jpg", alt: "Janik Riebli auf der Wiese vor dem Hof", w: 2400, h: 1350 },
      { src: "bilder/janik-riebli-langlauf.jpg", alt: "Janik Riebli beim Langlauf, schwarzweiss", w: 1800, h: 1201 },
    ],
  },
  {
    slug: "leandro-rohner",
    titel: "Leandro Rohner",
    subline: "Auf der Pirsch in den Schweizer Alpen.",
    tags: ["Documentary", "Wildlife", "Portrait"],
    kategorien: ["doku"],
    geschichte: [
      "Leandro Rohner steht als junger Wildtierfotograf am Anfang seiner Laufbahn.",
      "Wir haben ihn auf seinen Einsätzen in der Natur begleitet, auch in klirrender Kälte.",
    ],
    tint: "t-leandro",
  },
  {
    slug: "baden-ist",
    titel: "Baden ist",
    anzeige: "«Baden ist»",
    subline: "Gesichter und Geschichten der Quartiere.",
    tags: ["Branded Content", "Documentary", "Kultur"],
    kategorien: ["doku", "werbung"],
    geschichte: [
      "Ein Format über Menschen, Geschichten und Persönlichkeiten aus den verschiedenen Quartieren von Baden.",
    ],
    tint: "t-baden",
    kunde: "Stadt Baden",
  },
  {
    slug: "el-tony-mate",
    titel: "El Tony Mate",
    subline: "20 Reels voller Outdoor-Vibe und Swissness.",
    tags: ["Social Media", "Commercial", "Paid Ads"],
    kategorien: ["werbung", "social"],
    geschichte: [
      "Im Sommer 2026 sind 20 Reels entstanden, unter anderem auf einem abgelegenen Biwak, im Alpstein und am Lungerersee.",
      "Outdoor, Swissness und echte Momente. Die Videos lieferten überdurchschnittliche Ergebnisse und funktionierten besonders gut als Paid Ads.",
    ],
    tint: "t-social",
    kunde: "El Tony Mate",
    jahr: "2026",
  },
  {
    slug: "bucherer-cpo",
    titel: "Bucherer CPO",
    subline: "Handwerkskunst trifft Social Reach.",
    tags: ["Social Media", "Luxury", "Aftermovie"],
    kategorien: ["werbung", "social"],
    geschichte: [
      "Katy hat live Uhrenarmbänder bemalt. THE CRU hat dazu Aftermovies für die Social-Kanäle von Bucherer produziert.",
      "Die Videos erreichten insgesamt mehr als zwei Millionen Aufrufe.",
    ],
    tint: "t-design",
    kunde: "Bucherer",
  },
];

/** Die drei Filme auf der Startseite, in dieser Reihenfolge. */
export const startProjekte = ["janik-riebli", "leandro-rohner", "baden-ist"].map((s) => projekte.find((p) => p.slug === s)!);

export const team = [
  { name: "Balin Imfeld", rolle: "Founder / Director", bild: "bilder/balin.jpg", telefon: "+41 76 802 60 78", telefonHref: "tel:+41768026078", mail: "balin@the-cru.ch", termin: true },
  { name: "Ephraim Tännler", rolle: "Founder / DoP", bild: "bilder/ephraim.jpg", telefon: "+41 79 844 32 28", telefonHref: "tel:+41798443228", mail: "ephraim@the-cru.ch", termin: false },
  { name: "Katy Tännler", rolle: "Design / Illustration" },
] as { name: string; rolle: string; bild?: string; telefon?: string; telefonHref?: string; mail?: string; termin?: boolean }[];

/** Kundenlogos im Laufband, farbig im Original (Breite und Höhe aus public/bilder/logos.json). */
export const kunden = [
  { slug: "el-tony-mate", name: "El Tony Mate" },
  { slug: "bucherer", name: "Bucherer" },
  { slug: "baden-ist", name: "Stadt Baden" },
  { slug: "woodupp", name: "WoodUpp" },
  { slug: "gasser-felstechnik", name: "Gasser Felstechnik" },
  { slug: "kuechler-technik", name: "Küchler Technik" },
  { slug: "eberli", name: "Eberli AG" },
  { slug: "whatever-man", name: "Whatever Man" },
  { slug: "cu-camper", name: "CU Camper" },
  { slug: "evz", name: "EVZ" },
];

/** Häufige Fragen: Fragen stehen, die Antworten liefert THE CRU noch. */
export const faq = [
  { frage: "Was kostet ein Film bei euch?", antwort: "[ANTWORT_KOSTEN]" },
  { frage: "Wie lange dauert eine Produktion?", antwort: "[ANTWORT_DAUER]" },
  { frage: "Wie läuft ein Projekt mit THE CRU ab?", antwort: "[ANTWORT_ABLAUF]" },
  { frage: "Dreht ihr auch ausserhalb der Zentralschweiz?", antwort: "[ANTWORT_REGION]" },
  { frage: "Bekommen wir auch Formate für Social Media?", antwort: "[ANTWORT_FORMATE]" },
];
