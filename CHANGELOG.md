# Muudatuste logi

Kõik märkimisväärsed muudatused selles projektis dokumenteeritakse siin.

Vorming põhineb [Keep a Changelog](https://keepachangelog.com/et/1.1.0/) põhimõttel,
projekt järgib [semantilist versioneerimist](https://semver.org/lang/et/).

## [Avaldamata]

### Lisatud — v1.4 mitme tsooni tugi
- **Mitme tsooni arvutamine** (vahekaart 7 „Tsoonid”). Kasutaja saab jaotada
  ehitise eraldi tsoonideks omade kahjudega, kohaloleku aegadega ja
  riskikomponentide valikuga. Kogu R = Σ R_tsoon.
- **F.3 büroohoone näide** üks-klõpsuga laadimine — 5 tsooni (sissepääsuala,
  katus, arhiiv, kontorid, arvutuskeskus).
- **`arvutaEhitis(shared, tsoonid)`** funktsioon JS-mootoris — orkestreerib
  per-tsooni `koguArvutus` ja koondab tulemused.
- **Test `tests/test_examples.js`** asendab varasema `test_validation.js` —
  sisaldab nii F.2 (üks tsoon) kui F.3 (5 tsooni) valideerimist.
- **Tulemustes per-tsooni tabel** (sarnane standardi tabelile F.21).

### Lisatud — varasem
- Versioonihaldus (Git) — repositoorium [Tuletark/Piksekaitse-RA](https://github.com/Tuletark/Piksekaitse-RA)
- **Live-rakendus:** https://tuletark.github.io/Piksekaitse-RA/ (GitHub Pages)
- `index.html` — suunab juurURL-ilt automaatselt `piksekaitse.html`-le, et live-link
  oleks lühike ja mäluvõimekas
- Dokumentatsioon: README, CHANGELOG, docs/DECISIONS, docs/arhitektuur, docs/standardiviited
- JSDoc-kommentaarid kõikidele JS-funktsioonidele (haardealade, sageduste,
  tõenäosuste, riskikomponentide arvutused + UI-loogika)
- `.gitignore`

### Teadaolevad piirangud
- Mitme tsooni režiimis kasutame **ühte elektriliini segmenti** (kõrgepinge).
  Standardi näide F.3 modelleerib elektriliini kahesegmendilisena (kõrgepinge
  1000 m + madalpinge 100 m). Sellest tulenevalt jäävad RV ja RU komponendid
  Z3-Z5 tsoonides standardi väärtustest umbes 30% madalamaks. Tervikriski R
  erinevus on ~3–4%. RB ja RAT/RAD vastavad standardile täpselt.
- Vigastumise sageduse F arvutust (jaotis 9) pole rakendatud.

### Muudetud
- `tests/test_validation.js` — kõvakodeeritud Linuxi tee (`/home/claude/...`) asendatud
  suhtelise teega, mis töötab ka Windowsis (`path.join(__dirname, '..', 'piksekaitse.html')`).
  Lisatud `process.exit(0/1)`, et testi õnnestumist saaks CI-st tuvastada.

## [1.3] — 2026-04-30

UX-paranduste kogum, mis tegi rakenduse projekteerija jaoks praktilisemaks.

### Muudetud
- **R<sub>T</sub> on lukus väärtusele 10⁻⁵** — standardi (jaotis 7.3, MÄRKUS 1)
  tüüpiline väärtus inimelu kaotuse jaoks. Põhjalikule uurimisele tuginedes
  lubatud muud väärtused, aga praktikas neid ei kasutata.
- **t<sub>e</sub> on kasutaja eest peidetud** — see parameeter mõjutab Pe = t<sub>e</sub>/8760
  kaudu ainult komponente RC, RM, RW, RZ, mis omakorda rakenduvad ainult plahvatusohu
  või haigla puhul. Tavaehitistel t<sub>e</sub>/8760 = 1 ja parameeter ei mõjuta midagi.
  Hoitakse hidden-inputis (8760), et arvutus säiliks.
- **CD selgitused** — paiknemistegurile lisatud rippmenüüsse selgitavad tekstid.
- **KS1, KS2 vaikimisi 1,0, peidetud expander'i alla** — neid on vaja ainult
  LPS-metallekraani või raudbetoonelementide võrgu puhul. Standardi näidetes F.1–F.3
  on KS1 = KS2 = 1,0 kõikidel juhtumitel.
- **RAD aktiveerub tingimuslikult** — RAD-iga seotud sisendid muutuvad valitavaks
  ainult siis, kui kasutaja märgib, et RAD on rakendatav.
- **Kahjud dropdownidena (tabel C.2 vahemikud)** — LT, LD, LF, LO ei ole enam
  vabavormiväljad, vaid valitakse ehitise kategooria järgi tabeli C.2 vahemikest.
  Vaikimisi pakutakse vahemiku suurim väärtus (vt standard, jaotis pärast tabel C.2).

### Valideerimine
- F.2 (Maja) testjuhtum: R = 1,793 × 10⁻⁵ (vastab standardi näitele)

## [1.2] — 2026-04-30

### Lisatud
- **NG → NSG automaatne arvutus** kasutaja sisestatud välgutiheduse põhjal.
- Vahekaartide vahetus parandatud.

### Muudetud
- **Kogu JavaScript paigutati HTML-faili sisse** (varasemalt eraldi `.js` failist).
  Põhjus: brauser blokeerib `file://` protokolli puhul `<script src="...">` CORS-i
  pärast. Üks fail töötab kõikjal kahe-klikiga.

## [1.1] — 2026-04-30

### Muudetud
- **Algselt plaanitud Pythoni GUI vahetati HTML-rakenduse vastu.**
  Põhjus: nullinstall, kahe-klikiga avatav, ühilduv kõikide platvormidega
  (Windows / macOS / Linux), pole Pythoni-keskkonda vaja.

## [1.0] — 2026-04-30

Esmane versioon.

### Lisatud
- Algse arvutusloogika tugi (R komponendid: RA, RB, RU, RV, RC, RM, RW, RZ).
- Standardi tabelid A.1–A.4, B.1–B.13, C.1–C.2.
- Lisa A haardealade arvutused (AD, AM, AL, AI).
- Lisa B tõenäosuste arvutused.
- Klassi (LPS I–IV) hindamine R<sub>T</sub> alusel.
