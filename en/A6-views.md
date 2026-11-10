<a id="A6"></a>
# A6 Views and the choice of people

How the Strom app chooses which people to show and how each view shows them. Describes the app 3.21.2; changes from a later version carry its number.

A view is a different reading of **the same choice of people**. The choice is set by the central person (the one
clicked) and the depth **Ancestors** and **Descendants**. Family, Descendants, Timeline and Map show the same
surroundings of the central person. The Fan counts ancestors and descendants on its own by the number of generations
([A6.4](#A6.4)). The Table shows the whole tree ([A6.7](#A6.7)).

Views: **Family**, **Descendants**, **Timeline**, **Fan**, **Map**, **Table**.

<!-- zdroj: app:src/types.ts:1237 ViewMode · strings.ts viewModeSwitch.* · Tabulka od aplikace 3.27.0 (viewModeSwitch.table) -->

<a id="A6.1"></a>
## A6.1 The surroundings of the central person in the Family view

The Family view shows the central person within their family, not the whole tree.

- The choice includes:
  1. the central person and all their partners;
  2. their descendants down to the depth **Descendants**, with partners;
  3. direct ancestors through both parents up to the depth **Ancestors**;
  4. siblings, half-siblings too (their other parent is not added), with partners and descendants down to the depth
     Descendants;
  5. aunts and uncles (the parents' siblings) with partners;
  6. cousins, that is the children of aunts and uncles recorded in their union, with descendants down to the depth
     Descendants.
- **Limits:** the ancestors of the central person's partner are never added. Whoever is not in the surroundings stays
  in the tree; the view just does not show them. A new central person shows them.
- **Depth:** after a new central person is chosen, Ancestors and Descendants are set to the greatest depth the tree
  has for that person. The menu offers 1 up to that greatest depth. The partner's children from another union add one
  generation down.
- **Controls:** a click on a person's card; the options **Ancestors** and **Descendants** in the view bar.
- **Since:** app 1.0.0

<!-- zdroj: app:src/layout/pipeline/1-select-subgraph.ts selectSubgraph · src/layout/pipeline/index.ts:962 includeSpouseAncestors: false · src/renderer.ts:719 computeTreeLayout, setFocus (maxGenerations) · src/focus-depth.ts maxAncestorDepth, maxDescendantDepth · strings.ts focus.ancestorsLabel, focus.descendantsLabel -->

<a id="A6.1.1"></a>
### A6.1.1 Default person and view

What a tree opens with is set by the tree setting **Default person and view**.

| Option | Choices |
|---|---|
| person | **Last focused** · **Specific person:** (chosen) |
| view | **Family** · **Last used** (on this device) |

- **Limits:** without the setting the tree opens on the tree's first person. Reloading the page keeps the tree, the
  view and the central person.
- **Controls:** tree management, at the tree **Default person and view**.
- **Since:** default person app 1.0.0; the choice of view and reloading the page app 3.21.0

<!-- zdroj: app:src/renderer.ts:1178 findDefaultFocusPerson, getStartupFocus · strings.ts treeManager.defaultPersonViewTitle, focus.defaultPersonLastFocused, focus.defaultPersonSpecific, focus.defaultViewFamily, focus.defaultViewLast · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.2"></a>
## A6.2 The Descendants view

The Descendants view shows only the central person and their descendants down to the depth Descendants: without
ancestors, aunts, uncles and cousins.

- **Blood only** (default): the central person's blood descendants.
- **Whole families**: also the partners' other unions and their stepchildren, dimmed.
- **Controls:** a switch in the view bar; the default is kept by the setting **Descendants view**.
- **Since:** the view app 1.4.0; Whole families app 1.9.2

<!-- zdroj: app:src/layout/pipeline/index.ts includeAuntsUncles: !descendantsOnly, expandLineageOnly: descendantsOnly && !isDescendantsFullFamilies() · strings.ts viewModeSwitch.bloodOnly, viewModeSwitch.fullFamilies, viewModeSwitch.settingLabel · settings descendantsFullFamilies (výchozí false) -->

<a id="A6.3"></a>
## A6.3 Timeline

The Timeline shows the people of the view as life bars on an axis of years.

- Only a person with a year of birth gets a row. The view counts the others and writes "N people without a birth
  year not shown". Placeholder persons (an empty place for an unknown parent) are left out.
- The order of rows: year of birth, then the name without titles.
- The bar of a living person reaches today. A deceased person without a date of death has a bar up to the last known
  event and an open end.
- The year of a marriage is taken from the start date of the union. The axis is rounded to decades.
- Under the axis of years runs a row of history for the central person (events of the time and the places of their
  life, symbols of kinds). Without the research or without such events there is no row.
- **Since:** timeline app 1.5.0; the row of history app 3.19.0

<!-- zdroj: app:src/timeline.ts computeTimelineModel, :59 TimelineHistory · strings.ts timeline.omitted · CHANGELOG.cs.md 3.19.0 -->

<a id="A6.4"></a>
## A6.4 Fan

The Fan shows the central person's ancestors in circular segments, generation by generation.

- **Shape:** **Half circle** · **Full circle** · **Two-way** (ancestors and descendants).
- **Generations** of ancestors 3–10, default 5. In the shape Two-way, **Descendants** 1–5, default 3.
- Numbering of ancestors: 1 is the central person, the father of person n has the number 2n, the mother 2n+1. The
  father's line is on the left. The numbers on the segments are turned on by the setting **Fan chart** "Show Kekulé
  (ancestor) numbers" (off by default).
- The parents are the person's first two recorded parents. A relationship that is not biological (adoption, step,
  foster) is marked at the segment.
- An ancestor who appears in the fan a second time is drawn again but not expanded further; legend **↻ repeats
  (pedigree collapse)**. The option **Show first occurrence** jumps to their first place.
- Descendants (shape Two-way): unions in the order of marriages (date of marriage, then the order in the data),
  children by birth. An unknown partner gathers the children without a second parent. A union without children is
  shown only for the central person.
- **Colours:** **Gender** · **Lines** (the four lines of the grandparents: father's father, father's mother, mother's
  father, mother's mother) · **Family lines** ([A4](A4-surnames-and-families.md)).
- **Original person** returns the fan to the person it started from.
- **Since:** fan app 1.8.0; the new fan with shapes, colours and pedigree collapse app 3.20.0
- **From app 3.27.0:** a union without a date of marriage is ordered by the latest date the marriage can have
  been: the earlier of the end of the union (a divorce) and the birth of the union's first child. A marriage “before
  1982” comes before a marriage in 1982. A union without these dates comes after the others. The partners next to a
  person and the marriage-order marks (“1. ∞”) on the cards follow the same order.

<!-- zdroj: app:src/fan-chart.ts FAN_MIN_GENERATIONS, FAN_MAX_GENERATIONS, FAN_DEFAULT_GENERATIONS, parentSlots, repeatOf · strings.ts fan.shapeHalf, fan.shapeFull, fan.shapeTwo, fan.colorGender, fan.colorLine, fan.colorRod, fan.legendRepeats, fan.originPerson, fan.showFirst, fanChart.kekuleHint · settings fanKekule (výchozí false) · spec 029 · CHANGELOG.cs.md 3.20.0 · 3.27.0: app:ad1ca16c src/marriage-order.ts marriageKey (BOUND 0.5, qualifier „<“; bez sňatku min(endDate, narození dětí)), marriageDates, compareMarriages, marriagesInOrder (partneři vedle osoby, značka „1. ∞“) · src/fan-chart.ts familiesOf · CHANGELOG.cs.md 3.27.0 · dirigent:prace/1109-app-tester-vlna1 (T50, T13) -->

<a id="A6.5"></a>
## A6.5 Map

The Map shows the places of people's events.

- **Scope:** **This view** (default, the people of the view) · **Whole tree**.
- **Kinds:** **Births** · **Deaths** · **Marriages** · **Other events**. All are on by default; the choice is
  remembered on the device.
  - A baptism counts as a birth, a burial and a cremation as a death.
  - An engagement, banns, a marriage licence and a marriage contract count as a marriage. The couple's other events
    are Other events.
- The place of a marriage is shown when at least one of the partners is in the view.
- A place is written in its most frequent spelling. A town is one point, house numbers included; a place with its own
  exact coordinates stays a separate point.
- **Since:** map app 1.10.0; kinds of events and town points app 3.21.0

<!-- zdroj: app:src/places.ts collectPlaces, groupTownPoints · src/ui/map-ui.ts (localStorage strom.map.kinds) · strings.ts map.scopeView, map.scopeTree, map.kinds · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.5.1"></a>
### A6.5.1 Where the map gets a place's location

In a tree of its own (without the research) the app looks up the location of places itself, in the OpenStreetMap
service (Nominatim). It sends only the name of the place as it is written in the tree, and only with consent. In a
tree from the research, places are identified by the research ([R4](R4-places.md)).

- **Limits:**
  - before the first lookup the app asks (**Look up coordinates online?**). Only place names leave the app, no names
    of people, dates or relations. At most one request about every second;
  - the coordinates are saved into the tree: each place is looked up once, and the map then works offline too;
  - the automatic lookup takes the service's **first result** for the written name. Up to app 3.23.0 it did not tell
    apart towns of the same name: a place could thus land in a town of the same name elsewhere. A location that does
    not fit the tree is marked **Check** ([R4.4.1](R4-places.md#R4.4.1));
  - only a place with a house number that the service did not find is looked up by its town. Of the towns of that
    name, the one nearest the tree's other places is chosen (“Several towns have this name; the one nearest the tree’s
    other places was chosen.”); the place shows **Located by the town of …**;
  - **from app 3.24.0** the nearest town is chosen for every place: when two or more towns are named exactly like the
    written place (regardless of letter case and diacritics), the one nearest the centre of the tree is taken, not the
    first result. The centre is the median of the locations set by hand or confirmed with **Keep**, when there are at
    least 3; otherwise the median of all the tree's locations and of the places the lookup found without doubt.
    A place with a further detail (“Lhota u Kolína”, “Lhota 16”), a single town or a tree without locations gets the
    first result as before. It is still one request per place;
  - the place check says how many towns of that name the map found (“The map found 3 towns with this name and took the
    one nearest the tree’s other places.”); from app 3.24.0, formerly always “two”;
  - a location already in the tree is not moved: the lookup looks up only places without a location. Not even a merge
    with another tree or a GEDCOM file overwrites a location set by hand or confirmed with **Keep**; it only adds
    missing ones. A wrong older location can be moved only by hand;
  - what is not found stays without a location. The app guesses nothing: “check the spelling, or add the country”.
- **Controls:** app: **Settings → Look up places online**; in the places window **Wrong spot? Fix this place**,
  **Search for this place under another name** (only the location is attached, the entry in the tree does not
  change), **Use for the other house numbers in … too**, **Clean orphaned places (n)**.
- **Why:** looking up places is the only part of the app that sends anything out; therefore only with consent, only
  names, and each place once (a comment in the code). The limit of one request per second is a condition of the
  service.
- **Since:** app 1.10.0; **Wrong spot? Fix this place** 1.10.1; **Clean orphaned places** 2.1.0; the location by the
  town 3.21.0; the nearest town of the same name for every place and the number of towns in the check 3.24.0

<!-- zdroj: app:src/geocode.ts hlavička, REQUEST_INTERVAL_MS=1100, geocodePlace (limit 1, parseGeocodeResponse první výsledek), geocodeTown/pickTownHit nearestTo (od v3.21.0), geocodePlaces townFallback · app:src/strings.ts map.consentTitle, consentBody, settingLabel, wrongSpot (v1.10.1), searchLabel, attachOnly, useForOthers, cleanOrphans (v2.1.0), nearestTown, byTown, doneWithMisses · FB podnět 2026-11-04 (stejnojmenná obec) · od 3.24.0: geocode.ts treeCenter (medián, PERSONS_CENTER_MIN=3), sameNamedTowns, pickPlaceHit (townChoices), buildGeocodeUrl limit · place-check.ts multi count · strings.ts checkMulti(n) · merge-executor test (ruční poloha zůstane) · commit 046967d -->

<a id="A6.5.2"></a>
### A6.5.2 Looking up places off the map in the research

For a tree with a research, the map's status bar offers the places without a location for looking up in the research
([R4.4](R4-places.md#R4.4)). The button opens the **Places** window with a preview; places go to the research's queue
only after **Queue**.

- **Limits:**
  - before the map's lookup the bar has **In the research** beside the map's own lookup. After the lookup, when the
    map did not find some places, the bar shows "N places on the map · K not found by the map" and **Look up in the
    research (K)**, possibly "N to confirm ›" (opens **Waiting** in the research panel);
  - the button is there only for a tree with a research and only when something can be looked up: a place without a
    location or not identified that is not in the queue yet, not being worked on and not waiting for an answer;
  - the **Places** window shows the preview "Look up N places not on the map in the research". Nothing is queued
    before **Queue N places**, and no place is queued twice;
  - when the research runs on another computer, or on a phone, the app says instead of the window where the lookup
    works: "Look up and check work in the research on the computer where it runs. Place states come here with the
    tree.", on a phone "Look up and check work on the computer with the research. Questions about places can be
    answered here too, in Waiting." An older research: "This version of the research does not look up places yet.";
  - while following the research on the map ([S4.1.3](S4-research-from-the-app.md#S4.1.3)) the line "… – no position
    on the map" offers **Look up in the research**: it queues that one place at once, without a preview; the queuing
    can be undone in the notice.
- **Controls:** app: the map → the status bar → **In the research**, after the map's lookup **Look up in the research
  (K)** → the **Places** window → **Queue N places**.
- **Since:** app 3.25.0

<!-- zdroj: app:src/ui/map-ui.ts (stavový pruh, lookResearch, lookable), src/ui/place-actions.ts, src/ui/places-research-ui.ts (bulkLook, bulkLookHead, bulkLookGo, nic dvakrát), src/ui/map-follow-ui.ts (noCoords + places.research.look, Undo) · strings.ts map.onMap.notFound, lookResearch, lookResearchShort, lookResearchTitle, confirm; places.dialog.elsewhere, phoneLine, oldResearch · CHANGELOG.cs.md 3.25.0 · commit 2246ca28 · spec 058 -->

<a id="A6.6"></a>
## A6.6 A family line in the view

A view can highlight one family line ([A4](A4-surnames-and-families.md)): its members fully, wives and husbands who
married into it more faintly, the others subdued. This holds in the views Family, Descendants and Fan.

- The choice is remembered for each tree on the device. A family line that is no longer in the tree is cancelled
  silently.
- When no member of the family line is drawn in the view:
  - Family and Fan move the central person to the nearest member of the family line (through parents, children and
    partners; on a tie to the older one), and when the person is not connected to one, to the founder of the family
    line;
  - Descendants always moves the central person to the founder;
  - the bar offers **↩ Back**.
- **Limits:** restoring the choice from memory does not move the central person.
- **Controls:** **Family lines** in the bar; in the person's menu **Only the … line** (the person's own family line
  by birth comes first); the end through × on the label or **Show the whole tree**.
- **Since:** app 3.21.0

<!-- zdroj: app:src/ui/rod-view.ts · src/rod-focus.ts (BFS přes rodiče, děti, partnery) · strings.ts rodView.only, rodView.whole, rodView.moved · spec 039 · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.7"></a>
## A6.7 Table

The Table shows the whole tree in rows: each person, each union, each event or each source, with the facts in
columns. It serves for finding gaps, contradictions and findings of the check across the tree. It does not depend on
the depth **Ancestors** and **Descendants**. The Table view is based on a table by Ondřej Chrpa.

- **Rows:** the switch **Rows**: **People** · **Unions** · **Events** · **Sources**. Each row type has its own
  columns, filter and sort.
  - **People:** one row per person of the tree; placeholder persons (an empty place for an unknown parent) are left
    out.
  - **Unions:** one row per union that has at least one real partner. **Partner 1** is the one of the couple who is a
    blood relative of the home person; otherwise the union's first partner.
  - **Events:** one row per event of the tree ([A6.7.10](#A6.7.10)).
  - **Sources:** one row per source of the tree ([A6.7.11](#A6.7.11)).
- The **home person** is the central person of the tree ([A6.1](#A6.1)). From them the column **Relationship to home
  person** and the chip **Blood relatives** are counted: the home person's ancestors (the home person too) and all
  their descendants. Partners who came into the family by marriage are not among them.
- **Generation** 1 is the oldest generation of the tree; a partner has the generation of their partner.
- **Living** is counted as for the privacy of living people ([A7.1](A7-book-pages-and-export.md#A7.1)).
- Above the table are the count (“42 of 120 people”) and the sort (“Sort: …”). The field **Search person...** in the
  bar selects the person's row in the table and scrolls to it; the central person does not change.
- **Limits:**
  - highlighting a family line ([A6.6](#A6.6)) is not used in the table; a family line can be chosen with the chip
    **Family line** ([A6.7.6](#A6.7.6));
  - a read-only tree (a followed tree, a tree saved by a newer version of the app, a locked tree) the table only
    shows: “Read only: edits and “Not an error” are not available here.” Browsing, filter, sort and CSV and XLSX
    export work; a view cannot be saved, renamed or deleted.
- **Controls:** **Table** in the view bar (after **Map**); in a narrow window and on a phone **More → View → Table**.
  The view is remembered like the others ([A6.1.1](#A6.1.1)).
- **Since:** app 3.27.0

<!-- zdroj: app:src/ui/table-view/table-model.ts ROW_TYPES, buildTableModel (isPlaceholder ven, svazek aspoň s jedním skutečným partnerem), bloodOf (předci hlavní osoby a všichni jejich potomci), makeContext (homeId, isLivingPerson) · table-columns.ts unionPartners (pokrevní partner jako Partner 1), gen (assignGenerations + 1), kin (findRelationship, kinSelf) · src/ui/table-view/table-ui.ts tableReadOnly (isReadOnly: viewMode, isLocked, isNewerData) · src/data.ts:655 isReadOnly · src/ui/bottom-sheet.ts:443 (Více → Pohled: Vějíř, Mapa, Tabulka) · table-bar.ts countText, sortText · perf-budget test 5 000 osob · strings.ts viewModeSwitch.table, table.rows, rowType, rowTypeNote, countOf, sortedBy, readOnly, readOnlyShort · commity c34c47ff, 1b72e6d8 · spec 073 U2 · Události a Prameny (spec 073 U3 P2, K5.1–K5.4): commity 8de751c2, 63ed9def, 1a3a49f1, 3cf69ffa, strings.ts table.rows.events, rows.sources, perf-budget 5 000 osob (Události) a 2 000 pramenů · poděkování: Milan 10. 11. (dirigent:prace/1110-doc-tabulka, bod 4) · CHANGELOG.cs.md 3.27.0 · dirigent:prace/1110-app-tabulka-p1 -->

<a id="A6.7.1"></a>
### A6.7.1 Unions in the People table

A person with two or more unions has a row of their own in the People table and under it a sub-row for each union
(“Union 2 of 3”). The person's row has a count in the column **Partner** (“3 unions”) and the other union columns
empty.

- Unions follow the order of marriages as in the tree ([A6.4](#A6.4)): **Union 1** is the one with the mark “1. ∞”
  on the card. A union without a wedding date is placed by the latest the wedding can have been (the earlier of a
  divorce and the birth of the first child); a union without these dates comes after the others. On a tie, the order
  of the person's unions in the data decides. An empty stand-in family (“?”) goes last in the order of entry.
- **Collapsed:** the person's row shows the first union and the number of the others. The default is expanded; the
  built-in view **Gaps** has the unions collapsed.
- **A filter in a union column** is judged for each union separately. The person stays when at least one union
  matches; the others are hidden under the row “2 unions outside the filter · show”. Those shown are dimmed until the next
  change of the filter.
- **Sorting by a union column** takes the first union that matches the filter.
- A person with one union has its facts directly in their own row.
- **Controls:** **Expand unions** / **Collapse unions** (on a phone in the menu **⋯**); the keys → and ← in the
  column **Name**, * for all people; the row menu. The state is saved with the view ([A6.7.7](#A6.7.7)).

<!-- zdroj: app:src/ui/table-view/table-subrows.ts defaultUnionCollapse (collapsed: false), isExpanded, setAllExpanded, passingUnions, personPassesUnions, sortUnionOf, buildLines · table-model.ts unionsInMarriageOrder (marriagesInOrder z src/marriage-order.ts: Svazek 1 = „1. ∞“; bez data sňatku podle rozvodu nebo prvního dítěte; shoda podle seznamu partnerships osoby; zástupné rodiny „?“ za nimi v pořadí dat; commit 2e0346f9, T13) · table-views.ts BUILTIN_VIEWS gaps (unions collapsed) · strings.ts table.unionsN, unionKofN, hiddenUnions, expandAll, collapseAll · commity 8833da14, 8192621d -->

<a id="A6.7.2"></a>
### A6.7.2 Columns

The columns are in groups. Which are visible and in what order is part of the view ([A6.7.7](#A6.7.7)).

| Rows | Groups of columns |
|---|---|
| **People** | **Person** · **Birth and baptism** · **Parents** · **Unions** · **Divorce** · **Death and burial** · **Events** · **Sources** · **Reliability and research** · **Checks** |
| **Unions** | **Couple** · **Marriage** · **Divorce** · **Children and sources** |

- **Name** (for unions **Partner 1**) is pinned on the left and sorts by surname, then by given name.
  **Surname** is the married surname, otherwise the birth surname; **Birth surname** is the recorded surname.
- **Research ID** shows only the person's number from the research (P…).
- **Events** (**Occupation**, **Residence**, **Religion**, **Military service**, **Emigration**, **Education**) show
  each value once, the newest first.
- The columns **… reliability** and **Research certainty** have a value only in a tree from the research
  ([S7](S7-reliability-and-verification.md)).
- **Limits:** a collapsed group is a narrow strip; it shows the highest level of a finding in its cells. On a phone
  the pinned name is narrower and the header can only be read, not changed.
- **Controls:**
  - the panel **Columns** (“12 of 58”): **Find a column**, groups with the checkbox **all**, dragging the order,
    **Coverage row**, **Reset to default**, **Done**;
  - the menu in a column header: **Sort ascending**, **Sort descending**, **Add to sort** (Shift + click),
    **Filter…**, **Pin left** / **Unpin**, **Move left** / **Move right**, **Hide column**,
    **Collapse group …** / **Expand group …**; at a computed column “Computed from: …”;
  - the column width by dragging the edge of the header.

<!-- zdroj: app:src/ui/table-view/table-columns.ts PERSON_GROUPS, UNION_GROUPS, katalog sloupců (surname marriedSurname || lastName, birthSurname lastName, researchId /^P\d{1,7}$/, eventValues nejnovější první, sortKey jména), pinnedWidth 156 na telefonu · table-state.ts MIN_COLUMN_WIDTH, BAND_WIDTH, lockedColumn · table-checks.ts bandSeverity · table-colpanel.ts panelGroups · table-headmenu.ts headMenuItems · strings.ts table.group.*, col.*, columns, columnsCount, searchColumn, all, pinnedLabel, resetColumns, done, coverageRow, sortAsc, sortDesc, sortAdd, sortAddHint, filterColumn, pin, unpin, moveLeft, moveRight, hide, collapseGroup, expandGroup, computedFrom · commity 89602f35, 49b96d92, e4a35406 -->

<a id="A6.7.3"></a>
### A6.7.3 Computed and substitute values

What is not written in the tree but can be counted from the data, the table computes. It writes nothing into the tree.

| Value | How it is counted |
|---|---|
| age (at a child's birth, at marriage, at death) | from dates with a day exactly (“67”); from a year, month or range as a range (“28–29”); from a date with abt., bef. or aft. as an estimate (“≈ 67”) |
| substitute date and place | without a birth the baptism (“bap. 3 May 1850”), without a death the burial (“bur. …”); an age from them is an estimate (≈) |
| **Recorded age difference** | by how many years the recorded age is outside the range of the age from the dates (“+3”, “−2”); an age in words and an age with abt., bef., aft. is not compared |
| **Length of union** | from the marriage to the divorce, otherwise to the first death of the couple |
| **Birth order**, **Siblings**, **Children**, **Number of unions**, **Sources** | from the links and sources of the tree |

- Dates have the word of precision before them (**abt.**, **bef.**, **aft.**). An uncertain date is underlined with
  dots; it is not a finding. A date sorts by its start.
- **Limits:** an age is not counted when the end comes before the start. The death columns have **Does not apply**
  for a living person (for **Death completeness** “living”). **Father’s/Mother’s age at birth** without a recorded
  parent is **Does not apply**.
- **Controls:** the hint at a cell (“Baptism, birth unknown”, “Burial, death unknown”); at a computed column in the
  header menu “Computed from: …”; the legend **Marks** ([A6.7.13](#A6.7.13)).

<!-- zdroj: app:src/ui/table-view/table-columns.ts ageCell (přesně / rozsah ageRangeBetween / ≈ approxAgeBetween; nic, když konec před začátkem), dateCell, qualifierWord, birthOrBaptism, deathOrBurial (náhrada, ≈), gapCell (recordedAgeGap), unionLength, naCell, parentsOf · src/dates.ts:448 ageRangeBetween, recordedAgeGap · table-model.ts dateNumber (začátek rozsahu) · strings.ts table.na, living, subst.*, qual.*, computedFrom, from.* · commit 8833da14 -->

<a id="A6.7.4"></a>
### A6.7.4 Completeness and the coverage row

The columns **… completeness** say how many of the tracked fields are filled in, in percent.

| Column | Counted from |
|---|---|
| **Birth completeness** | date, place, father, mother, source |
| **Union completeness** | date, place, partner, marriage source |
| **Death completeness** | date, place, source (not for a living person) |
| **Overall completeness** | birth, each union and death, weighted by the number of fields |

- A substitute value (baptism, burial) does not fill a field. The hint at a cell lists what is missing (“missing:
  birth place, birth source”).
- The **Coverage row** under the header shows for each column what percentage of the rows has a value (“filled
  64 %”, hint “77 of 120”). It counts only the rows visible at the moment (after the filter and the search). Cells
  **Does not apply** are not counted; for union columns the unions that match the filter are counted. Under 50 % the
  number is bold; without a cell it would concern, it is “–”.
- **Controls:** **Coverage row** in the panel **Columns** (on a phone in **⋯**); it is saved with the view.

<!-- zdroj: app:src/ui/table-view/table-columns.ts compCell, unionComp (pole a váhy, náhrada nevyplní) · table-coverage.ts cellFilled, columnCoverage, coverageCell, coverageLabel (LOW pod 50 %) · table-subrows.ts coverageUnionsOf · strings.ts table.compList.*, compField.*, missing, missingNone, compCounts, coverage, coverageOf · rozhodnutí Milan 10. 11. (spec 073, bod 5) · commit 8833da14 -->

<a id="A6.7.5"></a>
### A6.7.5 Findings of the check in the cells

The table shows the findings of Data quality ([A5](A5-tree-check.md)) right at the fact they concern: the cell is
shaded and has a mark of the level. The check runs over the whole tree in the background when the app is idle.

| Level | Mark in the legend |
|---|---|
| **error** | “The facts contradict each other.” |
| **to check** | “An unusual value worth checking.” |
| **lead** | “A lead for the research, not an error.” |
| **unusual** (☆) | “A finding marked “Not an error”.” |

- A finding goes into the cell of its fact: a parent's age at birth into **Father’s/Mother’s age at birth** at the
  child, a finding about a marriage into the age and date of marriage, a recorded age into the recorded age and its
  difference, a death before birth into both dates and the age, an event into the event's column, the age difference
  of partners into the partner, a possible duplicate into the name, the spelling of a place into the cells with that
  place. A finding without a cell of its own is only in the check columns.
- The columns of the group **Checks**: **Findings** (the count; “…” while the check runs), **Highest level**,
  **Unusual, checked** (the number of findings marked **Not an error**).
- A finding marked **Not an error** ([A5.7](A5-tree-check.md#A5.7)) stays in the cell as **unusual** (“Unusual, but
  checked”) and is not counted among the findings.
- **Limits:** a read-only tree does not allow marking a finding (“The tree is read-only: findings cannot be
  marked.”).
- **Controls:** a click on the mark opens a bubble (on a phone a bottom panel): the level, the text of the finding,
  “Finding 1 of 2” and
  - **Not an error** (the notice “Marked: not an error” with **Undo**); for an unusual one **Report again**;
  - **Data quality ›** opens the Data quality dialog at the group of this finding; for an unusual one at the list of
    marked findings.

  The legend **Marks** (“Marks in the cells”) also explains the uncertain date, reliability, a substitute value, a
  computed value and **Does not apply**. What each mark looks like: [A6.7.13](#A6.7.13).

<!-- zdroj: app:src/ui/table-view/table-checks.ts severityRank, parentAgeColumn, issueTargets (mapování nálezů na buňky), buildCheckIndex, CHECK_COLUMNS, applyChecks · table-ui.ts whenIdle (validateTreeData jednou), cellFindings · table-bubble.ts bubbleHeading, bubbleHtml, legendHtml, openBubblePanel, sheetElement · src/ui/tree-stats.ts showTreeValidationDialog (focus: skupina otevřená a posunutá; označené → seznam) · strings.ts table.sev.*, unusualChecked, notError, reReport, toQuality, dismissedToast, roNote, checksRunning, findingOf, legend, legendTitle, legendKind.*, legendText.* · commity 19cf28ea, e530019b, 59a8eed0 -->

<a id="A6.7.6"></a>
### A6.7.6 Filter, search and sort

The filter chooses the rows, the search narrows them further, the sort sets the order.

- **Chips** of the People table (unions have no chips, events and sources have their own, [A6.7.10](#A6.7.10),
  [A6.7.11](#A6.7.11)): **Living**, **Deceased** (they exclude each other), **Blood relatives**, **Family
  line** (a choice of family lines), **Generation** (a range), **Several unions**, **No birth date**, **Uncertain
  date** (birth or death), **No source**, **With findings** (error or to check; not a lead), **Unusual**,
  **Unconfirmed research** (only a tree from the research). The finding chips wait for the check (“Once the checks
  finish”). What does not fit is in **More (n)**.
- **A filter in a column** (**Filter…** in the header) by the kind of column:
  - values from a list (sex, union status, level of a finding, family line …);
  - a range **from**–**to** (for a date **Year**, for an age, count and percentage a number);
  - text: **contains** · **starts with**;
  - for each **Only empty** · **Only filled**.
- All filters apply at once. The number of filters is on **Filters (n)**, **Clear filters** cancels all. Without a
  row: “Nothing matches the filter”.
- **Search the table:** from 2 characters, regardless of letter case and diacritics, in the visible columns and in the
  union sub-rows too; matches are highlighted, their number is above the table.
- **Sort:** a click on a header sorts ascending, another click descending, a third cancels the sort; it sorts only by
  that column. Shift + click adds the column as a further key (another click turns it, a third removes it). The arrow
  ↑ ↓ at the header has the number of the key's order. Empty values are always at the end, in both directions.
  Numbers in text sort as numbers.
- **Limits:** the search is not saved into the view ([A6.7.7](#A6.7.7)).

<!-- zdroj: app:src/ui/table-view/table-filter.ts CHIP_ORDER, setChip (Žijící × Zemřelí), personPassesChip (finding: chyba nebo k ověření; unusual; unconfirmed jen researchTree, relN/relB/relD), CHECK_CHIPS, rodChoices, generationSpan, filterKindOf, cellPasses, foldText · table-filterbar.ts SEARCH_DELAY_MS, columnFilterForm, chipChoiceForm · table-state.ts řazení (vzestupně → sestupně → vypnuto; Shift přidá, otočí, odebere; prázdné na konci; Intl.Collator numeric) · strings.ts table.chip.*, chipRod, chipGen, moreN, filters, clearFilters, search, matches, noMatch, checksWait, matchContains, matchStarts, rangeFrom, rangeTo, rangeYears, onlyEmpty, onlyFilled · commity dd1d74bc, e64b8b06, fc746037 -->

<a id="A6.7.7"></a>
### A6.7.7 Table views

A view is a saved setting of the table under a name. The built-in views are ready readings of the tree; a person
saves a custom view.

| Built-in view | Rows | What it shows |
|---|---|---|
| **Overview** (default for people) | people | name, date and place of birth, date of death, age at death, partner, date of marriage and age at it, findings, overall completeness; sorted by date of birth |
| **Births and parents** | people | birth and baptism, parents, their age at the birth, birth completeness; sorted by date of birth |
| **Marriages** (default for unions) | unions | the couple, date and place of marriage, age and recorded age of both, status, witnesses, divorce, children, length, sources, completeness; sorted by date of marriage |
| **Deaths** | people | death, cause, burial, age and recorded age at death, death completeness; the chip **Deceased**; sorted by date of death |
| **Sources and citations** | people | number of sources, documentation, reliability of birth and death; from the fewest sources |
| **Gaps** | people | completeness overall and by parts, birth, parents, sources; from the least complete; unions collapsed |
| **Checks** | people | level and number of findings, dates, the parents' age, marriage; the chip **With findings**; from the highest level, then the number of findings |
| **All events** (default for events) | events | type, person or couple, date, place, age at the event, godparents, witnesses, officiant, source; sorted by date |
| **All sources** (default for sources) | sources | title, archive, book and reference, online, people, facts, read by the research, transcript; sorted by title |

- **A view saves:** the row type, the columns (order, widths, pinning, collapsed groups), the coverage row, the
  filter, the sort and the expanding of unions. It does not save the search, the selected row or the scroll.
- A changed view has the label **changed** and the options **Save**, **Save as new**, **Discard changes**. A built-in
  view does not change and cannot be renamed or deleted; its changes can only go **Save as new**. A custom view:
  **Rename…**, **Delete** (with a confirmation). Custom views are sorted by name.
- The table's work in progress (unsaved changes too) is remembered by the app for each tree on this device; after
  the page is reloaded the table is as it was left.
- **Saved views are part of the tree** (data version 17): saving, renaming and deleting have a step back and an entry
  in the change history. They go with the tree into the backup (JSON) and, when a part of the tree is separated, into
  the new tree too. GEDCOM does not carry them; a tree from the research keeps them when a new version is loaded.
  A damaged view is left out when loading.
- **Limits:** an older app (from 3.19.0) opens a tree saved by app 3.27.0 read-only and never saves it; after the app
  is updated the tree can be changed again.
- **Controls:** the menu **View** in the table's bar (**Built-in**, **Custom**, **Save as new…**, **Rename…**,
  **Delete**).

<!-- zdroj: app:src/ui/table-view/table-views.ts BUILTIN_VIEWS (9: overview, births, marriages, deaths, sources, gaps, checks, events, allSources), defaultViewId (události → Všechny události, prameny → Všechny prameny), defaultViewId, viewFromState, viewChanged, uniqueViewName, customViews (podle jména), workStorageKey strom.table.{treeId}, readTableWork, writeTableWork · table-columns.ts výchozí sloupce pohledů (:683 Sňatky, DEFAULT_VIEWS.events, .sources) · src/table-views-data.ts sanitizeTableView, keepTableViews (verze z výzkumu ponechá pohledy) · src/data.ts:298 sanitizeTableViews při načtení, :1720 saveTableView, deleteTableView (krok zpět, historie změn) · src/subtree.ts:148 · src/types.ts STROM_DATA_VERSION 17, StromData.tableViews · src/tree-manager.ts:630 isTreeNewer, src/data.ts:649 isNewerData (jen ke čtení, od aplikace 3.19.0) · src/ui/research-ui.ts, conflict-decide-ui.ts keepTableViews · strings.ts table.view, views.*, viewName.* (events, allSources), changed, save, saveAs, discard, builtinNote, saveAsMenu, renameMenu, deleteMenu, builtinLocked, viewWhat, deleteConfirm · commity d19a5942, c2d48747, 8ca649ff -->

<a id="A6.7.8"></a>
### A6.7.8 Row actions and edits

A click selects a row (a union sub-row too); the arrows, Page Up/Down and Ctrl+Home/End move the selection, Esc
cancels it.

| Action | What it does |
|---|---|
| **Show in tree** | switches to the Family view with the person as the central person, centred and highlighted |
| **Open person** (Enter) | opens the person's page |
| **Edit…** (double click) | opens editing of the person; at a union sub-row and in the Unions table the person's relationships on that union |

- In the Unions table the actions concern the person **Partner 1**.
- In the Events table they concern the first person of the row and **Edit…** opens editing of that event
  ([A6.7.10](#A6.7.10)); in the Sources table there is **Open source** ([A6.7.11](#A6.7.11)).
- After an edit the notice “Saved: …”, the row flashes briefly and the rows keep their order. A row that no longer
  matches the filter stays with the label “no longer matches” until the next change of the sort, filter or view.
  A change from the research is announced by “Research changed 3 facts: …”.
- **Limits:** in a read-only tree there is no **Edit…**.
- **Controls:** buttons at the selected row, the row menu (right button; expanding unions too). On a phone a tap on a
  row opens a panel with the actions and the unions (“Union 1: … · Edit ›”).

<!-- zdroj: app:src/ui/table-view/table-ui.ts tableMethods (tableRowAction: tree → Rodina, focus, highlight; open; edit → dialog osoby / panel vztahů na svazku), personOfRow (Partner 1), keepWork · table-refresh.ts keepOrder, watchEdit, changedKeys, bridgeChanges, namesList · table-grid.ts FLASH_MS · strings.ts table.act.*, dblClickHint, actionsOf, unionWith, editMore, staleRow, savedToast, bridgeToast · commity da6b9786, de46ae30, e4a35406 -->

<a id="A6.7.9"></a>
### A6.7.9 CSV and XLSX export

The export saves the table as it is seen into a file for spreadsheet programs: **CSV** or **XLSX** (an Excel
workbook).

- **What goes out:** the visible columns in the table's order (the columns of a collapsed group whole) and the rows
  after the filter, search and sort. The values are as the table writes them: dates in the app's notation,
  “abt. …”, “≈ 67”, “bap. …”, “–”.
- **Rows:** without a filter and search all rows go out (“Everything shown · 120 people”). With a filter or search
  there is a choice:
  - **Shown** (default): only the rows the table shows, with the count and a reminder of the filter (“Shown · 28 of
    866 people (filter: …)”);
  - **All … without the filter** (“All people without the filter · 866”): all rows of that type in the order of the
    sort, without the filter and the search.

  A row with the label “no longer matches” ([A6.7.8](#A6.7.8)) does not belong among those shown.
- A person with two or more unions: the first union that matches the filter is in their row, each further one in a
  continuation row with the person's facts empty. After the name is the column **Union** (“1 of 3”).
- **CSV:** text, UTF-8 with a BOM mark, the separator a semicolon, line ends CRLF; a cell that a spreadsheet program
  would run as a formula is neutralised. The marks of findings and the colours are not exported.
- **XLSX:** one sheet named after the view.
  - Row 1 holds the groups of columns (merged cells), row 2 the header, row 3 the coverage row ([A6.7.4](#A6.7.4)).
    The table's pinned columns and these three rows are frozen in the sheet.
  - Each group of columns is an outline: it can be collapsed, its first column stays. The continuation rows of
    unions are one level lower under the person's row (level 2 of the row outline).
  - A cell with a finding **error** or **to check** is shaded and has the findings in a comment. A lead and unusual
    have neither colour nor comment.
  - Counts, ages in whole years and completeness are numbers (completeness and coverage as a percentage); the rest is
    text as the table writes it (also “≈ 67”, “28–29”, dates). Text never becomes a formula. A source's link is a
    link in the cell.
- **File:** `{tree}_{view}_{YYYY-MM-DD}.csv` or `.xlsx`, without diacritics.
- **Controls:** **Export ▾** in the table's bar (on a phone in **⋯**): **Format** “CSV · for Excel and Google Sheets”
  or “XLSX · groups, frozen panes, check colours”, **Rows**, **Download CSV** / **Download XLSX**; the notice
  “Downloaded: …” with the number of people, rows and columns.
- **Limits:** the export from the tree menu (**Person table (CSV)**, [A7](A7-book-pages-and-export.md)) is a different
  file with fixed columns.
- **Since:** app 3.27.0

<!-- zdroj: app:src/ui/table-view/table-export.ts tableCsvField (neutralizace vzorců), buildExportTable, buildTableCsv (BOM, ;, CRLF, pokračovací řádky, sloupec Svazek), fileNamePart, tableCsvFileName (csv | xlsx) · table-xlsx.ts buildTableXlsx (řádky 1–3, merges, outline sloupců za ukotvenou částí, pokračovací řádky outline 1, freeze, errorFill/warningFill + findingsComment jen chyba a k ověření, href), xlsxNumber (COUNT_COLUMNS, věk ^\d+$, procento) · src/xlsx.ts (ignoredErrors numberStoredAsText, styl @ pro text) · table-viewbar.ts exportForm (Formát, Řádky: Zobrazené / Všechny bez filtru jen s filtrem nebo hledáním) · table-ui.ts tableExportNow (unfiltered: všechny řádky typu v řazení, stale ven) · strings.ts table.export, exportFormat, exportRows, exportCsv, exportXlsx, exportAll, exportShown, exportFilterNote, exportUnfiltered.*, exportWhat.*, exportWhatAll.*, exportFile, exportDownload, exportDownloadXlsx, csvUnionCol, csvUnionOf, exportedToast · commity 2368683b, 5a67797b, 4308633b, e0ce4ec2, ebc1542f, e5b97725 · dirigent:prace/1110-app-tabulka-p2, 1110-app-tabulka-opravy -->

<a id="A6.7.10"></a>
### A6.7.10 Events in rows

The Events table has a row for each event of the tree: who, when, where, at what age and who was present.

- **What a row is:**
  - each event of a person (baptism, occupation, residence, military service …) and each event of a couple;
  - birth and death from the person's facts, when something is recorded for them (date, place, address, source; for
    a death also the cause or the age);
  - the marriage of a union: for a marriage always, for another relationship (“Start of the relationship”) only with
    a recorded fact; the divorce (“End of the relationship”), when the union is divorced or its end is recorded.
- **A shared event** (residence, military service, emigration, immigration, naturalization, a custom event) recorded
  the same way at several people is one row with all those people. The same way means the same type, date, place,
  address, note and sources; the date must be recorded, and with it a place or a source. A baptism, occupation or
  title always belongs to one person only.
- **Columns** in the groups **Event** · **Participants** · **Source**:
  - **Type**, **Person or couple** (for a couple the blood relative of the home person first), **Date**, **Place**;
  - **Age at the event** as elsewhere ([A6.7.3](#A6.7.3)); up to one year, from exact dates, in days (“12 d”); for
    several people the age of each in the order of the names (“–” unknown); for a birth **Does not apply**;
  - **Value**: the value of the event (occupation, title), otherwise the cause; for a death the cause of death;
  - **Godparents**, **Witnesses**, **Officiant**, **Others present**: the participants by role; a person of the tree
    is a link;
  - **Source**: the cited sources “title, reference”, several separated by a semicolon; **Reliability** of the fact.
- **Chips:** **Births and baptisms** (also births from the person's facts), **Marriages** (also engagements, banns,
  licences, a contract), **Deaths and burials** (also cremations), **Other events**, **No source**.
- **Filter by participant:** a click on a participant's name offers “Filter: godparent …” (for a person of the tree
  also **Open person**). The filter is the chip “Godparent: … ×” (Witness, Officiant, Present) and replaces the
  previous participant filter. A person of the tree is looked for by the person, a written name by its letters
  regardless of case, diacritics and spaces.
- **A godparent who keeps turning up** ([A5.5](A5-tree-check.md#A5.5)) is in the participant's cell as a **lead**.
- **Controls:** the built-in view **All events**; the row actions ([A6.7.8](#A6.7.8)) concern the first person of
  the row. **Edit…** opens, for an event of a person, editing of the person at that event (for a shared one at the
  first copy), for a birth and death editing of the person, for an event of a couple its dialog, for a marriage and
  divorce the person's relationships on that union.
- **Limits:** placeholder persons have no rows; a birth and death without a recorded fact have no row.
- **Since:** app 3.27.0

<!-- zdroj: app:src/ui/table-view/table-events.ts buildEventRows (narození/úmrtí jen se zapsaným údajem, weddingRow: manželství vždy kromě marriageUnrecorded, partnersStart jen se zápisem; divorceRow), SHARED_TYPES, shareKey (typ, vlastní název, datum, místo, adresa, poznámka, prameny; datum a místo nebo pramen), mergeParticipants, eventEditTarget, MARRIAGE_COUPLE_TYPES · table-columns.ts EVENT_COLUMNS, eventPersons (pokrevní první), eventAgeCell, eventAge (dny < 366), eventValueCell, eventSourceCell, eventPill, DEFAULT_VIEWS.events · table-filter.ts EVENT_CHIP_ORDER, EVENT_KIND_CHIPS, lifeCategory, participantChip, eventHasParticipant (foldName), setParticipantFilter · table-ui.ts tableNameAction, tableRowAction (event → editTableEvent) · table-checks.ts PARTICIPANT_ROLE, recurring (recurringGodparent v buňkách účastníků) · strings.ts table.rows.events, group.event, participants, source, col.ev*, godparents, witnesses, officiants, others, chip.ev*, chipParticipant.*, filterParticipant.*, evKind.*, ageDays, viewName.events · commity 8de751c2, 63ed9def · spec 073 §14.1 · dirigent:prace/1110-app-tabulka-p2 -->

<a id="A6.7.11"></a>
### A6.7.11 Sources in rows

The Sources table has a row for each source of the tree (**Actions → Sources**, [A3.1](A3-evidence-in-the-app.md#A3.1))
and tells how much the source documents in the tree.

- **Columns** in the groups **Source** · **Use**:
  - **Title**, **Archive**, **Book, reference, folio**, **Online** (the address without `https://`; a web address is a
    link ↗ into a new window);
  - **People**: how many people have a fact that cites the source; a fact of a union documents both partners;
  - **Facts**: how many facts cite the source. A fact is one list of citations: the person's citation, birth, death,
    each event of the person, marriage, divorce and each event of the couple;
  - **Read by the research**: how many readers read the transcript (“1 reader”, “2 readers”: a person in the app and
    the research), otherwise “no”;
  - **Transcript**: yes / no; the catalogue of columns also has **Record date**.
- Citations of placeholder persons and sources of a story are not counted.
- **Chips:** **No person** (no person cites it), **Unread**, **With transcript**, **Online**.
- **Controls:** the built-in view **All sources**. At a row **Open source** and **Edit…**: both open the source
  manager at that source; **Show in tree** is not here.
- **Limits:** in a locked tree the source is only shown, without edits.
- **Since:** app 3.27.0

<!-- zdroj: app:src/ui/table-view/table-sources.ts sourceUsage (PERSON_CITATION_FIELDS, události, PARTNERSHIP_CITATION_FIELDS pro oba partnery, bez zástupných, ne příběh), buildSourceRows (katalog data.sources), sourceReaders (readBy user/research/both) · table-columns.ts SOURCE_COLUMNS, urlCell, shortUrl, readersCell, DEFAULT_VIEWS.sources · table-filter.ts SOURCE_CHIP_ORDER (srcNoPerson persons 0, srcUnread, srcTranscript, srcOnline safeHttpUrl) · table-grid.ts rowTail (source: open + edit) · table-ui.ts tableRowAction (source → openTableSource), openTableSourceId (zamčený strom → showSourceViewer readOnly) · strings.ts table.rows.sources, group.source, group.use, col.src*, chip.src*, readers, act.openSource, viewName.allSources, sources.readBy.* · commity 1a3a49f1, 3cf69ffa · spec 073 §14.2 · dirigent:prace/1110-app-tabulka-p2 -->

<a id="A6.7.12"></a>
### A6.7.12 Citations and godparents in the People table

The People table has columns that show from which source the birth, marriage and death come, and who was a
godparent.

- **Citations** (group **Sources**): **Birth: archive**, **Birth: reference**, **Birth: link** and the same for
  **Marriage** and **Death**. The cell shows the archive, reference or web address of the first cited source; further
  sources are in the button “+N”.
  - Birth takes the citations of the birth, then of the events of birth and baptism; death the citations of the
    death, then of the events of death, burial and cremation; marriage the citations of the union (at a union sub-row
    of that union). Each source once.
  - Sources from the origin of a fact in the research are not counted, only citations in the data.
  - For a living person the death columns have **Does not apply**.
  - Sorting and filtering go by the first source.
- **Godparents** (group **Birth and baptism**): the godparents of the events of birth and baptism, each once; a person
  of the tree is a link. A godparent who keeps turning up ([A5.5](A5-tree-check.md#A5.5)) has the mark **lead** in the
  cell.
- **Controls:** the columns are switched on one by one in the panel **Columns** ([A6.7.2](#A6.7.2)). A click on “+N”
  opens the bubble **Other citations** (on a phone a bottom panel); a click on a source opens it in the source
  manager.
- **Since:** app 3.27.0

<!-- zdroj: app:src/ui/table-view/table-sources.ts factCitations (narození: birthSourceIds + birth/baptism; úmrtí: deathSourceIds + death/burial/cremation; sňatek: sourceIds svazku; neznámé id ven, každý jednou) · table-columns.ts citeCell (první pramen, moreSources), bArch…dUrl (group sources, unionScoped, deathOnly → naCell), godparentsCell (group birth), personGodparents · table-checks.ts personRecurring (sloupec godparents) · table-grid.ts moreCitesHtml · table-ui.ts showTableCites, openTableSourceId · strings.ts table.col.bArch…dUrl, godparents, moreCites, citesTitle · commity 208d8b92, 21a132c1 · spec 073 §14.3, §14.5 · dirigent:prace/1110-app-tabulka-p2 (citace: jen citace v datech, ne FactReliability.sourceIds) -->

<a id="A6.7.13"></a>
### A6.7.13 Marks in the cells

An overview of everything the table uses to mark a cell or a row. The legend **Marks ⓘ** at the top right of the
table (the bubble “Marks in the cells”, on a phone a panel from below) shows the first two tables: the four levels
of a finding and the five kinds of value.

**Findings of the check** ([A6.7.5](#A6.7.5)). The mark stands at the end of the cell after the value; a click on a
cell with a finding opens the finding's bubble.

| Mark | What it looks like | What it means (legend) | Where it appears |
|---|---|---|---|
| **error** | a solid red circle with a white “!”; the cell tinted red | “The facts contradict each other.” | the cell of the fact the finding is about; **Findings**, **Highest level**; a collapsed group |
| **to check** | a solid amber square with rounded corners and “?”; the cell tinted amber | “An unusual value worth checking.” | as for error |
| **lead** | a small hollow grey ring; the cell not tinted | “A lead for the research, not an error.” | as for error; a godparent who recurs ([A6.7.10](#A6.7.10), [A6.7.12](#A6.7.12)) |
| **unusual** | a grey hollow star “☆”; the cell not tinted | “A finding marked “Not an error”.” | the cell of the fact; **Unusual, checked**; **Highest level** when all the person's findings are marked |

- The circle and the square differ in shape and sign, not only in colour. A screen reader reads the mark as the level
  and the text of the finding.
- **Findings** has the mark of the highest level after the number; **Highest level** has it before the word. A person
  without a finding has a faint “0” in the column **Findings**.
- A collapsed group of columns (a narrow band) shows the highest mark of its cells.

**Kinds of value.** None of them is a finding.

| Mark | What it looks like | What it means (legend) | Where it appears |
|---|---|---|---|
| **uncertain date** | the date underlined with dots; the word **abt.**, **bef.** or **aft.** in smaller grey type before the date | “About, before, after or a range; not a finding.” | date columns ([A6.7.3](#A6.7.3)) |
| **reliability** | in the legend a ring with “✓”; in the cell the step's name in grey: **Confirmed**, **Proven**, **Probable**, **Possible**, **Lead**, **From family tree**, **No source** | “Only in the Reliability and research columns.” | **Name reliability**, **Birth reliability**, **Death reliability**, **Marriage reliability** (people, unions), **Reliability** (events); the steps: [S7.1](S7-reliability-and-verification.md#S7.1) |
| **substitute** | the abbreviation **bap.** or **bur.** in a small frame before the value, the value in italics; the tooltip “Baptism, birth unknown”, “Burial, death unknown” | “A baptism for the birth, a burial for the death.” | date and place of birth and death ([A6.7.3](#A6.7.3)) |
| **computed** | grey type; “≈ 67” an estimate, “28–29” a range | “A range from an inexact date, ≈ from an estimate.” | ages, the difference of the recorded age, length of the union, counts, generation, completeness; in the header “Computed from: …” |
| **does not apply** | “–” in grey italics; the tooltip “Does not apply” | “Does not apply to the person.” | death for a living person (in **Death completeness** “living”), the father's or mother's age without a recorded parent, union columns of a person without a union, **Age at the event** for a birth |

- The columns **… reliability** sort from **Confirmed** to **No source** in the order of the table.

**Other marks** (the legend does not show them):

| Mark | What it looks like | What it means | Where it appears |
|---|---|---|---|
| “…” | three faint dots; the tooltip “Checks are running…” | the check of the tree is still running | **Findings**, **Highest level**, **Unusual, checked** |
| “◌ Checks are running…” | a hollow ring and text at the top right of the table | the same for the whole table; the finding chips wait for now | above the table, next to **Marks ⓘ** |
| a percentage with a bar | a number and a short bar whose filled part is the value | completeness ([A6.7.4](#A6.7.4)) | the columns **… completeness** |
| a bold number, “–” | in the coverage row | coverage under 50 %; “–” a column with no cell it would apply to | **Coverage row** ([A6.7.4](#A6.7.4)) |
| “+2” | a number in an oval frame after the first citation | further cited sources; a click opens **Other citations** | citations of birth, marriage, death ([A6.7.12](#A6.7.12)) |
| “↗” | after an underlined web address | a link into a new window | **Online**, the citations “… link” ([A6.7.11](#A6.7.11)) |
| ●○, ●● | one or two solid dots before “1 reader”, “2 readers”; the tooltip says who read the transcript | how many readers read the transcript | **Read by the research** ([A6.7.11](#A6.7.11)) |
| “12 d” | a number with “d” | an age under one year in days | **Age at the event** ([A6.7.10](#A6.7.10)) |
| ▾, ▸ | a triangle before the name | the person's unions expanded, collapsed ([A6.7.1](#A6.7.1)) | **Name** of a person with two or more unions |
| “3 unions” | for a collapsed person in an oval frame after the name; for an expanded one in the column **Partner** in grey italics | the person's number of unions | the person's row |
| “└ Union 2 of 3” | an indented sub-row | one union of the person | the union sub-row |
| “2 unions outside the filter · show” | a button in an indented row | unions that do not match the filter; those shown are dimmed | under the union sub-rows |
| “no longer matches” | the whole row faint, the text in italics at the end | the row no longer matches the filter after an edit ([A6.7.8](#A6.7.8)) | until the next change of sort, filter or view |
| highlight | the matching text with a background | a match of the search ([A6.7.6](#A6.7.6)) | visible columns |
| ↑, ↓ (↑1, ↓2) | an arrow in the header, with a number for several keys | the direction and order of a sort key ([A6.7.6](#A6.7.6)) | the column header |
| −, + | a sign by the group's name | collapse, expand a group of columns ([A6.7.2](#A6.7.2)) | the row of groups above the header |

- **Limits:** the CSV export carries neither marks nor colours; XLSX carries only the tint and a comment for error and
  to check ([A6.7.9](#A6.7.9)).
- **Controls:** **Marks ⓘ** at the top right of the table.
- **Since:** app 3.27.0

<!-- zdroj: app:src/ui/table-view/table-grid.ts MARK_GLYPH (error „!“, warning „?“, info prázdný, unusual „☆“), markHtml (role img, aria-label úroveň: text), cellClasses (aggregate, na, computed, uncertain, subst, ghost, issue), cellText („–“), cellInner (značka za hodnotou; u čísla vpravo za, jinak před slovem), moreCitesHtml „+N“, cellValueCore (tv-comp proužek 30 px, tv-subst, tv-qual), linkHtml „ ↗“, readersHtml (fs-dots), nameCell (▾/▸, tv-unions-pill unionsN, └ unionKofN, hiddenUnions), sort mark ↑/↓ s číslem, tv-group-toggle −/+ · table-bubble.ts legendHtml (4 značky + uncertain „1890–1892“, reliability ✓, subst křt., computed „≈ 67“, na „–“) · table-bar.ts createStatus (◌ checksRunning, legenda „Značky ⓘ“) · table-columns.ts checksPendingCell („…“ ghost), findingsCell („0“ ghost), topSeverityCell, unusualCell (☆), pillCell + reliabilityText + RELIABILITY_RANK (human, proven, probable, possible, import, lead, none), readersCell (dots [true, n > 1]), naCell (relD, fAge, mAge, unionScoped bez svazku, evAge narození), eventAge (ageDays) · table-subrows.ts aggregate „n svazků“ · table-checks.ts bandSeverity · table-coverage.ts LOW pod 50 % · index.html CSS .tv-mark--error (kolečko 16 px, --danger), --warning (čtverec radius 3px, --warning), --info (kroužek 10 px, okraj --text-faint), --unusual, .tv-cell--error/--warning (danger-soft, warning-soft), --uncertain (dotted), --na (kurzíva), --computed, .tv-subst, .tv-cites-more, .tv-row.is-stale, .tv-stale-note, mark.tv-hit · strings.ts table.legend, legendTitle, legendKind.*, legendText.*, sev.*, subst.*, qual.*, na, living, checksRunning, moreCites, citesTitle, readers, ageDays, unionsN, unionKofN, hiddenUnions, staleRow, col.relN/relB/relD/relW/evRel, reliability.human/proven/import/none, factStatus.probable/possible/lead · app f34d41e1 · Milan 10. 11. (dirigent:prace/1110-doc-tabulka-znacky bod 1) -->
