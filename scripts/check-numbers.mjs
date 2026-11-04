#!/usr/bin/env node
// Checks the permanent numbering of "How Strom works" and the index of terms.
//
//   node scripts/check-numbers.mjs              check everything (exit 1 on an error)
//   node scripts/check-numbers.mjs --base REF   compare the register with CISLA.md at a git ref (default HEAD)
//   node scripts/check-numbers.mjs --next R2.3  print the next free number under R2.3 (R2 → its next rule, R → next chapter)
//
// Rules (README.md):
// - a number is a part letter, a chapter and at most two more levels: R2, R2.3, R2.3.1 (R2.3a: inserted);
//   its parent is in the register and in the same file; it is in the register once
//   and once per language in the chapter file the register names;
// - a number in the register never disappears (compared with the register at --base);
//   while the register says "Stav rejstříku: koncept", that is a warning, not an error;
// - every number a text or the index refers to (a link `#R2.3`, or the plain text R2.3) exists;
// - cs is the source: a number missing in cs is an error; a missing translation is a warning;
// - no file names a pre-release (MAINTAINING.md "Versions"): no marker, no word for it in cs/en/de/pl,
//   no version with a suffix (X.Y.Z-…).

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['cs', 'en', 'de', 'pl'];
const SOURCE = 'cs';
const PARTS = 'RAS'; // R Strom Research, A the Strom app, S the two together
// R2, R2.3, R2.3.1; a number inserted between two (rarely, as § 2a in a law): R2.3a
const NUM = `[${PARTS}]\\d+(?:\\.\\d+[a-z]?){0,2}`;
const IS_NUM = new RegExp(`^${NUM}$`);
// koncept: written, waiting for approval; the number may still change, like a planned one
const STATES = /^(platí|koncept|plán|neplatí od .+)$/;
const UNFIXED = ['plán', 'koncept'];

const args = process.argv.slice(2);
const arg = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const missing = Object.fromEntries(LANGS.map((l) => [l, 0])); // translations not written yet

// --- numbers ----------------------------------------------------------------

const depth = (n) => n.split('.').length; // R2 → 1, R2.3 → 2, R2.3.1 → 3
const parentOf = (n) => n.split('.').slice(0, -1).join('.');
const chapterOf = (n) => n.split('.')[0];
const sortKey = (n) => {
  const [head, ...rest] = n.split('.');
  // R2.3a stands between R2.3 and R2.4
  return [PARTS.indexOf(head[0]), +head.slice(1), ...rest.map((r) => parseInt(r, 10) + (/[a-z]$/.test(r) ? (r.charCodeAt(r.length - 1) - 96) / 100 : 0))];
};
const byNumber = (a, b) => {
  const x = sortKey(a), y = sortKey(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? -1) - (y[i] ?? -1);
    if (d) return d;
  }
  return 0;
};

// --- the register -----------------------------------------------------------

function parseRegister(text) {
  const rows = new Map();
  const dupes = [];
  let header = null;
  for (const line of text.split('\n')) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells[0] === 'Číslo') { header = cells; continue; }
    if (!header || /^:?-+:?$/.test(cells[0])) continue;
    const row = Object.fromEntries(header.map((h, i) => [h, cells[i] ?? '']));
    const num = row['Číslo'].replace(/[`*]/g, '');
    if (rows.has(num)) dupes.push(num);
    rows.set(num, row);
  }
  const concept = /Stav rejstříku:\s*\*{0,2}koncept/i.test(text);
  return { rows, dupes, header, concept };
}

const registerPath = join(ROOT, 'CISLA.md');
if (!existsSync(registerPath)) {
  console.error('CISLA.md is missing');
  process.exit(1);
}
const reg = parseRegister(readFileSync(registerPath, 'utf8'));
if (!reg.header) err('CISLA.md: no table with the column "Číslo"');
for (const d of reg.dupes) err(`CISLA.md: ${d} is in the register more than once`);

for (const [num, row] of reg.rows) {
  if (!IS_NUM.test(num)) { err(`CISLA.md: "${num}" is not a number (R2, R2.3, R2.3.1, R2.3a; parts ${PARTS})`); continue; }
  if (!STATES.test(row['Stav'])) err(`CISLA.md: ${num} has state "${row['Stav']}" (platí | koncept | plán | neplatí od <version>)`);
  if (!row['Soubor']) err(`CISLA.md: ${num} names no file`);
  if (!row[SOURCE]) err(`CISLA.md: ${num} has no ${SOURCE} title`);
  for (const l of LANGS) if (l !== SOURCE && !row[l]) missing[l]++;
  if (depth(num) > 1) {
    const p = reg.rows.get(parentOf(num));
    if (!p) err(`CISLA.md: ${num} belongs under ${parentOf(num)}, which is not in the register`);
    else if (p['Soubor'] !== row['Soubor']) err(`CISLA.md: ${num} is in ${row['Soubor']}, its parent ${parentOf(num)} in ${p['Soubor']}`);
  }
  const file = row['Soubor'];
  if (file && !new RegExp(`^${chapterOf(num)}-[a-z0-9-]+\\.md$`).test(file)) {
    err(`CISLA.md: ${num}: file "${file}" should be "${chapterOf(num)}-<english-slug>.md"`);
  }
}
const ordered = [...reg.rows.keys()].filter((n) => IS_NUM.test(n));
const sorted = [...ordered].sort(byNumber);
if (ordered.join() !== sorted.join()) warn('CISLA.md: the rows are not in the order of their numbers');

// --- --next -----------------------------------------------------------------

if (args.includes('--next')) {
  const p = arg('--next') ?? '';
  const childPattern = new RegExp(`^[${PARTS}]$`).test(p) ? new RegExp(`^${p}(\\d+)$`) : null;
  if (!childPattern && !(IS_NUM.test(p) && depth(p) < 3 && reg.rows.has(p))) {
    console.error('--next needs a part (R), a chapter (R2) or a rule (R2.3) of the register');
    process.exit(2);
  }
  const used = [...reg.rows.keys()]
    .map((n) => (childPattern ? n.match(childPattern)?.[1] : parentOf(n) === p ? n.split('.').pop() : undefined))
    .filter((x) => x !== undefined)
    .map((x) => parseInt(x, 10));
  const next = used.length ? Math.max(...used) + 1 : 1;
  console.log(childPattern ? `${p}${next}` : `${p}.${next}`);
  process.exit(0);
}

// --- nothing disappears -----------------------------------------------------

const base = arg('--base') ?? 'HEAD';
let old = null;
try {
  old = execFileSync('git', ['show', `${base}:CISLA.md`], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
} catch { /* no register at the base yet */ }
if (old) {
  const before = parseRegister(old);
  const strict = !before.concept && !reg.concept;
  for (const [num, row] of before.rows) {
    const now = reg.rows.get(num);
    if (!now) {
      // a planned or concept number (not approved yet) may still change
      (strict && !UNFIXED.includes(row['Stav']) ? err : warn)(`${num} (${row[SOURCE]}) was in the register at ${base} and is gone — a number is never removed or reused`);
      continue;
    }
    if (row['Stav'].startsWith('neplatí') && !now['Stav'].startsWith('neplatí')) {
      (strict ? err : warn)(`${num} was "${row['Stav']}" at ${base} and is "${now['Stav']}" now — a rule that holds again gets a new number`);
    }
    if (row[SOURCE] !== now[SOURCE]) {
      warn(`${num}: the ${SOURCE} title changed ("${row[SOURCE]}" → "${now[SOURCE]}") — still the same rule?`);
    }
  }
}

// --- the texts --------------------------------------------------------------

const HEADING = new RegExp(`^(#{1,6})\\s+(${NUM})\\s+(.+?)\\s*$`);
const ANCHOR = /^<a id="([^"]+)"><\/a>\s*$/;
const LINK = /\]\(([^)\s]*)\)/g;
const PLAIN = new RegExp(`(?<![\\w./#-])(${NUM})(?![\\w-]|\\.\\d)`, 'g');

// comments (sources, notes) keep their line breaks but are no text
const stripComments = (raw) => raw.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, ''));

const seen = new Map(); // lang -> Map(num -> "lang/file")
const texts = []; // { dir, lang, file, lines } — lines without comments

for (const lang of LANGS) {
  const dir = join(ROOT, lang);
  if (!existsSync(dir)) {
    if (lang === SOURCE) err(`${SOURCE}/ is missing`);
    continue;
  }
  const found = new Map();
  seen.set(lang, found);
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const raw = readFileSync(join(dir, file), 'utf8');
    const lines = raw.split('\n');
    texts.push({ dir: lang, lang, file, lines: stripComments(raw).split('\n') });
    if (file === 'README.md') continue;
    let inFence = false;
    const order = [];
    lines.forEach((line, i) => {
      if (line.startsWith('```')) inFence = !inFence;
      if (inFence) return;
      const m = line.match(HEADING);
      if (!m) return;
      const num = m[2];
      const where = `${lang}/${file}:${i + 1}`;
      if (found.has(num)) err(`${where}: ${num} is already in ${found.get(num)}`);
      found.set(num, `${lang}/${file}`);
      order.push(num);
      const row = reg.rows.get(num);
      if (!row) { err(`${where}: ${num} is not in the register (CISLA.md)`); return; }
      if (row['Soubor'] !== file) err(`${where}: ${num} belongs in ${row['Soubor']} (CISLA.md)`);
      if (m[1].length !== depth(num)) err(`${where}: ${num} should be a level-${depth(num)} heading`);
      const a = (lines[i - 1] ?? '').match(ANCHOR);
      if (!a || a[1] !== num) err(`${where}: ${num} needs <a id="${num}"></a> on the line before`);
      const title = m[3];
      if (row[lang] && row[lang] !== title) warn(`${where}: title "${title}" differs from CISLA.md ("${row[lang]}")`);
    });
    // a detail stands under its rule: each number follows its parent, in the order of the numbers
    order.forEach((num, i) => {
      if (i && byNumber(order[i - 1], num) > 0) warn(`${lang}/${file}: ${num} comes after ${order[i - 1]}`);
      if (depth(num) > 1 && !order.slice(0, i).includes(parentOf(num))) err(`${lang}/${file}: ${num} stands before or without its parent ${parentOf(num)}`);
    });
  }
}

// every number of the register is written (the planned ones only in the contents)
for (const num of sorted) {
  const row = reg.rows.get(num);
  for (const [lang, found] of seen) {
    if (row['Stav'] === 'plán') {
      if (found.has(num)) warn(`${num} is "plán" in CISLA.md but ${found.get(num)} already has it`);
      continue;
    }
    if (!found.has(num)) {
      if (lang === SOURCE) err(`${num} (${row[SOURCE]}) is not in ${lang}/${row['Soubor']}`);
      else missing[lang]++;
    }
  }
}

// the contents name every chapter
for (const lang of seen.keys()) {
  const readme = texts.find((t) => t.lang === lang && t.file === 'README.md');
  if (!readme) { (lang === SOURCE ? err : warn)(`${lang}/README.md (the contents) is missing`); continue; }
  const body = readme.lines.join('\n');
  for (const num of sorted) {
    if (depth(num) === 1 && !new RegExp(`(?<![\\w.])${num}(?![\\w.]|\\.\\d)`).test(body)) {
      (lang === SOURCE ? err : warn)(`${lang}/README.md: chapter ${num} is not in the contents`);
    }
  }
}

// --- the index of terms (REJSTRIK.md) ----------------------------------------
// Each term: <a id="<english-slug>"></a>, a "### " heading, a table with a row per language
// (| cs | <term as the UI says it> | <definition> |) and the numbers that explain or use it.

const indexPath = join(ROOT, 'REJSTRIK.md');
const termIds = new Set();
if (!existsSync(indexPath)) err('REJSTRIK.md (the index of terms) is missing');
else {
  const raw = readFileSync(indexPath, 'utf8');
  const lines = stripComments(raw).split('\n');
  texts.push({ dir: '.', lang: SOURCE, file: 'REJSTRIK.md', lines });
  let term = null;
  let concept = false; // terms under a "## … (koncept)" heading get their translations after approval
  const close = () => {
    if (!term) return;
    for (const l of LANGS) {
      const r = term.rows[l];
      if (term.concept && l !== SOURCE) continue;
      if (!r || !r.term) (l === SOURCE ? err : warn)(`REJSTRIK.md: "${term.title}" has no ${l} term`);
      if (!r || !r.def) { if (l === SOURCE) err(`REJSTRIK.md: "${term.title}" has no ${l} definition`); else missing[l]++; }
    }
    if (!term.refs) warn(`REJSTRIK.md: "${term.title}" refers to no number`);
    term = null;
  };
  lines.forEach((line, i) => {
    if (line.startsWith('## ')) { close(); concept = /\(koncept\)/.test(line); return; }
    const a = line.match(ANCHOR);
    if (a) {
      close();
      if (!/^[a-z0-9-]+$/.test(a[1])) err(`REJSTRIK.md:${i + 1}: term anchor "${a[1]}" should be an english slug`);
      if (termIds.has(a[1])) err(`REJSTRIK.md:${i + 1}: term anchor "${a[1]}" twice`);
      termIds.add(a[1]);
      const h = lines[i + 1] ?? '';
      if (!h.startsWith('### ')) err(`REJSTRIK.md:${i + 2}: a term anchor needs a "### " heading on the next line`);
      term = { title: h.slice(4).trim(), rows: {}, refs: 0, concept };
      return;
    }
    if (!term) return;
    const cells = line.startsWith('|') ? line.split('|').slice(1, -1).map((c) => c.trim()) : null;
    if (cells && LANGS.includes(cells[0])) term.rows[cells[0]] = { term: cells[1] ?? '', def: cells[2] ?? '' };
    if (new RegExp(NUM).test(line.replace(/`[^`]*`/g, ''))) term.refs++;
  });
  close();
}

// --- references lead to existing numbers --------------------------------------

for (const { dir, lang, file, lines } of texts) {
  const found = seen.get(lang) ?? new Map();
  let inFence = false;
  lines.forEach((line, i) => {
    if (line.startsWith('```')) inFence = !inFence;
    if (inFence || line.match(ANCHOR) || line.match(HEADING)) return;
    const where = `${dir === '.' ? '' : `${dir}/`}${file}:${i + 1}`;
    for (const [, target] of line.matchAll(LINK)) {
      if (/^[a-z]+:/i.test(target)) continue; // http:, mailto:
      const [path, frag] = target.split('#');
      const targetPath = path ? join(dir, path) : join(dir, file);
      if (path && !existsSync(join(ROOT, targetPath))) { err(`${where}: link to ${path}, which does not exist`); continue; }
      if (!frag) continue;
      if (targetPath === 'REJSTRIK.md' || targetPath.endsWith('/REJSTRIK.md')) {
        if (!termIds.has(frag)) err(`${where}: link to the term #${frag}, which REJSTRIK.md does not have`);
        continue;
      }
      if (!IS_NUM.test(frag)) { err(`${where}: anchor #${frag} is not a number`); continue; }
      const targetLang = targetPath.split('/')[0];
      const at = (seen.get(targetLang) ?? new Map()).get(frag);
      if (!at) {
        if (reg.rows.get(frag)?.['Stav'] === 'plán') warn(`${where}: link to ${frag}, which is planned, not written yet`);
        else err(`${where}: link to #${frag}, which no ${targetLang} text has`);
      } else if (at !== targetPath) err(`${where}: link to ${targetPath}#${frag}, but ${frag} is in ${at}`);
    }
    // code (`S0001`, `strom …`) is no reference
    const plain = line.replace(LINK, '](…)').replace(/`[^`]*`/g, '');
    for (const [, num] of plain.matchAll(PLAIN)) {
      if (!reg.rows.has(num)) err(`${where}: ${num} is not in the register`);
    }
  });
}

// --- no pre-release ---------------------------------------------------------
// The documentation describes what the next version brings with the version it ships in and never refers to a
// pre-release: neither the word (cs/en/de/pl, every form; spelled with a class here so this file passes too) nor a
// version with a suffix. Comments count as well: the sources travel with the texts. No exceptions.

const PRE_WORD = /(?<![\p{L}\p{N}_])(?:b[e]ta[\p{L}\p{N}_]*|b[e]t(?:ě|u|y|ou|ám|ách|ami|ę|ą|ach|om)|b[e]cie)(?![\p{L}\p{N}_])/giu;
const PRE_VERSION = /(?<![\w.])v?\d+\.\d+\.\d+-[0-9A-Za-z]/g;
const scanned = [
  ...['README.md', 'MAINTAINING.md', 'CISLA.md', 'REJSTRIK.md'],
  ...LANGS.flatMap((l) => (existsSync(join(ROOT, l)) ? readdirSync(join(ROOT, l)).filter((f) => f.endsWith('.md')).map((f) => `${l}/${f}`) : [])),
  ...readdirSync(join(ROOT, 'scripts')).map((f) => `scripts/${f}`),
];
for (const rel of scanned) {
  if (!existsSync(join(ROOT, rel))) continue;
  readFileSync(join(ROOT, rel), 'utf8').split('\n').forEach((line, i) => {
    for (const [w] of line.matchAll(PRE_WORD)) err(`${rel}:${i + 1}: "${w}" names a pre-release (MAINTAINING.md, Versions)`);
    for (const [v] of line.matchAll(PRE_VERSION)) err(`${rel}:${i + 1}: "${v}…" is a pre-release version; only X.Y.Z (MAINTAINING.md, Versions)`);
  });
}

// --- report -----------------------------------------------------------------

const written = (lang) => {
  const f = seen.get(lang);
  const all = sorted.filter((n) => reg.rows.get(n)['Stav'] !== 'plán').length;
  return f ? `${lang} ${[...f.keys()].length}/${all}` : `${lang} –`;
};
for (const l of LANGS) if (missing[l]) warn(`${l}: ${missing[l]} titles, texts or definitions not translated yet`);
for (const w of warnings) console.log(`warning: ${w}`);
for (const e of errors) console.log(`ERROR: ${e}`);
console.log(
  `${reg.rows.size} numbers in the register${reg.concept ? ' (concept)' : ''}, ${termIds.size} terms; ` +
  `written: ${LANGS.map(written).join(', ')}; ${errors.length} errors, ${warnings.length} warnings`,
);
process.exit(errors.length ? 1 : 0);
