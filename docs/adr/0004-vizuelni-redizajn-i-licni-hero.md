# ADR 0004: Vizuelni redizajn i hero okrenut osobi

- Status: prihvaćeno
- Datum: 2026-10-06
- Delimično menja: [ADR 0003](0003-struktura-sadrzaja-za-klijente.md) (hero sa brojkama, bez sekcije O meni)

## Kontekst

Posle analize dizajna konkurentskih sajtova napravljena su tri predloga redizajna (A, B, C,
renderi u `redizajn/` u fajlovima projekta). Aleksandar je izabrao svetlu temu predloga A,
pozadinu sa tačkicama iz predloga C i portret u boji uz koji stoji kartica.

Prva verzija tog spoja (A2) uz portret je imala simuliranu karticu sa podacima uživo
(10.240 elemenata, 50 ms, 3 alarma), a projekat mreže je bio glavna slika sekcije Projekti.
Aleksandar je ocenio da to izgleda kao da prodaje projekat koji je napravio za firmu u kojoj
je zaposlen. Portfolio treba da u prvi plan stavi njega.

## Razmatrane opcije

1. **Ostaje A2**: najjači "kontrolna soba" utisak, ali projekat poslodavca izgleda kao
   proizvod koji Aleksandar prodaje.
2. **Ime i specijalizacija**: ime kao naslov, specijalizacija u prvom licu, lična kartica
   umesto simuliranih podataka.
3. **Samo osoba**: ime, uloga i kratak lični opis u hero-u. Specijalizacija ide u sekcije
   O meni i Usluge.

## Odluka

Opcija 3, po Aleksandrovom izboru.

- Hero: pozdrav, ime (h1), uloga, kratak opis, pozivi "Razgovarajmo o projektu" i "Pogledajte
  projekte". Desno je portret sa karticom koja ima samo mesto i jezike.
- Status dostupnosti ("Open to projects") se ne prikazuje, jer je Aleksandar zaposlen.
- Traka ispod hero-a ima lične činjenice: godine iskustva, vođenje tima, diplomu i sertifikat.
  Brojke projekata (10.000+, 50 ms) ostaju samo u opisima projekata.
- Vraća se kratka sekcija O meni, koja nosi specijalizaciju.
- Uvod u Projekte kaže da su projekti rađeni sa timom u firmi i da se opisuje njegova uloga.
- Pozadina hero-a je statična canvas scena "mreže" (tačke, vodovi, retki čvorovi upozorenja i
  alarma), crtana iz tokena teme, pa radi u svetloj i tamnoj temi. Footer je uvek taman.

## Tehničke odluke

- **Canvas, a ne CSS ili SVG** za pozadinu: CSS gradijent daje samo pravilne tačke, a SVG bi
  imao više hiljada čvorova u DOM-u. Canvas se crta jednom, iz fiksnog semena (svaki put ista
  slika), i ponovo samo na promenu veličine ili teme. Nema animacije, pa nema ni problema sa
  `prefers-reduced-motion`. Element je `aria-hidden`.
- **Boje iz tokena**: canvas čita `--line`, `--line-strong`, `--accent` i `--danger` preko
  `getComputedStyle`, pa nema posebne palete koja bi mogla da se razdvoji od dizajn sistema.
- **Lokalna tema preko `data-theme`**: tokeni su definisani i na `[data-theme='dark']`, pa
  footer dobija tamnu temu atributom, bez dupliranja boja.
- **Hero je van `MainContainer`-a** da bi pozadina išla od ivice do ivice; sadržaj je i dalje
  u kontejneru iste širine kao ostatak strane. `<main id="main-content">` obuhvata hero i
  ostatak strane, pa link za preskakanje sadržaja radi kao ranije.

## Posledice

- Sajt i dalje nosi pozicioniranje iz ADR 0003, ali ono više nije naslov hero-a.
- Portret je blago korigovan (podočnjaci, ton), bez menjanja crta lica. Skripta je u
  `redizajn/portret/korekcija.py` u fajlovima projekta.
- Javni demo (10.000 elemenata) ostaje poseban PR. Kad postoji, ide u sekciju Projekti, ne u hero.
