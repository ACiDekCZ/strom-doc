<a id="A6"></a>
# A6 Pohledy a výběr osob

Jak aplikace Strom vybírá, které osoby ukáže, a jak je ukazují jednotlivé pohledy. Popisuje aplikaci 3.21.2; změny z novější verze mají u sebe její číslo.

Pohled je jiné čtení **téhož výběru osob**. Výběr určuje ústřední osoba (ta, na kterou se klikne) a hloubka
**Předci** a **Potomci**. Rodina, Potomci, Časová osa a Mapa ukazují stejné okolí ústřední osoby. Vějíř si
předky a potomky počítá sám podle počtu generací ([A6.4](#A6.4)). Tabulka ukazuje celý strom ([A6.7](#A6.7)).

| Pohled (cs) | en | de | pl |
|---|---|---|---|
| **Rodina** | Family | Familie | Rodzina |
| **Potomci** | Descendants | Nachkommen | Potomkowie |
| **Časová osa** | Timeline | Zeitleiste | Oś czasu |
| **Vějíř** | Fan | Fächer | Wachlarz |
| **Mapa** | Map | Karte | Mapa |
| **Tabulka** | Table | Tabelle | Tabela |

<!-- zdroj: app:src/types.ts:1237 ViewMode · strings.ts viewModeSwitch.* · Tabulka od aplikace 3.27.0 (viewModeSwitch.table) -->

<a id="A6.1"></a>
## A6.1 Okolí ústřední osoby v pohledu Rodina

Pohled Rodina ukazuje ústřední osobu v její rodině, ne celý strom.

- Do výběru patří:
  1. ústřední osoba a všichni její partneři;
  2. její potomci do hloubky **Potomci**, s partnery;
  3. přímí předci přes oba rodiče do hloubky **Předci**;
  4. sourozenci, i nevlastní (jejich druhý rodič se nepřidává), s partnery a potomky do hloubky Potomci;
  5. tety a strýcové (sourozenci rodičů) s partnery;
  6. bratranci a sestřenice, tedy děti tet a strýců zapsané v jejich svazku, s potomky do hloubky Potomci.
- **Hranice:** předci partnera ústřední osoby se do výběru nepřidávají nikdy. Kdo do okolí nepatří, ve stromu
  zůstává, jen ho pohled neukazuje; ukáže ho nová ústřední osoba.
- **Hloubka:** po výběru nové ústřední osoby je Předci i Potomci nastavená na největší hloubku, kterou strom u té
  osoby má. Nabídka dává 1 až tuto největší hloubku. Děti partnera z jiného svazku přidávají jednu generaci dolů.
- **Ovládání:** klik na kartu osoby; volby **Předci** a **Potomci** v liště pohledu.
- **Platí od:** aplikace 1.0.0

<!-- zdroj: app:src/layout/pipeline/1-select-subgraph.ts selectSubgraph · src/layout/pipeline/index.ts:962 includeSpouseAncestors: false · src/renderer.ts:719 computeTreeLayout, setFocus (maxGenerations) · src/focus-depth.ts maxAncestorDepth, maxDescendantDepth · strings.ts focus.ancestorsLabel, focus.descendantsLabel -->

<a id="A6.1.1"></a>
### A6.1.1 Výchozí osoba a pohled

S čím se strom otevře, určuje nastavení stromu **Výchozí osoba a pohled**.

| Volba | Možnosti |
|---|---|
| osoba | **Naposledy zobrazená** · **Konkrétní osoba:** (vybraná) |
| pohled | **Rodina** · **Naposledy použitý** (na tomto zařízení) |

- **Hranice:** bez nastavení se strom otevře na první osobě stromu. Obnovení stránky drží strom, pohled
  i ústřední osobu.
- **Ovládání:** správa stromů, u stromu **Výchozí osoba a pohled**.
- **Platí od:** výchozí osoba aplikace 1.0.0; volba pohledu a obnovení stránky aplikace 3.21.0

<!-- zdroj: app:src/renderer.ts:1178 findDefaultFocusPerson, getStartupFocus · strings.ts treeManager.defaultPersonViewTitle, focus.defaultPersonLastFocused, focus.defaultPersonSpecific, focus.defaultViewFamily, focus.defaultViewLast · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.2"></a>
## A6.2 Pohled Potomci

Pohled Potomci ukazuje jen ústřední osobu a její potomky do hloubky Potomci: bez předků, tet, strýců
a bratranců.

- **Jen pokrevní** (výchozí): pokrevní potomci ústřední osoby.
- **Úplné rodiny**: navíc další svazky partnerů a jejich nevlastní děti, znevýrazněně.
- **Ovládání:** přepínač v liště pohledu; výchozí volbu drží nastavení **Pohled Potomci**.
- **Platí od:** pohled aplikace 1.4.0; Úplné rodiny aplikace 1.9.2

<!-- zdroj: app:src/layout/pipeline/index.ts includeAuntsUncles: !descendantsOnly, expandLineageOnly: descendantsOnly && !isDescendantsFullFamilies() · strings.ts viewModeSwitch.bloodOnly, viewModeSwitch.fullFamilies, viewModeSwitch.settingLabel · settings descendantsFullFamilies (výchozí false) -->

<a id="A6.3"></a>
## A6.3 Časová osa

Časová osa ukazuje osoby pohledu jako pruhy života na ose let.

- Řádek dostane jen osoba s rokem narození. Ostatní pohled spočítá a napíše „N osoby bez roku narození nejsou
  zobrazeny“. Zástupné osoby (prázdné místo pro neznámého rodiče) se vynechávají.
- Pořadí řádků: rok narození, pak jméno bez titulů.
- Pruh žijící osoby sahá do dneška. Zemřelá osoba bez data úmrtí má pruh do poslední známé události a otevřený
  konec.
- Rok sňatku se bere z data začátku svazku. Osa je zaokrouhlená na desetiletí.
- Pod osou let běží řádek dějin ústřední osoby (události doby a míst jejího života, symboly druhů). Bez výzkumu
  nebo bez takových událostí řádek není.
- **Platí od:** časová osa aplikace 1.5.0; řádek dějin aplikace 3.19.0

<!-- zdroj: app:src/timeline.ts computeTimelineModel, :59 TimelineHistory · strings.ts timeline.omitted · CHANGELOG.cs.md 3.19.0 -->

<a id="A6.4"></a>
## A6.4 Vějíř

Vějíř ukazuje předky ústřední osoby v kruhových výsečích, generaci po generaci.

- **Tvar:** **Půlkruh** · **Celý kruh** · **Oboustranný** (předci i potomci).
- **Generace** předků 3–10, výchozí 5. V tvaru Oboustranný **Potomci** 1–5, výchozí 3.
- Číslování předků: 1 je ústřední osoba, otec osoby n má číslo 2n, matka 2n+1. Otcova linie je vlevo.
  Čísla u výsečí zapíná nastavení **Vějíř** „Zobrazit Kekulého (ahnentafel) čísla předků“ (výchozí vypnuto).
- Rodiče jsou první dva zapsaní rodiče osoby. Vztah, který není biologický (adopce, nevlastní, pěstoun), je
  u výseče označený.
- Předek, který se ve vějíři objeví podruhé, se nakreslí znovu, ale dál se nerozvíjí; legenda **↻ opakuje se
  (implex)**. Volba **Ukázat první výskyt** skočí na jeho první místo.
- Potomci (tvar Oboustranný): svazky v pořadí sňatků (datum sňatku, pak pořadí v datech), děti podle narození.
  Neznámý partner sbírá děti bez druhého rodiče. Svazek bez dětí je vidět jen u ústřední osoby.
- **Barvy:** **Pohlaví** · **Linie** (čtyři linie prarodičů: otcův otec, otcova matka, matčin otec, matčina matka) ·
  **Rody** ([A4](A4-surnames-and-families.md)).
- **Původní osoba** vrátí vějíř na osobu, ze které se vyšlo.
- **Platí od:** vějíř aplikace 1.8.0; nový vějíř s tvary, barvami a implexem aplikace 3.20.0
- **Od aplikace 3.27.0:** svazek bez data sňatku se řadí podle nejpozdějšího možného data sňatku: dřívějšího z konce
  svazku (rozvodu) a narození prvního dítěte svazku. Sňatek „před 1982“ jde před sňatek v roce 1982. Svazek bez
  těchto dat jde za ostatní. Stejné pořadí mají partneři vedle osoby a značky pořadí manželství („1. ∞“) na kartách.

<!-- zdroj: app:src/fan-chart.ts FAN_MIN_GENERATIONS, FAN_MAX_GENERATIONS, FAN_DEFAULT_GENERATIONS, parentSlots, repeatOf · strings.ts fan.shapeHalf, fan.shapeFull, fan.shapeTwo, fan.colorGender, fan.colorLine, fan.colorRod, fan.legendRepeats, fan.originPerson, fan.showFirst, fanChart.kekuleHint · settings fanKekule (výchozí false) · spec 029 · CHANGELOG.cs.md 3.20.0 · 3.27.0: app:ad1ca16c src/marriage-order.ts marriageKey (BOUND 0.5, qualifier „<“; bez sňatku min(endDate, narození dětí)), marriageDates, compareMarriages, marriagesInOrder (partneři vedle osoby, značka „1. ∞“) · src/fan-chart.ts familiesOf · CHANGELOG.cs.md 3.27.0 · dirigent:prace/1109-app-tester-vlna1 (T50, T13) -->

<a id="A6.5"></a>
## A6.5 Mapa

Mapa ukazuje místa událostí osob.

- **Rozsah:** **Tento pohled** (výchozí, osoby pohledu) · **Celý strom**.
- **Druhy:** **Narození** · **Úmrtí** · **Sňatky** · **Ostatní události**. Výchozí jsou zapnuté všechny; volba
  se pamatuje na zařízení.
  - Křest se počítá k narození, pohřeb a kremace k úmrtí.
  - Zasnoubení, ohlášky, povolení ke sňatku a svatební smlouvy se počítají ke sňatku. Ostatní události páru jsou
    Ostatní události.
- Místo sňatku se ukáže, když je v pohledu aspoň jeden z partnerů.
- Místo se píše v nejčastějším zápisu. Obec je jeden bod i s čísly domů; místo s vlastními přesnými souřadnicemi
  zůstává samostatným bodem.
- **Platí od:** mapa aplikace 1.10.0; druhy událostí a body obcí aplikace 3.21.0

<!-- zdroj: app:src/places.ts collectPlaces, groupTownPoints · src/ui/map-ui.ts (localStorage strom.map.kinds) · strings.ts map.scopeView, map.scopeTree, map.kinds · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.5.1"></a>
### A6.5.1 Odkud mapa bere polohu místa

Ve vlastním stromu (bez výzkumu) dohledá polohu míst aplikace sama, ve službě OpenStreetMap (Nominatim). Pošle jen
název místa, jak je zapsaný ve stromu, a jen se souhlasem. Ve stromu z výzkumu ztotožňuje místa výzkum
([R4](R4-places.md)).

- **Hranice:**
  - před prvním dohledáním se aplikace zeptá (**Dohledat souřadnice online?**). Odejdou jen názvy míst, žádná jména,
    data ani vztahy. Nejvýš jeden dotaz zhruba za sekundu;
  - souřadnice se uloží do stromu: každé místo se dohledá jednou a mapa pak funguje i bez připojení;
  - automatické dohledání vezme **první výsledek** služby pro zapsaný název. Do aplikace 3.23.0 při tom stejnojmenné
    obce nerozlišilo: místo tak mohlo padnout do obce stejného jména jinde. Polohu, která do stromu nesedí, označí
    **Ověřit** ([R4.4.1](R4-places.md#R4.4.1));
  - jen místo s číslem domu, které služba nenašla, se dohledá podle obce. Z obcí toho jména se vybere ta nejblíž
    ostatním místům stromu („Obec toho jména je víckrát; vybrána ta nejblíž ostatním místům stromu.“); u místa stojí
    **Poloha podle obce**;
  - **od aplikace 3.24.0** se nejbližší obec vybírá u každého místa: když se dvě a víc obcí jmenují přesně jako
    zapsané místo (bez ohledu na velikost písmen a diakritiku), vezme se ta nejbližší středu stromu, ne první
    výsledek. Střed je medián poloh zadaných ručně nebo potvrzených **Ponechat**, když jsou aspoň 3; jinak medián
    všech poloh stromu a míst, která dohledání našlo bez pochyb. Místo s dalším určením („Lhota u Kolína“,
    „Lhota 16“), jediná obec nebo strom bez poloh dostane první výsledek jako dřív. Pořád jde o jeden dotaz na místo;
  - kontrola místa řekne, kolik obcí toho jména mapa našla („Mapa našla 3 obce toho jména a vzala tu nejbližší
    ostatním místům stromu.“); od aplikace 3.24.0, dřív vždy „dvě“;
  - poloha, která už ve stromu je, se nepřesune: dohledání hledá jen místa bez polohy. Ani sloučení s jiným stromem
    nebo souborem GEDCOM nepřepíše polohu zadanou ručně nebo potvrzenou **Ponechat**, jen doplní chybějící. Špatnou
    starší polohu jde přesunout jen ručně;
  - co se nenajde, zůstane bez polohy. Aplikace nic nehádá: „pomůže opravit zápis nebo doplnit zemi“.
- **Ovládání:** aplikace: **Nastavení → Dohledávat místa online**; v okně míst **Špatné místo? Opravit**, **Najít toto
  místo pod jiným názvem** (připojí se jen poloha, zápis ve stromu se nemění), **Použít i pro další čísla domů v …**,
  **Vyčistit osiřelá místa (n)**.
- **Proč:** dohledání míst je jediná část aplikace, která něco posílá ven; proto jen se souhlasem, jen názvy a každé
  místo jednou (komentář v kódu). Limit jednoho dotazu za sekundu je podmínka služby.
- **Platí od:** aplikace 1.10.0; **Špatné místo? Opravit** 1.10.1; **Vyčistit osiřelá místa** 2.1.0; poloha podle obce
  3.21.0; nejbližší stejnojmenná obec u každého místa a počet obcí v kontrole 3.24.0

<!-- zdroj: app:src/geocode.ts hlavička, REQUEST_INTERVAL_MS=1100, geocodePlace (limit 1, parseGeocodeResponse první výsledek), geocodeTown/pickTownHit nearestTo (od v3.21.0), geocodePlaces townFallback · app:src/strings.ts map.consentTitle, consentBody, settingLabel, wrongSpot (v1.10.1), searchLabel, attachOnly, useForOthers, cleanOrphans (v2.1.0), nearestTown, byTown, doneWithMisses · FB podnět 2026-11-04 (stejnojmenná obec) · od 3.24.0: geocode.ts treeCenter (medián, PERSONS_CENTER_MIN=3), sameNamedTowns, pickPlaceHit (townChoices), buildGeocodeUrl limit · place-check.ts multi count · strings.ts checkMulti(n) · merge-executor test (ruční poloha zůstane) · commit 046967d -->

<a id="A6.5.2"></a>
### A6.5.2 Místa mimo mapu dohledat ve výzkumu

U stromu s výzkumem nabízí stavový pruh mapy místa bez polohy k dohledání ve výzkumu ([R4.4](R4-places.md#R4.4)).
Tlačítko otevře okno **Místa** s náhledem; do fronty výzkumu jdou místa až po **Zařadit**.

- **Hranice:**
  - před dohledáním mapou stojí v pruhu vedle dohledání mapou **Ve výzkumu**. Po dohledání, když mapa některá místa
    nenašla, pruh ukáže „N míst na mapě · K mapa nenašla“ a **Dohledat ve výzkumu (K)**, případně „N k potvrzení ›“
    (otevře **Čeká** v panelu výzkumu);
  - tlačítko je jen u stromu s výzkumem a jen když je co dohledat: místo bez polohy nebo neztotožněné, které ještě
    není ve frontě, nepracuje se na něm a nečeká na odpověď;
  - okno **Místa** ukáže náhled „Dohledat ve výzkumu N míst mimo mapu“. Před **Zařadit N míst** se nic nezařadí
    a žádné místo se nezařadí dvakrát;
  - když výzkum běží na jiném počítači, nebo jde o telefon, aplikace místo okna řekne, kde dohledání jde: „Dohledat
    a prověřit jde ve výzkumu na počítači, kde běží. Stav míst se sem přenáší se stromem.“, na telefonu „Dohledat
    a prověřit jde na počítači s výzkumem. Na otázky k místům jde odpovědět i odsud, v Čeká.“ Starší výzkum: „Tato
    verze výzkumu místa ještě nedohledává.“;
  - při sledování výzkumu na mapě ([S4.1.3](S4-research-from-the-app.md#S4.1.3)) řádek „… – bez polohy na
    mapě“ nabízí **Dohledat ve výzkumu**: zařadí to jedno místo hned, bez náhledu; zařazení jde vrátit
    v oznámení.
- **Ovládání:** aplikace: mapa → stavový pruh → **Ve výzkumu**, po dohledání mapou **Dohledat ve výzkumu (K)** →
  okno **Místa** → **Zařadit N míst**.
- **Platí od:** aplikace 3.25.0

<!-- zdroj: app:src/ui/map-ui.ts (stavový pruh, lookResearch, lookable), src/ui/place-actions.ts, src/ui/places-research-ui.ts (bulkLook, bulkLookHead, bulkLookGo, nic dvakrát), src/ui/map-follow-ui.ts (noCoords + places.research.look, Undo) · strings.ts map.onMap.notFound, lookResearch, lookResearchShort, lookResearchTitle, confirm; places.dialog.elsewhere, phoneLine, oldResearch · CHANGELOG.cs.md 3.25.0 · commit 2246ca28 · spec 058 -->

<a id="A6.6"></a>
## A6.6 Rod v pohledu

Pohled může zvýraznit jeden rod ([A4](A4-surnames-and-families.md)): jeho členy plně, manželky a manžele, kteří
do rodu přišli sňatkem, slaběji, ostatní potlačeně. Platí v pohledech Rodina, Potomci a Vějíř.

- Volba se pamatuje pro každý strom na zařízení. Rod, který už ve stromu není, se tiše zruší.
- Když v pohledu není nakreslený žádný člen rodu:
  - Rodina a Vějíř přesunou ústřední osobu na nejbližšího člena rodu (přes rodiče, děti a partnery; při shodě
    na staršího), a když s ním osoba není spojená, na zakladatele rodu;
  - Potomci přesunou ústřední osobu vždy na zakladatele;
  - lišta nabídne **↩ Zpět**.
- **Hranice:** obnovení volby z paměti ústřední osobu nepřesouvá.
- **Ovládání:** **Rody** v liště; v nabídce osoby **Jen rod …** (rodný rod osoby je první); konec přes × u štítku
  nebo **Ukázat celý strom**.
- **Platí od:** aplikace 3.21.0

<!-- zdroj: app:src/ui/rod-view.ts · src/rod-focus.ts (BFS přes rodiče, děti, partnery) · strings.ts rodView.only, rodView.whole, rodView.moved · spec 039 · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.7"></a>
## A6.7 Tabulka

Tabulka ukazuje celý strom po řádcích: každou osobu, nebo každý svazek, s údaji ve sloupcích. Slouží k hledání mezer,
rozporů a nálezů kontroly napříč stromem. Nezávisí na hloubce **Předci** a **Potomci**.
Pohled Tabulka vychází z tabulky od Ondřeje Chrpy.

- **Řádky:** přepínač **Řádky**: **Osoby** · **Svazky**. Každý typ řádků má vlastní sloupce, filtr a řazení.
  - **Osoby:** jeden řádek na osobu stromu; zástupné osoby (prázdné místo pro neznámého rodiče) se vynechávají.
  - **Svazky:** jeden řádek na svazek, který má aspoň jednoho skutečného partnera. **Partner 1** je ten z dvojice,
    kdo je pokrevní příbuzný hlavní osoby; jinak první partner svazku.
- **Hlavní osoba** je ústřední osoba stromu ([A6.1](#A6.1)). Podle ní se počítá sloupec **Vztah k hlavní osobě**
  a čip **Pokrevní příbuzní**: předci hlavní osoby (i ona sama) a všichni jejich potomci. Partneři, kteří do rodiny
  přišli sňatkem, mezi ně nepatří.
- **Generace** 1 je nejstarší generace stromu; partner má generaci svého partnera.
- **Žije** počítá jako ochrana žijících ([A7.1](A7-book-pages-and-export.md#A7.1)).
- Nad tabulkou je počet („42 z 120 osob“) a řazení („Řazení: …“). Pole **Hledat osobu...** v liště v tabulce
  řádek osoby vybere a posune na něj; ústřední osoba se nemění.
- **Hranice:**
  - zvýraznění rodu ([A6.6](#A6.6)) se v tabulce nepoužije; rod jde vybrat čipem **Rod** ([A6.7.6](#A6.7.6));
  - strom jen ke čtení (sledovaný strom, strom uložený novější verzí aplikace, zamčený strom) tabulka jen
    ukazuje: „Jen ke čtení: úpravy a „Není chyba“ tu nejsou.“ Prohlížení, filtr, řazení a export CSV fungují;
    pohled uložit, přejmenovat ani smazat nejde;
  - tabulka zvládne strom s 5 000 osobami.
- **Ovládání:** v liště pohledů **Tabulka** (za **Mapa**); v úzkém okně a na telefonu **Více → Pohled → Tabulka**.
  Pohled se pamatuje jako ostatní ([A6.1.1](#A6.1.1)).
- **Platí od:** aplikace 3.27.0

<!-- zdroj: app:src/ui/table-view/table-model.ts ROW_TYPES, buildTableModel (isPlaceholder ven, svazek aspoň s jedním skutečným partnerem), bloodOf (předci hlavní osoby a všichni jejich potomci), makeContext (homeId, isLivingPerson) · table-columns.ts unionPartners (pokrevní partner jako Partner 1), gen (assignGenerations + 1), kin (findRelationship, kinSelf) · src/ui/table-view/table-ui.ts tableReadOnly (isReadOnly: viewMode, isLocked, isNewerData) · src/data.ts:655 isReadOnly · src/ui/bottom-sheet.ts:443 (Více → Pohled: Vějíř, Mapa, Tabulka) · table-bar.ts countText, sortText · perf-budget test 5 000 osob · strings.ts viewModeSwitch.table, table.rows, rowType, rowTypeNote, countOf, sortedBy, readOnly, readOnlyShort · commity c34c47ff, 1b72e6d8 · spec 073 U2 · poděkování: Milan 10. 11. (dirigent:prace/1110-doc-tabulka, bod 4) · CHANGELOG.cs.md 3.27.0 · dirigent:prace/1110-app-tabulka-p1 -->

<a id="A6.7.1"></a>
### A6.7.1 Svazky v tabulce osob

Osoba se dvěma a více svazky má v tabulce osob vlastní řádek a pod ním podřádek pro každý svazek („Svazek 2 z 3“).
Řádek osoby má ve sloupci **Partner** počet („3 svazky“) a ostatní sloupce svazku prázdné.

- Svazky jdou po sobě podle data sňatku; svazky bez data jsou na konci v pořadí zápisu.
- **Sbaleno:** řádek osoby ukáže první svazek a počet ostatních. Výchozí je rozbaleno; vestavěný pohled **Mezery**
  má svazky sbalené.
- **Filtr ve sloupci svazku** se posuzuje u každého svazku zvlášť. Osoba zůstane, když vyhoví aspoň jeden svazek;
  ostatní se schovají pod řádek „2 svazky mimo filtr · ukázat“. Ukázané jsou znevýrazněné do další změny filtru.
- **Řazení podle sloupce svazku** bere první svazek, který vyhoví filtru.
- Osoba s jedním svazkem má jeho údaje přímo ve svém řádku.
- **Ovládání:** **Rozbalit svazky** / **Sbalit svazky** (na telefonu v nabídce **⋯**); klávesy → a ← ve sloupci
  **Jméno**, * pro všechny osoby; nabídka řádku. Stav se ukládá s pohledem ([A6.7.7](#A6.7.7)).

<!-- zdroj: app:src/ui/table-view/table-subrows.ts defaultUnionCollapse (collapsed: false), isExpanded, setAllExpanded, passingUnions, personPassesUnions, sortUnionOf, buildLines · table-model.ts unionsByDate (datum sňatku, bez data na konci v pořadí zápisu) · table-views.ts BUILTIN_VIEWS gaps (unions collapsed) · strings.ts table.unionsN, unionKofN, hiddenUnions, expandAll, collapseAll · commity 8833da14, 8192621d -->

<a id="A6.7.2"></a>
### A6.7.2 Sloupce

Sloupce jsou ve skupinách. Které jsou vidět a v jakém pořadí, je část pohledu ([A6.7.7](#A6.7.7)).

| Řádky | Skupiny sloupců |
|---|---|
| **Osoby** | **Osoba** · **Narození a křest** · **Rodiče** · **Svazky** · **Rozvod** · **Úmrtí a pohřeb** · **Události** · **Prameny** · **Spolehlivost a výzkum** · **Kontroly** |
| **Svazky** | **Pár** · **Sňatek** · **Rozvod** · **Děti a prameny** |

- **Jméno** (u svazků **Partner 1**) je ukotvené vlevo a řadí se podle příjmení, pak křestního jména.
  **Příjmení** je příjmení po sňatku, jinak rodné; **Rodné příjmení** je zapsané příjmení.
- **ID výzkumu** ukazuje jen číslo osoby z výzkumu (P…).
- **Události** (**Povolání**, **Bydliště**, **Vyznání**, **Vojsko**, **Vystěhování**, **Vzdělání**) ukazují
  každou hodnotu jednou, nejnovější první.
- Sloupce **Spolehlivost …** a **Jistota z výzkumu** mají hodnotu jen ve stromu z výzkumu
  ([S7](S7-reliability-and-verification.md)).
- **Hranice:** sbalená skupina je úzký pruh; ukazuje nejvyšší úroveň nálezu ve svých buňkách. Na telefonu je
  ukotvené jméno užší a hlavičku jde jen číst, ne měnit.
- **Ovládání:**
  - panel **Sloupce** („12 z 58“): **Hledat sloupec**, skupiny se zaškrtávátkem **vše**, přetažení pořadí,
    **Řádek pokrytí**, **Obnovit výchozí**, **Hotovo**;
  - nabídka v hlavičce sloupce: **Řadit vzestupně**, **Řadit sestupně**, **Přidat k řazení** (Shift + klik),
    **Filtr…**, **Ukotvit vlevo** / **Uvolnit**, **Posunout vlevo** / **Posunout vpravo**, **Skrýt sloupec**,
    **Sbalit skupinu …** / **Rozbalit skupinu …**; u dopočteného sloupce „Vypočteno z: …“;
  - šířka sloupce tažením okraje hlavičky.

<!-- zdroj: app:src/ui/table-view/table-columns.ts PERSON_GROUPS, UNION_GROUPS, katalog sloupců (surname marriedSurname || lastName, birthSurname lastName, researchId /^P\d{1,7}$/, eventValues nejnovější první, sortKey jména), pinnedWidth 156 na telefonu · table-state.ts MIN_COLUMN_WIDTH, BAND_WIDTH, lockedColumn · table-checks.ts bandSeverity · table-colpanel.ts panelGroups · table-headmenu.ts headMenuItems · strings.ts table.group.*, col.*, columns, columnsCount, searchColumn, all, pinnedLabel, resetColumns, done, coverageRow, sortAsc, sortDesc, sortAdd, sortAddHint, filterColumn, pin, unpin, moveLeft, moveRight, hide, collapseGroup, expandGroup, computedFrom · commity 89602f35, 49b96d92, e4a35406 -->

<a id="A6.7.3"></a>
### A6.7.3 Dopočtené a náhradní hodnoty

Co ve stromu zapsané není, ale jde z dat spočítat, tabulka dopočte. Nic přitom do stromu nezapisuje.

| Hodnota | Jak se počítá |
|---|---|
| věk (při narození dítěte, sňatku, úmrtí) | z dat s dnem přesně („67“); z roku, měsíce nebo rozsahu jako rozsah („28–29“); z data s cca, před nebo po jako odhad („≈ 67“) |
| náhradní datum a místo | bez narození křest („křt. 3. 5. 1850“), bez úmrtí pohřeb („pohř. …“); věk z nich je odhad (≈) |
| **Rozdíl zapsaného věku** | o kolik let je zapsaný věk mimo rozsah věku z dat („+3“, „−2“); slovní věk a věk s cca, před, po se neporovnává |
| **Délka svazku** | od sňatku do rozvodu, jinak do první smrti z dvojice |
| **Pořadí mezi sourozenci**, **Počet sourozenců**, **Počet dětí**, **Počet svazků**, **Počet pramenů** | z vazeb a pramenů stromu |

- Data mají slovo přesnosti před sebou (**cca**, **před**, **po**). Nejisté datum je podtržené tečkami; nález to
  není. Datum se řadí podle svého začátku.
- **Hranice:** věk se nepočítá, když konec předchází začátek. Sloupce úmrtí mají u žijící osoby **Nevztahuje se**
  (u **Úplnost úmrtí** „žije“). **Věk otce/matky při narození** bez zapsaného rodiče je **Nevztahuje se**.
- **Ovládání:** nápověda u buňky („Křest, narození neznámé“, „Pohřeb, úmrtí neznámé“); u dopočteného sloupce
  v nabídce hlavičky „Vypočteno z: …“; legenda **Značky** ([A6.7.5](#A6.7.5)).

<!-- zdroj: app:src/ui/table-view/table-columns.ts ageCell (přesně / rozsah ageRangeBetween / ≈ approxAgeBetween; nic, když konec před začátkem), dateCell, qualifierWord, birthOrBaptism, deathOrBurial (náhrada, ≈), gapCell (recordedAgeGap), unionLength, naCell, parentsOf · src/dates.ts:448 ageRangeBetween, recordedAgeGap · table-model.ts dateNumber (začátek rozsahu) · strings.ts table.na, living, subst.*, qual.*, computedFrom, from.* · commit 8833da14 -->

<a id="A6.7.4"></a>
### A6.7.4 Úplnost a řádek pokrytí

Sloupce **Úplnost …** říkají, kolik sledovaných polí je vyplněno, v procentech.

| Sloupec | Počítá se z |
|---|---|
| **Úplnost narození** | datum, místo, otec, matka, pramen |
| **Úplnost svazku** | datum, místo, partner, pramen sňatku |
| **Úplnost úmrtí** | datum, místo, pramen (ne u žijící osoby) |
| **Úplnost celkem** | narození, každý svazek a úmrtí, váženo počtem polí |

- Náhradní hodnota (křest, pohřeb) pole nevyplní. Nápověda u buňky vypíše, co chybí („chybí: místo narození,
  pramen narození“).
- **Řádek pokrytí** pod hlavičkou ukazuje u každého sloupce, kolik procent řádků má hodnotu („vyplněno 64 %“,
  nápověda „77 z 120“). Počítá jen řádky, které jsou právě vidět (po filtru a hledání). Buňky **Nevztahuje se**
  se nepočítají; u sloupců svazku se počítají svazky, které vyhoví filtru. Pod 50 % je číslo tučně; bez buňky,
  které by se týkal, je „–“.
- **Ovládání:** **Řádek pokrytí** v panelu **Sloupce** (na telefonu v **⋯**); ukládá se s pohledem.

<!-- zdroj: app:src/ui/table-view/table-columns.ts compCell, unionComp (pole a váhy, náhrada nevyplní) · table-coverage.ts cellFilled, columnCoverage, coverageCell, coverageLabel (LOW pod 50 %) · table-subrows.ts coverageUnionsOf · strings.ts table.compList.*, compField.*, missing, missingNone, compCounts, coverage, coverageOf · rozhodnutí Milan 10. 11. (spec 073, bod 5) · commit 8833da14 -->

<a id="A6.7.5"></a>
### A6.7.5 Nálezy kontroly v buňkách

Tabulka ukazuje nálezy Kvality dat ([A5](A5-tree-check.md)) přímo u údaje, kterého se týkají: buňka je
podbarvená a má značku úrovně. Kontrola běží nad celým stromem na pozadí, když je aplikace volná.

| Úroveň | Značka v legendě |
|---|---|
| **chyba** | „Údaje si odporují.“ |
| **k ověření** | „Neobvyklá hodnota, stojí za ověření.“ |
| **stopa** | „Stopa pro pátrání, není to chyba.“ |
| **neobvyklé** (☆) | „Nález označený „Není chyba“.“ |

- Nález jde do buňky údaje: věk rodiče při narození do **Věk otce/matky při narození** u dítěte, nález ke sňatku
  do věku a data sňatku, zapsaný věk do zapsaného věku a jeho rozdílu, úmrtí před narozením do obou dat a věku,
  událost do sloupce události, rozdíl věku partnerů do partnera, možná duplicita do jména, zápis místa do buněk
  s tím místem. Nález bez vlastní buňky je jen ve sloupcích kontrol.
- Sloupce skupiny **Kontroly**: **Nálezy** (počet; „…“, dokud kontrola běží), **Nejvyšší úroveň**, **Neobvyklé,
  ověřené** (počet nálezů označených **Není chyba**).
- Nález označený **Není chyba** ([A5.7](A5-tree-check.md#A5.7)) v buňce zůstane jako **neobvyklé** („Neobvyklé,
  ale ověřeno“) a nepočítá se do nálezů.
- **Hranice:** strom jen ke čtení nález označit nedovolí („Strom je jen ke čtení: nález nejde označit.“).
- **Ovládání:** klik na značku otevře bublinu (na telefonu panel zdola): úroveň, text nálezu, „Nález 1 z 2“ a
  - **Není chyba** (oznámení „Označeno: není chyba“ s **Vrátit**); u neobvyklého **Hlásit znovu**;
  - **Kvalita dat ›** otevře dialog Kvality dat na skupině tohoto nálezu; u neobvyklého na seznamu označených.

  Legenda **Značky** („Značky v buňkách“) vysvětluje i nejisté datum, spolehlivost, náhradní hodnotu, dopočet
  a **Nevztahuje se**.

<!-- zdroj: app:src/ui/table-view/table-checks.ts severityRank, parentAgeColumn, issueTargets (mapování nálezů na buňky), buildCheckIndex, CHECK_COLUMNS, applyChecks · table-ui.ts whenIdle (validateTreeData jednou), cellFindings · table-bubble.ts bubbleHeading, bubbleHtml, legendHtml, openBubblePanel, sheetElement · src/ui/tree-stats.ts showTreeValidationDialog (focus: skupina otevřená a posunutá; označené → seznam) · strings.ts table.sev.*, unusualChecked, notError, reReport, toQuality, dismissedToast, roNote, checksRunning, findingOf, legend, legendTitle, legendKind.*, legendText.* · commity 19cf28ea, e530019b, 59a8eed0 -->

<a id="A6.7.6"></a>
### A6.7.6 Filtr, hledání a řazení

Filtr vybere řádky, hledání je zúží dál, řazení určí pořadí.

- **Čipy** (jen tabulka osob): **Žijící**, **Zemřelí** (vylučují se), **Pokrevní příbuzní**, **Rod** (výběr rodů),
  **Generace** (rozsah), **Víc svazků**, **Bez data narození**, **Nejisté datum** (narození nebo úmrtí),
  **Bez pramene**, **S nálezem** (chyba nebo k ověření; stopa ne), **Neobvyklé**, **Nepotvrzené z výzkumu**
  (jen strom z výzkumu). Čipy nálezů čekají na kontrolu („Až doběhnou kontroly“). Co se nevejde, je v **Další (n)**.
- **Filtr ve sloupci** (**Filtr…** v hlavičce) podle druhu sloupce:
  - hodnoty ze seznamu (pohlaví, stav svazku, úroveň nálezu, rod …);
  - rozsah **od**–**do** (u data **Rok**, u věku, počtu a procent číslo);
  - text: **obsahuje** · **začíná**;
  - u každého **Jen prázdné** · **Jen vyplněné**.
- Platí všechny filtry zároveň. Počet filtrů je na **Filtry (n)**, vše ruší **Zrušit filtry**. Bez řádku:
  „Nic nevyhovuje filtru“.
- **Hledat v tabulce:** od 2 znaků, bez ohledu na velikost písmen a diakritiku, ve viditelných sloupcích i
  v podřádcích svazků; shody jsou zvýrazněné, nad tabulkou je jejich počet.
- **Řazení:** klik na hlavičku řadí vzestupně, další klik sestupně, třetí řazení zruší; řadí se jen podle toho
  sloupce. Shift + klik přidá sloupec jako další klíč (další klik ho otočí, třetí odebere). Šipka ↑ ↓ u hlavičky
  má číslo pořadí klíče. Prázdné hodnoty jsou vždy na konci, v obou směrech. Čísla v textu se řadí jako čísla.
- **Hranice:** hledání se do pohledu neukládá ([A6.7.7](#A6.7.7)).

<!-- zdroj: app:src/ui/table-view/table-filter.ts CHIP_ORDER, setChip (Žijící × Zemřelí), personPassesChip (finding: chyba nebo k ověření; unusual; unconfirmed jen researchTree, relN/relB/relD), CHECK_CHIPS, rodChoices, generationSpan, filterKindOf, cellPasses, foldText · table-filterbar.ts SEARCH_DELAY_MS, columnFilterForm, chipChoiceForm · table-state.ts řazení (vzestupně → sestupně → vypnuto; Shift přidá, otočí, odebere; prázdné na konci; Intl.Collator numeric) · strings.ts table.chip.*, chipRod, chipGen, moreN, filters, clearFilters, search, matches, noMatch, checksWait, matchContains, matchStarts, rangeFrom, rangeTo, rangeYears, onlyEmpty, onlyFilled · commity dd1d74bc, e64b8b06, fc746037 -->

<a id="A6.7.7"></a>
### A6.7.7 Pohledy tabulky

Pohled je uložené nastavení tabulky pod jménem. Vestavěné pohledy jsou hotová čtení stromu; vlastní pohled si
uloží člověk.

| Vestavěný pohled | Řádky | Co ukazuje |
|---|---|---|
| **Přehled** (výchozí pro osoby) | osoby | jméno, datum a místo narození, datum úmrtí, věk při úmrtí, partner, datum sňatku a věk při něm, nálezy, úplnost celkem; řazeno podle data narození |
| **Narození a rodiče** | osoby | narození a křest, rodiče, jejich věk při narození, úplnost narození; řazeno podle data narození |
| **Sňatky** (výchozí pro svazky) | svazky | pár, datum a místo sňatku, věk a zapsaný věk obou, stav, svědci, rozvod, děti, délka, prameny, úplnost; řazeno podle data sňatku |
| **Úmrtí** | osoby | úmrtí, příčina, pohřeb, věk a zapsaný věk při úmrtí, úplnost úmrtí; čip **Zemřelí**; řazeno podle data úmrtí |
| **Prameny a citace** | osoby | počet pramenů, doložení, spolehlivost narození a úmrtí; od nejméně pramenů |
| **Mezery** | osoby | úplnost celkem i po částech, narození, rodiče, prameny; od nejméně úplných; svazky sbalené |
| **Kontroly** | osoby | úroveň a počet nálezů, data, věk rodičů, sňatek; čip **S nálezem**; od nejvyšší úrovně, pak počtu nálezů |

- **Pohled ukládá:** typ řádků, sloupce (pořadí, šířky, ukotvení, sbalené skupiny), řádek pokrytí, filtr, řazení
  a rozbalení svazků. Neukládá hledání, výběr řádku ani posun.
- Změněný pohled má štítek **změněno** a volby **Uložit**, **Uložit jako nový**, **Zahodit změny**. Vestavěný
  pohled se nemění ani nejde přejmenovat či smazat; jeho změny jdou jen **Uložit jako nový**. Vlastní pohled:
  **Přejmenovat…**, **Smazat** (s potvrzením). Vlastní pohledy jsou seřazené podle jména.
- Rozpracovaný stav tabulky (i neuložené změny) si aplikace pamatuje pro každý strom na tomto zařízení; po obnovení
  stránky je tabulka, jak zůstala.
- **Uložené pohledy jsou součástí stromu** (verze dat 17): uložení, přejmenování i smazání má krok zpět a zápis
  v historii změn. Jdou se stromem do zálohy (JSON) a při oddělení části stromu i do nového stromu.
  GEDCOM je nenese; strom z výzkumu si je při načtení nové verze ponechá. Poškozený pohled se při načtení vynechá.
- **Hranice:** starší aplikace (od 3.19.0) otevře strom uložený aplikací 3.27.0 jen ke čtení a nikdy ho
  neuloží; po aktualizaci aplikace jde strom zase měnit.
- **Ovládání:** nabídka **Pohled** v liště tabulky (**Vestavěné**, **Vlastní**, **Uložit jako nový…**,
  **Přejmenovat…**, **Smazat**).

<!-- zdroj: app:src/ui/table-view/table-views.ts BUILTIN_VIEWS (7: overview, births, marriages, deaths, sources, gaps, checks), defaultViewId, viewFromState, viewChanged, uniqueViewName, customViews (podle jména), workStorageKey strom.table.{treeId}, readTableWork, writeTableWork · table-columns.ts výchozí sloupce pohledů (:683 Sňatky) · src/table-views-data.ts sanitizeTableView, keepTableViews (verze z výzkumu ponechá pohledy) · src/data.ts:298 sanitizeTableViews při načtení, :1720 saveTableView, deleteTableView (krok zpět, historie změn) · src/subtree.ts:148 · src/types.ts STROM_DATA_VERSION 17, StromData.tableViews · src/tree-manager.ts:630 isTreeNewer, src/data.ts:649 isNewerData (jen ke čtení, od aplikace 3.19.0) · src/ui/research-ui.ts, conflict-decide-ui.ts keepTableViews · strings.ts table.view, views.*, viewName.*, changed, save, saveAs, discard, builtinNote, saveAsMenu, renameMenu, deleteMenu, builtinLocked, viewWhat, deleteConfirm · commity d19a5942, c2d48747, 8ca649ff -->

<a id="A6.7.8"></a>
### A6.7.8 Akce u řádku a úpravy

Klik vybere řádek (i podřádek svazku); šipky, Page Up/Down a Ctrl+Home/End výběr posouvají, Esc ho zruší.

| Akce | Co udělá |
|---|---|
| **Ukázat ve stromu** | přepne na pohled Rodina s osobou jako ústřední osobou, vystředěnou a zvýrazněnou |
| **Otevřít osobu** (Enter) | otevře stránku osoby |
| **Upravit…** (dvojklik) | otevře úpravu osoby; u podřádku svazku a v tabulce svazků vztahy osoby na tom svazku |

- V tabulce svazků se akce týkají osoby **Partner 1**.
- Po úpravě oznámení „Uloženo: …“, řádek krátce blikne a řádky zůstanou v pořadí. Řádek, který už filtru
  nevyhovuje, zůstane se štítkem „nevyhovuje filtru“ do další změny řazení, filtru nebo pohledu. Změnu z výzkumu
  ohlásí „Výzkum změnil 3 údaje: …“.
- **Hranice:** ve stromu jen ke čtení **Upravit…** není.
- **Ovládání:** tlačítka u vybraného řádku, nabídka řádku (pravé tlačítko; i rozbalení svazků). Na telefonu
  klepnutí na řádek otevře panel s akcemi a se svazky („Svazek 1: … · Upravit ›“).

<!-- zdroj: app:src/ui/table-view/table-ui.ts tableMethods (tableRowAction: tree → Rodina, focus, highlight; open; edit → dialog osoby / panel vztahů na svazku), personOfRow (Partner 1), keepWork · table-refresh.ts keepOrder, watchEdit, changedKeys, bridgeChanges, namesList · table-grid.ts FLASH_MS · strings.ts table.act.*, dblClickHint, actionsOf, unionWith, editMore, staleRow, savedToast, bridgeToast · commity da6b9786, de46ae30, e4a35406 -->

<a id="A6.7.9"></a>
### A6.7.9 Export CSV

Export uloží tabulku, jak je vidět, do souboru CSV pro tabulkové programy.

- **Co jde ven:** viditelné sloupce v pořadí tabulky (sloupce sbalené skupiny celé) a řádky po filtru, hledání a
  řazení. Hodnoty jsou text, jak je tabulka píše: data v zápisu aplikace, „cca …“, „≈ 67“, „křt. …“, „–“.
  Značky nálezů a barvy se nevyvážejí.
- Osoba se dvěma a více svazky: první svazek, který vyhoví filtru, je v jejím řádku, každý další v pokračovacím
  řádku s prázdnými údaji osoby. Za jménem je sloupec **Svazek** („1 z 3“).
- **Soubor:** UTF-8 se značkou BOM, oddělovač středník, konce řádků CRLF; buňka, která by se v tabulkovém programu
  spustila jako vzorec, se zneškodní. Název `{strom}_{pohled}_{RRRR-MM-DD}.csv` bez diakritiky.
- **Ovládání:** **Export ▾** v liště tabulky (na telefonu v **⋯**) → „CSV · pro Excel a Tabulky Google“ →
  **Stáhnout CSV**; oznámení „Staženo: …“ s počtem osob, řádků a sloupců.
- **Hranice:** export z menu stromu (**Tabulka osob (CSV)**, [A7](A7-book-pages-and-export.md)) je jiný soubor
  s pevnými sloupci.

<!-- zdroj: app:src/ui/table-view/table-export.ts tableCsvField (neutralizace vzorců), buildTableCsv (BOM, ;, CRLF, pokračovací řádky, sloupec Svazek), fileNamePart, tableCsvFileName · table-viewbar.ts exportForm · strings.ts table.export, exportCsv, exportAll, exportFile, exportWhat, exportDownload, csvUnionCol, csvUnionOf, exportedToast · commit 2368683b -->
