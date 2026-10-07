# ADR 0005: Sadržaj i struktura po kritici content dizajna

- Status: predloženo
- Datum: 2026-10-07
- Delimično menja: [ADR 0004](0004-vizuelni-redizajn-i-licni-hero.md) (uloga u hero-u, traka sa činjenicama)

## Kontekst

Kritika sajta iz ugla content dizajnera (`notes/kritika-dizajna.md` u fajlovima projekta)
zaključila je da sajt ne pokazuje ono u čemu je Aleksandar poseban. Posetilac posle prvog
ekrana ne zna da radi interfejse za industrijske sisteme u realnom vremenu, najjači dokazi
(10.000+ elemenata, 50 ms, principi za operaterske ekrane) zakopani su u pasuse, a projekti
nemaju nijednu sliku. Aleksandar je tražio da se primene svi predlozi.

## Razmatrane opcije

1. **Samo tekst**: prepraviti rečenice, a strukturu ostaviti. Najmanje rizika, ali ne rešava
   redosled (obećanja pre dokaza), dve liste ponude ni projekte bez slike.
2. **Tekst i struktura**: novi redosled sekcija, istaknuti case studyji sa anonimnim šemama,
   jedna lista ponude, proces vezan za pakete.
3. **Javni demo**: uz opciju 2 i živi PixiJS demo mreže. Najjači dokaz, ali je to poseban
   projekat koji tek treba napraviti.

## Odluka

Opcija 2. Demo ostaje sledeći lični projekat.

- **Hero**: bez pozdrava „Hi, I'm“. Linija ispod imena nosi specijalizaciju („Frontend engineer
  for real-time industrial interfaces“), a opis kaže da vodi tim u COMING-u. Hero je i dalje
  samo osoba: portret, bez simuliranih podataka i bez statusa dostupnosti. Ovo menja odluku iz
  ADR 0004 da specijalizacija živi samo u O meni i Uslugama.
- **Traka sa činjenicama**: 10.000+ i 50 ms ulaze u traku, uz oznaku da je to rađeno sa timom,
  a diploma i sertifikat ostaju u Iskustvu. Ovo menja odluku iz ADR 0004 da su brojke projekata
  samo u opisima projekata. Pravilo „person-first“ važi: brojke opisuju posao, ne proizvod.
- **Redosled**: O meni, Usluge, Projekti, Kako radim, Saradnja, Iskustvo. Dokaz dolazi pre
  procesa. Tehnologije su podsekcija Iskustva, pa navigacija ima šest stavki.
- **Usluge** su oblasti: dve kartice za specijalizaciju, ostale tri kao lista. Principi za
  operaterske ekrane su poseban blok u Uslugama, svaki sa rečenicom objašnjenja.
- **Saradnja** je jedina lista ponude: za svaki paket kome je namenjen i šta se dobija, uz
  poziv „Discuss a package“.
- **Kako radim** je opisan kao proces na projektima u COMING-u. Prva tri koraka su vezana za
  pakete koji ih pokrivaju, a razvoj i isporuka su označeni kao timski rad. Korak „Design“ je
  postao „Architecture“ i više ne pominje makete, jer ih ne pravi on.
- **Projekti**: mreža i IoT kontrolne table su case studyji (Problem, Ograničenje, Moja uloga,
  Rezultat) sa istaknutom brojkom i anonimnom šemom označenom kao ilustracija sa izmišljenim
  podacima. Ostali projekti su kompaktna lista, lični projekti takođe.
- **Iskustvo**: jedna stavka „Software Engineer and Frontend Team Lead“, jul 2019 – danas, uz
  napomenu da tim vodi od maja 2022. Činjenice se ne menjaju, samo se više ne čita kao dve
  paralelne pozicije. Ključne tehnologije su istaknute, „Windows“ je izbačen.
- **Footer**: tri stavke šta da se napiše u poruci, opciono dugme za LinkedIn
  (`site.linkedinUrl`, skriveno dok je prazno) i ista primarna boja kao u hero-u.
- **Header**: prekidač jezika „EN / Срп“ umesto padajućeg menija.
- Na telefonu je portret manji, da ne zauzme ceo ekran pre sadržaja.

## Posledice

- Pozitivno: specijalizacija i dokazi se vide u prvom ekranu; proces se čita kao ponuda u
  ograničenom obimu, a ne kao obećanje celog projekta.
- Negativno: hero je bliži opciji 2 iz ADR 0004, koju je Aleksandar tada odbio; ako mu i dalje
  smeta, vraća se samo linija uloge.
- Otvoreno: novo fotografisanje portreta (kadar, ne korekcija), pravi imejl, LinkedIn URL i
  rok za odgovor u footeru čekaju Aleksandrove podatke.
