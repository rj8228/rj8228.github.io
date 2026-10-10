# rj8228.github.io

Personal portfolio: "I make complex systems visible", with a "See inside" X-ray switch. The earlier comic-book version lives at `/comic/`. Built with [Astro](https://astro.build), deployed to GitHub Pages at https://rj8228.github.io.

- Homepage content: `src/data/xray.ts` (empty fields stay hidden). Comic page: `src/data/profile.json` + `src/styles/global.css`.
- `npm run dev` for local development, `npm run build` to build to `dist/`.
- Every push to `main` deploys via `.github/workflows/deploy.yml`.
