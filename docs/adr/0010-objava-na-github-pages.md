# ADR 0010: Objava na GitHub Pages

- Status: predloženo
- Datum: 2026-10-07

## Kontekst

Sajt je statički i spreman za objavu. Opcije hostinga i domena su upoređene u
`notes/objava-opcije.md` u fajlovima projekta:

- Cloudflare Pages;
- GitHub Pages;
- Netlify;
- Vercel.

Aleksandar je izabrao GitHub Pages za sada. Pravi hosting i domen se razmatraju kasnije.

## Odluka

- Sajt se objavljuje na `https://aleksandar381radosavljevic.github.io/presentation/`. Objava
  ide preko GitHub Actions (`.github/workflows/deploy.yml`) na svaki push na `main`, a može se
  pokrenuti i ručno.
- `site.url` je jedini izvor adrese. Iz njegove putanje Vite dobija `base` (`/presentation/`),
  i to važi i za lokalni razvoj. Iz istog `site.url` se prave canonical, hreflang i `og:image`.
- Jezik se čita iz dela adrese posle `base` (`/presentation/sr/`), a prekidač jezika zadržava
  `base`.

## Razmatrano

- **Repo preimenovan u `aleksandar381radosavljevic.github.io`**: sajt bi bio u korenu domena,
  bez `/presentation/`. Odbačeno za sada, jer menja ime repoa, a ionako se planira pravi domen.
- **`base` iz promenljive okruženja samo u workflow-u**: lokalni build bi se razlikovao od
  objavljenog, a `site.url` i `base` bi mogli da se raziđu.

## Posledice

- Prelazak na svoj domen je izmena jedne linije (`site.url`). Uz to ide `CNAME`, ili podešavanje
  kod novog hostinga. Linkovi poslati na `github.io` adresu tada prestaju da važe, osim ako se
  ne napravi preusmerenje.
- Lokalni dev server radi na `/presentation/`.
- Uslov za objavu: u podešavanjima repoa, pod Pages, izvor mora biti „GitHub Actions“.
