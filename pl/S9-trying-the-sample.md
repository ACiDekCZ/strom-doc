<a id="S9"></a>
# S9 Wypróbuj na przykładzie

Przykład to zmyślona rodzina, na której można wypróbować Strom bez własnych danych. Każdy język ma własną rodzinę:
polski przykład to drzewo **Przykład – rodzina Jaworskich**. Są dwie drogi: aplikacja otwiera przykład z sieci albo z
pliku bez instalacji ([S9.1](#S9.1), [S9.2](#S9.2)), a badania w terminalu zakładają poleceniem `strom demo`
przykładowe badanie ([S9.4](#S9.4)). Własne drzewa i badania w obu przypadkach pozostają bez zmian. Gdy przykład się
nie pobierze, aplikacja proponuje mały przykład, który jest w samej aplikacji ([S9.3](#S9.3)). Rozdział opisuje
aplikację Strom 3.33.0 i badania 1.38.0.

| Droga | Co powstaje | Potrzebuje | Usunięcie |
|---|---|---|---|
| strona: **Wypróbuj na przykładzie** | drzewo przykładu w aplikacji ([S9.1](#S9.1)) | sieć | **Zarządzanie drzewami** |
| plik przykładu (`.json`) | drzewo przykładu w aplikacji ([S9.2](#S9.2)) | tylko plik | **Zarządzanie drzewami** |
| **Wypróbuj mały przykład** | drzewo **Przykład: ród Bergów** ([S9.3](#S9.3)) | nic | **Zarządzanie drzewami** |
| `strom demo` | przykładowe badanie na dysku, otwarte w aplikacji ([S9.4](#S9.4)) | zainstalowane badania, sieć | `strom demo --remove` |

<!-- zdroj: dirigent:spec/143-ukazkova-data K1.1–K1.4, K2.1–K2.2 · app:src/ui/showcase-open-ui.ts, src/showcase-download.ts · web:demo/cs/strom-ukazka-cs.json hlavička name „Ukázka – rod Horáků“ (en Hartley, de Weber, pl Jaworski) · research:src/core/demo.ts, src/commands/demo.ts -->

<a id="S9.1"></a>
## S9.1 Przykład z sieci

Przycisk **Wypróbuj na przykładzie** na stromapp.info otwiera aplikację pod adresem `/run/?demo=<język>` w języku
strony. Aplikacja pobiera plik przykładu z tej samej strony i otwiera go jako osobne drzewo z etykietą **Przykład**
([S9.1.2](#S9.1.2)).

- Pobieranie pokazuje komunikat **Pobieranie przykładu** z postępem („<pobrano> MB z <razem> MB · <procent>%”) i
  przyciskiem **Anuluj**. Anulowanie niczego nie zakłada: „Pobieranie przykładu anulowano. Nic się nie zmieniło.”
- Drzewo przykładu powstaje dopiero, gdy cały plik jest pobrany, a jego nagłówek sprawdzony. Potem aplikacja przełącza
  drzewo jak przy każdym przełączeniu: zmiany otwartego drzewa idą najpierw, a śledzenie jego badań się kończy
  ([S1.4](S1-connecting-app-and-research.md#S1.4)). Na końcu mówi „Przykład jest otwarty.”
- Z drzewa przykładu nic nie jest wysyłane do żadnych badań ani mostu.
- **Granice:**
  - adres przyjmuje tylko `cs`, `en`, `de` i `pl`; innej wartości aplikacja nie używa;
  - `?demo=` znika z adresu, gdy tylko zostanie odczytane: ponownie wczytana strona nie pobiera przykładu jeszcze raz;
  - język aplikacji się nie zmienia; przykład w innym języku to inne drzewo;
  - plik jest pobierany z adresu `/demo/<język>/strom-ukazka-<język>.json` obok aplikacji;
  - gdy przykładu nie da się pobrać ani zapisać, otwarte drzewo zostaje, jakie było, i nic w połowie założonego nie
    zostaje ([S9.3](#S9.3)).
- **Obsługa:** strona: **Wypróbuj na przykładzie**; aplikacja: **Nowe drzewo → Wypróbuj przykład z badaniami** i link
  **Wypróbuj przykład z badaniami** przy pustym drzewie (oba otwierają przykład w języku aplikacji). Link `?demo=`
  działa także w przeglądarce telefonu i w zainstalowanej aplikacji.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/ui/research-ui.ts initExternalOpen (?demo= pryč z adresy hned, i při jiné hodnotě), runExternalRequest (nainstalovaná aplikace) · src/showcase-download.ts showcaseLangParam, showcaseFileUrl, downloadShowcase · src/ui/showcase-open-ui.ts openShowcaseFromUrl, downloadShowcaseWithToast, openShowcaseFile (runTreeSwitch, researchFollowBeforeSwitch), createShowcaseTree, tieShowcaseResearch (sendMode 'off', bez adresy mostu), tryShowcase, showcaseLangOfUi · index.html new-tree-showcase-option, prázdný stav sample.tryTitle · strings.ts sample.downloading, downloadedOf, cancelled, openedTitle, tryTitle · web:js/i18n.js demo_try_btn (za branou demo) · app 9ea6ca78..534f3e9d -->

<a id="S9.1.1"></a>
### S9.1.1 Ponowne otwarcie i nowszy przykład

Przykład, który już jest w przeglądarce, nie jest pobierany ponownie: aplikacja tylko na niego przełącza, bez
komunikatu i bez okna. Potem pyta stronę o wersję przykładu. Gdy strona ma nowszą, aplikacja proponuje ją komunikatem
„Jest nowszy przykład (<wersja>).” z akcjami **Zaktualizuj przykład…** i **Nie teraz**.

- Komunikat proponuje nowszą wersję raz na wersję. Dopóki aplikacja wie o nowszej wersji, ma ją także menu ⋯ wiersza
  przykładu w **Zarządzaniu drzewami**: **Zaktualizuj przykład (<wersja>)…**.
- Aktualizacja najpierw pyta (**Zaktualizować przykład?**: „Drzewo „…” zostanie zastąpione przykładem w wersji ….
  Zmiany wprowadzone w przykładzie przepadną. Pozostałe drzewa pozostaną bez zmian.”). Potem pobiera nowy przykład i
  zastępuje dane drzewa. Drzewo pozostaje to samo, z nazwą i ustawieniami: domyślna osoba (jeśli nowy przykład ją
  ma), domyślny widok i zapisane widoki Tabeli. Na końcu mówi „Przykład zaktualizowano do wersji <wersja>.”
- **Granice:**
  - przykład rozpoznaje się po oznaczeniu, nie po nazwie: na przykład o zmienionej nazwie aplikacja nadal tylko
    przełącza i nadal go aktualizuje;
  - aktualizacja, która się nie uda, zostawia drzewo, jakie było;
  - otwarty plik przykładu nowszy niż drzewo przykładu proponuje aktualizację prosto z tego pliku;
  - samodzielny plik HTML nie pyta strony o wersję.
- **Obsługa:** aplikacja: komunikat **Zaktualizuj przykład…**; **Zarządzanie drzewami → ⋯ → Zaktualizuj przykład
  (<wersja>)…**
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/ui/showcase-open-ui.ts openShowcaseFromUrl (existing → switchToShowcase, checkShowcaseVersion jen mimo embedded), checkShowcaseVersion (localStorage strom-sample-offered-<lang>, jednou za verzi), offerShowcaseUpdate, updateShowcase, replaceShowcaseTree, keepShowcaseSettings (defaultPersonId, defaultView, tableViews, lastFocus) · src/showcase-download.ts showcaseVersionUrl, newerShowcaseVersion · src/tree-manager.ts findTreeByExportId (exportId showcase-<lang>) · src/ui/tree-actions.ts sampleUpdate (jen Správa stromů) · strings.ts sample.newerTitle, update, notNow, updateTitle, updateConfirm, updated, updateMenu -->

<a id="S9.1.2"></a>
### S9.1.2 Etykieta Przykład i usunięcie przykładu

Drzewo przykładu ma etykietę **Przykład** w nagłówku za nazwą drzewa, w przełączniku drzew i w **Zarządzaniu
drzewami**. Dymek etykiety mówi: „Zmyślona rodzina do wypróbowania. Pozostałe drzewa pozostają bez zmian; przykład
można usunąć w Zarządzaniu drzewami.”

- Wiersz przykładu w **Zarządzaniu drzewami** podaje datę, na którą są dane przykładu („stan na <data>”).
- Przykład usuwa się jak każde drzewo: **Zarządzanie drzewami → Usuń drzewo…** ze zwykłym potwierdzeniem. Pozostałe
  drzewa się przez to nie zmieniają.
- **Granice:** etykieta idzie za oznaczeniem drzewa, nie za nazwą: przykład o zmienionej nazwie ją zachowuje. Etykietę
  ma też mały przykład ([S9.3](#S9.3)).
- **Obsługa:** aplikacja: etykieta **Przykład** (na ekranie dotykowym dotknięcie pokazuje dymek); **Zarządzanie
  drzewami**
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/ui/sample-tag.ts sampleTagHtml · src/tree-manager.ts sampleKindOf, markSampleTree · src/tree-row.ts treeSampleKind (showcase i demo) · src/ui/tree-management.ts tree-badge--sample, sample.asOf · strings.ts sample.tag, tagTitle, asOf · app 9ea6ca78, 3505db77, bc1c497d -->

<a id="S9.1.3"></a>
### S9.1.3 Badanie przykładu tylko do przeglądania

Drzewo przykładu ze strony lub z pliku przykładu ma ze sobą także migawkę swojego badania. Przegląd badania, to, co
badanie wie, i materiały można przeglądać wprost w aplikacji, bez instalacji badań i bez subskrypcji AI. Do migawki
nic nie jest zapisywane i nic nie jest z niej nigdzie wysyłane.

- Po otwarciu przykładu komunikat **Przykład jest otwarty.**: „Jego badania można przeglądać; zmiany nie trafiają do
  żadnych badań.” W **Zarządzaniu drzewami** drzewo przykładu ma wiersz „badania przykładu · tylko do przeglądania”.
- Przegląd badania ma pod nagłówkiem „Stan przykładu na <data>” i „W przykładzie tylko do przeglądania – pełne
  badania:” z poleceniem `strom demo` ([S9.4](#S9.4)), przyciskiem **Kopiuj** i linkiem **Jak to zrobić ↗** do strony
  instalacji badań.
- **Główne działania** badania pozostają widoczne, wyszarzone, z oznaczeniem: praca agenta, wysłanie zmian,
  sprzeczność, sprzeczność do agenta, hipoteza, odpowiedź, kolejność w kolejce, przetworzenie od razu, nowa linia
  i rozmowa z agentem. Dymek (najechanie, fokus lub dotknięcie; Escape go zamyka) wyjaśnia: **W przykładzie tylko do
  przeglądania**, „W pełnych badaniach: <działanie> · <oznaczenie>” (**AI + terminal** lub **terminal**,
  [S4.5.1](S4-research-from-the-app.md#S4.5.1)) i „Pełne badania z agentem:” `strom demo` z **Kopiuj** i **Jak to
  zrobić ↗**.
- Stopka menu **Badanie** pokazuje **W przykładzie tylko do przeglądania**, a menu „Zmiany nie są wysyłane do
  badania”. **Wyślij** jest wyszarzone z wyjaśnieniem także na pasku synchronizacji i w **Co zostanie wysłane**. Na
  telefonie w arkuszu **Więcej** są wyszarzone **Kontynuuj z agentem** i **Wyślij**; dotknięcie mówi dlaczego.
- **Granice:**
  - pozostałe zapisy do badania i działania domów nie są widoczne wcale ([S10.13](S10-houses.md#S10.13));
  - zmiany drzewa przykładu zostają w aplikacji, do badania nie trafiają;
  - z przykładu nie uruchamia się żaden agent.
- **Obsługa:** aplikacja: menu **Badanie**, Przegląd badania, dymek przy wyszarzonym działaniu
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: dirigent:spec/143-ukazkova-data K4, K4.1, úkol A2 · app:src/showcase-bridge.ts (most ze snímku, každý zápis 403 showcase.read-only) · src/research-link.ts SHOWCASE_ALLOWS (10 hlavních akcí zašedlé, house: 'hide') · src/ui/sample-why.ts sampleNoteEl, showcaseWhyContent · src/tree-row.ts treeOriginLine · src/ui/showcase-open-ui.ts · strings.ts sample.originLine, openedTitle, opened, asOfLine, readOnly, whyTitle, whyFull, whyWhat, copy, howTo, sync.sendOffLine, mobileMenu.more · app 73628eda, 617b893e, 0754e561, bdb0b181, 635112ff, c8de3d8c, 67351f80, 89f6c9a5 · nález N7: K4.1 „neaktivní s vysvětlením“ × kód ostatní zápisy skryje -->

<a id="S9.2"></a>
## S9.2 Plik przykładu i samodzielny plik HTML

Plik przykładu (`strom-ukazka-<język>.json`) jest na stronie do pobrania obok przycisku **Wypróbuj na przykładzie**. W
aplikacji otwiera się przez przeciągnięcie do okna albo przez **Nowe drzewo → Z JSON** i idzie potem tą samą drogą co
przykład z sieci ([S9.1](#S9.1)): powstaje osobne drzewo z etykietą **Przykład**, ponowne otwarcie tylko na nie
przełącza, a nowszy plik proponuje aktualizację ([S9.1.1](#S9.1.1)).

- Aplikacja rozpoznaje plik przykładu po nagłówku w pliku, nie po nazwie. Tam, gdzie przeglądarka na to pozwala, już
  przeciąganie pokazuje „Upuść tutaj: otwórz przykład”.
- Podczas odczytu komunikat **Otwieranie przykładu** pokazuje nazwę i rozmiar pliku oraz przycisk **Anuluj**.
- Samodzielny plik HTML (zapisany HTML, [A7.7](A7-book-pages-and-export.md#A7.7)) nie pobiera przykładu. **Wypróbuj
  przykład z badaniami**, link przy pustym drzewie i `?demo=` otwierają w nim okno **Przykład z badaniami** z
  wyborami **Pobierz plik przykładu (stromapp.info) ↗** (otwiera plik na stronie w nowym oknie), **Otwórz mały
  przykład** i **Otwórz pobrany plik przykładu…**.
- **Granice:**
  - plik przykładu zawsze otwiera się jako osobne drzewo, także gdy import był przeznaczony dla otwartego drzewa;
  - plik, którego nie da się odczytać, albo plik dla nowszej wersji aplikacji zgłasza okno z [S9.3](#S9.3), bez
    **Spróbuj ponownie**.
- **Obsługa:** aplikacja: przeciągnięcie pliku do okna; **Nowe drzewo → Z JSON**; w samodzielnym pliku HTML **Nowe
  drzewo → Wypróbuj przykład z badaniami → Otwórz pobrany plik przykładu…**; strona: link **Plik przykładu do
  pobrania**
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/ui/import-export.ts importDroppedJson (fileLooksLikeShowcase), JSON import isShowcaseFile → openShowcaseFromJson („whatever tree the import was meant for“) · src/showcase-format.ts (kind strom-showcase) · src/ui/showcase-open-ui.ts openShowcaseRead (opening, Zrušit do přečtení), showShowcaseEmbedded, pickShowcaseFile, openShowcaseFromUrl (embedded → showShowcaseEmbedded) · strings.ts sample.dropTitle, opening, embeddedTitle, embeddedLink, embeddedOpen, openSmall, treeManager.fromJson · web:js/i18n.js demo_file · app 33b82179 -->

<a id="S9.3"></a>
## S9.3 Gdy przykład się nie pobierze: mały przykład

Gdy przykład się nie pobierze albo nie da się go otworzyć, aplikacja podaje powód w jednym oknie. Głównym wyborem
okna jest **Otwórz mały przykład**. Otwarte drzewo się nie zmienia.

| Kiedy | Tytuł okna | Spróbuj ponownie |
|---|---|---|
| aplikacja nie ma połączenia | **Przykład się nie pobrał** | tak |
| serwer odpowiedział błędem albo pobieranie się przerwało | **Przykład się nie pobrał** | tak |
| w pamięci przeglądarki nie ma miejsca | **Brak miejsca na przykład** | nie |
| plik jest uszkodzony albo nieznany (brak nagłówka) | **Nie można otworzyć pliku przykładu** | nie |
| przykład jest dla nowszej wersji aplikacji | **Nie można otworzyć pliku przykładu** | nie |

- Mały przykład to drzewo **Przykład: ród Bergów**. Jest w samej aplikacji i otwiera się także bez sieci. Nigdy nie
  jest połączony z badaniami ([S1.3.1](S1-connecting-app-and-research.md#S1.3.1)).
- **Granice:**
  - w pamięci przeglądarki musi być wolne miejsce co najmniej dwa razy większe niż przykład. Aplikacja sprawdza to
    przed pobieraniem i w jego trakcie, a przy braku miejsca od razu je zatrzymuje;
  - gdy drzewa przykładu nie da się zapisać w całości, aplikacja znów je usuwa i otwiera drzewo, które było otwarte
    wcześniej.
- **Obsługa:** aplikacja: **Otwórz mały przykład**, **Spróbuj ponownie**, **Zamknij**; mały przykład także przez
  **Nowe drzewo → Wypróbuj mały przykład** i link **Wypróbuj mały przykład** przy pustym drzewie.
- **Obowiązuje od:** aplikacja 3.33.0 (mały przykład od aplikacji 3.29.0 pod nazwą **Wypróbuj drzewo przykładowe**)

<!-- zdroj: app:src/ui/showcase-open-ui.ts showcaseErrorText, showShowcaseError (retry jen offline a server), createShowcaseTree, dropShowcaseTree · src/showcase-download.ts downloadShowcase, showcaseRoomNeeded (2×), showcaseRoomShort, showcaseFetchFailure · src/ui/import-export.ts loadDemoTree, openDemoTree (markDemoTree) · index.html demo.tryDemoSmall (Nový strom, prázdný stav) · strings.ts sample.errTitle, errOffline, errServer, errSpaceTitle, errSpace, errBrokenTitle, errBroken, errFormat, retry, openSmall, demo.treeName, demo.tryDemoSmall · app b831dcdd -->

<a id="S9.4"></a>
## S9.4 Przykładowe badanie: `strom demo`

`strom demo [cs|en|de|pl]` pobiera przykładowe badanie ze strony aplikacji Strom, zakłada je we własnym folderze i
otwiera w aplikacji jako badania (jak `strom app`). Wszystko w nim można przejrzeć bez subskrypcji AI: Przegląd
badania, linie, kolejkę, źródła, materiały i zadania czekające na człowieka.

- Badania pobierają z `https://stromapp.info/demo/<język>/` plik `VERSION`, paczkę tej wersji i jej SHA-256.
  Sprawdzają paczkę po SHA-256 i rozpakowują ją jak `strom unpack` (każdy obraz po jego SHA-256, całe drzewo
  sprawdzone).
- Przykładowe badanie leży w folderze `demo` w folderze ustawień `strom` (`~/.config/strom/demo`, w Windows
  `.config\strom\demo` w folderze użytkownika), z własnymi ustawieniami, drzewami, wspólnym folderem i kluczem
  pieczęci. Własne drzewa, ich kopie zapasowe i ustawienia się nie zmieniają; przykładu nie ma wśród własnych drzew.
  Jego `strom.json` ma `demo: true`.
- Badania same nie uruchamiają agenta na przykładzie, a most przykładu nie proponuje aplikacji niczego z agenta: nie
  podaje agenta ani przebiegów, zadania czekające nie mają rozmowy z agentem ani zwrotu do agenta, i nie proponuje
  natychmiastowego odczytu dokumentu ani zbiorczej weryfikacji. `strom demo` przy pierwszym otwarciu nie pyta, czy
  aplikacja może uruchamiać badania.
- **Od aplikacji 3.33.0:** drzewo przykładowego badania ma w aplikacji etykietę **Przykład** ([S9.1.2](#S9.1.2)),
  a aplikacja nie proponuje przy nim niczego z agentem.
- Bez języka `strom demo` bierze język, w którym `strom` mówi w terminalu; gdy to nie jest żaden z czterech języków,
  bierze `en`.
- **Granice:**
  - drugie uruchomienie dla tego samego języka niczego nie pobiera i otwiera przykład, który już jest na komputerze
    („Przykładowe badanie „…” już tu jest”); przykłady kilku języków mogą być na komputerze obok siebie;
  - paczka, której SHA-256 się nie zgadza, nie zostaje użyta i nic nie jest zakładane; tak samo paczka w innym języku
    niż żądany i paczka z konektorami (przykład ich nie ma);
  - przykładowe badanie, którego nie da się założyć w całości, zostaje znów usunięte;
  - bez internetu: „nie udało się pobrać przykładowego badania”, z radą, by uruchomić `strom demo` ponownie, gdy
    komputer będzie online;
  - język inny niż `cs`, `en`, `de`, `pl` badania odrzucają.
- **Obsługa:** terminal: `strom demo`, `strom demo pl`; strona: strona instalacji badań, sekcja **Przykładowe
  badania**
- **Obowiązuje od:** badania 1.38.0
- **Dlaczego:** przykład ma dać się przejrzeć bez subskrypcji AI; agent może nad nim pracować, ale badania żadnego
  nie proponują ani nie polecają (decyzja z 25. 11. 2026).

<!-- zdroj: research:src/commands/demo.ts (demoBase, run: demoLang(ctx.uiLang()) ?? "en", had → jen otevřít, own Settings, c.demo = true, app.run, rm při chybě) · src/core/demo.ts DEMO_LANGS, DEMO_FOLDER, demoPaths, demoEnv, downloadDemo (SHA-256, demo.download, demo.damaged), unpackDemo (demo.lang, demo.code), DEMO_MAX_BYTES · src/core/paths.ts configDir · src/core/live.ts forDemo, DEMO_HIDDEN, tree.demo, agent/runs undefined, accepts (bez read) · src/core/waiting.ts demo (bez chat a retry) · src/commands/start.ts offerLinks (ne u ukázky) · assets/lang/cs.json ui.demo.*, ui.error.demo.* · dirigent:spec/143-ukazkova-data Rozhodnutí 25. 11., K2.1, K2.2 · web:js/i18n.js demo_cmd_title · research afed49d3, 97fc3a23, 8500b369, 3348ed20 · app:src/ui/sample-tag.ts researchDemoTree, src/research-device.ts storedResearchDemo, src/ui/research-sync-ui.ts activeResearchNoAgent · app a0c2a8bb, 8f6731a0 -->

<a id="S9.4.1"></a>
### S9.4.1 Usunięcie: `strom demo --remove`

`strom demo --remove` kończy most przykładowego badania i usuwa cały jego folder: przykłady wszystkich języków, ich
ustawienia i klucze pieczęci. Niczego więcej nie usuwa. Kopię przykładu w aplikacji usuwa się w aplikacji, w
**Zarządzaniu drzewami**.

- **Granice:**
  - dopóki ktoś pracuje nad przykładem, badania go nie usuwają: „nad przykładowym badaniem właśnie trwa praca –
    zostanie usunięte, gdy praca się skończy”;
  - gdy most przykładu się nie zakończy, nic nie jest usuwane;
  - bez przykładu na komputerze: „Na tym komputerze nie ma przykładowego badania.”
- **Obsługa:** terminal: `strom demo --remove`; aplikacja: **Zarządzanie drzewami → Usuń drzewo…**
- **Obowiązuje od:** badania 1.38.0

<!-- zdroj: research:src/commands/demo.ts removeDemo (anyoneAtWork → demo.atwork, stopLive → demo.bridge, rmSync root) · assets/lang/cs.json ui.demo.none, ui.demo.removed, ui.demo.removed.app, ui.error.demo.atwork, ui.error.demo.bridge -->
