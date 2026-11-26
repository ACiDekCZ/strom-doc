<a id="S9"></a>
# S9 Vyzkoušet na ukázce

Ukázka je vymyšlená rodina, na které jde Strom vyzkoušet bez vlastních dat. Každý jazyk má vlastní rodinu: česká
ukázka je strom **Ukázka – rod Horáků**. Jsou dvě cesty: aplikace otevře ukázku z webu nebo ze souboru bez
instalace ([S9.1](#S9.1), [S9.2](#S9.2)) a výzkum v terminálu založí ukázkový výzkum příkazem `strom demo`
([S9.4](#S9.4)). Vlastní stromy a výzkumy zůstanou v obou případech beze změny. Když se ukázka nestáhne, nabídne
aplikace malou ukázku, která je přímo v aplikaci ([S9.3](#S9.3)). Kapitola popisuje aplikaci Strom 3.33.0 a výzkum
1.38.0.

| Cesta | Co vznikne | Potřebuje | Smazání |
|---|---|---|---|
| web: **Vyzkoušet na ukázce** | strom ukázky v aplikaci ([S9.1](#S9.1)) | síť | **Správa stromů** |
| soubor ukázky (`.json`) | strom ukázky v aplikaci ([S9.2](#S9.2)) | jen soubor | **Správa stromů** |
| **Vyzkoušet malou ukázku** | strom **Ukázka: rod Bergů** ([S9.3](#S9.3)) | nic | **Správa stromů** |
| `strom demo` | ukázkový výzkum na disku, otevřený v aplikaci ([S9.4](#S9.4)) | nainstalovaný výzkum, síť | `strom demo --remove` |

<!-- zdroj: dirigent:spec/143-ukazkova-data K1.1–K1.4, K2.1–K2.2 · app:src/ui/showcase-open-ui.ts, src/showcase-download.ts · web:demo/cs/strom-ukazka-cs.json hlavička name „Ukázka – rod Horáků“ (en Hartley, de Weber, pl Jaworski) · research:src/core/demo.ts, src/commands/demo.ts -->

<a id="S9.1"></a>
## S9.1 Ukázka z webu

Tlačítko **Vyzkoušet na ukázce** na stromapp.info otevře aplikaci s adresou `/run/?demo=<jazyk>` v jazyce stránky.
Aplikace stáhne soubor ukázky ze stejného webu a otevře ho jako samostatný strom se štítkem **Ukázka**
([S9.1.2](#S9.1.2)).

- Stahování ukazuje oznámení **Stahuje se ukázka** s průběhem („<staženo> MB z <celkem> MB · <procento> %“)
  a tlačítkem **Zrušit**. Zrušení nic nezaloží: „Stahování ukázky je zrušené. Nic se nezměnilo.“
- Strom ukázky vznikne až po stažení celého souboru a kontrole jeho hlavičky. Pak aplikace přepne strom stejně jako
  při každém přepnutí: změny otevřeného stromu odejdou napřed a sledování jeho výzkumu skončí
  ([S1.4](S1-connecting-app-and-research.md#S1.4)). Na konci řekne „Ukázka je otevřená.“
- Ze stromu ukázky se nic neposílá do žádného výzkumu ani mostu.
- **Hranice:**
  - adresa přijme jen `cs`, `en`, `de` a `pl`; jinou hodnotu aplikace nepoužije;
  - `?demo=` z adresy zmizí hned po přečtení: znovu načtená stránka ukázku znovu nestahuje;
  - jazyk aplikace se nemění; ukázka jiného jazyka je jiný strom;
  - soubor se stahuje z adresy `/demo/<jazyk>/strom-ukazka-<jazyk>.json` vedle aplikace;
  - když se nepodaří ukázku stáhnout nebo uložit, otevřený strom zůstane, jak byl, a nic napůl vytvořeného nezůstane
    ([S9.3](#S9.3)).
- **Ovládání:** web: **Vyzkoušet na ukázce**; aplikace: **Nový strom → Vyzkoušet ukázku s výzkumem** a odkaz
  **Vyzkoušet ukázku s výzkumem** u prázdného stromu (obojí otevře ukázku v jazyce aplikace). Odkaz `?demo=` funguje i
  v prohlížeči telefonu a v nainstalované aplikaci.
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/ui/research-ui.ts initExternalOpen (?demo= pryč z adresy hned, i při jiné hodnotě), runExternalRequest (nainstalovaná aplikace) · src/showcase-download.ts showcaseLangParam, showcaseFileUrl, downloadShowcase · src/ui/showcase-open-ui.ts openShowcaseFromUrl, downloadShowcaseWithToast, openShowcaseFile (runTreeSwitch, researchFollowBeforeSwitch), createShowcaseTree, tieShowcaseResearch (sendMode 'off', bez adresy mostu), tryShowcase, showcaseLangOfUi · index.html new-tree-showcase-option, prázdný stav sample.tryTitle · strings.ts sample.downloading, downloadedOf, cancelled, openedTitle, tryTitle · web:js/i18n.js demo_try_btn (za branou demo) · app 9ea6ca78..534f3e9d -->

<a id="S9.1.1"></a>
### S9.1.1 Druhé otevření a novější ukázka

Ukázka, která už v prohlížeči je, se znovu nestahuje: aplikace na ni jen přepne, bez oznámení a bez okna. Potom se
zeptá webu na verzi ukázky. Když je na webu novější, nabídne ji oznámením „Je novější ukázka (<verze>).“ s akcemi
**Aktualizovat ukázku…** a **Teď ne**.

- Novější verzi nabídne oznámení jednou za verzi. Dokud aplikace o novější verzi ví, má ji i nabídka ⋯ řádku
  ukázky ve **Správě stromů**: **Aktualizovat ukázku (<verze>)…**.
- Aktualizace se nejdřív zeptá (**Aktualizovat ukázku?**: „Strom „…“ se nahradí ukázkou verze … Změny udělané
  v ukázce se ztratí. Ostatní stromy zůstanou beze změny.“). Pak stáhne novou ukázku a nahradí data stromu. Strom
  zůstane stejný, s názvem a nastavením: výchozí osoba (pokud v nové ukázce je), výchozí pohled a uložené pohledy
  Tabulky. Na konci řekne „Ukázka je aktualizovaná na verzi <verze>.“
- **Hranice:**
  - ukázka se pozná podle své značky, ne podle názvu: přejmenovaná ukázka se jen přepne a aktualizuje dál;
  - aktualizace, která se nepovede, nechá strom, jak byl;
  - otevřený soubor ukázky novější než strom ukázky nabídne aktualizaci rovnou z tohoto souboru;
  - samostatný soubor HTML se na verzi webu neptá.
- **Ovládání:** aplikace: oznámení **Aktualizovat ukázku…**; **Správa stromů → ⋯ → Aktualizovat ukázku (<verze>)…**
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/ui/showcase-open-ui.ts openShowcaseFromUrl (existing → switchToShowcase, checkShowcaseVersion jen mimo embedded), checkShowcaseVersion (localStorage strom-sample-offered-<lang>, jednou za verzi), offerShowcaseUpdate, updateShowcase, replaceShowcaseTree, keepShowcaseSettings (defaultPersonId, defaultView, tableViews, lastFocus) · src/showcase-download.ts showcaseVersionUrl, newerShowcaseVersion · src/tree-manager.ts findTreeByExportId (exportId showcase-<lang>) · src/ui/tree-actions.ts sampleUpdate (jen Správa stromů) · strings.ts sample.newerTitle, update, notNow, updateTitle, updateConfirm, updated, updateMenu -->

<a id="S9.1.2"></a>
### S9.1.2 Štítek Ukázka a smazání ukázky

Strom ukázky má štítek **Ukázka** v záhlaví za názvem stromu, v přepínači stromů a ve **Správě stromů**. Bublina
štítku říká: „Vymyšlená rodina k vyzkoušení. Ostatní stromy zůstávají beze změny; ukázku jde smazat ve Správě
stromů.“

- Řádek ukázky ve **Správě stromů** uvádí datum, ke kterému jsou data ukázky („stav k <datum>“).
- Ukázka se maže jako každý strom: **Správa stromů → Smazat strom…** s obvyklým potvrzením. Jiné stromy se tím nemění.
- **Hranice:** štítek se drží značky stromu, ne názvu: přejmenovaná ukázka ho má dál. Štítek má i malá ukázka
  ([S9.3](#S9.3)).
- **Ovládání:** aplikace: štítek **Ukázka** (na dotykové obrazovce ukáže bublinu klepnutí); **Správa stromů**
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/ui/sample-tag.ts sampleTagHtml · src/tree-manager.ts sampleKindOf, markSampleTree · src/tree-row.ts treeSampleKind (showcase i demo) · src/ui/tree-management.ts tree-badge--sample, sample.asOf · strings.ts sample.tag, tagTitle, asOf · app 9ea6ca78, 3505db77, bc1c497d -->

<a id="S9.2"></a>
## S9.2 Soubor ukázky a samostatný soubor HTML

Soubor ukázky (`strom-ukazka-<jazyk>.json`) je na webu ke stažení vedle tlačítka **Vyzkoušet na ukázce**. V aplikaci
se otevře přetažením do okna nebo přes **Nový strom → Z JSON** a dál jde stejnou cestou jako ukázka z webu
([S9.1](#S9.1)): vznikne samostatný strom se štítkem **Ukázka**, druhé otevření na něj jen přepne a novější soubor
nabídne aktualizaci ([S9.1.1](#S9.1.1)).

- Aplikace pozná soubor ukázky podle hlavičky v souboru, ne podle jména. Kde to prohlížeč dovolí, ukáže už při
  přetažení „Pustit sem: otevřít ukázku“.
- Při čtení ukazuje oznámení **Otevírá se ukázka** se jménem a velikostí souboru a s tlačítkem **Zrušit**.
- Samostatný soubor HTML (uložené HTML, [A7.7](A7-book-pages-and-export.md#A7.7)) ukázku nestahuje. **Vyzkoušet
  ukázku s výzkumem**, odkaz u prázdného stromu i `?demo=` v něm otevřou okno **Ukázka s výzkumem** s volbami
  **Stáhnout soubor ukázky (stromapp.info) ↗** (otevře soubor na webu v novém okně), **Otevřít malou ukázku**
  a **Otevřít stažený soubor ukázky…**.
- **Hranice:**
  - soubor ukázky se otevře vždy jako vlastní strom, i když import mířil do otevřeného stromu;
  - soubor, který nejde přečíst, nebo soubor pro novější verzi aplikace ohlásí okno z [S9.3](#S9.3), bez **Zkusit
    znovu**.
- **Ovládání:** aplikace: přetažení souboru do okna; **Nový strom → Z JSON**; v samostatném souboru HTML **Nový strom
  → Vyzkoušet ukázku s výzkumem → Otevřít stažený soubor ukázky…**; web: odkaz **Soubor ukázky ke stažení**
- **Platí od:** aplikace 3.33.0

<!-- zdroj: app:src/ui/import-export.ts importDroppedJson (fileLooksLikeShowcase), JSON import isShowcaseFile → openShowcaseFromJson („whatever tree the import was meant for“) · src/showcase-format.ts (kind strom-showcase) · src/ui/showcase-open-ui.ts openShowcaseRead (opening, Zrušit do přečtení), showShowcaseEmbedded, pickShowcaseFile, openShowcaseFromUrl (embedded → showShowcaseEmbedded) · strings.ts sample.dropTitle, opening, embeddedTitle, embeddedLink, embeddedOpen, openSmall, treeManager.fromJson · web:js/i18n.js demo_file · app 33b82179 -->

<a id="S9.3"></a>
## S9.3 Když se ukázka nestáhne: malá ukázka

Když se ukázka nestáhne nebo nejde otevřít, řekne aplikace proč v jednom okně. Hlavní volba okna je **Otevřít malou
ukázku**. Otevřený strom se nezmění.

| Kdy | Nadpis okna | Zkusit znovu |
|---|---|---|
| aplikace je bez připojení | **Ukázka se nestáhla** | ano |
| server odpověděl chybou nebo se stahování přerušilo | **Ukázka se nestáhla** | ano |
| v úložišti prohlížeče není místo | **Na ukázku není místo** | ne |
| soubor je poškozený nebo neznámý (chybí hlavička) | **Soubor ukázky nejde otevřít** | ne |
| ukázka je pro novější verzi aplikace | **Soubor ukázky nejde otevřít** | ne |

- Malá ukázka je strom **Ukázka: rod Bergů**. Je přímo v aplikaci a otevře se i bez sítě. S výzkumem se nikdy
  nepropojí ([S1.3.1](S1-connecting-app-and-research.md#S1.3.1)).
- **Hranice:**
  - na ukázku musí být v úložišti prohlížeče volné místo aspoň na dvojnásobek její velikosti. Aplikace to zjistí
    před stažením i během něj a při nedostatku místa stahování hned zastaví;
  - když se strom ukázky nepodaří celý uložit, aplikace ho zase smaže a otevře strom, který byl otevřený předtím.
- **Ovládání:** aplikace: **Otevřít malou ukázku**, **Zkusit znovu**, **Zavřít**; malá ukázka také **Nový strom →
  Vyzkoušet malou ukázku** a odkaz **Vyzkoušet malou ukázku** u prázdného stromu.
- **Platí od:** aplikace 3.33.0 (malá ukázka od aplikace 3.29.0 pod názvem **Vyzkoušet ukázkový strom**)

<!-- zdroj: app:src/ui/showcase-open-ui.ts showcaseErrorText, showShowcaseError (retry jen offline a server), createShowcaseTree, dropShowcaseTree · src/showcase-download.ts downloadShowcase, showcaseRoomNeeded (2×), showcaseRoomShort, showcaseFetchFailure · src/ui/import-export.ts loadDemoTree, openDemoTree (markDemoTree) · index.html demo.tryDemoSmall (Nový strom, prázdný stav) · strings.ts sample.errTitle, errOffline, errServer, errSpaceTitle, errSpace, errBrokenTitle, errBroken, errFormat, retry, openSmall, demo.treeName, demo.tryDemoSmall · app b831dcdd -->

<a id="S9.4"></a>
## S9.4 Ukázkový výzkum: `strom demo`

`strom demo [cs|en|de|pl]` stáhne ukázkový výzkum z webu aplikace Strom, založí ho ve vlastní složce a otevře ho
v aplikaci jako výzkum (stejně jako `strom app`). Celý jde prohlížet bez předplatného AI: přehled výzkumu, linie,
fronta, prameny, materiály a úkoly, které čekají na člověka.

- Výzkum stáhne z `https://stromapp.info/demo/<jazyk>/` soubor `VERSION`, balík té verze a jeho SHA-256. Balík
  ověří podle SHA-256 a rozbalí stejně jako `strom unpack` (každý obrázek podle svého SHA-256, celý strom
  zkontrolovaný).
- Ukázkový výzkum leží ve složce `demo` ve složce nastavení `strom` (`~/.config/strom/demo`, ve Windows
  `.config\strom\demo` ve složce uživatele), s vlastním nastavením, vlastními stromy, sdílenou složkou a klíčem
  pečeti. Vlastní rodokmeny, jejich zálohy a nastavení se nemění;
  ukázka není mezi vlastními stromy. V `strom.json` má `demo: true`.
- Výzkum u ukázky agenta sám nespouští a most ukázky aplikaci nic s agentem nenabízí: nejmenuje žádného agenta ani
  běhy, čekající úkoly nemají rozhovor s agentem ani vrácení agentovi, nenabízí okamžité čtení dokumentu ani hromadné
  ověření. `strom demo` se při prvním otevření neptá, jestli smí aplikace spouštět výzkum.
- Bez jazyka vezme `strom demo` jazyk, kterým `strom` v terminálu mluví; když to není jeden ze čtyř jazyků, vezme `en`.
- **Hranice:**
  - druhé spuštění pro stejný jazyk nic nestahuje a otevře ukázku, která už na počítači je („Ukázkový výzkum „…“ už
    tu je“); ukázky více jazyků mohou být na počítači vedle sebe;
  - balík, jehož SHA-256 nesedí, se nepoužije a nic se nezaloží; stejně balík v jiném jazyce, než byl požadovaný,
    a balík s konektory (ukázka žádné nemá);
  - ukázkový výzkum, který se nepodaří celý založit, se zase smaže;
  - bez internetu: „ukázkový výzkum se nepodařilo stáhnout“, s radou spustit `strom demo` znovu po připojení;
  - jazyk mimo `cs`, `en`, `de`, `pl` výzkum odmítne.
- **Ovládání:** terminál: `strom demo`, `strom demo de`; web: stránka instalace výzkumu, oddíl **Ukázkový výzkum**
- **Platí od:** výzkum 1.38.0
- **Proč:** ukázka má jít prohlížet bez předplatného AI; agent na ní pracovat smí, ale výzkum ho nenabízí ani
  nedoporučuje (rozhodnutí 25. 11. 2026).

<!-- zdroj: research:src/commands/demo.ts (demoBase, run: demoLang(ctx.uiLang()) ?? "en", had → jen otevřít, own Settings, c.demo = true, app.run, rm při chybě) · src/core/demo.ts DEMO_LANGS, DEMO_FOLDER, demoPaths, demoEnv, downloadDemo (SHA-256, demo.download, demo.damaged), unpackDemo (demo.lang, demo.code), DEMO_MAX_BYTES · src/core/paths.ts configDir · src/core/live.ts forDemo, DEMO_HIDDEN, tree.demo, agent/runs undefined, accepts (bez read) · src/core/waiting.ts demo (bez chat a retry) · src/commands/start.ts offerLinks (ne u ukázky) · assets/lang/cs.json ui.demo.*, ui.error.demo.* · dirigent:spec/143-ukazkova-data Rozhodnutí 25. 11., K2.1, K2.2 · web:js/i18n.js demo_cmd_title · research afed49d3, 97fc3a23, 8500b369, 3348ed20 -->

<a id="S9.4.1"></a>
### S9.4.1 Smazání: `strom demo --remove`

`strom demo --remove` ukončí most ukázkového výzkumu a smaže celou jeho složku: ukázky všech jazyků, jejich
nastavení a klíče pečeti. Nic jiného nesmaže. Kopie ukázky v aplikaci se maže v aplikaci ve **Správě stromů**.

- **Hranice:**
  - když na ukázce někdo právě pracuje, výzkum ji nesmaže: „na ukázkovém výzkumu se právě pracuje – smaže se, až
    práce skončí“;
  - když most ukázky neskončí, nic se nesmaže;
  - bez ukázky na počítači: „Ukázkový výzkum na tomto počítači není.“
- **Ovládání:** terminál: `strom demo --remove`; aplikace: **Správa stromů → Smazat strom…**
- **Platí od:** výzkum 1.38.0

<!-- zdroj: research:src/commands/demo.ts removeDemo (anyoneAtWork → demo.atwork, stopLive → demo.bridge, rmSync root) · assets/lang/cs.json ui.demo.none, ui.demo.removed, ui.demo.removed.app, ui.error.demo.atwork, ui.error.demo.bridge -->
