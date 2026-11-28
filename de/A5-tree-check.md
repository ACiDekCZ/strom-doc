<a id="A5"></a>
# A5 Prüfung des Stammbaums

Was die App im Stammbaum überwacht, mit welchen Schwellen und was sich mit einem Befund tun lässt: beheben, als **Kein
Fehler** markieren oder von der Forschung bewerten lassen. Beschrieben werden die Strom-App 3.21.2 (und die Forschung
1.25.2); was später hinzukam, trägt seine Versionsnummer. Die **Stammbaum-Prüfung** mit ihrem Bericht ([A5.1](#A5.1)
bis [A5.1.5](#A5.1.5)) und `strom health` ([A5.9](#A5.9)) beschreiben die App 3.33.0 und die Forschung 1.38.0.
Die Forschung hat eine eigene Prüfung `strom check` ([R5](R5-conflicts.md)). Sie ist hier nicht beschrieben, außer an
den Stellen, an denen beide übereinstimmen.

<a id="A5.1"></a>
## A5.1 Die Prüfung und ihre Befunde

Die **Stammbaum-Prüfung** geht den Stammbaum durch und stellt einen Bericht zusammen: was den Stammbaum bremst, welche
Schritte sie empfiehlt und welche Fehler in den Daten sie fand. Den Stammbaum ändert sie nicht. Den Bericht legt sie in
den Daten des Stammbaums ab ([A5.1.5](#A5.1.5)).

| Abschnitt des Berichts | Was er zeigt |
|---|---|
| **Übersicht** | einen Satz: „Die Prüfung fand nichts, was den Stammbaum bremst.“, „Die Prüfung empfiehlt 3 Schritte.“ oder „Nichts bremst den Stammbaum; bei den Fehlern in den Daten gibt es etwas zu prüfen.“ |
| **Was das Wachstum bremst** | nicht verbundene Familien („2 Familien sind nicht mit dem Stammbaum verbunden“, **Struktur ›**) und die Schritte, an denen die Forschung steht ([A5.1.4](#A5.1.4)) |
| **Empfohlene Schritte** | was zu tun ist und in welcher Reihenfolge ([A5.1.3](#A5.1.3)) |
| **Fehler in den Daten** | die Befunde der Datenprüfung ([A5.2](#A5.2) bis [A5.6](#A5.6)) |
| **Eingebaute Prüfungen** | eine Zeile je Prüfung mit ihrem Ergebnis ([A5.1.3](#A5.1.3), [A5.1.4](#A5.1.4)) |
| **Seit der letzten Prüfung** | was sich seit dem letzten Bericht desselben Umfangs geändert hat ([A5.1.5](#A5.1.5)) |

Jeder Befund in **Fehler in den Daten** hat einen Schweregrad:

| Schweregrad | Unterabschnitt | Bedeutung |
|---|---|---|
| Fehler | **Fehler** | die Daten widersprechen sich oder sind beschädigt ([A5.2](#A5.2), [A5.3](#A5.3), [A5.4](#A5.4)) |
| zu prüfen | **Zu prüfen** | ein ungewöhnlicher Wert, unwahrscheinlich, aber möglich; eine Prüfung wert |
| Info | **Hinweise** | „Keine Fehler. Hinweise, die bei der Forschung helfen können.“ ([A5.5](#A5.5), [A5.6](#A5.6)) |

- **Grenzen:**
  - Die Datenprüfung läuft jedes Mal, wenn der Bericht geöffnet wird. Die Befunde in **Fehler in den Daten** sind
    immer von diesem Moment.
  - Über den Befunden stehen eine Zusammenfassung („2 Fehler, 1 zu prüfen, 3 Hinweise.“), **Alle beheben (n)**
    ([A5.1.1](#A5.1.1)) und die Wahl **Alle** · **Fehler** · **Zu prüfen** · **Hinweise** mit Anzahlen. Eine Wahl
    ohne Befunde zeigt „Nichts zu prüfen.“
  - Befunde derselben Art bilden eine Gruppe, geordnet nach Schweregrad, Größe und Name. Offen ist nur eine Gruppe
    mit einem Fehler.
    Über 50 Befunden werden weitere in Schritten von 20 gezeigt. Auf dem Telefon (bis 640 px) sind die **Hinweise**
    zugeklappt, wenn es auch Fehler oder Befunde zu prüfen gibt.
  - Platzhalterpersonen werden nicht gemeldet. Ein als **Kein Fehler** markierter Befund ([A5.7](#A5.7)) wird weder
    gezählt noch gezeigt.
  - Ein schreibgeschützter Stammbaum zeigt Befunde nur an („Der Baum ist schreibgeschützt. Befunde lassen sich
    ansehen, aber nicht beheben oder markieren.“). Den Bericht kann man lesen, seine Schritte nicht starten. Bei einem
    anderen als dem geöffneten Stammbaum öffnet eine Behebung oder Markierung zuerst den Stammbaum.
  - **Ab App 3.27.0:** der Schweregrad, der früher „Warnung“ hieß, heißt **zu prüfen**, auch in Zusammenfassungen
    und Zählungen. Die Ansicht Tabelle zeigt Befunde direkt in den Zellen und einen als **Kein Fehler** markierten
    Befund als **ungewöhnlich** ([A6.7.5](A6-views.md#A6.7.5)).
  - **Ab App 3.27.0:** der Abschnitt der Fehler und Befunde zu prüfen heißt **Zu prüfen** (früher **Probleme**). Ein
    Stammbaum ohne sie hat „Nichts zu prüfen“, mit Hinweisen „Nichts zu prüfen. 3 Hinweise.“
  - **Ab App 3.28.0:** in **Zu prüfen** steht die Gruppe **Gemeinsame Ereignisse**: Kopien eines gemeinsamen
    Ereignisses, deren gemeinsame Angaben abweichen, mit **Angleichen…** und **Abweichende Kopie abtrennen**
    ([A10.3](A10-shared-events.md#A10.3)).
  - **Ab App 3.33.0:** Fehler haben einen eigenen Unterabschnitt **Fehler**. In **Zu prüfen** bleiben die Befunde zu
    prüfen.
- **Bedienung:** **Stammbaum-Überblick → Datenqualität → Stammbaum-Prüfung** ([A5.8](#A5.8)): **Stammbaum prüfen…**
  (nur im geöffneten Stammbaum) und **Bericht ›** (der letzte Bericht des ganzen Stammbaums). Direkt zu **Fehler in
  den Daten** führen **Schnellaktionen → Fehler in den Daten ›**, die Zeile „n Hinweise ›“ in **Konsistenz** (nur
  **Hinweise**) und die Karte mit Fehlern in **Worauf achten**. Person und Linie prüfen: [A5.1.2](#A5.1.2).
  Ab App 3.27.0 auch **Datenqualität ›** in der Blase eines Befunds in der Ansicht Tabelle: öffnet **Fehler in den
  Daten** bei der Gruppe dieses Befunds (bei einem als **Kein Fehler** markierten Befund bei der Liste der markierten).
  Nach einem Import und nach dem Zusammenführen: [A5.4](#A5.4).
- **Gilt seit:** App 1.0.0; Abschnitte **Probleme** und **Hinweise** App 3.17.0; Bezeichnung **zu prüfen** und
  Verweis aus der Ansicht Tabelle App 3.27.0; Abschnitt **Zu prüfen** und „Nichts zu prüfen“ App 3.27.0; die
  **Stammbaum-Prüfung** mit Bericht und der Unterabschnitt **Fehler** App 3.33.0 (früher ein Dialog ohne Bericht)

<!-- zdroj: app:src/validation.ts:83 validateTreeData, :1370 groupValidationIssues · strings.ts treeManager.valProblems, valLeads, leadsIntro, valReadOnly, valShowMore · 3.27.0: app:59a8eed0 strings.ts treeManager.validationWarnings „k ověření“, summaryErrors, summaryNoErrors, treeOverview.countWarnings · src/ui/table-view/table-bubble.ts (Kvalita dat ›) · table.sev.* · commit e530019b · „K ověření“: strings.ts treeManager.valProblems, commit 79764eba; „Nic k ověření“: validationPassed, summaryLeadsOnly, commit b1cbe546 (T54 G15) · 3.33.0: app:988b0f86 src/tree-health.ts buildBuiltinReport, healthSummary · src/ui/tree-health-ui.ts openTreeHealthReport (validateTreeData při každém otevření, storeHealthReport), oddíly secSummary…secCompare, holdsParts · src/ui/tree-health-errors-ui.ts (LONG_GROUP 50, GROUP_STEP, isPhone 640 px, chipy filterAll/filterErrors/filterWarnings/filterLeads, pododdíly error/warning/trace, nothingToCheck) · src/ui/tree-overview.ts health, health-report, validation, validation-leads · strings.ts health.* · CHANGELOG.cs.md 3.33.0 „Kontrola stromu“ · commity 2ecf9e43, 1b446bf4 -->

<a id="A5.1.1"></a>
### A5.1.1 Behebung mit einem Klick

Manche Befunde haben die Schaltfläche **Beheben**; die Zusammenfassung über den Befunden hat **Alle beheben (n)** für
alle Befunde, die sich beheben lassen. Eine Behebung ist ein Schritt zurück („eine Reparatur aus der
Stammbaum-Prüfung“) und wird im Änderungsverlauf erfasst.

- Unter **Alle beheben (n)** steht, was behoben wird, mit Anzahlen, nur für die Arten, die der Stammbaum hat:
  „Behoben wird: beschädigte Verknüpfungen zwischen Personen und Partnerschaften (2); Partnerschaft einer Person mit
  sich selbst – wird gelöscht (1); doppelte Partnerschaft – wird mit der ersten zusammengeführt, Kinder bleiben (1);
  ein Ort, verschieden geschrieben – wird auf die häufigste Schreibweise vereinheitlicht (3). Andere Befunde bleiben
  unverändert.“ In einem schreibgeschützten Stammbaum gibt es weder die Schaltfläche noch die Zeile.
- **Ab App 3.33.0:** **Beheben** und **Alle beheben (n)** stehen im Abschnitt **Fehler in den Daten** des Berichts;
  der Schritt zurück heißt „eine Reparatur aus der Stammbaum-Prüfung“ (früher „eine Prüfungsreparatur“).

| Befund | Was die Behebung tut |
|---|---|
| Verweis auf nicht vorhandenen Datensatz, Beteiligter ohne Person | entfernt den Verweis |
| Elternteil fehlt Verweis auf das Kind, Kind auf die Eltern, Person auf die Partnerschaft | ergänzt den fehlenden Verweis (Eltern nur bei einem Kind mit weniger als 2 Eltern) |
| Partnerschaft mit sich selbst | entfernt sie |
| Doppelte Partnerschaft | behält die erste, überträgt die Kinder auf sie |
| Ein Ort auf mehrere Arten geschrieben | schreibt alle Schreibungen auf die häufigste um |

- **Gilt seit:** App 1.1.0; Behebung von Orten 1.10.0; die Zeile unter **Alle beheben (n)** App 3.27.0

<!-- zdroj: app:src/data.ts:4071 FIXABLE_TYPES, :4097 repairValidationIssue · strings.ts treeManager.valFix, valFixAll · řádek: src/ui/tree-stats.ts fixAllNoteText (orphaned*/missing* → links, selfPartnership, duplicatePartnership, placeSpelling), strings.ts treeManager.valFixAllNote, jen bez ro, commit 79764eba (T54 G15) · 3.33.0: app:988b0f86 src/ui/tree-health-errors-ui.ts validation-fix-all-btn, fixAllNoteText · strings.ts undo.repairedIssue „oprava z Kontroly stromu“ -->

<a id="A5.1.2"></a>
### A5.1.2 Umfang und wo die Prüfung startet

**Stammbaum prüfen…** öffnet die Wahl **Stammbaum-Prüfung**: den Namen des Stammbaums, die Zahl der Personen (bei
einem Stammbaum aus der Forschung „· Forschung verbunden“), **Umfang** und die Liste **Eingebaute Prüfungen**
(„Immer aktiv, ohne KI, kostenlos, sofort.“). **Bericht erstellen** startet die Prüfung und öffnet den Bericht.

| Umfang | Was die Prüfung durchgeht |
|---|---|
| **Ganzer Stammbaum** | den ganzen Stammbaum (Vorgabe) |
| **Linie ▾** („Linie wählen“) | die Person einer Linie der Forschung und ihre Vorfahren oder ihre Nachkommen; bei einer Linie einer Person die Person, ihre Eltern, Kinder und Partner |
| **Person ▾** („Person für die Prüfung wählen“) | eine Person |

- **Grenzen:**
  - **Linie ▾** gibt es nur bei einem Stammbaum aus der Forschung, die Linien hat und gerade läuft. **Person ▾** geht
    nur im geöffneten Stammbaum, nicht im Ansichtsmodus.
  - Ein engerer Umfang engt **Fehler in den Daten**, **Vollständigkeit und Belege** und die Zahl der Personen ein.
    **Struktur**, **Datensicherheit** und **Zu bestimmende Orte** bleiben für den ganzen Stammbaum. Zeilen der
    Forschung für den ganzen Stammbaum tragen „ganzer Stammbaum“ ([A5.1.4](#A5.1.4)).
  - Eine Linie, deren Person der Stammbaum nicht kennt, wird als ganzer Stammbaum geprüft.
  - Eine Person ohne Forschungsnummer (P…) hat keine Zeilen der Forschung.
- **Bedienung:**
  - **Stammbaum-Überblick → Datenqualität → Stammbaum-Prüfung → Stammbaum prüfen…**;
  - im Menü der Person **Person prüfen…** (Umfang **Person**);
  - auf der Personenseite im Abschnitt der Forschung **Prüfung der Person ›** mit „zuletzt am 12.3.2025“, wenn die
    Person schon einen Bericht hat (Umfang **Person**);
  - im Menü **⋯** einer Linie **Linie prüfen…** (Umfang **Linie**).
  - **Person prüfen…** und **Prüfung der Person ›** gibt es nur bei einem Stammbaum aus der Forschung und nicht im
    Ansichtsmodus. **Person prüfen…** fehlt bei einer Platzhalterperson. Die gespeicherte Personenseite hat die Zeile
    nicht.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:988b0f86 src/ui/tree-health-dialog-ui.ts openTreeHealthDialog, healthDialogHtml (seg tree/line/person, line jen meta.research && treeLines, person disabled !active, builtinsTitle, builtinsNote, dlgSub), healthCheckAgain · src/ui/tree-health-ui.ts scopePeople, healthFacts (people → errors, noSource, persons) · src/tree-health.ts healthSourcesFor (narrowing errors, evidence, ancestors) · src/research-health.ts healthBuiltinScopeParam (person:P…, line:G…) · src/ui/research-directions-ui.ts directionPersonIds, directionHealthItem · src/ui/context-menu.ts menuPerson · src/ui/card-signals-ui.ts · src/ui/person-page-ui.ts health:person, pageRow, pageLast · strings.ts health.scopeLabel, segTree, segLine, segPerson, pickLine, pickPerson, menuPerson, menuLine, pageRow, createReport · commit 1b446bf4 -->

<a id="A5.1.3"></a>
### A5.1.3 Eingebaute Prüfungen und empfohlene Schritte

Die eingebauten Prüfungen der App laufen immer. Jede hat im Bericht eine Zeile; wo sie etwas fand, gibt sie einen
empfohlenen Schritt.

| Prüfung | Zeile im Bericht | Empfohlener Schritt · Schaltfläche |
|---|---|---|
| **Fehler in den Daten** | Anzahlen („… (ohne „kein Fehler“)“), **Fehler in den Daten ›** | „3 Fehler in den Daten“ · **Fehler zeigen**; nur Fehler, keine Befunde zu prüfen und Hinweise |
| **Vollständigkeit und Belege** | „ohne Quelle 12 von 80 Personen“, **Datenqualität ›** | „12 Personen ohne Quelle“ · **Im Stammbaum zeigen** |
| **Struktur** | die Zahl der nicht verbundenen Teile, **Struktur ›** | „Nicht verbundene Teile: 2“ · **In Familien aufteilen** |
| **Datensicherheit** | „Sicherungsdatei am 4.2.2025“, „noch nicht in einer Datei gespeichert“ oder „auf diesem Gerät unbekannt“ | „Der Stammbaum ist seit 40 Tagen nicht in einer Datei gespeichert“ · **Sicherung speichern** |
| **Abdeckung der Vorfahren** | „ab Jan Horák: Urgroßeltern 5 von 8 bekannt“, „ab Jan Horák: keine bekannte Generation mit Lücke“ oder „keine Person gewählt“, **Vorfahren ›** | „Großeltern (Jan Horák): 3 von 4 bekannt“ · **Vorfahren zeigen** |
| **Zu bestimmende Orte** | die Zahl der Orte ohne Lage oder „jeder Ort hat eine Lage“, **Orte ›** | „4 Orte ohne Lage“ · **Orte bestimmen** |

- **Grenzen:**
  - **Datensicherheit** gibt einen Schritt ab 30 Tagen ohne Speichern in eine Datei, und nur wenn der Stammbaum
    ungespeicherte Änderungen hat. Die Tage zählen ab dem letzten Speichern in eine Datei, sonst ab dem Anlegen des
    Stammbaums. Im Ansichtsmodus ist der Stand unbekannt.
  - **Abdeckung der Vorfahren** sucht die erste Generation, in der Vorfahren fehlen, ab der Person im Fokus des
    geöffneten Stammbaums, sonst ab der Startperson. Der Schritt gilt nur bis zu den Urgroßeltern (3. Generation).
  - Reihenfolge der Schritte: zuerst die Datensicherheit, dann was die Forschung bremst, dann die Verlässlichkeit,
    zuletzt das Wachstum des Stammbaums: Sicherung · Linie steht · alte Anfragen · Entscheidungen · leere
    Warteschlange · Fehler in den Daten · Strom-Korrekturen · Abgleich einer Linie · Konsistenz der Forschung ·
    Personen ohne Quelle · Enden der Zweige · Materialien · Vorfahren · Orte · nicht verbundene Teile. Die Schritte
    der Forschung beschreibt [A5.1.4](#A5.1.4).
  - Gezeigt werden die ersten 10 Schritte, weitere hinter „und 4 weitere Schritte ›“.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:988b0f86 src/tree-health.ts HEALTH_BACKUP_DAYS 30, HEALTH_STEPS_SHOWN 10, ANCESTOR_STEP_MAX_GEN 3, STEP_ORDER, buildBuiltinReport, healthSteps (errors jen report.errors.errors) · src/ui/tree-health-ui.ts healthFacts (fileCopyAt ?? createdAt, hasUnsavedChanges, isViewMode → null, ancestorGenerations, collectPlaces), rootOf (focus, defaultPersonId) · strings.ts health.src*, step*, link*, moreSteps · commit 2ecf9e43 -->

<a id="A5.1.4"></a>
### A5.1.4 Zeilen und Schritte der Forschung

Bei einem Stammbaum aus der Forschung, die läuft und es kann, fügt die Forschung dem Bericht eigene Zeilen und
Schritte hinzu. Die App fragt sie bei jeder Prüfung danach und wartet höchstens 4 s.

| Zeile | Was sie zeigt |
|---|---|
| **Sicherheit der Forschungsangaben** | „8 Angaben zu bestätigen“ / „alles bestätigt“ |
| **Ausstehend und Prüfung der Aufgaben** | Anfragen, die vor über 30 Tagen gesendet wurden, und Aufgaben mit Prüfbefund / „nichts Altes“ |
| **Linien und Warteschlange** | Linien, wie viele stehen, offene und zurückgestellte Aufgaben der Warteschlange |
| **Strom-Korrekturen** | „2 warten“ / „keine wartet“ |
| **Abgleich mit Originalen** | Zitate ohne Seite und ohne Bild / „jedes Zitat hat Seite und Bild“ |
| **Entscheidungen** | „3 warten“ / „nichts wartet“ |
| **Enden der Zweige** | „6 nicht durchsucht“ / „alle durchsucht“ |
| **Material und Stapel** | unsortiert in Stapeln und ohne Person / „alles sortiert“ |
| **Konsistenz der Forschung** | Fehler und Warnungen von `strom check` / „keine Probleme“ |
| **Wachstum des Stammbaums** | „in 30 Tagen +12 Personen, +40 Angaben, +9 Quellen“ |

| Schritt der Forschung | Warum | Schaltfläche |
|---|---|---|
| „Die Linie Horákovi steht“ | „Keine Aufgabe der Linie bewegt sich.“ | **Agent an der Linie arbeiten lassen**; hat die Linie wartende Aufgaben, **Öffnen** |
| „2 Anfragen vor über 30 Tagen gesendet, ohne Antwort“ | „Eine Antwort kann per Post oder E-Mail gekommen sein.“ | **Antwort eintragen** |
| „3 Sachen warten auf eine Entscheidung“ | „Hypothesen, Widersprüche und Importe, die die Forschung nicht allein entscheidet.“ | **Öffnen** |
| „Die Warteschlange der Forschung ist leer“ | „Der Agent hat nichts zu tun.“ | **Forschung öffnen** |
| „2 Strom-Korrekturen warten“ | „Korrekturen der Stammbaumdaten, die die Forschung anbietet.“ | **Korrektur starten** |
| „5 Angaben mit dem Original abzugleichen · Linie“ | „Angaben aus Indizes, nicht aus dem Originaleintrag.“ | **Linie abgleichen** |
| „Konsistenz der Forschung: 2 Probleme“ | „Die eigene Prüfung der Forschung fand Einträge, die nicht zusammenpassen.“ | **Forschung öffnen** |
| „6 Zweigenden nicht durchsucht“ | „Personen am Ende eines Zweigs, deren Einträge noch nicht gesucht wurden.“ | **Neue Linie** |
| „4 Materialien nicht sortiert“ | „Dateien und Stapel ohne Person.“ | **Materialien öffnen** |

- **Grenzen:**
  - Eine Linie steht, wenn sie aktiv ist und keine Aufgabe in der Warteschlange hat. Eine leere Warteschlange ist nur
    bei einer aktiven Linie ein Schritt.
  - Die Forschung schickt höchstens 10 Schritte. Eine stehende Linie, alte Anfragen, Entscheidungen und eine leere
    Warteschlange kommen auch in **Was das Wachstum bremst** (**Empfohlene Schritte ›**).
  - In einem engeren Umfang gelten **Strom-Korrekturen**, **Material und Stapel**, **Konsistenz der Forschung** und
    **Wachstum des Stammbaums** für den ganzen Stammbaum (die Zeile trägt „ganzer Stammbaum“).
  - Ein Archiv und die Beispielforschung haben keine Linien, Warteschlange, Anfragen, Abgleich von Linien, Enden der
    Zweige und kein Warten von Aufgaben.
  - Ohne Zeilen der Forschung sagt die Wahl, warum: „Die eigenen Prüfungen der Forschung kommen mit einer neueren
    Strom-Forschung.“ (die Forschung kann es nicht), „Die eigenen Prüfungen der Forschung fehlen: Die Forschung läuft
    gerade nicht.“, bei einem Stammbaum ohne Forschung „Weitere eingebaute Prüfungen kommen mit einem verbundenen
    Strom Research.“
  - Läuft die Forschung nicht, ist die Schaltfläche eines Schritts der Forschung ausgeschaltet („Die Forschung läuft
    gerade nicht.“). Nach einem Import geht die Prüfung nicht an die Forschung.
- **Bedienung:** Terminal `strom health` ([A5.9](#A5.9)); Verbindung mit der Forschung
  [S1](S1-connecting-app-and-research.md).
- **Gilt seit:** App 3.33.0 (Forschung 1.38.0)

<!-- zdroj: app:988b0f86 src/research-health.ts HEALTH_FEATURE 'health', researchHealthRows (wholeTree fixes, material, consistency, growth), healthBuiltinScopeParam (import → null), HEALTH_BUILTIN_TIMEOUT_MS 4000, fetchResearchHealthBuiltin GET /health/builtin, parseResearchHealthBuiltin steps.slice(0, 10) · src/ui/tree-health-ui.ts healthResearchPart (none/off/old/ok), researchStepRow (actWork/actOpen…), researchOff · src/ui/tree-health-dialog-ui.ts builtinsMore, builtinsWhyOld, builtinsWhyOff · strings.ts health.srcConfirm…srcGrowth, stepLineStuck…stepMaterial, act* · research:d8742230, 3f541f54, 818a015b src/core/health.ts builtin, stepsOf (stuck = active && queued 0, queue-empty jen s aktivní linií, archive), SENT_OLD_DAYS 30, STEPS_MAX 10 · src/core/live.ts GET /health/builtin, BRIDGE_FEATURES health · CHANGELOG.cs.md 1.38.0 „Kontrola stromu“ -->

<a id="A5.1.5"></a>
### A5.1.5 Ältere Berichte, Drucken und HTML speichern

Der Bericht liegt in den Daten des Stammbaums und geht so auch in die Sicherung und in JSON. Der Stammbaum hält den
neuen Bericht und einen davor.

- **Grenzen:**
  - Abgelegt wird er nur beim geöffneten Stammbaum, der nicht schreibgeschützt ist. Sonst sagt die Fußzeile des
    Berichts „Der Bericht wird nicht gespeichert: Der Stammbaum ist schreibgeschützt oder nicht geöffnet.“ Das
    Ablegen hat keinen Schritt zurück.
  - **Seit der letzten Prüfung** vergleicht den Bericht mit dem letzten Bericht desselben Umfangs: „Letzte Prüfung am
    4.2.2025: Fehler 3 → 1, zu prüfen 5 → 5, Hinweise 2 → 4, 1 neuer Schritt, 2 Schritte entfallen.“, „… keine
    Änderung.“ oder „Dies ist die erste Prüfung.“
  - **Ältere Berichte ▾** zeigt die abgelegten Berichte („4.2.2025 · ganzer Stammbaum · eingebaut · 3 empfohlene
    Schritte“), sonst „Kein älterer Bericht.“ Ein älterer Bericht hat seine Schritte nur zum Lesen („Ein älterer
    Bericht vom 4.2.2025; der aktuelle Stand kann anders sein.“) und zeigt keine Fehler in den Daten („Die Fehler in
    den Daten eines älteren Berichts werden nicht aufbewahrt; eine neue Prüfung zeigt die aktuellen.“).
  - Daten im Bericht stehen ohne Jahr, wenn sie aus diesem Jahr sind („12.3.“).
  - **HTML speichern** speichert die Datei „Stammbaum-Prüfung – Horákovi – 2026-03-12.html“ ohne Schaltflächen und
    mit allen Abschnitten aufgeklappt. Die Namen lebender Personen ersetzt sie durch „…“ und fügt „Lebende Personen
    sind nach den Einstellungen der Ausgaben verborgen.“ hinzu. Wer eine lebende Person ist:
    [S11.1](S11-protecting-living-people.md#S11.1).
- **Bedienung:** in der Kopfzeile des Berichts **Ältere Berichte ▾**, **Drucken**, **HTML speichern**, **Erneut
  prüfen…** (ein Bericht nach einem Import wird erneut als ganzer Stammbaum geprüft); auf dem Telefon im Menü **…**.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:988b0f86 src/tree-health.ts keepHealthReports (nová + jedna před ní), sameScope, compareReports, sanitizeHealthReports · src/data.ts storeHealthReport (bez undo) · src/ui/tree-health-ui.ts healthDay (letos bez roku), stored, older (at > 0), olderNote, olderErrors, footStored, footNotStored · src/ui/tree-health-dialog-ui.ts openOlderHealthReports, saveHealthReportHtml (fileName, PERSON_PAGE_DEFAULT_PRIVACY, isLivingPerson, livingHidden, saved), healthCheckAgain (import → tree), moreActs · strings.ts health.olderReports, olderRow, olderNone, print, saveHtml, checkAgain, compareLine, compareSame, firstCheck · commit 1b446bf4 -->

<a id="A5.2"></a>
## A5.2 Verbindungen in der Familie

Die Prüfung sucht Verbindungen, die nicht gelten können. Alle sind Fehler, außer der doppelten Partnerschaft
(zu prüfen).

| Befund in der App | Wann |
|---|---|
| **Vorfahrenzyklus erkannt** | eine Person ist ihr eigener Vorfahr; gemeldet wird nur der erste Zyklus |
| **Partnerschaft mit sich selbst** / **Doppelte Partnerschaft** | der Partner ist dieselbe Person / zwei Partnerschaften desselben Paares |
| **Elternteil fehlt Kindverweis**, **Kind fehlt Elternverweis**, **Partnerschaft-Kind-Abweichung** | die Verbindung ist nur von einer Seite erfasst |
| **Verweis auf nicht vorhandenen Datensatz** | Elternteil, Kind, Partner oder Partnerschaft fehlt |
| **Ereignisbeteiligter verweist auf eine nicht mehr vorhandene Person** | Pate oder Zeuge (auch Trauzeuge) ist eine gelöschte Person |
| **Mehr als 2 Eltern** | |
| **Person in mehreren Generationen** | das Zählen der Generationen stößt auf einen Widerspruch; der Partner ist in derselben Generation |
| **Partner ist auch Elternteil / Kind**, **Geschwister ist auch Elternteil / Kind** | |

- **Gilt seit:** App 1.0.0; Ereignisbeteiligter 1.16.0

<!-- zdroj: app:src/validation.ts:142 checkCycles, :200, :223, :255, :293, :346-464 orphaned*, :471 tooManyParents, :554 generationConflict, :621 · strings.ts treeManager.val* -->

<a id="A5.3"></a>
## A5.3 Daten und Alter

Die Prüfung meldet nur, was sicher nicht gilt. Ein unvollständiges oder ungefähres Datum rechnet sie im ganzen
möglichen Bereich: ohne Monat Januar bis Dezember, „um“ ± 2 Jahre, „vor“ bis 20 Jahre früher, „nach“ bis 20 Jahre
später, ein Zeitraum bis zu seinem Ende. Erst wenn der Verstoß im ganzen Bereich gilt, ist es ein Befund. Eine
Ausnahme sind die milderen Grenzen zu prüfen ab App 3.27.0 (unten): dort genügt es, wenn ein Ende des möglichen Alters
die Grenze überschreitet.

| Befund in der App | Schweregrad | Wann |
|---|---|---|
| **Sterbedatum liegt vor dem Geburtsdatum** | Fehler | |
| **Unplausibel lange Lebensdauer** | zu prüfen | mehr als 115 Jahre |
| **Elternteil jünger als Kind** | Fehler | nach dem Geburtsdatum |
| **Elternteil bei Geburt sehr jung / sehr alt** | zu prüfen | unter 12 / über 80 Jahre; nur Geburtsdaten |
| **Mutter bei der Geburt unter 16** / **… über 45** | zu prüfen | ab App 3.27.0, siehe unten |
| **Vater bei der Geburt unter 18** / **… über 60** | zu prüfen | ab App 3.27.0, siehe unten |
| **Ereignis vor der Geburt datiert** | zu prüfen | |
| **Ereignis nach dem Tod datiert** | zu prüfen | außer: Beerdigung, Einäscherung, Testament, Nachlassverfahren |
| **Kind nach dem Tod der Mutter geboren** | Fehler | mehr als 1 Monat nach dem Tod; nur leibliche Eltern |
| **Kind lange nach dem Tod des Vaters geboren** (… **eines Elternteils**, Geschlecht unbekannt) | zu prüfen | mehr als 10 Monate |
| **Hochzeit vor der Geburt eines Partners datiert** | Fehler | |
| **Hochzeit nach dem Tod eines Partners datiert** | zu prüfen | |
| **Als Kind verheiratet** | zu prüfen | unter 14 Jahren |
| **Heirat unter 16 Jahren** | zu prüfen | ab App 3.27.0, siehe unten |
| **Eingetragenes Alter weicht um mehr als 2 Jahre ab** | zu prüfen | ab App 3.27.0, siehe unten |
| **Extremer Altersunterschied zwischen Partnern** | Info (**Hinweise**) | 40 Jahre und mehr |
| **Geburt/Tod als Lebensereignis erfasst** | Fehler | Geburt oder Tod in der Liste der Ereignisse |
| **Eigenes Ereignis hat keine Bezeichnung** / **Ereignis hat ein ungültiges Datum** | zu prüfen | |

- **Grenzen:** dieselben Ausnahmen nach dem Tod hat `strom check` der Forschung. Ein Elternteil ohne Art der
  Beziehung zählt als leiblich.
- **Ab App 3.27.0:** mildere Grenzen zu prüfen:
  - **Mutter** jünger als 16 oder älter als 45 und **Vater** jünger als 18 oder älter als 60 Jahre bei der Geburt
    des Kindes. Nur ein leiblicher Elternteil mit bekanntem Geschlecht, das Alter aus beiden Geburtsdaten;
  - **Heirat** im Alter unter 16 Jahren;
  - es genügt, wenn ein Ende des möglichen Alters die Grenze überschreitet (ein Alter „15–16“ liegt unter 16). Ein
    Datum mit **um** zählt als Schätzung des Alters; ein Datum mit **vor** oder **nach** wird nicht verglichen;
  - gemeldet wird nur der strengere Befund: wo schon **Elternteil jünger als Kind**, **Elternteil bei Geburt sehr
    jung / sehr alt** oder **Als Kind verheiratet** gilt, gibt es den milderen Befund nicht;
  - das **eingetragene Alter** (bei der Heirat das Alter jedes der beiden, beim Tod, bei der Geburt) wird mit dem Alter
    aus dem Geburtsdatum und dem Datum des Ereignisses verglichen. Ein Befund ist es, wenn es um mehr als 2 Jahre
    außerhalb des möglichen Bereichs liegt. Ein in Worten oder mit um, vor, nach eingetragenes Alter wird nicht
    verglichen, auch nicht, wenn eines der Daten nur eine Schätzung ist;
  - die Zeile des Befunds zeigt Daten und Alter („* 1850 → * 1866: 15–16“, „⚭ 1872: 30 ≠ 26–27“).
- **Gilt seit:** App 1.0.0 (Alter der Eltern); 1.4.0 (Ereignisse); 1.7.0 (Daten und Tod); Kind nach dem Tod eines
  Elternteils unbekannten Geschlechts 3.10.0; vier Ausnahmen nach dem Tod 3.17.0 (vorher nur Beerdigung); mildere
  Grenzen für das Alter der Eltern und bei der Heirat und das eingetragene Alter 3.27.0

<!-- zdroj: app:src/validation.ts:493 checkAgePlausibility MIN_PARENT_AGE MAX_PARENT_AGE, :863 checkDateConsistency MAX_LIFESPAN_YEARS CHILD_MARRIAGE_YEARS PARTNER_AGE_GAP_YEARS POSTHUMOUS_FATHER_MONTHS AFTER_DEATH_EVENT_TYPES, :120 checkLifeEvents · monthRange, certainlyBefore · research:src/core/afterdeath.ts AFTER_BY_NATURE · strings.ts treeManager.val* · 3.27.0: app:59a8eed0 src/validation.ts MOTHER_MIN_AGE 16, MOTHER_MAX_AGE 45, FATHER_MIN_AGE 18, FATHER_MAX_AGE 60, checkParentAgeLimits (gender female/male, parentRelTypes biological, jen když není parentYoungerThanChild/parentTooYoung/parentTooOld), ageSpan (< > → null; ~ approxAgeBetween), spanText, MARRIAGE_MIN_YEARS 16 (else za childMarriage), checkRecordedAges SLACK_YEARS 2 (Partnership.ages, deathAge, birthAge), src/dates.ts recordedAgeGap, ageRangeBetween · strings.ts treeManager.valMotherTooYoung16, valMotherTooOld45, valFatherTooYoung18, valFatherTooOld60, valMarriageUnder16, valRecordedAgeMismatch, validationWarnings, countWarnings, summaryErrors · spec 073 §7.6 · CHANGELOG.cs.md 3.27.0 -->

<a id="A5.4"></a>
## A5.4 Quellen, Anhänge und Verschmelzung beim Import

| Befund in der App | Schweregrad | Wann |
|---|---|---|
| **Zitat verweist auf eine fehlende Quelle** | zu prüfen | Zitation bei einer Person, einem Ereignis, einer Partnerschaft oder einem Anhang |
| **Anhang hat keine verwendbaren Daten** | zu prüfen | die Daten sind weder Bild noch PDF (ein Anhang nur mit Original wird nicht gemeldet) |
| **Foto ist kein unterstütztes Bild** | zu prüfen | ein anderes Format als JPEG, PNG, WebP, GIF |
| Wahrscheinlich zwei Personen, die beim Import einer GEDCOM-Datei zu einer verschmolzen sind (Strom 3.8.1 und älter) … | Fehler | siehe unten |

Ältere Versionen konnten beim Import zwei Personen dieselbe ID geben. Die Prüfung meldet das bei einem klaren
Zeichen (mehr als 2 Eltern, eine Person ist selbst ihr Elternteil, Kind oder Partner) oder wenn ein Kind früher als
12 Jahre nach dem Elternteil geboren ist und dazu Eltern oder Partner desselben Geschlechts vorliegen. Eltern
desselben Geschlechts allein ergeben keinen Befund. Die Lösung steht im Text des Befunds: die ursprüngliche Datei
erneut als neuen Stammbaum importieren.

- **Gilt seit:** App 1.7.0 (Quellen und Anhänge); 3.0.0 (Fotos); 3.9.0 (Verschmelzung beim Import)
- **Ab App 3.33.0:** die Prüfung nach einem Import und nach dem Zusammenführen ist der Bericht
  **Stammbaum-Prüfung** (früher die Frage „Datenprüfung“):
  - eine Datei aus einem anderen Programm mit der Karte **Wie weiter**: Die Karte hat die Zeile **Stammbaum-Prüfung**
    („3 Dinge zum Ansehen gefunden. Nichts wird von selbst korrigiert.“ oder „Die Stammbaum-Prüfung fand im Import
    nichts zu prüfen.“) mit **Bericht öffnen** ([S6.4](S6-tree-from-another-program.md#S6.4));
  - ein anderer Import: Der Bericht **Was der Import hinzufügte** öffnet sich direkt bei **Fehler in den Daten**.
    Findet die Prüfung nichts, erscheint nur die Meldung „Die Stammbaum-Prüfung fand im Import nichts zu prüfen.“ mit
    **Bericht ›** (8 s). Nach dem Schließen des Berichts fragt die App gegebenenfalls nach dem Aufteilen in Familien;
  - der Bericht nach einem Import geht den ganzen Stammbaum durch. An die Forschung geht er nicht;
  - Zusammenführen: **Stammbaum prüfen** im letzten Schritt des Assistenten und im Verlauf der Zusammenführungen
    öffnet den Bericht **Was die Zusammenführung hinzufügte** mit den hinzugefügten und verbundenen Personen und
    **‹ Zurück zur Zusammenführung** ([A8.11](A8-merging-trees.md#A8.11)).

<!-- zdroj: app:src/validation.ts:982 checkSourceIntegrity, checkPhotoData, :1199 checkImportMerges · strings.ts treeManager.valCitationMissingSource, valAttachmentNoData, valPhotoUnsafeData, valImportMerge · 3.33.0: app:988b0f86 src/ui/import-export.ts afterImport (offerImportNextCard, path merge, openTreeHealthReport section errors, quietWhenClean, scope import bez personIds, offerPostImportSplit) · src/ui/tree-health-ui.ts quietWhenClean → importClean 8000 ms, action report · src/ui/import-next-ui.ts řádek check (checkFound, checkClean, openReport) · src/research-health.ts healthBuiltinScopeParam (import → null) · src/merge/ui.ts:1786, src/ui/merge-history-ui.ts:173 scope import merge personIds added + joined, backToMerge · strings.ts health.scopeImport, scopeMerge, importClean, openReport, treeManager.postImportCheckTitle, importNext.checkFound, checkClean · commit ea094193 -->

<a id="A5.5"></a>
## A5.5 Hinweise: Paten und Schreibungen von Orten

**Hinweise** sind keine Fehler. Sie zeigen, wo eine Verwandtschaft oder eine uneinheitliche Schreibung liegen kann.

- **Ein Pate, der immer wieder auftaucht — oft ein Verwandter:** derselbe Pate oder Zeuge ist bei Ereignissen von
  mindestens 2 Personen, die miteinander nicht verwandt sind, und diese Personen gehören zu mindestens 2
  Geschwistergruppen. Die Zeile zeigt, bei wie vielen Ereignissen und Personen.
  Beispiel: Marie Vlková ist Patin der Kinder der Horáks und der Kinder ihrer Nachbarn.
- **Ein Ort auf mehrere Arten geschrieben:** Schreibungen, die sich nur in Groß- und Kleinschreibung, Diakritik oder
  einem Punkt oder Komma unterscheiden, z. B. „Brno“ und „brno.“. Die Zeile zeigt jede Schreibung mit ihrer Anzahl;
  die Behebung steht in [A5.1.1](#A5.1.1).
- **Grenzen:** Verwandte sind Personen höchstens 3 Schritte über Eltern, Kinder und Partner entfernt. Gezählt werden
  Beteiligte an Ereignissen der Person, Trauzeugen und Beteiligte an gemeinsamen Ereignissen des Paares. In den
  **Hinweisen** steht auch der Altersunterschied der Partner ([A5.3](#A5.3)).
- **Gilt seit:** App 1.10.0 (Orte); 1.16.0 (Paten); Geschwistergruppen und Amtspersonen 3.17.0
- **Ab App 3.28.0:** in den **Hinweisen** stehen noch:
  - dasselbe Ereignis, bei mehreren Personen getrennt eingetragen, mit **Zu einem Ereignis verbinden** oder
    **Einzeln durchgehen** ([A10.4](A10-shared-events.md#A10.4));
  - namentlich eingetragene Paten und Zeugen, denen eine Person im Stammbaum entspricht, mit **Einzeln durchgehen**
    ([A10.5.2](A10-shared-events.md#A10.5.2)).

<!-- zdroj: app:src/godparents.ts:42 RECURRING_THRESHOLD, :188 recurringParticipants, :270 siblingGroupCount, :300 godparentLeads · src/validation.ts:1034 checkPlaceSpellings, checkRecurringGodparents · strings.ts treeManager.valRecurringGodparent, valRecurringGodparentDetail, valPlaceSpelling, leadsSkipped -->

<a id="A5.5.1"></a>
### A5.5.1 Wie derselbe Pate erkannt wird

- Eine mit dem Stammbaum verbundene Person wird am Datensatz erkannt. Ein nur erfasster Name wird als Text verglichen,
  die Zeile hat dann „nach Namen abgeglichen“.
- Aus der Schreibung wird der Name bis zum ersten Komma, Kleinbuchstaben oder zur ersten Ziffer genommen. Titel und
  Anreden (kmotr, pan, Mgr. …) werden ausgelassen, Partikeln (von, de …) bleiben, Text in Klammern ist eine Notiz.
  Verglichen wird ohne Diakritik und ohne Groß- und Kleinschreibung.
- Der Name muss mindestens 2 Wörter haben. Ein Vorname allein stimmt nie überein.
- Nicht gemeldet wird, wer von Amts wegen beim Ereignis ist: der Trauende, die Hebamme und Geistliche (farář,
  kaplan, Pfarrer, parochus …). Ein als Pate erfasster Geistlicher wird gemeldet.

<!-- zdroj: app:src/godparents.ts:48 NAME_PARTICLES, :54 NAME_PREFIXES, :80 participantName, :117 CLERGY_WORDS, :121 MIDWIFE_WORDS, :134 attendsByOffice · strings.ts treeManager.valRecurringGodparentByName -->

<a id="A5.6"></a>
## A5.6 Mögliche doppelte Person

Zwei Personen sind möglicherweise dieselbe, wenn sie denselben Nachnamen und denselben Vornamen haben und in denselben
Jahren geboren sind. Verglichen wird ohne Groß- und Kleinschreibung und ohne Diakritik. Der Befund steht in den
**Hinweisen** in der Gruppe **Mögliche doppelte Person**.

- **Grenzen:**
  - Geburtsjahr: das Geburtsdatum; ohne es die Taufe (Jahr der Taufe oder das Jahr davor); ohne sie Tod oder
    Beerdigung mit dem Alter beim Tod. Stammen beide Jahre aus der Geburt, müssen sie sich überschneiden. Sonst
    dürfen sie 2 Jahre auseinanderliegen.
  - Fehlt der Vorname bei einer Person, genügen Nachname und Jahre.
  - Personen ohne Datum werden nur bei völlig gleichem Namen gepaart. Eine Person mit Datum wird nicht mit einer
    Person ohne Datum gepaart.
  - Nicht gemeldet werden: Platzhalter- und namenlose Personen, unvereinbares Geschlecht, Elternteil und Kind sowie
    Paare, bei denen eine Person sicher vor der Geburt (oder Taufe) der anderen gestorben ist.
- **Bedienung:** **Zwei verschiedene Personen** ([A5.7](#A5.7)); beim Urteil der Forschung **Zusammenführen…**
  ([A5.6.1](#A5.6.1)).
- **Gilt seit:** App 1.9.9; Jahre aus Taufe und Tod 3.17.0
- Das Zusammenführen zweier Personen eines Stammbaums ist etwas anderes als das Zusammenführen zweier Stammbäume
  oder der Import eines Stammbaums in einen Stammbaum ([A8](A8-merging-trees.md)): das führt ein Assistent, und es
  lässt sich zurücknehmen ([A8.12](A8-merging-trees.md#A8.12)).

<!-- zdroj: app:src/validation.ts:1084 birthYears, :1127 checkPossibleDuplicates STAND_IN_YEARS_SLACK · strings.ts treeManager.valGroupPossibleDuplicate, twoPeople · odkaz na A8: spec 134 (dokumentace „A5.6 odkaz“) -->

<a id="A5.6.1"></a>
### A5.6.1 Urteil der Forschung

Bei einem Stammbaum aus der Forschung fragt die App beim Öffnen der Prüfung die Forschung nach allen Paaren. Die
Prüfung wartet nicht auf die Antwort. Die Forschung bewertet nur Personen, die ihre Nummer haben (P…). Es entscheidet
die erste Regel, die gilt:

| Reihenfolge | Die Forschung hat festgestellt | Urteil in der App |
|---|---|---|
| 1 | sie kennt die Person nicht | keines |
| 2 | sie hat die Personen schon zusammengeführt | **In der Forschung zusammengeführt** |
| 3–9 | vom Menschen markierte zwei Personen; anderes Geschlecht; Elternteil und Kind; Geburt oder Taufe mehr als 3 Jahre auseinander; einer starb, bevor der andere geboren wurde; Geschwister (das zweite Kind erhielt den Namen des verstorbenen); andere Eltern | **Zwei Personen** |
| 10 | die Namen unterscheiden sich in der Forschung | **Unsicher** |
| 11–12 | dieselben Eltern und bekannte Jahre; derselbe Eintrag in einer Quelle bei beiden | **Wahrscheinlich dieselbe Person** |
| 13–14 | nahe Jahre und nichts weiter; bei einer Person kein Datum | **Unsicher** |

- **Grenzen:**
  - Paare mit dem Urteil **Wahrscheinlich dieselbe Person** und **In der Forschung zusammengeführt** rücken nach
    oben, dann **Unsicher**, dann ohne Urteil.
  - Paare **Zwei Personen** kommen beiseite in die Zeile **Von der Forschung unterschieden: n** und werden nicht
    gezählt.
  - Ein Urteil, das in eine offene Gruppe kommt, fügt nur ein Etikett hinzu. Neu eingeordnet wird erst beim nächsten
    Öffnen.
  - Unter der Gruppe steht **Die Forschung bewertet…** oder **Von der Forschung bewertet**. Läuft eine Forschung
    nicht, die bei der letzten Verbindung bewertet hat: „Ohne Bewertung der Forschung – die Forschung läuft nicht.“
    Eine Forschung, die nicht bewerten kann, wird nicht erwähnt.
- **Bedienung:** beim Urteil **Zusammenführen…** (Zusammenführen von Personen) oder **Neue Version laden** ·
  Terminal: `strom person compare P… P…`, für viele Paare `--pairs-from`. Verbindung mit der Forschung:
  [S1](S1-connecting-app-and-research.md).
- **Gilt seit:** App 3.17.0 (Forschung 1.22.0)

<!-- zdroj: app:src/duplicate-verdicts.ts:18 MAX_JUDGE_PAIRS, :54 issueResearchPair, :142 verdictRank, :154 verdictsMode, :192 verdictReasonText · src/quality-bridge.ts:172 postDuplicates · strings.ts treeManager.verdict*, reason* · research:src/core/duplicates.ts judge YEARS_CLOSE · src/core/live.ts:168-192 · src/commands/quality.ts person compare -->

<a id="A5.6.2"></a>
### A5.6.2 Hinweis beim Erfassen einer Person

Beim Erfassen einer neuen Person zeigt die App höchstens 3 ähnliche Personen („Ähnliche Personen existieren
bereits:“). Sie vergleicht anders als [A5.6](#A5.6): mit einem Ähnlichkeitswert wie beim Zusammenführen, nie mit
unvereinbarem Geschlecht.
- **Bedienung:** **Zur Person**, **Vorhandene verwenden** · ausschalten mit **Einstellungen → Hinweise →
  Duplikat-Vorschläge**.
- **Gilt seit:** App 1.4.0

<!-- zdroj: app:src/ui/duplicate-suggest.ts:22 MAX_SUGGESTIONS, :75 runDuplicateCheck · findSimilarPersons SIMILAR_PERSON_THRESHOLD · strings.ts duplicateSuggest.settingLabel, useExisting -->

<a id="A5.7"></a>
## A5.7 Kein Fehler

Ein Befund, der kein Fehler ist, wird markiert. Danach wird er nicht mehr gemeldet, auch wenn der Stammbaum erneut
geprüft wird.
Die Markierung ist eine Änderung des Stammbaums: sie hat einen Schritt zurück und einen Eintrag im Änderungsverlauf.
Bei einer möglichen doppelten Person heißt die Schaltfläche **Zwei verschiedene Personen**.

- **Grenzen:**
  - Denselben Befund erkennt die App an Art, Personen und Gegenstand. Gegenstand ist das Jahr bei einem Ereignis oder
    einer Hochzeit nach dem Tod, der Name bei einem Paten und die häufigste Schreibung bei einem Ort. Ändert sich
    etwas davon, erscheint der Befund wieder.
  - Bei einem Stammbaum aus der Forschung wird die Markierung an die Forschung gesendet, wenn alle Personen des
    Befunds eine Nummer der Forschung haben (höchstens 20 Personen). Die GEDCOM-Datei aus der Forschung trägt keine
    Markierungen; beim Laden einer neuen Version werden sie aus der alten Version des Stammbaums übernommen.
  - Die Forschung respektiert Markierungen bei einem Ereignis und einer Hochzeit nach dem Tod: `strom check` meldet
    sie nicht, und der Agent untersucht sie nicht.
  - Stand der Markierung: **An die Forschung gesendet**, **Wartet auf die Forschung** (die Forschung läuft nicht,
    gesendet wird bei der nächsten Verbindung), **Nur in der App** (die Forschung hat sie nicht angenommen oder die
    Personen haben keine Nummer; sie wird nicht erneut gesendet), **In der Forschung markiert**.
  - Eine Markierung bei einem Ort hat keine Personen, darum wird sie nicht an die Forschung gesendet. Beim Abtrennen
    eines Teils des Stammbaums bleiben nur Markierungen, deren Personen alle bleiben.
  - Eine in der Forschung erfasste Markierung kennt die App nur beim geöffneten Stammbaum aus der Forschung, wenn die
    Forschung läuft.
  - **Ab App 3.27.0:** Gegenstand ist bei **Heirat unter 16 Jahren** das Jahr der Heirat, bei **Eingetragenes Alter
    weicht um mehr als 2 Jahre ab** die Angabe (Geburt, Heirat, Tod) und bei einer Heirat ihr Jahr. Einen markierten
    Befund zeigt die Ansicht Tabelle als **ungewöhnlich**, und von dort lässt er sich auch markieren und
    wiederherstellen ([A6.7.5](A6-views.md#A6.7.5)).
- **Bedienung:** in der Zeile des Befunds **Kein Fehler** / **Zwei verschiedene Personen**, 6 s lang das Angebot
  **Rückgängig**. Die Liste **Als kein Fehler markiert: n** unter den Befunden (ab App 3.33.0 am Ende von **Fehler in
  den Daten** im Bericht [A5.1](#A5.1)), bei jeder Markierung das Datum oder

  **In der Forschung markiert**, Schaltfläche **Wiederherstellen** · Terminal: `strom quality list`,
  `strom quality dismiss possibleDuplicate P… P…`, `strom quality dismiss eventAfterDeath P… --subject 1861`,
  `strom quality undo …`. Die Markierung setzt nur der Mensch, nie der Agent.
- **Gilt seit:** App 3.17.0 (Forschung 1.22.0)

<!-- zdroj: app:src/validation.ts:1415 qualityFinding (3.27.0: marriageUnder16 rok, recordedAgeMismatch field + rok) · src/ui/table-view/table-bubble.ts · src/quality-dismiss.ts:47 sanitizeQualityDismissed, :152 dismissalFor, :186 dismissBody, mergeResearchMarks, carryOverTreeDecisions, dismissalsWithin · src/quality-bridge.ts:74 dismissReply · src/ui/quality-ui.ts:155 flushQuality, :257 readQualityMarks · src/data.ts:1674 dismissQualityFinding · src/ui/tree-stats.ts:104 DISMISS_TOAST_MS (3.33.0: app:988b0f86 src/ui/tree-health-errors-ui.ts DISMISS_TOAST_MS, qualityDismissedHtml) · strings.ts treeManager.notAnError, twoPeople, dismissedRow, sentToResearch, waitingForResearch, appOnly, markedInResearch · research:src/commands/quality.ts PERSON · src/core/afterdeath.ts -->

<a id="A5.8"></a>
## A5.8 Stammbaum-Überblick → Datenqualität

Der Abschnitt fasst die Prüfung und die Vollständigkeit des Stammbaums zusammen. Er zählt wie **Fehler in den Daten**
([A5.1](#A5.1)), ohne markierte Befunde und ohne Paare, die die Forschung unterschieden hat.

| Block | Was er zeigt |
|---|---|
| **Stammbaum-Prüfung** | „Zuletzt am 12.3.2025 · 3 empfohlene Schritte“ oder „Noch nicht durchgeführt“; **Bericht ›** (der letzte Bericht des ganzen Stammbaums), **Stammbaum prüfen…** ([A5.1.2](#A5.1.2)); nur ein Stammbaum mit Personen |
| **Konsistenz** | Zusammenfassung („2 Fehler, 1 zu prüfen, 3 Hinweise.“), die 5 schwersten Fehler und Befunde zu prüfen, „und n weitere…“, die Zeile „n Hinweise ›“ |
| **Vollständigkeit** | Anteil der Personen mit **Geburtsdatum**, **Sterbedatum (Verstorbene)**, **Geburtsort**, **Foto**; unter 50 % hervorgehoben; „Inhalt:“ (Fotos, Ereignisse, Quellen, Anhänge) |
| **Sicherheit der Forschungsangaben**, **Wo Belege fehlen** | Belege, siehe [R3.8](R3-verification-and-citation.md#R3.8) und [A3](A3-evidence-in-the-app.md) |
| **Struktur** | Zahl der Verbindungen; unverbundene Teile oder „Alle Personen sind zu einer Familie verbunden.“ |
| **Schnellaktionen** | **Fehler in den Daten ›**, **Verwaiste Orte bereinigen (n)**, **In Familien aufteilen** |

- **Grenzen:**
  - Über 10 MB an Fotos und Anhängen kommt ein Hinweis hinzu („Medien über 10 MB. Die Stammbaumdatei wird langsamer
    gespeichert und geteilt.“). Ein verwaister Ort ist ein Ort, auf den nichts verweist.
  - Ein unverbundener Teil hat keinen Weg zur Hauptfamilie; er lässt sich abtrennen (**Nicht verbundene Teile
    trennen**).
  - Die Karte in **Worauf achten** zeigt die Zahl der Fehler und die häufigste Art. Sie hat die Schaltfläche
    **Beheben** (geöffneter Stammbaum) oder **Fehler in den Daten ›**; beide öffnen den Bericht bei **Fehler in den
    Daten**.
  - **Stammbaum prüfen…** geht nur im geöffneten Stammbaum. **Bericht ›** gibt es, sobald der Stammbaum einen Bericht
    des ganzen Stammbaums hat.
  - **Ab App 3.33.0:** der Block **Stammbaum-Prüfung**; **Fehler in den Daten ›** und die Zeile „n Hinweise ›“ öffnen
    den Bericht (früher **Validierungsdetails** und der Dialog **Stammbaum-Prüfung**).
- **Bedienung:** **Stammbaum-Überblick → Datenqualität**; im Angebot des Stammbaums auch direkt **Datenqualität**.
  Aktionen, die Daten ändern, gehen nur im geöffneten Stammbaum.
- **Gilt seit:** App 3.13.0; Hinweise und Markierungen 3.17.0; „zu prüfen“ statt „Warnung“ 3.27.0; der Block
  **Stammbaum-Prüfung** 3.33.0

<!-- zdroj: app:src/ui/tree-overview.ts:101 TOP_ISSUES, :108 LOW_SHARE, :1882 treeOverviewQualityHtml, :925 selectFocusCards · src/ui/tree-actions.ts:191 overview-quality · strings.ts treeOverview.consistencyTitle, completenessTitle, field*, contentLabel, mediaWarning, structureTitle, allConnected, quickActions, actValidation, actCleanPlaces, actSplitFamilies, cardValidation · 3.33.0: app:988b0f86 src/ui/tree-overview.ts blok check (q.persons === 0 → bez bloku, last = healthReports scope tree, lastRun, stepsCount, notRun, report, checkTree jen st.active, disabledHint), akce health, health-report, validation, validation-leads · strings.ts health.title, lastRun, notRun, report, checkTree, treeOverview.actValidation „Chyby v datech ›“ -->

<a id="A5.9"></a>
## A5.9 `strom health` im Terminal

`strom health` gibt den eingebauten Teil der Stammbaum-Prüfung aus, wie ihn die Forschung kennt. Es ist derselbe Teil,
den die Forschung in den Bericht in der App schickt ([A5.1.4](#A5.1.4)). Es ändert nichts.

| Zeile der Ausgabe | Was sie zeigt |
|---|---|
| „Prüfung des Stammbaums · der ganze Baum · …“ | den Umfang und den Stand der Historie der Forschung |
| „Datenprüfung: in Ordnung“ / „Datenprüfung: PROBLEM“ | den Stand von `strom check`: Fehler, Warnungen, Personen ohne Beleg |
| „In 30 Tagen hinzugekommen: …“ | neue Personen, Angaben und Quellen |
| „Linien: …“, „Warteschlange: 4 offen, 1 zurückgestellt“ | Linien (in der Warteschlange, wartend, STEHT STILL) und die Warteschlange („LEER“) |
| „Gesendet und lange ohne Antwort: …“ | Anfragen, die vor über 30 Tagen gesendet wurden |
| „Wartet auf eine Entscheidung: 3“, „Wartende Korrekturen von strom: …“ | Entscheidungen und Strom-Korrekturen |
| „Zu prüfende Angaben: 5“ | Angaben zum Abgleich mit dem Original, nach Linien |
| „Nie gesuchte Enden der Zweige: 6“ | Enden der Zweige; nennt höchstens 8 Personen |
| „Material, das auf das Sortieren wartet: 4“ | Material ohne Person und offene Stapel |
| „Aufgaben, die nicht so warten, wie strom es braucht: 1“ | Aufgaben mit Prüfbefund |
| „Zitate von Originalen: 2 ohne Seite, 7 ohne Bild“ | Zitate ohne Seite und ohne Bild |
| „Nächste Schritte:“ | höchstens 10 Schritte, jeder mit einem Befehl („1. die Warteschlange ist leer → strom run“) |

| Schritt | Befehl |
|---|---|
| die Datenprüfung fand Fehler | `strom check` |
| die Linie steht still, wartende Aufgaben / nichts in ihrer Warteschlange | `strom task list --research G… --state waiting` / `strom run --research G…` |
| Anfragen lange ohne Antwort | `strom task list --state waiting` |
| wartet auf eine Entscheidung | `strom status` |
| die Warteschlange ist leer | `strom run` |
| eine Korrektur von strom | `strom fixes show …` |
| zu prüfende Angaben in einer Linie | `strom verify bulk --scope line --of G… --dry-run` |
| nie gesuchte Enden der Zweige | `strom edge` |
| Material, das auf das Sortieren wartet | `strom input list` |

- **Grenzen:**
  - Reihenfolge der Schritte: Konsistenz der Forschung, Linien, die still stehen, alte Anfragen, Entscheidungen, eine
    leere Warteschlange, Strom-Korrekturen, Abgleich nach Linien (die meisten Angaben zuerst), Enden der Zweige,
    Material.
  - Eine Linie steht still, wenn sie aktiv ist und keine Aufgabe in der Warteschlange hat. Eine leere Warteschlange
    ist nur bei einer aktiven Linie ein Schritt.
  - Ein Archiv und die Beispielforschung lassen Linien, Warteschlange, Anfragen, Abgleich, Enden der Zweige und das
    Warten von Aufgaben weg.
  - Die Ausgabe ist in der Sprache der Forschung, mit `--lang` in einer anderen.
- **Bedienung:** Terminal:
  - `strom health` der ganze Stammbaum; `--scope line:G…` eine Linie, `--scope person:P…` eine Person;
  - `--json` Ausgabe für Programme;
  - `--save` legt die Ausgabe als Bericht C… ab (Stand „gespeichert“);
  - `strom health list` die abgelegten Berichte ab dem neuesten, die 10 neuesten (`--all` alle);
    ohne Bericht „noch kein Bericht …“;
  - `strom health show C…` ein Bericht.
- **Gilt seit:** Forschung 1.38.0

<!-- zdroj: research:d8742230, 3f541f54, 818a015b src/commands/health.ts (register health, health list, health show; builtinLines; stepWords → příkazy; „  1. {what} → {command}“; edges.people.slice(0, 8)) · src/core/health.ts builtin (archive), stepsOf (pořadí, stuck, queue-empty), SENT_OLD_DAYS 30, STEPS_MAX 10, EDGE_PEOPLE_MAX 50 · src/core/live.ts GET /health/builtin · assets/lang/cs.json ui.health.head, check.ok, check.problem, growth, lines, line.*, queue, queue.empty, sent, decide, fixes, verify, edges, material, batches, tasks, citations, steps, step.*, saved, list.none, run.state.built · help: strom help health, health list, health show · CHANGELOG.cs.md 1.38.0 „Kontrola stromu“ -->
