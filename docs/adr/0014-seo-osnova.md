# ADR 0014: SEO osnova: naslov, strukturirani podaci, jezički linkovi, sitemap i 404

- Status: predloženo
- Datum: 2026-10-10

## Kontekst

SEO kritika (`notes/kritika-seo.md` u fajlovima projekta) našla je da je tehnička osnova dobra
(Lighthouse SEO 100, ceo tekst u HTML-u od ADR 0013), ali:

- `<title>` je bio samo ime, pa stranica nije govorila čime se Aleksandar bavi;
- opis je imao 161 (EN) i 164 (SR) znaka, a Google seče oko 150–160;
- nije bilo strukturiranih podataka koji povezuju sajt, portret i profile sa jednom osobom,
  a ime nije retko;
- izbor jezika su bila dugmad, pa u HTML-u nije bilo nijednog linka ka `/sr/`;
- nije bilo `sitemap.xml` ni sopstvene 404 stranice;
- portret (LCP element) se slao kao JPG od 61 kB svakom ekranu, bez `fetchpriority`.

Srpska stranica je samo ćirilicom (odluka iz 2026-10-06), a ljudi u Srbiji pretražuju uglavnom
latinicom.

## Odluka

- **Naslov i opis** u `meta` ključevima `en.ts`/`sr.ts`: ime pa čime se bavi, do ~60 znakova;
  opis do ~150 znakova.
- **JSON-LD `ProfilePage` sa `Person`** u `<head>` svake stranice (`scripts/locale-pages.ts`):
  ime, ime u drugom pismu (`alternateName`), uloga, opis, portret, Niš, COMING, fakultet,
  oblasti, i `sameAs` sa LinkedIn profilom kada se popuni `site.linkedinUrl`. Latinično ime u
  `alternateName` ublažava ćirilicu bez latinice u interfejsu.
- **Jezik se bira linkovima** (`<a href hreflang lang>`), ne dugmadima. Običan klik i dalje
  menja jezik bez ponovnog učitavanja; Ctrl/Cmd-klik otvara drugi jezik u novom tabu. Aktivni
  jezik ima `aria-current="page"`. Pun naziv jezika je skriveni tekst linka, pa vidljivi „EN“ i
  naziv za čitač ekrana više nisu u neskladu.
- **`sitemap.xml`** sa obe stranice i `xhtml:link` alternativama. **`robots.txt`** se piše
  samo kad je sajt u korenu domena, jer se na podputanji (`/presentation/`) ignoriše.
- **`404.html`** na oba jezika, sa `noindex`, sa sopstvenim stilom u stranici (ne zavisi od
  bundle-a). GitHub Pages i Cloudflare Pages ga služe sami.
- **Portret** kao WebP u tri širine (400, 600, 800) kroz `<picture>`, sa `sizes` po širinama
  iz CSS-a i `fetchpriority="high"`; JPG ostaje kao rezerva i za OG/JSON-LD. AVIF je odbačen:
  na kvalitetu koji čuva teksturu kože bio je veći od WebP-a.

## Razmatrano

- **`h1` sa ključnim rečima** umesto samog imena: odbačeno. Na ličnom sajtu `h1` je ime, a
  ključne reči nose naslov, opis i podnaslovi.
- **Latinična verzija srpske stranice** zbog pretrage: odbačeno, odluka o ćirilici ostaje;
  `alternateName` pokriva upit po imenu.
- **Biblioteka za head (unhead) ili za slike (vite-imagetools)**: za dve stranice i jednu
  sliku više koda za podešavanje nego koristi. Varijante portreta su napravljene jednom
  (Pillow, WebP kvalitet 88) i nalaze se u `src/assets/images/`.

## Posledice

- Promena portreta znači i ponovno pravljenje tri WebP varijante.
- `alternateName`, mesto i fakultet za strukturirane podatke su u `meta` ključevima i ne
  prikazuju se na stranici.
- Ostaje na Aleksandru: pravi kontakt mejl i LinkedIn URL u `src/config/site.ts`, sopstveni
  domen (tada se piše i `robots.txt`) i Google Search Console sa slanjem `sitemap.xml`.
