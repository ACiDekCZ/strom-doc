<a id="R12"></a>
# R12 Where the agent works and what strom watches

The agent is talked to in a terminal, or in the agent's desktop app; working alone runs without a conversation.
Accordingly, what differs is where the conversation is, which browser the agent uses, what strom watches, what a
person does and what does not work without the agent in the terminal. The archives' rules are the same everywhere
([R9](R9-archives.md)); only what strom stands before differs. Describes the research 1.29.0. Each rule says what is
**enforced by the code** (the `strom` command or the agent's hook refuses it) and what is only a **rule of the
method**. What has not been verified live on a Mac is said in [R12.6](#R12.6).

<!-- zdroj: dirigent:spec/062-hlidani-desktop-a-codex/spec.md K5.1, K5.2 · test/vysledek-desktop-chrome.md · test/vysledek-062-u4-desktop.md · test/vysledek-1106-vyzkum-062-desktop.md · research:CHANGELOG.cs.md 1.29.0 -->

<a id="R12.1"></a>
## R12.1 Six ways of working: a table

| Way of working | Where the conversation is | The agent's browser | What strom watches | A person's step | Without the agent in the terminal |
|---|---|---|---|---|---|
| Claude Code in the terminal | the terminal: Claude Code in the research folder (`strom chat --where terminal`) | Chrome with the Claude in Chrome extension ([R9.4.1](R9-archives.md#R9.4.1)) | the browser in Chrome ([R9.4](R9-archives.md#R9.4)), the web fetch ([R9.3](R9-archives.md#R9.3)), commands in the agent's command line | an archive's permission ([R9.2](R9-archives.md#R9.2)) | – (Claude Code is in the terminal) |
| the Claude app (Code tab) and Claude Code in the terminal | the Claude app, Code tab (`strom chat`) | Chrome with Claude in Chrome, or the app's built-in browser ([R12.2](#R12.2)) | the browser in Chrome and the app's built-in browser, the web fetch, commands in the agent's command line and in the app's terminal ([R12.3](#R12.3)) | confirm the folder (Trust workspace) and send the prepared message; an archive's permission | nothing is missing: working alone and reading scans run through Claude Code in the terminal |
| the Claude app without Claude Code in the terminal | the Claude app, Code tab (`strom chat`) | as in the row above | as in the row above | as in the row above; an installation of Claude Code that strom offers and that can be declined ([R12.4](#R12.4)) | working alone (`strom run`), reading scans by the readers (`strom read`) and work from the Strom app ([R12.4](#R12.4)) |
| Codex in the terminal | the terminal: Codex in the research folder (`strom chat --where terminal`) | Codex's browser, Chrome and computer use, if its settings have them ([R12.5](#R12.5)) | only `strom` commands by the tree's rules for Codex; not Codex's browser, computer use or web ([R12.5](#R12.5)) | trust the research folder (only then the tree's rules apply); an archive's permission | – (Codex is in the terminal) |
| the ChatGPT app (Codex) | the ChatGPT app (`strom chat`) | as with Codex in the terminal: the same settings ([R12.5](#R12.5)) | as with Codex in the terminal ([R12.5](#R12.5)) | as `strom chat` says, confirm the folder and send the prepared message (not verified, [R12.6](#R12.6)); an archive's permission | working alone, reading scans by the readers and work from the Strom app ([R12.5](#R12.5)) |
| a run alone, `strom run` | nowhere: the agent works alone; the terminal and the Strom app show the course ([S1.4](S1-connecting-app-and-research.md#S1.4)) | Claude Code: Chrome by the task ([R9.4.1](R9-archives.md#R9.4.1)); Codex: browser and computer use switched off ([R12.5](#R12.5)) | Claude Code: as in the terminal; Codex: `strom` commands | start the run; an archive's permission beforehand, nobody is there during the run ([R9.7](R9-archives.md#R9.7)) | the whole run: it ends before any question or cost estimate ([R12.4](#R12.4)) |

- **Enforced by the code:**
  - strom's hooks in the research's `.claude/settings.json` are run by Claude Code in the terminal and by the Claude
    app (Code tab); Codex reads the tree's rules in `.codex/rules/strom.rules`;
  - nothing of the agents' apps is switched off. The one exception is a run alone with Codex without the agent's
    personal add-ons ([R12.5](#R12.5)).
- **Limits:** computer use strom watches with no agent: the agent controls the computer with it as a person does.
- **Method only:** in every way of working the agent runs `strom` in its command line and does not of its own accord
  use a browser strom does not recommend ([R9.4.2](R9-archives.md#R9.4.2)).
- **Controls:** terminal: `strom chat` (where, says the setting `agent.where`: `app` the agent's app, `terminal` the
  terminal; unset: the app when it is installed), `strom chat --where app|terminal` once otherwise,
  `strom agents use claude|codex`, `strom doctor` (rows **where the conversation is**, **the agent in the
  terminal**, **browser (Claude in Chrome)**, **desktop apps' browser**).
- **Since:** research 1.29.0

<!-- zdroj: research:src/core/apps.ts DESKTOP_APPS (claude://code/new, codex://new; mac Claude.app, Codex.app, ChatGPT.app) · src/commands/start.ts:156-217 strom chat (where app|terminal, ui.chat.app.open) · src/core/config.ts:311 agent.where, :316 agent.addons · src/agents/files.ts codexRules · src/core/agentcli.ts · src/cli/ui.ts ui.doc.where, ui.doc.cli, ui.doc.browser, ui.doc.desktop · test/vysledek-desktop-chrome.md (Trust workspace, odkaz jen předvyplní zprávu) -->

<a id="R12.2"></a>
## R12.2 The browser in the Claude app

The Claude app has two browsers: Chrome with the Claude in Chrome extension and its own built-in browser. strom
watches both alike.

- **Enforced by the code (a hook before a page opens):**
  - the built-in browser gets the same rules as the browser in Chrome ([R9.4](R9-archives.md#R9.4)): an archive only
    a person's browser may enter is refused without the permission **through the browser**, with the same advice; an
    allowed one is recorded and keeps its pace together with Chrome and the web fetch;
  - tools on a page (reading the page, finding, a script) are checked by the site last opened in that tab. The tabs of
    the built-in browser and of Chrome are not mixed up;
  - local pages (localhost, a file on the computer) are not limited at all. The bridge to the Strom app is always
    refused.
- **Limits:** which browser the agent uses is up to the Claude app: its setting **Preferred browser** and whether the
  extension in Chrome is connected. With Chrome preferred, sites go through Chrome. Computer use of the Claude app
  strom does not watch: the agent controls the computer with it as a person does.
- **Method only:** strom does not recommend the built-in browser: the agent does not use it of its own accord
  ([R9.4.2](R9-archives.md#R9.4.2)).
- **Why:** the Claude app runs the research's hooks before its built-in browser too, so strom can judge every address
  as it does for Chrome.
- **Controls:** the Claude app: the setting **Preferred browser**. Terminal: `strom doctor`, the row **desktop apps'
  browser** and, at the browser in Chrome, **in a conversation in the Claude app: yes; working alone (strom run
  --chrome): only with Claude Code in the terminal**.
- **Since:** research 1.29.0

<!-- zdroj: research:src/core/browser.ts (matcher mcp__(remote-devices__)?Claude_Browser__*) · src/core/chromehook.ts · src/core/webgate.ts browserGate · src/cli/ui.ts ui.doc.desktop.unwatched, ui.doc.browser.apponly · CHANGELOG.md 1.29.0 · test/vysledek-062-u4-desktop.md kroky 1–3 · test/vysledek-1106-vyzkum-062-desktop.md bod 3 · test/vysledek-desktop-chrome.md bod 4, bod 6 -->

<a id="R12.3"></a>
## R12.3 The Claude app's terminal

The Claude app also has a terminal of its own. Commands in it hold the same as in the agent's command line.

- **Enforced by the code (a hook before a command in the app's terminal):**
  - what only a person does is refused to the agent: the login (`strom login`), the seal (`strom seal`), installing
    and removing a connector, an archive's permission (`strom allow`), approving a story, deciding a hypothesis,
    answering a place and the person's other commands, also with the full path to `strom` or a variable before it;
  - git, which the research forbids the agent, is refused;
  - the bridge to the Strom app is refused (its address and the file it is in).
- **Limits:** strom does not add the app's terminal to the allowed commands: a person approves every command in it,
  as before. The app's terminal is the user's login shell with the user's path to programs.
- **Method only:** the agent runs `strom` in its command line, not in the app's terminal.
- **Why:** strom's rules for the agent's command line do not reach the app's terminal by themselves; strom's hook
  carries them over.
- **Controls:** none: it holds by itself in the research.
- **Since:** research 1.29.0

<!-- zdroj: research:src/core/desktopterminal.ts desktopTerminalRefusal · src/core/bridgeguard.ts · src/agents/files.ts (CLAUDE.md: use Bash for strom commands … never its terminal) · test/vysledek-1106-vyzkum-062-desktop.md bod 4 · test/vysledek-062-u4-desktop.md krok 4, kroky 5–6 · CHANGELOG.md 1.29.0 -->

<a id="R12.4"></a>
## R12.4 The Claude app without Claude Code in the terminal

The Claude app is enough for a conversation. What strom starts by itself, Claude Code in the terminal runs.

- **Enforced by the code:**
  - working alone (`strom run`), reading scans by the readers (`strom read`), fixes and work from the Strom app end
    without Claude Code in the terminal with the code `agent.cli-missing`, before any question or cost estimate. The
    message offers to go on with the conversation in the app (`strom chat`) and an installation of Claude Code;
  - the bridge tells the Strom app that reading is not ready, with the same code;
  - `strom setup` shows the row **Claude — the app (working alone and reading scans need Claude Code)** and offers an
    installation of Claude Code. It can be declined; without a person only the installation line is printed;
  - `strom doctor` warns (it is not an error) in the row **the agent in the terminal**: **working alone, reading scans
    and work from the Strom app need Claude Code in the terminal**; `strom doctor --fix` offers the installation;
  - in a conversation without Claude Code in the terminal, strom's scan reader reads scans right in the conversation
    (instead of `strom read`).
- **Limits:** the copy of Claude Code the Claude app carries inside it strom never uses: it starts only Claude Code
  installed in the terminal.
- **Why:** the app leads the conversation, but working alone and the readers strom starts with the Claude Code
  command. Saying so beforehand spares a consent and a cost estimate that would lead nowhere.
- **Controls:** terminal: `strom doctor`, `strom doctor --fix`, `strom setup`, `strom chat`.
- **Since:** research 1.29.0

<!-- zdroj: research:src/core/agentcli.ts CLI_MISSING, appWithoutCli, claudeInstallLine · src/commands/setup.ts:471 ui.doc.cli.missing · src/cli/ui.ts ui.setup.cli.apponly · test/vysledek-1106-vyzkum-062-desktop.md bod 5 · prace/1106-vyzkum-062-desktop/pruzkum.md B · CHANGELOG.md 1.29.0 -->

<a id="R12.5"></a>
## R12.5 Codex: in the terminal and in the ChatGPT app

Codex runs in the terminal, or in the ChatGPT app (the older separate Codex app came before it). The browser, Chrome
and computer use are its plugins in one Codex setting (`~/.codex/config.toml`), which the terminal and the app share.

- **Enforced by the code:**
  - `strom` commands by the tree's rules for Codex (`.codex/rules/strom.rules`): `strom` is allowed; the login, the
    seal, installing and removing a connector, and git are forbidden. Codex reads these rules once a person trusts
    the research folder;
  - Codex's browser, Chrome and computer use, and its web tools, strom does not watch: it has no hook before them;
  - a run alone (`strom run`) with Codex without the agent's personal add-ons (`agent.addons off`, the default)
    switches off its plugins, browser and computer use. With `agent.addons on` and in a conversation they stay as the
    person has them.
- **Limits:**
  - without Codex in the terminal (only the ChatGPT app) strom does not start working alone, reading scans
    by the readers or work from the Strom app; it ends with the same code `agent.cli-missing` as with Claude
    ([R12.4](#R12.4));
  - Codex's computer use strom does not watch: the agent controls the computer with it as a person does.
- **Method only:** the agent does not use Codex's browser of its own accord: it does not take it into an archive only
  a person's browser may enter, and a person saves the images ([R9.4.2](R9-archives.md#R9.4.2),
  [R9.6](R9-archives.md#R9.6)).
- **Why:** Codex's browser is driven by JavaScript code, not by a page's address, so strom has no reliable way to judge
  it.
- **Controls:** terminal: `strom config set agent.addons on|off`, `strom doctor` (the row **desktop apps' browser**).
  Codex: trust in the research folder.
- **Since:** research 1.27.0 (browser and computer use switched off in a run alone); `agent.addons` since 1.14.0;
  Codex missing in the terminal since 1.29.0

<!-- zdroj: research:src/agents/files.ts codexRules · src/runners/codex.ts CODEX_CLEAN, codexBrowserOff · src/core/browser.ts CODEX_BROWSER_SERVERS · src/core/browserhelp.ts GUARDED_BROWSER_AGENTS = claude · src/core/web.ts · src/core/agentcli.ts cliMissing · src/core/apps.ts codex · test/vysledek-desktop-chrome.md Codex · prace/1106-vyzkum-062-desktop/pruzkum.md A1, A2 · CHANGELOG.md 1.27.0 -->

<a id="R12.6"></a>
## R12.6 What is not verified

The table [R12.1](#R12.1) describes the research's code and what was verified on a Mac in the Claude app (Code tab).
Not yet verified live:

- the Claude app with the extension in Chrome disconnected, or with the built-in browser preferred: which browser the
  agent then picks (it follows only from the app's instructions to the agent);
- the agent's command line in the Claude app and the web fetch in it (the hooks are the same as in the terminal);
- the watching in the Claude app when Claude Code is not in the terminal (the app runs the hooks with its own copy of
  Claude Code);
- Codex live: neither in the terminal nor in the ChatGPT app (the tree's rules, opening a conversation by a link, a
  person's steps), nor that the ChatGPT app behaves like the older Codex app;
- the Claude and ChatGPT apps on Windows.

- **Since:** research 1.29.0

<!-- zdroj: test/vysledek-desktop-chrome.md Neověřeno · test/vysledek-062-u4-desktop.md Neověřeno · test/vysledek-1106-vyzkum-062-desktop.md Neověřeno · dirigent 6. 11. (ChatGPT.app × Codex.app) · spec 062 Mimo rozsah (Windows) -->
