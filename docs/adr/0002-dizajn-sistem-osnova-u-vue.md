# ADR 0002: Dizajn sistem Osnova u Vue aplikaciji

- Status: prihvaćeno
- Datum: 2026-10-05

## Kontekst

Osnova je lični dizajn sistem: tokeni (`tokens.json`), smernice i React biblioteka `@osnova/ui`
(React 18, CSS Modules, lucide-react). Portfolio je Vue 3 aplikacija, pa React komponente ne mogu
direktno da se koriste. Sajt dobija i novi znak iz Osnove.

## Razmatrane opcije

1. **Port u Vue, lokalno u `src/shared/ui`**: isti tokeni, isti CSS (CSS Modules preko
   `<style module>`), isti API gde Vue to dozvoljava. Nema React runtime-a. Cena: dve
   implementacije istih komponenti koje treba držati usklađene.
2. **React komponente u Vue aplikaciji** (veaury, web components omotač): jedna implementacija,
   ali dva frameworka u bundle-u (~45 KB gzip više), problemi sa SSR-om, slotovima i
   događajima.
3. **Samo tokeni, komponente po potrebi bez sistema**: najjeftinije, ali komponente se razilaze
   od Osnove. To je upravo problem koji Osnova rešava.

## Odluka

Opcija 1. Prenete su komponente koje sajt koristi: Badge, Button, Card, DropdownMenu
(sa MenuList), Field, GridLayout i GridItem, Icon, Logo, MainContainer, Navbar i Select.
Uz njih su preneti `utils` (cx, responsive, theme) i `useDismiss`.

- `tokens.json` je kopiran iz Osnove i ostaje izvor istine. `npm run tokens`
  (`scripts/build-tokens.ts`) generiše `tokens.css` sa svetlom i tamnom temom i tekst stilovima
  `os-text-*`.
- Tema je podrazumevano sistemska, a korisnik bira svetlu ili tamnu i izbor se pamti. Inline
  skript u `index.html` postavlja temu pre prvog crtanja, pa nema bljeska.
- Klase u DevTools-u izgledaju kao u Osnovi: `os-Button__primary`.

## Odstupanja od React API-ja

- `Icon` prima komponentu (`:icon="Plus"` iz `@lucide/vue`), a ne ime, jer `@lucide/vue` nema
  dinamičko učitavanje po imenu. Statički uvoz je i dalje tree-shaken.
- `DropdownMenu` okidač dobija `triggerProps` kroz scoped slot umesto `cloneElement`.
- `Button` ima `href` (renderuje `<a>`) za navigaciju. `loading` nije prenet dok ne zatreba
  (zahteva Loader).
- Meni se pozicionira apsolutno uz okidač, bez Portala i `useFloatingPosition`.
- `Logo` menja svetli i inverzni fajl prema temi. Ispod 48 px koristi crtež od 32 px.
  `osnova-znak-32-inverz.svg` je izveden iz `osnova-znak-32.svg` istom zamenom boje luka
  (`#222C35` → `#EEF1F4`) kojom je u Osnovi nastao `osnova-znak-inverz.svg`.

## Posledice

- Promena tokena ide u Osnovu, pa se `tokens.json` kopira ovde i pokreće `npm run tokens`.
- Nova komponenta se prenosi iz Osnove tek kad je sajt koristi.
- Skripta za tokene traži Node ≥ 22.18 (pokreće TypeScript bez dodatnih alata).
