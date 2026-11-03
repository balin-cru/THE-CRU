// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Solange die Domain the-cru.ch noch nicht auf GitHub Pages zeigt, läuft die Seite unter
// https://balin-cru.github.io/THE-CRU/. Für die eigene Domain im Deploy-Workflow
// SITE_URL=https://the-cru.ch und BASE_PATH=/ setzen und public/CNAME anlegen.
const site = process.env.SITE_URL ?? "https://balin-cru.github.io";
const base = process.env.BASE_PATH ?? "/THE-CRU";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
