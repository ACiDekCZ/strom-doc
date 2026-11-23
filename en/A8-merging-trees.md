<a id="A8"></a>
# A8 Merging trees

How the Strom app merges two family trees: a GEDCOM file with a tree, two trees, or a view with a tree. Describes the
app 3.21.2; changes from a later version carry its number. From app 3.32.0 every merge is led by the guide **Merge
trees** in six steps ([A8.5](#A8.5) to [A8.13](#A8.13)). Merging a duplicate person within one tree is a different
matter ([A5.6](A5-tree-check.md#A5.6)).

<a id="A8.1"></a>
## A8.1 A merge always creates a new tree

No longer valid from app 3.32.0, replaced by [A8.5](#A8.5): the guide writes into the chosen tree or creates a new one.

The result of a merge is saved as a **new tree**. Both original trees and the file stay unchanged.

| From | Controls |
|---|---|
| a GEDCOM file | **Import → Import GEDCOM → Merge with existing** |
| another tree | tree management, at the tree **Merge tree** → **Select target tree** → **Start merge** |
| the people shown in the view right now | **Merge this view into…** and the choice of another tree |

- Before saving, the app asks for the name of the merged tree (default "target + source"). After the merge it shows
  the number of merged and added people and offers to switch to the new tree.
- **Limits:** an empty view cannot be merged; a view is merged only into another tree.
- **Since:** app 1.0.0; Merge this view into… app 1.19.0

<!-- zdroj: app:src/merge/ui.ts:1421 newTreeNamePrompt, :1447 TreeManager.createTree · src/ui/merge-ui.ts:595 mergeViewInto · strings.ts merge.newTreeNamePrompt, merge.switchToNewTree, merge.mergeViewInto, merge.mergeViewEmpty, merge.mergeViewNoTarget, treeManager.mergeSourceTree, treeManager.selectTargetTree, treeManager.startMerge, importDialog.mergeExisting · git v1.19.0 (cf43bde) -->

<a id="A8.2"></a>
## A8.2 Pairing people

For each person from the merged source the app looks for a person in the target tree and gives the pair a match
score.

- The score is computed from the similarity of the name, the date and place of birth, the date of death, and from the
  match of parents and partners. The sex must not contradict.
- **High** is a match of 85 and more, **Medium** 55 and more, otherwise **Low**. A person without a match is **New**.
- The wizard gives the reason for a match (for example "Name and birth year", "Child of matched person").
- **Limits:** placeholder persons (an empty place for an unknown parent) are not paired. A person without a given name
  paired through a relative always goes to review.
- **Since:** app 1.0.0
- **From app 3.26.0:** people are also paired by program ID (`_UID` = `UID`, `_FSFTID` = `EXID` with the address
  familysearch.org), with the reason **Same ID in the file**. Such a match is certain only with a similar name, sex
  not man against woman, years of birth at most 3 apart and no differing global ID; otherwise it is a proposal with a
  score of at most 79. The record identifier and `RIN` add 25 points to a name match only for files of the same
  program. Families are not paired by ID ([S6.7](S6-tree-from-another-program.md#S6.7)).
- **From app 3.27.0:** a program's ID (`_UID`, `UID`, `_FSFTID`, `AFN`, `EXID`) that more than one person in
  the tree carries does not say which of them it is: it does not make a match by itself, it only offers it.
- **From app 3.32.0:** the guide shows the score as a percentage (“N%”) and splits the pairs into **The same** (score
  80 and more) and **Maybe the same** (a lower score); a person without a match is among **New** ([A8.7](#A8.7)). The
  labels **High**, **Medium** and **Low** are no longer shown.

<!-- zdroj: app:src/merge/matching.ts:318 findMatches, :781 (85 high, 55 medium), :790 calculateMatchScore, :618 UNKNOWN_NAME_MATCH_SCORE · strings.ts merge.highConfidence, merge.mediumConfidence, merge.lowConfidence, merge.matchReasons · 3.27.0: app:b5595ca1 src/merge/matching.ts idNamesSeveral (víc osob stromu se stejným silným ID → jen idCandidate), findDirectMatches · src/merge/id-match.ts STRONG_TAGS · CHANGELOG.cs.md 3.27.0 · spec 066 K3.2 -->

<a id="A8.3"></a>
## A8.3 What a person decides

The wizard **Merge data** shows the matches, conflicts and new people. Each match can be decided.

| Option | What happens to the person from the source |
|---|---|
| **Confirm** | merged with the person in the tree |
| **Reject** | added as a new person |
| **Skip** | not brought over at all |
| **Match to existing** | merged with a person chosen by hand |

- An undecided match with a score of 50 and more is confirmed by itself in the merge; an undecided one under 50 is
  added as a new person. When undecided uncertain matches remain, the app asks before the merge.
- **Only update existing people (don't add new)** completes the paired people and adds no new person.
- A fact that both sides have differently is a conflict: **Keep existing** or **Use from import**; the more precise
  date or the more complete value is **suggested**. For a couple this covers the status of the relationship, the date
  and place of marriage and the end date. A fact on one side only is filled in.
- A merge in progress can be kept on closing with **Save for later**; it comes back as **Pending merges**.
- **Since:** app 1.0.0; couple conflicts app 3.0.0; Skip and Only update existing people app 1.19.0
- **From app 3.26.0:** an undecided match is confirmed by itself only from a score of 80 (confirmed in advance in the
  wizard, ✓). A match of 50–79 is only offered (?) and without a person's decision it is added as a new person: a
  doubled person can be merged later, a wrong merge cannot be undone.
- **From app 3.32.0:** the decisions are made in the guide: pairs in the step **Who is who** ([A8.7](#A8.7)), differing
  details in the step **Who is right** ([A8.9](#A8.9)). The options **Confirm**, **Reject**, **Skip** and **Only update
  existing people** are replaced by **Same person**, **New person**, **Do not add** and the scope **d) Only enrich
  existing people**. In addition:
  - a pair with a score under 80 is not joined without a person's decision; the remaining undecided ones can be added
    as new or left out at once ([A8.7](#A8.7)). Each person of the import ends up exactly once: joined, added, or left
    out by an explicit choice;
  - the import's suggestion is only advice: a differing detail without a person's choice keeps the tree's value;
  - a merge in which something would be lost is not saved: before writing, the totals of people, couples, links,
    sources, photos and files and the references are checked; when they do not match, it says “The totals do not
    match: nothing was saved.” and what does not match;
  - a source of the import with an ID that the tree already has for another source comes as a new source;
  - success is reported only after the actual write to storage.

<!-- zdroj: app:src/merge/executor.ts:78 AUTO_CONFIRM_SCORE, :110 detectPartnershipConflicts, :302 toAdd (updateOnly, skip, reject), :792 mergePersonData · src/merge/ui.ts:1408 pendingGate · strings.ts merge.confirm, merge.reject, merge.skip, merge.manualMatch, merge.updateOnlyLabel, merge.keepExisting, merge.useImport, merge.suggestedPrecise, merge.partnershipFields, merge.closeSave, merge.pendingMerges · git v3.0.0 (2218cea), v1.19.0 (cf43bde) -->

<a id="A8.4"></a>
## A8.4 What comes along with the tree

Besides people and relationships, the lists that belong to the whole tree are merged too.

- **Sources:** the same source (the same call number, otherwise the same description) is not doubled; citations are
  moved to the kept source and a missing transcription and date are filled in.
- **From app 3.27.0:** a source that differs from the kept one only in its default reliability is the same source and
  is not doubled; the moved citations keep their reliability ([A2.6.1](A2-loading-a-family-tree.md#A2.6.1)). Another
  record date or other lines of the citation still give a source of its own.
- **Places:** coordinates, place records and other names of places are joined; where both trees know the same place,
  the target tree wins.
- **Surname spellings** ([A4.5](A4-surnames-and-families.md#A4.5)) are joined; groups that overlap are combined.
- The new tree starts without a default person and view ([A6.1.1](A6-views.md#A6.1.1)).
- Before the merge the app says how many problems of the check both trees have, and after the merge it offers the
  check when the merge brought new ones ([A5](A5-tree-check.md)).
- **Limits:** a repeated import of the research's file into the research's tree is covered by
  [S1](S1-connecting-app-and-research.md).
- **Since:** app 1.0.0; reporting problems of the check app 1.19.0
- **From app 3.26.0:** notes of a person, a relationship and a source are not doubled in a merge. Before the merge a
  backup of the tree is saved ([S6.5](S6-tree-from-another-program.md#S6.5)). After merging another program's file
  the app shows the card **What next** ([S6.4](S6-tree-from-another-program.md#S6.4)). A manual merge of two people
  ([A5.6](A5-tree-check.md#A5.6)) does not join notes.
- **From app 3.28.0:** shared events ([A10.1](A10-shared-events.md#A10.1)) are not doubled: they are paired with
  the events of the target tree and take over its shared event; a custom event “Census” is paired with a census. The
  summary “Shared events: n joined” ([A10.6](A10-shared-events.md#A10.6)).
- **From app 3.32.0:**
  - the guide takes the backup **Before merge** for every input and always, even with automatic backups turned off
    ([A8.10](#A8.10), [S6.5](S6-tree-from-another-program.md#S6.5));
  - a merge in progress saved for later recognizes that the tree has changed meanwhile: the suggestions are
    recalculated, the decided pairs stay ([A8.5](#A8.5));
  - the card **What next** shows only after a merge that creates a new tree; after a merge into an existing tree the
    data check is in the step **What happened** (**Check the tree**, [A8.11](#A8.11));
  - the tree keeps a record of its merges (data version 26); older app versions open such a tree read-only.

<!-- zdroj: app:src/merge/executor.ts:211 executeMerge (mergeSourceCatalogs, places, mergePlaceRecords, mergePlaceAliases, addSurnameGroup, delete defaultPersonId/defaultView) · src/merge/ui.ts countNewMergeIssues · strings.ts merge.preValidationWarning, merge.newIssues · git v1.19.0 (00e5d38) · 3.27.0: app:dde0151a src/merge/executor.ts sourceKey bez quality, takeCitationQuality, remapCitations; app:5721b016 unionCitations · 3.28.0: app:80c2ffb9 src/merge/* (shareId, Census ↔ census), strings.ts merge.sharedJoined -->

<a id="A8.5"></a>
## A8.5 The Merge trees guide

Every import of a family tree into a tree and every merge of two trees is led by one guide in six steps. Nothing is
written to the tree until the write is confirmed in the step **What will happen**.

| From | Guide | Controls |
|---|---|---|
| a GEDCOM file | **Import a family tree** | **Import → Import GEDCOM**; from Manage trees it starts with the option **New tree** |
| another tree | **Merge trees** | Manage trees, ⋯ at the tree → **Merge into another tree…** (the target is the open tree) |
| the people shown in the view right now | **Merge trees** | the tree's actions → **Merge view into…** |
| changes sent from another Strom | **Received changes** | the preview of received changes → **Review in detail** |

- **Steps:** **What to do** ([A8.6](#A8.6)), **Who is who** ([A8.7](#A8.7)), **Whom to add** ([A8.8](#A8.8)), **Who
  is right** ([A8.9](#A8.9)), **What will happen** ([A8.10](#A8.10)), **What happened** ([A8.11](#A8.11)). A step
  that decides nothing for the chosen path is skipped, and the guide says so at it.
- Above the steps stand running counts of the import's people: **Joined**, **New**, **Not added** and **To decide**;
  their sum is the number of people in the import.
- Comparing a large tree shows progress and an estimate of time. **Stop** loses nothing: the choices of step 1 stay
  and the comparison can be run again.
- A guide closed before the write says “Nothing has been written yet.” and the decisions can be kept with **Save for
  later**. The saved merge waits in Manage trees under **Pending merges**. When the target tree has changed
  meanwhile, the guide says so on continuing; the suggestions are recalculated, the decided pairs stay.
- A merge that did not finish last time (a closed window, a crash) is reported by the app on the next opening: the
  tree and the file are unchanged.
- **Limits:** a GEDCOM file into an empty tree is still inserted through **Insert into tree** without the guide
  ([A2](A2-loading-a-family-tree.md)). Merging two people of one tree is a different matter
  ([A5.6](A5-tree-check.md#A5.6)).
- **Since:** app 3.32.0; before, a merge always created a new tree ([A8.1](#A8.1))

<!-- zdroj: app:debf50cc (3.32.0) src/merge/ui.ts startMerge, repeatLine, resume, step6Env · src/merge/wizard-steps.ts stepInfo (přeskočené kroky) · src/merge/wizard-ui.ts title (titleImport, titleTrees, titleShare, titleCompare) · src/ui/import-export.ts openGedcomGuide (prázdný strom → showGedcomResultDialog), src/ui/merge-ui.ts (crashed, pendingMergeFound) · src/ui/share-ui.ts reviewChangePacketInMerge · strings.ts mergeWizard.steps, cntJoined, cntNew, cntSkipped, cntPending, cntTotal, comparing, comparingNote, stop, closeMsg, savedLater, resumeChanged, crashed, treeManager.mergeInto, menu.mergeViewInto, shareDiff.reviewDetail, merge.pendingMerges · CHANGELOG.cs.md 3.32.0 · dirigent:spec/134-bezpecne-slouceni-stromu §1–§13 · dirigent:test/vysledek-1123-scenare-app.md -->

<a id="A8.6"></a>
## A8.6 Step 1: What to do

The first step chooses what to do with the import, into which tree, and what happens to a person already in the tree.

| Option | What happens |
|---|---|
| **New tree** | a new tree with the import's people is created; it will not be linked to a research; existing trees stay unchanged |
| **Add to a tree** | the import's people are added to the chosen tree (**Into which tree**) |
| **Only compare** | the same steps are gone through, but nothing is written; the list can be saved at the end |
| **Save as JSON** | **Download JSON** downloads the converted data as a `.json` file; nothing is written to a tree |

- **What to do with a person already in the tree** (with **Add to a tree**):

  | Scope | For joined people | New people |
  |---|---|---|
  | **a) Only missing people** | nothing changes | added |
  | **b) Missing people and empty details** | only empty details are filled in | added |
  | **c) Decide detail by detail** | the differences are chosen in step 4 ([A8.9](#A8.9)) | added |
  | **d) Only enrich existing people** | details according to step 4 | no one new is added |

- **The tree will not take over:** what the app does not take over from the file is listed with a count and an
  example; **Save list…** saves the list. None of it is lost silently.
- **Swap** with two trees reverses what is added into what.
- The same file merged into the tree again is recognized by the guide, which says how many people are new; the people
  joined last time are not doubled. So only the people left out last time are added.
- **Limits:** the target cannot be a locked tree (it can be unlocked in Manage trees) or a tree from a newer app
  version. A tree on which live following of the research is running right now (◎ **Follow the agent in the tree**)
  is read-only; for it the guide offers **Turn off following and merge here**: a backup is saved before writing,
  sending to the research is paused and the changes go there only after the choice in the last step. A copy of the
  research's tree and a tree without a research can be the target even while live following runs elsewhere. From
  a tree open read-only the import is possible only as a **New tree**.
- **Since:** app 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step1-what.ts (mode, scope, notTaken, swap, repeat), src/merge/ui.ts repeatLine (isRepeatOf podle otisku souboru, importedBefore), src/merge/plan.ts:715–717 (d: updateOnly, a: joinedDetails none, b: empty) · strings.ts mergeWizard.modeNew, modeNewDesc, modeAdd, modeAddDesc, modeCompare, modeCompareDesc, modeJson, modeJsonDesc, btnJson, whichTree, existingWhat, scopeA–scopeD, scopeADesc–scopeDDesc, notTaken, notTakenNote, saveList, swap, repeat, blockLive, blockLiveAction, blockLocked, blockReadOnly, blockNewer · app:166fbffd, 5c4bcc0c (1123-134 bod 10: blokuje jen strom s běžícím sledováním, kopie stromu výzkumu jde; nabídka Vypnout sledování a sloučit sem) src/live-follow-block.ts · CHANGELOG.cs.md 3.32.0 („tentýž soubor sloučený znovu přidá jen osoby, které se minule vynechaly“) · spec 134 K0.7 -->

<a id="A8.7"></a>
## A8.7 Step 2: Who is who

Step 2 shows the import's people in three groups, and a person decides about each pair. A join that is written is
always visible and can be undone.

- **Groups:** **Maybe the same** (score under 80), **The same** (score 80 and more, joined in advance) and **New**
  (without a match). The score and the reasons of a match are described in [A8.2](#A8.2).
- **Pair:** the person of the import and the person of the tree side by side in the rows **Name**, **Birth**,
  **Death**, **Parents**, **Partners**, **Children** and **Records**, with **Why yes:** and **What speaks against:**.
- **Decision:** **Same person** (S), **New person** (N), **Another person…** (A, join with another person of the
  tree) and **Do not add** (X); ↑ ↓ moves to the next pair.
- A decision recalculates the suggestions for relatives; decided pairs do not change.
- **Repeated merge:** merging the same source a second time recognises the people an earlier merge that was not
  undone brought or joined. They are in **The same** with the reason “Merged before from this source”, and nothing
  is doubled.
- **Why yes** names only what both records give: “Exact name and birth date” only with the same birth date on both
  sides, with only the year matching “Name and birth year”, otherwise “Exact name”.
- The **Remaining undecided** can be settled at once: **Add as new** (the guide warns that this can double people
  already in the tree), or **Do not add**. While an undecided pair remains, the guide does not go on.
- **Limits:** with **New tree** the step is skipped: all people are new.
- **Since:** app 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step2-who.ts pairRows (AUTO_CONFIRM_SCORE → same, jinak maybe), decisions, recalc, rest · src/merge/executor.ts AUTO_CONFIRM_SCORE = 80 · src/merge/wizard-steps.ts stepInfo (step2 skip newTree, person-pending blokuje) · strings.ts mergeWizard.grpMaybe, grpSame, grpNew, rows, whyYes, whyNo, decSame, decNew, decOther, decSkip, decKeys, keysHint, recalc, restLabel, restAdd, restSkip, restAddWarn, sameNote · spec 134 §4 · app:1046e99b (1123-134 N1, N3) strings.ts merge.matchReasons.merged_before, exact_name, exact_name_gender_birthdate, name_gender_birthyear -->

<a id="A8.8"></a>
## A8.8 Step 3: Whom to add

Step 3 chooses which new people are added. A new person whom nothing links to the tree is not added without a
decision.

- **Whom the selection takes:** **All new**, **Only linked, within N steps** (only people linked to the tree through
  at most N relatives), **Ancestors of…**, **Descendants of…** (with the number of generations), **Family /
  surname…** and **By hand**. Selecting ancestors, descendants or a family unticks the other new people.
- **Linked new:** a list of the new people with their path to the tree (“links via …”), search, **Filters**
  (**Surname**, **Years**, **Place**, **With a source**, **Linking**, **Living**), **Leave out living (N)** and a
  **Preview** of the branch.
- Unticking a person through whom others link to the tree asks: **Leave them out too**, **Keep them as unlinked**,
  **Keep …** or **Keep as “?”** (a linking “?” without details stays in the person's place and the relatives stay
  linked).
- **Unlinked groups:** people without a path to the tree's people, by family. Each group needs a decision: **Link to a
  person…** (a person of the group is a parent, child or partner of a person of the tree), **Add unlinked**,
  **Separate tree** (a tree of its own after the write) or **Do not add**. An undecided group holds up the write.
- **Limits:** a link that would give a child a third parent is not written. The scope **d)** adds no one new and
  skips the step. With **New tree** the step takes all people.
- **Since:** app 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step3-whom.ts, step3-model.ts, src/merge/plan-select.ts (scope d → 'scope', :392), src/merge/wizard-steps.ts (step3 skip allNew, group-pending) · strings.ts mergeWizard.vAll, vLinked, vAnc, vDesc, vRod, vManual, variants, pickAnc, pickDesc, pickRod, generations, tabLinked, tabGroups, linksVia, skipLiving, s3Tools, fSurname, fYears, fPlace, fSource, fLinking, fLiving, previewBtn, branchPreview, unlinkTitle, unlinkAll, unlinkLoose, unlinkKeep, unlinkQ, unlinkQDesc, groupsLead, gConnect, gLoose, gOwn, gSkip, relParent, relChild, relPartner, connectThird, groupsWhy · spec 134 §5, §6 -->

<a id="A8.9"></a>
## A8.9 Step 4: Who is right

Step 4 decides the details that the joined people have differently. Without a person's choice the tree wins.

- **Rules:** **My tree wins** (default), **The import wins**, **Keep both** (the import's value is saved beside it,
  “The import says: …”), **More precise, if not contradicting** and **Decide one by one**.
- A rule can be given to the whole merge, to a kind of detail (**Name**, **Birth**, **Death**, **Places**,
  **Events**, **Notes**, **Photos**, **Sex**, **Marriage**), to a person and to a single value. A narrower rule wins:
  whole → kind of detail → person → value. Each rule shows how many differences stay, change or are saved beside.
- **Protected details:** a detail in the tree marked “proven”, “confirmed” or “from the research” is not changed by a
  bulk choice; it can be changed only one by one. Overwriting a proven detail asks **Overwrite a documented
  detail?**; after the write the detail is “From a family tree” and the record stays with the person as a source.
- **Relationship conflicts** (other parents, a second partner, a different marriage, a third parent, an
  ancestor–descendant loop) are always decided one by one: **Keep mine**, **From the import** or **Both**. A loop is
  never written.
- **Limits:** with the scopes **a)** and **b)** the step is skipped; when there are relationship conflicts, it shows
  only them. With **New tree** it is always skipped.
- **Since:** app 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step4-rules.ts (relOnly, s4SkippedTitle, protected), src/merge/plan.ts:438 relationConflicts, :534 (scope a), :542 (scope b jen prázdné) · src/merge/wizard-steps.ts step4 (newTree, scope a/b skip) · strings.ts mergeWizard.ruleAll, ruleOrder, rMine, rImport, rBoth, rPrecise, rEach, rDefault, importSays, kinds, protectedLine, protKinds, protTitle, protText, protAfter, relConf, relKinds, relAlways, keepMine, fromImport, both, loopNever, step4Skipped, s4SkippedTitle, relOnly · spec 134 §7, K0.3 -->

<a id="A8.10"></a>
## A8.10 Step 5: What will happen, and the write

Step 5 shows the whole list of changes by group. The write happens only with its button, and only what the list
shows.

- **List:** **New**, **Joined**, **Detail changes**, **Couples and links**, **Sources**, **Places**, **Photos and
  files**, **Not added** (for each person why: the step and the choice) and **Not taken over**. An item can be
  unticked. **Save the list…** saves it to a file.
- **Where to write:** **Write into …**, or **Write into a new tree** (a copy of the target tree with the import; the
  target tree stays unchanged).
- **Backup:** before writing into the tree the backup **Before merge** is made, always, even with automatic backups
  turned off. It stays as long as the merge can be undone; backup rotation does not delete it. When there would be no
  room for it, the guide asks (**Keep both (over the limit)** or **Delete the oldest other backup**). Without a backup
  nothing is written: “The backup failed, so nothing was written.”
- **Safeguards:** when the target tree has changed meanwhile, the list is recalculated and nothing is written
  blindly. Before saving, the totals and the references are checked; when they do not match: “The totals do not
  match: nothing was saved.” Closing the window during the write breaks nothing: the write finishes, or nothing is
  written.
- The write is one **Undo** step.
- **Limits:** with **Only compare** nothing is written; the list can be saved. The check does not count the empty
  details filled in by the scope **b)** into **Detail changes**.
- **Controls:** the button “Add N people, change M details”, for a new tree “Create a tree with N people”.
- **Since:** app 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step5-plan.ts (skupiny, retentionAsk, targetChanged), src/merge/write.ts (backupBeforeMerge keepFor, storageFull, badTotals, one undo step strings.undo.mergeTrees) · src/data.ts:2047 backupBeforeMerge (bez ohledu na automatické zálohy, keepFor mimo rotaci) · src/snapshots.ts planRetention (keepFor se nesmaže) · strings.ts mergeWizard.gNew, gJoined, gFields, gLinks, gSources, gPlaces, gMedia, gSkipped, gNotTaken, skipWhy, whereTo, writeInto, writeNew, writeNewDesc, backupLine, savePlan, btnWrite, btnNewTree, backupFailed, retentionAsk, keepBoth, dropOldest, targetChanged, replanned, writingSafe, badTotals · dirigent:test/vysledek-1123-scenare-app.md N1 (doplněná prázdná pole se v kroku 5 nepočítají) · spec 134 §8, K0.2, K0.4, K0.5 -->

<a id="A8.11"></a>
## A8.11 Step 6: What happened, and Merge history

After the write, step 6 says what happened, and the merge stays in the tree as a record that can be returned to later.

- **What happened:** “Written into the tree …” and “The totals match: N people in the import = joined + new + not
  added”; the backup **Before merge** is in Backups.
- **Actions:** **Show in the tree**, **Save as a list of people** ([A11](A11-lists-of-people.md)), **Check the
  tree** ([A5](A5-tree-check.md)) and **Undo the merge…** ([A8.12](#A8.12)).
- After merging another program's file into an existing tree the card **What next** does not show; the data check is
  here. A new tree from another program's file gets the card ([S6.4](S6-tree-from-another-program.md#S6.4)).
- **Merge history:** each merge into the tree with its date, source, counts (new, joined, details) and the state
  **stands**, **partly undone** or **undone**. At a merge **Open the list** and **Undo…**; in the window also
  **Backups…** and **Change history…**. Backups restore the whole tree; here only what one merge brought can be
  undone.
- **Limits:** the tree carries the record of merges from data version 26; older app versions open such a tree
  read-only. Merges from before app 3.32.0 are not in the history.
- **Controls:** the tree's actions → **Merge history…** (only for a tree that has merges); Manage trees, ⋯ at the
  tree → **Merge history…**.
- **Since:** app 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step6-done.ts (notes inHistory, noNextCard), src/merge/ui.ts step6Env (noNextCard = !newTree && gedcom) · src/ui/tree-actions.ts:199 menuHistory (jen se záznamy) · src/ui/merge-history-ui.ts · strings.ts mergeWizard.doneTitle, doneTotals, doneBackup, showInTree, saveAsList, checkTree, undoMerge, inHistory, noNextCard, menuHistory, histTitle, histLead, stValid, stPartial, stUndone, histCounts, openList, undoEllipsis, histBackups, histChanges · CHANGELOG.cs.md 3.32.0 (datová verze 26) · spec 134 §9 -->

<a id="A8.12"></a>
## A8.12 Undoing a merge

**Undo the merge** takes back only what one merge brought. Work done after the merge does not disappear.

- **What is undone:** **Removed**: the new people of the merge with its couples, sources, places and files;
  **Restored**: the changed details, back to their value before the merge; **Joins undone**: the tree's people stay,
  only without the import's details.
- **Stays because it changed since:** a person or a detail edited after the merge, a confirmed detail, a person with
  a new relative, a thing a later merge builds on, and a thing cited by something that stays. For each item
  **Keep** or **Undo** can be chosen.
- A picture the merge replaced is brought back only by the backup **Before merge**. The guide also shows the
  difference from restoring the backup: the backup would also revert everything else done in the tree since the
  merge.
- **Undo everything**, or **Choose only some…** (only what is ticked is undone). A partly undone merge can be undone
  further. The undo takes a backup, is in the change history and can be reverted (**Redo the merge**).
- **Limits:** a locked tree can be undone after unlocking in Manage trees; a read-only tree once it can be edited.
  When a later merge builds on the merge, the guide says so. Undoing a merge that is already in the research is
  described in [A8.13](#A8.13).
- **Controls:** step 6 → **Undo the merge…**; **Merge history…** → **Undo…**; the button “Remove N people”.
- **Since:** app 3.32.0

<!-- zdroj: app:debf50cc src/merge/undo-plan.ts, src/merge/undo-view.ts, src/ui/merge-history-ui.ts (zápis se zálohou write.ts writeUndo, AuditLogManager, toast s redo) · strings.ts mergeWizard.undoTitle, undoLead, uRemove, uRestore, uUnjoin, uRemoveDesc, uRestoreDesc, uUnjoinDesc, uKeepHead, uEdited, uProven, uRelative, uLaterMerge, uUsed, uPicture, segKeep, segUndo, vsBackup, pickSome, pickAll, pickLead, btnUndo, builtOn, partlyDone, lockedUndo, undoReadOnly, undoNothing, undone, redo · spec 134 §10 -->

<a id="A8.13"></a>
## A8.13 A merge into a tree with a research

Into a tree linked to a research the merge is written in the app, and nothing goes to the research by itself. A person
decides about sending in step 6.

- The tree's link to the research stays. New people and links wait in the app (“not sent to the research · N
  people”) until **Send to the research…** or **Keep in the app for now** is chosen.
- Details go to the research as “From a family tree (unverified)”, never proven. The research's people keep their
  numbers, the state of their details and their citations. The research gets the changes through the bridge; no
  agent is started. When the agent is working right now, sending waits until it finishes its step.
- A research of an older version does not know sending after a merge: the whole tree is sent via **What will be
  sent** ([S1](S1-connecting-app-and-research.md)).
- **Undo before sending:** the research gets nothing. **After sending:** the research does not delete people by
  itself. The app undoes at once and gives the step in the research's terminal (`strom sync undo I…` with **Copy**),
  or points to the help **A person removed in the app** ([S2.6](S2-edits-from-the-app.md#S2.6)). Until then the
  research brings the people back with its next version and the app offers them for removal.
- **Limits:**
  - a **New tree** from an import will not be linked to a research;
  - when the source is linked to a research and the target is not, the link does not carry over to the target; the
    guide offers **Swap**;
  - when both trees are linked, neither the source's link nor its numbers carry over, and the source's people are new
    in the target's research;
  - when the same people are also in another tree linked to a research, the guide points this out.
- **Since:** app 3.32.0

<!-- zdroj: app:debf50cc src/merge/ui.ts step6Research (mergeHold, unsentMerges), src/merge/research-hold.ts, research-marks.ts, same-people.ts · strings.ts mergeWizard.researchKept, resStep5, resPending, sendRes, keepLocal, notSent, resSendLead, resSendNote, resSent, resUndoStep, resUndoHelp, resUndoHelpLink, resComesBack, copy, resAgent, resOld, resNewTree, resSwap, resSwapBtn, resTwo, resSamePeople, modeNewDesc · src/help/topics.ts:38 HELP_LINKS.mergeUndoResearch = 'S2.6' · undoResearchStep (jen záznam I\d+) · research:src/commands/sync.ts:627 sync undo · spec 134 K9.1–K9.6 -->
