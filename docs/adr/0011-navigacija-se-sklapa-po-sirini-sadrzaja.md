# ADR 0011: Navigacija se sklapa u meni po širini sadržaja

- Status: predloženo
- Datum: 2026-10-09

## Kontekst

`Navbar` je sklapao linkove u meni ispod 768 px širine zaglavlja (container query). Šest
linkova, ime, prekidač jezika i tema traže oko 990 px, pa su između 768 i ~990 px linkovi
prelazili preko prekidača jezika i teme. Aleksandar je to video na iPadu (820 px, portret).
Potrebna širina zavisi od jezika (srpske oznake su drugačije dužine), od fonta i od broja
stavki, pa nijedan fiksni prelom ne ostaje tačan kad se tekst promeni.

## Odluka

`Navbar` meri da li linkovi staju u jedan red pored brenda i akcija i sklapa ih u meni kad ne
staju. Meri se nevidljiva kopija liste u prirodnoj širini (`aria-hidden`, bez linkova), a
`ResizeObserver` prati traku, brend, akcije i tu kopiju, pa se odluka ponavlja i kad se
promeni širina prozora, jezik ili font.

## Razmatrano

- **Podići fiksni prelom na 1024 px**: najmanja izmena, samo CSS. Odbačeno jer je broj
  izmeren za današnje oznake; nova stavka ili duža oznaka vraća isti kvar bez upozorenja.
- **Sakriti ime i smanjiti razmake na srednjim širinama**: na 768 px i dalje ne staje
  (lista ~563 px + akcije), a ime je deo ličnog brenda.

## Posledice

- Na tabletu u portretu (768 do ~990 px) navigacija je u meniju; od oko 1000 px linkovi su u
  redu. Prelom se sam pomera kad se tekst promeni.
- Komponenta ima malo JavaScript-a i jednu skrivenu kopiju liste. Bez JavaScript-a sajt ionako
  ne radi (Vue SPA), pa nema potrebe za CSS rezervom.
