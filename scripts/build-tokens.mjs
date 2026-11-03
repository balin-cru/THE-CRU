// Erzeugt src/styles/tokens.css aus src/styles/tokens.json.
// tokens.json ist die einzige Quelle; tokens.css nie von Hand bearbeiten.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../src/styles/", import.meta.url));
const tokens = JSON.parse(readFileSync(dir + "tokens.json", "utf8"));

const themes = tokens.color.themes.map((t) => t.id);
const resolve = (value) => value.replace(/\{([a-z0-9-]+)\}/g, (_, name) => `var(--${name})`);

const lines = [];
const block = (selector, body) => lines.push(`${selector} {`, ...body.map((l) => `  ${l}`), "}", "");

// Farben pro Theme. Nacht ist Standard für die ganze Seite.
for (const theme of themes) {
  const selector = theme === themes[0] ? `:root, [data-theme="${theme}"]` : `[data-theme="${theme}"]`;
  block(
    selector,
    tokens.color.tokens.map((t) => `--${t.name}: ${resolve(t.value[theme])};`),
  );
}

// Alle übrigen Tokens sind themenunabhängig.
const flat = [];
flat.push(`--font-sans: ${tokens.type.families.sans};`);
for (const group of ["spacing", "radius", "layout", "breakpoint", "aspect", "duration", "easing", "zIndex"]) {
  for (const t of tokens[group].tokens) flat.push(`--${t.name}: ${t.value};`);
}
block(":root", flat);

// Mobile-Werte aus den Token-Notizen.
block("@media (max-width: 1023px)", [":root { --header-height: 64px; --page-margin: var(--margin-tablet); }"]);
block("@media (max-width: 767px)", [":root { --page-margin: var(--margin-mobile); }"]);

const header = "/* Automatisch erzeugt aus tokens.json (npm run tokens). Nicht von Hand bearbeiten. */\n\n";
writeFileSync(dir + "tokens.css", header + lines.join("\n"));
console.log("tokens.css geschrieben");
