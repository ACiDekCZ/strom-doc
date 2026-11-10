<a id="A6"></a>
# A6 Ansichten und Auswahl der Personen

Wie die Strom-App auswählt, welche Personen sie zeigt, und wie die einzelnen Ansichten sie zeigen. Beschrieben wird
die App 3.21.2. Änderungen aus einer neueren Version tragen deren Nummer.

Eine Ansicht ist eine andere Lesart **derselben Auswahl der Personen**. Die Auswahl bestimmen die zentrale Person
(die angeklickte) und die Tiefe **Vorfahren** und **Nachkommen**. Familie, Nachkommen, Zeitleiste und Karte zeigen
dasselbe Umfeld der zentralen Person. Der Fächer berechnet Vorfahren und Nachkommen selbst nach der Zahl der
Generationen ([A6.4](#A6.4)). Die Tabelle zeigt den ganzen Stammbaum ([A6.7](#A6.7)).

| Ansicht (cs) | en | de | pl |
|---|---|---|---|
| **Rodina** | Family | Familie | Rodzina |
| **Potomci** | Descendants | Nachkommen | Potomkowie |
| **Časová osa** | Timeline | Zeitleiste | Oś czasu |
| **Vějíř** | Fan | Fächer | Wachlarz |
| **Mapa** | Map | Karte | Mapa |
| **Tabulka** | Table | Tabelle | Tabela |

<!-- zdroj: app:src/types.ts:1237 ViewMode · strings.ts viewModeSwitch.* · Tabulka od aplikace 3.27.0 (viewModeSwitch.table) -->

<a id="A6.1"></a>
## A6.1 Umfeld der zentralen Person in der Ansicht Familie

Die Ansicht Familie zeigt die zentrale Person in ihrer Familie, nicht den ganzen Stammbaum.

- Zur Auswahl gehören:
  1. die zentrale Person und alle ihre Partner;
  2. ihre Nachkommen bis zur Tiefe **Nachkommen**, mit Partnern;
  3. die direkten Vorfahren über beide Eltern bis zur Tiefe **Vorfahren**;
  4. Geschwister, auch Halbgeschwister (ihr anderer Elternteil kommt nicht hinzu), mit Partnern und Nachkommen bis
     zur Tiefe Nachkommen;
  5. Tanten und Onkel (Geschwister der Eltern) mit Partnern;
  6. Cousins und Cousinen, also Kinder der Tanten und Onkel, die in deren Partnerschaft erfasst sind, mit
     Nachkommen bis zur Tiefe Nachkommen.
- **Grenzen:** Vorfahren eines Partners der zentralen Person kommen nie in die Auswahl. Wer nicht zum Umfeld gehört,
  bleibt im Stammbaum, die Ansicht zeigt ihn nur nicht; eine neue zentrale Person zeigt ihn.
- **Tiefe:** nach der Wahl einer neuen zentralen Person stehen Vorfahren und Nachkommen auf der größten Tiefe, die der
  Stammbaum bei dieser Person hat. Das Angebot reicht von 1 bis zu dieser größten Tiefe. Kinder eines Partners aus
  einer anderen Partnerschaft fügen eine Generation nach unten hinzu.
- **Bedienung:** Klick auf die Personenkarte; Auswahl **Vorfahren** und **Nachkommen** in der Leiste der Ansicht.
- **Gilt seit:** App 1.0.0

<!-- zdroj: app:src/layout/pipeline/1-select-subgraph.ts selectSubgraph · src/layout/pipeline/index.ts:962 includeSpouseAncestors: false · src/renderer.ts:719 computeTreeLayout, setFocus (maxGenerations) · src/focus-depth.ts maxAncestorDepth, maxDescendantDepth · strings.ts focus.ancestorsLabel, focus.descendantsLabel -->

<a id="A6.1.1"></a>
### A6.1.1 Standardperson und -ansicht

Womit sich der Stammbaum öffnet, bestimmt die Stammbaum-Einstellung **Standardperson und -ansicht**.

| Auswahl | Möglichkeiten |
|---|---|
| Person | **Zuletzt fokussiert** · **Bestimmte Person:** (ausgewählt) |
| Ansicht | **Familie** · **Zuletzt verwendet** (auf diesem Gerät) |

- **Grenzen:** ohne Einstellung öffnet sich der Stammbaum bei der ersten Person des Stammbaums. Ein Neuladen der Seite
  behält Stammbaum, Ansicht und zentrale Person.
- **Bedienung:** Verwaltung der Stammbäume, beim Stammbaum **Standardperson und -ansicht**.
- **Gilt seit:** Standardperson App 1.0.0; Wahl der Ansicht und Neuladen der Seite App 3.21.0

<!-- zdroj: app:src/renderer.ts:1178 findDefaultFocusPerson, getStartupFocus · strings.ts treeManager.defaultPersonViewTitle, focus.defaultPersonLastFocused, focus.defaultPersonSpecific, focus.defaultViewFamily, focus.defaultViewLast · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.2"></a>
## A6.2 Ansicht Nachkommen

Die Ansicht Nachkommen zeigt nur die zentrale Person und ihre Nachkommen bis zur Tiefe Nachkommen: ohne Vorfahren,
Tanten, Onkel und Cousins.

- **Nur Blutsverwandte** (Standard): die leiblichen Nachkommen der zentralen Person.
- **Ganze Familien**: dazu weitere Partnerschaften der Partner und ihre Stiefkinder, abgeschwächt.
- **Bedienung:** Schalter in der Leiste der Ansicht; die Standardwahl hält die Einstellung **Nachkommenansicht**.
- **Gilt seit:** Ansicht App 1.4.0; Ganze Familien App 1.9.2

<!-- zdroj: app:src/layout/pipeline/index.ts includeAuntsUncles: !descendantsOnly, expandLineageOnly: descendantsOnly && !isDescendantsFullFamilies() · strings.ts viewModeSwitch.bloodOnly, viewModeSwitch.fullFamilies, viewModeSwitch.settingLabel · settings descendantsFullFamilies (výchozí false) -->

<a id="A6.3"></a>
## A6.3 Zeitleiste

Die Zeitleiste zeigt die Personen der Ansicht als Lebensbalken auf einer Jahresachse.

- Eine Zeile bekommt nur eine Person mit Geburtsjahr. Die übrigen zählt die Ansicht und schreibt „N Personen ohne
  Geburtsjahr nicht angezeigt“. Platzhalterpersonen (leerer Platz für einen unbekannten Elternteil) werden
  ausgelassen.
- Reihenfolge der Zeilen: Geburtsjahr, dann Name ohne Titel.
- Der Balken einer lebenden Person reicht bis heute. Eine verstorbene Person ohne Sterbedatum hat einen Balken bis
  zum letzten bekannten Ereignis und ein offenes Ende.
- Das Jahr der Hochzeit stammt aus dem Anfangsdatum der Partnerschaft. Die Achse ist auf Jahrzehnte gerundet.
- Unter der Jahresachse läuft die Zeile der Geschichte der zentralen Person (Ereignisse der Zeit und der Orte ihres
  Lebens, Symbole der Arten). Ohne Forschung oder ohne solche Ereignisse gibt es die Zeile nicht.
- **Gilt seit:** Zeitleiste App 1.5.0; Zeile der Geschichte App 3.19.0

<!-- zdroj: app:src/timeline.ts computeTimelineModel, :59 TimelineHistory · strings.ts timeline.omitted · CHANGELOG.cs.md 3.19.0 -->

<a id="A6.4"></a>
## A6.4 Fächer

Der Fächer zeigt die Vorfahren der zentralen Person in Kreissegmenten, Generation für Generation.

- **Form:** **Halbkreis** · **Vollkreis** · **Beidseitig** (Vorfahren und Nachkommen).
- **Generationen** der Vorfahren 3–10, Standard 5. In der Form Beidseitig **Nachkommen** 1–5, Standard 3.
- Nummerierung der Vorfahren: 1 ist die zentrale Person, der Vater der Person n hat die Nummer 2n, die Mutter 2n+1.
  Die Linie des Vaters ist links. Nummern an den Segmenten schaltet die Einstellung **Fächerdiagramm**
  „Kekulé-(Ahnen-)Nummern anzeigen“ ein (Standard aus).
- Eltern sind die ersten zwei erfassten Eltern der Person. Eine nicht biologische Beziehung (Adoption, Stief-,
  Pflegeverhältnis) ist am Segment gekennzeichnet.
- Ein Vorfahr, der im Fächer ein zweites Mal vorkommt, wird erneut gezeichnet, aber nicht weiter entfaltet; Legende
  **↻ wiederholt (Ahnenschwund)**. Die Auswahl **Erstes Vorkommen zeigen** springt an seine erste Stelle.
- Nachkommen (Form Beidseitig): Partnerschaften in der Reihenfolge der Hochzeiten (Datum der Hochzeit, dann
  Reihenfolge in den Daten), Kinder nach Geburt. Ein unbekannter Partner sammelt die Kinder ohne zweiten Elternteil.
  Eine Partnerschaft ohne Kinder ist nur bei der zentralen Person zu sehen.
- **Farben:** **Geschlecht** · **Linien** (vier Linien der Großeltern: Vater des Vaters, Mutter des Vaters, Vater
  der Mutter, Mutter der Mutter) · **Stammlinien** ([A4](A4-surnames-and-families.md)).
- **Ursprüngliche Person** bringt den Fächer zurück zu der Person, von der aus begonnen wurde.
- **Gilt seit:** Fächer App 1.8.0; neuer Fächer mit Formen, Farben und Ahnenschwund App 3.20.0
- **Ab App 3.27.0:** eine Partnerschaft ohne Datum der Hochzeit wird nach dem spätesten möglichen Datum der
  Hochzeit geordnet: dem früheren aus dem Ende der Partnerschaft (Scheidung) und der Geburt des ersten Kindes der
  Partnerschaft. Eine Hochzeit „vor 1982“ steht vor einer Hochzeit im Jahr 1982. Eine Partnerschaft ohne diese Daten
  kommt nach den anderen. Dieselbe Reihenfolge haben die Partner neben der Person und die Marken der Ehefolge („1. ∞“)
  auf den Karten.

<!-- zdroj: app:src/fan-chart.ts FAN_MIN_GENERATIONS, FAN_MAX_GENERATIONS, FAN_DEFAULT_GENERATIONS, parentSlots, repeatOf · strings.ts fan.shapeHalf, fan.shapeFull, fan.shapeTwo, fan.colorGender, fan.colorLine, fan.colorRod, fan.legendRepeats, fan.originPerson, fan.showFirst, fanChart.kekuleHint · settings fanKekule (výchozí false) · spec 029 · CHANGELOG.cs.md 3.20.0 · 3.27.0: app:ad1ca16c src/marriage-order.ts marriageKey (BOUND 0.5, qualifier „<“; bez sňatku min(endDate, narození dětí)), marriageDates, compareMarriages, marriagesInOrder (partneři vedle osoby, značka „1. ∞“) · src/fan-chart.ts familiesOf · CHANGELOG.cs.md 3.27.0 · dirigent:prace/1109-app-tester-vlna1 (T50, T13) -->

<a id="A6.5"></a>
## A6.5 Karte

Die Karte zeigt die Orte der Ereignisse der Personen.

- **Umfang:** **Diese Ansicht** (Standard, Personen der Ansicht) · **Ganzer Stammbaum**.
- **Arten:** **Geburten** · **Sterbefälle** · **Eheschließungen** · **Weitere Ereignisse**. Standardmäßig sind alle
  eingeschaltet; die Auswahl wird auf dem Gerät gespeichert.
  - Die Taufe zählt zur Geburt, Beerdigung und Einäscherung zum Tod.
  - Verlobung, Aufgebot, Heiratserlaubnis und Ehevertrag zählen zur Eheschließung. Andere Ereignisse des Paares sind
    Weitere Ereignisse.
- Der Ort der Hochzeit wird gezeigt, wenn mindestens einer der Partner in der Ansicht ist.
- Ein Ort wird in der häufigsten Schreibung geschrieben. Eine Gemeinde ist ein Punkt, auch mit Hausnummern; ein Ort
  mit eigenen genauen Koordinaten bleibt ein eigener Punkt.
- **Gilt seit:** Karte App 1.10.0; Arten der Ereignisse und Punkte der Gemeinden App 3.21.0

<!-- zdroj: app:src/places.ts collectPlaces, groupTownPoints · src/ui/map-ui.ts (localStorage strom.map.kinds) · strings.ts map.scopeView, map.scopeTree, map.kinds · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.5.1"></a>
### A6.5.1 Woher die Karte die Lage eines Ortes nimmt

Im eigenen Stammbaum (ohne Forschung) schlägt die App die Lage der Orte selbst nach, im Dienst OpenStreetMap
(Nominatim). Sie sendet nur den Namen des Ortes, wie er im Stammbaum steht, und nur mit Zustimmung. In einem
Stammbaum aus der Forschung bestimmt die Forschung die Orte ([R4](R4-places.md)).

- **Grenzen:**
  - vor dem ersten Nachschlagen fragt die App (**Koordinaten online nachschlagen?**). Hinaus gehen nur Ortsnamen,
    keine Namen von Personen, keine Daten und Beziehungen. Höchstens etwa eine Anfrage pro Sekunde;
  - die Koordinaten werden im Stammbaum gespeichert: jeder Ort wird einmal nachgeschlagen, und die Karte funktioniert
    dann auch ohne Verbindung;
  - das automatische Nachschlagen nimmt das **erste Ergebnis** des Dienstes für den geschriebenen Namen. Bis App
    3.23.0 unterschied es dabei gleichnamige Gemeinden nicht: ein Ort konnte so in eine gleichnamige Gemeinde
    anderswo fallen. Eine Lage, die nicht in den Stammbaum passt, markiert **Prüfen** ([R4.4.1](R4-places.md#R4.4.1));
  - nur ein Ort mit Hausnummer, den der Dienst nicht gefunden hat, wird nach der Gemeinde nachgeschlagen. Von den
    Gemeinden dieses Namens wird die gewählt, die den übrigen Orten des Stammbaums am nächsten liegt („Mehrere Orte
    tragen diesen Namen; gewählt wurde der, der den übrigen Orten des Stammbaums am nächsten liegt.“); beim Ort steht
    **Lage nach dem Ort …**;
  - **ab App 3.24.0** wird die nächste Gemeinde bei jedem Ort gewählt: heißen zwei oder mehr Gemeinden genau wie der
    geschriebene Ort (ohne Rücksicht auf Groß- und Kleinschreibung und diakritische Zeichen), wird die genommen, die
    der Mitte des Stammbaums am nächsten liegt, nicht das erste Ergebnis. Die Mitte ist der Median der Lagen, die von
    Hand eingetragen oder mit **Beibehalten** bestätigt sind, wenn es mindestens 3 sind; sonst der Median aller Lagen
    des Stammbaums und der Orte, die das Nachschlagen ohne Zweifel gefunden hat. Ein Ort mit weiterer Angabe („Lhota u
    Kolína“, „Lhota 16“), eine einzige Gemeinde oder ein Stammbaum ohne Lagen bekommt das erste Ergebnis wie früher.
    Es bleibt bei einer Anfrage je Ort;
  - die Prüfung des Ortes sagt, wie viele Gemeinden dieses Namens die Karte gefunden hat („Die Karte fand 3 Orte
    dieses Namens und nahm den, der den übrigen Orten des Stammbaums am nächsten liegt.“); ab App 3.24.0, früher
    immer „zwei“;
  - eine Lage, die schon im Stammbaum ist, wird nicht verschoben: das Nachschlagen sucht nur Orte ohne Lage. Auch das
    Zusammenführen mit einem anderen Stammbaum oder einer GEDCOM-Datei überschreibt eine von Hand eingetragene oder
    mit **Beibehalten** bestätigte Lage nicht, es ergänzt nur fehlende. Eine falsche ältere Lage lässt sich nur von
    Hand verschieben;
  - was nicht gefunden wird, bleibt ohne Lage. Die App rät nichts: „Schreibweise prüfen oder das Land hinzufügen“.
- **Bedienung:** App: **Einstellungen → Orte online nachschlagen**; im Fenster der Orte **Falsche Stelle? Diesen Ort
  korrigieren**, **Diesen Ort unter einem anderen Namen suchen** (nur die Lage wird ergänzt, der Eintrag im Stammbaum
  ändert sich nicht), **Auch für die übrigen Hausnummern in … verwenden**, **Verwaiste Orte bereinigen (n)**.
- **Warum:** das Nachschlagen von Orten ist der einzige Teil der App, der etwas nach außen sendet; darum nur mit
  Zustimmung, nur Namen und jeden Ort einmal (Kommentar im Code). Das Limit von einer Anfrage pro Sekunde ist eine
  Bedingung des Dienstes.
- **Gilt seit:** App 1.10.0; **Falsche Stelle? Diesen Ort korrigieren** 1.10.1; **Verwaiste Orte bereinigen** 2.1.0;
  Lage nach dem Ort 3.21.0; die nächste gleichnamige Gemeinde bei jedem Ort und die Zahl der Gemeinden in der Prüfung
  3.24.0

<!-- zdroj: app:src/geocode.ts hlavička, REQUEST_INTERVAL_MS=1100, geocodePlace (limit 1, parseGeocodeResponse první výsledek), geocodeTown/pickTownHit nearestTo (od v3.21.0), geocodePlaces townFallback · app:src/strings.ts map.consentTitle, consentBody, settingLabel, wrongSpot (v1.10.1), searchLabel, attachOnly, useForOthers, cleanOrphans (v2.1.0), nearestTown, byTown, doneWithMisses · FB podnět 2026-11-04 (stejnojmenná obec) · od 3.24.0: geocode.ts treeCenter (medián, PERSONS_CENTER_MIN=3), sameNamedTowns, pickPlaceHit (townChoices), buildGeocodeUrl limit · place-check.ts multi count · strings.ts checkMulti(n) · merge-executor test (ruční poloha zůstane) · commit 046967d -->

<a id="A6.5.2"></a>
### A6.5.2 Orte ohne Karte in der Forschung suchen

Bei einem Stammbaum mit Forschung bietet die Statusleiste der Karte die Orte ohne Lage zum Suchen in der Forschung an
([R4.4](R4-places.md#R4.4)). Die Schaltfläche öffnet das Fenster **Orte** mit einer Vorschau; in die Warteschlange der
Forschung kommen die Orte erst nach **Vormerken**.

- **Grenzen:**
  - vor der Suche der Karte steht in der Leiste neben der Kartensuche **In der Forschung**. Nach der Suche, wenn die
    Karte manche Orte nicht gefunden hat, zeigt die Leiste „N Orte auf der Karte · K nicht gefunden“ und **In der
    Forschung suchen (K)**, gegebenenfalls „N zu bestätigen ›“ (öffnet **Offen** im Forschungsbereich);
  - die Schaltfläche gibt es nur bei einem Stammbaum mit Forschung und nur, wenn es etwas zu suchen gibt: einen Ort
    ohne Lage oder nicht bestimmt, der noch nicht in der Warteschlange ist, nicht bearbeitet wird und nicht auf eine
    Antwort wartet;
  - das Fenster **Orte** zeigt die Vorschau „N Orte ohne Karte in der Forschung suchen“. Vor **N Orte vormerken** wird
    nichts vorgemerkt, und kein Ort wird doppelt vorgemerkt;
  - läuft die Forschung auf einem anderen Computer, oder auf dem Telefon, sagt die App statt des Fensters, wo die
    Suche geht: „Suchen und prüfen geht in der Forschung auf dem Computer, wo sie läuft. Der Stand der Orte kommt mit
    dem Stammbaum hierher.“, auf dem Telefon „Suchen und prüfen geht am Computer mit der Forschung. Fragen zu Orten
    lassen sich auch hier beantworten, in Offen.“ Ältere Forschung: „Diese Version der Forschung sucht noch keine
    Orte.“;
  - beim Verfolgen der Forschung auf der Karte ([S4.1.3](S4-research-from-the-app.md#S4.1.3)) bietet die Zeile „… –
    ohne Position auf der Karte“ **In der Forschung suchen**: sie merkt diesen einen Ort sofort vor, ohne Vorschau;
    das Vormerken lässt sich in der Meldung zurücknehmen.
- **Bedienung:** App: Karte → Statusleiste → **In der Forschung**, nach der Kartensuche **In der Forschung suchen
  (K)** → Fenster **Orte** → **N Orte vormerken**.
- **Gilt seit:** App 3.25.0

<!-- zdroj: app:src/ui/map-ui.ts (stavový pruh, lookResearch, lookable), src/ui/place-actions.ts, src/ui/places-research-ui.ts (bulkLook, bulkLookHead, bulkLookGo, nic dvakrát), src/ui/map-follow-ui.ts (noCoords + places.research.look, Undo) · strings.ts map.onMap.notFound, lookResearch, lookResearchShort, lookResearchTitle, confirm; places.dialog.elsewhere, phoneLine, oldResearch · CHANGELOG.cs.md 3.25.0 · commit 2246ca28 · spec 058 -->

<a id="A6.6"></a>
## A6.6 Stammlinie in der Ansicht

Eine Ansicht kann eine Stammlinie hervorheben ([A4](A4-surnames-and-families.md)): ihre Mitglieder voll, Ehefrauen
und Ehemänner, die durch Heirat in die Stammlinie kamen, schwächer, die übrigen gedämpft. Das gilt in den Ansichten
Familie, Nachkommen und Fächer.

- Die Auswahl wird für jeden Stammbaum auf dem Gerät gespeichert. Eine Stammlinie, die es im Stammbaum nicht mehr
  gibt, wird still aufgehoben.
- Wenn in der Ansicht kein Mitglied der Stammlinie gezeichnet ist:
  - Familie und Fächer verschieben die zentrale Person auf das nächste Mitglied der Stammlinie (über Eltern, Kinder
    und Partner; bei Gleichstand auf das ältere), und wenn die Person mit ihm nicht verbunden ist, auf den
    Stammvater;
  - Nachkommen verschiebt die zentrale Person immer auf den Stammvater;
  - die Leiste bietet **↩ Zurück** an.
- **Grenzen:** das Wiederherstellen der Auswahl aus dem Speicher verschiebt die zentrale Person nicht.
- **Bedienung:** **Stammlinien** in der Leiste; im Angebot der Person **Nur Stammlinie …** (die Herkunftslinie der
  Person steht zuerst); Ende über × am Etikett oder **Ganzen Stammbaum zeigen**.
- **Gilt seit:** App 3.21.0

<!-- zdroj: app:src/ui/rod-view.ts · src/rod-focus.ts (BFS přes rodiče, děti, partnery) · strings.ts rodView.only, rodView.whole, rodView.moved · spec 039 · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.7"></a>
## A6.7 Tabelle

Die Tabelle zeigt den ganzen Stammbaum in Zeilen: jede Person, jede Verbindung, jedes Ereignis oder jede Quelle, mit
den Angaben in Spalten. Sie dient dazu, Lücken, Widersprüche und Befunde der Prüfung quer durch den Stammbaum zu
finden. Sie hängt nicht von der Tiefe **Vorfahren** und **Nachkommen** ab. Die Ansicht Tabelle beruht auf einer
Tabelle von Ondřej Chrpa.

- **Zeilen:** Umschalter **Zeilen**: **Personen** · **Verbindungen** · **Ereignisse** · **Quellen**. Jede Zeilenart
  hat eigene Spalten, Filter und Sortierung.
  - **Personen:** eine Zeile je Person des Stammbaums; Platzhalterpersonen (leerer Platz für einen unbekannten
    Elternteil) werden ausgelassen.
  - **Verbindungen:** eine Zeile je Verbindung, die mindestens einen echten Partner hat. **Partner 1** ist der aus
    dem Paar, der mit der Hauptperson blutsverwandt ist; sonst der erste Partner der Verbindung.
  - **Ereignisse:** eine Zeile je Ereignis des Stammbaums ([A6.7.10](#A6.7.10)).
  - **Quellen:** eine Zeile je Quelle des Stammbaums ([A6.7.11](#A6.7.11)).
- Die **Hauptperson** ist die zentrale Person des Stammbaums ([A6.1](#A6.1)). Nach ihr werden die Spalte **Beziehung
  zur Hauptperson** und der Chip **Blutsverwandte** berechnet: die Vorfahren der Hauptperson (auch sie selbst) und
  alle ihre Nachkommen. Partner, die durch Heirat in die Familie kamen, gehören nicht dazu.
- **Generation** 1 ist die älteste Generation des Stammbaums; ein Partner hat die Generation seines Partners.
- **Lebt** wird wie beim Schutz lebender Personen berechnet ([A7.1](A7-book-pages-and-export.md#A7.1)).
- Über der Tabelle stehen die Anzahl („42 von 120 Personen“) und die Sortierung („Sortierung: …“). Das Feld **Person
  suchen...** in der Leiste wählt in der Tabelle die Zeile der Person aus und rollt zu ihr; die zentrale Person ändert
  sich nicht.
- **Grenzen:**
  - die Hervorhebung einer Stammlinie ([A6.6](#A6.6)) wird in der Tabelle nicht verwendet; einen Stamm wählt der
    Chip **Stamm** ([A6.7.6](#A6.7.6));
  - einen schreibgeschützten Stammbaum (verfolgter Stammbaum, von einer neueren Version der App gespeicherter
    Stammbaum, gesperrter Stammbaum) zeigt die Tabelle nur an: „Nur lesen: Bearbeiten und „Kein Fehler“ gibt es hier
    nicht.“ Ansehen, Filter, Sortierung und CSV-Export funktionieren; eine Ansicht lässt sich weder speichern noch
    umbenennen noch löschen;
  - die Tabelle bewältigt einen Stammbaum mit 5 000 Personen (auch ihre Ereignisse und 2 000 Quellen).
- **Bedienung:** in der Leiste der Ansichten **Tabelle** (nach **Karte**); im schmalen Fenster und auf dem Telefon
  **Mehr → Ansicht → Tabelle**. Die Ansicht wird wie die anderen gespeichert ([A6.1.1](#A6.1.1)).
- **Gilt seit:** App 3.27.0

<!-- zdroj: app:src/ui/table-view/table-model.ts ROW_TYPES, buildTableModel (isPlaceholder ven, svazek aspoň s jedním skutečným partnerem), bloodOf (předci hlavní osoby a všichni jejich potomci), makeContext (homeId, isLivingPerson) · table-columns.ts unionPartners (pokrevní partner jako Partner 1), gen (assignGenerations + 1), kin (findRelationship, kinSelf) · src/ui/table-view/table-ui.ts tableReadOnly (isReadOnly: viewMode, isLocked, isNewerData) · src/data.ts:655 isReadOnly · src/ui/bottom-sheet.ts:443 (Více → Pohled: Vějíř, Mapa, Tabulka) · table-bar.ts countText, sortText · perf-budget test 5 000 osob · strings.ts viewModeSwitch.table, table.rows, rowType, rowTypeNote, countOf, sortedBy, readOnly, readOnlyShort · commity c34c47ff, 1b72e6d8 · spec 073 U2 · Události a Prameny (spec 073 U3 P2, K5.1–K5.4): commity 8de751c2, 63ed9def, 1a3a49f1, 3cf69ffa, strings.ts table.rows.events, rows.sources, perf-budget 5 000 osob (Události) a 2 000 pramenů · poděkování: Milan 10. 11. (dirigent:prace/1110-doc-tabulka, bod 4) · CHANGELOG.cs.md 3.27.0 · dirigent:prace/1110-app-tabulka-p1 -->

<a id="A6.7.1"></a>
### A6.7.1 Verbindungen in der Personentabelle

Eine Person mit zwei und mehr Verbindungen hat in der Personentabelle eine eigene Zeile und darunter eine Unterzeile
für jede Verbindung („Verbindung 2 von 3“). Die Zeile der Person hat in der Spalte **Partner** die Anzahl
(„3 Verbindungen“) und die übrigen Spalten der Verbindung leer.

- Die Verbindungen folgen nach dem Heiratsdatum; Verbindungen ohne Datum stehen am Ende in der Reihenfolge der
  Erfassung.
- **Zugeklappt:** die Zeile der Person zeigt die erste Verbindung und die Zahl der übrigen. Standard ist
  aufgeklappt; die vorgegebene Ansicht **Lücken** hat die Verbindungen zugeklappt.
- **Ein Filter in einer Spalte der Verbindung** wird bei jeder Verbindung einzeln beurteilt. Die Person bleibt, wenn
  mindestens eine Verbindung passt; die übrigen verschwinden unter der Zeile „2 außerhalb des Filters · zeigen“.
  Gezeigte sind bis zur nächsten Änderung des Filters abgeschwächt.
- **Die Sortierung nach einer Spalte der Verbindung** nimmt die erste Verbindung, die dem Filter entspricht.
- Eine Person mit einer Verbindung hat deren Angaben direkt in ihrer Zeile.
- **Bedienung:** **Verbindungen aufklappen** / **Verbindungen zuklappen** (auf dem Telefon im Menü **⋯**); die
  Tasten → und ← in der Spalte **Name**, * für alle Personen; das Zeilenmenü. Der Zustand wird mit der Ansicht
  gespeichert ([A6.7.7](#A6.7.7)).

<!-- zdroj: app:src/ui/table-view/table-subrows.ts defaultUnionCollapse (collapsed: false), isExpanded, setAllExpanded, passingUnions, personPassesUnions, sortUnionOf, buildLines · table-model.ts unionsByDate (datum sňatku, bez data na konci v pořadí zápisu) · table-views.ts BUILTIN_VIEWS gaps (unions collapsed) · strings.ts table.unionsN, unionKofN, hiddenUnions, expandAll, collapseAll · commity 8833da14, 8192621d -->

<a id="A6.7.2"></a>
### A6.7.2 Spalten

Die Spalten stehen in Gruppen. Welche sichtbar sind und in welcher Reihenfolge, ist Teil der Ansicht
([A6.7.7](#A6.7.7)).

| Zeilen | Gruppen der Spalten |
|---|---|
| **Personen** | **Person** · **Geburt und Taufe** · **Eltern** · **Verbindungen** · **Scheidung** · **Tod und Begräbnis** · **Ereignisse** · **Quellen** · **Verlässlichkeit und Forschung** · **Prüfungen** |
| **Verbindungen** | **Paar** · **Heirat** · **Scheidung** · **Kinder und Quellen** |

- **Name** (bei Verbindungen **Partner 1**) ist links fixiert und wird nach dem Nachnamen, dann nach dem Vornamen
  sortiert. **Nachname** ist der Ehename, sonst der Geburtsname; **Geburtsname** ist der erfasste Nachname.
- **Forschungs-ID** zeigt nur die Nummer der Person aus der Forschung (P…).
- **Ereignisse** (**Beruf**, **Wohnort**, **Konfession**, **Militärdienst**, **Auswanderung**, **Bildung**) zeigen
  jeden Wert einmal, den neuesten zuerst.
- Die Spalten **Verlässlichkeit …** und **Sicherheit aus der Forschung** haben nur in einem Stammbaum aus der
  Forschung einen Wert ([S7](S7-reliability-and-verification.md)).
- **Grenzen:** eine eingeklappte Gruppe ist ein schmaler Streifen; er zeigt die höchste Stufe eines Befunds in seinen
  Zellen. Auf dem Telefon ist der fixierte Name schmaler, und die Kopfzeile lässt sich nur lesen, nicht ändern.
- **Bedienung:**
  - Panel **Spalten** („12 von 58“): **Spalte suchen**, Gruppen mit dem Kästchen **alle**, Ziehen der Reihenfolge,
    **Abdeckungszeile**, **Standard wiederherstellen**, **Fertig**;
  - Menü im Spaltenkopf: **Aufsteigend sortieren**, **Absteigend sortieren**, **Zur Sortierung hinzufügen**
    (Umschalt + Klick), **Filter…**, **Links fixieren** / **Lösen**, **Nach links** / **Nach rechts**, **Spalte
    ausblenden**, **Gruppe … einklappen** / **Gruppe … ausklappen**; bei einer berechneten Spalte „Berechnet aus: …“;
  - Breite der Spalte durch Ziehen am Rand des Spaltenkopfs.

<!-- zdroj: app:src/ui/table-view/table-columns.ts PERSON_GROUPS, UNION_GROUPS, katalog sloupců (surname marriedSurname || lastName, birthSurname lastName, researchId /^P\d{1,7}$/, eventValues nejnovější první, sortKey jména), pinnedWidth 156 na telefonu · table-state.ts MIN_COLUMN_WIDTH, BAND_WIDTH, lockedColumn · table-checks.ts bandSeverity · table-colpanel.ts panelGroups · table-headmenu.ts headMenuItems · strings.ts table.group.*, col.*, columns, columnsCount, searchColumn, all, pinnedLabel, resetColumns, done, coverageRow, sortAsc, sortDesc, sortAdd, sortAddHint, filterColumn, pin, unpin, moveLeft, moveRight, hide, collapseGroup, expandGroup, computedFrom · commity 89602f35, 49b96d92, e4a35406 -->

<a id="A6.7.3"></a>
### A6.7.3 Berechnete und Ersatzwerte

Was im Stammbaum nicht erfasst ist, sich aber aus den Daten berechnen lässt, berechnet die Tabelle. Dabei schreibt
sie nichts in den Stammbaum.

| Wert | Wie er berechnet wird |
|---|---|
| Alter (bei der Geburt eines Kindes, bei der Heirat, beim Tod) | aus Daten mit Tag genau („67“); aus Jahr, Monat oder Zeitraum als Bereich („28–29“); aus einem Datum mit um, vor oder nach als Schätzung („≈ 67“) |
| Ersatzdatum und -ort | ohne Geburt die Taufe („get. 3.5.1850“), ohne Tod das Begräbnis („begr. …“); ein Alter daraus ist eine Schätzung (≈) |
| **Abweichung angegebenes Alter** | um wie viele Jahre das angegebene Alter außerhalb des Bereichs des Alters aus den Daten liegt („+3“, „−2“); ein Alter in Worten und ein Alter mit um, vor, nach wird nicht verglichen |
| **Dauer der Verbindung** | von der Heirat bis zur Scheidung, sonst bis zum ersten Tod aus dem Paar |
| **Geburtsrang**, **Zahl der Geschwister**, **Zahl der Kinder**, **Zahl der Verbindungen**, **Zahl der Quellen** | aus den Beziehungen und Quellen des Stammbaums |

- Daten haben das Wort der Genauigkeit vor sich (**um**, **vor**, **nach**). Ein unsicheres Datum ist gepunktet
  unterstrichen; ein Befund ist es nicht. Ein Datum wird nach seinem Anfang sortiert.
- **Grenzen:** ein Alter wird nicht berechnet, wenn das Ende vor dem Anfang liegt. Die Spalten des Todes haben bei
  einer lebenden Person **Trifft nicht zu** (bei **Vollständigkeit Sterbefall** „lebt“). **Alter des Vaters/der
  Mutter bei der Geburt** ohne erfassten Elternteil ist **Trifft nicht zu**.
- **Bedienung:** Hinweis an der Zelle („Taufe, Geburt unbekannt“, „Begräbnis, Tod unbekannt“); bei einer berechneten
  Spalte im Menü des Spaltenkopfs „Berechnet aus: …“; die Legende **Zeichen** ([A6.7.5](#A6.7.5)).

<!-- zdroj: app:src/ui/table-view/table-columns.ts ageCell (přesně / rozsah ageRangeBetween / ≈ approxAgeBetween; nic, když konec před začátkem), dateCell, qualifierWord, birthOrBaptism, deathOrBurial (náhrada, ≈), gapCell (recordedAgeGap), unionLength, naCell, parentsOf · src/dates.ts:448 ageRangeBetween, recordedAgeGap · table-model.ts dateNumber (začátek rozsahu) · strings.ts table.na, living, subst.*, qual.*, computedFrom, from.* · commit 8833da14 -->

<a id="A6.7.4"></a>
### A6.7.4 Vollständigkeit und Abdeckungszeile

Die Spalten **Vollständigkeit …** sagen, wie viele der beobachteten Felder ausgefüllt sind, in Prozent.

| Spalte | Gezählt aus |
|---|---|
| **Vollständigkeit Geburt** | Datum, Ort, Vater, Mutter, Quelle |
| **Vollständigkeit Verbindung** | Datum, Ort, Partner, Quelle zur Heirat |
| **Vollständigkeit Sterbefall** | Datum, Ort, Quelle (nicht bei einer lebenden Person) |
| **Vollständigkeit gesamt** | Geburt, jede Verbindung und Tod, gewichtet nach der Zahl der Felder |

- Ein Ersatzwert (Taufe, Begräbnis) füllt kein Feld aus. Der Hinweis an der Zelle nennt, was fehlt („fehlt:
  Geburtsort, Quelle zur Geburt“).
- Die **Abdeckungszeile** unter dem Spaltenkopf zeigt bei jeder Spalte, wie viel Prozent der Zeilen einen Wert haben
  („ausgefüllt 64 %“, Hinweis „77 von 120“). Sie zählt nur die Zeilen, die gerade zu sehen sind (nach Filter und
  Suche). Zellen **Trifft nicht zu** werden nicht gezählt; bei Spalten der Verbindung werden die Verbindungen
  gezählt, die dem Filter entsprechen. Unter 50 % ist die Zahl fett; ohne eine Zelle, die sie betreffen würde, steht
  „–“.
- **Bedienung:** **Abdeckungszeile** im Panel **Spalten** (auf dem Telefon in **⋯**); sie wird mit der Ansicht
  gespeichert.

<!-- zdroj: app:src/ui/table-view/table-columns.ts compCell, unionComp (pole a váhy, náhrada nevyplní) · table-coverage.ts cellFilled, columnCoverage, coverageCell, coverageLabel (LOW pod 50 %) · table-subrows.ts coverageUnionsOf · strings.ts table.compList.*, compField.*, missing, missingNone, compCounts, coverage, coverageOf · rozhodnutí Milan 10. 11. (spec 073, bod 5) · commit 8833da14 -->

<a id="A6.7.5"></a>
### A6.7.5 Befunde der Prüfung in den Zellen

Die Tabelle zeigt die Befunde der Datenqualität ([A5](A5-tree-check.md)) direkt bei der Angabe, die sie betreffen:
die Zelle ist hinterlegt und hat ein Zeichen der Stufe. Die Prüfung läuft über den ganzen Stammbaum im Hintergrund,
wenn die App frei ist.

| Stufe | Zeichen in der Legende |
|---|---|
| **Fehler** | „Die Angaben widersprechen sich.“ |
| **zu prüfen** | „Ein ungewöhnlicher Wert, der geprüft werden sollte.“ |
| **Spur** | „Eine Spur für die Forschung, kein Fehler.“ |
| **ungewöhnlich** (☆) | „Ein als „Kein Fehler“ markierter Befund.“ |

- Ein Befund kommt in die Zelle seiner Angabe: das Alter eines Elternteils bei der Geburt in **Alter des Vaters/der
  Mutter bei der Geburt** beim Kind, ein Befund zur Heirat in das Alter und das Datum der Heirat, ein angegebenes
  Alter in das angegebene Alter und seine Abweichung, ein Tod vor der Geburt in beide Daten und das Alter, ein
  Ereignis in die Spalte des Ereignisses, der Altersunterschied der Partner in den Partner, eine mögliche doppelte
  Person in den Namen, die Schreibung eines Ortes in die Zellen mit diesem Ort. Ein Befund ohne eigene Zelle steht
  nur in den Spalten der Prüfungen.
- Spalten der Gruppe **Prüfungen**: **Befunde** (Anzahl; „…“, solange die Prüfung läuft), **Höchste Stufe**,
  **Ungewöhnlich, geprüft** (Zahl der als **Kein Fehler** markierten Befunde).
- Ein als **Kein Fehler** markierter Befund ([A5.7](A5-tree-check.md#A5.7)) bleibt in der Zelle als **ungewöhnlich**
  („Ungewöhnlich, aber geprüft“) und zählt nicht zu den Befunden.
- **Grenzen:** ein schreibgeschützter Stammbaum lässt keinen Befund markieren („Der Baum ist schreibgeschützt:
  Befunde lassen sich nicht markieren.“).
- **Bedienung:** ein Klick auf das Zeichen öffnet eine Blase (auf dem Telefon ein Panel von unten): Stufe, Text des
  Befunds, „Befund 1 von 2“ und
  - **Kein Fehler** (Meldung „Markiert: kein Fehler“ mit **Rückgängig**); bei einem ungewöhnlichen **Wieder
    melden**;
  - **Datenqualität ›** öffnet den Dialog der Datenqualität bei der Gruppe dieses Befunds; bei einem ungewöhnlichen
    bei der Liste der markierten.

  Die Legende **Zeichen** („Zeichen in den Zellen“) erklärt auch das unsichere Datum, die Verlässlichkeit, den
  Ersatzwert, den berechneten Wert und **Trifft nicht zu**.

<!-- zdroj: app:src/ui/table-view/table-checks.ts severityRank, parentAgeColumn, issueTargets (mapování nálezů na buňky), buildCheckIndex, CHECK_COLUMNS, applyChecks · table-ui.ts whenIdle (validateTreeData jednou), cellFindings · table-bubble.ts bubbleHeading, bubbleHtml, legendHtml, openBubblePanel, sheetElement · src/ui/tree-stats.ts showTreeValidationDialog (focus: skupina otevřená a posunutá; označené → seznam) · strings.ts table.sev.*, unusualChecked, notError, reReport, toQuality, dismissedToast, roNote, checksRunning, findingOf, legend, legendTitle, legendKind.*, legendText.* · commity 19cf28ea, e530019b, 59a8eed0 -->

<a id="A6.7.6"></a>
### A6.7.6 Filter, Suche und Sortierung

Der Filter wählt die Zeilen aus, die Suche engt sie weiter ein, die Sortierung bestimmt die Reihenfolge.

- **Chips** der Personentabelle (Verbindungen haben keine Chips, Ereignisse und Quellen eigene, [A6.7.10](#A6.7.10),
  [A6.7.11](#A6.7.11)): **Lebend**, **Verstorben** (schließen sich aus), **Blutsverwandte**, **Stamm**
  (Wahl der Stämme), **Generation** (Bereich), **Mehrere Verbindungen**, **Ohne Geburtsdatum**, **Unsicheres Datum**
  (Geburt oder Tod), **Ohne Quelle**, **Mit Befund** (Fehler oder zu prüfen; Spur nicht), **Ungewöhnlich**,
  **Unbestätigt (Forschung)** (nur Stammbaum aus der Forschung). Die Chips der Befunde warten auf die Prüfung
  („Sobald die Prüfungen fertig sind“). Was nicht hineinpasst, steht unter **Weitere (n)**.
- **Filter in der Spalte** (**Filter…** im Spaltenkopf) nach der Art der Spalte:
  - Werte aus einer Liste (Geschlecht, Stand der Verbindung, Stufe des Befunds, Stamm …);
  - Bereich **von**–**bis** (beim Datum **Jahr**, bei Alter, Anzahl und Prozent eine Zahl);
  - Text: **enthält** · **beginnt mit**;
  - bei jeder **Nur leere** · **Nur ausgefüllte**.
- Es gelten alle Filter zugleich. Die Zahl der Filter steht auf **Filter (n)**, alles hebt **Filter aufheben** auf.
  Ohne Zeile: „Nichts entspricht dem Filter“.
- **In Tabelle suchen:** ab 2 Zeichen, ohne Rücksicht auf Groß- und Kleinschreibung und diakritische Zeichen, in den
  sichtbaren Spalten und auch in den Unterzeilen der Verbindungen; Treffer sind hervorgehoben, über der Tabelle
  steht ihre Zahl.
- **Sortierung:** ein Klick auf den Spaltenkopf sortiert aufsteigend, ein weiterer absteigend, der dritte hebt die
  Sortierung auf; sortiert wird nur nach dieser Spalte. Umschalt + Klick fügt die Spalte als weiteren Schlüssel hinzu
  (ein weiterer Klick dreht ihn um, der dritte entfernt ihn). Der Pfeil ↑ ↓ am Spaltenkopf trägt die Nummer der
  Reihenfolge des Schlüssels. Leere Werte stehen immer am Ende, in beiden Richtungen. Zahlen im Text werden als Zahlen
  sortiert.
- **Grenzen:** die Suche wird nicht in der Ansicht gespeichert ([A6.7.7](#A6.7.7)).

<!-- zdroj: app:src/ui/table-view/table-filter.ts CHIP_ORDER, setChip (Žijící × Zemřelí), personPassesChip (finding: chyba nebo k ověření; unusual; unconfirmed jen researchTree, relN/relB/relD), CHECK_CHIPS, rodChoices, generationSpan, filterKindOf, cellPasses, foldText · table-filterbar.ts SEARCH_DELAY_MS, columnFilterForm, chipChoiceForm · table-state.ts řazení (vzestupně → sestupně → vypnuto; Shift přidá, otočí, odebere; prázdné na konci; Intl.Collator numeric) · strings.ts table.chip.*, chipRod, chipGen, moreN, filters, clearFilters, search, matches, noMatch, checksWait, matchContains, matchStarts, rangeFrom, rangeTo, rangeYears, onlyEmpty, onlyFilled · commity dd1d74bc, e64b8b06, fc746037 -->

<a id="A6.7.7"></a>
### A6.7.7 Tabellenansichten

Eine Ansicht ist eine unter einem Namen gespeicherte Einstellung der Tabelle. Die vorgegebenen Ansichten sind fertige
Lesarten des Stammbaums; eine eigene Ansicht speichert der Mensch.

| Vorgegebene Ansicht | Zeilen | Was sie zeigt |
|---|---|---|
| **Übersicht** (Standard für Personen) | Personen | Name, Datum und Ort der Geburt, Sterbedatum, Sterbealter, Partner, Heiratsdatum und Alter dabei, Befunde, Vollständigkeit gesamt; sortiert nach dem Geburtsdatum |
| **Geburten und Eltern** | Personen | Geburt und Taufe, Eltern, ihr Alter bei der Geburt, Vollständigkeit Geburt; sortiert nach dem Geburtsdatum |
| **Heiraten** (Standard für Verbindungen) | Verbindungen | Paar, Datum und Ort der Heirat, Alter und angegebenes Alter beider, Stand, Trauzeugen, Scheidung, Kinder, Dauer, Quellen, Vollständigkeit; sortiert nach dem Heiratsdatum |
| **Sterbefälle** | Personen | Tod, Ursache, Begräbnis, Alter und angegebenes Alter beim Tod, Vollständigkeit Sterbefall; Chip **Verstorben**; sortiert nach dem Sterbedatum |
| **Quellen und Zitate** | Personen | Zahl der Quellen, Belegung, Verlässlichkeit von Geburt und Tod; von den wenigsten Quellen an |
| **Lücken** | Personen | Vollständigkeit gesamt und nach Teilen, Geburt, Eltern, Quellen; von den am wenigsten vollständigen an; Verbindungen zugeklappt |
| **Prüfungen** | Personen | Stufe und Zahl der Befunde, Daten, Alter der Eltern, Heirat; Chip **Mit Befund**; von der höchsten Stufe an, dann nach der Zahl der Befunde |
| **Alle Ereignisse** (Standard für Ereignisse) | Ereignisse | Art, Person oder Paar, Datum, Ort, Alter beim Ereignis, Paten, Trauzeugen, Amtsperson, Quelle; sortiert nach dem Datum |
| **Alle Quellen** (Standard für Quellen) | Quellen | Titel, Archiv, Buch und Signatur, online, Personen, Angaben, von der Forschung gelesen, Abschrift; sortiert nach dem Titel |

- **Die Ansicht speichert:** Zeilenart, Spalten (Reihenfolge, Breiten, Fixierung, eingeklappte Gruppen),
  Abdeckungszeile, Filter, Sortierung und das Aufklappen der Verbindungen. Sie speichert nicht die Suche, die
  ausgewählte Zeile und die Bildlaufposition.
- Eine geänderte Ansicht hat das Etikett **geändert** und die Möglichkeiten **Speichern**, **Als neue speichern**,
  **Änderungen verwerfen**. Eine vorgegebene Ansicht ändert sich nicht und lässt sich weder umbenennen noch löschen;
  ihre Änderungen gehen nur über **Als neue speichern**. Eigene Ansicht: **Umbenennen…**, **Löschen** (mit
  Bestätigung). Eigene Ansichten sind nach dem Namen geordnet.
- Den Arbeitsstand der Tabelle (auch ungespeicherte Änderungen) merkt sich die App für jeden Stammbaum auf diesem
  Gerät; nach dem Neuladen der Seite ist die Tabelle so, wie sie geblieben ist.
- **Gespeicherte Ansichten sind Teil des Stammbaums** (Datenversion 17): Speichern, Umbenennen und Löschen haben
  einen Schritt zurück und einen Eintrag im Änderungsverlauf. Sie gehen mit dem Stammbaum in die Sicherung (JSON) und
  beim Abtrennen eines Teils des Stammbaums auch in den neuen Stammbaum. GEDCOM trägt sie nicht; ein Stammbaum aus der
  Forschung behält sie beim Laden einer neuen Version. Eine beschädigte Ansicht wird beim Laden ausgelassen.
- **Grenzen:** eine ältere App (ab 3.19.0) öffnet einen von App 3.27.0 gespeicherten Stammbaum schreibgeschützt und
  speichert ihn nie; nach der Aktualisierung der App lässt sich der Stammbaum wieder ändern.
- **Bedienung:** Menü **Ansicht** in der Leiste der Tabelle (**Vorgegeben**, **Eigene**, **Als neue speichern…**,
  **Umbenennen…**, **Löschen**).

<!-- zdroj: app:src/ui/table-view/table-views.ts BUILTIN_VIEWS (9: overview, births, marriages, deaths, sources, gaps, checks, events, allSources), defaultViewId (události → Všechny události, prameny → Všechny prameny), defaultViewId, viewFromState, viewChanged, uniqueViewName, customViews (podle jména), workStorageKey strom.table.{treeId}, readTableWork, writeTableWork · table-columns.ts výchozí sloupce pohledů (:683 Sňatky, DEFAULT_VIEWS.events, .sources) · src/table-views-data.ts sanitizeTableView, keepTableViews (verze z výzkumu ponechá pohledy) · src/data.ts:298 sanitizeTableViews při načtení, :1720 saveTableView, deleteTableView (krok zpět, historie změn) · src/subtree.ts:148 · src/types.ts STROM_DATA_VERSION 17, StromData.tableViews · src/tree-manager.ts:630 isTreeNewer, src/data.ts:649 isNewerData (jen ke čtení, od aplikace 3.19.0) · src/ui/research-ui.ts, conflict-decide-ui.ts keepTableViews · strings.ts table.view, views.*, viewName.* (events, allSources), changed, save, saveAs, discard, builtinNote, saveAsMenu, renameMenu, deleteMenu, builtinLocked, viewWhat, deleteConfirm · commity d19a5942, c2d48747, 8ca649ff -->

<a id="A6.7.8"></a>
### A6.7.8 Zeilenaktionen und Bearbeitung

Ein Klick wählt eine Zeile aus (auch eine Unterzeile einer Verbindung); die Pfeiltasten, Bild auf/ab und
Strg+Pos1/Ende verschieben die Auswahl, Esc hebt sie auf.

| Aktion | Was sie tut |
|---|---|
| **Im Baum zeigen** | wechselt in die Ansicht Familie mit der Person als zentraler Person, zentriert und hervorgehoben |
| **Person öffnen** (Enter) | öffnet die Seite der Person |
| **Bearbeiten…** (Doppelklick) | öffnet die Bearbeitung der Person; bei einer Unterzeile einer Verbindung und in der Verbindungstabelle die Beziehungen der Person in dieser Verbindung |

- In der Verbindungstabelle betreffen die Aktionen die Person **Partner 1**.
- In der Ereignistabelle betreffen sie die erste Person der Zeile, und **Bearbeiten…** öffnet die Bearbeitung dieses
  Ereignisses ([A6.7.10](#A6.7.10)); in der Quellentabelle gibt es **Quelle öffnen** ([A6.7.11](#A6.7.11)).
- Nach einer Bearbeitung die Meldung „Gespeichert: …“, die Zeile blinkt kurz, und die Zeilen bleiben in ihrer
  Reihenfolge. Eine Zeile, die dem Filter nicht mehr entspricht, bleibt mit dem Etikett „passt nicht mehr“ bis zur
  nächsten Änderung der Sortierung, des Filters oder der Ansicht. Eine Änderung aus der Forschung meldet „Die
  Forschung hat 3 Angaben geändert: …“.
- **Grenzen:** in einem schreibgeschützten Stammbaum gibt es kein **Bearbeiten…**.
- **Bedienung:** Schaltflächen an der ausgewählten Zeile, Zeilenmenü (rechte Maustaste; auch Aufklappen der
  Verbindungen). Auf dem Telefon öffnet ein Tippen auf die Zeile ein Panel mit den Aktionen und den Verbindungen
  („Verbindung 1: … · Bearbeiten ›“).

<!-- zdroj: app:src/ui/table-view/table-ui.ts tableMethods (tableRowAction: tree → Rodina, focus, highlight; open; edit → dialog osoby / panel vztahů na svazku), personOfRow (Partner 1), keepWork · table-refresh.ts keepOrder, watchEdit, changedKeys, bridgeChanges, namesList · table-grid.ts FLASH_MS · strings.ts table.act.*, dblClickHint, actionsOf, unionWith, editMore, staleRow, savedToast, bridgeToast · commity da6b9786, de46ae30, e4a35406 -->

<a id="A6.7.9"></a>
### A6.7.9 CSV- und XLSX-Export

Der Export speichert die Tabelle, wie sie zu sehen ist, in eine Datei für Tabellenkalkulationen: **CSV** oder
**XLSX** (Excel-Arbeitsmappe).

- **Was hinausgeht:** die sichtbaren Spalten in der Reihenfolge der Tabelle (die Spalten einer eingeklappten Gruppe
  ganz) und die Zeilen nach Filter, Suche und Sortierung. Die Werte sind so, wie die Tabelle sie schreibt: Daten in
  der Schreibweise der App, „um …“, „≈ 67“, „get. …“, „–“.
- **Zeilen:** ohne Filter und Suche gehen alle Zeilen hinaus („Alles Angezeigte · 120 Personen“). Mit Filter oder
  Suche gibt es die Wahl:
  - **Angezeigte** (Standard): nur die Zeilen, die die Tabelle zeigt, mit der Anzahl und einem Hinweis auf den Filter
    („Angezeigte · 28 von 866 Personen (Filter: …)“);
  - **Alle … ohne Filter** („Alle Personen ohne Filter · 866“): alle Zeilen dieser Art in der Reihenfolge der
    Sortierung, ohne Filter und ohne Suche.

  Eine Zeile mit dem Etikett „passt nicht mehr“ ([A6.7.8](#A6.7.8)) gehört nicht zu den angezeigten.
- Eine Person mit zwei und mehr Verbindungen: die erste Verbindung, die dem Filter entspricht, steht in ihrer Zeile,
  jede weitere in einer Folgezeile mit leeren Angaben der Person. Hinter dem Namen steht die Spalte **Verbindung**
  („1 von 3“).
- **CSV:** Text, UTF-8 mit BOM-Kennung, Trennzeichen Semikolon, Zeilenenden CRLF; eine Zelle, die eine
  Tabellenkalkulation als Formel ausführen würde, wird entschärft. Zeichen der Befunde und Farben werden nicht
  exportiert.
- **XLSX:** ein Tabellenblatt, benannt nach der Ansicht.
  - Zeile 1 sind die Gruppen der Spalten (verbundene Zellen), Zeile 2 der Spaltenkopf, Zeile 3 die Abdeckungszeile
    ([A6.7.4](#A6.7.4)). Die fixierten Spalten der Tabelle und diese drei Zeilen sind im Blatt fixiert.
  - Jede Gruppe von Spalten ist eine Gliederung: sie lässt sich zuklappen, ihre erste Spalte bleibt. Die Folgezeilen
    der Verbindungen liegen eine Ebene tiefer unter der Zeile der Person (Ebene 2 der Zeilengliederung).
  - Eine Zelle mit einem Befund **Fehler** oder **zu prüfen** ist hinterlegt und hat die Befunde in einem Kommentar.
    Spur und ungewöhnlich haben weder Farbe noch Kommentar.
  - Anzahlen, Alter in ganzen Jahren und Vollständigkeit sind Zahlen (Vollständigkeit und Abdeckung als Prozent);
    das Übrige ist Text, wie ihn die Tabelle schreibt (auch „≈ 67“, „28–29“, Daten). Text wird nie zu einer Formel.
    Der Link einer Quelle ist in der Zelle ein Link.
- **Datei:** `{Stammbaum}_{Ansicht}_{JJJJ-MM-TT}.csv` oder `.xlsx`, ohne diakritische Zeichen.
- **Bedienung:** **Export ▾** in der Leiste der Tabelle (auf dem Telefon in **⋯**): **Format** „CSV · für Excel und
  Google Tabellen“ oder „XLSX · Gruppen, fixierte Spalten, Prüffarben“, **Zeilen**, **CSV herunterladen** / **XLSX
  herunterladen**; Meldung „Heruntergeladen: …“ mit der Zahl der Personen, Zeilen und Spalten.
- **Grenzen:** der Export aus dem Menü des Stammbaums (**Personentabelle (CSV)**, [A7](A7-book-pages-and-export.md))
  ist eine andere Datei mit festen Spalten.
- **Gilt seit:** App 3.27.0

<!-- zdroj: app:src/ui/table-view/table-export.ts tableCsvField (neutralizace vzorců), buildExportTable, buildTableCsv (BOM, ;, CRLF, pokračovací řádky, sloupec Svazek), fileNamePart, tableCsvFileName (csv | xlsx) · table-xlsx.ts buildTableXlsx (řádky 1–3, merges, outline sloupců za ukotvenou částí, pokračovací řádky outline 1, freeze, errorFill/warningFill + findingsComment jen chyba a k ověření, href), xlsxNumber (COUNT_COLUMNS, věk ^\d+$, procento) · src/xlsx.ts (ignoredErrors numberStoredAsText, styl @ pro text) · table-viewbar.ts exportForm (Formát, Řádky: Zobrazené / Všechny bez filtru jen s filtrem nebo hledáním) · table-ui.ts tableExportNow (unfiltered: všechny řádky typu v řazení, stale ven) · strings.ts table.export, exportFormat, exportRows, exportCsv, exportXlsx, exportAll, exportShown, exportFilterNote, exportUnfiltered.*, exportWhat.*, exportWhatAll.*, exportFile, exportDownload, exportDownloadXlsx, csvUnionCol, csvUnionOf, exportedToast · commity 2368683b, 5a67797b, 4308633b, e0ce4ec2, ebc1542f, e5b97725 · dirigent:prace/1110-app-tabulka-p2, 1110-app-tabulka-opravy -->

<a id="A6.7.10"></a>
### A6.7.10 Ereignisse in Zeilen

Die Ereignistabelle hat eine Zeile für jedes Ereignis des Stammbaums: wer, wann, wo, in welchem Alter und wer dabei
war.

- **Was eine Zeile ist:**
  - jedes Ereignis einer Person (Taufe, Beruf, Wohnort, Militärdienst …) und jedes Ereignis eines Paares;
  - Geburt und Tod aus den Angaben der Person, wenn dazu etwas erfasst ist (Datum, Ort, Adresse, Quelle; beim Tod
    auch die Ursache oder das Alter);
  - die Heirat einer Verbindung: bei einer Ehe immer, bei einer anderen Beziehung („Beginn der Beziehung“) nur mit
    einer erfassten Angabe; die Scheidung („Ende der Beziehung“), wenn die Verbindung geschieden ist oder ihr Ende
    erfasst ist.
- **Ein gemeinsames Ereignis** (Wohnort, Militärdienst, Auswanderung, Einwanderung, Einbürgerung, eigenes Ereignis),
  das bei mehreren Personen gleich erfasst ist, ist eine Zeile mit allen diesen Personen. Gleich heißt gleiche Art,
  gleiches Datum, gleicher Ort, gleiche Adresse, Notiz und Quellen; das Datum muss erfasst sein und dazu ein Ort oder
  eine Quelle. Taufe, Beruf oder Titel gehören immer nur einer Person.
- **Spalten** in den Gruppen **Ereignis** · **Beteiligte** · **Quelle**:
  - **Art**, **Person oder Paar** (beim Paar zuerst der Blutsverwandte der Hauptperson), **Datum**, **Ort**;
  - **Alter beim Ereignis** wie anderswo ([A6.7.3](#A6.7.3)); bis zu einem Jahr aus genauen Daten in Tagen
    („12 T.“); bei mehreren Personen das Alter jeder in der Reihenfolge der Namen („–“ unbekannt); bei der Geburt
    **Trifft nicht zu**;
  - **Angabe**: der Wert des Ereignisses (Beruf, Titel), sonst die Ursache; beim Tod die Todesursache;
  - **Paten**, **Trauzeugen**, **Amtsperson**, **Weitere Anwesende**: die Beteiligten nach Rolle; eine Person des
    Stammbaums ist ein Link;
  - **Quelle**: die zitierten Quellen „Titel, Signatur“, mehrere durch Semikolon getrennt; **Verlässlichkeit** der
    Angabe.
- **Chips:** **Geburten und Taufen** (auch Geburten aus den Angaben der Person), **Heiraten** (auch Verlobung,
  Aufgebot, Erlaubnis, Vertrag), **Sterbefälle und Begräbnisse** (auch Einäscherung), **Andere Ereignisse**, **Ohne
  Quelle**.
- **Filter nach Beteiligten:** ein Klick auf den Namen eines Beteiligten bietet „Filter: Pate …“ an (bei einer Person
  des Stammbaums auch **Person öffnen**). Der Filter ist der Chip „Pate: … ×“ (Zeuge, Amtsperson, Anwesend) und
  ersetzt den vorigen Filter nach Beteiligten. Eine Person des Stammbaums wird nach der Person gesucht, ein
  geschriebener Name nach den Buchstaben ohne Rücksicht auf Groß- und Kleinschreibung, diakritische Zeichen und
  Leerzeichen.
- **Ein Pate, der immer wieder auftaucht** ([A5.5](A5-tree-check.md#A5.5)), steht in der Zelle des Beteiligten als
  **Spur**.
- **Bedienung:** die vorgegebene Ansicht **Alle Ereignisse**; die Zeilenaktionen ([A6.7.8](#A6.7.8)) betreffen die
  erste Person der Zeile. **Bearbeiten…** öffnet beim Ereignis einer Person die Bearbeitung der Person bei diesem
  Ereignis (beim gemeinsamen bei der ersten Kopie), bei Geburt und Tod die Bearbeitung der Person, beim Ereignis
  eines Paares dessen Dialog, bei Heirat und Scheidung die Beziehungen der Person in dieser Verbindung.
- **Grenzen:** Platzhalterpersonen haben keine Zeilen; Geburt und Tod ohne erfasste Angabe haben keine Zeile.
- **Gilt seit:** App 3.27.0

<!-- zdroj: app:src/ui/table-view/table-events.ts buildEventRows (narození/úmrtí jen se zapsaným údajem, weddingRow: manželství vždy kromě marriageUnrecorded, partnersStart jen se zápisem; divorceRow), SHARED_TYPES, shareKey (typ, vlastní název, datum, místo, adresa, poznámka, prameny; datum a místo nebo pramen), mergeParticipants, eventEditTarget, MARRIAGE_COUPLE_TYPES · table-columns.ts EVENT_COLUMNS, eventPersons (pokrevní první), eventAgeCell, eventAge (dny < 366), eventValueCell, eventSourceCell, eventPill, DEFAULT_VIEWS.events · table-filter.ts EVENT_CHIP_ORDER, EVENT_KIND_CHIPS, lifeCategory, participantChip, eventHasParticipant (foldName), setParticipantFilter · table-ui.ts tableNameAction, tableRowAction (event → editTableEvent) · table-checks.ts PARTICIPANT_ROLE, recurring (recurringGodparent v buňkách účastníků) · strings.ts table.rows.events, group.event, participants, source, col.ev*, godparents, witnesses, officiants, others, chip.ev*, chipParticipant.*, filterParticipant.*, evKind.*, ageDays, viewName.events · commity 8de751c2, 63ed9def · spec 073 §14.1 · dirigent:prace/1110-app-tabulka-p2 -->

<a id="A6.7.11"></a>
### A6.7.11 Quellen in Zeilen

Die Quellentabelle hat eine Zeile für jede Quelle des Stammbaums (**Aktionen → Quellen**,
[A3.1](A3-evidence-in-the-app.md#A3.1)) und sagt, wie viel die Quelle im Stammbaum belegt.

- **Spalten** in den Gruppen **Quelle** · **Verwendung**:
  - **Titel**, **Archiv**, **Buch, Signatur, Folio**, **Online** (die Adresse ohne `https://`; eine Webadresse ist ein
    Link ↗ in ein neues Fenster);
  - **Personen**: wie viele Personen eine Angabe haben, die die Quelle zitiert; eine Angabe der Verbindung belegt
    beide Partner;
  - **Angaben**: wie viele Angaben die Quelle zitieren. Eine Angabe ist eine Liste von Zitaten: das Zitat der Person,
    Geburt, Tod, jedes Ereignis der Person, Heirat, Scheidung und jedes Ereignis des Paares;
  - **Von der Forschung gelesen**: wie viele Leser die Abschrift gelesen haben („1 Leser“, „2 Leser“: ein Mensch in
    der App und die Forschung), sonst „nein“;
  - **Abschrift**: ja / nein; im Katalog der Spalten gibt es auch **Datum des Eintrags**.
- Zitate von Platzhalterpersonen und Quellen einer Geschichte werden nicht gezählt.
- **Chips:** **Ohne Person** (keine Person zitiert sie), **Ungelesen**, **Mit Abschrift**, **Online**.
- **Bedienung:** die vorgegebene Ansicht **Alle Quellen**. An der Zeile **Quelle öffnen** und **Bearbeiten…**: beide
  öffnen die Quellenverwaltung bei dieser Quelle; **Im Baum zeigen** gibt es hier nicht.
- **Grenzen:** in einem gesperrten Stammbaum wird die Quelle nur angezeigt, ohne Bearbeitung.
- **Gilt seit:** App 3.27.0

<!-- zdroj: app:src/ui/table-view/table-sources.ts sourceUsage (PERSON_CITATION_FIELDS, události, PARTNERSHIP_CITATION_FIELDS pro oba partnery, bez zástupných, ne příběh), buildSourceRows (katalog data.sources), sourceReaders (readBy user/research/both) · table-columns.ts SOURCE_COLUMNS, urlCell, shortUrl, readersCell, DEFAULT_VIEWS.sources · table-filter.ts SOURCE_CHIP_ORDER (srcNoPerson persons 0, srcUnread, srcTranscript, srcOnline safeHttpUrl) · table-grid.ts rowTail (source: open + edit) · table-ui.ts tableRowAction (source → openTableSource), openTableSourceId (zamčený strom → showSourceViewer readOnly) · strings.ts table.rows.sources, group.source, group.use, col.src*, chip.src*, readers, act.openSource, viewName.allSources, sources.readBy.* · commity 1a3a49f1, 3cf69ffa · spec 073 §14.2 · dirigent:prace/1110-app-tabulka-p2 -->

<a id="A6.7.12"></a>
### A6.7.12 Quellenangaben und Paten in der Personentabelle

Die Personentabelle hat Spalten, die zeigen, aus welcher Quelle Geburt, Heirat und Tod stammen und wer Pate war.

- **Quellenangaben** (Gruppe **Quellen**): **Geburt: Archiv**, **Geburt: Signatur**, **Geburt: Link** und dasselbe
  für **Heirat** und **Tod**. Die Zelle zeigt Archiv, Signatur oder Webadresse der ersten zitierten Quelle; weitere
  Quellen stehen in der Schaltfläche „+N“.
  - Geburt nimmt die Zitate der Geburt, dann der Ereignisse Geburt und Taufe; Tod die Zitate des Todes, dann der
    Ereignisse Tod, Begräbnis und Einäscherung; Heirat die Zitate der Verbindung (bei einer Unterzeile der
    Verbindung die dieser Verbindung). Jede Quelle einmal.
  - Quellen aus der Herkunft einer Angabe in der Forschung werden nicht gezählt, nur Zitate in den Daten.
  - Bei einer lebenden Person haben die Spalten des Todes **Trifft nicht zu**.
  - Sortiert und gefiltert wird nach der ersten Quelle.
- **Paten** (Gruppe **Geburt und Taufe**): die Paten der Ereignisse Geburt und Taufe, jeder einmal; eine Person des
  Stammbaums ist ein Link. Ein Pate, der immer wieder auftaucht ([A5.5](A5-tree-check.md#A5.5)), hat in der Zelle
  das Zeichen **Spur**.
- **Bedienung:** die Spalten werden einzeln im Panel **Spalten** eingeschaltet ([A6.7.2](#A6.7.2)). Ein Klick auf
  „+N“ öffnet die Blase **Weitere Quellenangaben** (auf dem Telefon ein Panel von unten); ein Klick auf eine Quelle
  öffnet sie in der Quellenverwaltung.
- **Gilt seit:** App 3.27.0

<!-- zdroj: app:src/ui/table-view/table-sources.ts factCitations (narození: birthSourceIds + birth/baptism; úmrtí: deathSourceIds + death/burial/cremation; sňatek: sourceIds svazku; neznámé id ven, každý jednou) · table-columns.ts citeCell (první pramen, moreSources), bArch…dUrl (group sources, unionScoped, deathOnly → naCell), godparentsCell (group birth), personGodparents · table-checks.ts personRecurring (sloupec godparents) · table-grid.ts moreCitesHtml · table-ui.ts showTableCites, openTableSourceId · strings.ts table.col.bArch…dUrl, godparents, moreCites, citesTitle · commity 208d8b92, 21a132c1 · spec 073 §14.3, §14.5 · dirigent:prace/1110-app-tabulka-p2 (citace: jen citace v datech, ne FactReliability.sourceIds) -->
