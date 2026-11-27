<a id="A7"></a>
# A7 Buch, Seiten und Export

Was die Strom-App aus dem Stammbaum nach außen gibt (Familienbuch, Seiten, Dateien für die Familie und für andere
Programme) und wie sie dabei lebende Personen schützt. Beschrieben wird die App 3.21.2; Änderungen aus einer neueren
Version tragen deren Nummer.

| Ausgabe | Was es ist |
|---|---|
| **Familienbuch** | ein Buch zum Lesen von Anfang an, zum Drucken auf A4 oder zum Speichern als HTML ([A7.4](#A7.4)) |
| **Familienseiten**, **Seiten des Stammbaums** | ein verknüpfter Satz von Seiten der Stammlinien, Familien und Personen ([A7.5](#A7.5)) |
| **Personenseite** | das ganze Leben einer Person, zum Ansehen, Drucken und Speichern als HTML ([A7.6](#A7.6)) |
| **App mit den Daten (HTML)** | eine eigenständige Datei mit der App und dem Stammbaum ([A7.7](#A7.7)) |
| **An Verwandte senden** | eine Datei per E-Mail zum Öffnen, Ergänzen und Zurücksenden |
| **Poster** | die aktuelle Ansicht als SVG, PNG oder mehrseitiges PDF |
| **Stammbaum verschenken** | ein ZIP-Paket mit dem Stammbaum einer Person oder eines Paares: Begleitbrief, App, Seiten, Buch, Fächer, GEDCOM ([A7.9](#A7.9)) |
| **Datensicherung (JSON)**, **GEDCOM**, **Personentabelle (CSV)** | Daten zum Wiederherstellen und für andere Programme ([A2](A2-loading-a-family-tree.md)); eigene Spalten, Filter und Sortierung: Export aus der Ansicht Tabelle ([A6.7.9](A6-views.md#A6.7.9)) |

- Die Sicherung und die App mit den Daten lassen sich mit einem Passwort verschlüsseln (**Mit Passwort
  verschlüsseln**); GEDCOM nicht. Die Verschlüsselung funktioniert nur unter einer sicheren Adresse: über https, auf
  `localhost` oder `127.0.0.1` und in einer vom Datenträger geöffneten Datei; unter einer Adresse `http://` im Netzwerk
  nicht, und der Dialog des Passworts sagt das ([A1.1](A1-the-app-in-brief.md#A1.1)).

<!-- zdroj: app:strings.ts importExport.app, importExport.share, importExport.poster, importExport.book, importExport.backup, importExport.gedcom, importExport.csv · src/ui/import-export.ts (exportTargetTreeJSON, exportTargetTreeApp s heslem; GEDCOM bez hesla) · šifrování jen na zabezpečené adrese: src/crypto.ts isCryptoAvailable, src/crypto-errors.ts resetPasswordError, strings.ts encryptToggle, insecureContext, commit 266d6a76, dirigent:prace/1110-app-github-11-13 -->

<a id="A7.1"></a>
## A7.1 Wer eine lebende Person ist

Der Schutz lebender Personen ([A7.2](#A7.2)) betrifft nur Personen, die die App für lebend hält.

1. Eine als verstorben markierte Person (**Verstorben**) ist verstorben; eine Person, die in den Daten ausdrücklich
   „lebt“ hat, ist lebend.
2. Eine Person mit Sterbedatum ist verstorben.
3. Sonst ist sie lebend, wenn seit ihrem spätestmöglichen Geburtsjahr weniger als 110 Jahre vergangen sind.
4. Eine Person ohne Geburtsjahr und ohne anderen Anhaltspunkt ist lebend (sichere Wahl).

- Das spätestmögliche Geburtsjahr stammt aus den eigenen Daten und Ereignissen der Person, aus der Hochzeit
  (mindestens 14 Jahre davor) und aus den Kindern (ein Elternteil ist mindestens 12 Jahre älter als das Kind, über
  weitere Generationen).
- **Grenzen:** das Zeichen † bei einer Person im Stammbaum folgt einer anderen Regel (vermutlich verstorben nach 120
  Jahren) und steuert den Schutz nicht. Der Tod eines Nachkommen markiert einen Vorfahren nicht von selbst als
  verstorben.
- **Bedienung:** das Kästchen **Verstorben** in der Bearbeitung der Person; beim Hinzufügen eines Verwandten wird es
  von selbst angehakt, wenn Sterbedatum oder Sterbeort ausgefüllt werden.
- **Gilt seit:** App 1.2.0; selbsttätiges Anhaken von Verstorben App 3.21.2

<!-- zdroj: app:src/privacy.ts:215 ASSUMED_MAX_AGE, :217 MIN_PARENT_AGE, :219 MIN_MARRIAGE_AGE, :229 isLivingPerson, inferBirthUpperBounds · presumedDeceasedSet · strings.ts person.deceased · CHANGELOG.cs.md 3.21.2 -->

<a id="A7.2"></a>
## A7.2 Schutz lebender Personen

Vor einer Ausgabe aus dem Stammbaum wird gewählt, wie lebende Personen gezeigt werden. Im Export heißt die Auswahl
**Privatsphäre lebender Personen**, im Familienbuch **Schutz lebender Personen**.

| Auswahl | Name einer lebenden Person |
|---|---|
| **Vollständige Daten** | unverändert, nichts wird verborgen |
| **Initialen + Geburtsjahr** | Initialen von Vor- und Nachname, das Geburtsjahr bleibt; Ehename nur als Initiale |
| **Namen verbergen** | „Lebende Person“, ohne Nachnamen |
| **Nur Nachname behalten** | „Lebende Person“ und Nachname |

- Jede Auswahl außer Vollständige Daten nimmt lebenden Personen alle Daten und Orte, Notizen, Erzählungen, Foto,
  Ereignisse, Zitationen, Anhänge, Namensvarianten, Titel, Ehenamen, offene Frage, REFN und Angaben der Forschung.
  Bei Initialen bleibt das Geburtsjahr.
- Angaben des Paares (Daten, Ort, Notiz, Zeugen, Erzählung, Ereignisse) verschwinden, wenn mindestens einer der
  Partner lebt. Initialen behalten das Anfangsjahr der Partnerschaft.
- **Grenzen:** die Struktur bleibt immer: Personen, Beziehungen und Geschlecht. Verstorbene Personen ändern sich
  nicht.
- **Quellen:** im Export (App mit den Daten, JSON, GEDCOM) lässt jede Auswahl außer Vollständige Daten den Katalog
  der Quellen, die Zitationen und die Anhänge **bei allen Personen, auch verstorbenen** weg (die App schreibt das bei
  der Auswahl dazu). Familienbuch, Seiten und Personenseite nehmen Quellen nur lebenden Personen; eine Quelle, die
  nur bei lebenden Personen zitiert ist, fällt weg.
- **Gilt seit:** App 1.2.0; Quellen Verstorbener im Buch und auf den Seiten App 3.18.0
- **Ab App 3.30.0:** eine lebende Person verliert mit dem Foto auch das Original des Porträts; eine Partnerschaft mit
  einem lebenden Partner verliert das Paarfoto ([A12.7](A12-portrait-and-couple-photo.md#A12.7)).
- **Ab App 3.26.0:** der GEDCOM-Export behält Quellen und Zitate Verstorbener bei jeder Auswahl; er lässt nur die
  Zitate lebender Personen weg und sagt es („Bei N lebenden Personen entfallen K Zitate. Verstorbene behalten ihre
  Quellen.“, Auswahl **Quellen behalten**). Der Export App mit den Daten und JSON ändert sich nicht. Der GEDCOM-Export
  fragt zuerst, **Wofür die Datei ist**: **Zurück zu {program}** (vollständige Daten, Quellen und Programm-IDs) oder
  **Zum Teilen mit anderen** ([S6.6](S6-tree-from-another-program.md#S6.6)).

<!-- zdroj: app:src/privacy.ts applyPrivacy (keepDeceasedSources) · strings.ts privacy.label, privacy.modeFull, privacy.modeInitials, privacy.modeAnonymous, privacy.modeMinimal, privacy.livingPerson, privacy.dropsSources · book.dlg.privacy · CHANGELOG.cs.md 3.18.0 -->

<a id="A7.2.1"></a>
### A7.2.1 Standardschutz je nach Ausgabe

| Ausgabe | Standardauswahl |
|---|---|
| App mit den Daten (HTML) | Initialen + Geburtsjahr |
| GEDCOM | Initialen + Geburtsjahr |
| An Verwandte senden | Initialen + Geburtsjahr |
| Familienbuch | Initialen + Geburtsjahr |
| Personenseite | Vollständige Daten, wenn auf der Seite keine lebende Person ist; sonst die zuletzt gewählte, sonst Initialen |
| Personentabelle (CSV), Alle Stammbäume exportieren | Vollständige Daten |

- **Grenzen:** Familienseiten und Seiten des Stammbaums machen für eine geschützte Person keine eigene Seite und
  keinen Link; im Register steht sie unter dem geschützten Namen. Enthält die Auswahl lebende Personen und ist der
  Schutz ausgeschaltet, weist der Dialog darauf hin, dass die Datei ihre Namen, Daten und Orte trägt.
- **Gilt seit:** App 1.2.0; Personenseite App 3.18.0; Familienbuch App 3.19.0
- **Ab App 3.26.0:** GEDCOM hat mit der Auswahl **Zum Teilen mit anderen** (Standard) Initialen + Geburtsjahr, mit der
  Auswahl **Zurück zu {program}** Vollständige Daten ([S6.6](S6-tree-from-another-program.md#S6.6)).

<!-- zdroj: app:src/ui/import-export.ts (výchozí privacy podle formátu) · src/book-options.ts:55 · src/person-page.ts:94, :104 personPageExportPrivacy · src/family-pages.ts:309 · src/ui/share-ui.ts · strings.ts familyPages.privacyWarn -->

<a id="A7.3"></a>
## A7.3 Inhalt der Datei

Beim Export wird neben dem Schutz der **Inhalt** gewählt: was in die Datei gespeichert wird.

| Vorgabe | Fotos | Anhänge und Quellenausschnitte | Notizen | Quellen und Zitationen |
|---|---|---|---|---|
| **Vollständiges Archiv** | ja | ja | ja | ja |
| **Kleine Datei zum Senden** | nein | nein | ja | ja |
| **Nacktes Gerüst** | nein | nein | nein | nein |

- **Grenzen:** die Struktur des Stammbaums und die Namen bleiben immer. Die Werkstatt der Forschung (Warteschlange,
  Aufgaben, Entwürfe von Erzählungen) kommt nie in den Export. Die Auswahl des Schutzes kann Quellen und Anhänge auch
  beim Vollständigen Archiv weglassen ([A7.2](#A7.2)).
- **Ab App 3.30.0:** die Wahl **Was exportieren** hat neben **Ganzer Stammbaum** und **Nur aktuelle Ansicht** auch
  **Personenliste**: Datensicherung (JSON) und GEDCOM nur mit den Personen der Liste ([A11.9](A11-lists-of-people.md#A11.9)).
- **Ab App 3.33.0:** **Was exportieren** hat auch **Stammbaum einer Person…** ([A7.9.6](#A7.9.6)). **Nur aktuelle
  Ansicht** und Stammbaum einer Person gehen in allen Exportformaten: **An Verwandte senden**, **App mit den Daten
  (HTML)**, **Datensicherung (JSON)**, **Poster**, **Familienbuch**, **Verknüpfte Seiten**, **GEDCOM** und
  **Personentabelle (CSV)**; vorher nur Datensicherung (JSON) und Poster. Die Ausgabe der Ansicht öffnet sich bei der
  fokussierten Person. Nur **Mit Datei verbinden…** bleibt beim ganzen Stammbaum.
- **Ab App 3.30.0:** zu **Fotos** gehören auch die Originale der Porträts und die Paarfotos. Ohne Fotos verschwinden
  auch sie, auch wenn die Anhänge exportiert werden; ohne Anhänge bleiben die Porträts ohne Verknüpfung mit dem
  Original ([A12.7](A12-portrait-and-couple-photo.md#A12.7)).
- **Gilt seit:** App 2.4.0

<!-- zdroj: app:src/privacy.ts CONTENT_PRESETS, stripResearchWork · strings.ts privacy.contentLabel, privacy.presetComplete, privacy.presetSmall, privacy.presetSkeleton, privacy.dropsSourcesContent · 3.30.0: app:33fa6cd4 src/ui/import-export.ts scope 'list', strings.ts exportMenu.scopeLabel, scopeWhole, scopeView, scopeList · 3.33.0: app:index.html data-view-ok, data-person-ok (všechny volby kromě Propojit se souborem), src/ui/import-export.ts exportScoped (pohled: defaultPersonId = fokus), commit 6408f8f9, strings.ts exportMenu.scopePerson, familyPages.exportPages -->

<a id="A7.4"></a>
## A7.4 Familienbuch

Das Familienbuch ist ein Buch zum Lesen von Anfang an: Stammbaum, Familien nach Generationen, Erzählungen und
Quellen.

- **Was ins Buch kommt:** **Ganzer Stammbaum** · **Stammlinien** (eine oder mehrere) · **Vorfahren einer Person** ·
  **Nachkommen einer Person** (Auswahl der Personen [A7.4.1](#A7.4.1)).
- **Teile des Buchs** in dieser Reihenfolge: **Inhalt**, **Stammbaum der Linie**, **Familien** (immer),
  **Erzählungen**, **Lebensgrafik und Zeitleiste**, **Die Zeit (Geschichte)**, **Quellen**, **Ausschnitte und
  Fotos**, **Weitere Familien**, **Personenregister**.
- Ein Teil ohne Inhalt wird ausgelassen, und der Dialog sagt warum: Erzählungen braucht eine Erzählung, die Grafik
  eine andere Detailstufe als die knappe, Die Zeit Geschichte, Quellen zitierte Quellen, Ausschnitte ein Foto oder
  einen Ausschnitt. Weitere Familien gibt es nur im Buch des ganzen Stammbaums.
- **Voreinstellung:** **Für die Familie** (alle Teile, normale Detailstufe, ohne Notizen und Angaben für Forschende)
  · **Für Forschende** (volle Detailstufe, Notizen, Angaben für Forschende: Stand der Belege und Widersprüche,
  [R3.8](R3-verification-and-citation.md#R3.8)) · **Eigene**. Standard ist Ganzer Stammbaum, Für die Familie,
  Initialen + Geburtsjahr und die Sprache der App.
- Der **Titel** entsteht aus der Auswahl (Name des Stammbaums, Stammlinie X, Vorfahren: Name, Nachkommen: Name) und
  lässt sich überschreiben.
- Die **Sprache des Buchs** ändert Überschriften und Beschriftungen; Angaben aus dem Stammbaum werden nicht übersetzt.
- Die Auswahl wird für jeden Stammbaum gespeichert.
- **Bedienung:** Export **Familienbuch**; Fenster des Buchs: Druck auf A4 und **Als HTML speichern**.
- **Gilt seit:** App 3.19.0; Voreinstellung Eigene App 3.21.0
- **Ab App 3.30.0:** der Teil **Ausschnitte und Fotos** setzt in das Kapitel der Familie auch das Paarfoto, über die
  Ereignisse des Paares; ein Stammbaum, dessen einzige Bilder Paarfotos sind, bietet diesen Teil an
  ([A12.6](A12-portrait-and-couple-photo.md#A12.6)).
- **Ab App 3.33.0:** die Auswahl **Haus** (ein Buch über ein Haus), der Teil **Häuser** und das **Häuserverzeichnis**
  ([S10.10](S10-houses.md#S10.10)).

<!-- zdroj: app:src/book-options.ts (části, předvolby, výchozí :55) · strings.ts book.dlg.kind, book.dlg.parts, book.dlg.preset, book.dlg.lang, book.parts, book.unavailable · CHANGELOG.cs.md 3.19.0, 3.21.0 -->

<a id="A7.4.1"></a>
### A7.4.1 Auswahl der Personen für Buch und Seiten

| Auswahl | Personen | Reihenfolge |
|---|---|---|
| Ganzer Stammbaum | alle Personen | nach Geburt |
| Stammlinien | Mitglieder der Stammlinien mit Familien sowie Ehefrauen und Ehemänner der Mitglieder | ein Kapitel je Stammlinie |
| Vorfahren einer Person | Vorfahren bis zur gewählten Zahl der Generationen und die Partnerschaften, aus denen die Mitglieder stammen | Generation für Generation, Vater vor Mutter |
| Nachkommen einer Person | Nachkommen bis zur gewählten Zahl der Generationen über Söhne und Töchter, mit Partnern und allen Partnerschaften | nach Geburt |
| Ausgewählte Personen (nur Seiten) | nur die ausgewählten Personen; eine Familie nur, wenn beide Partner ausgewählt sind | – |

- **Grenzen:** die Linie der Vorfahren und Nachkommen tragen leibliche und Adoptiveltern. Stiefelternteil und
  Pflegeelternteil tragen die Linie nicht. Vater ist der männliche Elternteil, der leibliche vor dem Adoptivvater.
- **Gilt seit:** App 3.19.0; Ausgewählte Personen App 3.21.0
- **Ab App 3.33.0:** die Auswahl **Stammbaum einer Person** (Vorfahren und ihre Familien) in Buch und Seiten: die
  Personen des Geschenkausschnitts der gewählten Person mit der Wahl **Familien der Vorfahren bis**
  ([A7.9.1](#A7.9.1)); die Familienkapitel laufen nach Generationen von den ältesten Vorfahren. Der Titel des Buchs
  ist „Stammbaum von Name“. In der Familie eines Kapitels kann auch ein Kind außerhalb des Ausschnitts genannt sein.

<!-- zdroj: app:src/lineage.ts selection, :279 isDescentLink · strings.ts book.dlg.kind, book.dlg.kindHint · 3.33.0: app:src/book-model.ts kind 'gift' (giftCutIds, giftLevels: generace od nejstarších), src/book-options.ts titleGift, src/ui/book-ui.ts giftDepth, commity 6408f8f9, 040aaaaf · dirigent:prace/1126-app-093-darovat-rodokmen (B5: kniha jmenuje i dítě mimo výřez) -->

<a id="A7.5"></a>
## A7.5 Familienseiten und Seiten des Stammbaums

Die Seiten sind ein verknüpfter Satz von Seiten: Stammlinie, Familien und Personen mit Links untereinander und mit
Registern der Personen, Familien, Nachnamen und Orte.

- **Familienseiten:** eine oder mehrere Stammlinien ([A4](A4-surnames-and-families.md)).
- **Seiten des Stammbaums:** **Seiten für den ganzen Stammbaum** (alle Stammlinien und Weitere Familien),
  **Ausgewählte Personen**, Vorfahren einer Person mit gewählter Zahl der Generationen.
- Schutz lebender Personen und Quellen nach [A7.2](#A7.2); Standard Initialen + Geburtsjahr.
- **Gilt seit:** Familienseiten App 3.20.0; Seiten des Stammbaums App 3.21.0
- **Ab App 3.33.0:** die Option **Häuser**: Häuser mit Geschichte, das Häuserverzeichnis und eine Seite für jedes Haus
  ([S10.10](S10-houses.md#S10.10)).

<!-- zdroj: app:src/family-pages.ts · strings.ts familyPages.menuItem, familyPages.treePages, familyPages.treePagesAction, familyPages.indexTitle · spec 026 · CHANGELOG.cs.md 3.20.0, 3.21.0 -->

<a id="A7.5.1"></a>
### A7.5.1 Geschichte auf der Zeitleiste der Stammlinie

Die Zeitleiste der Stammlinie (**Zeitleiste der Stammlinie →** auf der Seite der Stammlinie) zeigt die Geschichte in
den Orten der Linie mit dem Symbol ihrer Art.

- **Geschichte eines Landes oder einer Region** sind senkrechte Streifen über das Diagramm mit dem Symbol der Art
  oben.
- **Ortsgeschichte** (**Ortsgeschichte**, **Aus Forschungsquellen**) eines Ortes, der im Diagramm eine eigene Zeile
  hat, ist ein Symbol in der Zeile des Ortes in der Farbe der Herkunft. Ein Ort ohne Zeile hat einen senkrechten
  Streifen wie die Geschichte eines Landes.
- **Die Liste:** Eine Zeile der Geschichte hat das Symbol der Art in der Farbe der Herkunft. Nach dem Text steht der
  Ort; bei der Geschichte eines Landes oder einer Region deren Name, nur wenn die Geschichte der Linie aus mindestens
  zwei Ländern oder Regionen stammt.
- **Arten der Geschichte:** eine zweite Reihe von Chips **Arten von Ereignissen** unter der ersten: **Alle** und die
  Arten der Geschichte auf der Seite, jede mit Symbol. Die gewählten Arten lassen nur ihre Zeilen, Streifen und
  Symbole. Die Reihe gibt es nur bei mindestens zwei Arten und nur mit dem Skript der Seite; mit ausgeschaltetem Chip
  **Geschichte** verschwindet sie.
- Der Chip **Geschichte** in **Arten von Ereignissen** hat das Symbol der Art „Sonstiges“.
- **Bedienung:** Familienseiten: **Zeitleiste der Stammlinie →**, die beiden Reihen von Chips **Arten von
  Ereignissen**
- **Gilt seit:** App 3.31.0

<!-- zdroj: app:6caa471e src/family-pages-html.ts tlSymHtml, tlScopeClass, onRow (scope ≠ region a obec s řádkem → symbol na řádku, jinak pruh se symbolem sp-tl-bandsym), histChips (rodTimelineHistKinds > 1, js-only, Vše + druhy), řádek seznamu (symbol, place ?? region), čip hist se symbolem other, skript data-hk-off · src/rod-timeline.ts RodTimelineHistory scope, region (jen při ≥ 2 regionech), rodTimelineHistKinds · src/family-pages-css.ts (skrytí s vypnutými Dějinami) · strings.ts familyPages.tlLink, tlKindsLabel, tlKinds.hist, tlHistNote, tlHistKindsLabel, history.filterAll · dirigent:spec/121 „Časová osa rodu stejně jako hlavní osa“, Rozhodnutí 20. 11. (místní na řádku obce) -->

<a id="A7.6"></a>
## A7.6 Personenseite

Die **Personenseite** zeigt das ganze Leben einer Person: Daten in Worten, die Familie als kleinen Stammbaum,
Erzählung, Lebensorte auf der Karte, den Lebenslauf mit Geschichte, Ausschnitte aus Kirchenbüchern und Quellen und
den Abschnitt **Für Forschende**.

- **Als HTML speichern** erzeugt eine einzige eigenständige Datei, die sich offline in jedem Browser öffnet. Die
  Gruppen des Inhalts und der Schutz lebender Personen lassen sich wählen ([A7.2.1](#A7.2.1)); die Auswahl wird
  gespeichert.
- **Ab App 3.28.0:** im Fenster der App führt **◎ Weg der Vorfahren auf der Karte ›** zum Weg der Vorfahren der
  Person in der Migration im Zeitverlauf ([A6.5.4](A6-views.md#A6.5.4)). Die gespeicherte Seite hat ihn nicht.
  Er steht im Abschnitt **Lebensorte**; eine Person mit höchstens einem eigenen Ort, die Vorfahren auf der Karte hat,
  hat ihn in einer eigenen Zeile dort, wo der Abschnitt wäre.
- **Ab App 3.30.0:** die Galerie **Bilder und Dokumente** beginnt mit dem Foto jeder Partnerschaft der Person
  („{A} und {B} · Paarfoto“). Die Vergrößerung eines Porträts mit Original hat den Umschalter **Porträt** | **Ganzes
  Foto**, die gespeicherte Seite den Link **Ganzes Foto**, wenn die Datei dieses Foto enthält. ⋯ **Weitere Aktionen**
  bietet **Porträtausschnitt bearbeiten** ([A12.3](A12-portrait-and-couple-photo.md#A12.3),
  [A12.6](A12-portrait-and-couple-photo.md#A12.6)).
- **Bedienung:** Angebot der Personenkarte, **Personenseite**; auch aus dem Fächer.
- **Gilt seit:** App 3.18.0

<!-- zdroj: app:src/person-page.ts · strings.ts personPage.save, fan.personPage · CHANGELOG.cs.md 3.18.0 · 3.28.0: app:src/person-page-map.ts pp-map-path (jen mode app), src/ui/person-page-ui.ts personPageMapPath, commit 34e82d43 · mapPathRowHtml (bez oddílu Místa života), commit caea192a -->

<a id="A7.7"></a>
## A7.7 Gespeichertes HTML (eigenständige Datei)

**App mit den Daten (HTML)** speichert App und Stammbaum in eine einzige Datei, die sich in jedem Browser ohne
Installation öffnet. **Als App exportieren** in **Alle Stammbäume exportieren** legt alle Stammbäume in eine Datei.

- Eine solche Datei hat einen eigenen Speicher im Browser. Mit der App auf stromapp.info wird sie **nicht
  synchronisiert**; Änderungen bewahrt **Datei speichern** (lädt eine Kopie herunter), und in die Web-App kommen sie
  per Import (**Aus HTML-Datei**).
- **Grenzen:** die Datei schützt in der Grundeinstellung lebende Personen (Initialen, [A7.2.1](#A7.2.1)).
- **Gilt seit:** App 1.0.0

<!-- zdroj: app:strings.ts importExport.app, importExport.appDesc, importExport.exportAllApp, importExport.fromHtml, embeddedMode.* · src/ui/import-export.ts -->

<a id="A7.8"></a>
## A7.8 Erzählungen

Eine Erzählung ist ein zusammenhängender Text über eine Person oder eine Ehe, über den Fakten des Stammbaums
geschrieben. Sie ist keine Quelle: Die Fakten belegen Quellen, die Erzählung gibt sie nur wieder
([A3.6](A3-evidence-in-the-app.md#A3.6)).

- **Wo sie zu sehen ist:** das Fenster **Erzählung** (aus dem Menü der Personenkarte), die Personenseite
  ([A7.6](#A7.6)) und im Familienbuch der Teil **Erzählungen** nach **Familien** ([A7.4](#A7.4)). Die Erzählung eines
  Paares, eine je Ehe, steht unter der Erzählung der Person; im Buch hat sie ein eigenes Unterkapitel.
- **Textformat:** Eine Leerzeile trennt Absätze; eine Zeile `## …` ist ein Untertitel; Zeilen `- …` sind
  Aufzählungspunkte; `**fett**` und `*kursiv*`. Andere Zeichen bleiben einfacher Text. Weder `* 1831` (Geburt) noch
  `1. ledna` am Zeilenanfang beginnt einen Aufzählungspunkt. Ein einleitendes `# …`, das nur den Untertitel des
  Kapitels wiederholt, entfällt. Ein bloßer Quellcode im Text wird als Titel der Quelle gelesen.
- **Grenzen:**
  - die eigene Erzählung der Person lässt sich beim Bearbeiten einer Person schreiben und ändern, Abschnitt
    **Erzählung**: **Untertitel des Kapitels** und **Der Text**. Der Abschnitt ist zu sehen, wenn **Einstellungen →
    Personenkarte → Erweiterte Felder** eingeschaltet ist oder schon ein Text existiert. Die Erzählung eines Paares
    und **Stützt sich auf** (Fakten und Vorbehalt des Autors) kommen mit der Datei und sind nur lesbar;
  - ein noch nicht freigegebener Entwurf der Forschung trägt die Marke **Entwurf** und den Link **In der Forschung
    freigeben**. Eine neue Fassung der Forschung wartet neben der freigegebenen („Neue Fassung wartet“,
    **Vergleichen**); Bearbeiten in der App verwirft sie nicht, entschieden wird in der Forschung
    ([R3.9.1](R3-verification-and-citation.md#R3.9.1));
  - im Buch und im Druck stehen unter dem Text keine Quellen; die Quellen der Erzählung sind im Quellenverzeichnis
    des Buchs nummeriert;
  - in einer GEDCOM-Datei steht die Erzählung im eigenen Tag `_STORY`, nicht in einer Notiz.
- **Bedienung:** Menü der Personenkarte → **Erzählung**; Person bearbeiten → Abschnitt **Erzählung**.
- **Gilt seit:** App 2.8.0; Erzählungen von Paaren und die Personenseite 3.18.0; im Familienbuch 3.19.0

<!-- zdroj: app:src/story-text.ts:1 storyProseHtml (odstavce, ##, -, **, *) · src/ui/person-modal.ts:662 fillStoryFields · index.html pm-story-section · src/book-blocks.ts:594 storyBlock · src/book.ts proseHtml · src/person-page.ts · src/ged-exporter.ts:449 pushStory _STORY · strings.ts story.* · commit 52000825 (aplikace 2.8.0) · CHANGELOG.cs.md 3.18.0, 3.22.0 -->

<a id="A7.9"></a>
## A7.9 Stammbaum verschenken

**Stammbaum verschenken…** bereitet für eine Person (die beschenkte Person) oder ein Paar eine ZIP-Datei mit ihrem
Teil des Stammbaums vor: die Vorfahren, die Familien um sie und den eigenen Haushalt, nicht den ganzen Stammbaum des
Eigentümers. Der Assistent hat sechs Schritte: **Für wen**, **Wer dazugehört** ([A7.9.1](#A7.9.1)), **Lebende
Personen** ([A7.9.2](#A7.9.2)), **Inhalt des Pakets** ([A7.9.3](#A7.9.3)), **Begleitbrief** ([A7.9.4](#A7.9.4)) und
**Vorschau und erstellen**.

- Die Startperson des Ausschnitts ist die beschenkte Person; die App im Paket öffnet sich bei ihr. Die Daten des
  Stammbaums ändern sich nicht; der Ausschnitt ist nur der Umfang der Ausgabe, kein neuer Stammbaum.
- **Für wen:** **Eine Person**, **Ein Paar** (ein Paket für zwei; die zweite Person wird als Partner aus dem
  Stammbaum vorgeschlagen) oder **Personenliste oder Auswahl** ([A7.9.5](#A7.9.5)). Die Aktion wird nur bei einer
  Person angeboten, die im Stammbaum mindestens Eltern, einen Partner oder ein Kind hat.
- **Direkt zur Vorschau ›** springt zu Schritt 6 mit den Standardeinstellungen oder den Einstellungen vom letzten
  Mal; jeder Schritt lässt sich auch danach ändern.
- Das Paket entsteht ganz im Browser; nichts wird gesendet. Am Computer wird die ZIP-Datei nach dem Erstellen sofort
  heruntergeladen; auf dem Telefon nicht von selbst, dort gibt es **Teilen…** und **In „Dateien“ sichern**. Lässt der
  Browser das Herunterladen nicht zu, geht **Erneut herunterladen** ohne neues Erstellen, solange das Fenster offen
  ist.
- Vor dem Erstellen wird geprüft, ob der Speicher des Browsers reicht ([A9.7.1](A9-using-the-app.md#A9.7.1)). Geht
  der Speicher aus, entsteht nichts und der Assistent bietet **Ohne Fotos versuchen** oder **Ohne App** an.
- Die Einstellungen (Ausschnitt, lebende Personen, Inhalt, Brief) werden bei der Person oder dem Paar auf diesem
  Gerät gespeichert, nicht in den Daten des Stammbaums und nicht im Export. Das nächste Paket für sie beginnt damit
  (**Einstellungen vom letzten Mal**; **Mit Standard neu beginnen**) und sagt, wie viele Personen seitdem zum
  Ausschnitt dazugekommen oder weggefallen sind. Das Menü der Person zeigt bei der Aktion das Datum des letzten
  Pakets.
- **Bedienung:** das Menü der Personenkarte (rechte Maustaste, auf dem Telefon langes Drücken) und ⋯ auf der
  Personenseite: **Stammbaum verschenken…**; **Aktionen › Für die Familie › Stammbaum verschenken…**; im Fenster
  **In Familien aufteilen** bei **Sicht einer Person** „Nur für eine Person, ohne den Baum zu teilen: **Stammbaum
  verschenken…**“ ([A14.4](A14-trees-and-structure.md#A14.4)); das Menü einer Personenliste und einer Auswahl:
  **Jeder Person einen Stammbaum schenken…**; Export, Umfang **Stammbaum einer Person…**, Link **Ganzes
  Geschenkpaket…** ([A7.9.6](#A7.9.6)). In einem schreibgeschützten Stammbaum wird die Aktion nicht angeboten.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/ui/gift-tree-ui.ts (canGiftTree, giftMenuMeta, giftDownload jen na počítači, Sdílet/Uložit do Souborů na telefonu, confirmMemoryForOutput, GiftOutOfMemory → Zkusit bez fotek / Bez aplikace) · src/gift-guide.ts giftHasFamily, giftGuideStart, giftSuggestedPartner · src/gift-memory.ts (localStorage strom.gift.{treeId}, nikdy v datech) · src/gift-tree.ts giftCutData (defaultPersonId = obdarovaný) · src/ui/context-menu.ts gift-tree, src/ui/person-page-ui.ts, index.html Pro rodinu, src/ui/split-families-ui.ts splitfam-gift, src/ui/selection-picker-ui.ts, src/ui/person-list-hooks.ts · strings.ts giftTree.menu, title, stepNames, fast, menuList, splitLead, guide.mode, guide.lastH, restart, guide.cutChanged, make.share, make.saveFiles, make.downloadAgain, make.withoutApp, make.tryWithoutPhotos, review.local · dirigent:spec/093 K1.1, K2.4, K5.1, K5.4, K5.5 · dirigent:prace/1126-app-093-darovat-rodokmen (rozhodnutí B3) -->

<a id="A7.9.1"></a>
### A7.9.1 Wer dazugehört (der Ausschnitt)

Der Ausschnitt ist ein Teil des Stammbaums aus der Sicht der beschenkten Person.

| Immer im Ausschnitt | Nicht im Ausschnitt |
|---|---|
| die beschenkte Person, ihre Partner und alle ihre Nachkommen mit Partnern | die Vorfahren der Partner (der Partner der beschenkten Person und der Partner der Vorfahren) |
| ihre Geschwister mit allen Nachkommen und deren Partnern | Personen, die mit der beschenkten Person nur über Partner verbunden sind |
| alle vorhandenen direkten Vorfahren und ihre Partner | Personen ohne Verbindung zur beschenkten Person (getrennte Teile des Stammbaums) |
| die Geschwister jedes Vorfahren mit Partnern (ohne Familie, wenn die Tiefe sie nicht nimmt) | Platzhalterpersonen |
| die Stiefkinder der beschenkten Person (Kinder ihrer Partner) mit ihren Familien | |

- **Familien der Vorfahren bis** (Tiefe): **Niemand** · **Cousins** (Geschwister der Eltern mit ihren Familien) ·
  **Cousins 2. Grades** (auch Geschwister der Großeltern mit ihren Familien) · **Alle** (alle Blutsverwandten der
  Vorfahren). Standard ist Cousins 2. Grades. Die Familie eines Geschwisters eines Vorfahren sind alle seine
  Nachkommen und die Partner aller von ihnen.
- **Familien der Geschwister der Vorfahren:** die Familie jedes Geschwisters eines Vorfahren lässt sich einzeln
  anhaken oder abhaken, auch über die Tiefe hinaus; ein abgehaktes Geschwister bleibt allein mit Partnern im
  Ausschnitt. Dasselbe in der Vorschau aus dem Menü der Karte (**Familie entfernen…**, **Familie hinzufügen…**). Bei
  einem Halbgeschwister eines Vorfahren nennt die Zeile seinen anderen Elternteil.
- Die Linie der Vorfahren und Nachkommen läuft über leibliche und Adoptiveltern, nicht über Stief- und Pflegeeltern
  ([A7.4.1](#A7.4.1)).
- Ein Paar: der Ausschnitt ist die Vereinigung der Ausschnitte beider.
- **Grenzen:** eine Person ohne Vorfahren im Stammbaum hat einen Ausschnitt nur aus sich, Partnern und Nachkommen;
  der Assistent sagt es und die Tiefe wird nicht verwendet. Einen Ausschnitt ab 600 Personen meldet der Assistent
  mit einer Schätzung der Paketgröße.
- **Bedienung:** der Schritt **Wer dazugehört**: die Vorschau mit der Zahl der Personen und Generationen,
  **Familien der Vorfahren bis**, **Familien der Geschwister der Vorfahren**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/gift-tree.ts recipientCut (familySet up all, down all, width cousins, cousins = hloubka, spouses 'spouses', siblingFamilies = výjimky), stepchildrenOf (D5), giftCutIds (pár = sjednocení), giftBranchCandidates (half, otherParentId), GIFT_DEFAULT_DEPTH = 2 · src/lineage.ts familySet (sourozenci linie vždy, potomci předků do degree + 1, partneři krve), addDescendants, descentParents · src/__tests__/gift-tree.test.ts (hloubky, předci partnerů, ostrov) · strings.ts giftTree.cut.depthH, depth, depthDesc, branchesH, branchesNote, menuRemove, menuAdd, noAncestors, outLine, otherParent, largeLead · src/ui/gift-tree-ui.ts (≥ 600 osob) · dirigent:spec/093 K1.2, K1.3, K1.4 -->

<a id="A7.9.2"></a>
### A7.9.2 Lebende Personen im Geschenk

Der Schutz lebender Personen ([A7.1](#A7.1), [A7.2](#A7.2)) wird einmal über den Ausschnitt angewandt, und alle Teile
des Pakets (App, Seiten, Buch, Fächer, GEDCOM und Begleitbrief) bekommen dieselben geschützten Daten. Was in einem
Teil verborgen ist, steht in keinem anderen.

- **Der Haushalt der beschenkten Person ist immer vollständig:** die beschenkte Person, ihre Partner außer
  geschiedenen und getrennten, und ihre Kinder. Bei einem Paar beide und die Kinder jedes von ihnen. Stiefkinder
  gehen nur als Ausnahme vollständig hinein.
- **Ausnahmen:** eine in der Liste **Lebende im Stammbaum** angehakte Person ist vollständig (angehakt =
  vollständig).
- **Übrige Lebende:** die Schutzstufen aus [A7.2](#A7.2), standardmäßig **Initialen + Geburtsjahr**.
- **Bei vollständig gezeigten Lebenden** lässt sich jede Art abschalten:

| Art | Standard | Was das Abschalten entfernt |
|---|---|---|
| **Geburtsdaten** | ja | das Datum von Geburt und Taufe; das Jahr bleibt |
| **Adressen und Wohnorte** | ja | die Adressen von Geburt, Tod und Ereignissen, die Adresse des Paares, Wohnsitz- und Volkszählungsereignisse |
| **Kontakte (E-Mail, Telefon)** | nein | die E-Mails der Person ([S6.9](S6-tree-from-another-program.md#S6.9)), Notizzeilen mit einer E-Mail, eigene Zeilen eines anderen Programms (darin Telefonnummern) |
| **Fotos** | ja | Porträt und Anhänge der Person |
| **Notizen und Geschichten** | nein | Notizen, Erzählungen, die offene Frage |
| **Konfession** | ja | die Angabe der Konfession ([R3.11](R3-verification-and-citation.md#R3.11)) und Riten: Taufe, Firmung, Erstkommunion, Bar und Bat Mizwa, Weihe |
| **Quellen mit persönlichen Angaben** | ja | die Zitate der Person und ihrer Ereignisse |

- **Bei Verstorbenen:** **Todesursachen**, **Notizen und Geschichten**, **Quellen und ihre Scans**; standardmäßig
  alles behalten. Die Quellen der Verstorbenen bleiben auch beim Schutz lebender Personen.
- Standardmäßig trägt der Haushalt der beschenkten Person also Adressen, aber keine E-Mails, Telefonnummern und
  Notizen; die übrigen Lebenden nur Initialen und Geburtsjahr. Kürzt der Schutz bei Lebenden etwas, sagt es der
  Begleitbrief in der Fußzeile.
- Ohne Fotos (Schritt 4) verschwinden Fotos, Anhänge und Quellenausschnitte bei allen Personen. Die
  Forschungswerkstatt kommt nie ins Geschenk ([A7.3](#A7.3)).
- **Bedienung:** der Schritt **Lebende Personen**: **Lebende im Stammbaum**, **Übrige Lebende**, **Bei vollständig
  gezeigten Lebenden**, **Bei Verstorbenen**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/gift-tree.ts defaultGiftPrivacy (others initials; sensitive contacts:false, notes:false, ostatní true; dead vše true), giftHouseholdIds (bez rozvedených a odloučených; pár jen oba; děti každého), giftProtectedData (jednou před výstupy, keepDeceasedSources, stripResearchWork, stripMedia bez fotek), giftShortensLiving · src/privacy.ts LivingSensitive (komentář druhů), maskSensitive, maskSensitiveCouple, maskEvent, keepsEvent RELIGION_EVENTS, RESIDENCE_EVENTS, BIRTH_DATE_EVENTS, maskDeceased · strings.ts giftTree.guide.livingH, checkedFull, othersH, sensitiveH, sensitive, deadH, dead, giftTree.cover.shortened · test/vysledek-1126-app-093.md (Soukromí K6.2, K6.4) · dirigent:spec/093 K6.1–K6.4 -->

<a id="A7.9.3"></a>
### A7.9.3 Inhalt des Pakets

Die ZIP-Datei `Stammbaum – <Name> – <Jahr>.zip` enthält den Ordner `Stammbaum – <Name>`:

| Datei | Was es ist |
|---|---|
| `Hier beginnen.html` | der Begleitbrief mit Wegweiser ([A7.9.4](#A7.9.4)); immer dabei |
| `Stammbaum (App).html` | die Strom-App mit dem Ausschnitt in einer Datei ([A7.7](#A7.7)); öffnet sich offline bei der beschenkten Person mit Begrüßung und Nachricht |
| `Familienseiten/` | die Seiten des Ausschnitts ([A7.5](#A7.5)) |
| `Familienbuch.html` | das Buch des Ausschnitts zum Drucken ([A7.4](#A7.4)); PDF über den Druck im Browser |
| `Ahnenfächer.svg`, `.png` | die direkten Vorfahren der beschenkten Person in einem Bild, 3 bis 10 Generationen; bei einem Paar ein Fächer für jeden |
| `Für andere Programme/Stammbaum.ged` | der Ausschnitt im GEDCOM-Format |

- Jeder Teil außer dem Begleitbrief lässt sich abschalten; standardmäßig sind alle an, mit Fotos. Der Assistent
  zeigt eine Schätzung der komprimierten Größe, auch ohne Fotos und ohne App.
- Das Buch hat die Bucheinstellungen ([A7.4](#A7.4), **Bucheinstellungen…**), der Fächer sein Aussehen (**Aussehen des
  Fächers…**).
- Die Dateinamen sind in der Sprache des Begleitbriefs; der Name der ZIP-Datei lässt sich in Schritt 6 ändern.
- **Grenzen:** auf dem Mac entpackt der Finder die ZIP-Datei richtig; das Werkzeug `unzip` im Terminal kann Namen
  mit diakritischen Zeichen nicht.
- **Bedienung:** der Schritt **Inhalt des Pakets**: **Teile des Pakets**, **Fotos** (**Mit Fotos** / **Ohne
  Fotos**), **Inhalt der ZIP-Datei**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/gift-package.ts giftFileNames (složka, Začít zde, aplikace, stránky, kniha, vějíř na osobu u páru, Pro jiné programy/Rodokmen.ged), buildGiftPackage, estimateGiftSize · src/gift-tree.ts defaultGiftParts · src/filenames.ts unicodeFileName · strings.ts giftTree.files, giftTree.pkg.part, partsH, photosH, bookSettings, fanLook, zipH, zipNote, review.fileName · test/vysledek-1126-app-093.md (ZIP rozbalený ditto, macOS unzip) · dirigent:spec/093 K5.2, K5.3 -->

<a id="A7.9.4"></a>
### A7.9.4 Begleitbrief (Hier beginnen)

`Hier beginnen.html` ist die erste Seite des Pakets: die Nachricht, Zahlen aus dem Stammbaum und der Wegweiser.

- **Nachricht:** eine Vorlage nach Sprache und Motiv, frei änderbar (**Vorlage erneut einfügen**). Der Platzhalter
  der Anrede in der Nachricht (cs `[oslovení]`, en `[name]`, de `[Name]`, pl `[imię]`) wird durch die **Anrede**
  ersetzt; Standard ist der Vorname, bei einem Paar beide. Dazu **Unterschrift** (erscheint im Brief und beim Öffnen
  der App) und **Datum** (standardmäßig heute).
- **Sprache des Briefs:** Tschechisch, Englisch, Deutsch, Polnisch; standardmäßig die Sprache der App. **Motiv:**
  **Ohne Motiv** (Standard) oder **Weihnachten**.
- **Der Stammbaum in Zahlen** sind Zahlen aus dem Ausschnitt, nicht aus dem ganzen Stammbaum: Zahl der Personen und
  Generationen, ältester Vorfahr, Stammlinien, Orte und Weg der Familie, ältester Eintrag, Personen nach
  Generationen.
- **Inhalt des Pakets:** Wegweiser zu den Teilen mit Links; wer sie öffnet, ohne die ZIP-Datei zu entpacken,
  bekommt eine Anleitung zum Entpacken.
- Der Brief lässt sich auf A4 drucken.
- **Bedienung:** der Schritt **Begleitbrief** mit Vorschau der Startseite; in Schritt 6 **Im Fenster öffnen**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/gift-cover.ts buildGiftCover, giftFacts, giftLetterTemplate, giftDefaultSalutation, giftMessage (všechny čtyři tokeny) · strings.ts giftTree.salutationToken, template.none, template.xmas, cover.*, letter.langH, langName, motif, salutationH, messageH, reinsert, dateH, numbersH, guide.signature · dirigent:prace/1126-app-093-darovat-rodokmen (rozhodnutí A3, B3b tisk A4) · dirigent:spec/093 K7.1–K7.4 -->

<a id="A7.9.5"></a>
### A7.9.5 In Serie für eine Personenliste oder Auswahl

Aus einer Personenliste ([A11](A11-lists-of-people.md)) oder Auswahl entsteht für jede Person ein eigenes Paket.

- Die Tabelle **Beschenkte** zeigt jede mit Anrede, Zahl der Personen und der Lebenden. **Ehe- und Lebenspartner als
  ein Paket** verbindet Paare. Eine Person, die im Stammbaum weder Eltern noch Partner noch Kind hat, bekommt kein
  Paket.
- Die Schritte 2–5 stellen alle zugleich ein; **Bearbeiten…** gibt einer Person eigene Einstellungen, **Zurück zu
  gemeinsam** hebt sie auf. `[Name]` in der Nachricht wird durch die Anrede jeder beschenkten Person ersetzt.
- Das Ergebnis ist eine ZIP-Datei `Stammbäume <Jahr>.zip` mit einer fertigen ZIP-Datei für jede Person oder jedes
  Paar, oder einzelne ZIP-Dateien in einem gewählten Ordner (**In Ordner speichern…**). Die Pakete entstehen Person
  für Person, damit der Speicher reicht; **Alle abbrechen** löscht auch das schon Erstellte. Ein Paket, das sich nicht
  erstellen lässt, erscheint als Warnzeile; die übrigen entstehen.
- Die Einstellungen werden bei jeder Person gespeichert.
- **Grenzen:** Pakete in Serie entstehen nur am Computer; auf dem Telefon geht ein Paket für eine Person oder ein
  Paar.
- **Bedienung:** das Menü einer Personenliste und einer Auswahl: **Jeder Person einen Stammbaum schenken…**; im
  Assistenten der Schritt **Für wen**, **Personenliste oder Auswahl**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/gift-batch.ts · src/gift-package.ts buildGiftBatch, giftBatchFileName · src/ui/gift-tree-ui.ts (mode list jen mimo telefon, showDirectoryPicker, Zrušit vše maže zapsané) · src/ui/selection-picker-ui.ts (ne na telefonní liště), src/ui/person-list-hooks.ts · strings.ts giftTree.batch.*, guide.mode.list, guide.listPhoneWhy, guide.listPhoneNote, menuList · dirigent:prace/1126-app-093-darovat-rodokmen (B4: zrušení u složky smaže zapsané ZIPy) · dirigent:spec/093 K8.1–K8.3 -->

<a id="A7.9.6"></a>
### A7.9.6 Exportumfang Stammbaum einer Person

Im Export hat **Was exportieren** die Wahl **Stammbaum einer Person…**: der Ausschnitt einer Person
([A7.9.1](#A7.9.1)) in jedem Format, ohne Assistent.

- Die Person ist die gerade fokussierte; eine andere lässt sich wählen. Die Tiefe **Familien der Vorfahren bis**
  kommt aus dem letzten Geschenk dieser Person, sonst Cousins 2. Grades; die manuellen Ausnahmen bei Geschwistern der
  Vorfahren verwendet der Export nicht.
- Formate: **An Verwandte senden**, **App mit den Daten (HTML)**, **Datensicherung (JSON)**, **Poster**,
  **Familienbuch**, **Verknüpfte Seiten**, **GEDCOM**, **Personentabelle (CSV)**. Die Ausgabe öffnet sich bei der
  gewählten Person und zählt Beziehungen und Generationen von ihr aus.
- Buch und Seiten bekommen die Auswahl **Stammbaum einer Person** ([A7.4.1](#A7.4.1)). Das Poster stellt die Ansicht
  auf die gewählte Person und macht ein Poster der Ansicht.
- Der Schutz lebender Personen ist die Wahl des Exports ([A7.2.1](#A7.2.1)) und gilt für alle Lebenden, auch für den
  Haushalt der gewählten Person. Die Wahlen des Geschenks ([A7.9.2](#A7.9.2)) hat nur **Ganzes Geschenkpaket…**, das
  den Assistenten mit derselben Person und Tiefe öffnet.
- **Grenzen:** nur für den geöffneten Stammbaum.
- **Bedienung:** Export › **Was exportieren** › **Stammbaum einer Person…**: **Stammbaum einer Person** (Wahl der
  Person), **Familien der Vorfahren bis**, **Ganzes Geschenkpaket…**
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/ui/import-export.ts showExportDialog (fokus), setExportPerson (hloubka z paměti daru), exportPersonCutIds (branches {}), renderExportScope (scope person jen aktivní strom), exportScoped, shareFromExportDialog, posterFromExportDialog, bookFromExportDialog (selection gift), exportPersonTreeJSON, exportTargetTreeApp (scopedExportData, defaultPersonId), openGiftFromExport · index.html data-person-ok · src/subtree.ts scopedExportData · strings.ts exportMenu.scopePerson, personPick, personFrom, personFull, *PersonDesc, familyPages.exportPages · dirigent:spec/093 K2.1–K2.4 -->
