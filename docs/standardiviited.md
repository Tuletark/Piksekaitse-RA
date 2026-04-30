# Standardi viited

Tabel kirjeldab, kus rakenduse koodis on rakendatud iga standardi tabel,
valem või jaotis. Standard: **EVS-EN IEC 62305-2:2025**.

> Reanumbrid kehtivad faili `piksekaitse.html` praeguse versiooni kohta.
> Nad muutuvad redigeerimisel — kasuta neid orientiirina, mitte täpse osutina.

## Lisa A — Haardealad ja sagedused

| Standardi viide   | Mis        | Koodis                                          |
|-------------------|------------|--------------------------------------------------|
| Tabel A.1         | CD, CDJ paiknemistegurid          | `CD_VALIKUD` (rida ~712)            |
| Tabel A.2         | CI liini paigaldustegur           | `CI_VALIKUD` (rida ~798)            |
| Tabel A.3         | CT liini tüübitegur               | `CT_VALIKUD` (rida ~805)            |
| Tabel A.4         | CE keskkonnategur                 | `CE_VALIKUD` (rida ~811)            |
| Valem A.2         | AD = LW + 6H(L+W) + 9πH²          | `arvutaAD(L, W, H)` (rida ~943)     |
| Valem A.8         | rM = 350/UW; AM perimeeter        | `arvutaAM(L, W, UW_kV)` (rida ~948) |
| Valem A.10        | AL = 40 LL                        | `arvutaAL(LL)` (rida ~955)          |
| Valem A.11        | AI = 4000 √(LL/UW)                | `arvutaAI(LL, UW_kV)` (rida ~960)   |
| Lisa A.6 (NDJ)    | Naaberehitis                      | `koguArvutus` ADJ-haru (~rida 1418) |
| Valem (sagedused) | ND = NSG·AD·CD·10⁻⁶               | `arvutaND` (rida ~967)              |
| Valem (sagedused) | NM = NSG·AM·k·10⁻⁶                | `arvutaNM` (rida ~972)              |
| Valem (sagedused) | NL = NSG·AL·CI·CE·CT·10⁻⁶         | `arvutaNL` (rida ~977)              |
| Valem (sagedused) | NI = NSG·AI·CI·CE·CT·k·10⁻⁶       | `arvutaNI` (rida ~982)              |

## Lisa B — Tõenäosused

| Standardi viide  | Mis                              | Koodis                                |
|------------------|----------------------------------|----------------------------------------|
| Tabel B.1        | P<sub>am</sub>                   | `PAM_VALIKUD` (rida ~819)              |
| Tabel B.2        | r<sub>t</sub>                    | `RT_VALIKUD` (rida ~829)               |
| Tabel B.3        | P<sub>LPS</sub>                  | `PLPS_VALIKUD` (rida ~838)             |
| Tabel B.4        | P<sub>S</sub>                    | `PS_VALIKUD` (rida ~849)               |
| Tabel B.5        | r<sub>p</sub>                    | `RP_VALIKUD` (rida ~855)               |
| Tabel B.6        | r<sub>f</sub>                    | `RF_VALIKUD` (rida ~862)               |
| Tabel B.7        | P<sub>SPD</sub>                  | `PSPD_VALIKUD` (rida ~873)             |
| Tabel B.8 / B.9  | KS1, KS2 — vt DECISIONS.md §5    | otsene `KS1`, `KS2` sisend (vaikim. 1)  |
| Tabel B.9        | C<sub>LD</sub>, C<sub>LI</sub>   | `CLD_CLI_VALIKUD` (rida ~884)          |
| Tabel B.10       | KS3                              | `KS3_VALIKUD` (rida ~898)              |
| Tabel B.11/B.12  | P<sub>LD</sub>                   | `arvutaPLD` (rida ~1029) — vt DECISIONS §6 |
| Tabel B.13       | P<sub>EB</sub>                   | `PEB_VALIKUD` (rida ~907)              |
| Valem B.1        | P<sub>AT</sub>                   | `arvutaPAT` (rida ~991)                |
| Valem B.3        | P<sub>AD</sub>                   | `arvutaPAD` (rida ~995)                |
| Valem B.4        | P<sub>B</sub>                    | `arvutaPB` (rida ~999)                 |
| Valem B.5        | P<sub>C</sub>                    | `arvutaPC` (rida ~1003)                |
| Valem B.6        | P<sub>M</sub>                    | `arvutaPM` (rida ~1007)                |
| Valem B.7        | P<sub>U</sub>                    | `arvutaPU` (rida ~1012)                |
| Valem B.8        | P<sub>V</sub>                    | `arvutaPV` (rida ~1016)                |
| Valem B.9        | P<sub>W</sub>                    | `arvutaPW` (rida ~1020)                |
| Valem B.10       | P<sub>Z</sub>                    | `arvutaPZ` (rida ~1024)                |
| Valem (10)       | PC ja PM kombineerimine          | `koguArvutus` rida ~1435, 1439         |

## Lisa C — Kahjud

| Standardi viide | Mis                                | Koodis                          |
|-----------------|------------------------------------|---------------------------------|
| Tabel C.1       | Ehitise kategooriad                | `EHITISE_KATEGOORIA` (rida ~924) |
| Tabel C.2       | LT, LD, LF, LO vahemikud kategooriate kaupa | `LT_VALIKUD`, `LD_VALIKUD`, `LF_VAHEMIKUD`, `LO_VAHEMIKUD` (rida ~737–796) |
| Jaotis pärast Tabel C.2 | Vaikimisi maksimum         | `KAHJU_VAIKEVÄÄRTUSED` + `uuenda_kahju_valikud` (rida ~932, ~1260) |

## Põhitekst — Riskikomponendid

| Standardi viide  | Mis                                | Koodis                          |
|------------------|------------------------------------|----------------------------------|
| Jaotis 7.3       | R<sub>T</sub> = 10⁻⁵               | RT input (lukus, vt DECISIONS §1) |
| Tabel 3, Jaotis 8| RA, RB, RU, RV, RC, RM, RW, RZ     | `arvutaRiskid` (rida ~1061)      |
| Jaotis 8         | R<sub>D</sub> = R<sub>A</sub>+R<sub>B</sub>; R<sub>I</sub> = R<sub>U</sub>+R<sub>V</sub>+R<sub>C</sub>+R<sub>M</sub>+R<sub>W</sub>+R<sub>Z</sub>; R = R<sub>D</sub> + R<sub>I</sub> | `arvutaRiskid` lõpp |
| Jaotis 6.1       | LPS klass I–IV soovitamine         | `hindaKlassid` (rida ~1570)      |

## Lisa F — Näited (valideerimiseks)

| Näide       | Mida testib                  | Test                                  |
|-------------|-------------------------------|---------------------------------------|
| F.2 (Maja)  | Kogu arvutusahel              | `tests/test_validation.js` — oodatud R = 1,793 × 10⁻⁵ |
| F.1 (Büroohoone) | (pole veel testitud)     | —                                     |
| F.3 (Haigla)     | (pole veel testitud)     | —                                     |

## Tähistused

- **R<sub>T</sub>** — vastuvõetav risk (lubatud piirväärtus)
- **N<sub>X</sub>** — sageduskomponendid (D = direct, M = magnetic, L = line, I = induced)
- **P<sub>X</sub>** — kahjustuse tõenäosused
- **L<sub>X</sub>** — kahjustuse maht (kahjud)
- **A<sub>X</sub>** — haardealad
- **R<sub>X</sub>** — riskikomponendid (A, B, C, M, U, V, W, Z)
- **R<sub>D</sub>** — otselöögi riski summa (R<sub>A</sub> + R<sub>B</sub>)
- **R<sub>I</sub>** — kaudse mõju riski summa (kõik ülejäänud)
