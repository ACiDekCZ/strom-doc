<a id="S11"></a>
# S11 Ochrana žijících osob

Údaje žijících osob odcházejí ze stromu do souborů, na papír a ke sdílení. Aplikace i výzkum rozlišují dva druhy
výstupů. Výstup **ven** (soubor nebo papír, který jde z ruky, jinému člověku nebo jinému programu) vždy projde jednou
ochranou žijících: stejné pravidlo, kdo je žijící, stejné režimy ve stejném pořadí a stejný výchozí režim
z Nastavení. Výstup **pro sebe** (záloha, přenos, vlastní rodopisný program) nese plná data záměrně a řekne to větou.
Kapitola popisuje aplikaci Strom 3.33.0 a výzkum 1.38.0.

| Výstup | Druh | Kde |
|---|---|---|
| **Aplikace i s daty (HTML)**, **GEDCOM › Ke sdílení s ostatními**, **Tabulka osob (CSV)** | ven | [S11.4](#S11.4), [A7.7](A7-book-pages-and-export.md#A7.7), [S6.6](S6-tree-from-another-program.md#S6.6) |
| **Poslat rodině** a balíček změn | ven | [S11.4](#S11.4) |
| **Plakát** | ven | [S11.4](#S11.4) |
| **Kniha rodu**, **Propojené stránky** | ven | [A7.4](A7-book-pages-and-export.md#A7.4), [A7.5](A7-book-pages-and-export.md#A7.5) |
| okno **Stránky rodu** a jeho tisk | ven | [S11.4](#S11.4) |
| **Stránka osoby**: okno, tisk, **Uložit jako HTML** | ven | [S11.4](#S11.4), [A7.6](A7-book-pages-and-export.md#A7.6) |
| **Uložit stránku domu** | ven | [S10.3.2](S10-houses.md#S10.3.2) |
| export Tabulky (CSV, XLSX), CSV seznamu | ven | [A6.7.9](A6-views.md#A6.7.9), [A11.9](A11-lists-of-people.md#A11.9) |
| **Darovat rodokmen** | ven | [A7.9.2](A7-book-pages-and-export.md#A7.9.2) |
| výzkum: `strom export gedcom --living` | ven | [S11.7](#S11.7) |
| **Záloha dat (JSON)**, **Uložit do souboru**, **Zálohy** | pro sebe | [S11.5](#S11.5), [S6.5](S6-tree-from-another-program.md#S6.5) |
| **GEDCOM › Zpět do {program}**, GEDCOM pro výzkum | pro sebe | [S11.5](#S11.5), [S6.6](S6-tree-from-another-program.md#S6.6) |
| výzkum: `output/tree.ged`, `strom pack` | pro sebe | [S11.5](#S11.5) |

- **Hranice:** kanály uvnitř nejsou výstup a ochrana se jich netýká: most mezi aplikací a výzkumem, telefon v síti
  a agenti výzkumu.

<!-- zdroj: dirigent:spec/151-soukromi-zijicich-ve-vystupech (Princip 1–4, Kde se to ukáže) · app:61f9b492, 11d35186, 47500acc, fe52bfb2, bda4fd2c, fbc447a0, 355a550d, 51223455, 0ad8f5e9 (ověřeno na 988b0f86) · src/privacy.ts applyOutputPrivacy · src/ui/privacy-block.ts privacyBlockHtml · strings.ts privacy.label · CHANGELOG.cs.md aplikace 3.33.0 „Ochrana žijících osob“ · research:ccfe4110, 8a0fed12 src/gedcom/privacy.ts, src/commands/output.ts · CHANGELOG.cs.md výzkumu 1.38.0 -->

<a id="S11.1"></a>
## S11.1 Kdo je žijící osoba

Pro všechny výstupy aplikace i výzkumu platí jedno pravidlo. Rozhoduje se v tomto pořadí:

1. Osoba označená ručně jako zemřelá (**Zemřel/a**) je zemřelá. Osoba, které se **Zemřel/a** ručně odškrtlo, je
   žijící.
2. Osoba se záznamem úmrtí je zemřelá: datum, místo, adresa, příčina nebo věk úmrtí, nebo pohřeb či kremace.
   Pohřeb nebo kremace bez data úmrtí tedy znamená zemřelou osobu.
3. Osoba bez jakéhokoli vodítka k roku narození je žijící (bezpečná volba).
4. Jinak je žijící, když od jejího nejpozdějšího možného roku narození uplynulo méně než 110 let.

- **Nejpozdější možný rok narození:**
  - každé datum se bere podle nejpozdějšího roku, který může znamenat: rozpětí podle konce, „po roce X“ nedává mez;
  - vlastní data a události osoby;
  - začátek svazku a jeho události (ohlášky, sčítání domácnosti): nejméně 14 let před nimi. Konec svazku (podaný
    rozvod, prohlášení za neplatný) se nepočítá;
  - děti: rodič je nejméně o 12 let starší než dítě, přes všechny generace.
- **Výzkum** soudí totéž podle plného souboru GEDCOM celého stromu: úmrtí je každý řádek `DEAT`, `BURI` nebo `CREM`;
  vodítka jsou datované údaje osoby (kromě `CHAN` a vlastních značek `_`), údaje rodiny `FAM` (kromě `DIV`, `DIVF`,
  `ANUL`) a děti. Ruční **Zemřel/a** jde do souboru jako úmrtí; ručně odškrtnuté **Zemřel/a** soubor nenese.
  Aplikace a výzkum mají společnou tabulku případů v testech.
- **Hranice:**
  - značka † u osoby ve stromu je jiné pravidlo (domněle zemřelá po 120 letech) a ochranu neřídí;
  - výzkum pro řízení vlastní práce (žijící se nezkoumají) má své pravidlo se 100 lety; pro výstupy neplatí;
  - zástupná osoba se mezi žijící nepočítá.
- **Ovládání:** zaškrtávátko **Zemřel/a** v úpravě osoby; při přidání příbuzného se zaškrtne samo, když se vyplní
  datum nebo místo úmrtí. Nápověda bloku ochrany pravidlo shrne.
- **Platí od:** aplikace 1.2.0 (dřív jako [A7.1](A7-book-pages-and-export.md#A7.1)); pohřeb a kremace jako úmrtí,
  rozpětí dat podle konce a výzkum: aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:61f9b492 src/privacy.ts isLivingPerson (isDeceased true/false, hasDeathRecord, bez meze = žijící, ASSUMED_MAX_AGE 110), inferBirthUpperBounds (latestYearOf, UNION_END_EVENTS, MIN_MARRIAGE_AGE 14, MIN_PARENT_AGE 12, fixpoint), countLivingPersons (bez isPlaceholder), presumedDeceasedSet · src/ui/person-modal.ts:2118 (deceasedToggled → isDeceased) · src/ged-exporter.ts:1892 (isDeceased true) · strings.ts privacy.who, person.deceased · research:ccfe4110 src/gedcom/privacy.ts ASSUMED_MAX_AGE, MIN_PARENT_AGE, MIN_MARRIAGE_AGE, latestYear, OWN_FACT, ENDS, livingOf · src/core/review.ts livingBorn, DEATH_AFTER_YEARS (beze změny) · test/fixtures/living-rule-cases.json (obě repa) -->

<a id="S11.2"></a>
## S11.2 Režimy ochrany

Každý výstup ven nabízí stejné čtyři režimy ve stejném pořadí.

| Režim | Jméno žijící osoby | Co zůstane |
|---|---|---|
| **Plná data** | beze změny | vše |
| **Iniciály + rok narození** | iniciály jména a příjmení; příjmení po sňatku jen iniciála | rok narození |
| **Jen příjmení** | „Žijící osoba“ a příjmení | – |
| **Skrýt jména** | „Žijící osoba“ bez příjmení | – |

- **Co režim kromě Plných dat žijícím odebere:** data, místa, adresy, věky a příčinu; poznámky, vyprávění, fotku
  i originál portrétu; události, citace, varianty jména, tituly, příjmení po sňatku, otevřenou otázku, e-maily,
  REFN, údaje výzkumu a údaj o přidání a změně.
- **Páry:** svazek, ve kterém je žijící aspoň jeden partner, ztratí data, místo, adresu, věky, poznámku, svědky,
  vyprávění, citace, události a fotku svazku. Iniciály ponechají rok začátku svazku.
- **Zemřelí:** zůstávají celí ve všech výstupech a při každém režimu, i s prameny, citacemi a přílohami. Pramen,
  který cituje jen žijící osoba, vypadne; přílohy žijících a jejich svazků vypadnou.
- **Dál:** historie sloučení se do chráněného výstupu nedává; dům, kde žili lidé posledních zhruba 100 let, ztratí
  název ([S10.3.2](S10-houses.md#S10.3.2)).
- **Hranice:** struktura zůstává vždy: osoby, vztahy a pohlaví. Text vyprávění se nepřepisuje: vyprávění žijící
  osoby vypadne s jejími údaji, vyprávění o domě řídí přepínač výstupu
  ([S10.14.2](S10-houses.md#S10.14.2)).
- **Ovládání:** blok **Ochrana žijících osob** v dialogu výstupu: nadpis, odkud je režim ([S11.3](#S11.3)),
  nápověda **?**, čtyři volby a věta režimu s „Zemřelí zůstávají celí, i s prameny.“ Na telefonu mají volby krátké
  názvy (**Plná data**, **Iniciály**, **Jen příjmení**, **Bez jmen**).
- **Platí od:** aplikace 1.2.0 (dřív jako [A7.2](A7-book-pages-and-export.md#A7.2)); jednotné názvy, pořadí
  a prameny zemřelých ve všech výstupech aplikace 3.33.0

<!-- zdroj: app:61f9b492 src/privacy.ts PRIVACY_ORDER, privacyModeLabel, stripDetails, stripPartnershipDetails, applyLivingPrivacy (merges, house name, keepDeceasedSources) · fe52bfb2 applyOutputPrivacy (keepDeceasedSources: true všude) · src/ui/privacy-block.ts privacyBlockHtml, privacyDescText · strings.ts privacy.label, modeFull, modeInitials, modeMinimal, modeAnonymous, short, desc.*, deceasedStay, livingPerson · dirigent:spec/151 K1.2, K1.4, Mimo rozsah (vyprávění) -->

<a id="S11.3"></a>
## S11.3 Výchozí ochrana z Nastavení

Výchozí režim všech výstupů ven je jeden: **Nastavení › Data a soukromí › Ochrana žijících ve výstupech**, výchozí
**Iniciály + rok narození**. Volba v dialogu platí pro ten jeden výstup.

- **Předvyplní ho** export (HTML, GEDCOM ke sdílení, CSV), **Poslat rodině**, plakát, export Tabulky a uložení
  stránky domu. Blok pak u nadpisu napíše „výchozí z Nastavení“ s odkazem do Nastavení; po ruční změně to zmizí.
- **Pro každý strom si volbu pamatují** kniha rodu a propojené stránky (společně), stránka osoby a dárek. Když strom
  volbu ještě nemá, kniha, stránky a stránka osoby vezmou výchozí z Nastavení. Zapamatovaná volba má u nadpisu
  „naposledy pro tento strom“.
- **Okno Stránky rodu** začne volbou knihy a stránek stromu, jinak výchozí z Nastavení. Změna v okně platí jen pro
  okno a zpět se nezapisuje.
- **Plakát** vezme výchozí z Nastavení při prvním otevření a dál drží poslední volbu, dokud je stránka otevřená.
- **Dárek** začíná vždy **Iniciálami + rokem narození** (ne z Nastavení) a pamatuje si volbu u osoby nebo páru na
  tomto zařízení ([A7.9](A7-book-pages-and-export.md#A7.9)).
- **Bez žijících:** když ve výstupu žijící osoba není, blok je sbalený do věty „Ve výstupu nejsou žijící osoby.“
  a výstup jde s plnými daty. Stránka osoby bez žijících začne Plnými daty.
- **Hranice:** zálohy a přenos zůstávají plné, Nastavení je neřídí ([S11.5](#S11.5)). Poloha domů má vlastní volbu
  **Poloha domů ve výstupech** ([S10.3.4](S10-houses.md#S10.3.4)).
- **Ovládání:** **Nastavení › Data a soukromí › Ochrana žijících ve výstupech**; odkaz „Nastavení“ v bloku ochrany.
- **Platí od:** aplikace 3.33.0; výchozí podle výstupu dřív v [A7.2.1](A7-book-pages-and-export.md#A7.2.1)

<!-- zdroj: app:61f9b492 src/settings.ts getOutputPrivacy (výchozí initials), index.html output-privacy-setting · src/ui/privacy-block.ts originHtml (settings | tree), noLiving · strings.ts privacy.settingTitle, settingDesc, originSettings, originSettingsLink, originTree, noLiving · src/ui/encryption-ui.ts exportPresetPrivacy, exportPrivacyTouched · bda4fd2c src/ui/share-ui.ts, src/ui/export-image-ui.ts posterPrivacyChoice, src/ui/gift-tree-ui.ts (defaultGiftPrivacy others initials, originTree) · 355a550d src/ui/book-ui.ts:1262 (strom.book.{treeId}, jinak Nastavení), src/ui/family-pages-ui.ts windowPagesPrivacyPreset, src/ui/person-page-ui.ts:718, src/person-page.ts personPageExportPrivacy · 51223455 src/ui/house-page-ui.ts:578 · fbc447a0 src/ui/table-view/table-ui.ts showTableExport -->

<a id="S11.4"></a>
## S11.4 Výstupy ven

Každý výstup ven má blok **Ochrana žijících osob** ([S11.2](#S11.2)) s výchozím režimem podle [S11.3](#S11.3).
Podrobnosti dialogů jsou u výstupů; tady jen to, co je u kterého jinak.

- **Export:** **Aplikace i s daty (HTML)**, i **Exportovat jako aplikaci** pro všechny stromy, **GEDCOM › Ke sdílení
  s ostatními** a **Tabulka osob (CSV)**. Žijící se počítají v rozsahu exportu (celý strom, pohled, seznam,
  rodokmen osoby). Ruční volba zůstane i po přepnutí formátu ([A7.7](A7-book-pages-and-export.md#A7.7),
  [S6.6](S6-tree-from-another-program.md#S6.6)).
- **Poslat rodině:** výchozí z Nastavení při každém otevření; žijící se počítají v rozsahu (celý strom, větev,
  osoba). Rozsah **Jen změny od posledního sdílení** volbu nemá: balíček změn jde se stejnou ochranou jako původní
  sdílení („Změny se sdílejí se stejnou ochranou jako původní sdílení: {režim}.“). Když původní ochrana známá není
  (sdílení ze starší verze), použije výchozí z Nastavení a řekne to.
- **Plakát:** dialog **Export jako plakát** (SVG, PNG, Tisk / PDF). Žijící se počítají mezi osobami plakátu.
  Značka † a barvy linií jdou z chráněných dat: † mají jen osoby, které pravidlo [S11.1](#S11.1) má za zemřelé.
- **Kniha rodu** a **Propojené stránky:** žijící se počítají v celém stromu. Obálka chráněné knihy řekne „Údaje
  žijících osob jsou zkrácené.“; s Plnými daty stránky upozorní, že ponesou údaje žijících
  ([A7.4](A7-book-pages-and-export.md#A7.4), [A7.5](A7-book-pages-and-export.md#A7.5)).
- **Okno Stránky rodu:** volba v liště okna **Ochrana: {režim} ▾** (na telefonu první položka **⋯**), jen když jsou
  v okně žijící. Okno i jeho tisk ukazují stránky podle ní.
- **Stránka osoby:** okno má v liště tutéž volbu před **Tisk**; okno i tisk se řídí jí („Okno i tisk z okna podle
  této volby. Předvyplněno z uložení stránky osoby.“). **Uložit jako HTML** má blok za názvem souboru a pod ním
  řádek, koho se týká („Týká se jen žijících: …“) ([A7.6](A7-book-pages-and-export.md#A7.6)).
- **Tisk** z okna Stránky rodu a ze stránky osoby má pod chráněnými stránkami patičku „… · chráněno: {režim} ·
  strana N“, jen když jsou na nich žijící.
- **Uložit stránku domu:** jména žijících a lidí posledních zhruba 100 let podle režimu
  ([S10.3.2](S10-houses.md#S10.3.2)).
- **Export Tabulky** (CSV, XLSX) a **CSV seznamu:** řádek žijící osoby zůstane; má jméno podle režimu, rok narození
  jen u Iniciál a sloupce **#** a **Hotovo**, ostatní sloupce jsou prázdné („Žijící: jméno podle ochrany, ostatní
  sloupce prázdné.“). Chráněné XLSX nemá barvy ani komentáře nálezů. Tabulka na obrazovce se nemění
  ([A6.7.9](A6-views.md#A6.7.9), [A11.9](A11-lists-of-people.md#A11.9)).
- **Darovat rodokmen:** stejné názvy a pořadí režimů pro **Ostatní žijící**; domácnost obdarovaného a výjimky jsou
  plně ([A7.9.2](A7-book-pages-and-export.md#A7.9.2)).
- **Chráněný soubor** (HTML, JSON, GEDCOM) nese značku, kolik žijících chrání ([S11.6](#S11.6)).
- **Hranice:** bez žijících ve výstupu jde všechno s plnými daty a značky není.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:11d35186, fe52bfb2 src/ui/encryption-ui.ts exportPresetPrivacy, exportLivingCount, src/ui/import-export.ts:589 (applyLivingPrivacy, privacyMarkFor) · bda4fd2c src/ui/share-ui.ts (getBaselinePrivacy ?? Nastavení), strings.ts share.samePrivacy, share.privacyUnknown, share.scopeChanges · src/ui/export-image-ui.ts posterPrivacyMode, :475 (deceased = !living) · 355a550d src/ui/book-ui.ts, strings.ts book.coverProtected, familyPages.privacyWarn · src/ui/family-pages-ui.ts winPrivacy, windowSetLiving · src/ui/person-page-ui.ts pv-compact, strings.ts privacy.compactPrefix, windowLine, personPage.privacyWho · 0ad8f5e9 src/ui/privacy-block.ts windowPrintFooterCss, privacy.printProtected, printPage · 51223455 src/ui/house-page-ui.ts · fbc447a0 src/ui/table-view/table-privacy.ts protectTableExport (LIVING_KEPT, checks null), table-ui.ts exportPersonListCsv, strings.ts table.exportPrivacyWhat, exportListTitle · src/ui/gift-tree-ui.ts (PRIVACY_ORDER, privacyModeLabel) -->

<a id="S11.5"></a>
## S11.5 Výstupy pro sebe

Výstupy pro zálohu a přenos nesou plná data všech osob, i žijících. Když strom žijící má, řeknou to větou:
„Obsahuje všechny údaje žijících osob – pro vlastní zálohu nebo přenos, ne ke sdílení.“

- **Záloha dat (JSON)** a **Exportovat všechny stromy › Exportovat jako JSON:** začnou **Plnými daty** bez původu
  a s větou; blok jde změnit. Chráněná záloha nese značku ([S11.6](#S11.6)).
- **Zálohy** (okno **Historie záloh**): věta pod oknem, když má strom žijící
  ([S6.5](S6-tree-from-another-program.md#S6.5)).
- **GEDCOM › Zpět do {program}:** bez bloku ochrany; místo něj věta a počet: „Soubor obsahuje údaje N žijících osob.
  Patří jen do vlastního programu.“ ([S6.6](S6-tree-from-another-program.md#S6.6)).
- **GEDCOM pro výzkum:** **Poslat úpravy do výzkumu › Exportovat GEDCOM** má větu v potvrzení.
- **Uložit do souboru** (rychlé uložení, Ctrl+S) se nemění: plný JSON bez bloku a bez věty
  ([S8.1](S8-where-the-data-are.md#S8.1)).
- **Výzkum:** `strom export gedcom` zapíše plné `output/tree.ged` (a soubor pro aplikaci Strom) jako dosud a vypíše
  větu; `strom pack` vypíše větu také. Nápověda obou to říká.
- **Hranice:** věta se v aplikaci ukáže jen u stromu s žijícími; výzkum ji vypíše u každého plného souboru.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:47500acc src/ui/encryption-ui.ts isSelfFormat (json, all), exportPresetPrivacy (full, origin null), :853 self · src/ui/export-gedcom-ui.ts:196 export-back-living (selfOnly + exportGed.livingNote) · index.html:40323 snapshots-self, src/ui/snapshots-ui.ts:76 · src/ui/research-ui.ts:3388 offerResearchGedcom selfLine · strings.ts privacy.selfOnly, exportGed.livingNote, research.sendHowTitle, sendExportGedcom · research:ccfe4110 src/commands/output.ts (ui.living.all u plného souboru), src/commands/pack.ts, assets/lang/cs.json ui.living.all · dirigent:spec/151 K3.1 -->

<a id="S11.6"></a>
## S11.6 Chráněný soubor a jeho import

Soubor s ochranou žijících o sobě řekne, jakým režimem vznikl a kolik žijících chrání. Takový soubor není nikdy zdrojem
změn stromu: chybějící údaje žijících by vypadaly jako smazané.

- **Značka:** GEDCOM v hlavičce `1 _STROM_PRIVACY initials|surname|hidden` a `2 _LIVING N`; JSON a data souboru HTML
  pole `privacy` (`mode`, `living`). Režimy se v souboru jmenují jako ve výzkumu: Jen příjmení `surname`, Skrýt
  jména `hidden`. Plná data a výstup bez žijících značku nemají. Chráněný soubor nikdy nenese vazbu na výzkum.
- **Import v aplikaci:**
  - souhrn importu GEDCOM, **Importovat jako nový strom** a krok 1 průvodce sloučení řeknou: „Soubor je chráněný
    ({režim}): údaje N žijících osob v něm chybí.“;
  - průvodce začne volbou **Nový strom**; nový strom se jmenuje „{soubor} (chráněná kopie)“;
  - s **Přidat do stromu** krok 1 dodá „Žijící se přidají jako chránění (bez údajů).“ Spojená chráněná osoba
    nepřepíše ve stromu jména ani data;
  - vazba JSON na výzkum se nepřevezme;
  - soubor výzkumu s ochranou se nikdy neotevře jako strom výzkumu ani ho neaktualizuje a živé sledování ho
    odmítne; jde jen do průvodce importu ([A2.1.1](A2-loading-a-family-tree.md#A2.1.1),
    [A8.6](A8-merging-trees.md#A8.6)).
- **Výzkum:**
  - `strom sync` chráněný GEDCOM i JSON aplikace s polem `privacy` odmítne: „{soubor} je soubor s ochranou žijících
    ({režim}): údaje N žijících osob v něm chybí — nikdy zdroj změn“, s radou vzít plný export z aplikace;
  - `strom intake` ho uloží jen jako materiál, do stromu ho nepřevezme.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:47500acc src/privacy.ts PrivacyMark, PRIVACY_MARK_FIELD, privacyFileMode, parsePrivacyFileMode, readPrivacyMark, privacyMarkFor, privacyMarkJson, protectedPersonIds · src/ged-exporter.ts _STROM_PRIVACY, _LIVING · src/ged-parser.ts:5661 privacyMarkOf · src/ui/import-export.ts:607 (bez research), :818 openGedcomGuide protectedImport, :977 gedcom-protected, :1436 pendingImportPrivacy (bez research), :1500 protectedCopyName, :1930 import-tree-protected · src/merge/ui.ts:233 (initialMode new), :726 protectedIds · src/merge/plan.ts:306, :496 · src/merge/write.ts:106 newTreeName · src/merge/steps/step1-what.ts merge-s1-protected, merge-s1-protected-merge · src/ui/research-ui.ts:2869, :4394, :4990 header.protected · strings.ts privacy.importProtected, importProtectedMerge, protectedCopyName · research:ccfe4110 src/gedcom/privacy.ts jsonPrivacyOf, treeFilePrivacyOf · src/core/sync.ts:1738 tree.protected · src/commands/intake.ts:328 ui.intake.protected -->

<a id="S11.7"></a>
## S11.7 Ochrana v souborech výzkumu

`strom export gedcom` zapisuje do `output/` plné soubory jako dosud. Soubor ke sdílení s ochranou žijících vznikne
volbou `--living`, nebo podle nastavení `gedcom.living`.

- **Režimy:** `--living initials` (iniciály + rok narození), `surname` (jen příjmení), `hidden` (skrytá jména),
  `full` (plná data); jdou i názvy aplikace `minimal` a `anonymous`. Holé `--living` vezme nastavení `gedcom.living`,
  a když je plné, `initials`. Neznámý režim je chyba.
- **Co chráněný soubor nese:**
  - žijící osoba jméno podle režimu, pohlaví a vazby; u Iniciál rok narození;
  - rodina se žijícím partnerem partnery, děti a údaj o sňatku či rozvodu; u Iniciál rok sňatku;
  - na žijící osobu neukazuje žádný jiný záznam; pramen, který citují jen žijící, se vynechá;
  - zemřelí jsou, jak byli;
  - hlavička má značku ([S11.6](#S11.6)) a žádnou vazbu na výzkum.
- **Kam jde:**
  - bez `--out`: `output/tree-<režim>.ged` (s `--research G…` `output/G…-<režim>.ged`, pro aplikaci
    `…-strom-<režim>.ged`). Takové soubory jsou v `.gitignore` a do historie výzkumu nejdou nikdy;
  - `--out <soubor>` mimo složku výzkumu; chráněný soubor jinam do složky výzkumu je chyba („soubor s ochranou
    žijících jde do složky výzkumu jen jako {soubor} (nikdy do historie)“). Cesta k vlastnímu souboru v `output/`
    pod jiným zápisem (velká písmena, odkaz) se zapíše jako ten soubor.
- **Nastavení `gedcom.living`** („Ochrana žijících v souborech GEDCOM ven“, výchozí plná data):
  - `--out` bez `--living` píše podle něj;
  - když není plné, `strom export gedcom` bez `--out` a `--living` zapíše k plným souborům i chráněný.
- **Výpis:** u chráněného souboru „chráněno: N žijících osob ({režim})“. U plného souboru věta z [S11.5](#S11.5)
  a rada „→ soubor ke sdílení s ochranou žijících: strom export gedcom --living“, když chráněný nevznikl.
- **`--research G…`** dá jen osoby jednoho výzkumu: ústřední osobu, její předky a partnery. Sourozence a boční
  větve vynechá. Žijící chrání jen `--living`; obě volby jdou spolu.
- **Hranice:** `output/tree.ged` zůstává plný a v historii jako dosud. Aplikace nic z toho nevolá; jde jen
  o terminál.
- **Ovládání:** terminál: `strom export gedcom --living [režim]`, `--out`; `strom config set gedcom.living <režim>`
  (i `--for-tree`, proměnná `STROM_GEDCOM_LIVING`); příklady `strom export gedcom --living --out ~/Desktop/horakovi.ged`
  a `strom export gedcom --for standard --living surname`.
- **Platí od:** výzkum 1.38.0

<!-- zdroj: research:ccfe4110 src/gedcom/privacy.ts LIVING_MODES, MODE_ALIASES, livingModeOf, protectGedcom · src/commands/output.ts gedFile (-<režim>), IGNORE (output/*-<režim>.ged), export gedcom (setting, living, beside, holdsPath, pathForms, export.living.in-tree, export.living.mode, inTree bez living, ui.export.living, ui.living.all, ui.export.living.hint), help --research, --living, --out · 8a0fed12 (vlastní soubor output/ pod jiným zápisem, odkazy) · src/core/config.ts:376 gedcom.living (STROM_GEDCOM_LIVING, tree, výchozí full) · src/core/phrases.ts log.setting.name.gedcom.living · assets/lang/cs.json ui.living.mode.*, ui.error.export.living.in-tree · strom help export gedcom -->
