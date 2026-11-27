<a id="S9"></a>
# S9 Trying the sample

The sample is a made-up family for trying Strom without own data. Each language has a family of its own: the English
sample is the tree **Sample – the Hartley family**. There are two ways: the app opens the sample from the web or from a
file without installing anything ([S9.1](#S9.1), [S9.2](#S9.2)), and the research in the terminal sets up a sample
research with `strom demo` ([S9.4](#S9.4)). Own trees and researches stay unchanged either way. When the sample does
not download, the app offers the small sample, which is in the app itself ([S9.3](#S9.3)). The chapter describes the
Strom app 3.33.0 and the research 1.38.0.

| Way | What it makes | Needs | Deleting it |
|---|---|---|---|
| web: **Try the sample** | the sample tree in the app ([S9.1](#S9.1)) | a network | **Manage trees** |
| the sample file (`.json`) | the sample tree in the app ([S9.2](#S9.2)) | only the file | **Manage trees** |
| **Try the small sample** | the tree **Sample: the Berg family** ([S9.3](#S9.3)) | nothing | **Manage trees** |
| `strom demo` | a sample research on the disk, opened in the app ([S9.4](#S9.4)) | the research installed, a network | `strom demo --remove` |

<!-- zdroj: dirigent:spec/143-ukazkova-data K1.1–K1.4, K2.1–K2.2 · app:src/ui/showcase-open-ui.ts, src/showcase-download.ts · web:demo/cs/strom-ukazka-cs.json hlavička name „Ukázka – rod Horáků“ (en Hartley, de Weber, pl Jaworski) · research:src/core/demo.ts, src/commands/demo.ts -->

<a id="S9.1"></a>
## S9.1 The sample from the web

The button **Try the sample** on stromapp.info opens the app at the address `/run/?demo=<language>` in the language of
the page. The app downloads the sample file from the same web and opens it as a tree of its own with the tag
**Sample** ([S9.1.2](#S9.1.2)).

- The download shows the notice **Downloading the sample** with its progress ("<done> MB of <total> MB · <percent>%")
  and the button **Cancel**. Cancelling makes nothing: "The sample download was cancelled. Nothing changed."
- The sample tree is made only once the whole file is downloaded and its header checked. The app then switches the
  tree as at every switch: the open tree's changes go first and the following of its research ends
  ([S1.4](S1-connecting-app-and-research.md#S1.4)). At the end it says "The sample is open."
- Nothing is sent from the sample tree to any research or bridge.
- **Limits:**
  - the address takes only `cs`, `en`, `de` and `pl`; the app does not use any other value;
  - `?demo=` leaves the address as soon as it is read: a reloaded page does not download the sample again;
  - the app's language does not change; the sample of another language is another tree;
  - the file is downloaded from the address `/demo/<language>/strom-ukazka-<language>.json` beside the app;
  - when the sample cannot be downloaded or stored, the open tree stays as it was and nothing half made is left
    ([S9.3](#S9.3)).
- **Controls:** web: **Try the sample**; app: **New tree → Try the sample with research** and the link **Try the sample
  with research** at an empty tree (both open the sample in the app's language). The link `?demo=` works in a phone's
  browser and in the installed app too.
- **Since:** app 3.33.0

<!-- zdroj: app:src/ui/research-ui.ts initExternalOpen (?demo= pryč z adresy hned, i při jiné hodnotě), runExternalRequest (nainstalovaná aplikace) · src/showcase-download.ts showcaseLangParam, showcaseFileUrl, downloadShowcase · src/ui/showcase-open-ui.ts openShowcaseFromUrl, downloadShowcaseWithToast, openShowcaseFile (runTreeSwitch, researchFollowBeforeSwitch), createShowcaseTree, tieShowcaseResearch (sendMode 'off', bez adresy mostu), tryShowcase, showcaseLangOfUi · index.html new-tree-showcase-option, prázdný stav sample.tryTitle · strings.ts sample.downloading, downloadedOf, cancelled, openedTitle, tryTitle · web:js/i18n.js demo_try_btn (za branou demo) · app 9ea6ca78..534f3e9d -->

<a id="S9.1.1"></a>
### S9.1.1 Opening it again and a newer sample

A sample that is already in the browser is not downloaded again: the app only switches to it, with no notice and no
window. It then asks the web for the sample's version. When the web has a newer one, the app offers it in the notice
"A newer sample is available (<version>)." with the actions **Update the sample…** and **Not now**.

- The notice offers a newer version once per version. While the app knows of a newer version, the ⋯ menu of the
  sample's row in **Manage trees** has it too: **Update the sample (<version>)…**.
- The update asks first (**Update the sample?**: "The tree "…" is replaced by sample version … Changes made in the
  sample are lost. Other trees stay unchanged."). It then downloads the new sample and replaces the tree's data. The
  tree stays the same, with its name and settings: the default person (if the new sample has them), the default view
  and the saved views of the Table. At the end it says "The sample is updated to version <version>."
- **Limits:**
  - the sample is known by its mark, not by its name: a renamed sample is still only switched to and updated;
  - an update that does not work leaves the tree as it was;
  - a sample file opened that is newer than the sample tree offers the update straight from that file;
  - a standalone HTML file does not ask the web for the version.
- **Controls:** app: the notice **Update the sample…**; **Manage trees → ⋯ → Update the sample (<version>)…**
- **Since:** app 3.33.0

<!-- zdroj: app:src/ui/showcase-open-ui.ts openShowcaseFromUrl (existing → switchToShowcase, checkShowcaseVersion jen mimo embedded), checkShowcaseVersion (localStorage strom-sample-offered-<lang>, jednou za verzi), offerShowcaseUpdate, updateShowcase, replaceShowcaseTree, keepShowcaseSettings (defaultPersonId, defaultView, tableViews, lastFocus) · src/showcase-download.ts showcaseVersionUrl, newerShowcaseVersion · src/tree-manager.ts findTreeByExportId (exportId showcase-<lang>) · src/ui/tree-actions.ts sampleUpdate (jen Správa stromů) · strings.ts sample.newerTitle, update, notNow, updateTitle, updateConfirm, updated, updateMenu -->

<a id="S9.1.2"></a>
### S9.1.2 The Sample tag and deleting the sample

The sample tree has the tag **Sample** in the header after the tree's name, in the tree switcher and in **Manage
trees**. The tag's bubble says: "A made-up family for trying things out. Other trees stay unchanged; the sample can be
deleted in Manage trees."

- The sample's row in **Manage trees** gives the date the sample's data are as of ("as of <date>").
- The sample is deleted as any tree: **Manage trees → Delete tree…** with the usual confirmation. Other trees do not
  change.
- **Limits:** the tag goes with the tree's mark, not its name: a renamed sample keeps it. The small sample has the tag
  too ([S9.3](#S9.3)).
- **Controls:** app: the tag **Sample** (on a touch screen a tap shows the bubble); **Manage trees**
- **Since:** app 3.33.0

<!-- zdroj: app:src/ui/sample-tag.ts sampleTagHtml · src/tree-manager.ts sampleKindOf, markSampleTree · src/tree-row.ts treeSampleKind (showcase i demo) · src/ui/tree-management.ts tree-badge--sample, sample.asOf · strings.ts sample.tag, tagTitle, asOf · app 9ea6ca78, 3505db77, bc1c497d -->

<a id="S9.1.3"></a>
### S9.1.3 The sample's research, view only

The sample tree from the web or from the sample file brings along a snapshot of its research. The research overview,
what the research knows and the materials can be looked through right in the app, without installing the research and
without an AI subscription. Nothing is written into the snapshot, and nothing is sent from it anywhere.

- After the sample opens, the notice **The sample is open.**: "Its research can be browsed; changes are not sent to any
  research." In **Manage trees** the sample tree has the line "sample research · view only".
- The research overview has under its header "Sample as of <date>" and "View only in the sample – full research:" with
  the command `strom demo` ([S9.4](#S9.4)), the button **Copy** and the link **How to ↗** to the research's install
  page.
- The research's **main actions** stay visible, greyed out, with a mark: agent work, sending edits, a conflict, a
  conflict to the agent, a hypothesis, an answer, the queue order, processing at once, a new direction and a chat with
  the agent. A bubble (hover, focus or tap; Escape closes it) explains: **View only in the sample**, "In full research:
  <action> · <mark>" (**AI + terminal** or **terminal**, [S4.5.1](S4-research-from-the-app.md#S4.5.1)) and "Full
  research with the agent:" `strom demo` with **Copy** and **How to ↗**.
- The footer of the **Research** menu shows **View only in the sample**, and the menu "Changes are not sent to the
  research". **Send** is greyed out with an explanation on the sync bar and in **What will be sent** as well. On a
  phone, **Continue with the agent** and **Send** are greyed out in the **More** sheet; a tap says why.
- **Limits:**
  - other writes to the research and the house actions are not shown at all ([S10.13](S10-houses.md#S10.13));
  - edits of the sample tree stay in the app and do not go to the research;
  - no agent starts from the sample.
- **Controls:** app: the **Research** menu, the research overview, the bubble at a greyed-out action
- **Since:** app 3.33.0

<!-- zdroj: dirigent:spec/143-ukazkova-data K4, K4.1, úkol A2 · app:src/showcase-bridge.ts (most ze snímku, každý zápis 403 showcase.read-only) · src/research-link.ts SHOWCASE_ALLOWS (10 hlavních akcí zašedlé, house: 'hide') · src/ui/sample-why.ts sampleNoteEl, showcaseWhyContent · src/tree-row.ts treeOriginLine · src/ui/showcase-open-ui.ts · strings.ts sample.originLine, openedTitle, opened, asOfLine, readOnly, whyTitle, whyFull, whyWhat, copy, howTo, sync.sendOffLine, mobileMenu.more · app 73628eda, 617b893e, 0754e561, bdb0b181, 635112ff, c8de3d8c, 67351f80, 89f6c9a5 · nález N7: K4.1 „neaktivní s vysvětlením“ × kód ostatní zápisy skryje -->

<a id="S9.2"></a>
## S9.2 The sample file and the standalone HTML file

The sample file (`strom-ukazka-<language>.json`) is on the web to download beside the button **Try the sample**. In
the app it opens when dropped into the window or through **New tree → From JSON**, and then goes the same way as the
sample from the web ([S9.1](#S9.1)): a tree of its own with the tag **Sample** is made, opening it again only switches
to it, and a newer file offers the update ([S9.1.1](#S9.1.1)).

- The app knows a sample file by the header in the file, not by its name. Where the browser allows it, dragging it
  already shows "Drop here: open the sample".
- While it is read, the notice **Opening the sample** shows the file's name and size and the button **Cancel**.
- A standalone HTML file (saved HTML, [A7.7](A7-book-pages-and-export.md#A7.7)) does not download the sample. **Try
  the sample with research**, the link at an empty tree and `?demo=` open in it the window **Sample with research**
  with the choices **Download the sample file (stromapp.info) ↗** (opens the file on the web in a new window), **Open
  the small sample** and **Open a downloaded sample file…**.
- **Limits:**
  - a sample file always opens as a tree of its own, even when the import was meant for the open tree;
  - a file that cannot be read, or a file for a newer version of the app, is said in the window of [S9.3](#S9.3),
    without **Try again**.
- **Controls:** app: dropping the file into the window; **New tree → From JSON**; in a standalone HTML file **New tree
  → Try the sample with research → Open a downloaded sample file…**; web: the link **Sample file to download**
- **Since:** app 3.33.0

<!-- zdroj: app:src/ui/import-export.ts importDroppedJson (fileLooksLikeShowcase), JSON import isShowcaseFile → openShowcaseFromJson („whatever tree the import was meant for“) · src/showcase-format.ts (kind strom-showcase) · src/ui/showcase-open-ui.ts openShowcaseRead (opening, Zrušit do přečtení), showShowcaseEmbedded, pickShowcaseFile, openShowcaseFromUrl (embedded → showShowcaseEmbedded) · strings.ts sample.dropTitle, opening, embeddedTitle, embeddedLink, embeddedOpen, openSmall, treeManager.fromJson · web:js/i18n.js demo_file · app 33b82179 -->

<a id="S9.3"></a>
## S9.3 When the sample does not download: the small sample

When the sample does not download or cannot be opened, the app says why in one window. The window's main choice is
**Open the small sample**. The open tree does not change.

| When | Title of the window | Try again |
|---|---|---|
| the app is offline | **The sample did not download** | yes |
| the server answered with an error, or the download was interrupted | **The sample did not download** | yes |
| there is no room in the browser's storage | **No room for the sample** | no |
| the file is damaged or unknown (no header) | **The sample file cannot be opened** | no |
| the sample is for a newer version of the app | **The sample file cannot be opened** | no |

- The small sample is the tree **Sample: the Berg family**. It is in the app itself and opens without a network too.
  It is never connected to a research ([S1.3.1](S1-connecting-app-and-research.md#S1.3.1)).
- **Limits:**
  - the browser's storage must have free room for at least twice the sample's size. The app finds out before the
    download and during it, and stops the download at once when the room is short;
  - when the sample tree cannot be stored whole, the app deletes it again and opens the tree that was open before.
- **Controls:** app: **Open the small sample**, **Try again**, **Close**; the small sample also **New tree → Try the
  small sample** and the link **Try the small sample** at an empty tree.
- **Since:** app 3.33.0 (the small sample since app 3.29.0 under the name **Try a sample tree**)

<!-- zdroj: app:src/ui/showcase-open-ui.ts showcaseErrorText, showShowcaseError (retry jen offline a server), createShowcaseTree, dropShowcaseTree · src/showcase-download.ts downloadShowcase, showcaseRoomNeeded (2×), showcaseRoomShort, showcaseFetchFailure · src/ui/import-export.ts loadDemoTree, openDemoTree (markDemoTree) · index.html demo.tryDemoSmall (Nový strom, prázdný stav) · strings.ts sample.errTitle, errOffline, errServer, errSpaceTitle, errSpace, errBrokenTitle, errBroken, errFormat, retry, openSmall, demo.treeName, demo.tryDemoSmall · app b831dcdd -->

<a id="S9.4"></a>
## S9.4 The sample research: `strom demo`

`strom demo [cs|en|de|pl]` downloads the sample research from the Strom app's web, sets it up in a folder of its own
and opens it in the app as a research (as `strom app` does). All of it can be looked through without an AI
subscription: the research overview, the directions, the queue, the sources, the materials and the tasks waiting for a
person.

- The research downloads from `https://stromapp.info/demo/<language>/` the file `VERSION`, the package of that version
  and its SHA-256. It checks the package by its SHA-256 and unpacks it as `strom unpack` does (each image by its
  SHA-256, the whole tree checked).
- The sample research lies in the folder `demo` in the settings folder of `strom` (`~/.config/strom/demo`, on Windows
  `.config\strom\demo` in the user's folder), with settings, trees, a shared folder and a seal key of its own. Own
  family trees, their backups and settings do not change; the sample is not among the own trees. Its `strom.json` has
  `demo: true`.
- The research does not start an agent on the sample by itself, and the sample's bridge offers the app nothing of an
  agent: it names no agent and no runs, waiting tasks have no chat with the agent and no return to the agent, and it
  offers no reading of a document at once and no bulk verification. `strom demo` does not ask at the first opening
  whether the app may start the research.
- **From app 3.33.0:** the tree of the sample research has the tag **Sample** in the app ([S9.1.2](#S9.1.2)), and the
  app offers nothing of an agent for it.
- Without a language `strom demo` takes the language `strom` speaks in the terminal; when that is not one of the four
  languages, it takes `en`.
- **Limits:**
  - a second run for the same language downloads nothing and opens the sample already on the computer ("The sample
    research "…" is already here"); samples of several languages can be on the computer side by side;
  - a package whose SHA-256 does not match is not used and nothing is set up; the same for a package in another
    language than the one asked for, and for a package with connectors (a sample has none);
  - a sample research that cannot be set up whole is deleted again;
  - without the internet: "the sample research could not be downloaded", with the advice to run `strom demo` again
    once online;
  - the research refuses a language other than `cs`, `en`, `de`, `pl`.
- **Controls:** terminal: `strom demo`, `strom demo de`; web: the research's install page, the section **Sample
  research**
- **Since:** research 1.38.0
- **Why:** the sample is to be looked through without an AI subscription; an agent may work on it, but the research
  neither offers nor recommends one (decision of 25 Nov 2026).

<!-- zdroj: research:src/commands/demo.ts (demoBase, run: demoLang(ctx.uiLang()) ?? "en", had → jen otevřít, own Settings, c.demo = true, app.run, rm při chybě) · src/core/demo.ts DEMO_LANGS, DEMO_FOLDER, demoPaths, demoEnv, downloadDemo (SHA-256, demo.download, demo.damaged), unpackDemo (demo.lang, demo.code), DEMO_MAX_BYTES · src/core/paths.ts configDir · src/core/live.ts forDemo, DEMO_HIDDEN, tree.demo, agent/runs undefined, accepts (bez read) · src/core/waiting.ts demo (bez chat a retry) · src/commands/start.ts offerLinks (ne u ukázky) · assets/lang/cs.json ui.demo.*, ui.error.demo.* · dirigent:spec/143-ukazkova-data Rozhodnutí 25. 11., K2.1, K2.2 · web:js/i18n.js demo_cmd_title · research afed49d3, 97fc3a23, 8500b369, 3348ed20 · app:src/ui/sample-tag.ts researchDemoTree, src/research-device.ts storedResearchDemo, src/ui/research-sync-ui.ts activeResearchNoAgent · app a0c2a8bb, 8f6731a0 -->

<a id="S9.4.1"></a>
### S9.4.1 Deleting it: `strom demo --remove`

`strom demo --remove` ends the bridge of the sample research and deletes its whole folder: the samples of all
languages, their settings and seal keys. It deletes nothing else. The sample's copy in the app is deleted in the app,
in **Manage trees**.

- **Limits:**
  - while somebody is at work on the sample, the research does not delete it: "somebody is at work on the sample
    research — it is deleted once the work ends";
  - when the sample's bridge does not end, nothing is deleted;
  - with no sample on the computer: "No sample research is on this computer."
- **Controls:** terminal: `strom demo --remove`; app: **Manage trees → Delete tree…**
- **Since:** research 1.38.0

<!-- zdroj: research:src/commands/demo.ts removeDemo (anyoneAtWork → demo.atwork, stopLive → demo.bridge, rmSync root) · assets/lang/cs.json ui.demo.none, ui.demo.removed, ui.demo.removed.app, ui.error.demo.atwork, ui.error.demo.bridge -->
