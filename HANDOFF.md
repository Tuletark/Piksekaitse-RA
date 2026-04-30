# 🔄 ÜLEANDMINE - Piksekaitse riskianalüüsi tööriist

> **See dokument on mõeldud Claude Code'is alustavale Claude'ile.**
> Loe see esimese asjana läbi, et saada kogu konteksti, mis seni on välja arendatud.

---

## 📋 Projekti olemus

**Nimi:** Piksekaitse riskianalüüsi tööriist
**Standard:** EVS-EN IEC 62305-2:2025 (Eesti standardiamet, oktoober 2025)
**Vorming:** Iseseisev HTML-rakendus (üks fail, kogu JS sees)
**Eesmärk:** Arvutab vastavalt standardile, kas piksekaitse on vajalik ja millise klassiga

**Kasutaja:** projekteerija/insener, mitte arendaja. Ootab praktilist tööriista oma igapäevatööks.

---

## 🎯 Praegune staatus (üleandmise hetkel)

**Versioon:** v1.3 (sisemine, pole veel Git'i pandud)
**Olek:** ✅ Töötab täpselt vastavalt standardile (valideeritud näite F.2 põhjal: R = 1,793 × 10⁻⁵)
**Kasutusvalmidus:** Saab kohe kasutusele võtta, edasiarendus on järkjärguline

### Mis on tehtud (ajaline järjestus)

1. **v1.0** - Esmane versioon, lihtne arvutusloogika
2. **v1.1** - HTML rakendus (asendas algselt plaanitud Pythoni GUI)
3. **v1.2** - NG → NSG automaatne arvutus, vahekaardid töötavad (CORS-iprobleemi tõttu kogu JS sai HTML-i sisse)
4. **v1.3** - UX parandused: RT lukus, te peidetud, CD selgitused, KS1/KS2 expander-i alla, RAD tingimuslik aktiveerimine, kahjud dropdownidena tabeli C.2 vahemikest

### Mis on järgmiste sammude **ootel**

Kasutaja tellis järgmiste sammude jaoks:
- ✅ Versioonihaldus (Git)
- ✅ Dokumenteerimine (README, CHANGELOG, koodikommentaarid)
- ✅ Muudatuste logimine
- ✅ Testimine
- 🔄 **Praegu siin oleme - Claude Code'i alustamine**

### Tunnetuslik olek

Kasutaja on **rahul praegu valmis olnud rakendusega**. Edasi tahab teha asju **professionaalselt** - st mitte "lihtsalt veel funktsioone juurde lisada", vaid panna **töökord paika** enne, kui tehakse järgmisi muudatusi.

---

## 🏗️ Tehniline arhitektuur

### Failid (mille leiad selle dokumendi kõrvalt)

```
piksekaitse_project/
├── HANDOFF.md              ← see fail (loe esimesena)
├── piksekaitse.html        ← rakendus (1716 rida, kogu JS sees)
├── tests/
│   └── test_validation.js  ← Node.js test, mis kontrollib F.2 näidet
└── docs/
    └── (tühi - tuleb täita)
```

### Rakenduse struktuur HTML-i sees

`piksekaitse.html` sisaldab:
1. **HTML struktuur** - 7 vahekaarti vasakpoolsel paneelil + tulemused parempoolsel
2. **CSS** - inline stiilid, responsiivne 2-veerg layout
3. **JavaScript** ühe `<script>` bloki sees, mis sisaldab:
   - **TABELID** - Standardi tabelid A.1-A.4, B.1-B.13, C.1-C.2 (kõik dictionary'd)
   - **HAARDEALADE arvutused** (Lisa A) - `arvutaAD`, `arvutaAM`, `arvutaAL`, `arvutaAI`
   - **SAGEDUSED** - `arvutaND`, `arvutaNM`, `arvutaNL`, `arvutaNI`
   - **TÕENÄOSUSED** (Lisa B) - `arvutaPAT`, `arvutaPB`, `arvutaPC`, `arvutaPM`, `arvutaPU`, `arvutaPV`, `arvutaPW`, `arvutaPZ`, `arvutaPLD`
   - **RISKIKOMPONENDID** - `arvutaRiskid` arvutab kõik R-id (jaotis 8, Tabel 3)
   - **UI loogika** - vahekaartide vahetus, CD selgitused, RAD lülitus, LO1/LO2 lülitus, kahjude vahemikud kategooria järgi
   - **PEAMINE arvutus** - `koguArvutus` ja `hindaKlassid`
   - **TULEMUSTE kuvamine** - `kuvaTulemused` koostab HTML-aruande

---

## 📐 Standardi tõlgendus - olulised otsused

Need on kohad, kus tegime **konkreetseid valikuid standardi rakendamisel** - need otsused on dokumenteeritud ka koodis, aga lihtsam neid kõiki siit lugeda.

### 1. R<sub>T</sub> (vastuvõetav risk) on lukus 10⁻⁵
**Põhjendus:** Standard (jaotis 7.3, MÄRKUS 1) ütleb, et 10⁻⁵ on tüüpiline väärtus inimelu kaotuse jaoks. Standard lubab "põhjalikule uurimisele tuginedes" muid väärtusi, aga praktikas seda ei tehta. Kasutaja tegi selge soovi, et väärtus oleks lukus.

### 2. NSG = k × NG, k vaikimisi 2
**Põhjendus:** Lisa A.1, MÄRKUS 1 - kui LLS andmeid pole otse, siis k = 2 on tüüpiline.

### 3. AM kasutab madalaimat UW
**Põhjendus:** AM valem A.8: rM = 350/UW. Kui ehitisel on mitu liini erinevate UW-dega (näiteks elektriliin 2.5 kV ja sideliin 1.5 kV), siis kõige rangem juhtum (suurim AM) tuleb 1.5 kV-st. Vt standardi näide F.2: arvutuses kasutatakse rMT = 233 m (= 350/1.5).

### 4. te peidetud kasutaja eest
**Põhjendus:** te mõjutab Pe = te/8760 kaudu **AINULT** komponente RC, RM, RW, RZ. Need rakenduvad ainult plahvatusoht/haigla puhul. Tavaehitistele te/8760 = 1, parameeter mõjuta. Hoiame väärtuse hidden inputis (8760), et arvutus säiliks.

### 5. KS1, KS2 vaikimisi 1.0, peidetud expander'i alla
**Põhjendus:** Standardi näidetes F.1-F.3 (maja, büroohoone, haigla) on KS1 = KS2 = 1.0 KÕIKIDEL juhtumitel. Need on vajalikud ainult LPS-metallekraani või raudbetoonelementide võrgu puhul (jaotis B.6, valemid B.8, B.9).

### 6. PLD - tabelid B.11/B.12 tabelistruktuurina
**Põhjendus:** PLD sõltub kaabli tüübist (RS) ja seadme UW-st. Kasutame reaalseid standardi tabeli väärtusi, mitte interpolatsiooni.

### 7. PC, PM kombineeritud (kui mitu sisesüsteemi)
**Põhjendus:** Standardi valem (10): PC = 1 - (1-PC,P) × (1-PC,T) kui mõlemad sisesüsteemid eksisteerivad.

### 8. LF1, LF2, LO1, LO2 - kategooria järgi vahemikud
**Põhjendus:** Tabel C.2 esitab 4 ehitise kategooriat ja igale kategooriale **vahemiku** (mitte ühe väärtuse). Standard ütleb (jaotis pärast Tabel C.2): "Soovituslik on vaikimisi kasutada tabelis C.2 esitatud suurimaid väärtusi". Seega vaikimisi valime suurima.

### 9. LO1/LO2 aktiveeruvad ainult tingimuslikult
**Põhjendus:** RC1, RM1, RW1, RZ1 (mis kasutavad LO1) rakenduvad ainult plahvatusoht/haigla puhul. RC2, RM2, RW2, RZ2 (LO2) ainult plahvatusoht. Muu kasutaja jaoks need lihtsalt ei kohaldu - oleks segadust tekitav.

### 10. NDJ (naaberehitis)
**Põhjendus:** Lisa A.6 - kui liin ühendab kahte ehitist, lisandub NDJ komponent. Toetatud, kuid kasutaja peab eraldi märgistama.

---

## 🧪 Testimine

`tests/test_validation.js` võtab HTML-failist välja JS-mootori ja arvutab näite F.2 (Maja).

**Oodatud tulemus:** R = 1,793 × 10⁻⁵
**Erinevus standardist:** < 0,01%

Käivitamine: `node tests/test_validation.js`

**Iga muudatuse järel see test tuleb läbi käia.** Kui muudatus mõjutab arvutusi, peab test endiselt töötama.

---

## 💬 Kasutaja stiil ja eelistused

Kasutaja on:
- **Insenerist projekteerija**, mitte arendaja
- Räägib eesti keeles, eelistab eestikeelseid vastuseid
- Hindab **otsekohesust** - "kas peaksime tegema X-i kuidas Y" stiilis küsimusi väärtustab
- Tahab **professionaalseid lahendusi**, ei ole valmis "kiir-ja-must" lähenemise puhul
- Annab head konkreetset tagasisidet (näiteks v1.3 muudatused tulid otse temalt)

**Tooni soovitus:** lugupidav, aga otsekohene; ekspert nõustab eksperdi.

---

## 🚀 Mida teha esmalt Claude Code'is

Soovitatav järjekord:

### 1. Tutvu olukorraga
```bash
ls -la
cat HANDOFF.md          # see fail
```

### 2. Pane Git käima
```bash
git init
git add .
git commit -m "Initial commit: import working v1.3 from claude.ai chat session"
```

### 3. Kontrolli, et test töötab
```bash
node tests/test_validation.js
# Oodatud: ✓ TÄPSED TULEMUSED!
```

### 4. Loo dokumentatsiooni baas (kasutaja juba tellis):

Loo need failid:
- **`README.md`** - mis on, kuidas käivitada, kus on dokumentatsioon
- **`CHANGELOG.md`** - kasuta "Keep a Changelog" formaati, dokumendi v1.0 kuni v1.3 ülal toodud info põhjal
- **`docs/DECISIONS.md`** - kopeeri eelnevast peatükist "Standardi tõlgendus" sisu, vorminda korralikult
- **`docs/arhitektuur.md`** - kirjelda HTML-faili struktuuri (eespool sektsioon "Rakenduse struktuur")
- **`docs/standardiviited.md`** - tabel: kus koodis viitame millisele tabelile/valemile standardist
- **`.gitignore`** - tavalised Node.js + lokaalsed failid

### 5. Lisa koodi JSDoc-kommentaarid
HTML-faili JS-i sisse - eriti `koguArvutus`, `arvutaRiskid`, `hindaKlassid` ja kõikide `arvuta*` funktsioonide kohale.

### 6. Tagasi kasutaja juurde
Pärast neid samme küsi kasutajalt, kas ta tahab:
- (a) GitHub repositooriumi seadistada (kaugkoopia + GitHub Pages avaldamine)
- (b) jätkata järgmiste funktsioonide arendamisega
- (c) midagi muud

---

## ⚠️ Olulised "ärka üles" momendid

1. **HTML-fail on 75 KB / 1716 rida** - kui peaksid kogu faili korraga lugema, siis ole tähelepanelik. Soovitatav: kasuta `view` koos `view_range`-ga osade kaupa.

2. **JS-kood on `<script>...</script>` plokis** HTML-i sees. Editeerimine `str_replace`-iga töötab korralikult, aga muudatuse järel kontrolli süntaksit:
   ```bash
   # eralda JS, kontrolli node-iga
   python3 -c "import re; html=open('piksekaitse.html').read(); m=re.search(r'<script>(.*?)</script>', html, re.DOTALL); open('/tmp/x.js','w').write(m.group(1))"
   node -c /tmp/x.js
   ```

3. **Iga arvutusi puudutava muudatuse järel jooksuta `node tests/test_validation.js`** - kui see katki läheb, on midagi viltu.

4. **Standard on autoriõigustega kaitstud.** Ära kunagi reprodutseeri standardi teksti pikemalt - aga koodikommentaarid valemitele on OK (matemaatika ei ole autoriõigusega kaitstud).

5. **Kasutaja tegi selge valiku jätta välja vigastumise sageduse F arvutus (jaotis 9)**. Praegu on R-arvutused olemas, F mitte. Kui kasutaja seda hiljem küsib, siis on materjal standardis olemas.

6. **Kasutaja ei pea olema arendaja**. Kui annad Git-käske jms, siis seleta lühidalt, mida need teevad.

---

## 📞 Kui midagi ebaselge

Kui see dokument ei vasta mõnele küsimusele, siis kasutaja võib:
- Kontrollida standardit ise (PDF on tema arvutis)
- Vajadusel uuesti läbi rääkida ja ümber teha

Edu töös! 🚀

---

*Selle dokumendi koostas Claude (claude.ai) sessiooni 2026-04-30 lõpus, et anda projekt sujuvalt üle Claude Code keskkonnale.*
