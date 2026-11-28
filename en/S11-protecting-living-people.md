<a id="S11"></a>
# S11 Protecting living people

Details of living people leave the tree into files, onto paper and into shares. The app and the research tell two
kinds of outputs apart. An output **going out** (a file or paper that leaves one's hands, goes to another person or to
another program) always passes through one protection of living people: the same rule of who is living, the same
modes in the same order and the same default mode from Settings. An output **for oneself** (a backup, a transfer,
one's own genealogy program) carries full details on purpose and says so in a sentence. The chapter describes the
Strom app 3.33.0 and the research 1.38.0.

| Output | Kind | Where |
|---|---|---|
| **App with data (HTML)**, **GEDCOM › To share with others**, **Person table (CSV)** | going out | [S11.4](#S11.4), [A7.7](A7-book-pages-and-export.md#A7.7), [S6.6](S6-tree-from-another-program.md#S6.6) |
| **Send to a relative** and the change packet | going out | [S11.4](#S11.4) |
| **Poster** | going out | [S11.4](#S11.4) |
| **Family book**, **Linked pages** | going out | [A7.4](A7-book-pages-and-export.md#A7.4), [A7.5](A7-book-pages-and-export.md#A7.5) |
| the **Family pages** window and its print | going out | [S11.4](#S11.4) |
| **Person page**: window, print, **Save as HTML** | going out | [S11.4](#S11.4), [A7.6](A7-book-pages-and-export.md#A7.6) |
| **Save house page** | going out | [S10.3.2](S10-houses.md#S10.3.2) |
| the Table's export (CSV, XLSX), the list CSV | going out | [A6.7.9](A6-views.md#A6.7.9), [A11.9](A11-lists-of-people.md#A11.9) |
| **Give a family tree** | going out | [A7.9.2](A7-book-pages-and-export.md#A7.9.2) |
| research: `strom export gedcom --living` | going out | [S11.7](#S11.7) |
| **Data backup (JSON)**, **Save to file**, **Backups** | for oneself | [S11.5](#S11.5), [S6.5](S6-tree-from-another-program.md#S6.5) |
| **GEDCOM › Back to {program}**, GEDCOM for the research | for oneself | [S11.5](#S11.5), [S6.6](S6-tree-from-another-program.md#S6.6) |
| research: `output/tree.ged`, `strom pack` | for oneself | [S11.5](#S11.5) |

- **Limits:** channels inside are not outputs and the protection does not concern them: the bridge between the app
  and the research, the phone in the network and the research's agents.

<!-- zdroj: dirigent:spec/151-soukromi-zijicich-ve-vystupech (Princip 1–4, Kde se to ukáže) · app:61f9b492, 11d35186, 47500acc, fe52bfb2, bda4fd2c, fbc447a0, 355a550d, 51223455, 0ad8f5e9 (ověřeno na 988b0f86) · src/privacy.ts applyOutputPrivacy · src/ui/privacy-block.ts privacyBlockHtml · strings.ts privacy.label · CHANGELOG.md aplikace 3.33.0 · research:ccfe4110, 8a0fed12 src/gedcom/privacy.ts, src/commands/output.ts · CHANGELOG.md výzkumu 1.38.0 -->

<a id="S11.1"></a>
## S11.1 Who is a living person

One rule applies to all outputs of the app and the research. It decides in this order:

1. A person marked by hand as deceased (**Deceased**) is deceased. A person whose **Deceased** was unticked by hand is
   living.
2. A person with a record of death is deceased: a date, place, address, cause or age at death, or a burial or
   cremation. A burial or cremation without a date of death thus means a deceased person.
3. A person without any clue to the year of birth is living (the safe choice).
4. Otherwise the person is living when fewer than 110 years have passed since their latest possible year of birth.

- **The latest possible year of birth:**
  - each date counts by the latest year it can mean: a range by its end, "after the year X" gives no bound;
  - the person's own dates and events;
  - the start of a union and its events (banns, a household census): at least 14 years before them. The end of a
    union (a divorce filed, an annulment) does not count;
  - children: a parent is at least 12 years older than a child, across all generations.
- **The research** judges the same from the full GEDCOM file of the whole tree: a death is any line `DEAT`, `BURI` or
  `CREM`; the clues are the person's dated facts (except `CHAN` and own tags `_`), the family's facts `FAM` (except
  `DIV`, `DIVF`, `ANUL`) and children. A manual **Deceased** goes into the file as a death; a **Deceased** unticked
  by hand is not in the file. The app and the research share a table of cases in their tests.
- **Limits:**
  - the mark † at a person in the tree is a different rule (presumed deceased after 120 years) and does not control
    the protection;
  - the research has its own rule of 100 years for steering its own work (living people are not researched); it
    does not apply to outputs;
  - a placeholder person does not count among the living.
- **Controls:** the checkbox **Deceased** when editing a person; when a relative is added it is ticked by itself once
  a date or place of death is filled in. The help of the protection block sums the rule up.
- **Since:** app 1.2.0 (before as [A7.1](A7-book-pages-and-export.md#A7.1)); burial and cremation as death, date
  ranges by their end and the research: app 3.33.0, research 1.38.0

<!-- zdroj: app:61f9b492 src/privacy.ts isLivingPerson (isDeceased true/false, hasDeathRecord, bez meze = žijící, ASSUMED_MAX_AGE 110), inferBirthUpperBounds (latestYearOf, UNION_END_EVENTS, MIN_MARRIAGE_AGE 14, MIN_PARENT_AGE 12, fixpoint), countLivingPersons (bez isPlaceholder), presumedDeceasedSet · src/ui/person-modal.ts:2118 (deceasedToggled → isDeceased) · src/ged-exporter.ts:1892 (isDeceased true) · strings.ts privacy.who, person.deceased · research:ccfe4110 src/gedcom/privacy.ts ASSUMED_MAX_AGE, MIN_PARENT_AGE, MIN_MARRIAGE_AGE, latestYear, OWN_FACT, ENDS, livingOf · src/core/review.ts livingBorn, DEATH_AFTER_YEARS (beze změny) · test/fixtures/living-rule-cases.json (obě repa) -->

<a id="S11.2"></a>
## S11.2 Protection modes

Every output going out offers the same four modes in the same order.

| Mode | The name of a living person | What stays |
|---|---|---|
| **Full details** | unchanged | everything |
| **Initials + birth year** | initials of the given name and surname; the married surname only an initial | year of birth |
| **Surname only** | "Living person" and the surname | – |
| **Hide names** | "Living person" without a surname | – |

- **What a mode other than Full details removes from living people:** dates, places, addresses, ages and the cause;
  notes, stories, the photo and the original of the portrait; events, citations, name variants, titles, married
  surnames, the open question, e-mails, REFN, the research's data and the record of adding and changing.
- **Couples:** a union in which at least one partner is living loses its dates, place, address, ages, note,
  witnesses, stories, citations, events and the couple's photo. Initials keep the year the union began.
- **The deceased:** stay complete in all outputs and under every mode, sources, citations and attachments included.
  A source cited only by a living person drops out; attachments of living people and of their unions drop out.
- **Further:** the history of merges does not go into a protected output; a house where people of the last ~100
  years lived loses its name ([S10.3.2](S10-houses.md#S10.3.2)).
- **Limits:** the structure always stays: people, relationships and sex. The text of stories is not rewritten: a
  living person's story drops out with their details, a house's story is governed by the output's switch
  ([S10.14.2](S10-houses.md#S10.14.2)).
- **Controls:** the block **Protecting living people** in the output's dialog: the heading, where the mode comes from
  ([S11.3](#S11.3)), the help **?**, four choices and the mode's sentence with "The deceased stay complete, sources
  included." On a phone the choices have short names (**Full**, **Initials**, **Surname**, **No names**).
- **Since:** app 1.2.0 (before as [A7.2](A7-book-pages-and-export.md#A7.2)); uniform names, order and the sources of
  the deceased in all outputs app 3.33.0

<!-- zdroj: app:61f9b492 src/privacy.ts PRIVACY_ORDER, privacyModeLabel, stripDetails, stripPartnershipDetails, applyLivingPrivacy (merges, house name, keepDeceasedSources) · fe52bfb2 applyOutputPrivacy (keepDeceasedSources: true všude) · src/ui/privacy-block.ts privacyBlockHtml, privacyDescText · strings.ts privacy.label, modeFull, modeInitials, modeMinimal, modeAnonymous, short, desc.*, deceasedStay, livingPerson · dirigent:spec/151 K1.2, K1.4, Mimo rozsah (vyprávění) -->

<a id="S11.3"></a>
## S11.3 The default protection from Settings

All outputs going out have one default mode: **Settings › Data and privacy › Protecting living people in outputs**,
by default **Initials + birth year**. The choice in a dialog applies to that one output.

- **It is prefilled by** the export (HTML, GEDCOM to share, CSV), **Send to a relative**, the poster, the Table's
  export and saving the house page. The block then says "default from Settings" at the heading, with a link to
  Settings; after a change by hand this disappears.
- **For each tree the choice is remembered by** the family book and the linked pages (together), the person page and
  the gift. When a tree has no choice yet, the book, the pages and the person page take the default from Settings. A
  remembered choice has "last used for this tree" at the heading.
- **The Family pages window** starts from the choice of the tree's book and pages, otherwise from the default in
  Settings. A change in the window applies only to the window and is not written back.
- **The poster** takes the default from Settings when first opened and then keeps the last choice while the page is
  open.
- **The gift** always starts with **Initials + birth year** (not from Settings) and remembers the choice for the
  person or couple on this device ([A7.9](A7-book-pages-and-export.md#A7.9)).
- **Without living people:** when no living person is in the output, the block is folded into the sentence "There
  are no living people in this output." and the output goes with full details. A person page without living people
  starts with Full details.
- **Limits:** backups and transfers stay complete, Settings do not govern them ([S11.5](#S11.5)). House locations
  have their own setting **House location in outputs** ([S10.3.4](S10-houses.md#S10.3.4)).
- **Controls:** **Settings › Data and privacy › Protecting living people in outputs**; the link "Settings" in the
  protection block.
- **Since:** app 3.33.0; defaults by output before in [A7.2.1](A7-book-pages-and-export.md#A7.2.1)

<!-- zdroj: app:61f9b492 src/settings.ts getOutputPrivacy (výchozí initials), index.html output-privacy-setting · src/ui/privacy-block.ts originHtml (settings | tree), noLiving · strings.ts privacy.settingTitle, settingDesc, originSettings, originSettingsLink, originTree, noLiving · src/ui/encryption-ui.ts exportPresetPrivacy, exportPrivacyTouched · bda4fd2c src/ui/share-ui.ts, src/ui/export-image-ui.ts posterPrivacyChoice, src/ui/gift-tree-ui.ts (defaultGiftPrivacy others initials, originTree) · 355a550d src/ui/book-ui.ts:1262 (strom.book.{treeId}, jinak Nastavení), src/ui/family-pages-ui.ts windowPagesPrivacyPreset, src/ui/person-page-ui.ts:718, src/person-page.ts personPageExportPrivacy · 51223455 src/ui/house-page-ui.ts:578 · fbc447a0 src/ui/table-view/table-ui.ts showTableExport -->

<a id="S11.4"></a>
## S11.4 Outputs going out

Every output going out has the block **Protecting living people** ([S11.2](#S11.2)) with the default mode by
[S11.3](#S11.3). The details of the dialogs are with the outputs; here only what differs where.

- **Export:** **App with data (HTML)**, also **Export as app** for all trees, **GEDCOM › To share with others** and
  **Person table (CSV)**. The living are counted within the export's scope (whole tree, view, list, a person's
  family tree). A choice made by hand stays after switching the format ([A7.7](A7-book-pages-and-export.md#A7.7),
  [S6.6](S6-tree-from-another-program.md#S6.6)).
- **Send to a relative:** the default from Settings at each opening; the living are counted within the scope (whole
  tree, branch, person). The scope **Only the changes since the last share** has no choice: the change packet goes
  with the same protection as the original share ("Changes are shared with the same protection as the original
  share: {mode}."). When the original protection is not known (a share from an older version), the default from
  Settings is used and the dialog says so.
- **Poster:** the dialog **Export as poster** (SVG, PNG, Print / PDF). The living are counted among the people of the
  poster. The mark † and the colours of family lines come from the protected data: only people the rule
  [S11.1](#S11.1) holds deceased have †.
- **Family book** and **Linked pages:** the living are counted in the whole tree. The cover of a protected book says
  "Details of living people are shortened."; with Full details the pages warn that they will carry details of living
  people ([A7.4](A7-book-pages-and-export.md#A7.4), [A7.5](A7-book-pages-and-export.md#A7.5)).
- **The Family pages window:** the choice in the window's bar **Protection: {mode} ▾** (on a phone the first item of
  **⋯**), only when there are living people in the window. The window and its print show the pages by it.
- **Person page:** the window has the same choice in the bar before **Print**; the window and the print follow it
  ("The window and its print follow this choice. Prefilled from saving the person page."). **Save as HTML** has the
  block after the file name and under it a line on whom it concerns ("Applies to living people only: …")
  ([A7.6](A7-book-pages-and-export.md#A7.6)).
- **Print** from the Family pages window and from the person page has, under protected pages, the footer "… ·
  protected: {mode} · page N", only when there are living people on them.
- **Save house page:** the names of living people and of people of the last ~100 years by the mode
  ([S10.3.2](S10-houses.md#S10.3.2)).
- **The Table's export** (CSV, XLSX) and **List CSV:** the row of a living person stays; it has the name by the mode,
  the year of birth only under Initials and the columns **#** and **Done**, the other columns are empty ("Living
  people: name as protected, other columns empty."). A protected XLSX has no colours or comments of findings. The
  Table on screen does not change ([A6.7.9](A6-views.md#A6.7.9), [A11.9](A11-lists-of-people.md#A11.9)).
- **Give a family tree:** the same names and order of modes for **Other living people**; the recipient's household
  and the exceptions go in full ([A7.9.2](A7-book-pages-and-export.md#A7.9.2)).
- **A protected file** (HTML, JSON, GEDCOM) carries a mark of how many living people it protects
  ([S11.6](#S11.6)).
- **Limits:** without living people in the output everything goes with full details and there is no mark.
- **Since:** app 3.33.0

<!-- zdroj: app:11d35186, fe52bfb2 src/ui/encryption-ui.ts exportPresetPrivacy, exportLivingCount, src/ui/import-export.ts:589 (applyLivingPrivacy, privacyMarkFor) · bda4fd2c src/ui/share-ui.ts (getBaselinePrivacy ?? Nastavení), strings.ts share.samePrivacy, share.privacyUnknown, share.scopeChanges · src/ui/export-image-ui.ts posterPrivacyMode, :475 (deceased = !living) · 355a550d src/ui/book-ui.ts, strings.ts book.coverProtected, familyPages.privacyWarn · src/ui/family-pages-ui.ts winPrivacy, windowSetLiving · src/ui/person-page-ui.ts pv-compact, strings.ts privacy.compactPrefix, windowLine, personPage.privacyWho · 0ad8f5e9 src/ui/privacy-block.ts windowPrintFooterCss, privacy.printProtected, printPage · 51223455 src/ui/house-page-ui.ts · fbc447a0 src/ui/table-view/table-privacy.ts protectTableExport (LIVING_KEPT, checks null), table-ui.ts exportPersonListCsv, strings.ts table.exportPrivacyWhat, exportListTitle · src/ui/gift-tree-ui.ts (PRIVACY_ORDER, privacyModeLabel) -->

<a id="S11.5"></a>
## S11.5 Outputs for oneself

Outputs for backup and transfer carry full details of all people, the living too. When the tree has living people,
they say so in a sentence: "Contains all details of living people – for an own backup or transfer, not for sharing."

- **Data backup (JSON)** and **Export all trees › Export as JSON:** start with **Full details**, without an origin
  and with the sentence; the block can be changed. A protected backup carries the mark ([S11.6](#S11.6)).
- **Backups** (the window **Backup history**): the sentence under the window when the tree has living people
  ([S6.5](S6-tree-from-another-program.md#S6.5)).
- **GEDCOM › Back to {program}:** no protection block; instead the sentence and the count: "The file contains data of
  N living people. It belongs only in one's own program." ([S6.6](S6-tree-from-another-program.md#S6.6)).
- **GEDCOM for the research:** **Send changes to the research › Export GEDCOM** has the sentence in the confirmation.
- **Save to file** (the quick save, Ctrl+S) does not change: a full JSON without the block and without the sentence
  ([S8.1](S8-where-the-data-are.md#S8.1)).
- **Research:** `strom export gedcom` writes the full `output/tree.ged` (and the file for the Strom app) as before and
  prints the sentence; `strom pack` prints the sentence too. The help of both says so.
- **Limits:** in the app the sentence shows only for a tree with living people; the research prints it with every
  full file.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:47500acc src/ui/encryption-ui.ts isSelfFormat (json, all), exportPresetPrivacy (full, origin null), :853 self · src/ui/export-gedcom-ui.ts:196 export-back-living (selfOnly + exportGed.livingNote) · index.html:40323 snapshots-self, src/ui/snapshots-ui.ts:76 · src/ui/research-ui.ts:3388 offerResearchGedcom selfLine · strings.ts privacy.selfOnly, exportGed.livingNote, research.sendHowTitle, sendExportGedcom · research:ccfe4110 src/commands/output.ts (ui.living.all u plného souboru), src/commands/pack.ts, src/cli/ui.ts ui.living.all · dirigent:spec/151 K3.1 -->

<a id="S11.6"></a>
## S11.6 A protected file and its import

A file with living people protected says which mode made it and how many living people it protects. Such a file is
never a source of changes to a tree: the missing details of living people would look deleted.

- **The mark:** GEDCOM in the header `1 _STROM_PRIVACY initials|surname|hidden` and `2 _LIVING N`; JSON and the data
  of an HTML file the field `privacy` (`mode`, `living`). In the file the modes are named as in the research: Surname
  only `surname`, Hide names `hidden`. Full details and an output without living people have no mark. A protected
  file never carries a link to a research.
- **Import in the app:**
  - the GEDCOM import summary, **Import as new tree** and step 1 of the merge guide say: "The file is protected
    ({mode}): the details of N living people are missing from it.";
  - the guide starts with the choice **New tree**; the new tree is named "{file} (protected copy)";
  - with **Add to a tree** step 1 adds "The living are added as protected (without details)." A joined protected
    person does not overwrite names or dates in the tree;
  - the link of a JSON to a research is not taken over;
  - a protected research file never opens as the research's tree nor updates it, and live following refuses it; it
    goes only to the import guide ([A2.1.1](A2-loading-a-family-tree.md#A2.1.1), [A8.6](A8-merging-trees.md#A8.6)).
- **Research:**
  - `strom sync` refuses a protected GEDCOM and an app JSON with the field `privacy`: "{file} is a file with the
    living protected ({mode}): the details of N living people are missing in it — never a source of changes", with
    the advice to take a full export from the app;
  - `strom intake` keeps it only as material and does not take it into the tree.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:47500acc src/privacy.ts PrivacyMark, PRIVACY_MARK_FIELD, privacyFileMode, parsePrivacyFileMode, readPrivacyMark, privacyMarkFor, privacyMarkJson, protectedPersonIds · src/ged-exporter.ts _STROM_PRIVACY, _LIVING · src/ged-parser.ts:5661 privacyMarkOf · src/ui/import-export.ts:607 (bez research), :818 openGedcomGuide protectedImport, :977 gedcom-protected, :1436 pendingImportPrivacy (bez research), :1500 protectedCopyName, :1930 import-tree-protected · src/merge/ui.ts:233 (initialMode new), :726 protectedIds · src/merge/plan.ts:306, :496 · src/merge/write.ts:106 newTreeName · src/merge/steps/step1-what.ts merge-s1-protected, merge-s1-protected-merge · src/ui/research-ui.ts:2869, :4394, :4990 header.protected · strings.ts privacy.importProtected, importProtectedMerge, protectedCopyName · research:ccfe4110 src/gedcom/privacy.ts jsonPrivacyOf, treeFilePrivacyOf · src/core/sync.ts:1738 tree.protected · src/commands/intake.ts:328 ui.intake.protected · src/cli/ui.ts ui.error.tree.protected -->

<a id="S11.7"></a>
## S11.7 Protection in the research's files

`strom export gedcom` writes full files into `output/` as before. A file to share with living people protected is
made by the option `--living`, or by the setting `gedcom.living`.

- **Modes:** `--living initials` (initials + birth year), `surname` (surname only), `hidden` (names hidden), `full`
  (full data); the app's names `minimal` and `anonymous` work too. A bare `--living` takes the setting
  `gedcom.living`, and when it is full, `initials`. An unknown mode is an error.
- **What a protected file carries:**
  - a living person the name by the mode, sex and links; under Initials the year of birth;
  - a family with a living partner the partners, children and the fact of a marriage or divorce; under Initials the
    year of marriage;
  - no other record points to a living person; a source cited only by living people is left out;
  - the deceased are as they were;
  - the header has the mark ([S11.6](#S11.6)) and no link to the research.
- **Where it goes:**
  - without `--out`: `output/tree-<mode>.ged` (with `--research G…` `output/G…-<mode>.ged`, for the app
    `…-strom-<mode>.ged`). Such files are in `.gitignore` and never go into the research's history;
  - `--out <file>` outside the research folder; a protected file elsewhere into the research folder is an error ("a
    file with the living protected goes into the research folder only as {file} (never into the history)"). A path
    to its own file in `output/` written differently (capital letters, a link) is written as that file.
- **The setting `gedcom.living`** ("Protection of the living in GEDCOM files going out", by default full data):
  - `--out` without `--living` writes by it;
  - when it is not full, `strom export gedcom` without `--out` and `--living` writes a protected file beside the full
    files.
- **Listing:** at a protected file "N living people protected ({mode})". At a full file the sentence of
  [S11.5](#S11.5) and the hint "→ a file to give away, the living protected: strom export gedcom --living" when no
  protected file was made.
- **`--research G…`** gives only the people of one research: the central person, their ancestors and partners. It
  leaves out siblings and side branches. Only `--living` protects the living; both options go together.
- **Limits:** `output/tree.ged` stays full and in the history as before. The app calls none of this; it is the
  terminal only.
- **Controls:** terminal: `strom export gedcom --living [mode]`, `--out`; `strom config set gedcom.living <mode>`
  (also `--for-tree`, the variable `STROM_GEDCOM_LIVING`); examples `strom export gedcom --living --out
  ~/Desktop/horakovi.ged` and `strom export gedcom --for standard --living surname`.
- **Since:** research 1.38.0

<!-- zdroj: research:ccfe4110 src/gedcom/privacy.ts LIVING_MODES, MODE_ALIASES, livingModeOf, protectGedcom · src/commands/output.ts gedFile (-<režim>), IGNORE (output/*-<režim>.ged), export gedcom (setting, living, beside, holdsPath, pathForms, export.living.in-tree, export.living.mode, inTree bez living, ui.export.living, ui.living.all, ui.export.living.hint), help --research, --living, --out · 8a0fed12 (vlastní soubor output/ pod jiným zápisem, odkazy) · src/core/config.ts:376 gedcom.living (STROM_GEDCOM_LIVING, tree, výchozí full) · src/core/phrases.ts log.setting.name.gedcom.living · src/cli/ui.ts ui.living.mode.*, ui.error.export.living.in-tree · strom help export gedcom -->
