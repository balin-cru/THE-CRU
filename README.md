# THE CRU Website

Website von THE CRU GmbH. Astro, TypeScript und Tailwind CSS v4, Grundlage ist das freigegebene Design System (Version 19).

Die Seite ist live unter https://balin-cru.github.io/THE-CRU/. Die Domain the-cru.ch folgt, wenn die Website fertig ist.

## Veröffentlichen

Jeder Merge auf `main` baut die Website und veröffentlicht sie automatisch auf GitHub Pages (`.github/workflows/deploy.yml`). Pull Requests werden nur gebaut und geprüft, nicht veröffentlicht.

Einmalig in GitHub: **Settings → Pages → Build and deployment → Source: «GitHub Actions»**.

## Lokal arbeiten

Voraussetzung ist Node.js 22 (aktuelle Version).

```bash
npm install
npm run dev      # Entwicklung auf http://localhost:4321/THE-CRU/
npm run build    # Tokens erzeugen, Typen prüfen, Website nach dist/ bauen
npm run preview  # gebaute Website ansehen
```

## Aufbau

```
src/
  styles/tokens.json      Design-Tokens, einzige Quelle (aus dem Design System)
  styles/tokens.css       erzeugt aus tokens.json (npm run tokens), nicht im Repo
  styles/components.css   Bausteine aus dem Design System
  styles/site.css         Ergänzungen der Umsetzung (Menü, Textseiten)
  styles/global.css       Tailwind v4 mit @theme aus den Tokens
  components/             Header, Sucherleiste, Hero, Kontaktwege, Footer
  layouts/Base.astro      Grundgerüst jeder Seite (Meta, Theme, Header, Footer)
  pages/                  eine Datei pro Seite
  site.ts                 verifizierte Firmenangaben und Einstellungen
public/logos/             Original-Logos (Creme und Nacht)
```

## Offen

- Adobe-Fonts-Webprojekt: Kit-ID in `src/site.ts` (`adobeFontsKit`) eintragen. Bis dahin Helvetica oder Arial aus dem System.
- Showreel: Loop-Datei und Vimeo-ID für den Hero.
- Buchungskalender-URL für «Termin vereinbaren» (`bookingUrl`), bis dahin E-Mail.
- Impressum: vertretungsberechtigte Personen. Datenschutzerklärung.
- Eigene Domain: im Workflow `SITE_URL=https://the-cru.ch` und `BASE_PATH=/` setzen, `public/CNAME` mit `the-cru.ch` anlegen, DNS beim Domain-Anbieter auf GitHub Pages zeigen lassen.
