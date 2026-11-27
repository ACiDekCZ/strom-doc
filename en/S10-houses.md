<a id="S10"></a>
# S10 Houses

A house is a town and a house number. The app builds houses from the records of the tree: from births, marriages,
censuses, residences and deaths that have a house number. On request the research finds a house's history: the numbers
over time, the location, what happened to the house, the holders, the residents and the look, each claim with a source
and a certainty. The result is in the app in the **Houses** window and on the house page, in the book and in the family
pages. The chapter describes the Strom app 3.33.0 and the research 1.38.0.

| What | App | Terminal |
|---|---|---|
| the tree's houses | the **Houses** window ([S10.2](#S10.2)), the house page ([S10.3](#S10.3)) | `strom house list`, `strom house show` |
| the history of one house | **Find the house history…** ([S10.4](#S10.4)) | `strom house request` ([S10.4.1](#S10.4.1)) |
| houses on their own | **Research for this tree › House history** ([S10.5.1](#S10.5.1)) | **Settings › History of the houses in this research** |
| own research of a house | **Take over research from a file…** ([S10.8](#S10.8)) | `strom house import` |
| a conversation about a house | **Discuss with the agent** ([S10.9](#S10.9)) | `strom chat --house` |
| the story of a house | ⋯ **Write the story of the house** ([S10.14](#S10.14)) | `strom house story` |
| book and pages | the choice **House**, the chapter **Houses** ([S10.10](#S10.10)) | – |

<!-- zdroj: dirigent:spec/030-historie-domu, spec/145-rozsireni-domu (T1, T2, T5, T6, T7) · app:src/houses.ts, src/ui/houses-ui.ts, src/house-page.ts · research:src/core/houses.ts, src/core/houseauto.ts, src/commands/house.ts, assets/method/house.md · CHANGELOG.cs.md aplikace 3.33.0, výzkum 1.38.0 „Historie domů“, „Výzkum domu“ -->

<a id="S10.1"></a>
## S10.1 A house: town and number

A house is known by its town and house number. The app does not store houses; it builds them from the records of the
tree. A person belongs to a house when they have a birth, marriage, census, residence or death in it. Only what a person
said about a house is stored: the house name, houses merged and separated, the location and events revealed for
outputs.

- **House with history:** at least **2 generations** (a parent and a child) lived in the house, **or** the house's
  records span at least **30 years**. Partners are one generation. “One family for N years” is the longest span of one
  connected family (at least two people).
- A house shows the sequence of the men's surnames over time (“Horák → Vlk → Horák”) and the tag **married in**: the
  person was not born in the house and is the partner of someone from the house. A person of unknown sex has no tag.
- The research keeps a house as a record `A…` (`A0001`). The record is created with the first entry or task. Until
  then the house is only in the facts of the tree.
- **Limits:**
  - the **Houses** window and everything around houses is only in a tree that has at least one house with a number;
  - placeholder persons (persons without details, only standing in) do not count towards a house;
  - in the research the house's town must be a place of the research ([R4](R4-places.md)), otherwise the research
    writes nothing to the house and suggests `strom place add`.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:src/houses.ts houseOfFact, collectHouses, LIVED_FACT_KINDS, houseIdOf, isOverThreshold (HOUSE_THRESHOLD_GENERATIONS 2, HOUSE_THRESHOLD_YEARS 30), generationsOf, familyYearsOf, marriedInOf, hasNumberedHouse · StromData.houses (datová verze 27) · dirigent:spec/030 rozhodnutí 26. 11. · research:src/core/model.ts House (A…), src/core/houses.ts recordOf (house.town), townRecord · commity app 94ed2240, research dea67112, 54ed35c7 -->

<a id="S10.1.1"></a>
### S10.1.1 How a house number is read

The house number is taken from the fact's place and from the house number or address field. Markers before the number
do not count: “16”, “čp. 16”, “č. p. 16”, “č.p.16”, “Nr. 16”, “Haus Nr. 16”, “House No. 16” and “nr domu 16” are the
same house.

- “Bělokamen čp. 16” is the town Bělokamen and house 16; “Bělokamen, Kopřivná 12” is a house by street; “Lhota, okres
  Horní, čp. 3” is the town “Lhota, okres Horní”. A bare “Bělokamen 16” is a house only where the **Places** window
  offers the bare number too; “Praha 5” is not a house (the number belongs to the town's name).
- A street is compared without diacritics and case. “13/2” is one number.
- Houses in a town go in order: numbers (4, 12, 12a, 13/2, 100), then houses by street, then the rest.
- **Limits:**
  - without a number (“mlýn”, “Kopřivná”) no house is made;
  - “12a” and “12 a” are two houses; a person merges them ([S10.1.2](#S10.1.2));
  - a registration number has no series of its own: “č. ev. 5” is the same house as “čp. 5”.
- **Since:** app 3.33.0, research 1.38.0
- **From research 1.38.0:** houses written earlier in two ways are set right by `strom fixes house-numbers`
  ([S10.12](#S10.12)).

<!-- zdroj: app:src/places.ts townOfPlace, houseKey, houseOrder, compareHouses (466–545) · research:src/core/house.ts houseKey, HOUSE_WORDS · nález: ev. č. bez vlastní řady (app), „12a“ ≠ „12 a“ -->

<a id="S10.1.2"></a>
### S10.1.2 Numbers over time, merging and the house name

House numbers changed in the past. A house therefore has a list of numbers: from the records of the tree and from the
research. An older number is shown in brackets (“(formerly 12)”). Records from before a confirmed renumbering are only
probable.

- The research only proposes a **renumbering** (“proposed by the research: the same house before renumbering”). A
  person confirms it (**Confirm**) or rejects it (**Not the same house**). The answer “not the same house” is never
  sent to the research again.
- **Merge with another house…** joins two entries of one house (it offers houses of the same town). **It is a different
  house…** separates a number that does not belong to the house; with a research that can do it, the answer “not the
  same house” can be sent to the research right away. Merging applies only to the house index and the house page; the
  people's facts do not change. Each merge and separation is one step of **Undo** and goes into the history of changes.
- The **House name** (at most 80 characters) is written on the house page. The research does not overwrite a name
  given by a person.
- **Limits:**
  - a renumbering, a location and “not the same house” are confirmed only by a person (in the app, in the terminal or
    in a system window), never by the agent;
  - the research does not overwrite a fact a person confirmed or gave; a new fact of the research goes beside it;
  - when trees are merged, the word on houses is carried over; only the house name and merging go to GEDCOM
    ([S10.11](#S10.11)).
- **Controls:** app: house page → **Numbers over time** → **Confirm** / **Not the same house**; the house's ⋯ →
  **Merge with another house…**, **It is a different house…**, **House name…**. Terminal:
  `strom house confirm <house> renumber|location|not-same`.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:src/houses.ts withResearchNumbers · src/ui/houses-ui.ts merge, split (houses.splitSend jen s house.confirm) · DataManager.setHousesUserData (Zpět, záznam změn) · src/ui/house-page-ui.ts startHouseNameEdit (80 znaků) · src/ged-houses.ts keepHouses · strings.ts houses.was, merge, mergeNote, split, splitSend, farmName · research:src/core/houses.ts confirmHouse (HOUSE_CONFIRMS renumber, location, notSame), replaceHouseItem (house.confirmed) · src/commands/house.ts confirm (člověk, STROM_FOR_APP) · commit app 94ed2240 -->

<a id="S10.2"></a>
## S10.2 The Houses window

The **Houses** window shows the tree's houses by town. At the top is the sentence “Houses from the records in the tree.
House numbers changed in the past; records from before a confirmed renumbering are only probable.” and the button
**Terms** with a glossary (farmstead, cottager, retirement right, lodger, servants, house no.).

- **Bar:** the search **Search town, number, surname** (a number written in any way finds the house, names both birth
  and married, without diacritics); the town chip **Town: …**; **With history only**; **Researched** (only with a
  research that sends houses); **Sort**: **Number**, **Oldest**, **Most people**, **Recently researched** (only with a
  research). The summary “{N} houses in {M} towns”.
- **Towns** go by the number of houses, then by name; for a town the district (from the research's places), the number
  of houses with history, of house numbers and of people.
- **House row:** the number (and the older number), the house name, the years, the sequence of surnames, “N people · N
  generations”, the married-in tags and the research state ([S10.4](#S10.4)). Houses with history
  ([S10.1](#S10.1)) are at the top; the others in the group **More houses (N)** (“below the threshold of 2 generations
  or 30 years”). Loading goes 40 houses at a time (**Show more**).
- **Expanded house:** points of interest (one family for N years, the number of numbers, the oldest record), the
  people's records (8, then “and N more records…”) and **House page ›**. A click on a person closes the window and
  shows the person in the tree.
- **⋯ at a house:** **House page**, **On the map**; research actions ([S10.4](#S10.4), [S10.9](#S10.9)), also for a
  house below the threshold; **Merge with another house…** and **It is a different house…** ([S10.1.2](#S10.1.2)).
- **Limits:** empty selections say why (“No house has a history of 2 generations or 30 years.”, “No house has been
  researched yet.”).
- **Controls:** app: **Actions › Tree › Houses…** and in **Manage trees** ⋯ at the open tree (after Places);
  **Houses ›** in **Research for this tree**; **Houses in this town ›** in the **Places** window and in a house's
  bubble on the map (opens the window with the town chip); **‹ Houses** from the house page.
- **Since:** app 3.33.0

<!-- zdroj: app:src/ui/houses-ui.ts (lišta, obce, řádek, HOUSES_BATCH 40, openHouseRowMenu, akce výzkumu i pod prahem 96c78f0a) · src/houses-view.ts (hledání) · src/ui/tree-actions.ts housesRows (isActive && hasNumberedHouse, 0c97014e) · strings.ts houses.menu, intro, terms, searchPh, townOnly, onlyHistory, researchedOnly (169c35b0), sortLabel, sortNumber, sortOldest, sortPeople, sortResearched, count, townMeta, more, moreWhy, emptyHistory, emptyResearched, townHouses, pageItem · nález N3: okno i u adresy s ulicí a číslem -->

<a id="S10.3"></a>
## S10.3 The house page

The house page has the form of the person page: **‹ Houses**, **Save HTML**, ⋯ and close. From three sections on it
has a table of contents.

- **Sections in order:** the header (town and number, house name, town with district, parish, “In the tree”: years,
  generations, people; “Research”: state) · **In brief** · **Story** ([S10.14](#S10.14)) · **Numbers over time** · **Timeline** · **Holders and
  residents** · **The building** ([S10.7](#S10.7)) · **Map** ([S10.3.1](#S10.3.1)) · **What is not known** (with
  **Answer**) · **What was searched** (with **Only in the reading room**) · **Sources and materials**.
- The **Timeline** has an origin at each row: **from research**, **from own research**, **conjecture**, **probable**.
  [S10.3.3](#S10.3.3) describes the rows from the tree's records.
- **Holders and residents** are kept apart: “A resident is not the same as an owner.” Gaps show “not known · see What is
  not known”; people outside the tree have “outside the tree”.
- **Researched state:** ✓ and the day (“done 12 Mar 2026”) in the header, in the **Houses** window and in the bubble on
  the map.
- **Without a research result** the page has the header, **In brief**, **Numbers over time**, **Timeline**,
  **Residents from the tree**, **Map** and a sentence on where it comes from (“This page is built from the records in
  the tree.”, or that the house is in the queue).
- **⋯ of the page:** **Save HTML** ([S10.3.2](#S10.3.2)) · **Open in the book…** ([S10.10](#S10.10)) · **On the
  map** · **House name…** · research actions ([S10.4](#S10.4)) · **Write the story of the house**
  ([S10.14](#S10.14)) · **Discuss with the agent** ([S10.9](#S10.9)) · **Attach material…** · **Take over research from a file…** ([S10.8](#S10.8)) · **Merge with another house…** ·
  **It is a different house…**
- **Controls:** app: **House page ›** in the **Houses** window, in a house's bubble on the map and at the link to a
  house on the person page ([S10.11](#S10.11)).
- **Since:** app 3.33.0

<!-- zdroj: app:src/house-page.ts buildHousePage (houses.page.sec.* kicker, sum, numbers, timeline, people, look, map, unknown, passed, archiveOnly, sources; treeResidents, page.queued, page.treeOnly, page.noResearch, origin.*, notOwner) · src/ui/house-page-ui.ts toggleHousePageMenu · strings.ts houses.st.done, houses.page.* · commity 53d23b9f, 6cbffa3b, 169c35b0 · nález N4: pořadí proti spec 030 K3.1 (V kostce, Podoba, Mapa, Co se prošlo navíc) -->

<a id="S10.3.1"></a>
### S10.3.1 Map and location of the house

The **Map** section shows the house (zoom 17), or the town when the house's location is not known (zoom 14). A
sentence under the map says where the location comes from.

| Sentence | When |
|---|---|
| **Location set by hand** | a person moved the point |
| **Location confirmed** | a person confirmed the research's point |
| **Location by today’s house number · high certainty** | the research found the house in today's address register |
| **Location from research · high certainty** | another certain point of the research (cadastre, old map, description) |
| **Location uncertain (the number may have changed)** | a research point without high certainty |
| **The house location is not known; the town is shown.** | no point |

- **Map layer:** **Today** and the layers the research supplied for the house's place: **Orthophoto today** and
  **Aerial 1950s** (Czechia). Without them “Today’s map only; the research has no other layers for this country.”
- **Confirm location** is only at an uncertain point of the research on which a person has not said anything yet.
  **Move the point** moves the point by dragging. Both are saved in the tree (one step of **Undo**) and, with a research
  that can do it, also in the research as a person's word.
- **Open elsewhere:** OpenStreetMap, Mapy.com, Google Maps, Street View and today’s view, with the note “The location
  and the photos are of today; the historical house number may not match.”
- **Limits:**
  - the research does not overwrite a location a person confirmed;
  - **Open elsewhere** is only at a house with a point of its own;
  - the book, the saved house page and the family pages show the location only for a house without people of the
    last roughly 100 years, and then as a cut of the map ([S10.3.4](#S10.3.4)).
- **Controls:** app: house page → **Map** → **Map layer**, **Confirm location**, **Move the point**, **Hide location
  in outputs** ([S10.3.4](#S10.3.4)); terminal `strom house confirm <house> location`.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:src/house-map.ts (zoom 17/14, min 12, max 18), src/ui/house-map-ui.ts (page.map.layers today, ortho, aerial, onlyToday; posManual, posConfirmed, posHigh, posSure, posUnsure, noPos; confirmPos, move, saveHousePoint s house.confirm; Otevřít jinde) · commity 90c54cc6, 307c3a8f, bc1833b9 · research:assets/maplayers.json cz-ortho, cz-ortho-1950 · src/core/houses.ts confirmHouse location (jistota high, původ user), house add location odmítnuto po potvrzení -->

<a id="S10.3.2"></a>
### S10.3.2 The saved house page and protecting people

**Save HTML** saves the house page as one file (e.g. `belokamen-cp-16.html`) without map tiles from the network;
pictures of the house are only a link, the location is a cut of the map right in the file ([S10.3.4](#S10.3.4)). The
saved house page, the book and the family pages protect the people of the last roughly
100 years.

- **Never:** today's owners; names of the living; the name of a witness.
- **People of the last roughly 100 years** only by name and role, without years.
- **Research events of the last roughly 100 years and sensitive events** (confiscation, expulsion) are left out until
  a person reveals them (**Show in outputs**).
- **Location** only for a house without people of the last roughly 100 years and only when not hidden by hand
  ([S10.3.4](#S10.3.4)); for a house with such people no house name either.
- **The story of the house** only approved and only whole: a story that names a protected person is left out whole
  ([S10.14.2](#S10.14.2)).
- The house page says what is missing in the outputs and why: “In outputs (HTML, book) N events and the house
  location are not shown (people of the last ~100 years).”, “… N events are not shown; the house location is hidden
  by hand.”
- **Controls:** app: house page → **Save HTML**; at an event **Show in outputs**.
- **Since:** app 3.33.0

<!-- zdroj: app:src/house-privacy.ts, src/privacy.ts RECENT_YEARS 100, buildHousePageDocument, housePageFileName · strings.ts houses.reveal, houses.hiddenSummary, houses.page.save · commit 6f8a9d88 · T3: app:438de916 src/house-privacy.ts houseOutputFilter (locationBy recent|manual), strings.ts houses.hiddenSummary · T4: app:3473602e src/house-privacy.ts houseStoryForOutput -->

<a id="S10.3.3"></a>
### S10.3.3 The timeline from the tree's records

The rows of the **Timeline** from the tree's records go by year, one per record; a couple's shared record is one row.
What one row already says is not repeated.

- **Birth and baptism** of the same person in the same year are one row "born". A baptism without a birth has the
  row "baptized".
- **Residence:** several residences of the same person in the same year are one row "residence". The residences of
  partners in the same year are one row too, with both names, as a marriage is.
- Deaths, marriages, censuses and the research's records stay one row per record.
- **Limits:**
  - residences without a year are not joined;
  - neither the tree nor the research changes: only the rows the timeline shows are joined;
  - the rows are made the same way on the house page, in the saved page ([S10.3.2](#S10.3.2)) and in the book of
    houses ([S10.10](#S10.10)).
- **Controls:** app: the house page → **Timeline**.
- **Since:** app 3.33.0

<!-- zdroj: app:3dc5647c src/house-page.ts houseTreeRows → joinRepeatedRows (narození jedné osoby a roku jednou, narození před křtem; bydliště s rokem a sdílenou osobou nebo partnery partnersIn), factLabel isBaptism (událost baptism → baptizedM/F) · src/book-houses.ts houseTreeRows · strings.ts houses.ev.bornM, bornF, baptizedM, baptizedF, residence · src/__tests__/house-page.test.ts · dirigent:prace/1127-app-147-materialy (Přibaleno, schválená tabulka) -->

<a id="S10.3.4"></a>
### S10.3.4 The house location in outputs

The family book, the saved house page and the family pages show the house's location as a picture: a cut of today's
map with the point and the number of the house. Below it are the coordinates, how certain the number match is and the
map's attribution. So the output shows the location even without the network.

- **When the location shows:** only for a house with a point (set by hand or by the research) and only when both
  hold:
  - there are no people of the last roughly 100 years in the house: the living, people of the tree from those years,
    house entries from those years, or holders and residents with years in that time (also people the tree does not
    know);
  - a person has not hidden the location (**Hide location in outputs**).
- **Certainty:** “Today’s location · number match confirmed” when a person set or confirmed the point (in the app or
  in the research); otherwise “Today’s location · number match assumed”.
- **Picture:** today's OpenStreetMap map with the attribution “© OpenStreetMap contributors, licence ODbL”. HTML (the
  saved house page, the family pages, also in the ZIP and in the gift) adds as a further picture the historical layer
  the research supplied for the house's place ([S10.3.1](#S10.3.1)); the book gives only today's map and does not
  split the cut across pages.
- **Without the network:** the cut is made once and the app keeps it in this browser; the next book, PDF or gift
  takes the kept one. Without the network and without a kept cut, or while the map is not allowed (**Show the map**),
  the output gives only the coordinates and the certainty, without an error. At most 10 s are waited for one picture.
- **House page**, the **Map** section: for a house whose location the outputs would show, the line “Outputs (HTML,
  book) show the house location.” and **Hide location in outputs**. After hiding, “The house location is hidden by
  hand in outputs (HTML, book).” and **Show location in outputs**. Each is one step of **Undo**.
- **Book:** the option **House locations** (on by default, remembered): “A cut of today’s map with the point of
  a house without people of the last ~100 years; off: the town only.” It is there only with the part **Houses** and
  only when the book has a house whose location can be shown. The chapter's note then reads “Events after <year> and
  the location of a house with people of these years are not given in the book.”
- **Limits:**
  - people of the last roughly 100 years come first: a manual **Show location in outputs** does not override them,
    and for such a house there is neither the line nor the button; the page says why the location is missing
    ([S10.3.2](#S10.3.2));
  - hiding by hand is only in the app's tree (the JSON file); it goes neither to the research nor to GEDCOM;
  - a read-only tree shows only the state, without the button.
- **Controls:** app: house page → **Map** → **Hide location in outputs** / **Show location in outputs**; export
  **Family book** → **House locations**.
- **Since:** app 3.33.0

<!-- zdroj: app:438de916 src/house-privacy.ts houseOutputFilter (location jen bez recentPeople a bez hideLocation; locationBy recent|manual; locationSure confirmed: user.location nebo research.location.confirmed), src/house-map-shot.ts (HOUSE_SHOT_TIMEOUT_MS 10 000, today = OSM dlaždice, vrstvy výzkumu jen HTML, ShotCache), src/ui/house-map-shots.ts (IndexedDB strom-map-shots, tilesAllowed: isMapTilesAcknowledged), src/book-houses.ts (figure, houseCoordsText, houseSureText), src/book-options.ts bookHouseMaps (výchozí zapnuto), src/book-memory.ts houseMaps, src/ui/book-ui.ts book-house-maps, src/types.ts HouseUserData.hideLocation (ne v ged-houses.ts) · strings.ts houses.page.map.outShown, outHidden, hideOut, showOut, sureConfirmed, sureAssumed, osmAttribution; book.dlg.houseMaps, houseMapsHint; book.houseChapterProtected; map.tilesNoticeOk · dirigent:spec/145 T3 · prace/1127-app-145-vypraveni-poloha Výsledek -->

<a id="S10.4"></a>
## S10.4 Requesting a house's history

The history of one house can always be requested, whether **House history** ([S10.5](#S10.5)) is on or not. A
requested house goes to the top of the research queue.

- **House state** at the row, on the page, in the bubble on the map and in the **Places** window: **not researched**,
  **queued**, **being researched**, **done <day>**, **waiting for an answer** (with **Answer**), **postponed**, **own
  research waiting to be taken over**, **queued: the look of the house**.
- **Actions by state:** not researched and postponed → **Find the house history…**, with House history on **Move to
  the top**; queued → with House history on **Move to the top**; done → **Request again…**; being researched and
  waiting for an answer → nothing.
- **The window History of house <number>, <town>:** what is searched (“The search covers parish registers, chronicles,
  maps and other permitted sources.”, for a house requested again “Sources already searched are not searched again; only
  new and unsearched sources are.”); the estimate “One research session, about <time>. Uses the research agent’s AI
  subscription.”; **Neighbouring family houses in the town are processed together** (at most 3 houses, houses with
  history preselected); **Attach material… (optional)**; **Cancel** / **Find history**.
- **Estimate:** the median of the measured house sessions in this research; until at least 3 are measured, it is 30
  minutes per house and 20 minutes per town skeleton, and no cost is shown.
- **Which way it goes:** with House history on, the house goes over the bridge straight to the top of the queue,
  without a terminal (“The house goes to the top of the research queue over the bridge, without a terminal window.”;
  then “House <number> is at the top of the research queue.”). With it off, the app opens the research terminal and the
  word is given there ([S10.4.1](#S10.4.1)); the action has the mark **AI + terminal**
  ([S4.5.1](S4-research-from-the-app.md#S4.5.1)).
- **In the queue:** a house's task is requested and is never postponed. The town skeleton ([S10.5](#S10.5)), when the
  town does not have one yet, goes before the house. The house waits for its town's skeleton even after being moved to
  the top. A live task is only moved, and the neighbours are added to it. A finished house is searched again only in
  new sources.
- **Limits:**
  - only a house where someone of the tree lived, and a town that is a place of the research; neighbouring houses only
    from the same town;
  - neighbours are not offered for a house that is queued, being researched or waiting, nor for one requested again;
  - not in a Strom archive nor with a research waiting for an agent;
  - **Find the house history…** with House history off only where the app can open the research terminal;
  - a refusal (research busy, locked, disk full, no connection) gives the reason and changes nothing.
- **Controls:** app: the house state or ⋯ at a house in the **Houses** window, on the house page, in the bubble on the
  map, in the **Places** window (**House history <number>**); terminal: [S10.4.1](#S10.4.1).
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:src/ui/house-state-ui.ts (houses.st.*), src/ui/house-request-ui.ts houseActionOf, dialog houses.req.* (HOUSE_REQUEST_WITH_MAX 2, HOUSE_DEFAULT_MINUTES 30 + 20), POST /houses/request, houseSearchLink · src/research-link.ts RESEARCH_LINK_MARKS.house · commity a79b53aa, 96c78f0a · research:src/core/houseauto.ts askHouse (queueAt next, asked, kostra před dům), houseEstimate (HOUSE_MEASURED_MIN 3, HOUSE_MINUTES 30, TOWN_MINUTES 20), src/core/houses.ts houseChain, src/commands/offline.ts 222–226 · src/core/live.ts houseRequestWrite (403 house.link při vypnuté, 404 house.unknown, 400 house.body/house.town, 409 house.archive, 503 research.busy) · commity f325b1c1, abc8331d, 0002cfb4 · nález: cena až po 3 změřených sezeních (spec 030 K6.4) -->

<a id="S10.4.1"></a>
### S10.4.1 Requesting in the terminal and from a link

In the terminal a house is requested with `strom house request <house> [--with <house>,<house>]`. The research prints
the estimate (“About N minutes of the agent's work; it takes the agent's time and the plan's usage.”, a cost only when
measured) and asks **Look for the history of the house <house> (one session of the agent)?** (Enter = no). After yes:
“The history of the house <house> comes first, at the next session of the research.”

- **From the app** (with House history off) the link opens the terminal with the heading **The Strom app asks for:**
  “look for the history of the house <house> — its numbers, holders and residents, what happened to it”. The terminal
  first checks that the agent is on the computer, shows the estimate and asks. Then “The history of the house <house>
  is first in the queue.” and **Start the agent's work on it now?**
- **Without confirmation:** with starting the agent from the app without confirmation
  ([S4.5.5](S4-research-from-the-app.md#S4.5.5)) it prints the estimate on one line, with the cost too, and starts the
  work without a question.
- **Limits:**
  - the agent does not request a house by itself, it is a person's word; without a terminal the command needs
    `--yes`;
  - a house without people of the tree, a town that is not a place of the research, or neighbours from another town:
    “Nothing was done.” with the reason;
  - confirmation from a phone only without a cost; with a cost the computer asks;
  - `strom house request` is not in the help `strom help house`; the link from the app calls it.
- **Controls:** terminal: `strom house request A0001`, `strom house request "Lhota 16" --with "Lhota 17"`.
- **Since:** research 1.38.0

<!-- zdroj: research:src/commands/house.ts request (hidden, L232; ui.house.ask, ui.house.minutes, ui.house.usd, ui.house.asked, ui.house.again, ui.house.kept, --yes) · src/cli/menu-links.ts 436–482 (ui.link.asks, ui.link.what.house.search, ui.link.house.none/with/town, ui.link.noconfirm, ui.link.house.done, ui.link.house.now → strom run --task) · src/core/links.ts 525–546 · src/commands/links.ts 164–176 · commit 226f86e1 (K6.3a) · nález: house request skrytý v helpu -->

<a id="S10.5"></a>
## S10.5 House history: houses on their own

With **House history** on, the research creates house tasks by itself. It is off by default; only a person may turn it
on.

- **Which house:** it has a record of at least one **direct ancestor**; **2 generations lived in it, or** its records
  span **30 years**; its oldest record is **more than 100 years old**; its town is a place of the research. Houses with
  the most ancestors first, then the oldest.
- **How many at once:** at most **3** open groups of house tasks. A group is a house and neighbouring houses of the same
  town with a shared surname, at most 3 houses.
- **Town skeleton:** once per town, before its houses: the lordship and the estate, the parish, the cadastral area, old
  names, where the land registers and the census sheets are. The town's houses wait for it.
- **Chain:** town skeleton → house → the look of the house ([S10.7](#S10.7)).
- **Order in the queue:** house tasks created on their own only after the family research; `strom queue` says so.
  Requested houses go to the top ([S10.4](#S10.4)).
- **Limits:**
  - a house without a live task, not yet researched; a task a person discarded is not created again by itself;
  - not in a Strom archive nor with a research waiting for an agent;
  - the agent closes a finished house or skeleton task only when what the task is to have is written
    ([S10.6](#S10.6)).
- **Since:** research 1.38.0
- **Enforced by the code:** the choice of houses, the number of groups, the skeleton and the chain.

<!-- zdroj: research:src/core/houseauto.ts qualifies (přímý předek, HOUSE_SPAN 30, HOUSE_AGE 100, obec = místo), raiseHouseTasks (HOUSE_AUTO_OPEN 3, HOUSE_GROUP_MAX 3), townTask, createTownTask/createHouseTask/createLookTask (priorita 1, enrich, původ house:town:L…, house:A…, house:look:A…) · src/core/houses.ts houseChain · src/core/queue.ts houseOrder, 493, 546–548 · src/core/config.ts houses (nenastaveno = off) · cs.json house.town.what/why, house.research.what/why · commity 80bd90e2, f325b1c1, 1abbdd7f · dirigent:spec/030 rozhodnutí 26. 11. -->

<a id="S10.5.1"></a>
### S10.5.1 Turning House history on and off

**House history** and **Look of the houses** are settings of the research: for all researches on the computer, or for
one tree (the tree's value wins). House history is off by default, Look of the houses on.

- **In the app:** **Research for this tree › Sources › House history** below **Census records**: “The research itself
  processes houses of direct ancestors where the family lived for at least two generations or 30 years and the oldest
  record is more than 100 years old. Other houses only on request.” When off it shows an estimate (“The task covers N
  houses in M towns · about <time> of agent work · uses the AI subscription”). Turning on asks (**Turn on house
  history?**), turning off too (**Turn off house history?**: “Waiting house tasks are postponed; finished results
  stay.”). When on it shows “On · N houses: N done, N being researched, N queued” and **Houses ›**, and **Also the look
  of the houses: on** / **off** (changed in the terminal). It is written over the bridge, without a terminal: it is a
  person's decision in the app.
- **In the terminal:** **Settings › History of the houses in this research** (on, “on, without the look of the
  houses”, off, “off, N tasks of the houses set aside”). Before turning on it says what the research will do (“One
  house can always be asked for on its own.”), the number of houses and the estimate (“N houses in M municipalities,
  about N minutes of the agent's work in all”) and asks (Enter = no). When on it offers **Also the look of the houses**
  and **Switch the history of the houses off**.
- **Turning off** sets aside only waiting house tasks that were created on their own (skeleton, house, look).
  Requested ones, ones in progress, ones postponed by a person, taking over own research and tasks with material stay.
  After turning on, the set-aside ones return; finished results stay. `strom task list` marks them “held: houses
  off”; they do not wait for a person.
- **Look of the houses off:** a house's task writes only the short look; no look task follows.
- **Limits:**
  - only a person may turn it on: in the terminal, in the menu, in a system window or in the app; when the agent
    tries, a system window asks, which the agent does not see; anyone may turn it off;
  - in the app the row is not there for a Strom archive nor for a research waiting for an agent;
  - **Houses ›** is only for an open tree.
- **Controls:** app: **Research → Other actions → Research for this tree… → Sources → House history**; terminal:
  **Settings › History of the houses in this research**, `strom config set houses on|off --for-tree`,
  `strom config set houses.look on|off --for-tree`.
- **Since:** research 1.38.0, app 3.33.0
- **Enforced by the code:** turning on only by a person; what turning off sets aside.

<!-- zdroj: research:src/core/config.ts houses (housesSwitch, nenastaveno off), houses.look (housesLook, nenastaveno on) · src/commands/setup.ts housesDecision 1679–1697 (requireHuman, okno systému, STROM_FOR_APP; vypnout kdokoli), ui.consent.houses(.tree) · src/cli/menu-settings.ts housesLabel/housesStep 253–297 (ui.settings.houses*, --for-tree) · src/core/live.ts housesWrite POST /houses (409 house.archive) · src/core/houses.ts houseHeld (jen vzniklé samy, af7194c5) · src/commands/tasks.ts 979–1045 (held: houses off) · src/core/waiting.ts 458–460 · app:src/ui/research-tree-settings-ui.ts renderResearchHousesRow (house.auto, researchHousesShown: ne archiv, ne čekající na agenta), src/ui/houses-auto-view.ts · strings.ts houses.auto.* · commity app 3ea32837, research 80bd90e2, 3c9e4853, 9242429a · nález: vypnutí odkládá jen úkoly vzniklé samy (spec 030 K6.1) -->

<a id="S10.6"></a>
## S10.6 How the agent researches a house

A house's task gets a brief from the research: the tree's people in the house with years and facts, the town
skeleton, what was searched, what is to be gone through by hand, what is not known, taken-over facts to read
([S10.6.2](#S10.6.2)), the look so far, material, neighbouring houses and a list of sources by country
([S10.6.1](#S10.6.1)). The list is the agent's working list; only findings with a source and one “passed” line with
the list go into the house.

1. **Which house and where:** identify the house first. Today's number from the address register; villages mostly
   kept their numbering, towns renumbered around 1805–1815 and 1884. The agent only proposes a renumbering; a person
   confirms it ([S10.1.2](#S10.1.2)). When the house cannot be identified, the task waits for an answer and the agent
   searches no further.
2. **The list of sources from the brief:** the address register, field names, watercourses, orthophoto today and old
   aerial photos, topography from the skeleton, local websites. For a special building (mill, inn, smithy, parsonage,
   school) also other buildings of the same kind in the town, the watercourse and the millrace, and where the holder
   came from.
3. **Timeline, holders, residents:** censuses by house numbers (where the archive permits them), parish registers by
   numbers, land registers. Holders (from–until, how they acquired the house) apart from residents (farmer, retired
   farmer, lodger, farmhand, tenant). Censuses name holders only in 1910 and 1921. People outside the tree are
   residents, never new persons of the tree.
4. **Short look** always ([S10.7](#S10.7)); a map layer by name.
5. **End:** what is not known, what is only in a reading room, what is to be gone through by hand, and the look check.
   Manual steps and the reading room are a list for a person, never a new task. A house requested again only fills in
   what is missing.

- **Finished task:** the agent closes a house or skeleton task only when it is written: a “passed” line with the
  list; for a house a short look, or that nothing is known of the look; with Look of the houses the look check; no
  unread taken-over fact from the web. For agents whose searches the research sees (Claude, Grok), also at least 3
  searches and pages. Otherwise “… is not done yet — the house's list of sources is not gone through”.
- **Certainty** of each fact: **high**, **medium**, **guess** (for a number also **probable**); the agent never raises
  it. Origin: research, from the own research, added by hand.
- **Limits:**
  - the finished-task check applies to a house task and a skeleton task, not to a look task; it runs only when the
    agent closes the task;
  - no new tasks or questions come from the list.
- **Since:** research 1.38.0
- **Enforced by the code:** the finished-task check, a renumbering only as a proposal. **Method only:** steps 1–5.

<!-- zdroj: research:assets/method/house.md (house-research, house-town) · src/core/houseauto.ts houseBrief, houseDoneLacks (HOUSE_CHECK_MIN 3, claude a grok) · src/commands/tasks.ts 425–431 (house.checklist, isAgent) · src/core/model.ts HOUSE_CERTAINTIES, RESIDENT_ROLES · cs.json ui.house.certainty.*, ui.house.origin.*, house.research.done · commity 8561e5b1, 202c0927, 8a2d4dd6 · dirigent:spec/145 T5 · nález: počet hledání jen u claude a grok, úkol podoby bez kontroly -->

<a id="S10.6.1"></a>
### S10.6.1 A house's sources and what does not go out

The list of sources goes by country, by the town's point: a general part and a part for the region. Only public
sources and archives allowed in the research ([R9](R9-archives.md)).

- **Czechia:** town – the topographies of Schaller (1785–1791) and Sommer (1833–1849), field names of ČÚZK, the
  town's website, chronicle and Wikipedia, free pictures (Wikimedia Commons, free works in Kramerius, Europeana); by
  hand the Památkový katalog, maps of the stable cadastre, land registers online. House – the address register RÚIAN,
  the field name at the point, watercourses, orthophoto today and from the 1950s, topography from the skeleton, local
  websites; by hand the indication sketch, monuments, land registers. Mills by hand vodnimlyny.cz.
- **Austria:** the Franziszeischer Kataster (1817–1861), Tyrol, Hofnamen of Upper Austria. **Bavaria:** Häuserbuch,
  Urkataster 1812 and its renewal 1861/62.
- **Map layers:** Orthophoto of Czechia (today) and Aerial photos of Czechia (1950s); offered when the layer covers the
  house's place, and only from hosts allowed in the research.
- **What does not go out:** anything but the town, the house number, coordinates and names of people who died more
  than 100 years ago. Nothing is signed into, bought, ordered or sent. A website whose terms forbid AI only as a link to
  go through by hand. Only works with a free licence are downloaded, otherwise a link.
- **People of today:** today's holders and residents are neither searched for nor written. A sensitive event of the
  20th century (confiscation, expulsion) is written as sensitive ([S10.3.2](#S10.3.2)).
- **Limits:**
  - the research refuses a holder or resident without an end that starts in the last 100 years, unless it is a person
    of the tree;
  - a witness by name only with consent;
  - a picture of a house's look and a picture of the town only with a free licence (CC0, CC BY, CC BY-SA, free work,
    GFDL, Free Art License, OGL; not NC, ND, “all rights reserved”).
- **Controls:** terminal: `strom house sources <house>`, `--town <town>`, `--look`.
- **Since:** research 1.38.0
- **Enforced by the code:** today's holders and residents (only the part in Limits), the witness, picture licences.
  **Method only:** what goes out, websites' terms, sensitive events, the rest of the protection of people of today.

<!-- zdroj: research:src/core/housesources.ts, assets/housesources.json (cz, at, by; town, house, special, look) · assets/maplayers.json (cz-ortho, cz-ortho-1950, CC BY 4.0) · assets/method/house.md (Prameny, never out) · src/commands/house.ts notToday 416–419 (HOUSE_RECENT 100, --person), material --witness --witness-consent 809–830, notFree 344 · src/core/houses.ts freeLicence 875 · commity 3c9e4853, c96eb4e8, 648b7f1b · nálezy: ochrana dnešních lidí hlídaná jen částečně (spec 030 K1.4a, K6.7), licence materiálu nehlídá kód (K8.5), robots.txt přes strom net web --check neověřeno -->

<a id="S10.6.2"></a>
### S10.6.2 Taken-over facts with a source on the web

A fact of a house (timeline, holders, residents, numbers, location) whose source is only an address on the web and
which nobody has read is an **unread taken-over fact**. Typically it came from own research ([S10.8](#S10.8)). In the
next house task the agent reads it at the address and confirms, refines or corrects the fact, with the place in the
source (page, section).

- Certainty by the kind of source: a town history and a chronicle at most **medium**.
- After reading, one “passed” line. The document is not saved; the address stays.
- An unreachable address: only a line in “passed”; the fact stays as it was.
- **Limits:**
  - an unread fact keeps the agent from closing a house or skeleton task ([S10.6](#S10.6));
  - a fact from a person is never replaced; a new source goes beside it;
  - no task or question comes of it.
- **Since:** research 1.38.0
- **Enforced by the code:** what is unread, closing the task. **Method only:** reading and certainty.

<!-- zdroj: research:src/core/houseunread.ts (pramen S… s webovou adresou, bez obrázků, záznamu a výřezu, bez přepisu a čtení, ne v prošlo se, nečetlo sezení) · assets/method/house.md „Taken over, never read“ · src/core/houses.ts replaceHouseItem (--replaces jen u položek výzkumu) · commit e4ec6ff8 · dirigent:spec/145 T7 -->

<a id="S10.7"></a>
## S10.7 The look of the house

A house's task always writes a **short look** of the house (a description with certainty and source, possibly a
picture), or once “look: no more automatically – <why>”. Then it says whether there is more to find about the look:
**material to read**, **a picture of the municipality** on which the house most likely is, **a source in hand** that
describes the building, or **no more automatically**.

- **The look task** (“Look of the house <house>”) follows the house task only where there is more to find, and only
  with Look of the houses on ([S10.5.1](#S10.5.1)). In it the agent reads only the material, the picture, the source
  in hand and the old aerial photo at the house's point; what can only be done by hand (e.g. the indication sketch) it
  writes down to be gone through by hand.
- **Pictures of the town** and **field names** are written by the town skeleton once for all houses of the town;
  pictures only with a free licence, with the licence and the author.
- **In the app:** the section **The building** on the house page: the description with certainty and origin, pictures
  of the house with licence, **Pictures of the town**, **Field names** (those at this house first). When nothing is
  known: “What the house looked like is not known.”, the manual procedure and **Attach material…**. The state
  **queued: the look of the house**.
- **Material for a finished house** (with House history and Look of the houses on) creates a look task (“material was
  given to the house after its research”).
- **Limits:**
  - a look task after a requested house is requested too (not postponed), but does not go to the top of the queue;
  - with Look of the houses off only the short look stays;
  - **Attach material…** under an unknown look only in an editable tree.
- **Controls:** app: house page → **The building**; terminal: `strom house show <house>` (**What it looked like**,
  **More of its look**, **Pictures**, **Field names**), settings [S10.5.1](#S10.5.1).
- **Since:** research 1.38.0, app 3.33.0
- **Enforced by the code:** a look task only where there is more to find, picture licences, a single “no more
  automatically”.

<!-- zdroj: research:src/core/houseauto.ts houseTaskDone 334, createLookTask (asked bez top), houseTaskForMaterial 484 (house.look.material) · src/commands/house.ts look, look-check (--next material|picture|source|none, house.look.unknown), picture, field-name · cs.json ui.house.look, lookCheck, lookNext.*, pictures, fieldNames, house.look.what/why/done · assets/method/house.md house-look · app:src/house-page.ts sec.look, lookUnknown · strings.ts houses.st.queuedLook · commity research 8561e5b1, 202c0927, 9242429a, app 21584d89 · dirigent:spec/145 T1 · nález: úkol podoby vyžádaný, ale ne na vršek -->

<a id="S10.8"></a>
## S10.8 Own research and material for a house

Own research of a house (notes, extracts, links) can be given to the research. The text is saved unchanged as
“own research” material, and a takeover task writes it into the house without a new search.

- **What it takes:** `.md`, `.markdown`, `.txt`, a file or a folder. It recognises the house from the first heading,
  otherwise from the file name; two numbers are two houses. The same file a second time: “taken already”.
- **Unclear cases** (the town is not a place of the research, several places of the same name, the house is not in the
  tree) are asked about in the terminal (“Which house?”, **add the house …**, **do not take the file**); nothing is
  guessed.
- **Links in the text** are marked as gone through; links in a section whose heading says “by hand” or “reading room”
  stay to be gone through by hand.
- **The takeover task** (“Take over the research of the house <house>”): one per house, a further file is added to it.
  The agent searches for nothing, gives certainty as the text gives it (never higher), a renumbering only as a
  proposal. Facts with a source on the web are read only by the house task ([S10.6.2](#S10.6.2)). The house state
  **own research waiting to be taken over**.
- **Material for a house** (a file or a memory): **Attach material…**. A witness by name only with consent. With House
  history on it creates a house task (for a finished house a look task, [S10.7](#S10.7)); with it off it is only saved.
- **Limits:**
  - it does not take `.html`, `.htm` and files in subfolders, it only lists them;
  - the takeover task is not postponed with House history off;
  - an agent without a terminal does not take over an unclear file; it returns the commands to complete it;
  - attachments (pictures, map data) only with a free licence.
- **Controls:** app: ⋯ at a house → **Take over research from a file…** (opens the terminal), **Attach material…**;
  terminal: `strom house import <file|folder> [--house <file>=<house>] [--skip <file>]`,
  `strom house add material <house> --input I…` or `--memory "<text>"`.
- **Since:** research 1.38.0, app 3.33.0
- **Enforced by the code:** the question on unclear cases, the witness's consent, the takeover task. **Method only:**
  certainty from the text, licences of attachments.

<!-- zdroj: research:src/commands/house.ts import 927, material 809–830 · src/core/houseimport.ts · assets/terms/houses.json (ručně, badatelna) · cs.json ui.house.import.*, house.takeover(.why), ui.link.what.house.import · src/core/houseauto.ts houseTaskForMaterial (top false) · assets/method/house.md house-takeover · app:strings.ts houses.st.takeover, takeoverNote · commity 5703ae19, 4a6869fd, f766c63f · nálezy: materiál k domu nejde na vršek (komentář × kód), licence materiálu jen metodika -->

<a id="S10.9"></a>
## S10.9 Discussing a house with the agent

**Discuss with the agent** opens a conversation with the agent about one house. The agent first loads the house, the
town skeleton, the house method and the list of sources; it writes only what it finds, with a source, and creates a
follow-up task only when a person asks for one.

- Before the start the terminal asks: “a conversation with the agent (<agent>) about the house <house>: what it finds
  goes into the house.” and says that the agent works on the subscription or AI credit.
- **Limits:**
  - only with a research where the agent works: not in a Strom archive, with a research waiting for an agent, nor with
    the sample ([S9.4](S9-trying-the-sample.md#S9.4));
  - the house must have a record or people of the tree.
- **Controls:** app: ⋯ at a house in the **Houses** window and ⋯ of the house page → **Discuss with the agent** (mark
  **AI + terminal**); terminal: `strom chat --house <house>`.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:src/ui/house-material-ui.ts houseChatPossible, houseChatLink (do=chat) · strings.ts houses.discuss · commit 955323be · research:src/core/links.ts 525–546 (chat bez with), src/cli/menu-links.ts houseChat, src/commands/start.ts 165–235 (strom chat --house, ui.chat.house.say) · cs.json ui.link.what.chat.house, ui.link.cost · src/core/live.ts AGENT_FEATURES house.chat, forDemo · commity 8561e5b1, 9242429a · dirigent:spec/145 T2 · nález N5: ve stromu jen ke čtení akce zůstává, když ji výzkum dovolí -->

<a id="S10.10"></a>
## S10.10 Houses in the book and the pages

- **House book:** the choice **House** (“the house’s family across generations”) gives a book about one house:
  everyone with a record in the house, by birth, with families (“The house’s family across generations: N people from
  …–…, with spouses and children born in the house.”). The default is the house of the central person, otherwise the
  house with history with the most people; **Choose a house** offers **Houses with history** and **More houses**. The
  option **Last 100 years by name only** (on by default): people of the last roughly 100 years only by name and role,
  without dates. From the house page **Open in the book…** opens the book at this house.
- **The Houses chapter** in the book: houses of the book's people with history ([S10.1](#S10.1)) or with a finished
  history from the research; for each house the approved story ([S10.14.2](#S10.14.2)), the name, the look, numbers
  over time, the timeline, holders, residents, notable things, the location ([S10.3.4](#S10.3.4)) and sources as
  numbered notes. On by default only when the tree has at least one house with a
  finished history. **Index of houses** only with the Houses chapter.
- **Family pages and tree pages** ([A7.5](A7-book-pages-and-export.md#A7.5)): the option **Houses**: **In the family
  pages, linked with the people** (default; houses with history with period and generations, **Index of houses** after
  the towns and the page of each house), **Only a mention of the house, without its pages**, **Without houses**. It is
  offered when people of the selection lived in a house with history. The timeline of a line has the chip **Houses ⌂**
  ([S10.11](#S10.11)).
- **Limits:**
  - the book gives the location only with the option **House locations** and only for a house without people of the
    last roughly 100 years ([S10.3.4](#S10.3.4)); otherwise “Events after <year> and the house location are not given
    in the book.”; it leaves out sensitive events and research events of the last roughly 100 years ([S10.3.2](#S10.3.2));
  - the pages give nothing about houses from the last roughly 100 years;
  - the pages take houses with history by the threshold ([S10.1](#S10.1)), the book also houses with a finished
    history from the research;
  - the choice **House** only in a tree with a numbered house and only for the book; the gift
    ([A7.9](A7-book-pages-and-export.md#A7.9)) and the picture have no houses.
- **Controls:** app: export **Family book** → **House**, the part **Houses**, **Index of houses**, **House
  locations**; family pages and tree pages → **Houses**.
- **Since:** app 3.33.0

<!-- zdroj: app:src/book-options.ts (book.dlg.kind.house, kindHint.house, chooseHouse, housesHistory, housesOther, dlg.houseScope, houseRecent, bookHouseRecent, parts.houses, parts.houseIndex, bookHouseDefaults, unavailable.houses, unavailable.houseIndexChapter, unavailable.houseIndex), src/book-houses.ts, src/book.ts houseOutputFilter, book.houseIndexProtected, src/lineage.ts case 'house' · src/family-pages.ts 709 outputHouses (overThreshold), src/ui/book-ui.ts 521 familyPages.housesRow, housesOpt.pages/mention/none · page.openInBook · commity 26a28e96, ffc93153, a9f8f9cd, d7db62b4, 5b4d880a, 230afefd, f5b46c5b, 8d93f0d5 · dirigent:spec/145 T6 · T3 poloha v knize: app:438de916 (book.houseChapterProtected) · T4 vyprávění v knize: app:d7f65e13 src/book-houses.ts · nález N10 (výstupy podle prahu × kniha i s hotovou historií) -->

<a id="S10.11"></a>
## S10.11 Houses elsewhere in the app

| Where | What |
|---|---|
| person page | the address of an event in a house is a link to the house; in **Places** the row **Houses** with “House <number> ›” and the person's years in the house |
| timeline | the bubble of an event names the house |
| timeline of a line | the chip **Houses ⌂**: marrying into the house, leaving the house, the last in the house |
| map | the layer **Family houses** (on by default only when some house has a point); a house closer than 30 px to the town's point stays in the town until the map is zoomed in; houses are not in migration |
| the **Places** window | for a town **Family houses** with a list; **Houses in this town ›**; the item **House history <number>** |
| Table | the column **House** (house of birth or of the event, a link to the page, the older number in brackets) |
| lists of people | the rule **Lived in the house** (also in the years), by birth, marriage, census, residence and death ([A11](A11-lists-of-people.md)) |
| Statistics | the topic **Houses**; longest one family, marrying into the house ([A13](A13-tree-statistics.md)) |
| search | the group **Houses** above the people (at most 5); for a person found by a house number **House ›** |
| queue and **Awaiting action** | the tasks **House history <number>, <town>**, **Take over research for house <number>**, **Town skeleton <town> for houses**; **House page ›**; a house question with “House <number> ›”; a new version of the story “The story of house <number> waits for approval” ([S10.14](#S10.14)) |
| a person's story | the link **House <number> ›** to a house with an approved story ([S10.14](#S10.14)) |
| GEDCOM | the record `_HOUSE` only for a house with a name or merged (town, numbers with dates, name, “same house”); separation, location, hiding the location by hand and revealed events only in JSON; GEDCOM does not carry the story of a house |

- **The research and `_HOUSE`:** `strom sync` reads houses from the app's GEDCOM as a person's word: the name, a
  missing number and “same house”. It removes nothing; a town that is not a place of the research it only reports. The
  research does not write `_HOUSE` into the file.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:src/person-page.ts, src/person-houses.ts (integration.ppHouses, 4bb8b52e) · src/rod-timeline.ts, src/house-events.ts (integration.chip, f5b46c5b) · src/map-houses.ts, src/ui/map-houses-ui.ts (houses.mapLayer, 30 px, mapMigOff; 20f6ef91, 31130150, cef1ed0f) · src/ui/house-request-ui.ts familyHouses.* (fa5df8fb) · Tabulka integration.tableCol (fc7aced0) · ruleLivedIn, ruleYears (9cfd8ef1) · src/ui/tree-stats-ui.ts statsHouses, statsLongest, statsMarriedIn (6acc0762) · src/house-search.ts searchGroup, searchHouse (dfe6c13d) · src/house-tasks.ts taskHouse, taskImport, taskSkeleton (4e322dec) · src/ged-houses.ts (d3fd1e86) · research:src/core/housesync.ts planHouses, applyHouseChange (3fbde6b7), ui.sync.house.* · nález: _HOUSE jen jedním směrem -->

<a id="S10.12"></a>
## S10.12 The `strom house` commands

| Command | What it does |
|---|---|
| `strom house list [--town <town>]` | the tree's houses, with a record and from facts only: house, municipality, number, name, people, years, state |
| `strom house show <house>` / `--town <town>` | the whole house / the town skeleton |
| `strom house sources <house>` | the task's list of sources ([S10.6.1](#S10.6.1)) |
| `strom house add <town> <number> [--name]` | a new house, even without people of the tree |
| `strom house add <kind> <house> …` | an entry in the house: event, holder, resident, number (`--proposed`), location, passed, to go through by hand, not known, only in the reading room, look, look check, picture, field name, map, summary, material, name |
| `strom house confirm <house> renumber\|location\|not-same` | a person's word ([S10.1.2](#S10.1.2)) |
| `strom house import` | own research ([S10.8](#S10.8)) |
| `strom house request` | requesting a house ([S10.4.1](#S10.4.1)) |
| `strom house story <house>` | requesting the story of a house ([S10.14.1](#S10.14.1)) |
| `strom fixes house-numbers` | houses written in two ways |

- **Reference to a house:** `A0001`, the key (`lhota|16`), `L12 16` or `Lhota 16`. The research refuses an ambiguous
  reference.
- **Source** of an entry: `--source S… --locator … --url … --from I…`; `--replaces <id>` replaces only an item of the
  research.
- **`strom fixes house-numbers`** sets right houses written before research 1.38.0 in such a way that one house became
  two: a note that is only a house number (“čp. 13”) goes into the house field (the note stays); a marker before the
  number (“čp. 16” → “16”) and before a street (“čp. Dlouhá 12” → “Dlouhá 12”) is removed. A note with more numbers
  stays and the research says why. On a person's word, free, also in a Strom archive; it can be undone with
  `strom fixes undo house-numbers` ([R13](R13-reporting-a-problem.md)).
- **Limits:** for a town skeleton (`--town`) only passed, to go through by hand, not known, only in the reading room,
  map, summary, picture, field name; summary, picture and field name only for a town.
- **Since:** research 1.38.0

<!-- zdroj: research:100aee43 src/commands/house.ts house story · research:src/commands/house.ts list 152, show 181, sources 203, add 280/367, confirm 868, import 927, request 232 (hidden) · src/core/houses.ts findHouse 359 (house.unknown, house.ambiguous) · src/core/housenumberfix.ts, src/commands/fixes.ts 1106–1111, ui.fixes.house-numbers.name · cs.json ui.house.head · strom help house (přes guard) · commity 3c69f16c, bd81894a -->

<a id="S10.13"></a>
## S10.13 A read-only tree and the sample

- **A read-only tree** (a followed tree, a locked tree, a preview): the **Houses** window can be opened (the only row
  in the group of tree settings) and houses, pages and maps can be viewed. Missing: **Merge with another house…**,
  **It is a different house…**, the house name, **Show in outputs**, **Confirm** / **Not the same house**, **Move the
  point**, **Confirm location** and **Attach material…** under an unknown look. Research actions (requesting,
  **Discuss with the agent**, **Attach material…**) stay as the research offers them.
- **The sample from the web** ([S9.1.3](S9-trying-the-sample.md#S9.1.3)): house actions are hidden.
- **The sample research `strom demo`** ([S9.4](S9-trying-the-sample.md#S9.4)): without requesting a house, taking
  over own research, the conversation about a house and the story of a house; houses, house pages and settings can be viewed.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: app:src/data.ts 2549 housesReadOnly (isReadOnly || isTreeLocked) · src/ui/tree-actions.ts housesRows (read-only: jediný řádek skupiny, 1127) · src/research-link.ts SHOWCASE_ALLOWS house: 'hide' · research:src/core/live.ts forDemo (bez house.request, house.import, house.chat, house.story – AGENT_FEATURES; house, house.material, house.confirm, house.auto, house.look zůstávají) · nálezy N5 (Probrat s agentem ve stromu jen ke čtení), N6 (řádek Historie domů se nejspíš nabídne i u strom demo, neověřeno) -->

<a id="S10.14"></a>
## S10.14 The story of a house

The story of a house is a continuous text for the family: the holders and families in the house over generations,
what happened to the house, the numbers over time and where the house stood, its look and what the town lived on. The
research's agent writes it only from what the research found about the house and its town; it searches nothing
again. Like a person's story ([A7.8](A7-book-pages-and-export.md#A7.8)) it is not a source: it only retells what the
research documented.

- **Enforced by the code:**
  - the story keeps what it rests on: the house's items (numbers, events, holders, residents) and the facts of the
    tree's people in the house;
  - it is a draft until a person approves it; an approved story is locked and never rewritten. A new version is made
    beside it and the approved text holds until a person decides ([R6.3.2](R6-awaiting-action.md#R6.3.2));
  - only a person may approve it or discard a new version ([R6.6](R6-awaiting-action.md#R6.6)).
- **Method only:**
  - what the research knows only with medium certainty, as a conjecture or a lead, the text says as uncertain (“most
    likely”, “by a register not verified yet”); a number that is not the same house it leaves out; what was not found
    it says;
  - people of the last hundred years only by name and role in the house (no illness, court, divorce). What of the
    living it shows or shares is decided by the app ([S10.14.2](#S10.14.2));
  - a person's life belongs in their own story; in the story of the house a person has one sentence with the years in
    the house.
- **House page**, the **Story** section right after **In brief**:
  - the approved text with a heading and sources;
  - a draft with the tag “draft, waiting for approval” and the button **Approve in the research** (a link to the
    terminal);
  - a new version beside the approved one: “A new version of the story (day) waits for approval; the page shows the
    approved text.” with **Compare**;
  - while it is being written, the task's state: “The story of the house is in the research queue.”, “The story of
    the house is being written.”, “The task of the story is set aside in the research.”, “The task of the story waits
    for an answer in the research.”
- **Awaiting action:** only a new version beside the approved one: in the app “The story of house <number> waits for
  approval” with the link **House <number> ›** to the **Story** section, in the terminal “A new version of the story
  of the house <house> — the approved one stays until a decision”. The first draft is not there: it is approved on the
  house page, or with `strom story approve A…`.
- **A person's story**, of someone who lived in the house, has under the text the link **House <number> ›** to the
  house's story, only when the house has an approved story; the house's text is not repeated.
- **Limits:** the app takes the story of a house only through the research's bridge (GEDCOM does not carry it);
  without a connection to the research there is neither the section nor the link.
- **Controls:** app: house page → **Story**, **Approve in the research**, **Compare**; terminal:
  `strom story show A…`, `strom story approve A…`, `strom story discard A…`, the menu **What waits**.
- **Since:** app 3.33.0, research 1.38.0

<!-- zdroj: research:100aee43 src/core/housestory.ts (House.story jako Story osoby; facts n…, e…, h…, r…, E…; draft vedle final), src/core/storykeep.ts, src/commands/story.ts (approve|discard A…, person only), src/core/waiting.ts (kind story s house jen pro novou verzi; APP_SHOWS_HOUSE_STORY), assets/method/narrate.md „for house-story“ · cs.json ui.waiting.story.house · app:3473602e src/house-page.ts storyHtml (sec.story za sum; storyDraft, storyNew, storyTask), src/ui/house-page-ui.ts (research.approveStory, story.compare, story?house=&do=final|keep), src/ui/research-overview-ui.ts houses.storyWaiting · app:3080a121 src/person-page.ts storyHousesHtml (houseLink) · zadání aplikace ↔ výzkum ZADANI_VYZKUM_145-domy.md „T4 vyprávění o domě“, „Odpověď stromu k T4“ (první koncept bez položky Co čeká – záměr) -->

<a id="S10.14.1"></a>
### S10.14.1 When the story is written: by itself and on request

- **By itself:** with stories turned on (the setting `stories`, on by default), after the last step of the house's
  research (the house's research, possibly its look, [S10.7](#S10.7)), when the house tells enough: **2 generations of
  the tree** in the house (a parent and a child), or **3 holders and residents with sources**. A further version only
  when the house has brought at least **2 new facts** since the last version.
- **On request:** ⋯ on the house page or in the **Houses** window → **Write the story of the house** (when a story
  already exists, **Write a new version of the story**); in the terminal `strom house story <house>` (it asks; `--yes`
  without asking). The task goes to the top of the research queue and the nearest `strom run` session takes it; the
  agent is not started by this. It holds regardless of the threshold and of the setting `stories`. A task that already
  exists only moves: “The task already existed; it moved to the top of the research queue.”
- **Limits:**
  - only a house about which the research has already written something; otherwise “Nothing of this house is in the
    research yet; its story is written from its research.” (first the house's history, [S10.4](#S10.4));
  - only a research with its own agent: in a Strom archive, in a research waiting for an agent and in `strom demo`
    ([S10.13](#S10.13)) it is not offered;
  - the story's task goes through the queue like other stories ([R2.2.2](R2-lines-and-queue.md#R2.2.2)); it does not
    change the house's state, and House history turned off ([S10.5.1](#S10.5.1)) does not set it aside;
  - a task a person cancelled is not created again by itself (not for a new version either).
- **Controls:** app: ⋯ of the house page or of the **Houses** window; terminal: `strom house story <house>`,
  `strom config set stories no` (turns off the story by itself).
- **Since:** research 1.38.0, app 3.33.0

<!-- zdroj: research:100aee43 src/core/housestory.ts HOUSE_STORY_GENERATIONS 2, HOUSE_STORY_PEOPLE 3, houseStoryReach, houseStoryDue (STORY_NEW_FACTS 2 ze src/core/stories.ts; dropped od posledního textu → nic), raiseHouseStories (stories on, ne actsAsArchive, row.state done), askHouseStory (queueAt next, parked → open, house.story.none, house.archive), createStoryTask level narrate · src/commands/house.ts house story (--yes, NeedsInputError) · src/core/live.ts AGENT_FEATURES house.story, POST /houses/story · src/core/config.ts stories (yes výchozí) · strom help house story · app:3473602e strings.ts houses.writeStory, writeStoryAgain, storyAsked, storyMoved, errStoryNone -->

<a id="S10.14.2"></a>
### S10.14.2 The story in outputs and protecting people

- The family book (the part **Houses**), the saved house page and the family pages show only the approved text; a
  draft never, and with a new version beside the approved one still the approved one. In the book the story stands
  before the house's sections and its sources are among the chapter's numbered notes.
- The output leaves the story out **whole** (the text is not rewritten) when it names a living person, a person of the
  last roughly 100 years or a person of the research without a record of death whom the tree does not know, or when
  it rests on an item of the house the output hides ([S10.3.2](#S10.3.2)).
- The link from a person's story to the house is in the book and in the family pages only when the output shows the
  house's story.
- **Controls:** app: export **Family book** → the part **Houses**; house page → **Save HTML**; family pages →
  **Houses**.
- **Since:** app 3.33.0

<!-- zdroj: app:3473602e src/house-privacy.ts houseStoryForOutput (people: žijící, recent, bez úmrtí a mimo strom; facts na skryté položce → null) · app:d7f65e13 src/book-houses.ts (vyprávění před oddíly, prameny v poznámkách kapitoly, draft nikdy) · app:3080a121 src/family-pages-html.ts setStoryHouses · research:src/core/housestory.ts houseStoryView people {id, died} -->
