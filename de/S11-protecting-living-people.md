<a id="S11"></a>
# S11 Schutz lebender Personen

Angaben zu lebenden Personen verlassen den Stammbaum in Dateien, auf Papier und beim Teilen. App und Forschung
unterscheiden zwei Arten von Ausgaben. Eine Ausgabe **nach außen** (eine Datei oder ein Papier, das aus der Hand geht,
an einen anderen Menschen oder an ein anderes Programm) geht immer durch einen Schutz lebender Personen: dieselbe
Regel, wer lebt, dieselben Stufen in derselben Reihenfolge und dieselbe Standardstufe aus den Einstellungen. Eine
Ausgabe **für sich selbst** (Sicherung, Übertragung, das eigene Genealogieprogramm) trägt absichtlich alle Angaben und
sagt das in einem Satz. Das Kapitel beschreibt die App Strom 3.33.0 und die Forschung 1.38.0.

| Ausgabe | Art | Wo |
|---|---|---|
| **App mit den Daten (HTML)**, **GEDCOM › Zum Teilen mit anderen**, **Personentabelle (CSV)** | nach außen | [S11.4](#S11.4), [A7.7](A7-book-pages-and-export.md#A7.7), [S6.6](S6-tree-from-another-program.md#S6.6) |
| **An Verwandte senden** und das Änderungspaket | nach außen | [S11.4](#S11.4) |
| **Poster** | nach außen | [S11.4](#S11.4) |
| **Familienbuch**, **Verknüpfte Seiten** | nach außen | [A7.4](A7-book-pages-and-export.md#A7.4), [A7.5](A7-book-pages-and-export.md#A7.5) |
| Fenster **Familienseiten** und sein Druck | nach außen | [S11.4](#S11.4) |
| **Personenseite**: Fenster, Druck, **Als HTML speichern** | nach außen | [S11.4](#S11.4), [A7.6](A7-book-pages-and-export.md#A7.6) |
| **Hausseite speichern** | nach außen | [S10.3.2](S10-houses.md#S10.3.2) |
| Export der Tabelle (CSV, XLSX), CSV der Liste | nach außen | [A6.7.9](A6-views.md#A6.7.9), [A11.9](A11-lists-of-people.md#A11.9) |
| **Stammbaum verschenken** | nach außen | [A7.9.2](A7-book-pages-and-export.md#A7.9.2) |
| Forschung: `strom export gedcom --living` | nach außen | [S11.7](#S11.7) |
| **Datensicherung (JSON)**, **In Datei speichern**, **Sicherungen** | für sich selbst | [S11.5](#S11.5), [S6.5](S6-tree-from-another-program.md#S6.5) |
| **GEDCOM › Zurück zu {program}**, GEDCOM für die Forschung | für sich selbst | [S11.5](#S11.5), [S6.6](S6-tree-from-another-program.md#S6.6) |
| Forschung: `output/tree.ged`, `strom pack` | für sich selbst | [S11.5](#S11.5) |

- **Grenzen:** Kanäle im Inneren sind keine Ausgabe, und der Schutz betrifft sie nicht: die Brücke zwischen App und
  Forschung, das Telefon im Netzwerk und die Agenten der Forschung.

<!-- zdroj: dirigent:spec/151-soukromi-zijicich-ve-vystupech (Princip 1–4, Kde se to ukáže) · app:61f9b492, 11d35186, 47500acc, fe52bfb2, bda4fd2c, fbc447a0, 355a550d, 51223455, 0ad8f5e9 (ověřeno na 988b0f86) · src/privacy.ts applyOutputPrivacy · src/ui/privacy-block.ts privacyBlockHtml · strings.ts privacy.label · CHANGELOG.de.md aplikace 3.33.0 · research:ccfe4110, 8a0fed12 src/gedcom/privacy.ts, src/commands/output.ts · CHANGELOG.de.md výzkumu 1.38.0 -->

<a id="S11.1"></a>
## S11.1 Wer eine lebende Person ist

Für alle Ausgaben von App und Forschung gilt eine Regel. Entschieden wird in dieser Reihenfolge:

1. Eine von Hand als verstorben markierte Person (**Verstorben**) ist verstorben. Eine Person, bei der **Verstorben**
   von Hand abgehakt wurde, ist lebend.
2. Eine Person mit einem Eintrag zum Tod ist verstorben: Datum, Ort, Adresse, Ursache oder Alter beim Tod, oder
   Beerdigung oder Einäscherung. Eine Beerdigung oder Einäscherung ohne Sterbedatum bedeutet also eine verstorbene
   Person.
3. Eine Person ohne jeden Anhaltspunkt zum Geburtsjahr ist lebend (sichere Wahl).
4. Sonst ist sie lebend, wenn seit ihrem spätestmöglichen Geburtsjahr weniger als 110 Jahre vergangen sind.

- **Das spätestmögliche Geburtsjahr:**
  - jedes Datum zählt nach dem spätesten Jahr, das es bedeuten kann: eine Spanne nach ihrem Ende, „nach dem Jahr X“
    gibt keine Grenze;
  - die eigenen Daten und Ereignisse der Person;
  - der Beginn einer Verbindung und ihre Ereignisse (Aufgebot, Haushaltszählung): mindestens 14 Jahre davor. Das Ende
    einer Verbindung (eingereichte Scheidung, Nichtigerklärung) zählt nicht;
  - Kinder: ein Elternteil ist mindestens 12 Jahre älter als das Kind, über alle Generationen.
- **Die Forschung** urteilt ebenso nach der vollständigen GEDCOM-Datei des ganzen Stammbaums: ein Tod ist jede Zeile
  `DEAT`, `BURI` oder `CREM`; Anhaltspunkte sind die datierten Angaben der Person (außer `CHAN` und eigenen Tags `_`),
  die Angaben der Familie `FAM` (außer `DIV`, `DIVF`, `ANUL`) und die Kinder. Ein manuelles **Verstorben** geht als
  Tod in die Datei; ein von Hand abgehaktes **Verstorben** trägt die Datei nicht. App und Forschung haben in ihren
  Tests eine gemeinsame Tabelle von Fällen.
- **Grenzen:**
  - das Zeichen † bei einer Person im Stammbaum folgt einer anderen Regel (vermutlich verstorben nach 120 Jahren) und
    steuert den Schutz nicht;
  - die Forschung hat für die Steuerung ihrer eigenen Arbeit (Lebende werden nicht erforscht) eine eigene Regel mit
    100 Jahren; für Ausgaben gilt sie nicht;
  - eine Platzhalterperson zählt nicht zu den Lebenden.
- **Bedienung:** das Kästchen **Verstorben** in der Bearbeitung der Person; beim Hinzufügen eines Verwandten wird es
  von selbst angehakt, wenn Sterbedatum oder Sterbeort ausgefüllt werden. Die Hilfe des Schutzblocks fasst die Regel
  zusammen.
- **Gilt seit:** App 1.2.0 (vorher als [A7.1](A7-book-pages-and-export.md#A7.1)); Beerdigung und Einäscherung als
  Tod, Datumsspannen nach ihrem Ende und die Forschung: App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:61f9b492 src/privacy.ts isLivingPerson (isDeceased true/false, hasDeathRecord, bez meze = žijící, ASSUMED_MAX_AGE 110), inferBirthUpperBounds (latestYearOf, UNION_END_EVENTS, MIN_MARRIAGE_AGE 14, MIN_PARENT_AGE 12, fixpoint), countLivingPersons (bez isPlaceholder), presumedDeceasedSet · src/ui/person-modal.ts:2118 (deceasedToggled → isDeceased) · src/ged-exporter.ts:1892 (isDeceased true) · strings.ts privacy.who, person.deceased · research:ccfe4110 src/gedcom/privacy.ts ASSUMED_MAX_AGE, MIN_PARENT_AGE, MIN_MARRIAGE_AGE, latestYear, OWN_FACT, ENDS, livingOf · src/core/review.ts livingBorn, DEATH_AFTER_YEARS (beze změny) · test/fixtures/living-rule-cases.json (obě repa) -->

<a id="S11.2"></a>
## S11.2 Schutzstufen

Jede Ausgabe nach außen bietet dieselben vier Stufen in derselben Reihenfolge.

| Stufe | Name einer lebenden Person | Was bleibt |
|---|---|---|
| **Alle Angaben** | unverändert | alles |
| **Initialen + Geburtsjahr** | Initialen von Vorname und Nachname; der Ehename nur als Initiale | Geburtsjahr |
| **Nur Nachname** | „Lebende Person“ und der Nachname | – |
| **Namen ausblenden** | „Lebende Person“ ohne Nachnamen | – |

- **Was eine Stufe außer Alle Angaben den Lebenden nimmt:** Daten, Orte, Adressen, Alter und Ursache; Notizen,
  Erzählungen, das Foto und das Original des Porträts; Ereignisse, Zitate, Namensvarianten, Titel, Ehenamen, die
  offene Frage, E-Mails, REFN, die Angaben der Forschung und den Eintrag über Hinzufügen und Ändern.
- **Paare:** eine Verbindung, in der mindestens ein Partner lebt, verliert Daten, Ort, Adresse, Alter, Notiz, Zeugen,
  Erzählungen, Zitate, Ereignisse und das Paarfoto. Initialen behalten das Jahr des Beginns der Verbindung.
- **Verstorbene:** bleiben in allen Ausgaben und bei jeder Stufe vollständig, auch mit Quellen, Zitaten und Anhängen.
  Eine Quelle, die nur eine lebende Person zitiert, fällt weg; Anhänge Lebender und ihrer Verbindungen fallen weg.
- **Außerdem:** der Verlauf der Zusammenführungen kommt nicht in eine geschützte Ausgabe; ein Haus, in dem Menschen der
  letzten etwa 100 Jahre lebten, verliert seinen Namen ([S10.3.2](S10-houses.md#S10.3.2)).
- **Grenzen:** die Struktur bleibt immer: Personen, Beziehungen und Geschlecht. Der Text von Erzählungen wird nicht
  umgeschrieben: die Erzählung einer lebenden Person fällt mit ihren Angaben weg, die Geschichte eines Hauses steuert
  der Schalter der Ausgabe ([S10.14.2](S10-houses.md#S10.14.2)).
- **Bedienung:** der Block **Schutz lebender Personen** im Dialog der Ausgabe: Überschrift, woher die Stufe kommt
  ([S11.3](#S11.3)), die Hilfe **?**, vier Wahlmöglichkeiten und der Satz der Stufe mit „Verstorbene bleiben
  vollständig, auch mit Quellen.“ Auf dem Telefon haben die Wahlmöglichkeiten kurze Namen (**Alle Angaben**,
  **Initialen**, **Nachname**, **Ohne Namen**).
- **Gilt seit:** App 1.2.0 (vorher als [A7.2](A7-book-pages-and-export.md#A7.2)); einheitliche Namen, Reihenfolge und
  die Quellen Verstorbener in allen Ausgaben App 3.33.0

<!-- zdroj: app:61f9b492 src/privacy.ts PRIVACY_ORDER, privacyModeLabel, stripDetails, stripPartnershipDetails, applyLivingPrivacy (merges, house name, keepDeceasedSources) · fe52bfb2 applyOutputPrivacy (keepDeceasedSources: true všude) · src/ui/privacy-block.ts privacyBlockHtml, privacyDescText · strings.ts privacy.label, modeFull, modeInitials, modeMinimal, modeAnonymous, short, desc.*, deceasedStay, livingPerson · dirigent:spec/151 K1.2, K1.4, Mimo rozsah (vyprávění) -->

<a id="S11.3"></a>
## S11.3 Der Standardschutz aus den Einstellungen

Alle Ausgaben nach außen haben eine Standardstufe: **Einstellungen › Daten und Datenschutz › Schutz lebender Personen
in Ausgaben**, standardmäßig **Initialen + Geburtsjahr**. Die Wahl im Dialog gilt für diese eine Ausgabe.

- **Vorausgefüllt wird sie** beim Export (HTML, GEDCOM zum Teilen, CSV), bei **An Verwandte senden**, beim Poster, beim
  Export der Tabelle und beim Speichern der Hausseite. Der Block schreibt dann an der Überschrift „Standard aus den
  Einstellungen“ mit einem Link in die Einstellungen; nach einer Änderung von Hand verschwindet das.
- **Für jeden Stammbaum merken sich die Wahl** das Familienbuch und die verknüpften Seiten (gemeinsam), die
  Personenseite und das Geschenk. Hat ein Stammbaum noch keine Wahl, nehmen Buch, Seiten und Personenseite den
  Standard aus den Einstellungen. Eine gemerkte Wahl hat an der Überschrift „zuletzt für diesen Stammbaum“.
- **Das Fenster Familienseiten** beginnt mit der Wahl von Buch und Seiten des Stammbaums, sonst mit dem Standard aus
  den Einstellungen. Eine Änderung im Fenster gilt nur für das Fenster und wird nicht zurückgeschrieben.
- **Das Poster** nimmt beim ersten Öffnen den Standard aus den Einstellungen und hält dann die letzte Wahl, solange
  die Seite offen ist.
- **Das Geschenk** beginnt immer mit **Initialen + Geburtsjahr** (nicht aus den Einstellungen) und merkt sich die
  Wahl bei der Person oder dem Paar auf diesem Gerät ([A7.9](A7-book-pages-and-export.md#A7.9)).
- **Ohne Lebende:** ist in der Ausgabe keine lebende Person, ist der Block zum Satz „In der Ausgabe sind keine
  lebenden Personen.“ zusammengeklappt, und die Ausgabe geht mit allen Angaben. Eine Personenseite ohne Lebende
  beginnt mit Alle Angaben.
- **Grenzen:** Sicherungen und Übertragungen bleiben vollständig, die Einstellungen steuern sie nicht
  ([S11.5](#S11.5)). Die Lage der Häuser hat eine eigene Einstellung **Lage der Häuser in Ausgaben**
  ([S10.3.4](S10-houses.md#S10.3.4)).
- **Bedienung:** **Einstellungen › Daten und Datenschutz › Schutz lebender Personen in Ausgaben**; der Link
  „Einstellungen“ im Schutzblock.
- **Gilt seit:** App 3.33.0; Standards je Ausgabe vorher in [A7.2.1](A7-book-pages-and-export.md#A7.2.1)

<!-- zdroj: app:61f9b492 src/settings.ts getOutputPrivacy (výchozí initials), index.html output-privacy-setting · src/ui/privacy-block.ts originHtml (settings | tree), noLiving · strings.ts privacy.settingTitle, settingDesc, originSettings, originSettingsLink, originTree, noLiving · src/ui/encryption-ui.ts exportPresetPrivacy, exportPrivacyTouched · bda4fd2c src/ui/share-ui.ts, src/ui/export-image-ui.ts posterPrivacyChoice, src/ui/gift-tree-ui.ts (defaultGiftPrivacy others initials, originTree) · 355a550d src/ui/book-ui.ts:1262 (strom.book.{treeId}, jinak Nastavení), src/ui/family-pages-ui.ts windowPagesPrivacyPreset, src/ui/person-page-ui.ts:718, src/person-page.ts personPageExportPrivacy · 51223455 src/ui/house-page-ui.ts:578 · fbc447a0 src/ui/table-view/table-ui.ts showTableExport -->

<a id="S11.4"></a>
## S11.4 Ausgaben nach außen

Jede Ausgabe nach außen hat den Block **Schutz lebender Personen** ([S11.2](#S11.2)) mit der Standardstufe nach
[S11.3](#S11.3). Die Einzelheiten der Dialoge stehen bei den Ausgaben; hier nur, was wo anders ist.

- **Export:** **App mit den Daten (HTML)**, auch **Als App exportieren** für alle Stammbäume, **GEDCOM › Zum Teilen mit
  anderen** und **Personentabelle (CSV)**. Die Lebenden werden im Umfang des Exports gezählt (ganzer Stammbaum,
  Ansicht, Liste, Stammbaum einer Person). Eine Wahl von Hand bleibt auch nach dem Wechsel des Formats
  ([A7.7](A7-book-pages-and-export.md#A7.7), [S6.6](S6-tree-from-another-program.md#S6.6)).
- **An Verwandte senden:** der Standard aus den Einstellungen bei jedem Öffnen; die Lebenden werden im Umfang gezählt
  (ganzer Stammbaum, Zweig, Person). Der Umfang **Nur die Änderungen seit dem letzten Teilen** hat keine Wahl: das
  Änderungspaket geht mit demselben Schutz wie die ursprüngliche Freigabe („Änderungen werden mit demselben Schutz wie
  die ursprüngliche Freigabe geteilt: {Stufe}.“). Ist der ursprüngliche Schutz nicht bekannt (Freigabe aus einer
  älteren Version), gilt der Standard aus den Einstellungen, und der Dialog sagt das.
- **Poster:** der Dialog **Als Poster exportieren** (SVG, PNG, Drucken / PDF). Die Lebenden werden unter den Personen
  des Posters gezählt. Das Zeichen † und die Farben der Linien kommen aus den geschützten Daten: † haben nur Personen,
  die die Regel [S11.1](#S11.1) für verstorben hält.
- **Familienbuch** und **Verknüpfte Seiten:** die Lebenden werden im ganzen Stammbaum gezählt. Der Umschlag eines
  geschützten Buchs sagt „Angaben lebender Personen sind gekürzt.“; mit Alle Angaben warnen die Seiten, dass sie
  Angaben Lebender tragen werden ([A7.4](A7-book-pages-and-export.md#A7.4),
  [A7.5](A7-book-pages-and-export.md#A7.5)).
- **Fenster Familienseiten:** die Wahl in der Leiste des Fensters **Schutz: {Stufe} ▾** (auf dem Telefon der erste
  Eintrag von **⋯**), nur wenn im Fenster Lebende sind. Fenster und Druck zeigen die Seiten danach.
- **Personenseite:** das Fenster hat dieselbe Wahl in der Leiste vor **Drucken**; Fenster und Druck folgen ihr
  („Fenster und Druck aus dem Fenster folgen dieser Wahl. Vorausgefüllt aus dem Speichern der Personenseite.“).
  **Als HTML speichern** hat den Block nach dem Dateinamen und darunter eine Zeile, wen er betrifft („Betrifft nur
  lebende Personen: …“) ([A7.6](A7-book-pages-and-export.md#A7.6)).
- **Drucken** aus dem Fenster Familienseiten und aus der Personenseite hat unter geschützten Seiten die Fußzeile „… ·
  geschützt: {Stufe} · Seite N“, nur wenn auf ihnen Lebende sind.
- **Hausseite speichern:** die Namen Lebender und der Menschen der letzten etwa 100 Jahre nach der Stufe
  ([S10.3.2](S10-houses.md#S10.3.2)).
- **Export der Tabelle** (CSV, XLSX) und **CSV der Liste:** die Zeile einer lebenden Person bleibt; sie hat den Namen
  nach der Stufe, das Geburtsjahr nur bei Initialen und die Spalten **#** und **Erledigt**, die übrigen Spalten sind
  leer („Lebende Personen: Name wie geschützt, übrige Spalten leer.“). Ein geschütztes XLSX hat keine Farben und
  Kommentare von Befunden. Die Tabelle auf dem Bildschirm ändert sich nicht ([A6.7.9](A6-views.md#A6.7.9),
  [A11.9](A11-lists-of-people.md#A11.9)).
- **Stammbaum verschenken:** dieselben Namen und dieselbe Reihenfolge der Stufen für **Übrige Lebende**; der Haushalt
  des Beschenkten und die Ausnahmen gehen vollständig ([A7.9.2](A7-book-pages-and-export.md#A7.9.2)).
- **Eine geschützte Datei** (HTML, JSON, GEDCOM) trägt eine Markierung, wie viele Lebende sie schützt
  ([S11.6](#S11.6)).
- **Grenzen:** ohne Lebende in der Ausgabe geht alles mit allen Angaben, und es gibt keine Markierung.
- **Gilt seit:** App 3.33.0

<!-- zdroj: app:11d35186, fe52bfb2 src/ui/encryption-ui.ts exportPresetPrivacy, exportLivingCount, src/ui/import-export.ts:589 (applyLivingPrivacy, privacyMarkFor) · bda4fd2c src/ui/share-ui.ts (getBaselinePrivacy ?? Nastavení), strings.ts share.samePrivacy, share.privacyUnknown, share.scopeChanges · src/ui/export-image-ui.ts posterPrivacyMode, :475 (deceased = !living) · 355a550d src/ui/book-ui.ts, strings.ts book.coverProtected, familyPages.privacyWarn · src/ui/family-pages-ui.ts winPrivacy, windowSetLiving · src/ui/person-page-ui.ts pv-compact, strings.ts privacy.compactPrefix, windowLine, personPage.privacyWho · 0ad8f5e9 src/ui/privacy-block.ts windowPrintFooterCss, privacy.printProtected, printPage · 51223455 src/ui/house-page-ui.ts · fbc447a0 src/ui/table-view/table-privacy.ts protectTableExport (LIVING_KEPT, checks null), table-ui.ts exportPersonListCsv, strings.ts table.exportPrivacyWhat, exportListTitle · src/ui/gift-tree-ui.ts (PRIVACY_ORDER, privacyModeLabel) -->

<a id="S11.5"></a>
## S11.5 Ausgaben für sich selbst

Ausgaben für Sicherung und Übertragung tragen alle Angaben aller Personen, auch der Lebenden. Hat der Stammbaum
Lebende, sagen sie das in einem Satz: „Enthält alle Angaben zu lebenden Personen – für die eigene Sicherung oder
Übertragung, nicht zum Weitergeben.“

- **Datensicherung (JSON)** und **Alle Stammbäume exportieren › Als JSON exportieren:** beginnen mit **Alle Angaben**
  ohne Herkunft und mit dem Satz; der Block lässt sich ändern. Eine geschützte Sicherung trägt die Markierung
  ([S11.6](#S11.6)).
- **Sicherungen** (Fenster **Sicherungsverlauf**): der Satz unter dem Fenster, wenn der Stammbaum Lebende hat
  ([S6.5](S6-tree-from-another-program.md#S6.5)).
- **GEDCOM › Zurück zu {program}:** ohne Schutzblock; stattdessen der Satz und die Zahl: „Die Datei enthält Angaben zu
  N lebenden Personen und gehört nur ins eigene Programm.“ ([S6.6](S6-tree-from-another-program.md#S6.6)).
- **GEDCOM für die Forschung:** **Änderungen an die Forschung senden › GEDCOM exportieren** hat den Satz in der
  Bestätigung.
- **In Datei speichern** (schnelles Speichern, Strg+S) ändert sich nicht: ein vollständiges JSON ohne Block und ohne
  Satz ([S8.1](S8-where-the-data-are.md#S8.1)).
- **Forschung:** `strom export gedcom` schreibt das vollständige `output/tree.ged` (und die Datei für die App Strom)
  wie bisher und gibt den Satz aus; `strom pack` gibt den Satz ebenfalls aus. Die Hilfe beider sagt das.
- **Grenzen:** in der App erscheint der Satz nur bei einem Stammbaum mit Lebenden; die Forschung gibt ihn bei jeder
  vollständigen Datei aus.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:47500acc src/ui/encryption-ui.ts isSelfFormat (json, all), exportPresetPrivacy (full, origin null), :853 self · src/ui/export-gedcom-ui.ts:196 export-back-living (selfOnly + exportGed.livingNote) · index.html:40323 snapshots-self, src/ui/snapshots-ui.ts:76 · src/ui/research-ui.ts:3388 offerResearchGedcom selfLine · strings.ts privacy.selfOnly, exportGed.livingNote, research.sendHowTitle, sendExportGedcom · research:ccfe4110 src/commands/output.ts (ui.living.all u plného souboru), src/commands/pack.ts, assets/lang/de.json ui.living.all · dirigent:spec/151 K3.1 -->

<a id="S11.6"></a>
## S11.6 Eine geschützte Datei und ihr Import

Eine Datei mit geschützten Lebenden sagt, mit welcher Stufe sie entstand und wie viele Lebende sie schützt. Eine
solche Datei ist nie eine Quelle von Änderungen eines Stammbaums: die fehlenden Angaben Lebender sähen wie gelöscht
aus.

- **Die Markierung:** GEDCOM im Kopf `1 _STROM_PRIVACY initials|surname|hidden` und `2 _LIVING N`; JSON und die Daten
  einer HTML-Datei das Feld `privacy` (`mode`, `living`). In der Datei heißen die Stufen wie in der Forschung: Nur
  Nachname `surname`, Namen ausblenden `hidden`. Alle Angaben und eine Ausgabe ohne Lebende haben keine Markierung.
  Eine geschützte Datei trägt nie eine Verbindung zu einer Forschung.
- **Import in der App:**
  - die Zusammenfassung des GEDCOM-Imports, **Als neuen Stammbaum importieren** und Schritt 1 des Assistenten zum
    Zusammenführen sagen: „Die Datei ist geschützt ({Stufe}): die Angaben zu N lebenden Personen fehlen darin.“;
  - der Assistent beginnt mit der Wahl **Neuer Stammbaum**; der neue Stammbaum heißt „{Datei} (geschützte Kopie)“;
  - mit **Zu Stammbaum hinzufügen** ergänzt Schritt 1 „Lebende werden geschützt hinzugefügt (ohne Angaben).“ Eine
    verbundene geschützte Person überschreibt im Stammbaum keine Namen und Daten;
  - die Verbindung eines JSON zu einer Forschung wird nicht übernommen;
  - eine geschützte Datei der Forschung öffnet sich nie als Stammbaum der Forschung und aktualisiert ihn nicht, und
    das Live-Verfolgen lehnt sie ab; sie geht nur in den Assistenten des Imports
    ([A2.1.1](A2-loading-a-family-tree.md#A2.1.1), [A8.6](A8-merging-trees.md#A8.6)).
- **Forschung:**
  - `strom sync` lehnt ein geschütztes GEDCOM und ein JSON der App mit dem Feld `privacy` ab: „{Datei} ist eine Datei
    mit geschützten Lebenden ({Stufe}): die Angaben zu N lebenden Personen fehlen darin — nie eine Quelle von
    Änderungen“, mit dem Rat, einen vollständigen Export aus der App zu nehmen;
  - `strom intake` legt sie nur als Material ab und übernimmt sie nicht in den Stammbaum.
- **Gilt seit:** App 3.33.0, Forschung 1.38.0

<!-- zdroj: app:47500acc src/privacy.ts PrivacyMark, PRIVACY_MARK_FIELD, privacyFileMode, parsePrivacyFileMode, readPrivacyMark, privacyMarkFor, privacyMarkJson, protectedPersonIds · src/ged-exporter.ts _STROM_PRIVACY, _LIVING · src/ged-parser.ts:5661 privacyMarkOf · src/ui/import-export.ts:607 (bez research), :818 openGedcomGuide protectedImport, :977 gedcom-protected, :1436 pendingImportPrivacy (bez research), :1500 protectedCopyName, :1930 import-tree-protected · src/merge/ui.ts:233 (initialMode new), :726 protectedIds · src/merge/plan.ts:306, :496 · src/merge/write.ts:106 newTreeName · src/merge/steps/step1-what.ts merge-s1-protected, merge-s1-protected-merge · src/ui/research-ui.ts:2869, :4394, :4990 header.protected · strings.ts privacy.importProtected, importProtectedMerge, protectedCopyName · research:ccfe4110 src/gedcom/privacy.ts jsonPrivacyOf, treeFilePrivacyOf · src/core/sync.ts:1738 tree.protected · src/commands/intake.ts:328 ui.intake.protected · assets/lang/de.json ui.error.tree.protected -->

<a id="S11.7"></a>
## S11.7 Schutz in den Dateien der Forschung

`strom export gedcom` schreibt wie bisher vollständige Dateien nach `output/`. Eine Datei zum Teilen mit geschützten
Lebenden entsteht mit der Option `--living` oder nach der Einstellung `gedcom.living`.

- **Stufen:** `--living initials` (Initialen + Geburtsjahr), `surname` (nur Nachname), `hidden` (Namen verborgen),
  `full` (vollständige Daten); auch die Namen der App `minimal` und `anonymous` gehen. Ein bloßes `--living` nimmt die
  Einstellung `gedcom.living` und, wenn sie vollständig ist, `initials`. Eine unbekannte Stufe ist ein Fehler.
- **Was eine geschützte Datei trägt:**
  - eine lebende Person den Namen nach der Stufe, das Geschlecht und die Verbindungen; bei Initialen das
    Geburtsjahr;
  - eine Familie mit einem lebenden Partner die Partner, die Kinder und die Angabe einer Heirat oder Scheidung; bei
    Initialen das Jahr der Heirat;
  - auf eine lebende Person zeigt kein anderer Datensatz; eine Quelle, die nur Lebende zitieren, wird weggelassen;
  - die Verstorbenen sind, wie sie waren;
  - der Kopf hat die Markierung ([S11.6](#S11.6)) und keine Verbindung zur Forschung.
- **Wohin sie geht:**
  - ohne `--out`: `output/tree-<Stufe>.ged` (mit `--research G…` `output/G…-<Stufe>.ged`, für die App
    `…-strom-<Stufe>.ged`). Solche Dateien stehen in `.gitignore` und kommen nie in die Historie der Forschung;
  - `--out <Datei>` außerhalb des Ordners der Forschung; eine geschützte Datei anderswohin in den Ordner der Forschung
    ist ein Fehler („eine Datei mit geschützten Lebenden kommt in den Ordner der Forschung nur als {file} (nie in die
    Historie)“). Ein Pfad zur eigenen Datei in `output/` in anderer Schreibweise (Großbuchstaben, ein Link) wird als
    diese Datei geschrieben.
- **Die Einstellung `gedcom.living`** („Schutz der Lebenden in GEDCOM-Dateien nach außen“, standardmäßig
  vollständige Daten):
  - `--out` ohne `--living` schreibt nach ihr;
  - ist sie nicht vollständig, schreibt `strom export gedcom` ohne `--out` und `--living` neben die vollständigen
    Dateien auch eine geschützte.
- **Ausgabe:** bei einer geschützten Datei „geschützt: N lebende Personen ({Stufe})“. Bei einer vollständigen Datei
  der Satz aus [S11.5](#S11.5) und der Hinweis „→ eine Datei zum Weitergeben, die Lebenden geschützt: strom export
  gedcom --living“, wenn keine geschützte entstand.
- **`--research G…`** gibt nur die Personen einer Forschung: die zentrale Person, ihre Vorfahren und Partner.
  Geschwister und Seitenzweige lässt sie weg. Lebende schützt nur `--living`; beide Optionen gehen zusammen.
- **Grenzen:** `output/tree.ged` bleibt vollständig und in der Historie wie bisher. Die App ruft nichts davon auf; es
  geht nur um das Terminal.
- **Bedienung:** Terminal: `strom export gedcom --living [Stufe]`, `--out`; `strom config set gedcom.living <Stufe>`
  (auch `--for-tree`, die Variable `STROM_GEDCOM_LIVING`); Beispiele `strom export gedcom --living --out
  ~/Desktop/horakovi.ged` und `strom export gedcom --for standard --living surname`.
- **Gilt seit:** Forschung 1.38.0

<!-- zdroj: research:ccfe4110 src/gedcom/privacy.ts LIVING_MODES, MODE_ALIASES, livingModeOf, protectGedcom · src/commands/output.ts gedFile (-<režim>), IGNORE (output/*-<režim>.ged), export gedcom (setting, living, beside, holdsPath, pathForms, export.living.in-tree, export.living.mode, inTree bez living, ui.export.living, ui.living.all, ui.export.living.hint), help --research, --living, --out · 8a0fed12 (vlastní soubor output/ pod jiným zápisem, odkazy) · src/core/config.ts:376 gedcom.living (STROM_GEDCOM_LIVING, tree, výchozí full) · src/core/phrases.ts log.setting.name.gedcom.living · assets/lang/de.json ui.living.mode.*, ui.error.export.living.in-tree · strom help export gedcom -->
