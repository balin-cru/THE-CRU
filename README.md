# THE-CRU Website

Eine einfache statische Webseite mit automatischem GitHub Pages Deployment.

---

## 🚀 Quick Start (für Einsteiger)

### Voraussetzungen installieren

#### 1. Node.js installieren

Node.js ist die Laufzeitumgebung für die Build-Tools.

**macOS:**
1. Öffne Terminal (Cmd + Leertaste → "Terminal" eingeben)
2. Installiere Homebrew (falls noch nicht vorhanden):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Installiere Node.js:
   ```bash
   brew install node
   ```

**Windows:**
1. Gehe zu [nodejs.org](https://nodejs.org)
2. Lade die LTS-Version herunter
3. Führe den Installer aus (alle Standardoptionen beibehalten)
4. Starte den Computer neu

**Überprüfen der Installation:**
```bash
node --version
npm --version
```
Beide Befehle sollten eine Versionsnummer anzeigen (z.B. `v20.x.x`).

#### 2. Git installieren (falls nicht vorhanden)

**macOS:**
```bash
brew install git
```

**Windows:**
Lade Git von [git-scm.com](https://git-scm.com) herunter und installiere es.

---

## 📦 Projekt einrichten

### 1. Repository klonen
```bash
git clone https://github.com/DEIN-USERNAME/THE-CRU.git
cd THE-CRU
```

### 2. Dependencies installieren
```bash
npm install
```

### 3. Lokale Entwicklung starten
```bash
npm run dev
```
Öffne dann [http://localhost:3000](http://localhost:3000) im Browser.

---

## 🌐 GitHub Pages Deployment

### Einmalige Konfiguration auf GitHub

1. **Gehe zu deinem Repository auf GitHub**
   - https://github.com/DEIN-USERNAME/THE-CRU

2. **Öffne die Settings**
   - Klicke auf "Settings" (Zahnrad-Symbol oben rechts im Repository)

3. **Navigiere zu Pages**
   - In der linken Seitenleiste: "Pages" unter "Code and automation"

4. **Konfiguriere die Source**
   - **Source:** "Deploy from a branch"
   - **Branch:** `gh-pages` (wird automatisch erstellt beim ersten Deploy)
   - **Folder:** `/ (root)`
   - Klicke "Save"

5. **Warte auf den ersten Deploy**
   - Nach dem ersten `npm run ship` erscheint der `gh-pages` Branch
   - GitHub erstellt dann automatisch die Webseite

### Deployen

```bash
npm run ship
```

Dieser Befehl:
1. Löscht alte Build-Dateien
2. Kopiert alle Dateien aus `src/` nach `build/client/`
3. Erstellt eine 404.html für SPA-Routing
4. Erstellt `.nojekyll` (deaktiviert Jekyll-Processing)
5. Kopiert die CNAME-Datei (falls vorhanden)
6. Pusht alles zum `gh-pages` Branch

### Deine Webseite URL

Nach erfolgreichem Deploy ist deine Seite erreichbar unter:
```
https://DEIN-USERNAME.github.io/THE-CRU/
```

---

## 📁 Projektstruktur

```
THE-CRU/
├── src/                    # Deine Webseiten-Dateien
│   ├── index.html          # Hauptseite
│   ├── styles.css          # Styles
│   └── script.js           # JavaScript
├── build/                  # (automatisch generiert)
├── CNAME                   # Custom Domain (optional)
├── package.json            # Projekt-Konfiguration
├── .gitignore              # Git-Ausschlüsse
└── README.md               # Diese Datei
```

---

## ✏️ Webseite bearbeiten

### Dateien ändern
Bearbeite die Dateien im `src/` Ordner:
- `index.html` - HTML-Struktur
- `styles.css` - Design und Layout
- `script.js` - Interaktivität

### Neue Seiten hinzufügen
1. Erstelle eine neue HTML-Datei in `src/` (z.B. `about.html`)
2. Verlinke sie in der Navigation in `index.html`
3. Deploye mit `npm run ship`

### Bilder hinzufügen
1. Erstelle einen Ordner `src/images/`
2. Lege deine Bilder dort ab
3. Verwende sie in HTML: `<img src="images/mein-bild.jpg" alt="Beschreibung">`

---

## 🌍 Eigene Domain verwenden (optional)

1. **CNAME-Datei bearbeiten**
   Öffne `CNAME` und ersetze den Inhalt mit deiner Domain:
   ```
   meine-domain.ch
   ```

2. **DNS bei deinem Domain-Anbieter konfigurieren**
   
   Für eine Apex-Domain (z.B. `meine-domain.ch`):
   - Erstelle A-Records mit diesen IP-Adressen:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   
   Für eine Subdomain (z.B. `www.meine-domain.ch`):
   - Erstelle einen CNAME-Record:
     ```
     www → DEIN-USERNAME.github.io
     ```

3. **Deploy ausführen**
   ```bash
   npm run ship
   ```

4. **HTTPS aktivieren**
   - Gehe zu Repository Settings → Pages
   - Aktiviere "Enforce HTTPS"

---

## 📋 Verfügbare Befehle

| Befehl | Beschreibung |
|--------|--------------|
| `npm run dev` | Startet lokalen Entwicklungsserver auf Port 3000 |
| `npm run build` | Erstellt den Build-Ordner |
| `npm run deploy` | Pusht Build zum gh-pages Branch |
| `npm run ship` | Build + Deploy in einem Schritt |

---

## ❓ Häufige Probleme

### "gh-pages branch not found"
→ Führe zuerst `npm run ship` aus. Der Branch wird automatisch erstellt.

### "Permission denied" beim Deploy
→ Stelle sicher, dass du Schreibrechte auf das Repository hast und eingeloggt bist:
```bash
git config --global user.email "deine@email.ch"
git config --global user.name "Dein Name"
```

### Änderungen werden nicht angezeigt
→ Warte 1-2 Minuten nach dem Deploy. GitHub Pages braucht Zeit zum Aktualisieren.
→ Leere den Browser-Cache (Cmd+Shift+R auf Mac, Ctrl+F5 auf Windows)

### 404 Error auf GitHub Pages
→ Prüfe ob der `gh-pages` Branch existiert und Dateien enthält
→ Prüfe die Pages-Einstellungen (Branch muss `gh-pages` sein)

---

## 🔧 Für Entwickler

### Eigene Build-Tools verwenden

Falls du ein Framework wie React, Vue oder Svelte verwendest, passe die Scripts in `package.json` an:

```json
{
  "scripts": {
    "build": "dein-framework build",
    "postbuild": "cp dist/index.html dist/404.html && touch dist/.nojekyll",
    "deploy": "gh-pages -d dist -b gh-pages -t"
  }
}
```

### Warum `.nojekyll`?
GitHub Pages verwendet standardmässig Jekyll. Die `.nojekyll` Datei deaktiviert dies, sodass Dateien/Ordner die mit `_` beginnen korrekt ausgeliefert werden.

### Warum `404.html`?
Für Single-Page-Applications (SPAs) wird die `404.html` als Fallback verwendet, damit clientseitiges Routing funktioniert.

---

## 📄 Lizenz

MIT License - Frei verwendbar für private und kommerzielle Projekte.
