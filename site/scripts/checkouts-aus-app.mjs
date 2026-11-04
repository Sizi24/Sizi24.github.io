// Liest die Checkout-Tabelle der App (CheckoutTable.swift) und schreibt src/data/checkouts.json.
// Aufruf: node scripts/checkouts-aus-app.mjs /pfad/zu/DartsTrainer
// So zeigen App und Website immer dieselben Wege.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const app = process.argv[2];
if (!app) { console.error('Pfad zum App-Repo fehlt.'); process.exit(1); }
const file = join(app, 'DartsTrainer/Darts/CheckoutTable.swift');
const raw = readFileSync(file, 'utf8').split('"""')[1];
const first = {}, alts = {};
for (const line of raw.trim().split('\n')) {
  const p = line.trim().split(/\s+/);
  if (!/^\d+$/.test(p[0])) continue;
  const r = Number(p[0]);
  if (first[r]) (alts[r] ??= []).push(p.slice(1)); else first[r] = p.slice(1);
}
let commit = 'unbekannt';
try { commit = execSync('git rev-parse --short HEAD', { cwd: app }).toString().trim(); } catch {}
const bogeys = [];
for (let r = 170; r >= 2; r--) if (!first[r] && r > 158) bogeys.push(r);
writeFileSync(new URL('../src/data/checkouts.json', import.meta.url),
  JSON.stringify({ quelle: 'DartsTrainer/Darts/CheckoutTable.swift @ ' + commit, first, alts, bogeys }, null, 1) + '\n');
console.log(Object.keys(first).length + ' Finishes, Bogeys ' + bogeys.join(', ') + ', Stand ' + commit);
