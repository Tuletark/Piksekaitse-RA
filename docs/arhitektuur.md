# Rakenduse arhitektuur

`piksekaitse.html` on **iseseisev üks-fail HTML-rakendus**, kus kogu HTML, CSS
ja JavaScript on samas failis. See valik on tehtud teadlikult — vt
[CHANGELOG v1.2](../CHANGELOG.md#12--2026-04-30).

## Faili kõrgtaseme struktuur

```
<!DOCTYPE html>
<html>
  <head>
    <style> ... CSS ... </style>
  </head>
  <body>
    <div class="vasak-paneel"> ... 7 vahekaarti ... </div>
    <div class="parem-paneel"> ... tulemused ... </div>
    <script>
      // KOGU LOOGIKA SIIN
    </script>
  </body>
</html>
```

## CSS

Inline `<style>` blokis. Kasutatud CSS-grid 2-veeru layout, vasakul sisendid,
paremal tulemused. Vahekaardid on tavaline `display: none/block` lülitus.

## JavaScript — sektsioonid

Skript on tükeldatud kommentaarpealkirjadega `// === SEKTSIOON ===`. Sektsioonid
on failis allolevas järjekorras (reanumbreid ei too, sest need muutuvad —
otsi funktsiooni nime järgi).

| Sektsioon                           | Sisu |
|-------------------------------------|------|
| **TABELID**                         | Standardi tabelid A.1–A.4, B.1–B.13, C.1–C.2 — kõik dictionary'd (`CD_VALIKUD`, `CI_VALIKUD`, …, `KAHJU_VAIKEVÄÄRTUSED`). |
| **HAARDEALAD ja SAGEDUSED**         | Lisa A: `arvutaAD`, `arvutaAM`, `arvutaAL`, `arvutaAI`, `arvutaND`, `arvutaNM`, `arvutaNL`, `arvutaNI`. |
| **TÕENÄOSUSED**                     | Lisa B: `arvutaPAT`, `arvutaPAD`, `arvutaPB`, `arvutaPC`, `arvutaPM`, `arvutaPU`, `arvutaPV`, `arvutaPW`, `arvutaPZ`, `arvutaPLD`. |
| **RISKIKOMPONENDID**                | `arvutaRiskid` — jaotis 8, Tabel 3: arvutab RA, RB, RU, RV, RC, RM, RW, RZ ning R1, R2 ja kogurisk R. |
| **Liinilõigud (v1.5)**              | Olek `LISALÕIGUD`; `lisa_lõik`, `eemalda_lõik`, `uuenda_lõik`, `renderLõigud`, `lõigudArvudeks`. |
| **Vahekaardid ja „teadmata”**       | `uuendaVahekaardid` (lukus/aktiivsed vahekaardid, tingimuslikud plokid), `lulita_LL_teadmata`, `TEADMATA_VALIK`, `valik()`, `teadmataLL()`, `uuendaValikuMärk`, `fmtTegur`. |
| **Aruande plokid**                  | `aruandePlokidHTML` → `aruanneKokkuvõte`, `aruanneArvutuskäik`, `aruanneAlgandmed`; `kohalduvadKomponendid`, `fmtRisk`, `kopeeriPlokk`. |
| **UI loogika**                      | `täidaSelect`, `naita_CD_selgitus`, `lulita_RAD`, `lulita_LO`, `laeVaikevalikud`, `uuenda_kahju_valikud`, `kategooriaUuenda`, `laeVaikevaartused`. |
| **Tsoonid (v1.4)**                  | `lulita_tsoonid_režiim`, `lisa_tsoon`, `eemalda_tsoon`, `uuenda_tsoon`, `renderTsoonid`, `laeF3Näide`. |
| **Abifunktsioonid**                 | `getNum`/`getStr`/`getBool`/`getSel`, `fmt`/`fmtSci`/`fmtNumber`. |
| **PEAMINE arvutus**                 | `koostaLiiniLõigud(P, liin)` — liini lõigud (lõik 1 + lisalõigud); `koguArvutus(P, override)` — üks tsoon, kogu arvutusahel, liinikomponendid lõikude kaupa; `arvutaEhitis(shared, tsoonid)` — mitu tsooni, R = Σ R_tsoon; `koguSisendid()` — loeb DOM-ist; `hindaKlassid(P)` — hindab LPS I–IV vajadust. |
| **TULEMUSTE kuvamine**              | `arvuta()` — peamine click-handler; `kuvaTulemused(P, t, klassid)` — ühe tsooni aruanne; `kuvaTulemusedTsoonid(P, tulem)` — tsoonipõhine tabel (sarnane standardi tabelile F.21). |
| **Salvestamine / laadimine / abi**  | `salvestaSisendid`, `laeFailist`, `kuvaAbi`. |
| **KÄIVITAMINE**                     | `DOMContentLoaded`: `laeVaikevaartused`, vahekaartide klikid, NSG automaatarvutus (`uuendaNSG`), RAD- ja LO-lülitid. |

## Andmevoog

```
kasutaja täidab vahekaardid
   │
   ▼
[Arvuta nupp]
   │
   ▼
arvuta()  ←──────────────────── ainus click-handler
   │
   ▼
koguSisendid()  ←─── loeb DOM-ist, tagastab P-objekti
   │
   ├── tsoonirežiim sees? ──► arvutaEhitis(shared, tsoonid)
   │                            └─ iga tsooni jaoks koguArvutus(P_tsoon),
   │                               maskeerib välja lülitatud komponendid,
   │                               summeerib R = Σ R_tsoon
   │                            ▼
   │                          kuvaTulemusedTsoonid(P, tulem)
   ▼
koguArvutus(P)  ←─── orkestreerib:
   │                  AD/AM        →  ND/NM
   │                  iga liinilõik: AL/AI → NL/NI, PLD → PU/PV/PW/PZ
   │                  PAT/PAD/PB/PC/PM
   │                  arvutaRiskid →  RA, RB, RC, RM; RU, RV, RW, RZ = Σ lõigud
   │                  R = Σ
   ▼
hindaKlassid(P)  ←─── proovib LPS I, II, III, IV, et leida vajalik klass
   │
   ▼
kuvaTulemused(P, t, klassid)  ←─── ehitab HTML-aruande
   │
   ▼
parem-paneel (DOM)
```

## Kus on loogika koondunud

- **Standardi tabelid → JS-objektid** (sektsioon TABELID). Kui standardit
  uuendatakse, on need esimesed kohad, kus muudatusi tehakse.
- **Valemite arvutus → `arvuta*` funktsioonid**. Kõik
  valemid on isoleeritud ühte funktsiooni, et neid oleks lihtne testida.
- **Riskikomponentide kogumine → `arvutaRiskid`**. Üks koht,
  kus RA…RZ kogutakse RD ja RI vahesummadeks ja kogu R-iks.
- **UI ↔ andmed → `koguSisendid` / `kuvaTulemused`**. Kogu DOM-iga
  suhtlemine on neis kahes funktsioonis.

## Testitavus

Test [`tests/test_examples.js`](../tests/test_examples.js) eraldab `<script>`
sisu HTML-st, käivitab selle Node.js-is `eval`-iga ja kutsub otse
`koguArvutus(P)` (näide F.2, üks tsoon) ning `arvutaEhitis(shared, tsoonid)`
(näide F.3, viis tsooni).

`document` ja `window` on testis stub'itud, et UI-koodi top-level read ei viskaks
veaks (need ootavad DOM-i, mida Node-is pole).

> **Olulised piirangud:** test ei kontrolli UI-d (vahekaartide vahetus,
> dropdown-de täitmine, expanderite lülitus). UI-poole testimine eeldaks
> peadrauseri (Puppeteer / Playwright) lisamist. Praegune test kontrollib ainult
> arvutusloogikat.

## Süntaksi kontroll

Pärast iga JS-i muutmist (eriti `Edit` tööriistaga) tasub eraldi süntaksi
kontrollida — vt [HANDOFF.md](../HANDOFF.md) jaotis "Olulised ärka üles momendid".
