# ADR 0013: Prerenderovanje stranica u buildu, bez SSR servera

- Status: predloženo
- Datum: 2026-10-09

## Kontekst

Build je pravio dve stranice (`/` i `/sr/`) sa naslovom, opisom i OG tagovima po jeziku
(ADR 0007), ali sa praznim `<div id="app"></div>`. Ceo tekst sajta nastajao je tek kad se
izvrši JS od oko 200 KB. Google takve stranice renderuje, Bing samo delimično, a AI crawleri
(ChatGPT, Perplexity, Claude) JS ne izvršavaju i vide praznu stranu. Na telefonu se hero
pojavljivao tek posle učitavanja JS-a. Glavni čitaoci sajta su firme i klijenti koji ga
nalaze pretragom ili preko linka, pa je sadržaj u HTML-u važan.

Sadržaj je statičan i isti za svakog posetioca, a jezik dolazi samo iz URL-a. Server koji
renderuje po zahtevu nema šta da radi, a GitHub Pages ga ni ne može pokrenuti.

## Odluka

- Build renderuje aplikaciju u HTML za svaki jezik i upisuje ga u stranice koje već pravi
  `scripts/locale-pages.ts`. `build-only` je: klijentski build, server build
  `src/entry-server.ts` u `dist-ssr/`, pa `scripts/prerender.ts`, koji pozove
  `renderToString` iz `vue/server-renderer` za svaki jezik i obriše `dist-ssr/`.
- U browseru `src/main.ts` preuzima gotov HTML sa `createSSRApp` (hidratacija). Dev server
  i dalje služi praznu stranu i radi običan `createApp`.
- Nema novih zavisnosti: server renderer je deo Vue-a. Hosting ostaje statičan.
- Ono što zavisi od browsera čita se tek posle mount-a, da HTML iz builda i prvi render u
  browseru budu isti:
  - jezik u buildu postavlja `entry-server.ts`, u browseru se čita iz URL-a;
  - sačuvana tema se čita u `onMounted` u `useTheme` (`data-theme` i dalje postavlja skripta
    u `index.html` pre prvog iscrtavanja, pa nema treptanja);
  - projekti se renderuju u punom obliku, a na telefonu se sklope posle mount-a;
  - navigacija pre merenja odseca linkove koji ne staju (`overflow-x: clip`), umesto da idu
    preko dugmadi.

## Razmatrano

- **Ostati SPA**: bez posla, ali tekst ostaje nevidljiv svemu što ne izvršava JS.
- **vite-ssg 28.3** (podržava Vite 8): za dva jezika traži vue-router, koji sajtu ne treba,
  i dovlači jsdom i unhead. Daje isto što i 25 linija sopstvenog koda.
- **Nuxt 4.6** (Vite 8, `@nuxtjs/i18n` 10.6 nad vue-i18n 11): pravi SSR i SSG, ali znači
  prepisivanje projekta i novu strukturu, previše za sajt od jedne strane.
- **SSR server** (Node, Cloudflare Workers): nema podataka po zahtevu, a hosting bi prestao
  da bude statičan.

## Posledice

- Obe stranice u `dist/` sadrže ceo tekst. Bez JS-a sajt se čita, ali tema, jezik i
  navigacija ne reaguju dok se aplikacija ne učita.
- Kod komponenti ne sme da čita `window`, `document`, `localStorage` ili `matchMedia` u
  setup-u, nego u `onMounted`. Greška se vidi kao pad builda (prerender) ili kao upozorenje
  o hidrataciji u konzoli.
- Na telefonu se lista projekata sklopi odmah posle učitavanja. Sekcija je ispod prvog
  ekrana, pa se pomeranje ne vidi.
- Ikonica teme na trenutak pokazuje „sistemsku“ dok se ne pročita sačuvan izbor.
- Ako sajt dobije više stranica, `PAGES` u `locale-pages.ts` ostaje jedini spisak koji
  `prerender.ts` prolazi.
