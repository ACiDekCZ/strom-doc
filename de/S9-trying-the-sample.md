<a id="S9"></a>
# S9 Am Beispiel ausprobieren

Das Beispiel ist eine erfundene Familie, an der sich Strom ohne eigene Daten ausprobieren lässt. Jede Sprache hat eine
eigene Familie: das deutsche Beispiel ist der Stammbaum **Beispiel – Familie Weber**. Es gibt zwei Wege: die App öffnet
das Beispiel aus dem Web oder aus einer Datei ohne Installation ([S9.1](#S9.1), [S9.2](#S9.2)), und die Forschung im
Terminal legt mit `strom demo` eine Beispielforschung an ([S9.4](#S9.4)). Eigene Stammbäume und Forschungen bleiben in
beiden Fällen unverändert. Lädt das Beispiel nicht herunter, bietet die App das kleine Beispiel an, das in der App
selbst ist ([S9.3](#S9.3)). Das Kapitel beschreibt die Strom-App 3.33.0 und die Forschung 1.38.0.

| Weg | Was entsteht | Braucht | Löschen |
|---|---|---|---|
| Web: **Am Beispiel ausprobieren** | der Stammbaum des Beispiels in der App ([S9.1](#S9.1)) | Netz | **Stammbäume verwalten** |
| die Beispieldatei (`.json`) | der Stammbaum des Beispiels in der App ([S9.2](#S9.2)) | nur die Datei | **Stammbäume verwalten** |
| **Kleines Beispiel ausprobieren** | der Stammbaum **Beispiel: Familie Berg** ([S9.3](#S9.3)) | nichts | **Stammbäume verwalten** |
| `strom demo` | eine Beispielforschung auf der Festplatte, in der App geöffnet ([S9.4](#S9.4)) | installierte Forschung, Netz | `strom demo --remove` |

<!-- zdroj: dirigent:spec/143-ukazkova-data K1.1–K1.4, K2.1–K2.2 · app:src/ui/showcase-open-ui.ts, src/showcase-download.ts · web:demo/cs/strom-ukazka-cs.json hlavička name „Ukázka – rod Horáků“ (en Hartley, de Weber, pl Jaworski) · research:src/core/demo.ts, src/commands/demo.ts -->

<a id="S9.1"></a>
## S9.1 Das Beispiel aus dem Web

Die Schaltfläche **Am Beispiel ausprobieren** auf stromapp.info öffnet die App mit der Adresse `/run/?demo=<Sprache>`
in der Sprache der Seite. Die App lädt die Beispieldatei vom selben Web herunter und öffnet sie als eigenen Stammbaum
mit dem Etikett **Beispiel** ([S9.1.2](#S9.1.2)).

- Das Herunterladen zeigt die Meldung **Beispiel wird heruntergeladen** mit dem Fortschritt („<geladen> MB von
  <gesamt> MB · <Prozent> %“) und der Schaltfläche **Abbrechen**. Abbrechen legt nichts an: „Das Herunterladen wurde
  abgebrochen. Nichts hat sich geändert.“
- Der Stammbaum des Beispiels entsteht erst, wenn die ganze Datei heruntergeladen und ihr Kopf geprüft ist. Dann
  wechselt die App den Stammbaum wie bei jedem Wechsel: die Änderungen des offenen Stammbaums gehen zuerst, und das
  Verfolgen seiner Forschung endet ([S1.4](S1-connecting-app-and-research.md#S1.4)). Am Ende sagt sie „Das Beispiel
  ist geöffnet.“
- Aus dem Stammbaum des Beispiels wird nichts an eine Forschung oder Brücke gesendet.
- **Grenzen:**
  - die Adresse nimmt nur `cs`, `en`, `de` und `pl`; einen anderen Wert verwendet die App nicht;
  - `?demo=` verschwindet aus der Adresse, sobald es gelesen ist: eine neu geladene Seite lädt das Beispiel nicht
    noch einmal herunter;
  - die Sprache der App ändert sich nicht; das Beispiel einer anderen Sprache ist ein anderer Stammbaum;
  - die Datei wird von der Adresse `/demo/<Sprache>/strom-ukazka-<Sprache>.json` neben der App heruntergeladen;
  - lässt sich das Beispiel nicht herunterladen oder speichern, bleibt der offene Stammbaum, wie er war, und nichts
    halb Angelegtes bleibt zurück ([S9.3](#S9.3)).
- **Bedienung:** Web: **Am Beispiel ausprobieren**; App: **Neuer Stammbaum → Beispiel mit Forschung ausprobieren** und
  der Link **Beispiel mit Forschung ausprobieren** bei einem leeren Stammbaum (beide öffnen das Beispiel in der
  Sprache der App). Der Link `?demo=` funktioniert auch im Browser eines Telefons und in der installierten App.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/ui/research-ui.ts initExternalOpen (?demo= pryč z adresy hned, i při jiné hodnotě), runExternalRequest (nainstalovaná aplikace) · src/showcase-download.ts showcaseLangParam, showcaseFileUrl, downloadShowcase · src/ui/showcase-open-ui.ts openShowcaseFromUrl, downloadShowcaseWithToast, openShowcaseFile (runTreeSwitch, researchFollowBeforeSwitch), createShowcaseTree, tieShowcaseResearch (sendMode 'off', bez adresy mostu), tryShowcase, showcaseLangOfUi · index.html new-tree-showcase-option, prázdný stav sample.tryTitle · strings.ts sample.downloading, downloadedOf, cancelled, openedTitle, tryTitle · web:js/i18n.js demo_try_btn (za branou demo) · app 9ea6ca78..534f3e9d -->

<a id="S9.1.1"></a>
### S9.1.1 Erneutes Öffnen und ein neueres Beispiel

Ein Beispiel, das schon im Browser ist, wird nicht noch einmal heruntergeladen: die App wechselt nur zu ihm, ohne
Meldung und ohne Fenster. Danach fragt sie das Web nach der Version des Beispiels. Hat das Web eine neuere, bietet die
App sie mit der Meldung „Ein neueres Beispiel ist da (<Version>).“ und den Aktionen **Beispiel aktualisieren…** und
**Jetzt nicht** an.

- Die Meldung bietet eine neuere Version einmal pro Version an. Solange die App von einer neueren Version weiß, hat
  sie auch das Menü ⋯ der Zeile des Beispiels in **Stammbäume verwalten**: **Beispiel aktualisieren (<Version>)…**.
- Die Aktualisierung fragt zuerst (**Beispiel aktualisieren?**: „Der Stammbaum „…“ wird durch das Beispiel Version …
  ersetzt. Änderungen im Beispiel gehen verloren. Andere Stammbäume bleiben unverändert.“). Dann lädt sie das neue
  Beispiel herunter und ersetzt die Daten des Stammbaums. Der Stammbaum bleibt derselbe, mit Namen und Einstellungen:
  die Standardperson (wenn das neue Beispiel sie hat), die Standardansicht und die gespeicherten Ansichten der
  Tabelle. Am Ende sagt sie „Das Beispiel ist auf Version <Version> aktualisiert.“
- **Grenzen:**
  - das Beispiel wird an seiner Markierung erkannt, nicht am Namen: zu einem umbenannten Beispiel wird weiter nur
    gewechselt, und es wird weiter aktualisiert;
  - eine Aktualisierung, die nicht gelingt, lässt den Stammbaum, wie er war;
  - eine geöffnete Beispieldatei, die neuer ist als der Stammbaum des Beispiels, bietet die Aktualisierung direkt aus
    dieser Datei an;
  - eine eigenständige HTML-Datei fragt das Web nicht nach der Version.
- **Bedienung:** App: Meldung **Beispiel aktualisieren…**; **Stammbäume verwalten → ⋯ → Beispiel aktualisieren
  (<Version>)…**
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/ui/showcase-open-ui.ts openShowcaseFromUrl (existing → switchToShowcase, checkShowcaseVersion jen mimo embedded), checkShowcaseVersion (localStorage strom-sample-offered-<lang>, jednou za verzi), offerShowcaseUpdate, updateShowcase, replaceShowcaseTree, keepShowcaseSettings (defaultPersonId, defaultView, tableViews, lastFocus) · src/showcase-download.ts showcaseVersionUrl, newerShowcaseVersion · src/tree-manager.ts findTreeByExportId (exportId showcase-<lang>) · src/ui/tree-actions.ts sampleUpdate (jen Správa stromů) · strings.ts sample.newerTitle, update, notNow, updateTitle, updateConfirm, updated, updateMenu -->

<a id="S9.1.2"></a>
### S9.1.2 Das Etikett Beispiel und das Löschen des Beispiels

Der Stammbaum des Beispiels hat das Etikett **Beispiel** in der Kopfzeile hinter dem Namen des Stammbaums, im
Stammbaum-Umschalter und in **Stammbäume verwalten**. Die Sprechblase des Etiketts sagt: „Eine erfundene Familie zum
Ausprobieren. Andere Stammbäume bleiben unverändert; das Beispiel lässt sich unter „Stammbäume verwalten“ löschen.“

- Die Zeile des Beispiels in **Stammbäume verwalten** nennt das Datum, auf dem die Daten des Beispiels stehen
  („Stand <Datum>“).
- Das Beispiel wird wie jeder Stammbaum gelöscht: **Stammbäume verwalten → Stammbaum löschen…** mit der üblichen
  Bestätigung. Andere Stammbäume ändern sich dadurch nicht.
- **Grenzen:** das Etikett hängt an der Markierung des Stammbaums, nicht am Namen: ein umbenanntes Beispiel behält es.
  Auch das kleine Beispiel hat das Etikett ([S9.3](#S9.3)).
- **Bedienung:** App: Etikett **Beispiel** (auf einem Touchscreen zeigt ein Tippen die Sprechblase); **Stammbäume
  verwalten**
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/ui/sample-tag.ts sampleTagHtml · src/tree-manager.ts sampleKindOf, markSampleTree · src/tree-row.ts treeSampleKind (showcase i demo) · src/ui/tree-management.ts tree-badge--sample, sample.asOf · strings.ts sample.tag, tagTitle, asOf · app 9ea6ca78, 3505db77, bc1c497d -->

<a id="S9.1.3"></a>
### S9.1.3 Die Forschung des Beispiels nur zum Ansehen

Der Stammbaum des Beispiels aus dem Web oder aus der Beispieldatei bringt auch eine Momentaufnahme seiner Forschung
mit. Die Forschungsübersicht, was die Forschung weiß, und die Materialien lassen sich direkt in der App durchsehen,
ohne Installation der Forschung und ohne KI-Abonnement. In die Momentaufnahme wird nichts geschrieben, und aus ihr wird
nichts irgendwohin gesendet.

- Nach dem Öffnen des Beispiels die Meldung **Das Beispiel ist geöffnet.**: „Seine Forschung lässt sich durchsehen;
  Änderungen gehen an keine Forschung.“ In **Stammbäume verwalten** hat der Stammbaum des Beispiels die Zeile
  „Forschung des Beispiels · nur zum Ansehen“.
- Die Forschungsübersicht hat unter der Kopfzeile „Stand des Beispiels: <Datum>“ und „Im Beispiel nur zum Ansehen –
  volle Forschung:“ mit dem Befehl `strom demo` ([S9.4](#S9.4)), der Schaltfläche **Kopieren** und dem Link
  **Anleitung ↗** zur Installationsseite der Forschung.
- Die **Hauptaktionen** der Forschung bleiben sichtbar, ausgegraut, mit Kennzeichen: Arbeit des Agenten, Senden von
  Änderungen, ein Widerspruch, ein Widerspruch an den Agenten, eine Hypothese, eine Antwort, die Reihenfolge der
  Warteschlange, sofortige Verarbeitung, eine neue Richtung und ein Gespräch mit dem Agenten. Eine Sprechblase
  (Darüberfahren, Fokus oder Tippen; Escape schließt sie) erklärt: **Im Beispiel nur zum Ansehen**, „In der vollen
  Forschung: <Aktion> · <Kennzeichen>“ (**KI + Terminal** oder **Terminal**,
  [S4.5.1](S4-research-from-the-app.md#S4.5.1)) und „Volle Forschung mit dem Agenten:“ `strom demo` mit **Kopieren**
  und **Anleitung ↗**.
- Die Fußzeile des Menüs **Forschung** zeigt **Im Beispiel nur zum Ansehen** und das Menü „Änderungen werden nicht an
  die Forschung gesendet“. **Senden** ist ausgegraut, mit Erklärung auch in der Synchronisationsleiste und in **Was
  gesendet wird**. Auf dem Telefon sind im Blatt **Mehr** **Mit dem Agenten weitermachen** und **Senden** ausgegraut;
  Tippen sagt, warum.
- **Grenzen:**
  - andere Schreibvorgänge in die Forschung und die Aktionen der Häuser sind gar nicht zu sehen
    ([S10.13](S10-houses.md#S10.13));
  - Änderungen am Stammbaum des Beispiels bleiben in der App und gehen nicht an die Forschung;
  - aus dem Beispiel startet kein Agent.
- **Bedienung:** App: Menü **Forschung**, die Forschungsübersicht, die Sprechblase an einer ausgegrauten Aktion
- **Gilt seit:** App 3.33.0

<!-- zdroj: dirigent:spec/143-ukazkova-data K4, K4.1, úkol A2 · app:src/showcase-bridge.ts (most ze snímku, každý zápis 403 showcase.read-only) · src/research-link.ts SHOWCASE_ALLOWS (10 hlavních akcí zašedlé, house: 'hide') · src/ui/sample-why.ts sampleNoteEl, showcaseWhyContent · src/tree-row.ts treeOriginLine · src/ui/showcase-open-ui.ts · strings.ts sample.originLine, openedTitle, opened, asOfLine, readOnly, whyTitle, whyFull, whyWhat, copy, howTo, sync.sendOffLine, mobileMenu.more · app 73628eda, 617b893e, 0754e561, bdb0b181, 635112ff, c8de3d8c, 67351f80, 89f6c9a5 · nález N7: K4.1 „neaktivní s vysvětlením“ × kód ostatní zápisy skryje -->

<a id="S9.2"></a>
## S9.2 Die Beispieldatei und die eigenständige HTML-Datei

Die Beispieldatei (`strom-ukazka-<Sprache>.json`) liegt im Web zum Herunterladen neben der Schaltfläche **Am Beispiel
ausprobieren**. In der App öffnet sie sich durch Ziehen ins Fenster oder über **Neuer Stammbaum → Aus JSON** und geht
dann denselben Weg wie das Beispiel aus dem Web ([S9.1](#S9.1)): es entsteht ein eigener Stammbaum mit dem Etikett
**Beispiel**, erneutes Öffnen wechselt nur zu ihm, und eine neuere Datei bietet die Aktualisierung an
([S9.1.1](#S9.1.1)).

- Die App erkennt eine Beispieldatei am Kopf in der Datei, nicht am Namen. Wo der Browser es erlaubt, zeigt schon das
  Ziehen „Hier ablegen: Beispiel öffnen“.
- Beim Lesen zeigt die Meldung **Beispiel wird geöffnet** den Namen und die Größe der Datei und die Schaltfläche
  **Abbrechen**.
- Eine eigenständige HTML-Datei (gespeichertes HTML, [A7.7](A7-book-pages-and-export.md#A7.7)) lädt das Beispiel nicht
  herunter. **Beispiel mit Forschung ausprobieren**, der Link bei einem leeren Stammbaum und `?demo=` öffnen in ihr das
  Fenster **Beispiel mit Forschung** mit den Möglichkeiten **Beispieldatei herunterladen (stromapp.info) ↗** (öffnet
  die Datei im Web in einem neuen Fenster), **Kleines Beispiel öffnen** und **Heruntergeladene Beispieldatei öffnen…**.
- **Grenzen:**
  - eine Beispieldatei öffnet sich immer als eigener Stammbaum, auch wenn der Import für den offenen Stammbaum gedacht
    war;
  - eine Datei, die sich nicht lesen lässt, oder eine Datei für eine neuere Version der App meldet das Fenster aus
    [S9.3](#S9.3), ohne **Erneut versuchen**.
- **Bedienung:** App: Datei ins Fenster ziehen; **Neuer Stammbaum → Aus JSON**; in einer eigenständigen HTML-Datei
  **Neuer Stammbaum → Beispiel mit Forschung ausprobieren → Heruntergeladene Beispieldatei öffnen…**; Web: Link
  **Beispieldatei zum Herunterladen**
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:src/ui/import-export.ts importDroppedJson (fileLooksLikeShowcase), JSON import isShowcaseFile → openShowcaseFromJson („whatever tree the import was meant for“) · src/showcase-format.ts (kind strom-showcase) · src/ui/showcase-open-ui.ts openShowcaseRead (opening, Zrušit do přečtení), showShowcaseEmbedded, pickShowcaseFile, openShowcaseFromUrl (embedded → showShowcaseEmbedded) · strings.ts sample.dropTitle, opening, embeddedTitle, embeddedLink, embeddedOpen, openSmall, treeManager.fromJson · web:js/i18n.js demo_file · app 33b82179 -->

<a id="S9.3"></a>
## S9.3 Wenn das Beispiel nicht herunterlädt: das kleine Beispiel

Lädt das Beispiel nicht herunter oder lässt es sich nicht öffnen, sagt die App den Grund in einem Fenster. Die
Hauptwahl des Fensters ist **Kleines Beispiel öffnen**. Der offene Stammbaum ändert sich nicht.

| Wann | Titel des Fensters | Erneut versuchen |
|---|---|---|
| die App hat keine Verbindung | **Das Beispiel wurde nicht heruntergeladen** | ja |
| der Server antwortete mit einem Fehler, oder das Herunterladen brach ab | **Das Beispiel wurde nicht heruntergeladen** | ja |
| im Browserspeicher ist kein Platz | **Kein Platz für das Beispiel** | nein |
| die Datei ist beschädigt oder unbekannt (Kopf fehlt) | **Die Beispieldatei lässt sich nicht öffnen** | nein |
| das Beispiel ist für eine neuere Version der App | **Die Beispieldatei lässt sich nicht öffnen** | nein |

- Das kleine Beispiel ist der Stammbaum **Beispiel: Familie Berg**. Es ist in der App selbst und öffnet sich auch
  ohne Netz. Mit einer Forschung wird es nie verbunden ([S1.3.1](S1-connecting-app-and-research.md#S1.3.1)).
- **Grenzen:**
  - im Browserspeicher muss für das Beispiel mindestens doppelt so viel Platz frei sein, wie es groß ist. Die App
    prüft das vor dem Herunterladen und währenddessen und hält das Herunterladen bei zu wenig Platz sofort an;
  - lässt sich der Stammbaum des Beispiels nicht ganz speichern, löscht die App ihn wieder und öffnet den Stammbaum,
    der vorher offen war.
- **Bedienung:** App: **Kleines Beispiel öffnen**, **Erneut versuchen**, **Schließen**; das kleine Beispiel auch über
  **Neuer Stammbaum → Kleines Beispiel ausprobieren** und den Link **Kleines Beispiel ausprobieren** bei einem leeren
  Stammbaum.
- **Gilt seit:** App 3.33.0 (das kleine Beispiel seit App 3.29.0 unter dem Namen **Beispiel-Stammbaum
  ausprobieren**)

<!-- zdroj: app:src/ui/showcase-open-ui.ts showcaseErrorText, showShowcaseError (retry jen offline a server), createShowcaseTree, dropShowcaseTree · src/showcase-download.ts downloadShowcase, showcaseRoomNeeded (2×), showcaseRoomShort, showcaseFetchFailure · src/ui/import-export.ts loadDemoTree, openDemoTree (markDemoTree) · index.html demo.tryDemoSmall (Nový strom, prázdný stav) · strings.ts sample.errTitle, errOffline, errServer, errSpaceTitle, errSpace, errBrokenTitle, errBroken, errFormat, retry, openSmall, demo.treeName, demo.tryDemoSmall · app b831dcdd -->

<a id="S9.4"></a>
## S9.4 Die Beispielforschung: `strom demo`

`strom demo [cs|en|de|pl]` lädt die Beispielforschung vom Web der Strom-App herunter, legt sie in einem eigenen Ordner
an und öffnet sie in der App als Forschung (wie `strom app`). Alles in ihr lässt sich ohne KI-Abonnement ansehen: die
Forschungsübersicht, die Richtungen, die Warteschlange, die Quellen, die Materialien und die Aufgaben, die auf den
Menschen warten.

- Die Forschung lädt von `https://stromapp.info/demo/<Sprache>/` die Datei `VERSION`, das Paket dieser Version und
  seine SHA-256 herunter. Sie prüft das Paket an seiner SHA-256 und entpackt es wie `strom unpack` (jedes Bild an
  seiner SHA-256, der ganze Stammbaum geprüft).
- Die Beispielforschung liegt im Ordner `demo` im Einstellungsordner von `strom` (`~/.config/strom/demo`, unter
  Windows `.config\strom\demo` im Ordner des Benutzers), mit eigenen Einstellungen, eigenen Stammbäumen, eigenem
  gemeinsamen Ordner und eigenem Schlüssel des Siegels. Eigene Stammbäume, ihre Sicherungen und Einstellungen ändern
  sich nicht; das Beispiel ist nicht unter den eigenen Stammbäumen. Seine `strom.json` hat `demo: true`.
- Die Forschung startet auf dem Beispiel von sich aus keinen Agenten, und die Brücke des Beispiels bietet der App
  nichts von einem Agenten an: sie nennt keinen Agenten und keine Läufe, wartende Aufgaben haben kein Gespräch mit dem
  Agenten und keine Rückgabe an den Agenten, und sie bietet kein sofortiges Lesen eines Dokuments und keine
  Sammelprüfung an. `strom demo` fragt beim ersten Öffnen nicht, ob die App die Forschung starten darf.
- **Ab App 3.33.0:** der Stammbaum der Beispielforschung hat in der App das Etikett **Beispiel** ([S9.1.2](#S9.1.2)),
  und die App bietet bei ihm nichts von einem Agenten an.
- Ohne Sprache nimmt `strom demo` die Sprache, in der `strom` im Terminal spricht; ist das keine der vier Sprachen,
  nimmt es `en`.
- **Grenzen:**
  - ein zweiter Aufruf für dieselbe Sprache lädt nichts herunter und öffnet das Beispiel, das schon auf dem Computer
    ist („Die Beispielforschung „…“ ist schon da“); Beispiele mehrerer Sprachen können nebeneinander auf dem Computer
    sein;
  - ein Paket, dessen SHA-256 nicht passt, wird nicht verwendet, und nichts wird angelegt; ebenso ein Paket in einer
    anderen Sprache als der verlangten und ein Paket mit Konnektoren (ein Beispiel hat keine);
  - eine Beispielforschung, die sich nicht ganz anlegen lässt, wird wieder gelöscht;
  - ohne Internet: „die Beispielforschung ließ sich nicht herunterladen“, mit dem Rat, `strom demo` erneut zu starten,
    sobald der Computer online ist;
  - eine andere Sprache als `cs`, `en`, `de`, `pl` lehnt die Forschung ab.
- **Bedienung:** Terminal: `strom demo`, `strom demo de`; Web: Installationsseite der Forschung, Abschnitt
  **Beispielforschung**
- **Gilt seit:** Forschung 1.38.0
- **Warum:** das Beispiel soll sich ohne KI-Abonnement ansehen lassen; ein Agent darf daran arbeiten, aber die
  Forschung bietet keinen an und empfiehlt keinen (Entscheidung vom 25. 11. 2026).

<!-- zdroj: research:src/commands/demo.ts (demoBase, run: demoLang(ctx.uiLang()) ?? "en", had → jen otevřít, own Settings, c.demo = true, app.run, rm při chybě) · src/core/demo.ts DEMO_LANGS, DEMO_FOLDER, demoPaths, demoEnv, downloadDemo (SHA-256, demo.download, demo.damaged), unpackDemo (demo.lang, demo.code), DEMO_MAX_BYTES · src/core/paths.ts configDir · src/core/live.ts forDemo, DEMO_HIDDEN, tree.demo, agent/runs undefined, accepts (bez read) · src/core/waiting.ts demo (bez chat a retry) · src/commands/start.ts offerLinks (ne u ukázky) · assets/lang/cs.json ui.demo.*, ui.error.demo.* · dirigent:spec/143-ukazkova-data Rozhodnutí 25. 11., K2.1, K2.2 · web:js/i18n.js demo_cmd_title · research afed49d3, 97fc3a23, 8500b369, 3348ed20 · app:src/ui/sample-tag.ts researchDemoTree, src/research-device.ts storedResearchDemo, src/ui/research-sync-ui.ts activeResearchNoAgent · app a0c2a8bb, 8f6731a0 -->

<a id="S9.4.1"></a>
### S9.4.1 Löschen: `strom demo --remove`

`strom demo --remove` beendet die Brücke der Beispielforschung und löscht ihren ganzen Ordner: die Beispiele aller
Sprachen, ihre Einstellungen und Schlüssel des Siegels. Sonst löscht es nichts. Die Kopie des Beispiels in der App wird
in der App gelöscht, in **Stammbäume verwalten**.

- **Grenzen:**
  - solange jemand am Beispiel arbeitet, löscht die Forschung es nicht: „an der Beispielforschung wird gerade
    gearbeitet – gelöscht wird sie, wenn die Arbeit endet“;
  - endet die Brücke des Beispiels nicht, wird nichts gelöscht;
  - ohne Beispiel auf dem Computer: „Auf diesem Computer ist keine Beispielforschung.“
- **Bedienung:** Terminal: `strom demo --remove`; App: **Stammbäume verwalten → Stammbaum löschen…**
- **Gilt seit:** Forschung 1.38.0

<!-- zdroj: research:src/commands/demo.ts removeDemo (anyoneAtWork → demo.atwork, stopLive → demo.bridge, rmSync root) · assets/lang/cs.json ui.demo.none, ui.demo.removed, ui.demo.removed.app, ui.error.demo.atwork, ui.error.demo.bridge -->
