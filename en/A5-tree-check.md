<a id="A5"></a>
# A5 Tree check

What the app watches in a tree, with what thresholds, and what can be done with a finding: fix it, mark it **Not an
error**, or let the research assess it. Describes the Strom app 3.21.2 (and the research 1.25.2); what came later
carries its version number. The **Tree check** with its report ([A5.1](#A5.1) to [A5.1.5](#A5.1.5)) and
`strom health` ([A5.9](#A5.9)) describe the app 3.33.0 and the research 1.38.0.
The research has its own check `strom check` ([R5](R5-conflicts.md)). It is not described here, except where the two
agree.

<a id="A5.1"></a>
## A5.1 The check and its findings

The **Tree check** goes through the tree and puts together a report: what holds the tree back, which steps it
suggests and which data issues it found. It does not change the tree. It keeps the report in the tree's data
([A5.1.5](#A5.1.5)).

| Report section | What it shows |
|---|---|
| **Summary** | one sentence: "The check found nothing holding the tree back.", "The check suggests 3 steps.", or "Nothing holds the tree back; the data issues have items to review." |
| **What holds the tree back** | unconnected families ("2 families are not connected with the tree", **Structure ›**) and the steps the research is stuck on ([A5.1.4](#A5.1.4)) |
| **Suggested steps** | what to do and in what order ([A5.1.3](#A5.1.3)) |
| **Data issues** | the findings of the data check ([A5.2](#A5.2) to [A5.6](#A5.6)) |
| **Built-in checks** | a row for each check with its result ([A5.1.3](#A5.1.3), [A5.1.4](#A5.1.4)) |
| **Since the last check** | what changed since the last report of the same scope ([A5.1.5](#A5.1.5)) |

Each finding in **Data issues** has a severity:

| Severity | Subsection | Meaning |
|---|---|---|
| error | **Errors** | the data contradict each other or are broken ([A5.2](#A5.2), [A5.3](#A5.3), [A5.4](#A5.4)) |
| to check | **To check** | an unusual value, unlikely but possible; worth checking |
| info | **Leads** | "Not errors. Leads that may help the research." ([A5.5](#A5.5), [A5.6](#A5.6)) |

- **Limits:**
  - The data check runs every time the report is opened. The findings in **Data issues** are always from that
    moment.
  - Above the findings stand a summary ("2 errors, 1 to check, 3 leads."), **Fix all (n)** ([A5.1.1](#A5.1.1)) and the
    choice **All** · **Errors** · **To check** · **Leads** with counts. A choice without findings shows "Nothing to
    review."
  - Findings of the same kind form a group, sorted by severity, size and name. Only a group with an error is open.
    Over 50 findings, more are shown 20 at a time. On a phone (up to 640 px) **Leads** are collapsed when there are
    errors or findings to check too.
  - Placeholder persons are not reported. A finding marked **Not an error** ([A5.7](#A5.7)) is neither counted nor
    shown.
  - A read-only tree only shows findings ("The tree is read-only. Findings can be viewed but not fixed or marked.").
    The report can be read, its steps cannot be started. For a tree other than the open one, a fix or a mark opens the
    tree first.
  - **From app 3.27.0:** the severity formerly called "warning" is called **to check**, in summaries and counts too.
    The Table view shows findings right in the cells, and a finding marked **Not an error** as **unusual**
    ([A6.7.5](A6-views.md#A6.7.5)).
  - **From app 3.27.0:** the section of errors and findings to check is called **To check** (formerly **Problems**).
    A tree without them has "Nothing to check", with leads "Nothing to check. 3 leads."
  - **From app 3.28.0:** **To check** holds the group **Shared events**: copies of one shared event whose common
    details differ, with **Make all match…** and **Separate the differing copy**
    ([A10.3](A10-shared-events.md#A10.3)).
  - **From app 3.33.0:** errors have their own subsection **Errors**. **To check** keeps the findings to check.
- **Controls:** **Tree overview → Data quality → Tree check** ([A5.8](#A5.8)): **Check the tree…** (only in the open
  tree) and **Report ›** (the last report of the whole tree). Straight to **Data issues** lead **Quick actions → Data
  issues ›**, the row "n leads ›" in **Consistency** (only **Leads**) and the card with errors in **Where to focus**.
  Checking a person and a line: [A5.1.2](#A5.1.2).
  From app 3.27.0 also **Data quality ›** in a finding's bubble in the Table view: it opens **Data issues** at that
  finding's group (for a finding marked **Not an error** at the list of marked findings).
  After an import and after a merge: [A5.4](#A5.4).
- **Since:** app 1.0.0; the sections **Problems** and **Leads** app 3.17.0; the name **to check** and the link from the
  Table view app 3.27.0; the section **To check** and "Nothing to check" app 3.27.0; the **Tree check** with its
  report and the subsection **Errors** app 3.33.0 (formerly the dialog **Tree validation**)

<!-- zdroj: app:src/validation.ts:83 validateTreeData, :1370 groupValidationIssues · strings.ts treeManager.valProblems, valLeads, leadsIntro, valReadOnly, valShowMore · 3.27.0: app:59a8eed0 strings.ts treeManager.validationWarnings „k ověření“, summaryErrors, summaryNoErrors, treeOverview.countWarnings · src/ui/table-view/table-bubble.ts (Kvalita dat ›) · table.sev.* · commit e530019b · „K ověření“: strings.ts treeManager.valProblems, commit 79764eba; „Nic k ověření“: validationPassed, summaryLeadsOnly, commit b1cbe546 (T54 G15) · 3.33.0: app:988b0f86 src/tree-health.ts buildBuiltinReport, healthSummary · src/ui/tree-health-ui.ts openTreeHealthReport (validateTreeData při každém otevření, storeHealthReport), oddíly secSummary…secCompare, holdsParts · src/ui/tree-health-errors-ui.ts (LONG_GROUP 50, GROUP_STEP, isPhone 640 px, chipy filterAll/filterErrors/filterWarnings/filterLeads, pododdíly error/warning/trace, nothingToCheck) · src/ui/tree-overview.ts health, health-report, validation, validation-leads · strings.ts health.* · CHANGELOG.cs.md 3.33.0 „Kontrola stromu“ · commity 2ecf9e43, 1b446bf4 -->

<a id="A5.1.1"></a>
### A5.1.1 One-click fix

Some findings have a button **Fix**; the summary above the findings has **Fix all (n)** for all findings that can be
fixed. A fix is one step back ("a tree check repair") and is written into the change history.

- Under **Fix all (n)** stands what is fixed, with counts, only for the kinds the tree has: "Fixes: broken links
  between people and unions (2); a union of a person with themselves – removed (1); a duplicate union – merged into
  the first, children kept (1); a place written several ways – unified to the most used spelling (3). Other findings
  stay unchanged." In a read-only tree neither the button nor the line is there.
- **From app 3.33.0:** **Fix** and **Fix all (n)** are in the report's section **Data issues**; the step back is
  called "a tree check repair" (formerly "fix from validation").

| Finding | What the fix does |
|---|---|
| Reference to a non-existent record, a participant without a person | removes the reference |
| A parent without a reference to the child, a child to the parent, a person to the partnership | adds the missing reference (parents only to a child with fewer than 2 parents) |
| Self-partnership | removes it |
| Duplicate partnership | keeps the first, moves the children to it |
| One place written several ways | rewrites all spellings to the most frequent one |

- **Since:** app 1.1.0; fixing places 1.10.0; the line under **Fix all (n)** app 3.27.0

<!-- zdroj: app:src/data.ts:4071 FIXABLE_TYPES, :4097 repairValidationIssue · strings.ts treeManager.valFix, valFixAll · řádek: src/ui/tree-stats.ts fixAllNoteText (orphaned*/missing* → links, selfPartnership, duplicatePartnership, placeSpelling), strings.ts treeManager.valFixAllNote, jen bez ro, commit 79764eba (T54 G15) · 3.33.0: app:988b0f86 src/ui/tree-health-errors-ui.ts validation-fix-all-btn, fixAllNoteText · strings.ts undo.repairedIssue „oprava z Kontroly stromu“ -->

<a id="A5.1.2"></a>
### A5.1.2 Scope and where the check starts

**Check the tree…** opens the choice **Tree check**: the tree's name, the number of people (for a tree from the
research "· research linked"), **Scope** and the list **Built-in checks** ("Always on, no AI, free, instant.").
**Create report** runs the check and opens the report.

| Scope | What the check goes through |
|---|---|
| **Whole tree** | the whole tree (default) |
| **Line ▾** ("Choose a line") | the person of a research line and their ancestors, or their descendants; for a one-person line the person, their parents, children and partners |
| **Person ▾** ("Choose a person for the check") | one person |

- **Limits:**
  - **Line ▾** is only there for a tree from the research that has lines and is running now. **Person ▾** works only
    in the open tree, not in view mode.
  - A narrower scope narrows **Data issues**, **Completeness and evidence** and the number of people. **Structure**,
    **Data safety** and **Places to identify** stay for the whole tree. Research rows for the whole tree carry "whole
    tree" ([A5.1.4](#A5.1.4)).
  - A line whose person the tree does not know is checked as the whole tree.
  - A person without a research number (P…) has no research rows.
- **Controls:**
  - **Tree overview → Data quality → Tree check → Check the tree…**;
  - in the person menu **Check this person…** (scope **Person**);
  - on the person page in the research section **Person check ›** with "last check 12 Mar 2025" when the person
    already has a report (scope **Person**);
  - in a line's **⋯** menu **Check the line…** (scope **Line**).
  - **Check this person…** and **Person check ›** are only there for a tree from the research and not in view mode.
    **Check this person…** is not there for a placeholder person. The saved person page has no row.
- **Since:** app 3.33.0

<!-- zdroj: app:988b0f86 src/ui/tree-health-dialog-ui.ts openTreeHealthDialog, healthDialogHtml (seg tree/line/person, line jen meta.research && treeLines, person disabled !active, builtinsTitle, builtinsNote, dlgSub), healthCheckAgain · src/ui/tree-health-ui.ts scopePeople, healthFacts (people → errors, noSource, persons) · src/tree-health.ts healthSourcesFor (narrowing errors, evidence, ancestors) · src/research-health.ts healthBuiltinScopeParam (person:P…, line:G…) · src/ui/research-directions-ui.ts directionPersonIds, directionHealthItem · src/ui/context-menu.ts menuPerson · src/ui/card-signals-ui.ts · src/ui/person-page-ui.ts health:person, pageRow, pageLast · strings.ts health.scopeLabel, segTree, segLine, segPerson, pickLine, pickPerson, menuPerson, menuLine, pageRow, createReport · commit 1b446bf4 -->

<a id="A5.1.3"></a>
### A5.1.3 Built-in checks and suggested steps

The app's built-in checks always run. Each has a row in the report; where it found something, it gives a suggested
step.

| Check | Row in the report | Suggested step · button |
|---|---|---|
| **Data issues** | counts ("… (without "not an error")"), **Data issues ›** | "3 errors in the data" · **Show errors**; errors only, not findings to check and leads |
| **Completeness and evidence** | "without a source 12 of 80 people", **Data quality ›** | "12 people without a source" · **Show in tree** |
| **Structure** | the number of unconnected parts, **Structure ›** | "Unconnected parts: 2" · **Split into families** |
| **Data safety** | "backup file 4 Feb 2025", "not saved to a file yet", or "unknown on this device" | "The tree has not been saved to a file for 40 days" · **Save a backup** |
| **Ancestor coverage** | "from Jan Horák: great-grandparents 5 of 8 known", "from Jan Horák: no known generation has a gap", or "no person chosen", **Ancestors ›** | "Grandparents of Jan Horák: 3 of 4 known" · **Show ancestors** |
| **Places to identify** | the number of places without a location, or "every place has a location", **Places ›** | "4 places without a location" · **Identify places** |

- **Limits:**
  - **Data safety** gives a step from 30 days without saving to a file, and only when the tree has unsaved changes.
    The days count from the last save to a file, otherwise from the tree's creation. In view mode the state is
    unknown.
  - **Ancestor coverage** looks for the first generation with ancestors missing, from the person in focus in the
    open tree, otherwise from the default person. The step is only up to the great-grandparents (3rd generation).
  - Order of steps: data safety first, then what holds the research back, then reliability, last growing the tree:
    backup · line stuck · old requests · decisions · empty queue · data issues · Strom fixes · verifying a line ·
    research consistency · people without a source · branch ends · materials · ancestors · places · unconnected
    parts. The research's steps are in [A5.1.4](#A5.1.4).
  - The first 10 steps are shown, more behind "and 4 more steps ›".
- **Since:** app 3.33.0

<!-- zdroj: app:988b0f86 src/tree-health.ts HEALTH_BACKUP_DAYS 30, HEALTH_STEPS_SHOWN 10, ANCESTOR_STEP_MAX_GEN 3, STEP_ORDER, buildBuiltinReport, healthSteps (errors jen report.errors.errors) · src/ui/tree-health-ui.ts healthFacts (fileCopyAt ?? createdAt, hasUnsavedChanges, isViewMode → null, ancestorGenerations, collectPlaces), rootOf (focus, defaultPersonId) · strings.ts health.src*, step*, link*, moreSteps · commit 2ecf9e43 -->

<a id="A5.1.4"></a>
### A5.1.4 The research's rows and steps

For a tree from the research that is running and can do it, the research adds its own rows and steps to the report.
The app asks it for them at every check and waits at most 4 s.

| Row | What it shows |
|---|---|
| **Certainty of research facts** | "8 facts to confirm" / "all confirmed" |
| **Awaiting action and task audit** | requests sent over 30 days ago and tasks with an audit finding / "nothing old" |
| **Lines and queue** | lines, how many are stuck, open and parked tasks of the queue |
| **Strom fixes** | "2 waiting" / "none waiting" |
| **Verification against originals** | citations without a page and without an image / "every citation has a page and an image" |
| **Decisions** | "3 waiting" / "none waiting" |
| **Branch ends** | "6 not searched" / "all searched" |
| **Material and batches** | unsorted in batches and without a person / "everything sorted" |
| **Research consistency** | errors and warnings of `strom check` / "no problems" |
| **Tree growth** | "in 30 days +12 people, +40 facts, +9 sources" |

| Research step | Why | Button |
|---|---|---|
| "Line Horákovi is stuck" | "No task of the line is moving." | **Work on the line**; when the line has tasks waiting, **Open** |
| "2 requests sent over 30 days ago without an answer" | "An answer may have come by post or email." | **Record the answer** |
| "3 items wait for a decision" | "Hypotheses, conflicts and imports the research does not decide alone." | **Open** |
| "The research queue is empty" | "The agent has nothing to work on." | **Open the research** |
| "2 Strom fixes wait" | "Repairs the research offers for the tree's data." | **Run the fix** |
| "5 facts to verify against originals · line" | "Facts taken from indexes, not from the original record." | **Verify the line** |
| "Research consistency: 2 problems" | "The research's own check found records that do not fit together." | **Open the research** |
| "6 branch ends not searched" | "People at the end of a branch whose records have not been looked for." | **New line** |
| "4 materials not sorted" | "Files and batches without a person." | **Open Materials** |

- **Limits:**
  - A line is stuck when it is active and has no task in the queue. An empty queue is a step only with an active line.
  - The research sends at most 10 steps. A stuck line, old requests, decisions and an empty queue also go into
    **What holds the tree back** (**Suggested steps ›**).
  - In a narrower scope, **Strom fixes**, **Material and batches**, **Research consistency** and **Tree growth** are
    for the whole tree (the row carries "whole tree").
  - An archive and the sample research have no lines, queue, requests, line verification, branch ends or task
    waiting.
  - Without research rows the choice says why: "The research's own checks come with a newer Strom Research." (the
    research cannot do it), "The research's own checks are missing: the research is not running now.", for a tree
    without research "More built-in checks come with a linked Strom Research."
  - When the research is not running, a research step has its button disabled ("The research is not running now.").
    After an import the check is not sent to the research.
- **Controls:** terminal `strom health` ([A5.9](#A5.9)); connecting with the research
  [S1](S1-connecting-app-and-research.md).
- **Since:** app 3.33.0 (research 1.38.0)

<!-- zdroj: app:988b0f86 src/research-health.ts HEALTH_FEATURE 'health', researchHealthRows (wholeTree fixes, material, consistency, growth), healthBuiltinScopeParam (import → null), HEALTH_BUILTIN_TIMEOUT_MS 4000, fetchResearchHealthBuiltin GET /health/builtin, parseResearchHealthBuiltin steps.slice(0, 10) · src/ui/tree-health-ui.ts healthResearchPart (none/off/old/ok), researchStepRow (actWork/actOpen…), researchOff · src/ui/tree-health-dialog-ui.ts builtinsMore, builtinsWhyOld, builtinsWhyOff · strings.ts health.srcConfirm…srcGrowth, stepLineStuck…stepMaterial, act* · research:d8742230, 3f541f54, 818a015b src/core/health.ts builtin, stepsOf (stuck = active && queued 0, queue-empty jen s aktivní linií, archive), SENT_OLD_DAYS 30, STEPS_MAX 10 · src/core/live.ts GET /health/builtin, BRIDGE_FEATURES health · CHANGELOG.cs.md 1.38.0 „Kontrola stromu“ -->

<a id="A5.1.5"></a>
### A5.1.5 Older reports, print and Save HTML

The report is kept in the tree's data, so it also goes into the backup and JSON. The tree holds the new report and
one before it.

- **Limits:**
  - It is kept only for the open tree that is not read-only. Otherwise the report's footer says "The report is not
    kept: the tree is read-only or not open." Keeping it has no step back.
  - **Since the last check** compares the report with the last report of the same scope: "Last check 4 Feb 2025:
    errors 3 → 1, to check 5 → 5, leads 2 → 4, 1 new step, 2 steps gone.", "… no change.", or "This is the first
    check."
  - **Older reports ▾** shows the kept reports ("4 Feb 2025 · whole tree · built-in · 3 suggested steps"), otherwise
    "No older report." An older report has its steps read-only ("An older report from 4 Feb 2025; the current state
    may differ.") and does not show data issues ("The data issues of an older report are not kept; checking again
    shows the current ones.").
  - Dates in the report have no year when they are from this year ("12 Mar").
  - **Save HTML** saves the file "Tree check – Horákovi – 2026-03-12.html" without buttons and with all sections
    expanded. It replaces the names of living people with "…" and adds "Living people are hidden as the output
    settings say." Who is a living person: [S11.1](S11-protecting-living-people.md#S11.1).
- **Controls:** in the report's header **Older reports ▾**, **Print**, **Save HTML**, **Check again…** (a report after
  an import is checked again as the whole tree); on a phone in the menu **…**.
- **Since:** app 3.33.0

<!-- zdroj: app:988b0f86 src/tree-health.ts keepHealthReports (nová + jedna před ní), sameScope, compareReports, sanitizeHealthReports · src/data.ts storeHealthReport (bez undo) · src/ui/tree-health-ui.ts healthDay (letos bez roku), stored, older (at > 0), olderNote, olderErrors, footStored, footNotStored · src/ui/tree-health-dialog-ui.ts openOlderHealthReports, saveHealthReportHtml (fileName, PERSON_PAGE_DEFAULT_PRIVACY, isLivingPerson, livingHidden, saved), healthCheckAgain (import → tree), moreActs · strings.ts health.olderReports, olderRow, olderNone, print, saveHtml, checkAgain, compareLine, compareSame, firstCheck · commit 1b446bf4 -->

<a id="A5.2"></a>
## A5.2 Family links

The check looks for links that cannot hold. All are errors, except a duplicate partnership (to check).

| Finding in the app | When |
|---|---|
| **Ancestor cycle detected** | a person is their own ancestor; only the first cycle is reported |
| **Self-partnership** / **Duplicate partnership** | the partner is the same person / two partnerships of the same couple |
| **Parent missing child reference**, **Child missing parent reference**, **Partnership child mismatch** | the link is recorded from one side only |
| **Reference to non-existent record** | a parent, child, partner or partnership is missing |
| **Event participant links to a person who no longer exists** | a godparent or witness (also a marriage witness) is a deleted person |
| **More than 2 parents** | |
| **Person at multiple generations** | counting generations runs into a contradiction; a partner is in the same generation |
| **Partner is also parent / child**, **Sibling is also parent / child** | |

- **Since:** app 1.0.0; event participant 1.16.0

<!-- zdroj: app:src/validation.ts:142 checkCycles, :200, :223, :255, :293, :346-464 orphaned*, :471 tooManyParents, :554 generationConflict, :621 · strings.ts treeManager.val* -->

<a id="A5.3"></a>
## A5.3 Dates and age

The check reports only what certainly does not hold. It counts an incomplete or approximate date over its whole
possible range: without a month January to December, "about" ± 2 years, "before" up to 20 years earlier, "after" up to
20 years later, a range up to its end. Only when the violation holds over the whole range is it a finding. The
exception are the milder limits to check from app 3.27.0 (below): there it is enough when the limit is crossed by one
end of the possible age.

| Finding in the app | Severity | When |
|---|---|---|
| **Death date is before birth date** | error | |
| **Implausibly long lifespan** | to check | more than 115 years |
| **Parent younger than child** | error | by date of birth |
| **Parent very young / very old at birth** | to check | under 12 / over 80 years; birth dates only |
| **Mother younger than 16 at the birth** / **… older than 45 at the birth** | to check | from app 3.27.0, see below |
| **Father younger than 18 at the birth** / **… older than 60 at the birth** | to check | from app 3.27.0, see below |
| **Event dated before birth** | to check | |
| **Event dated after death** | to check | except: Burial, Cremation, Will, Probate |
| **Child born after the mother's death** | error | more than 1 month after the death; own parents only |
| **Child born long after the father's death** (… **a parent's**, sex unknown) | to check | more than 10 months |
| **Wedding dated before a partner's birth** | error | |
| **Wedding dated after a partner's death** | to check | |
| **Married as a child** | to check | under 14 years |
| **Married under the age of 16** | to check | from app 3.27.0, see below |
| **Recorded age differs by more than 2 years** | to check | from app 3.27.0, see below |
| **Extreme age difference between partners** | info (**Leads**) | 40 years and more |
| **Birth/death recorded as a life event** | error | birth or death in the list of events |
| **Custom event has no label** / **Event has an invalid date** | to check | |

- **Limits:** the research's `strom check` has the same exceptions after death. A parent without a type of
  relationship counts as biological.
- **From app 3.27.0:** milder limits to check:
  - a **mother** younger than 16 or older than 45 and a **father** younger than 18 or older than 60 at a child's
    birth. Only a biological parent of known sex, the age from both dates of birth;
  - a **marriage** at an age under 16;
  - it is enough when the limit is crossed by one end of the possible age (an age "15–16" is under 16). A date with
    **about** counts as an estimate of the age; a date with **before** or **after** is not compared;
  - only the stricter finding is reported: where **Parent younger than child**, **Parent very young / very old** or
    **Married as a child** already holds, the milder finding is not;
  - the **recorded age** (at a marriage the age of each of the couple, at death, at birth) is compared with the age
    from the date of birth and the date of the event. It is a finding when it is outside the possible range by more
    than 2 years. An age written in words or with about, before, after is not compared, nor when one of the dates is
    only an estimate;
  - the row of the finding shows the dates and the age ("* 1850 → * 1866: 15–16", "⚭ 1872: 30 ≠ 26–27").
- **Since:** app 1.0.0 (age of parents); 1.4.0 (events); 1.7.0 (dates and death); a child after the death of a parent
  of unknown sex 3.10.0; four exceptions after death 3.17.0 (before only burial); milder limits for the age of
  parents and of marriage and the recorded age 3.27.0

<!-- zdroj: app:src/validation.ts:493 checkAgePlausibility MIN_PARENT_AGE MAX_PARENT_AGE, :863 checkDateConsistency MAX_LIFESPAN_YEARS CHILD_MARRIAGE_YEARS PARTNER_AGE_GAP_YEARS POSTHUMOUS_FATHER_MONTHS AFTER_DEATH_EVENT_TYPES, :120 checkLifeEvents · monthRange, certainlyBefore · research:src/core/afterdeath.ts AFTER_BY_NATURE · strings.ts treeManager.val* · 3.27.0: app:59a8eed0 src/validation.ts MOTHER_MIN_AGE 16, MOTHER_MAX_AGE 45, FATHER_MIN_AGE 18, FATHER_MAX_AGE 60, checkParentAgeLimits (gender female/male, parentRelTypes biological, jen když není parentYoungerThanChild/parentTooYoung/parentTooOld), ageSpan (< > → null; ~ approxAgeBetween), spanText, MARRIAGE_MIN_YEARS 16 (else za childMarriage), checkRecordedAges SLACK_YEARS 2 (Partnership.ages, deathAge, birthAge), src/dates.ts recordedAgeGap, ageRangeBetween · strings.ts treeManager.valMotherTooYoung16, valMotherTooOld45, valFatherTooYoung18, valFatherTooOld60, valMarriageUnder16, valRecordedAgeMismatch, validationWarnings, countWarnings, summaryErrors · spec 073 §7.6 · CHANGELOG.cs.md 3.27.0 -->

<a id="A5.4"></a>
## A5.4 Sources, attachments and merges on import

| Finding in the app | Severity | When |
|---|---|---|
| **Citation points to a missing source** | to check | a citation at a person, event, partnership or attachment |
| **Attachment has no usable data** | to check | the data are neither an image nor a PDF (an attachment with an original only is not reported) |
| **Photo is not a supported image** | to check | a format other than JPEG, PNG, WebP, GIF |
| Two people probably merged into one when a GEDCOM file was imported (Strom 3.8.1 and older) … | error | see below |

Older versions could give two people the same ID on import. The check reports it on a clear sign (more than 2 parents,
a person who is their own parent, child or partner), or when a child is born less than 12 years after a parent and in
addition there are parents or a partner of the same sex. Parents of the same sex alone do not give a finding. The
remedy is in the text of the finding: import the original file again as a new tree.

- **Since:** app 1.7.0 (sources and attachments); 3.0.0 (photos); 3.9.0 (merges on import)
- **From app 3.33.0:** the check after an import and after a merge is the report **Tree check** (formerly the question
  "Data check"):
  - a file from another program with the card **What next**: the card has the row **Tree check** ("Found 3 things
    worth a look. Nothing is corrected automatically." or "The tree check found nothing to review in the import.")
    with **Open the report** ([S6.4](S6-tree-from-another-program.md#S6.4));
  - another import: the report **What the import added** opens right at **Data issues**. When the check finds
    nothing, only the notice "The tree check found nothing to review in the import." with **Report ›** shows (8 s).
    After the report is closed, the app may ask about splitting into families;
  - the report after an import goes through the whole tree. It is not sent to the research;
  - a merge: **Check the tree** in the wizard's last step and in the merge history opens the report **What the merge
    added** with the added and joined people and **‹ Back to the merge** ([A8.11](A8-merging-trees.md#A8.11)).

<!-- zdroj: app:src/validation.ts:982 checkSourceIntegrity, checkPhotoData, :1199 checkImportMerges · strings.ts treeManager.valCitationMissingSource, valAttachmentNoData, valPhotoUnsafeData, valImportMerge · 3.33.0: app:988b0f86 src/ui/import-export.ts afterImport (offerImportNextCard, path merge, openTreeHealthReport section errors, quietWhenClean, scope import bez personIds, offerPostImportSplit) · src/ui/tree-health-ui.ts quietWhenClean → importClean 8000 ms, action report · src/ui/import-next-ui.ts řádek check (checkFound, checkClean, openReport) · src/research-health.ts healthBuiltinScopeParam (import → null) · src/merge/ui.ts:1786, src/ui/merge-history-ui.ts:173 scope import merge personIds added + joined, backToMerge · strings.ts health.scopeImport, scopeMerge, importClean, openReport, treeManager.postImportCheckTitle, importNext.checkFound, checkClean · commit ea094193 -->

<a id="A5.5"></a>
## A5.5 Leads: godparents and spellings of places

**Leads** are not errors. They show where there may be kinship or an inconsistent spelling.

- **A godparent who keeps turning up — often a relative:** the same godparent or witness is at the events of at least
  2 people who are not related to each other, and those people belong to at least 2 groups of siblings. The row
  shows at how many events and people. Example: Marie Vlková is godmother to the Horák children and to the children of
  their neighbours.
- **One place written several ways:** spellings that differ only in upper and lower case, diacritics, or a full stop
  or comma, e.g. "Brno" and "brno.". The row shows each spelling with a count; the fix is in [A5.1.1](#A5.1.1).
- **Limits:** relatives are people at most 3 steps apart through parents, children and partners. Counted are the
  participants of a person's events, marriage witnesses and the participants of a couple's shared events. **Leads**
  also hold the age difference of partners ([A5.3](#A5.3)).
- **Since:** app 1.10.0 (places); 1.16.0 (godparents); groups of siblings and officials 3.17.0
- **From app 3.28.0:** **Leads** also hold:
  - the same event recorded separately for several people, with **Join into one event** or **Review one by one**
    ([A10.4](A10-shared-events.md#A10.4));
  - godparents and witnesses recorded by name who match a person in the tree, with **Review one by one**
    ([A10.5.2](A10-shared-events.md#A10.5.2)).

<!-- zdroj: app:src/godparents.ts:42 RECURRING_THRESHOLD, :188 recurringParticipants, :270 siblingGroupCount, :300 godparentLeads · src/validation.ts:1034 checkPlaceSpellings, checkRecurringGodparents · strings.ts treeManager.valRecurringGodparent, valRecurringGodparentDetail, valPlaceSpelling, leadsSkipped -->

<a id="A5.5.1"></a>
### A5.5.1 How the same godparent is recognised

- A person linked to the tree is recognised by the record. A name that is only written is compared as text; the row
  then has "matched by name".
- From the entry the name is taken up to the first comma, lower-case letter or digit. Titles and forms of address
  (godfather, Mr., Mgr. …) are left out, particles (von, de …) stay, text in brackets is a note. Comparison ignores
  diacritics and upper and lower case.
- The name must have at least 2 words. A given name alone never matches.
- Whoever is at the event by office is not reported: the officiant, the midwife and the clergy (parish priest,
  chaplain, Pfarrer, parochus …). A cleric recorded as a godparent is reported.

<!-- zdroj: app:src/godparents.ts:48 NAME_PARTICLES, :54 NAME_PREFIXES, :80 participantName, :117 CLERGY_WORDS, :121 MIDWIFE_WORDS, :134 attendsByOffice · strings.ts treeManager.valRecurringGodparentByName -->

<a id="A5.6"></a>
## A5.6 Possible duplicate person

Two people may be the same when they have the same surname and the same given name and were born in the same years.
Comparison ignores upper and lower case and diacritics. The finding is in **Leads** in the group **Possible duplicate
person**.

- **Limits:**
  - Year of birth: the date of birth; without it the baptism (the year of baptism or the year before it); without it
    the death or burial with the age at death. When both years come from births, they must overlap. Otherwise they
    may be 2 years apart.
  - When one person lacks a given name, the surname and the years are enough.
  - People without a date are paired only with exactly the same name. A person with a date is not paired with a
    person without one.
  - Not reported: placeholder and unnamed persons, incompatible sex, parent and child, and pairs where one person
    certainly died before the other's birth (or baptism).
- **Controls:** **Two different people** ([A5.7](#A5.7)); at a verdict of the research **Merge…**
  ([A5.6.1](#A5.6.1)).
- **Since:** app 1.9.9; years from baptism and death 3.17.0
- Merging two people of one tree is a different thing from merging two trees or importing a family tree into a
  tree ([A8](A8-merging-trees.md)): that is led by a guide and can be undone ([A8.12](A8-merging-trees.md#A8.12)).

<!-- zdroj: app:src/validation.ts:1084 birthYears, :1127 checkPossibleDuplicates STAND_IN_YEARS_SLACK · strings.ts treeManager.valGroupPossibleDuplicate, twoPeople · odkaz na A8: spec 134 (dokumentace „A5.6 odkaz“) -->

<a id="A5.6.1"></a>
### A5.6.1 The research's verdict

For a tree from the research, the app asks the research about all pairs when the check opens. The check does not
wait for the answer. The research assesses only people who have its number (P…). The first rule that applies decides:

| Order | The research found | Verdict in the app |
|---|---|---|
| 1 | it does not know the person | none |
| 2 | it has already merged the people | **Merged in the research** |
| 3–9 | two people marked by a person; different sex; parent and child; birth or baptism more than 3 years apart; one died before the other was born; siblings (the second child was given the name of the one who died); different parents | **Two people** |
| 10 | the names differ in the research | **Uncertain** |
| 11–12 | the same parents and known years; the same entry in a source for both | **Probably the same person** |
| 13–14 | close years and nothing more; no date for one person | **Uncertain** |

- **Limits:**
  - Pairs with the verdict **Probably the same person** and **Merged in the research** go to the top, then
    **Uncertain**, then those without a verdict.
  - Pairs **Two people** go aside into the row **Told apart by the research: n** and are not counted.
  - A verdict that arrives into an open group only adds a label. It is re-sorted at the next opening.
  - Under the group is **The research is assessing…** or **Assessed by the research**. When the research that assessed
    at the last connection is not running: "Not assessed by the research – the research is not running." A research
    that cannot assess is not mentioned.
- **Controls:** at a verdict **Merge…** (merging people) or **Load the new version** · terminal:
  `strom person compare P… P…`, for many pairs `--pairs-from`. Connection with the research:
  [S1](S1-connecting-app-and-research.md).
- **Since:** app 3.17.0 (research 1.22.0)

<!-- zdroj: app:src/duplicate-verdicts.ts:18 MAX_JUDGE_PAIRS, :54 issueResearchPair, :142 verdictRank, :154 verdictsMode, :192 verdictReasonText · src/quality-bridge.ts:172 postDuplicates · strings.ts treeManager.verdict*, reason* · research:src/core/duplicates.ts judge YEARS_CLOSE · src/core/live.ts:168-192 · src/commands/quality.ts person compare -->

<a id="A5.6.2"></a>
### A5.6.2 Warning when entering a person

When a new person is entered, the app shows at most 3 similar people ("Similar people already exist:"). It compares
differently from [A5.6](#A5.6): by a similarity score as in merging, never with incompatible sex.
- **Controls:** **Go to person**, **Use existing** · turned off by **Settings → Notifications → Duplicate
  suggestions**.
- **Since:** app 1.4.0

<!-- zdroj: app:src/ui/duplicate-suggest.ts:22 MAX_SUGGESTIONS, :75 runDuplicateCheck · findSimilarPersons SIMILAR_PERSON_THRESHOLD · strings.ts duplicateSuggest.settingLabel, useExisting -->

<a id="A5.7"></a>
## A5.7 Not an error

A finding that is not an error is marked. Then it is no longer reported, even when the tree is checked again.
The mark is a change of the tree: it has a step back and an entry in the change history. For a possible duplicate the
button is called **Two different people**.

- **Limits:**
  - The app recognises the same finding by its kind, people and subject. The subject is the year for an event or
    wedding after death, the name for a godparent and the most frequent spelling for a place. When any of these
    changes, the finding shows again.
  - For a tree from the research, the mark is sent to the research when all people of the finding have a research
    number (at most 20 people). The research's GEDCOM file does not carry the marks; when a new version is loaded they
    are taken over from the old version of the tree.
  - The research respects marks at an event and a wedding after death: `strom check` does not report them and the
    agent does not investigate them.
  - State of a mark: **Sent to the research**, **Waiting for the research** (the research is not running, it is sent
    at the next connection), **In the app only** (the research did not take it or the people have no number; it is
    not sent again), **Marked in the research**.
  - A mark at a place has no people, so it is not sent to the research. When a part of the tree is separated, only
    marks whose people all stay are kept.
  - The app knows a mark written in the research only for an open tree from the research, when the research is
    running.
  - **From app 3.27.0:** the subject for **Married under the age of 16** is the year of the marriage, for **Recorded
    age differs by more than 2 years** the fact (birth, marriage, death) and for a marriage its year. The Table view
    shows a marked finding as **unusual**, and from there it can be marked and restored too
    ([A6.7.5](A6-views.md#A6.7.5)).
- **Controls:** in the row of a finding **Not an error** / **Two different people**, for 6 s the offer **Undo**. The
  list **Marked as not an error: n** under the findings (from app 3.33.0 at the end of **Data issues** in the report
  [A5.1](#A5.1)), at each mark a date or **Marked in the research**, the button
  **Restore** · terminal: `strom quality list`, `strom quality dismiss possibleDuplicate P… P…`,
  `strom quality dismiss eventAfterDeath P… --subject 1861`, `strom quality undo …`. Only a person writes a mark,
  never the agent.
- **Since:** app 3.17.0 (research 1.22.0)

<!-- zdroj: app:src/validation.ts:1415 qualityFinding (3.27.0: marriageUnder16 rok, recordedAgeMismatch field + rok) · src/ui/table-view/table-bubble.ts · src/quality-dismiss.ts:47 sanitizeQualityDismissed, :152 dismissalFor, :186 dismissBody, mergeResearchMarks, carryOverTreeDecisions, dismissalsWithin · src/quality-bridge.ts:74 dismissReply · src/ui/quality-ui.ts:155 flushQuality, :257 readQualityMarks · src/data.ts:1674 dismissQualityFinding · src/ui/tree-stats.ts:104 DISMISS_TOAST_MS (3.33.0: app:988b0f86 src/ui/tree-health-errors-ui.ts DISMISS_TOAST_MS, qualityDismissedHtml) · strings.ts treeManager.notAnError, twoPeople, dismissedRow, sentToResearch, waitingForResearch, appOnly, markedInResearch · research:src/commands/quality.ts PERSON · src/core/afterdeath.ts -->

<a id="A5.8"></a>
## A5.8 Tree overview → Data quality

The section sums up the check and the completeness of the tree. It counts the same way as **Data issues**
([A5.1](#A5.1)), without marked findings and without pairs the research told apart.

| Block | What it shows |
|---|---|
| **Tree check** | "Last run 12 Mar 2025 · 3 suggested steps" or "Not run yet"; **Report ›** (the last report of the whole tree), **Check the tree…** ([A5.1.2](#A5.1.2)); only a tree with people |
| **Consistency** | a summary ("2 errors, 1 to check, 3 leads."), the 5 most serious errors and findings to check, "and n more…", the row "n leads ›" |
| **Data completeness** | the share of people with **Birth date**, **Date of death (deceased)**, **Birthplace**, **Photo**; under 50 % highlighted; "Tree content:" (photos, events, sources, attachments) |
| **Certainty of research facts**, **Where evidence is missing** | evidence, see [R3.8](R3-verification-and-citation.md#R3.8) and [A3](A3-evidence-in-the-app.md) |
| **Structure** | the number of unions; unconnected parts, or "All people are connected into one family." |
| **Quick actions** | **Data issues ›**, **Clean up orphaned places (n)**, **Split into families** |

- **Limits:**
  - Over 10 MB of photos and attachments a notice is added ("Media exceed 10 MB. The tree file saves and shares more
    slowly."). An orphaned place is a place nothing refers to.
  - An unconnected part has no path to the main family; it can be separated (**Separate unconnected parts**).
  - The card in **Where to focus** shows the number of errors and the most frequent kind. It has the button **Fix**
    (open tree) or **Data issues ›**; both open the report at **Data issues**.
  - **Check the tree…** works only in the open tree. **Report ›** is there once the tree has a report of the whole
    tree.
  - **From app 3.33.0:** the block **Tree check**; **Data issues ›** and the row "n leads ›" open the report
    (formerly **Validation details** and the dialog **Tree validation**).
- **Controls:** **Tree overview → Data quality**; in the tree menu also **Data quality** directly.
  Actions that change data work only in the open tree.
- **Since:** app 3.13.0; leads and marks 3.17.0; "to check" instead of "warning" 3.27.0; the block **Tree check**
  3.33.0

<!-- zdroj: app:src/ui/tree-overview.ts:101 TOP_ISSUES, :108 LOW_SHARE, :1882 treeOverviewQualityHtml, :925 selectFocusCards · src/ui/tree-actions.ts:191 overview-quality · strings.ts treeOverview.consistencyTitle, completenessTitle, field*, contentLabel, mediaWarning, structureTitle, allConnected, quickActions, actValidation, actCleanPlaces, actSplitFamilies, cardValidation · 3.33.0: app:988b0f86 src/ui/tree-overview.ts blok check (q.persons === 0 → bez bloku, last = healthReports scope tree, lastRun, stepsCount, notRun, report, checkTree jen st.active, disabledHint), akce health, health-report, validation, validation-leads · strings.ts health.title, lastRun, notRun, report, checkTree, treeOverview.actValidation „Chyby v datech ›“ -->

<a id="A5.9"></a>
## A5.9 `strom health` in the terminal

`strom health` prints the built-in part of the tree check as the research knows it. It is the same part the research
sends into the report in the app ([A5.1.4](#A5.1.4)). It changes nothing.

| Output line | What it shows |
|---|---|
| "Tree check · the whole tree · …" | the scope and the state of the research's history |
| "Data check: in order" / "Data check: PROBLEM" | the state of `strom check`: errors, warnings, people without evidence |
| "Grew in 30 days: …" | new people, facts and sources |
| "Lines: …", "Queue: 4 open, 1 put aside" | lines (in the queue, waiting, STANDS STILL) and the queue ("EMPTY") |
| "Sent with no reply for long: …" | requests sent over 30 days ago |
| "Waits for a decision: 3", "Fixes of strom's waiting: …" | decisions and Strom fixes |
| "Facts to verify: 5" | facts to verify against the original, by line |
| "Branch ends never searched: 6" | branch ends; it lists at most 8 people |
| "Material waiting to be sorted: 4" | material without a person and open batches |
| "Tasks waiting not as strom needs them: 1" | tasks with an audit finding |
| "Citations of originals: 2 without a page, 7 without an image" | citations without a page and without an image |
| "Next steps:" | at most 10 steps, each with a command ("1. the queue is empty → strom run") |

| Step | Command |
|---|---|
| the data check found errors | `strom check` |
| a line stands still, tasks waiting / nothing in its queue | `strom task list --research G… --state waiting` / `strom run --research G…` |
| requests with no reply for long | `strom task list --state waiting` |
| waits for a decision | `strom status` |
| the queue is empty | `strom run` |
| a fix of strom's | `strom fixes show …` |
| facts to verify in a line | `strom verify bulk --scope line --of G… --dry-run` |
| branch ends never searched | `strom edge` |
| material waiting to be sorted | `strom input list` |

- **Limits:**
  - Order of steps: research consistency, lines that stand still, old requests, decisions, an empty queue, Strom
    fixes, verification by line (most facts first), branch ends, material.
  - A line stands still when it is active and has no task in the queue. An empty queue is a step only with an active
    line.
  - An archive and the sample research leave out lines, the queue, requests, verification, branch ends and task
    waiting.
  - The output is in the research's language, with `--lang` in another.
- **Controls:** terminal:
  - `strom health` the whole tree; `--scope line:G…` one line, `--scope person:P…` one person;
  - `--json` output for programs;
  - `--save` keeps the output as a report C… (state "built");
  - `strom health list` the kept reports from the newest, the 10 newest (`--all` all of them);
    without a report "no report yet …";
  - `strom health show C…` one report.
- **Since:** research 1.38.0

<!-- zdroj: research:d8742230, 3f541f54, 818a015b src/commands/health.ts (register health, health list, health show; builtinLines; stepWords → příkazy; „  1. {what} → {command}“; edges.people.slice(0, 8)) · src/core/health.ts builtin (archive), stepsOf (pořadí, stuck, queue-empty), SENT_OLD_DAYS 30, STEPS_MAX 10, EDGE_PEOPLE_MAX 50 · src/core/live.ts GET /health/builtin · assets/lang/cs.json ui.health.head, check.ok, check.problem, growth, lines, line.*, queue, queue.empty, sent, decide, fixes, verify, edges, material, batches, tasks, citations, steps, step.*, saved, list.none, run.state.built · help: strom help health, health list, health show · CHANGELOG.cs.md 1.38.0 „Kontrola stromu“ -->
