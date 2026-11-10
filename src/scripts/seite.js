// Bewegung und Bedienung für alle Seiten. Ohne JavaScript bleibt alles lesbar und bedienbar.
const ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fein = matchMedia("(hover: hover) and (pointer: fine)").matches;
const kopf = document.getElementById("kopf");
const menue = document.getElementById("menue");
const platzhalterVimeo = document.body.dataset.vimeo || "";

// Haltungssatz: Wörter leuchten beim Scrollen auf
const satz = document.getElementById("haltung-satz");
let woerter = [];
if (satz && !ruhig) {
  const glutZahl = satz.querySelector(".glut-teil")?.textContent.trim().split(/\s+/).length || 0;
  const teile = satz.textContent.trim().split(/\s+/);
  satz.textContent = "";
  teile.forEach((t, i) => {
    const s = document.createElement("span");
    s.className = "w ist-aus" + (i >= teile.length - glutZahl ? " glut" : "");
    s.textContent = t;
    satz.append(s, i < teile.length - 1 ? " " : "");
  });
  woerter = [...satz.querySelectorAll(".w")];
}

// Kopfzeile färbt sich je Block, verschwindet beim Runterscrollen; Scroll-Effekte
let letzteY = 0;
const klemmen = (v) => Math.max(0, Math.min(1, v));
const toene = [...document.querySelectorAll("[data-ton]")];
const scroller = [...document.querySelectorAll("[data-scroll]")];
const tick = () => {
  const vh = innerHeight, y = scrollY;
  const offen = menue.classList.contains("ist-offen");
  const unter = toene.find((s) => { const r = s.getBoundingClientRect(); return r.height && r.top <= 36 && r.bottom > 36; });
  kopf.classList.toggle("ist-creme", !offen && !!unter && unter.dataset.ton === "creme");
  if (!offen) kopf.classList.toggle("ist-weg", y > 400 && y > letzteY + 2);
  if (y < letzteY - 2 || y < 400) kopf.classList.remove("ist-weg");
  letzteY = y;
  if (ruhig) return;
  scroller.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (el.classList.contains("hero")) el.style.setProperty("--p", klemmen(-r.top / r.height).toFixed(4));
    else if (el.hasAttribute("data-parallax")) el.style.setProperty("--py", ((klemmen((vh - r.top) / (vh + r.height)) - .5) * -r.height * .14).toFixed(1) + "px");
    else if (el.hasAttribute("data-aufziehen")) el.style.setProperty("--e", klemmen((vh - r.top) / (vh * .75)).toFixed(4));
    else if (el.hasAttribute("data-woerter") && woerter.length) {
      const n = Math.round(klemmen((vh * .85 - r.top) / (vh * .7)) * woerter.length);
      woerter.forEach((w, i) => w.classList.toggle("ist-aus", i >= n));
    }
  });
};
let geplant = false;
addEventListener("scroll", () => { if (!geplant) { geplant = true; requestAnimationFrame(() => { geplant = false; tick(); }); } }, { passive: true });
addEventListener("resize", tick);
tick();

// Showreel im Hintergrund: Vimeo-Hintergrundfilm, blendet erst ein, wenn er geladen ist
document.querySelectorAll("[data-hintergrund]").forEach((box) => {
  const id = box.dataset.hintergrund || platzhalterVimeo;
  if (!id) return;
  const f = document.createElement("iframe");
  f.src = `https://player.vimeo.com/video/${id}?background=1&dnt=1`;
  f.title = "Showreel im Hintergrund";
  f.allow = "autoplay; fullscreen; picture-in-picture";
  f.setAttribute("aria-hidden", "true"); f.tabIndex = -1;
  f.addEventListener("load", () => setTimeout(() => f.classList.add("ist-da"), 600));
  box.append(f);
});

// Referenz-Slider
document.querySelectorAll("[data-slider]").forEach((s) => {
  const spur = s.querySelector(".spur");
  const [zur, vor] = s.querySelectorAll(".rund");
  const schritt = () => (spur.querySelector(".karte")?.getBoundingClientRect().width || 300) + 24;
  const stand = () => { zur.disabled = spur.scrollLeft < 4; vor.disabled = spur.scrollLeft + spur.clientWidth > spur.scrollWidth - 4; };
  zur.addEventListener("click", () => spur.scrollBy({ left: -schritt() }));
  vor.addEventListener("click", () => spur.scrollBy({ left: schritt() }));
  spur.addEventListener("scroll", stand, { passive: true });
  addEventListener("resize", stand); stand();
});

// Zeiger: kleine Glut-Bubble über Filmen, Filmvorschau bei den Leistungen
const zeiger = document.getElementById("zeiger");
const vorschau = document.getElementById("vorschau");
const vorschauFilm = document.getElementById("vorschau-film");
if (fein) {
  let zx = 0, zy = 0, ax = 0, ay = 0, vx = 0, vy = 0, laeuft = false;
  const folgen = () => {
    ax += (zx - ax) * .35; ay += (zy - ay) * .35;
    vx += (zx - vx) * .16; vy += (zy - vy) * .16;
    zeiger.style.translate = `${ax}px ${ay}px`;
    vorschau.style.left = `${vx}px`; vorschau.style.top = `${vy}px`;
    if (Math.abs(zx - vx) + Math.abs(zy - vy) > .3) requestAnimationFrame(folgen); else laeuft = false;
  };
  addEventListener("pointermove", (e) => {
    zx = e.clientX; zy = e.clientY;
    zeiger.classList.toggle("ist-an", !!e.target.closest(".filmlink"));
    const d = e.target.closest(".dienst");
    vorschau.classList.toggle("ist-an", !!d);
    if (d && !vorschauFilm.classList.contains(d.dataset.vorschau)) vorschauFilm.className = `film ${d.dataset.vorschau}`;
    if (!laeuft) { laeuft = true; requestAnimationFrame(folgen); }
  }, { passive: true });
  addEventListener("pointerdown", () => zeiger.classList.add("ist-gedrueckt"));
  addEventListener("pointerup", () => zeiger.classList.remove("ist-gedrueckt"));
  document.addEventListener("pointerleave", () => { zeiger.classList.remove("ist-an"); vorschau.classList.remove("ist-an"); });
}

// Vollbild: Klick auf die Kachel spielt den Film im Vimeo-Player
const vollbild = document.getElementById("vollbild");
const vollbildFilm = document.getElementById("vollbild-film");
const vollbildProjekt = document.getElementById("vollbild-projekt");
let ausloeser = null;
document.querySelectorAll("[data-oeffnet]").forEach((k) => k.addEventListener("click", () => {
  ausloeser = k;
  document.getElementById("vollbild-titel").textContent = k.dataset.oeffnet;
  vollbildFilm.className = `film ${k.dataset.tonFilm || "t-reel"}`;
  const id = k.dataset.vimeo || platzhalterVimeo;
  vollbildFilm.querySelector("iframe")?.remove();
  if (id) {
    const f = document.createElement("iframe");
    f.src = `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`;
    f.title = k.dataset.oeffnet; f.allow = "autoplay; fullscreen; picture-in-picture"; f.allowFullscreen = true;
    vollbildFilm.append(f);
  }
  vollbildProjekt.hidden = !k.dataset.projekt;
  if (k.dataset.projekt) vollbildProjekt.href = k.dataset.projekt;
  zeiger.classList.remove("ist-an");
  try { vollbild.showModal(); } catch (e) { vollbild.setAttribute("open", ""); }
}));
document.getElementById("vollbild-zu").addEventListener("click", () => vollbild.close());
vollbildProjekt.addEventListener("click", () => vollbild.close());
vollbild.addEventListener("close", () => {
  vollbildFilm.querySelector("iframe")?.remove();
  if (ausloeser && ausloeser.isConnected) ausloeser.focus({ preventScroll: true });
});

// Menü: derselbe Knopf öffnet und schliesst, er bleibt an seinem Platz
const auf = document.getElementById("menue-auf");
const setze = (offen) => {
  menue.classList.toggle("ist-offen", offen); kopf.classList.toggle("ist-menue", offen); kopf.classList.remove("ist-weg");
  auf.setAttribute("aria-expanded", String(offen)); auf.textContent = offen ? "Schliessen" : "Menü";
  document.body.style.overflow = offen ? "hidden" : ""; tick();
};
auf.addEventListener("click", () => setze(!menue.classList.contains("ist-offen")));
menue.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setze(false)));
addEventListener("keydown", (e) => { if (e.key === "Escape" && menue.classList.contains("ist-offen")) { setze(false); auf.focus(); } });
document.querySelectorAll(".kopf__kontakt").forEach((a) => a.addEventListener("click", () => menue.classList.contains("ist-offen") && setze(false)));

// Teamfotos wischen beim ersten Auftauchen herein; Titel steigen aus ihrer Zeile
if (!ruhig && "IntersectionObserver" in window) {
  const beobachte = (sel, rand) => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove("warten"); io.unobserve(e.target); } }), { rootMargin: `0px 0px ${rand} 0px` });
    document.querySelectorAll(sel).forEach((el) => { if (el.getBoundingClientRect().top > innerHeight) el.classList.add("warten"); io.observe(el); });
  };
  beobachte(".rahmen", "-12%");
  beobachte("[data-reveal]", "-8%");
}

// Laufbänder: laufen immer, das Scrollen gibt Tempo und Richtung
const laeufe = ruhig ? [] : [...document.querySelectorAll("[data-lauf]")].map((el) => ({ el, spur: el.firstElementChild, dir: Number(el.dataset.lauf) || -1, tempo: Number(el.dataset.tempo) || .5, schraeg: el.hasAttribute("data-schraeg"), x: 0 }));
let tempoScroll = 0, altY = scrollY;
const laufen = () => {
  const y = scrollY; tempoScroll += ((y - altY) - tempoScroll) * .12; altY = y;
  const schub = Math.max(-40, Math.min(40, tempoScroll));
  laeufe.forEach((l) => {
    const breite = l.spur.scrollWidth / 2 || 1;
    l.x += l.dir * (l.tempo + Math.abs(schub) * .35) * (schub < -1 ? -1 : 1);
    if (l.x <= -breite) l.x += breite; if (l.x > 0) l.x -= breite;
    l.spur.style.transform = `translate3d(${l.x.toFixed(1)}px,0,0)` + (l.schraeg ? ` skewX(${(-schub * .25).toFixed(2)}deg)` : "");
  });
  requestAnimationFrame(laufen);
};
if (laeufe.length) requestAnimationFrame(laufen);

if (fein && !ruhig) {
  // Filmkacheln kippen leicht zum Zeiger
  document.querySelectorAll(".lauf .filmlink, .karte .filmlink, .intro-film, .person .rahmen, .projekt-kachel .filmlink").forEach((k) => {
    k.classList.add("kipp");
    k.addEventListener("pointermove", (e) => { const r = k.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      k.style.transform = `perspective(1000px) rotateY(${(px * 5).toFixed(2)}deg) rotateX(${(-py * 5).toFixed(2)}deg)`; });
    k.addEventListener("pointerleave", () => (k.style.transform = ""));
  });
  // Knöpfe ziehen sich leicht zum Zeiger
  document.querySelectorAll(".pille, .rund").forEach((b) => {
    if (b.closest(".kopf")) return;
    b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); b.style.translate = `${((e.clientX - r.left - r.width / 2) * .06).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * .1).toFixed(1)}px`; });
    b.addEventListener("pointerleave", () => (b.style.translate = ""));
  });
}

// Projekte filtern
document.querySelectorAll("[data-filter-leiste]").forEach((leiste) => {
  const kacheln = [...document.querySelectorAll("[data-kategorien]")];
  const leer = document.querySelector("[data-filter-leer]");
  leiste.querySelectorAll("[data-filter]").forEach((b) => b.addEventListener("click", () => {
    const f = b.dataset.filter;
    leiste.querySelectorAll("[data-filter]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    let n = 0;
    kacheln.forEach((k) => { const an = f === "alle" || k.dataset.kategorien.split(" ").includes(f); k.hidden = !an; if (an) n++; });
    if (leer) leer.hidden = n > 0;
  }));
});

// Formular: prüfen, dann die fertige Nachricht im Mailprogramm öffnen
document.querySelectorAll("[data-wachsen]").forEach((t) => t.addEventListener("input", () => { t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }));
document.querySelectorAll("[data-formular]").forEach((f) => {
  const fehler = f.querySelector(".formular__fehler");
  const danke = f.parentElement.querySelector(".danke");
  f.addEventListener("input", (e) => e.target.closest(".feld")?.classList.remove("ist-fehler"));
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const falsch = [...f.querySelectorAll("input, textarea")].filter((el) => !el.checkValidity());
    f.querySelectorAll(".feld").forEach((x) => x.classList.remove("ist-fehler"));
    falsch.forEach((el) => el.closest(".feld").classList.add("ist-fehler"));
    if (falsch.length) {
      const namen = falsch.map((el) => f.querySelector(`label[for="${el.id}"]`).textContent);
      fehler.textContent = `Bitte prüfe: ${namen.join(", ")}.`; fehler.hidden = false; falsch[0].focus(); return;
    }
    const d = new FormData(f);
    const leistungen = d.getAll("leistung").join(", ");
    const zeilen = [
      `Name: ${d.get("name")}`, `E-Mail: ${d.get("email")}`,
      d.get("telefon") && `Telefon: ${d.get("telefon")}`, d.get("website") && `Website: ${d.get("website")}`,
      leistungen && `Leistung: ${leistungen}`, "", d.get("nachricht"),
      d.get("referenzen") && `\nWeitere Referenzen:\n${d.get("referenzen")}`,
    ].filter((z) => z !== null && z !== undefined && z !== false);
    location.href = `mailto:${f.dataset.an}?subject=${encodeURIComponent("Anfrage über the-cru.ch" + (leistungen ? `: ${leistungen}` : ""))}&body=${encodeURIComponent(zeilen.join("\n"))}`;
    fehler.hidden = true; f.hidden = true; danke.hidden = false; danke.focus();
  });
  danke.querySelector("[data-nochmal]").addEventListener("click", () => { f.reset(); f.querySelectorAll("textarea").forEach((t) => (t.style.height = "")); danke.hidden = true; f.hidden = false; f.querySelector("input").focus(); });
});

// Termin-Fenster: öffnet bei der Person, ohne neuen Tab
const termin = document.getElementById("termin");
const terminInhalt = document.getElementById("termin-inhalt");
let terminVon = null;
document.querySelectorAll("[data-termin]").forEach((k) => k.addEventListener("click", () => {
  terminVon = k;
  document.getElementById("termin-titel").textContent = k.dataset.termin;
  document.getElementById("termin-notlink").href = k.dataset.terminLink;
  const alt = terminInhalt.querySelector("iframe");
  if (!alt || alt.dataset.src !== k.dataset.terminSrc) {
    alt?.remove();
    const f = document.createElement("iframe");
    f.src = k.dataset.terminSrc; f.dataset.src = k.dataset.terminSrc; f.title = `Termin buchen mit ${k.dataset.termin}`;
    terminInhalt.prepend(f);
  }
  try { termin.showModal(); } catch (e) { termin.setAttribute("open", ""); }
}));
document.getElementById("termin-zu").addEventListener("click", () => termin.close());
termin.addEventListener("click", (e) => { if (e.target === termin) termin.close(); });
termin.addEventListener("close", () => terminVon && terminVon.focus({ preventScroll: true }));
