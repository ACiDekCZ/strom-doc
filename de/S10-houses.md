<a id="S10"></a>
# S10 Häuser

Ein Haus ist ein Ort und eine Hausnummer. Die App setzt Häuser aus den Einträgen des Stammbaums zusammen: aus Geburten,
Heiraten, Volkszählungen, Wohnorten und Todesfällen, bei denen eine Hausnummer steht. Auf Anforderung ermittelt die
Forschung die Geschichte eines Hauses: die Nummern im Lauf der Zeit, die Lage, was mit dem Haus geschah, die Besitzer,
die Bewohner und das Aussehen, jede Aussage mit Quelle und Sicherheit. Das Ergebnis steht in der App im Fenster
**Häuser** und auf der Hausseite, im Buch und in den Familienseiten. Das Kapitel beschreibt die Strom-App 3.33.0 und
die Forschung 1.38.0.

| Was | App | Terminal |
|---|---|---|
| Häuser des Stammbaums | Fenster **Häuser** ([S10.2](#S10.2)), Hausseite ([S10.3](#S10.3)) | `strom house list`, `strom house show` |
| Geschichte eines Hauses | **Hausgeschichte ermitteln…** ([S10.4](#S10.4)) | `strom house request` ([S10.4.1](#S10.4.1)) |
| Häuser von selbst | **Forschung für diesen Stammbaum › Hausgeschichte** ([S10.5.1](#S10.5.1)) | **Einstellungen › Geschichte der Häuser in dieser Forschung** |
| eigene Recherche zu einem Haus | **Recherche aus Datei übernehmen…** ([S10.8](#S10.8)) | `strom house import` |
| Gespräch über ein Haus | **Mit Agent besprechen** ([S10.9](#S10.9)) | `strom chat --house` |
| Erzählung über das Haus | ⋯ **Erzählung über das Haus schreiben** ([S10.14](#S10.14)) | `strom house story` |
| Buch und Seiten | Auswahl **Haus**, Kapitel **Häuser** ([S10.10](#S10.10)) | – |

<!-- zdroj: dirigent:spec/030-historie-domu, spec/145-rozsireni-domu (T1, T2, T5, T6, T7) · app:src/houses.ts, src/ui/houses-ui.ts, src/house-page.ts · research:src/core/houses.ts, src/core/houseauto.ts, src/commands/house.ts, assets/method/house.md · CHANGELOG.cs.md aplikace 3.33.0, výzkum 1.38.0 „Historie domů“, „Výzkum domu“ -->

<a id="S10.1"></a>
## S10.1 Ein Haus: Ort und Nummer

Ein Haus wird an Ort und Hausnummer erkannt. Die App speichert Häuser nicht, sie setzt sie aus den Einträgen des
Stammbaums zusammen. Zu einem Haus gehört eine Person, die darin eine Geburt, Heirat, Volkszählung, einen Wohnort oder
Tod hat. Gespeichert wird nur, was ein Mensch zum Haus gesagt hat: Hausname, Zusammenführen und Trennen von Häusern,
Lage und für Ausgaben freigegebene Ereignisse.

- **Haus mit Geschichte:** im Haus lebten mindestens **2 Generationen** (Elternteil und Kind), **oder** die Einträge
  des Hauses umfassen mindestens **30 Jahre**. Partner sind eine Generation. „Eine Familie N Jahre“ ist die längste
  Spanne einer verbundenen Familie (mindestens zwei Personen).
- Beim Haus steht die Folge der Nachnamen der Männer im Lauf der Zeit („Horák → Vlk → Horák“) und das Etikett
  **eingeheiratet**: die Person wurde nicht im Haus geboren und ist Partner eines Menschen aus dem Haus. Bei einer
  Person ohne bekanntes Geschlecht steht kein Etikett.
- Die Forschung führt ein Haus als Datensatz `A…` (`A0001`). Der Datensatz entsteht mit dem ersten Eintrag oder der
  ersten Aufgabe. Bis dahin ist das Haus nur in den Angaben des Stammbaums.
- **Grenzen:**
  - das Fenster **Häuser** und alles rund um Häuser gibt es nur in einem Stammbaum mit mindestens einem Haus mit
    Nummer;
  - Platzhalterpersonen (Personen ohne Angaben, nur als Stellvertreter) zählen nicht zum Haus;
  - in der Forschung muss der Ort des Hauses ein Ort der Forschung sein ([R4](R4-places.md)), sonst schreibt die
    Forschung zum Haus nichts und rät zu `strom place add`.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:src/houses.ts houseOfFact, collectHouses, LIVED_FACT_KINDS, houseIdOf, isOverThreshold (HOUSE_THRESHOLD_GENERATIONS 2, HOUSE_THRESHOLD_YEARS 30), generationsOf, familyYearsOf, marriedInOf, hasNumberedHouse · StromData.houses (datová verze 27) · dirigent:spec/030 rozhodnutí 26. 11. · research:src/core/model.ts House (A…), src/core/houses.ts recordOf (house.town), townRecord · commity app 94ed2240, research dea67112, 54ed35c7 -->

<a id="S10.1.1"></a>
### S10.1.1 Wie eine Hausnummer gelesen wird

Die Hausnummer wird aus dem Ort der Angabe und dem Feld Hausnummer oder Adresse genommen. Kennzeichnungen vor der
Nummer zählen nicht: „16“, „čp. 16“, „č. p. 16“, „č.p.16“, „Nr. 16“, „Haus Nr. 16“, „House No. 16“ und „nr domu 16“
sind dasselbe Haus.

- „Bělokamen čp. 16“ ist der Ort Bělokamen und das Haus 16; „Bělokamen, Kopřivná 12“ ist ein Haus nach Straße; „Lhota,
  okres Horní, čp. 3“ ist der Ort „Lhota, okres Horní“. Ein bloßes „Bělokamen 16“ ist nur dort ein Haus, wo auch das
  Fenster **Orte** die bloße Nummer anbietet; „Praha 5“ ist kein Haus (die Nummer gehört zum Ortsnamen).
- Die Straße wird ohne diakritische Zeichen und ohne Groß- und Kleinschreibung verglichen. „13/2“ ist eine Nummer.
- Häuser eines Ortes stehen der Reihe nach: Nummern (4, 12, 12a, 13/2, 100), dann Häuser nach Straße, dann die übrigen.
- **Grenzen:**
  - ohne Nummer („mlýn“, „Kopřivná“) entsteht kein Haus;
  - „12a“ und „12 a“ sind zwei Häuser; zusammenführen kann sie ein Mensch ([S10.1.2](#S10.1.2));
  - die Evidenznummer hat keine eigene Reihe: „č. ev. 5“ ist dasselbe Haus wie „čp. 5“.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0
- **Ab Forschung 1.38.0:** früher auf zwei Arten geschriebene Häuser bringt `strom fixes house-numbers` in Ordnung
  ([S10.12](#S10.12)).

<!-- zdroj: app:src/places.ts townOfPlace, houseKey, houseOrder, compareHouses (466–545) · research:src/core/house.ts houseKey, HOUSE_WORDS · nález: ev. č. bez vlastní řady (app), „12a“ ≠ „12 a“ -->

<a id="S10.1.2"></a>
### S10.1.2 Nummern im Lauf der Zeit, Zusammenführen und Hausname

Hausnummern haben sich früher geändert. Ein Haus hat deshalb eine Liste von Nummern: aus den Einträgen des Stammbaums
und von der Forschung. Eine ältere Nummer steht in Klammern („(früher 12)“). Einträge aus der Zeit vor einer
bestätigten Umnummerierung sind nur wahrscheinlich.

- Eine **Umnummerierung** schlägt die Forschung nur vor („Vorschlag der Forschung: dasselbe Haus vor der
  Umnummerierung“). Ein Mensch bestätigt sie (**Bestätigen**) oder lehnt sie ab (**Nicht dasselbe Haus**). Die Antwort
  „nicht dasselbe Haus“ wird der Forschung nie wieder geschickt.
- **Mit anderem Haus zusammenführen…** verbindet zwei Einträge eines Hauses (angeboten werden Häuser desselben Ortes).
  **Es ist ein anderes Haus…** trennt eine Nummer ab, die nicht zum Haus gehört; bei einer Forschung, die das kann,
  lässt sich der Forschung gleich die Antwort „nicht dasselbe Haus“ senden. Die Zusammenführung gilt nur für das
  Häuserverzeichnis und die Hausseite; Angaben zu Personen ändern sich nicht. Jedes Zusammenführen und Trennen ist ein
  Schritt **Rückgängig** und geht in den Änderungsverlauf.
- Der **Hausname** (höchstens 80 Zeichen) wird auf der Hausseite geschrieben. Einen Namen von einem Menschen
  überschreibt die Forschung nicht.
- **Grenzen:**
  - Umnummerierung, Lage und „nicht dasselbe Haus“ bestätigt nur ein Mensch (in der App, im Terminal oder in einem
    Systemfenster), nie der Agent;
  - eine Angabe, die ein Mensch bestätigt oder gegeben hat, überschreibt die Forschung nicht; eine neue Angabe der
    Forschung kommt daneben;
  - beim Zusammenführen von Stammbäumen wird das Wort zu den Häusern übernommen; in GEDCOM gehen nur Hausname und
    Zusammenführung ([S10.11](#S10.11)).
- **Bedienung:** App: Hausseite → **Nummern im Lauf der Zeit** → **Bestätigen** / **Nicht dasselbe Haus**; ⋯ des
  Hauses → **Mit anderem Haus zusammenführen…**, **Es ist ein anderes Haus…**, **Hausname…**. Terminal:
  `strom house confirm <Haus> renumber|location|not-same`.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:src/houses.ts withResearchNumbers · src/ui/houses-ui.ts merge, split (houses.splitSend jen s house.confirm) · DataManager.setHousesUserData (Zpět, záznam změn) · src/ui/house-page-ui.ts startHouseNameEdit (80 znaků) · src/ged-houses.ts keepHouses · strings.ts houses.was, merge, mergeNote, split, splitSend, farmName · research:src/core/houses.ts confirmHouse (HOUSE_CONFIRMS renumber, location, notSame), replaceHouseItem (house.confirmed) · src/commands/house.ts confirm (člověk, STROM_FOR_APP) · commit app 94ed2240 -->

<a id="S10.2"></a>
## S10.2 Das Fenster Häuser

Das Fenster **Häuser** zeigt die Häuser des Stammbaums nach Orten. Oben steht der Satz „Häuser nach den Einträgen im
Stammbaum. Hausnummern haben sich früher geändert; Einträge aus der Zeit vor einer bestätigten Umnummerierung sind nur
wahrscheinlich.“ und die Schaltfläche **Begriffe** mit einem Glossar (Hof, Häusler, Ausgedinge, Inwohner, Gesinde,
Hausnummer).

- **Leiste:** Suche **Ort, Nummer, Nachname suchen** (eine beliebig geschriebene Nummer findet das Haus, Namen auch
  Geburts- und Ehenamen, ohne diakritische Zeichen); Ortschip **Ort: …**; **Nur mit Geschichte**; **Erforscht** (nur
  mit einer Forschung, die Häuser sendet); **Sortieren**: **Nummer**, **Älteste**, **Meiste Personen**, **Zuletzt
  erforscht** (nur mit Forschung). Zusammenfassung „{N} Häuser in {M} Orten“.
- **Orte** stehen nach der Zahl der Häuser, dann nach Namen; beim Ort der Bezirk (aus den Orten der Forschung), die
  Zahl der Häuser mit Geschichte, der Hausnummern und der Personen.
- **Zeile eines Hauses:** Nummer (und ältere Nummer), Hausname, Jahre, Folge der Nachnamen, „N Personen · N
  Generationen“, Etiketten der Einheirat und Stand der Forschung ([S10.4](#S10.4)). Häuser mit Geschichte
  ([S10.1](#S10.1)) stehen oben; die übrigen in der Gruppe **Weitere Häuser (N)** („unter der Schwelle von 2
  Generationen oder 30 Jahren“). Geladen wird in Schritten von 40 Häusern (**Weitere anzeigen**).
- **Aufgeklapptes Haus:** Wissenswertes (eine Familie N Jahre, Zahl der Nummern, ältester Eintrag), Einträge der
  Personen (8, dann „und N weitere Einträge…“) und **Hausseite ›**. Ein Klick auf eine Person schließt das Fenster und
  zeigt die Person im Stammbaum.
- **⋯ beim Haus:** **Hausseite**, **Auf der Karte**; Aktionen der Forschung ([S10.4](#S10.4), [S10.9](#S10.9)), auch
  bei einem Haus unter der Schwelle; **Mit anderem Haus zusammenführen…** und **Es ist ein anderes Haus…**
  ([S10.1.2](#S10.1.2)).
- **Grenzen:** leere Auswahlen sagen, warum („Kein Haus hat eine Geschichte über 2 Generationen oder 30 Jahre.“, „Noch
  kein Haus ist erforscht.“).
- **Bedienung:** App: **Aktionen › Stammbaum › Häuser…** und in **Stammbäume verwalten** ⋯ beim geöffneten Stammbaum
  (nach Orte); **Häuser ›** in **Forschung für diesen Stammbaum**; **Häuser im Ort ›** im Fenster **Orte** und in der
  Sprechblase eines Hauses auf der Karte (öffnet das Fenster mit dem Ortschip); **‹ Häuser** von der Hausseite.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/ui/houses-ui.ts (lišta, obce, řádek, HOUSES_BATCH 40, openHouseRowMenu, akce výzkumu i pod prahem 96c78f0a) · src/houses-view.ts (hledání) · src/ui/tree-actions.ts housesRows (isActive && hasNumberedHouse, 0c97014e) · strings.ts houses.menu, intro, terms, searchPh, townOnly, onlyHistory, researchedOnly (169c35b0), sortLabel, sortNumber, sortOldest, sortPeople, sortResearched, count, townMeta, more, moreWhy, emptyHistory, emptyResearched, townHouses, pageItem · nález N3: okno i u adresy s ulicí a číslem -->

<a id="S10.3"></a>
## S10.3 Die Hausseite

Die Hausseite hat die Form der Personenseite: **‹ Häuser**, **HTML speichern**, ⋯ und Schließen. Ab drei Abschnitten
hat sie ein Inhaltsverzeichnis.

- **Abschnitte der Reihe nach:** Kopf (Ort und Nummer, Hausname, Ort mit Bezirk, Pfarrei, „Im Stammbaum“: Jahre,
  Generationen, Personen; „Forschung“: Stand) · **Auf einen Blick** · **Erzählung** ([S10.14](#S10.14)) · **Nummern im Lauf der Zeit** · **Zeitleiste** ·
  **Besitzer und Bewohner** · **Das Gebäude** ([S10.7](#S10.7)) · **Karte** ([S10.3.1](#S10.3.1)) · **Was nicht
  bekannt ist** (mit **Antworten**) · **Was durchsucht wurde** (mit **Nur im Lesesaal**) · **Quellen und
  Materialien**.
- Die **Zeitleiste** hat bei jeder Zeile die Herkunft: **aus der Forschung**, **aus eigener Recherche**, **Vermutung**,
  **wahrscheinlich**.
  Die Zeilen aus den Einträgen des Stammbaums beschreibt [S10.3.3](#S10.3.3).
- **Besitzer und Bewohner** sind getrennt: „Bewohner ist nicht dasselbe wie Besitzer.“ Lücken zeigen „nicht ermittelt ·
  siehe Was nicht bekannt ist“, Personen außerhalb des Stammbaums haben „außerhalb des Stammbaums“.
- **Stand erforscht:** ✓ und der Tag („fertig 12.3.2026“) im Kopf, im Fenster **Häuser** und in der Sprechblase auf
  der Karte.
- **Ohne Ergebnis der Forschung** hat die Seite den Kopf, **Auf einen Blick**, **Nummern im Lauf der Zeit**,
  **Zeitleiste**, **Bewohner aus dem Stammbaum**, **Karte** und einen Satz, woher sie stammt („Die Seite ist aus den
  Einträgen im Stammbaum zusammengestellt.“, oder dass das Haus in der Warteschlange ist).
- **⋯ der Seite:** **HTML speichern** ([S10.3.2](#S10.3.2)) · **Im Buch öffnen…** ([S10.10](#S10.10)) · **Auf der
  Karte** · **Hausname…** · Aktionen der Forschung ([S10.4](#S10.4)) · **Erzählung über das Haus schreiben**
  ([S10.14](#S10.14)) · **Mit Agent besprechen** ([S10.9](#S10.9)) · **Material anhängen…** · **Recherche aus Datei übernehmen…** ([S10.8](#S10.8)) · **Mit anderem Haus
  zusammenführen…** · **Es ist ein anderes Haus…**
- **Bedienung:** App: **Hausseite ›** im Fenster **Häuser**, in der Sprechblase eines Hauses auf der Karte und beim
  Link auf ein Haus in der Personenseite ([S10.11](#S10.11)).
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/house-page.ts buildHousePage (houses.page.sec.* kicker, sum, numbers, timeline, people, look, map, unknown, passed, archiveOnly, sources; treeResidents, page.queued, page.treeOnly, page.noResearch, origin.*, notOwner) · src/ui/house-page-ui.ts toggleHousePageMenu · strings.ts houses.st.done, houses.page.* · commity 53d23b9f, 6cbffa3b, 169c35b0 · nález N4: pořadí proti spec 030 K3.1 (V kostce, Podoba, Mapa, Co se prošlo navíc) -->

<a id="S10.3.1"></a>
### S10.3.1 Karte und Lage des Hauses

Der Abschnitt **Karte** zeigt das Haus (Zoom 17) oder den Ort, wenn die Lage des Hauses nicht bekannt ist (Zoom 14).
Ein Satz unter der Karte sagt, woher die Lage stammt.

| Satz | Wann |
|---|---|
| **Lage von Hand gesetzt** | ein Mensch hat den Punkt verschoben |
| **Lage bestätigt** | ein Mensch hat den Punkt der Forschung bestätigt |
| **Lage nach der heutigen Hausnummer · hohe Sicherheit** | die Forschung fand das Haus im heutigen Adressregister |
| **Lage laut Forschung · hohe Sicherheit** | ein anderer sicherer Punkt der Forschung (Kataster, alte Karte, Beschreibung) |
| **Lage unsicher (die Nummer kann sich geändert haben)** | ein Punkt der Forschung ohne hohe Sicherheit |
| **Die Lage des Hauses ist unbekannt; gezeigt wird der Ort.** | ohne Punkt |

- **Kartenebene:** **Heute** und die Ebenen, die die Forschung für den Ort des Hauses geliefert hat: **Orthofoto
  heute** und **Luftbilder 1950er** (Tschechien). Ohne sie „Nur die heutige Karte; weitere Ebenen hat die Forschung für
  dieses Land nicht geliefert.“
- **Lage bestätigen** gibt es nur bei einem unsicheren Punkt der Forschung, zu dem ein Mensch noch nichts gesagt hat.
  **Punkt verschieben** verschiebt den Punkt durch Ziehen. Beides wird im Stammbaum gespeichert (ein Schritt
  **Rückgängig**) und bei einer Forschung, die das kann, auch in der Forschung als Wort eines Menschen.
- **Anderswo öffnen:** OpenStreetMap, Mapy.com, Google Maps, Street View und die heutige Ansicht, mit dem Hinweis „Lage
  und Fotos sind von heute; die historische Hausnummer muss nicht passen.“
- **Grenzen:**
  - eine Lage, die ein Mensch bestätigt hat, überschreibt die Forschung nicht;
  - **Anderswo öffnen** gibt es nur bei einem Haus mit eigenem Punkt;
  - das Buch, die gespeicherte Hausseite und die Familienseiten zeigen die Lage nur bei einem Haus ohne Personen der
    letzten rund 100 Jahre, und zwar als Kartenausschnitt ([S10.3.4](#S10.3.4)).
- **Bedienung:** App: Hausseite → **Karte** → **Kartenebene**, **Lage bestätigen**, **Punkt verschieben**, **Lage in
  Ausgaben ausblenden** ([S10.3.4](#S10.3.4)); Terminal
  `strom house confirm <Haus> location`.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:src/house-map.ts (zoom 17/14, min 12, max 18), src/ui/house-map-ui.ts (page.map.layers today, ortho, aerial, onlyToday; posManual, posConfirmed, posHigh, posSure, posUnsure, noPos; confirmPos, move, saveHousePoint s house.confirm; Otevřít jinde) · commity 90c54cc6, 307c3a8f, bc1833b9 · research:assets/maplayers.json cz-ortho, cz-ortho-1950 · src/core/houses.ts confirmHouse location (jistota high, původ user), house add location odmítnuto po potvrzení -->

<a id="S10.3.2"></a>
### S10.3.2 Die gespeicherte Hausseite und der Schutz von Personen

**HTML speichern** speichert die Hausseite als eine Datei (z. B. `belokamen-cp-16.html`) ohne Kartenkacheln aus dem
Netz; Bilder des Hauses sind nur verlinkt, die Lage ist ein Kartenausschnitt direkt in der Datei ([S10.3.4](#S10.3.4)).
Die gespeicherte Hausseite, das Buch und die Familienseiten schützen die Personen der letzten rund 100 Jahre.

- **Nie:** heutige Eigentümer; Namen Lebender; der Name eines Zeitzeugen.
- **Personen der letzten rund 100 Jahre** nur mit Namen und Rolle, ohne Jahre.
- **Ereignisse der Forschung aus den letzten rund 100 Jahren und heikle Ereignisse** (Enteignung, Vertreibung)
  werden ausgelassen, bis ein Mensch sie freigibt (**In Ausgaben zeigen**).
- **Lage** nur bei einem Haus ohne Personen der letzten rund 100 Jahre und nur, wenn sie nicht von Hand ausgeblendet
  ist ([S10.3.4](#S10.3.4)); bei einem Haus mit solchen Personen auch kein Hausname.
- **Erzählung über das Haus** nur freigegeben und nur ganz: eine Erzählung, die eine geschützte Person nennt, wird ganz
  ausgelassen ([S10.14.2](#S10.14.2)).
- Die Hausseite sagt, was in den Ausgaben fehlt und warum: „In Ausgaben (HTML, Buch) werden N Ereignisse und die Lage
  des Hauses nicht gezeigt (Menschen der letzten ~100 Jahre).“, „… werden N Ereignisse nicht gezeigt; die Lage des
  Hauses ist von Hand ausgeblendet.“
- **Bedienung:** App: Hausseite → **HTML speichern**; bei einem Ereignis **In Ausgaben zeigen**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/house-privacy.ts, src/privacy.ts RECENT_YEARS 100, buildHousePageDocument, housePageFileName · strings.ts houses.reveal, houses.hiddenSummary, houses.page.save · commit 6f8a9d88 · T3: app:438de916 src/house-privacy.ts houseOutputFilter (locationBy recent|manual), strings.ts houses.hiddenSummary · T4: app:3473602e src/house-privacy.ts houseStoryForOutput -->

<a id="S10.3.3"></a>
### S10.3.3 Die Zeitleiste aus den Einträgen des Stammbaums

Die Zeilen der **Zeitleiste** aus den Einträgen des Stammbaums gehen nach Jahren, eine je Eintrag; ein gemeinsamer
Eintrag eines Paares ist eine Zeile. Was eine Zeile schon sagt, wird nicht wiederholt.

- **Geburt und Taufe** derselben Person im selben Jahr sind eine Zeile „geboren“. Eine Taufe ohne Geburt hat die
  Zeile „getauft“.
- **Wohnort:** mehrere Wohnorte derselben Person im selben Jahr sind eine Zeile „Wohnort“. Die Wohnorte von Partnern
  im selben Jahr sind ebenfalls eine Zeile, mit beiden Namen, wie eine Heirat.
- Tode, Heiraten, Volkszählungen und Einträge der Forschung bleiben eine Zeile je Eintrag.
- **Grenzen:**
  - Wohnorte ohne Jahr werden nicht zusammengefasst;
  - weder der Stammbaum noch die Forschung ändern sich: zusammengefasst werden nur die Zeilen, die die Zeitleiste
    zeigt;
  - genauso entstehen die Zeilen auf der Hausseite, in der gespeicherten Seite ([S10.3.2](#S10.3.2)) und im Buch der
    Häuser ([S10.10](#S10.10)).
- **Bedienung:** App: Hausseite → **Zeitleiste**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:3dc5647c src/house-page.ts houseTreeRows → joinRepeatedRows (narození jedné osoby a roku jednou, narození před křtem; bydliště s rokem a sdílenou osobou nebo partnery partnersIn), factLabel isBaptism (událost baptism → baptizedM/F) · src/book-houses.ts houseTreeRows · strings.ts houses.ev.bornM, bornF, baptizedM, baptizedF, residence · src/__tests__/house-page.test.ts · dirigent:prace/1127-app-147-materialy (Přibaleno, schválená tabulka) -->

<a id="S10.3.4"></a>
### S10.3.4 Die Lage des Hauses in Ausgaben

Das Familienbuch, die gespeicherte Hausseite und die Familienseiten zeigen die Lage des Hauses als Bild: einen
Ausschnitt der heutigen Karte mit dem Punkt und der Nummer des Hauses. Darunter stehen die Koordinaten, wie sicher die
Übereinstimmung der Nummer ist, und die Attribution der Karte. So zeigt die Ausgabe die Lage auch ohne Netz.

- **Wann die Lage gezeigt wird:** nur bei einem Haus mit Punkt (von Hand gesetzt oder von der Forschung) und nur, wenn
  beides gilt:
  - im Haus sind keine Personen der letzten rund 100 Jahre: Lebende, Personen des Stammbaums aus diesen Jahren,
    Einträge des Hauses aus diesen Jahren und Besitzer und Bewohner mit Jahren in dieser Zeit (auch Personen, die der
    Stammbaum nicht kennt);
  - ein Mensch hat die Lage nicht ausgeblendet (**Lage in Ausgaben ausblenden**).
- **Sicherheit:** „Heutige Lage · Übereinstimmung der Nummer bestätigt“, wenn ein Mensch den Punkt gesetzt oder
  bestätigt hat (in der App oder in der Forschung); sonst „Heutige Lage · Übereinstimmung der Nummer angenommen“.
- **Bild:** die heutige Karte von OpenStreetMap mit der Attribution „© OpenStreetMap-Mitwirkende, Lizenz ODbL“. HTML
  (gespeicherte Hausseite, Familienseiten, auch im ZIP und im Geschenk) fügt als weiteres Bild die historische Ebene
  hinzu, die die Forschung für den Ort des Hauses geliefert hat ([S10.3.1](#S10.3.1)); das Buch gibt nur die heutige
  Karte und teilt den Ausschnitt nicht auf zwei Seiten.
- **Ohne Netz:** der Ausschnitt entsteht einmal, und die App speichert ihn in diesem Browser; das nächste Buch, PDF oder
  Geschenk nimmt den gespeicherten. Ohne Netz und ohne gespeicherten Ausschnitt, oder solange die Karte nicht erlaubt
  ist (**Karte anzeigen**), gibt die Ausgabe nur Koordinaten und Sicherheit, ohne Fehler. Auf ein Bild wird höchstens
  10 s gewartet.
- **Hausseite**, Abschnitt **Karte:** bei einem Haus, dessen Lage die Ausgaben zeigen würden, die Zeile „Ausgaben
  (HTML, Buch) zeigen die Lage des Hauses.“ und **Lage in Ausgaben ausblenden**. Nach dem Ausblenden „In Ausgaben
  (HTML, Buch) ist die Lage des Hauses von Hand ausgeblendet.“ und **Lage in Ausgaben zeigen**. Beides ist ein Schritt
  **Rückgängig**.
- **Buch:** die Option **Lage der Häuser** (standardmäßig an, wird gemerkt): „Ein Ausschnitt der heutigen Karte mit dem
  Punkt eines Hauses ohne Menschen der letzten ~100 Jahre; aus: nur der Ort.“ Es gibt sie nur mit dem Teil **Häuser**
  und nur, wenn das Buch ein Haus hat, dessen Lage sich zeigen lässt. Die Anmerkung des Kapitels lautet dann
  „Ereignisse nach <Jahr> und die Lage eines Hauses mit Menschen dieser Jahre werden im Buch nicht angegeben.“
- **Grenzen:**
  - die Personen der letzten rund 100 Jahre haben Vorrang: ein von Hand gewähltes **Lage in Ausgaben zeigen** hebt
    diesen Vorrang nicht auf, und bei einem solchen Haus gibt es weder die Zeile noch die Schaltfläche; warum die Lage fehlt, sagt die Seite
    ([S10.3.2](#S10.3.2));
  - das Ausblenden von Hand gibt es nur im Stammbaum der App (Datei JSON), es geht weder in die Forschung noch in
    GEDCOM;
  - ein schreibgeschützter Stammbaum zeigt nur den Stand, ohne Schaltfläche.
- **Bedienung:** App: Hausseite → **Karte** → **Lage in Ausgaben ausblenden** / **Lage in Ausgaben zeigen**; Export
  **Familienbuch** → **Lage der Häuser**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:438de916 src/house-privacy.ts houseOutputFilter (location jen bez recentPeople a bez hideLocation; locationBy recent|manual; locationSure confirmed: user.location nebo research.location.confirmed), src/house-map-shot.ts (HOUSE_SHOT_TIMEOUT_MS 10 000, today = OSM dlaždice, vrstvy výzkumu jen HTML, ShotCache), src/ui/house-map-shots.ts (IndexedDB strom-map-shots, tilesAllowed: isMapTilesAcknowledged), src/book-houses.ts (figure, houseCoordsText, houseSureText), src/book-options.ts bookHouseMaps (výchozí zapnuto), src/book-memory.ts houseMaps, src/ui/book-ui.ts book-house-maps, src/types.ts HouseUserData.hideLocation (ne v ged-houses.ts) · strings.ts houses.page.map.outShown, outHidden, hideOut, showOut, sureConfirmed, sureAssumed, osmAttribution; book.dlg.houseMaps, houseMapsHint; book.houseChapterProtected; map.tilesNoticeOk · dirigent:spec/145 T3 · prace/1127-app-145-vypraveni-poloha Výsledek -->

<a id="S10.4"></a>
## S10.4 Die Geschichte eines Hauses anfordern

Die Geschichte eines einzelnen Hauses lässt sich immer anfordern, ob die **Hausgeschichte** ([S10.5](#S10.5))
eingeschaltet ist oder nicht. Ein angefordertes Haus kommt an die Spitze der Warteschlange der Forschung.

- **Stand des Hauses** bei der Zeile, auf der Seite, in der Sprechblase auf der Karte und im Fenster **Orte**: **nicht
  erforscht**, **in der Warteschlange**, **wird erforscht**, **fertig <Tag>**, **wartet auf Antwort** (mit
  **Antworten**), **zurückgestellt**, **eigene Recherche wartet auf Übernahme**, **in der Warteschlange: Aussehen des
  Hauses**.
- **Aktionen nach Stand:** nicht erforscht und zurückgestellt → **Hausgeschichte ermitteln…**, bei eingeschalteter
  Hausgeschichte **An die Spitze der Warteschlange**; in der Warteschlange → bei eingeschalteter Hausgeschichte **An
  die Spitze der Warteschlange**; fertig → **Erneut anfordern…**; wird erforscht und wartet auf Antwort → nichts.
- **Fenster Geschichte von <Nummer>, <Ort>:** was gesucht wird („Gesucht wird in Matriken, Ortschroniken, Karten und
  weiteren freigegebenen Quellen.“, bei einem erneut angeforderten Haus „Bereits durchsuchte Quellen werden nicht erneut
  durchsucht; gesucht wird nur in neuen und noch nicht durchsuchten Quellen.“); die Schätzung „Eine
  Forschungssitzung, etwa <Dauer>. Verbraucht das KI-Abo der Forschung.“; **Benachbarte Häuser der Familie im Ort
  werden mitbearbeitet** (höchstens 3 Häuser, Häuser mit Geschichte vorausgewählt); **Material anhängen…
  (optional)**; **Abbrechen** / **Geschichte ermitteln**.
- **Schätzung:** der Median der gemessenen Haussitzungen in dieser Forschung; solange nicht mindestens 3 gemessen
  sind, sind es 30 Minuten je Haus und 20 Minuten je Ortsgerüst, und ein Preis wird nicht gezeigt.
- **Welcher Weg:** bei eingeschalteter Hausgeschichte kommt das Haus über die Brücke direkt an die Spitze der
  Warteschlange, ohne Terminal („Das Haus kommt über die Brücke an die Spitze der Warteschlange der Forschung, ohne
  Terminalfenster.“; danach „<Haus> steht an der Spitze der Warteschlange der Forschung.“). Bei ausgeschalteter öffnet
  die App das Terminal der Forschung, und das Wort wird dort gegeben ([S10.4.1](#S10.4.1)); die Aktion hat die Marke
  **KI + Terminal** ([S4.5.1](S4-research-from-the-app.md#S4.5.1)).
- **In der Warteschlange:** die Aufgabe eines Hauses ist angefordert und wird nie zurückgestellt. Das Ortsgerüst
  ([S10.5](#S10.5)) kommt, wenn der Ort es noch nicht hat, vor das Haus. Das Haus wartet auf das Gerüst seines Ortes
  auch nach dem Verschieben an die Spitze. Eine laufende Aufgabe wird nur verschoben, und die Nachbarn kommen zu ihr
  hinzu. Ein fertiges Haus wird erneut nur in neuen Quellen gesucht.
- **Grenzen:**
  - nur ein Haus, in dem jemand aus dem Stammbaum lebte, und ein Ort, der ein Ort der Forschung ist; Nachbarhäuser
    nur aus demselben Ort;
  - Nachbarn werden nicht angeboten bei einem Haus in der Warteschlange, in Arbeit oder wartend und bei einem erneut
    angeforderten;
  - nicht im Strom-Archiv und nicht bei einer Forschung, die auf einen Agenten wartet;
  - **Hausgeschichte ermitteln…** bei ausgeschalteter Hausgeschichte nur dort, wo die App das Terminal der Forschung
    öffnen kann;
  - eine Ablehnung (Forschung beschäftigt, gesperrt, Festplatte voll, keine Verbindung) nennt den Grund und ändert
    nichts.
- **Bedienung:** App: Stand des Hauses oder ⋯ beim Haus im Fenster **Häuser**, auf der Hausseite, in der Sprechblase
  auf der Karte, im Fenster **Orte** (**Hausgeschichte <Nummer>**); Terminal: [S10.4.1](#S10.4.1).
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:src/ui/house-state-ui.ts (houses.st.*), src/ui/house-request-ui.ts houseActionOf, dialog houses.req.* (HOUSE_REQUEST_WITH_MAX 2, HOUSE_DEFAULT_MINUTES 30 + 20), POST /houses/request, houseSearchLink · src/research-link.ts RESEARCH_LINK_MARKS.house · commity a79b53aa, 96c78f0a · research:src/core/houseauto.ts askHouse (queueAt next, asked, kostra před dům), houseEstimate (HOUSE_MEASURED_MIN 3, HOUSE_MINUTES 30, TOWN_MINUTES 20), src/core/houses.ts houseChain, src/commands/offline.ts 222–226 · src/core/live.ts houseRequestWrite (403 house.link při vypnuté, 404 house.unknown, 400 house.body/house.town, 409 house.archive, 503 research.busy) · commity f325b1c1, abc8331d, 0002cfb4 · nález: cena až po 3 změřených sezeních (spec 030 K6.4) -->

<a id="S10.4.1"></a>
### S10.4.1 Anfordern im Terminal und über einen Link

Im Terminal wird ein Haus mit `strom house request <Haus> [--with <Haus>,<Haus>]` angefordert. Die Forschung gibt die
Schätzung aus („Etwa N Minuten Arbeit des Agenten; das kostet Zeit des Agenten und Nutzung des Abos.“, ein Preis nur
gemessen) und fragt **Die Geschichte des Hauses <Haus> suchen (eine Sitzung des Agenten)?** (Enter = nein). Nach Ja:
„Die Geschichte des Hauses <Haus> kommt zuerst an die Reihe, bei der nächsten Sitzung der Forschung.“

- **Aus der App** (bei ausgeschalteter Hausgeschichte) öffnet der Link das Terminal mit der Überschrift **Die Strom-App
  bittet um:** „die Geschichte des Hauses <Haus> suchen – Nummern, Besitzer und Bewohner, was mit ihm geschah“. Das
  Terminal prüft zuerst, dass der Agent auf dem Computer ist, zeigt die Schätzung und fragt. Danach „Die Geschichte des
  Hauses <Haus> steht in der Warteschlange an erster Stelle.“ und **Die Arbeit des Agenten gleich starten?**
- **Ohne Bestätigung:** beim Starten des Agenten aus der App ohne Bestätigung
  ([S4.5.5](S4-research-from-the-app.md#S4.5.5)) gibt es die Schätzung in einer Zeile aus, auch mit Preis, und startet
  die Arbeit ohne Frage.
- **Grenzen:**
  - der Agent fordert ein Haus nicht selbst an, es ist das Wort eines Menschen; ohne Terminal braucht der Befehl
    `--yes`;
  - ein Haus ohne Personen des Stammbaums, ein Ort, der kein Ort der Forschung ist, oder Nachbarn aus einem anderen
    Ort: „Nichts wurde getan.“ mit Grund;
  - eine Bestätigung vom Telefon nur ohne Preis; mit Preis fragt der Computer;
  - `strom house request` steht nicht in der Hilfe `strom help house`; ihn ruft der Link aus der App auf.
- **Bedienung:** Terminal: `strom house request A0001`, `strom house request "Lhota 16" --with "Lhota 17"`.
- **Gilt seit:** Forschung 1.38.0

<!-- zdroj: research:src/commands/house.ts request (hidden, L232; ui.house.ask, ui.house.minutes, ui.house.usd, ui.house.asked, ui.house.again, ui.house.kept, --yes) · src/cli/menu-links.ts 436–482 (ui.link.asks, ui.link.what.house.search, ui.link.house.none/with/town, ui.link.noconfirm, ui.link.house.done, ui.link.house.now → strom run --task) · src/core/links.ts 525–546 · src/commands/links.ts 164–176 · commit 226f86e1 (K6.3a) · nález: house request skrytý v helpu -->

<a id="S10.5"></a>
## S10.5 Hausgeschichte: Häuser von selbst

Bei eingeschalteter **Hausgeschichte** legt die Forschung Aufgaben zu Häusern selbst an. Standardmäßig ist sie aus;
einschalten darf sie nur ein Mensch.

- **Welches Haus:** es hat einen Eintrag mindestens eines **direkten Vorfahren**; darin lebten **2 Generationen,
  oder** die Einträge umfassen **30 Jahre**; der älteste Eintrag ist **älter als 100 Jahre**; der Ort ist ein Ort der
  Forschung. Zuerst Häuser mit den meisten Vorfahren, dann die ältesten.
- **Wie viele auf einmal:** höchstens **3** offene Gruppen von Hausaufgaben. Eine Gruppe ist ein Haus und benachbarte
  Häuser desselben Ortes mit gemeinsamem Nachnamen, höchstens 3 Häuser.
- **Ortsgerüst:** einmal je Ort, vor seinen Häusern: Herrschaft und Großgut, Pfarrei, Katastralgemeinde, alte Namen,
  wo die Grundbücher und die Zählbögen liegen. Die Häuser des Ortes warten darauf.
- **Kette:** Ortsgerüst → Haus → Aussehen des Hauses ([S10.7](#S10.7)).
- **Reihenfolge in der Warteschlange:** von selbst entstandene Hausaufgaben erst nach der Familienforschung;
  `strom queue` sagt es. Angeforderte Häuser kommen an die Spitze ([S10.4](#S10.4)).
- **Grenzen:**
  - ein Haus ohne laufende Aufgabe, noch nicht erforscht; eine Aufgabe, die ein Mensch verworfen hat, entsteht nicht
    von selbst wieder;
  - nicht im Strom-Archiv und nicht bei einer Forschung, die auf einen Agenten wartet;
  - eine fertige Aufgabe eines Hauses oder Gerüsts schließt der Agent nur, wenn eingetragen ist, was die Aufgabe haben
    soll ([S10.6](#S10.6)).
- **Gilt seit:** Forschung 1.38.0
- **Prüft der Code:** Auswahl der Häuser, Zahl der Gruppen, Gerüst und Kette.

<!-- zdroj: research:src/core/houseauto.ts qualifies (přímý předek, HOUSE_SPAN 30, HOUSE_AGE 100, obec = místo), raiseHouseTasks (HOUSE_AUTO_OPEN 3, HOUSE_GROUP_MAX 3), townTask, createTownTask/createHouseTask/createLookTask (priorita 1, enrich, původ house:town:L…, house:A…, house:look:A…) · src/core/houses.ts houseChain · src/core/queue.ts houseOrder, 493, 546–548 · src/core/config.ts houses (nenastaveno = off) · cs.json house.town.what/why, house.research.what/why · commity 80bd90e2, f325b1c1, 1abbdd7f · dirigent:spec/030 rozhodnutí 26. 11. -->

<a id="S10.5.1"></a>
### S10.5.1 Hausgeschichte ein- und ausschalten

**Hausgeschichte** und **Aussehen der Häuser** sind Einstellungen der Forschung: für alle Forschungen auf dem Computer
oder für einen Stammbaum (der Wert des Stammbaums gewinnt). Die Hausgeschichte ist standardmäßig aus, das Aussehen der
Häuser an.

- **In der App:** **Forschung für diesen Stammbaum › Quellen › Hausgeschichte** unter **Volkszählungen**: „Die
  Forschung bearbeitet selbst die Häuser direkter Vorfahren, in denen die Familie mindestens zwei Generationen oder 30
  Jahre lebte und deren ältester Eintrag älter als 100 Jahre ist. Andere Häuser nur auf Anforderung.“ Ausgeschaltet
  zeigt sie eine Schätzung („Der Auftrag umfasst N Häuser in M Orten · etwa <Dauer> Arbeit des Agenten · verbraucht
  das KI-Abo“). Das Einschalten fragt (**Hausgeschichte einschalten?**), das Ausschalten auch (**Hausgeschichte
  ausschalten?**: „Wartende Hausaufträge werden zurückgestellt, fertige Ergebnisse bleiben.“). Eingeschaltet zeigt sie
  „Ein · N Häuser: N fertig, N in Arbeit, N in der Warteschlange“ und **Häuser ›**, und **Auch das Aussehen der
  Häuser: ein** / **aus** (änderbar im Terminal). Geschrieben wird über die Brücke, ohne Terminal: es ist die
  Entscheidung eines Menschen in der App.
- **Im Terminal:** **Einstellungen › Geschichte der Häuser in dieser Forschung** (an, „ein, ohne das Aussehen der
  Häuser“, aus, „aus, N Aufgaben der Häuser zurückgestellt“). Vor dem Einschalten sagt es, was die Forschung tun wird
  („Ein einzelnes Haus lässt sich immer anfordern.“), die Zahl der Häuser und die Schätzung („N Häuser in M Gemeinden,
  insgesamt etwa N Minuten Arbeit des Agenten“) und fragt (Enter = nein). Eingeschaltet bietet es **Auch das Aussehen
  der Häuser** und **Geschichte der Häuser ausschalten**.
- **Das Ausschalten** stellt nur wartende Hausaufgaben zurück, die von selbst entstanden sind (Gerüst, Haus,
  Aussehen). Angeforderte, laufende, von einem Menschen zurückgestellte, die Übernahme einer Recherche und Aufgaben mit
  Material bleiben. Nach dem Einschalten kehren die zurückgestellten zurück; fertige Ergebnisse bleiben.
  `strom task list` markiert sie mit „held: houses off“; sie warten nicht auf einen Menschen.
- **Aussehen der Häuser aus:** die Aufgabe eines Hauses schreibt nur das kurze Aussehen; eine Aufgabe zum Aussehen
  folgt nicht.
- **Grenzen:**
  - einschalten darf nur ein Mensch: im Terminal, im Menü, in einem Systemfenster oder in der App; versucht es der
    Agent, fragt ein Systemfenster, das der Agent nicht sieht; ausschalten darf jeder;
  - in der App gibt es die Zeile nicht beim Strom-Archiv und nicht bei einer Forschung, die auf einen Agenten wartet;
  - **Häuser ›** gibt es nur bei einem geöffneten Stammbaum.
- **Bedienung:** App: **Forschung → Weitere Aktionen → Forschung für diesen Stammbaum… → Quellen →
  Hausgeschichte**; Terminal: **Einstellungen › Geschichte der Häuser in dieser Forschung**,
  `strom config set houses on|off --for-tree`, `strom config set houses.look on|off --for-tree`.
- **Gilt seit:** Forschung 1.38.0, App 3.33.0
- **Prüft der Code:** Einschalten nur durch einen Menschen; was das Ausschalten zurückstellt.

<!-- zdroj: research:src/core/config.ts houses (housesSwitch, nenastaveno off), houses.look (housesLook, nenastaveno on) · src/commands/setup.ts housesDecision 1679–1697 (requireHuman, okno systému, STROM_FOR_APP; vypnout kdokoli), ui.consent.houses(.tree) · src/cli/menu-settings.ts housesLabel/housesStep 253–297 (ui.settings.houses*, --for-tree) · src/core/live.ts housesWrite POST /houses (409 house.archive) · src/core/houses.ts houseHeld (jen vzniklé samy, af7194c5) · src/commands/tasks.ts 979–1045 (held: houses off) · src/core/waiting.ts 458–460 · app:src/ui/research-tree-settings-ui.ts renderResearchHousesRow (house.auto, researchHousesShown: ne archiv, ne čekající na agenta), src/ui/houses-auto-view.ts · strings.ts houses.auto.* · commity app 3ea32837, research 80bd90e2, 3c9e4853, 9242429a · nález: vypnutí odkládá jen úkoly vzniklé samy (spec 030 K6.1) -->

<a id="S10.6"></a>
## S10.6 Wie der Agent ein Haus erforscht

Die Aufgabe eines Hauses bekommt von der Forschung ein Briefing: die Personen des Stammbaums im Haus mit Jahren und
Angaben, das Ortsgerüst, was durchgesehen wurde, was von Hand durchzugehen ist, was nicht bekannt ist, übernommene
Angaben zum Lesen ([S10.6.2](#S10.6.2)), das bisherige Aussehen, Material, Nachbarhäuser und eine Liste der Quellen
nach Land ([S10.6.1](#S10.6.1)). Die Liste ist die Arbeitsliste des Agenten; ins Haus kommen nur Funde mit Quelle und
eine Zeile „durchgesehen“ mit der Liste.

1. **Welches Haus und wo:** zuerst das Haus bestimmen. Die heutige Nummer nach dem Adressregister; Dörfer haben ihre
   Nummerierung meist behalten, Städte haben um 1805–1815 und 1884 umnummeriert. Eine Umnummerierung schlägt der Agent
   nur vor, bestätigen muss sie ein Mensch ([S10.1.2](#S10.1.2)). Lässt sich das Haus nicht bestimmen, wartet die
   Aufgabe auf Antwort und der Agent sucht nicht weiter.
2. **Liste der Quellen aus dem Briefing:** Adressregister, Flurnamen, Gewässer, Orthofoto heute und alte Luftbilder,
   Topographie aus dem Gerüst, örtliche Websites. Bei einem besonderen Gebäude (Mühle, Wirtshaus, Schmiede, Pfarrhaus,
   Schule) auch andere Gebäude derselben Art im Ort, das Gewässer und der Mühlgraben und woher der Besitzer kam.
3. **Zeitleiste, Besitzer, Bewohner:** Volkszählungen nach Hausnummern (wo das Archiv sie freigibt), Matriken nach
   Nummern, Grundbücher. Besitzer (von–bis, wie sie das Haus erwarben) getrennt von Bewohnern (Bauer, Ausgedinger,
   Inwohner, Knecht, Mieter). Volkszählungen nennen Besitzer nur 1910 und 1921. Personen außerhalb des Stammbaums sind
   Bewohner, nie neue Personen des Stammbaums.
4. **Kurzes Aussehen** immer ([S10.7](#S10.7)); eine Kartenebene mit Namen.
5. **Ende:** was nicht bekannt ist, was nur im Lesesaal liegt, was von Hand durchzugehen ist, und die Prüfung des
   Aussehens. Schritte von Hand und der Lesesaal sind eine Liste für einen Menschen, nie eine neue Aufgabe. Ein erneut
   angefordertes Haus ergänzt nur, was fehlt.

- **Fertige Aufgabe:** die Aufgabe eines Hauses oder Gerüsts schließt der Agent nur, wenn eingetragen ist: eine Zeile
  „durchgesehen“ mit der Liste; beim Haus ein kurzes Aussehen oder dass über das Aussehen nichts bekannt ist; mit
  Aussehen der Häuser die Prüfung des Aussehens; keine ungelesene übernommene Angabe aus dem Web. Bei Agenten, deren
  Suchen die Forschung sieht (Claude, Grok), zusätzlich mindestens 3 Suchen und Seiten. Sonst „Aufgabe noch nicht
  fertig – die Liste der Quellen des Hauses ist nicht durchgegangen“.
- **Sicherheit** jeder Angabe: **sicher**, **wahrscheinlich**, **geschätzt** (bei einer Nummer zusätzlich
  **vermutlich**); der Agent erhöht sie nie. Herkunft: Forschung, aus der eigenen Recherche, von Hand eingetragen.
- **Grenzen:**
  - die Prüfung der fertigen Aufgabe hat die Aufgabe eines Hauses und eines Gerüsts, nicht die Aufgabe zum Aussehen;
    sie läuft nur, wenn der Agent die Aufgabe schließt;
  - aus der Liste entstehen weder neue Aufgaben noch Fragen.
- **Gilt seit:** Forschung 1.38.0
- **Prüft der Code:** Prüfung der fertigen Aufgabe, Umnummerierung nur als Vorschlag. **Nur Methodik:** Schritte 1–5.

<!-- zdroj: research:assets/method/house.md (house-research, house-town) · src/core/houseauto.ts houseBrief, houseDoneLacks (HOUSE_CHECK_MIN 3, claude a grok) · src/commands/tasks.ts 425–431 (house.checklist, isAgent) · src/core/model.ts HOUSE_CERTAINTIES, RESIDENT_ROLES · cs.json ui.house.certainty.*, ui.house.origin.*, house.research.done · commity 8561e5b1, 202c0927, 8a2d4dd6 · dirigent:spec/145 T5 · nález: počet hledání jen u claude a grok, úkol podoby bez kontroly -->

<a id="S10.6.1"></a>
### S10.6.1 Quellen eines Hauses und was nicht hinausgeht

Die Liste der Quellen richtet sich nach dem Land, nach dem Punkt des Ortes: ein allgemeiner Teil und ein Teil für die
Region. Nur öffentliche Quellen und in der Forschung erlaubte Archive ([R9](R9-archives.md)).

- **Tschechien:** Ort – die Topographien von Schaller (1785–1791) und Sommer (1833–1849), Flurnamen des ČÚZK, Website,
  Chronik und Wikipedia des Ortes, freie Bilder (Wikimedia Commons, freie Werke in Kramerius, Europeana); von Hand der
  Památkový katalog, Karten des stabilen Katasters, Grundbücher online. Haus – das Adressregister RÚIAN, der Flurname
  beim Punkt, Gewässer, Orthofoto heute und aus den 1950er Jahren, Topographie aus dem Gerüst, örtliche Websites; von
  Hand die Indikationsskizze, Denkmäler, Grundbücher. Mühlen von Hand vodnimlyny.cz.
- **Österreich:** Franziszeischer Kataster (1817–1861), Tirol, Hofnamen Oberösterreichs. **Bayern:** Häuserbuch,
  Urkataster 1812 und seine Erneuerung 1861/62.
- **Kartenebenen:** Orthofoto Tschechiens (heute) und Luftbilder Tschechiens (1950er Jahre); angeboten, wenn die Ebene
  den Ort des Hauses abdeckt, und nur von in der Forschung erlaubten Hosts.
- **Was nicht hinausgeht:** alles außer Ort, Hausnummer, Koordinaten und Namen von Personen, die vor mehr als 100
  Jahren starben. Nichts wird angemeldet, gekauft, bestellt oder abgeschickt. Eine Website, deren Bedingungen KI
  verbieten, nur als Link zum Durchgehen von Hand. Heruntergeladen werden nur Werke mit freier Lizenz, sonst ein Link.
- **Heutige Personen:** heutige Besitzer und Bewohner werden weder gesucht noch eingetragen. Ein heikles Ereignis des
  20. Jahrhunderts (Enteignung, Vertreibung) wird als heikel eingetragen ([S10.3.2](#S10.3.2)).
- **Grenzen:**
  - die Forschung lehnt einen Besitzer oder Bewohner ohne Ende ab, der in den letzten 100 Jahren beginnt, wenn es
    keine Person des Stammbaums ist;
  - ein Zeitzeuge mit Namen nur mit Einwilligung;
  - ein Bild zum Aussehen des Hauses und ein Bild des Ortes nur mit freier Lizenz (CC0, CC BY, CC BY-SA, freies Werk,
    GFDL, Free Art License, OGL; nicht NC, ND, „alle Rechte vorbehalten“).
- **Bedienung:** Terminal: `strom house sources <Haus>`, `--town <Ort>`, `--look`.
- **Gilt seit:** Forschung 1.38.0
- **Prüft der Code:** heutige Besitzer und Bewohner (nur der Teil in den Grenzen), Zeitzeuge, Lizenzen der Bilder.
  **Nur Methodik:** was hinausgeht, Bedingungen der Websites, heikle Ereignisse, der übrige Schutz heutiger Personen.

<!-- zdroj: research:src/core/housesources.ts, assets/housesources.json (cz, at, by; town, house, special, look) · assets/maplayers.json (cz-ortho, cz-ortho-1950, CC BY 4.0) · assets/method/house.md (Prameny, never out) · src/commands/house.ts notToday 416–419 (HOUSE_RECENT 100, --person), material --witness --witness-consent 809–830, notFree 344 · src/core/houses.ts freeLicence 875 · commity 3c9e4853, c96eb4e8, 648b7f1b · nálezy: ochrana dnešních lidí hlídaná jen částečně (spec 030 K1.4a, K6.7), licence materiálu nehlídá kód (K8.5), robots.txt přes strom net web --check neověřeno -->

<a id="S10.6.2"></a>
### S10.6.2 Übernommene Angaben mit Quelle im Web

Eine Angabe eines Hauses (Zeitleiste, Besitzer, Bewohner, Nummern, Lage), deren Quelle nur eine Adresse im Web ist und
die niemand gelesen hat, ist eine **ungelesene übernommene Angabe**. Meist kam sie aus einer eigenen Recherche
([S10.8](#S10.8)). Der Agent liest sie in der nächsten Aufgabe des Hauses unter der Adresse und bestätigt, präzisiert
oder korrigiert die Angabe, mit der Stelle in der Quelle (Seite, Abschnitt).

- Sicherheit nach Art der Quelle: Ortsgeschichte und Chronik höchstens **wahrscheinlich**.
- Nach dem Lesen eine Zeile „durchgesehen“. Das Dokument wird nicht gespeichert, die Adresse bleibt.
- Nicht erreichbare Adresse: nur eine Zeile in „durchgesehen“, die Angabe bleibt, wie sie war.
- **Grenzen:**
  - eine ungelesene Angabe hindert den Agenten, die Aufgabe eines Hauses oder Gerüsts zu schließen ([S10.6](#S10.6));
  - eine Angabe von einem Menschen wird nie ersetzt, eine neue Quelle kommt daneben;
  - daraus entsteht weder eine Aufgabe noch eine Frage.
- **Gilt seit:** Forschung 1.38.0
- **Prüft der Code:** was ungelesen ist, Schließen der Aufgabe. **Nur Methodik:** Lesen und Sicherheit.

<!-- zdroj: research:src/core/houseunread.ts (pramen S… s webovou adresou, bez obrázků, záznamu a výřezu, bez přepisu a čtení, ne v prošlo se, nečetlo sezení) · assets/method/house.md „Taken over, never read“ · src/core/houses.ts replaceHouseItem (--replaces jen u položek výzkumu) · commit e4ec6ff8 · dirigent:spec/145 T7 -->

<a id="S10.7"></a>
## S10.7 Das Aussehen des Hauses

Die Aufgabe eines Hauses schreibt immer ein **kurzes Aussehen** des Hauses (Beschreibung mit Sicherheit und Quelle,
gegebenenfalls ein Bild) oder einmal „Aussehen: automatisch nicht mehr – <warum>“. Danach sagt sie, ob es zum Aussehen
noch etwas zu finden gibt: **Material zum Lesen**, **ein Bild des Ortes**, auf dem das Haus wohl ist, **eine
vorliegende Quelle**, die das Gebäude beschreibt, oder **automatisch nicht mehr**.

- Die **Aufgabe zum Aussehen** („Aussehen des Hauses <Haus>“) folgt auf die Aufgabe des Hauses nur, wo es etwas zu
  finden gibt, und nur bei eingeschaltetem Aussehen der Häuser ([S10.5.1](#S10.5.1)). Der Agent liest darin nur das
  Material, das Bild, die vorliegende Quelle und das alte Luftbild beim Punkt des Hauses; was nur von Hand geht (z. B.
  die Indikationsskizze), trägt er zum Durchgehen von Hand ein.
- **Bilder des Ortes** und **Flurnamen** schreibt das Ortsgerüst einmal für alle Häuser des Ortes; Bilder nur mit
  freier Lizenz, mit Lizenz und Urheber.
- **In der App:** Abschnitt **Das Gebäude** auf der Hausseite: Beschreibung mit Sicherheit und Herkunft, Bilder des
  Hauses mit Lizenz, **Bilder des Ortes**, **Flurnamen** (die bei diesem Haus zuerst). Wenn nichts bekannt ist: „Wie das
  Haus aussah, ist nicht bekannt.“, das Vorgehen von Hand und **Material anhängen…**. Stand **in der Warteschlange:
  Aussehen des Hauses**.
- **Material zu einem fertigen Haus** (bei eingeschalteter Hausgeschichte und eingeschaltetem Aussehen der Häuser)
  legt eine Aufgabe zum Aussehen an („nach der Recherche kam Material zum Haus hinzu“).
- **Grenzen:**
  - eine Aufgabe zum Aussehen nach einem angeforderten Haus ist ebenfalls angefordert (wird nicht zurückgestellt),
    kommt aber nicht an die Spitze der Warteschlange;
  - bei ausgeschaltetem Aussehen der Häuser bleibt nur das kurze Aussehen;
  - **Material anhängen…** unter einem unbekannten Aussehen nur in einem bearbeitbaren Stammbaum.
- **Bedienung:** App: Hausseite → **Das Gebäude**; Terminal: `strom house show <Haus>` (**Aussehen**, **Mehr zum
  Aussehen**, **Bilder**, **Flurnamen**), Einstellungen [S10.5.1](#S10.5.1).
- **Gilt seit:** Forschung 1.38.0, App 3.33.0
- **Prüft der Code:** Aufgabe zum Aussehen nur, wo es etwas zu finden gibt, Lizenzen der Bilder, ein einziges
  „automatisch nicht mehr“.

<!-- zdroj: research:src/core/houseauto.ts houseTaskDone 334, createLookTask (asked bez top), houseTaskForMaterial 484 (house.look.material) · src/commands/house.ts look, look-check (--next material|picture|source|none, house.look.unknown), picture, field-name · cs.json ui.house.look, lookCheck, lookNext.*, pictures, fieldNames, house.look.what/why/done · assets/method/house.md house-look · app:src/house-page.ts sec.look, lookUnknown · strings.ts houses.st.queuedLook · commity research 8561e5b1, 202c0927, 9242429a, app 21584d89 · dirigent:spec/145 T1 · nález: úkol podoby vyžádaný, ale ne na vršek -->

<a id="S10.8"></a>
## S10.8 Eigene Recherche und Material zum Haus

Eine eigene Recherche zu einem Haus (Notizen, Auszüge, Links) lässt sich der Forschung geben. Der Text wird unverändert
als Material „eigene Recherche“ gespeichert, und eine Übernahmeaufgabe trägt ihn ohne neue Suche ins Haus ein.

- **Was sie nimmt:** `.md`, `.markdown`, `.txt`, eine Datei oder einen Ordner. Das Haus erkennt sie an der ersten
  Überschrift, sonst am Dateinamen; zwei Nummern sind zwei Häuser. Dieselbe Datei ein zweites Mal: „bereits
  übernommen“.
- **Unklares** (der Ort ist kein Ort der Forschung, mehrere Orte gleichen Namens, das Haus ist nicht im Stammbaum)
  wird im Terminal erfragt („Welches Haus?“, **das Haus … hinzufügen**, **die Datei nicht übernehmen**); nichts wird
  geraten.
- **Links im Text** werden als durchgegangen markiert; Links in einem Abschnitt mit der Überschrift „von Hand“ oder
  „Lesesaal“ bleiben zum Durchgehen von Hand.
- **Die Übernahmeaufgabe** („Die Recherche zum Haus <Haus> übernehmen“): eine je Haus, eine weitere Datei kommt hinzu.
  Der Agent sucht nichts, gibt die Sicherheit so, wie der Text sie gibt (nie höher), eine Umnummerierung nur als
  Vorschlag. Angaben mit Quelle im Web liest erst die Aufgabe des Hauses ([S10.6.2](#S10.6.2)). Stand des Hauses
  **eigene Recherche wartet auf Übernahme**.
- **Material zum Haus** (eine Datei oder eine Erinnerung): **Material anhängen…**. Ein Zeitzeuge mit Namen nur mit
  Einwilligung. Bei eingeschalteter Hausgeschichte legt es eine Aufgabe des Hauses an (bei einem fertigen Haus eine
  Aufgabe zum Aussehen, [S10.7](#S10.7)); bei ausgeschalteter wird es nur gespeichert.
- **Grenzen:**
  - `.html`, `.htm` und Dateien in Unterordnern nimmt sie nicht, sie führt sie nur auf;
  - die Übernahmeaufgabe wird bei ausgeschalteter Hausgeschichte nicht zurückgestellt;
  - ein Agent ohne Terminal übernimmt eine unklare Datei nicht, er gibt die Befehle zum Ergänzen zurück;
  - Anhänge (Bilder, Kartendaten) nur mit freier Lizenz.
- **Bedienung:** App: ⋯ beim Haus → **Recherche aus Datei übernehmen…** (öffnet das Terminal), **Material
  anhängen…**; Terminal: `strom house import <Datei|Ordner> [--house <Datei>=<Haus>] [--skip <Datei>]`,
  `strom house add material <Haus> --input I…` oder `--memory "<Text>"`.
- **Gilt seit:** Forschung 1.38.0, App 3.33.0
- **Prüft der Code:** Rückfrage bei Unklarem, Einwilligung des Zeitzeugen, Übernahmeaufgabe. **Nur Methodik:**
  Sicherheit aus dem Text, Lizenzen der Anhänge.

<!-- zdroj: research:src/commands/house.ts import 927, material 809–830 · src/core/houseimport.ts · assets/terms/houses.json (ručně, badatelna) · cs.json ui.house.import.*, house.takeover(.why), ui.link.what.house.import · src/core/houseauto.ts houseTaskForMaterial (top false) · assets/method/house.md house-takeover · app:strings.ts houses.st.takeover, takeoverNote · commity 5703ae19, 4a6869fd, f766c63f · nálezy: materiál k domu nejde na vršek (komentář × kód), licence materiálu jen metodika -->

<a id="S10.9"></a>
## S10.9 Ein Haus mit dem Agenten besprechen

**Mit Agent besprechen** öffnet ein Gespräch mit dem Agenten über ein Haus. Der Agent lädt zuerst das Haus, das
Ortsgerüst, die Methodik des Hauses und die Liste der Quellen; er trägt nur ein, was er herausfindet, mit Quelle, und
legt eine Folgeaufgabe nur an, wenn ein Mensch darum bittet.

- Vor dem Start fragt das Terminal: „ein Gespräch mit dem Agenten (<Agent>) über das Haus <Haus>: was er findet, kommt
  zum Haus.“ und sagt, dass der Agent auf das Abonnement oder KI-Guthaben arbeitet.
- **Grenzen:**
  - nur bei einer Forschung, in der der Agent arbeitet: nicht im Strom-Archiv, nicht bei einer Forschung, die auf
    einen Agenten wartet, und nicht beim Beispiel ([S9.4](S9-trying-the-sample.md#S9.4));
  - das Haus muss einen Datensatz oder Personen des Stammbaums haben.
- **Bedienung:** App: ⋯ beim Haus im Fenster **Häuser** und ⋯ der Hausseite → **Mit Agent besprechen** (Marke **KI +
  Terminal**); Terminal: `strom chat --house <Haus>`.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:src/ui/house-material-ui.ts houseChatPossible, houseChatLink (do=chat) · strings.ts houses.discuss · commit 955323be · research:src/core/links.ts 525–546 (chat bez with), src/cli/menu-links.ts houseChat, src/commands/start.ts 165–235 (strom chat --house, ui.chat.house.say) · cs.json ui.link.what.chat.house, ui.link.cost · src/core/live.ts AGENT_FEATURES house.chat, forDemo · commity 8561e5b1, 9242429a · dirigent:spec/145 T2 · nález N5: ve stromu jen ke čtení akce zůstává, když ji výzkum dovolí -->

<a id="S10.10"></a>
## S10.10 Häuser im Buch und in den Seiten

- **Buch eines Hauses:** die Auswahl **Haus** („die Familie des Hauses über Generationen“) ergibt ein Buch über ein
  Haus: alle mit einem Eintrag im Haus, nach Geburt, mit Familien („Die Familie des Hauses über Generationen: N
  Personen aus den Jahren …–…, mit Ehepartnern und im Haus geborenen Kindern.“). Voreingestellt ist das Haus der
  zentralen Person, sonst das Haus mit Geschichte mit den meisten Personen; **Haus wählen** bietet **Häuser mit
  Geschichte** und **Weitere Häuser**. Die Option **Letzte 100 Jahre nur mit Namen** (standardmäßig an): Personen der
  letzten rund 100 Jahre nur mit Namen und Rolle, ohne Daten. Von der Hausseite öffnet **Im Buch öffnen…** das Buch bei
  diesem Haus.
- **Kapitel Häuser** im Buch: Häuser der Personen des Buches mit Geschichte ([S10.1](#S10.1)) oder mit fertiger
  Geschichte aus der Forschung; beim Haus die freigegebene Erzählung ([S10.14.2](#S10.14.2)), Name, Aussehen, Nummern
  im Lauf der Zeit, Zeitleiste, Besitzer, Bewohner, Bemerkenswertes, Lage ([S10.3.4](#S10.3.4)) und Quellen als
  nummerierte Anmerkungen. Standardmäßig an, nur wenn der Stammbaum mindestens ein Haus
  mit fertiger Geschichte hat. **Häuserverzeichnis** nur mit dem Kapitel Häuser.
- **Familienseiten und Seiten des Stammbaums** ([A7.5](A7-book-pages-and-export.md#A7.5)): Option **Häuser**: **In den
  Familienseiten, mit den Personen verknüpft** (Voreinstellung; Häuser mit Geschichte mit Zeitraum und Generationen,
  **Häuserregister** nach den Orten und eine Seite für jedes Haus), **Nur eine Erwähnung des Hauses, ohne seine
  Seiten**, **Ohne Häuser**. Angeboten, wenn Personen der Auswahl in einem Haus mit Geschichte lebten. Die Zeitleiste
  der Stammlinie hat den Chip **Häuser ⌂** ([S10.11](#S10.11)).
- **Grenzen:**
  - das Buch nennt die Lage nur mit der Option **Lage der Häuser** und nur bei einem Haus ohne Personen der letzten
    rund 100 Jahre ([S10.3.4](#S10.3.4)); sonst „Ereignisse nach <Jahr> und die Lage des Hauses werden im Buch nicht
    angegeben.“; heikle Ereignisse und Ereignisse der Forschung der letzten rund 100 Jahre lässt es aus
    ([S10.3.2](#S10.3.2));
  - die Seiten geben über Häuser nichts aus den letzten rund 100 Jahren;
  - die Seiten nehmen Häuser mit Geschichte nach der Schwelle ([S10.1](#S10.1)), das Buch auch Häuser mit fertiger
    Geschichte aus der Forschung;
  - die Auswahl **Haus** nur in einem Stammbaum mit einem Haus mit Nummer und nur für das Buch; das Geschenk
    ([A7.9](A7-book-pages-and-export.md#A7.9)) und das Bild haben keine Häuser.
- **Bedienung:** App: Export **Familienbuch** → **Haus**, Teil **Häuser**, **Häuserverzeichnis**, **Lage der Häuser**; Familienseiten und Seiten des Stammbaums → **Häuser**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/book-options.ts (book.dlg.kind.house, kindHint.house, chooseHouse, housesHistory, housesOther, dlg.houseScope, houseRecent, bookHouseRecent, parts.houses, parts.houseIndex, bookHouseDefaults, unavailable.houses, unavailable.houseIndexChapter, unavailable.houseIndex), src/book-houses.ts, src/book.ts houseOutputFilter, book.houseIndexProtected, src/lineage.ts case 'house' · src/family-pages.ts 709 outputHouses (overThreshold), src/ui/book-ui.ts 521 familyPages.housesRow, housesOpt.pages/mention/none · page.openInBook · commity 26a28e96, ffc93153, a9f8f9cd, d7db62b4, 5b4d880a, 230afefd, f5b46c5b, 8d93f0d5 · dirigent:spec/145 T6 · T3 poloha v knize: app:438de916 (book.houseChapterProtected) · T4 vyprávění v knize: app:d7f65e13 src/book-houses.ts · nález N10 (výstupy podle prahu × kniha i s hotovou historií) -->

<a id="S10.11"></a>
## S10.11 Häuser an anderen Stellen der App

| Wo | Was |
|---|---|
| Personenseite | die Adresse eines Ereignisses in einem Haus ist ein Link zum Haus; unter **Orte** die Zeile **Häuser** mit „Haus <Nummer> ›“ und den Jahren der Person im Haus |
| Zeitleiste | die Sprechblase eines Ereignisses nennt das Haus |
| Zeitleiste der Stammlinie | Chip **Häuser ⌂**: Einheirat, Auszug aus dem Haus, als Letzter im Haus |
| Karte | Ebene **Häuser der Familie** (standardmäßig an, nur wenn ein Haus einen Punkt hat); ein Haus näher als 30 px am Punkt des Ortes bleibt im Ort, bis die Karte vergrößert wird; in der Migration gibt es keine Häuser |
| Fenster **Orte** | beim Ort **Häuser der Familie** mit Liste; **Häuser im Ort ›**; Eintrag **Hausgeschichte <Nummer>** |
| Tabelle | Spalte **Haus** (Haus der Geburt oder des Ereignisses, Link zur Seite, ältere Nummer in Klammern) |
| Personenlisten | Regel **Wohnte im Haus** (auch in den Jahren), nach Geburt, Heirat, Volkszählung, Wohnort und Tod ([A11](A11-lists-of-people.md)) |
| Statistik | Thema **Häuser**; am längsten eine Familie, Einheirat ([A13](A13-tree-statistics.md)) |
| Suche | Gruppe **Häuser** über den Personen (höchstens 5); bei einer über die Hausnummer gefundenen Person **Haus ›** |
| Warteschlange und **Wartet auf Bearbeitung** | Aufgaben **Hausgeschichte <Nummer>, <Ort>**, **Recherche für Haus <Nummer> übernehmen**, **Ortsgerüst <Ort> für Häuser**; **Hausseite ›**; eine Frage zum Haus mit „Haus <Nummer> ›“; eine neue Fassung der Erzählung „Die Erzählung über Haus <Nummer> wartet auf Freigabe“ ([S10.14](#S10.14)) |
| Erzählung einer Person | Link **Haus <Nummer> ›** auf ein Haus mit freigegebener Erzählung ([S10.14](#S10.14)) |
| GEDCOM | Datensatz `_HOUSE` nur für ein Haus mit Namen oder ein zusammengeführtes (Ort, Nummern mit Datum, Name, „dasselbe Haus“); Trennung, Lage, Ausblenden der Lage von Hand und freigegebene Ereignisse nur in JSON; die Erzählung über das Haus trägt GEDCOM nicht |

- **Die Forschung und `_HOUSE`:** `strom sync` liest Häuser aus dem GEDCOM der App als Wort eines Menschen: Name,
  fehlende Nummer und „dasselbe Haus“. Es nimmt nichts weg; einen Ort, der kein Ort der Forschung ist, meldet es nur.
  Die Forschung schreibt `_HOUSE` nicht in die Datei.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:src/person-page.ts, src/person-houses.ts (integration.ppHouses, 4bb8b52e) · src/rod-timeline.ts, src/house-events.ts (integration.chip, f5b46c5b) · src/map-houses.ts, src/ui/map-houses-ui.ts (houses.mapLayer, 30 px, mapMigOff; 20f6ef91, 31130150, cef1ed0f) · src/ui/house-request-ui.ts familyHouses.* (fa5df8fb) · Tabulka integration.tableCol (fc7aced0) · ruleLivedIn, ruleYears (9cfd8ef1) · src/ui/tree-stats-ui.ts statsHouses, statsLongest, statsMarriedIn (6acc0762) · src/house-search.ts searchGroup, searchHouse (dfe6c13d) · src/house-tasks.ts taskHouse, taskImport, taskSkeleton (4e322dec) · src/ged-houses.ts (d3fd1e86) · research:src/core/housesync.ts planHouses, applyHouseChange (3fbde6b7), ui.sync.house.* · nález: _HOUSE jen jedním směrem -->

<a id="S10.12"></a>
## S10.12 Die Befehle `strom house`

| Befehl | Was er tut |
|---|---|
| `strom house list [--town <Ort>]` | Häuser des Stammbaums, mit Datensatz und nur aus Angaben: Haus, Gemeinde, Nummer, Name, Personen, Jahre, Stand |
| `strom house show <Haus>` / `--town <Ort>` | das ganze Haus / das Ortsgerüst |
| `strom house sources <Haus>` | Liste der Quellen der Aufgabe ([S10.6.1](#S10.6.1)) |
| `strom house add <Ort> <Nummer> [--name]` | ein neues Haus, auch ohne Personen des Stammbaums |
| `strom house add <Art> <Haus> …` | Eintrag ins Haus: Ereignis, Besitzer, Bewohner, Nummer (`--proposed`), Lage, durchgesehen, von Hand durchzugehen, unbekannt, nur im Lesesaal, Aussehen, Prüfung des Aussehens, Bild, Flurname, Karte, Zusammenfassung, Material, Name |
| `strom house confirm <Haus> renumber\|location\|not-same` | Wort eines Menschen ([S10.1.2](#S10.1.2)) |
| `strom house import` | eigene Recherche ([S10.8](#S10.8)) |
| `strom house request` | Anfordern eines Hauses ([S10.4.1](#S10.4.1)) |
| `strom house story <Haus>` | Anfordern der Erzählung über das Haus ([S10.14.1](#S10.14.1)) |
| `strom fixes house-numbers` | auf zwei Arten geschriebene Häuser |

- **Verweis auf ein Haus:** `A0001`, der Schlüssel (`lhota|16`), `L12 16` oder `Lhota 16`. Einen mehrdeutigen Verweis
  lehnt die Forschung ab.
- **Quelle** eines Eintrags: `--source S… --locator … --url … --from I…`; `--replaces <id>` ersetzt nur einen Eintrag
  der Forschung.
- **`strom fixes house-numbers`** bringt Häuser in Ordnung, die vor Forschung 1.38.0 so geschrieben wurden, dass aus
  einem Haus zwei wurden: eine Notiz, die nur eine Hausnummer ist („čp. 13“), kommt ins Feld des Hauses (die Notiz
  bleibt); die Kennzeichnung vor der Nummer („čp. 16“ → „16“) und vor einer Straße („čp. Dlouhá 12“ → „Dlouhá 12“)
  entfällt. Eine Notiz mit mehreren Nummern bleibt, und die Forschung sagt, warum. Auf das Wort eines Menschen,
  kostenlos, auch im Strom-Archiv; rückgängig mit `strom fixes undo house-numbers`
  ([R13](R13-reporting-a-problem.md)).
- **Grenzen:** beim Ortsgerüst (`--town`) nur durchgesehen, von Hand durchzugehen, unbekannt, nur im Lesesaal, Karte,
  Zusammenfassung, Bild, Flurname; Zusammenfassung, Bild und Flurname nur beim Ort.
- **Gilt seit:** Forschung 1.38.0

<!-- zdroj: research:100aee43 src/commands/house.ts house story · research:src/commands/house.ts list 152, show 181, sources 203, add 280/367, confirm 868, import 927, request 232 (hidden) · src/core/houses.ts findHouse 359 (house.unknown, house.ambiguous) · src/core/housenumberfix.ts, src/commands/fixes.ts 1106–1111, ui.fixes.house-numbers.name · cs.json ui.house.head · strom help house (přes guard) · commity 3c69f16c, bd81894a -->

<a id="S10.13"></a>
## S10.13 Schreibgeschützter Stammbaum und Beispiel

- **Schreibgeschützter Stammbaum** (verfolgter Stammbaum, gesperrter Stammbaum, Vorschau): das Fenster **Häuser**
  lässt sich öffnen (die einzige Zeile in der Gruppe der Stammbaum-Einstellungen), und Häuser, Seiten und Karten
  lassen sich ansehen. Es fehlen: **Mit anderem Haus zusammenführen…**, **Es ist ein anderes Haus…**, der Hausname,
  **In Ausgaben zeigen**, **Bestätigen** / **Nicht dasselbe Haus**, **Punkt verschieben**, **Lage bestätigen** und
  **Material anhängen…** unter einem unbekannten Aussehen. Aktionen der Forschung (Anfordern, **Mit Agent
  besprechen**, **Material anhängen…**) bleiben, wie die Forschung sie anbietet.
- **Beispiel aus dem Web** ([S9.1.3](S9-trying-the-sample.md#S9.1.3)): Aktionen zu Häusern sind ausgeblendet.
- **Beispielforschung `strom demo`** ([S9.4](S9-trying-the-sample.md#S9.4)): ohne Anfordern eines Hauses, Übernahme
  einer Recherche, Gespräch über ein Haus und Erzählung über das Haus; Häuser, Hausseiten und Einstellungen lassen sich ansehen.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:src/data.ts 2549 housesReadOnly (isReadOnly || isTreeLocked) · src/ui/tree-actions.ts housesRows (read-only: jediný řádek skupiny, 1127) · src/research-link.ts SHOWCASE_ALLOWS house: 'hide' · research:src/core/live.ts forDemo (bez house.request, house.import, house.chat, house.story – AGENT_FEATURES; house, house.material, house.confirm, house.auto, house.look zůstávají) · nálezy N5 (Probrat s agentem ve stromu jen ke čtení), N6 (řádek Historie domů se nejspíš nabídne i u strom demo, neověřeno) -->

<a id="S10.14"></a>
## S10.14 Die Erzählung über das Haus

Die Erzählung über das Haus ist ein zusammenhängender Text für die Familie: Besitzer und Familien im Haus über
Generationen, was mit dem Haus geschah, die Nummern im Lauf der Zeit und wo das Haus stand, sein Aussehen und wovon der
Ort lebte. Der Agent der Forschung schreibt sie nur aus dem, was die Forschung über das Haus und seinen Ort
herausgefunden hat; er sucht nichts neu. Wie die Erzählung einer Person ([A7.8](A7-book-pages-and-export.md#A7.8)) ist
sie keine Quelle: sie erzählt nur nach, was die Forschung belegt hat.

- **Prüft der Code:**
  - die Erzählung hält fest, worauf sie sich stützt: Einträge des Hauses (Nummern, Ereignisse, Besitzer, Bewohner) und
    Angaben der Personen des Stammbaums im Haus;
  - sie ist ein Entwurf, bis ein Mensch sie freigibt; eine freigegebene Erzählung ist gesperrt und wird nie
    überschrieben. Eine neue Fassung entsteht daneben, und der freigegebene Text gilt, bis ein Mensch entscheidet
    ([R6.3.2](R6-awaiting-action.md#R6.3.2));
  - freigeben oder eine neue Fassung verwerfen darf nur ein Mensch ([R6.6](R6-awaiting-action.md#R6.6)).
- **Nur Methodik:**
  - was die Forschung nur mit mittlerer Sicherheit, als Vermutung oder als Anhaltspunkt kennt, sagt der Text als
    unsicher („wohl“, „nach einem noch nicht geprüften Register“); eine Nummer, die nicht dasselbe Haus ist, lässt er
    aus; was nicht gefunden wurde, sagt er;
  - Personen der letzten hundert Jahre nur mit Namen und Rolle im Haus (ohne Krankheit, Gericht, Scheidung). Was von
    Lebenden gezeigt oder geteilt wird, entscheidet die App ([S10.14.2](#S10.14.2));
  - das Leben einer Person gehört in ihre Erzählung; in der Erzählung über das Haus hat eine Person einen Satz mit den
    Jahren im Haus.
- **Hausseite**, Abschnitt **Erzählung** gleich nach **Auf einen Blick**:
  - der freigegebene Text mit Überschrift und Quellen;
  - ein Entwurf mit dem Etikett „Entwurf, wartet auf Freigabe“ und der Schaltfläche **In der Forschung freigeben**
    (Link ins Terminal);
  - eine neue Fassung neben der freigegebenen: „Eine neue Fassung der Erzählung (Tag) wartet auf Freigabe; die Seite
    zeigt den freigegebenen Text.“ mit **Vergleichen**;
  - solange sie geschrieben wird, der Stand der Aufgabe: „Die Erzählung über das Haus steht in der Warteschlange der
    Forschung.“, „Die Erzählung über das Haus wird gerade geschrieben.“, „Die Aufgabe der Erzählung ist in der Forschung
    zurückgestellt.“, „Die Aufgabe der Erzählung wartet in der Forschung auf eine Antwort.“
- **Wartet auf Bearbeitung:** nur eine neue Fassung neben der freigegebenen: in der App „Die Erzählung über Haus
  <Nummer> wartet auf Freigabe“ mit dem Link **Haus <Nummer> ›** auf den Abschnitt **Erzählung**, im Terminal „Eine
  neue Fassung der Erzählung über das Haus <Haus> – die freigegebene bleibt bis zur Entscheidung“. Der erste Entwurf
  steht dort nicht: er wird auf der Hausseite freigegeben, oder mit `strom story approve A…`.
- Die **Erzählung einer Person**, die im Haus lebte, hat unter dem Text den Link **Haus <Nummer> ›** auf die Erzählung
  des Hauses, nur wenn das Haus eine freigegebene Erzählung hat; der Text des Hauses wird nicht wiederholt.
- **Grenzen:** die App nimmt die Erzählung über das Haus nur über die Brücke der Forschung (GEDCOM trägt sie nicht);
  ohne Verbindung zur Forschung gibt es weder den Abschnitt noch den Link.
- **Bedienung:** App: Hausseite → **Erzählung**, **In der Forschung freigeben**, **Vergleichen**; Terminal:
  `strom story show A…`, `strom story approve A…`, `strom story discard A…`, Menü **Was wartet**.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: research:100aee43 src/core/housestory.ts (House.story jako Story osoby; facts n…, e…, h…, r…, E…; draft vedle final), src/core/storykeep.ts, src/commands/story.ts (approve|discard A…, person only), src/core/waiting.ts (kind story s house jen pro novou verzi; APP_SHOWS_HOUSE_STORY), assets/method/narrate.md „for house-story“ · cs.json ui.waiting.story.house · app:3473602e src/house-page.ts storyHtml (sec.story za sum; storyDraft, storyNew, storyTask), src/ui/house-page-ui.ts (research.approveStory, story.compare, story?house=&do=final|keep), src/ui/research-overview-ui.ts houses.storyWaiting · app:3080a121 src/person-page.ts storyHousesHtml (houseLink) · zadání aplikace ↔ výzkum ZADANI_VYZKUM_145-domy.md „T4 vyprávění o domě“, „Odpověď stromu k T4“ (první koncept bez položky Co čeká – záměr) -->

<a id="S10.14.1"></a>
### S10.14.1 Wann die Erzählung entsteht: von selbst und auf Anfrage

- **Von selbst:** bei eingeschalteten Erzählungen (Einstellung `stories`, standardmäßig an), nach dem letzten Schritt
  der Forschung zum Haus (Forschung zum Haus, gegebenenfalls sein Aussehen, [S10.7](#S10.7)), wenn das Haus genug sagt:
  **2 Generationen des Stammbaums** im Haus (Elternteil und Kind) oder **3 Besitzer und Bewohner mit Quellen**. Eine
  weitere Fassung nur dann, wenn das Haus seit der letzten Fassung mindestens **2 neue Angaben** gebracht hat.
- **Auf Anfrage:** ⋯ auf der Hausseite oder im Fenster **Häuser** → **Erzählung über das Haus schreiben** (wenn es
  schon eine Erzählung gibt, **Neue Fassung der Erzählung schreiben**); im Terminal `strom house story <Haus>` (fragt,
  `--yes` ohne Frage). Die Aufgabe kommt an die Spitze der Warteschlange der Forschung, und die nächste Sitzung
  `strom run` nimmt sie; der Agent wird dadurch nicht gestartet. Das gilt unabhängig von der Schwelle und von der
  Einstellung `stories`. Eine schon vorhandene Aufgabe wird nur verschoben: „Die Aufgabe gab es schon; sie steht jetzt
  oben in der Warteschlange der Forschung.“
- **Grenzen:**
  - nur ein Haus, zu dem die Forschung schon etwas eingetragen hat; sonst „In der Forschung steht noch nichts über
    dieses Haus; die Erzählung entsteht aus seiner Erforschung.“ (zuerst die Geschichte des Hauses, [S10.4](#S10.4));
  - nur eine Forschung mit eigenem Agenten: im Strom-Archiv, in einer Forschung, die auf einen Agenten wartet, und in
    `strom demo` ([S10.13](#S10.13)) wird sie nicht angeboten;
  - die Aufgabe der Erzählung geht wie die übrigen Erzählungen durch die Warteschlange
    ([R2.2.2](R2-lines-and-queue.md#R2.2.2)); sie ändert den Stand des Hauses nicht, und eine ausgeschaltete
    Hausgeschichte ([S10.5.1](#S10.5.1)) stellt sie nicht zurück;
  - eine Aufgabe, die ein Mensch verworfen hat, entsteht nicht von selbst wieder (auch nicht für eine neue Fassung).
- **Bedienung:** App: ⋯ der Hausseite oder des Fensters **Häuser**; Terminal: `strom house story <Haus>`,
  `strom config set stories no` (schaltet die Erzählung von selbst aus).
- **Gilt seit:** Forschung 1.38.0, App 3.33.0

<!-- zdroj: research:100aee43 src/core/housestory.ts HOUSE_STORY_GENERATIONS 2, HOUSE_STORY_PEOPLE 3, houseStoryReach, houseStoryDue (STORY_NEW_FACTS 2 ze src/core/stories.ts; dropped od posledního textu → nic), raiseHouseStories (stories on, ne actsAsArchive, row.state done), askHouseStory (queueAt next, parked → open, house.story.none, house.archive), createStoryTask level narrate · src/commands/house.ts house story (--yes, NeedsInputError) · src/core/live.ts AGENT_FEATURES house.story, POST /houses/story · src/core/config.ts stories (yes výchozí) · strom help house story · app:3473602e strings.ts houses.writeStory, writeStoryAgain, storyAsked, storyMoved, errStoryNone -->

<a id="S10.14.2"></a>
### S10.14.2 Die Erzählung in Ausgaben und der Schutz von Personen

- Das Familienbuch (Teil **Häuser**), die gespeicherte Hausseite und die Familienseiten zeigen nur den freigegebenen
  Text; einen Entwurf nie, bei einer neuen Fassung neben der freigegebenen weiter die freigegebene. Im Buch steht die
  Erzählung vor den Abschnitten des Hauses, und ihre Quellen sind unter den nummerierten Anmerkungen des Kapitels.
- Die Ausgabe lässt die Erzählung **ganz** aus (der Text wird nicht umgeschrieben), wenn sie einen Lebenden, eine
  Person der letzten rund 100 Jahre oder eine Person der Forschung ohne Eintrag über den Tod nennt, die der Stammbaum
  nicht kennt, oder wenn sie auf einem Eintrag des Hauses beruht, den die Ausgabe ausblendet ([S10.3.2](#S10.3.2)).
- Der Link von der Erzählung einer Person auf das Haus steht im Buch und in den Familienseiten nur, wenn die Ausgabe
  die Erzählung des Hauses zeigt.
- **Bedienung:** App: Export **Familienbuch** → Teil **Häuser**; Hausseite → **HTML speichern**; Familienseiten →
  **Häuser**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:3473602e src/house-privacy.ts houseStoryForOutput (people: žijící, recent, bez úmrtí a mimo strom; facts na skryté položce → null) · app:d7f65e13 src/book-houses.ts (vyprávění před oddíly, prameny v poznámkách kapitoly, draft nikdy) · app:3080a121 src/family-pages-html.ts setStoryHouses · research:src/core/housestory.ts houseStoryView people {id, died} -->
