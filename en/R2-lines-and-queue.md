<a id="R2"></a>
# R2 Lines and the queue

What the research agent bases its choice of work on. Describes the research 1.25.2 and the Strom app 3.21.2.
Changes from a later version carry its number.

<a id="R2.1"></a>
## R2.1 A line sets what the research investigates

A line of the research is one goal: the ancestors of a person, the descendants of a person, or one question. Every task
belongs to some line, and the agent works on the tasks of the lines. The app calls a line a *direction*.

- **Controls:** app: the research panel, section **Directions · {n} active** · terminal: menu **Add to the research →
  A new direction**, command `strom research new`
- **Since:** research 1.0.0

<!-- zdroj: research:src/core/model.ts DIRECTIONS, RESEARCH_STATES · research:src/commands/research.ts · app:strings.ts live.dirTitle -->

<a id="R2.1.1"></a>
### R2.1.1 Kinds of lines and their limits

- **Ancestors of a person**, at most a given number of generations, or only ancestors born before a given year.
- **Descendants of a person.**
- **One question** (a made-up example: “Who was the father of Marie Vlková?”).
- **A person review** comes from reviewing a person, not from the offer of a new line.
- **Controls:** terminal: `strom research new --direction ancestors|descendants --generations <n> --before <year>
  --question "<question>"`. App: **+ New direction**, with the limits **Generations at most** and **Only before the
  year** (app 3.22.0 with research 1.26.0).
- **Since:** research 1.0.0

<!-- zdroj: research:src/commands/research.ts:79 · assets/lang/cs.json ui.research.kind · app:src/ui/research-directions-ui.ts DIRECTIONS_WRITE_SINCE -->

<a id="R2.1.2"></a>
### R2.1.2 A paused and an ended line

- **Paused:** its tasks wait outside the queue; the agent takes the tasks of other lines.
- **Ended:** its tasks leave the queue. Nothing is deleted and the line can be started again.
- **Controls:** terminal: **Add to the research → The directions of the research: pause, end or take one up again**,
  `strom research pause|done|resume`. App: the Directions section, actions **Pause**, **End**, **Restart**.
  In the app 3.21.2 the action is confirmed in the research terminal; from the app 3.22.0 directly in the panel.
- **Since:** research 1.8.0

<!-- zdroj: research:src/commands/research.ts:168-175 · src/cli/menu-research.ts:233-263 · app:v3.21.2 research-directions-ui.ts:554 -->

<a id="R2.1.3"></a>
### R2.1.3 Who belongs to a line

- An ancestors line: the person, their ancestors within the line's limits, and the spouse of an ancestor.
- A line with a question: the person the question concerns.
- A task with no line set belongs to the narrowest line its people fall into.
- **Since:** research 1.0.0. Spouses and the person of a question from 1.26.0.

<!-- zdroj: research:src/core/frontier.ts:159-194 researchPeople/linePeople · src/core/directions.ts:75-82 directionOf · CHANGELOG.cs.md 1.26.0 -->

<a id="R2.2"></a>
## R2.2 The queue sets which task comes next

The open tasks of all running lines form one queue. The agent always takes the first task. A task in progress goes
before all others.

- **Limits:** the order is set by these keys, each next one only when the previous ones are equal:
  1. a task in progress;
  2. a manual choice **Do next** / **To the end** ([R2.3.1](#R2.3.1));
  3. local history tasks go after the others, in their own order; when the history is due, its first task goes first;
  4. work off the lines ([R2.3](#R2.3));
  5. short work first: linking hypothesis variants to persons in the tree, and places a person asked to identify;
  6. a story: when it is due, it goes first ([R2.2.2](#R2.2.2)), otherwise after the research;
  7. a task that can be done now before a task waiting for images downloaded by a person;
  8. the queue strategy ([R2.2.1](#R2.2.1));
  9. the kind of task: material → where the records are → proving a link → verification → enriching a person →
     request to an archive → story;
  10. the age of the task.
- **Controls:** terminal: `strom task list`, `strom task next`. App: section **Queue**.
- **Since:** research 1.0.0 (keys 1, 7–10). Key 6 from 1.1.0, linking hypotheses from 1.17.0, key 3 from 1.22.0,
  key 4 and places on request from 1.25.0. Key 2 from 1.26.0.

<!-- zdroj: research:src/core/queue.ts rankTasks (řazení :374-396), LEVEL_ORDER :52, linksFirst (hypolinks.ts:453), placesFirst · verze klíčů: git log -S na „a.blocked - b.blocked“ (v1.0.0), „a.story - b.story“ (v1.1.0), „a.first - b.first“ (v1.17.0), „a.hist - b.hist“ (v1.22.0), „a.offLine - b.offLine“ a placesFirst (v1.25.0) -->

<a id="R2.2.1"></a>
### R2.2.1 The queue strategy

- **balanced** (default): takes turns between lines. It ranks higher a line with a higher priority, a nearer
  generation, and a line not worked on in the last 4 sessions. It ranks lower a task that has already failed.
- **depth:** stays with the line being worked on.
- **priority:** by the line's priority (1–5, default 3), then by generation.
- **Controls:** terminal: `strom config set queue.strategy balanced|depth|priority`, a line's priority
  `strom research new … --priority <1–5>`.
- **Since:** research 1.0.0

<!-- zdroj: research:src/core/queue.ts:294-299, RECENT=4 :58 · src/core/config.ts queue.strategy · model.ts priority -->

<a id="R2.2.2"></a>
### R2.2.2 A story is due

Otherwise a story waits until the research has nothing to do. After 5 sessions without a story, though, one waiting
story comes up first (when the agent works alone). This does not apply with the priority strategy.

- **Since:** research 1.1.0

<!-- zdroj: research:src/core/queue.ts STORY_EVERY=5 :61 -->

<a id="R2.2.3"></a>
### R2.2.3 Tasks that wait outside the queue

A task is not taken while:
- its line is paused or ended ([R2.1.2](#R2.1.2));
- it concerns only people no family link joins to the tree. The link to the tree must be proven first, then the
  research goes on. A task that verifies that link is taken;
- the images of the book it should read are missing, and a decision on how to get them is awaited;
- the archive it reads from is temporarily unavailable;
- it is work off the lines with the choice **never** ([R2.3](#R2.3)).

Material (a task of the kind material) and a task in progress never wait.

- **Controls:** terminal: `strom task list --off-tree` (tasks off the tree).
- **Since:** research 1.9.0 (off the tree); the other reasons by the versions in the rules referred to.

<!-- zdroj: research:src/core/queue.ts:205-210 waits · src/core/kin.ts:98 offTree · assets/method/core.md „The tree first, then above it“ -->

<a id="R2.3"></a>
## R2.3 Work off the lines

In a research with several lines, **work off the lines** is a task about people no line reaches (an ancestor's sister
and her family) that helps no line. Such work comes **after the work on the lines**.

- **Limits:** a task helps a line, and so is not off the lines, when it names a hypothesis or conflict of the line,
  joins people to the tree, or the agent wrote how it helps the line (an ancestor's sibling as godparent or witness,
  the same house, an ancestor's surname). The sibling's own family does not help the line.
- **Choices:** **at the end, after the lines** (default) · **as the lines' work** · **never** (the tasks are not taken,
  nothing is deleted).
- **Controls:** terminal: **Settings → The agent working alone → Work off the lines**,
  `strom config set queue.offLine last|normal|never`. The app 3.21.2 shows at the task **Waits until the directions'
  work is done · helps no direction**.
- **Since:** research 1.25.0
- **From research 1.26.0:** a new default choice **occasionally, one in a while**: one task off the lines per 10 sessions
  (`queue.offLineShare`), from the nearest branch. The spouse of an ancestor also belongs to work off the lines
  ([R2.1.3](#R2.1.3)).

<!-- zdroj: research:v1.25.2 src/core/config.ts:278 queue.offLine (popis), :715 výchozí last · HEAD model.ts OFF_LINE_CHOICES, config.ts OFF_LINE_SHARE=10 · assets/method/core.md „The lines first“ · app:strings.ts research.queueOffLast -->

<a id="R2.3.1"></a>
### R2.3.1 A choice for one branch and one task

Besides the choice for the whole research, one branch (also “add to a line”) and one task (**Do next** / **To the
end**) can have their own choice. The narrower choice wins: the task before the branch, the branch before the research.

- **Controls:** terminal: `strom offline set`, `strom task order T… --next|--last|--default`. App 3.22.0:
  **Do next**, **To the end**.
- **Since:** research 1.26.0

<!-- zdroj: research:src/commands/offline.ts:101,171 · quality/offline.json -->

<a id="R2.3.2"></a>
### R2.3.2 A growing branch gets a line proposed

When a branch off the lines grows to 10 open tasks or 5 persons, a question appears in **Awaiting action**: add it to
a line, start a line, leave it as it is, or not research it. After the answer “leave it”, it is proposed again only at
double the size. A branch with its own choice, and the choice **never**, get no proposal.

- **Controls:** terminal: **Propose lines for branches that grow** (on/off), `strom offline answer`,
  `strom config set queue.suggestTasks|queue.suggestPersons <n>`.
- **Since:** research 1.26.0

<!-- zdroj: research:src/core/offline.ts:449-455 grows · config.ts SUGGEST_TASKS=10, SUGGEST_PERSONS=5 · cs.json ui.wait.branch.done.keep -->

<a id="R2.4"></a>
## R2.4 Why a task stands where it stands

Every task in the queue gives the reason for its place: in a line, helps a line (and how), off the lines (and in which
branch), a manual choice, or it waits because the line is paused.

- **Controls:** app 3.22.0: section **Queue**, the line at the task (e.g. “helps the direction {n} · {how}”).
- **Since:** research 1.26.0

<!-- zdroj: research:src/core/queue.ts:312-349 · app:strings.ts live.qWhyLine, qWhyHelps, qWhyOut, qWhyManualNext, qWhyPaused -->
