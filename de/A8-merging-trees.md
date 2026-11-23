<a id="A8"></a>
# A8 Zusammenführen von Stammbäumen

Wie die Strom-App zwei Stammbäume zusammenführt: eine GEDCOM-Datei mit einem Stammbaum, zwei Stammbäume oder eine
Ansicht mit einem Stammbaum. Beschrieben wird die App 3.21.2; Änderungen aus einer neueren Version tragen deren Nummer.
Ab App 3.32.0 führt jedes Zusammenführen der Assistent **Stammbäume zusammenführen** in sechs Schritten
([A8.5](#A8.5) bis [A8.13](#A8.13)). Das Zusammenführen einer doppelten Person innerhalb eines Stammbaums ist etwas
anderes ([A5.6](A5-tree-check.md#A5.6)).

<a id="A8.1"></a>
## A8.1 Zusammenführen legt immer einen neuen Stammbaum an

Gilt nicht mehr ab App 3.32.0, ersetzt durch [A8.5](#A8.5): Der Assistent schreibt in den gewählten Stammbaum oder legt
einen neuen an.

Das Ergebnis des Zusammenführens wird als **neuer Stammbaum** gespeichert. Beide ursprünglichen Stammbäume und die
Datei bleiben unverändert.

| Woher | Bedienung |
|---|---|
| GEDCOM-Datei | **Import → GEDCOM importieren → Mit Vorhandenem zusammenführen** |
| anderer Stammbaum | Verwaltung der Stammbäume, beim Stammbaum **Stammbaum zusammenführen** → **Zielstammbaum auswählen** → **Zusammenführen starten** |
| gerade in der Ansicht gezeigte Personen | **Diese Ansicht zusammenführen mit…** und Wahl eines anderen Stammbaums |

- Vor dem Speichern fragt die App nach **Name für den zusammengeführten Stammbaum:** (Standard „Ziel + Quelle“).
  Nach dem Zusammenführen zeigt sie die Zahl der zusammengeführten und hinzugefügten Personen und bietet den Wechsel
  zum neuen Stammbaum an.
- **Grenzen:** eine leere Ansicht lässt sich nicht zusammenführen; eine Ansicht wird nur in einen anderen Stammbaum
  zusammengeführt.
- **Gilt seit:** App 1.0.0; Diese Ansicht zusammenführen mit… App 1.19.0

<!-- zdroj: app:src/merge/ui.ts:1421 newTreeNamePrompt, :1447 TreeManager.createTree · src/ui/merge-ui.ts:595 mergeViewInto · strings.ts merge.newTreeNamePrompt, merge.switchToNewTree, merge.mergeViewInto, merge.mergeViewEmpty, merge.mergeViewNoTarget, treeManager.mergeSourceTree, treeManager.selectTargetTree, treeManager.startMerge, importDialog.mergeExisting · git v1.19.0 (cf43bde) -->

<a id="A8.2"></a>
## A8.2 Abgleich der Personen

Die App sucht zu jeder Person aus der zusammengeführten Quelle eine Person im Zielstammbaum und gibt dem Paar einen
Übereinstimmungswert.

- Der Wert ergibt sich aus der Ähnlichkeit von Name, Geburtsdatum und Geburtsort, Sterbedatum und aus der
  Übereinstimmung von Eltern und Partnern. Das Geschlecht darf nicht widersprechen.
- **Hoch** ist eine Übereinstimmung ab 85, **Mittel** ab 55, sonst **Niedrig**. Eine Person ohne Übereinstimmung
  ist **Neu**.
- Der Assistent nennt bei einer Übereinstimmung den Grund (zum Beispiel „Name und Geburtsjahr“, „Kind einer
  abgeglichenen Person“).
- **Grenzen:** Platzhalterpersonen (leerer Platz für einen unbekannten Elternteil) werden nicht abgeglichen. Eine
  Person ohne Vornamen, die über eine verwandte Person abgeglichen wurde, geht immer zur Kontrolle.
- **Gilt seit:** App 1.0.0
- **Ab App 3.26.0:** Personen werden auch nach der Programm-ID abgeglichen (`_UID` = `UID`, `_FSFTID` = `EXID` mit der
  Adresse familysearch.org), mit dem Grund **Gleiche ID in der Datei**. Sicher ist eine solche Übereinstimmung nur bei
  ähnlichem Namen, einem Geschlecht nicht Mann gegen Frau, Geburtsjahren höchstens 3 auseinander und ohne abweichende
  globale ID; sonst ist sie ein Vorschlag mit einem Wert von höchstens 79. Datensatzkennung und `RIN` geben einer
  Übereinstimmung der Namen 25 Punkte dazu, nur bei Dateien desselben Programms. Familien werden nicht nach der ID
  abgeglichen ([S6.7](S6-tree-from-another-program.md#S6.7)).
- **Ab App 3.27.0:** eine ID des Programms (`_UID`, `UID`, `_FSFTID`, `AFN`, `EXID`), die im Stammbaum mehr
  als eine Person trägt, sagt nicht, welche es ist: Sie begründet allein keine Übereinstimmung, sie bietet sie nur an.
- **Ab App 3.32.0:** der Assistent zeigt den Wert als Prozent („N %“) und teilt die Paare in **Gleich** (Wert 80 und
  mehr) und **Vielleicht gleich** (niedrigerer Wert); eine Person ohne Übereinstimmung steht unter **Neu**
  ([A8.7](#A8.7)). Die Bezeichnungen **Hoch**, **Mittel** und **Niedrig** werden nicht mehr gezeigt.

<!-- zdroj: app:src/merge/matching.ts:318 findMatches, :781 (85 high, 55 medium), :790 calculateMatchScore, :618 UNKNOWN_NAME_MATCH_SCORE · strings.ts merge.highConfidence, merge.mediumConfidence, merge.lowConfidence, merge.matchReasons · 3.27.0: app:b5595ca1 src/merge/matching.ts idNamesSeveral (víc osob stromu se stejným silným ID → jen idCandidate), findDirectMatches · src/merge/id-match.ts STRONG_TAGS · CHANGELOG.cs.md 3.27.0 · spec 066 K3.2 -->

<a id="A8.3"></a>
## A8.3 Was der Mensch entscheidet

Der Assistent **Daten zusammenführen** zeigt Übereinstimmungen, Konflikte und neue Personen. Jede Übereinstimmung
lässt sich entscheiden.

| Auswahl | Was mit der Person aus der Quelle geschieht |
|---|---|
| **Bestätigen** | sie wird mit der Person des Stammbaums zusammengeführt |
| **Ablehnen** | sie wird als neue Person hinzugefügt |
| **Überspringen** | sie wird gar nicht übernommen |
| **Mit Vorhandener abgleichen** | sie wird mit einer von Hand gewählten Person zusammengeführt |

- Eine unentschiedene Übereinstimmung mit Wert 50 und mehr wird beim Zusammenführen von selbst bestätigt; eine
  unentschiedene unter 50 wird als neue Person hinzugefügt. Bleiben unentschiedene unsichere Übereinstimmungen, fragt
  die App vor dem Zusammenführen.
- **Nur vorhandene Personen aktualisieren (keine neuen hinzufügen)** ergänzt abgeglichene Personen und fügt keine
  neue Person hinzu.
- Eine Angabe, die beide Seiten unterschiedlich haben, ist ein Konflikt: **Vorhandenes behalten** oder **Aus dem
  Import übernehmen**; ein genaueres Datum oder ein vollständigerer Wert ist **vorgeschlagen**. Beim Paar werden so
  Beziehungsstatus, Datum und Ort der Hochzeit und Enddatum gelöst. Eine Angabe nur auf einer Seite wird ergänzt.
- Ein begonnenes Zusammenführen lässt sich beim Schließen **Für später speichern**; es kehrt als **Ausstehende
  Zusammenführungen** zurück.
- **Gilt seit:** App 1.0.0; Konflikte des Paares App 3.0.0; Überspringen und Nur vorhandene Personen aktualisieren
  App 1.19.0
- **Ab App 3.26.0:** eine unentschiedene Übereinstimmung wird erst ab dem Wert 80 von selbst bestätigt (im Assistenten
  vorab bestätigt, ✓). Eine Übereinstimmung von 50–79 wird nur angeboten (?) und ohne Entscheidung des Menschen als
  neue Person hinzugefügt: eine doppelte Person lässt sich später zusammenführen, ein falsches Zusammenführen lässt
  sich nicht rückgängig machen.
- **Ab App 3.32.0:** entschieden wird im Assistenten: Paare im Schritt **Wer ist wer** ([A8.7](#A8.7)), abweichende
  Angaben im Schritt **Wer hat recht** ([A8.9](#A8.9)). Die Auswahlen **Bestätigen**, **Ablehnen**, **Überspringen**
  und **Nur vorhandene Personen aktualisieren** werden ersetzt durch **Dieselbe Person**, **Neue Person**, **Nicht
  übernehmen** und den Umfang **d) Nur vorhandene Personen ergänzen**. Zusätzlich gilt:
  - ein Paar mit einem Wert unter 80 wird ohne Entscheidung des Menschen nicht verbunden; die übrigen unentschiedenen
    lassen sich auf einmal als neu hinzufügen oder auslassen ([A8.7](#A8.7)). Jede Person des Imports endet genau
    einmal: verbunden, hinzugefügt oder durch eine ausdrückliche Wahl ausgelassen;
  - der Vorschlag des Imports ist nur ein Rat: eine abweichende Angabe ohne Wahl des Menschen behält den Wert des
    Stammbaums;
  - ein Zusammenführen, bei dem etwas verloren ginge, wird nicht gespeichert: vor dem Schreiben werden die Summen der
    Personen, Paare, Verbindungen, Quellen, Fotos und Dateien und die Verweise geprüft; stimmen sie nicht, sagt es
    „Die Summen stimmen nicht: nichts wurde gespeichert.“ und was nicht stimmt;
  - eine Quelle des Imports mit einer ID, die der Stammbaum schon für eine andere Quelle hat, kommt als neue Quelle;
  - der Erfolg wird erst nach dem tatsächlichen Schreiben in den Speicher gemeldet.

<!-- zdroj: app:src/merge/executor.ts:78 AUTO_CONFIRM_SCORE, :110 detectPartnershipConflicts, :302 toAdd (updateOnly, skip, reject), :792 mergePersonData · src/merge/ui.ts:1408 pendingGate · strings.ts merge.confirm, merge.reject, merge.skip, merge.manualMatch, merge.updateOnlyLabel, merge.keepExisting, merge.useImport, merge.suggestedPrecise, merge.partnershipFields, merge.closeSave, merge.pendingMerges · git v3.0.0 (2218cea), v1.19.0 (cf43bde) -->

<a id="A8.4"></a>
## A8.4 Was mit dem Stammbaum übernommen wird

Außer Personen und Beziehungen werden auch die Listen zusammengeführt, die dem ganzen Stammbaum gehören.

- **Quellen:** dieselbe Quelle (dieselbe Signatur, sonst dieselbe Beschreibung) wird nicht verdoppelt; Zitationen
  gehen auf die behaltene Quelle über, und fehlende Abschrift und fehlendes Datum werden ergänzt.
- **Ab App 3.27.0:** Eine Quelle, die sich von der behaltenen nur in der Standard-Zuverlässigkeit unterscheidet, ist
  dieselbe Quelle und wird nicht verdoppelt; die übertragenen Zitationen behalten ihre Zuverlässigkeit
  ([A2.6.1](A2-loading-a-family-tree.md#A2.6.1)). Ein anderes Eintragsdatum oder andere Zeilen der Zitation ergeben
  weiter eine eigene Quelle.
- **Orte:** Koordinaten, Ortsdatensätze und andere Namen von Orten werden vereinheitlicht; wo beide Stammbäume
  denselben Ort kennen, gilt der Zielstammbaum.
- **Namensschreibweisen** ([A4.5](A4-surnames-and-families.md#A4.5)) werden vereinheitlicht; Gruppen, die sich
  überschneiden, werden verbunden.
- Der neue Stammbaum beginnt ohne Standardperson und -ansicht ([A6.1.1](A6-views.md#A6.1.1)).
- Die App sagt vor dem Zusammenführen, wie viele Probleme der Prüfung beide Stammbäume haben, und bietet nach dem
  Zusammenführen die Prüfung an, wenn das Zusammenführen neue gebracht hat ([A5](A5-tree-check.md)).
- **Grenzen:** den wiederholten Import der Datei einer Forschung in den Stammbaum der Forschung behandelt
  [S1](S1-connecting-app-and-research.md).
- **Gilt seit:** App 1.0.0; Meldung der Probleme der Prüfung App 1.19.0
- **Ab App 3.26.0:** Notizen von Person, Beziehung und Quelle werden beim Zusammenführen nicht verdoppelt. Vor dem
  Zusammenführen wird eine Sicherung des Stammbaums gespeichert ([S6.5](S6-tree-from-another-program.md#S6.5)). Nach
  dem Zusammenführen mit der Datei eines anderen Programms zeigt die App die Karte **Wie weiter**
  ([S6.4](S6-tree-from-another-program.md#S6.4)). Das manuelle Zusammenführen zweier Personen
  ([A5.6](A5-tree-check.md#A5.6)) verbindet die Notizen nicht.
- **Ab App 3.28.0:** gemeinsame Ereignisse ([A10.1](A10-shared-events.md#A10.1)) werden nicht verdoppelt: sie werden
  mit den Ereignissen des Zielstammbaums gepaart und übernehmen dessen gemeinsames Ereignis; ein eigenes Ereignis
  „Census“ wird mit einer Volkszählung gepaart. Die Zusammenfassung „Gemeinsame Ereignisse: n zusammengeführt“
  ([A10.6](A10-shared-events.md#A10.6)).
- **Ab App 3.32.0:**
  - die Sicherung **Vor dem Zusammenführen** nimmt der Assistent bei allen Eingängen und immer, auch bei
    ausgeschalteten automatischen Sicherungen ([A8.10](#A8.10), [S6.5](S6-tree-from-another-program.md#S6.5));
  - ein für später gespeichertes begonnenes Zusammenführen erkennt, dass sich der Stammbaum inzwischen geändert hat:
    die Vorschläge werden neu berechnet, entschiedene Paare bleiben ([A8.5](#A8.5));
  - die Karte **Wie weiter** erscheint nur nach einem Zusammenführen, das einen neuen Stammbaum anlegt; nach dem
    Zusammenführen in einen bestehenden Stammbaum ist die Datenprüfung im Schritt **Was passiert ist** (**Stammbaum
    prüfen**, [A8.11](#A8.11));
  - der Stammbaum bewahrt einen Eintrag seiner Zusammenführungen (Datenversion 26); ältere App-Versionen öffnen einen
    solchen Stammbaum nur schreibgeschützt.

<!-- zdroj: app:src/merge/executor.ts:211 executeMerge (mergeSourceCatalogs, places, mergePlaceRecords, mergePlaceAliases, addSurnameGroup, delete defaultPersonId/defaultView) · src/merge/ui.ts countNewMergeIssues · strings.ts merge.preValidationWarning, merge.newIssues · git v1.19.0 (00e5d38) · 3.27.0: app:dde0151a src/merge/executor.ts sourceKey bez quality, takeCitationQuality, remapCitations; app:5721b016 unionCitations · 3.28.0: app:80c2ffb9 src/merge/* (shareId, Census ↔ census), strings.ts merge.sharedJoined -->

<a id="A8.5"></a>
## A8.5 Der Assistent Stammbäume zusammenführen

Jeden Import eines Stammbaums in einen Stammbaum und jedes Zusammenführen zweier Stammbäume führt ein Assistent in sechs
Schritten. In den Stammbaum wird nichts geschrieben, bis das Schreiben im Schritt **Was passiert** bestätigt ist.

| Woher | Assistent | Bedienung |
|---|---|---|
| GEDCOM-Datei | **Stammbaum importieren** | **Import → GEDCOM importieren**; aus Stammbäume verwalten beginnt er mit der Auswahl **Neuer Stammbaum** |
| anderer Stammbaum | **Stammbäume zusammenführen** | Stammbäume verwalten, ⋯ beim Stammbaum → **Mit Stammbaum zusammenführen…** (das Ziel ist der geöffnete Stammbaum) |
| gerade in der Ansicht gezeigte Personen | **Stammbäume zusammenführen** | Aktionen des Stammbaums → **Ansicht zusammenführen mit…** |
| aus einem anderen Strom gesendete Änderungen | **Empfangene Änderungen** | Vorschau der empfangenen Änderungen → **Im Detail prüfen** |

- **Schritte:** **Was damit** ([A8.6](#A8.6)), **Wer ist wer** ([A8.7](#A8.7)), **Wen hinzufügen** ([A8.8](#A8.8)),
  **Wer hat recht** ([A8.9](#A8.9)), **Was passiert** ([A8.10](#A8.10)), **Was passiert ist** ([A8.11](#A8.11)). Ein
  Schritt, der für den gewählten Weg nichts entscheidet, wird übersprungen, und der Assistent sagt es bei ihm.
- Über den Schritten stehen laufende Zahlen der Personen des Imports: **Verbunden**, **Neu**, **Nicht übernommen** und
  **Zu entscheiden**; ihre Summe ist die Zahl der Personen des Imports.
- Der Vergleich eines großen Stammbaums zeigt den Fortschritt und eine Zeitschätzung. **Abbrechen** verliert nichts:
  die Wahl aus Schritt 1 bleibt, und der Vergleich lässt sich neu starten.
- Ein vor dem Schreiben geschlossener Assistent sagt „Noch ist nichts geschrieben.“, und die Entscheidungen lassen sich
  **Für später speichern**. Das gespeicherte Zusammenführen wartet unter Stammbäume verwalten bei **Ausstehende
  Zusammenführungen**. Hat sich der Zielstammbaum inzwischen geändert, sagt der Assistent es beim Fortsetzen; die
  Vorschläge werden neu berechnet, entschiedene Paare bleiben.
- Ein Zusammenführen, das beim letzten Mal nicht beendet wurde (geschlossenes Fenster, Absturz), meldet die App beim
  nächsten Öffnen: Stammbaum und Datei sind unverändert.
- **Grenzen:** eine GEDCOM-Datei in einen leeren Stammbaum wird weiter über **In Stammbaum einfügen** ohne Assistenten
  eingefügt ([A2](A2-loading-a-family-tree.md)). Das Zusammenführen zweier Personen eines Stammbaums ist etwas anderes
  ([A5.6](A5-tree-check.md#A5.6)).
- **Gilt seit:** App 3.32.0; früher legte das Zusammenführen immer einen neuen Stammbaum an ([A8.1](#A8.1))

<!-- zdroj: app:debf50cc (3.32.0) src/merge/ui.ts startMerge, repeatLine, resume, step6Env · src/merge/wizard-steps.ts stepInfo (přeskočené kroky) · src/merge/wizard-ui.ts title (titleImport, titleTrees, titleShare, titleCompare) · src/ui/import-export.ts openGedcomGuide (prázdný strom → showGedcomResultDialog), src/ui/merge-ui.ts (crashed, pendingMergeFound) · src/ui/share-ui.ts reviewChangePacketInMerge · strings.ts mergeWizard.steps, cntJoined, cntNew, cntSkipped, cntPending, cntTotal, comparing, comparingNote, stop, closeMsg, savedLater, resumeChanged, crashed, treeManager.mergeInto, menu.mergeViewInto, shareDiff.reviewDetail, merge.pendingMerges · CHANGELOG.cs.md 3.32.0 · dirigent:spec/134-bezpecne-slouceni-stromu §1–§13 · dirigent:test/vysledek-1123-scenare-app.md -->

<a id="A8.6"></a>
## A8.6 Schritt 1: Was damit

Im ersten Schritt wird gewählt, was mit dem Import geschieht, in welchen Stammbaum, und was mit einer Person geschieht,
die schon im Stammbaum ist.

| Auswahl | Was passiert |
|---|---|
| **Neuer Stammbaum** | ein neuer Stammbaum mit den Personen des Imports entsteht; er wird nicht mit einer Forschung verbunden; bestehende Stammbäume bleiben unverändert |
| **Zu Stammbaum hinzufügen** | die Personen des Imports werden dem gewählten Stammbaum hinzugefügt (**In welchen Stammbaum**) |
| **Nur vergleichen** | dieselben Schritte werden durchlaufen, aber nichts wird geschrieben; die Liste lässt sich am Ende speichern |
| **Als JSON speichern** | **JSON herunterladen** lädt die umgewandelten Daten als `.json`-Datei herunter; in den Stammbaum wird nichts geschrieben |

- **Was mit einer Person geschieht, die schon im Stammbaum ist** (bei **Zu Stammbaum hinzufügen**):

  | Umfang | Bei verbundenen Personen | Neue Personen |
  |---|---|---|
  | **a) Nur fehlende Personen** | nichts ändert sich | werden hinzugefügt |
  | **b) Fehlende Personen und leere Angaben** | nur leere Angaben werden ergänzt | werden hinzugefügt |
  | **c) Angabe für Angabe entscheiden** | die Unterschiede werden in Schritt 4 gewählt ([A8.9](#A8.9)) | werden hinzugefügt |
  | **d) Nur vorhandene Personen ergänzen** | Angaben nach Schritt 4 | niemand Neues kommt hinzu |

- **Nicht übernommen wird:** was die App aus der Datei nicht übernimmt, ist mit Anzahl und Beispiel aufgezählt;
  **Liste speichern…** speichert die Liste. Nichts davon geht stillschweigend verloren.
- **Tauschen** kehrt bei zwei Stammbäumen um, was wohin hinzugefügt wird.
- Dieselbe Datei, erneut in den Stammbaum zusammengeführt, erkennt der Assistent und sagt, wie viele Personen neu
  sind; die beim letzten Mal verbundenen Personen werden nicht verdoppelt. So kommen nur die Personen hinzu, die beim
  letzten Mal ausgelassen wurden.
- **Grenzen:** Ziel kann weder ein gesperrter Stammbaum sein (Entsperren unter Stammbäume verwalten) noch ein
  Stammbaum aus einer neueren App-Version. Ein Stammbaum, auf dem gerade das Live-Verfolgen der Forschung läuft
  (◎ **Agenten im Stammbaum folgen**), ist schreibgeschützt; der Assistent bietet bei ihm **Folgen ausschalten und
  hierher zusammenführen** an: Vor dem Schreiben wird eine Sicherung gespeichert, das Senden an die Forschung pausiert,
  und die Änderungen gehen erst nach der Wahl im letzten Schritt dorthin. Eine Kopie des Stammbaums der Forschung und
  ein Stammbaum ohne Forschung können Ziel sein, auch wenn anderswo live verfolgt wird. Aus einem schreibgeschützt
  geöffneten Stammbaum geht der Import nur als **Neuer Stammbaum**.
- **Gilt seit:** App 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step1-what.ts (mode, scope, notTaken, swap, repeat), src/merge/ui.ts repeatLine (isRepeatOf podle otisku souboru, importedBefore), src/merge/plan.ts:715–717 (d: updateOnly, a: joinedDetails none, b: empty) · strings.ts mergeWizard.modeNew, modeNewDesc, modeAdd, modeAddDesc, modeCompare, modeCompareDesc, modeJson, modeJsonDesc, btnJson, whichTree, existingWhat, scopeA–scopeD, scopeADesc–scopeDDesc, notTaken, notTakenNote, saveList, swap, repeat, blockLive, blockLiveAction, blockLocked, blockReadOnly, blockNewer · app:166fbffd, 5c4bcc0c (1123-134 bod 10: blokuje jen strom s běžícím sledováním, kopie stromu výzkumu jde; nabídka Vypnout sledování a sloučit sem) src/live-follow-block.ts · CHANGELOG.cs.md 3.32.0 („tentýž soubor sloučený znovu přidá jen osoby, které se minule vynechaly“) · spec 134 K0.7 -->

<a id="A8.7"></a>
## A8.7 Schritt 2: Wer ist wer

Schritt 2 zeigt die Personen des Imports in drei Gruppen, und über jedes Paar entscheidet der Mensch. Eine Verbindung,
die geschrieben wird, ist immer sichtbar und lässt sich aufheben.

- **Gruppen:** **Vielleicht gleich** (Wert unter 80), **Gleich** (Wert 80 und mehr, vorab verbunden) und **Neu** (ohne
  Übereinstimmung). Wert und Gründe der Übereinstimmung beschreibt [A8.2](#A8.2).
- **Paar:** die Person des Imports und die Person des Stammbaums nebeneinander in den Zeilen **Name**, **Geburt**,
  **Tod**, **Eltern**, **Partner**, **Kinder** und **Belege**, mit **Warum ja:** und **Was dagegen spricht:**.
- **Entscheidung:** **Dieselbe Person** (D), **Neue Person** (N), **Andere Person…** (A, mit einer anderen Person des
  Stammbaums verbinden) und **Nicht übernehmen** (X); ↑ ↓ geht zum nächsten Paar.
- Eine Entscheidung berechnet die Vorschläge bei Verwandten neu; entschiedene Paare ändern sich nicht.
- **Wiederholtes Zusammenführen:** Wird dieselbe Quelle ein zweites Mal zusammengeführt, erkennt der Assistent die
  Personen, die ein früheres, nicht zurückgenommenes Zusammenführen gebracht oder verbunden hat. Sie stehen unter
  **Gleich** mit dem Grund „Schon früher aus dieser Quelle zusammengeführt“, und nichts wird verdoppelt.
- **Warum ja** nennt nur, was beide Einträge hergeben: „Exakter Name und Geburtsdatum“ nur bei gleichem Geburtsdatum
  auf beiden Seiten, bei Übereinstimmung nur des Jahres „Name und Geburtsjahr“, sonst „Exakter Name“.
- Die **Übrigen unentschiedenen** lassen sich auf einmal erledigen: **Als neu hinzufügen** (der Assistent warnt, dass
  das Personen verdoppeln kann, die schon im Stammbaum sind) oder **Nicht übernehmen**. Solange ein unentschiedenes
  Paar bleibt, lässt der Assistent nicht weiter.
- **Grenzen:** bei **Neuer Stammbaum** wird der Schritt übersprungen: alle Personen sind neu.
- **Gilt seit:** App 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step2-who.ts pairRows (AUTO_CONFIRM_SCORE → same, jinak maybe), decisions, recalc, rest · src/merge/executor.ts AUTO_CONFIRM_SCORE = 80 · src/merge/wizard-steps.ts stepInfo (step2 skip newTree, person-pending blokuje) · strings.ts mergeWizard.grpMaybe, grpSame, grpNew, rows, whyYes, whyNo, decSame, decNew, decOther, decSkip, decKeys, keysHint, recalc, restLabel, restAdd, restSkip, restAddWarn, sameNote · spec 134 §4 · app:1046e99b (1123-134 N1, N3) strings.ts merge.matchReasons.merged_before, exact_name, exact_name_gender_birthdate, name_gender_birthyear -->

<a id="A8.8"></a>
## A8.8 Schritt 3: Wen hinzufügen

Schritt 3 wählt, welche neuen Personen hinzugefügt werden. Eine neue Person, die nichts mit dem Stammbaum verbindet,
wird ohne Entscheidung nicht hinzugefügt.

- **Wen die Auswahl nimmt:** **Alle neuen**, **Nur verbundene, bis N Schritte** (nur Personen, die mit dem Stammbaum
  über höchstens N Verwandte verbunden sind), **Vorfahren von…**, **Nachkommen von…** (mit der Zahl der
  Generationen), **Familie / Nachname…** und **Von Hand**. Die Auswahl von Vorfahren, Nachkommen oder einer Familie
  wählt die übrigen Neuen ab.
- **Verbundene neue:** eine Liste der neuen Personen mit dem Weg zum Stammbaum („knüpft über … an“), Suche,
  **Filter** (**Nachname**, **Jahre**, **Ort**, **Mit Quelle**, **Verbindend**, **Lebende**), **Lebende auslassen (N)**
  und **Vorschau** des Zweigs.
- Das Abwählen einer Person, über die weitere an den Stammbaum anknüpfen, fragt: **Auch sie auslassen**, **Als
  unverbunden behalten**, **… behalten** oder **Als „?“ behalten** (an ihrer Stelle bleibt ein verbindendes „?“ ohne
  Angaben, und die Verwandten bleiben verbunden).
- **Unverbundene Gruppen:** Personen ohne Weg zu den Personen des Stammbaums, nach Familien. Jede Gruppe braucht eine
  Entscheidung: **Mit Person verbinden…** (eine Person der Gruppe ist Elternteil, Kind oder Partner einer Person des
  Stammbaums), **Unverbunden hinzufügen**, **Eigener Stammbaum** (nach dem Schreiben ein eigener Stammbaum) oder
  **Nicht übernehmen**. Eine unentschiedene Gruppe hält das Schreiben auf.
- **Grenzen:** eine Verbindung, die einem Kind einen dritten Elternteil gäbe, wird nicht geschrieben. Der Umfang
  **d)** fügt niemand Neues hinzu und überspringt den Schritt. Bei **Neuer Stammbaum** nimmt der Schritt alle Personen.
- **Gilt seit:** App 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step3-whom.ts, step3-model.ts, src/merge/plan-select.ts (scope d → 'scope', :392), src/merge/wizard-steps.ts (step3 skip allNew, group-pending) · strings.ts mergeWizard.vAll, vLinked, vAnc, vDesc, vRod, vManual, variants, pickAnc, pickDesc, pickRod, generations, tabLinked, tabGroups, linksVia, skipLiving, s3Tools, fSurname, fYears, fPlace, fSource, fLinking, fLiving, previewBtn, branchPreview, unlinkTitle, unlinkAll, unlinkLoose, unlinkKeep, unlinkQ, unlinkQDesc, groupsLead, gConnect, gLoose, gOwn, gSkip, relParent, relChild, relPartner, connectThird, groupsWhy · spec 134 §5, §6 -->

<a id="A8.9"></a>
## A8.9 Schritt 4: Wer hat recht

Schritt 4 entscheidet die Angaben, die verbundene Personen unterschiedlich haben. Ohne Wahl des Menschen gilt der
Stammbaum.

- **Regeln:** **Mein Stammbaum gilt** (Standard), **Der Import gilt**, **Beides behalten** (der Wert des Imports wird
  daneben gespeichert, „Der Import nennt: …“), **Genauer, wenn nicht widersprüchlich** und **Einzeln entscheiden**.
- Eine Regel lässt sich dem ganzen Zusammenführen geben, einer Art der Angabe (**Name**, **Geburt**, **Tod**, **Orte**,
  **Ereignisse**, **Notizen**, **Fotos**, **Geschlecht**, **Heirat**), einer Person und einem einzelnen Wert. Die
  engere Regel gilt: alles → Art der Angabe → Person → Wert. Bei jeder Regel ist zu sehen, wie viele Unterschiede
  bleiben, sich ändern oder daneben gespeichert werden.
- **Geschützte Angaben:** eine Angabe im Stammbaum, markiert als „belegt“, „bestätigt“ oder „aus der Forschung“,
  ändert eine Sammelwahl nicht; sie lässt sich nur einzeln ändern. Das Überschreiben einer belegten Angabe fragt
  **Belegte Angabe überschreiben?**; nach dem Schreiben ist die Angabe „Aus Stammbaum“, und der Beleg bleibt als
  Quelle bei der Person.
- **Widersprüche bei Beziehungen** (andere Eltern, zweiter Partner, andere Heirat, dritter Elternteil, Schleife
  Vorfahr–Nachkomme) werden immer einzeln entschieden: **Meins behalten**, **Aus dem Import** oder **Beides**. Eine
  Schleife wird nie geschrieben.
- **Grenzen:** beim Umfang **a)** und **b)** wird der Schritt übersprungen; gibt es Widersprüche bei Beziehungen,
  zeigt er nur sie. Bei **Neuer Stammbaum** wird er immer übersprungen.
- **Gilt seit:** App 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step4-rules.ts (relOnly, s4SkippedTitle, protected), src/merge/plan.ts:438 relationConflicts, :534 (scope a), :542 (scope b jen prázdné) · src/merge/wizard-steps.ts step4 (newTree, scope a/b skip) · strings.ts mergeWizard.ruleAll, ruleOrder, rMine, rImport, rBoth, rPrecise, rEach, rDefault, importSays, kinds, protectedLine, protKinds, protTitle, protText, protAfter, relConf, relKinds, relAlways, keepMine, fromImport, both, loopNever, step4Skipped, s4SkippedTitle, relOnly · spec 134 §7, K0.3 -->

<a id="A8.10"></a>
## A8.10 Schritt 5: Was passiert, und das Schreiben

Schritt 5 zeigt die ganze Liste der Änderungen nach Gruppen. Geschrieben wird erst mit seiner Schaltfläche und nur
das, was die Liste zeigt.

- **Liste:** **Neu**, **Verbunden**, **Geänderte Angaben**, **Paare und Verbindungen**, **Quellen**, **Orte**, **Fotos
  und Dateien**, **Nicht übernommen** (bei jeder Person warum: Schritt und Wahl) und **Wird nicht übernommen**. Ein
  Eintrag lässt sich abwählen. **Liste speichern…** speichert sie in eine Datei.
- **Wohin schreiben:** **In … schreiben** oder **In neuen Stammbaum** (Kopie des Zielstammbaums mit dem Import; der
  Zielstammbaum bleibt unverändert).
- **Sicherung:** vor dem Schreiben in den Stammbaum entsteht die Sicherung **Vor dem Zusammenführen**, immer, auch
  bei ausgeschalteten automatischen Sicherungen. Sie bleibt, solange sich das Zusammenführen zurücknehmen lässt; die
  Rotation der Sicherungen löscht sie nicht. Wäre für sie kein Platz, fragt der Assistent (**Beide behalten (über dem
  Limit)** oder **Älteste andere Sicherung löschen**). Ohne Sicherung wird nichts geschrieben: „Die Sicherung ist
  fehlgeschlagen, daher wurde nichts geschrieben.“
- **Sicherheiten:** hat sich der Zielstammbaum inzwischen geändert, wird die Liste neu berechnet, und nichts wird
  blind geschrieben. Vor dem Speichern werden Summen und Verweise geprüft; stimmen sie nicht: „Die Summen stimmen
  nicht: nichts wurde gespeichert.“ Das Fenster während des Schreibens zu schließen schadet nicht: das Schreiben wird
  beendet, oder es wird nichts geschrieben.
- Das Schreiben ist ein Schritt **Rückgängig**.
- **Grenzen:** bei **Nur vergleichen** wird nichts geschrieben; die Liste lässt sich speichern. Die Prüfung zählt die
  durch den Umfang **b)** ergänzten leeren Angaben nicht zu **Geänderte Angaben**.
- **Bedienung:** die Schaltfläche „N Personen hinzufügen, M Angaben ändern“, beim neuen Stammbaum „Stammbaum mit
  N Personen anlegen“.
- **Gilt seit:** App 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step5-plan.ts (skupiny, retentionAsk, targetChanged), src/merge/write.ts (backupBeforeMerge keepFor, storageFull, badTotals, one undo step strings.undo.mergeTrees) · src/data.ts:2047 backupBeforeMerge (bez ohledu na automatické zálohy, keepFor mimo rotaci) · src/snapshots.ts planRetention (keepFor se nesmaže) · strings.ts mergeWizard.gNew, gJoined, gFields, gLinks, gSources, gPlaces, gMedia, gSkipped, gNotTaken, skipWhy, whereTo, writeInto, writeNew, writeNewDesc, backupLine, savePlan, btnWrite, btnNewTree, backupFailed, retentionAsk, keepBoth, dropOldest, targetChanged, replanned, writingSafe, badTotals · dirigent:test/vysledek-1123-scenare-app.md N1 (doplněná prázdná pole se v kroku 5 nepočítají) · spec 134 §8, K0.2, K0.4, K0.5 -->

<a id="A8.11"></a>
## A8.11 Schritt 6: Was passiert ist, und der Verlauf der Zusammenführungen

Nach dem Schreiben sagt Schritt 6, was passiert ist, und das Zusammenführen bleibt im Stammbaum als Eintrag, zu dem
sich später zurückkehren lässt.

- **Was passiert ist:** „In den Stammbaum … geschrieben“ und „Die Summen stimmen: N Personen im Import = verbunden
  + neu + nicht übernommen“; die Sicherung **Vor dem Zusammenführen** ist unter Sicherungen.
- **Aktionen:** **Im Stammbaum zeigen**, **Als Personenliste speichern** ([A11](A11-lists-of-people.md)),
  **Stammbaum prüfen** ([A5](A5-tree-check.md)) und **Zusammenführung zurücknehmen…** ([A8.12](#A8.12)).
- Nach dem Zusammenführen der Datei eines anderen Programms in einen bestehenden Stammbaum erscheint die Karte **Wie
  weiter** nicht; die Datenprüfung ist hier. Ein neuer Stammbaum aus der Datei eines anderen Programms bekommt die
  Karte ([S6.4](S6-tree-from-another-program.md#S6.4)).
- **Verlauf der Zusammenführungen:** jedes Zusammenführen in den Stammbaum mit Datum, Quelle, Zahlen (neu, verbunden,
  Angaben) und dem Stand **gilt**, **teilweise zurückgenommen** oder **zurückgenommen**. Beim Zusammenführen **Liste
  öffnen** und **Zurücknehmen…**; im Fenster auch **Sicherungen…** und **Änderungsverlauf…**. Den ganzen Stammbaum
  stellen Sicherungen her; hier lässt sich nur zurücknehmen, was ein Zusammenführen brachte.
- **Grenzen:** den Eintrag der Zusammenführungen trägt der Stammbaum ab Datenversion 26; ältere App-Versionen öffnen
  einen solchen Stammbaum nur schreibgeschützt. Zusammenführungen aus der Zeit vor App 3.32.0 stehen nicht im Verlauf.
- **Bedienung:** Aktionen des Stammbaums → **Verlauf der Zusammenführungen…** (nur bei einem Stammbaum, der
  Zusammenführungen hat); Stammbäume verwalten, ⋯ beim Stammbaum → **Verlauf der Zusammenführungen…**.
- **Gilt seit:** App 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step6-done.ts (notes inHistory, noNextCard), src/merge/ui.ts step6Env (noNextCard = !newTree && gedcom) · src/ui/tree-actions.ts:199 menuHistory (jen se záznamy) · src/ui/merge-history-ui.ts · strings.ts mergeWizard.doneTitle, doneTotals, doneBackup, showInTree, saveAsList, checkTree, undoMerge, inHistory, noNextCard, menuHistory, histTitle, histLead, stValid, stPartial, stUndone, histCounts, openList, undoEllipsis, histBackups, histChanges · CHANGELOG.cs.md 3.32.0 (datová verze 26) · spec 134 §9 -->

<a id="A8.12"></a>
## A8.12 Zurücknehmen einer Zusammenführung

**Zusammenführung zurücknehmen** nimmt nur das zurück, was ein Zusammenführen brachte. Arbeit, die nach dem
Zusammenführen getan wurde, verschwindet nicht.

- **Was zurückgenommen wird:** **Entfernt**: die neuen Personen der Zusammenführung mit ihren Paaren, Quellen, Orten
  und Dateien; **Wiederhergestellt**: geänderte Angaben, auf den Wert vor der Zusammenführung; **Verbindungen
  aufgehoben**: die Personen des Stammbaums bleiben, nur ohne Angaben aus dem Import.
- **Bleibt, weil seither geändert:** eine nach dem Zusammenführen bearbeitete Person oder Angabe, eine bestätigte
  Angabe, eine Person mit einem neuen Verwandten, etwas, worauf eine spätere Zusammenführung aufbaut, und etwas, das
  noch von etwas zitiert wird, das bleibt. Bei jedem Eintrag lässt sich **Behalten** oder **Zurücknehmen** wählen.
- Ein Bild, das die Zusammenführung ersetzt hat, bringt nur die Sicherung **Vor dem Zusammenführen** zurück. Der
  Assistent zeigt auch den Unterschied zum Wiederherstellen der Sicherung: die Sicherung würde auch alles andere
  zurücksetzen, was seit der Zusammenführung im Stammbaum geschah.
- **Alles zurücknehmen** oder **Nur einige wählen…** (zurückgenommen wird nur, was angekreuzt ist). Eine teilweise
  zurückgenommene Zusammenführung lässt sich weiter zurücknehmen. Das Zurücknehmen legt eine Sicherung an, steht im
  Änderungsverlauf und lässt sich rückgängig machen (**Zurücknahme rückgängig machen**).
- **Grenzen:** ein gesperrter Stammbaum lässt sich nach dem Entsperren unter Stammbäume verwalten zurücknehmen; ein
  schreibgeschützter, sobald er bearbeitet werden kann. Baut eine spätere Zusammenführung auf der Zusammenführung auf,
  sagt der Assistent es. Das Zurücknehmen einer Zusammenführung, die schon in der Forschung ist, beschreibt
  [A8.13](#A8.13).
- **Bedienung:** Schritt 6 → **Zusammenführung zurücknehmen…**; **Verlauf der Zusammenführungen…** →
  **Zurücknehmen…**; die Schaltfläche „N Personen entfernen“.
- **Gilt seit:** App 3.32.0

<!-- zdroj: app:debf50cc src/merge/undo-plan.ts, src/merge/undo-view.ts, src/ui/merge-history-ui.ts (zápis se zálohou write.ts writeUndo, AuditLogManager, toast s redo) · strings.ts mergeWizard.undoTitle, undoLead, uRemove, uRestore, uUnjoin, uRemoveDesc, uRestoreDesc, uUnjoinDesc, uKeepHead, uEdited, uProven, uRelative, uLaterMerge, uUsed, uPicture, segKeep, segUndo, vsBackup, pickSome, pickAll, pickLead, btnUndo, builtOn, partlyDone, lockedUndo, undoReadOnly, undoNothing, undone, redo · spec 134 §10 -->

<a id="A8.13"></a>
## A8.13 Zusammenführen in einen Stammbaum mit Forschung

In einen mit einer Forschung verbundenen Stammbaum wird das Zusammenführen in der App geschrieben, und in die
Forschung geht nichts von selbst. Über das Senden entscheidet der Mensch in Schritt 6.

- Die Verbindung des Stammbaums mit der Forschung bleibt. Neue Personen und Verbindungen warten in der App („nicht an
  die Forschung gesendet · N Personen“), bis **An die Forschung senden…** oder **Vorerst nur in der App lassen**
  gewählt wird.
- In die Forschung gehen die Angaben als „Aus Stammbaum (ungeprüft)“, nie als belegt. Die Personen der Forschung
  behalten ihre Nummern, den Stand ihrer Angaben und ihre Zitate. Die Forschung bekommt die Änderungen über die
  Brücke; kein Agent wird gestartet. Arbeitet der Agent gerade, wartet das Senden bis zum Ende seines Schritts.
- Eine Forschung älterer Version kennt das Senden nach einem Zusammenführen nicht: der ganze Stammbaum wird über
  **Was gesendet wird** gesendet ([S1](S1-connecting-app-and-research.md)).
- **Zurücknehmen vor dem Senden:** die Forschung bekommt nichts. **Nach dem Senden:** die Forschung löscht Personen
  nicht von selbst. Die App nimmt sofort zurück und nennt den Schritt im Terminal der Forschung
  (`strom sync undo I…` mit **Kopieren**) oder verweist auf die Hilfe **In der App entfernte Person**
  ([S2.6](S2-edits-from-the-app.md#S2.6)). Bis dahin bringt die Forschung mit ihrer nächsten Version die Personen
  zurück, und die App bietet sie zum Entfernen an.
- **Grenzen:**
  - ein **Neuer Stammbaum** aus einem Import wird nicht mit einer Forschung verbunden;
  - ist die Quelle mit einer Forschung verbunden und das Ziel nicht, geht die Verbindung nicht auf das Ziel über; der
    Assistent bietet **Tauschen** an;
  - sind beide Stammbäume verbunden, gehen weder Verbindung noch Nummern der Quelle über, und die Personen der Quelle
    sind in der Forschung des Ziels neu;
  - sind dieselben Personen auch in einem anderen mit einer Forschung verbundenen Stammbaum, weist der Assistent
    darauf hin.
- **Gilt seit:** App 3.32.0

<!-- zdroj: app:debf50cc src/merge/ui.ts step6Research (mergeHold, unsentMerges), src/merge/research-hold.ts, research-marks.ts, same-people.ts · strings.ts mergeWizard.researchKept, resStep5, resPending, sendRes, keepLocal, notSent, resSendLead, resSendNote, resSent, resUndoStep, resUndoHelp, resUndoHelpLink, resComesBack, copy, resAgent, resOld, resNewTree, resSwap, resSwapBtn, resTwo, resSamePeople, modeNewDesc · src/help/topics.ts:38 HELP_LINKS.mergeUndoResearch = 'S2.6' · undoResearchStep (jen záznam I\d+) · research:src/commands/sync.ts:627 sync undo · spec 134 K9.1–K9.6 -->
