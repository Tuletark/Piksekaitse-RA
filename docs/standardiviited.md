# Standardi viited

Tabel kirjeldab, kus rakenduse koodis on rakendatud iga standardi tabel,
valem või jaotis. Standard: **EVS-EN IEC 62305-2:2025**.

> Koodiviited on funktsiooni- ja konstandinimed — leia need failist `piksekaitse.html`
> otsinguga (Ctrl+F). Reanumbreid ei kasuta, sest need muutuvad iga redigeerimisega.

## Lisa A — Haardealad ja sagedused

| Standardi viide   | Mis        | Koodis                                          |
|-------------------|------------|--------------------------------------------------|
| Tabel A.1         | CD, CDJ paiknemistegurid          | `CD_VALIKUD`            |
| Tabel A.2         | CI liini paigaldustegur           | `CI_VALIKUD`            |
| Tabel A.3         | CT liini tüübitegur               | `CT_VALIKUD`            |
| Tabel A.4         | CE keskkonnategur                 | `CE_VALIKUD`            |
| Valem A.3         | AD = LW + 2·3H(L+W) + π(3H)²      | `arvutaAD(L, W, H)`     |
| Valem A.8         | AM = 2rM(L+W) + πrM², rM = 350/UW | `arvutaAM(L, W, UW_kV)` |
| Valem A.10        | AL = 40·LL (LL = lõigu pikkus)    | `arvutaAL(LL)`          |
| Valem A.12        | AI = 2·rI·LL, rI = 2000/UW^1,8    | `arvutaAI(LL, UW_kV)`   |
| Valem A.5         | ND = NSG·AD·CD·10⁻⁶               | `arvutaND`              |
| Valem A.6 (jaotis A.2.5) | NDJ = NSG·ADJ·CDJ·CT·10⁻⁶  | `koguArvutus` → `arvutaLõigud` (lõik 1) |
| Valem A.7         | NM = (1/k)·NSG·AM·10⁻⁶            | `arvutaNM`              |
| Valem A.9         | NL = NSG·AL·CI·CE·CT·10⁻⁶         | `arvutaNL` (iga lõigu kohta) |
| Valem A.11        | NI = (1/k)·NSG·AI·CI·CE·CT·10⁻⁶   | `arvutaNI` (iga lõigu kohta) |

## Lisa B — Tõenäosused

| Standardi viide  | Mis                              | Koodis                                |
|------------------|----------------------------------|----------------------------------------|
| Tabel B.1        | P<sub>am</sub>                   | `PAM_VALIKUD`              |
| Tabel B.2        | r<sub>t</sub>                    | `RT_VALIKUD`               |
| Tabel B.3        | P<sub>LPS</sub>                  | `PLPS_VALIKUD`             |
| Tabel B.4        | P<sub>S</sub>                    | `PS_VALIKUD`               |
| Tabel B.5        | r<sub>p</sub>                    | `RP_VALIKUD`               |
| Tabel B.6        | r<sub>f</sub>                    | `RF_VALIKUD`               |
| Tabel B.7        | P<sub>SPD</sub>                  | `PSPD_VALIKUD`             |
| Tabel B.8 / B.9  | KS1, KS2 — vt DECISIONS.md §5    | otsene `KS1`, `KS2` sisend (vaikim. 1)  |
| Tabel B.9        | C<sub>LD</sub>, C<sub>LI</sub>   | `CLD_CLI_VALIKUD`          |
| Tabel B.10       | KS3                              | `KS3_VALIKUD`              |
| Tabel B.11/B.12  | P<sub>LD</sub>                   | `arvutaPLD` — vt DECISIONS §6 |
| Tabel B.13       | P<sub>EB</sub>                   | `PEB_VALIKUD`              |
| Valem B.1        | P<sub>AT</sub>                   | `arvutaPAT`                |
| Valem B.3        | P<sub>AD</sub>                   | `arvutaPAD`                |
| Valem B.4        | P<sub>B</sub>                    | `arvutaPB`                 |
| Valem B.5        | P<sub>C</sub>                    | `arvutaPC`                |
| Valem B.6        | P<sub>M</sub>                    | `arvutaPM`                |
| Valem B.7        | P<sub>U</sub>                    | `arvutaPU`                |
| Valem B.8        | P<sub>V</sub>                    | `arvutaPV`                |
| Valem B.9        | P<sub>W</sub>                    | `arvutaPW`                |
| Valem B.10       | P<sub>Z</sub>                    | `arvutaPZ`                |
| Valem (10)       | PC ja PM kombineerimine          | `koguArvutus` (PC, PM)         |

## Lisa C — Kahjud

| Standardi viide | Mis                                | Koodis                          |
|-----------------|------------------------------------|---------------------------------|
| Tabel C.1       | Ehitise kategooriad                | `EHITISE_KATEGOORIA` |
| Tabel C.2       | LT, LD, LF, LO vahemikud kategooriate kaupa | `LT_VALIKUD`, `LD_VALIKUD`, `LF_VAHEMIKUD`, `LO_VAHEMIKUD` |
| Jaotis pärast Tabel C.2 | Vaikimisi maksimum         | `KAHJU_VAIKEVÄÄRTUSED` + `uuenda_kahju_valikud` |

## Põhitekst — Riskikomponendid

| Standardi viide  | Mis                                | Koodis                          |
|------------------|------------------------------------|----------------------------------|
| Jaotis 7.3       | R<sub>T</sub> = 10⁻⁵               | RT input (lukus, vt DECISIONS §1) |
| Tabel 3, Jaotis 8| RA, RB, RU, RV, RC, RM, RW, RZ     | `arvutaRiskid`      |
| Jaotis 8         | R<sub>D</sub> = R<sub>A</sub>+R<sub>B</sub>; R<sub>I</sub> = R<sub>U</sub>+R<sub>V</sub>+R<sub>C</sub>+R<sub>M</sub>+R<sub>W</sub>+R<sub>Z</sub>; R = R<sub>D</sub> + R<sub>I</sub> | `arvutaRiskid` lõpp |
| Jaotis 6.1       | LPS klass I–IV soovitamine         | `hindaKlassid`      |
| Jaotis 8.2       | RU, RV, RW, RZ = Σ üle liinilõikude | `arvutaRiskid` (`p.lõigud`) |
| Jaotis 8.4       | Liini jaotamine lõikudeks (CI, CT, CE, varjestus) | `koostaLiiniLõigud`, `LISALÕIGUD` (vahekaart 4) |
| Lisa F.3 (tsoonid) | Ehitise jaotamine tsoonideks, R = Σ R<sub>tsoon</sub> | `arvutaEhitis` |

## Lisa F — Näited (valideerimiseks)

| Näide       | Mida testib                  | Test                                  |
|-------------|-------------------------------|---------------------------------------|
| F.2 (Maja)  | Kogu arvutusahel, üks tsoon   | `tests/test_examples.js` — oodatud R = 1,793 × 10⁻⁵ |
| F.3 (Büroohoone) | Mitme tsooni arvutus (`arvutaEhitis`), 5 tsooni, kahelõiguline elektriliin | `tests/test_examples.js` — võrdlus tabelitega F.14 (N lõikude kaupa) ja F.21 (RB, RV, R) |
| Haigla näide     | (pole veel testitud)     | —                                     |


## Tähistused

- **R<sub>T</sub>** — vastuvõetav risk (lubatud piirväärtus)
- **N<sub>X</sub>** — sageduskomponendid (D = direct, M = magnetic, L = line, I = induced)
- **P<sub>X</sub>** — kahjustuse tõenäosused
- **L<sub>X</sub>** — kahjustuse maht (kahjud)
- **A<sub>X</sub>** — haardealad
- **R<sub>X</sub>** — riskikomponendid (A, B, C, M, U, V, W, Z)
- **R<sub>D</sub>** — otselöögi riski summa (R<sub>A</sub> + R<sub>B</sub>)
- **R<sub>I</sub>** — kaudse mõju riski summa (kõik ülejäänud)
