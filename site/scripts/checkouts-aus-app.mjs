// Liest die Checkout-Tabelle der App (CheckoutTable.swift) und schreibt src/data/checkouts.json.
// Aufruf: node scripts/checkouts-aus-app.mjs /pfad/zu/DartsTrainer [Stand, falls kein Git-Ordner]
// So zeigen App und Website immer dieselben Wege.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const app = process.argv[2];
if (!app) { console.error('Pfad zum App-Repo fehlt.'); process.exit(1); }
const file = join(app, 'DartsTrainer/Darts/CheckoutTable.swift');
const swift = readFileSync(file, 'utf8');
const Q = '"'.repeat(3);
const block = (name) => swift.split('static let ' + name + ' = ' + Q)[1].split(Q)[0];

// Profi-Wege: erste Zeile je Rest, weitere Zeilen sind Alternativen.
const first = {}, alts = {};
for (const line of block('raw').trim().split('\n')) {
  const p = line.trim().split(/\s+/);
  if (!/^\d+$/.test(p[0])) continue;
  const r = Number(p[0]);
  if (first[r]) (alts[r] ??= []).push(p.slice(1)); else first[r] = p.slice(1);
}
// Gängige Alternativen (alternativesRaw): in der App die Tipps bei „Noch ein Weg“, auf der Website die Schnellwahl für eigene Wege.
for (const line of block('alternativesRaw').trim().split('\n')) {
  const p = line.trim().split(/\s+/);
  if (!/^\d+$/.test(p[0])) continue;
  (alts[Number(p[0])] ??= []).push(p.slice(1));
}

// Lieblings-Doppel (App-Änderung 333/336): Doppel -> Rest -> Weg, genau wie in der App.
const favourite = {};
for (const line of block('favouriteRaw').trim().split('\n')) {
  const p = line.trim().split(/\s+/);
  if (!/^\d+$/.test(p[0])) continue;
  (favourite[p[0]] ??= {})[p[1]] = p.slice(2);
}

let commit = process.argv[3] || 'unbekannt';
try { commit = execSync('git rev-parse --short HEAD', { cwd: app, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch {}
const bogeys = [];
for (let r = 170; r >= 2; r--) if (!first[r] && r > 158) bogeys.push(r);
writeFileSync(new URL('../src/data/checkouts.json', import.meta.url),
  JSON.stringify({ quelle: 'DartsTrainer/Darts/CheckoutTable.swift @ ' + commit, first, alts, bogeys, favourite }, null, 1) + '\n');
console.log(Object.keys(first).length + ' Finishes, Bogeys ' + bogeys.join(', ') + ', Lieblings-Doppel ' + Object.keys(favourite).join('/') + ', Stand ' + commit);
