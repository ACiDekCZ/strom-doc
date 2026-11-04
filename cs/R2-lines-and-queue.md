<a id="R2"></a>
# R2 Linie a fronta

Podle čeho agent výzkumu vybírá, na čem bude pracovat. Popisuje výzkum 1.25.2 a aplikaci Strom 3.21.2.
Změny z novější verze mají u sebe její číslo.

<a id="R2.1"></a>
## R2.1 Linie určuje, co výzkum zkoumá

Linie výzkumu je jeden cíl: předkové osoby, potomci osoby, nebo jedna otázka. Každý úkol patří k některé linii
a agent pracuje na úkolech linií.

- **Ovládání:** aplikace: panel výzkumu, oddíl **Linie · {n} aktivní** · terminál: menu **Rozšířit výzkum →
  Nová linie výzkumu**, příkaz `strom research new`
- **Platí od:** výzkum 1.0.0

<!-- zdroj: research:src/core/model.ts DIRECTIONS, RESEARCH_STATES · research:src/commands/research.ts · app:strings.ts live.dirTitle -->

<a id="R2.1.1"></a>
### R2.1.1 Druhy linií a meze

- **Předkové osoby**, nejvýš zadaný počet generací, nebo jen předkové narození před zadaným rokem.
- **Potomci osoby.**
- **Jedna otázka** (smyšlený příklad: „Kdo byl otec Marie Vlkové?“).
- **Revize osoby** vzniká z revize osoby, ne z nabídky nové linie.
- **Ovládání:** terminál: `strom research new --direction ancestors|descendants --generations <n> --before <rok>
  --question "<otázka>"`. Aplikace: **+ Nová linie**, s mezemi **Nejvýš generací** a **Jen před rokem** (aplikace 3.22.0 s výzkumem 1.26.0).
- **Platí od:** výzkum 1.0.0

<!-- zdroj: research:src/commands/research.ts:79 · assets/lang/cs.json ui.research.kind · app:src/ui/research-directions-ui.ts DIRECTIONS_WRITE_SINCE -->

<a id="R2.1.2"></a>
### R2.1.2 Pozastavená a ukončená linie

- **Pozastavená:** její úkoly čekají mimo frontu, agent bere úkoly jiných linií.
- **Ukončená:** její úkoly odejdou z fronty. Nic se nemaže a linii jde znovu spustit.
- **Ovládání:** terminál: **Rozšířit výzkum → Linie výzkumu: pozastavit, ukončit nebo znovu spustit**,
  `strom research pause|done|resume`. Aplikace: oddíl Linie, akce **Pozastavit**, **Ukončit**, **Znovu spustit**.
  V aplikaci 3.21.2 se akce potvrzuje v terminálu výzkumu, od aplikace 3.22.0 přímo v panelu.
- **Platí od:** výzkum 1.8.0

<!-- zdroj: research:src/commands/research.ts:168-175 · src/cli/menu-research.ts:233-263 · app:v3.21.2 research-directions-ui.ts:554 -->

<a id="R2.1.3"></a>
### R2.1.3 Kdo do linie patří

- Linie předků: osoba, její předkové v mezích linie a manžel nebo manželka předka.
- Linie s otázkou: osoba, které se otázka týká.
- Úkol bez určené linie patří nejužší linii, do které spadají jeho lidé.
- **Platí od:** výzkum 1.0.0. Manželé a osoba otázky od 1.26.0.

<!-- zdroj: research:src/core/frontier.ts:159-194 researchPeople/linePeople · src/core/directions.ts:75-82 directionOf · CHANGELOG.cs.md 1.26.0 -->

<a id="R2.2"></a>
## R2.2 Fronta určuje, který úkol přijde na řadu

Otevřené úkoly všech běžících linií tvoří jednu frontu. Agent vždy bere první úkol. Rozdělaný úkol jde před všemi.

- **Hranice:** pořadí určují tyto klíče, každý další jen při shodě předchozích:
  1. rozdělaný úkol;
  2. ruční volba **hned** / **na konec** ([R2.3.1](#R2.3.1));
  3. úkoly dějin míst jdou za ostatními, ve vlastním pořadí; když jsou dějiny na řadě, jde jejich první úkol napřed;
  4. práce mimo linie ([R2.3](#R2.3));
  5. krátká práce napřed: propojení variant hypotéz s osobami stromu a místa, jejichž ztotožnění člověk požádal;
  6. vyprávění: když je na řadě, jde první ([R2.2.2](#R2.2.2)), jinak až po výzkumu;
  7. úkol, který jde udělat hned, před úkolem, který čeká na snímky stažené člověkem;
  8. strategie fronty ([R2.2.1](#R2.2.1));
  9. druh úkolu: podklady → kde jsou záznamy → doložení vazby → ověření → obohacení osoby → žádost do archivu →
     vyprávění;
  10. stáří úkolu.
- **Ovládání:** terminál: `strom task list`, `strom task next`. Aplikace: oddíl **Fronta**.
- **Platí od:** výzkum 1.0.0 (klíče 1, 7–10). Klíč 6 od 1.1.0, propojení hypotéz od 1.17.0, klíč 3 od 1.22.0,
  klíč 4 a místa na žádost od 1.25.0. Klíč 2 od 1.26.0.

<!-- zdroj: research:src/core/queue.ts rankTasks (řazení :374-396), LEVEL_ORDER :52, linksFirst (hypolinks.ts:453), placesFirst · verze klíčů: git log -S na „a.blocked - b.blocked“ (v1.0.0), „a.story - b.story“ (v1.1.0), „a.first - b.first“ (v1.17.0), „a.hist - b.hist“ (v1.22.0), „a.offLine - b.offLine“ a placesFirst (v1.25.0) -->

<a id="R2.2.1"></a>
### R2.2.1 Strategie fronty

- **balanced** (výchozí): střídá linie. Výš řadí vyšší prioritu linie, bližší generaci a linii, na které se poslední
  4 sezení nepracovalo. Níž řadí úkol, který už neuspěl.
- **depth:** drží se linie, na které se právě pracuje.
- **priority:** podle priority linie (1–5, výchozí 3), pak podle generace.
- **Ovládání:** terminál: `strom config set queue.strategy balanced|depth|priority`, priorita linie
  `strom research new … --priority <1–5>`.
- **Platí od:** výzkum 1.0.0

<!-- zdroj: research:src/core/queue.ts:294-299, RECENT=4 :58 · src/core/config.ts queue.strategy · model.ts priority -->

<a id="R2.2.2"></a>
### R2.2.2 Vyprávění na řadě

Vyprávění jinak čeká, až výzkum nemá co dělat. Po 5 sezeních bez vyprávění ale přijde jedno čekající vyprávění
na řadu jako první (při samostatné práci agenta). Se strategií priority to neplatí.

- **Platí od:** výzkum 1.1.0

<!-- zdroj: research:src/core/queue.ts STORY_EVERY=5 :61 -->

<a id="R2.2.3"></a>
### R2.2.3 Úkoly, které čekají mimo frontu

Úkol se nebere, dokud:
- je jeho linie pozastavená nebo ukončená ([R2.1.2](#R2.1.2));
- se týká jen lidí, které se stromem nespojuje žádná rodinná vazba. Nejdřív se musí doložit vazba ke stromu,
  pak se zkoumá dál. Úkol, který tu vazbu ověřuje, se bere;
- chybějí snímky knihy, kterou má číst, a čeká se na rozhodnutí, jak je získat;
- archiv, ze kterého čte, je dočasně nedostupný;
- je mimo linie s volbou **nikdy** ([R2.3](#R2.3)).

Podklady (úkol typu podklady) a rozdělaný úkol nečekají nikdy.

- **Ovládání:** terminál: `strom task list --off-tree` (úkoly mimo strom).
- **Platí od:** výzkum 1.9.0 (mimo strom); ostatní důvody podle verzí v odkazovaných pravidlech.

<!-- zdroj: research:src/core/queue.ts:205-210 waits · src/core/kin.ts:98 offTree · assets/method/core.md „The tree first, then above it“ -->

<a id="R2.3"></a>
## R2.3 Práce mimo linie

Ve výzkumu s více liniemi je **práce mimo linie** úkol o lidech, kam žádná linie nesahá (sestra předka a její rodina),
který žádné linii nepomáhá. Taková práce jde **až po práci na liniích**.

- **Hranice:** úkol linii pomáhá, a není tedy mimo linie, když jmenuje hypotézu nebo rozpor linie, připojuje lidi
  ke stromu, nebo agent zapsal, jak linii pomáhá (sourozenec předka jako kmotr nebo svědek, stejný dům, příjmení
  předka). Sourozencova vlastní rodina linii nepomáhá.
- **Volby:** **na konci, až po liniích** (výchozí) · **normálně, jako práce linií** · **nikdy** (úkoly se neberou, nic
  se nemaže).
- **Ovládání:** terminál: **Nastavení → Samostatná práce agenta → Práce mimo linie**,
  `strom config set queue.offLine last|normal|never`. Aplikace 3.21.2 u úkolu ukazuje **Čeká až po liniích ·
  nepomáhá žádné linii**.
- **Platí od:** výzkum 1.25.0
- **Od výzkumu 1.26.0:** nová výchozí volba **občas, jednou za čas**: jeden úkol mimo linie za 10 sezení
  (`queue.offLineShare`), z nejbližší větve. Do práce mimo linie patří i manžel nebo manželka předka ([R2.1.3](#R2.1.3)).

<!-- zdroj: research:v1.25.2 src/core/config.ts:278 queue.offLine (popis), :715 výchozí last · HEAD model.ts OFF_LINE_CHOICES, config.ts OFF_LINE_SHARE=10 · assets/method/core.md „The lines first“ · app:strings.ts research.queueOffLast -->

<a id="R2.3.1"></a>
### R2.3.1 Volba pro jednu větev a jeden úkol

Kromě volby pro celý výzkum může mít vlastní volbu jedna větev (i „přidat k linii“) a jeden úkol (**hned** / **na
konec**). Užší volba vyhrává: úkol před větví, větev před výzkumem.

- **Ovládání:** terminál: `strom offline set`, `strom task order T… --next|--last|--default`. Aplikace 3.22.0:
  **Udělat hned**, **Na konec**.
- **Platí od:** výzkum 1.26.0

<!-- zdroj: research:src/commands/offline.ts:101,171 · quality/offline.json -->

<a id="R2.3.2"></a>
### R2.3.2 Rostoucí větev dostane návrh linie

Když větev mimo linie naroste na 10 otevřených úkolů nebo 5 osob, objeví se v **Čeká na vyřízení** otázka: přidat
k linii, založit linii, nechat, jak je, nebo nezkoumat. Po odpovědi „nechat“ se znovu navrhne až při dvojnásobné
velikosti. Větev s vlastní volbou a volba **nikdy** návrh nedostanou.

- **Ovládání:** terminál: **Navrhovat linie u rostoucích větví** (zapnout/vypnout), `strom offline answer`,
  `strom config set queue.suggestTasks|queue.suggestPersons <n>`.
- **Platí od:** výzkum 1.26.0

<!-- zdroj: research:src/core/offline.ts:449-455 grows · config.ts SUGGEST_TASKS=10, SUGGEST_PERSONS=5 · cs.json ui.wait.branch.done.keep -->

<a id="R2.4"></a>
## R2.4 Proč úkol stojí, kde stojí

Každý úkol ve frontě říká důvod svého místa: v linii, pomáhá linii (a jak), mimo linie (a v jaké větvi), ruční volba,
nebo čeká, protože je linie pozastavená.

- **Ovládání:** aplikace 3.22.0: oddíl **Fronta**, řádek u úkolu (např. „pomáhá linii {n} · {jak}“).
- **Platí od:** výzkum 1.26.0

<!-- zdroj: research:src/core/queue.ts:312-349 · app:strings.ts live.qWhyLine, qWhyHelps, qWhyOut, qWhyManualNext, qWhyPaused -->
