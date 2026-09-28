# Standardi tõlgenduse otsused

See dokument kirjeldab konkreetseid valikuid, mida tegime standardi
**EVS-EN IEC 62305-2:2025** rakendamisel rakenduses `piksekaitse.html`.

Iga otsuse juures on:
- **Otsus** — mida me teeme
- **Põhjendus** — millele standardis tugineme
- **Tähendus kasutajale** — kuidas see kasutajaliideses paistab

---

## 1. R<sub>T</sub> (vastuvõetav risk) on lukus väärtusele 10⁻⁵

**Otsus:** R<sub>T</sub> = 10⁻⁵, kasutaja ei saa seda muuta.

**Põhjendus:** Standard (jaotis 7.3, MÄRKUS 1) toob 10⁻⁵ välja kui tüüpilise
väärtuse inimelu kaotuse (L1) jaoks. Standard lubab "põhjalikule uurimisele
tuginedes" muid väärtusi, aga see eeldab eraldi metoodilist analüüsi, mida
projekteerija igapäevatöös ei tee.

**Tähendus kasutajale:** Üldiste sisendite vahekaardil on R<sub>T</sub> väli
peidetud / lukustatud. Kui hilisem kasutus seda nõuab, saab piirangu eemaldada
vastavast `<input>` elemendist.

---

## 2. NSG = k × NG, vaikimisi k = 2

**Otsus:** Kasutaja sisestab maapinna välgutiheduse NG, rakendus arvutab
NSG = k × NG, kus k vaikimisi on 2.

**Põhjendus:** Lisa A.1, MÄRKUS 1 — kui LLS andmeid (Lightning Location System)
otse pole, on k = 2 tüüpiline tegur, mis arvestab maa-õhk pilvevälke.

**Tähendus kasutajale:** Kasutaja näeb NG-välja ja k-välja (vaikimisi 2).
NSG arvutatakse automaatselt ja kuvatakse arvutuse kõrval.

---

## 3. AM kasutab madalaimat UW-d

**Otsus:** Kui ehitisel on mitu liini erinevate seadmete UW-dega, kasutame
AM arvutuses kõige madalama UW-ga liini väärtust.

**Põhjendus:** Lisa A valem A.8: r<sub>M</sub> = 350/UW. Madalam UW annab suurema
r<sub>M</sub> ja seega suurema (rangema) AM. Standardi näide F.2 kasutab
r<sub>MT</sub> = 233 m (= 350/1,5), kuigi elektriliini UW on 2,5 kV — sest
sideliini UW on 1,5 kV ja see annab range juhtumi.

**Tähendus kasutajale:** Kasutaja sisestab nii elektriliini kui sideliini UW
nende vastavatel vahekaartidel. Rakendus võtab madalaima ja kasutab seda AM-i jaoks.

---

## 4. t<sub>e</sub> on kasutaja eest peidetud

**Otsus:** t<sub>e</sub> on hidden inputis fikseeritud väärtusega 8760 (s/aastas).

**Põhjendus:** t<sub>e</sub> mõjutab Pe = t<sub>e</sub>/8760 kaudu **AINULT**
komponente RC, RM, RW, RZ. Need komponendid rakenduvad ainult plahvatusohu või
haigla puhul. Tavaehitistele jääb Pe = 1, parameeter ei mõjuta midagi.

**Tähendus kasutajale:** Kasutajaliideses puudub t<sub>e</sub> väli. HTML-koodis
on `<input type="hidden" id="te" value="8760">`. Kui mõnel juhul on vaja
t<sub>e</sub> muuta, tuleb see hidden-input asendada nähtava väljaga.

---

## 5. KS1, KS2 vaikimisi 1,0, peidetud expander'i alla

**Otsus:** KS1 = KS2 = 1,0 vaikimisi. Need väljad ei ole põhivaates nähtavad,
aga avanevad expander-i (`<details>`) sees.

**Põhjendus:** Standardi näidetes F.1 (maja), F.2 (büroohoone) ja F.3 (haigla)
on KS1 = KS2 = 1,0 kõikidel juhtumitel. Need on vajalikud ainult LPS-metallekraani
või raudbetoonelementide võrgu olemasolul (vt jaotis B.6, valemid B.8 ja B.9) —
mis on suhteliselt erandlik juhtum.

**Tähendus kasutajale:** Kaitsemeetmete vahekaardil on link „Edasijõudnutele:
KS1 / KS2 (LPS-võrk, raudbetoon)”. Klikkimisel avaneb sektsioon, kus saab
need parameetrid muuta.

---

## 6. PLD — tabelid B.11/B.12 tabelistruktuurina (mitte interpolatsiooniga)

**Otsus:** PLD arvutame, otsides väärtuse kaabli tüübi (RS) ja seadme UW kombinatsioonile
otse standardi tabelitest.

**Põhjendus:** Tabelid B.11 ja B.12 annavad PLD diskreetsete UW väärtuste jaoks
(1 kV, 1,5 kV, 2,5 kV, 4 kV, 6 kV). Standard ei nõua interpolatsiooni —
projekteerija valib lähima tabelis oleva UW. Eelistame standardiväärtustele
truuduse hoidmist sujuva interpolatsiooni asemel.

**Tähendus kasutajale:** UW väljad on rippmenüüd standardi väärtustega.

---

## 7. PC ja PM kombineeritakse, kui mitu sisesüsteemi

**Otsus:** Kui kasutusel on nii elektri- kui sideliin, arvutame:

```
PC = 1 - (1 - PC,P) × (1 - PC,T)
PM = 1 - (1 - PM,P) × (1 - PM,T)
```

**Põhjendus:** Standardi valem (10) — sisesüsteemide rikkumise tõenäosused
liidetakse "või"-loogikaga (vähemalt üks läheb katki).

**Tähendus kasutajale:** Tulemustes näidatakse PC ja PM kui kombineeritud väärtus,
ilma kasutaja sekkumiseta.

---

## 8. LF1, LF2, LO1, LO2 — kategooria järgi vahemikud

**Otsus:** Kahjuväärtused LF, LO, LT, LD valitakse rippmenüüst, mis pakub
ehitise kategooria (1–4) järgi tabeli C.2 vahemiku piirväärtusi (madalaim,
keskmine, kõrgeim). **Vaikimisi valime vahemiku suurima väärtuse.**

**Põhjendus:** Tabel C.2 esitab nelja ehitise kategooriat ja igale kategooriale
**vahemiku** (mitte ühte väärtust). Standard ütleb (jaotis pärast tabel C.2):
„Soovituslik on vaikimisi kasutada tabelis C.2 esitatud suurimaid väärtusi.”

**Tähendus kasutajale:** Ehitise vahekaardil valib kasutaja kategooria, kahjude
rippmenüüd uuenevad automaatselt vastavalt sellele kategooriale.

---

## 9. LO1 / LO2 aktiveeruvad ainult tingimuslikult

**Otsus:** LO1 ja LO2 sisendväljad ilmuvad ainult vastavalt sellele, kas
kasutaja on märkinud „plahvatusoht / haigla”.

**Põhjendus:**
- RC1, RM1, RW1, RZ1 (kasutavad LO1) rakenduvad ainult plahvatusohu või
  haigla puhul.
- RC2, RM2, RW2, RZ2 (kasutavad LO2) rakenduvad ainult plahvatusohu puhul.
- Muude ehitiste puhul on need sisendid kasutusele võtmata ja oleks segadust
  tekitav, kui need oleksid täidetavad.

**Tähendus kasutajale:** „Plahvatusoht / haigla” vahekaardil on lülitid, mis
avavad vajadusel LO1 ja LO2 väljad. Tavaehitisel ei ole need nähtavad.

---

## 10. NDJ (naaberehitis)

**Otsus:** Kui kasutaja märgib, et liin ühendab kahte ehitist, siis lisandub
NDJ komponent.

**Põhjendus:** Lisa A.6 — naaberehitisel toimuv tabamus võib levida liini kaudu
peamisesse ehitisse.

**Tähendus kasutajale:** Eraldi vahekaart „Naaberehitis”, kus saab määrata
naaberehitise mõõtmed ja CDJ (selle paiknemistegur).

---

## 11. Liini jaotamine lõikudeks (jaotis 8.4)

**Otsus:** Elektri- ja sideliinile saab lisada lisalõike (vahekaart „Liinid”,
alates v1.5). Liini põhiväljad kirjeldavad **lõiku 1 — ehitise poolset lõiku**.
Igal lõigul on oma pikkus L<sub>L</sub>, paigaldustegur C<sub>I</sub>,
tüübitegur C<sub>T</sub>, keskkonnategur C<sub>E</sub> ja kaabli tüüp (P<sub>LD</sub>).

**Põhjendus:**
- Jaotis 8.2: kui liinil on mitu lõiku, on R<sub>U</sub>, R<sub>V</sub>,
  R<sub>W</sub> ja R<sub>Z</sub> iga lõiguga seonduvate väärtuste summa.
  Arvestatakse lõike ehitise ja esimese sõlme vahel.
- Jaotis 8.4: lõigud eristuvad liini tüübi (C<sub>I</sub>), omaduste
  (varjestus, ekraani takistus) ning tegurite C<sub>D</sub>, C<sub>E</sub>,
  C<sub>T</sub> poolest.
- Näide F.3 (tabel F.11): LV 100 m + HV 1000 m, mõlemad süvistatud,
  C<sub>E</sub> = 0,5. Tabel F.14 annab N<sub>L</sub> ja N<sub>I</sub> lõikude kaupa.

**Mis on lõigupõhine ja mis liinipõhine:**

| Lõigupõhine (iga lõik eraldi) | Liinipõhine (kõigil lõikudel sama) |
|---|---|
| L<sub>L</sub>, C<sub>I</sub>, C<sub>T</sub>, C<sub>E</sub>, kaabli tüüp → P<sub>LD</sub> | U<sub>W</sub> (ehitise sisesüsteem), C<sub>LD</sub>/C<sub>LI</sub> (liini sisenemine ehitisse), P<sub>EB</sub>, P<sub>SPD</sub> |

**N<sub>DJ</sub> (naaberehitis)** seotakse lõiguga 1 ja kasutab lõigu 1
C<sub>T</sub>-d (nagu enne lõikude tuge). Naaberehitisega ühendav liin on
tavaliselt üks lõik; kui see nii pole, tuleb N<sub>DJ</sub> eraldi üle vaadata.

**Tagasiühilduvus:** lisalõikudeta arvutus on matemaatiliselt identne
varasemaga (test: 1 × 1000 m == 400 m + 600 m; F.2 = 1,793 × 10⁻⁵).

**Mõju:** näide F.3 vastab nüüd tabelile F.21 kõigis tsoonides (R erinevus
≤ 0,2 %, Z1 ümardamise tõttu). Varem (v1.4, üks lõik) oli Z3–Z5 R ~4 % madalam.

---

## 12. „Teadmata” = ebasoodsaim väärtus

**Otsus:** „Teadmata” valik on ainult andmetel, mis tulevad kolmandalt
osapoolelt või mida olemasoleva hoone puhul ei pruugi teada olla:

| Parameeter | Teadmata → |
|---|---|
| Liini pikkus L<sub>L</sub> | 1000 m (jaotis A.4) |
| Paigaldus C<sub>I</sub> | õhuliin, 1 |
| Liini tüüp C<sub>T</sub> | madalpinge, 1 |
| Varjestus C<sub>LD</sub>/C<sub>LI</sub> | varjestamata õhuliin, 1 / 1 |
| P<sub>LPS</sub>, P<sub>SPD</sub>, P<sub>EB</sub> | kaitse puudub, 1 |
| P<sub>am</sub> | kaitsemeetmed puuduvad, 1 |
| P<sub>S</sub> | puit ja müüritis, 1 |
| C<sub>E</sub> (ainult lisalõigud) | maakeskkond, 1 |

**Põhjendus:** kasutaja (tuleohutusekspert) tööpraktika — aruandes märgitakse,
et teadmata andmete korral võeti aluseks kõige ebasoodsamad väärtused.
Ehitise enda omadusi (r<sub>f</sub>, C<sub>D</sub>, t<sub>z</sub>, kasutusviis,
hoone C<sub>E</sub>) teab ekspert alati; nende absoluutne halvim väärtus
(nt plahvatusoht, künka tipp) viiks absurdini — neil „teadmata” valikut pole.

**Rakendus:** `TEADMATA_VALIK`, `valik()`, `teadmataLL()`; iga eeldus
salvestatakse `P.eeldused` loendisse ja kuvatakse tulemustes ning tabelis
„Algandmed” kommentaariga „andmed puuduvad – võetud ebasoodsaim: …”.

---

## 13. Kaitsevajaduse kriteerium: R = R<sub>L1</sub> + R<sub>L2</sub>

**Otsus:** R<sub>T</sub>-ga võrreldakse koguriski R = R<sub>L1</sub> + R<sub>L2</sub>
(valem 6); tsoonideks jaotatud ehitise korral R-i igas tsoonis eraldi.
LPS-klassi hindamine (`hindaKlassid`) kasutab sama kriteeriumi.

**Põhjendus:** jaotis 7.3 — piksekaitse on vajalik, kui R &gt; R<sub>T</sub>;
R arvutatakse jaotise 6.3 järgi (valem 6). Tsoonide korral: „riski R võrdlemine
vastuvõetava riskiga on vajalik tsoonideks jaotatud ehitise igas riskitsoonis”.
Näide F.3: „risk on tsoonides Z2 ja Z3 suurem kui vastuvõetav väärtus”.

**Ajalugu:** kuni v1.5 võrreldi ainult R<sub>1</sub>-e — see oli viga
(R<sub>L2</sub> komponentides pole P<sub>P</sub>-d, seega R<sub>L2</sub> on sageli
suurem kui R<sub>L1</sub>).

---

## 14. LPS-iga ehitisel P<sub>S</sub> = 1

**Otsus:** kui P<sub>LPS</sub> < 1 (LPS paigaldatud vastavalt IEC 62305-3), siis
P<sub>B</sub> arvutamisel P<sub>S</sub> = 1, sõltumata konstruktsioonist. Kehtib ka
LPS-klassi hindamisel (`hindaKlassid`). Aruande tabelis näidatakse P<sub>S</sub> = 1
viitega „tabel B.4, MÄRKUS 1”.

**Põhjendus:** tabel B.4 MÄRKUS 1 — LPS-i kasulikku mõju arvestatakse ainult
P<sub>LPS</sub> kaudu. Kinnitatud näitega F.3 (tabel F.23: R<sub>B</sub> 5,770 → 0,577,
st 0,5 → 1 × 0,05).

---

## 15. P<sub>LD</sub> vahepealse U<sub>W</sub> korral

**Otsus:** kui U<sub>W</sub> jääb tabelite B.11/B.12 veergude vahele, kasutatakse
lähimat **madalamat** veergu (suurem P<sub>LD</sub>). 12…16 kV vahel → B.11 viimane veerg.

**Põhjendus:** standard interpoleerimist ei kirjelda; madalam veerg on ohutu pool
(suurem risk). Varem kasutati kõrgemat veergu.

---

## 16. Standardi sisu: viide avab kasutaja enda PDF-i

**Otsus:** rakendus ei sisalda standardi teksti ega tabeleid. Viited (nt
„tabel B.6”) on klikitavad ja avavad **kasutaja enda** standardi PDF-i õigelt
leheküljelt (`#page=N`). PDF valitakse nupuga „📖 Standard” ja hoitakse ainult
selle brauseri kohalikus mälus (IndexedDB) — fail ei lahku kasutaja arvutist.

**Põhjendus:** standard on autoriõigusega kaitstud (EVS, mitme kasutaja litsents);
rakendus on GitHub Pagesis avalik — standardi sisu kopeerimine oleks levitamine.
Parameetrite selgitused (ⓘ, `SELGITUSED`) on rakenduse enda sõnastuses —
parafraseeritud ja lühendatud, koos praktiliste märkustega; standardi teksti ei
kopeerita.
Leheküljenumbrid (`STANDARDI_LEHED`) on EVS-i eestikeelse väljaande (130 lk)
PDF-faili füüsilised leheküljed; teise väljaande korral võivad need nihkuda.

---

## Otsused, mida me **ei** teinud

- **Vigastumise sageduse F (jaotis 9) arvutus** — pole praegu rakenduses.
  Materjal on standardis olemas, kui kasutaja seda hiljem küsib.
- **Majandusliku riski R4 arvutus** — keskendume L1 (inimelu kaotus) riskile,
  mis on projekteerija jaoks kõige sagedasem nõue.
- **A<sub>M</sub> sisesüsteemide U<sub>W</sub> järgi, millel pole välist liini** —
  A<sub>M</sub> kasutab madalaimat U<sub>W</sub>-d ainult ühendatud liinide seast
  (§3). Näites F.3 on väline sideliin fiiberoptiline, kuid sisemine vasest
  sidesüsteem (U<sub>W</sub> = 1,5 kV) määrab r<sub>M</sub> = 233 m (tabel F.12).
  Meie A<sub>M</sub> F.3 puhul on seetõttu väiksem (N<sub>M</sub> 0,157 vs 0,398).
  Riski R F.3-s see ei mõjuta (R<sub>M</sub> ei rakendu), kuid haigla/plahvatusohu
  juhtudel, kus R<sub>M</sub> arvestatakse, võib. Tulevane parandus.
- **Haigla tüüp ehitis (F.4 standardis)** — vajab täiendavaid tsoonipõhiseid
  riskikomponente, mis pole praegu rakendatud. Lisame kui vajadus tekib.
