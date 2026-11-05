# Maintaining "How Strom works"

## What this is

A reference of rules (Diátaxis: *reference*, plus a short *explanation*):
how the Strom app and Strom Research decide, the exact limits and order, and
where each is controlled. Not how-to guides: those stay in the web help
(`stromapp.info/research/help/`) and a rule links to them.

- `R1` and `A1` ("in brief") explain in one page how the research or the app
  works and lead to the chapters.
- The other chapters are rules, all in the same shape (below).
- Where a rule touches genealogical method, it uses the terms a genealogist
  knows (Genealogical Proof Standard; *Evidence Explained*: original/derivative/
  authored source, primary/secondary information, direct/indirect/negative
  evidence). The index of terms names that counterpart.
- It describes the released versions (research, app) and what the next one
  brings, see Versions below.

## Layout

- `cs/` — source (Czech); `en/`, `de/`, `pl/` — translations with the same
  structure, the same file names and the same numbers.
- `<lang>/README.md` — the contents. `<lang>/<chapter>-<english-slug>.md` — one
  chapter per file (`cs/R2-lines-and-queue.md`). File names and anchors are the
  same in every language.
- `CISLA.md` — the register of all numbers: number → file → valid since → state
  → title in each language.
- `REJSTRIK.md` — the index of terms: each term with an english-slug anchor, the
  term in cs/en/de/pl exactly as the user interface says it, a definition, its
  genealogical counterpart and the numbers that explain it.
- `scripts/check-numbers.mjs` — checks numbers, links and the index (below).

The files are plain Markdown that reads on GitHub as it is (relative links,
custom anchors, hidden comments). A later web version is built from the same
files; keep to headings, paragraphs, lists, tables, links, bold, italics and
`code`.

## Numbers

- a letter for the part — `R` Strom Research, `A` the Strom app, `S` the app
  and the research together;
- the chapter — `R2`; a rule — `R2.3`; a detail of a rule — `R2.3.1` (at most
  three levels). A chapter goes from the general to the detailed: an overview
  first, each rule, and its details under it. The order of reading is the order
  of the numbers.

A number is never renumbered and never reused (the lesson of the BCG standards,
renumbered in 2014 with a conversion chart; WCAG 2.2 kept the number of the
removed 4.1.1 instead):

- a new rule goes under its right parent as its next free number
  (`node scripts/check-numbers.mjs --next R2.3`), never at the end of the
  chapter just because it is new;
- only where it must stand between two existing ones, it gets a letter, as a
  section inserted into a law: `R2.3a` comes between `R2.3` and `R2.4`;
- a rule that changes keeps its number; "Platí od" carries the changes by
  version ("výzkum 1.25.0; 1.26.0: …");
- a rule that no longer holds stays in its place with its heading and the
  sentence "Neplatí od výzkumu 1.27.0, nahrazuje ho R2.9." and the state
  `neplatí od 1.27.0` in the register;
- while `CISLA.md` says "Stav rejstříku: koncept", numbers may still change;
  once approved, the check refuses a number that disappears. A row in the
  state `plán` (not written yet) or `koncept` (written, not approved yet) may
  still change or go: the number is fixed when its text is approved, and the
  row then gets `platí`.

In a text, a chapter is a level-1 heading, a rule level 2, a detail level 3:
`## R2.3 Title`, with the anchor `<a id="R2.3"></a>` on the line before. A link
to a rule is `[R2.3](R2-lines-and-queue.md#R2.3)`; the plain text "R2.3" is a
reference too and is checked. File names and anchors are the
same in every language, so "R2.3" leads to the same rule in each.

### Renumbering log

Every renumbering, old → new, with the date and the reason. Since the register
was approved (4 Nov 2026) there has been none.

| Date | Old | New | Why |
|---|---|---|---|
| 5 Nov 2026 | — | — | Gaps filled with new numbers only (R3.9.1, R7.8, R7.8.1, R8.1.2, R10, R11, A6.5.1). R3.3 keeps its number; material from the user moved to R11.2 and R3.3 links there. |
| 5 Nov 2026 | R9.11 | — | Removed while still a concept (never approved): frequently asked questions do not belong in the reference. Each answer is in its rule (R9.1–R9.6, R9.10.2). |

## A rule

1. the principle in one sentence;
2. **Hranice** — numbers, order, exceptions;
3. **Ovládání** — the app's element by its exact name, the menu item or command
   in the terminal;
4. **Platí od** — the version since which it holds (see Versions);
5. under it a hidden comment `<!-- zdroj: … -->` with the method file and the
   code (file:line, function, constant) it was written from.

Optional, where a chapter needs them (R8 has them on every rule):

- **Hlídá kód** / **Jen metodika** — whether `strom` (or the app) enforces the
  rule, or it is only an instruction of the method to the agent (en *Enforced
  by the code / Method only*, de *Prüft der Code / Nur Methodik*, pl *Pilnuje
  kod / Tylko metodyka*);
- **Proč** — why the rule is so, taken only from a source: the method, a
  comment or commit in the code, the CHANGELOG, a retro or finding (en *Why*,
  de *Warum*, pl *Dlaczego*). Where no source gives a reason, nothing is made
  up: the rule goes without it and the question goes to the research.

Terms are written exactly as the user interface says them, in short sentences
that translate well.

## Versions

- A version is always a release number `X.Y.Z`. The documentation never refers
  to a pre-release: no marker, no word for it, no number with a suffix
  (`X.Y.Z-…`). The check refuses them.
- What the next version brings is described like any other behaviour, as soon
  as it is in the code: with the version it ships in, in **Platí od** of a rule,
  or as a note under a rule (`- **Od aplikace 3.22.0:** …`, `- **Od výzkumu
  1.26.0:** …`; en *From app / From research*, de *Ab App / Ab Forschung*, pl
  *Od aplikacji / Od badania*). Its state in the register is `platí`.
- A chapter's intro names the versions it describes; where the chapter has
  such notes, it adds "změny z novější verze mají u sebe její číslo".

## The index of terms (REJSTRIK.md)

Built on the concept, not the word (as terminology databases, TBX / ISO 30042):
one entry per concept with an english-slug anchor, and under it the term in
each language **exactly as the user interface says it**. Where the app and the
terminal differ (en *directions* in the app, *lines* in the terminal), both are
given with where each is used. Each entry: the terms, a definition (cs; en/de/pl
with the translations), the genealogical counterpart where there is one, words
not to use where they mislead, and the numbers that explain or use it.

## Languages and publishing

- Czech is the source. en/de/pl are translated once a Czech chapter is approved,
  with the same file names, numbers and anchors; a chapter is published in all
  four languages at once.
- Write short sentences that translate well, impersonally (no "you"), with no
  prices; examples only made up (the Horák family, Marie Vlková).
- Layer 1: the files read on GitHub as they are (relative links, custom anchors,
  hidden comments, the outline GitHub builds from headings).
- Layer 2, later: the web (stromapp.info) builds pages with search from the same
  files. Short permanent links `stromapp.info/doc/R2.4` lead to GitHub first and to
  the web later, so links in answers and tickets stay valid.
- Publishing (a GitHub remote, a push, the web) only on Milan's word.

## Keeping it true

- Every rule has its source in a hidden comment:
  `<!-- zdroj: research:assets/method/core.md "The lines first" · research:src/core/offline.ts:449 -->`
  (`research:` Strom Research, `app:` the Strom app; a tag such as `v1.25.2`
  where the text is about an older version).
- Every statement is checked against the code or the method, not only against
  notes. What the method says and the code does not do (or the other way) is
  not written as a fact: it goes to the research or app role as a finding.
- After each change of behaviour and each release: the specification of the
  feature, the changelog and the rules whose sources changed
  (`git diff --stat v1.25.2..v1.26.0` in the source repos against the sources in
  the comments) are the work list. A version named before its release that
  shipped under another number is corrected.
- Planned: `scripts/check-sources.mjs` (a source file and the quoted words still
  exist) and `scripts/affected.mjs <from>..<to>` (the numbers whose sources
  changed between two releases).

## Checking

    node scripts/check-numbers.mjs

Errors (exit 1): a number twice; a number in a text that is not in the register
or in another file; a heading without its anchor or at the wrong level; a
detail before or without its rule; a link or a reference to a number or a term
that does not exist; a number of the register missing from the Czech text; a
chapter missing from the contents; a number that was in the register at `HEAD`
(or `--base <ref>`) and is gone; a pre-release named in any file (a marker, the
word for it in any of the four languages, a version `X.Y.Z-…`). Warnings: a translation that is missing or
whose title differs from the register; rows out of order. While the register is
a concept, a vanished number is only a warning.
