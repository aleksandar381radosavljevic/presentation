# ADR 0012: Hero na tabletu u dve kolone, portret uz tekst na telefonu

- Status: predloženo
- Datum: 2026-10-09

## Kontekst

Hero je do 1024 px bio jedna kolona: tekst poravnat levo, a portret centriran ispod njega.
Aleksandar je na iPadu (820 px, portret) primetio da stranica tako ima dve ose poravnanja.
Kartica „Based in“ je pomerena ulevo da bi na desktopu prelazila ka tekstu, pa je ispod
centriranog portreta izgledala kao greška. Desna polovina ekrana pored teksta bila je prazna,
a portret je gurao brojke i „About“ ispod prvog ekrana. Na tabletu su brojke u četiri kolone
lomile vrednost („Since / 2022“).

## Odluka

- Od 768 px hero ima dve kolone: tekst levo, a portret desno, širok 260 px. Kartica prelazi ka
  tekstu kao na desktopu. Od 1024 px raspored je isti kao do sada.
- Ispod 768 px portret je poravnat levo, uz tekst, a kartica visi unutar portreta.
- Između 768 i 1023 px vrednosti u traci brojki su 28 px umesto 34 px, da stanu u jedan red.

## Razmatrano

- **Sve centrirano na tabletu i telefonu**: duži pasus se centriran teško čita, a ostatak
  sajta je poravnat levo.
- **Jedna kolona sa portretom levo i na tabletu**: ima jednu osu, ali hero ostaje visok i ne
  koristi širinu tableta.

## Posledice

- Na tabletu u portretu hero i traka brojki staju na prvi ekran (820×1180).
- Na 768 px u srpskoj verziji dugmad u heroju idu jedno ispod drugog, jer kolona teksta nema
  mesta za oba u jednom redu.
