# ADR 0007: Pregled linka i adresa po jeziku

- Status: predloženo
- Datum: 2026-10-07

## Kontekst

UI/UX kritika (`notes/kritika-ux.md` u fajlovima projekta) našla je dva problema:

- Kada se link pošalje na LinkedIn-u ili Slack-u, pregled ima samo naslov, bez opisa i slike.
  HTML je imao samo `<div id="app">`.
- Srpska verzija nije imala svoju adresu, jer se jezik pamtio u pregledaču. Zato nikome nije
  moglo da se pošalje link na nju, a pretraživači su videli samo engleski.

LinkedIn, Slack i slični servisi čitaju samo meta oznake iz HTML-a i ne pokreću JavaScript.
Google pokreće JavaScript, pa stranicu indeksira i bez prerendera.

## Razmatrane opcije

1. **Meta po jeziku**: dve HTML stranice (`/` i `/sr/`), svaka sa svojim jezikom, naslovom,
   opisom i Open Graph oznakama, a sadržaj i dalje crta aplikacija. Bez novih biblioteka.
2. **Vlastiti prerender**: kao opcija 1, uz ceo sadržaj u HTML-u preko Vue `renderToString`.
   To je oko 100 linija koda. Uz to traži usklađivanje hidracije sa temom, jezikom i canvas
   pozadinom.
3. **vite-ssg** (28.x, podržava Vite 5): pun SSG, ali uvodi vue-router i unhead za sajt od
   jedne stranice.

## Odluka

Opcija 1. Rešava oba problema bez novih zavisnosti. Prerender (opcija 2) može da se doda
kasnije, bez izmena ovih stranica, ako se pokaže potreba za sadržajem u HTML-u.

- Vite plugin `scripts/locale-pages.ts` upisuje oznake u `index.html` i od gotove stranice pravi
  `sr/index.html`. Obe stranice učitavaju iste fajlove. Tekstovi oznaka su u `meta` ključevima
  u `en.ts` i `sr.ts`.
- Oznake po stranici:
  - `lang`, `title` i `description`;
  - `og:title`, `og:description` i `og:locale`;
  - `twitter:card` (`summary_large_image`).
- Oznake koje traže apsolutnu adresu upisuju se tek kada se popuni `site.url`:
  - `canonical`;
  - `hreflang` (en, sr, x-default);
  - `og:url`, `og:image` i opis slike.
  
  Dok je `site.url` prazan, build javlja upozorenje.
- Open Graph slike su `public/og-en.jpg` i `public/og-sr.jpg` (1200×630). Na njima su ime,
  uloga i portret v3. Izvor i skripta su u `redizajn/og/` u fajlovima projekta.
- Jezik se određuje samo iz adrese. Prekidač jezika menja adresu na licu mesta, bez novog
  učitavanja, i zadržava sidro (npr. `#engagement`). Izbor se više ne pamti, i jezik se ne
  pogađa po pregledaču.

## Posledice

- Pozitivno: link ima pregled sa slikom i opisom na jeziku na kome je poslat. Srpska verzija
  ima svoju adresu i pretraživači je vide.
- Negativno: posetilac sa srpskim pregledačem koji otvori `/` vidi engleski i bira jezik sam.
  Hosting mora da preusmeri `/sr` na `/sr/` (Netlify, Cloudflare Pages i GitHub Pages to rade
  sami). Ako se portret promeni, OG slike treba ponovo napraviti.
- Otvoreno: `site.url` se upisuje kada se izabere domen za objavu.
