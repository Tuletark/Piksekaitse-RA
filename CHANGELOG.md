# Muudatuste logi

Kõik märkimisväärsed muudatused selles projektis dokumenteeritakse siin.

Vorming põhineb [Keep a Changelog](https://keepachangelog.com/et/1.1.0/) põhimõttel,
projekt järgib [semantilist versioneerimist](https://semver.org/lang/et/).

## [Avaldamata]

Standardi audit — vt `docs/AUDIT_2026-09.md`.

### Parandatud
- **LPS-iga ehitisel P<sub>S</sub> = 1** (tabel B.4, MÄRKUS 1). Varem jäi P<sub>S</sub> = 0,5,
  mistõttu raudbetoon-/teraskarkassiga kaitstud ehitise R<sub>B</sub> oli 2× alahinnatud —
  ka LPS-klassi soovitus võis olla liiga madal. Kinnitatud tabeliga F.23.
- **P<sub>SPD</sub> „parem kui LPL I”** vastavalt tabelitele B.7/B.8: 10⁻⁴, 5 × 10⁻⁵, 10⁻⁵
  (varasem 0,005 eemaldatud — 2025. a tabelites seda pole).
- **P<sub>LD</sub>** tabelite vahepealse U<sub>W</sub> korral: lähim madalam veerg (ohutu pool).
- C<sub>T</sub> valikute sildid vastavalt tabelile A.3 (MP-liin / KP-liin autotrafoga = 1).

### Lisatud
- Testid: F.2 komponendid ja kaitstud variant (F.8, F.9), F.3 kaitstud (F.23),
  F.4 haigla kaitsmata ja kaitstud (F.28, F.35, F.37), tabelikonstandid vs standard.
  Kokku 120 kontrolli.
- `docs/AUDIT_2026-09.md` — auditi tulemused ja teadaolevad piirangud.

## [1.6] — 2026-09-28

Liides lihtsamast täpsemani, aruande plokid; kaitsevajaduse kriteeriumi parandus.

### Lisatud
- **Liides lihtsamast täpsemani** (docs/KAVAND_liides_v2.md): üks „Põhiandmed”
  vorm tavahoone jaoks; täpsemad vahekaardid (Liinid, Sisesüsteemid, Avatud alad,
  Tsoonid) on lukus, kuni „Erijuhud” valik neid eeldab; ekspertrežiim avab kõik.
- **Iga valik näitab tähendust, sümbolit ja väärtust** („Süvistatud — CI = 0,3”)
  ning valitud väärtust rippmenüü all tervikuna.
- **„Teadmata” valik** (ebasoodsaim väärtus) liiniandmetele, olemasolevale
  kaitsele, P<sub>am</sub>-ile, P<sub>S</sub>-ile ja lisalõigu C<sub>E</sub>-le;
  eeldused kuvatakse tulemustes ja algandmete tabelis. Vt DECISIONS §12.
- **Aruande plokid** kopeerimiseks Wordi: kokkuvõte, arvutuskäik (ainult
  kohalduvad komponendid) ja tabel „Algandmed” (parameeter | kommentaar |
  sümbol | väärtus | viide). Esialgu ühe tsooni režiimis.
- Uued väljad: töö nr, kasutusviis (määrus 17, ainult info).
- Test: praktiline näide (ärihoone) võrdluses varasema Exceli arvutusega;
  otsustuskriteeriumi test. Kokku 26 kontrolli.

### Parandatud
- **Kaitsevajaduse kriteerium oli vale.** Rakendus võrdles R<sub>T</sub>-ga ainult
  R<sub>1</sub>-e; standard (jaotis 7.3, valem 6) nõuab R = R<sub>L1</sub> + R<sub>L2</sub>,
  tsoonideks jaotatud ehitisel igas tsoonis. R<sub>L2</sub> komponentides pole
  P<sub>P</sub>-d, mistõttu R<sub>L2</sub> on sageli suurem kui R<sub>L1</sub> —
  juhul R<sub>1</sub> &lt; R<sub>T</sub> &lt; R andis rakendus vale järelduse
  „piksekaitse pole vajalik”. Parandatud ka LPS-klassi hindamine. Vt DECISIONS §13.
- JSON-faili laadimine: kahju valikud (L<sub>F</sub>, L<sub>O</sub>) taastuvad
  õigesti ka siis, kui salvestatud kategooria erineb vaikimisi kategooriast.

### Teadaolevad piirangud
- Tsoonirežiimis on P<sub>am</sub>, K<sub>S3</sub> ja P<sub>SPD</sub> tsooni
  vaikeväärtusega (1) — tsooniredaktoris neid veel muuta ei saa (kuvatakse märkus).
- Aruande plokid on esialgu ainult ühe tsooni režiimis.

## [1.5] — 2026-09-28

Liinilõikude tugi; näide F.3 vastab standardile täpselt.

### Lisatud
- **Liini jaotamine lõikudeks** (jaotis 8.4) — vahekaardil „Liinid” saab
  elektri- ja sideliinile lisada lisalõike, igal oma L<sub>L</sub>, C<sub>I</sub>,
  C<sub>T</sub>, C<sub>E</sub> ja kaabli tüübiga. R<sub>U</sub>, R<sub>V</sub>,
  R<sub>W</sub>, R<sub>Z</sub> summeeritakse lõikude kaupa (jaotis 8.2).
  Liini põhiväljad = lõik 1 (ehitise poolne). Vt DECISIONS §11.
- Aruandes haardealad ja sagedused lõikude kaupa (A<sub>L,P1</sub>, N<sub>L,P2</sub> jne) ning Σ.
- Testid: F.3 N<sub>L</sub>/N<sub>I</sub> lõikude kaupa (tabel F.14), R<sub>V</sub>
  tsoonides Z3–Z5 (tabel F.21), lõikudeks jagamise kooskõla. Kokku 21 kontrolli.

### Parandatud
- **F.3 näide vastab nüüd standardile täpselt** — Z3–Z5 R erinevus oli ~4 %,
  nüüd ≤ 0,2 % (elektriliin LV 100 m + HV 1000 m, tabel F.11).
- **„Lae F.3 büroohoone näide” nupp seadis valed väärtused** — C<sub>E</sub> ja
  P<sub>S</sub> valikute nimed ei vastanud rippmenüüdele, mistõttu jäid
  C<sub>E</sub> = 1 ja P<sub>S</sub> = 1 (õige 0,5 ja 0,5); liini C<sub>I</sub>
  ja C<sub>T</sub> jäid seadmata. Rakenduses kuvatud F.3 tulemus oli seega vale
  (arvutusmootori test seda ei tabanud, sest kutsub mootorit otse).
- **JSON-salvestus ei salvestanud tsoone** — nüüd salvestatakse ja laaditakse
  ka tsoonid ja liinilõigud. Vanemad failid laadivad endiselt.
- Naaberehitise mõõtude rida (L<sub>J</sub>, W<sub>J</sub>, H<sub>J</sub>) ei
  mahtunud kitsas aknas ära ja tekitas horisontaalse kerimisriba.
- `docs/standardiviited.md`: Lisa A valemite numbrid (A.3, A.5–A.12) ning
  A<sub>I</sub> ja N<sub>M</sub> valemid parandatud vastavalt standardile.

### Teadaolevad piirangud
- A<sub>M</sub> arvestab U<sub>W</sub>-d ainult ühendatud väliste liinide seast.
  Kui sisesüsteemil pole välist liini (F.3: fiiberoptiline sideliin, sisemine
  vasest sidesüsteem U<sub>W</sub> = 1,5 kV), on N<sub>M</sub> alahinnatud.
  Mõjutab ainult R<sub>M</sub>-i (plahvatusoht/haigla). Vt DECISIONS.
- Vigastumise sageduse F arvutust (jaotis 9) pole rakendatud.

### Muudetud
- Dokumentatsioon ajakohastatud v1.4 seisuga: HANDOFF.md, README failipuu,
  `docs/arhitektuur.md` (tsoonide loogika, andmevoog) ja `docs/standardiviited.md`
  (õige testifail, näidete F.2/F.3 numeratsioon). Aegunud reanumbrid
  eemaldatud — viidatakse funktsiooni- ja konstandinimedele.

## [1.4] — 2026-05-05

Mitme tsooni tugi. Avaldatud GitHub Pagesis 2026-05-05; Git-silt `v1.4`
lisati tagantjärele (2026-09-28).

### Lisatud — mitme tsooni tugi
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

### Lisatud — projekti töökord
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
