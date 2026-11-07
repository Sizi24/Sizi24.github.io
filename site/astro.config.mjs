// Dardo-Website: reine statische Seiten, ohne Skripte von fremden Servern, ohne Cookies.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://dardoapp.com';
// Seitenpaare wie in src/i18n.ts (nur Seiten mit eigener englischer Adresse).
const PAIRS = [['/', '/en/'], ['/checkout-tabelle/', '/en/checkout-chart/'], ['/checkout-liste/', '/en/checkout-list/']];

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap({
    filter: (page) => !page.includes('/app/') && !page.includes('/dardo/') && !page.includes('/404'),
    serialize(item) {
      const path = item.url.replace(SITE, '');
      const pair = PAIRS.find((p) => p.includes(path));
      if (pair) item.links = [
        { lang: 'de', url: SITE + pair[0] },
        { lang: 'en', url: SITE + pair[1] },
        { lang: 'x-default', url: SITE + pair[1] },
      ];
      return item;
    },
  })],
});
