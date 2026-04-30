# 🛠️ Claude Code installimine - samm-sammuline juhend

## Mis on Claude Code?

Claude Code on käsureatööriist (terminalis töötav), mis võimaldab Claude'il **otse sinu arvutil** faile lugeda, muuta ja käske jooksutada. See on erinev claude.ai veebiliidesest, kus failid jäävad pilve.

**Eelis:** kogu töö toimub sinu arvutil, Git töötab korralikult, mitu faili on lihtne hallata.

---

## Eelnõuded

### 1. Node.js (kui pole veel)

**Kontrolli, kas on:** Ava terminal/PowerShell ja kirjuta:
```
node --version
```

Kui näed midagi nagu `v20.x.x` või kõrgem - olemas, mine sammu 2 juurde.
Kui näed "command not found" - vaja installida.

**Installimine (Windows):**
1. Mine: https://nodejs.org/
2. Lae alla **LTS versioon** (vasakpoolne nupp)
3. Käivita installija, kõik vaikimisi seadistused on okei
4. Pärast installi avage **uus** PowerShell aken (vana ei näe muutusi)
5. Kontrolli: `node --version`

**Installimine (Mac):**
- Kui sul on Homebrew: `brew install node`
- Kui mitte: lae installer aadressilt https://nodejs.org/

### 2. Anthropic API võti

Claude Code töötab Anthropic API kaudu (eraldi sinu claude.ai tellimusest).

1. Mine: https://console.anthropic.com/
2. Logi sisse (kasuta sama Anthropic konto, mis claude.ai-l)
3. Vasakult menüüst vali **"API Keys"**
4. Kliki **"Create Key"**, anna nimi (näiteks "claude-code-personal")
5. **Kopeeri võti kohe** (algab `sk-ant-...`) - seda näidatakse ainult üks kord!
6. Hoia see turvaliselt salvestatud (näiteks paroolihalduris)

**Kulude info:**
- API on tasuline kasutuse järgi (mitte tellimusena)
- Esmakordsel kasutamisel saad tasuta krediiti tutvumiseks
- Tüüpiline väikesele projektile: 1-10 € kuus
- Saad seada **kulupiiranguid** Console'is (Settings → Limits)

---

## Claude Code'i installimine

Avada terminal/PowerShell ja sisesta:

```
npm install -g @anthropic-ai/claude-code
```

See võtab paar minutit. Kui näed `+@anthropic-ai/claude-code@x.x.x` - valmis.

**Kontroll:**
```
claude --version
```

---

## Esmane seadistamine

### 1. Mine projekti kausta

Tõenäoliselt sul on praegu kuskil zip-fail või kaust, mis ma sulle annan. Paki see lahti **kohta, kust leiad selle hiljem**, näiteks:
- Windows: `C:\Users\sinunimi\Documents\piksekaitse_project\`
- Mac: `~/Documents/piksekaitse_project/`

Mine sinna terminalis:
```
cd Documents/piksekaitse_project
```

### 2. Käivita Claude Code

```
claude
```

**Esmakordsel käivitusel:**
- Küsib su API võtit - kleebi see sisse (Ctrl+V või Cmd+V)
- Küsib, kas tahad seadistuse salvestada - **jah**
- Küsib usaldustaset selle kausta jaoks - vali **"trust this folder"**

### 3. Anna Claude'ile esimene käsk

Kopeeri alltoodud tekst ja kleebi terminali (Claude Code'i sisse):

```
Tere! Ma jätkan projekti, mis algas claude.ai vestluses. Selles kaustas on
HANDOFF.md fail, mis sisaldab kogu konteksti - palun loe see esmalt läbi
ja seejärel järgi seal kirjeldatud "Mida teha esmalt Claude Code'is" sammud.

Pärast seda küsi minult, kuidas edasi liikuda.
```

Vajuta Enter. Claude Code teeb edasised sammud automaatselt - sina lihtsalt jälgid ja kinnitad, kui ta küsib.

---

## Kuidas Claude Code'iga töötada

### Põhitõed

- Räägid temaga **eesti või inglise keeles**, nagu siin claude.ai-s
- Kui ta tahab faili muuta või käsku jooksutada, **küsib esmalt luba**
- Saad alati öelda **"Stop"** või **"Cancel"** kui midagi tundub valesti
- Kogu vestlus on terminali sees - **ei ole eraldi UI-d**

### Kasulikud käsklused (terminalis Claude Code'i sees)

- `/help` - näita käske
- `/clear` - alusta uut vestlust (eelmine kontekst kaob)
- `/cost` - vaata, palju oled kulutanud
- `Ctrl+C` (kaks korda) - sulge Claude Code

### Tüüpiline töövoog

1. Hommikul ava terminal, mine projekti kausta, käivita `claude`
2. Tee tööd, küsi mida vaja
3. Õhtul: `Ctrl+C` ja `Ctrl+C` - sulge
4. Sinu tööd jäävad **failidesse alles**, järgmine kord saad kohe edasi minna

### Kui Claude Code unustab konteksti

Iga vestlus on uus algus, aga **failidesse kirjutatud asjad jäävad alles**. Lihtsalt ütle uuele vestlusele:
> "Loe HANDOFF.md ja CHANGELOG.md ning tutvu praeguse olukorraga."

---

## Probleeme?

### "command not found: claude"
- Sulge ja ava uus terminal pärast installi
- Kui ikka ei tööta: `npm install -g @anthropic-ai/claude-code` uuesti

### "API key invalid"
- Mine console.anthropic.com → API Keys → loo uus võti
- Käivita `claude` ja anna uus võti

### "rate limit"
- Sa oled jõudnud kuukulutuse piirini
- Mine console.anthropic.com → Settings → Limits ja vaata

### Kui üldse ei tööta
- Tagasi siia claude.ai-sse, kirjelda probleemi - aitan
- Või kontakt: support@anthropic.com

---

## Kasulikud lingid

- Claude Code dokumentatsioon: https://docs.claude.com/claude-code
- Anthropic Console (API võtmed, kulu): https://console.anthropic.com/
- Node.js: https://nodejs.org/
