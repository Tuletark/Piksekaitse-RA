# Kavand: liides v2 — lihtsamast täpsemani

> Staatus: **arutlusel** (2026-09-28). Koodi pole veel muudetud.
> Alus: kasutaja tööpraktika (Exceli kalkulaator + aruanne „Nortsu tee 26a”).

## Põhimõtted

1. **Lihtsamast täpsemani.** Vaikimisi on ekraanil üks lühike vorm tüüpilise
   ühetsoonilise hoone jaoks (~90 % töödest). Keerukamad osad avanevad ainult
   siis, kui mõni valik neid eeldab.
2. **„Teadmata” = ebasoodsaim väärtus** — ainult andmetel, mis tulevad
   kolmandalt osapoolelt või mida olemasoleva hoone puhul ei pruugi teada olla.
   Iga selline valik märgitakse aruandes eeldusena.
3. **Iga valik on läbipaistev:** tähendus + arvväärtus + standardi viide,
   nt *„Süvistatud — C<sub>I</sub> = 0,3 (tabel A.2)”*. Valiku juures on ⓘ
   lühiselgitus.

## 1. Lihtne vorm (alati nähtav)

Järjestus järgib aruande tabelit „Algandmed”.

| Plokk | Väli | Sümbol | „Teadmata” → väärtus |
|---|---|---|---|
| **Objekt** | Objekti nimetus, aadress, töö nr, koostaja, kuupäev | — | — |
| | Kasutusviis (määrus 17) — ainult info, ei täida midagi automaatselt | — | — |
| **Hoone** | Pikkus, laius, kõrgus | L, W, H | — |
| | Paiknemine ümbruse suhtes | C<sub>D</sub> | — |
| | Konstruktsioon | P<sub>S</sub> | ✔ → 1 (puit/müüritis) |
| **Välk** | Välgulöökide tihedus (äikeseanalüüs) | N<sub>G</sub> | — |
| | Tegur k (vaikimisi 2) → N<sub>SG</sub> = k × N<sub>G</sub> | k, N<sub>SG</sub> | — |
| **Kasutus** | Inimeste viibimisaeg (h/a) → P<sub>P</sub> | t<sub>z</sub> | — |
| | Ehitise tüüp (tabel C.2) → L<sub>T</sub>, L<sub>F1</sub>, L<sub>F2</sub> (vaikimisi vahemiku suurim) | — | — |
| | Tuleoht | r<sub>f</sub> | — |
| | Tulekahju abinõud | r<sub>p</sub> | — |
| | Põranda / pinnase tüüp | r<sub>t</sub> | — |
| | Puute- ja sammupinge kaitse | P<sub>am</sub> | ✔ → 1 (kaitse puudub) |
| **Keskkond** | Hoone asukoha keskkond | C<sub>E</sub> | — |
| **Elektriliin** | Liin olemas? | — | — |
| | Pikkus | L<sub>L</sub> | ✔ → 1000 m (A.4) |
| | Paigaldus | C<sub>I</sub> | ✔ → õhuliin, 1 |
| | Liini tüüp | C<sub>T</sub> | ✔ → madalpinge, 1 |
| | Varjestus / maandus | C<sub>LD</sub>, C<sub>LI</sub> | ✔ → varjestamata, 1 / 1 |
| **Sideliin** | Olemas / puudub / optiline | — | — |
| | (samad väljad mis elektriliinil) | | ✔ |
| **Olemasolev kaitse** | Piksekaitsesüsteem | P<sub>LPS</sub> | ✔ → puudub, 1 |
| | Liigpingekaitse / potentsiaaliühtlustus | P<sub>SPD</sub>, P<sub>EB</sub> | ✔ → puudub, 1 |

**Tulemus lihtsas režiimis:** R<sub>AT</sub>, R<sub>B1</sub>, R<sub>U</sub>,
R<sub>V1</sub> → R<sub>L1</sub>; R<sub>B2</sub>, R<sub>V2</sub> → R<sub>L2</sub>;
R = R<sub>L1</sub> + R<sub>L2</sub> võrdluses R<sub>T</sub> = 10⁻⁵; vajadusel
soovitatav LPS-klass.

Taustal kehtivad vaikeväärtused (nähtavad aruande tabelis, muudetavad täpsemas
režiimis): U<sub>W</sub> = 2,5 kV, P<sub>TWS</sub> = 1, K<sub>S1</sub> = K<sub>S2</sub> = 1,
t<sub>e</sub> = 8760 h.

## 2. Täpsemad osad — mis need avab

| Käivitav valik (lihtsas vormis) | Avaneb |
|---|---|
| ☐ Hoones on plahvatusohtlikke tsoone või on tegu haiglaga | R<sub>C</sub>, R<sub>M</sub>, R<sub>W</sub>, R<sub>Z</sub>; L<sub>O1</sub>/L<sub>O2</sub>; t<sub>e</sub>; K<sub>S1</sub>–K<sub>S3</sub>; U<sub>W</sub> |
| ☐ Katusel / hoone juures on avatud ala, kus viibivad inimesed | R<sub>AD</sub>; P<sub>O</sub>; L<sub>D</sub> |
| Varjestuse valik „varjestatud, varje ühendatud” | Varje takistus R<sub>S</sub> → P<sub>LD</sub>; U<sub>W</sub> |
| ☐ Liin koosneb mitmest lõigust (nt MP-kaabel + KP-liin trafoga) | Lisalõigud (L<sub>L</sub>, C<sub>I</sub>, C<sub>T</sub>, C<sub>E</sub>, kaabel); C<sub>E</sub> „teadmata” → 1 |
| ☐ Liin ühendab naaberhoonega | N<sub>DJ</sub>: L<sub>J</sub>, W<sub>J</sub>, H<sub>J</sub>, C<sub>DJ</sub> |
| ☐ Äikesehoiatussüsteem (TWS) | P<sub>TWS</sub> |
| ☐ Hoone jaotatakse tsoonideks | Tsoonide redaktor (nagu praegu vahekaart 7) |

Tingimusteta nähtav nupp **„Näita kõiki parameetreid”** (ekspertrežiim) —
avab kõik, nt kontrolliks.

## 3. Väljund

**Etapp 1:** tabel „Algandmed” (parameeter | kommentaar | sümbol | väärtus |
viide) ja kokkuvõte (komponendid, R<sub>L1</sub>, R<sub>L2</sub>, R, järeldus)
aruande vormingus — kopeeritav Wordi (üks klõps → lõikelaud, vormindus säilib).
„Teadmata” väärtuste kommentaar: *„andmed puuduvad — võetud ebasoodsaim väärtus”*.

**Etapp 2 (hiljem, kui vaja):** terviklik aruanne (tiitelleht, taust,
lähtealused, raamistik, kokkuvõte, arvutuskäik, algandmed) .docx või PDF-ina.

## 4. Mis jääb samaks

- Arvutusmootor (`koguArvutus`, `arvutaEhitis`, `arvutaRiskid`) — muutub ainult
  sisendi kogumine. Testid (21) peavad läbima muutmata kujul.
- JSON-salvestus — vanad failid peavad avanema.

## 5. Rakendamise järjekord

1. Valikute kuvamine „tähendus — sümbol = väärtus (tabel)” + ⓘ selgitused
   (kõik rippmenüüd).
2. „Teadmata” valikud ülaltoodud parameetritele + eelduste loend tulemustes.
3. Lihtsa vormi paigutus + tingimuslikud täpsemad plokid (vahekaardid kaovad
   või jäävad ainult ekspertrežiimi).
4. Väljund: tabel „Algandmed” + kokkuvõte kopeeritavana.
5. Kontroll: Nortsu tee 26a arvutus lihtsas režiimis → R = 3,36 × 10⁻⁷.

## Lahtised küsimused

- Kas väljund etapiks 1 (kopeeritav tabel + kokkuvõte) sobib?
- Kas „Objekt” plokki on vaja veel välju (tellija, kontaktisik, allkirjastamise aeg)?
