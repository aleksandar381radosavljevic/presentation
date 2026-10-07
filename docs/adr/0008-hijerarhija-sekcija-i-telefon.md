# ADR 0008: Hijerarhija sekcija i kraća stranica na telefonu

- Status: predloženo
- Datum: 2026-10-07

## Kontekst

UI/UX kritika (`notes/kritika-ux.md` u fajlovima projekta) našla je dva problema:

- Naslov sekcije (npr. „About me“) i rečenica ispod njega bili su iste veličine, a sve sekcije
  su pratile isti obrazac na istoj pozadini. Na dugoj stranici su se stapale.
- Na telefonu je stranica bila duga 14,5 ekrana (390×844). Šema u case studyju dolazila je tek
  posle četiri bloka teksta.

## Razmatrane opcije

1. **Samo veći naslovi**: najmanja izmena, ali sekcije i dalje liče jedna na drugu.
2. **Oznaka, tvrdnja i trake**: ime sekcije postaje mala oznaka iznad naslova, a naslov je
   tvrdnja sekcije. Sekcije se smenjuju na dve pozadine, a na telefonu se duži tekstovi
   otvaraju na dodir.
3. **Skraćivanje sadržaja**: izbaciti delove teksta. Najveća ušteda, ali menja sadržaj koji je
   Aleksandar već odobrio.

## Odluka

Opcija 2.

- `PageSection` prima `eyebrow` (ime sekcije, isto kao u navigaciji), `title` (tvrdnja) i
  `intro`. Naslov je 26–36 px, oznaka je 13 px, verzalom, u boji akcenta.
- Tvrdnje sekcija su u ključevima `*.heading`. O meni zadržava rečenicu o specijalizaciji, a
  ostale su nove:
  - Usluge: „From operator screens to the analysis behind them.“
  - Projekti: „Real-time screens in production, built with my team.“
  - Kako radim: „Every step ends with something you can review.“ Ista rečenica je zato
    izbačena iz uvoda.
  - Saradnja: „Start with one package, not a whole project.“
  - Iskustvo: „Seven years, from the backend to leading a frontend team.“
- Sekcije su trake pune širine. Usluge, Kako radim i Iskustvo su na `--surface-raised`, a
  kartice u njima na `--surface`, da se i dalje izdvajaju.
- Na telefonu (ispod 768 px):
  - u case studyju šema dolazi prva, pa brojka;
  - Problem, Ograničenje, Uloga i Rezultat su iza „Read the case study“;
  - u listama „More projects“ i „Personal projects“ vide se naslov i meta, a tekst se otvara
    na dodir.

  Od 768 px sve je otvoreno kao do sada.
- Usput je ispravljen link logotipa: na uskom telefonu ime je bilo skriveno sa
  `display: none`, pa link nije imao ime za čitač ekrana.

## Posledice

- Pozitivno: svaka sekcija počinje porukom i jasno se vidi gde počinje. Na telefonu je
  stranica kraća (14,5 → 13,5 ekrana), a šema je vidljiva bez skrolovanja kroz tekst.
- Negativno: deo teksta projekata je na telefonu iza dodira. Dalje skraćivanje traži
  skraćivanje sadržaja: Usluge, Kako radim i Saradnja su svaka po oko dva ekrana.
