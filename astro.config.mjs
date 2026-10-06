// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// User site repo (rj8228.github.io) serves from the domain root, so no `base` is needed.
	// When a custom domain is added, change `site` and add public/CNAME.
	site: 'https://rj8228.github.io',
});
