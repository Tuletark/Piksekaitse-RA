# Piksekaitse riskianalüüsi tööriist

Iseseisev HTML-rakendus piksekaitse riskianalüüsi tegemiseks vastavalt standardile
**EVS-EN IEC 62305-2:2025** (Eesti standardiamet, oktoober 2025).

Rakendus arvutab piksetabamuste põhjustatud riski ehitisele ja annab soovituse:
kas piksekaitse on vajalik ning millise klassiga (LPS I–IV).

## Kiirstart

1. Ava `piksekaitse.html` brauseris (kahe-klikk failil — server ei ole vajalik).
2. Sisesta ehitise andmed seitsmel vahekaardil vasakpoolsel paneelil.
3. Vajuta nuppu **„Arvuta”** — tulemus ilmub parempoolsele paneelile.
4. Vajadusel salvesta sisendid JSON-faili (rakenduses olev nupp), et sama juhtum
   hiljem uuesti laadida.

> Rakendus on üks fail (`piksekaitse.html`), kogu loogika on selles. Internetiühendust
> ega lisapakette ei ole vaja.

## Sisend-vahekaardid

1. **Üldine** — välgutiheduse andmed (NSG, k), vastuvõetav risk RT.
2. **Ehitis** — mõõtmed (L, W, H), paiknemistegur CD, kategooria, kahjud (LT, LD, LF, LO).
3. **Kaitsemeetmed** — PB ja PM komponentide tegurid (rf, rp, PS, KS1–KS3, RAD).
4. **Elektriliin** — pikkus, paigaldus (CI), keskkond (CE), tüüp (CT), seadme UW, kaabli tüüp.
5. **Sideliin** — sama, aga sideliini jaoks.
6. **Naaberehitis** — kui liin ühendab kahte ehitist (Lisa A.6).
7. **Plahvatusoht / haigla** — L1 ja L2 plahvatus-/haiglate tingimuslikud kaod.

## Väljund

Parempoolne paneel näitab:

- **R** — kogurisk (peab olema ≤ RT, vaikimisi 10⁻⁵)
- **R<sub>D</sub>**, **R<sub>I</sub>** — riskikomponentide vahesummad
- **Üksikkomponendid** RA, RB, RU, RV, RC, RM, RW, RZ
- **Soovitus** — kas piksekaitse on vajalik ja millise LPS-klassiga

## Faili struktuur

```
piksekaitse_project/
├── README.md               ← see fail
├── HANDOFF.md              ← üleandmise kontekst (claude.ai sessioonist)
├── CHANGELOG.md            ← versioonide ajalugu
├── piksekaitse.html        ← rakendus (HTML + CSS + JS samas failis)
├── tests/
│   └── test_validation.js  ← Node.js test, mis kontrollib standardi näidet F.2
└── docs/
    ├── DECISIONS.md        ← standardi tõlgenduse otsused
    ├── arhitektuur.md      ← rakenduse sisemine struktuur
    └── standardiviited.md  ← kus koodis viitame millisele tabelile/valemile
```

## Testimine

Testi käivitamiseks on vaja **Node.js** (versioon ≥ 14 piisab).
Projekti juurkaustast:

```bash
node tests/test_validation.js
```

Oodatud väljund:

```
===== Standardi näide F.2 (Maja) - valideerimine =====

R = 1.793 × 10⁻⁵   (oodatud: 1.793)
Erinevus: 0.000%
✓ TÄPSED TULEMUSED!
```

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
