// Seitenpaare Deutsch/Englisch: für Sprachwechsel und hreflang.
export type Lang = 'de' | 'en';
export const PAIRS: Record<string, { de: string; en: string }> = {
  home: { de: '/', en: '/en/' },
  table: { de: '/checkout-tabelle/', en: '/en/checkout-chart/' },
  list: { de: '/checkout-liste/', en: '/en/checkout-list/' },
  help: { de: '/hilfe/', en: '/hilfe/#en' },
  privacy: { de: '/datenschutz/', en: '/datenschutz/#en' },
  imprint: { de: '/impressum/', en: '/impressum/#en' },
};
export const t = (lang: Lang, de: string, en: string) => (lang === 'de' ? de : en);
