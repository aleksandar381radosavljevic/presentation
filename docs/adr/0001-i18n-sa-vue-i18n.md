# ADR 0001: Lokalizacija preko vue-i18n

- Status: prihvaćeno
- Datum: 2026-10-05

## Kontekst

Sajt treba da bude dostupan na engleskom i srpskom. Pre ove odluke postojao je samo
izbor jezika bez prevoda (`src/utils/localization`), a tekstovi su bili ukucani
direktno u komponente, delom na ćirilici, delom na engleskom.

## Razmatrane opcije

1. **vue-i18n (v11)**: zvanična biblioteka Vue ekosistema. Pluralizacija, formatiranje
   datuma i brojeva, fallback jezik, lazy učitavanje prevoda, tooling (Vue DevTools,
   `@intlify/unplugin-vue-i18n`). Cena: oko 13 KB gzip u bundle-u.
2. **Sopstveni composable** (`ref` + rečnik objekata): bez zavisnosti, par desetina linija.
   Svaka sledeća potreba (plural, fallback, datum) piše se ručno.
3. **Odvojene stranice po jeziku** (`/en`, `/sr`): najbolje za SEO, ali traži ruter
   ili SSG i duplira šablone. Previše za jednostranični sajt u ovoj fazi.

## Odluka

Opcija 1, vue-i18n u Composition API modu (`legacy: false`).

- Prevodi su u `src/i18n/locales/{en,sr}.ts`. `sr` je tipizovan kao `typeof en`, pa
  TypeScript prijavljuje svaki ključ koji nedostaje.
- Srpski je na ćirilici, kao što je bio originalni sadržaj sajta.
- Jezik se bira ovim redom: sačuvan izbor (`localStorage`), jezik browsera, engleski.
- Promena jezika ažurira i `<html lang>` i `document.title`.

## Posledice

- Novi tekst ide samo kroz `t('...')` i u oba locale fajla.
- Ako sajt kasnije pređe na SSG/SSR radi SEO-a, vue-i18n to podržava, pa odluka ne blokira opciju 3.
- Latinica, ako zatreba, dodaje se kao treći locale (`sr-Latn`).
