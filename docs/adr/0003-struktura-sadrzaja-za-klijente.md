# ADR 0003: Struktura sadržaja okrenuta klijentima

- Status: predloženo
- Datum: 2026-10-06

## Kontekst

Sajt je imao originalni placeholder tekst: sekcije O meni, Kako radim, Zašto ja i Ekspertiza,
sa istim tekstom na svim karticama i bez ijednog projekta. Aleksandar je odlučio ko je glavni
čitalac: ozbiljna firma ili klijent koji nudi projekat. HR i firme koje zapošljavaju su
sekundarni čitaoci. Projekti sa posla su pod NDA, pa klijenti ne smeju da se imenuju.

## Razmatrane opcije

1. **Zadržati sekcije i samo napisati pravi tekst**: najmanje posla, ali sajt i dalje ne
   pokazuje rad, a "Zašto ja" ostaje skup tvrdnji bez dokaza.
2. **Struktura zasnovana na dokazima**: Hero sa brojkama, Usluge, Kako radim (sa onim što
   klijent dobija posle svakog koraka), Izabrani projekti, Iskustvo, Tehnologije, Kontakt.
3. **Opcija 2 plus posebna stranica po projektu**: najjače za portfolio, ali traži router i
   više teksta po projektu nego što NDA dozvoljava.

## Odluka

Opcija 2. Sekcije O meni i Zašto ja se uklanjaju: brojke u hero-u, koraci i projekti
pokazuju isto bolje od prideva. Domeni ekspertize postaju sekcija Usluge. Projekti su
anonimizovane studije slučaja: domen i vrsta klijenta, problem, uloga, tehnologije, bez imena
klijenta i internih naziva. Glavni poziv na akciju je "Razgovarajmo o projektu". Dugme za CV
se dodaje kad CV postoji.

## Posledice

- Sadržaj je i dalje samo u `src/i18n/locales/{en,sr}.ts`; nazivi tehnologija su u
  komponentama jer se ne prevode.
- Oracle je izbačen sa liste tehnologija na Aleksandrov zahtev.
- Godina diplomiranja se ne navodi.
- Opcija 3 ostaje otvorena ako neki projekat dobije dovoljno javnog sadržaja.
