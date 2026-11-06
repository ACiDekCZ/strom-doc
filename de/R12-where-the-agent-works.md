<a id="R12"></a>
# R12 Wo der Agent arbeitet und was strom überwacht

Mit dem Agenten wird im Terminal gesprochen oder in der Desktop-App des Agenten; selbstständiges Arbeiten läuft ohne
Gespräch. Danach unterscheidet sich, wo das Gespräch ist, welchen Browser der Agent nutzt, was strom überwacht, was
der Mensch tut und was ohne den Agenten im Terminal nicht geht. Die Regeln der Archive sind überall dieselben
([R9](R9-archives.md)); anders ist nur, wovor strom steht. Beschreibt die Forschung 1.29.0. Bei den Regeln wird
unterschieden, was **der Code prüft** (der Befehl `strom` oder der Hook des Agenten lehnt es ab) und was nur eine
**Regel der Methodik** ist. Was auf einem Mac nicht live geprüft ist, sagt [R12.6](#R12.6).

<!-- zdroj: dirigent:spec/062-hlidani-desktop-a-codex/spec.md K5.1, K5.2 · test/vysledek-desktop-chrome.md · test/vysledek-062-u4-desktop.md · test/vysledek-1106-vyzkum-062-desktop.md · research:CHANGELOG.de.md 1.29.0 -->

<a id="R12.1"></a>
## R12.1 Sechs Arten zu arbeiten: eine Tabelle

| Art zu arbeiten | Ort des Gesprächs | Browser des Agenten | Was strom überwacht | Schritt des Menschen | Ohne den Agenten im Terminal |
|---|---|---|---|---|---|
| Claude Code im Terminal | Terminal: Claude Code im Ordner der Forschung (`strom chat --where terminal`) | Chrome mit der Erweiterung Claude in Chrome ([R9.4.1](R9-archives.md#R9.4.1)) | Browser in Chrome ([R9.4](R9-archives.md#R9.4)), Webabruf ([R9.3](R9-archives.md#R9.3)), Befehle in der Kommandozeile des Agenten | Erlaubnis für ein Archiv ([R9.2](R9-archives.md#R9.2)) | – (Claude Code ist im Terminal) |
| App Claude (Tab Code) und Claude Code im Terminal | App Claude, Tab Code (`strom chat`) | Chrome mit Claude in Chrome oder der eingebaute Browser der App ([R12.2](#R12.2)) | Browser in Chrome und eingebauter Browser der App, Webabruf, Befehle in der Kommandozeile des Agenten und im Terminal der App ([R12.3](#R12.3)) | den Ordner bestätigen (Trust workspace) und die vorbereitete Nachricht senden; Erlaubnis für ein Archiv | nichts fehlt: selbstständiges Arbeiten und das Lesen von Scans laufen über Claude Code im Terminal |
| App Claude ohne Claude Code im Terminal | App Claude, Tab Code (`strom chat`) | wie in der Zeile darüber | wie in der Zeile darüber | wie in der Zeile darüber; eine Installation von Claude Code, die strom anbietet und die sich ablehnen lässt ([R12.4](#R12.4)) | selbstständiges Arbeiten (`strom run`), das Lesen von Scans durch die Leser (`strom read`) und Arbeit aus der Strom-App ([R12.4](#R12.4)) |
| Codex im Terminal | Terminal: Codex im Ordner der Forschung (`strom chat --where terminal`) | Browser, Chrome und Computersteuerung von Codex, wenn seine Einstellungen sie haben ([R12.5](#R12.5)) | nur Befehle `strom` nach den Regeln des Stammbaums für Codex; nicht Browser, Computersteuerung oder Web von Codex ([R12.5](#R12.5)) | dem Ordner der Forschung vertrauen (erst dann gelten die Regeln des Stammbaums); Erlaubnis für ein Archiv | – (Codex ist im Terminal) |
| App ChatGPT (Codex) | App ChatGPT (`strom chat`) | wie bei Codex im Terminal: dieselben Einstellungen ([R12.5](#R12.5)) | wie bei Codex im Terminal ([R12.5](#R12.5)) | laut `strom chat` den Ordner bestätigen und die vorbereitete Nachricht senden (nicht geprüft, [R12.6](#R12.6)); Erlaubnis für ein Archiv | selbstständiges Arbeiten, das Lesen von Scans durch die Leser und Arbeit aus der Strom-App ([R12.5](#R12.5)) |
| selbstständiger Lauf `strom run` | nirgends: der Agent arbeitet allein; den Verlauf zeigen das Terminal und die Strom-App ([S1.4](S1-connecting-app-and-research.md#S1.4)) | Claude Code: Chrome nach der Aufgabe ([R9.4.1](R9-archives.md#R9.4.1)); Codex: Browser und Computersteuerung abgeschaltet ([R12.5](#R12.5)) | Claude Code: wie im Terminal; Codex: Befehle `strom` | den Lauf starten; die Erlaubnis für ein Archiv vorher, beim Lauf ist niemand dabei ([R9.7](R9-archives.md#R9.7)) | der ganze Lauf: er endet, bevor eine Frage oder eine Kostenschätzung kommt ([R12.4](#R12.4)) |

- **Prüft der Code:**
  - die Hooks von strom in `.claude/settings.json` der Forschung führen Claude Code im Terminal und die App Claude
    (Tab Code) aus; Codex liest die Regeln des Stammbaums in `.codex/rules/strom.rules`;
  - an den Apps der Agenten wird nichts abgeschaltet. Die einzige Ausnahme ist ein selbstständiger Lauf mit Codex ohne
    die persönlichen Erweiterungen des Agenten ([R12.5](#R12.5)).
- **Grenzen:** die Computersteuerung (Computer Use) überwacht strom bei keinem Agenten: der Agent steuert damit den
  Computer wie ein Mensch.
- **Nur Methodik:** in jeder Art zu arbeiten startet der Agent `strom` in seiner Kommandozeile und nutzt einen Browser,
  den strom nicht empfiehlt, nicht von sich aus ([R9.4.2](R9-archives.md#R9.4.2)).
- **Bedienung:** Terminal: `strom chat` (wo, sagt die Einstellung `agent.where`: `app` die App des Agenten,
  `terminal` das Terminal; ohne Einstellung die App, wenn sie installiert ist), `strom chat --where app|terminal`
  einmal anders, `strom agents use claude|codex`, `strom doctor` (Zeilen **Ort des Gesprächs**, **Agent im
  Terminal**, **Browser (Claude in Chrome)**, **Browser der Desktop-Apps**).
- **Gilt seit:** Forschung 1.29.0

<!-- zdroj: research:src/core/apps.ts DESKTOP_APPS (claude://code/new, codex://new; mac Claude.app, Codex.app, ChatGPT.app) · src/commands/start.ts:156-217 strom chat (where app|terminal, ui.chat.app.open) · src/core/config.ts:311 agent.where, :316 agent.addons · src/agents/files.ts codexRules · src/core/agentcli.ts · assets/lang/de.json ui.doc.where, ui.doc.cli, ui.doc.browser, ui.doc.desktop · test/vysledek-desktop-chrome.md (Trust workspace, odkaz jen předvyplní zprávu) -->

<a id="R12.2"></a>
## R12.2 Der Browser in der App Claude

Die App Claude hat zwei Browser: Chrome mit der Erweiterung Claude in Chrome und ihren eigenen eingebauten Browser.
strom überwacht beide gleich.

- **Prüft der Code (Hook vor dem Öffnen einer Seite):**
  - der eingebaute Browser bekommt dieselben Regeln wie der Browser in Chrome ([R9.4](R9-archives.md#R9.4)): ein
    Archiv, das nur der Browser eines Menschen betreten darf, wird ohne die Erlaubnis **über den Browser** mit
    demselben Rat abgelehnt; ein erlaubtes wird aufgezeichnet und hält sein Tempo zusammen mit Chrome und dem
    Webabruf;
  - Werkzeuge auf einer Seite (Seite lesen, suchen, Skript) werden nach der Website geprüft, die in diesem Tab zuletzt
    geöffnet wurde. Die Tabs des eingebauten Browsers und von Chrome werden nicht verwechselt;
  - lokale Seiten (localhost, eine Datei auf dem Computer) werden nicht eingeschränkt. Die Brücke zur Strom-App wird
    immer abgelehnt.
- **Grenzen:** welchen Browser der Agent nutzt, bestimmt die App Claude: ihre Einstellung **Preferred browser** und ob
  die Erweiterung in Chrome verbunden ist. Mit Chrome als bevorzugtem Browser gehen Websites über Chrome. Die
  Computersteuerung der App Claude überwacht strom nicht: der Agent steuert damit den Computer wie ein Mensch.
- **Nur Methodik:** strom empfiehlt den eingebauten Browser nicht: der Agent nutzt ihn nicht von sich aus
  ([R9.4.2](R9-archives.md#R9.4.2)).
- **Warum:** die App Claude führt die Hooks der Forschung auch vor ihrem eingebauten Browser aus, also kann strom jede
  Adresse beurteilen wie bei Chrome.
- **Bedienung:** App Claude: Einstellung **Preferred browser**. Terminal: `strom doctor`, Zeile **Browser der
  Desktop-Apps** und beim Browser in Chrome **im Gespräch in der App Claude: ja; selbstständiges Arbeiten (strom run
  --chrome): nur mit Claude Code im Terminal**.
- **Gilt seit:** Forschung 1.29.0

<!-- zdroj: research:src/core/browser.ts (matcher mcp__(remote-devices__)?Claude_Browser__*) · src/core/chromehook.ts · src/core/webgate.ts browserGate · assets/lang/de.json ui.doc.desktop.unwatched, ui.doc.browser.apponly · CHANGELOG.de.md 1.29.0 · test/vysledek-062-u4-desktop.md kroky 1–3 · test/vysledek-1106-vyzkum-062-desktop.md bod 3 · test/vysledek-desktop-chrome.md bod 4, bod 6 -->

<a id="R12.3"></a>
## R12.3 Das Terminal der App Claude

Die App Claude hat auch ein eigenes Terminal. Befehle darin gelten genauso wie in der Kommandozeile des Agenten.

- **Prüft der Code (Hook vor einem Befehl im Terminal der App):**
  - was nur der Mensch tut, wird dem Agenten abgelehnt: die Anmeldung (`strom login`), das Siegel (`strom seal`),
    Installieren und Entfernen eines Konnektors, die Erlaubnis für ein Archiv (`strom allow`), eine Erzählung
    freigeben, eine Hypothese entscheiden, einen Ort beantworten und die anderen Befehle des Menschen, auch mit dem
    vollen Pfad zu `strom` oder einer Variablen davor;
  - git, das die Forschung dem Agenten verbietet, wird abgelehnt;
  - die Brücke zur Strom-App wird abgelehnt (ihre Adresse und die Datei, in der sie steht).
- **Grenzen:** strom nimmt das Terminal der App nicht in die erlaubten Befehle auf: jeden Befehl darin genehmigt der
  Mensch, wie bisher. Das Terminal der App ist die Login-Shell des Benutzers mit seinem Pfad zu den Programmen.
- **Nur Methodik:** der Agent startet `strom` in seiner Kommandozeile, nicht im Terminal der App.
- **Warum:** die Regeln von strom für die Kommandozeile des Agenten erreichen das Terminal der App nicht von selbst;
  der Hook von strom überträgt sie.
- **Bedienung:** keine: es gilt von selbst in der Forschung.
- **Gilt seit:** Forschung 1.29.0

<!-- zdroj: research:src/core/desktopterminal.ts desktopTerminalRefusal · src/core/bridgeguard.ts · src/agents/files.ts (CLAUDE.md: use Bash for strom commands … never its terminal) · test/vysledek-1106-vyzkum-062-desktop.md bod 4 · test/vysledek-062-u4-desktop.md krok 4, kroky 5–6 · CHANGELOG.de.md 1.29.0 -->

<a id="R12.4"></a>
## R12.4 Die App Claude ohne Claude Code im Terminal

Für ein Gespräch genügt die App Claude. Was strom selbst startet, führt Claude Code im Terminal aus.

- **Prüft der Code:**
  - selbstständiges Arbeiten (`strom run`), das Lesen von Scans durch die Leser (`strom read`), Korrekturen und Arbeit
    aus der Strom-App enden ohne Claude Code im Terminal mit dem Code `agent.cli-missing`, bevor eine Frage oder eine
    Kostenschätzung kommt. Die Meldung bietet an, das Gespräch in der App fortzusetzen (`strom chat`), und eine
    Installation von Claude Code;
  - die Brücke sagt der Strom-App mit demselben Code, dass das Lesen nicht bereit ist;
  - `strom setup` zeigt die Zeile **Claude – die App (selbstständiges Arbeiten und das Lesen von Scans brauchen Claude
    Code)** und bietet eine Installation von Claude Code an. Sie lässt sich ablehnen; ohne Menschen wird nur die
    Installationszeile ausgegeben;
  - `strom doctor` warnt (es ist kein Fehler) in der Zeile **Agent im Terminal**: **selbstständiges Arbeiten, das
    Lesen von Scans und Arbeit aus der Strom-App brauchen Claude Code im Terminal**; `strom doctor --fix` bietet die
    Installation an;
  - im Gespräch ohne Claude Code im Terminal liest der Scan-Leser von strom die Scans direkt im Gespräch (statt
    `strom read`).
- **Grenzen:** die Kopie von Claude Code, die die App Claude in sich trägt, nutzt strom nie: es startet nur Claude
  Code, das im Terminal installiert ist.
- **Warum:** das Gespräch führt die App, aber selbstständiges Arbeiten und die Leser startet strom mit dem Befehl
  Claude Code. Es vorher zu sagen erspart eine Zustimmung und eine Kostenschätzung, die zu nichts führen würden.
- **Bedienung:** Terminal: `strom doctor`, `strom doctor --fix`, `strom setup`, `strom chat`.
- **Gilt seit:** Forschung 1.29.0

<!-- zdroj: research:src/core/agentcli.ts CLI_MISSING, appWithoutCli, claudeInstallLine · src/commands/setup.ts:471 ui.doc.cli.missing · assets/lang/de.json ui.setup.cli.apponly · test/vysledek-1106-vyzkum-062-desktop.md bod 5 · prace/1106-vyzkum-062-desktop/pruzkum.md B · CHANGELOG.de.md 1.29.0 -->

<a id="R12.5"></a>
## R12.5 Codex: im Terminal und in der App ChatGPT

Codex läuft im Terminal oder in der App ChatGPT (die ältere eigene App Codex ging ihr voraus). Browser, Chrome und
Computersteuerung sind seine Plugins in einer Einstellung von Codex (`~/.codex/config.toml`), die Terminal und App
teilen.

- **Prüft der Code:**
  - Befehle `strom` nach den Regeln des Stammbaums für Codex (`.codex/rules/strom.rules`): `strom` ist erlaubt; die
    Anmeldung, das Siegel, Installieren und Entfernen eines Konnektors und git sind verboten. Codex liest diese
    Regeln, sobald der Mensch dem Ordner der Forschung vertraut;
  - Browser, Chrome und Computersteuerung von Codex und seine Werkzeuge für das Web überwacht strom nicht: vor ihnen
    hat es keinen Hook;
  - ein selbstständiger Lauf (`strom run`) mit Codex ohne die persönlichen Erweiterungen des Agenten
    (`agent.addons off`, Standard) schaltet seine Plugins, den Browser und die Computersteuerung ab. Mit
    `agent.addons on` und im Gespräch bleiben sie, wie der Mensch sie hat.
- **Grenzen:**
  - ohne Codex im Terminal (nur die App ChatGPT) startet strom weder selbstständiges Arbeiten noch das Lesen von Scans
    durch die Leser noch Arbeit aus der Strom-App; es endet mit demselben Code `agent.cli-missing` wie bei Claude
    ([R12.4](#R12.4));
  - die Computersteuerung von Codex überwacht strom nicht: der Agent steuert damit den Computer wie ein Mensch.
- **Nur Methodik:** den Browser von Codex nutzt der Agent nicht von sich aus: in ein Archiv, das nur der Browser eines
  Menschen betreten darf, geht er damit nicht, und die Bilder speichert der Mensch
  ([R9.4.2](R9-archives.md#R9.4.2), [R9.6](R9-archives.md#R9.6)).
- **Warum:** der Browser von Codex wird mit JavaScript-Code gesteuert, nicht mit der Adresse einer Seite, also kann
  strom sie nicht zuverlässig beurteilen.
- **Bedienung:** Terminal: `strom config set agent.addons on|off`, `strom doctor` (Zeile **Browser der
  Desktop-Apps**). Codex: Vertrauen in den Ordner der Forschung.
- **Gilt seit:** Forschung 1.27.0 (Browser und Computersteuerung im selbstständigen Lauf abgeschaltet);
  `agent.addons` seit 1.14.0; fehlendes Codex im Terminal seit 1.29.0

<!-- zdroj: research:src/agents/files.ts codexRules · src/runners/codex.ts CODEX_CLEAN, codexBrowserOff · src/core/browser.ts CODEX_BROWSER_SERVERS · src/core/browserhelp.ts GUARDED_BROWSER_AGENTS = claude · src/core/web.ts · src/core/agentcli.ts cliMissing · src/core/apps.ts codex · test/vysledek-desktop-chrome.md Codex · prace/1106-vyzkum-062-desktop/pruzkum.md A1, A2 · CHANGELOG.de.md 1.27.0 -->

<a id="R12.6"></a>
## R12.6 Was nicht geprüft ist

Die Tabelle [R12.1](#R12.1) beschreibt den Code der Forschung und das, was auf einem Mac in der App Claude (Tab Code)
geprüft wurde. Noch nicht live geprüft:

- die App Claude mit getrennter Erweiterung in Chrome oder mit dem eingebauten Browser als bevorzugtem: welchen
  Browser der Agent dann wählt (es folgt nur aus den Anweisungen der App an den Agenten);
- die Kommandozeile des Agenten in der App Claude und der Webabruf darin (die Hooks sind dieselben wie im Terminal);
- die Überwachung in der App Claude, wenn Claude Code nicht im Terminal ist (die App führt die Hooks mit ihrer eigenen
  Kopie von Claude Code aus);
- Codex live: weder im Terminal noch in der App ChatGPT (die Regeln des Stammbaums, das Öffnen eines Gesprächs per
  Link, die Schritte des Menschen), noch dass sich die App ChatGPT wie die ältere App Codex verhält;
- die Apps Claude und ChatGPT unter Windows.

- **Gilt seit:** Forschung 1.29.0

<!-- zdroj: test/vysledek-desktop-chrome.md Neověřeno · test/vysledek-062-u4-desktop.md Neověřeno · test/vysledek-1106-vyzkum-062-desktop.md Neověřeno · dirigent 6. 11. (ChatGPT.app × Codex.app) · spec 062 Mimo rozsah (Windows) -->
