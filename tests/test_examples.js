// Valideerimistestide kogum — kontrollib, et meie rakenduse arvutusmootor
// annab standardi näidetes (Lisa F) samad tulemused kui standard ise.
//
// Käivitamine: node tests/test_examples.js  (projekti juurkaustast)
//
// Standard: EVS-EN IEC 62305-2:2025

const fs = require('fs');
const path = require('path');

// ===== Laadi rakenduse JS HTML-st =====================================

const HTML_PATH = path.join(__dirname, '..', 'piksekaitse.html');
const html = fs.readFileSync(HTML_PATH, 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) {
  console.error('Ei leidnud <script> blokki failist', HTML_PATH);
  process.exit(1);
}
const js = m[1];

// Stub document/window, et top-level kood ei viskaks veaks
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => ({ appendChild: () => {} }),
};
global.window = {};

// Tabelikonstandid (const) jäävad eval-i skoopi — tõstame need testide jaoks välja
eval(js + ';globalThis.TABELID = { CD_VALIKUD, CI_VALIKUD, CT_VALIKUD, CE_VALIKUD, PAM_VALIKUD, RT_VALIKUD, PLPS_VALIKUD, PS_VALIKUD, RP_VALIKUD, RF_VALIKUD, PSPD_VALIKUD, PEB_VALIKUD, CLD_CLI_VALIKUD, KS3_VALIKUD, LF_VAHEMIKUD, LO_VAHEMIKUD };');  // toob namespace'i: koguArvutus, arvutaEhitis, arvutaRiskid, ...

// ===== Testharness =====================================================

const RESULTS = [];

function lähedalT(actual, expected, tolerancePct = 1.0) {
  if (expected === 0) return Math.abs(actual) < 1e-8;
  return Math.abs(actual - expected) / Math.abs(expected) * 100 <= tolerancePct;
}

function fmtR(x) {
  return (x / 1e-5).toFixed(3) + ' × 10⁻⁵';
}

function kontrolliArv(label, actual, expected, tolerancePct = 1.0) {
  const ok = lähedalT(actual, expected, tolerancePct);
  RESULTS.push({ label, actual, expected, ok, tolerancePct });
  const diff = (Math.abs(actual - expected) / Math.abs(expected) * 100).toFixed(2);
  console.log(`  ${ok ? '✓' : '✗'} ${label}: ${actual.toExponential(3)}  (erinevus ${diff} %)`);
}

/**
 * Standardi tabelites on väärtused × 10⁻⁵ kolme komakohaga. Väikeste väärtuste
 * (≤ 0,1) puhul on ümardusviga protsentides suur — siis kontrollitakse, et
 * meie väärtus ümardub standardi omaks (erinevus ≤ pool viimasest kohast).
 */
function kontrolliTabel(label, actual, oodatud_e5) {
  if (oodatud_e5 >= 0.1) return kontrolli(label, actual, oodatud_e5 * 1e-5, 1.0);
  const ok = Math.abs(actual / 1e-5 - oodatud_e5) <= 0.0005 + 1e-12;
  RESULTS.push({ label, actual, expected: oodatud_e5 * 1e-5, ok });
  console.log(`  ${ok ? '✓' : '✗'} ${label}: ${(actual / 1e-5).toFixed(4)} × 10⁻⁵  (standard: ${oodatud_e5.toFixed(3)}, ümardatult)`);
}

function kontrolli(label, actual, expected, tolerancePct = 1.0) {
  const ok = lähedalT(actual, expected, tolerancePct);
  RESULTS.push({ label, actual, expected, ok, tolerancePct });
  const mark = ok ? '✓' : '✗';
  const diff = expected !== 0
    ? `(erinevus ${(Math.abs(actual - expected) / Math.abs(expected) * 100).toFixed(2)} %)`
    : '';
  console.log(`  ${mark} ${label}: ${fmtR(actual)}  (oodatud: ${fmtR(expected)})  ${diff}`);
}

// ===== F.2 Maja (üks tsoon) ============================================
//
// Standardi näide F.2: tüüpiline eluhoone, üks tsoon.
// Oodatud tulemus: R = 1,793 × 10⁻⁵ (kogurisk).

function testF2_Maja() {
  console.log('\n===== F.2 Maja (üks tsoon) =====');

  const P = {
    NSG: 8.0, k_tegur: 2, RT: 1e-5,
    tZ: 4380, te: 8760,
    PP: 4380 / 8760, Pe: 1.0,
    L: 15, W: 20, H: 6, CD: 1.0,
    PS: 1.0, KS1: 1.0, KS2: 1.0,
    kasuta_RAD: false, PO: 0,
    plahvatus_haigla_L1: false, plahvatus_L2: false,
    CE: 1.0, rt: 1e-5, Pam: 1.0,
    rf: 1e-3, rp: 1.0,
    KS3_P: 0.2, KS3_T: 1.0,
    PTWS: 1.0,
    kasuta_elektriliin: true,
    LL_P: 1000, CIP: 1.0, CTP: 1.0, UWP: 2.5,
    kaabli_tüüp_P: 'kaitsmata',
    CLD_P: 1.0, CLI_P: 1.0,
    kasuta_sideliin: true,
    LL_T: 800, CIT: 1.0, CTT: 1.0, UWT: 1.5,
    kaabli_tüüp_T: 'kaitsmata',
    CLD_T: 1.0, CLI_T: 1.0,
    kasuta_naaber: false,
    L_J: 0, W_J: 0, H_J: 0, CDJ: 1.0,
    LT: 1e-2, LD: 1e-1,
    LF1: 2e-2, LF2: 2e-2, LO1: 0, LO2: 0,
    PLPS: 1.0, PSPD_P: 1.0, PSPD_T: 1.0,
    PEB_P: 1.0, PEB_T: 1.0,
  };

  const t = koguArvutus(P);
  // Tabel F.8 (kaitsmata ehitis)
  kontrolli('RB', t.R.RB, 0.062e-5, 1.0);
  kontrolli('RU', t.R.RU, 0.003e-5, 5.0);
  kontrolli('RV', t.R.RV, 1.728e-5, 1.0);
  kontrolli('R (kogurisk)', t.R.R, 1.793e-5, 1.0);

  // Tabel F.9 (kaitstud ehitis): LPL IV SPD-d mõlema liini sisenemiskohas,
  // P_EB = 0,05 (jaotis F.2.6)
  console.log('  — kaitstud (tabel F.9): P_EB = 0,05 mõlemal liinil');
  const k = koguArvutus({ ...P, PEB_P: 0.05, PEB_T: 0.05 });
  kontrolli('RB', k.R.RB, 0.062e-5, 1.0);
  kontrolli('RV', k.R.RV, 0.086e-5, 1.0);
  kontrolli('R (kogurisk)', k.R.R, 0.149e-5, 1.0);
}

// Näite F.3 sisendid (tabelid F.10–F.20) — kasutavad nii kaitsmata (F.21)
// kui ka kaitstud (F.23) ehitise testid.
function f3Andmed() {
  // Ehitise üldparameetrid (Tabel F.10) — jagatud kõikide tsoonide vahel
  const shared = {
    NSG: 4.0, k_tegur: 2, RT: 1e-5,
    L: 20, W: 40, H: 25, CD: 1.0,
    PS: 0.5,           // Raudbetoon
    KS1: 1.0,
    CE: 0.5,           // Äärelinnaline
    PLPS: 1.0,         // Kaitsmata
    PTWS: 1.0,
    // Elektriliin (tabel F.11): lõik 1 = LV 100 m, lisalõik = HV 1000 m
    kasuta_elektriliin: true,
    LL_P: 100, CIP: 0.3, CTP: 1.0, UWP: 2.5,
    lisalõigud_P: [
      { LL: 1000, CI: 0.3, CT: 0.2, CE: 0.5, kaabli_tüüp: 'kaitsmata' },
    ],
    kaabli_tüüp_P: 'kaitsmata',
    CLD_P: 1.0, CLI_P: 1.0,
    kasuta_sideliin: false,           // Fiiberoptiline kaabel — väline liin ei mõjuta
    LL_T: 0, CIT: 1.0, CTT: 1.0, UWT: 1.5,
    kaabli_tüüp_T: 'kaitsmata',
    CLD_T: 1.0, CLI_T: 1.0,
    kasuta_naaber: false,
    L_J: 0, W_J: 0, H_J: 0, CDJ: 1.0,
    PEB_P: 1.0, PEB_T: 1.0,
  };

  // Per-tsooni parameetrid (Tabelid F.16–F.20)
  const tsoonid = [
    {
      nimi: 'Z1 — hoonevälise sissepääsuala',
      tZ: 175, te: 8760,
      rt: 1e-3, Pam: 1.0, PO: 0,
      rf: 0, rp: 1.0,
      KS2: 1.0, KS3_P: 1.0, KS3_T: 1.0,
      PSPD_P: 1.0, PSPD_T: 1.0,
      LT: 1e-2, LD: 0, LF1: 0, LF2: 0, LO1: 0, LO2: 0,
      kasuta_RAD: false, kasuta_RAT: true,
      kasuta_RB: false, kasuta_RC: false, kasuta_RM: false,
      kasuta_RU: false, kasuta_RV: false, kasuta_RW: false, kasuta_RZ: false,
    },
    {
      nimi: 'Z2 — katus (hooldusbrigaad)',
      tZ: 18, te: 8760,
      rt: 1e-5, Pam: 1.0, PO: 1.0,
      rf: 0, rp: 1.0,
      KS2: 1.0, KS3_P: 1.0, KS3_T: 1.0,
      PSPD_P: 1.0, PSPD_T: 1.0,
      LT: 1e-2, LD: 1e-1, LF1: 0, LF2: 0, LO1: 0, LO2: 0,
      kasuta_RAT: false, kasuta_RAD: true,
      kasuta_RB: false, kasuta_RC: false, kasuta_RM: false,
      kasuta_RU: false, kasuta_RV: false, kasuta_RW: false, kasuta_RZ: false,
    },
    {
      nimi: 'Z3 — arhiiv',
      tZ: 440, te: 8760,
      rt: 1e-5, Pam: 1.0, PO: 0,
      rf: 1e-1, rp: 0.2,                // Kõrge tuleoht, automaatne alarmseade
      KS2: 1.0, KS3_P: 0.2, KS3_T: 1.0,
      PSPD_P: 1.0, PSPD_T: 1.0,
      LT: 1e-2, LD: 0, LF1: 5e-2, LF2: 5e-2, LO1: 0, LO2: 0,
      kasuta_RAT: true, kasuta_RAD: false,
      kasuta_RB: true, kasuta_RV: true,
      kasuta_RC: false, kasuta_RM: false, kasuta_RU: false, kasuta_RW: false, kasuta_RZ: false,
    },
    {
      nimi: 'Z4 — kontorid',
      tZ: 2630, te: 8760,
      rt: 1e-5, Pam: 1.0, PO: 0,
      rf: 1e-3, rp: 0.5,                // Madal tuleoht, tulekustutid
      KS2: 1.0, KS3_P: 0.2, KS3_T: 1.0,
      PSPD_P: 1.0, PSPD_T: 1.0,
      LT: 1e-2, LD: 0, LF1: 5e-2, LF2: 5e-2, LO1: 0, LO2: 0,
      kasuta_RAT: true, kasuta_RAD: false,
      kasuta_RB: true, kasuta_RV: true,
      kasuta_RC: false, kasuta_RM: false, kasuta_RU: false, kasuta_RW: false, kasuta_RZ: false,
    },
    {
      nimi: 'Z5 — arvutuskeskus',
      tZ: 2200, te: 8760,
      rt: 1e-5, Pam: 1.0, PO: 0,
      rf: 1e-3, rp: 0.2,                // Madal tuleoht, automaatne alarmseade
      KS2: 1.0, KS3_P: 0.2, KS3_T: 1.0,
      PSPD_P: 1.0, PSPD_T: 1.0,
      LT: 1e-2, LD: 0, LF1: 1e-1, LF2: 1e-1, LO1: 0, LO2: 0,
      kasuta_RAT: true, kasuta_RAD: false,
      kasuta_RB: true, kasuta_RV: true,
      kasuta_RC: false, kasuta_RM: false, kasuta_RU: false, kasuta_RW: false, kasuta_RZ: false,
    },
  ];

  return { shared, tsoonid };
}

// ===== F.3 Büroohoone (5 tsooni) =======================================
//
// Standardi näide F.3: 5 tsooniga büroohoone (sissepääsuala, katus, arhiiv,
// kontorid, arvutuskeskus). Iga tsoonil oma kohaloleku aeg, tuleoht ja kahjud.
//
// Elektriliin on kahelõiguline (tabel F.11, jaotis 8.4): lõik 1 = madalpinge
// 100 m (ehitise poolne), lisalõik = kõrgepinge 1000 m. RU, RV summeeritakse
// lõikude kaupa (jaotis 8.2).

function testF3_Büroohoone() {
  console.log('\n===== F.3 Büroohoone (5 tsooni, kaitsmata ehitis) =====');

  const { shared, tsoonid } = f3Andmed();

  const tulem = arvutaEhitis(shared, tsoonid);

  // Tabel F.14: sagedused lõikude kaupa (NLP1 = HV, NLP2 = LV) ja kokku
  const t3 = tulem.tsoonid[2].t;
  kontrolliArv('NL,P HV-lõik (F.14: 4,8 × 10⁻³)', t3.lõigud_P[1].NL, 4.8e-3, 1.0);
  kontrolliArv('NL,P LV-lõik (F.14: 2,4 × 10⁻³)', t3.lõigud_P[0].NL, 2.4e-3, 1.0);
  kontrolliArv('NI,P HV-lõik (F.14: 4,61 × 10⁻²)', t3.lõigud_P[1].NI, 4.61e-2, 1.0);
  kontrolliArv('NI,P LV-lõik (F.14: 2,31 × 10⁻²)', t3.lõigud_P[0].NI, 2.31e-2, 1.0);

  // Standardi tabel F.21 (kaitsmata ehitis, väärtused × 10⁻⁵)
  const oodatud = {
    Z1: { R: 0.002e-5 },
    Z2: { R: 2.259e-5 },
    Z3: { R: 6.526e-5, RB: 5.770e-5, RV: 0.756e-5 },
    Z4: { R: 0.202e-5, RB: 0.179e-5, RV: 0.023e-5 },
    Z5: { R: 0.156e-5, RB: 0.137e-5, RV: 0.018e-5 },
  };

  // Z1 standardis ümardatud 0,002 (üks tüvenumber), arvutus annab 0,0022 —
  // absoluutselt tühine erinevus, aga protsentuaalselt 10 %.
  // Z4/Z5 RV on standardis kolme komakohaga (0,023; 0,018) — ümardusviga
  // kuni ~3 %, seepärast 3 % tolerants.
  kontrolli('Z1 R',     tulem.tsoonid[0].R.R,  oodatud.Z1.R, 15.0);
  kontrolli('Z2 R',     tulem.tsoonid[1].R.R,  oodatud.Z2.R, 1.0);
  kontrolli('Z3 RB',    tulem.tsoonid[2].R.RB, oodatud.Z3.RB, 1.0);
  kontrolli('Z3 RV',    tulem.tsoonid[2].R.RV, oodatud.Z3.RV, 1.0);
  kontrolli('Z3 R',     tulem.tsoonid[2].R.R,  oodatud.Z3.R, 1.0);
  kontrolli('Z4 RB',    tulem.tsoonid[3].R.RB, oodatud.Z4.RB, 1.0);
  kontrolli('Z4 RV',    tulem.tsoonid[3].R.RV, oodatud.Z4.RV, 3.0);
  kontrolli('Z4 R',     tulem.tsoonid[3].R.R,  oodatud.Z4.R, 1.0);
  kontrolli('Z5 RB',    tulem.tsoonid[4].R.RB, oodatud.Z5.RB, 1.0);
  kontrolli('Z5 RV',    tulem.tsoonid[4].R.RV, oodatud.Z5.RV, 3.0);
  kontrolli('Z5 R',     tulem.tsoonid[4].R.R,  oodatud.Z5.R, 1.0);
}

// ===== F.3 Büroohoone — kaitstud ehitis (tabel F.23) ===================
//
// Jaotis F.3.7: LPS klass II (P_LPS = 0,05, tabel B.3) ja SPD-d elektriliini
// sisenemiskohas (P_EB = 0,02, tabel B.13). Tabeli B.4 MÄRKUS 1: LPS-i korral
// P_S = 1 — seega R_B väheneb 10 korda (0,5 → 1 × 0,05), mitte 20 korda.

function testF3_Kaitstud() {
  console.log('\n===== F.3 Büroohoone — kaitstud ehitis (tabel F.23) =====');
  const { shared, tsoonid } = f3Andmed();
  const tulem = arvutaEhitis({ ...shared, PLPS: 0.05, PEB_P: 0.02 }, tsoonid);
  const z = i => tulem.tsoonid[i].R;
  // Standardi tabel F.23 (väärtused × 10⁻⁵); väikesed väärtused kolme
  // komakohaga → ümardusviga, seepärast 3 % tolerants
  kontrolli('Z2 RAD', z(1).RAD, 0.113e-5, 1.0);
  kontrolli('Z2 R',   z(1).R,   0.113e-5, 1.0);
  kontrolli('Z3 RB',  z(2).RB,  0.577e-5, 1.0);
  kontrolli('Z3 RV',  z(2).RV,  0.015e-5, 3.0);
  kontrolli('Z3 R',   z(2).R,   0.592e-5, 1.0);
  kontrolli('Z4 RB',  z(3).RB,  0.018e-5, 3.0);
  kontrolli('Z4 R',   z(3).R,   0.018e-5, 3.0);
  kontrolli('Z5 RB',  z(4).RB,  0.014e-5, 3.0);
  kontrolli('Z5 R',   z(4).R,   0.014e-5, 3.0);
}

// ===== F.4 Haigla (5 tsooni, R_C, R_M, R_W, R_Z) =======================
//
// Tabelid F.25–F.34. Elektriliin LV 50 m + HV 1000 m (tabel F.26), sideliin
// fiiberoptiline (ei arvestata). Z3–Z5 sisesüsteemid (L_O1), plahvatusohtu pole
// (L_O2 = 0). Tulemused: tabel F.35 (kaitsmata) ja F.37 (kaitstud).

function f4Andmed() {
  const shared = {
    NSG: 8.0, k_tegur: 2, RT: 1e-5,
    L: 50, W: 150, H: 10, CD: 1.0, PS: 0.5, KS1: 1.0,
    CE: 0.5, PLPS: 1.0, PTWS: 1.0,
    kasuta_elektriliin: true,
    LL_P: 50, CIP: 0.3, CTP: 1.0, UWP: 2.5,
    lisalõigud_P: [{ LL: 1000, CI: 0.3, CT: 0.2, CE: 0.5, kaabli_tüüp: 'kaitsmata' }],
    kaabli_tüüp_P: 'kaitsmata', CLD_P: 1.0, CLI_P: 1.0,
    kasuta_sideliin: false, kasuta_naaber: false,
    PEB_P: 1.0, PEB_T: 1.0,
  };
  const kõik = { kasuta_RAT: true, kasuta_RAD: false, kasuta_RB: true, kasuta_RC: true,
    kasuta_RM: true, kasuta_RU: true, kasuta_RV: true, kasuta_RW: true, kasuta_RZ: true };
  const ainult = (...k) => Object.fromEntries(
    ['RAT', 'RAD', 'RB', 'RC', 'RM', 'RU', 'RV', 'RW', 'RZ'].map(x => ['kasuta_' + x, k.includes(x)]));
  const sise = {
    te: 8760, Pam: 1.0, PO: 0, rt: 1e-5, rp: 0.2, KS2: 1.0, KS3_T: 1.0,
    PSPD_P: 1.0, PSPD_T: 1.0, LT: 1e-2, LD: 0, LO2: 0, ...kõik,
  };
  const tsoonid = [
    { nimi: 'Z1 — sissepääsuala', tZ: 175, te: 8760, rt: 1e-2, Pam: 1.0, PO: 0, rf: 0, rp: 1.0,
      KS2: 1, KS3_P: 1, KS3_T: 1, PSPD_P: 1, PSPD_T: 1,
      LT: 1e-2, LD: 0, LF1: 0, LF2: 0, LO1: 0, LO2: 0, ...ainult('RAT') },
    { nimi: 'Z2 — katus', tZ: 90, te: 8760, rt: 1e-5, Pam: 1.0, PO: 1.0, rf: 0, rp: 1.0,
      KS2: 1, KS3_P: 1, KS3_T: 1, PSPD_P: 1, PSPD_T: 1,
      LT: 1e-2, LD: 1e-1, LF1: 0, LF2: 0, LO1: 0, LO2: 0, ...ainult('RAT', 'RAD') },
    { nimi: 'Z3 — palatiplokk', ...sise, tZ: 8760, rf: 1e-2, KS3_P: 0.2, LF1: 1e-1, LF2: 1e-1, LO1: 1e-3 },
    { nimi: 'Z4 — operatsiooniplokk', ...sise, tZ: 3100, rf: 1e-3, KS3_P: 0.01, LF1: 2e-1, LF2: 2e-1, LO1: 1e-2 },
    { nimi: 'Z5 — intensiivraviüksus', ...sise, tZ: 8760, rf: 1e-3, KS3_P: 0.01, LF1: 2e-1, LF2: 2e-1, LO1: 1e-2 },
  ];
  return { shared, tsoonid };
}

function testF4_Haigla() {
  console.log('\n===== F.4 Haigla (5 tsooni, kaitsmata — tabel F.35) =====');
  const { shared, tsoonid } = f4Andmed();
  const tulem = arvutaEhitis(shared, tsoonid);
  const z = i => tulem.tsoonid[i].R;
  const t3 = tulem.tsoonid[2].t;
  // Tabel F.28
  kontrolliArv('NM (F.28: 4,70 × 10⁻¹)', t3.NM, 0.470, 1.0);
  kontrolliArv('NL,P Σ (F.28: 1,2 × 10⁻²)', t3.NL_P, 1.2e-2, 1.0);
  kontrolliArv('NI,P Σ (F.28: 1,15 × 10⁻¹)', t3.NI_P, 0.115, 1.0);
  // Tabel F.35 (× 10⁻⁵)
  const oodatud = [
    [0, 'RAT', 0.036], [1, 'RAD', 18.357], [1, 'R', 18.357],
    [2, 'RB', 3.572], [2, 'RC', 17.862], [2, 'RM', 1.881], [2, 'RV', 0.480],
    [2, 'RW', 1.200], [2, 'RZ', 11.531], [2, 'R', 36.528],
    [3, 'RB', 0.484], [3, 'RC', 63.213], [3, 'RM', 0.017], [3, 'RV', 0.065],
    [3, 'RW', 4.247], [3, 'RZ', 40.807], [3, 'R', 108.834],
    [4, 'RB', 0.714], [4, 'RC', 178.619], [4, 'RM', 0.047], [4, 'RV', 0.096],
    [4, 'RW', 12.000], [4, 'RZ', 115.308], [4, 'R', 306.787],
  ];
  for (const [i, k, v] of oodatud) {
    kontrolliTabel(`Z${i + 1} ${k}`, z(i)[k], v);
  }

  // Tabel F.37 — kaitstud: LPS II (P_LPS = 0,05 → P_S = 1), P_EB = 0,02,
  // Z2 hoiatustähis (P_am = 0,1), koordineeritud SPD: Z3 P_SPD = 0,01, Z4/Z5 0,002
  console.log('  — kaitstud (tabel F.37)');
  const kaitstud = f4Andmed();
  kaitstud.tsoonid[1].Pam = 0.1;
  kaitstud.tsoonid[2].PSPD_P = 0.01;
  kaitstud.tsoonid[3].PSPD_P = 0.002;
  kaitstud.tsoonid[4].PSPD_P = 0.002;
  const k = arvutaEhitis({ ...kaitstud.shared, PLPS: 0.05, PEB_P: 0.02 }, kaitstud.tsoonid);
  const kz = i => k.tsoonid[i].R;
  const oodatudK = [
    [1, 'RAD', 0.092], [2, 'RB', 0.357], [2, 'RC', 0.179], [2, 'RM', 0.019],
    [2, 'RV', 0.010], [2, 'RW', 0.012], [2, 'RZ', 0.115], [2, 'R', 0.692],
    [3, 'RB', 0.048], [3, 'RC', 0.126], [3, 'RW', 0.008], [3, 'RZ', 0.082], [3, 'R', 0.266],
    [4, 'RB', 0.071], [4, 'RC', 0.357], [4, 'RW', 0.024], [4, 'RZ', 0.231], [4, 'R', 0.685],
  ];
  for (const [i, kk, v] of oodatudK) {
    kontrolliTabel(`Z${i + 1} ${kk}`, kz(i)[kk], v);
  }
}

// ===== Liinilõigud: sisemine kooskõla ==================================
//
// Liini jagamine samade omadustega lõikudeks ei tohi tulemust muuta:
// 1000 m ühe lõiguna == 400 m + 600 m kahe lõiguna.

function testLõigudKooskõla() {
  console.log('\n===== Liinilõigud: 1 × 1000 m == 400 m + 600 m =====');
  const baas = {
    NSG: 8.0, k_tegur: 2, RT: 1e-5, PP: 0.5, Pe: 1.0,
    L: 15, W: 20, H: 6, CD: 1.0, PS: 1.0, KS1: 1.0, KS2: 1.0,
    kasuta_RAD: false, PO: 0, plahvatus_haigla_L1: true, plahvatus_L2: true,
    CE: 1.0, rt: 1e-5, Pam: 1.0, rf: 1e-3, rp: 1.0,
    KS3_P: 0.2, KS3_T: 1.0, PTWS: 1.0,
    kasuta_elektriliin: true, LL_P: 1000, CIP: 1.0, CTP: 1.0, UWP: 2.5,
    kaabli_tüüp_P: 'kaitsmata', CLD_P: 1.0, CLI_P: 1.0,
    kasuta_sideliin: false, kasuta_naaber: false,
    LT: 1e-2, LD: 1e-1, LF1: 2e-2, LF2: 2e-2, LO1: 1e-3, LO2: 1e-3,
    PLPS: 1.0, PSPD_P: 1.0, PSPD_T: 1.0, PEB_P: 1.0, PEB_T: 1.0,
  };
  const üks = koguArvutus(baas);
  const kaks = koguArvutus({
    ...baas, LL_P: 400,
    lisalõigud_P: [{ LL: 600, CI: 1.0, CT: 1.0, CE: 1.0, kaabli_tüüp: 'kaitsmata' }],
  });
  for (const k of ['RU', 'RV', 'RW', 'RZ', 'R']) {
    kontrolli(k, kaks.R[k], üks.R[k], 0.001);
  }
}

// ===== Praktiline näide: ärihoone (sõltumatu Exceli arvutus) ===========
//
// Ärihoone 24,2 × 18,2 × 7,1 m, NG = 0,62, MP-maakaabel 40 m, sideliin
// fiiberoptiline. Võrdlus kasutaja varasema Exceli kalkulaatoriga:
// RAT, RB1, RB2 ja NL (lehelt „Ru”, kus NL on arvutatud õigesti AL-iga).
// Lisaks otsustuskriteerium: R = R_L1 + R_L2 (jaotis 7.3, valem 6), mitte R1.

function testÄrihoone() {
  console.log('\n===== Praktiline näide: ärihoone (võrdlus Exceliga) =====');
  const P = {
    NSG: 1.24, k_tegur: 2, RT: 1e-5, PP: 0.3, Pe: 1.0,
    L: 24.2, W: 18.2, H: 7.1, CD: 1.0, PS: 0.5, KS1: 1.0, KS2: 1.0,
    kasuta_RAD: false, PO: 0, plahvatus_haigla_L1: false, plahvatus_L2: false,
    CE: 0.5, rt: 0.01, Pam: 0.01, rf: 0.01, rp: 0.2,
    KS3_P: 1.0, KS3_T: 1.0, PTWS: 1.0,
    kasuta_elektriliin: true, LL_P: 40, CIP: 0.3, CTP: 1.0, UWP: 2.5,
    kaabli_tüüp_P: 'kaitsmata', CLD_P: 1.0, CLI_P: 0.0,
    kasuta_sideliin: false, kasuta_naaber: false,
    LT: 0.01, LD: 0.1, LF1: 0.05, LF2: 0.05, LO1: 0, LO2: 0,
    PLPS: 1.0, PSPD_P: 1.0, PSPD_T: 1.0, PEB_P: 1.0, PEB_T: 1.0,
  };
  const t = koguArvutus(P);
  // Excel kasutab π asemel 3,14 → AD erinevus ~0,02 %
  kontrolliArv('NL (Excel „Ru”: 2,976 × 10⁻⁴)', t.NL_P, 2.976e-4, 0.1);
  kontrolli('RAT (Excel)', t.R.RAT, 1.3657e-9, 0.1);
  kontrolli('RB1 (Excel)', t.R.RB1, 6.8286e-8, 0.1);
  kontrolli('RB2 (Excel)', t.R.RB2, 2.2762e-7, 0.1);

  // Otsustuskriteerium: juhtum, kus R1 < RT < R (RB2 domineerib, sest L2
  // komponentides pole PP-d). Tõstame tuleohtu, et R ületaks RT.
  const P2 = { ...P, rf: 0.1, rp: 1.0, PP: 0.05, NSG: 8.0 };
  const t2 = koguArvutus(P2);
  const klass0 = hindaKlassid(P2)[0];
  const ok = t2.R.R1 < P2.RT && t2.R.R > P2.RT && klass0.vastab === false;
  RESULTS.push({ label: 'kriteerium', ok });
  console.log(`  ${ok ? '✓' : '✗'} Kriteerium R = R_L1 + R_L2: R1 = ${fmtR(t2.R.R1)} < RT < R = ${fmtR(t2.R.R)} → piksekaitse vajalik`);
}

// ===== Tabelid: väärtused vs standard (lisad A, B, C) ==================
//
// Kontrollib, et rippmenüüde väärtuste hulgad vastavad standardi tabelitele
// (EVS-EN IEC 62305-2:2025). Võtmed (tekstid) võivad muutuda, väärtused mitte.

function testTabelid() {
  console.log('\n===== Tabelid: väärtused vs standard =====');
  const T = globalThis.TABELID;
  const hulk = o => Object.values(o).map(v => JSON.stringify(v)).sort().join(' ');
  const kontrolliHulk = (nimi, obj, oodatud) => {
    const ok = hulk(obj) === oodatud.map(v => JSON.stringify(v)).sort().join(' ');
    RESULTS.push({ label: nimi, ok });
    console.log(`  ${ok ? '✓' : '✗'} ${nimi}${ok ? '' : ': ' + hulk(obj)}`);
  };
  kontrolliHulk('Tabel A.1 C_D', T.CD_VALIKUD, [0.25, 0.5, 1, 2]);
  kontrolliHulk('Tabel A.2 C_I', T.CI_VALIKUD, [1, 0.3, 0.01]);
  kontrolliHulk('Tabel A.3 C_T', T.CT_VALIKUD, [1, 0.2]);
  kontrolliHulk('Tabel A.4 C_E', T.CE_VALIKUD, [1, 0.5, 0.1, 0.01]);
  kontrolliHulk('Tabel B.1 P_am', T.PAM_VALIKUD, [1, 0.1, 0.01, 0.01, 0.001, 0]);
  kontrolliHulk('Tabel B.2 r_t', T.RT_VALIKUD, [1e-2, 1e-3, 1e-4, 1e-5, 0]);
  kontrolliHulk('Tabel B.3 P_LPS', T.PLPS_VALIKUD, [1, 0.2, 0.1, 0.05, 0.02, 0.01, 0.001]);
  kontrolliHulk('Tabel B.4 P_S', T.PS_VALIKUD, [1, 0.5]);
  kontrolliHulk('Tabel B.5 r_p', T.RP_VALIKUD, [1, 0.5, 0.2]);
  kontrolliHulk('Tabel B.6 r_f', T.RF_VALIKUD, [1, 0.1, 1e-3, 0.1, 1e-2, 1e-3, 0]);
  kontrolliHulk('Tabelid B.7/B.8 P_SPD', T.PSPD_VALIKUD, [1, 0.05, 0.02, 0.01, 1e-4, 5e-5, 1e-5]);
  kontrolliHulk('Tabel B.13 P_EB', T.PEB_VALIKUD, [1, 0.05, 0.02, 0.01]);
  kontrolliHulk('Tabel B.9 C_LD/C_LI', T.CLD_CLI_VALIKUD,
    [[1, 1], [1, 1], [1, 0.2], [1, 0.3], [1, 0.1], [1, 0], [1, 0], [0, 0], [0, 0], [0, 0]]);
  kontrolliHulk('Tabel B.10 K_S3', T.KS3_VALIKUD, [1, 0.5, 0.2, 0.01, 1e-4]);
  // Tabel C.2: vahemike otsad (suurim = vaikimisi, vähim = alumine piir)
  const otsad = o => { const v = Object.values(o); return [Math.max(...v), Math.min(...v)]; };
  const c2 = [[[0.2, 1e-2], [1e-2, 1e-3]], [[0.1, 1e-2], [1e-3, 1e-4]], [[5e-2, 5e-3], [5e-4, 1e-5]], [[2e-2, 2e-3], [1e-4, 1e-5]]];
  c2.forEach(([lf, lo], kat) => {
    kontrolliHulk(`Tabel C.2 L_F kategooria ${kat}`, { a: otsad(T.LF_VAHEMIKUD[kat])[0], b: otsad(T.LF_VAHEMIKUD[kat])[1] }, lf);
    kontrolliHulk(`Tabel C.2 L_O kategooria ${kat}`, { a: otsad(T.LO_VAHEMIKUD[kat])[0], b: otsad(T.LO_VAHEMIKUD[kat])[1] }, lo);
    const esimene = Object.values(T.LF_VAHEMIKUD[kat])[0];
    RESULTS.push({ label: 'C.2 vaikimisi suurim', ok: esimene === lf[0] });
  });
  // Tabelid B.11/B.12 P_LD: tabelipunktid ja vahepealne U_W (lähim madalam veerg)
  const pld = [['rs_5_20', 2.5, 0.95], ['rs_1_5', 4, 0.3], ['rs_alla_1', 12, 0.005],
    ['rs_5_20', 40, 0.03], ['rs_alla_1', 95, 0.7e-4], ['kaitsmata', 2.5, 1],
    ['rs_1_5', 2, 0.8], ['rs_1_5', 14, 0.02]];
  for (const [kaabel, uw, p] of pld) {
    const ok = Math.abs(arvutaPLD(kaabel, uw) - p) < 1e-12;
    RESULTS.push({ label: 'PLD', ok });
    if (!ok) console.log(`  ✗ P_LD(${kaabel}, ${uw} kV) = ${arvutaPLD(kaabel, uw)}, oodatud ${p}`);
  }
  console.log('  ✓ Tabelid B.11/B.12 P_LD (8 punkti, sh vahepealne U_W)');
}

// ===== Standardi viited: iga vormi viide leiab PDF-i lehekülje =========

function testViited() {
  console.log('\n===== Standardi viited → PDF lehekülg =====');
  const viited = [...html.matchAll(/<span class="standard-ref">([\s\S]*?)<\/span>/g)]
    .map(m => m[1].replace(/<[^>]+>/g, ''));
  const leidmata = viited.filter(v => !leiaViide(v));
  const ok = viited.length > 0 && leidmata.length === 0;
  RESULTS.push({ label: 'viited', ok });
  console.log(`  ${ok ? '✓' : '✗'} ${viited.length} viidet, leidmata: ${leidmata.length ? leidmata.join('; ') : '0'}`);
  // Näidised: tabel, mitmuses tabelid, valem, jaotis, alajaotis → ülemjaotis
  const näited = [['(r_f, tabel B.6)', 66], ['(P_LD, tabelid B.11/B.12)', 74], ['(valem B.15)', 77],
    ['(jaotis 8.4)', 45], ['(jaotis A.2.5)', 57], ['(Lisa A.1)', 51]];
  for (const [t, leht] of näited) {
    const v = leiaViide(t);
    const okk = v && v.leht === leht;
    RESULTS.push({ label: t, ok: okk });
    if (!okk) console.log(`  ✗ ${t} → ${v ? v.leht : 'ei leitud'}, oodatud ${leht}`);
  }
}

// ===== Käivita kõik testid ============================================

testF2_Maja();
testF3_Büroohoone();
testF3_Kaitstud();
testF4_Haigla();
testLõigudKooskõla();
testÄrihoone();
testTabelid();
testViited();

// ===== Kokkuvõte ======================================================

console.log('\n===== Kokkuvõte =====');
const õnnestus = RESULTS.filter(r => r.ok).length;
const ebaõnnestus = RESULTS.filter(r => !r.ok).length;
console.log(`✓ ${õnnestus} läbi   ✗ ${ebaõnnestus} luhtus   (kokku ${RESULTS.length})`);

process.exit(ebaõnnestus === 0 ? 0 : 1);
