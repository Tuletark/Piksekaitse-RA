# Piksekaitse riskianalüüsi tööriist

Iseseisev HTML-rakendus piksekaitse riskianalüüsi tegemiseks vastavalt standardile
**EVS-EN IEC 62305-2:2025** (Eesti standardiamet, oktoober 2025).

Rakendus arvutab piksetabamuste põhjustatud riski ehitisele ja annab soovituse:
kas piksekaitse on vajalik ning millise klassiga (LPS I–IV).

## 🌐 Live rakendus

**👉 https://tuletark.github.io/Piksekaitse-RA/**

Avaneb otse brauseris, ei vaja installimist ega registreerimist.

## Kiirstart

**Online:** ava brauseris https://tuletark.github.io/Piksekaitse-RA/

**Lokaalselt (offline):** ava `piksekaitse.html` brauseris (kahe-klikk failil
— server ei ole vajalik).

Seejärel:

1. Täida vahekaart **„Põhiandmed”** (tavahoone jaoks piisab sellest).
2. Vajuta nuppu **„Arvuta risk”** — tulemus ilmub parempoolsele paneelile koos
   kopeeritavate aruandeplokkidega (kokkuvõte, arvutuskäik, algandmete tabel).
3. Vajadusel salvesta sisendid JSON-faili (rakenduses olev nupp), et sama juhtum
   hiljem uuesti laadida.

> Rakendus on üks fail (`piksekaitse.html`), kogu loogika on selles. Internetiühendust
> ega lisapakette ei ole vaja.

## Sisend — lihtsamast täpsemani

**Põhiandmed** (alati aktiivne) — objekt, välk (N<sub>G</sub>, k), hoone (L, W, H,
C<sub>D</sub>, P<sub>S</sub>), kasutus ja kahjud (t<sub>z</sub>, tabel C.2, r<sub>f</sub>,
r<sub>p</sub>, r<sub>t</sub>, P<sub>am</sub>), keskkond C<sub>E</sub>, elektri- ja
sideliin, olemasolev kaitse ning **Erijuhud**.

Täpsemad vahekaardid on **hallid ja lukus**, kuni mõni „Erijuhud” valik neid eeldab:

| Vahekaart | Aktiveerub, kui |
|---|---|
| Liinid (täpsem) — U<sub>W</sub>, kaabli varje, lisalõigud, naaberehitis | liin mitmest lõigust, naaberhoone, varjestatud kaabel (varje ühendatud), plahvatusoht/haigla |
| Sisesüsteemid — L<sub>O1</sub>, L<sub>O2</sub>, t<sub>e</sub>, K<sub>S1–S3</sub> | plahvatusoht või haigla |
| Avatud alad — P<sub>O</sub>, L<sub>D</sub> | hoonel on avatud alad, kus viibivad inimesed |
| Tsoonid | hoone jaotatakse tsoonideks (näide F.3) |

**Ekspertrežiim** (lüliti paneeli päises) avab kõik vahekaardid.

Iga valiku juures on näha tähendus, sümbol ja väärtus (nt „Süvistatud — CI = 0,3”).
Kolmanda osapoole andmetel (liinid, olemasolev kaitse, P<sub>am</sub>, P<sub>S</sub>)
on valik **„Teadmata”** → kasutatakse ebasoodsaimat väärtust ja see märgitakse
tulemustes ning algandmete tabelis eeldusena.

## Väljund

Parempoolne paneel näitab:

- **R = R<sub>L1</sub> + R<sub>L2</sub>** — kogurisk, võrreldakse R<sub>T</sub> = 10⁻⁵-ga
  (jaotis 7.3; tsoonide korral igas tsoonis)
- **Aruande plokid** — kokkuvõte, arvutuskäik ja tabel „Algandmed”, igaüks nupuga
  „Kopeeri Wordi”
- **R<sub>D</sub>**, **R<sub>I</sub>** — riskikomponentide vahesummad
- **Üksikkomponendid** RA, RB, RU, RV, RC, RM, RW, RZ
- **Soovitus** — kas piksekaitse on vajalik ja millise LPS-klassiga

## Faili struktuur

```
piksekaitse_project/
├── README.md               ← see fail
├── HANDOFF.md              ← üleandmise kontekst (claude.ai sessioonist)
├── CHANGELOG.md            ← versioonide ajalugu
├── index.html              ← suunab juurURL-ilt rakendusele (GitHub Pages)
├── piksekaitse.html        ← rakendus (HTML + CSS + JS samas failis)
├── tests/
│   └── test_examples.js    ← Node.js test, mis kontrollib standardi näiteid F.2 ja F.3
└── docs/
    ├── DECISIONS.md        ← standardi tõlgenduse otsused
    ├── arhitektuur.md      ← rakenduse sisemine struktuur
    └── standardiviited.md  ← kus koodis viitame millisele tabelile/valemile
```

## Testimine

Testi käivitamiseks on vaja **Node.js** (versioon ≥ 14 piisab).
Projekti juurkaustast:

```bash
node tests/test_examples.js
```

Test käivitab kaks standardi näidet:
- **F.2 Maja** (üks tsoon, R = 1,793 × 10⁻⁵)
- **F.3 Büroohoone** (viis tsooni: sissepääs, katus, arhiiv, kontorid, arvutuskeskus;
  kahelõiguline elektriliin)
- Liinilõikude sisemine kooskõla (1 × 1000 m == 400 m + 600 m)
- Praktiline näide (ärihoone): võrdlus varasema Exceli arvutusega ning
  otsustuskriteerium R = R<sub>L1</sub> + R<sub>L2</sub>

Oodatud kokkuvõte: **120 läbi, 0 luhtus.** Testitud on standardi näited F.2, F.3 ja F.4
(kaitsmata ja kaitstud) ning kõik tabelikonstandid — vt `docs/AUDIT_2026-09.md`.

**Iga arvutusi puudutava muudatuse järel tuleb test läbi käia.**

## Dokumentatsioon

- [CHANGELOG.md](CHANGELOG.md) — versiooniajalugu
- [docs/DECISIONS.md](docs/DECISIONS.md) — standardi tõlgenduse otsused
  (miks on nt RT lukus, miks AM kasutab madalaimat UW jne)
- [docs/arhitektuur.md](docs/arhitektuur.md) — rakenduse struktuur
- [docs/standardiviited.md](docs/standardiviited.md) — koodi ↔ standardi vastavustabel

## Litsents

Sisemiseks kasutuseks (Neuhaus Grupp OÜ).
Standardi tekst on Eesti standardiameti autoriõigusega kaitstud — koodi kommentaarides
viidatakse ainult valemitele ja tabelite numbritele, mitte tekstile.
