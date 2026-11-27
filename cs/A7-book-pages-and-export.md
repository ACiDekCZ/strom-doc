<a id="A7"></a>
# A7 Kniha, stránky a export

Co aplikace Strom dává ze stromu ven (kniha rodu, stránky, soubory pro rodinu i pro jiné programy) a jak přitom
chrání žijící osoby. Popisuje aplikaci 3.21.2; změny z novější verze mají u sebe její číslo.

| Výstup | Co to je |
|---|---|
| **Kniha rodu** | kniha ke čtení od začátku, k tisku na A4 nebo uložení jako HTML ([A7.4](#A7.4)) |
| **Stránky rodu**, **Stránky stromu** | propojený soubor stránek rodů, rodin a osob ([A7.5](#A7.5)) |
| **Stránka osoby** | celý život jedné osoby, k prohlížení, tisku a uložení jako HTML ([A7.6](#A7.6)) |
| **Aplikace i s daty (HTML)** | samostatný soubor s aplikací a stromem ([A7.7](#A7.7)) |
| **Poslat rodině** | jeden soubor e-mailem k otevření, doplnění a poslání zpět |
| **Plakát** | aktuální pohled jako SVG, PNG nebo vícestránkové PDF |
| **Darovat rodokmen** | balíček ZIP s rodokmenem jedné osoby nebo páru: průvodní list, aplikace, stránky, kniha, vějíř, GEDCOM ([A7.9](#A7.9)) |
| **Záloha dat (JSON)**, **GEDCOM**, **Tabulka osob (CSV)** | data pro obnovení a pro jiné programy ([A2](A2-loading-a-family-tree.md)); vlastní sloupce, filtr a řazení: export z pohledu Tabulka ([A6.7.9](A6-views.md#A6.7.9)) |

- Zálohu a aplikaci s daty jde zašifrovat heslem (**Zašifrovat heslem**); GEDCOM ne. Šifrování funguje jen na zabezpečené
  adrese: přes https, na `localhost` nebo `127.0.0.1` a v souboru otevřeném z disku; na adrese `http://` v síti ne a dialog
  hesla to řekne ([A1.1](A1-the-app-in-brief.md#A1.1)).

<!-- zdroj: app:strings.ts importExport.app, importExport.share, importExport.poster, importExport.book, importExport.backup, importExport.gedcom, importExport.csv · src/ui/import-export.ts (exportTargetTreeJSON, exportTargetTreeApp s heslem; GEDCOM bez hesla) · šifrování jen na zabezpečené adrese: src/crypto.ts isCryptoAvailable, src/crypto-errors.ts resetPasswordError, strings.ts encryptToggle, insecureContext, commit 266d6a76, dirigent:prace/1110-app-github-11-13 -->

<a id="A7.1"></a>
## A7.1 Kdo je žijící osoba

Ochrana žijících ([A7.2](#A7.2)) se týká jen osob, které aplikace považuje za žijící.

1. Osoba označená jako zemřelá (**Zemřel/a**) je zemřelá; osoba, která má v datech výslovně „žije“, je žijící.
2. Osoba s datem úmrtí je zemřelá.
3. Jinak je žijící, když od jejího nejpozdějšího možného roku narození uplynulo méně než 110 let.
4. Osoba bez roku narození a bez jiného vodítka je žijící (bezpečná volba).

- Nejpozdější možný rok narození se bere z vlastních dat a událostí osoby, ze sňatku (nejméně 14 let před ním)
  a z dětí (rodič je nejméně o 12 let starší než dítě, přes další generace).
- **Hranice:** značka † u osoby ve stromu je jiné pravidlo (domněle zemřelá po 120 letech) a ochranu neřídí.
  Úmrtí potomka samo předka za zemřelého neoznačí.
- **Ovládání:** zaškrtávátko **Zemřel/a** v úpravě osoby; při přidání příbuzného se zaškrtne samo, když se vyplní
  datum nebo místo úmrtí.
- **Platí od:** aplikace 1.2.0; samočinné zaškrtnutí Zemřel/a aplikace 3.21.2

<!-- zdroj: app:src/privacy.ts:215 ASSUMED_MAX_AGE, :217 MIN_PARENT_AGE, :219 MIN_MARRIAGE_AGE, :229 isLivingPerson, inferBirthUpperBounds · presumedDeceasedSet · strings.ts person.deceased · CHANGELOG.cs.md 3.21.2 -->

<a id="A7.2"></a>
## A7.2 Ochrana žijících

Před výstupem ze stromu se volí, jak ukázat žijící osoby. V exportu se volba jmenuje **Soukromí žijících osob**,
v knize rodu **Ochrana žijících**.

| Volba | Jméno žijící osoby |
|---|---|
| **Plná data** | beze změny, nic se neskrývá |
| **Iniciály + rok narození** | iniciály jména a příjmení, rok narození zůstává; příjmení po sňatku jen iniciála |
| **Skrýt jména** | „Žijící osoba“, bez příjmení |
| **Ponechat jen příjmení** | „Žijící osoba“ a příjmení |

- Každá volba kromě Plná data žijícím odebere všechna data a místa, poznámky, vyprávění, fotku, události,
  citace, přílohy, varianty jména, tituly, příjmení po sňatku, otevřenou otázku, REFN a údaje výzkumu.
  U Iniciál zůstává rok narození.
- Údaje páru (data, místo, poznámka, svědci, vyprávění, události) zmizí, když je žijící aspoň jeden z partnerů.
  Iniciály ponechají rok začátku svazku.
- **Hranice:** struktura zůstává vždy: osoby, vztahy a pohlaví. Zemřelé osoby se nemění.
- **Prameny:** v exportu (Aplikace i s daty, JSON, GEDCOM) každá volba kromě Plná data vynechá katalog pramenů,
  citace a přílohy **u všech osob, i zemřelých** (aplikace to u volby napíše). Kniha rodu, stránky a stránka osoby
  berou prameny jen žijícím; pramen citovaný jen u žijících vypadne.
- **Platí od:** aplikace 1.2.0; prameny zemřelých v knize a na stránkách aplikace 3.18.0
- **Od aplikace 3.30.0:** žijící osoba ztratí s fotkou i originál portrétu; svazek se žijícím partnerem ztratí fotku
  svazku ([A12.7](A12-portrait-and-couple-photo.md#A12.7)).
- **Od aplikace 3.26.0:** export GEDCOM drží prameny a citace zemřelých v každé volbě; vynechá jen citace žijících
  osob a řekne to („U N žijících osob se vynechá K citací. Zemřelým prameny zůstanou.“, volba **Ponechat prameny**).
  Export Aplikace i s daty a JSON se nemění. Export GEDCOM se nejdřív ptá, **K čemu soubor je**: **Zpět do
  {program}** (plná data, prameny a ID programu), nebo **Ke sdílení s ostatními**
  ([S6.6](S6-tree-from-another-program.md#S6.6)).

<!-- zdroj: app:src/privacy.ts applyPrivacy (keepDeceasedSources) · strings.ts privacy.label, privacy.modeFull, privacy.modeInitials, privacy.modeAnonymous, privacy.modeMinimal, privacy.livingPerson, privacy.dropsSources · book.dlg.privacy · CHANGELOG.cs.md 3.18.0 -->

<a id="A7.2.1"></a>
### A7.2.1 Výchozí ochrana podle výstupu

| Výstup | Výchozí volba |
|---|---|
| Aplikace i s daty (HTML) | Iniciály + rok narození |
| GEDCOM | Iniciály + rok narození |
| Poslat rodině | Iniciály + rok narození |
| Kniha rodu | Iniciály + rok narození |
| Stránka osoby | Plná data, když na stránce není žádná žijící osoba; jinak naposledy zvolená, jinak Iniciály |
| Tabulka osob (CSV), Exportovat všechny stromy | Plná data |

- **Hranice:** Stránky rodu a Stránky stromu s chráněnou osobou nedělají vlastní stránku ani odkaz; v rejstříku je
  pod chráněným jménem. Když výběr obsahuje žijící osoby a ochrana je vypnutá, dialog upozorní, že soubor ponese
  jejich jména, data a místa.
- **Platí od:** aplikace 1.2.0; stránka osoby aplikace 3.18.0; kniha rodu aplikace 3.19.0
- **Od aplikace 3.26.0:** GEDCOM s volbou **Ke sdílení s ostatními** (výchozí) má Iniciály + rok narození, s volbou
  **Zpět do {program}** Plná data ([S6.6](S6-tree-from-another-program.md#S6.6)).

<!-- zdroj: app:src/ui/import-export.ts (výchozí privacy podle formátu) · src/book-options.ts:55 · src/person-page.ts:94, :104 personPageExportPrivacy · src/family-pages.ts:309 · src/ui/share-ui.ts · strings.ts familyPages.privacyWarn -->

<a id="A7.3"></a>
## A7.3 Obsah souboru

Při exportu se vedle ochrany volí **Obsah**: co se uloží do souboru.

| Předvolba | Fotky | Přílohy a výřezy pramenů | Poznámky | Zdroje a citace |
|---|---|---|---|---|
| **Kompletní archiv** | ano | ano | ano | ano |
| **Malý soubor k odeslání** | ne | ne | ano | ano |
| **Jen kostra** | ne | ne | ne | ne |

- **Hranice:** struktura stromu a jména zůstávají vždy. Pracovní dílna výzkumu (fronta, úkoly, koncepty
  vyprávění) se do exportu nedává nikdy. Volba ochrany může zdroje a přílohy vynechat i při Kompletním archivu
  ([A7.2](#A7.2)).
- **Od aplikace 3.30.0:** volba **Co exportovat** má vedle **Celý strom** a **Jen aktuální pohled** i **Seznam osob**:
  záloha JSON a GEDCOM jen s osobami seznamu ([A11.9](A11-lists-of-people.md#A11.9)).
- **Od aplikace 3.33.0:** **Co exportovat** má i **Rodokmen osoby…** ([A7.9.6](#A7.9.6)). **Jen aktuální pohled**
  a Rodokmen osoby jdou ve všech formátech exportu: **Poslat rodině**, **Aplikace i s daty (HTML)**, **Záloha dat
  (JSON)**, **Plakát**, **Kniha rodu**, **Propojené stránky**, **GEDCOM** a **Tabulka osob (CSV)**; dřív jen záloha
  JSON a plakát. Výstup pohledu se otevře na zaměřené osobě. Celý strom zůstává jen **Propojit se souborem…**.
- **Od aplikace 3.30.0:** **Fotky** jsou i originály portrétů a fotky svazků. Bez fotek zmizí i ty, také když se
  přílohy exportují; bez příloh zůstanou portréty bez propojení na originál
  ([A12.7](A12-portrait-and-couple-photo.md#A12.7)).
- **Platí od:** aplikace 2.4.0

<!-- zdroj: app:src/privacy.ts CONTENT_PRESETS, stripResearchWork · strings.ts privacy.contentLabel, privacy.presetComplete, privacy.presetSmall, privacy.presetSkeleton, privacy.dropsSourcesContent · 3.30.0: app:33fa6cd4 src/ui/import-export.ts scope 'list', strings.ts exportMenu.scopeLabel, scopeWhole, scopeView, scopeList · 3.33.0: app:index.html data-view-ok, data-person-ok (všechny volby kromě Propojit se souborem), src/ui/import-export.ts exportScoped (pohled: defaultPersonId = fokus), commit 6408f8f9, strings.ts exportMenu.scopePerson, familyPages.exportPages -->

<a id="A7.4"></a>
## A7.4 Kniha rodu

Kniha rodu je kniha ke čtení od začátku: rodokmen, rodiny po generacích, vyprávění a prameny.

- **Co do knihy:** **Celý strom** · **Rody** (jeden nebo víc) · **Předci osoby** · **Potomci osoby** (výběr osob
  [A7.4.1](#A7.4.1)).
- **Části knihy** v tomto pořadí: **Obsah**, **Rodokmen rodu**, **Rodiny** (vždy), **Vyprávění**, **Graf a časová
  osa života**, **Doba (dějiny)**, **Prameny**, **Výřezy zápisů a fotky**, **Další rodiny (malé rody)**,
  **Rejstřík osob**.
- Část bez obsahu se vynechá a dialog řekne proč: Vyprávění potřebuje vyprávění, graf jinou podrobnost než
  stručnou, Doba dějiny, Prameny citované prameny, Výřezy fotku nebo výřez. Další rodiny jsou jen v knize celého
  stromu.
- **Předvolba:** **Pro rodinu** (všechny části, běžná podrobnost, bez poznámek a údajů pro badatele) ·
  **Pro badatele** (plná podrobnost, poznámky, údaje pro badatele: stav doložení a rozpory,
  [R3.8](R3-verification-and-citation.md#R3.8)) · **Vlastní**. Výchozí je Celý strom, Pro rodinu, Iniciály + rok
  narození a jazyk aplikace.
- **Název** se tvoří podle výběru (název stromu, Rod X, Předci: jméno, Potomci: jméno) a jde přepsat.
- **Jazyk knihy** mění nadpisy a popisky; údaje ze stromu se nepřekládají.
- Volby se pamatují pro každý strom.
- **Ovládání:** export **Kniha rodu**; okno knihy: tisk na A4 a **Uložit jako HTML**.
- **Platí od:** aplikace 3.19.0; předvolba Vlastní aplikace 3.21.0
- **Od aplikace 3.30.0:** část **Výřezy zápisů a fotky** dává do kapitoly rodiny i fotku svazku nad události páru;
  strom, jehož jediné obrázky jsou fotky svazků, tu část nabídne ([A12.6](A12-portrait-and-couple-photo.md#A12.6)).
- **Od aplikace 3.33.0:** výběr **Dům** (kniha o jednom domě), část **Domy** a **Rejstřík domů**
  ([S10.10](S10-houses.md#S10.10)).

<!-- zdroj: app:src/book-options.ts (části, předvolby, výchozí :55) · strings.ts book.dlg.kind, book.dlg.parts, book.dlg.preset, book.dlg.lang, book.parts, book.unavailable · CHANGELOG.cs.md 3.19.0, 3.21.0 -->

<a id="A7.4.1"></a>
### A7.4.1 Výběr osob do knihy a stránek

| Výběr | Osoby | Pořadí |
|---|---|---|
| Celý strom | všechny osoby | podle narození |
| Rody | členové rodů s rodinami a manželky a manželé členů | kapitola na každý rod |
| Předci osoby | předci do zvoleného počtu generací a svazky, ze kterých členové pocházejí | generace po generaci, otec před matkou |
| Potomci osoby | potomci do zvoleného počtu generací přes syny i dcery, s partnery a všemi svazky | podle narození |
| Vybrané osoby (jen stránky) | jen vybrané osoby; rodina jen tehdy, když jsou vybraní oba partneři | – |

- **Hranice:** linii předků a potomků nesou rodiče biologičtí a osvojitelé. Nevlastní rodič a pěstoun linii
  nenesou. Otcem se rozumí rodič muž, biologický před osvojitelem.
- **Platí od:** aplikace 3.19.0; Vybrané osoby aplikace 3.21.0
- **Od aplikace 3.33.0:** výběr **Rodokmen osoby** (předci a jejich rodiny) v knize i ve stránkách: osoby výřezu
  daru zvolené osoby s volbou **Rodiny předků po** ([A7.9.1](#A7.9.1)); kapitoly rodin jdou po generacích od
  nejstarších předků. Název knihy je „Rodokmen: jméno“. V rodině kapitoly může být jmenované i dítě mimo výřez.

<!-- zdroj: app:src/lineage.ts selection, :279 isDescentLink · strings.ts book.dlg.kind, book.dlg.kindHint · 3.33.0: app:src/book-model.ts kind 'gift' (giftCutIds, giftLevels: generace od nejstarších), src/book-options.ts titleGift, src/ui/book-ui.ts giftDepth, commity 6408f8f9, 040aaaaf · dirigent:prace/1126-app-093-darovat-rodokmen (B5: kniha jmenuje i dítě mimo výřez) -->

<a id="A7.5"></a>
## A7.5 Stránky rodu a stránky stromu

Stránky jsou propojený soubor stránek: rod, rodiny a osoby s odkazy mezi sebou a s rejstříky osob, rodin,
příjmení a obcí.

- **Stránky rodu:** jeden nebo víc rodů ([A4](A4-surnames-and-families.md)).
- **Stránky stromu:** **Stránky celého stromu** (všechny rody a Další rodiny), **Vybrané osoby**, předci osoby
  se zvoleným počtem generací.
- Ochrana žijících a prameny podle [A7.2](#A7.2); výchozí Iniciály + rok narození.
- **Platí od:** Stránky rodu aplikace 3.20.0; Stránky stromu aplikace 3.21.0
- **Od aplikace 3.33.0:** volba **Domy**: domy s historií, rejstřík domů a stránka každého domu
  ([S10.10](S10-houses.md#S10.10)).

<!-- zdroj: app:src/family-pages.ts · strings.ts familyPages.menuItem, familyPages.treePages, familyPages.treePagesAction, familyPages.indexTitle · spec 026 · CHANGELOG.cs.md 3.20.0, 3.21.0 -->

<a id="A7.5.1"></a>
### A7.5.1 Dějiny na časové ose rodu

Časová osa rodu (**Časová osa rodu →** na stránce rodu) ukazuje dějiny v obcích rodu se symbolem jejich druhu.

- **Dějiny země nebo kraje** jsou svislé pruhy přes graf se symbolem druhu nahoře.
- **Místní dějiny** (**Dějiny místa**, **Z pramenů výzkumu**) obce, která má v grafu vlastní řádek, jsou symbol na
  řádku obce v barvě původu. Obec bez řádku má svislý pruh jako dějiny země.
- **Seznam:** řádek dějin má symbol druhu v barvě původu. Za textem je obec, u dějin země nebo kraje jejich název,
  jen když jsou dějiny rodu aspoň ze dvou zemí nebo krajů.
- **Druhy dějin:** druhá řada čipů pod **Druhy událostí**: **Vše** a druhy dějin na stránce, každý se symbolem.
  Zvolené druhy nechají jen své řádky, pruhy a symboly. Řada je jen při aspoň dvou druzích a jen se skriptem
  stránky; s vypnutým čipem **Dějiny** zmizí.
- Čip **Dějiny** v **Druhy událostí** má symbol druhu „jiné“.
- **Ovládání:** stránky rodu: **Časová osa rodu →**, čipy **Druhy událostí** a **Druhy dějin**
- **Platí od:** aplikace 3.31.0

<!-- zdroj: app:6caa471e src/family-pages-html.ts tlSymHtml, tlScopeClass, onRow (scope ≠ region a obec s řádkem → symbol na řádku, jinak pruh se symbolem sp-tl-bandsym), histChips (rodTimelineHistKinds > 1, js-only, Vše + druhy), řádek seznamu (symbol, place ?? region), čip hist se symbolem other, skript data-hk-off · src/rod-timeline.ts RodTimelineHistory scope, region (jen při ≥ 2 regionech), rodTimelineHistKinds · src/family-pages-css.ts (skrytí s vypnutými Dějinami) · strings.ts familyPages.tlLink, tlKindsLabel, tlKinds.hist, tlHistNote, tlHistKindsLabel, history.filterAll · dirigent:spec/121 „Časová osa rodu stejně jako hlavní osa“, Rozhodnutí 20. 11. (místní na řádku obce) -->

<a id="A7.6"></a>
## A7.6 Stránka osoby

**Stránka osoby** ukazuje celý život jedné osoby: data slovy, rodinu jako malý rodokmen, vyprávění, místa života
na mapě, osu života s dějinami, výřezy z matrik a prameny a oddíl **Pro badatele**.

- **Uložit jako HTML** vytvoří jeden samonosný soubor, který se otevře offline v každém prohlížeči. Skupiny
  obsahu a ochrana žijících jdou zvolit ([A7.2.1](#A7.2.1)); volba se pamatuje.
- **Od aplikace 3.28.0:** v okně aplikace vede **◎ Cesta předků na mapě ›** na cestu předků osoby v Migraci
  v čase ([A6.5.4](A6-views.md#A6.5.4)). Uložená stránka ho nemá. Stojí v oddílu **Místa života**; osoba s nejvýš
  jedním vlastním místem, která má předky na mapě, ho má na vlastním řádku tam, kde by oddíl byl.
- **Od aplikace 3.30.0:** galerie **Obrázky a dokumenty** začíná fotkou každého svazku osoby („{A} a {B} · fotka
  svazku“). Zvětšení portrétu s originálem má přepínač **Portrét** | **Celá fotka**, uložená stránka odkaz **Celá
  fotka**, když soubor tu fotku nese. ⋯ **Další akce** nabízí **Upravit výřez portrétu**
  ([A12.3](A12-portrait-and-couple-photo.md#A12.3), [A12.6](A12-portrait-and-couple-photo.md#A12.6)).
- **Ovládání:** nabídka karty osoby, **Stránka osoby**; také z vějíře.
- **Platí od:** aplikace 3.18.0

<!-- zdroj: app:src/person-page.ts · strings.ts personPage.save, fan.personPage · CHANGELOG.cs.md 3.18.0 · 3.28.0: app:src/person-page-map.ts pp-map-path (jen mode app), src/ui/person-page-ui.ts personPageMapPath, commit 34e82d43 · mapPathRowHtml (bez oddílu Místa života), commit caea192a -->

<a id="A7.7"></a>
## A7.7 Uložené HTML (samostatný soubor)

**Aplikace i s daty (HTML)** uloží aplikaci a strom do jednoho souboru, který se otevře v každém prohlížeči bez
instalace. **Exportovat jako aplikaci** v **Exportovat všechny stromy** dá všechny stromy do jednoho souboru.

- Takový soubor má vlastní úložiště v prohlížeči. S aplikací na stromapp.info se **nesynchronizuje**; změny
  zachová **Uložit soubor** (stáhne kopii) a do webové aplikace se přenesou importem (**Ze Strom HTML**).
- **Hranice:** soubor ve výchozím stavu chrání žijící (Iniciály, [A7.2.1](#A7.2.1)).
- **Platí od:** aplikace 1.0.0

<!-- zdroj: app:strings.ts importExport.app, importExport.appDesc, importExport.exportAllApp, importExport.fromHtml, embeddedMode.* · src/ui/import-export.ts -->

<a id="A7.8"></a>
## A7.8 Vyprávění

Vyprávění je souvislý text o osobě nebo o manželství, sestavený nad fakty stromu. Není to pramen: fakta dokládají
prameny, vyprávění je jen převypráví ([A3.6](A3-evidence-in-the-app.md#A3.6)).

- **Kde je vidět:** okno **Vyprávění** (z nabídky karty osoby), stránka osoby ([A7.6](#A7.6)) a v knize rodu část
  **Vyprávění** až za **Rodinami** ([A7.4](#A7.4)). Vyprávění páru, jedno za každé manželství, stojí pod vyprávěním
  osoby; v knize má vlastní podkapitolu.
- **Formát textu:** prázdný řádek dělí odstavce; řádek `## …` je podnadpis; řádky `- …` jsou odrážky; `**tučně**`
  a `*kurzíva*`. Jiné značky zůstanou obyčejným textem. `* 1831` (narození) ani `1. ledna` na začátku řádku odrážku
  nezačnou. Úvodní `# …`, který jen opakuje podnadpis kapitoly, se vynechá. Holý kód pramene v textu se čte jako
  jeho název.
- **Hranice:**
  - vlastní vyprávění osoby jde psát a upravovat v úpravě osoby, oddíl **Vyprávění**: **Podnadpis kapitoly** a **Text
    vyprávění**. Oddíl je vidět, když je zapnuté **Nastavení → Karta osoby → Pokročilá pole** nebo už nějaký text
    existuje. Vyprávění páru a **Opírá se o** (fakta a výhrada autora) přicházejí se souborem a jsou jen ke čtení;
  - koncept od výzkumu, dosud neschválený, nese štítek **Návrh** a odkaz **Schválit ve výzkumu**. Nová verze od
    výzkumu čeká vedle schválené („Nová verze čeká“, **Porovnat**); úprava v aplikaci ji nezruší, rozhoduje se ve
    výzkumu ([R3.9.1](R3-verification-and-citation.md#R3.9.1));
  - v knize ani v tisku pod textem nejsou prameny; prameny vyprávění jsou očíslované v seznamu pramenů knihy;
  - v souboru GEDCOM je vyprávění ve vlastní značce `_STORY`, ne v poznámce.
- **Ovládání:** nabídka karty osoby → **Vyprávění**; úprava osoby → oddíl **Vyprávění**.
- **Platí od:** aplikace 2.8.0; vyprávění páru a stránka osoby 3.18.0; v knize rodu 3.19.0

<!-- zdroj: app:src/story-text.ts:1 storyProseHtml (odstavce, ##, -, **, *) · src/ui/person-modal.ts:662 fillStoryFields · index.html pm-story-section · src/book-blocks.ts:594 storyBlock · src/book.ts proseHtml · src/person-page.ts · src/ged-exporter.ts:449 pushStory _STORY · strings.ts story.* · commit 52000825 (aplikace 2.8.0) · CHANGELOG.cs.md 3.18.0, 3.22.0 -->

<a id="A7.9"></a>
## A7.9 Darovat rodokmen

**Darovat rodokmen…** připraví pro jednu osobu (obdarovaného) nebo pár jeden soubor ZIP s jejich kusem rodokmenu:
předci, rodiny kolem nich a vlastní domácnost, ne celý strom vlastníka. Průvodce má šest kroků: **Pro koho**,
**Kdo v rodokmenu bude** ([A7.9.1](#A7.9.1)), **Údaje žijících** ([A7.9.2](#A7.9.2)), **Co v balíčku bude**
([A7.9.3](#A7.9.3)), **Průvodní list** ([A7.9.4](#A7.9.4)) a **Náhled a vytvořit**.

- Výchozí osobou výřezu je obdarovaný; aplikace v balíčku se otevře na něm. Data stromu se nemění; výřez je jen
  rozsah výstupu, ne nový strom.
- **Pro koho:** **Jedna osoba**, **Pár** (jeden balíček pro dva; druhá osoba je navržena jako partner ze stromu) nebo
  **Seznam osob nebo výběr** ([A7.9.5](#A7.9.5)). Akce se nabízí jen u osoby, která má ve stromu aspoň rodiče,
  partnera nebo dítě.
- **Rovnou na náhled ›** přeskočí na krok 6 s výchozím nastavením nebo s nastavením z minula; každý krok jde upravit
  i potom.
- Balíček vzniká celý v prohlížeči; nic se nikam neposílá. Na počítači se ZIP po vytvoření hned stáhne; na
  telefonu se nestahuje sám a nabídne **Sdílet…** a **Uložit do Souborů**. Když prohlížeč stažení nepovolí, jde
  **Stáhnout znovu** bez nového vytváření, dokud je okno otevřené.
- Před vytvořením se ověří, zda prohlížeči stačí paměť ([A9.7.1](A9-using-the-app.md#A9.7.1)). Když paměť
  dojde, nic nevznikne a průvodce nabídne **Zkusit bez fotek** nebo **Bez aplikace**.
- Nastavení (výřez, údaje žijících, obsah, list) se uloží u osoby nebo páru na tomto zařízení, ne do dat stromu
  ani do exportu. Příští balíček pro ně začne z něj (**Nastavení z minula**; **Začít znovu s výchozím**) a řekne,
  kolik osob od minula ve výřezu přibylo nebo ubylo. Nabídka osoby ukazuje u akce datum posledního balíčku.
- **Ovládání:** nabídka karty osoby (pravé tlačítko, na telefonu dlouhý stisk) a ⋯ na stránce osoby: **Darovat
  rodokmen…**; **Akce › Pro rodinu › Darovat rodokmen…**; v okně **Rozdělit na rodiny** u volby **Z pohledu osoby**
  „Jen pro jednu osobu, bez rozdělení stromu: **Darovat rodokmen…**“ ([A14.4](A14-trees-and-structure.md#A14.4));
  nabídka seznamu osob a výběru: **Darovat rodokmen každé osobě…**; Export, rozsah **Rodokmen osoby…**, odkaz
  **Celý dárkový balíček…** ([A7.9.6](#A7.9.6)). V režimu čtení se akce nenabízí.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/ui/gift-tree-ui.ts (canGiftTree, giftMenuMeta, giftDownload jen na počítači, Sdílet/Uložit do Souborů na telefonu, confirmMemoryForOutput, GiftOutOfMemory → Zkusit bez fotek / Bez aplikace) · src/gift-guide.ts giftHasFamily, giftGuideStart, giftSuggestedPartner · src/gift-memory.ts (localStorage strom.gift.{treeId}, nikdy v datech) · src/gift-tree.ts giftCutData (defaultPersonId = obdarovaný) · src/ui/context-menu.ts gift-tree, src/ui/person-page-ui.ts, index.html Pro rodinu, src/ui/split-families-ui.ts splitfam-gift, src/ui/selection-picker-ui.ts, src/ui/person-list-hooks.ts · strings.ts giftTree.menu, title, stepNames, fast, menuList, splitLead, guide.mode, guide.lastH, restart, guide.cutChanged, make.share, make.saveFiles, make.downloadAgain, make.withoutApp, make.tryWithoutPhotos, review.local · dirigent:spec/093 K1.1, K2.4, K5.1, K5.4, K5.5 · dirigent:prace/1126-app-093-darovat-rodokmen (rozhodnutí B3) -->

<a id="A7.9.1"></a>
### A7.9.1 Kdo v rodokmenu bude (výřez)

Výřez je kus stromu z pohledu obdarovaného.

| Ve výřezu je vždy | Ve výřezu není |
|---|---|
| obdarovaný, jeho partneři a všichni jeho potomci s partnery | předci partnerů (partnerů obdarovaného i partnerů předků) |
| jeho sourozenci se všemi potomky a jejich partnery | osoby spojené s obdarovaným jen přes partnery |
| všichni dostupní přímí předci a jejich partneři | osoby bez vazby k obdarovanému (oddělené části stromu) |
| sourozenci každého předka s partnery (bez rodiny, když ji hloubka nebere) | zástupné osoby |
| nevlastní děti obdarovaného (děti jeho partnerů) s jejich rodinami | |

- **Rodiny předků po** (hloubka): **Nikdo** · **Bratranci** (sourozenci rodičů s rodinami) · **Druzí bratranci**
  (i sourozenci prarodičů s rodinami) · **Všichni** (všichni pokrevní příbuzní předků). Výchozí jsou Druzí bratranci.
  Rodina sourozence předka jsou všichni jeho potomci a partneři všech z nich.
- **Rodiny sourozenců předků:** u každého sourozence předka jde rodinu zaškrtnout nebo odškrtnout zvlášť, i mimo
  hloubku; odškrtnutý zůstane ve výřezu sám s partnery. Totéž v náhledu z nabídky karty (**Odebrat rodinu…**,
  **Přidat rodinu…**). U polorodého sourozence předka řádek řekne jeho druhého rodiče.
- Linii předků a potomků nesou rodiče biologičtí a osvojitelé, ne nevlastní rodič a pěstoun
  ([A7.4.1](#A7.4.1)).
- Pár: výřez je spojení výřezů obou.
- **Hranice:** osoba bez předků ve stromu má výřez jen sebe, partnery a potomky; průvodce to řekne a hloubka se
  nepoužije. Výřez od 600 osob průvodce ohlásí s odhadem velikosti balíčku.
- **Ovládání:** krok **Kdo v rodokmenu bude**: náhled s počtem osob a generací, **Rodiny předků po**, **Rodiny
  sourozenců předků**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/gift-tree.ts recipientCut (familySet up all, down all, width cousins, cousins = hloubka, spouses 'spouses', siblingFamilies = výjimky), stepchildrenOf (D5), giftCutIds (pár = sjednocení), giftBranchCandidates (half, otherParentId), GIFT_DEFAULT_DEPTH = 2 · src/lineage.ts familySet (sourozenci linie vždy, potomci předků do degree + 1, partneři krve), addDescendants, descentParents · src/__tests__/gift-tree.test.ts (hloubky, předci partnerů, ostrov) · strings.ts giftTree.cut.depthH, depth, depthDesc, branchesH, branchesNote, menuRemove, menuAdd, noAncestors, outLine, otherParent, largeLead · src/ui/gift-tree-ui.ts (≥ 600 osob) · dirigent:spec/093 K1.2, K1.3, K1.4 -->

<a id="A7.9.2"></a>
### A7.9.2 Údaje žijících v daru

Ochrana žijících ([A7.1](#A7.1), [A7.2](#A7.2)) se použije jednou nad výřezem a všechny části balíčku (aplikace,
stránky, kniha, vějíř, GEDCOM i průvodní list) dostanou stejná chráněná data. Co je skryté v jedné části, není
v žádné jiné.

- **Domácnost obdarovaného je vždy plně:** obdarovaný, jeho partneři kromě rozvedených a odloučených a jeho děti.
  U páru oba a děti každého z nich. Nevlastní děti jdou plně jen jako výjimka.
- **Výjimky:** v seznamu **Žijící v rodokmenu** zaškrtnutá osoba je plně (zaškrtnuté = plně).
- **Ostatní žijící:** volby ochrany z [A7.2](#A7.2), výchozí **Iniciály + rok narození**.
- **U žijících ukázaných plně** jde vypnout po druzích:

| Druh | Výchozí | Co vypnutí odebere |
|---|---|---|
| **Data narození** | ano | datum narození a křtu; zůstane rok |
| **Adresy a bydliště** | ano | adresy narození, úmrtí a událostí, adresu páru, události bydliště a sčítání |
| **Kontakty (e-mail, telefon)** | ne | e-maily osoby ([S6.9](S6-tree-from-another-program.md#S6.9)), řádky poznámek s e-mailem, vlastní řádky jiného programu (v nich telefony) |
| **Fotky** | ano | portrét a přílohy osoby |
| **Poznámky a příběhy** | ne | poznámky, vyprávění, otevřenou otázku |
| **Vyznání** | ano | údaj o vyznání ([R3.11](R3-verification-and-citation.md#R3.11)) a obřady: křest, biřmování, první přijímání, bar a bat micva, svěcení |
| **Prameny s osobními údaji** | ano | citace osoby a jejích událostí |

- **U zemřelých:** **Příčiny úmrtí**, **Poznámky a příběhy**, **Prameny a jejich snímky**; výchozí vše ponechat.
  Prameny zemřelých zůstávají i při ochraně žijících.
- Ve výchozím stavu tedy domácnost obdarovaného ponese adresy, ale ne e-maily, telefony a poznámky; ostatní žijící
  jen iniciály a rok narození. Když ochrana něco u žijících zkrátí, průvodní list to řekne v patičce.
- Bez fotek (krok 4) zmizí fotky, přílohy a výřezy pramenů u všech osob. Pracovní dílna výzkumu se do daru nedává
  nikdy ([A7.3](#A7.3)).
- **Ovládání:** krok **Údaje žijících**: **Žijící v rodokmenu**, **Ostatní žijící**, **U žijících ukázaných
  plně**, **U zemřelých**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/gift-tree.ts defaultGiftPrivacy (others initials; sensitive contacts:false, notes:false, ostatní true; dead vše true), giftHouseholdIds (bez rozvedených a odloučených; pár jen oba; děti každého), giftProtectedData (jednou před výstupy, keepDeceasedSources, stripResearchWork, stripMedia bez fotek), giftShortensLiving · src/privacy.ts LivingSensitive (komentář druhů), maskSensitive, maskSensitiveCouple, maskEvent, keepsEvent RELIGION_EVENTS, RESIDENCE_EVENTS, BIRTH_DATE_EVENTS, maskDeceased · strings.ts giftTree.guide.livingH, checkedFull, othersH, sensitiveH, sensitive, deadH, dead, giftTree.cover.shortened · test/vysledek-1126-app-093.md (Soukromí K6.2, K6.4) · dirigent:spec/093 K6.1–K6.4 -->

<a id="A7.9.3"></a>
### A7.9.3 Co v balíčku bude

ZIP `Rodokmen – <jméno> – <rok>.zip` má uvnitř složku `Rodokmen – <jméno>`:

| Soubor | Co to je |
|---|---|
| `Začít zde.html` | průvodní list s rozcestníkem ([A7.9.4](#A7.9.4)); je vždy |
| `Rodokmen (aplikace).html` | aplikace Strom s výřezem v jednom souboru ([A7.7](#A7.7)); otevře se offline na obdarovaném s uvítáním a vzkazem |
| `Stránky rodiny/` | stránky výřezu ([A7.5](#A7.5)) |
| `Kniha rodu.html` | kniha výřezu k tisku ([A7.4](#A7.4)); PDF tiskem z prohlížeče |
| `Vějíř předků.svg`, `.png` | přímí předci obdarovaného v jednom obrázku, 3 až 10 generací; u páru jeden vějíř pro každého |
| `Pro jiné programy/Rodokmen.ged` | výřez ve formátu GEDCOM |

- Každou část kromě průvodního listu jde vypnout; výchozí jsou všechny zapnuté, s fotkami. Průvodce ukazuje odhad
  velikosti po kompresi, i bez fotek a bez aplikace.
- Kniha má nastavení knihy ([A7.4](#A7.4), **Nastavení knihy…**), vějíř vzhled vějíře (**Vzhled vějíře…**).
- Jména souborů jsou v jazyce průvodního listu; jméno ZIPu jde v kroku 6 přepsat.
- **Hranice:** na Macu rozbalí ZIP správně Finder; nástroj `unzip` v terminálu neumí jména s diakritikou.
- **Ovládání:** krok **Co v balíčku bude**: **Části balíčku**, **Fotky** (**S fotkami** / **Bez fotek**), **Obsah
  souboru ZIP**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/gift-package.ts giftFileNames (složka, Začít zde, aplikace, stránky, kniha, vějíř na osobu u páru, Pro jiné programy/Rodokmen.ged), buildGiftPackage, estimateGiftSize · src/gift-tree.ts defaultGiftParts · src/filenames.ts unicodeFileName · strings.ts giftTree.files, giftTree.pkg.part, partsH, photosH, bookSettings, fanLook, zipH, zipNote, review.fileName · test/vysledek-1126-app-093.md (ZIP rozbalený ditto, macOS unzip) · dirigent:spec/093 K5.2, K5.3 -->

<a id="A7.9.4"></a>
### A7.9.4 Průvodní list (Začít zde)

`Začít zde.html` je první stránka balíčku: vzkaz, čísla z rodokmenu a rozcestník.

- **Vzkaz:** šablona podle jazyka a motivu, jde libovolně přepsat (**Vložit šablonu znovu**). Zástupné slovo
  oslovení ve vzkazu (cs `[oslovení]`, en `[name]`, de `[Name]`, pl `[imię]`) se nahradí **Oslovením**; výchozí je
  křestní jméno, u páru obě. Dále **Podpis** (ukáže se v listu a po otevření aplikace) a **Datum** (výchozí dnes).
- **Jazyk listu:** čeština, angličtina, němčina, polština; výchozí jazyk aplikace. **Motiv:** **Bez motivu**
  (výchozí) nebo **Vánoce**.
- **Rodokmen v číslech** jsou čísla z výřezu, ne z celého stromu: počet osob a generací, nejstarší předek, rody,
  místa a cesta rodiny, nejstarší záznam, osoby po generacích.
- **Co je v balíčku:** rozcestník částí s odkazy; kdo je otevře bez rozbalení ZIPu, dostane návod k rozbalení.
- List jde vytisknout na A4.
- **Ovládání:** krok **Průvodní list** s náhledem úvodní stránky; v kroku 6 **Otevřít v okně**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/gift-cover.ts buildGiftCover, giftFacts, giftLetterTemplate, giftDefaultSalutation, giftMessage (všechny čtyři tokeny) · strings.ts giftTree.salutationToken, template.none, template.xmas, cover.*, letter.langH, langName, motif, salutationH, messageH, reinsert, dateH, numbersH, guide.signature · dirigent:prace/1126-app-093-darovat-rodokmen (rozhodnutí A3, B3b tisk A4) · dirigent:spec/093 K7.1–K7.4 -->

<a id="A7.9.5"></a>
### A7.9.5 Hromadně pro seznam osob nebo výběr

Ze seznamu osob ([A11](A11-lists-of-people.md)) nebo výběru vznikne balíček pro každou osobu zvlášť.

- Tabulka **Obdarovaní** ukazuje každého s oslovením, počtem osob a žijících. **Manželé a partneři jako jeden
  balíček** spojí páry. Osoba, která ve stromu nemá rodiče, partnera ani dítě, balíček nedostane.
- Kroky 2–5 nastaví všechny najednou; **Upravit…** dá jedné osobě vlastní nastavení, **Vrátit na společné** ho zruší.
  `[oslovení]` ve vzkazu se doplní za oslovení každého obdarovaného.
- Výsledek je jeden ZIP `Rodokmeny <rok>.zip` s hotovým ZIPem pro každou osobu nebo pár, nebo jednotlivé ZIPy ve
  zvolené složce (**Uložit do složky…**). Balíčky vznikají osoba po osobě, aby stačila paměť; **Zrušit vše** smaže
  i to, co už vzniklo. Balíček, který se nevytvoří, se ukáže jako varovný řádek, ostatní vzniknou.
- Nastavení se uloží u každé osoby.
- **Hranice:** hromadné vytváření běží jen na počítači; na telefonu jde balíček pro jednu osobu nebo pár.
- **Ovládání:** nabídka seznamu osob a výběru: **Darovat rodokmen každé osobě…**; v průvodci krok **Pro koho**,
  **Seznam osob nebo výběr**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/gift-batch.ts · src/gift-package.ts buildGiftBatch, giftBatchFileName · src/ui/gift-tree-ui.ts (mode list jen mimo telefon, showDirectoryPicker, Zrušit vše maže zapsané) · src/ui/selection-picker-ui.ts (ne na telefonní liště), src/ui/person-list-hooks.ts · strings.ts giftTree.batch.*, guide.mode.list, guide.listPhoneWhy, guide.listPhoneNote, menuList · dirigent:prace/1126-app-093-darovat-rodokmen (B4: zrušení u složky smaže zapsané ZIPy) · dirigent:spec/093 K8.1–K8.3 -->

<a id="A7.9.6"></a>
### A7.9.6 Rozsah exportu Rodokmen osoby

V Exportu má **Co exportovat** volbu **Rodokmen osoby…**: výřez jedné osoby ([A7.9.1](#A7.9.1)) v kterémkoli
formátu, bez průvodce.

- Osoba je ta, která je zrovna zaměřená; jde vybrat jinou. Hloubka **Rodiny předků po** se bere z posledního daru
  té osoby, jinak Druzí bratranci; ruční výjimky sourozenců předků Export nepoužije.
- Formáty: **Poslat rodině**, **Aplikace i s daty (HTML)**, **Záloha dat (JSON)**, **Plakát**, **Kniha rodu**,
  **Propojené stránky**, **GEDCOM**, **Tabulka osob (CSV)**. Výstup se otevře na zvolené osobě a vztahy a generace
  počítá od ní.
- Kniha a stránky dostanou výběr **Rodokmen osoby** ([A7.4.1](#A7.4.1)). Plakát přepne pohled na zvolenou osobu a
  vytvoří plakát pohledu.
- Ochrana žijících je volba exportu ([A7.2.1](#A7.2.1)) a platí pro všechny žijící, i pro domácnost zvolené osoby.
  Volby daru ([A7.9.2](#A7.9.2)) má jen **Celý dárkový balíček…**, který otevře průvodce se stejnou osobou a
  hloubkou.
- **Hranice:** jen pro otevřený strom.
- **Ovládání:** Export › **Co exportovat** › **Rodokmen osoby…**: **Rodokmen osoby** (výběr osoby), **Rodiny předků
  po**, **Celý dárkový balíček…**
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/ui/import-export.ts showExportDialog (fokus), setExportPerson (hloubka z paměti daru), exportPersonCutIds (branches {}), renderExportScope (scope person jen aktivní strom), exportScoped, shareFromExportDialog, posterFromExportDialog, bookFromExportDialog (selection gift), exportPersonTreeJSON, exportTargetTreeApp (scopedExportData, defaultPersonId), openGiftFromExport · index.html data-person-ok · src/subtree.ts scopedExportData · strings.ts exportMenu.scopePerson, personPick, personFrom, personFull, *PersonDesc, familyPages.exportPages · dirigent:spec/093 K2.1–K2.4 -->
