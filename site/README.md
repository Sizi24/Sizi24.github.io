# dardoapp.com: Quelle der Dardo-Website

Astro (statisch), ohne fremde Skripte, Schriften oder Cookies.

- `npm ci && npm run build` baut nach `dist/`.
- `npm run daten -- <Pfad zu CheckoutTable.swift>` holt die Checkout-Wege aus der App (`src/data/checkouts.json`), damit Website und App gleich sind.
- Starttag: `IOS_LIVE` / `ANDROID_LIVE` in `src/config.ts` auf `true`.
- Veröffentlichen: Inhalt von `dist/` auf `main` (mit Datei `CNAME` = `dardoapp.com`). Erst beim Umschalten.
