// Valideerimistest — laeb piksekaitse.html-st JS-i ja kontrollib,
// et standardi näide F.2 (Maja) annab oodatud tulemuse R = 1,793 × 10⁻⁵.
//
// Käivitamine: node tests/test_validation.js  (projekti juurkaustast)

const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, '..', 'piksekaitse.html');
const html = fs.readFileSync(HTML_PATH, 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) {
  console.error('Ei leidnud <script> blokki failist', HTML_PATH);
  process.exit(1);
}
const js = m[1];

// Stub document, et top-level kood ei viskaks veaks
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: () => ({ appendChild: () => {} }),
};
global.window = {};

// Käivita
eval(js);

// Sisendid Maja näite jaoks
const P = {
  NSG: 8.0, k_tegur: 2, RT: 1e-5,
  tZ: 4380, te: 8760,
  PP: 4380/8760, Pe: 1.0,
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
const R = t.R;

console.log('===== Standardi näide F.2 (Maja) - valideerimine =====\n');
console.log(`R = ${(R.R/1e-5).toFixed(3)} × 10⁻⁵   (oodatud: 1.793)`);
const erinevus = Math.abs(R.R - 1.793e-5) / 1.793e-5 * 100;
console.log(`Erinevus: ${erinevus.toFixed(3)}%`);
const ok = erinevus < 1;
console.log(ok ? '✓ TÄPSED TULEMUSED!' : '✗ Erinevus liiga suur!');
process.exit(ok ? 0 : 1);
