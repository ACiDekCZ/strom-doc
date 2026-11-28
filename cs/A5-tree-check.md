<a id="A5"></a>
# A5 Kontrola stromu

Co aplikace ve stromu hlídá, s jakými prahy a co s nálezem jde udělat: opravit, označit jako **Není chyba**, nebo
nechat posoudit výzkumem. Popisuje aplikaci Strom 3.21.2 (a výzkum 1.25.2); co přibylo později, má u sebe číslo
verze. **Kontrola stromu** se zprávou ([A5.1](#A5.1) až [A5.1.5](#A5.1.5)) a `strom health` ([A5.9](#A5.9))
popisují aplikaci 3.33.0 a výzkum 1.38.0.
Výzkum má vlastní kontrolu `strom check` ([R5](R5-conflicts.md)). Ta tu popsaná není, kromě míst, kde se obě shodují.

<a id="A5.1"></a>
## A5.1 Kontrola a její nálezy

**Kontrola stromu** projde strom a sestaví zprávu: co strom brzdí, jaké kroky doporučuje a jaké chyby v datech
našla. Strom sama nemění. Zprávu uloží do dat stromu ([A5.1.5](#A5.1.5)).

| Oddíl zprávy | Co ukazuje |
|---|---|
| **Souhrn** | jednu větu: „Kontrola nenašla nic, co by strom brzdilo.“, „Kontrola doporučuje 3 kroky.“, nebo „Strom nic nebrzdí; v chybách v datech jsou věci k ověření.“ |
| **Co brzdí růst stromu** | nepropojené rodiny („2 rodiny nejsou propojené se stromem“, **Struktura ›**) a kroky, kvůli kterým stojí výzkum ([A5.1.4](#A5.1.4)) |
| **Doporučené kroky** | co udělat a v jakém pořadí ([A5.1.3](#A5.1.3)) |
| **Chyby v datech** | nálezy kontroly dat ([A5.2](#A5.2) až [A5.6](#A5.6)) |
| **Zabudované kontroly** | řádek každé kontroly s výsledkem ([A5.1.3](#A5.1.3), [A5.1.4](#A5.1.4)) |
| **Proti minulé kontrole** | co se změnilo od minulé zprávy stejného rozsahu ([A5.1.5](#A5.1.5)) |

Každý nález v **Chyby v datech** má závažnost:

| Závažnost | Pododdíl | Význam |
|---|---|---|
| chyba | **Chyby** | data si odporují nebo jsou porušená ([A5.2](#A5.2), [A5.3](#A5.3), [A5.4](#A5.4)) |
| k ověření | **K ověření** | neobvyklá hodnota, nepravděpodobná, ale možná; stojí za ověření |
| info | **Stopy** | „Nejsou to chyby. Stopy, které mohou pomoct při pátrání.“ ([A5.5](#A5.5), [A5.6](#A5.6)) |

- **Hranice:**
  - Kontrola dat běží pokaždé, když se zpráva otevře. Nálezy v **Chyby v datech** jsou vždy z této chvíle.
  - Nad nálezy je souhrn („2 chyby, 1 k ověření, 3 stopy.“), **Opravit vše (n)** ([A5.1.1](#A5.1.1)) a volba
    **Vše** · **Chyby** · **K ověření** · **Stopy** s počty. Volba bez nálezů ukáže „Nic k ověření.“
  - Nálezy stejného druhu tvoří skupinu, řazenou podle závažnosti, velikosti a názvu. Otevřená je jen skupina s
    chybou.
    Nad 50 nálezů se další ukazují po 20. Na telefonu (do 640 px) jsou **Stopy** sbalené, jsou-li i chyby nebo nálezy
    k ověření.
  - Zástupné osoby se nehlásí. Nález označený **Není chyba** ([A5.7](#A5.7)) se nepočítá ani neukazuje.
  - Strom jen ke čtení nálezy jen ukazuje („Strom je jen ke čtení. Nálezy jde prohlížet, ne opravit ani označit.“).
    Zprávu jde přečíst, kroky spustit ne. U jiného než otevřeného stromu oprava nebo značka nejdřív strom otevře.
  - **Od aplikace 3.27.0:** závažnost, která se dřív jmenovala „varování“, se jmenuje **k ověření**, i v souhrnech
    a počtech. Pohled Tabulka ukazuje nálezy přímo v buňkách a nález označený **Není chyba** jako **neobvyklé**
    ([A6.7.5](A6-views.md#A6.7.5)).
  - **Od aplikace 3.27.0:** oddíl chyb a nálezů k ověření se jmenuje **K ověření** (dřív **Problémy**). Strom bez
    nich má „Nic k ověření“, se stopami „Nic k ověření. 3 stopy.“
  - **Od aplikace 3.28.0:** v **K ověření** je skupina **Společné události**: kopie jedné společné události, jejichž
    společné údaje se liší, s **Sjednotit…** a **Oddělit rozdílnou kopii** ([A10.3](A10-shared-events.md#A10.3)).
  - **Od aplikace 3.33.0:** chyby mají vlastní pododdíl **Chyby**. V **K ověření** zůstávají nálezy k ověření.
- **Ovládání:** **Přehled stromu → Kvalita dat → Kontrola stromu** ([A5.8](#A5.8)): **Zkontrolovat strom…** (jen
  v otevřeném stromu) a **Zpráva ›** (poslední zpráva celého stromu). Rovnou do **Chyby v datech** vedou **Rychlé
  akce → Chyby v datech ›**, řádek „n stop ›“ v **Konzistence** (jen **Stopy**) a karta s chybami v **Na co se
  zaměřit**. Osobu a linii kontroluje [A5.1.2](#A5.1.2).
  Od aplikace 3.27.0 i **Kvalita dat ›** v bublině nálezu v pohledu Tabulka: otevře **Chyby v datech** na skupině
  toho nálezu (u nálezu označeného **Není chyba** na seznamu označených).
  Po importu a po sloučení: [A5.4](#A5.4).
- **Platí od:** aplikace 1.0.0; oddíly **Problémy** a **Stopy** aplikace 3.17.0; název **k ověření** a odkaz z pohledu
  Tabulka aplikace 3.27.0; oddíl **K ověření** a „Nic k ověření“ aplikace 3.27.0; **Kontrola stromu** se zprávou
  a pododdíl **Chyby** aplikace 3.33.0 (dřív dialog **Validace stromu**)

<!-- zdroj: app:src/validation.ts:83 validateTreeData, :1370 groupValidationIssues · strings.ts treeManager.valProblems, valLeads, leadsIntro, valReadOnly, valShowMore · 3.27.0: app:59a8eed0 strings.ts treeManager.validationWarnings „k ověření“, summaryErrors, summaryNoErrors, treeOverview.countWarnings · src/ui/table-view/table-bubble.ts (Kvalita dat ›) · table.sev.* · commit e530019b · „K ověření“: strings.ts treeManager.valProblems, commit 79764eba; „Nic k ověření“: validationPassed, summaryLeadsOnly, commit b1cbe546 (T54 G15) · 3.33.0: app:988b0f86 src/tree-health.ts buildBuiltinReport, healthSummary · src/ui/tree-health-ui.ts openTreeHealthReport (validateTreeData při každém otevření, storeHealthReport), oddíly secSummary…secCompare, holdsParts · src/ui/tree-health-errors-ui.ts (LONG_GROUP 50, GROUP_STEP, isPhone 640 px, chipy filterAll/filterErrors/filterWarnings/filterLeads, pododdíly error/warning/trace, nothingToCheck) · src/ui/tree-overview.ts health, health-report, validation, validation-leads · strings.ts health.* · CHANGELOG.cs.md 3.33.0 „Kontrola stromu“ · commity 2ecf9e43, 1b446bf4 -->

<a id="A5.1.1"></a>
### A5.1.1 Oprava jedním klikem

Některé nálezy mají tlačítko **Opravit**; souhrn nad nálezy má **Opravit vše (n)** pro všechny opravitelné nálezy.
Oprava je jeden krok zpět („oprava z Kontroly stromu“) a zapíše se do historie změn.

- Pod **Opravit vše (n)** stojí, co se opraví, s počty, jen u druhů, které strom má: „Opraví se: poškozené vazby mezi
  osobami a svazky (2); svazek osoby se sebou samou – smaže se (1); duplicitní svazek – sloučí se s prvním, děti
  zůstanou (1); místo zapsané víckrát jinak – sjednotí se na nejčastější zápis (3). Ostatní nálezy zůstanou beze
  změny.“ Ve stromu jen ke čtení tlačítko ani řádek nejsou.
- **Od aplikace 3.33.0:** **Opravit** a **Opravit vše (n)** jsou v oddílu **Chyby v datech** zprávy; krok zpět se
  jmenuje „oprava z Kontroly stromu“ (dřív „oprava z validace“).

| Nález | Co oprava udělá |
|---|---|
| Odkaz na neexistující záznam, účastník bez osoby | odstraní odkaz |
| Rodič nemá odkaz na dítě, dítě na rodiče, osoba na partnerství | doplní chybějící odkaz (rodiče jen dítěti s méně než 2 rodiči) |
| Partnerství sama se sebou | odstraní ho |
| Duplicitní partnerství | ponechá první, děti převede na něj |
| Jedno místo zapsané víckrát jinak | přepíše všechny zápisy na nejčastější |

- **Platí od:** aplikace 1.1.0; oprava míst 1.10.0; řádek pod **Opravit vše (n)** aplikace 3.27.0

<!-- zdroj: app:src/data.ts:4071 FIXABLE_TYPES, :4097 repairValidationIssue · strings.ts treeManager.valFix, valFixAll · řádek: src/ui/tree-stats.ts fixAllNoteText (orphaned*/missing* → links, selfPartnership, duplicatePartnership, placeSpelling), strings.ts treeManager.valFixAllNote, jen bez ro, commit 79764eba (T54 G15) · 3.33.0: app:988b0f86 src/ui/tree-health-errors-ui.ts validation-fix-all-btn, fixAllNoteText · strings.ts undo.repairedIssue „oprava z Kontroly stromu“ -->

<a id="A5.1.2"></a>
### A5.1.2 Rozsah a kde se kontrola spouští

**Zkontrolovat strom…** otevře volbu **Kontrola stromu**: název stromu, počet osob (u stromu z výzkumu „· výzkum
propojený“), **Rozsah** a seznam **Zabudované kontroly** („Vždy zapnuté, bez AI, zdarma, hned.“). **Vytvořit
zprávu** kontrolu spustí a otevře zprávu.

| Rozsah | Co kontrola projde |
|---|---|
| **Celý strom** | celý strom (výchozí) |
| **Linie ▾** („Vybrat linii“) | osobu linie výzkumu a její předky, nebo její potomky; u linie jedné osoby osobu, její rodiče, děti a partnery |
| **Osoba ▾** („Vybrat osobu ke kontrole“) | jednu osobu |

- **Hranice:**
  - **Linie ▾** je jen u stromu z výzkumu, který má linie a právě běží. **Osoba ▾** jde jen v otevřeném stromu,
    ne v režimu prohlížení.
  - V užším rozsahu se zúží **Chyby v datech**, **Úplnost a doklady** a počet osob. **Struktura**, **Bezpečí dat**
    a **Místa k určení** zůstávají za celý strom. Řádky výzkumu za celý strom mají „celý strom“ ([A5.1.4](#A5.1.4)).
  - Linie, jejíž osobu strom nezná, se kontroluje jako celý strom.
  - Osoba bez čísla výzkumu (P…) nemá řádky výzkumu.
- **Ovládání:**
  - **Přehled stromu → Kvalita dat → Kontrola stromu → Zkontrolovat strom…**;
  - v menu osoby **Zkontrolovat osobu…** (rozsah **Osoba**);
  - na stránce osoby v oddílu výzkumu **Kontrola osoby ›** s „naposledy 12. 3. 2025“, když osoba už zprávu má
    (rozsah **Osoba**);
  - v nabídce **⋯** linie **Zkontrolovat linii…** (rozsah **Linie**).
  - **Zkontrolovat osobu…** a **Kontrola osoby ›** jsou jen u stromu z výzkumu a ne v režimu prohlížení.
    **Zkontrolovat osobu…** není u zástupné osoby. Uložená stránka osoby řádek nemá.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:988b0f86 src/ui/tree-health-dialog-ui.ts openTreeHealthDialog, healthDialogHtml (seg tree/line/person, line jen meta.research && treeLines, person disabled !active, builtinsTitle, builtinsNote, dlgSub), healthCheckAgain · src/ui/tree-health-ui.ts scopePeople, healthFacts (people → errors, noSource, persons) · src/tree-health.ts healthSourcesFor (narrowing errors, evidence, ancestors) · src/research-health.ts healthBuiltinScopeParam (person:P…, line:G…) · src/ui/research-directions-ui.ts directionPersonIds, directionHealthItem · src/ui/context-menu.ts menuPerson · src/ui/card-signals-ui.ts · src/ui/person-page-ui.ts health:person, pageRow, pageLast · strings.ts health.scopeLabel, segTree, segLine, segPerson, pickLine, pickPerson, menuPerson, menuLine, pageRow, createReport · commit 1b446bf4 -->

<a id="A5.1.3"></a>
### A5.1.3 Zabudované kontroly a doporučené kroky

Zabudované kontroly aplikace běží vždy. Každá má ve zprávě řádek; kde něco našla, dá doporučený krok.

| Kontrola | Řádek ve zprávě | Doporučený krok · tlačítko |
|---|---|---|
| **Chyby v datech** | počty („… (bez „není chyba“)“), **Chyby v datech ›** | „3 chyby v datech“ · **Ukázat chyby**; jen chyby, ne nálezy k ověření a stopy |
| **Úplnost a doklady** | „bez pramene 12 z 80 osob“, **Kvalita dat ›** | „12 osob bez pramene“ · **Ukázat ve stromu** |
| **Struktura** | počet nepropojených částí, **Struktura ›** | „Nepropojené části: 2“ · **Rozdělit na rodiny** |
| **Bezpečí dat** | „záloha do souboru 4. 2. 2025“, „do souboru zatím neuložený“, nebo „na tomto zařízení neznámé“ | „Strom není uložený do souboru 40 dní“ · **Uložit zálohu** |
| **Pokrytí předků** | „od Jan Horák: praprarodiče známo 5 z 8“, „od Jan Horák: žádná známá generace bez mezery“, nebo „bez vybrané osoby“, **Předci ›** | „Prarodiče (Jan Horák): známo 3 z 4“ · **Ukázat předky** |
| **Místa k určení** | počet míst bez polohy, nebo „všechna místa mají polohu“, **Místa ›** | „4 místa bez polohy“ · **Určit místa** |

- **Hranice:**
  - **Bezpečí dat** dá krok od 30 dní bez uložení do souboru, a jen když strom má neuložené změny. Dny se počítají
    od posledního uložení do souboru, jinak od založení stromu. V režimu prohlížení je stav neznámý.
  - **Pokrytí předků** hledá první generaci, ve které předci chybí, od osoby v popředí otevřeného stromu, jinak od
    výchozí osoby. Krok je jen do praprarodičů (3. generace).
  - Pořadí kroků: nejdřív bezpečí dat, pak co brzdí výzkum, pak spolehlivost, nakonec rozšíření stromu:
    záloha · linie stojí · staré žádosti · rozhodnutí · prázdná fronta · chyby v datech · opravy Stromu · ověření
    linie · konzistence výzkumu · osoby bez pramene · konce větví · materiály · předci · místa · nepropojené části.
    Kroky výzkumu popisuje [A5.1.4](#A5.1.4).
  - Ukáže se prvních 10 kroků, další za „a 4 další kroky ›“.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:988b0f86 src/tree-health.ts HEALTH_BACKUP_DAYS 30, HEALTH_STEPS_SHOWN 10, ANCESTOR_STEP_MAX_GEN 3, STEP_ORDER, buildBuiltinReport, healthSteps (errors jen report.errors.errors) · src/ui/tree-health-ui.ts healthFacts (fileCopyAt ?? createdAt, hasUnsavedChanges, isViewMode → null, ancestorGenerations, collectPlaces), rootOf (focus, defaultPersonId) · strings.ts health.src*, step*, link*, moreSteps · commit 2ecf9e43 -->

<a id="A5.1.4"></a>
### A5.1.4 Řádky a kroky výzkumu

U stromu z výzkumu, který běží a umí to, přidá výzkum do zprávy vlastní řádky a kroky. Aplikace se ho na ně zeptá
při každé kontrole a čeká nejvýš 4 s.

| Řádek | Co ukazuje |
|---|---|
| **Jistota údajů z výzkumu** | „8 údajů k potvrzení“ / „vše potvrzené“ |
| **Čeká na vyřízení a audit úkolů** | žádosti odeslané před víc než 30 dny a úkoly s nálezem auditu / „nic starého“ |
| **Linie a fronta** | linie, kolik jich stojí, otevřené a odložené úkoly fronty |
| **Opravy Stromu** | „čeká 2“ / „žádná nečeká“ |
| **Ověření proti originálům** | citace bez stránky a bez snímku / „každá citace má stránku i snímek“ |
| **Rozhodnutí** | „čeká 3“ / „nic nečeká“ |
| **Konce větví** | „neprohledáno 6“ / „vše prohledané“ |
| **Materiály a dávky** | neroztříděné v dávkách a bez osoby / „vše roztříděné“ |
| **Konzistence výzkumu** | chyby a upozornění `strom check` / „bez problémů“ |
| **Růst stromu** | „za 30 dní +12 osob, +40 údajů, +9 pramenů“ |

| Krok výzkumu | Proč | Tlačítko |
|---|---|---|
| „Linie Horákovi stojí“ | „Žádný úkol linie se nehýbe.“ | **Pustit agenta na linii**; má-li linie úkoly, které čekají, **Otevřít** |
| „2 žádosti odeslané před víc než 30 dny bez odpovědi“ | „Odpověď mohla přijít poštou nebo e-mailem.“ | **Zapsat odpověď** |
| „3 věci čekají na rozhodnutí“ | „Hypotézy, rozpory a importy, o kterých výzkum sám nerozhodne.“ | **Otevřít** |
| „Fronta výzkumu je prázdná“ | „Agent nemá na čem pracovat.“ | **Otevřít výzkum** |
| „Čekají opravy Stromu (2)“ | „Opravy dat stromu, které výzkum nabízí.“ | **Spustit opravu** |
| „5 údajů k ověření proti originálu · linie“ | „Údaje převzaté z indexů, ne z originálu záznamu.“ | **Ověřit linii** |
| „Konzistence výzkumu: 2 problémy“ | „Vlastní kontrola výzkumu našla záznamy, které k sobě nesedí.“ | **Otevřít výzkum** |
| „6 konců větví bez hledání“ | „Osoby na konci větve, jejichž záznamy se zatím nehledaly.“ | **Nová linie** |
| „4 materiály neroztříděno“ | „Soubory a dávky bez osoby.“ | **Otevřít Materiály** |

- **Hranice:**
  - Linie stojí, když je aktivní a nemá ve frontě žádný úkol. Prázdná fronta je krok jen při aktivní linii.
  - Výzkum pošle nejvýš 10 kroků. Linie, která stojí, staré žádosti, rozhodnutí a prázdná fronta jdou i do
    **Co brzdí růst stromu** (**Doporučené kroky ›**).
  - V užším rozsahu jsou **Opravy Stromu**, **Materiály a dávky**, **Konzistence výzkumu** a **Růst stromu** za celý
    strom (řádek má „celý strom“).
  - Archiv a ukázkový výzkum nemají linie, frontu, žádosti, ověření linií, konce větví ani čekání úkolů.
  - Bez řádků výzkumu řekne volba proč: „Vlastní kontroly výzkumu přinese novější Strom Výzkum.“ (výzkum to neumí),
    „Vlastní kontroly výzkumu chybí: výzkum teď neběží.“, u stromu bez výzkumu „Další zabudované kontroly přidá
    propojený Strom Výzkum.“
  - Když výzkum neběží, má krok výzkumu tlačítko vypnuté („Výzkum teď neběží.“). Po importu se výzkumu kontrola
    neposílá.
- **Ovládání:** terminál `strom health` ([A5.9](#A5.9)); spojení s výzkumem [S1](S1-connecting-app-and-research.md).
- **Platí od:** aplikace 3.33.0 (výzkum 1.38.0)

<!-- zdroj: app:988b0f86 src/research-health.ts HEALTH_FEATURE 'health', researchHealthRows (wholeTree fixes, material, consistency, growth), healthBuiltinScopeParam (import → null), HEALTH_BUILTIN_TIMEOUT_MS 4000, fetchResearchHealthBuiltin GET /health/builtin, parseResearchHealthBuiltin steps.slice(0, 10) · src/ui/tree-health-ui.ts healthResearchPart (none/off/old/ok), researchStepRow (actWork/actOpen…), researchOff · src/ui/tree-health-dialog-ui.ts builtinsMore, builtinsWhyOld, builtinsWhyOff · strings.ts health.srcConfirm…srcGrowth, stepLineStuck…stepMaterial, act* · research:d8742230, 3f541f54, 818a015b src/core/health.ts builtin, stepsOf (stuck = active && queued 0, queue-empty jen s aktivní linií, archive), SENT_OLD_DAYS 30, STEPS_MAX 10 · src/core/live.ts GET /health/builtin, BRIDGE_FEATURES health · CHANGELOG.cs.md 1.38.0 „Kontrola stromu“ -->

<a id="A5.1.5"></a>
### A5.1.5 Starší zprávy, tisk a Uložit HTML

Zpráva se uloží do dat stromu, takže jde i do zálohy a JSON. Strom drží novou zprávu a jednu před ní.

- **Hranice:**
  - Ukládá se jen u otevřeného stromu, který není jen pro čtení. Jinak pata zprávy říká „Zpráva se neukládá: strom je
    jen pro čtení nebo není otevřený.“ Uložení nemá krok zpět.
  - **Proti minulé kontrole** porovná zprávu s minulou zprávou stejného rozsahu: „Minulá kontrola 4. 2. 2025: chyby
    3 → 1, k ověření 5 → 5, stopy 2 → 4, 1 nový krok, 2 kroky zmizely.“, „… beze změny.“, nebo „Toto je první
    kontrola.“
  - **Starší zprávy ▾** ukáže uložené zprávy („4. 2. 2025 · celý strom · zabudované · 3 doporučené kroky“), jinak
    „Žádná starší zpráva.“ Starší zpráva má kroky jen ke čtení („Starší zpráva z 4. 2. 2025; aktuální stav může být
    jiný.“) a chyby v datech neukazuje („Chyby v datech starší zprávy se neukládají; nová kontrola ukáže ty
    aktuální.“).
  - Data ve zprávě jsou bez roku, když jsou z letošního roku („12. 3.“).
  - **Uložit HTML** uloží soubor „Kontrola stromu – Horákovi – 2026-03-12.html“ bez tlačítek a se všemi oddíly
    rozbalenými. Jména žijících osob nahradí „…“ a připíše „Žijící osoby jsou skryté podle nastavení výstupů.“
    Kdo je žijící osoba: [S11.1](S11-protecting-living-people.md#S11.1).
- **Ovládání:** v hlavičce zprávy **Starší zprávy ▾**, **Tisk**, **Uložit HTML**, **Zkontrolovat znovu…** (zpráva
  po importu se kontroluje znovu jako celý strom); na telefonu v nabídce **…**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:988b0f86 src/tree-health.ts keepHealthReports (nová + jedna před ní), sameScope, compareReports, sanitizeHealthReports · src/data.ts storeHealthReport (bez undo) · src/ui/tree-health-ui.ts healthDay (letos bez roku), stored, older (at > 0), olderNote, olderErrors, footStored, footNotStored · src/ui/tree-health-dialog-ui.ts openOlderHealthReports, saveHealthReportHtml (fileName, PERSON_PAGE_DEFAULT_PRIVACY, isLivingPerson, livingHidden, saved), healthCheckAgain (import → tree), moreActs · strings.ts health.olderReports, olderRow, olderNone, print, saveHtml, checkAgain, compareLine, compareSame, firstCheck · commit 1b446bf4 -->

<a id="A5.2"></a>
## A5.2 Vazby v rodině

Kontrola hledá vazby, které nemohou platit. Všechny jsou chyby, kromě duplicitního partnerství (k ověření).

| Nález v aplikaci | Kdy |
|---|---|
| **Zjištěn cyklus předků** | osoba je svým vlastním předkem; hlásí se jen první cyklus |
| **Partnerství sama se sebou** / **Duplicitní partnerství** | partner je táž osoba / dvě partnerství téže dvojice |
| **Rodič nemá odkaz na dítě**, **Dítě nemá odkaz na rodiče**, **Neshoda dítěte v partnerství** | vazba je zapsaná jen z jedné strany |
| **Odkaz na neexistující záznam** | rodič, dítě, partner nebo partnerství chybí |
| **Účastník události odkazuje na osobu, která už neexistuje** | kmotr nebo svědek (i svědek sňatku) je smazaná osoba |
| **Více než 2 rodiče** | |
| **Osoba ve více generacích** | počítání generací narazí na rozpor; partner je ve stejné generaci |
| **Partner je také rodič / dítě**, **Sourozenec je také rodič / dítě** | |

- **Platí od:** aplikace 1.0.0; účastník události 1.16.0

<!-- zdroj: app:src/validation.ts:142 checkCycles, :200, :223, :255, :293, :346-464 orphaned*, :471 tooManyParents, :554 generationConflict, :621 · strings.ts treeManager.val* -->

<a id="A5.3"></a>
## A5.3 Data a věk

Kontrola hlásí jen to, co jistě neplatí. Neúplné nebo přibližné datum počítá v celém možném rozsahu:
bez měsíce leden až prosinec, „asi“ ± 2 roky, „před“ až 20 let dřív, „po“ až 20 let později, rozsah do svého konce.
Teprve když porušení platí v celém rozsahu, je to nález. Výjimkou jsou mírnější meze k ověření z aplikace 3.27.0
(níže): tam stačí, když mez překročí jeden konec možného věku.

| Nález v aplikaci | Závažnost | Kdy |
|---|---|---|
| **Datum úmrtí je před narozením** | chyba | |
| **Nepravděpodobně dlouhý život** | k ověření | víc než 115 let |
| **Rodič mladší než dítě** | chyba | podle data narození |
| **Rodič velmi mladý / velmi starý při narození** | k ověření | méně než 12 / víc než 80 let; jen data narození |
| **Matka při narození dítěte mladší 16 let** / **… starší 45 let** | k ověření | od aplikace 3.27.0, viz níže |
| **Otec při narození dítěte mladší 18 let** / **… starší 60 let** | k ověření | od aplikace 3.27.0, viz níže |
| **Událost datovaná před narozením** | k ověření | |
| **Událost datovaná po úmrtí** | k ověření | kromě: Pohřeb, Kremace, Závěť, Pozůstalostní řízení |
| **Dítě narozené po smrti matky** | chyba | víc než 1 měsíc po smrti; jen vlastní rodiče |
| **Dítě narozené dlouho po smrti otce** (… **rodiče**, pohlaví neznámé) | k ověření | víc než 10 měsíců |
| **Svatba datovaná před narozením partnera** | chyba | |
| **Svatba datovaná po úmrtí partnera** | k ověření | |
| **Sňatek v dětském věku** | k ověření | méně než 14 let |
| **Sňatek ve věku pod 16 let** | k ověření | od aplikace 3.27.0, viz níže |
| **Zapsaný věk se liší o víc než 2 roky** | k ověření | od aplikace 3.27.0, viz níže |
| **Extrémní věkový rozdíl partnerů** | info (**Stopy**) | 40 let a víc |
| **Narození/úmrtí zadané jako životní událost** | chyba | narození nebo úmrtí v seznamu událostí |
| **Vlastní událost nemá název** / **Událost má neplatné datum** | k ověření | |

- **Hranice:** stejné výjimky po úmrtí má `strom check` výzkumu. Rodič bez typu vztahu se počítá jako vlastní.
- **Od aplikace 3.27.0:** mírnější meze k ověření:
  - **matka** mladší 16 nebo starší 45 let a **otec** mladší 18 nebo starší 60 let při narození dítěte. Jen
    vlastní rodič se známým pohlavím, věk z obou dat narození;
  - **sňatek** ve věku pod 16 let;
  - stačí, když mez překročí jeden konec možného věku (věk „15–16“ je pod 16). Datum s **cca** se počítá jako
    odhad věku; datum s **před** nebo **po** se neporovnává;
  - hlásí se jen přísnější nález: kde už platí **Rodič mladší než dítě**, **Rodič velmi mladý / velmi starý** nebo
    **Sňatek v dětském věku**, mírnější nález není;
  - **zapsaný věk** (u sňatku věk každého z dvojice, u úmrtí, u narození) se porovná s věkem z data narození a data
    události. Nález je, když je mimo možný rozsah o víc než 2 roky. Věk zapsaný slovem nebo s cca, před, po se
    neporovnává, ani když je některé z dat jen odhad;
  - řádek nálezu ukazuje data a věk („* 1850 → * 1866: 15–16“, „⚭ 1872: 30 ≠ 26–27“).
- **Platí od:** aplikace 1.0.0 (věk rodičů); 1.4.0 (události); 1.7.0 (data a úmrtí); dítě po smrti rodiče
  neznámého pohlaví 3.10.0; čtyři výjimky po úmrtí 3.17.0 (dřív jen pohřeb); mírnější meze věku rodičů a sňatku
  a zapsaný věk 3.27.0

<!-- zdroj: app:src/validation.ts:493 checkAgePlausibility MIN_PARENT_AGE MAX_PARENT_AGE, :863 checkDateConsistency MAX_LIFESPAN_YEARS CHILD_MARRIAGE_YEARS PARTNER_AGE_GAP_YEARS POSTHUMOUS_FATHER_MONTHS AFTER_DEATH_EVENT_TYPES, :120 checkLifeEvents · monthRange, certainlyBefore · research:src/core/afterdeath.ts AFTER_BY_NATURE · strings.ts treeManager.val* · 3.27.0: app:59a8eed0 src/validation.ts MOTHER_MIN_AGE 16, MOTHER_MAX_AGE 45, FATHER_MIN_AGE 18, FATHER_MAX_AGE 60, checkParentAgeLimits (gender female/male, parentRelTypes biological, jen když není parentYoungerThanChild/parentTooYoung/parentTooOld), ageSpan (< > → null; ~ approxAgeBetween), spanText, MARRIAGE_MIN_YEARS 16 (else za childMarriage), checkRecordedAges SLACK_YEARS 2 (Partnership.ages, deathAge, birthAge), src/dates.ts recordedAgeGap, ageRangeBetween · strings.ts treeManager.valMotherTooYoung16, valMotherTooOld45, valFatherTooYoung18, valFatherTooOld60, valMarriageUnder16, valRecordedAgeMismatch, validationWarnings, countWarnings, summaryErrors · spec 073 §7.6 · CHANGELOG.cs.md 3.27.0 -->

<a id="A5.4"></a>
## A5.4 Prameny, přílohy a sloučení při importu

| Nález v aplikaci | Závažnost | Kdy |
|---|---|---|
| **Citace odkazuje na neexistující pramen** | k ověření | citace u osoby, události, partnerství nebo přílohy |
| **Příloha nemá použitelná data** | k ověření | data nejsou obrázek ani PDF (příloha jen s originálem se nehlásí) |
| **Fotka není podporovaný obrázek** | k ověření | jiný formát než JPEG, PNG, WebP, GIF |
| Nejspíš dvě osoby sloučené do jedné při importu souboru GEDCOM (Strom 3.8.1 a starší) … | chyba | viz níže |

Starší verze mohly při importu dát dvěma osobám stejné ID. Kontrola to hlásí při jasném znaku (víc než 2 rodiče,
osoba sama svým rodičem, dítětem nebo partnerem), nebo když je dítě narozené dřív než 12 let po rodiči a k tomu
rodiče nebo partner stejného pohlaví. Rodiče stejného pohlaví sami nález nedají. Řešení je v textu nálezu:
původní soubor importovat znovu jako nový strom.

- **Platí od:** aplikace 1.7.0 (prameny a přílohy); 3.0.0 (fotky); 3.9.0 (sloučení při importu)
- **Od aplikace 3.33.0:** kontrola po importu a po sloučení je zpráva **Kontrola stromu** (dřív otázka „Kontrola
  dat“):
  - soubor jiného programu s kartou **Co teď**: na kartě řádek **Kontrola stromu** („Našla 3 věci k prohlédnutí.
    Nic se samo neopravuje.“ nebo „Kontrola stromu nenašla v importu nic k ověření.“) s **Otevřít zprávu**
    ([S6.4](S6-tree-from-another-program.md#S6.4));
  - jiný import: zpráva **Co přibylo importem** se otevře rovnou na **Chyby v datech**. Když kontrola nic nenajde,
    ukáže se jen oznámení „Kontrola stromu nenašla v importu nic k ověření.“ s **Zpráva ›** (8 s). Po zavření
    zprávy se aplikace případně zeptá na rozdělení na rodiny;
  - zpráva po importu projde celý strom. Výzkumu se neposílá;
  - sloučení: **Zkontrolovat strom** v posledním kroku průvodce a v historii sloučení otevře zprávu **Co přibylo
    sloučením** s přidanými a spojenými osobami a **‹ Zpět ke sloučení** ([A8.11](A8-merging-trees.md#A8.11)).

<!-- zdroj: app:src/validation.ts:982 checkSourceIntegrity, checkPhotoData, :1199 checkImportMerges · strings.ts treeManager.valCitationMissingSource, valAttachmentNoData, valPhotoUnsafeData, valImportMerge · 3.33.0: app:988b0f86 src/ui/import-export.ts afterImport (offerImportNextCard, path merge, openTreeHealthReport section errors, quietWhenClean, scope import bez personIds, offerPostImportSplit) · src/ui/tree-health-ui.ts quietWhenClean → importClean 8000 ms, action report · src/ui/import-next-ui.ts řádek check (checkFound, checkClean, openReport) · src/research-health.ts healthBuiltinScopeParam (import → null) · src/merge/ui.ts:1786, src/ui/merge-history-ui.ts:173 scope import merge personIds added + joined, backToMerge · strings.ts health.scopeImport, scopeMerge, importClean, openReport, treeManager.postImportCheckTitle, importNext.checkFound, checkClean · commit ea094193 -->

<a id="A5.5"></a>
## A5.5 Stopy: kmotři a zápisy míst

**Stopy** nejsou chyby. Ukazují, kde může být příbuzenství nebo nejednotný zápis.

- **Kmotr, který se opakuje — bývá to příbuzný:** tentýž kmotr nebo svědek je u událostí aspoň 2 osob, které spolu
  nejsou příbuzné, a ty osoby patří aspoň do 2 sourozeneckých skupin. Řádek ukazuje, u kolika událostí a osob.
  Příklad: Marie Vlková je kmotrou dětí Horákových i dětí jejich sousedů.
- **Jedno místo zapsané víckrát jinak:** zápisy, které se liší jen velikostí písmen, diakritikou nebo tečkou či
  čárkou, např. „Brno“ a „brno.“. Řádek ukazuje každý zápis s počtem; oprava je v [A5.1.1](#A5.1.1).
- **Hranice:** příbuzní jsou osoby nejvýš 3 kroky přes rodiče, děti a partnery. Počítají se účastníci událostí
  osoby, svědci sňatku a účastníci společných událostí páru. Ve **Stopy** je i věkový rozdíl partnerů ([A5.3](#A5.3)).
- **Platí od:** aplikace 1.10.0 (místa); 1.16.0 (kmotři); sourozenecké skupiny a úřední osoby 3.17.0
- **Od aplikace 3.28.0:** ve **Stopy** jsou ještě:
  - stejná událost zapsaná zvlášť u více osob, s **Spojit do jedné události** nebo **Projít po jedné**
    ([A10.4](A10-shared-events.md#A10.4));
  - kmotři a svědci zapsaní jménem, kterým odpovídá osoba stromu, s **Projít po jednom**
    ([A10.5.2](A10-shared-events.md#A10.5.2)).

<!-- zdroj: app:src/godparents.ts:42 RECURRING_THRESHOLD, :188 recurringParticipants, :270 siblingGroupCount, :300 godparentLeads · src/validation.ts:1034 checkPlaceSpellings, checkRecurringGodparents · strings.ts treeManager.valRecurringGodparent, valRecurringGodparentDetail, valPlaceSpelling, leadsSkipped -->

<a id="A5.5.1"></a>
### A5.5.1 Jak se pozná tentýž kmotr

- Osoba propojená se stromem se pozná podle záznamu. Jen zapsané jméno se porovnává jako text, řádek pak má „shoda
  podle jména“.
- Ze zápisu se bere jméno do první čárky, malého písmene nebo číslice. Tituly a oslovení (kmotr, pan, Mgr. …) se
  vynechají, částice (von, de …) zůstanou, text v závorce je poznámka. Porovnává se bez diakritiky a velikosti písmen.
- Jméno musí mít aspoň 2 slova. Samotné křestní jméno se nikdy neshoduje.
- Nehlásí se ten, kdo je u události z úřadu: oddávající, porodní bába a duchovní (farář, kaplan, Pfarrer, parochus …).
  Duchovní zapsaný jako kmotr se hlásí.

<!-- zdroj: app:src/godparents.ts:48 NAME_PARTICLES, :54 NAME_PREFIXES, :80 participantName, :117 CLERGY_WORDS, :121 MIDWIFE_WORDS, :134 attendsByOffice · strings.ts treeManager.valRecurringGodparentByName -->

<a id="A5.6"></a>
## A5.6 Možná duplicitní osoba

Dvě osoby jsou možná táž, když mají stejné příjmení a stejné křestní jméno a narodily se ve stejných letech.
Porovnává se bez velikosti písmen a diakritiky. Nález je ve **Stopy** ve skupině **Možná duplicitní osoba**.

- **Hranice:**
  - Rok narození: datum narození; bez něj křest (rok křtu nebo rok před ním); bez něj úmrtí nebo pohřeb
    s věkem při úmrtí. Jsou-li oba roky z narození, musí se překrývat. Jinak smějí být od sebe 2 roky.
  - Chybí-li křestní jméno u jedné osoby, stačí příjmení a roky.
  - Osoby bez data se párují jen při úplně stejném jménu. Osoba s datem se s osobou bez data nepáruje.
  - Nehlásí se: zástupné a nepojmenované osoby, neslučitelné pohlaví, rodič a dítě, a dvojice, kde jedna osoba
    jistě zemřela před narozením (nebo křtem) druhé.
- **Ovládání:** **Jsou to dvě osoby** ([A5.7](#A5.7)); u verdiktu výzkumu **Sloučit…** ([A5.6.1](#A5.6.1)).
- **Platí od:** aplikace 1.9.9; roky z křtu a úmrtí 3.17.0
- Sloučení dvou osob jednoho stromu je jiná věc než sloučení dvou stromů nebo import rodokmenu do stromu
  ([A8](A8-merging-trees.md)): to vede průvodce a jde odvolat ([A8.12](A8-merging-trees.md#A8.12)).

<!-- zdroj: app:src/validation.ts:1084 birthYears, :1127 checkPossibleDuplicates STAND_IN_YEARS_SLACK · strings.ts treeManager.valGroupPossibleDuplicate, twoPeople · odkaz na A8: spec 134 (dokumentace „A5.6 odkaz“) -->

<a id="A5.6.1"></a>
### A5.6.1 Verdikt výzkumu

U stromu z výzkumu se aplikace při otevření kontroly zeptá výzkumu na všechny dvojice. Kontrola na odpověď nečeká.
Výzkum posoudí jen osoby, které mají jeho číslo (P…). Rozhoduje první pravidlo, které platí:

| Pořadí | Výzkum zjistil | Verdikt v aplikaci |
|---|---|---|
| 1 | osobu nezná | žádný |
| 2 | osoby už sloučil | **Ve výzkumu sloučeno** |
| 3–9 | dvě osoby označené člověkem; jiné pohlaví; rodič a dítě; narození nebo křest víc než 3 roky od sebe; jeden zemřel dřív, než se druhý narodil; sourozenci (druhé dítě dostalo jméno zemřelého); jiní rodiče | **Dvě osoby** |
| 10 | jména se ve výzkumu liší | **Nejisté** |
| 11–12 | stejní rodiče a známé roky; tentýž zápis v prameni u obou | **Pravděpodobně táž osoba** |
| 13–14 | blízké roky a nic dalšího; u jedné osoby žádné datum | **Nejisté** |

- **Hranice:**
  - Dvojice s verdiktem **Pravděpodobně táž osoba** a **Ve výzkumu sloučeno** jdou nahoru, pak **Nejisté**, pak bez
    verdiktu.
  - Dvojice **Dvě osoby** jdou stranou do řádku **Výzkum je rozlišil: n** a nepočítají se.
  - Verdikt, který přijde do otevřené skupiny, jen přidá štítek. Přeřadí se až při dalším otevření.
  - Pod skupinou je **Výzkum posuzuje…** nebo **Posouzeno výzkumem**. Neběží-li výzkum, který posuzoval při
    posledním spojení: „Bez posouzení výzkumu – výzkum neběží.“ Výzkum, který posuzovat neumí, se nezmiňuje.
- **Ovládání:** u verdiktu **Sloučit…** (sloučení osob) nebo **Načíst novou verzi** · terminál:
  `strom person compare P… P…`, pro mnoho dvojic `--pairs-from`. Spojení s výzkumem:
  [S1](S1-connecting-app-and-research.md).
- **Platí od:** aplikace 3.17.0 (výzkum 1.22.0)

<!-- zdroj: app:src/duplicate-verdicts.ts:18 MAX_JUDGE_PAIRS, :54 issueResearchPair, :142 verdictRank, :154 verdictsMode, :192 verdictReasonText · src/quality-bridge.ts:172 postDuplicates · strings.ts treeManager.verdict*, reason* · research:src/core/duplicates.ts judge YEARS_CLOSE · src/core/live.ts:168-192 · src/commands/quality.ts person compare -->

<a id="A5.6.2"></a>
### A5.6.2 Upozornění při zadávání osoby

Při zadávání nové osoby ukáže aplikace nejvýš 3 podobné osoby („Podobné osoby už existují:“). Porovnává jinak než
[A5.6](#A5.6): skórem podobnosti jako při slučování, nikdy s neslučitelným pohlavím.
- **Ovládání:** **Přejít na osobu**, **Použít existující** · vypnutí **Nastavení → Upozornění → Našeptávání
  duplicit**.
- **Platí od:** aplikace 1.4.0

<!-- zdroj: app:src/ui/duplicate-suggest.ts:22 MAX_SUGGESTIONS, :75 runDuplicateCheck · findSimilarPersons SIMILAR_PERSON_THRESHOLD · strings.ts duplicateSuggest.settingLabel, useExisting -->

<a id="A5.7"></a>
## A5.7 Není chyba

Nález, který chybou není, se označí. Pak se už nehlásí, ani když se strom zkontroluje znovu.
Značka je změna stromu: má krok zpět a zápis v historii změn. U možné duplicity se tlačítko jmenuje **Jsou to dvě
osoby**.

- **Hranice:**
  - Tentýž nález pozná aplikace podle druhu, osob a předmětu. Předmět je rok u události či svatby po úmrtí,
    jméno u kmotra a nejčastější zápis u místa. Změní-li se něco z toho, nález se ukáže znovu.
  - U stromu z výzkumu se značka pošle výzkumu, když mají všechny osoby nálezu číslo výzkumu (nejvýš 20 osob).
    Soubor GEDCOM z výzkumu značky nenese; při načtení nové verze se převezmou ze staré verze stromu.
  - Výzkum značky u události a svatby po úmrtí respektuje: `strom check` je nehlásí a agent je nevyšetřuje.
  - Stav značky: **Odesláno výzkumu**, **Čeká na výzkum** (výzkum neběží, pošle se při dalším spojení),
    **Jen v aplikaci** (výzkum ji nevzal nebo osoby nemají číslo; znovu se neposílá), **Označeno ve výzkumu**.
  - Značka u místa nemá osoby, proto se výzkumu neposílá. Při oddělení části stromu zůstanou jen značky,
    jejichž osoby všechny zůstanou.
  - Značku zapsanou ve výzkumu zná aplikace jen u otevřeného stromu z výzkumu, když výzkum běží.
  - **Od aplikace 3.27.0:** předmět u **Sňatek ve věku pod 16 let** je rok sňatku, u **Zapsaný věk se liší o víc
    než 2 roky** údaj (narození, sňatek, úmrtí) a u sňatku jeho rok. Označený nález ukazuje pohled Tabulka jako
    **neobvyklé** a odtud jde označit i vrátit ([A6.7.5](A6-views.md#A6.7.5)).
- **Ovládání:** v řádku nálezu **Není chyba** / **Jsou to dvě osoby**, 6 s nabídka **Vrátit**. Seznam
  **Označeno jako není chyba: n** pod nálezy (od aplikace 3.33.0 na konci **Chyby v datech** ve zprávě
  [A5.1](#A5.1)), u každé značky datum nebo **Označeno ve výzkumu**, tlačítko **Vrátit**
  · terminál: `strom quality list`, `strom quality dismiss possibleDuplicate P… P…`,
  `strom quality dismiss eventAfterDeath P… --subject 1861`, `strom quality undo …`. Značku zapisuje jen člověk, nikdy
  agent.
- **Platí od:** aplikace 3.17.0 (výzkum 1.22.0)

<!-- zdroj: app:src/validation.ts:1415 qualityFinding (3.27.0: marriageUnder16 rok, recordedAgeMismatch field + rok) · src/ui/table-view/table-bubble.ts · src/quality-dismiss.ts:47 sanitizeQualityDismissed, :152 dismissalFor, :186 dismissBody, mergeResearchMarks, carryOverTreeDecisions, dismissalsWithin · src/quality-bridge.ts:74 dismissReply · src/ui/quality-ui.ts:155 flushQuality, :257 readQualityMarks · src/data.ts:1674 dismissQualityFinding · src/ui/tree-stats.ts:104 DISMISS_TOAST_MS (3.33.0: app:988b0f86 src/ui/tree-health-errors-ui.ts DISMISS_TOAST_MS, qualityDismissedHtml) · strings.ts treeManager.notAnError, twoPeople, dismissedRow, sentToResearch, waitingForResearch, appOnly, markedInResearch · research:src/commands/quality.ts PERSON · src/core/afterdeath.ts -->

<a id="A5.8"></a>
## A5.8 Přehled stromu → Kvalita dat

Oddíl shrnuje kontrolu a úplnost stromu. Počítá stejně jako **Chyby v datech** ([A5.1](#A5.1)), bez označených
nálezů a bez dvojic, které výzkum rozlišil.

| Blok | Co ukazuje |
|---|---|
| **Kontrola stromu** | „Naposledy 12. 3. 2025 · 3 doporučené kroky“ nebo „Zatím neproběhla“; **Zpráva ›** (poslední zpráva celého stromu), **Zkontrolovat strom…** ([A5.1.2](#A5.1.2)); jen strom s osobami |
| **Konzistence** | souhrn („2 chyby, 1 k ověření, 3 stopy.“), 5 nejzávažnějších chyb a nálezů k ověření, „a dalších n…“, řádek „n stop ›“ |
| **Úplnost dat** | podíl osob s **Datum narození**, **Datum úmrtí (u zemřelých)**, **Místo narození**, **Fotografie**; pod 50 % zvýrazněno; „Obsah stromu:“ (fotky, události, prameny, přílohy) |
| **Jistota údajů z výzkumu**, **Kde chybí doklady** | doložení, viz [R3.8](R3-verification-and-citation.md#R3.8) a [A3](A3-evidence-in-the-app.md) |
| **Struktura** | počet svazků; nespojené části, nebo „Všechny osoby jsou propojeny do jedné rodiny.“ |
| **Rychlé akce** | **Chyby v datech ›**, **Vyčistit osiřelá místa (n)**, **Rozdělit na rodiny** |

- **Hranice:**
  - Nad 10 MB fotek a příloh přibude upozornění („Média mají přes 10 MB. Soubor stromu se pomaleji ukládá a sdílí.“). Osiřelé místo je místo, na které nic neodkazuje.
  - Nespojená část nemá cestu k hlavní rodině; jde ji oddělit (**Oddělit nespojené části**).
  - Karta v **Na co se zaměřit** ukazuje počet chyb a nejčastější druh. Má tlačítko **Opravit** (otevřený strom)
    nebo **Chyby v datech ›**; obě otevřou zprávu na **Chyby v datech**.
  - **Zkontrolovat strom…** jde jen v otevřeném stromu. **Zpráva ›** je, až když strom má zprávu celého stromu.
  - **Od aplikace 3.33.0:** blok **Kontrola stromu**; **Chyby v datech ›** a řádek „n stop ›“ otevřou zprávu
    (dřív **Detaily validace** a dialog **Validace stromu**).
- **Ovládání:** **Přehled stromu → Kvalita dat**; v nabídce stromu i přímo **Kvalita dat**.
  Akce, které mění data, jdou jen v otevřeném stromu.
- **Platí od:** aplikace 3.13.0; stopy a značky 3.17.0; „k ověření“ místo „varování“ 3.27.0; blok **Kontrola stromu**
  3.33.0

<!-- zdroj: app:src/ui/tree-overview.ts:101 TOP_ISSUES, :108 LOW_SHARE, :1882 treeOverviewQualityHtml, :925 selectFocusCards · src/ui/tree-actions.ts:191 overview-quality · strings.ts treeOverview.consistencyTitle, completenessTitle, field*, contentLabel, mediaWarning, structureTitle, allConnected, quickActions, actValidation, actCleanPlaces, actSplitFamilies, cardValidation · 3.33.0: app:988b0f86 src/ui/tree-overview.ts blok check (q.persons === 0 → bez bloku, last = healthReports scope tree, lastRun, stepsCount, notRun, report, checkTree jen st.active, disabledHint), akce health, health-report, validation, validation-leads · strings.ts health.title, lastRun, notRun, report, checkTree, treeOverview.actValidation „Chyby v datech ›“ -->

<a id="A5.9"></a>
## A5.9 `strom health` v terminálu

`strom health` vypíše zabudovanou část kontroly stromu, jak ji zná výzkum. Je to stejná část, kterou výzkum posílá
do zprávy v aplikaci ([A5.1.4](#A5.1.4)). Nic nemění.

| Řádek výstupu | Co ukazuje |
|---|---|
| „Kontrola stromu · celý strom · …“ | rozsah a stav historie výzkumu |
| „Kontrola dat: v pořádku“ / „Kontrola dat: PROBLÉM“ | stav `strom check`: chyby, varování, osoby bez dokladu |
| „Přibylo za 30 dní: …“ | nové osoby, údaje a prameny |
| „Linie: …“, „Fronta: otevřené 4, odložené 1“ | linie (ve frontě, čeká, STOJÍ) a fronta („PRÁZDNÁ“) |
| „Odesláno a dlouho bez odpovědi: …“ | žádosti odeslané před víc než 30 dny |
| „Čeká na rozhodnutí: 3“, „Čekající opravy stromu: …“ | rozhodnutí a opravy Stromu |
| „Údaje k ověření: 5“ | údaje k ověření proti originálu, po liniích |
| „Konce větví, které se nikdy nehledaly: 6“ | konce větví; vypíše nejvýš 8 osob |
| „Materiál čekající na roztřídění: 4“ | materiál bez osoby a otevřené dávky |
| „Úkoly, které nečekají tak, jak strom potřebuje: 1“ | úkoly s nálezem auditu |
| „Citace originálů: bez strany 2, bez snímku 7“ | citace bez stránky a bez snímku |
| „Další kroky:“ | nejvýš 10 kroků, každý s příkazem („1. fronta je prázdná → strom run“) |

| Krok | Příkaz |
|---|---|
| kontrola dat našla chyby | `strom check` |
| linie stojí, čekající úkoly / ve frontě nic nemá | `strom task list --research G… --state waiting` / `strom run --research G…` |
| žádosti dlouho bez odpovědi | `strom task list --state waiting` |
| čeká na rozhodnutí | `strom status` |
| fronta je prázdná | `strom run` |
| oprava stromu | `strom fixes show …` |
| údaje k ověření v linii | `strom verify bulk --scope line --of G… --dry-run` |
| konce větví, které se nikdy nehledaly | `strom edge` |
| materiál čekající na roztřídění | `strom input list` |

- **Hranice:**
  - Pořadí kroků: konzistence výzkumu, linie, které stojí, staré žádosti, rozhodnutí, prázdná fronta, opravy Stromu,
    ověření po liniích (nejvíc údajů první), konce větví, materiál.
  - Linie stojí, když je aktivní a nemá ve frontě úkol. Prázdná fronta je krok jen při aktivní linii.
  - Archiv a ukázkový výzkum vynechají linie, frontu, žádosti, ověření, konce větví a čekání úkolů.
  - Výstup je v jazyce výzkumu, s `--lang` v jiném.
- **Ovládání:** terminál:
  - `strom health` celý strom; `--scope line:G…` jedna linie, `--scope person:P…` jedna osoba;
  - `--json` výstup pro programy;
  - `--save` uloží výstup jako zprávu C… (stav „uloženo“);
  - `strom health list` uložené zprávy od nejnovější, 10 nejnovějších (`--all` všechny);
    bez zprávy „zatím žádná zpráva …“;
  - `strom health show C…` jedna zpráva.
- **Platí od:** výzkum 1.38.0

<!-- zdroj: research:d8742230, 3f541f54, 818a015b src/commands/health.ts (register health, health list, health show; builtinLines; stepWords → příkazy; „  1. {what} → {command}“; edges.people.slice(0, 8)) · src/core/health.ts builtin (archive), stepsOf (pořadí, stuck, queue-empty), SENT_OLD_DAYS 30, STEPS_MAX 10, EDGE_PEOPLE_MAX 50 · src/core/live.ts GET /health/builtin · assets/lang/cs.json ui.health.head, check.ok, check.problem, growth, lines, line.*, queue, queue.empty, sent, decide, fixes, verify, edges, material, batches, tasks, citations, steps, step.*, saved, list.none, run.state.built · help: strom help health, health list, health show · CHANGELOG.cs.md 1.38.0 „Kontrola stromu“ -->
