// Ein Feld wie in der App: Feldmarke in Boardfarbe, Wert grau in Klammern ("T20 (60)").
// Rot bei 20, 18, 13, 10, 2, 3, 7, 8, 14, 12; sonst grün. Singles in Board-Schwarz bzw. -Creme. Bull rot, 25 grün.
// Gemeinsam für FieldMark.astro (Seiten) und die Checkout-Liste (im Browser), damit beide gleich aussehen.
const RED = new Set([20, 18, 13, 10, 2, 3, 7, 8, 14, 12]);
export function field(code: string): { label: string; cls: string; v: number | null } {
  if (code === 'BULL') return { label: 'Bull', cls: 'r', v: 50 };
  const ring = code[0], n = Number(code.slice(1));
  if (code === '25' || n === 25) return { label: '25', cls: 'g', v: 25 };
  if (ring === 'S') return { label: String(n), cls: RED.has(n) ? 'd' : 'l', v: null };
  return { label: ring + n, cls: RED.has(n) ? 'r' : 'g', v: n * (ring === 'T' ? 3 : 2) };
}
