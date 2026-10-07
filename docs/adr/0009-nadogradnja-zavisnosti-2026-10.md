# ADR 0009: Nadogradnja zavisnosti (oktobar 2026)

- Status: predloženo
- Datum: 2026-10-07

## Kontekst

Analiza koda (`notes/analiza-koda.md` u fajlovima projekta) zabeležila je zastarele alate iz
ranog 2024. ESLint 8 više nema podršku. CI (ADR nije potreban, `.github/workflows/ci.yml`)
sada proverava type-check, lint, format i build, pa se nadogradnja može bezbedno uraditi.

## Razmatrane opcije

1. **Sve na najnovije**, uključujući TypeScript 7.
2. **Sve na najnovije, TypeScript na 6.0.x.**
3. **Samo u okviru postojećih glavnih verzija** (Vite 5.4, ESLint 8.57). Najmanje rizika, ali
   ESLint 8 ostaje bez podrške.

## Odluka

Opcija 2.

TypeScript 7 je nova implementacija kompajlera. `typescript-eslint` (preko
`@vue/eslint-config-typescript`) traži `typescript >=4.8.4 <6.1.0`, pa je 6.0.x najnovija
verzija sa kojom lint radi. Na 7 se prelazi kada `typescript-eslint` i `vue-tsc` to podrže.

| paket | pre | posle |
|---|---|---|
| vite | 5.2 | 8.3 |
| @vitejs/plugin-vue | 5.0 | 6.0 |
| vite-plugin-vue-devtools | 7.0 | 8.2 |
| typescript | 5.4 | 6.0 |
| vue-tsc | 2.0 | 3.3 |
| @vue/tsconfig | 0.5 | 0.9 |
| eslint | 8.57 | 10.12 |
| eslint-plugin-vue | 9.24 | 10.11 |
| @vue/eslint-config-typescript | 12 | 14.9 |
| @vue/eslint-config-prettier | 8 | 10.2 |
| prettier | 3.2 | 3.9 |
| npm-run-all2 | 6 | 8 |
| @types/node, @tsconfig | node 20 | node 22 |

Prateće izmene:

- ESLint prelazi na flat config (`eslint.config.js`). Pravila su ista kao ranije: ESLint
  recommended, Vue essential, TypeScript recommended, `no-console`, `prefer-const` i izuzeci za
  Osnova komponente i skripte. `.eslintrc.cjs` i `@rushstack/eslint-patch` su uklonjeni.
- `baseUrl` je uklonjen iz `tsconfig.app.json`, jer je zastareo u TypeScript 6, a `paths` radi
  i bez njega.
- Uvozi TS fajlova koje učitava Vite config imaju ekstenziju `.ts`. Tako config radi i sa
  `configLoader: 'native'`, koji Vite najavljuje kao podrazumevan.
- Prettier 3.9 je drugačije formatirao dva fajla. Izmene su samo u formatiranju.
- `package-lock.json` je ponovo generisan.

## Posledice

- Pozitivno: svi alati imaju podršku. Build je brži (Vite 8 sa Rolldown-om: oko 1,7 s umesto
  5 s), a JS bundle je manji (69,1 KB gzip umesto 72,7 KB). Sajt je posle nadogradnje identičan
  do piksela na desktopu i telefonu, u obe teme.
- Negativno: `npm audit` prijavljuje 4 visoke ranjivosti u `braces` (DoS preko duboko
  ugnežđenih glob šablona). Dolazi samo kroz `@vue/eslint-config-typescript` → `fast-glob` i
  koristi se samo u lintu, sa šablonima iz našeg configa. Ne ulazi u sajt. Ispravka još ne
  postoji (pogođene su sve verzije), pa se prati.
- Otvoreno: prelazak na TypeScript 7 kada ga podrži `typescript-eslint`.
