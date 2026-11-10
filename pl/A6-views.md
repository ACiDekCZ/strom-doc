<a id="A6"></a>
# A6 Widoki i wybór osób

Jak aplikacja Strom wybiera, które osoby pokaże, i jak pokazują je poszczególne widoki. Opisuje aplikację
3.21.2; zmiany z nowszej wersji mają przy sobie jej numer.

Widok to inne odczytanie **tego samego wyboru osób**. Wybór określa osoba w centrum (ta, którą się kliknie)
i głębokość **Przodkowie** oraz **Potomkowie**. Rodzina, Potomkowie, Oś czasu i Mapa pokazują to samo otoczenie
osoby w centrum. Wachlarz liczy przodków i potomków sam według liczby pokoleń ([A6.4](#A6.4)). Tabela pokazuje
całe drzewo ([A6.7](#A6.7)).

| Widok (cs) | en | de | pl |
|---|---|---|---|
| **Rodina** | Family | Familie | Rodzina |
| **Potomci** | Descendants | Nachkommen | Potomkowie |
| **Časová osa** | Timeline | Zeitleiste | Oś czasu |
| **Vějíř** | Fan | Fächer | Wachlarz |
| **Mapa** | Map | Karte | Mapa |
| **Tabulka** | Table | Tabelle | Tabela |

<!-- zdroj: app:src/types.ts:1237 ViewMode · strings.ts viewModeSwitch.* · Tabulka od aplikace 3.27.0 (viewModeSwitch.table) -->

<a id="A6.1"></a>
## A6.1 Otoczenie osoby w centrum w widoku Rodzina

Widok Rodzina pokazuje osobę w centrum w jej rodzinie, nie całe drzewo.

- Do wyboru należą:
  1. osoba w centrum i wszyscy jej partnerzy;
  2. jej potomkowie do głębokości **Potomkowie**, z partnerami;
  3. bezpośredni przodkowie przez oboje rodziców do głębokości **Przodkowie**;
  4. rodzeństwo, także przyrodnie (ich drugiego rodzica się nie dodaje), z partnerami i potomkami do głębokości
     Potomkowie;
  5. ciotki i wujowie (rodzeństwo rodziców) z partnerami;
  6. kuzyni i kuzynki, czyli dzieci ciotek i wujów zapisane w ich związku, z potomkami do głębokości Potomkowie.
- **Granice:** przodków partnera osoby w centrum nie dodaje się do wyboru nigdy. Kto nie należy do otoczenia,
  zostaje w drzewie, tylko widok go nie pokazuje; pokaże go nowa osoba w centrum.
- **Głębokość:** po wyborze nowej osoby w centrum Przodkowie i Potomkowie są ustawione na największą głębokość, jaką
  drzewo ma przy tej osobie. Menu daje od 1 do tej największej głębokości. Dzieci partnera z innego związku dodają
  jedno pokolenie w dół.
- **Obsługa:** kliknięcie karty osoby; opcje **Przodkowie** i **Potomkowie** na pasku widoku.
- **Obowiązuje od:** aplikacja 1.0.0

<!-- zdroj: app:src/layout/pipeline/1-select-subgraph.ts selectSubgraph · src/layout/pipeline/index.ts:962 includeSpouseAncestors: false · src/renderer.ts:719 computeTreeLayout, setFocus (maxGenerations) · src/focus-depth.ts maxAncestorDepth, maxDescendantDepth · strings.ts focus.ancestorsLabel, focus.descendantsLabel -->

<a id="A6.1.1"></a>
### A6.1.1 Domyślna osoba i widok

Z czym otwiera się drzewo, określa ustawienie drzewa **Domyślna osoba i widok**.

| Opcja | Możliwości |
|---|---|
| osoba | **Ostatnio wyświetlana** · **Konkretna osoba:** (wybrana) |
| widok | **Rodzina** · **Ostatnio używany** (na tym urządzeniu) |

- **Granice:** bez ustawienia drzewo otwiera się na pierwszej osobie drzewa. Odświeżenie strony zachowuje drzewo,
  widok i osobę w centrum.
- **Obsługa:** zarządzanie drzewami, przy drzewie **Domyślna osoba i widok**.
- **Obowiązuje od:** domyślna osoba aplikacja 1.0.0; wybór widoku i odświeżenie strony aplikacja 3.21.0

<!-- zdroj: app:src/renderer.ts:1178 findDefaultFocusPerson, getStartupFocus · strings.ts treeManager.defaultPersonViewTitle, focus.defaultPersonLastFocused, focus.defaultPersonSpecific, focus.defaultViewFamily, focus.defaultViewLast · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.2"></a>
## A6.2 Widok Potomkowie

Widok Potomkowie pokazuje tylko osobę w centrum i jej potomków do głębokości Potomkowie: bez przodków, ciotek, wujów
i kuzynów.

- **Tylko krewni** (domyślnie): potomkowie osoby w centrum związani krwią.
- **Pełne rodziny**: dodatkowo kolejne związki partnerów i ich dzieci nie z tej krwi, przygaszone.
- **Obsługa:** przełącznik na pasku widoku; opcję domyślną przechowuje ustawienie **Widok Potomkowie**.
- **Obowiązuje od:** widok aplikacja 1.4.0; Pełne rodziny aplikacja 1.9.2

<!-- zdroj: app:src/layout/pipeline/index.ts includeAuntsUncles: !descendantsOnly, expandLineageOnly: descendantsOnly && !isDescendantsFullFamilies() · strings.ts viewModeSwitch.bloodOnly, viewModeSwitch.fullFamilies, viewModeSwitch.settingLabel · settings descendantsFullFamilies (výchozí false) -->

<a id="A6.3"></a>
## A6.3 Oś czasu

Oś czasu pokazuje osoby widoku jako paski życia na osi lat.

- Wiersz dostaje tylko osoba z rokiem urodzenia. Pozostałe widok policzy i napisze „N osoby bez roku urodzenia nie
  są wyświetlane”. Osoby zastępcze (puste miejsce dla nieznanego rodzica) się pomija.
- Kolejność wierszy: rok urodzenia, potem imię i nazwisko bez tytułów.
- Pasek osoby żyjącej sięga do dziś. Zmarła osoba bez daty zgonu ma pasek do ostatniego znanego zdarzenia i otwarty
  koniec.
- Rok ślubu bierze się z daty początku związku. Oś jest zaokrąglona do dziesięcioleci.
- Pod osią lat biegnie wiersz historii osoby w centrum (wydarzenia epoki i miejsc jej życia, symbole rodzajów). Bez
  badania lub bez takich wydarzeń wiersza nie ma.
- **Obowiązuje od:** oś czasu aplikacja 1.5.0; wiersz historii aplikacja 3.19.0

<!-- zdroj: app:src/timeline.ts computeTimelineModel, :59 TimelineHistory · strings.ts timeline.omitted · CHANGELOG.cs.md 3.19.0 -->

<a id="A6.4"></a>
## A6.4 Wachlarz

Wachlarz pokazuje przodków osoby w centrum w wycinkach koła, pokolenie po pokoleniu.

- **Kształt:** **Półkole** · **Pełne koło** · **Dwustronny** (przodkowie i potomkowie).
- **Pokolenia** przodków 3–10, domyślnie 5. W kształcie Dwustronny **Potomkowie** 1–5, domyślnie 3.
- Numeracja przodków: 1 to osoba w centrum, ojciec osoby n ma numer 2n, matka 2n+1. Linia ojca jest po lewej.
  Numery przy wycinkach włącza ustawienie **Wachlarz** „Wyświetlanie numerów Kekulégo (ahnentafel) przodków”
  (domyślnie wyłączone).
- Rodzice to pierwsi dwoje zapisanych rodziców osoby. Relacja, która nie jest biologiczna (adopcja, przybrany
  rodzic, rodzic zastępczy), jest przy wycinku oznaczona.
- Przodek, który pojawia się w wachlarzu drugi raz, jest rysowany ponownie, ale dalej się nie rozwija; legenda
  **↻ powtarza się (implex)**. Opcja **Pokaż pierwsze wystąpienie** przeskakuje do jego pierwszego miejsca.
- Potomkowie (kształt Dwustronny): związki w kolejności ślubów (data ślubu, potem kolejność w danych), dzieci według
  urodzenia. Nieznany partner zbiera dzieci bez drugiego rodzica. Związek bez dzieci jest widoczny tylko przy osobie
  w centrum.
- **Kolory:** **Płeć** · **Linie** (cztery linie dziadków: ojciec ojca, matka ojca, ojciec matki, matka matki) ·
  **Rody** ([A4](A4-surnames-and-families.md)).
- **Osoba wyjściowa** wraca wachlarzem do osoby, od której się zaczęło.
- **Obowiązuje od:** wachlarz aplikacja 1.8.0; nowy wachlarz z kształtami, kolorami i implexem aplikacja 3.20.0
- **Od aplikacji 3.27.0:** związek bez daty ślubu jest ustawiany według najpóźniejszej możliwej daty ślubu:
  wcześniejszej z końca związku (rozwodu) i urodzenia pierwszego dziecka związku. Ślub „przed 1982” stoi przed ślubem
  w roku 1982. Związek bez tych dat idzie za pozostałymi. Tę samą kolejność mają partnerzy obok osoby i oznaczenia
  kolejności małżeństw („1. ∞”) na kartach.

<!-- zdroj: app:src/fan-chart.ts FAN_MIN_GENERATIONS, FAN_MAX_GENERATIONS, FAN_DEFAULT_GENERATIONS, parentSlots, repeatOf · strings.ts fan.shapeHalf, fan.shapeFull, fan.shapeTwo, fan.colorGender, fan.colorLine, fan.colorRod, fan.legendRepeats, fan.originPerson, fan.showFirst, fanChart.kekuleHint · settings fanKekule (výchozí false) · spec 029 · CHANGELOG.cs.md 3.20.0 · 3.27.0: app:ad1ca16c src/marriage-order.ts marriageKey (BOUND 0.5, qualifier „<“; bez sňatku min(endDate, narození dětí)), marriageDates, compareMarriages, marriagesInOrder (partneři vedle osoby, značka „1. ∞“) · src/fan-chart.ts familiesOf · CHANGELOG.cs.md 3.27.0 · dirigent:prace/1109-app-tester-vlna1 (T50, T13) -->

<a id="A6.5"></a>
## A6.5 Mapa

Mapa pokazuje miejsca zdarzeń osób.

- **Zakres:** **Ten widok** (domyślnie, osoby widoku) · **Całe drzewo**.
- **Rodzaje:** **Urodzenia** · **Zgony** · **Śluby** · **Inne wydarzenia**. Domyślnie włączone są wszystkie; wybór
  zapamiętuje się na urządzeniu.
  - Chrzest liczy się do urodzenia, pochówek i kremacja do zgonu.
  - Zaręczyny, zapowiedzi, zezwolenie na ślub i intercyza liczą się do ślubu. Pozostałe zdarzenia pary to Inne
    wydarzenia.
- Miejsce ślubu pokazuje się, gdy w widoku jest co najmniej jedno z partnerów.
- Miejsce pisze się w najczęstszym zapisie. Miejscowość to jeden punkt także z numerami domów; miejsce z własnymi
  dokładnymi współrzędnymi zostaje osobnym punktem.
- **Obowiązuje od:** mapa aplikacja 1.10.0; rodzaje zdarzeń i punkty miejscowości aplikacja 3.21.0

<!-- zdroj: app:src/places.ts collectPlaces, groupTownPoints · src/ui/map-ui.ts (localStorage strom.map.kinds) · strings.ts map.scopeView, map.scopeTree, map.kinds · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.5.1"></a>
### A6.5.1 Skąd mapa bierze położenie miejsca

We własnym drzewie (bez badania) położenie miejsc odszukuje sama aplikacja, w usłudze OpenStreetMap (Nominatim).
Wysyła tylko nazwę miejsca tak, jak jest zapisana w drzewie, i tylko za zgodą. W drzewie z badania miejsca identyfikuje
badanie ([R4](R4-places.md)).

- **Granice:**
  - przed pierwszym wyszukiwaniem aplikacja pyta (**Odszukać współrzędne online?**). Wychodzą tylko nazwy miejsc,
    żadne imiona, daty ani relacje. Najwyżej jedno zapytanie mniej więcej na sekundę;
  - współrzędne zapisują się w drzewie: każde miejsce wyszukuje się raz, a mapa działa potem także bez połączenia;
  - automatyczne wyszukiwanie bierze **pierwszy wynik** usługi dla zapisanej nazwy. Do aplikacji 3.23.0 nie
    rozróżniało przy tym miejscowości o tej samej nazwie: miejsce mogło więc trafić do miejscowości o tej samej nazwie
    gdzie indziej. Położenie, które do drzewa nie pasuje, oznacza **Do sprawdzenia** ([R4.4.1](R4-places.md#R4.4.1));
  - tylko miejsce z numerem domu, którego usługa nie znalazła, wyszukuje się według miejscowości. Spośród miejscowości
    o tej nazwie wybiera się tę najbliższą innym miejscom drzewa („Miejscowość o tej nazwie występuje kilka razy;
    wybrano tę najbliższą innym miejscom drzewa.”); przy miejscu stoi **Położenie według miejscowości**;
  - **od aplikacji 3.24.0** najbliższą miejscowość wybiera się przy każdym miejscu: gdy dwie lub więcej miejscowości
    nazywa się dokładnie tak jak zapisane miejsce (bez względu na wielkość liter i znaki diakrytyczne), bierze się tę
    najbliższą środka drzewa, nie pierwszy wynik. Środek to mediana położeń wprowadzonych ręcznie lub potwierdzonych
    **Zachowaj**, gdy jest ich co najmniej 3; w przeciwnym razie mediana wszystkich położeń drzewa i miejsc, które
    wyszukiwanie znalazło bez wątpliwości. Miejsce z dalszym określeniem („Lhota u Kolína”, „Lhota 16”), jedyna
    miejscowość lub drzewo bez położeń dostaje pierwszy wynik jak wcześniej. Nadal jest to jedno zapytanie na miejsce;
  - kontrola miejsca mówi, ile miejscowości o tej nazwie mapa znalazła („Mapa znalazła 3 miejscowości o tej nazwie
    i wybrała tę najbliższą innym miejscom drzewa.”); od aplikacji 3.24.0, wcześniej zawsze „dwie”;
  - położenie, które już jest w drzewie, się nie przesuwa: wyszukiwanie szuka tylko miejsc bez położenia. Także
    scalenie z innym drzewem lub plikiem GEDCOM nie nadpisuje położenia wprowadzonego ręcznie lub potwierdzonego
    **Zachowaj**, tylko uzupełnia brakujące. Złe starsze położenie można przesunąć tylko ręcznie;
  - czego się nie znajdzie, zostaje bez położenia. Aplikacja niczego nie zgaduje: „pomoże poprawienie zapisu lub
    dodanie kraju”.
- **Obsługa:** aplikacja: **Ustawienia → Wyszukiwanie miejsc online**; w oknie miejsc **Złe miejsce? Popraw**,
  **Znajdź to miejsce pod inną nazwą** (dołącza się tylko położenie, zapis w drzewie się nie zmienia), **Użyj też dla
  innych numerów domów w miejscowości …**, **Wyczyść osierocone miejsca (n)**.
- **Dlaczego:** wyszukiwanie miejsc to jedyna część aplikacji, która coś wysyła na zewnątrz; dlatego tylko za zgodą,
  tylko nazwy i każde miejsce raz (komentarz w kodzie). Limit jednego zapytania na sekundę to warunek usługi.
- **Obowiązuje od:** aplikacja 1.10.0; **Złe miejsce? Popraw** 1.10.1; **Wyczyść osierocone miejsca** 2.1.0; położenie
  według miejscowości 3.21.0; najbliższa miejscowość o tej samej nazwie przy każdym miejscu i liczba miejscowości
  w kontroli 3.24.0

<!-- zdroj: app:src/geocode.ts hlavička, REQUEST_INTERVAL_MS=1100, geocodePlace (limit 1, parseGeocodeResponse první výsledek), geocodeTown/pickTownHit nearestTo (od v3.21.0), geocodePlaces townFallback · app:src/strings.ts map.consentTitle, consentBody, settingLabel, wrongSpot (v1.10.1), searchLabel, attachOnly, useForOthers, cleanOrphans (v2.1.0), nearestTown, byTown, doneWithMisses · FB podnět 2026-11-04 (stejnojmenná obec) · od 3.24.0: geocode.ts treeCenter (medián, PERSONS_CENTER_MIN=3), sameNamedTowns, pickPlaceHit (townChoices), buildGeocodeUrl limit · place-check.ts multi count · strings.ts checkMulti(n) · merge-executor test (ruční poloha zůstane) · commit 046967d -->

<a id="A6.5.2"></a>
### A6.5.2 Odszukanie miejsc poza mapą w badaniu

Przy drzewie z badaniem pasek stanu mapy oferuje miejsca bez położenia do odszukania w badaniu
([R4.4](R4-places.md#R4.4)). Przycisk otwiera okno **Miejsca** z podglądem; do kolejki badania miejsca trafiają
dopiero po **Dodaj do kolejki**.

- **Granice:**
  - przed wyszukaniem na mapie jest na pasku obok wyszukiwania mapy **W badaniu**. Po wyszukaniu, gdy mapa części
    miejsc nie znalazła, pasek pokazuje „N miejsc na mapie · mapa nie znalazła K” i **Odszukaj w badaniu (K)**,
    ewentualnie „N do potwierdzenia ›” (otwiera **Czeka** w panelu badania);
  - przycisk jest tylko przy drzewie z badaniem i tylko wtedy, gdy jest co odszukać: miejsce bez położenia albo
    nieustalone, którego jeszcze nie ma w kolejce, nad którym się nie pracuje i które nie czeka na odpowiedź;
  - okno **Miejsca** pokazuje podgląd „Odszukaj w badaniu N miejsc poza mapą”. Przed **Dodaj do kolejki N miejsc**
    nic nie trafia do kolejki i żadne miejsce nie trafia tam dwa razy;
  - gdy badanie działa na innym komputerze albo na telefonie, aplikacja zamiast okna mówi, gdzie odszukanie działa:
    „Odszukać i sprawdzić można w badaniu na komputerze, na którym jest uruchomione. Stan miejsc przenosi się tutaj
    razem z drzewem.”, na telefonie „Odszukać i sprawdzić można na komputerze z badaniem. Na pytania o miejsca można
    odpowiedzieć także tutaj, w zakładce Czeka.” Starsze badanie: „Ta wersja badania jeszcze nie wyszukuje miejsc.”;
  - przy śledzeniu badania na mapie ([S4.1.3](S4-research-from-the-app.md#S4.1.3)) wiersz „… – bez położenia na
    mapie” oferuje **Odszukaj w badaniu**: dodaje to jedno miejsce do kolejki od razu, bez podglądu; dodanie można
    cofnąć w komunikacie.
- **Obsługa:** aplikacja: mapa → pasek stanu → **W badaniu**, po wyszukaniu na mapie **Odszukaj w badaniu (K)** →
  okno **Miejsca** → **Dodaj do kolejki N miejsc**.
- **Obowiązuje od:** aplikacja 3.25.0

<!-- zdroj: app:src/ui/map-ui.ts (stavový pruh, lookResearch, lookable), src/ui/place-actions.ts, src/ui/places-research-ui.ts (bulkLook, bulkLookHead, bulkLookGo, nic dvakrát), src/ui/map-follow-ui.ts (noCoords + places.research.look, Undo) · strings.ts map.onMap.notFound, lookResearch, lookResearchShort, lookResearchTitle, confirm; places.dialog.elsewhere, phoneLine, oldResearch · CHANGELOG.cs.md 3.25.0 · commit 2246ca28 · spec 058 -->

<a id="A6.6"></a>
## A6.6 Ród w widoku

Widok może wyróżnić jeden ród ([A4](A4-surnames-and-families.md)): jego członków w pełni, żony i mężów, którzy
weszli do rodu przez małżeństwo, słabiej, pozostałych przygaszonych. Działa w widokach Rodzina, Potomkowie
i Wachlarz.

- Wybór zapamiętuje się dla każdego drzewa na urządzeniu. Ród, którego w drzewie już nie ma, anuluje się po cichu.
- Gdy w widoku nie jest narysowany żaden członek rodu:
  - Rodzina i Wachlarz przesuwają osobę w centrum na najbliższego członka rodu (przez rodziców, dzieci i partnerów;
    przy remisie na starszego), a gdy osoba nie jest z nim połączona, na założyciela rodu;
  - Potomkowie przesuwają osobę w centrum zawsze na założyciela;
  - pasek proponuje **↩ Wróć**.
- **Granice:** przywrócenie wyboru z pamięci nie przesuwa osoby w centrum.
- **Obsługa:** **Rody** na pasku; w menu osoby **Tylko ród …** (ród z urodzenia osoby jest pierwszy); koniec przez
  × przy etykiecie lub **Pokaż całe drzewo**.
- **Obowiązuje od:** aplikacja 3.21.0

<!-- zdroj: app:src/ui/rod-view.ts · src/rod-focus.ts (BFS přes rodiče, děti, partnery) · strings.ts rodView.only, rodView.whole, rodView.moved · spec 039 · CHANGELOG.cs.md 3.21.0 -->

<a id="A6.7"></a>
## A6.7 Tabela

Tabela pokazuje całe drzewo w wierszach: każdą osobę, każdy związek, każde wydarzenie albo każde źródło, z danymi
w kolumnach. Służy do szukania luk, sprzeczności i ustaleń kontroli w całym drzewie. Nie zależy od głębokości
**Przodkowie** i **Potomkowie**.
Widok Tabela opiera się na tabeli Ondřeja Chrpy.

- **Wiersze:** przełącznik **Wiersze**: **Osoby** · **Związki** · **Wydarzenia** · **Źródła**. Każdy typ wierszy ma
  własne kolumny, filtr i sortowanie.
  - **Osoby:** jeden wiersz na osobę drzewa; osoby zastępcze (puste miejsce dla nieznanego rodzica) się pomija.
  - **Związki:** jeden wiersz na związek, który ma co najmniej jednego rzeczywistego partnera. **Partner 1** to ten
    z pary, kto jest krewnym osoby głównej; w przeciwnym razie pierwszy partner związku.
  - **Wydarzenia:** jeden wiersz na wydarzenie drzewa ([A6.7.10](#A6.7.10)).
  - **Źródła:** jeden wiersz na źródło drzewa ([A6.7.11](#A6.7.11)).
- **Osoba główna** to osoba w centrum drzewa ([A6.1](#A6.1)). Według niej liczy się kolumnę **Pokrewieństwo z osobą
  główną** i chip **Krewni**: przodkowie osoby głównej (także ona sama) i wszyscy ich potomkowie. Partnerzy, którzy
  weszli do rodziny przez małżeństwo, do nich nie należą.
- **Pokolenie** 1 to najstarsze pokolenie drzewa; partner ma pokolenie swojego partnera.
- **Żyje** liczy się jak ochrona osób żyjących ([A7.1](A7-book-pages-and-export.md#A7.1)).
- Nad tabelą jest liczba („42 z 120 osób”) i sortowanie („Sortowanie: …”). Pole **Szukaj osoby...** na pasku
  narzędzi w tabeli wybiera wiersz osoby i przewija do niego; osoba w centrum się nie zmienia.
- **Granice:**
  - wyróżnienie rodu ([A6.6](#A6.6)) w tabeli się nie stosuje; ród można wybrać chipem **Ród** ([A6.7.6](#A6.7.6));
  - drzewo tylko do odczytu (śledzone drzewo, drzewo zapisane nowszą wersją aplikacji, zablokowane drzewo) tabela
    tylko pokazuje: „Tylko do odczytu: edycji i „To nie błąd” tu nie ma.” Przeglądanie, filtr, sortowanie i eksport
    CSV działają; widoku nie można zapisać, przemianować ani usunąć;
  - tabela obsłuży drzewo z 5 000 osób (także ich wydarzenia i 2 000 źródeł).
- **Obsługa:** w przełączniku widoków **Tabela** (za **Mapa**); w wąskim oknie i na telefonie **Więcej → Widok →
  Tabela**. Widok jest zapamiętywany jak pozostałe ([A6.1.1](#A6.1.1)).
- **Obowiązuje od:** aplikacja 3.27.0

<!-- zdroj: app:src/ui/table-view/table-model.ts ROW_TYPES, buildTableModel (isPlaceholder ven, svazek aspoň s jedním skutečným partnerem), bloodOf (předci hlavní osoby a všichni jejich potomci), makeContext (homeId, isLivingPerson) · table-columns.ts unionPartners (pokrevní partner jako Partner 1), gen (assignGenerations + 1), kin (findRelationship, kinSelf) · src/ui/table-view/table-ui.ts tableReadOnly (isReadOnly: viewMode, isLocked, isNewerData) · src/data.ts:655 isReadOnly · src/ui/bottom-sheet.ts:443 (Více → Pohled: Vějíř, Mapa, Tabulka) · table-bar.ts countText, sortText · perf-budget test 5 000 osob · strings.ts viewModeSwitch.table, table.rows, rowType, rowTypeNote, countOf, sortedBy, readOnly, readOnlyShort · commity c34c47ff, 1b72e6d8 · spec 073 U2 · Události a Prameny (spec 073 U3 P2, K5.1–K5.4): commity 8de751c2, 63ed9def, 1a3a49f1, 3cf69ffa, strings.ts table.rows.events, rows.sources, perf-budget 5 000 osob (Události) a 2 000 pramenů · poděkování: Milan 10. 11. (dirigent:prace/1110-doc-tabulka, bod 4) · CHANGELOG.cs.md 3.27.0 · dirigent:prace/1110-app-tabulka-p1 -->

<a id="A6.7.1"></a>
### A6.7.1 Związki w tabeli osób

Osoba z dwoma i więcej związkami ma w tabeli osób własny wiersz, a pod nim podwiersz dla każdego związku („Związek 2
z 3”). Wiersz osoby ma w kolumnie **Partner** liczbę („3 związki”), a pozostałe kolumny związku puste.

- Związki idą po kolei według daty ślubu; związki bez daty są na końcu w kolejności zapisu.
- **Zwinięte:** wiersz osoby pokazuje pierwszy związek i liczbę pozostałych. Domyślnie jest rozwinięte; wbudowany
  widok **Luki** ma związki zwinięte.
- **Filtr w kolumnie związku** ocenia się przy każdym związku osobno. Osoba zostaje, gdy spełnia go co najmniej jeden
  związek; pozostałe chowają się pod wiersz „2 poza filtrem · pokaż”. Pokazane są przygaszone do następnej zmiany
  filtru.
- **Sortowanie według kolumny związku** bierze pierwszy związek, który spełnia filtr.
- Osoba z jednym związkiem ma jego dane bezpośrednio w swoim wierszu.
- **Obsługa:** **Rozwiń związki** / **Zwiń związki** (na telefonie w menu **⋯**); klawisze → i ← w kolumnie **Imię
  i nazwisko**, * dla wszystkich osób; menu wiersza. Stan zapisuje się z widokiem ([A6.7.7](#A6.7.7)).

<!-- zdroj: app:src/ui/table-view/table-subrows.ts defaultUnionCollapse (collapsed: false), isExpanded, setAllExpanded, passingUnions, personPassesUnions, sortUnionOf, buildLines · table-model.ts unionsByDate (datum sňatku, bez data na konci v pořadí zápisu) · table-views.ts BUILTIN_VIEWS gaps (unions collapsed) · strings.ts table.unionsN, unionKofN, hiddenUnions, expandAll, collapseAll · commity 8833da14, 8192621d -->

<a id="A6.7.2"></a>
### A6.7.2 Kolumny

Kolumny są w grupach. Które są widoczne i w jakiej kolejności, jest częścią widoku ([A6.7.7](#A6.7.7)).

| Wiersze | Grupy kolumn |
|---|---|
| **Osoby** | **Osoba** · **Urodzenie i chrzest** · **Rodzice** · **Związki** · **Rozwód** · **Zgon i pochówek** · **Wydarzenia** · **Źródła** · **Wiarygodność i badania** · **Kontrole** |
| **Związki** | **Para** · **Ślub** · **Rozwód** · **Dzieci i źródła** |

- **Imię i nazwisko** (przy związkach **Partner 1**) jest przypięte po lewej i sortuje się według nazwiska, potem
  imienia. **Nazwisko** to nazwisko po ślubie, w przeciwnym razie rodowe; **Nazwisko rodowe** to zapisane nazwisko.
- **ID badań** pokazuje tylko numer osoby z badania (P…).
- **Wydarzenia** (**Zawód**, **Miejsce zamieszkania**, **Wyznanie**, **Służba wojskowa**, **Emigracja**,
  **Wykształcenie**) pokazują każdą wartość raz, najnowszą pierwszą.
- Kolumny **Wiarygodność …** i **Pewność z badań** mają wartość tylko w drzewie z badania
  ([S7](S7-reliability-and-verification.md)).
- **Granice:** zwinięta grupa to wąski pasek; pokazuje najwyższy poziom ustalenia w swoich komórkach. Na telefonie
  przypięte imię i nazwisko jest węższe, a nagłówek można tylko czytać, nie zmieniać.
- **Obsługa:**
  - panel **Kolumny** („12 z 58”): **Szukaj kolumny**, grupy z polem wyboru **wszystkie**, przeciąganie kolejności,
    **Wiersz pokrycia**, **Przywróć domyślne**, **Gotowe**;
  - menu w nagłówku kolumny: **Sortuj rosnąco**, **Sortuj malejąco**, **Dodaj do sortowania** (Shift + kliknięcie),
    **Filtr…**, **Przypnij do lewej** / **Odepnij**, **Przesuń w lewo** / **Przesuń w prawo**, **Ukryj kolumnę**,
    **Zwiń grupę …** / **Rozwiń grupę …**; przy kolumnie obliczonej „Obliczono z: …”;
  - szerokość kolumny przez przeciągnięcie krawędzi nagłówka.

<!-- zdroj: app:src/ui/table-view/table-columns.ts PERSON_GROUPS, UNION_GROUPS, katalog sloupců (surname marriedSurname || lastName, birthSurname lastName, researchId /^P\d{1,7}$/, eventValues nejnovější první, sortKey jména), pinnedWidth 156 na telefonu · table-state.ts MIN_COLUMN_WIDTH, BAND_WIDTH, lockedColumn · table-checks.ts bandSeverity · table-colpanel.ts panelGroups · table-headmenu.ts headMenuItems · strings.ts table.group.*, col.*, columns, columnsCount, searchColumn, all, pinnedLabel, resetColumns, done, coverageRow, sortAsc, sortDesc, sortAdd, sortAddHint, filterColumn, pin, unpin, moveLeft, moveRight, hide, collapseGroup, expandGroup, computedFrom · commity 89602f35, 49b96d92, e4a35406 -->

<a id="A6.7.3"></a>
### A6.7.3 Wartości obliczone i zastępcze

Czego w drzewie nie zapisano, ale da się to policzyć z danych, tabela oblicza. Niczego przy tym do drzewa nie
zapisuje.

| Wartość | Jak się liczy |
|---|---|
| wiek (przy urodzeniu dziecka, ślubie, zgonie) | z dat z dokładnym dniem („67”); z roku, miesiąca lub zakresu jako zakres („28–29”); z daty z ok., przed lub po jako szacunek („≈ 67”) |
| zastępcza data i miejsce | bez urodzenia chrzest („chrz. 3.5.1850”), bez zgonu pochówek („poch. …”); wiek z nich to szacunek (≈) |
| **Różnica wieku zapisanego** | o ile lat zapisany wiek wychodzi poza zakres wieku z dat („+3”, „−2”); wieku słownego i wieku z ok., przed, po się nie porównuje |
| **Długość związku** | od ślubu do rozwodu, w przeciwnym razie do pierwszego zgonu z pary |
| **Kolejność wśród rodzeństwa**, **Liczba rodzeństwa**, **Liczba dzieci**, **Liczba związków**, **Liczba źródeł** | z powiązań i źródeł drzewa |

- Daty mają przed sobą słowo dokładności (**ok.**, **przed**, **po**). Niepewna data jest podkreślona kropkami; nie
  jest to ustalenie. Datę sortuje się według jej początku.
- **Granice:** wieku się nie liczy, gdy koniec poprzedza początek. Kolumny zgonu mają przy osobie żyjącej **Nie
  dotyczy** (przy **Kompletność zgonu** „żyje”). **Wiek ojca/matki przy urodzeniu** bez zapisanego rodzica to **Nie
  dotyczy**.
- **Obsługa:** podpowiedź przy komórce („Chrzest, urodzenie nieznane”, „Pochówek, zgon nieznany”); przy kolumnie
  obliczonej w menu nagłówka „Obliczono z: …”; legenda **Oznaczenia** ([A6.7.5](#A6.7.5)).

<!-- zdroj: app:src/ui/table-view/table-columns.ts ageCell (přesně / rozsah ageRangeBetween / ≈ approxAgeBetween; nic, když konec před začátkem), dateCell, qualifierWord, birthOrBaptism, deathOrBurial (náhrada, ≈), gapCell (recordedAgeGap), unionLength, naCell, parentsOf · src/dates.ts:448 ageRangeBetween, recordedAgeGap · table-model.ts dateNumber (začátek rozsahu) · strings.ts table.na, living, subst.*, qual.*, computedFrom, from.* · commit 8833da14 -->

<a id="A6.7.4"></a>
### A6.7.4 Kompletność i wiersz pokrycia

Kolumny **Kompletność …** mówią, ile śledzonych pól jest wypełnionych, w procentach.

| Kolumna | Liczy się z |
|---|---|
| **Kompletność urodzenia** | data, miejsce, ojciec, matka, źródło |
| **Kompletność związku** | data, miejsce, partner, źródło ślubu |
| **Kompletność zgonu** | data, miejsce, źródło (nie przy osobie żyjącej) |
| **Kompletność ogółem** | urodzenie, każdy związek i zgon, ważone liczbą pól |

- Wartość zastępcza (chrzest, pochówek) pola nie wypełnia. Podpowiedź przy komórce wypisuje, czego brakuje („brak:
  miejsce urodzenia, źródło urodzenia”).
- **Wiersz pokrycia** pod nagłówkiem pokazuje przy każdej kolumnie, ile procent wierszy ma wartość („wypełniono
  64 %”, podpowiedź „77 z 120”). Liczy tylko wiersze, które są właśnie widoczne (po filtrze i wyszukiwaniu). Komórek
  **Nie dotyczy** się nie liczy; przy kolumnach związku liczą się związki, które spełniają filtr. Poniżej 50 % liczba
  jest pogrubiona; bez komórki, której by dotyczyła, jest „–”.
- **Obsługa:** **Wiersz pokrycia** w panelu **Kolumny** (na telefonie w **⋯**); zapisuje się z widokiem.

<!-- zdroj: app:src/ui/table-view/table-columns.ts compCell, unionComp (pole a váhy, náhrada nevyplní) · table-coverage.ts cellFilled, columnCoverage, coverageCell, coverageLabel (LOW pod 50 %) · table-subrows.ts coverageUnionsOf · strings.ts table.compList.*, compField.*, missing, missingNone, compCounts, coverage, coverageOf · rozhodnutí Milan 10. 11. (spec 073, bod 5) · commit 8833da14 -->

<a id="A6.7.5"></a>
### A6.7.5 Ustalenia kontroli w komórkach

Tabela pokazuje ustalenia Jakości danych ([A5](A5-tree-check.md)) bezpośrednio przy danej, której dotyczą: komórka
jest podbarwiona i ma oznaczenie poziomu. Kontrola działa nad całym drzewem w tle, gdy aplikacja jest wolna.

| Poziom | Oznaczenie w legendzie |
|---|---|
| **błąd** | „Dane są ze sobą sprzeczne.” |
| **do sprawdzenia** | „Nietypowa wartość warta sprawdzenia.” |
| **trop** | „Trop do poszukiwań, nie błąd.” |
| **nietypowe** (☆) | „Ustalenie oznaczone „To nie błąd”.” |

- Ustalenie trafia do komórki danej: wiek rodzica przy urodzeniu do **Wiek ojca/matki przy urodzeniu** przy dziecku,
  ustalenie dotyczące ślubu do wieku i daty ślubu, zapisany wiek do zapisanego wieku i jego różnicy, zgon przed
  urodzeniem do obu dat i wieku, zdarzenie do kolumny zdarzenia, różnica wieku partnerów do partnera, możliwy
  duplikat do imienia i nazwiska, zapis miejsca do komórek z tym miejscem. Ustalenie bez własnej komórki jest tylko
  w kolumnach kontroli.
- Kolumny grupy **Kontrole**: **Ustalenia** (liczba; „…”, dopóki kontrola trwa), **Najwyższy poziom**, **Nietypowe,
  sprawdzone** (liczba ustaleń oznaczonych **To nie błąd**).
- Ustalenie oznaczone **To nie błąd** ([A5.7](A5-tree-check.md#A5.7)) zostaje w komórce jako **nietypowe**
  („Nietypowe, ale sprawdzone”) i nie liczy się do ustaleń.
- **Granice:** drzewo tylko do odczytu nie pozwala oznaczyć ustalenia („Drzewo tylko do odczytu: nie można oznaczać
  ustaleń.”).
- **Obsługa:** kliknięcie oznaczenia otwiera dymek (na telefonie panel od dołu): poziom, tekst ustalenia, „Ustalenie
  1 z 2” i
  - **To nie błąd** (powiadomienie „Oznaczono: to nie błąd” z **Cofnij**); przy nietypowym **Zgłaszaj ponownie**;
  - **Jakość danych ›** otwiera okno Jakości danych na grupie tego ustalenia; przy nietypowym na liście oznaczonych.

  Legenda **Oznaczenia** („Oznaczenia w komórkach”) objaśnia też niepewną datę, wiarygodność, wartość zastępczą,
  obliczenie i **Nie dotyczy**.

<!-- zdroj: app:src/ui/table-view/table-checks.ts severityRank, parentAgeColumn, issueTargets (mapování nálezů na buňky), buildCheckIndex, CHECK_COLUMNS, applyChecks · table-ui.ts whenIdle (validateTreeData jednou), cellFindings · table-bubble.ts bubbleHeading, bubbleHtml, legendHtml, openBubblePanel, sheetElement · src/ui/tree-stats.ts showTreeValidationDialog (focus: skupina otevřená a posunutá; označené → seznam) · strings.ts table.sev.*, unusualChecked, notError, reReport, toQuality, dismissedToast, roNote, checksRunning, findingOf, legend, legendTitle, legendKind.*, legendText.* · commity 19cf28ea, e530019b, 59a8eed0 -->

<a id="A6.7.6"></a>
### A6.7.6 Filtr, wyszukiwanie i sortowanie

Filtr wybiera wiersze, wyszukiwanie zawęża je dalej, sortowanie ustala kolejność.

- **Chipy** tabeli osób (związki chipów nie mają, wydarzenia i źródła mają własne, [A6.7.10](#A6.7.10), [A6.7.11](#A6.7.11)): **Żyjący**, **Zmarli** (wykluczają się), **Krewni**, **Ród** (wybór rodów),
  **Pokolenie** (zakres), **Kilka związków**, **Bez daty urodzenia**, **Niepewna data** (urodzenia lub zgonu),
  **Bez źródła**, **Z ustaleniami** (błąd lub do sprawdzenia; trop nie), **Nietypowe**, **Niepotwierdzone z badań**
  (tylko drzewo z badania). Chipy ustaleń czekają na kontrolę („Gdy sprawdzanie się skończy”). Co się nie zmieści,
  jest w **Więcej (n)**.
- **Filtr w kolumnie** (**Filtr…** w nagłówku) według rodzaju kolumny:
  - wartości z listy (płeć, stan związku, poziom ustalenia, ród …);
  - zakres **od**–**do** (przy dacie **Rok**, przy wieku, liczbie i procentach liczba);
  - tekst: **zawiera** · **zaczyna się od**;
  - przy każdym **Tylko puste** · **Tylko wypełnione**.
- Obowiązują wszystkie filtry naraz. Liczba filtrów jest na **Filtry (n)**, wszystko anuluje **Wyczyść filtry**. Bez
  wiersza: „Nic nie pasuje do filtru”.
- **Szukaj w tabeli:** od 2 znaków, bez względu na wielkość liter i znaki diakrytyczne, w widocznych kolumnach
  i w podwierszach związków; trafienia są wyróżnione, nad tabelą jest ich liczba.
- **Sortowanie:** kliknięcie nagłówka sortuje rosnąco, kolejne kliknięcie malejąco, trzecie sortowanie anuluje;
  sortuje się tylko według tej kolumny. Shift + kliknięcie dodaje kolumnę jako kolejny klucz (kolejne kliknięcie go
  odwraca, trzecie usuwa). Strzałka ↑ ↓ przy nagłówku ma numer kolejności klucza. Puste wartości są zawsze na końcu,
  w obu kierunkach. Liczby w tekście sortują się jak liczby.
- **Granice:** wyszukiwanie nie zapisuje się w widoku ([A6.7.7](#A6.7.7)).

<!-- zdroj: app:src/ui/table-view/table-filter.ts CHIP_ORDER, setChip (Žijící × Zemřelí), personPassesChip (finding: chyba nebo k ověření; unusual; unconfirmed jen researchTree, relN/relB/relD), CHECK_CHIPS, rodChoices, generationSpan, filterKindOf, cellPasses, foldText · table-filterbar.ts SEARCH_DELAY_MS, columnFilterForm, chipChoiceForm · table-state.ts řazení (vzestupně → sestupně → vypnuto; Shift přidá, otočí, odebere; prázdné na konci; Intl.Collator numeric) · strings.ts table.chip.*, chipRod, chipGen, moreN, filters, clearFilters, search, matches, noMatch, checksWait, matchContains, matchStarts, rangeFrom, rangeTo, rangeYears, onlyEmpty, onlyFilled · commity dd1d74bc, e64b8b06, fc746037 -->

<a id="A6.7.7"></a>
### A6.7.7 Widoki tabeli

Widok to zapisane pod nazwą ustawienie tabeli. Wbudowane widoki to gotowe odczytania drzewa; własny widok zapisuje
sobie człowiek.

| Widok wbudowany | Wiersze | Co pokazuje |
|---|---|---|
| **Przegląd** (domyślny dla osób) | osoby | imię i nazwisko, data i miejsce urodzenia, data zgonu, wiek w chwili zgonu, partner, data ślubu i wiek przy nim, ustalenia, kompletność ogółem; sortowanie według daty urodzenia |
| **Urodzenia i rodzice** | osoby | urodzenie i chrzest, rodzice, ich wiek przy urodzeniu, kompletność urodzenia; sortowanie według daty urodzenia |
| **Śluby** (domyślny dla związków) | związki | para, data i miejsce ślubu, wiek i zapisany wiek obojga, stan, świadkowie, rozwód, dzieci, długość, źródła, kompletność; sortowanie według daty ślubu |
| **Zgony** | osoby | zgon, przyczyna, pochówek, wiek i zapisany wiek w chwili zgonu, kompletność zgonu; chip **Zmarli**; sortowanie według daty zgonu |
| **Źródła i cytaty** | osoby | liczba źródeł, udokumentowanie, wiarygodność urodzenia i zgonu; od najmniejszej liczby źródeł |
| **Luki** | osoby | kompletność ogółem i według części, urodzenie, rodzice, źródła; od najmniej kompletnych; związki zwinięte |
| **Kontrole** | osoby | poziom i liczba ustaleń, daty, wiek rodziców, ślub; chip **Z ustaleniami**; od najwyższego poziomu, potem liczby ustaleń |
| **Wszystkie wydarzenia** (domyślny dla wydarzeń) | wydarzenia | typ, osoba lub para, data, miejsce, wiek w chwili wydarzenia, chrzestni, świadkowie, celebrans, źródło; sortowanie według daty |
| **Wszystkie źródła** (domyślny dla źródeł) | źródła | tytuł, archiwum, księga i sygnatura, online, osób, faktów, przeczytane w badaniach, transkrypcja; sortowanie według tytułu |

- **Widok zapisuje:** typ wierszy, kolumny (kolejność, szerokości, przypięcie, zwinięte grupy), wiersz pokrycia, filtr,
  sortowanie i rozwinięcie związków. Nie zapisuje wyszukiwania, wyboru wiersza ani przewinięcia.
- Zmieniony widok ma etykietę **zmieniono** i opcje **Zapisz**, **Zapisz jako nowy**, **Odrzuć zmiany**. Widok
  wbudowany się nie zmienia ani nie można go przemianować czy usunąć; jego zmiany można tylko **Zapisz jako nowy**.
  Własny widok: **Zmień nazwę…**, **Usuń** (z potwierdzeniem). Własne widoki są uporządkowane według nazwy.
- Bieżący stan tabeli (także niezapisane zmiany) aplikacja pamięta dla każdego drzewa na tym urządzeniu; po
  odświeżeniu strony tabela jest taka, jaka została.
- **Zapisane widoki są częścią drzewa** (wersja danych 17): zapisanie, zmiana nazwy i usunięcie mają krok wstecz
  i wpis w historii zmian. Idą z drzewem do kopii zapasowej (JSON), a przy wydzieleniu części drzewa także do nowego
  drzewa. GEDCOM ich nie niesie; drzewo z badania zachowuje je przy wczytaniu nowej wersji. Uszkodzony widok przy
  wczytaniu się pomija.
- **Granice:** starsza aplikacja (od 3.19.0) otwiera drzewo zapisane aplikacją 3.27.0 tylko do odczytu i nigdy go nie
  zapisuje; po aktualizacji aplikacji drzewo można znowu zmieniać.
- **Obsługa:** menu **Widok** na pasku tabeli (**Wbudowane**, **Własne**, **Zapisz jako nowy…**, **Zmień nazwę…**,
  **Usuń**).

<!-- zdroj: app:src/ui/table-view/table-views.ts BUILTIN_VIEWS (9: overview, births, marriages, deaths, sources, gaps, checks, events, allSources), defaultViewId (události → Všechny události, prameny → Všechny prameny), defaultViewId, viewFromState, viewChanged, uniqueViewName, customViews (podle jména), workStorageKey strom.table.{treeId}, readTableWork, writeTableWork · table-columns.ts výchozí sloupce pohledů (:683 Sňatky, DEFAULT_VIEWS.events, .sources) · src/table-views-data.ts sanitizeTableView, keepTableViews (verze z výzkumu ponechá pohledy) · src/data.ts:298 sanitizeTableViews při načtení, :1720 saveTableView, deleteTableView (krok zpět, historie změn) · src/subtree.ts:148 · src/types.ts STROM_DATA_VERSION 17, StromData.tableViews · src/tree-manager.ts:630 isTreeNewer, src/data.ts:649 isNewerData (jen ke čtení, od aplikace 3.19.0) · src/ui/research-ui.ts, conflict-decide-ui.ts keepTableViews · strings.ts table.view, views.*, viewName.* (events, allSources), changed, save, saveAs, discard, builtinNote, saveAsMenu, renameMenu, deleteMenu, builtinLocked, viewWhat, deleteConfirm · commity d19a5942, c2d48747, 8ca649ff -->

<a id="A6.7.8"></a>
### A6.7.8 Akcje wiersza i edycja

Kliknięcie wybiera wiersz (także podwiersz związku); strzałki, Page Up/Down i Ctrl+Home/End przesuwają wybór, Esc go
anuluje.

| Akcja | Co zrobi |
|---|---|
| **Pokaż w drzewie** | przełącza na widok Rodzina z osobą jako osobą w centrum, wyśrodkowaną i wyróżnioną |
| **Otwórz osobę** (Enter) | otwiera stronę osoby |
| **Edytuj…** (dwuklik) | otwiera edycję osoby; przy podwierszu związku i w tabeli związków relacje osoby w tym związku |

- W tabeli związków akcje dotyczą osoby **Partner 1**.
- W tabeli wydarzeń dotyczą pierwszej osoby wiersza, a **Edytuj…** otwiera edycję tego wydarzenia ([A6.7.10](#A6.7.10));
  w tabeli źródeł jest **Otwórz źródło** ([A6.7.11](#A6.7.11)).
- Po edycji powiadomienie „Zapisano: …”, wiersz krótko mignie, a wiersze zostają w kolejności. Wiersz, który już nie
  spełnia filtru, zostaje z etykietą „nie pasuje do filtru” do następnej zmiany sortowania, filtru lub widoku. Zmianę
  z badania zgłasza „Badania zmieniły 3 dane: …”.
- **Granice:** w drzewie tylko do odczytu **Edytuj…** nie ma.
- **Obsługa:** przyciski przy wybranym wierszu, menu wiersza (prawy przycisk; także rozwinięcie związków). Na
  telefonie stuknięcie wiersza otwiera panel z akcjami i ze związkami („Związek 1: … · Edytuj ›”).

<!-- zdroj: app:src/ui/table-view/table-ui.ts tableMethods (tableRowAction: tree → Rodina, focus, highlight; open; edit → dialog osoby / panel vztahů na svazku), personOfRow (Partner 1), keepWork · table-refresh.ts keepOrder, watchEdit, changedKeys, bridgeChanges, namesList · table-grid.ts FLASH_MS · strings.ts table.act.*, dblClickHint, actionsOf, unionWith, editMore, staleRow, savedToast, bridgeToast · commity da6b9786, de46ae30, e4a35406 -->

<a id="A6.7.9"></a>
### A6.7.9 Eksport CSV i XLSX

Eksport zapisuje tabelę tak, jak jest widoczna, do pliku dla programów arkuszy kalkulacyjnych: **CSV** lub **XLSX**
(skoroszyt Excela).

- **Co trafia do pliku:** widoczne kolumny w kolejności tabeli (kolumny zwiniętej grupy w całości) i wiersze po
  filtrze, wyszukiwaniu i sortowaniu. Wartości są takie, jak pisze je tabela: daty w zapisie aplikacji, „ok. …”,
  „≈ 67”, „chrz. …”, „–”.
- **Wiersze:** bez filtru i wyszukiwania do pliku trafiają wszystkie wiersze („Wszystko widoczne · 120 osób”).
  Z filtrem lub wyszukiwaniem jest wybór:
  - **Widoczne** (domyślnie): tylko wiersze, które tabela pokazuje, z liczbą i przypomnieniem filtru („Widoczne · 28
    z 866 osób (obowiązuje filtr: …)”);
  - **Wszystkie … bez filtru** („Wszystkie osoby bez filtru · 866”): wszystkie wiersze tego typu w kolejności według
    sortowania, bez filtru i wyszukiwania.

  Wiersz z etykietą „nie pasuje do filtru” ([A6.7.8](#A6.7.8)) do widocznych nie należy.
- Osoba z dwoma i więcej związkami: pierwszy związek, który spełnia filtr, jest w jej wierszu, każdy kolejny
  w wierszu kontynuacji z pustymi danymi osoby. Za imieniem i nazwiskiem jest kolumna **Związek** („1 z 3”).
- **CSV:** tekst, UTF-8 ze znacznikiem BOM, separator średnik, końce wierszy CRLF; komórka, która w arkuszu
  kalkulacyjnym uruchomiłaby się jako formuła, jest unieszkodliwiana. Oznaczenia ustaleń i kolory się nie eksportują.
- **XLSX:** jeden arkusz nazwany według widoku.
  - Wiersz 1 to grupy kolumn (scalone komórki), wiersz 2 nagłówek, wiersz 3 wiersz pokrycia ([A6.7.4](#A6.7.4)).
    Przypięte kolumny tabeli i te trzy wiersze są w arkuszu zablokowane.
  - Każda grupa kolumn to konspekt: można ją zwinąć, jej pierwsza kolumna zostaje. Wiersze kontynuacji związków są
    o poziom niżej pod wierszem osoby (poziom 2 konspektu wierszy).
  - Komórka z ustaleniem **błąd** lub **do sprawdzenia** jest podbarwiona, a ustalenia ma w komentarzu. Trop
    i nietypowe nie mają ani koloru, ani komentarza.
  - Liczby, wiek w pełnych latach i kompletność są liczbami (kompletność i pokrycie jako procent); reszta to tekst,
    tak jak pisze go tabela (także „≈ 67”, „28–29”, daty). Tekst nigdy nie staje się formułą. Link źródła jest
    w komórce jako link.
- **Plik:** `{drzewo}_{widok}_{RRRR-MM-DD}.csv` lub `.xlsx`, bez znaków diakrytycznych.
- **Obsługa:** **Eksport ▾** na pasku tabeli (na telefonie w **⋯**): **Format** „CSV · dla Excela i Arkuszy Google”
  lub „XLSX · grupy, zablokowane kolumny, kolory kontroli”, **Wiersze**, **Pobierz CSV** / **Pobierz XLSX**;
  powiadomienie „Pobrano: …” z liczbą osób, wierszy i kolumn.
- **Granice:** eksport z menu drzewa (**Tabela osób (CSV)**, [A7](A7-book-pages-and-export.md)) to inny plik
  ze stałymi kolumnami.
- **Obowiązuje od:** aplikacja 3.27.0

<!-- zdroj: app:src/ui/table-view/table-export.ts tableCsvField (neutralizace vzorců), buildExportTable, buildTableCsv (BOM, ;, CRLF, pokračovací řádky, sloupec Svazek), fileNamePart, tableCsvFileName (csv | xlsx) · table-xlsx.ts buildTableXlsx (řádky 1–3, merges, outline sloupců za ukotvenou částí, pokračovací řádky outline 1, freeze, errorFill/warningFill + findingsComment jen chyba a k ověření, href), xlsxNumber (COUNT_COLUMNS, věk ^\d+$, procento) · src/xlsx.ts (ignoredErrors numberStoredAsText, styl @ pro text) · table-viewbar.ts exportForm (Formát, Řádky: Zobrazené / Všechny bez filtru jen s filtrem nebo hledáním) · table-ui.ts tableExportNow (unfiltered: všechny řádky typu v řazení, stale ven) · strings.ts table.export, exportFormat, exportRows, exportCsv, exportXlsx, exportAll, exportShown, exportFilterNote, exportUnfiltered.*, exportWhat.*, exportWhatAll.*, exportFile, exportDownload, exportDownloadXlsx, csvUnionCol, csvUnionOf, exportedToast · commity 2368683b, 5a67797b, 4308633b, e0ce4ec2, ebc1542f, e5b97725 · dirigent:prace/1110-app-tabulka-p2, 1110-app-tabulka-opravy -->

<a id="A6.7.10"></a>
### A6.7.10 Wydarzenia w wierszach

Tabela wydarzeń ma wiersz dla każdego wydarzenia drzewa: kto, kiedy, gdzie, w jakim wieku i kto przy tym był.

- **Co jest wierszem:**
  - każde wydarzenie osoby (chrzest, zawód, miejsce zamieszkania, służba wojskowa …) i każde wydarzenie pary;
  - urodzenie i zgon z danych osoby, gdy jest przy nich coś zapisane (data, miejsce, adres, źródło; przy zgonie także
    przyczyna lub wiek);
  - ślub związku: przy małżeństwie zawsze, przy innej relacji („Początek związku”) tylko z zapisaną daną; rozwód
    („Koniec związku”), gdy związek jest rozwiedziony albo zapisano jego koniec.
- **Wspólne wydarzenie** (miejsce zamieszkania, służba wojskowa, emigracja, imigracja, naturalizacja, własne
  wydarzenie) zapisane przy kilku osobach tak samo to jeden wiersz ze wszystkimi osobami. Tak samo znaczy: ten sam typ,
  data, miejsce, adres, notatka i źródła; data musi być zapisana, a do niej miejsce lub źródło. Chrzest, zawód lub
  tytuł należy zawsze tylko do jednej osoby.
- **Kolumny** w grupach **Wydarzenie** · **Uczestnicy** · **Źródło**:
  - **Typ**, **Osoba lub para** (przy parze najpierw krewny osoby głównej), **Data**, **Miejsce**;
  - **Wiek w chwili wydarzenia** jak gdzie indziej ([A6.7.3](#A6.7.3)); do jednego roku z dokładnych dat w dniach
    („12 dn.”); przy kilku osobach wiek każdej w kolejności imion („–” nieznany); przy urodzeniu **Nie dotyczy**;
  - **Wartość**: wartość wydarzenia (zawód, tytuł), w przeciwnym razie przyczyna; przy zgonie przyczyna zgonu;
  - **Chrzestni**, **Świadkowie**, **Celebrans**, **Inni obecni**: uczestnicy według roli; osoba drzewa jest linkiem;
  - **Źródło**: cytowane źródła „tytuł, sygnatura”, kilka oddzielonych średnikiem; **Wiarygodność** danej.
- **Chipy:** **Urodzenia i chrzty** (także urodzenie z danych osoby), **Śluby** (także zaręczyny, zapowiedzi,
  zezwolenie, umowa), **Zgony i pochówki** (także kremacja), **Inne wydarzenia**, **Bez źródła**.
- **Filtr według uczestnika:** kliknięcie imienia uczestnika proponuje „Filtr: chrzestny …” (przy osobie drzewa także
  **Otwórz osobę**). Filtr to chip „Chrzestny: … ×” (Świadek, Celebrans, Obecny) i zastępuje poprzedni filtr
  uczestnika. Osobę drzewa szuka według osoby, zapisane imię według liter bez względu na wielkość, znaki diakrytyczne
  i spacje.
- **Chrzestny, który się powtarza** ([A5.5](A5-tree-check.md#A5.5)), jest w komórce uczestnika jako **trop**.
- **Obsługa:** wbudowany widok **Wszystkie wydarzenia**; akcje wiersza ([A6.7.8](#A6.7.8)) dotyczą pierwszej osoby
  wiersza. **Edytuj…** otwiera przy wydarzeniu osoby edycję osoby na tym wydarzeniu (przy wspólnym na pierwszej
  kopii), przy urodzeniu i zgonie edycję osoby, przy wydarzeniu pary jego okno, przy ślubie i rozwodzie relacje osoby
  w tym związku.
- **Granice:** osoby zastępcze nie mają wierszy; urodzenie i zgon bez zapisanej danej nie mają wiersza.
- **Obowiązuje od:** aplikacja 3.27.0

<!-- zdroj: app:src/ui/table-view/table-events.ts buildEventRows (narození/úmrtí jen se zapsaným údajem, weddingRow: manželství vždy kromě marriageUnrecorded, partnersStart jen se zápisem; divorceRow), SHARED_TYPES, shareKey (typ, vlastní název, datum, místo, adresa, poznámka, prameny; datum a místo nebo pramen), mergeParticipants, eventEditTarget, MARRIAGE_COUPLE_TYPES · table-columns.ts EVENT_COLUMNS, eventPersons (pokrevní první), eventAgeCell, eventAge (dny < 366), eventValueCell, eventSourceCell, eventPill, DEFAULT_VIEWS.events · table-filter.ts EVENT_CHIP_ORDER, EVENT_KIND_CHIPS, lifeCategory, participantChip, eventHasParticipant (foldName), setParticipantFilter · table-ui.ts tableNameAction, tableRowAction (event → editTableEvent) · table-checks.ts PARTICIPANT_ROLE, recurring (recurringGodparent v buňkách účastníků) · strings.ts table.rows.events, group.event, participants, source, col.ev*, godparents, witnesses, officiants, others, chip.ev*, chipParticipant.*, filterParticipant.*, evKind.*, ageDays, viewName.events · commity 8de751c2, 63ed9def · spec 073 §14.1 · dirigent:prace/1110-app-tabulka-p2 -->

<a id="A6.7.11"></a>
### A6.7.11 Źródła w wierszach

Tabela źródeł ma wiersz dla każdego źródła drzewa (**Akcje → Źródła**, [A3.1](A3-evidence-in-the-app.md#A3.1))
i mówi, ile źródło w drzewie dokumentuje.

- **Kolumny** w grupach **Źródło** · **Użycie**:
  - **Tytuł**, **Archiwum**, **Księga, sygnatura, folio**, **Online** (adres bez `https://`; adres internetowy jest
    linkiem ↗ do nowego okna);
  - **Osób**: ile osób ma daną, która cytuje to źródło; dana związku dokumentuje obu partnerów;
  - **Faktów**: ile faktów cytuje źródło. Fakt to jedna lista cytowań: cytowania osoby, urodzenia, zgonu, każdego
    wydarzenia osoby, ślubu, rozwodu i każdego wydarzenia pary;
  - **Przeczytane w badaniach**: ilu czytelników przeczytało transkrypcję („1 czytelnik”, „2 czytelników”: człowiek
    w aplikacji i badanie), w przeciwnym razie „nie”;
  - **Transkrypcja**: tak / nie; w katalogu kolumn jest też **Data wpisu**.
- Cytowania osób zastępczych i źródeł opowieści się nie liczą.
- **Chipy:** **Bez osoby** (żadna osoba go nie cytuje), **Nieprzeczytane**, **Z transkrypcją**, **Online**.
- **Obsługa:** wbudowany widok **Wszystkie źródła**. Przy wierszu **Otwórz źródło** i **Edytuj…**: oba otwierają
  menedżera źródeł na tym źródle; **Pokaż w drzewie** tu nie ma.
- **Granice:** w zablokowanym drzewie źródło tylko się pokazuje, bez edycji.
- **Obowiązuje od:** aplikacja 3.27.0

<!-- zdroj: app:src/ui/table-view/table-sources.ts sourceUsage (PERSON_CITATION_FIELDS, události, PARTNERSHIP_CITATION_FIELDS pro oba partnery, bez zástupných, ne příběh), buildSourceRows (katalog data.sources), sourceReaders (readBy user/research/both) · table-columns.ts SOURCE_COLUMNS, urlCell, shortUrl, readersCell, DEFAULT_VIEWS.sources · table-filter.ts SOURCE_CHIP_ORDER (srcNoPerson persons 0, srcUnread, srcTranscript, srcOnline safeHttpUrl) · table-grid.ts rowTail (source: open + edit) · table-ui.ts tableRowAction (source → openTableSource), openTableSourceId (zamčený strom → showSourceViewer readOnly) · strings.ts table.rows.sources, group.source, group.use, col.src*, chip.src*, readers, act.openSource, viewName.allSources, sources.readBy.* · commity 1a3a49f1, 3cf69ffa · spec 073 §14.2 · dirigent:prace/1110-app-tabulka-p2 -->

<a id="A6.7.12"></a>
### A6.7.12 Cytowania i chrzestni w tabeli osób

Tabela osób ma kolumny, które pokazują, z jakiego źródła jest urodzenie, ślub i zgon, i kto był chrzestnym.

- **Cytowania** (grupa **Źródła**): **Urodzenie: archiwum**, **Urodzenie: sygnatura**, **Urodzenie: link** i to samo
  dla **Ślub** i **Zgon**. Komórka pokazuje archiwum, sygnaturę lub adres internetowy pierwszego cytowanego źródła;
  kolejne źródła są w przycisku „+N”.
  - Urodzenie bierze cytowania urodzenia, potem wydarzeń urodzenia i chrztu; zgon cytowania zgonu, potem wydarzeń
    zgonu, pochówku i kremacji; ślub cytowania związku (przy podwierszu związku tego związku). Każde źródło raz.
  - Źródła z pochodzenia danej w badaniu się nie liczą, tylko cytowania w danych.
  - Przy osobie żyjącej kolumny zgonu mają **Nie dotyczy**.
  - Sortuje się i filtruje według pierwszego źródła.
- **Chrzestni** (grupa **Urodzenie i chrzest**): chrzestni wydarzeń urodzenia i chrztu, każdy raz; osoba drzewa jest
  linkiem. Chrzestny, który się powtarza ([A5.5](A5-tree-check.md#A5.5)), ma w komórce oznaczenie **trop**.
- **Obsługa:** kolumny włącza się pojedynczo w panelu **Kolumny** ([A6.7.2](#A6.7.2)). Kliknięcie „+N” otwiera dymek
  **Pozostałe cytowania** (na telefonie panel od dołu); kliknięcie źródła otwiera je w menedżerze źródeł.
- **Obowiązuje od:** aplikacja 3.27.0

<!-- zdroj: app:src/ui/table-view/table-sources.ts factCitations (narození: birthSourceIds + birth/baptism; úmrtí: deathSourceIds + death/burial/cremation; sňatek: sourceIds svazku; neznámé id ven, každý jednou) · table-columns.ts citeCell (první pramen, moreSources), bArch…dUrl (group sources, unionScoped, deathOnly → naCell), godparentsCell (group birth), personGodparents · table-checks.ts personRecurring (sloupec godparents) · table-grid.ts moreCitesHtml · table-ui.ts showTableCites, openTableSourceId · strings.ts table.col.bArch…dUrl, godparents, moreCites, citesTitle · commity 208d8b92, 21a132c1 · spec 073 §14.3, §14.5 · dirigent:prace/1110-app-tabulka-p2 (citace: jen citace v datech, ne FactReliability.sourceIds) -->
