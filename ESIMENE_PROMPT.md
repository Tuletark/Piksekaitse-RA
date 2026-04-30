# 🚀 Esimene prompt Claude Code'is

Kopeeri allolev tekst ja kleebi see oma esimese sõnumina Claude Code'is, kui oled jõudnud projekti kausta.

---

```
Tere! Ma jätkan projekti, mis algas claude.ai vestluses. Selles kaustas on
HANDOFF.md fail, mis sisaldab kogu konteksti - palun loe see esmalt läbi
ja seejärel järgi seal kirjeldatud "Mida teha esmalt Claude Code'is" sammud.

Pärast seda küsi minult, kuidas edasi liikuda.
```

---

## Mida Claude Code teeb pärast seda

Ta loeb HANDOFF.md läbi ja seejärel:

1. ✅ Tutvub failidega (`ls`, vaatab `piksekaitse.html` struktuuri)
2. ✅ Initsialiseerib Git'i ja teeb esimese commiti
3. ✅ Käivitab valideerimisteti, et veenduda, et kõik töötab
4. ✅ Loob dokumentatsioonifailid: `README.md`, `CHANGELOG.md`, `docs/DECISIONS.md`, jne
5. ✅ Lisab koodikommentaarid (JSDoc)
6. ✅ Küsib seejärel sinult, kuidas tahad edasi liikuda

## Kui midagi läheb valesti

Kui Claude Code midagi ei mõista või teeb midagi ootamatut, võid alati öelda:
- "Lõpeta praegu, mis sa tegid?"
- "Loe HANDOFF.md uuesti läbi"
- "Tagasi viimase commiti juurde" (kui Git on juba initsialiseeritud)
