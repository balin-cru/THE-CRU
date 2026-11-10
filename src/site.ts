// Verifizierte Firmenangaben (Quelle: Brand-Skill THE CRU). Exakt so übernehmen.
export const company = {
  name: "THE CRU GmbH",
  uid: "CHE-136.938.387",
  vat: "CHE-136.938.387 MWST",
  street: "Lettenstrasse 7",
  zip: "6343",
  city: "Rotkreuz",
  country: "Schweiz",
  phone: "+41 79 844 32 28",
  phoneHref: "tel:+41798443228",
  email: "info@the-cru.ch",
  website: "https://the-cru.ch",
  instagram: "https://www.instagram.com/thecru.creative",
} as const;

// Adobe Fonts (Helvetica Neue, Schnitte 300/400/700): Kit-ID des Webprojekts hier eintragen,
// zum Beispiel "abc1def". Leer lassen, solange es kein Webprojekt gibt; dann gilt der Fallback.
export const adobeFontsKit = "";

// Google-Terminplaner von Balin (Inline-Einbettung, von EPHI am 2026-11-03). Kurzlink: https://calendar.app.google/fApaZb7ZBqKw43t26
// Ephraim hat noch keinen eigenen Terminplaner.
export const bookingUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2GG4-RSG8OxUYJojIxJoQgHiQUPMJqGL5yxVnyHZ_Kj9Z8XpkQYpvhanO-MyROyf9tI7lIoBoQ?gv=true";

// Platzhalterfilm für alle Video-Kacheln, bis die echten Loops und Filme vorliegen.
// Von EPHI gesetzt: https://vimeo.com/1221579862
export const platzhalterVimeo = "1221579862";

/** Pfad mit Basis-URL, damit Links unter /THE-CRU/ und später unter der Domain funktionieren. */
export const url = (path = "") => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
