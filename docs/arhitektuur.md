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

## JavaScript — sektsioonid (rea-numbrid lähedased, võivad muutuda)

Skript on tükeldatud kommentaarpealkirjadega `// === SEKTSIOON ===`.

| Rea umbes | Sektsioon                           | Sisu |
|----------:|-------------------------------------|------|
|  705–937  | **TABELID**                         | Standardi tabelid A.1–A.4, B.1–B.13, C.1–C.2 — kõik dictionary'd. |
|  941–984  | **HAARDEALAD ja SAGEDUSED**         | Lisa A: `arvutaAD`, `arvutaAM`, `arvutaAL`, `arvutaAI`, `arvutaND`, `arvutaNM`, `arvutaNL`, `arvutaNI`. |
|  989–1055 | **TÕENÄOSUSED**                     | Lisa B: `arvutaPAT`, `arvutaPAD`, `arvutaPB`, `arvutaPC`, `arvutaPM`, `arvutaPU`, `arvutaPV`, `arvutaPW`, `arvutaPZ`, `arvutaPLD`. |
| 1059–1124 | **RISKIKOMPONENDID**                | `arvutaRiskid` — jaotis 8, Tabel 3: arvutab RA, RB, RU, RV, RC, RM, RW, RZ ning RD, RI ja kogurisk R. |
| 1128–1379 | **UI loogika**                      | `täidaSelect`, `naita_CD_selgitus`, `lulita_RAD`, `lulita_LO`, `laeVaikevalikud`, `uuenda_kahju_valikud`, `kategooriaUuenda`, `laeVaikevaartused`, `getNum`/`getStr`/`getBool`/`getSel`, `fmt`/`fmtSci`. |
| 1383–1592 | **PEAMINE arvutus**                 | `koguArvutus(P, override)` — orkestreerib kogu arvutusahela; `koguSisendid()` — kogub kasutajalt; `hindaKlassid(P)` — hindab LPS I–IV vajadust. |
| 1596–1796 | **TULEMUSTE kuvamine**              | `arvuta()` — peamine click-handler; `kuvaTulemused(P, t, klassid)` — koostab HTML-aruande paremasse paneeli. |
| 1802–1898 | **Salvestamine / laadimine / abi** | `salvestaSisendid`, `laeFailist`, `kuvaAbi`. |
| 1901+    | **Initsialiseerimine**              | `DOMContentLoaded` käivitab `laeVaikevalikud` ja `laeVaikevaartused`. |

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
   ▼
koguArvutus(P)  ←─── orkestreerib:
   │                  AD/AM/AL/AI  →  ND/NM/NL/NI
   │                  PLD          →  PAT/PAD/PB/PC/PM/PU/PV/PW/PZ
   │                  arvutaRiskid →  RA, RB, RU, RV, RC, RM, RW, RZ
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

- **Standardi tabelid → JS-objektid** (rida ~705–937). Kui standardit
  uuendatakse, on need esimesed kohad, kus muudatusi tehakse.
- **Valemite arvutus → `arvuta*` funktsioonid** (rida ~941–1055). Kõik
  valemid on isoleeritud ühte funktsiooni, et neid oleks lihtne testida.
- **Riskikomponentide kogumine → `arvutaRiskid`** (rida ~1061). Üks koht,
  kus RA…RZ kogutakse RD ja RI vahesummadeks ja kogu R-iks.
- **UI ↔ andmed → `koguSisendid` / `kuvaTulemused`**. Kogu DOM-iga
  suhtlemine on neis kahes funktsioonis.

## Testitavus

Test [`tests/test_validation.js`](../tests/test_validation.js) eraldab `<script>`
sisu HTML-st, käivitab selle Node.js-is `eval`-iga ja kutsub
`koguArvutus(P)` otse standardi näite F.2 sisenditega.

`document` ja `window` on testis stub'itud, et UI-koodi top-level read ei viskaks
veaks (need ootavad DOM-i, mida Node-is pole).

> **Olulised piirangud:** test ei kontrolli UI-d (vahekaartide vahetus,
> dropdown-de täitmine, expanderite lülitus). UI-poole testimine eeldaks
> peadrauseri (Puppeteer / Playwright) lisamist. Praegune test kontrollib ainult
> arvutusloogikat.

## Süntaksi kontroll

Pärast iga JS-i muutmist (eriti `Edit` tööriistaga) tasub eraldi süntaksi
kontrollida — vt [HANDOFF.md](../HANDOFF.md) jaotis "Olulised ärka üles momendid".
