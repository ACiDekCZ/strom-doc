<a id="A7"></a>
# A7 Księga, strony i eksport

Co aplikacja Strom daje z drzewa na zewnątrz (księga rodu, strony, pliki dla rodziny i dla innych programów). Ochronę
osób żyjących we wszystkich wynikach opisuje [S11](S11-protecting-living-people.md). Opisuje aplikację 3.21.2; zmiany
z nowszej wersji mają przy sobie jej numer.

| Wynik | Co to jest |
|---|---|
| **Księga rodu** | księga do czytania od początku, do druku na A4 lub zapisu jako HTML ([A7.4](#A7.4)) |
| **Strony rodu**, **Strony drzewa** | połączony zestaw stron rodów, rodzin i osób ([A7.5](#A7.5)) |
| **Strona osoby** | całe życie jednej osoby, do przeglądania, druku i zapisu jako HTML ([A7.6](#A7.6)) |
| **Aplikacja z danymi (HTML)** | samodzielny plik z aplikacją i drzewem ([A7.7](#A7.7)) |
| **Wyślij rodzinie** | jeden plik e-mailem do otwarcia, uzupełnienia i odesłania ([S11.4](S11-protecting-living-people.md#S11.4)) |
| **Plakat** | bieżący widok jako SVG, PNG lub wielostronicowy PDF ([S11.4](S11-protecting-living-people.md#S11.4)) |
| **Podarować rodowód** | paczka ZIP z rodowodem jednej osoby lub pary: list przewodni, aplikacja, strony, księga, wachlarz, GEDCOM ([A7.9](#A7.9)) |
| **Kopia zapasowa danych (JSON)**, **GEDCOM**, **Tabela osób (CSV)** | dane do przywrócenia i dla innych programów ([A2](A2-loading-a-family-tree.md)); kopia zapasowa jest wynikiem dla siebie ([S11.5](S11-protecting-living-people.md#S11.5)); własne kolumny, filtr i sortowanie: eksport z widoku Tabela ([A6.7.9](A6-views.md#A6.7.9)) |

- Kopię zapasową i aplikację z danymi można zaszyfrować hasłem (**Zaszyfruj hasłem**); GEDCOM nie. Szyfrowanie działa
  tylko pod bezpiecznym adresem: przez https, na `localhost` lub `127.0.0.1` i w pliku otwartym z dysku; pod adresem
  `http://` w sieci nie, a okno hasła to mówi ([A1.1](A1-the-app-in-brief.md#A1.1)).

<!-- zdroj: app:strings.ts importExport.app, importExport.share, importExport.poster, importExport.book, importExport.backup, importExport.gedcom, importExport.csv · src/ui/import-export.ts (exportTargetTreeJSON, exportTargetTreeApp s heslem; GEDCOM bez hesla) · šifrování jen na zabezpečené adrese: src/crypto.ts isCryptoAvailable, src/crypto-errors.ts resetPasswordError, strings.ts encryptToggle, insecureContext, commit 266d6a76, dirigent:prace/1110-app-github-11-13 -->

<a id="A7.1"></a>
## A7.1 Kto jest osobą żyjącą

Nie obowiązuje od aplikacji 3.33.0, zastępuje ją [S11.1](S11-protecting-living-people.md#S11.1): jedna reguła dla
wszystkich wyników aplikacji i badania.

<!-- zdroj: app:61f9b492 src/privacy.ts isLivingPerson · dirigent:spec/151 K1.1 -->

<a id="A7.2"></a>
## A7.2 Ochrona osób żyjących

Nie obowiązuje od aplikacji 3.33.0, zastępuje ją [S11.2](S11-protecting-living-people.md#S11.2) (tryby ochrony)
i [S11.4](S11-protecting-living-people.md#S11.4) (wyniki na zewnątrz).

<!-- zdroj: app:61f9b492, fe52bfb2 src/privacy.ts PRIVACY_ORDER, applyOutputPrivacy · dirigent:spec/151 K1.2, K1.4 -->

<a id="A7.2.1"></a>
### A7.2.1 Domyślna ochrona według wyniku

Nie obowiązuje od aplikacji 3.33.0, zastępuje ją [S11.3](S11-protecting-living-people.md#S11.3): jeden tryb
domyślny z Ustawień dla wszystkich wyników na zewnątrz.

<!-- zdroj: app:61f9b492 src/settings.ts getOutputPrivacy · dirigent:spec/151 K1.3 -->

<a id="A7.3"></a>
## A7.3 Zawartość pliku

Przy eksporcie obok ochrony wybiera się **Zawartość**: co zapisze się w pliku.

| Ustawienie wstępne | Zdjęcia | Załączniki i wycinki źródeł | Notatki | Źródła i cytaty |
|---|---|---|---|---|
| **Pełne archiwum** | tak | tak | tak | tak |
| **Mały plik do wysłania** | nie | nie | tak | tak |
| **Tylko szkielet** | nie | nie | nie | nie |

- **Granice:** struktura drzewa i imiona z nazwiskami zostają zawsze. Warsztat pracy badania (kolejka, zadania,
  szkice opowieści) nie trafia do eksportu nigdy. Opcja ochrony może pominąć źródła i załączniki także przy Pełnym
  archiwum ([S11.2](S11-protecting-living-people.md#S11.2)).
- **Od aplikacji 3.30.0:** wybór **Co eksportować** ma obok **Całe drzewo** i **Tylko bieżący widok** także
  **Lista osób**: kopia zapasowa JSON i GEDCOM tylko z osobami listy ([A11.9](A11-lists-of-people.md#A11.9)).
- **Od aplikacji 3.33.0:** **Co eksportować** ma także **Rodowód osoby…** ([A7.9.6](#A7.9.6)). **Tylko bieżący
  widok** i Rodowód osoby działają we wszystkich formatach eksportu: **Wyślij rodzinie**, **Aplikacja z danymi
  (HTML)**, **Kopia zapasowa danych (JSON)**, **Plakat**, **Księga rodu**, **Połączone strony**, **GEDCOM** i **Tabela
  osób (CSV)**; wcześniej tylko kopia JSON i plakat. Wynik widoku otwiera się na osobie w centrum. Tylko **Połącz z
  plikiem…** zostaje przy całym drzewie.
- **Od aplikacji 3.30.0:** **Zdjęcia** to także oryginały portretów i zdjęcia par. Bez zdjęć znikają również one,
  także gdy eksportuje się załączniki; bez załączników portrety zostają bez powiązania z oryginałem
  ([A12.7](A12-portrait-and-couple-photo.md#A12.7)).
- **Od aplikacji 3.33.0:** ochrona pomija tylko źródła cytowane wyłącznie przez osoby żyjące oraz załączniki osób
  żyjących i ich związków; źródła, cytaty i załączniki zmarłych zostają we wszystkich formatach
  ([S11.2](S11-protecting-living-people.md#S11.2)). Blok **Ochrona osób żyjących** zaczyna od trybu domyślnego
  z Ustawień, kopia zapasowa JSON od Pełne dane ([S11.3](S11-protecting-living-people.md#S11.3),
  [S11.5](S11-protecting-living-people.md#S11.5)).
- **Obowiązuje od:** aplikacja 2.4.0

<!-- zdroj: app:src/privacy.ts CONTENT_PRESETS, stripResearchWork · strings.ts privacy.contentLabel, privacy.presetComplete, privacy.presetSmall, privacy.presetSkeleton, privacy.dropsSourcesContent · 3.30.0: app:33fa6cd4 src/ui/import-export.ts scope 'list', strings.ts exportMenu.scopeLabel, scopeWhole, scopeView, scopeList · 3.33.0: app:index.html data-view-ok, data-person-ok (všechny volby kromě Propojit se souborem), src/ui/import-export.ts exportScoped (pohled: defaultPersonId = fokus), commit 6408f8f9, strings.ts exportMenu.scopePerson, familyPages.exportPages · 3.33.0: app:fe52bfb2 src/privacy.ts applyOutputPrivacy (keepDeceasedSources), src/ui/encryption-ui.ts exportPresetPrivacy -->

<a id="A7.4"></a>
## A7.4 Księga rodu

Księga rodu to księga do czytania od początku: drzewo genealogiczne, rodziny według pokoleń, opowieści i źródła.

- **Co w księdze:** **Całe drzewo** · **Rody** (jeden lub więcej) · **Przodkowie osoby** · **Potomkowie osoby**
  (wybór osób [A7.4.1](#A7.4.1)).
- **Części księgi** w tej kolejności: **Spis treści**, **Drzewo rodu**, **Rodziny** (zawsze), **Opowieści**,
  **Wykres i oś czasu życia**, **Epoka (historia)**, **Źródła**, **Wycinki zapisów i zdjęcia**, **Inne rodziny (małe
  rody)**, **Indeks osób**.
- Część bez treści się pomija, a okno mówi dlaczego: Opowieści potrzebują opowieści, wykres innej szczegółowości niż
  zwięzła, Epoka historii, Źródła cytowanych źródeł, Wycinki zdjęcia lub wycinka. Inne rodziny są tylko w księdze
  całego drzewa.
- **Ustawienie wstępne:** **Dla rodziny** (wszystkie części, zwykła szczegółowość, bez notatek i danych dla
  badaczy) · **Dla badaczy** (pełna szczegółowość, notatki, dane dla badaczy: stan udokumentowania i sprzeczności,
  [R3.8](R3-verification-and-citation.md#R3.8)) · **Własne**. Domyślnie jest Całe drzewo, Dla rodziny, Inicjały +
  rok urodzenia i język aplikacji.
- **Tytuł** tworzy się według wyboru (nazwa drzewa, Ród X, Przodkowie: imię, Potomkowie: imię) i można go zmienić.
- **Język księgi** zmienia nagłówki i opisy; danych z drzewa się nie tłumaczy.
- Wybory zapamiętuje się dla każdego drzewa.
- **Obsługa:** eksport **Księga rodu**; okno księgi: druk na A4 i **Zapisz jako HTML**.
- **Obowiązuje od:** aplikacja 3.19.0; ustawienie wstępne Własne aplikacja 3.21.0
- **Od aplikacji 3.30.0:** część **Wycinki zapisów i zdjęcia** umieszcza w rozdziale rodziny także zdjęcie pary, nad
  wydarzeniami pary; drzewo, którego jedynymi obrazami są zdjęcia par, tę część proponuje
  ([A12.6](A12-portrait-and-couple-photo.md#A12.6)).
- **Od aplikacji 3.33.0:** wybór **Dom** (księga o jednym domu), część **Domy** i **Indeks domów**
  ([S10.10](S10-houses.md#S10.10)); w części **Domy** opowieść o domu (także szkic, bez etykiety), obrazy domu
  i miejscowości, a z przełącznikiem **Położenie i mapa domów** wycinek mapy ([S10.14.2](S10-houses.md#S10.14.2),
  [S10.7.1](S10-houses.md#S10.7.1), [S10.3.4](S10-houses.md#S10.3.4)). W sekcji **Części księgi** część **Domy** ma
  przełącznik **Opowieści o domach z żyjącymi osobami** (domyślnie włączony); wyłączony pomija opowieść, w której
  występuje żyjąca osoba. Jest proponowany tylko wtedy, gdy księga ma taką opowieść.
- **Od aplikacji 3.33.0:** ochrona osób żyjących to blok **Ochrona osób żyjących**
  ([S11.2](S11-protecting-living-people.md#S11.2)). Drzewo bez zapamiętanego wyboru zaczyna od trybu domyślnego
  z Ustawień, w przeciwnym razie „ostatnio dla tego drzewa”; księga dzieli wybór z połączonymi stronami
  ([S11.3](S11-protecting-living-people.md#S11.3)). Osoby żyjące liczy się w całym drzewie; okładka chronionej księgi
  mówi „Dane osób żyjących są skrócone.” Przełącznik **Położenie i mapa domów** jest wstępnie wypełniony z Ustawień
  ([S10.3.4](S10-houses.md#S10.3.4)).

<!-- zdroj: app:src/book-options.ts (části, předvolby, výchozí :55) · strings.ts book.dlg.kind, book.dlg.parts, book.dlg.preset, book.dlg.lang, book.parts, book.unavailable · CHANGELOG.cs.md 3.19.0, 3.21.0 · 3.33.0 vyprávění o domě: app:28099151 src/book.ts houseStoryForOutput, src/book-houses.ts (bez štítku), src/book-options.ts housesStoryWithLiving, bookHouseStoriesLiving, src/ui/book-ui.ts book-house-stories, strings.ts book.dlg.houseStoriesLiving, houseStoriesLivingHint · ochrana: app:355a550d src/ui/book-ui.ts:1262 (strom.book.{treeId}, jinak Nastavení), strings.ts book.coverProtected · přepínač: app:51223455 src/ui/book-ui.ts:485, :1264 houseMaps, strings.ts outputHouseLocation.housesSwitch -->

<a id="A7.4.1"></a>
### A7.4.1 Wybór osób do księgi i stron

| Wybór | Osoby | Kolejność |
|---|---|---|
| Całe drzewo | wszystkie osoby | według urodzenia |
| Rody | członkowie rodów z rodzinami oraz żony i mężowie członków | rozdział na każdy ród |
| Przodkowie osoby | przodkowie do wybranej liczby pokoleń i związki, z których członkowie pochodzą | pokolenie po pokoleniu, ojciec przed matką |
| Potomkowie osoby | potomkowie do wybranej liczby pokoleń przez synów i córki, z partnerami i wszystkimi związkami | według urodzenia |
| Wybrane osoby (tylko strony) | tylko wybrane osoby; rodzina tylko wtedy, gdy wybrano oboje partnerów | – |

- **Granice:** linię przodków i potomków niosą rodzice biologiczni i przysposabiający. Przybrany rodzic i rodzic
  zastępczy linii nie niosą. Przez ojca rozumie się rodzica mężczyznę, biologicznego przed przysposabiającym.
- **Obowiązuje od:** aplikacja 3.19.0; Wybrane osoby aplikacja 3.21.0
- **Od aplikacji 3.33.0:** wybór **Rodowód osoby** (przodkowie i ich rodziny) w księdze i stronach: osoby wycinka
  prezentu wybranej osoby z wyborem **Rodziny przodków do** ([A7.9.1](#A7.9.1)); rozdziały rodzin idą według pokoleń
  od najstarszych przodków. Tytuł księgi to „Rodowód: imię”. W rodzinie rozdziału może być wymienione także dziecko
  spoza wycinka.

<!-- zdroj: app:src/lineage.ts selection, :279 isDescentLink · strings.ts book.dlg.kind, book.dlg.kindHint · 3.33.0: app:src/book-model.ts kind 'gift' (giftCutIds, giftLevels: generace od nejstarších), src/book-options.ts titleGift, src/ui/book-ui.ts giftDepth, commity 6408f8f9, 040aaaaf · dirigent:prace/1126-app-093-darovat-rodokmen (B5: kniha jmenuje i dítě mimo výřez) -->

<a id="A7.5"></a>
## A7.5 Strony rodu i strony drzewa

Strony to połączony zestaw stron: ród, rodziny i osoby z odnośnikami między sobą i z indeksami osób, rodzin,
nazwisk i miejscowości.

- **Strony rodu:** jeden lub więcej rodów ([A4](A4-surnames-and-families.md)).
- **Strony drzewa:** **Strony całego drzewa** (wszystkie rody i Inne rodziny), **Wybrane osoby**, przodkowie osoby
  z wybraną liczbą pokoleń.
- Ochrona osób żyjących i źródła według [S11.2](S11-protecting-living-people.md#S11.2); domyślnie Inicjały + rok
  urodzenia.
- Chroniona osoba żyjąca nie ma własnej strony ani odnośnika; w indeksie jest pod chronionym imieniem.
- **Obowiązuje od:** Strony rodu aplikacja 3.20.0; Strony drzewa aplikacja 3.21.0
- **Od aplikacji 3.33.0:** opcja **Domy**: domy z historią, indeks domów i strona każdego domu
  ([S10.10](S10-houses.md#S10.10)), przy domu także opowieść (także szkic, bez etykiety), obrazy domu i miejscowości
  i wycinek mapy z położeniem ([S10.14.2](S10-houses.md#S10.14.2), [S10.7.1](S10-houses.md#S10.7.1),
  [S10.3.4](S10-houses.md#S10.3.4)). Przy opcji **Domy** jest przełącznik **Opowieści o domach z żyjącymi osobami**
  (domyślnie włączony); wyłączony pomija opowieść, w której występuje żyjąca osoba. Jest proponowany tylko wtedy, gdy
  strony domów mają taką opowieść. Szkic opowieści osoby lub pary jest na stronach bez etykiety **Szkic**
  ([A7.8](#A7.8)).
- **Od aplikacji 3.33.0:** ochrona osób żyjących jak w księdze ([A7.4](#A7.4)): blok **Ochrona osób żyjących**, wybór
  wspólny z księgą, w przeciwnym razie tryb domyślny z Ustawień; przy Pełne dane okno ostrzega, że strony będą
  zawierać dane osób żyjących. Okno **Strony rodu** w aplikacji ma wybór w pasku **Ochrona: {tryb} ▾**; okno i wydruk
  za nim idą i nie jest zapisywany z powrotem ([S11.4](S11-protecting-living-people.md#S11.4)). Przełącznik
  **Położenie i mapa domów** jest wstępnie wypełniony z Ustawień ([S10.3.4](S10-houses.md#S10.3.4)).

<!-- zdroj: app:src/family-pages.ts · strings.ts familyPages.menuItem, familyPages.treePages, familyPages.treePagesAction, familyPages.indexTitle · spec 026 · CHANGELOG.cs.md 3.20.0, 3.21.0 · 3.33.0 vyprávění: app:28099151 src/family-pages.ts houseStoriesLiving, src/family-pages-html.ts setStoryHouses, coupleChapterHtml bez draftTag, src/house-page.ts storyLiving, src/ui/book-ui.ts syncPages book-house-stories, src/book-memory.ts PagesChoices.houseStoriesLiving · chráněná osoba bez stránky: src/family-pages.ts isProtectedPerson · 3.33.0 ochrana: app:355a550d src/ui/book-ui.ts, src/ui/family-pages-ui.ts windowPagesPrivacyPreset, setWindowPagesMode, strings.ts familyPages.privacyWarn, privacy.compactPrefix · 0ad8f5e9 windowPrintFooterCss · přepínač: app:51223455 -->

<a id="A7.5.1"></a>
### A7.5.1 Historia na osi czasu rodu

Oś czasu rodu (**Oś czasu rodu →** na stronie rodu) pokazuje historię w miejscowościach rodu z symbolem jej rodzaju.

- **Historia kraju lub regionu** to pionowe pasy przez wykres z symbolem rodzaju u góry.
- **Historia lokalna** (**Historia miejsca**, **Ze źródeł badania**) miejscowości, która ma na wykresie własny
  wiersz, to symbol na wierszu miejscowości w kolorze pochodzenia. Miejscowość bez wiersza ma pionowy pas jak historia
  kraju.
- **Lista:** wiersz historii ma symbol rodzaju w kolorze pochodzenia. Po tekście stoi miejscowość; przy historii
  kraju lub regionu jego nazwa, tylko gdy historia rodu pochodzi z co najmniej dwóch krajów lub regionów.
- **Rodzaje historii:** drugi rząd chipów **Rodzaje wydarzeń** pod pierwszym: **Wszystko** i rodzaje historii na
  stronie, każdy z symbolem. Wybrane rodzaje zostawiają tylko swoje wiersze, pasy i symbole. Rząd jest tylko przy co
  najmniej dwóch rodzajach i tylko ze skryptem strony; przy wyłączonym chipie **Historia** znika.
- Chip **Historia** w **Rodzaje wydarzeń** ma symbol rodzaju „inne”.
- **Obsługa:** strony rodu: **Oś czasu rodu →**, oba rzędy chipów **Rodzaje wydarzeń**
- **Obowiązuje od:** aplikacja 3.31.0

<!-- zdroj: app:6caa471e src/family-pages-html.ts tlSymHtml, tlScopeClass, onRow (scope ≠ region a obec s řádkem → symbol na řádku, jinak pruh se symbolem sp-tl-bandsym), histChips (rodTimelineHistKinds > 1, js-only, Vše + druhy), řádek seznamu (symbol, place ?? region), čip hist se symbolem other, skript data-hk-off · src/rod-timeline.ts RodTimelineHistory scope, region (jen při ≥ 2 regionech), rodTimelineHistKinds · src/family-pages-css.ts (skrytí s vypnutými Dějinami) · strings.ts familyPages.tlLink, tlKindsLabel, tlKinds.hist, tlHistNote, tlHistKindsLabel, history.filterAll · dirigent:spec/121 „Časová osa rodu stejně jako hlavní osa“, Rozhodnutí 20. 11. (místní na řádku obce) -->

<a id="A7.6"></a>
## A7.6 Strona osoby

**Strona osoby** pokazuje całe życie jednej osoby: daty słowami, rodzinę jako małe drzewo genealogiczne, opowieść,
miejsca życia na mapie, oś życia z historią, wycinki z ksiąg metrykalnych i źródła oraz sekcję **Dla badaczy**.

- **Zapisz jako HTML** tworzy jeden samowystarczalny plik, który otwiera się offline w każdej przeglądarce. Grupy
  treści i ochronę osób żyjących można wybrać ([S11.3](S11-protecting-living-people.md#S11.3)); wybór jest
  zapamiętywany.
- **Od aplikacji 3.28.0:** w oknie aplikacji **◎ Droga przodków na mapie ›** prowadzi do drogi przodków osoby
  w Migracji w czasie ([A6.5.4](A6-views.md#A6.5.4)). Zapisana strona tego odnośnika nie ma. Stoi w sekcji
  **Miejsca życia**; osoba z najwyżej jednym własnym miejscem, która ma przodków na mapie, ma go we własnym wierszu
  tam, gdzie byłaby sekcja.
- **Od aplikacji 3.30.0:** galeria **Obrazy i dokumenty** zaczyna się od zdjęcia każdego związku osoby („{A} i {B} ·
  zdjęcie pary”). Powiększenie portretu z oryginałem ma przełącznik **Portret** | **Całe zdjęcie**, zapisana strona
  odnośnik **Całe zdjęcie**, gdy plik to zdjęcie zawiera. ⋯ **Więcej działań** oferuje **Edytuj kadr portretu**
  ([A12.3](A12-portrait-and-couple-photo.md#A12.3), [A12.6](A12-portrait-and-couple-photo.md#A12.6)).
- **Od aplikacji 3.33.0:** opowieść z badania, jeszcze niezatwierdzona, ma etykietę **Szkic** tylko na stronie osoby
  w oknie aplikacji. Zapisana strona podaje ją tak samo jak zatwierdzoną opowieść, bez etykiety; tak samo opowieść
  pary i jej odnośnik ([A7.8](#A7.8)).
- **Od aplikacji 3.33.0:** okno strony osoby ma w pasku przed **Drukuj** wybór **Ochrona: {tryb} ▾** (na telefonie
  pierwsza pozycja **⋯**), tylko gdy na stronie są osoby żyjące. Zaczyna od wyboru z zapisu strony osoby, w przeciwnym
  razie od trybu domyślnego z Ustawień; okno i wydruk za nim idą. Wydruk chronionej strony ma w stopce „chronione:
  {tryb}”. **Zapisz jako HTML** ma blok **Ochrona osób żyjących** za nazwą pliku i wiersz „Dotyczy tylko osób
  żyjących: …”; bez osób żyjących zaczyna od Pełne dane ([S11.4](S11-protecting-living-people.md#S11.4)).
- **Obsługa:** menu karty osoby, **Strona osoby**; także z wachlarza.
- **Obowiązuje od:** aplikacja 3.18.0

<!-- zdroj: app:src/person-page.ts · strings.ts personPage.save, fan.personPage · CHANGELOG.cs.md 3.18.0 · 3.28.0: app:src/person-page-map.ts pp-map-path (jen mode app), src/ui/person-page-ui.ts personPageMapPath, commit 34e82d43 · mapPathRowHtml (bez oddílu Místa života), commit caea192a · 3.33.0: app:28099151 src/person-page.ts storyDraftTagged (c.app a links app), draftTag, coupleChapterHtml draftTag, coupleChapterLinkTip · app:43794e42 src/__tests__/couple-story-chapter.test.ts · app:d3e9cdfd e2e/person-page.spec.ts · ochrana: app:355a550d src/ui/person-page-ui.ts:718 (getPersonPageExport, jinak Nastavení), pv-compact, src/person-page.ts personPageExportPrivacy, strings.ts privacy.windowLine, personPage.privacyWho · 0ad8f5e9 windowPrintFooterCss -->

<a id="A7.7"></a>
## A7.7 Zapisany HTML (samodzielny plik)

**Aplikacja z danymi (HTML)** zapisuje aplikację i drzewo w jednym pliku, który otwiera się w każdej przeglądarce bez
instalacji. **Eksportuj jako aplikację** w **Eksportuj wszystkie drzewa** umieszcza wszystkie drzewa w jednym pliku.

- Taki plik ma własną pamięć w przeglądarce. Z aplikacją na stromapp.info **się nie synchronizuje**; zmiany
  zachowuje **Zapisz plik** (pobiera kopię), a do aplikacji internetowej przenosi się je importem (**Z pliku HTML
  Strom**).
- **Granice:** plik domyślnie chroni osoby żyjące (Inicjały, [S11.3](S11-protecting-living-people.md#S11.3)).
- **Obowiązuje od:** aplikacja 1.0.0
- **Od aplikacji 3.33.0:** tryb domyślny pochodzi z Ustawień, także przy **Eksportuj jako aplikację** dla wszystkich
  drzew (wcześniej Pełne dane). Chroniony plik nosi oznaczenie ([S11.6](S11-protecting-living-people.md#S11.6)).
  Drzewo z domem z położeniem ma przełącznik **Położenie i mapa domów**, wstępnie wypełniony z Ustawień
  ([S10.3.4](S10-houses.md#S10.3.4)).

<!-- zdroj: app:strings.ts importExport.app, importExport.appDesc, importExport.exportAllApp, importExport.fromHtml, embeddedMode.* · src/ui/import-export.ts · 3.33.0: app:11d35186 src/ui/encryption-ui.ts exportPresetPrivacy (html: Nastavení), src/export.ts exportAllAsApp · 47500acc privacy · 51223455 src/ui/encryption-ui.ts setupExportHouseLocation, index.html export-house-location -->

<a id="A7.8"></a>
## A7.8 Opowieść

Opowieść to spójny tekst o osobie albo o małżeństwie, zbudowany na faktach drzewa. Nie jest źródłem: fakty
dokumentują źródła, opowieść je tylko opowiada ([A3.6](A3-evidence-in-the-app.md#A3.6)).

- **Gdzie ją widać:** okno **Opowieść** (z menu karty osoby), strona osoby ([A7.6](#A7.6)) i w Księdze rodu część
  **Opowieści** dopiero po **Rodzinach** ([A7.4](#A7.4)). Opowieść pary, jedna na każde małżeństwo, stoi pod
  opowieścią osoby; w księdze ma własny podrozdział.
- **Format tekstu:** pusty wiersz dzieli akapity; wiersz `## …` to podtytuł; wiersze `- …` to wypunktowanie;
  `**pogrubienie**` i `*kursywa*`. Inne znaki zostają zwykłym tekstem. Ani `* 1831` (urodzenie), ani `1. ledna` na
  początku wiersza nie zaczyna wypunktowania. Początkowe `# …`, które tylko powtarza podtytuł rozdziału, jest
  pomijane. Goły kod źródła w tekście czyta się jako jego tytuł.
- **Granice:**
  - własną opowieść osoby można pisać i zmieniać w edycji osoby, sekcja **Opowieść**: **Podtytuł rozdziału**
    i **Tekst opowieści**. Sekcja jest widoczna, gdy włączone jest **Ustawienia → Karta osoby → Pola zaawansowane**
    albo jakiś tekst już istnieje. Opowieść pary i **Opiera się na** (fakty i zastrzeżenie autora) przychodzą
    z plikiem i są tylko do odczytu;
  - szkic z badania, jeszcze niezatwierdzony, ma etykietę **Szkic** i odnośnik **Zatwierdź w badaniu**. Nowa wersja
    z badania czeka obok zatwierdzonej („Nowa wersja czeka”, **Porównaj**); edycja w aplikacji jej nie usuwa,
    rozstrzyga się w badaniu ([R3.9.1](R3-verification-and-citation.md#R3.9.1));
  - w księdze ani w druku pod tekstem nie ma źródeł; źródła opowieści są ponumerowane w spisie źródeł księgi;
  - w pliku GEDCOM opowieść jest we własnym znaczniku `_STORY`, nie w notatce.
- **Obsługa:** menu karty osoby → **Opowieść**; edycja osoby → sekcja **Opowieść**.
- **Obowiązuje od:** aplikacja 2.8.0; opowieści par i strona osoby 3.18.0; w Księdze rodu 3.19.0
- **Od aplikacji 3.33.0:** etykieta **Szkic** jest tylko w aplikacji. Zapisana strona osoby ([A7.6](#A7.6)) i strony
  rodu ([A7.5](#A7.5)) podają szkic tak samo jak zatwierdzoną opowieść, bez etykiety. Księga szkicu nie oznacza;
  **Zatwierdź w badaniu** jest tylko w oknie księgi, nie w zapisanym pliku. Opowieść o domu zob.
  [S10.14.2](S10-houses.md#S10.14.2).

<!-- zdroj: app:src/story-text.ts:1 storyProseHtml (odstavce, ##, -, **, *) · src/ui/person-modal.ts:662 fillStoryFields · index.html pm-story-section · src/book-blocks.ts:594 storyBlock · src/book.ts proseHtml · src/person-page.ts · src/ged-exporter.ts:449 pushStory _STORY · strings.ts story.* · commit 52000825 (aplikace 2.8.0) · CHANGELOG.cs.md 3.18.0, 3.22.0 · 3.33.0: app:28099151 src/person-page.ts storyDraftTagged, draftTag, coupleChapterHtml draftTag · src/book-blocks.ts storyBlock (bez štítku, approve z extras), src/book.ts extras („on the screen only, never in a saved file“) -->

<a id="A7.9"></a>
## A7.9 Podarować rodowód

**Podarować rodowód…** przygotowuje dla jednej osoby (obdarowanego) lub pary jeden plik ZIP z ich częścią rodowodu:
przodkowie, rodziny wokół nich i własni domownicy, nie całe drzewo właściciela. Kreator ma sześć kroków: **Dla
kogo**, **Kto w nim będzie** ([A7.9.1](#A7.9.1)), **Dane żyjących** ([A7.9.2](#A7.9.2)), **Co będzie w paczce**
([A7.9.3](#A7.9.3)), **List przewodni** ([A7.9.4](#A7.9.4)) i **Podgląd i utworzenie**.

- Osobą startową wycinka jest obdarowany; aplikacja w paczce otwiera się na nim. Dane drzewa się nie zmieniają;
  wycinek to tylko zakres wyniku, nie nowe drzewo.
- **Dla kogo:** **Jedna osoba**, **Para** (jedna paczka dla dwojga; druga osoba jest proponowana jako partner z
  drzewa) albo **Lista osób lub wybór** ([A7.9.5](#A7.9.5)). Akcja jest oferowana tylko przy osobie, która ma w drzewie
  co najmniej rodziców, partnera lub dziecko.
- **Od razu do podglądu ›** przechodzi do kroku 6 z ustawieniami domyślnymi albo z ostatniego razu; każdy krok można
  zmienić także potem.
- Paczka powstaje w całości w przeglądarce; nic nie jest nigdzie wysyłane. Na komputerze ZIP pobiera się zaraz po
  utworzeniu; na telefonie nie pobiera się sam i oferuje **Udostępnij…** oraz **Zapisz w Plikach**. Gdy przeglądarka
  nie pozwoli na pobranie, działa **Pobierz ponownie** bez ponownego tworzenia, dopóki okno jest otwarte.
- Przed utworzeniem sprawdza się, czy przeglądarce wystarczy pamięci ([A9.7.1](A9-using-the-app.md#A9.7.1)). Gdy
  pamięci zabraknie, nic nie powstaje, a kreator proponuje **Spróbuj bez zdjęć** lub **Bez aplikacji**.
- Ustawienia (wycinek, dane żyjących, zawartość, list) zapisują się przy osobie lub parze na tym urządzeniu, nie w
  danych drzewa ani w eksporcie. Następna paczka dla nich zaczyna od nich (**Ustawienia z ostatniego razu**; **Zacznij
  od nowa z domyślnymi**) i mówi, ile osób od tamtej pory do wycinka przybyło lub ubyło. Menu osoby pokazuje przy
  akcji datę ostatniej paczki.
- **Obsługa:** menu karty osoby (prawy przycisk, na telefonie długie naciśnięcie) i ⋯ na stronie osoby: **Podarować
  rodowód…**; **Akcje › Dla rodziny › Podarować rodowód…**; w oknie **Podziel na rodziny** przy **Z perspektywy
  osoby** „Tylko dla jednej osoby, bez dzielenia drzewa: **Podarować rodowód…**”
  ([A14.4](A14-trees-and-structure.md#A14.4)); menu listy osób i wyboru: **Podarować rodowód każdej osobie…**;
  Eksport, zakres **Rodowód osoby…**, odnośnik **Cała paczka prezentowa…** ([A7.9.6](#A7.9.6)). W drzewie tylko do
  odczytu akcja nie jest oferowana.
- Drzewo z domem z położeniem ma w kroku **Co będzie w paczce** przełącznik **Położenie i mapa domów**, wstępnie
  wypełniony z Ustawień ([S10.3.4](S10-houses.md#S10.3.4)).
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/ui/gift-tree-ui.ts (canGiftTree, giftMenuMeta, giftDownload jen na počítači, Sdílet/Uložit do Souborů na telefonu, confirmMemoryForOutput, GiftOutOfMemory → Zkusit bez fotek / Bez aplikace) · src/gift-guide.ts giftHasFamily, giftGuideStart, giftSuggestedPartner · src/gift-memory.ts (localStorage strom.gift.{treeId}, nikdy v datech) · src/gift-tree.ts giftCutData (defaultPersonId = obdarovaný) · src/ui/context-menu.ts gift-tree, src/ui/person-page-ui.ts, index.html Pro rodinu, src/ui/split-families-ui.ts splitfam-gift, src/ui/selection-picker-ui.ts, src/ui/person-list-hooks.ts · strings.ts giftTree.menu, title, stepNames, fast, menuList, splitLead, guide.mode, guide.lastH, restart, guide.cutChanged, make.share, make.saveFiles, make.downloadAgain, make.withoutApp, make.tryWithoutPhotos, review.local · dirigent:spec/093 K1.1, K2.4, K5.1, K5.4, K5.5 · dirigent:prace/1126-app-093-darovat-rodokmen (rozhodnutí B3) · přepínač: app:51223455, 6ec8204e src/ui/gift-tree-ui.ts:752, :1362 (outputHouseLocation.housesSwitch, dataSwitchHint) -->

<a id="A7.9.1"></a>
### A7.9.1 Kto w nim będzie (wycinek)

Wycinek to część drzewa z perspektywy obdarowanego.

| W wycinku zawsze | W wycinku nie ma |
|---|---|
| obdarowany, jego partnerzy i wszyscy jego potomkowie z partnerami | przodków partnerów (partnerów obdarowanego i partnerów przodków) |
| jego rodzeństwo ze wszystkimi potomkami i ich partnerami | osób powiązanych z obdarowanym tylko przez partnerów |
| wszyscy dostępni bezpośredni przodkowie i ich partnerzy | osób bez powiązania z obdarowanym (oddzielne części drzewa) |
| rodzeństwo każdego przodka z partnerami (bez rodziny, gdy głębokość jej nie obejmuje) | osób zastępczych |
| pasierbowie obdarowanego (dzieci jego partnerów) z ich rodzinami | |

- **Rodziny przodków do** (głębokość): **Nikt** · **Kuzyni** (rodzeństwo rodziców z rodzinami) · **Kuzyni drugiego
  stopnia** (także rodzeństwo dziadków z rodzinami) · **Wszyscy** (wszyscy krewni przodków). Domyślnie Kuzyni
  drugiego stopnia. Rodzina rodzeństwa przodka to wszyscy jego potomkowie i partnerzy ich wszystkich.
- **Rodziny rodzeństwa przodków:** rodzinę każdego z rodzeństwa przodka można zaznaczyć lub odznaczyć osobno, także
  poza głębokością; odznaczony zostaje w wycinku sam z partnerami. To samo w podglądzie z menu karty (**Usunąć
  rodzinę…**, **Dodać rodzinę…**). Przy przyrodnim rodzeństwie przodka wiersz podaje jego drugiego rodzica.
- Linię przodków i potomków niosą rodzice biologiczni i przysposabiający, nie ojczym, macocha ani rodzic zastępczy
  ([A7.4.1](#A7.4.1)).
- Para: wycinek to suma wycinków obojga.
- **Granice:** osoba bez przodków w drzewie ma wycinek tylko z siebie, partnerów i potomków; kreator to mówi, a
  głębokość nie jest używana. Wycinek od 600 osób kreator zgłasza z szacunkiem wielkości paczki.
- **Obsługa:** krok **Kto w nim będzie**: podgląd z liczbą osób i pokoleń, **Rodziny przodków do**, **Rodziny
  rodzeństwa przodków**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/gift-tree.ts recipientCut (familySet up all, down all, width cousins, cousins = hloubka, spouses 'spouses', siblingFamilies = výjimky), stepchildrenOf (D5), giftCutIds (pár = sjednocení), giftBranchCandidates (half, otherParentId), GIFT_DEFAULT_DEPTH = 2 · src/lineage.ts familySet (sourozenci linie vždy, potomci předků do degree + 1, partneři krve), addDescendants, descentParents · src/__tests__/gift-tree.test.ts (hloubky, předci partnerů, ostrov) · strings.ts giftTree.cut.depthH, depth, depthDesc, branchesH, branchesNote, menuRemove, menuAdd, noAncestors, outLine, otherParent, largeLead · src/ui/gift-tree-ui.ts (≥ 600 osob) · dirigent:spec/093 K1.2, K1.3, K1.4 -->

<a id="A7.9.2"></a>
### A7.9.2 Dane żyjących w prezencie

Ochrona osób żyjących ([S11.1](S11-protecting-living-people.md#S11.1),
[S11.2](S11-protecting-living-people.md#S11.2)) jest stosowana raz nad wycinkiem i wszystkie części paczki (aplikacja,
strony, księga, wachlarz, GEDCOM i list przewodni) dostają te same chronione dane. Co jest ukryte w jednej części, nie
ma go w żadnej innej.

- **Domownicy obdarowanego są zawsze w całości:** obdarowany, jego partnerzy poza rozwiedzionymi i żyjącymi w
  separacji oraz jego dzieci. Przy parze oboje i dzieci każdego z nich. Pasierbowie idą w całości tylko jako wyjątek.
- **Wyjątki:** osoba zaznaczona na liście **Żyjący w rodowodzie** jest w całości (zaznaczone = w całości).
- **Pozostali żyjący:** tryby ochrony o tych samych nazwach i w tej samej kolejności co wszędzie
  ([S11.2](S11-protecting-living-people.md#S11.2)), domyślnie **Inicjały + rok urodzenia** (nie z Ustawień).
- **U żyjących pokazanych w całości** każdy rodzaj można wyłączyć:

| Rodzaj | Domyślnie | Co usuwa wyłączenie |
|---|---|---|
| **Daty urodzenia** | tak | datę urodzenia i chrztu; rok zostaje |
| **Adresy i miejsca zamieszkania** | tak | adresy urodzenia, śmierci i wydarzeń, adres pary, wydarzenia zamieszkania i spisu |
| **Kontakty (e-mail, telefon)** | nie | e-maile osoby ([S6.9](S6-tree-from-another-program.md#S6.9)), wiersze notatek z e-mailem, własne wiersze innego programu (w nich telefony) |
| **Zdjęcia** | tak | portret i załączniki osoby |
| **Notatki i historie** | nie | notatki, opowieści, otwarte pytanie |
| **Wyznanie** | tak | dane o wyznaniu ([R3.11](R3-verification-and-citation.md#R3.11)) i obrzędy: chrzest, bierzmowanie, pierwsza komunia, bar i bat micwa, święcenia |
| **Źródła z danymi osobowymi** | tak | cytaty osoby i jej wydarzeń |

- **U zmarłych:** **Przyczyny śmierci**, **Notatki i historie**, **Źródła i ich skany**; domyślnie wszystko zostaje.
  Źródła zmarłych zostają także przy ochronie żyjących.
- Domyślnie więc domownicy obdarowanego niosą adresy, ale nie e-maile, telefony i notatki; pozostali żyjący tylko
  inicjały i rok urodzenia. Gdy ochrona coś u żyjących skróci, list przewodni mówi to w stopce.
- Bez zdjęć (krok 4) znikają zdjęcia, załączniki i wycinki źródeł u wszystkich osób. Warsztat badania nigdy nie
  trafia do prezentu ([A7.3](#A7.3)).
- **Obsługa:** krok **Dane żyjących**: **Żyjący w rodowodzie**, **Pozostali żyjący**, **U żyjących pokazanych w
  całości**, **U zmarłych**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/gift-tree.ts defaultGiftPrivacy (others initials; sensitive contacts:false, notes:false, ostatní true; dead vše true), giftHouseholdIds (bez rozvedených a odloučených; pár jen oba; děti každého), giftProtectedData (jednou před výstupy, keepDeceasedSources, stripResearchWork, stripMedia bez fotek), giftShortensLiving · src/privacy.ts LivingSensitive (komentář druhů), maskSensitive, maskSensitiveCouple, maskEvent, keepsEvent RELIGION_EVENTS, RESIDENCE_EVENTS, BIRTH_DATE_EVENTS, maskDeceased · strings.ts giftTree.guide.livingH, checkedFull, othersH, sensitiveH, sensitive, deadH, dead, giftTree.cover.shortened · test/vysledek-1126-app-093.md (Soukromí K6.2, K6.4) · dirigent:spec/093 K6.1–K6.4 · 3.33.0 názvy a pořadí: app:bda4fd2c src/ui/gift-tree-ui.ts (PRIVACY_ORDER, privacyModeLabel, originTree) · dirigent:spec/151 Okrajové případy (dárek jen názvy a pořadí) -->

<a id="A7.9.3"></a>
### A7.9.3 Co będzie w paczce

ZIP `Drzewo – <imię> – <rok>.zip` zawiera folder `Drzewo – <imię>`:

| Plik | Co to jest |
|---|---|
| `Zacznij tutaj.html` | list przewodni z drogowskazem ([A7.9.4](#A7.9.4)); jest zawsze |
| `Drzewo (aplikacja).html` | aplikacja Strom z wycinkiem w jednym pliku ([A7.7](#A7.7)); otwiera się offline na obdarowanym z powitaniem i wiadomością |
| `Strony rodziny/` | strony wycinka ([A7.5](#A7.5)) |
| `Księga rodu.html` | księga wycinka do druku ([A7.4](#A7.4)); PDF przez drukowanie z przeglądarki |
| `Wachlarz przodków.svg`, `.png` | bezpośredni przodkowie obdarowanego na jednym obrazie, od 3 do 10 pokoleń; przy parze jeden wachlarz dla każdego |
| `Dla innych programów/Drzewo.ged` | wycinek w formacie GEDCOM |

- Każdą część poza listem przewodnim można wyłączyć; domyślnie wszystkie są włączone, ze zdjęciami. Kreator pokazuje
  szacunek rozmiaru po kompresji, także bez zdjęć i bez aplikacji.
- Księga ma ustawienia księgi ([A7.4](#A7.4), **Ustawienia księgi…**), wachlarz swój wygląd (**Wygląd wachlarza…**).
- Nazwy plików są w języku listu przewodniego; nazwę ZIP-a można zmienić w kroku 6.
- **Granice:** na Macu ZIP poprawnie rozpakowuje Finder; narzędzie `unzip` w terminalu nie radzi sobie z nazwami ze
  znakami diakrytycznymi.
- **Obsługa:** krok **Co będzie w paczce**: **Części paczki**, **Zdjęcia** (**Ze zdjęciami** / **Bez zdjęć**),
  **Zawartość pliku ZIP**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/gift-package.ts giftFileNames (složka, Začít zde, aplikace, stránky, kniha, vějíř na osobu u páru, Pro jiné programy/Rodokmen.ged), buildGiftPackage, estimateGiftSize · src/gift-tree.ts defaultGiftParts · src/filenames.ts unicodeFileName · strings.ts giftTree.files, giftTree.pkg.part, partsH, photosH, bookSettings, fanLook, zipH, zipNote, review.fileName · test/vysledek-1126-app-093.md (ZIP rozbalený ditto, macOS unzip) · dirigent:spec/093 K5.2, K5.3 -->

<a id="A7.9.4"></a>
### A7.9.4 List przewodni (Zacznij tutaj)

`Zacznij tutaj.html` to pierwsza strona paczki: wiadomość, liczby z rodowodu i drogowskaz.

- **Wiadomość:** szablon według języka i motywu, dowolnie do zmiany (**Wstaw szablon ponownie**). Słowo zastępcze
  zwrotu w wiadomości (cs `[oslovení]`, en `[name]`, de `[Name]`, pl `[imię]`) zastępuje **Zwrot**; domyślnie jest to
  imię, przy parze oba. Dalej **Podpis** (widoczny w liście i po otwarciu aplikacji) i **Data** (domyślnie dziś).
- **Język listu:** czeski, angielski, niemiecki, polski; domyślnie język aplikacji. **Motyw:** **Bez motywu**
  (domyślnie) albo **Boże Narodzenie**.
- **Rodowód w liczbach** to liczby z wycinka, nie z całego drzewa: liczba osób i pokoleń, najstarszy przodek, rody,
  miejsca i droga rodziny, najstarszy zapis, osoby według pokoleń.
- **Co jest w paczce:** drogowskaz do części z odnośnikami; kto otworzy je bez rozpakowania ZIP-a, dostaje
  instrukcję rozpakowania.
- List można wydrukować na A4.
- **Obsługa:** krok **List przewodni** z podglądem strony startowej; w kroku 6 **Otwórz w oknie**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/gift-cover.ts buildGiftCover, giftFacts, giftLetterTemplate, giftDefaultSalutation, giftMessage (všechny čtyři tokeny) · strings.ts giftTree.salutationToken, template.none, template.xmas, cover.*, letter.langH, langName, motif, salutationH, messageH, reinsert, dateH, numbersH, guide.signature · dirigent:prace/1126-app-093-darovat-rodokmen (rozhodnutí A3, B3b tisk A4) · dirigent:spec/093 K7.1–K7.4 -->

<a id="A7.9.5"></a>
### A7.9.5 Hurtowo dla listy osób lub wyboru

Z listy osób ([A11](A11-lists-of-people.md)) lub wyboru powstaje paczka dla każdej osoby osobno.

- Tabela **Obdarowani** pokazuje każdego ze zwrotem, liczbą osób i żyjących. **Małżonkowie i partnerzy jako jedna
  paczka** łączy pary. Osoba, która w drzewie nie ma rodziców, partnera ani dziecka, paczki nie dostaje.
- Kroki 2–5 ustawiają wszystkich naraz; **Edytuj…** daje jednej osobie własne ustawienia, **Przywróć wspólne** je
  znosi. `[imię]` w wiadomości uzupełnia się zwrotem każdego obdarowanego.
- Wynikiem jest jeden ZIP `Drzewa <rok>.zip` z gotowym ZIP-em dla każdej osoby lub pary albo pojedyncze ZIP-y w
  wybranym folderze (**Zapisz do folderu…**). Paczki powstają osoba po osobie, żeby wystarczyło pamięci; **Anuluj
  wszystko** usuwa także to, co już powstało. Paczka, której nie da się utworzyć, pokazuje się jako wiersz
  ostrzeżenia; pozostałe powstają.
- Ustawienia zapisują się przy każdej osobie.
- **Granice:** tworzenie wielu paczek działa tylko na komputerze; na telefonie powstaje paczka dla jednej osoby lub
  pary.
- **Obsługa:** menu listy osób i wyboru: **Podarować rodowód każdej osobie…**; w kreatorze krok **Dla kogo**,
  **Lista osób lub wybór**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/gift-batch.ts · src/gift-package.ts buildGiftBatch, giftBatchFileName · src/ui/gift-tree-ui.ts (mode list jen mimo telefon, showDirectoryPicker, Zrušit vše maže zapsané) · src/ui/selection-picker-ui.ts (ne na telefonní liště), src/ui/person-list-hooks.ts · strings.ts giftTree.batch.*, guide.mode.list, guide.listPhoneWhy, guide.listPhoneNote, menuList · dirigent:prace/1126-app-093-darovat-rodokmen (B4: zrušení u složky smaže zapsané ZIPy) · dirigent:spec/093 K8.1–K8.3 -->

<a id="A7.9.6"></a>
### A7.9.6 Zakres eksportu Rodowód osoby

W Eksporcie **Co eksportować** ma wybór **Rodowód osoby…**: wycinek jednej osoby ([A7.9.1](#A7.9.1)) w dowolnym
formacie, bez kreatora.

- Osobą jest ta, która jest właśnie w centrum; można wybrać inną. Głębokość **Rodziny przodków do** pochodzi z
  ostatniego prezentu tej osoby, w przeciwnym razie Kuzyni drugiego stopnia; ręcznych wyjątków rodzeństwa przodków
  Eksport nie używa.
- Formaty: **Wyślij rodzinie**, **Aplikacja z danymi (HTML)**, **Kopia zapasowa danych (JSON)**, **Plakat**,
  **Księga rodu**, **Połączone strony**, **GEDCOM**, **Tabela osób (CSV)**. Wynik otwiera się na wybranej osobie i
  liczy pokrewieństwa i pokolenia od niej.
- Księga i strony dostają wybór **Rodowód osoby** ([A7.4.1](#A7.4.1)). Plakat przełącza widok na wybraną osobę i
  tworzy plakat widoku.
- Ochrona osób żyjących jest wyborem eksportu ([S11.3](S11-protecting-living-people.md#S11.3)) i dotyczy wszystkich
  żyjących, także domowników wybranej osoby. Wybory prezentu ([A7.9.2](#A7.9.2)) ma tylko **Cała paczka prezentowa…**,
  która otwiera kreator z tą samą osobą i głębokością.
- **Granice:** tylko dla otwartego drzewa.
- **Obsługa:** Eksport › **Co eksportować** › **Rodowód osoby…**: **Rodowód osoby** (wybór osoby), **Rodziny przodków
  do**, **Cała paczka prezentowa…**
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/ui/import-export.ts showExportDialog (fokus), setExportPerson (hloubka z paměti daru), exportPersonCutIds (branches {}), renderExportScope (scope person jen aktivní strom), exportScoped, shareFromExportDialog, posterFromExportDialog, bookFromExportDialog (selection gift), exportPersonTreeJSON, exportTargetTreeApp (scopedExportData, defaultPersonId), openGiftFromExport · index.html data-person-ok · src/subtree.ts scopedExportData · strings.ts exportMenu.scopePerson, personPick, personFrom, personFull, *PersonDesc, familyPages.exportPages · dirigent:spec/093 K2.1–K2.4 -->
