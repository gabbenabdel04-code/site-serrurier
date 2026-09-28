import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const racine = fileURLToPath(new URL('.', import.meta.url));

// Chaque page = un dossier avec son index.html (URL propre avec "/" final)
const pages = [
  'serrurier-navarrenx',
  'serrurier-salies-de-bearn',
  'serrurier-sauveterre-de-bearn',
  'serrurier-orthez',
  'serrurier-mourenx',
  'serrurier-oloron-sainte-marie',
  'serrurier-pau',
  'mentions-legales',
];

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(racine, 'index.html'),
        ...Object.fromEntries(pages.map((p) => [p, resolve(racine, p, 'index.html')])),
      },
    },
  },
});
