<a id="S10"></a>
# S10 Domy

Dům je obec a číslo domu. Aplikace skládá domy ze zápisů stromu: z narození, sňatků, sčítání, bydlišť a úmrtí,
u kterých je číslo domu. Výzkum k domu na požádání zjistí jeho historii: čísla v čase, polohu, co se s domem dělo,
držitele, obyvatele a podobu, každé tvrzení s pramenem a jistotou. Výsledek je v aplikaci v okně **Domy** a na
stránce domu, v knize a ve stránkách rodu. Kapitola popisuje aplikaci Strom 3.33.0 a výzkum 1.38.0.

| Co | Aplikace | Terminál |
|---|---|---|
| domy stromu | okno **Domy** ([S10.2](#S10.2)), stránka domu ([S10.3](#S10.3)) | `strom house list`, `strom house show` |
| historie jednoho domu | **Zjistit historii domu…** ([S10.4](#S10.4)) | `strom house request` ([S10.4.1](#S10.4.1)) |
| domy samy | **Výzkum u stromu › Historie domů** ([S10.5.1](#S10.5.1)) | **Nastavení › Historie domů v tomto výzkumu** |
| vlastní rešerše domu | **Převzít rešerši ze souboru…** ([S10.8](#S10.8)) | `strom house import` |
| rozhovor o domě | **Probrat s agentem** ([S10.9](#S10.9)) | `strom chat --house` |
| vyprávění o domě | ⋯ **Napsat vyprávění o domě** ([S10.14](#S10.14)) | `strom house story` |
| kniha a stránky | výběr **Dům**, kapitola **Domy** ([S10.10](#S10.10)) | – |

<!-- zdroj: dirigent:spec/030-historie-domu, spec/145-rozsireni-domu (T1, T2, T5, T6, T7) · app:src/houses.ts, src/ui/houses-ui.ts, src/house-page.ts · research:src/core/houses.ts, src/core/houseauto.ts, src/commands/house.ts, assets/method/house.md · CHANGELOG.cs.md aplikace 3.33.0, výzkum 1.38.0 „Historie domů“, „Výzkum domu“ -->

<a id="S10.1"></a>
## S10.1 Dům: obec a číslo

Dům se pozná podle obce a čísla domu. Aplikace domy neukládá, skládá je ze zápisů stromu. Do domu patří osoba,
která v něm má narození, sňatek, sčítání, bydliště nebo úmrtí. Ukládá se jen to, co k domu řekl člověk: jméno
po chalupě, spojení a oddělení domů, poloha a události odkryté pro výstupy.

- **Dům s historií:** v domě žily aspoň **2 generace** (rodič a dítě), **nebo** zápisy domu pokrývají aspoň
  **30 let**. Partneři jsou jedna generace. „Jedna rodina N let“ je nejdelší rozpětí jedné propojené rodiny
  (aspoň dva lidé).
- U domu se ukazuje sled příjmení mužů v čase („Horák → Vlk → Horák“) a štítky **přiženil se** / **přivdala se**:
  osoba se v domě nenarodila a je partnerem člověka z domu. U osoby bez známého pohlaví štítek není.
- Výzkum vede dům jako záznam `A…` (`A0001`). Záznam vznikne s prvním zápisem nebo úkolem. Do té doby je dům jen
  ve faktech stromu.
- **Hranice:**
  - okno **Domy** a vše kolem domů je jen ve stromu, který má aspoň jeden dům s číslem;
  - zástupci osob (osoby bez údajů, jen na místo) se do domu nepočítají;
  - u výzkumu musí být obec domu místem výzkumu ([R4](R4-places.md)), jinak výzkum k domu nic nezapíše a poradí
    `strom place add`.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:src/houses.ts houseOfFact, collectHouses, LIVED_FACT_KINDS, houseIdOf, isOverThreshold (HOUSE_THRESHOLD_GENERATIONS 2, HOUSE_THRESHOLD_YEARS 30), generationsOf, familyYearsOf, marriedInOf, hasNumberedHouse · StromData.houses (datová verze 27) · dirigent:spec/030 rozhodnutí 26. 11. · research:src/core/model.ts House (A…), src/core/houses.ts recordOf (house.town), townRecord · commity app 94ed2240, research dea67112, 54ed35c7 -->

<a id="S10.1.1"></a>
### S10.1.1 Jak se čte číslo domu

Číslo domu se bere z místa faktu a pole čísla domu nebo adresy. Značky před číslem se nepočítají: „16“, „čp. 16“,
„č. p. 16“, „č.p.16“, „Nr. 16“, „Haus Nr. 16“, „House No. 16“ a „nr domu 16“ jsou týž dům.

- „Bělokamen čp. 16“ je obec Bělokamen a dům 16; „Bělokamen, Kopřivná 12“ je dům podle ulice; „Lhota, okres
  Horní, čp. 3“ je obec „Lhota, okres Horní“. Holé „Bělokamen 16“ je dům jen tam, kde holé číslo nabízí i okno
  **Místa**; „Praha 5“ dům není (číslo patří k názvu obce).
- Ulice se porovnává bez diakritiky a velikosti písmen. „13/2“ je jedno číslo.
- Domy v obci jdou po řadě: čísla (4, 12, 12a, 13/2, 100), potom domy podle ulice, potom ostatní.
- **Hranice:**
  - bez čísla („mlýn“, „Kopřivná“) dům nevznikne;
  - „12a“ a „12 a“ jsou dva domy; spojí je člověk ([S10.1.2](#S10.1.2));
  - evidenční číslo nemá vlastní řadu: „č. ev. 5“ je týž dům jako „čp. 5“.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0
- **Od výzkumu 1.38.0:** domy zapsané dřív dvojím způsobem srovná `strom fixes house-numbers` ([S10.12](#S10.12)).

<!-- zdroj: app:src/places.ts townOfPlace, houseKey, houseOrder, compareHouses (466–545) · research:src/core/house.ts houseKey, HOUSE_WORDS · nález: ev. č. bez vlastní řady (app), „12a“ ≠ „12 a“ -->

<a id="S10.1.2"></a>
### S10.1.2 Čísla v čase, spojení a jméno po chalupě

Čísla domů se v minulosti měnila. Dům proto má seznam čísel: ze zápisů stromu a od výzkumu. Starší číslo se ukazuje
v závorce („(dříve 12)“). Zápisy z doby před potvrzeným přečíslováním jsou jen pravděpodobné.

- **Přečíslování** výzkum jen navrhne („návrh výzkumu: týž dům před přečíslováním“). Potvrdí ho člověk
  (**Potvrdit**), nebo odmítne (**Není to tentýž dům**). Odpověď „není to tentýž dům“ se výzkumu už nikdy znovu
  nepošle.
- **Spojit s jiným domem…** spojí dva zápisy jednoho domu (nabídne domy téže obce). **Je to jiný dům…** oddělí
  číslo, které k domu nepatří; s výzkumem, který to umí, jde výzkumu rovnou poslat odpověď „není to tentýž dům“.
  Spojení platí jen pro rejstřík domů a stránku domu; údaje osob se nemění. Každé spojení a oddělení je jeden krok
  **Zpět** a jde do historie změn.
- **Jméno po chalupě** (nejvýš 80 znaků) se píše na stránce domu. Jméno od člověka výzkum nepřepíše.
- **Hranice:**
  - přečíslování, polohu a „není to tentýž dům“ potvrzuje jen člověk (v aplikaci, v terminálu nebo v okně systému),
    nikdy agent;
  - údaj, který člověk potvrdil nebo dal, výzkum nepřepíše; nový údaj výzkumu jde vedle;
  - při slučování stromů se slovo o domech přenáší; do GEDCOM jde jen jméno domu a spojení ([S10.11](#S10.11)).
- **Ovládání:** aplikace: stránka domu → **Čísla v čase** → **Potvrdit** / **Není to tentýž dům**; ⋯ domu →
  **Spojit s jiným domem…**, **Je to jiný dům…**, **Jméno po chalupě…**. Terminál:
  `strom house confirm <dům> renumber|location|not-same`.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:src/houses.ts withResearchNumbers · src/ui/houses-ui.ts merge, split (houses.splitSend jen s house.confirm) · DataManager.setHousesUserData (Zpět, záznam změn) · src/ui/house-page-ui.ts startHouseNameEdit (80 znaků) · src/ged-houses.ts keepHouses · strings.ts houses.was, merge, mergeNote, split, splitSend, farmName · research:src/core/houses.ts confirmHouse (HOUSE_CONFIRMS renumber, location, notSame), replaceHouseItem (house.confirmed) · src/commands/house.ts confirm (člověk, STROM_FOR_APP) · commit app 94ed2240 -->

<a id="S10.2"></a>
## S10.2 Okno Domy

Okno **Domy** ukazuje domy stromu po obcích. Nahoře je věta „Domy podle zápisů ve stromu. Čísla domů se
v minulosti měnila; zápisy z doby před potvrzeným přečíslováním jsou jen pravděpodobné.“ a tlačítko **Pojmy**
se slovníčkem (grunt, chalupník, výměnek, podruh, čeleď, čp.).

- **Lišta:** hledání **Hledat obec, číslo, příjmení** (číslo napsané jakkoli najde dům, jména i rodná a po
  sňatku, bez diakritiky); čip obce **Obec: …**; **Jen s historií**; **Prozkoumané** (jen s výzkumem, který domy
  posílá); **Řadit**: **Číslo**, **Nejstarší**, **Nejvíc osob**, **Naposledy prozkoumané** (jen s výzkumem).
  Souhrn „{N} domů v {M} obcích“.
- **Obce** jdou podle počtu domů, pak podle názvu; u obce okres (z míst výzkumu), počet domů s historií, čísel domů
  a osob.
- **Řádek domu:** číslo (a starší číslo), jméno po chalupě, roky, sled příjmení, „N osob · N generací“, štítky
  přiženění a stav výzkumu ([S10.4](#S10.4)). Domy s historií ([S10.1](#S10.1)) jsou nahoře; ostatní ve skupině
  **Další domy (N)** („pod prahem 2 generací nebo 30 let“). Načítá se po 40 domech (**Zobrazit další**).
- **Rozbalený dům:** zajímavosti (jedna rodina N let, počet čísel, nejstarší zápis), zápisy lidí (8, pak „a N
  dalších zápisů…“) a **Stránka domu ›**. Klik na osobu zavře okno a ukáže osobu ve stromu.
- **⋯ u domu:** **Stránka domu**, **Na mapě**; akce výzkumu ([S10.4](#S10.4), [S10.9](#S10.9)), i u domu pod
  prahem; **Spojit s jiným domem…** a **Je to jiný dům…** ([S10.1.2](#S10.1.2)).
- **Hranice:** prázdné výběry řeknou proč („Žádný dům nemá historii přes 2 generace nebo 30 let.“, „Žádný dům zatím
  není prozkoumaný.“).
- **Ovládání:** aplikace: **Akce › Strom › Domy…** a ve **Správě stromů** ⋯ u otevřeného stromu (za Místy);
  **Domy ›** ve **Výzkum u stromu**; **Domy obce ›** v okně **Místa** a v bublině domu na mapě (otevře okno
  s čipem obce); **‹ Domy** ze stránky domu.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/ui/houses-ui.ts (lišta, obce, řádek, HOUSES_BATCH 40, openHouseRowMenu, akce výzkumu i pod prahem 96c78f0a) · src/houses-view.ts (hledání) · src/ui/tree-actions.ts housesRows (isActive && hasNumberedHouse, 0c97014e) · strings.ts houses.menu, intro, terms, searchPh, townOnly, onlyHistory, researchedOnly (169c35b0), sortLabel, sortNumber, sortOldest, sortPeople, sortResearched, count, townMeta, more, moreWhy, emptyHistory, emptyResearched, townHouses, pageItem · nález N3: okno i u adresy s ulicí a číslem -->

<a id="S10.3"></a>
## S10.3 Stránka domu

Stránka domu má tvar stránky osoby: **‹ Domy**, **Uložit HTML**, ⋯ a zavřít. Od tří oddílů má obsah.

- **Oddíly v pořadí:** hlavička (obec a číslo, jméno po chalupě, obec s okresem, farnost, „Ve stromu“: roky,
  generace, osoby; „Výzkum“: stav) · **V kostce** · **Vyprávění** ([S10.14](#S10.14)) · **Čísla v čase** · **Časová osa** · **Držitelé a obyvatelé** ·
  **Podoba domu** ([S10.7](#S10.7)) · **Mapa** ([S10.3.1](#S10.3.1)) · **Co nevíme** (s **Odpovědět**) · **Co se
  prošlo** (s **Jen v badatelně**) · **Prameny a materiály**.
- **Časová osa** má u řádku původ: **z výzkumu**, **z vlastní rešerše**, **domněnka**, **pravděpodobné**. Řádky
  ze zápisů stromu popisuje [S10.3.3](#S10.3.3).
- **Držitelé a obyvatelé** jsou oddělení: „Obyvatel není totéž co majitel.“ Mezery ukazují „nezjištěno · viz Co
  nevíme“, lidé mimo strom mají „mimo strom“.
- **Stav prozkoumáno:** ✓ a den („hotovo 12. 3. 2026“) v hlavičce, v okně **Domy** i v bublině na mapě.
- **Bez výsledku výzkumu** má stránka hlavičku, **V kostce**, **Čísla v čase**, **Časovou osu**, **Obyvatele ze
  stromu**, **Mapu** a větu, odkud je („Stránka je sestavená ze zápisů ve stromu.“, nebo že je dům ve frontě).
- **⋯ stránky:** **Uložit HTML** ([S10.3.2](#S10.3.2)) · **Otevřít v knize…** ([S10.10](#S10.10)) · **Na mapě** ·
  **Jméno po chalupě…** · akce výzkumu ([S10.4](#S10.4)) · **Napsat vyprávění o domě** ([S10.14](#S10.14)) ·
  **Probrat s agentem** ([S10.9](#S10.9)) · **Přiložit
  materiál…** · **Převzít rešerši ze souboru…** ([S10.8](#S10.8)) · **Spojit s jiným domem…** · **Je to jiný dům…**
- **Ovládání:** aplikace: **Stránka domu ›** v okně **Domy**, v bublině domu na mapě a u odkazu na dům ve stránce
  osoby ([S10.11](#S10.11)).
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/house-page.ts buildHousePage (houses.page.sec.* kicker, sum, numbers, timeline, people, look, map, unknown, passed, archiveOnly, sources; treeResidents, page.queued, page.treeOnly, page.noResearch, origin.*, notOwner) · src/ui/house-page-ui.ts toggleHousePageMenu · strings.ts houses.st.done, houses.page.* · commity 53d23b9f, 6cbffa3b, 169c35b0 · nález N4: pořadí proti spec 030 K3.1 (V kostce, Podoba, Mapa, Co se prošlo navíc) -->

<a id="S10.3.1"></a>
### S10.3.1 Mapa a poloha domu

Oddíl **Mapa** ukáže dům (přiblížení 17), nebo obec, když poloha domu není známá (přiblížení 14). Věta pod mapou
říká, odkud poloha je.

| Věta | Kdy |
|---|---|
| **Poloha zadaná ručně** | bod posunul člověk |
| **Poloha potvrzená** | bod výzkumu potvrdil člověk |
| **Poloha podle dnešního čísla domu · jistota vysoká** | výzkum našel dům v dnešním adresním registru |
| **Poloha podle výzkumu · jistota vysoká** | jiný jistý bod výzkumu (katastr, stará mapa, popis) |
| **Poloha nejistá (číslo se mohlo změnit)** | bod výzkumu bez vysoké jistoty |
| **Poloha domu není známá, ukázaná je obec.** | bez bodu |

- **Vrstva mapy:** **Dnes** a vrstvy, které výzkum pro místo domu dodal: **Ortofoto dnes** a **Letecké 50. léta**
  (Česko). Bez nich „Jen dnešní mapa; další vrstvy výzkum pro tuto zemi nedodal.“
- **Potvrdit polohu** je jen u nejistého bodu výzkumu, ke kterému člověk ještě nic neřekl. **Posunout bod** posune
  bod tažením. Obojí se uloží do stromu (jeden krok **Zpět**) a s výzkumem, který to umí, i do výzkumu jako slovo
  člověka.
- **Otevřít jinde:** OpenStreetMap, Mapy.com, Google Mapy, Street View a dnešní pohled, s poznámkou „Poloha i fotky
  jsou dnešní; historické číslo domu nemusí sedět.“
- **Hranice:**
  - polohu, kterou potvrdil člověk, výzkum nepřepíše;
  - **Otevřít jinde** je jen u domu s vlastním bodem;
  - uložená stránka domu, kniha, stránky rodu, dar a export HTML ukážou polohu jako výřez mapy nebo souřadnice,
    dokud ji člověk neskryje u domu nebo ve výstupu ([S10.3.4](#S10.3.4)).
- **Ovládání:** aplikace: stránka domu → **Mapa** → **Vrstva mapy**, **Potvrdit polohu**, **Posunout bod**, **Skrýt
  polohu ve výstupech** ([S10.3.4](#S10.3.4)); terminál
  `strom house confirm <dům> location`.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:src/house-map.ts (zoom 17/14, min 12, max 18), src/ui/house-map-ui.ts (page.map.layers today, ortho, aerial, onlyToday; posManual, posConfirmed, posHigh, posSure, posUnsure, noPos; confirmPos, move, saveHousePoint s house.confirm; Otevřít jinde) · commity 90c54cc6, 307c3a8f, bc1833b9 · research:assets/maplayers.json cz-ortho, cz-ortho-1950 · src/core/houses.ts confirmHouse location (jistota high, původ user), house add location odmítnuto po potvrzení -->

<a id="S10.3.2"></a>
### S10.3.2 Uložená stránka domu a ochrana lidí

**Uložit HTML** na stránce domu otevře dialog **Uložit stránku domu**. **Uložit** uloží stránku jako jeden soubor
(např. `belokamen-cp-16.html`) bez mapových dlaždic ze sítě; poloha je výřez mapy přímo v souboru
([S10.3.4](#S10.3.4)), fotky domu a obce se načtou z webu, nebo jsou jen odkazem ([S10.7.1](#S10.7.1)). Uložená
stránka domu, kniha a stránky rodu chrání žijící a lidi posledních zhruba 100 let.

- **Dialog Uložit stránku domu:**
  - blok **Ochrana žijících osob** s režimem z Nastavení („výchozí z Nastavení“,
    [S11.3](S11-protecting-living-people.md#S11.3); režimy [S11.2](S11-protecting-living-people.md#S11.2)). Má-li dům
    žijící nebo lidi posledních zhruba 100 let, stojí pod ním „Platí pro jména žijících a lidí posledních ~100 let;
    jejich ostatní údaje se ukazují jako dnes (jen jméno). Vyprávění domu se nepřepisuje.“;
  - přepínač **Fotky domů z webu**: „Načtou se při otevření souboru; bez internetu zůstane popisek s odkazem.“;
  - přepínač **Poloha a mapa domu**, jen u domu s polohou: „Výřezy vrstev mapy jako obrázky v souboru, bod,
    souřadnice a odkazy na jiné mapy; vypnuto: jen obec.“ U ručně skryté polohy místo něj „Poloha domu je skrytá
    ručně; soubor uvede jen obec.“;
  - každé otevření začne z Nastavení; volba platí jen pro tento soubor a Nastavení nemění.
- **Jména** podle režimu ochrany: žijící jako v režimu ([S11.2](S11-protecting-living-people.md#S11.2)); zemřelí
  lidé posledních zhruba 100 let stejně, jen bez roku narození a jako „Osoba“ místo „Žijící osoba“. S **Plná data**
  jsou všechna jména celá. Kdo je žijící osoba: [S11.1](S11-protecting-living-people.md#S11.1).
- **Nikdy:** dnešní vlastníci a obyvatelé (držitel nebo obyvatel s roky v posledních zhruba 100 letech, kterého strom
  nezná, se vynechá); jméno pamětníka.
- **Lidé posledních zhruba 100 let** jen jménem a rolí, bez let.
- **Události výzkumu z posledních zhruba 100 let a citlivé události** (konfiskace, odsun) se vynechají, dokud je
  člověk neodkryje (**Ukázat ve výstupech**).
- **Poloha** jen bez ručního skrytí a se zapnutým **Poloha a mapa domu** ([S10.3.4](#S10.3.4)). Jméno po chalupě
  u domu s lidmi posledních zhruba 100 let se vynechá.
- **Vyprávění o domě** vždy celé, schválené i koncept, bez štítku konceptu. Lidé posledních zhruba 100 let ani
  položky, které stránka skrývá, ho nevynechají ([S10.14.2](#S10.14.2)).
- Stránka domu řekne, co ve výstupech chybí: „Ve výstupech (HTML, kniha) se 3 události neukazují.“, „… ; poloha domu
  je skrytá ručně.“, nebo „Ve výstupech (HTML, kniha) je poloha domu skrytá ručně.“
- **Ovládání:** aplikace: stránka domu → **Uložit HTML** → **Uložit stránku domu**; u události **Ukázat ve
  výstupech**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/house-privacy.ts, src/privacy.ts RECENT_YEARS 100, buildHousePageDocument, housePageFileName · strings.ts houses.reveal, houses.hiddenSummary, houses.page.save · commit 6f8a9d88 · T3: app:438de916 src/house-privacy.ts houseOutputFilter (locationBy recent|manual), strings.ts houses.hiddenSummary · T4: app:3473602e src/house-privacy.ts houseStoryForOutput · T8: app:45d99711 src/house-privacy.ts houseStoryForOutput (draft s příznakem), src/house-page.ts storyHtml, pictureImg (webPhotos) · 1128: app:28099151 src/house-privacy.ts houseStoryForOutput (bez podmínky recent a skrytých položek), src/house-page.ts shownStory (storyLiving jen z hromadného výstupu), storyHtml (štítek jen c.app) · T10: app:51223455 src/ui/house-page-ui.ts showHouseSaveDialog (privacyBlockHtml mode SettingsManager.getOutputPrivacy origin settings, living named.size, strings.privacy.houseLine; outputSwitchHtml house-photos outputWebPhotos.bookSwitch/fileHint, house-location outputHouseLocation.switch/switchHint jen hasLocation, byHand → handHidden; HouseSaveChoice), src/house-page.ts houseFileNames (applyLivingPrivacy podle režimu, recent → privacy.namedAsLiving bez birthDate, label privacy.recentPerson, full beze změny), shownHouseName (recentHouse), src/house-privacy.ts houseOutputFilter (holderOf: neznámý z posledních ~100 let → null; locationBy manual|output), strings.ts houses.page.saveTitle, houses.hiddenSummary · app:4c403da2 · CHANGELOG.cs.md 3.33.0 -->

<a id="S10.3.3"></a>
### S10.3.3 Časová osa ze zápisů stromu

Řádky **Časové osy** ze zápisů stromu jdou po rocích, jeden na zápis; společný zápis dvojice je jeden řádek. Co už
říká jeden řádek, se neopakuje.

- **Narození a křest** téže osoby ve stejném roce jsou jeden řádek „narozen“ / „narozena“. Křest bez narození má
  řádek „pokřtěn“ / „pokřtěna“.
- **Bydliště:** víc bydlišť téže osoby ve stejném roce je jeden řádek „bydliště“. Bydliště partnerů ve stejném roce
  je taky jeden řádek s oběma jmény, jako sňatek.
- Úmrtí, sňatky, sčítání a zápisy výzkumu zůstávají řádek za zápisem.
- **Hranice:**
  - bydliště bez roku se nespojují;
  - strom ani výzkum se nemění: spojí se jen řádky, které časová osa ukáže;
  - stejně se řádky skládají ve stránce domu, v uložené stránce ([S10.3.2](#S10.3.2)) a v knize domů
    ([S10.10](#S10.10)).
- **Ovládání:** aplikace: stránka domu → **Časová osa**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:3dc5647c src/house-page.ts houseTreeRows → joinRepeatedRows (narození jedné osoby a roku jednou, narození před křtem; bydliště s rokem a sdílenou osobou nebo partnery partnersIn), factLabel isBaptism (událost baptism → baptizedM/F) · src/book-houses.ts houseTreeRows · strings.ts houses.ev.bornM, bornF, baptizedM, baptizedF, residence · src/__tests__/house-page.test.ts · dirigent:prace/1127-app-147-materialy (Přibaleno, schválená tabulka) -->

<a id="S10.3.4"></a>
### S10.3.4 Poloha domu ve výstupech

Uložená stránka domu, kniha rodu, stránky rodu, dar a export HTML ukazují, kde dům stojí. V knize je to výřez dnešní
mapy s bodem a číslem domu, pod ním souřadnice, jak jistá je shoda čísla, a atribuce mapy. Poloha domu není osobní
údaj: ukáže se, ať v domě žil kdokoli, i lidé posledních zhruba 100 let, dokud ji člověk neskryje u domu nebo ve
výstupu. Jména, roky a události těch lidí chrání výstupy dál ([S10.3.2](#S10.3.2)).

- **Kdy se poloha ukáže:** jen u domu s bodem (zadaným ručně nebo od výzkumu) a jen když platí obojí:
  - člověk polohu u domu neskryl (**Skrýt polohu ve výstupech**);
  - výstup má zapnutý přepínač polohy (**Poloha a mapa domu**, **Poloha a mapa domů**).
- **Nastavení:** **Nastavení → Data a soukromí → Poloha domů ve výstupech**: **Ukázat** (výchozí) nebo **Skrýt**.
  „Uložená stránka domu, kniha rodu, propojené stránky, dárek a export HTML ukazují, kde domy stojí: výřezy mapy,
  souřadnice a odkazy na jiné mapy. Každý z nich to může změnit. Dům s ručně skrytou polohou zůstává bez ní.“
- **Přepínače ve výstupech** (předvyplněné z Nastavení; vypnuto: jen obec):

  | Výstup | Přepínač | Kdy je vidět | Odkud začíná |
  |---|---|---|---|
  | Uložit stránku domu | **Poloha a mapa domu** | dům má polohu; u ručně skryté místo něj „Poloha domu je skrytá ručně; soubor uvede jen obec.“ | vždy z Nastavení ([S10.3.2](#S10.3.2)) |
  | Kniha rodu | **Poloha a mapa domů** | část **Domy** a v kapitole dům s polohou, která není skrytá ručně | naposledy pro tento strom, jinak z Nastavení |
  | Stránky rodu | **Poloha a mapa domů** | domy jako stránky a stránka domu s polohou, která není skrytá ručně | naposledy pro tento strom, jinak z Nastavení |
  | Darovat rodokmen | **Poloha a mapa domů** | strom má dům s polohou, která není skrytá ručně | naposledy pro tyto příjemce, jinak z Nastavení; **Začít znovu s výchozím** z Nastavení |
  | Export HTML | **Poloha a mapa domů** | formát HTML, ne rychlé uložení; u aktivního stromu jen s domem s polohou, která není skrytá ručně | vždy z Nastavení |

  Přepínač v knize: „Výřez dnešní mapy s bodem každého domu, souřadnice a jistota shody čísla; vypnuto: jen obec. Dům
  s ručně skrytou polohou zůstává bez ní.“ V daru a exportu HTML: „Souřadnice domů jdou do souboru; vypnuto: jen
  obec. Dům s ručně skrytou polohou zůstává bez nich.“ Volba ve výstupu Nastavení nemění.
- **Jistota:** „Dnešní poloha · shoda čísla ověřená“, když bod zadal nebo potvrdil člověk (v aplikaci nebo ve
  výzkumu); jinak „Dnešní poloha · shoda čísla předpokládaná“.
- **Obrázek:** dnešní mapa OpenStreetMap s atribucí „© přispěvatelé OpenStreetMap, licence ODbL“.
  - HTML (uložená stránka domu, stránky rodu i jako ZIP, stránky v daru) přidá další obrázky: historické vrstvy, které
    výzkum pro místo domu dodal ([S10.3.1](#S10.3.1)), nejvýš 8 obrázků s přepínačem vrstev bez skriptu. Prohlížeč
    bez této podpory a tisk ukážou všechny obrázky pod sebou.
  - Kniha (i kniha v daru) dává jen dnešní mapu a výřez nerozdělí mezi stránky. Odkazy **Otevřít jinde** jsou jen
    na obrazovce, v tisku ne.
  - Dar dělá výřezy z dat balíčku. Ve stromu má polohu jen dům, jehož bod zadal nebo potvrdil člověk; poloha jen od
    výzkumu do daru ani do exportu HTML nejde.
- **Bez sítě:** výřez se udělá jednou a aplikace si ho uloží v tomto prohlížeči; další kniha, PDF nebo dar vezme
  uložený. Bez sítě a bez uloženého výřezu, nebo dokud mapa není povolená (**Zobrazit mapu**), dá výstup jen
  souřadnice a jistotu, bez chyby. Na jeden obrázek se čeká nejvýš 10 s.
- **Stránka domu**, oddíl **Mapa:** u domu s polohou řádek „Ve výstupech (HTML, kniha) se ukazuje poloha domu.“
  a **Skrýt polohu ve výstupech**. Po skrytí „Ve výstupech (HTML, kniha) je poloha domu skrytá ručně.“ a **Ukázat
  polohu ve výstupech**. Obojí je jeden krok **Zpět**.
- **Hranice:**
  - ruční skrytí u domu vyhraje vždy, i když je přepínač výstupu zapnutý;
  - **Sdílet** přepínač nemá a Nastavení nečte; soubor JSON a záloha nesou data stromu, jak jsou;
  - ruční skrytí je jen ve stromu aplikace (soubor JSON), do výzkumu ani do GEDCOM nejde;
  - strom jen ke čtení ukáže jen stav, bez tlačítka.
- **Ovládání:** aplikace: **Nastavení → Data a soukromí → Poloha domů ve výstupech**; stránka domu → **Mapa** →
  **Skrýt polohu ve výstupech** / **Ukázat polohu ve výstupech**; **Uložit stránku domu** → **Poloha a mapa domu**;
  **Kniha a stránky**, **Darovat rodokmen** a export HTML → **Poloha a mapa domů**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:438de916 src/house-privacy.ts houseOutputFilter (do 3.33.0 před T10 location jen bez recentPeople; locationBy recent|manual; locationSure confirmed: user.location nebo research.location.confirmed), src/house-map-shot.ts (HOUSE_SHOT_TIMEOUT_MS 10 000, today = OSM dlaždice, vrstvy výzkumu jen HTML, ShotCache), src/ui/house-map-shots.ts (IndexedDB strom-map-shots, tilesAllowed: isMapTilesAcknowledged), src/book-houses.ts (figure, houseCoordsText, houseSureText), src/book-options.ts bookHouseMaps (výchozí zapnuto), src/book-memory.ts houseMaps, src/ui/book-ui.ts book-house-maps, src/types.ts HouseUserData.hideLocation (ne v ged-houses.ts) · strings.ts houses.page.map.outShown, outHidden, hideOut, showOut, sureConfirmed, sureAssumed, osmAttribution; book.dlg.houseMaps, houseMapsHint; book.houseChapterProtected; map.tilesNoticeOk · dirigent:spec/145 T3 · prace/1127-app-145-vypraveni-poloha Výsledek · T10: app:51223455 src/house-privacy.ts houseOutputFilter (locationBy manual|output, HouseOutputChoice.location; „Not personal data“), src/settings.ts isOutputHouseLocation/setOutputHouseLocation (výchozí !== false), index.html output-house-location-setting, src/ui/book-ui.ts sw houseMaps outputHouseLocation.housesSwitch/housesSwitchHint (bookHouseMapsState shown; stránky: housesWithLocation u domů jako stránky; opts.houseMaps z book-memory, jinak isOutputHouseLocation), src/ui/gift-tree-ui.ts gift-house-location (jen dům s location a bez hideLocation, dataSwitchHint, giftRestart → Nastavení), src/gift-memory.ts houseLocations, src/ui/encryption-ui.ts setupExportHouseLocation (jen html, ne rychlý export; vždy z Nastavení), src/ui/house-page-ui.ts showHouseSaveDialog house-location · app:6ec8204e src/gift-package.ts houseShots (stránky a kniha daru, ne při houseLocations false; kniha houseMaps podle přepínače balíčku), src/ui/gift-tree-ui.ts giftHouseShots (vrstvy z houseStatus), src/book-css.ts (Otevřít jinde jen na obrazovce) · app:4c403da2 · src/house-map.ts HOUSE_SHOT_SWITCH_MAX 8, src/house-page-css.ts .hmap-sw (:has, bez skriptu) · strings.ts outputHouseLocation.*, houses.page.map.outShown, houses.hiddenSummary, book.houseChapterProtected · CHANGELOG.cs.md 3.33.0 -->

<a id="S10.4"></a>
## S10.4 Vyžádat historii domu

Historii jednoho domu jde vyžádat vždy, ať je **Historie domů** ([S10.5](#S10.5)) zapnutá, nebo ne. Vyžádaný dům
jde na vršek fronty výzkumu.

- **Stav domu** u řádku, na stránce, v bublině na mapě a v okně **Místa**: **nezkoumáno**, **ve frontě**, **zkoumá
  se**, **hotovo <den>**, **čeká na odpověď** (s **Odpovědět**), **odloženo**, **rešerše čeká na převzetí**, **ve
  frontě: podoba domu**.
- **Akce podle stavu:** nezkoumáno a odloženo → **Zjistit historii domu…**, se zapnutou Historií domů **Na vršek
  fronty**; ve frontě → se zapnutou Historií domů **Na vršek fronty**; hotovo → **Znovu vyžádat…**; zkoumá se
  a čeká na odpověď → nic.
- **Okno Historie domu <číslo>, <obec>:** co se hledá („Hledá se v matrikách, kronikách, mapách a dalších povolených
  pramenech.“, u znovu vyžádaného „Prošlé prameny se znovu neprocházejí; hledá se jen v nových a dosud neprošlých
  pramenech.“); odhad „Jedno sezení výzkumu, zhruba <doba>. Čerpá předplatné AI agenta výzkumu.“; **Sousední domy
  rodiny v obci se zpracují spolu** (nejvýš 3 domy, předvybrané domy s historií); **Přiložit materiál…
  (nepovinné)**; **Zrušit** / **Zjistit historii**.
- **Odhad:** medián změřených sezení domů v tomto výzkumu; dokud nejsou změřená aspoň 3, je to 30 minut na dům
  a 20 minut na kostru obce a cena se neukazuje.
- **Kudy to jde:** se zapnutou Historií domů jde dům přes most rovnou na vršek fronty, bez terminálu („Dům půjde přes
  most na vršek fronty výzkumu, bez okna terminálu.“; pak „Dům <číslo> je na vršku fronty výzkumu.“). S vypnutou
  otevře aplikace terminál výzkumu a slovo se dává tam ([S10.4.1](#S10.4.1)); akce má značku **AI + terminál**
  ([S4.5.1](S4-research-from-the-app.md#S4.5.1)).
- **Ve frontě:** úkol domu je vyžádaný a nikdy se neodkládá. Kostra obce ([S10.5](#S10.5)), když ji obec ještě nemá,
  jde před dům. Dům čeká na kostru své obce i po posunutí na vršek. Živý úkol se jen posune a přidají se k němu
  sousedé. Hotový dům se hledá znovu jen v nových pramenech.
- **Hranice:**
  - jen dům, kde žil někdo ze stromu, a obec, která je místem výzkumu; sousední domy jen z téže obce;
  - sousedé se nenabízejí u domu ve frontě, zkoumaného nebo čekajícího a u znovu vyžádaného;
  - ne v Archivu Stromu ani u výzkumu, který čeká na agenta;
  - **Zjistit historii domu…** s vypnutou Historií domů jen tam, kde aplikace umí otevřít terminál výzkumu;
  - odmítnutí (výzkum zaneprázdněný, zamčený, plný disk, bez spojení) řekne důvod a nic nezmění.
- **Ovládání:** aplikace: stav domu nebo ⋯ u domu v okně **Domy**, na stránce domu, v bublině na mapě, v okně
  **Místa** (**Historie domu <číslo>**); terminál: [S10.4.1](#S10.4.1).
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:src/ui/house-state-ui.ts (houses.st.*), src/ui/house-request-ui.ts houseActionOf, dialog houses.req.* (HOUSE_REQUEST_WITH_MAX 2, HOUSE_DEFAULT_MINUTES 30 + 20), POST /houses/request, houseSearchLink · src/research-link.ts RESEARCH_LINK_MARKS.house · commity a79b53aa, 96c78f0a · research:src/core/houseauto.ts askHouse (queueAt next, asked, kostra před dům), houseEstimate (HOUSE_MEASURED_MIN 3, HOUSE_MINUTES 30, TOWN_MINUTES 20), src/core/houses.ts houseChain, src/commands/offline.ts 222–226 · src/core/live.ts houseRequestWrite (403 house.link při vypnuté, 404 house.unknown, 400 house.body/house.town, 409 house.archive, 503 research.busy) · commity f325b1c1, abc8331d, 0002cfb4 · nález: cena až po 3 změřených sezeních (spec 030 K6.4) -->

<a id="S10.4.1"></a>
### S10.4.1 Vyžádání v terminálu a z odkazu

V terminálu se dům vyžádá příkazem `strom house request <dům> [--with <dům>,<dům>]`. Výzkum vypíše odhad („Asi N minut
práce agenta; bere čas agenta a čerpá předplatné.“, cena jen změřená) a zeptá se **Hledat historii domu <dům>
(jedno sezení agenta)?** (Enter = ne). Po ano: „Historie domu <dům> přijde na řadu první, při nejbližším sezení
výzkumu.“

- **Z aplikace** (s vypnutou Historií domů) otevře odkaz terminál s nadpisem **Aplikace Strom žádá:** „hledat
  historii domu <dům> – čísla, držitelé a obyvatelé, co se s ním dělo“. Terminál nejdřív ověří, že je agent na
  počítači, ukáže odhad a zeptá se. Pak „Historie domu <dům> je ve frontě první.“ a **Spustit práci agenta hned?**
- **Bez potvrzení:** se spouštěním agenta z aplikace bez potvrzení ([S4.5.5](S4-research-from-the-app.md#S4.5.5))
  vypíše odhad jednou řádkou, i s cenou, a spustí práci bez otázky.
- **Hranice:**
  - agent sám dům nevyžádá, je to slovo člověka; bez terminálu chce příkaz `--yes`;
  - dům bez lidí stromu, obec, která není místem výzkumu, nebo sousedé z jiné obce: „Nic se neudělalo.“ s důvodem;
  - potvrzení z telefonu jen bez ceny; s cenou se ptá počítač;
  - `strom house request` není v nápovědě `strom help house`; volá ho odkaz z aplikace.
- **Ovládání:** terminál: `strom house request A0001`, `strom house request "Lhota 16" --with "Lhota 17"`.
- **Platí od:** výzkum 1.38.0

<!-- zdroj: research:src/commands/house.ts request (hidden, L232; ui.house.ask, ui.house.minutes, ui.house.usd, ui.house.asked, ui.house.again, ui.house.kept, --yes) · src/cli/menu-links.ts 436–482 (ui.link.asks, ui.link.what.house.search, ui.link.house.none/with/town, ui.link.noconfirm, ui.link.house.done, ui.link.house.now → strom run --task) · src/core/links.ts 525–546 · src/commands/links.ts 164–176 · commit 226f86e1 (K6.3a) · nález: house request skrytý v helpu -->

<a id="S10.5"></a>
## S10.5 Historie domů: domy samy

Se zapnutou **Historií domů** zakládá výzkum úkoly domů sám. Výchozí je vypnutá; zapnout ji smí jen člověk.

- **Který dům:** má zápis aspoň jednoho **přímého předka**; žily v něm **2 generace nebo** zápisy pokrývají **30
  let**; nejstarší zápis je **starší než 100 let**; obec je místem výzkumu. Napřed domy s nejvíc předky, pak
  nejstarší.
- **Kolik najednou:** nejvýš **3** otevřené skupiny úkolů domů. Skupina je dům a sousední domy téže obce se
  společným příjmením, nejvýš 3 domy.
- **Kostra obce:** jednou na obec, před jejími domy: panství a velkostatek, farnost, katastrální území, staré názvy,
  kde jsou pozemkové knihy a sčítací archy. Domy obce na ni čekají.
- **Řetěz:** kostra obce → dům → podoba domu ([S10.7](#S10.7)).
- **Pořadí ve frontě:** úkoly domů vzniklé samy až po výzkumu rodiny; `strom queue` to řekne. Vyžádané domy jdou na
  vršek ([S10.4](#S10.4)).
- **Hranice:**
  - dům bez živého úkolu, ještě neprozkoumaný; úkol, který člověk zahodil, se sám nezaloží znovu;
  - ne v Archivu Stromu ani u výzkumu, který čeká na agenta;
  - hotový úkol domu nebo kostry agent zavře, jen když je zapsané, co úkol má mít ([S10.6](#S10.6)).
- **Platí od:** výzkum 1.38.0
- **Hlídá kód:** výběr domů, počet skupin, kostra a řetěz.

<!-- zdroj: research:src/core/houseauto.ts qualifies (přímý předek, HOUSE_SPAN 30, HOUSE_AGE 100, obec = místo), raiseHouseTasks (HOUSE_AUTO_OPEN 3, HOUSE_GROUP_MAX 3), townTask, createTownTask/createHouseTask/createLookTask (priorita 1, enrich, původ house:town:L…, house:A…, house:look:A…) · src/core/houses.ts houseChain · src/core/queue.ts houseOrder, 493, 546–548 · src/core/config.ts houses (nenastaveno = off) · cs.json house.town.what/why, house.research.what/why · commity 80bd90e2, f325b1c1, 1abbdd7f · dirigent:spec/030 rozhodnutí 26. 11. -->

<a id="S10.5.1"></a>
### S10.5.1 Zapnout a vypnout Historii domů

**Historie domů** a **Podoba domů** jsou nastavení výzkumu: pro všechny výzkumy na počítači, nebo pro jeden strom
(hodnota stromu vyhrává). Historie domů je výchozí vypnutá, Podoba domů zapnutá.

- **V aplikaci:** **Výzkum u stromu › Prameny › Historie domů** pod **Sčítání lidu**: „Výzkum sám zpracuje domy
  přímých předků, kde rodina žila aspoň dvě generace nebo 30 let a nejstarší zápis je starší než 100 let. Ostatní
  domy jen na vyžádání.“ Vypnuté ukazuje odhad („Úkol dostane N domů v M obcích · asi <doba> práce agenta · čerpá
  předplatné AI“). Zapnutí se ptá (**Zapnout historii domů?**), vypnutí taky (**Vypnout historii domů?**: „Čekající
  úkoly domů se odloží, hotové výsledky zůstanou.“). Zapnuté ukazuje „Zapnuto · N domů: N hotovo, N zkoumá se,
  N ve frontě“ a **Domy ›**, a **I podoba domů: zapnuto** / **vypnuto** (mění se v terminálu). Zapisuje se přes
  most, bez terminálu: je to rozhodnutí člověka v aplikaci.
- **V terminálu:** **Nastavení › Historie domů v tomto výzkumu** (zapnuto, „zapnuto, bez podoby domů“, vypnuto,
  „vypnuto, odloženo N úkolů domů“). Před zapnutím řekne, co výzkum bude dělat („Jednotlivý dům jde vyžádat
  vždy.“), počet domů a odhad („N domů v M obcích, celkem asi N minut práce agenta“) a zeptá se (Enter = ne).
  Zapnuté nabízí **I podoba domů** a **Vypnout historii domů**.
- **Vypnutí** odloží jen čekající úkoly domů, které vznikly samy (kostra, dům, podoba). Vyžádané, rozpracované,
  odložené člověkem, převzetí rešerše a úkoly s materiálem zůstanou. Po zapnutí se odložené vrátí; hotové výsledky
  zůstanou. `strom task list` je značí „held: houses off“; na člověka nečekají.
- **Podoba domů vypnutá:** úkol domu zapíše jen krátkou podobu, úkol podoby nenásleduje.
- **Hranice:**
  - zapnout smí jen člověk: v terminálu, v menu, v okně systému nebo v aplikaci; když to zkusí agent, zeptá se okno
    systému, které agent nevidí; vypnout smí kdokoli;
  - v aplikaci řádek není u Archivu Stromu ani u výzkumu, který čeká na agenta;
  - **Domy ›** je jen u otevřeného stromu.
- **Ovládání:** aplikace: **Výzkum → Další → Výzkum u tohoto stromu… → Prameny → Historie domů**; terminál:
  **Nastavení › Historie domů v tomto výzkumu**, `strom config set houses on|off --for-tree`,
  `strom config set houses.look on|off --for-tree`.
- **Platí od:** výzkum 1.38.0, aplikace 3.33.0
- **Hlídá kód:** zapnutí jen člověkem; co vypnutí odloží.

<!-- zdroj: research:src/core/config.ts houses (housesSwitch, nenastaveno off), houses.look (housesLook, nenastaveno on) · src/commands/setup.ts housesDecision 1679–1697 (requireHuman, okno systému, STROM_FOR_APP; vypnout kdokoli), ui.consent.houses(.tree) · src/cli/menu-settings.ts housesLabel/housesStep 253–297 (ui.settings.houses*, --for-tree) · src/core/live.ts housesWrite POST /houses (409 house.archive) · src/core/houses.ts houseHeld (jen vzniklé samy, af7194c5) · src/commands/tasks.ts 979–1045 (held: houses off) · src/core/waiting.ts 458–460 · app:src/ui/research-tree-settings-ui.ts renderResearchHousesRow (house.auto, researchHousesShown: ne archiv, ne čekající na agenta), src/ui/houses-auto-view.ts · strings.ts houses.auto.* · commity app 3ea32837, research 80bd90e2, 3c9e4853, 9242429a · nález: vypnutí odkládá jen úkoly vzniklé samy (spec 030 K6.1) -->

<a id="S10.6"></a>
## S10.6 Jak agent zkoumá dům

Úkol domu dostane od výzkumu zadání: lidi stromu v domě s roky a fakty, kostru obce, co se prošlo, co je k ručnímu
projití, co nevíme, převzaté údaje k přečtení ([S10.6.2](#S10.6.2)), dosavadní podobu, materiál, sousední domy
a seznam pramenů podle země ([S10.6.1](#S10.6.1)). Seznam je pracovní seznam agenta; do domu jdou jen nálezy
s pramenem a jedna řádka „prošlo se“ se seznamem.

1. **Který dům a kde:** napřed ztotožnit dům. Dnešní číslo podle adresního registru; vesnice číslování většinou
   držely, města přečíslovala asi 1805–1815 a 1884. Přečíslování agent jen navrhne, potvrdí ho člověk
   ([S10.1.2](#S10.1.2)). Když dům ztotožnit nejde, úkol počká na odpověď a agent dál nehledá.
2. **Seznam pramenů ze zadání:** adresní registr, pomístní jména, vodní toky, ortofoto dnes a staré letecké snímky,
   topografie z kostry, místní weby. U zvláštní stavby (mlýn, hospoda, kovárna, fara, škola) i jiné stavby téhož
   druhu v obci, vodní tok a náhon a odkud přišel držitel.
3. **Časová osa, držitelé, obyvatelé:** sčítání po číslech domů (kde je má povolený archiv), matriky po číslech,
   pozemkové knihy. Držitelé (od–do, jak dům nabyli) zvlášť od obyvatel (hospodář, výměnkář, podruh, čeledín,
   nájemník). Sčítání jmenuje držitele jen 1910 a 1921. Lidé mimo strom jsou obyvatelé, nikdy nové osoby stromu.
4. **Krátká podoba** vždy ([S10.7](#S10.7)); mapová vrstva jménem.
5. **Konec:** co nevíme, co je jen v badatelně, co je k ručnímu projití, a kontrola podoby. Ruční kroky a badatelna
   jsou seznam pro člověka, nikdy nový úkol. Znovu vyžádaný dům doplní jen chybějící.

- **Hotový úkol:** agent úkol domu nebo kostry zavře, jen když je zapsané: řádka „prošlo se“ se seznamem; u domu
  krátká podoba, nebo že se o podobě nic neví; s Podobou domů kontrola podoby; žádný nepřečtený převzatý údaj
  z webu. U agentů, jejichž hledání výzkum vidí (Claude, Grok), navíc aspoň 3 hledání a stránky. Jinak „úkol ještě
  není hotový – seznam pramenů domu není prošlý“.
- **Jistota** každého údaje: **jisté**, **pravděpodobné**, **odhad** (u čísla navíc **nejspíš**); agent ji nikdy
  nezvyšuje. Původ: výzkum, z vlastní rešerše, zadáno ručně.
- **Hranice:**
  - kontrolu hotového úkolu má úkol domu a kostry, ne úkol podoby; běží, jen když úkol zavírá agent;
  - ze seznamu nevznikají nové úkoly ani otázky.
- **Platí od:** výzkum 1.38.0
- **Hlídá kód:** kontrola hotového úkolu, návrh přečíslování jen jako návrh. **Jen metodika:** kroky 1–5.

<!-- zdroj: research:assets/method/house.md (house-research, house-town) · src/core/houseauto.ts houseBrief, houseDoneLacks (HOUSE_CHECK_MIN 3, claude a grok) · src/commands/tasks.ts 425–431 (house.checklist, isAgent) · src/core/model.ts HOUSE_CERTAINTIES, RESIDENT_ROLES · cs.json ui.house.certainty.*, ui.house.origin.*, house.research.done · commity 8561e5b1, 202c0927, 8a2d4dd6 · dirigent:spec/145 T5 · nález: počet hledání jen u claude a grok, úkol podoby bez kontroly -->

<a id="S10.6.1"></a>
### S10.6.1 Prameny domu a co nejde ven

Seznam pramenů je podle země, podle bodu obce: obecná část a část pro oblast. Jen veřejné prameny a archivy
povolené ve výzkumu ([R9](R9-archives.md)).

- **Česko:** obec – topografie Schaller (1785–1791) a Sommer (1833–1849), pomístní jména ČÚZK, web, kronika
  a Wikipedie obce, volné obrázky (Wikimedia Commons, volná díla v Krameriovi, Europeana); ručně Památkový
  katalog, mapy stabilního katastru, pozemkové knihy online. Dům – adresní registr RÚIAN, pomístní jméno u bodu,
  vodní toky, ortofoto dnes a z 50. let, topografie z kostry, místní weby; ručně indikační skica, památky,
  pozemkové knihy. Mlýny ručně vodnimlyny.cz.
- **Rakousko:** Františkův katastr (1817–1861), Tyrolsko, Hofnamen Horních Rakous. **Bavorsko:** Häuserbuch,
  Urkataster 1812 a obnova 1861/62.
- **Mapové vrstvy:** Ortofoto ČR (dnes) a Letecké snímky ČR (50. léta); nabídnou se, když vrstva pokrývá místo
  domu, a jen z hostů povolených ve výzkumu.
- **Co nejde ven:** jen obec, číslo domu, souřadnice a jména lidí zemřelých před víc než 100 lety. Nic se
  nepřihlašuje, nekupuje, neobjednává ani neodesílá. Web, jehož podmínky zakazují AI, jen jako odkaz k ručnímu
  projití. Stahují se jen díla s volnou licencí, jinak odkaz.
- **Dnešní lidé:** dnešní držitelé a obyvatelé se nehledají ani nezapisují. Citlivá událost 20. století
  (konfiskace, odsun) se zapíše jako citlivá ([S10.3.2](#S10.3.2)).
- **Hranice:**
  - výzkum odmítne držitele nebo obyvatele bez konce, který začíná v posledních 100 letech, pokud to není osoba
    stromu;
  - pamětník jménem jen se souhlasem;
  - obrázek u podoby domu a obrázek obce jen s volnou licencí (CC0, CC BY, CC BY-SA, volné dílo, GFDL, Free Art
    License, OGL; ne NC, ND, „všechna práva vyhrazena“).
- **Ovládání:** terminál: `strom house sources <dům>`, `--town <obec>`, `--look`.
- **Platí od:** výzkum 1.38.0
- **Hlídá kód:** dnešní držitelé a obyvatelé (jen ta část v Hranicích), pamětník, licence obrázků. **Jen
  metodika:** co jde ven, podmínky webů, citlivé události, ostatní ochrana dnešních lidí.

<!-- zdroj: research:src/core/housesources.ts, assets/housesources.json (cz, at, by; town, house, special, look) · assets/maplayers.json (cz-ortho, cz-ortho-1950, CC BY 4.0) · assets/method/house.md (Prameny, never out) · src/commands/house.ts notToday 416–419 (HOUSE_RECENT 100, --person), material --witness --witness-consent 809–830, notFree 344 · src/core/houses.ts freeLicence 875 · commity 3c9e4853, c96eb4e8, 648b7f1b · nálezy: ochrana dnešních lidí hlídaná jen částečně (spec 030 K1.4a, K6.7), licence materiálu nehlídá kód (K8.5), robots.txt přes strom net web --check neověřeno -->

<a id="S10.6.2"></a>
### S10.6.2 Převzaté údaje s pramenem na webu

Údaj domu (časová osa, držitelé, obyvatelé, čísla, poloha), jehož pramen je jen adresa na webu a který nikdo
nečetl, je **nepřečtený převzatý údaj**. Typicky přišel z vlastní rešerše ([S10.8](#S10.8)). Agent ho v příštím
úkolu domu přečte na adrese a údaj potvrdí, upřesní nebo opraví, s místem v prameni (strana, oddíl).

- Jistota podle druhu pramene: historie obce a kronika nanejvýš **pravděpodobné**.
- Po přečtení jedna řádka „prošlo se“. Dokument se neukládá, adresa zůstává.
- Nedostupná adresa: jen řádka v „prošlo se“, údaj zůstane, jak byl.
- **Hranice:**
  - nepřečtený údaj brání agentovi zavřít úkol domu nebo kostry ([S10.6](#S10.6));
  - údaj od člověka se nikdy nenahradí, nový pramen jde vedle;
  - z toho nevzniká úkol ani otázka.
- **Platí od:** výzkum 1.38.0
- **Hlídá kód:** co je nepřečtené, zavření úkolu. **Jen metodika:** čtení a jistota.

<!-- zdroj: research:src/core/houseunread.ts (pramen S… s webovou adresou, bez obrázků, záznamu a výřezu, bez přepisu a čtení, ne v prošlo se, nečetlo sezení) · assets/method/house.md „Taken over, never read“ · src/core/houses.ts replaceHouseItem (--replaces jen u položek výzkumu) · commit e4ec6ff8 · dirigent:spec/145 T7 -->

<a id="S10.7"></a>
## S10.7 Podoba domu

Úkol domu zapíše vždy **krátkou podobu** domu (popis s jistotou a pramenem, případně obrázek), nebo jednou „podoba:
víc automaticky nejde – <proč>“. Pak řekne, jestli je o podobě co dohledat: **materiál k přečtení**, **obrázek
obce**, na kterém dům nejspíš je, **pramen v ruce**, který stavení popisuje, nebo **víc automaticky nejde**.

- **Úkol podoby** („Podoba domu <dům>“) následuje po úkolu domu jen tam, kde je co dohledat, a jen s Podobou domů
  zapnutou ([S10.5.1](#S10.5.1)). Agent v něm čte jen materiál, obrázek, pramen v ruce a starý letecký snímek
  u bodu domu; co jde jen ručně (např. indikační skica), zapíše k ručnímu projití.
- **Obrázky obce** a **pomístní jména** zapisuje kostra obce jednou pro všechny domy obce; obrázky jen s volnou
  licencí, s licencí a autorem.
- **V aplikaci:** oddíl **Podoba domu** na stránce domu: popis s jistotou a původem, obrázky domu s licencí,
  **Obrázky obce**, **Pomístní jména** (to u tohoto domu první). Když se nic neví: „Jak dům vypadal, není známo.“,
  ruční postup a **Přiložit materiál…**. Stav **ve frontě: podoba domu**.
- **Materiál k hotovému domu** (se zapnutou Historií domů a Podobou domů) založí úkol podoby („k domu přibyl
  materiál po jeho rešerši“).
- **Ve výstupech:** podoba je i v uložené stránce domu, v kapitole **Domy** knihy a ve stránkách rodu; obrázky domu
  s licencí a obrázky obce podle nastavení **Fotky z webu ve výstupech** ([S10.7.1](#S10.7.1)).
- **Hranice:**
  - úkol podoby po vyžádaném domu je také vyžádaný (neodkládá se), na vršek fronty ale nejde;
  - s Podobou domů vypnutou zůstane jen krátká podoba;
  - **Přiložit materiál…** pod neznámou podobou jen v upravitelném stromu.
- **Ovládání:** aplikace: stránka domu → **Podoba domu**; terminál: `strom house show <dům>` (**Podoba**, **Další
  o podobě**, **Obrázky**, **Pomístní jména**), nastavení [S10.5.1](#S10.5.1).
- **Platí od:** výzkum 1.38.0, aplikace 3.33.0
- **Hlídá kód:** úkol podoby jen kde je co dohledat, licence obrázků, jedno „víc automaticky nejde“.

<!-- zdroj: research:src/core/houseauto.ts houseTaskDone 334, createLookTask (asked bez top), houseTaskForMaterial 484 (house.look.material) · src/commands/house.ts look, look-check (--next material|picture|source|none, house.look.unknown), picture, field-name · cs.json ui.house.look, lookCheck, lookNext.*, pictures, fieldNames, house.look.what/why/done · assets/method/house.md house-look · app:src/house-page.ts sec.look, lookUnknown · strings.ts houses.st.queuedLook · commity research 8561e5b1, 202c0927, 9242429a, app 21584d89 · dirigent:spec/145 T1 · nález: úkol podoby vyžádaný, ale ne na vršek -->

<a id="S10.7.1"></a>
### S10.7.1 Fotky domu a obce ve výstupech

Uložená stránka domu ([S10.3.2](#S10.3.2)), kapitola **Domy** v knize a stránky domů ve stránkách rodu
([S10.10](#S10.10)) ukážou obrázky domu s volnou licencí a **Obrázky obce** ([S10.7](#S10.7)). Každý obrázek má
popisek: co ukazuje (u obrázku obce), autor, licence a odkaz na jeho adresu na webu.

- **Nastavení Fotky z webu ve výstupech** platí pro všechny tři výstupy jako výchozí a pamatuje si ho tento prohlížeč:
  - **Načíst z webu** (výchozí): soubor obrázek při otevření načte z jeho adresy na webu, nad popiskem s odkazem;
  - **Jen odkaz**: jen popisek a odkaz.
- **Dialog Kniha a stránky** má přepínač **Fotky domů z webu** (zapnuto = **Načíst z webu**). Je to totéž
  nastavení: přepnutí v dialogu změní i Nastavení. Ukáže se jen, když dům výběru má obrázek:
  - kniha: v **Části knihy** pod **Poloha a mapa domů**, jen s částí **Domy**;
  - stránky rodu: u volby **Domy**, jen s **V rodinných stránkách, propojené s osobami**.
- **Dialog Uložit stránku domu** má přepínač **Fotky domů z webu** vždy: „Načtou se při otevření souboru; bez
  internetu zůstane popisek s odkazem.“ Každé otevření začne z Nastavení; volba platí jen pro tento soubor
  a Nastavení nemění ([S10.3.2](#S10.3.2)).
- **Bez sítě** obrázek v souboru nezabere místo a zůstane popisek s odkazem.
- **Hranice:**
  - obrázek domu jen s licencí; obrázek domu i obce jen s adresou `http` nebo `https`;
  - kniha dá každý obrázek jednou: obrázek obce, který už stojí u dřívějšího domu kapitoly, se neopakuje;
  - soubor nenačítá skripty, písma ani rámce zvenku; obrázek se načítá bez údaje, odkud se otevírá;
  - v okně aplikace se obrázky načítají vždy, nastavení platí jen pro soubory.
- **Ovládání:** aplikace: **Nastavení → Data a soukromí → Fotky z webu ve výstupech** (**Načíst z webu** / **Jen
  odkaz**); dialog **Kniha a stránky** → **Fotky domů z webu**; **Uložit stránku domu** → **Fotky domů z webu**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:51223455 src/ui/house-page-ui.ts showHouseSaveDialog house-photos (outputWebPhotos.bookSwitch, fileHint, z isOutputWebPhotos, HouseSaveChoice.webPhotos) · app:45d99711 src/settings.ts isOutputWebPhotos (výchozí true), setOutputWebPhotos · index.html output-web-photos-setting (settings.groupData) · src/ui/misc.ts output-web-photos · src/house-page.ts housePicturesOf, webPictures (c.app vždy), pictureImg (alt "", referrerpolicy no-referrer, bez onerror), look.images jen s license, town.pictures safeHttpUrl · src/book-houses.ts picturesHtml (seen: obrázek jednou za kapitolu, P.lookPictures) · src/ui/book-ui.ts book-house-photos (kniha: avail.houses && parts.houses && housePicturesOf; stránky: houses === 'pages'), data-switch webPhotos → SettingsManager · strings.ts outputWebPhotos.setting, load, link, settingHint, bookSwitch, bookSwitchHint; book.dialogTitle, dlg.parts, dlg.houseMaps · dirigent:spec/145 T8, prace/1128-app-dum-export-navrh-fotky -->

<a id="S10.8"></a>
## S10.8 Vlastní rešerše a materiál k domu

Vlastní rešerši domu (poznámky, výpisy, odkazy) jde dát výzkumu. Text se uloží beze změny jako materiál
„vlastní rešerše“ a úkol převzetí ho zapíše do domu bez nového hledání.

- **Co bere:** `.md`, `.markdown`, `.txt`, soubor nebo složku. Dům pozná z prvního nadpisu, jinak z názvu souboru;
  dvě čísla jsou dva domy. Stejný soubor podruhé: „už převzato“.
- **Nejasné** (obec není místem výzkumu, víc míst téhož jména, dům ve stromu není) se zeptá v terminálu
  („Který dům?“, **přidat dům …**, **soubor nepřevzít**); nic nehádá.
- **Odkazy v textu** se označí jako prošlé; odkazy v oddílu s nadpisem „ručně“ nebo „badatelna“ zůstanou k ručnímu
  projití.
- **Úkol převzetí** („Převzít rešerši domu <dům>“): jeden na dům, další soubor se přidá. Agent nic nehledá, jistotu
  dá, jak ji dává text (nikdy vyšší), přečíslování jen jako návrh. Údaje s pramenem na webu přečte až úkol domu
  ([S10.6.2](#S10.6.2)). Stav domu **rešerše čeká na převzetí**.
- **Materiál k domu** (soubor nebo vzpomínka): **Přiložit materiál…**. Pamětník jménem jen se souhlasem. Se zapnutou
  Historií domů založí úkol domu (u hotového domu úkol podoby, [S10.7](#S10.7)); s vypnutou se jen uloží.
- **Soubor, který výzkum už má:** dávka z domu ho do výzkumu znovu neposílá. Po uzavření dávky ho aplikace připojí
  k domu sama, po nejvýš 500 souborech. Když dům soubory nepřijme, konec dávky to řekne: „Co už výzkum měl, není
  připojeno k domu <dům>: <důvod>“. Dávka, ve které nic nového není, končí „Už v Materiálech“ s titulkem souboru
  a „Připojen k domu <dům>.“ ([A3.5](A3-evidence-in-the-app.md#A3.5)).
- **Soubor z Materiálů:** soubor výzkumu jde k domu připojit i v okně **Materiály**: **Připojit k…** → **Dům**
  ([A3.5.4](A3-evidence-in-the-app.md#A3.5.4)). Pak je v **Materiály domu** u domu v okně **Domy** a v **Kde je
  použit** u souboru ([A3.5.3](A3-evidence-in-the-app.md#A3.5.3)).
- **Hranice:**
  - `.html`, `.htm` a soubory v podsložkách nebere, jen je vypíše;
  - úkol převzetí se při vypnuté Historii domů neodkládá;
  - agent bez terminálu nejasný soubor nepřevezme, vrátí příkazy k doplnění;
  - přílohy (obrázky, data map) jen s volnou licencí.
- **Ovládání:** aplikace: ⋯ u domu → **Převzít rešerši ze souboru…** (otevře terminál), **Přiložit materiál…**;
  okno **Materiály** → **Připojit k…** → **Dům**; terminál: `strom house import <soubor|složka> [--house <soubor>=<dům>] [--skip <soubor>]`,
  `strom house add material <dům> --input I…` nebo `--memory "<text>"`.
- **Platí od:** výzkum 1.38.0, aplikace 3.33.0
- **Hlídá kód:** dotaz na nejasné, souhlas pamětníka, úkol převzetí. **Jen metodika:** jistota z textu, licence
  příloh.

<!-- zdroj: research:src/commands/house.ts import 927, material 809–830 · src/core/houseimport.ts · assets/terms/houses.json (ručně, badatelna) · cs.json ui.house.import.*, house.takeover(.why), ui.link.what.house.import · src/core/houseauto.ts houseTaskForMaterial (top false) · assets/method/house.md house-takeover · app:strings.ts houses.st.takeover, takeoverNote · commity 5703ae19, 4a6869fd, f766c63f · nálezy: materiál k domu nejde na vršek (komentář × kód), licence materiálu jen metodika · 1128: app:fc290355 src/ui/batch-ui.ts noteHad (media/known, PUT /media, batch/done known, zip known), batchHadToHouse (POST /houses/material po 500, house.material, hadHouseFailed), batchNothingNew, batchHadHtml · strings.ts batch.hadTitle, hadOne, hadHouse, hadHouseFailed · app:7389ceb2 src/ui/material-attach-ui.ts (záložka Dům) · src/ui/house-material-ui.ts renderHouseMaterialsHtml (houses.materials) · app:f527db12 src/ui/material-uses-ui.ts materialHouseRow -->

<a id="S10.9"></a>
## S10.9 Probrat dům s agentem

**Probrat s agentem** otevře rozhovor s agentem o jednom domě. Agent si napřed načte dům, kostru obce, metodiku
domu a seznam pramenů; zapisuje jen to, co zjistí, s pramenem, a navazující úkol založí, jen když o něj člověk řekne.

- Před startem se terminál zeptá: „rozhovor s agentem (<agent>) o domě <dům>: co zjistí, zapíše k domu.“
  a řekne, že agent pracuje na předplatné nebo kredit AI.
- **Hranice:**
  - jen s výzkumem, kde agent pracuje: ne v Archivu Stromu, u výzkumu, který čeká na agenta, ani u ukázky
    ([S9.4](S9-trying-the-sample.md#S9.4));
  - dům musí mít záznam nebo lidi stromu.
- **Ovládání:** aplikace: ⋯ u domu v okně **Domy** a ⋯ stránky domu → **Probrat s agentem** (značka **AI +
  terminál**); terminál: `strom chat --house <dům>`.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:src/ui/house-material-ui.ts houseChatPossible, houseChatLink (do=chat) · strings.ts houses.discuss · commit 955323be · research:src/core/links.ts 525–546 (chat bez with), src/cli/menu-links.ts houseChat, src/commands/start.ts 165–235 (strom chat --house, ui.chat.house.say) · cs.json ui.link.what.chat.house, ui.link.cost · src/core/live.ts AGENT_FEATURES house.chat, forDemo · commity 8561e5b1, 9242429a · dirigent:spec/145 T2 · nález N5: ve stromu jen ke čtení akce zůstává, když ji výzkum dovolí -->

<a id="S10.10"></a>
## S10.10 Domy v knize a ve stránkách

- **Kniha domu:** výběr **Dům** („rodina domu přes generace“) dá knihu o jednom domě: všichni se zápisem v domě,
  podle narození, s rodinami („Rodina domu přes generace: N osob z let …–…, s manžely a dětmi narozenými v domě.“).
  Výchozí je dům osoby v centru, jinak dům s historií s nejvíc lidmi; **Vybrat dům** nabídne **Domy s historií**
  a **Další domy**. Volba **Posledních 100 let jen jménem** (výchozí zapnutá): lidé posledních zhruba 100 let jen
  jménem a rolí, bez dat. Ze stránky domu **Otevřít v knize…** otevře knihu na tomto domě.
- **Kapitola Domy** v knize: domy lidí knihy s historií ([S10.1](#S10.1)) nebo s hotovou historií z výzkumu; u domu
  vyprávění ([S10.14.2](#S10.14.2)), jméno, podoba s obrázky domu a obce ([S10.7.1](#S10.7.1)), čísla v čase,
  časová osa, držitelé, obyvatelé, pozoruhodnosti, poloha ([S10.3.4](#S10.3.4)) a prameny jako číslované poznámky.
  Výchozí zapnutá, jen když má strom aspoň jeden dům s hotovou historií. **Rejstřík domů** jen s kapitolou Domy.
- **Stránky rodu a stránky stromu** ([A7.5](A7-book-pages-and-export.md#A7.5)): volba **Domy**: **V rodinných
  stránkách, propojené s osobami** (výchozí; domy s historií s obdobím a generacemi, **Rejstřík domů** za obcemi
  a stránka každého domu), **Jen zmínka o domě bez jeho stránek**, **Bez domů**. Nabídne se, když lidé výběru žili
  v domě s historií. Časová osa rodu má čip **Domy ⌂** ([S10.11](#S10.11)).
- **Hranice:**
  - kniha i stránky uvedou polohu s přepínačem **Poloha a mapa domů** u každého domu, jehož poloha není skrytá ručně
    ([S10.3.4](#S10.3.4)); citlivé události a události výzkumu posledních zhruba 100 let vynechají
    ([S10.3.2](#S10.3.2)), kniha pak u domu napíše „Události po roce <rok> se v knize neuvádějí.“;
  - stránky nedávají o domech nic z posledních zhruba 100 let, kromě vyprávění o domě a polohy;
  - vyprávění se žijící osobou kniha i stránky vynechají jen s vypnutým **Vyprávění o domech se žijícími osobami**
    ([S10.14.2](#S10.14.2));
  - stránky berou domy s historií podle prahu ([S10.1](#S10.1)), kniha i domy s hotovou historií z výzkumu;
  - výběr **Dům** jen ve stromu s domem s číslem a jen pro knihu; dar ([A7.9](A7-book-pages-and-export.md#A7.9))
    ani obrázek ho nemají;
  - stránky a kniha v daru berou domy podle zapamatované volby knihy a stránek, bez výsledků výzkumu domů; polohu
    a mapu domů dají podle přepínače daru **Poloha a mapa domů**, ne podle volby knihy ([S10.3.4](#S10.3.4)).
- **Ovládání:** aplikace: export **Kniha rodu** → **Dům**, část **Domy**, **Rejstřík domů**, **Poloha a mapa
  domů**, **Fotky domů z webu**, **Vyprávění o domech se žijícími osobami**; stránky rodu a stránky stromu →
  **Domy**, **Poloha a mapa domů**, **Fotky domů z webu**, **Vyprávění o domech se žijícími osobami**;
  **Darovat rodokmen** → **Poloha a mapa domů**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/book-options.ts (book.dlg.kind.house, kindHint.house, chooseHouse, housesHistory, housesOther, dlg.houseScope, houseRecent, bookHouseRecent, parts.houses, parts.houseIndex, bookHouseDefaults, unavailable.houses, unavailable.houseIndexChapter, unavailable.houseIndex), src/book-houses.ts, src/book.ts houseOutputFilter, book.houseIndexProtected, src/lineage.ts case 'house' · src/family-pages.ts 709 outputHouses (overThreshold), src/ui/book-ui.ts 521 familyPages.housesRow, housesOpt.pages/mention/none · page.openInBook · commity 26a28e96, ffc93153, a9f8f9cd, d7db62b4, 5b4d880a, 230afefd, f5b46c5b, 8d93f0d5 · dirigent:spec/145 T6 · T3 poloha v knize: app:438de916 (book.houseChapterProtected) · T4 vyprávění v knize: app:d7f65e13 src/book-houses.ts · T8 koncept a fotky: app:45d99711 src/book-houses.ts picturesHtml, src/book.ts webPhotos, src/family-pages.ts webPhotos · nález N10 (výstupy podle prahu × kniha i s hotovou historií) · 1128: app:28099151 src/book.ts houseStoryForOutput (houseStoriesLiving), src/family-pages-html.ts setStoryHouses, src/ui/book-ui.ts book-house-stories · T10: app:51223455 src/ui/book-ui.ts book-house-maps (outputHouseLocation.housesSwitch; kniha bookHouseMapsState, stránky housesWithLocation), src/house-privacy.ts houseOutputFilter (locationBy manual|output), book.houseChapterProtected · app:6ec8204e src/gift-package.ts (env.pages, env.book z paměti knihy, houseMaps: settings.houseLocations), src/ui/gift-tree-ui.ts giftHouseShots (houseResearch () => null) -->

<a id="S10.11"></a>
## S10.11 Domy jinde v aplikaci

| Kde | Co |
|---|---|
| stránka osoby | adresa události v domě je odkaz na dům; v **Místech** řádek **Domy** s „Dům <číslo> ›“ a roky osoby v domě |
| časová osa | bublina události jmenuje dům |
| časová osa rodu | čip **Domy ⌂**: přiženění a přivdání, odchod z domu, poslední v domě |
| mapa | vrstva **Domy rodu** (výchozí zapnutá, jen když má nějaký dům bod); dům blíž než 30 px k bodu obce zůstane v obci, dokud se mapa nepřiblíží; v migraci domy nejsou |
| okno **Místa** | u obce **Domy rodu** se seznamem; **Domy obce ›**; položka **Historie domu <číslo>** |
| Tabulka | sloupec **Dům** (dům narození nebo události, odkaz na stránku, starší číslo v závorce) |
| seznamy osob | pravidlo **Žil(a) v domě** (i v letech), podle narození, sňatku, sčítání, bydliště a úmrtí ([A11](A11-lists-of-people.md)) |
| Statistiky | téma **Domy**; nejdéle jedna rodina, přiženění a přivdání ([A13](A13-tree-statistics.md)) |
| hledání | skupina **Domy** nad osobami (nejvýš 5); u osoby nalezené číslem domu **Dům ›** |
| fronta a **Čeká na vyřízení** | úkoly **Historie domu <číslo>, <obec>**, **Převzít rešerši domu <číslo>**, **Kostra obce <obec> pro domy**; **Stránka domu ›**; otázka domu s „Dům <číslo> ›“; nová verze vyprávění „Vyprávění o domě <číslo> čeká na schválení“ ([S10.14](#S10.14)) |
| okno **Materiály** | **Připojit k…** → **Dům** připojí soubor výzkumu k domu ([A3.5.4](A3-evidence-in-the-app.md#A3.5.4)); **Kde je použit** má řádek **Dům** s odkazem na stránku domu ([A3.5.3](A3-evidence-in-the-app.md#A3.5.3)) |
| vyprávění osoby | v aplikaci odkaz **Dům <číslo> ›** na dům se schváleným vyprávěním ([S10.14](#S10.14)); v knize a ve stránkách rodu i na koncept ([S10.14.2](#S10.14.2)) |
| GEDCOM | záznam `_HOUSE` jen pro dům se jménem nebo spojený (obec, čísla s datem, jméno, „tentýž dům“); oddělení, poloha, ruční skrytí polohy a odkryté události jen v JSON; vyprávění o domě GEDCOM nenese |

- **Výzkum a `_HOUSE`:** `strom sync` čte domy z GEDCOM aplikace jako slovo člověka: jméno, chybějící číslo
  a „tentýž dům“. Nic neubírá; obec, která není místem výzkumu, jen ohlásí. Výzkum `_HOUSE` do souboru nepíše.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:src/person-page.ts, src/person-houses.ts (integration.ppHouses, 4bb8b52e) · src/rod-timeline.ts, src/house-events.ts (integration.chip, f5b46c5b) · src/map-houses.ts, src/ui/map-houses-ui.ts (houses.mapLayer, 30 px, mapMigOff; 20f6ef91, 31130150, cef1ed0f) · src/ui/house-request-ui.ts familyHouses.* (fa5df8fb) · Tabulka integration.tableCol (fc7aced0) · ruleLivedIn, ruleYears (9cfd8ef1) · src/ui/tree-stats-ui.ts statsHouses, statsLongest, statsMarriedIn (6acc0762) · src/house-search.ts searchGroup, searchHouse (dfe6c13d) · src/house-tasks.ts taskHouse, taskImport, taskSkeleton (4e322dec) · src/ged-houses.ts (d3fd1e86) · research:src/core/housesync.ts planHouses, applyHouseChange (3fbde6b7), ui.sync.house.* · nález: _HOUSE jen jedním směrem · 1128: app:7389ceb2 src/ui/material-attach-ui.ts (attachTarget.house), app:f527db12 src/ui/material-uses-ui.ts materialHouseRow, app:28099151 src/book.ts storyHouses, src/ui/house-page-ui.ts houseHasStory (status final) -->

<a id="S10.12"></a>
## S10.12 Příkazy `strom house`

| Příkaz | Co dělá |
|---|---|
| `strom house list [--town <obec>]` | domy stromu, se záznamem i jen z faktů: dům, obec, číslo, jméno, lidé, roky, stav |
| `strom house show <dům>` / `--town <obec>` | celý dům / kostra obce |
| `strom house sources <dům>` | seznam pramenů úkolu ([S10.6.1](#S10.6.1)) |
| `strom house add <obec> <číslo> [--name]` | nový dům, i bez lidí stromu |
| `strom house add <druh> <dům> …` | zápis do domu: událost, držitel, obyvatel, číslo (`--proposed`), poloha, prošlo se, k ručnímu projití, nevíme, jen v badatelně, podoba, kontrola podoby, obrázek, pomístní jméno, mapa, shrnutí, materiál, jméno |
| `strom house confirm <dům> renumber\|location\|not-same` | slovo člověka ([S10.1.2](#S10.1.2)) |
| `strom house import` | vlastní rešerše ([S10.8](#S10.8)) |
| `strom house request` | vyžádání domu ([S10.4.1](#S10.4.1)) |
| `strom house story <dům>` | vyžádání vyprávění o domě ([S10.14.1](#S10.14.1)) |
| `strom fixes house-numbers` | domy zapsané dvojím způsobem |

- **Odkaz na dům:** `A0001`, klíč (`lhota|16`), `L12 16` nebo `Lhota 16`. Nejednoznačný odkaz výzkum odmítne.
- **Pramen** zápisu: `--source S… --locator … --url … --from I…`; `--replaces <id>` nahradí jen položku výzkumu.
- **`strom fixes house-numbers`** srovná domy zapsané před výzkumem 1.38.0 tak, že z jednoho domu byly dva:
  poznámka, která je jen číslem domu („čp. 13“), jde do pole domu (poznámka zůstane); značka před číslem
  („čp. 16“ → „16“) a před ulicí („čp. Dlouhá 12“ → „Dlouhá 12“) zmizí. Poznámka s víc čísly zůstane a výzkum
  řekne proč. Na slovo člověka, zdarma, i v Archivu Stromu; vrátit jde `strom fixes undo house-numbers`
  ([R13](R13-reporting-a-problem.md)).
- **Hranice:** u kostry obce (`--town`) jen prošlo se, k ručnímu projití, nevíme, jen v badatelně, mapa, shrnutí,
  obrázek, pomístní jméno; shrnutí, obrázek a pomístní jméno jen u obce.
- **Platí od:** výzkum 1.38.0

<!-- zdroj: research:100aee43 src/commands/house.ts house story · research:src/commands/house.ts list 152, show 181, sources 203, add 280/367, confirm 868, import 927, request 232 (hidden) · src/core/houses.ts findHouse 359 (house.unknown, house.ambiguous) · src/core/housenumberfix.ts, src/commands/fixes.ts 1106–1111, ui.fixes.house-numbers.name · cs.json ui.house.head · strom help house (přes guard) · commity 3c69f16c, bd81894a -->

<a id="S10.13"></a>
## S10.13 Strom jen ke čtení a ukázka

- **Strom jen ke čtení** (sledovaný strom, zamčený strom, náhled): okno **Domy** jde otevřít (jediný řádek ve
  skupině nastavení stromu) a domy, stránky a mapy jdou prohlížet. Chybí: **Spojit s jiným domem…**, **Je to
  jiný dům…**, jméno po chalupě, **Ukázat ve výstupech**, **Potvrdit** / **Není to tentýž dům**, **Posunout bod**,
  **Potvrdit polohu** a **Přiložit materiál…** pod neznámou podobou. Akce výzkumu (vyžádání, **Probrat s
  agentem**, **Přiložit materiál…**) zůstávají, jak je výzkum nabízí.
- **Ukázka z webu** ([S9.1.3](S9-trying-the-sample.md#S9.1.3)): akce domů jsou skryté.
- **Ukázkový výzkum `strom demo`** ([S9.4](S9-trying-the-sample.md#S9.4)): bez vyžádání domu, převzetí rešerše,
  rozhovoru o domě a vyprávění o domě; domy, stránky domů a nastavení jdou prohlížet.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: app:src/data.ts 2549 housesReadOnly (isReadOnly || isTreeLocked) · src/ui/tree-actions.ts housesRows (read-only: jediný řádek skupiny, 1127) · src/research-link.ts SHOWCASE_ALLOWS house: 'hide' · research:src/core/live.ts forDemo (bez house.request, house.import, house.chat, house.story – AGENT_FEATURES; house, house.material, house.confirm, house.auto, house.look zůstávají) · nálezy N5 (Probrat s agentem ve stromu jen ke čtení), N6 (řádek Historie domů se nejspíš nabídne i u strom demo, neověřeno) -->

<a id="S10.14"></a>
## S10.14 Vyprávění o domě

Vyprávění o domě je souvislý text pro rodinu: držitelé a rodiny v domě přes generace, co se s domem dělo, čísla
v čase a kde dům stál, jeho podoba a z čeho obec žila. Píše ho agent výzkumu jen z toho, co výzkum o domě a jeho obci
zjistil; nic znovu nehledá. Jako vyprávění osoby ([A7.8](A7-book-pages-and-export.md#A7.8)) to není pramen: jen
převypráví, co doložil výzkum.

- **Hlídá kód:**
  - vyprávění si drží, o co se opírá: položky domu (čísla, události, držitelé, obyvatelé) a údaje lidí stromu
    v domě;
  - je to koncept, dokud ho neschválí člověk; schválené vyprávění je zamčené a nikdy se nepřepíše. Nová verze vznikne
    vedle něj a schválený text platí, dokud člověk nerozhodne ([R6.3.2](R6-awaiting-action.md#R6.3.2));
  - schválit, nebo novou verzi zahodit smí jen člověk ([R6.6](R6-awaiting-action.md#R6.6)).
- **Jen metodika:**
  - co výzkum zná jen se střední jistotou, jako domněnku nebo vodítko, text řekne jako nejisté („nejspíš“, „podle
    rejstříku zatím neověřeného“); číslo, které není týž dům, vynechá; co se nenašlo, řekne;
  - lidé posledních sta let jen jménem a rolí v domě (bez nemoci, soudu, rozvodu). O tom, co ze žijících ukáže nebo
    sdílí, rozhoduje aplikace ([S10.14.2](#S10.14.2));
  - život osoby patří do jejího vyprávění; ve vyprávění o domě má osoba jednu větu s roky v domě.
- **Stránka domu**, oddíl **Vyprávění** hned za **V kostce**:
  - schválený text s nadpisem a prameny;
  - koncept se štítkem „koncept, čeká na schválení“ a tlačítkem **Schválit ve výzkumu** (odkaz do terminálu); štítek
    i tlačítko jsou jen v aplikaci, výstupy dají koncept bez nich ([S10.14.2](#S10.14.2));
  - nová verze vedle schválené: „Nová verze vyprávění (den) čeká na schválení; stránka ukazuje schválený text.“
    s **Porovnat**;
  - dokud se píše, stav úkolu: „Vyprávění o domě je ve frontě výzkumu.“, „Vyprávění o domě se právě píše.“, „Úkol
    vyprávění je ve výzkumu odložený.“, „Úkol vyprávění ve výzkumu čeká na odpověď.“
- **Čeká na vyřízení:** jen nová verze vedle schválené: v aplikaci „Vyprávění o domě <číslo> čeká na schválení“
  s odkazem **Dům <číslo> ›** na oddíl **Vyprávění**, v terminálu „Nová verze vyprávění o domě <dům> – schválené
  zůstává až do rozhodnutí“. První koncept tam není: schvaluje se na stránce domu, nebo `strom story approve A…`.
- **Vyprávění osoby**, která v domě žila, má v aplikaci pod textem odkaz **Dům <číslo> ›** na vyprávění domu, jen
  když dům má schválené vyprávění; text domu se neopakuje. V knize a ve stránkách rodu viz [S10.14.2](#S10.14.2).
- **Hranice:** aplikace bere vyprávění o domě jen z mostu výzkumu (GEDCOM ho nenese); bez spojení s výzkumem oddíl
  ani odkaz není.
- **Ovládání:** aplikace: stránka domu → **Vyprávění**, **Schválit ve výzkumu**, **Porovnat**; terminál:
  `strom story show A…`, `strom story approve A…`, `strom story discard A…`, menu **Co čeká**.
- **Platí od:** aplikace 3.33.0, výzkum 1.38.0

<!-- zdroj: research:100aee43 src/core/housestory.ts (House.story jako Story osoby; facts n…, e…, h…, r…, E…; draft vedle final), src/core/storykeep.ts, src/commands/story.ts (approve|discard A…, person only), src/core/waiting.ts (kind story s house jen pro novou verzi; APP_SHOWS_HOUSE_STORY), assets/method/narrate.md „for house-story“ · cs.json ui.waiting.story.house · app:3473602e src/house-page.ts storyHtml (sec.story za sum; storyDraft, storyNew, storyTask), src/ui/house-page-ui.ts (research.approveStory, story.compare, story?house=&do=final|keep), src/ui/research-overview-ui.ts houses.storyWaiting · app:3080a121 src/person-page.ts storyHousesHtml (houseLink) · zadání aplikace ↔ výzkum ZADANI_VYZKUM_145-domy.md „T4 vyprávění o domě“, „Odpověď stromu k T4“ (první koncept bez položky Co čeká – záměr) -->

<a id="S10.14.1"></a>
### S10.14.1 Kdy vyprávění vznikne: samo a na požádání

- **Samo:** se zapnutými vyprávěními (nastavení `stories`, výchozí zapnuto), po posledním kroku výzkumu domu (výzkum
  domu, případně jeho podoba, [S10.7](#S10.7)), když dům řekne dost: **2 generace stromu** v domě (rodič a dítě),
  nebo **3 držitelé a obyvatelé s prameny**. Další verze jen tehdy, když dům od poslední verze přinesl aspoň **2 nové
  údaje**.
- **Na požádání:** ⋯ na stránce domu nebo v okně **Domy** → **Napsat vyprávění o domě** (když už vyprávění je,
  **Napsat novou verzi vyprávění**); v terminálu `strom house story <dům>` (zeptá se, `--yes` bez otázky). Úkol jde
  na začátek fronty výzkumu a vezme ho nejbližší sezení `strom run`; agent se tím nespouští. Platí bez ohledu na
  práh i na nastavení `stories`. Úkol, který už je, se jen posune: „Úkol už existoval; posunul se na začátek fronty
  výzkumu.“
- **Hranice:**
  - jen dům, o kterém výzkum už něco zapsal; jinak „Ve výzkumu zatím o domě nic není; vyprávění se píše z jeho
    výzkumu.“ (nejdřív historie domu, [S10.4](#S10.4));
  - jen výzkum se svým agentem: v Archivu Stromu, ve výzkumu, který čeká na agenta, a v `strom demo`
    ([S10.13](#S10.13)) se nenabízí;
  - úkol vyprávění jde frontou jako ostatní vyprávění ([R2.2.2](R2-lines-and-queue.md#R2.2.2)); stav domu nemění
    a vypnutá Historie domů ([S10.5.1](#S10.5.1)) ho neodloží;
  - úkol, který člověk zrušil, se sám znovu nezaloží (do nové verze ne).
- **Ovládání:** aplikace: ⋯ stránky domu nebo okna **Domy**; terminál: `strom house story <dům>`,
  `strom config set stories no` (vyprávění samo vypne).
- **Platí od:** výzkum 1.38.0, aplikace 3.33.0

<!-- zdroj: research:100aee43 src/core/housestory.ts HOUSE_STORY_GENERATIONS 2, HOUSE_STORY_PEOPLE 3, houseStoryReach, houseStoryDue (STORY_NEW_FACTS 2 ze src/core/stories.ts; dropped od posledního textu → nic), raiseHouseStories (stories on, ne actsAsArchive, row.state done), askHouseStory (queueAt next, parked → open, house.story.none, house.archive), createStoryTask level narrate · src/commands/house.ts house story (--yes, NeedsInputError) · src/core/live.ts AGENT_FEATURES house.story, POST /houses/story · src/core/config.ts stories (yes výchozí) · strom help house story · app:3473602e strings.ts houses.writeStory, writeStoryAgain, storyAsked, storyMoved, errStoryNone -->

<a id="S10.14.2"></a>
### S10.14.2 Vyprávění ve výstupech a ochrana lidí

- Kniha rodu (část **Domy**), uložená stránka domu a stránky rodu dají schválený text. Dokud vyprávění schválené
  není, dají koncept stejně jako schválený text: bez štítku „koncept, čeká na schválení“, bez jiného vzhledu a bez
  tlačítek. Štítek, **Schválit ve výzkumu** a **Porovnat** jsou jen v aplikaci. U nové verze vedle schválené jde do
  souboru schválený text, nová verze ne. V knize stojí vyprávění před oddíly domu a jeho prameny jsou mezi
  číslovanými poznámkami kapitoly.
- Vyprávění jde do výstupu celé, nebo vůbec; text se nepřepisuje. Lidé posledních zhruba 100 let, osoby výzkumu,
  které strom nezná, ani položky domu, které výstup skrývá ([S10.3.2](#S10.3.2)), ho nevynechají. Ostatní ochrana
  domu platí dál.
- **Uložená stránka domu** nese vyprávění vždy.
- **Kniha rodu a stránky rodu** mají přepínač **Vyprávění o domech se žijícími osobami** (výchozí zapnutý, pamatuje
  se s ostatními volbami dialogu): „Zapnuto: vloží se každé vyprávění o domě. Vypnuto: vyprávění, ve kterém
  vystupuje žijící osoba, se vynechá.“
  - žijící osoba je osoba stromu, kterou aplikace považuje za žijící
    ([S11.1](S11-protecting-living-people.md#S11.1));
    osoba výzkumu, kterou strom nezná, se za žijící nepočítá;
  - přepínač platí bez ohledu na volbu ochrany žijících a vynechá jen takové vyprávění, ne ostatní;
  - kniha: v **Části knihy** pod **Poloha a mapa domů** a **Fotky domů z webu**, jen s částí **Domy**; stránky rodu: u volby
    **Domy**, jen s **V rodinných stránkách, propojené s osobami**;
  - nabídne se, jen když dům výběru má vyprávění, ve kterém vystupuje žijící osoba. Výsledky domů od výzkumu si
    dialog načte hned při otevření.
- **Dar** ([A7.9](A7-book-pages-and-export.md#A7.9)) vyprávění o domech nenese: výsledky domů od výzkumu nečte.
- Odkaz **Dům <číslo> ›** z vyprávění osoby na dům je v knize a ve stránkách rodu jen tehdy, když výstup vyprávění
  domu ukazuje, i když je to koncept.
- **Ovládání:** aplikace: export **Kniha rodu** → část **Domy**, **Vyprávění o domech se žijícími osobami**; stránka
  domu → **Uložit HTML** → **Uložit stránku domu**; stránky rodu → **Domy**, **Vyprávění o domech se žijícími
  osobami**.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:3473602e src/house-privacy.ts houseStoryForOutput · app:d7f65e13 src/book-houses.ts (vyprávění před oddíly, prameny v poznámkách kapitoly) · app:3080a121 src/family-pages-html.ts setStoryHouses · research:src/core/housestory.ts houseStoryView people {id, died} · T8: app:45d99711 src/house-privacy.ts houseStoryForOutput (nová verze vedle final → final) · 1128: app:28099151 src/house-privacy.ts houseStoryForOutput (bez recent, osob bez úmrtí a skrytých položek; leaveOutLiving), houseStoryNamesLiving (personOfRef a ctx.living, osoba mimo strom ne), src/book-houses.ts (bez book-house-story-tag), src/house-page.ts storyHtml (štítek a Schválit jen c.app), shownStory (storyLiving), src/book.ts (opts.houseStoriesLiving), src/book-options.ts housesStoryWithLiving, bookHouseStoriesLiving (výchozí zapnuto), src/book-memory.ts houseStoriesLiving (kniha i PagesChoices), src/ui/book-ui.ts book-house-stories (kniha: parts.houses a chapterHouses; stránky: houses pages), readDialogHouses, src/family-pages-html.ts setStoryHouses (houseStoriesLiving) · strings.ts book.dlg.houseStoriesLiving, houseStoriesLivingHint · src/gift-package.ts (bez houseResearch) · dirigent:prace/1128-app-dum-vypraveni-ochrana Výsledek (dárek vyprávění domů nenese; osoba mimo strom bez úmrtí není žijící) -->
