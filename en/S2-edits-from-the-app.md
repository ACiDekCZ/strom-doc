<a id="S2"></a>
# S2 Edits from the app in the research

What the app sends to the research, when, what the research does with it and what it does not accept. Describes the
Strom app 3.21.2 (and the research 1.25.2). How the app connects with
the research is described in [S1](S1-connecting-app-and-research.md). What becomes of an edit of a proven fact is
described in [R5.2](R5-conflicts.md#R5.2).

<a id="S2.1"></a>
## S2.1 The tree in the app is the main one

The tree in the app and the tree in the research are two copies. Edits from the app go to the research by sending the
whole tree. The research compares what it gave the app, what arrived and what it has now, and writes only what changed
in the app. What the research does not write stays in the app and is visible.

- **Limits:**
  - What the research did by itself meanwhile is never taken as an edit from the app that would undo it.
  - A tree from another program or an older export without the record of the research version it came from: the
    research takes only new facts and only shows the differences.
  - One send is one entry in the research's history with one source, and it can be undone ([S2.7](#S2.7)).
- **Since:** research 1.0.0

<!-- zdroj: research:src/core/sync.ts (v1.25.2) :1-19 · app:strings.ts treeSettings.principles -->

<a id="S2.2"></a>
## S2.2 When edits are sent

Each tree from the research has its own way of sending. It is chosen in the window **Research for this tree**, section
**Sending changes**.

| Option | What happens |
|---|---|
| **Manually** | sending only by the button **Send**; before that **What will be sent** is shown |
| **Automatically** | edits are sent by themselves after a moment of quiet |
| **Only load from the research (send nothing)** | nothing is sent, the tree is only loaded from the research |

- **Limits:**
  - Default option: **Manually** for a research with an agent, **Automatically** for a Strom archive and for a
    research waiting for an agent. A tree connected to the research before app 3.9.0 sends automatically. For such a
    tree and for a tree opened from the research the app asks once **How should changes go to the research?**; the
    way used so far is marked **(so far)**.
  - **Automatically** sends edits after 2 minutes without another edit, on switching to another tree and on leaving
    the page. It sends only to a running research and always for one tree at a time.
  - A tree followed live is read-only and sends nothing ([S1](S1-connecting-app-and-research.md)).
  - The research is not running: edits wait and are sent after it starts. **Send** can start it through a link in the
    terminal.
  - The app waits at most 2 minutes for the research's answer. Then it shows "The research didn't answer in time";
    the edits stay in the app.
  - After switching from **Only load from the research**, the first send is always manual through **What will be
    sent**.
  - Edits are sent only from the computer on which the research runs. A phone does not send edits ([S5](S5-phone.md)).
- **Controls:** app: **Research → Other actions → Research for this tree… → Sending changes**; the button **Send**
  (**Send to research**); **Send now**; **Send without preview next time**
- **Since:** app 3.9.0 (research 1.12.0); sending on leaving the page from app 3.16.0

<!-- zdroj: app:src/research-sync.ts:43 newTieSendMode · src/types.ts:1735 ResearchLink.sendMode · src/ui/research-sync-ui.ts (v3.21.2) AUTO_QUIET_MS :136, SEND_TIMEOUT_MS :130, pagehide :428, researchAutoSend :1438, researchSendNow · src/ui/research-tree-settings-ui.ts researchSendModeCardsHtml, maybeAskResearchSendMode · strings.ts treeSettings.sending, auto, manual, off, askTitle, askWas, deviceNote · changes.skipPreview · sync.sendNoAnswer, sync.sendWhenRunning · CHANGELOG.cs.md 3.16.0 -->

<a id="S2.2.1"></a>
### S2.2.1 What will be sent

Before a manual send the app shows the list **What will be sent**: changed people (new person, deleted, name, birth,
death, marriage, event, godparents, witnesses), changed sources with the places where they are cited, couples, places
with new coordinates and surname variants. Each group has its own section. After writing it shows in the same way
**What was written** with the sections **Written** and **Not written**.

- **Limits:** when the exact list cannot be computed, the tree is sent as it is and the research writes only the
  differences.
- **Since:** app 3.14.0

<!-- zdroj: app:strings.ts changes.willSendTitle, changes.kind*, changes.inexact, changes.writtenSection, changes.notWrittenSection · CHANGELOG.cs.md 3.14.0 -->

<a id="S2.2.2"></a>
### S2.2.2 Folio, image and call number from the app

An app that keeps the source's fields ([A3.9](A3-evidence-in-the-app.md#A3.9)) sends the research the call number,
folio, image and other location by fields. The research compares them by fields and writes an edit as an edit of the
source's page.

- **Deletion:** a folio, image or call number a person deletes in the app is deleted by the research too. Undoing the
  send ([S2.7](#S2.7)) brings them back.
- **Limits:**
  - an older app that does not know the fields deletes nothing. An edit of the whole page from an older app replaces
    the locator and deletes the folio and image entered (undoing brings them back);
  - a value that the app's file still names is not deleted: a folio or image in the page (`PAGE`), a call number as
    the whole page or on its own line of the source's note ("Call number: …", in any language). It is better that it
    stays than that something the app did not see as a field is deleted;
  - the call number of the book and the image number from registered scans are not fields of the source: a deletion
    in the app does not change them;
  - for a source read by the research, neither an edit nor a deletion is written into the source; a note is written
    beside it ("folio: removed in the Strom app (was fol. 12v)").
- **In the list What will be sent** ([S2.2.1](#S2.2.1)) a changed call number, folio or image is a change of the
  source's page.
- **Since:** app 3.27.0 with research 1.31.0

<!-- zdroj: research:337787ff, 87785596 src/core/sync.ts:3534 SOURCE_EDITS, SOURCE_FIELDS, :3551 removedFields (fieldsKept, entryWords, locatorOverlap, isValue, noteCallNumbers, CALL_NUMBER_LABELS), removedLine (sync.reading.removed) · 4de28f00 (úprava celé PAGE ze starší aplikace nahradí locator a smaže folio/snímek, undo vrátí) · app:c3278633 src/research-changes.ts (změna signatury, folia, snímku jako strana), src/ged-exporter.ts sourceFields · CHANGELOG.cs.md 1.31.0 · dirigent:prace/1111-vyzkum-citace-most-n1, prace/1111-vyzkum-citace-pole · spec 075 U1c B -->

<a id="S2.3"></a>
## S2.3 What the research does with sent edits

A research with an agent writes a send at once. A new fact or person from the app is always a **Lead** with the
source "Edits in the Strom app", never Proven. A change of a fact proven by a record becomes a conflict. The detailed
rules are in [R5.2](R5-conflicts.md#R5.2); transcriptions of sources from the app in
[R3.5.1](R3-verification-and-citation.md#R3.5.1).

- **Limits:**
  - With the research option `sync.review on`, the research does not write a send at once. It waits for a person's
    word in the terminal ([R6](R6-awaiting-action.md)); the app meanwhile shows **Waiting for confirmation in the
    research.**
  - After writing, the app loads the research's new version by itself when nothing would be lost in the app.
  - Conflicts that arose from a send are shown by the app with the message **Written, N conflicts to decide** with
    **Show**. They are decided in the research (**Decide in the research**); until then the value from the app stays
    in the app.
- **Controls:** terminal: `strom config set sync.review on|off`, `strom config set sync.edits conflict|user`
  ([R5.2.1](R5-conflicts.md#R5.2.1)). App: the window **Research for this tree** shows what the option means
  ("Changes are written in the research only after confirmation.").
- **Since:** research 1.5.0; `sync.review` from 1.12.0
- **From research 1.32.0:** `strom sync` of a tree from the app (JSON and GEDCOM) keeps shared events, roles, the
  own events **Godparent** and **Wedding witness** and the participants of events
  ([A10](A10-shared-events.md)), as when a family tree is taken over
  ([R11.3](R11-material-from-the-user.md#R11.3)). Research that took over the tree from the app earlier is not
  repaired by itself; the next `strom sync` from the app adds what is missing:
  - a note of a person or family that the earlier taking over shortened to 500 characters, to the whole note (it can
    be taken back);
  - missing own events of a godparent and a witness as new facts, and missing participants of events;
  - a person or family that the GEDCOM taking over in research 1.31 left out because of a long note with a character
    outside the basic set (emoji) is offered as new.

  The notes of events and of participants are not compared by `strom sync` in research 1.32.0 and 1.33.0, so it does
  not fill them in; the app keeps them whole.
- **From app 3.28.0:** research older than 1.32.0 does not give back shared events and the own events of a
  godparent and a witness. The app takes them over from the previous state of the tree when it loads a new version
  of such research: it knows a person by the number in the research, an event by type, date, place and value, only
  when the match is the only one. An event the research changed is an ordinary event of its person; the other copies
  stay joined.
- **From research 1.34.0:** `strom sync` also compares the note of an event and the note of a participant of an
  event (a godparent, a witness…), from the GEDCOM file and from the app's JSON alike, three ways: a note the research
  does not have it fills in; a note the user changed since the last handover it corrects (the previous one stays in
  the note's history); a note changed on both sides it leaves to a choice. A removed note removes nothing. The lines
  the export writes into a note (the state, the words of the entry, ages), the research's own lines and the note the
  app gives each copy of a shared event do not count as an edit. The edit can be undone. A sync started by the agent
  changes neither the user's note nor the note of an imported fact. A new fact from the app does not carry its note
  yet.

<!-- zdroj: research:src/core/sync.ts (v1.25.2) :1-19 · src/core/config.ts:285 sync.review · src/core/live.ts accepts() :1455 sync.auto write|off|mirror · app:src/ui/research-sync-ui.ts :1-21 · strings.ts sync.statePendingSub, sync.flyConflict, sync.showConflicts, sync.decideInResearch, sync.writtenConflictsSub, treeSettings.effectReview · 1.32.0: research:ac489205 src/core/sync.ts readStromJson (appPersonEvent, appParticipants; fact.new, fact.part, fact.share), research:f8eb2032 note.correct (zkrácená poznámka → celá), research:01125661 (NFD zkrácená poznámka), dirigent:prace/1113-vyzkum-json-intake-drobnosti bod 5 (vynechané osoby 1.31 → nové), postřeh 2 (sync poznámek událostí a účastníků) · 3.28.0: app:80c2ffb9 src/research-link.ts keepEventShares, EVENT_SHARE_FEATURE event.share, eventMatchKey · 1.34.0: research:4cfc233c src/core/sync.ts fact.note, fact.part.note (noteEdits, pick, smazání nic), dirigent:prace/1115-vyzkum-095-cli-drobnosti B1 -->

<a id="S2.3.1"></a>
### S2.3.1 The main citation and a removed citation from the app

The research takes the main citation ([A3.2.2](A3-evidence-in-the-app.md#A3.2.2)) and a citation removed from a fact
([A3.2.3](A3-evidence-in-the-app.md#A3.2.3)) as the user's edit. Each can be undone ([S2.7](#S2.7)), and the
research's history says who and when.

- **Main citation:**
  - the citation marked in the app is the main one in the research too
    ([R3.4.5](R3-verification-and-citation.md#R3.4.5)); another citation of the same fact stops being the main one;
  - the research recognises an unmarking when the file from the app comes from a version of the research in which
    the main citation was, and it is no longer at the citation. For a file the research gave nothing, the main
    citation is taken only as a setting;
  - a main citation at a citation the research does not have, the research first adds and then marks. When it does
    not add the citation, it does not set the main one and says so ([S2.5.1](#S2.5.1));
  - a main citation at a fact whose date or type the user changed in the same send the research does not write (it
    does not match the fact); it is enough to send it again after the next load.
- **Removed citation:**
  - the research removes it from the fact and remembers the removal
    ([R3.4.6](R3-verification-and-citation.md#R3.4.6)). The source and its images stay. A removed main citation also
    removes the main one;
  - at a shared event it is removed once, from that one shared event of the research;
  - only a citation the fact had in the research version the app's file comes from is removed. A citation of the
    same source that the agent added later stays.
- **Limits:**
  - the research takes a removal only from the GEDCOM file the app sends through the bridge, and only at a birth,
    a death, a person's events, a marriage, a couple's events and a divorce. Citations of a person, a name and
    a family are not removed from the app;
  - when the whole source is missing in the file, nothing is removed: the source stays in the research with its
    citations and is deleted in the research;
  - an app that does not send removals yet removes nothing; the citation stays in the research;
  - from the app's JSON file the research reads the main citation (from data version 21), not a removal;
  - the app offers the main citation only with a research that keeps it, and with a research that does not take
    removals it says so ([A3.2.3](A3-evidence-in-the-app.md#A3.2.3)). The research writes `_STROM_MAIN` and
    `1 DATA` › `2 EVEN` only to an app that reads them ([A2.7](A2-loading-a-family-tree.md#A2.7)).
- What of this the research did not take, the app lists by name ([S2.5.1](#S2.5.1)).
- **Since:** app 3.29.0 with research 1.34.0

<!-- zdroj: research:355df0a5 src/core/sync.ts fact.main (op event.main, _STROM_HEAD: zrušení), fact.uncite (jen s HEAD, APP_SENDS_UNCITE, BIRT/DEAT/LifeEvent/MARR/události páru/DIV; cite.notCarried, cite.sourceRemoved, cite.olderApp, fact.noMatch, main.notCarried), :5268 · src/core/stromapp.ts:806-820 APP_READS_MAIN_CITATION, APP_SENDS_UNCITE, APP_DATA_MAIN_CITATION 21 · src/core/live.ts features citations.order, citations.main, citations.remove, sync.notWritten.codes · 4cd81f14 (vrácení) · app:src/citation-gates.ts · ZADANI_VYZKUM_hlavni-citace.md 3.2, 4.1, Upřesnění 3 a 5, V6, V7 · spec 095 K2, K3 -->

<a id="S2.4"></a>
## S2.4 A Strom archive and a research without an agent

A Strom archive and a research waiting for its agent mirror the tree from the app: the word from the app holds. They
write every send at once, even when `sync.review` is on.

- **Limits:**
  - A change of a fact proven by a record does not create a conflict; the fact from the record is withdrawn with a
    reason. A conflict of parents and a conflict of a removed person arise here too
    ([R5.2.1](R5-conflicts.md#R5.2.1)).
  - What is deleted in the app, the research sets aside with a reason, and it can be restored.
  - What the Strom archive has and this window of the app never had, the archive does not delete. The app says so at
    the unwritten edits: **the Strom archive still keeps it: this window never had these details**.
  - Tasks to verify a transcription from the app do not arise here, because nobody reads
    ([R3.5.1](R3-verification-and-citation.md#R3.5.1)).
- **Since:** research 1.12.0

<!-- zdroj: research:src/core/sync.ts (v1.25.2) :2283-2287 mirror = actsAsArchive, gone :2355 · app:strings.ts treeSettings.effectArchive, sync.notWrittenKept, sync.archiveBridgeDownSub · spec 002 -->

<a id="S2.5"></a>
## S2.5 What the research does not accept

The research can refuse a send as a whole, or write only a part. Edits it did not write stay in the app and nothing is
lost.

| When | What the app says |
|---|---|
| the tree is larger than 200 MB | the tree is too large to send this way; it can be exported as GEDCOM and loaded in the research |
| the tree belongs to another research | this tree belongs to another research |
| the tree does not look like this research's family tree | it can be exported and loaded in the research as another family tree |
| the tree arrived empty or unreadable | the tree arrived empty or unreadable |
| the research is taking the tree in right now | the research is taking this tree in right now |
| the copy of the tree does not have the research's numbers of people yet | **Not sent.** The research's version has to be loaded first (**Load the research's version**) |

- **Limits:**
  - The research postpones writing when the tree is sealed on another computer (**Take over on this computer**), when
    the files in a cloud folder are not downloaded yet, or when the disk is full. Until then the edits wait unsent.
  - When the research writes only a part, the app shows **Written N, not written M** and the reason at each
    unwritten edit (for example "no common ground: choose in the research").
  - After a refusal, automatic sending stops. It sends again by itself only after the next edit.
- **Controls:** app: **The research didn't accept the changes** in the research panel, **Try again**, **Details (to
  pass on)**
- **Since:** app 3.11.0 (research 1.12.0); postponed writing from research 1.20.0
- **From research 1.26.0:** a large family tree (roughly 1,500 people and more) taken over on Windows is written
  whole. Before, it ended with a git error about a command too long (ENAMETOOLONG) and nothing was written.

<!-- zdroj: research:src/core/sync.ts (v1.25.2) SYNC_MAX_BYTES :1325, tree.empty :1218, tree.other-research :2038, tree.foreign :2068, tree.no-ids :2345 · src/core/live.ts seal.foreign, tree.not-downloaded, disk.full · app:src/research-write-held.ts · strings.ts sync.refusedCodes, sync.refusedDetails, sync.noIdsToast, sync.held, sync.writtenCount, sync.notWrittenPick, sync.rejectedAutoSub · 1.26.0: research:src/core/git.ts commitAll po částech (commit 0e7238fc) -->

<a id="S2.5.1"></a>
### S2.5.1 Changes not taken, by name

A research that sends the reason for each change not taken as a code gets, in the app, a line of its own at each
such change, with the reason in the app's words.

- **Message:** when the research took nothing from a send but named the changes: “The research did not take
  3 changes. They stay here in the app.” with **Show**. The send's section in the research panel has the heading
  “The research did not take 3 changes”. Such a send never says “nothing new”.
- **List:** **What was written** ([S2.2.1](#S2.2.1)) has at each change not taken a line person · fact · source (the
  person and the source can be opened, what is not known is left out; “Change” when neither the person nor the source
  is known) and the reason:

| When | What the app says |
|---|---|
| an older app that does not send removals of citations | citation kept in the research: this version of the app does not send removals yet |
| the whole source is missing in the file | the source stays in the research with its citations; a source is deleted in the research |
| the source disappeared from a whole person or family | citations of a person, a name or a family are not removed from the app |
| a main citation at a citation the research did not add | main citation not set: the research did not take this citation |
| the fact did not match | the research did not find this fact (its date or type changed) |
| a person, fact, name, child or partner is missing in the file | missing in the file; the research deletes nothing, it only notes it |
| a conflict already waits on the same thing | an open conflict on this is already waiting |
| a later send from another window | a later send from another window changed the fact; this copy is older |
| a confirmation of a fact the research changed meanwhile | confirmation not taken: the research changed the fact meanwhile |
| a child's relationship by a word the research does not know | child's relationship: the research does not know this word |
| a surname group the research changed meanwhile | the research keeps its surname group (it changed it meanwhile) |
| a surname group with a warning | surname group: only with a warning in the research |
| a value from an import or from the user that the agent only proposes | a value from an import or the user: the research only proposes it |
| the person did not match | the research did not match the person |
| an entry the research wanted to make and that failed | writing in the research failed |
| a code the app does not know | not taken |

- Changes the research wanted to write and that failed are in the same list, not in a message of their own. Reasons
  the app gave before (waits for a choice, the archive keeps it, person removed, taken back) keep their existing
  words.
- A later state of the research fills in the same list without a message.
- **Limits:** a research without codes behaves as before: a send it took nothing from reports “The research took
  nothing new from this send.” The reasons at citations (the first three rows of the table) the research sends only
  to an app that reads the main citation; an older app does not get them.
- **Since:** app 3.29.0 with research 1.34.0

<!-- zdroj: app:1e10a1dd src/ui/research-sync-ui.ts:1985-2005 (SYNC_NW_CODES_FEATURE, notTakenToast, nothingTakenToast), :2849 notTakenTitle · src/ui/research-changes-ui.ts nwReason, NW_TODAY_WHY · strings.ts sync.notTakenToast, notTakenTitle, nw.*, nwUnknown, nothingTakenToast · research:355df0a5 src/core/sync.ts notWritten codes, skipped codes, /status sends[].notWritten (nejvýš 50) · ZADANI_VYZKUM_hlavni-citace.md V4, V5 · spec 095 K3.4 -->

<a id="S2.6"></a>
## S2.6 A person removed in the app

A research with an agent does not delete by itself a person or a fact that disappeared in the app. It only notes the
removal, and the app says at the unwritten edits: "removed here only: the research noted the removal but deletes
nothing by itself; it can be deleted in the research". A Strom archive mirrors the removal ([S2.4](#S2.4)).

- **Limits:** when one window of the app removes a person and the person is edited elsewhere meanwhile, the research
  asks whether the person stays in the tree ([R5.2](R5-conflicts.md#R5.2), point 6). The app shows one question per
  person:
  - **Removed in another window:** **Return to the tree**, or **Keep removed**;
  - **Edited elsewhere:** **Remove from the tree**, or **Keep in the tree**.
  The research confirms the decision. Then the app loads its version.
- **Since:** research 1.0.0; the question about a removed person from app 3.16.0 (research 1.20.0)

<!-- zdroj: research:src/core/sync.ts (v1.25.2) :1-19 „What the app no longer has is only reported“, gone :2355 · app:src/ui/research-removed-ui.ts :1-14 · strings.ts sync.notWrittenReport, conflict.person.* · CHANGELOG.cs.md 3.16.0 -->

<a id="S2.7"></a>
## S2.7 Undoing a send

A send can be undone in the research. The edits in the app stay; only the changes of that send leave the research.

- **Limits:**
  - From the app the last send can be undone within 7 days. It is confirmed in the research's terminal.
  - After an undo the app sends nothing more until one is chosen: **Send again**, or keep the undo with **Load the
    research's version** (replaces the edits from the app, a backup stays).
  - Loading the research's version can be undone with **Restore the state before loading**.
- **Controls:** app: **Research → Other actions → Undo last send** · terminal: `strom sync undo`
- **Since:** app 3.4.0, research 1.0.0
- **From research 1.26.0:** only a person may undo a send (`strom sync undo`) and discard a sent tree that waits
  (`strom sync discard`); the research refuses the agent. The edits in the app stay after discarding and can be sent
  again.

<!-- zdroj: app:src/ui/research-actions-ui.ts (v3.21.2) :448 researchActionUndoSend, UNDO_MAX_AGE_MS :152 · src/research-link.ts:73 sync-undo terminal · strings.ts research.undoSend, sync.undoneSub, sync.sendAgain, sync.loadVersion, sync.againNothing, sync.restoreBeforeLoad · research:src/core/sync.ts :19 strom sync undo · 1.26.0: src/commands/sync.ts:503 sync discard (person), sync undo (person) (commit 942c56f9) -->
