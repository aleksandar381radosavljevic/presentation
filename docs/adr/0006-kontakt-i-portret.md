# ADR 0006: Vidljiv kontakt, a portret ostaje svetao u obe teme

- Status: predloženo
- Datum: 2026-10-07
- Delimično menja: [ADR 0005](0005-sadrzaj-po-kritici-content-dizajna.md) (poziv u Saradnji, boja dugmeta u footeru)

## Kontekst

UI/UX kritika (`notes/kritika-ux.md` u fajlovima projekta) našla je dve stvari koje direktno
utiču na to da li će klijent pisati i kako sajt izgleda u tamnoj temi:

1. Kontakt je bio samo `mailto:` dugme. Ko nema podešen mejl klijent ne dobije ništa, a adresa
   se nigde ne vidi da bi se prepisala. Paketi pod Saradnjom su imali jedno zajedničko dugme.
2. Portret je imao svetlu pozadinu ugrađenu u sliku, pa je u tamnoj temi bio najsvetliji
   pravougaonik na ekranu. Primarno dugme u footeru je bilo prisiljeno na boju svetle teme, pa
   se u tamnoj temi razlikovalo od dugmeta u hero-u.

Aleksandar je odobrio tačke 1 i 3 iz predloženog redosleda.

## Razmatrane opcije

Kontakt:

1. **Vidljiva adresa i kopiranje**, uz dugme po paketu sa popunjenim naslovom poruke. Bez
   servisa i bez zaštite od spama.
2. **Forma** preko Formspree ili Netlify Forms. Konvertuje bolje, ali uvodi spoljni servis,
   zaštitu od spama i obradu podataka posetilaca.

Portret:

1. **Dve slike**, svetla i tamna kompozicija, birane po temi. Dupla težina i dva fajla za
   održavanje pri svakoj izmeni portreta.
2. **Providna slika**, a pozadina i senka iz tokena teme u CSS-u. Jedan fajl, tema se menja bez
   novog učitavanja.

## Odluka

- Kontakt: opcija 1. Forma ostaje opcija za kasnije, ako mejl ne bude dovoljan.
  - Footer prikazuje adresu kao link i dugme „Copy address“ koje posle klika kratko pokazuje
    „Address copied“ (i najavljuje to čitaču ekrana). Ako pregledač ne da pristup clipboardu,
    adresa je i dalje vidljiva.
  - Svaki paket ima svoje dugme „Ask about this package“ koje otvara mejl sa nazivom paketa u
    naslovu, na jeziku stranice. Zajednički poziv „Discuss a package“ je uklonjen. Dok
    `site.contactEmail` nije popunjen, dugmad vode na footer.
- Portret: nijedna opcija. Isprobana je opcija 2 (providna slika sa tamnim okvirom u tamnoj
  temi), ali se Aleksandru ne dopada portret na tamnoj pozadini. Zato ostaje portret v3 sa
  svetlom pozadinom u obe teme. Svetao portret u tamnom hero-u je svesno prihvaćen.
  Providna verzija i skripta ostaju u fajlovima projekta (`redizajn/portret/profile-providni.webp`,
  `portret-providni.py`), ako se odluka promeni.
- Footer uzima akcenat svetle teme samo kada je aktivna svetla tema. U tamnoj temi koristi svoj
  tamni akcenat, isti kao hero.

## Posledice

- Pozitivno: klijent može da kopira adresu bez mejl klijenta, a poruka odmah kaže o kom paketu
  je reč. Dugme u footeru je iste boje kao u hero-u u obe teme.
- Negativno: u tamnoj temi portret ostaje najsvetlija površina u hero-u.
- Otvoreno: pravi imejl i LinkedIn URL čekaju Aleksandrove podatke.
