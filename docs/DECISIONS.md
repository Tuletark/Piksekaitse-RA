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

## 11. Mitme tsooni režiim — ühesegmendiline elektriliin

**Otsus:** Mitme tsooni režiimis (vahekaart „Tsoonid”, v1.4+) jagatakse ehitis
eri tsoonideks omade kahjudega ja kohaloleku aegadega, kuid kogu ehitisele
kasutame **ühte elektriliini segmenti** ja **ühte sideliini segmenti**.

**Põhjendus:** Standard lubab modelleerida liini mitme segmendina (nt
F.3 näites: kõrgepinge 1000 m + madalpinge 100 m). Kahesegmendiline mudel
nõuab oluliselt suurema UI-keerukust (segment-segmendi kaupa CI, CT, UW,
kaabli tüüp). Ühesegmendiline mudel katab tüüpilised juhtumid hästi —
suurem segment domineerib niikuinii.

**Mõju:** Standardi näide F.3 valideerimisel jäävad RV ja RU komponendid
~30% standardi väärtustest madalamaks, kogurisk R aga 3–4% madalam. RB ja
RAT komponendid (mis ei sõltu liinist) vastavad standardile täpselt.

**Tähendus kasutajale:** Tüüpiliste büroohoonete jaoks piisav. Kui projektis
on liin tõsiselt mitmesegmendiline (kõrgepingest madalpingele), arvutage
mõlema segmendi NL ja NI käsitsi ja võrrelge eraldi.

---

## Otsused, mida me **ei** teinud

- **Vigastumise sageduse F (jaotis 9) arvutus** — pole praegu rakenduses.
  Materjal on standardis olemas, kui kasutaja seda hiljem küsib.
- **Majandusliku riski R4 arvutus** — keskendume L1 (inimelu kaotus) riskile,
  mis on projekteerija jaoks kõige sagedasem nõue.
- **Mitmesegmendiline liini mudel** (vt §11) — võiks olla tulevane laiendus
  keerukamate büroohoonete jaoks.
- **Haigla tüüp ehitis (F.4 standardis)** — vajab täiendavaid tsoonipõhiseid
  riskikomponente, mis pole praegu rakendatud. Lisame kui vajadus tekib.
