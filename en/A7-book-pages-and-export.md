<a id="A7"></a>
# A7 Book, pages and export

What the Strom app puts out of the tree (the family book, pages, files for the family and for other programs). The
protection of living people in all outputs is described in [S11](S11-protecting-living-people.md). Describes the
app 3.21.2; changes from a newer version carry its number.

| Output | What it is |
|---|---|
| **Family book** | a book to read from the start, to print on A4 or save as HTML ([A7.4](#A7.4)) |
| **Family pages**, **Tree pages** | a linked set of pages of family lines, families and people ([A7.5](#A7.5)) |
| **Person page** | the whole life of one person, to view, print and save as HTML ([A7.6](#A7.6)) |
| **App with data (HTML)** | a standalone file with the app and the tree ([A7.7](#A7.7)) |
| **Send to a relative** | one file by e-mail to open, complete and send back ([S11.4](S11-protecting-living-people.md#S11.4)) |
| **Poster** | the current view as SVG, PNG or a multi-page PDF ([S11.4](S11-protecting-living-people.md#S11.4)) |
| **Give a family tree** | a ZIP package with the family tree of one person or a couple: cover letter, app, pages, book, fan, GEDCOM ([A7.9](#A7.9)) |
| **Data backup (JSON)**, **GEDCOM**, **Person table (CSV)** | data for restoring and for other programs ([A2](A2-loading-a-family-tree.md)); the backup is an output for oneself ([S11.5](S11-protecting-living-people.md#S11.5)); custom columns, filter and sort: the export from the Table view ([A6.7.9](A6-views.md#A6.7.9)) |

- The backup and the app with data can be encrypted with a password (**Encrypt with a password**); GEDCOM cannot.
  Encryption works only at a secure address: over https, on `localhost` or `127.0.0.1` and in a file opened from the
  disk; not at an `http://` address in a network, and the password dialog says so ([A1.1](A1-the-app-in-brief.md#A1.1)).

<!-- zdroj: app:strings.ts importExport.app, importExport.share, importExport.poster, importExport.book, importExport.backup, importExport.gedcom, importExport.csv · src/ui/import-export.ts (exportTargetTreeJSON, exportTargetTreeApp s heslem; GEDCOM bez hesla) · šifrování jen na zabezpečené adrese: src/crypto.ts isCryptoAvailable, src/crypto-errors.ts resetPasswordError, strings.ts encryptToggle, insecureContext, commit 266d6a76, dirigent:prace/1110-app-github-11-13 -->

<a id="A7.1"></a>
## A7.1 Who is a living person

No longer valid from app 3.33.0, replaced by [S11.1](S11-protecting-living-people.md#S11.1): one rule for all
outputs of the app and the research.

<!-- zdroj: app:61f9b492 src/privacy.ts isLivingPerson · dirigent:spec/151 K1.1 -->

<a id="A7.2"></a>
## A7.2 Privacy of living people

No longer valid from app 3.33.0, replaced by [S11.2](S11-protecting-living-people.md#S11.2) (protection modes)
and [S11.4](S11-protecting-living-people.md#S11.4) (outputs going out).

<!-- zdroj: app:61f9b492, fe52bfb2 src/privacy.ts PRIVACY_ORDER, applyOutputPrivacy · dirigent:spec/151 K1.2, K1.4 -->

<a id="A7.2.1"></a>
### A7.2.1 Default privacy by output

No longer valid from app 3.33.0, replaced by [S11.3](S11-protecting-living-people.md#S11.3): one default mode from
Settings for all outputs going out.

<!-- zdroj: app:61f9b492 src/settings.ts getOutputPrivacy · dirigent:spec/151 K1.3 -->

<a id="A7.3"></a>
## A7.3 Content of the file

In the export, next to privacy, the **Content** is chosen: what is saved into the file.

| Preset | Photos | Attachments and source clippings | Notes | Sources and citations |
|---|---|---|---|---|
| **Complete archive** | yes | yes | yes | yes |
| **Small file to send** | no | no | yes | yes |
| **Bare skeleton** | no | no | no | no |

- **Limits:** the structure of the tree and the names always stay. The research's workshop (queue, tasks, drafts of
  stories) never goes into an export. The privacy option can leave out sources and attachments even with Complete
  archive ([S11.2](S11-protecting-living-people.md#S11.2)).
- **From app 3.30.0:** the choice **What to export** has besides **Whole tree** and **Current view only** also
  **List of people**: the JSON backup and GEDCOM with only the people of the list ([A11.9](A11-lists-of-people.md#A11.9)).
- **From app 3.33.0:** **What to export** also has **Person’s family tree…** ([A7.9.6](#A7.9.6)). **Current view
  only** and Person’s family tree work in all export formats: **Send to a relative**, **App with data (HTML)**,
  **Data backup (JSON)**, **Poster**, **Family book**, **Linked pages**, **GEDCOM** and **Person table (CSV)**;
  before only the JSON backup and the poster. The output of the view opens on the person in focus. Only **Link to a
  file…** stays with the whole tree.
- **From app 3.30.0:** **Photos** also include the originals of portraits and the couples' photos. Without photos
  these disappear too, also when attachments are exported; without attachments, portraits stay without the link to
  the original ([A12.7](A12-portrait-and-couple-photo.md#A12.7)).
- **From app 3.33.0:** the protection leaves out only sources cited only by living people and the attachments of
  living people and their unions; the sources, citations and attachments of the deceased stay in all formats
  ([S11.2](S11-protecting-living-people.md#S11.2)). The block **Protecting living people** starts with the default
  mode from Settings, the JSON backup with Full details ([S11.3](S11-protecting-living-people.md#S11.3),
  [S11.5](S11-protecting-living-people.md#S11.5)).
- **Since:** app 2.4.0

<!-- zdroj: app:src/privacy.ts CONTENT_PRESETS, stripResearchWork · strings.ts privacy.contentLabel, privacy.presetComplete, privacy.presetSmall, privacy.presetSkeleton, privacy.dropsSourcesContent · 3.30.0: app:33fa6cd4 src/ui/import-export.ts scope 'list', strings.ts exportMenu.scopeLabel, scopeWhole, scopeView, scopeList · 3.33.0: app:index.html data-view-ok, data-person-ok (všechny volby kromě Propojit se souborem), src/ui/import-export.ts exportScoped (pohled: defaultPersonId = fokus), commit 6408f8f9, strings.ts exportMenu.scopePerson, familyPages.exportPages · 3.33.0: app:fe52bfb2 src/privacy.ts applyOutputPrivacy (keepDeceasedSources), src/ui/encryption-ui.ts exportPresetPrivacy -->

<a id="A7.4"></a>
## A7.4 Family book

The family book is a book to read from the start: a family tree, families by generations, stories and sources.

- **What goes in the book:** **Whole tree** · **Family lines** (one or more) · **Ancestors of a person** ·
  **Descendants of a person** (the choice of people [A7.4.1](#A7.4.1)).
- **Parts of the book** in this order: **Contents**, **Family line tree**, **Families** (always), **Stories**, **Life
  chart and timeline**, **The times (history)**, **Sources**, **Record clippings and photos**, **Other families**,
  **Person index**.
- A part without content is left out and the dialog says why: Stories needs stories, the chart a level of detail
  other than brief, The times history, Sources cited sources, Clippings a photo or a clipping. Other families are only
  in the book of the whole tree.
- **Preset:** **For the family** (all parts, the usual level of detail, without notes and data for researchers) ·
  **For researchers** (full detail, notes, data for researchers: state of evidence and conflicts,
  [R3.8](R3-verification-and-citation.md#R3.8)) · **Custom**. The default is Whole tree, For the family, Initials +
  birth year and the language of the app.
- The **Title** is made from the choice (the tree's name, the family line, Ancestors: name, Descendants: name) and can
  be rewritten.
- **Book language** changes headings and labels; data from the tree are not translated.
- The options are remembered for each tree.
- **Controls:** export **Family book**; the book window: printing on A4 and **Save as HTML**.
- **Since:** app 3.19.0; the preset Custom app 3.21.0
- **From app 3.30.0:** the part **Record clippings and photos** also puts the couple's photo into the family's chapter,
  above the couple's events; a tree whose only pictures are couples' photos offers that part
  ([A12.6](A12-portrait-and-couple-photo.md#A12.6)).
- **From app 3.33.0:** the choice **House** (a book about one house), the part **Houses** and the **Index of houses**
  ([S10.10](S10-houses.md#S10.10)); in the part **Houses** the story of the house (a draft too, without the tag),
  the pictures of the house and the town and, with the switch **House locations and maps**, a cut of the map
  ([S10.14.2](S10-houses.md#S10.14.2), [S10.7.1](S10-houses.md#S10.7.1), [S10.3.4](S10-houses.md#S10.3.4)). In
  **Parts of the book** the part **Houses** has the switch **Stories of houses with living people** (on by default);
  off, it leaves out a story in which a living person appears. It is offered only when the book has such a story.
- **From app 3.33.0:** the protection of living people is the block **Protecting living people**
  ([S11.2](S11-protecting-living-people.md#S11.2)). A tree without a remembered choice starts with the default mode
  from Settings, otherwise "last used for this tree"; the book shares the choice with the linked pages
  ([S11.3](S11-protecting-living-people.md#S11.3)). The living are counted in the whole tree; the cover of a
  protected book says "Details of living people are shortened." The switch **House locations and maps** is prefilled
  from Settings ([S10.3.4](S10-houses.md#S10.3.4)).

<!-- zdroj: app:src/book-options.ts (části, předvolby, výchozí :55) · strings.ts book.dlg.kind, book.dlg.parts, book.dlg.preset, book.dlg.lang, book.parts, book.unavailable · CHANGELOG.cs.md 3.19.0, 3.21.0 · 3.33.0 vyprávění o domě: app:28099151 src/book.ts houseStoryForOutput, src/book-houses.ts (bez štítku), src/book-options.ts housesStoryWithLiving, bookHouseStoriesLiving, src/ui/book-ui.ts book-house-stories, strings.ts book.dlg.houseStoriesLiving, houseStoriesLivingHint · ochrana: app:355a550d src/ui/book-ui.ts:1262 (strom.book.{treeId}, jinak Nastavení), strings.ts book.coverProtected · přepínač: app:51223455 src/ui/book-ui.ts:485, :1264 houseMaps, strings.ts outputHouseLocation.housesSwitch -->

<a id="A7.4.1"></a>
### A7.4.1 Choice of people for the book and the pages

| Choice | People | Order |
|---|---|---|
| Whole tree | all people | by birth |
| Family lines | members of the family lines with their families, and the members' wives and husbands | a chapter for each family line |
| Ancestors of a person | ancestors up to the chosen number of generations and the unions the members come from | generation by generation, father before mother |
| Descendants of a person | descendants up to the chosen number of generations through sons and daughters, with partners and all unions | by birth |
| Selected people (pages only) | only the selected people; a family only when both partners are selected | – |

- **Limits:** the line of ancestors and descendants is carried by biological and adoptive parents. A step-parent and
  a foster parent do not carry the line. The father means the male parent, biological before adoptive.
- **Since:** app 3.19.0; Selected people app 3.21.0
- **From app 3.33.0:** the choice **Person’s family tree** (ancestors and their families) in the book and the pages:
  the people of the chosen person's gift cut with the choice **Families of the ancestors up to** ([A7.9.1](#A7.9.1));
  the family chapters run by generation from the oldest ancestors. The book's title is “Family tree of name”. A child
  outside the cut may also be named in a chapter's family.

<!-- zdroj: app:src/lineage.ts selection, :279 isDescentLink · strings.ts book.dlg.kind, book.dlg.kindHint · 3.33.0: app:src/book-model.ts kind 'gift' (giftCutIds, giftLevels: generace od nejstarších), src/book-options.ts titleGift, src/ui/book-ui.ts giftDepth, commity 6408f8f9, 040aaaaf · dirigent:prace/1126-app-093-darovat-rodokmen (B5: kniha jmenuje i dítě mimo výřez) -->

<a id="A7.5"></a>
## A7.5 Family pages and tree pages

The pages are a linked set of pages: the family line, families and people with links between them and with indexes
of people, families, surnames and towns.

- **Family pages:** one or more family lines ([A4](A4-surnames-and-families.md)).
- **Tree pages:** **Pages for the whole tree** (all family lines and Other families), **Selected people**, the
  ancestors of a person with a chosen number of generations.
- Privacy of living people and sources as in [S11.2](S11-protecting-living-people.md#S11.2); default Initials + birth
  year.
- A protected living person has no page of their own and no link; in the index they are under the protected name.
- **Since:** Family pages app 3.20.0; Tree pages app 3.21.0
- **From app 3.33.0:** the option **Houses**: houses with history, the index of houses and a page for each house
  ([S10.10](S10-houses.md#S10.10)), at a house also the story (a draft too, without the tag), the pictures of the
  house and the town and a cut of the map with its location ([S10.14.2](S10-houses.md#S10.14.2),
  [S10.7.1](S10-houses.md#S10.7.1), [S10.3.4](S10-houses.md#S10.3.4)). At the option **Houses** there is the switch
  **Stories of houses with living people** (on by default); off, it leaves out a story in which a living person
  appears. It is offered only when the house pages have such a story. A draft story of a person or a couple is in the
  pages without the tag **Draft** ([A7.8](#A7.8)).
- **From app 3.33.0:** the protection of living people as in the book ([A7.4](#A7.4)): the block **Protecting living
  people**, the choice shared with the book, otherwise the default from Settings; with Full details the dialog warns
  that the pages will carry details of living people. The **Family pages** window in the app has the choice in the
  bar **Protection: {mode} ▾**; the window and its print follow it and it is not written back
  ([S11.4](S11-protecting-living-people.md#S11.4)). The switch **House locations and maps** is prefilled from
  Settings ([S10.3.4](S10-houses.md#S10.3.4)).

<!-- zdroj: app:src/family-pages.ts · strings.ts familyPages.menuItem, familyPages.treePages, familyPages.treePagesAction, familyPages.indexTitle · spec 026 · CHANGELOG.cs.md 3.20.0, 3.21.0 · 3.33.0 vyprávění: app:28099151 src/family-pages.ts houseStoriesLiving, src/family-pages-html.ts setStoryHouses, coupleChapterHtml bez draftTag, src/house-page.ts storyLiving, src/ui/book-ui.ts syncPages book-house-stories, src/book-memory.ts PagesChoices.houseStoriesLiving · chráněná osoba bez stránky: src/family-pages.ts isProtectedPerson · 3.33.0 ochrana: app:355a550d src/ui/book-ui.ts, src/ui/family-pages-ui.ts windowPagesPrivacyPreset, setWindowPagesMode, strings.ts familyPages.privacyWarn, privacy.compactPrefix · 0ad8f5e9 windowPrintFooterCss · přepínač: app:51223455 -->

<a id="A7.5.1"></a>
### A7.5.1 History on the timeline of a line

The timeline of a line (**Timeline of the line →** on a line's page) shows the history in the line's places with the
symbol of its kind.

- **History of a country or region** is vertical bands across the chart with the kind's symbol on top.
- **Local history** (**Local history**, **From research sources**) of a place that has its own row in the chart is a
  symbol on the place's row in the colour of its origin. A place without a row has a vertical band like the history of
  a country.
- **The list:** a history row has the kind's symbol in the colour of its origin. After the text comes the place; for
  the history of a country or region its name, only when the line's history comes from at least two countries or
  regions.
- **Kinds of history:** a second row of chips under **Kinds of events**: **All** and the kinds of history on the page,
  each with its symbol. The chosen kinds keep only their rows, bands and symbols. The row is there only with at least
  two kinds and only with the page's script; with the chip **History** off it is gone.
- The chip **History** in **Kinds of events** has the symbol of the kind "other".
- **Controls:** family pages: **Timeline of the line →**, the chips **Kinds of events** and **Kinds of history**
- **Since:** app 3.31.0

<!-- zdroj: app:6caa471e src/family-pages-html.ts tlSymHtml, tlScopeClass, onRow (scope ≠ region a obec s řádkem → symbol na řádku, jinak pruh se symbolem sp-tl-bandsym), histChips (rodTimelineHistKinds > 1, js-only, Vše + druhy), řádek seznamu (symbol, place ?? region), čip hist se symbolem other, skript data-hk-off · src/rod-timeline.ts RodTimelineHistory scope, region (jen při ≥ 2 regionech), rodTimelineHistKinds · src/family-pages-css.ts (skrytí s vypnutými Dějinami) · strings.ts familyPages.tlLink, tlKindsLabel, tlKinds.hist, tlHistNote, tlHistKindsLabel, history.filterAll · dirigent:spec/121 „Časová osa rodu stejně jako hlavní osa“, Rozhodnutí 20. 11. (místní na řádku obce) -->

<a id="A7.6"></a>
## A7.6 Person page

The **Person page** shows the whole life of one person: dates in words, the family as a small family tree, stories,
the places of the life on a map, a life axis with history, clippings from registers and sources, and the section
**For researchers**.

- **Save as HTML** creates one self-contained file that opens offline in any browser. Groups of content and the
  privacy of living people can be chosen ([S11.3](S11-protecting-living-people.md#S11.3)); the choice is remembered.
- **From app 3.28.0:** in the app's window **◎ Ancestors' path on the map ›** leads to the person's ancestors' path
  in Migration over time ([A6.5.4](A6-views.md#A6.5.4)). A saved page does not have it. It stands in the section
  **Places of life**; a person with at most one place of their own who has ancestors on the map has it on its own row
  where the section would be.
- **From app 3.30.0:** the gallery **Images and documents** starts with the photo of each of the person's unions
  (“{A} and {B} · couple’s photo”). The enlarged portrait with an original has the switch **Portrait** | **Whole
  photo**, a saved page the link **Whole photo** when the file carries that photo. ⋯ **More actions** offers **Edit
  portrait crop** ([A12.3](A12-portrait-and-couple-photo.md#A12.3), [A12.6](A12-portrait-and-couple-photo.md#A12.6)).
- **From app 3.33.0:** a story from the research not yet approved has the tag **Draft** only in the person page in the
  app's window. A saved page gives it the same way as an approved story, without the tag; so too a couple's story and
  its link ([A7.8](#A7.8)).
- **From app 3.33.0:** the person page's window has in the bar before **Print** the choice **Protection: {mode} ▾**
  (on a phone the first item of **⋯**), only when there are living people on the page. It starts with the choice of
  saving the person page, otherwise with the default from Settings; the window and the print follow it. The print of
  a protected page has "protected: {mode}" in the footer. **Save as HTML** has the block **Protecting living people**
  after the file name and the line "Applies to living people only: …"; without living people it starts with Full
  details ([S11.4](S11-protecting-living-people.md#S11.4)).
- **Controls:** the menu of a person's card, **Person page**; also from the fan.
- **Since:** app 3.18.0

<!-- zdroj: app:src/person-page.ts · strings.ts personPage.save, fan.personPage · CHANGELOG.cs.md 3.18.0 · 3.28.0: app:src/person-page-map.ts pp-map-path (jen mode app), src/ui/person-page-ui.ts personPageMapPath, commit 34e82d43 · mapPathRowHtml (bez oddílu Místa života), commit caea192a · 3.33.0: app:28099151 src/person-page.ts storyDraftTagged (c.app a links app), draftTag, coupleChapterHtml draftTag, coupleChapterLinkTip · app:43794e42 src/__tests__/couple-story-chapter.test.ts · app:d3e9cdfd e2e/person-page.spec.ts · ochrana: app:355a550d src/ui/person-page-ui.ts:718 (getPersonPageExport, jinak Nastavení), pv-compact, src/person-page.ts personPageExportPrivacy, strings.ts privacy.windowLine, personPage.privacyWho · 0ad8f5e9 windowPrintFooterCss -->

<a id="A7.7"></a>
## A7.7 Saved HTML (a standalone file)

**App with data (HTML)** saves the app and the tree into one file that opens in any browser without installation.
**Export as app** in **Export all trees** puts all trees into one file.

- Such a file has its own storage in the browser. It does **not synchronize** with the app on stromapp.info; changes
  are kept by **Save file** (downloads a copy) and are moved into the web app by an import (**From HTML file**).
- **Limits:** by default the file protects living people (Initials, [S11.3](S11-protecting-living-people.md#S11.3)).
- **Since:** app 1.0.0
- **From app 3.33.0:** the default mode comes from Settings, also for **Export as app** for all trees (before Full
  details). A protected file carries the mark ([S11.6](S11-protecting-living-people.md#S11.6)). A tree with a house
  with a location has the switch **House locations and maps**, prefilled from Settings
  ([S10.3.4](S10-houses.md#S10.3.4)).

<!-- zdroj: app:strings.ts importExport.app, importExport.appDesc, importExport.exportAllApp, importExport.fromHtml, embeddedMode.* · src/ui/import-export.ts · 3.33.0: app:11d35186 src/ui/encryption-ui.ts exportPresetPrivacy (html: Nastavení), src/export.ts exportAllAsApp · 47500acc privacy · 51223455 src/ui/encryption-ui.ts setupExportHouseLocation, index.html export-house-location -->

<a id="A7.8"></a>
## A7.8 Stories

A story is continuous prose about a person or a marriage, written on top of the tree's facts. It is not a source:
sources document the facts, a story only retells them ([A3.6](A3-evidence-in-the-app.md#A3.6)).

- **Where it shows:** the **Story** window (from the person card menu), the person page ([A7.6](#A7.6)) and, in the
  family book, the **Stories** part after **Families** ([A7.4](#A7.4)). A couple's story, one per marriage, comes
  under the person's own; in the book it has its own subchapter.
- **Text format:** a blank line separates paragraphs; a line `## …` is a subheading; lines `- …` are bullets;
  `**bold**` and `*italic*`. Other marks stay plain text. Neither `* 1831` (birth) nor `1. ledna` at the start of a
  line starts a bullet. An opening `# …` that only repeats the chapter subheading is left out. A bare source code in
  the text reads as the source's title.
- **Limits:**
  - the person's own story can be written and edited when editing a person, section **Story**: **Chapter
    subheading** and **The story**. The section shows when **Settings → Person card → Advanced fields** is on or some
    text already exists. A couple's story and **Built on** (the facts and the author's caveat) come with the file and
    are read-only;
  - a draft from the research, not yet approved, carries the tag **Draft** and the link **Approve in the research**.
    A new version from the research waits beside the approved one (“New version waiting”, **Compare**); editing in
    the app does not discard it, the decision is made in the research
    ([R3.9.1](R3-verification-and-citation.md#R3.9.1));
  - in the book and in print there are no sources under the text; the story's sources are numbered in the book's
    list of sources;
  - in a GEDCOM file a story is in its own tag `_STORY`, not in a note.
- **Controls:** person card menu → **Story**; editing a person → section **Story**.
- **Since:** app 2.8.0; couple's stories and the person page 3.18.0; in the family book 3.19.0
- **From app 3.33.0:** the tag **Draft** is in the app only. The saved person page ([A7.6](#A7.6)) and the family
  pages ([A7.5](#A7.5)) give a draft the same way as an approved story, without the tag. The book does not mark a
  draft; **Approve in the research** is only in the book's window, not in the saved file. For the story of a house
  see [S10.14.2](S10-houses.md#S10.14.2).

<!-- zdroj: app:src/story-text.ts:1 storyProseHtml (odstavce, ##, -, **, *) · src/ui/person-modal.ts:662 fillStoryFields · index.html pm-story-section · src/book-blocks.ts:594 storyBlock · src/book.ts proseHtml · src/person-page.ts · src/ged-exporter.ts:449 pushStory _STORY · strings.ts story.* · commit 52000825 (aplikace 2.8.0) · CHANGELOG.cs.md 3.18.0, 3.22.0 · 3.33.0: app:28099151 src/person-page.ts storyDraftTagged, draftTag, coupleChapterHtml draftTag · src/book-blocks.ts storyBlock (bez štítku, approve z extras), src/book.ts extras („on the screen only, never in a saved file“) -->

<a id="A7.9"></a>
## A7.9 Give a family tree

**Give a family tree…** prepares for one person (the recipient) or a couple one ZIP file with their piece of the
family tree: the ancestors, the families around them and their own household, not the owner's whole tree. The guide
has six steps: **For whom**, **Who is in it** ([A7.9.1](#A7.9.1)), **Living people** ([A7.9.2](#A7.9.2)), **What
the package holds** ([A7.9.3](#A7.9.3)), **Cover letter** ([A7.9.4](#A7.9.4)) and **Preview and create**.

- The default person of the cut is the recipient; the app in the package opens on them. The tree's data do not
  change; the cut is only the scope of the output, not a new tree.
- **For whom:** **One person**, **A couple** (one package for two; the second person is suggested as a partner from
  the tree) or **A list of people or a selection** ([A7.9.5](#A7.9.5)). The action is offered only for a person who
  has at least parents, a partner or a child in the tree.
- **Straight to preview ›** jumps to step 6 with the default settings or the settings from last time; every step can
  still be changed afterwards.
- The whole package is made in the browser; nothing is sent anywhere. On a computer the ZIP downloads as soon as it
  is made; on a phone it does not download by itself and offers **Share…** and **Save to Files**. When the browser
  does not allow the download, **Download again** works without making it again while the window is open.
- Before making it, the app checks whether the browser has enough memory ([A9.7.1](A9-using-the-app.md#A9.7.1)).
  When memory runs out, nothing is made and the guide offers **Try without photos** or **Without the app**.
- The settings (cut, living people, contents, letter) are saved with the person or the couple on this device, not in
  the tree's data nor in an export. The next package for them starts from them (**Settings from last time**; **Start
  over with defaults**) and says how many people have joined or left the cut since then. The person's menu shows the
  date of the last package next to the action.
- **Controls:** the menu of a person's card (right button, long press on a phone) and ⋯ on the person page: **Give
  a family tree…**; **Actions › For the family › Give a family tree…**; in the window **Split into families** at
  **One person's view**, “Only for one person, without splitting the tree: **Give a family tree…**”
  ([A14.4](A14-trees-and-structure.md#A14.4)); the menu of a list of people and of a selection: **Give a family tree
  to each person…**; Export, scope **Person’s family tree…**, link **Whole gift package…** ([A7.9.6](#A7.9.6)).
  The action is not offered in a read-only tree.
- A tree with a house with a location has in the step **What the package holds** the switch **House locations and
  maps**, prefilled from Settings ([S10.3.4](S10-houses.md#S10.3.4)).
- **Since:** app 3.33.0

<!-- zdroj: app:src/ui/gift-tree-ui.ts (canGiftTree, giftMenuMeta, giftDownload jen na počítači, Sdílet/Uložit do Souborů na telefonu, confirmMemoryForOutput, GiftOutOfMemory → Zkusit bez fotek / Bez aplikace) · src/gift-guide.ts giftHasFamily, giftGuideStart, giftSuggestedPartner · src/gift-memory.ts (localStorage strom.gift.{treeId}, nikdy v datech) · src/gift-tree.ts giftCutData (defaultPersonId = obdarovaný) · src/ui/context-menu.ts gift-tree, src/ui/person-page-ui.ts, index.html Pro rodinu, src/ui/split-families-ui.ts splitfam-gift, src/ui/selection-picker-ui.ts, src/ui/person-list-hooks.ts · strings.ts giftTree.menu, title, stepNames, fast, menuList, splitLead, guide.mode, guide.lastH, restart, guide.cutChanged, make.share, make.saveFiles, make.downloadAgain, make.withoutApp, make.tryWithoutPhotos, review.local · dirigent:spec/093 K1.1, K2.4, K5.1, K5.4, K5.5 · dirigent:prace/1126-app-093-darovat-rodokmen (rozhodnutí B3) · přepínač: app:51223455, 6ec8204e src/ui/gift-tree-ui.ts:752, :1362 (outputHouseLocation.housesSwitch, dataSwitchHint) -->

<a id="A7.9.1"></a>
### A7.9.1 Who is in it (the cut)

The cut is a piece of the tree from the recipient's point of view.

| Always in the cut | Not in the cut |
|---|---|
| the recipient, their partners and all their descendants with partners | the partners' ancestors (of the recipient's partners and of the ancestors' partners) |
| their siblings with all descendants and their partners | people linked to the recipient only through partners |
| all available direct ancestors and their partners | people with no link to the recipient (separate parts of the tree) |
| the siblings of every ancestor with partners (without a family when the depth does not take it) | placeholder people |
| the recipient's stepchildren (their partners' children) with their families | |

- **Families of the ancestors up to** (depth): **No one** · **First cousins** (the parents’ siblings with their
  families) · **Second cousins** (the grandparents’ siblings with their families too) · **Everyone** (all blood
  relatives of the ancestors). The default is Second cousins. The family of an ancestor's sibling is all their
  descendants and the partners of all of them.
- **Families of the ancestors’ siblings:** the family of each ancestor's sibling can be checked or unchecked
  separately, also beyond the depth; an unchecked sibling stays in the cut alone with partners. The same in the
  preview from the card's menu (**Remove family…**, **Add family…**). For an ancestor's half-sibling the row names
  their other parent.
- The line of ancestors and descendants runs through birth and adoptive parents, not through a step-parent or a foster
  parent ([A7.4.1](#A7.4.1)).
- A couple: the cut is the union of the cuts of both.
- **Limits:** a person with no ancestors in the tree has a cut of only themselves, partners and descendants; the
  guide says so and the depth is not used. The guide announces a cut of 600 people or more with an estimate of the
  package size.
- **Controls:** the step **Who is in it**: the preview with the number of people and generations, **Families of the
  ancestors up to**, **Families of the ancestors’ siblings**.
- **Since:** app 3.33.0

<!-- zdroj: app:src/gift-tree.ts recipientCut (familySet up all, down all, width cousins, cousins = hloubka, spouses 'spouses', siblingFamilies = výjimky), stepchildrenOf (D5), giftCutIds (pár = sjednocení), giftBranchCandidates (half, otherParentId), GIFT_DEFAULT_DEPTH = 2 · src/lineage.ts familySet (sourozenci linie vždy, potomci předků do degree + 1, partneři krve), addDescendants, descentParents · src/__tests__/gift-tree.test.ts (hloubky, předci partnerů, ostrov) · strings.ts giftTree.cut.depthH, depth, depthDesc, branchesH, branchesNote, menuRemove, menuAdd, noAncestors, outLine, otherParent, largeLead · src/ui/gift-tree-ui.ts (≥ 600 osob) · dirigent:spec/093 K1.2, K1.3, K1.4 -->

<a id="A7.9.2"></a>
### A7.9.2 Living people in the gift

The privacy of living people ([S11.1](S11-protecting-living-people.md#S11.1),
[S11.2](S11-protecting-living-people.md#S11.2)) is applied once over the cut and all parts of the package (the app, the
pages, the book, the fan, GEDCOM and the cover letter) get the same protected data. What is hidden in one part is not in
any other.

- **The recipient's household is always in full:** the recipient, their partners except divorced and separated ones,
  and their children. For a couple both of them and the children of each. Stepchildren go in full only as an
  exception.
- **Exceptions:** a person checked in the list **Living people in the tree** is in full (checked = in full).
- **Other living people:** the protection modes with the same names and in the same order as everywhere
  ([S11.2](S11-protecting-living-people.md#S11.2)), by default **Initials + birth year** (not from Settings).
- **For the living shown in full** each kind can be turned off:

| Kind | Default | What turning it off removes |
|---|---|---|
| **Birth dates** | yes | the date of birth and baptism; the year stays |
| **Addresses and residences** | yes | the addresses of birth, death and events, the couple's address, residence and census events |
| **Contacts (e-mail, phone)** | no | the person's e-mails ([S6.9](S6-tree-from-another-program.md#S6.9)), note lines with an e-mail, another program's own lines (phones among them) |
| **Photos** | yes | the person's portrait and attachments |
| **Notes and stories** | no | notes, stories, the open question |
| **Religion** | yes | the religion fact ([R3.11](R3-verification-and-citation.md#R3.11)) and rites: baptism, confirmation, first communion, bar and bat mitzvah, ordination |
| **Sources with personal details** | yes | the citations of the person and of their events |

- **For the deceased:** **Causes of death**, **Notes and stories**, **Sources and their scans**; by default all kept.
  The sources of the deceased stay even with the privacy of living people.
- By default the recipient's household therefore carries addresses but not e-mails, phones and notes; other living
  people only initials and the birth year. When the privacy shortens something for living people, the cover letter
  says so in its footer.
- Without photos (step 4), photos, attachments and source clippings disappear for all people. The research workshop
  never goes into the gift ([A7.3](#A7.3)).
- **Controls:** the step **Living people**: **Living people in the tree**, **Other living people**, **For the living
  shown in full**, **For the deceased**.
- **Since:** app 3.33.0

<!-- zdroj: app:src/gift-tree.ts defaultGiftPrivacy (others initials; sensitive contacts:false, notes:false, ostatní true; dead vše true), giftHouseholdIds (bez rozvedených a odloučených; pár jen oba; děti každého), giftProtectedData (jednou před výstupy, keepDeceasedSources, stripResearchWork, stripMedia bez fotek), giftShortensLiving · src/privacy.ts LivingSensitive (komentář druhů), maskSensitive, maskSensitiveCouple, maskEvent, keepsEvent RELIGION_EVENTS, RESIDENCE_EVENTS, BIRTH_DATE_EVENTS, maskDeceased · strings.ts giftTree.guide.livingH, checkedFull, othersH, sensitiveH, sensitive, deadH, dead, giftTree.cover.shortened · test/vysledek-1126-app-093.md (Soukromí K6.2, K6.4) · dirigent:spec/093 K6.1–K6.4 · 3.33.0 názvy a pořadí: app:bda4fd2c src/ui/gift-tree-ui.ts (PRIVACY_ORDER, privacyModeLabel, originTree) · dirigent:spec/151 Okrajové případy (dárek jen názvy a pořadí) -->

<a id="A7.9.3"></a>
### A7.9.3 What the package holds

The ZIP `Family tree – <name> – <year>.zip` holds the folder `Family tree – <name>`:

| File | What it is |
|---|---|
| `Start here.html` | the cover letter with links to the rest ([A7.9.4](#A7.9.4)); always included |
| `Family tree (app).html` | the Strom app with the cut in one file ([A7.7](#A7.7)); opens offline on the recipient with a welcome and the message |
| `Family pages/` | the pages of the cut ([A7.5](#A7.5)) |
| `Family book.html` | the book of the cut to print ([A7.4](#A7.4)); PDF through the browser's print |
| `Ancestor fan.svg`, `.png` | the recipient's direct ancestors in one picture, 3 to 10 generations; for a couple one fan for each |
| `For other programs/Family tree.ged` | the cut in the GEDCOM format |

- Every part except the cover letter can be turned off; by default all are on, with photos. The guide shows an
  estimate of the compressed size, also without photos and without the app.
- The book has the book settings ([A7.4](#A7.4), **Book settings…**), the fan its look (**Fan look…**).
- The file names are in the language of the cover letter; the ZIP's name can be changed in step 6.
- **Limits:** on a Mac the ZIP is unpacked correctly by the Finder; the `unzip` tool in the terminal cannot handle
  names with diacritics.
- **Controls:** the step **What the package holds**: **Parts of the package**, **Photos** (**With photos** /
  **Without photos**), **Contents of the ZIP file**.
- **Since:** app 3.33.0

<!-- zdroj: app:src/gift-package.ts giftFileNames (složka, Začít zde, aplikace, stránky, kniha, vějíř na osobu u páru, Pro jiné programy/Rodokmen.ged), buildGiftPackage, estimateGiftSize · src/gift-tree.ts defaultGiftParts · src/filenames.ts unicodeFileName · strings.ts giftTree.files, giftTree.pkg.part, partsH, photosH, bookSettings, fanLook, zipH, zipNote, review.fileName · test/vysledek-1126-app-093.md (ZIP rozbalený ditto, macOS unzip) · dirigent:spec/093 K5.2, K5.3 -->

<a id="A7.9.4"></a>
### A7.9.4 Cover letter (Start here)

`Start here.html` is the first page of the package: the message, figures from the family tree and links to the
rest.

- **Message:** a template by language and motif, freely editable (**Insert the template again**). The salutation
  placeholder in the message (cs `[oslovení]`, en `[name]`, de `[Name]`, pl `[imię]`) is replaced by the
  **Salutation**; the default is the first name, both for a couple. Further **Signature** (shown in the letter and
  when the app opens) and **Date** (today by default).
- **Letter language:** Czech, English, German, Polish; the app's language by default. **Motif:** **No motif**
  (default) or **Christmas**.
- **The family tree in numbers** are figures from the cut, not from the whole tree: the number of people and
  generations, the oldest ancestor, family lines, places and the family's path, the oldest record, people by
  generation.
- **What the package holds:** links to the parts; whoever opens them without unpacking the ZIP gets instructions
  for unpacking.
- The letter can be printed on A4.
- **Controls:** the step **Cover letter** with a preview of the opening page; in step 6 **Open in a window**.
- **Since:** app 3.33.0

<!-- zdroj: app:src/gift-cover.ts buildGiftCover, giftFacts, giftLetterTemplate, giftDefaultSalutation, giftMessage (všechny čtyři tokeny) · strings.ts giftTree.salutationToken, template.none, template.xmas, cover.*, letter.langH, langName, motif, salutationH, messageH, reinsert, dateH, numbersH, guide.signature · dirigent:prace/1126-app-093-darovat-rodokmen (rozhodnutí A3, B3b tisk A4) · dirigent:spec/093 K7.1–K7.4 -->

<a id="A7.9.5"></a>
### A7.9.5 In bulk for a list of people or a selection

From a list of people ([A11](A11-lists-of-people.md)) or a selection a package is made for each person separately.

- The table **Recipients** shows each with the salutation and the number of people and of living people. **Spouses
  and partners as one package** joins couples. A person with no parents, partner or child in the tree gets no
  package.
- Steps 2–5 set everyone at once; **Edit…** gives one person settings of their own, **Back to common** cancels them.
  `[name]` in the message is filled with each recipient's salutation.
- The result is one ZIP `Family trees <year>.zip` with a finished ZIP for each person or couple, or single ZIPs in
  a chosen folder (**Save to folder…**). The packages are made person by person so that memory is enough; **Cancel
  all** also deletes what has already been made. A package that cannot be made shows as a warning row; the others
  are made.
- The settings are saved with each person.
- **Limits:** making packages in bulk runs only on a computer; a phone makes a package for one person or a couple.
- **Controls:** the menu of a list of people and of a selection: **Give a family tree to each person…**; in the
  guide the step **For whom**, **A list of people or a selection**.
- **Since:** app 3.33.0

<!-- zdroj: app:src/gift-batch.ts · src/gift-package.ts buildGiftBatch, giftBatchFileName · src/ui/gift-tree-ui.ts (mode list jen mimo telefon, showDirectoryPicker, Zrušit vše maže zapsané) · src/ui/selection-picker-ui.ts (ne na telefonní liště), src/ui/person-list-hooks.ts · strings.ts giftTree.batch.*, guide.mode.list, guide.listPhoneWhy, guide.listPhoneNote, menuList · dirigent:prace/1126-app-093-darovat-rodokmen (B4: zrušení u složky smaže zapsané ZIPy) · dirigent:spec/093 K8.1–K8.3 -->

<a id="A7.9.6"></a>
### A7.9.6 The export scope Person’s family tree

In Export, **What to export** has the choice **Person’s family tree…**: the cut of one person ([A7.9.1](#A7.9.1)) in
any format, without the guide.

- The person is the one in focus; another can be chosen. The depth **Families of the ancestors up to** is taken
  from that person's last gift, otherwise Second cousins; the manual exceptions for the ancestors' siblings are not
  used by Export.
- Formats: **Send to a relative**, **App with data (HTML)**, **Data backup (JSON)**, **Poster**, **Family book**,
  **Linked pages**, **GEDCOM**, **Person table (CSV)**. The output opens on the chosen person and counts
  relationships and generations from them.
- The book and the pages get the choice **Person’s family tree** ([A7.4.1](#A7.4.1)). The poster switches the view to
  the chosen person and makes a poster of the view.
- The privacy of living people is the export's choice ([S11.3](S11-protecting-living-people.md#S11.3)) and applies to
  all living people, also to the chosen person's household. The gift's choices ([A7.9.2](#A7.9.2)) are only in **Whole
  gift package…**, which opens the guide with the same person and depth.
- **Limits:** only for the open tree.
- **Controls:** Export › **What to export** › **Person’s family tree…**: **Person’s family tree** (choice of the
  person), **Families of the ancestors up to**, **Whole gift package…**
- **Since:** app 3.33.0

<!-- zdroj: app:src/ui/import-export.ts showExportDialog (fokus), setExportPerson (hloubka z paměti daru), exportPersonCutIds (branches {}), renderExportScope (scope person jen aktivní strom), exportScoped, shareFromExportDialog, posterFromExportDialog, bookFromExportDialog (selection gift), exportPersonTreeJSON, exportTargetTreeApp (scopedExportData, defaultPersonId), openGiftFromExport · index.html data-person-ok · src/subtree.ts scopedExportData · strings.ts exportMenu.scopePerson, personPick, personFrom, personFull, *PersonDesc, familyPages.exportPages · dirigent:spec/093 K2.1–K2.4 -->
