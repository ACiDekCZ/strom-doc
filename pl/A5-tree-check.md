<a id="A5"></a>
# A5 Kontrola drzewa

Co aplikacja sprawdza w drzewie, z jakimi progami i co można zrobić z wynikiem: naprawić, oznaczyć jako **To nie
błąd** albo zostawić do oceny badaniu. Opisuje aplikację Strom 3.21.2 (i badanie 1.25.2); co doszło później, ma przy
sobie numer wersji. **Kontrola drzewa** z raportem ([A5.1](#A5.1) do [A5.1.5](#A5.1.5)) i `strom health`
([A5.9](#A5.9)) opisują aplikację 3.33.0 i badanie 1.38.0.
Badanie ma własną kontrolę `strom check` ([R5](R5-conflicts.md)). Nie jest tu opisana, poza miejscami, w których
obie się zgadzają.

<a id="A5.1"></a>
## A5.1 Kontrola i jej wyniki

**Kontrola drzewa** przechodzi drzewo i składa raport: co hamuje drzewo, jakie kroki zaleca i jakie błędy w danych
znalazła. Samego drzewa nie zmienia. Raport zapisuje w danych drzewa ([A5.1.5](#A5.1.5)).

| Część raportu | Co pokazuje |
|---|---|
| **Podsumowanie** | jedno zdanie: „Kontrola nie znalazła niczego, co hamuje drzewo.”, „Kontrola zaleca 3 kroki.” albo „Nic nie hamuje drzewa; w błędach w danych są rzeczy do sprawdzenia.” |
| **Co hamuje rozwój drzewa** | niepołączone rodziny („2 rodziny nie są połączone z drzewem”, **Struktura ›**) i kroki, na których stoją badania ([A5.1.4](#A5.1.4)) |
| **Zalecane kroki** | co zrobić i w jakiej kolejności ([A5.1.3](#A5.1.3)) |
| **Błędy w danych** | wyniki kontroli danych ([A5.2](#A5.2) do [A5.6](#A5.6)) |
| **Wbudowane kontrole** | wiersz każdej kontroli z jej wynikiem ([A5.1.3](#A5.1.3), [A5.1.4](#A5.1.4)) |
| **Od ostatniej kontroli** | co się zmieniło od ostatniego raportu tego samego zakresu ([A5.1.5](#A5.1.5)) |

Każdy wynik w **Błędy w danych** ma wagę:

| Waga | Podsekcja | Znaczenie |
|---|---|---|
| błąd | **Błędy** | dane sobie przeczą albo są uszkodzone ([A5.2](#A5.2), [A5.3](#A5.3), [A5.4](#A5.4)) |
| do sprawdzenia | **Do sprawdzenia** | nietypowa wartość, mało prawdopodobna, ale możliwa; warto ją sprawdzić |
| info | **Wskazówki** | „To nie są błędy. Wskazówki, które mogą pomóc w poszukiwaniach.” ([A5.5](#A5.5), [A5.6](#A5.6)) |

- **Granice:**
  - Kontrola danych działa za każdym razem, gdy raport się otwiera. Wyniki w **Błędy w danych** są zawsze z tej
    chwili.
  - Nad wynikami jest podsumowanie („2 błędy, 1 do sprawdzenia, 3 wskazówki.”), **Napraw wszystko (n)**
    ([A5.1.1](#A5.1.1)) i wybór **Wszystkie** · **Błędy** · **Do sprawdzenia** · **Tropy** z liczbami. Wybór bez
    wyników pokazuje „Nic do sprawdzenia.”
  - Wyniki tego samego rodzaju tworzą grupę, uporządkowaną według wagi, wielkości i nazwy. Otwarta jest tylko grupa
    z błędem.
    Powyżej 50 wyników kolejne pokazują się po 20. Na telefonie (do 640 px) **Wskazówki** są zwinięte, jeśli są też
    błędy lub wyniki do sprawdzenia.
  - Osób zastępczych się nie zgłasza. Wynik oznaczony **To nie błąd** ([A5.7](#A5.7)) nie jest liczony ani
    pokazywany.
  - Drzewo tylko do odczytu wyniki tylko pokazuje („Drzewo jest tylko do odczytu. Wyniki można przeglądać, ale nie
    naprawiać ani oznaczać.”). Raport można przeczytać, kroków uruchomić nie. Przy innym niż otwarte drzewie naprawa
    lub oznaczenie najpierw drzewo otwiera.
  - **Od aplikacji 3.27.0:** waga, która wcześniej nazywała się „ostrzeżenie”, nazywa się **do sprawdzenia**, także
    w podsumowaniach i liczbach. Widok Tabela pokazuje wyniki bezpośrednio w komórkach, a wynik oznaczony **To nie
    błąd** jako **nietypowe** ([A6.7.5](A6-views.md#A6.7.5)).
  - **Od aplikacji 3.27.0:** sekcja błędów i wyników do sprawdzenia nazywa się **Do sprawdzenia** (wcześniej
    **Problemy**). Drzewo bez nich ma „Nic do sprawdzenia”, ze wskazówkami „Nic do sprawdzenia. 3 wskazówki.”
  - **Od aplikacji 3.28.0:** w **Do sprawdzenia** jest grupa **Wspólne wydarzenia**: kopie jednego wspólnego
    wydarzenia, których wspólne dane się różnią, z **Ujednolić…** i **Odłącz różniącą się kopię**
    ([A10.3](A10-shared-events.md#A10.3)).
  - **Od aplikacji 3.33.0:** błędy mają własną podsekcję **Błędy**. W **Do sprawdzenia** zostają wyniki do
    sprawdzenia.
- **Obsługa:** **Przegląd drzewa → Jakość danych → Kontrola drzewa** ([A5.8](#A5.8)): **Sprawdź drzewo…** (tylko
  w otwartym drzewie) i **Raport ›** (ostatni raport całego drzewa). Wprost do **Błędy w danych** prowadzą **Szybkie
  działania → Błędy w danych ›**, wiersz „n wskazówek ›” w **Spójność** (tylko **Wskazówki**) i karta z błędami
  w **Na czym się skupić**. Kontrolę osoby i linii opisuje [A5.1.2](#A5.1.2).
  Od aplikacji 3.27.0 także **Jakość danych ›** w dymku wyniku w widoku Tabela: otwiera **Błędy w danych** na grupie
  tego wyniku (przy wyniku oznaczonym **To nie błąd** na liście oznaczonych).
  Po imporcie i po scaleniu: [A5.4](#A5.4).
- **Obowiązuje od:** aplikacja 1.0.0; sekcje **Problemy** i **Wskazówki** aplikacja 3.17.0; nazwa **do sprawdzenia**
  i odnośnik z widoku Tabela aplikacja 3.27.0; sekcja **Do sprawdzenia** i „Nic do sprawdzenia” aplikacja 3.27.0;
  **Kontrola drzewa** z raportem i podsekcja **Błędy** aplikacja 3.33.0 (wcześniej okno **Walidacja drzewa**)

<!-- zdroj: app:src/validation.ts:83 validateTreeData, :1370 groupValidationIssues · strings.ts treeManager.valProblems, valLeads, leadsIntro, valReadOnly, valShowMore · 3.27.0: app:59a8eed0 strings.ts treeManager.validationWarnings „k ověření“, summaryErrors, summaryNoErrors, treeOverview.countWarnings · src/ui/table-view/table-bubble.ts (Kvalita dat ›) · table.sev.* · commit e530019b · „K ověření“: strings.ts treeManager.valProblems, commit 79764eba; „Nic k ověření“: validationPassed, summaryLeadsOnly, commit b1cbe546 (T54 G15) · 3.33.0: app:988b0f86 src/tree-health.ts buildBuiltinReport, healthSummary · src/ui/tree-health-ui.ts openTreeHealthReport (validateTreeData při každém otevření, storeHealthReport), oddíly secSummary…secCompare, holdsParts · src/ui/tree-health-errors-ui.ts (LONG_GROUP 50, GROUP_STEP, isPhone 640 px, chipy filterAll/filterErrors/filterWarnings/filterLeads, pododdíly error/warning/trace, nothingToCheck) · src/ui/tree-overview.ts health, health-report, validation, validation-leads · strings.ts health.* · CHANGELOG.cs.md 3.33.0 „Kontrola stromu“ · commity 2ecf9e43, 1b446bf4 -->

<a id="A5.1.1"></a>
### A5.1.1 Naprawa jednym kliknięciem

Niektóre wyniki mają przycisk **Napraw**; podsumowanie nad wynikami ma **Napraw wszystko (n)** dla wszystkich wyników,
które da się naprawić. Naprawa to jeden krok wstecz („naprawa z kontroli drzewa”) i zapisuje się w historii zmian.

- Pod **Napraw wszystko (n)** jest, co zostanie naprawione, z liczbami, tylko dla rodzajów, które drzewo ma: „Do
  naprawy: uszkodzone powiązania między osobami a związkami (2); związek osoby z samą sobą – zostanie usunięty (1);
  zduplikowany związek – zostanie połączony z pierwszym, dzieci zostają (1); miejsce zapisane na kilka sposobów –
  zostanie ujednolicone do najczęstszego zapisu (3). Pozostałe wyniki pozostaną bez zmian.” W drzewie tylko do
  odczytu nie ma ani przycisku, ani tego wiersza.
- **Od aplikacji 3.33.0:** **Napraw** i **Napraw wszystko (n)** są w części **Błędy w danych** raportu; krok wstecz
  nazywa się „naprawa z kontroli drzewa” (wcześniej „naprawa z walidacji”).

| Wynik | Co zrobi naprawa |
|---|---|
| Odwołanie do nieistniejącego rekordu, uczestnik bez osoby | usunie odwołanie |
| Rodzic nie ma odwołania do dziecka, dziecko do rodzica, osoba do związku | uzupełni brakujące odwołanie (rodziców tylko dziecku z mniej niż 2 rodzicami) |
| Związek osoby z samą sobą | usunie go |
| Zduplikowany związek | zostawi pierwszy, dzieci przeniesie do niego |
| Jedno miejsce zapisane na kilka sposobów | przepisze wszystkie zapisy na najczęstszy |

- **Obowiązuje od:** aplikacja 1.1.0; naprawa miejsc 1.10.0; wiersz pod **Napraw wszystko (n)** aplikacja 3.27.0

<!-- zdroj: app:src/data.ts:4071 FIXABLE_TYPES, :4097 repairValidationIssue · strings.ts treeManager.valFix, valFixAll · řádek: src/ui/tree-stats.ts fixAllNoteText (orphaned*/missing* → links, selfPartnership, duplicatePartnership, placeSpelling), strings.ts treeManager.valFixAllNote, jen bez ro, commit 79764eba (T54 G15) · 3.33.0: app:988b0f86 src/ui/tree-health-errors-ui.ts validation-fix-all-btn, fixAllNoteText · strings.ts undo.repairedIssue „oprava z Kontroly stromu“ -->

<a id="A5.1.2"></a>
### A5.1.2 Zakres i gdzie uruchamia się kontrolę

**Sprawdź drzewo…** otwiera wybór **Kontrola drzewa**: nazwę drzewa, liczbę osób (przy drzewie z badania „· badania
połączone”), **Zakres** i listę **Wbudowane kontrole** („Zawsze włączone, bez AI, bezpłatne, od razu.”). **Utwórz
raport** uruchamia kontrolę i otwiera raport.

| Zakres | Co kontrola przechodzi |
|---|---|
| **Całe drzewo** | całe drzewo (domyślnie) |
| **Linia ▾** („Wybierz linię”) | osobę linii badania i jej przodków albo jej potomków; przy linii jednej osoby tę osobę, jej rodziców, dzieci i partnerów |
| **Osoba ▾** („Wybierz osobę do kontroli”) | jedną osobę |

- **Granice:**
  - **Linia ▾** jest tylko przy drzewie z badania, które ma linie i właśnie działa. **Osoba ▾** działa tylko
    w otwartym drzewie, nie w trybie przeglądania.
  - Węższy zakres zawęża **Błędy w danych**, **Kompletność i dowody** i liczbę osób. **Struktura**,
    **Bezpieczeństwo danych** i **Miejsca do określenia** zostają dla całego drzewa. Wiersze badań dla całego drzewa
    mają „całe drzewo” ([A5.1.4](#A5.1.4)).
  - Linię, której osoby drzewo nie zna, sprawdza się jako całe drzewo.
  - Osoba bez numeru badania (P…) nie ma wierszy badań.
- **Obsługa:**
  - **Przegląd drzewa → Jakość danych → Kontrola drzewa → Sprawdź drzewo…**;
  - w menu osoby **Sprawdź osobę…** (zakres **Osoba**);
  - na stronie osoby w części badania **Kontrola osoby ›** z „ostatnio 12.3.2025”, gdy osoba ma już raport
    (zakres **Osoba**);
  - w menu **⋯** linii **Sprawdź linię…** (zakres **Linia**).
  - **Sprawdź osobę…** i **Kontrola osoby ›** są tylko przy drzewie z badania i nie w trybie przeglądania.
    **Sprawdź osobę…** nie ma przy osobie zastępczej. Zapisana strona osoby wiersza nie ma.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:988b0f86 src/ui/tree-health-dialog-ui.ts openTreeHealthDialog, healthDialogHtml (seg tree/line/person, line jen meta.research && treeLines, person disabled !active, builtinsTitle, builtinsNote, dlgSub), healthCheckAgain · src/ui/tree-health-ui.ts scopePeople, healthFacts (people → errors, noSource, persons) · src/tree-health.ts healthSourcesFor (narrowing errors, evidence, ancestors) · src/research-health.ts healthBuiltinScopeParam (person:P…, line:G…) · src/ui/research-directions-ui.ts directionPersonIds, directionHealthItem · src/ui/context-menu.ts menuPerson · src/ui/card-signals-ui.ts · src/ui/person-page-ui.ts health:person, pageRow, pageLast · strings.ts health.scopeLabel, segTree, segLine, segPerson, pickLine, pickPerson, menuPerson, menuLine, pageRow, createReport · commit 1b446bf4 -->

<a id="A5.1.3"></a>
### A5.1.3 Wbudowane kontrole i zalecane kroki

Wbudowane kontrole aplikacji działają zawsze. Każda ma w raporcie wiersz; gdzie coś znalazła, daje zalecany krok.

| Kontrola | Wiersz w raporcie | Zalecany krok · przycisk |
|---|---|---|
| **Błędy w danych** | liczby („… (bez „to nie błąd”)”), **Błędy w danych ›** | „3 błędy w danych” · **Pokaż błędy**; tylko błędy, nie wyniki do sprawdzenia i wskazówki |
| **Kompletność i dowody** | „bez źródła 12 z 80 osób”, **Jakość danych ›** | „12 osób bez źródła” · **Pokaż w drzewie** |
| **Struktura** | liczba niepołączonych części, **Struktura ›** | „Niepołączone części: 2” · **Podziel na rodziny** |
| **Bezpieczeństwo danych** | „kopia w pliku 4.2.2025”, „jeszcze nie zapisane do pliku” albo „nieznane na tym urządzeniu” | „Drzewo nie jest zapisane do pliku od 40 dni” · **Zapisz kopię** |
| **Pokrycie przodków** | „od Jan Horák: pradziadkowie znanych 5 z 8”, „od Jan Horák: żadne znane pokolenie nie ma luki” albo „nie wybrano osoby”, **Przodkowie ›** | „Dziadkowie (Jan Horák): znanych 3 z 4” · **Pokaż przodków** |
| **Miejsca do określenia** | liczba miejsc bez położenia albo „każde miejsce ma położenie”, **Miejsca ›** | „4 miejsca bez położenia” · **Określ miejsca** |

- **Granice:**
  - **Bezpieczeństwo danych** daje krok od 30 dni bez zapisu do pliku i tylko wtedy, gdy drzewo ma niezapisane
    zmiany. Dni liczą się od ostatniego zapisu do pliku, inaczej od założenia drzewa. W trybie przeglądania stan jest
    nieznany.
  - **Pokrycie przodków** szuka pierwszego pokolenia, w którym brakuje przodków, od osoby na pierwszym planie
    otwartego drzewa, inaczej od osoby domyślnej. Krok jest tylko do pradziadków (3. pokolenie).
  - Kolejność kroków: najpierw bezpieczeństwo danych, potem to, co hamuje badania, potem wiarygodność, na końcu
    rozwój drzewa: kopia · linia stoi · stare prośby · decyzje · pusta kolejka · błędy w danych · poprawki Stromu ·
    weryfikacja linii · spójność badań · osoby bez źródła · końce gałęzi · materiały · przodkowie · miejsca ·
    niepołączone części. Kroki badań opisuje [A5.1.4](#A5.1.4).
  - Pokazuje się pierwszych 10 kroków, kolejne za „i 4 kolejne kroki ›”.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:988b0f86 src/tree-health.ts HEALTH_BACKUP_DAYS 30, HEALTH_STEPS_SHOWN 10, ANCESTOR_STEP_MAX_GEN 3, STEP_ORDER, buildBuiltinReport, healthSteps (errors jen report.errors.errors) · src/ui/tree-health-ui.ts healthFacts (fileCopyAt ?? createdAt, hasUnsavedChanges, isViewMode → null, ancestorGenerations, collectPlaces), rootOf (focus, defaultPersonId) · strings.ts health.src*, step*, link*, moreSteps · commit 2ecf9e43 -->

<a id="A5.1.4"></a>
### A5.1.4 Wiersze i kroki badania

Przy drzewie z badania, które działa i to potrafi, badanie dodaje do raportu własne wiersze i kroki. Aplikacja pyta
je o nie przy każdej kontroli i czeka najwyżej 4 s.

| Wiersz | Co pokazuje |
|---|---|
| **Pewność danych z badań** | „8 danych do potwierdzenia” / „wszystko potwierdzone” |
| **Oczekujące i audyt zadań** | prośby wysłane ponad 30 dni temu i zadania z ustaleniem audytu / „nic starego” |
| **Linie i kolejka** | linie, ile z nich stoi, otwarte i odłożone zadania kolejki |
| **Poprawki Stromu** | „czeka 2” / „żadna nie czeka” |
| **Weryfikacja z oryginałami** | cytaty bez strony i bez skanu / „każdy cytat ma stronę i skan” |
| **Decyzje** | „czeka 3” / „nic nie czeka” |
| **Końce gałęzi** | „nieprzeszukane: 6” / „wszystkie przeszukane” |
| **Materiały i partie** | nieposortowane w partiach i bez osoby / „wszystko posortowane” |
| **Spójność badań** | błędy i ostrzeżenia `strom check` / „bez problemów” |
| **Wzrost drzewa** | „w 30 dni +12 osób, +40 danych, +9 źródeł” |

| Krok badania | Dlaczego | Przycisk |
|---|---|---|
| „Linia Horákovi stoi” | „Żadne zadanie linii nie posuwa się.” | **Puść agenta na linię**; gdy linia ma czekające zadania, **Otwórz** |
| „2 prośby wysłane ponad 30 dni temu bez odpowiedzi” | „Odpowiedź mogła przyjść pocztą lub e-mailem.” | **Zapisz odpowiedź** |
| „Na decyzję czeka: 3” | „Hipotezy, sprzeczności i importy, o których badania nie rozstrzygają same.” | **Otwórz** |
| „Kolejka badań jest pusta” | „Agent nie ma nad czym pracować.” | **Otwórz badania** |
| „Czekające poprawki Stromu: 2” | „Poprawki danych drzewa, które proponują badania.” | **Uruchom poprawkę** |
| „5 danych do weryfikacji z oryginałem · linia” | „Dane z indeksów, nie z oryginału zapisu.” | **Zweryfikuj linię** |
| „Spójność badań: 2 problemy” | „Własna kontrola badań znalazła zapisy, które do siebie nie pasują.” | **Otwórz badania** |
| „6 końców gałęzi bez wyszukiwania” | „Osoby na końcu gałęzi, których zapisów jeszcze nie szukano.” | **Nowa linia** |
| „Nieposortowane materiały: 4” | „Pliki i partie bez osoby.” | **Otwórz Materiały** |

- **Granice:**
  - Linia stoi, gdy jest aktywna i nie ma w kolejce żadnego zadania. Pusta kolejka jest krokiem tylko przy aktywnej
    linii.
  - Badanie wysyła najwyżej 10 kroków. Linia, która stoi, stare prośby, decyzje i pusta kolejka trafiają też do
    **Co hamuje rozwój drzewa** (**Zalecane kroki ›**).
  - W węższym zakresie **Poprawki Stromu**, **Materiały i partie**, **Spójność badań** i **Wzrost drzewa** są dla
    całego drzewa (wiersz ma „całe drzewo”).
  - Archiwum i badanie przykładowe nie mają linii, kolejki, próśb, weryfikacji linii, końców gałęzi ani czekania
    zadań.
  - Bez wierszy badań wybór mówi dlaczego: „Własne kontrole badań przyjdą z nowszym Strom Research.” (badanie tego
    nie potrafi), „Brak własnych kontroli badań: badania teraz nie działają.”, przy drzewie bez badania „Kolejne
    wbudowane kontrole doda połączone Strom Research.”
  - Gdy badanie nie działa, krok badania ma wyłączony przycisk („Badania teraz nie działają.”). Po imporcie kontroli
    nie wysyła się do badania.
- **Obsługa:** terminal `strom health` ([A5.9](#A5.9)); połączenie z badaniem
  [S1](S1-connecting-app-and-research.md).
- **Obowiązuje od:** aplikacja 3.33.0 (badanie 1.38.0)

<!-- zdroj: app:988b0f86 src/research-health.ts HEALTH_FEATURE 'health', researchHealthRows (wholeTree fixes, material, consistency, growth), healthBuiltinScopeParam (import → null), HEALTH_BUILTIN_TIMEOUT_MS 4000, fetchResearchHealthBuiltin GET /health/builtin, parseResearchHealthBuiltin steps.slice(0, 10) · src/ui/tree-health-ui.ts healthResearchPart (none/off/old/ok), researchStepRow (actWork/actOpen…), researchOff · src/ui/tree-health-dialog-ui.ts builtinsMore, builtinsWhyOld, builtinsWhyOff · strings.ts health.srcConfirm…srcGrowth, stepLineStuck…stepMaterial, act* · research:d8742230, 3f541f54, 818a015b src/core/health.ts builtin, stepsOf (stuck = active && queued 0, queue-empty jen s aktivní linií, archive), SENT_OLD_DAYS 30, STEPS_MAX 10 · src/core/live.ts GET /health/builtin, BRIDGE_FEATURES health · CHANGELOG.cs.md 1.38.0 „Kontrola stromu“ -->

<a id="A5.1.5"></a>
### A5.1.5 Starsze raporty, druk i Zapisz HTML

Raport zapisuje się w danych drzewa, więc trafia też do kopii zapasowej i JSON. Drzewo trzyma nowy raport i jeden
przed nim.

- **Granice:**
  - Zapisuje się tylko przy otwartym drzewie, które nie jest tylko do odczytu. Inaczej stopka raportu mówi „Raport
    nie jest zapisywany: drzewo jest tylko do odczytu albo nie jest otwarte.” Zapis nie ma kroku wstecz.
  - **Od ostatniej kontroli** porównuje raport z ostatnim raportem tego samego zakresu: „Ostatnia kontrola 4.2.2025:
    błędy 3 → 1, do sprawdzenia 5 → 5, tropy 2 → 4, 1 nowy krok, 2 kroki zniknęły.”, „… bez zmian.” albo „To
    pierwsza kontrola.”
  - **Starsze raporty ▾** pokazuje zapisane raporty („4.2.2025 · całe drzewo · wbudowane · 3 zalecane kroki”),
    inaczej „Brak starszego raportu.” Starszy raport ma kroki tylko do odczytu („Starszy raport z 4.2.2025; obecny
    stan może być inny.”) i nie pokazuje błędów w danych („Błędy w danych starszego raportu nie są przechowywane; nowa
    kontrola pokaże bieżące.”).
  - Daty w raporcie są bez roku, gdy są z bieżącego roku („12.3.”).
  - **Zapisz HTML** zapisuje plik „Kontrola drzewa – Horákovi – 2026-03-12.html” bez przycisków i ze wszystkimi
    częściami rozwiniętymi. Imiona żyjących osób zastępuje „…” i dopisuje „Żyjące osoby są ukryte zgodnie
    z ustawieniami wyników.” Kto jest żyjącą osobą: [S11.1](S11-protecting-living-people.md#S11.1).
- **Obsługa:** w nagłówku raportu **Starsze raporty ▾**, **Drukuj**, **Zapisz HTML**, **Sprawdź ponownie…** (raport
  po imporcie sprawdza się ponownie jako całe drzewo); na telefonie w menu **…**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:988b0f86 src/tree-health.ts keepHealthReports (nová + jedna před ní), sameScope, compareReports, sanitizeHealthReports · src/data.ts storeHealthReport (bez undo) · src/ui/tree-health-ui.ts healthDay (letos bez roku), stored, older (at > 0), olderNote, olderErrors, footStored, footNotStored · src/ui/tree-health-dialog-ui.ts openOlderHealthReports, saveHealthReportHtml (fileName, PERSON_PAGE_DEFAULT_PRIVACY, isLivingPerson, livingHidden, saved), healthCheckAgain (import → tree), moreActs · strings.ts health.olderReports, olderRow, olderNone, print, saveHtml, checkAgain, compareLine, compareSame, firstCheck · commit 1b446bf4 -->

<a id="A5.2"></a>
## A5.2 Relacje w rodzinie

Kontrola szuka relacji, które nie mogą być prawdziwe. Wszystkie są błędami, poza zduplikowanym związkiem
(do sprawdzenia).

| Wynik w aplikacji | Kiedy |
|---|---|
| **Wykryto cykl przodków** | osoba jest swoim własnym przodkiem; zgłasza się tylko pierwszy cykl |
| **Związek osoby z samą sobą** / **Zduplikowany związek** | partner to ta sama osoba / dwa związki tej samej pary |
| **Rodzic nie ma odwołania do dziecka**, **Dziecko nie ma odwołania do rodzica**, **Niezgodność dziecka w związku** | relacja jest zapisana tylko z jednej strony |
| **Odwołanie do nieistniejącego rekordu** | brakuje rodzica, dziecka, partnera lub związku |
| **Uczestnik zdarzenia odwołuje się do osoby, która już nie istnieje** | chrzestny lub świadek (także świadek ślubu) to usunięta osoba |
| **Więcej niż 2 rodziców** | |
| **Osoba w kilku pokoleniach** | liczenie pokoleń trafia na sprzeczność; partner jest w tym samym pokoleniu |
| **Partner jest też rodzicem / dzieckiem**, **Brat lub siostra jest też rodzicem / dzieckiem** | |

- **Obowiązuje od:** aplikacja 1.0.0; uczestnik zdarzenia 1.16.0

<!-- zdroj: app:src/validation.ts:142 checkCycles, :200, :223, :255, :293, :346-464 orphaned*, :471 tooManyParents, :554 generationConflict, :621 · strings.ts treeManager.val* -->

<a id="A5.3"></a>
## A5.3 Daty i wiek

Kontrola zgłasza tylko to, co na pewno nie jest prawdziwe. Niepełną lub przybliżoną datę liczy w całym możliwym
zakresie: bez miesiąca od stycznia do grudnia, „około” ± 2 lata, „przed” do 20 lat wcześniej, „po” do 20 lat później,
zakres do swojego końca. Dopiero gdy naruszenie obowiązuje w całym zakresie, jest wynikiem. Wyjątkiem są łagodniejsze
granice do sprawdzenia z aplikacji 3.27.0 (niżej): tam wystarczy, że granicę przekroczy jeden koniec możliwego wieku.

| Wynik w aplikacji | Waga | Kiedy |
|---|---|---|
| **Data zgonu jest przed urodzeniem** | błąd | |
| **Nieprawdopodobnie długie życie** | do sprawdzenia | ponad 115 lat |
| **Rodzic młodszy niż dziecko** | błąd | według daty urodzenia |
| **Rodzic bardzo młody / bardzo stary w chwili urodzenia dziecka** | do sprawdzenia | mniej niż 12 / ponad 80 lat; tylko daty urodzenia |
| **Matka przy urodzeniu poniżej 16 lat** / **… powyżej 45 lat** | do sprawdzenia | od aplikacji 3.27.0, zob. niżej |
| **Ojciec przy urodzeniu poniżej 18 lat** / **… powyżej 60 lat** | do sprawdzenia | od aplikacji 3.27.0, zob. niżej |
| **Zdarzenie datowane przed urodzeniem** | do sprawdzenia | |
| **Zdarzenie datowane po zgonie** | do sprawdzenia | poza: Pochówek, Kremacja, Testament, Postępowanie spadkowe |
| **Dziecko urodzone po śmierci matki** | błąd | ponad 1 miesiąc po śmierci; tylko biologiczni rodzice |
| **Dziecko urodzone długo po śmierci ojca** (… **rodzica**, płeć nieznana) | do sprawdzenia | ponad 10 miesięcy |
| **Ślub datowany przed urodzeniem partnera** | błąd | |
| **Ślub datowany po zgonie partnera** | do sprawdzenia | |
| **Ślub w wieku dziecięcym** | do sprawdzenia | mniej niż 14 lat |
| **Ślub w wieku poniżej 16 lat** | do sprawdzenia | od aplikacji 3.27.0, zob. niżej |
| **Zapisany wiek różni się o więcej niż 2 lata** | do sprawdzenia | od aplikacji 3.27.0, zob. niżej |
| **Skrajna różnica wieku partnerów** | info (**Wskazówki**) | 40 lat i więcej |
| **Urodzenie/zgon wpisane jako zdarzenie życiowe** | błąd | urodzenie lub zgon na liście zdarzeń |
| **Własne zdarzenie nie ma nazwy** / **Zdarzenie ma nieprawidłową datę** | do sprawdzenia | |

- **Granice:** te same wyjątki po zgonie ma `strom check` badania. Rodzic bez rodzaju relacji liczy się jako
  biologiczny.
- **Od aplikacji 3.27.0:** łagodniejsze granice do sprawdzenia:
  - **matka** młodsza niż 16 lub starsza niż 45 lat i **ojciec** młodszy niż 18 lub starszy niż 60 lat w chwili
    urodzenia dziecka. Tylko biologiczny rodzic o znanej płci, wiek z obu dat urodzenia;
  - **ślub** w wieku poniżej 16 lat;
  - wystarczy, że granicę przekroczy jeden koniec możliwego wieku (wiek „15–16” jest poniżej 16). Data z **ok.**
    liczy się jako szacunek wieku; daty z **przed** lub **po** się nie porównuje;
  - zgłasza się tylko surowszy wynik: gdzie już obowiązuje **Rodzic młodszy niż dziecko**, **Rodzic bardzo młody /
    bardzo stary** lub **Ślub w wieku dziecięcym**, łagodniejszego wyniku nie ma;
  - **zapisany wiek** (przy ślubie wiek każdego z pary, przy zgonie, przy urodzeniu) porównuje się z wiekiem z daty
    urodzenia i daty zdarzenia. Wynik jest, gdy odbiega od możliwego zakresu o więcej niż 2 lata. Wieku zapisanego
    słowem albo z ok., przed, po się nie porównuje, ani gdy któraś z dat jest tylko szacunkiem;
  - wiersz wyniku pokazuje daty i wiek („* 1850 → * 1866: 15–16”, „⚭ 1872: 30 ≠ 26–27”).
- **Obowiązuje od:** aplikacja 1.0.0 (wiek rodziców); 1.4.0 (zdarzenia); 1.7.0 (daty i zgon); dziecko po śmierci
  rodzica o nieznanej płci 3.10.0; cztery wyjątki po zgonie 3.17.0 (wcześniej tylko pochówek); łagodniejsze granice
  wieku rodziców i ślubu oraz zapisany wiek 3.27.0

<!-- zdroj: app:src/validation.ts:493 checkAgePlausibility MIN_PARENT_AGE MAX_PARENT_AGE, :863 checkDateConsistency MAX_LIFESPAN_YEARS CHILD_MARRIAGE_YEARS PARTNER_AGE_GAP_YEARS POSTHUMOUS_FATHER_MONTHS AFTER_DEATH_EVENT_TYPES, :120 checkLifeEvents · monthRange, certainlyBefore · research:src/core/afterdeath.ts AFTER_BY_NATURE · strings.ts treeManager.val* · 3.27.0: app:59a8eed0 src/validation.ts MOTHER_MIN_AGE 16, MOTHER_MAX_AGE 45, FATHER_MIN_AGE 18, FATHER_MAX_AGE 60, checkParentAgeLimits (gender female/male, parentRelTypes biological, jen když není parentYoungerThanChild/parentTooYoung/parentTooOld), ageSpan (< > → null; ~ approxAgeBetween), spanText, MARRIAGE_MIN_YEARS 16 (else za childMarriage), checkRecordedAges SLACK_YEARS 2 (Partnership.ages, deathAge, birthAge), src/dates.ts recordedAgeGap, ageRangeBetween · strings.ts treeManager.valMotherTooYoung16, valMotherTooOld45, valFatherTooYoung18, valFatherTooOld60, valMarriageUnder16, valRecordedAgeMismatch, validationWarnings, countWarnings, summaryErrors · spec 073 §7.6 · CHANGELOG.cs.md 3.27.0 -->

<a id="A5.4"></a>
## A5.4 Źródła, załączniki i scalenie przy imporcie

| Wynik w aplikacji | Waga | Kiedy |
|---|---|---|
| **Cytat odwołuje się do nieistniejącego źródła** | do sprawdzenia | cytat przy osobie, zdarzeniu, związku lub załączniku |
| **Załącznik nie ma użytecznych danych** | do sprawdzenia | dane nie są obrazem ani PDF (załącznika tylko z oryginałem się nie zgłasza) |
| **Zdjęcie nie jest obsługiwanym obrazem** | do sprawdzenia | inny format niż JPEG, PNG, WebP, GIF |
| Prawdopodobnie dwie osoby scalone w jedną podczas importu pliku GEDCOM (Strom 3.8.1 i starsze)… | błąd | zob. niżej |

Starsze wersje mogły przy imporcie dać dwóm osobom ten sam identyfikator. Kontrola zgłasza to przy wyraźnym znaku
(więcej niż 2 rodziców, osoba sama swoim rodzicem, dzieckiem lub partnerem) albo gdy dziecko urodziło się wcześniej
niż 12 lat po rodzicu, a do tego rodzice lub partner są tej samej płci. Sami rodzice tej samej płci wyniku nie dają.
Rozwiązanie jest w tekście wyniku: pierwotny plik zaimportować ponownie jako nowe drzewo.

- **Obowiązuje od:** aplikacja 1.7.0 (źródła i załączniki); 3.0.0 (zdjęcia); 3.9.0 (scalenie przy imporcie)
- **Od aplikacji 3.33.0:** kontrola po imporcie i po scaleniu to raport **Kontrola drzewa** (wcześniej pytanie
  „Kontrola danych”):
  - plik z innego programu z kartą **Co dalej**: karta ma wiersz **Kontrola drzewa** („Znalazła 3 rzeczy do
    przejrzenia. Nic nie poprawia się samo.” albo „Kontrola drzewa nie znalazła w imporcie nic do sprawdzenia.”)
    z **Otwórz raport** ([S6.4](S6-tree-from-another-program.md#S6.4));
  - inny import: raport **Co dodał import** otwiera się od razu na **Błędy w danych**. Gdy kontrola nic nie znajdzie,
    pojawia się tylko powiadomienie „Kontrola drzewa nie znalazła w imporcie nic do sprawdzenia.” z **Raport ›**
    (8 s). Po zamknięciu raportu aplikacja w razie potrzeby pyta o podział na rodziny;
  - raport po imporcie przechodzi całe drzewo. Do badania nie trafia;
  - scalenie: **Sprawdź drzewo** w ostatnim kroku kreatora i w historii scaleń otwiera raport **Co dodało scalenie**
    z dodanymi i połączonymi osobami i **‹ Wróć do scalania** ([A8.11](A8-merging-trees.md#A8.11)).

<!-- zdroj: app:src/validation.ts:982 checkSourceIntegrity, checkPhotoData, :1199 checkImportMerges · strings.ts treeManager.valCitationMissingSource, valAttachmentNoData, valPhotoUnsafeData, valImportMerge · 3.33.0: app:988b0f86 src/ui/import-export.ts afterImport (offerImportNextCard, path merge, openTreeHealthReport section errors, quietWhenClean, scope import bez personIds, offerPostImportSplit) · src/ui/tree-health-ui.ts quietWhenClean → importClean 8000 ms, action report · src/ui/import-next-ui.ts řádek check (checkFound, checkClean, openReport) · src/research-health.ts healthBuiltinScopeParam (import → null) · src/merge/ui.ts:1786, src/ui/merge-history-ui.ts:173 scope import merge personIds added + joined, backToMerge · strings.ts health.scopeImport, scopeMerge, importClean, openReport, treeManager.postImportCheckTitle, importNext.checkFound, checkClean · commit ea094193 -->

<a id="A5.5"></a>
## A5.5 Wskazówki: chrzestni i zapisy miejsc

**Wskazówki** nie są błędami. Pokazują, gdzie może być pokrewieństwo albo niejednolity zapis.

- **Powtarzający się chrzestny – często to krewny:** ten sam chrzestny lub świadek występuje przy zdarzeniach co
  najmniej 2 osób, które nie są ze sobą spokrewnione, a te osoby należą do co najmniej 2 grup rodzeństwa. Wiersz
  pokazuje, przy ilu zdarzeniach i osobach.
  Przykład: Marie Vlková jest chrzestną dzieci Horáków i dzieci ich sąsiadów.
- **Jedno miejsce zapisane na kilka sposobów:** zapisy, które różnią się tylko wielkością liter, znakami
  diakrytycznymi albo kropką czy przecinkiem, np. „Brno” i „brno.”. Wiersz pokazuje każdy zapis z liczbą; naprawa
  jest w [A5.1.1](#A5.1.1).
- **Granice:** krewni to osoby najwyżej 3 kroki przez rodziców, dzieci i partnerów. Liczą się uczestnicy zdarzeń
  osoby, świadkowie ślubu i uczestnicy wspólnych zdarzeń pary. We **Wskazówkach** jest też różnica wieku partnerów
  ([A5.3](#A5.3)).
- **Obowiązuje od:** aplikacja 1.10.0 (miejsca); 1.16.0 (chrzestni); grupy rodzeństwa i osoby urzędowe 3.17.0
- **Od aplikacji 3.28.0:** we **Wskazówkach** są jeszcze:
  - to samo wydarzenie zapisane osobno u kilku osób, z **Połącz w jedno wydarzenie** lub **Przejrzyj po kolei**
    ([A10.4](A10-shared-events.md#A10.4));
  - chrzestni i świadkowie zapisani z nazwiska, którym odpowiada osoba w drzewie, z **Przejrzyj po kolei**
    ([A10.5.2](A10-shared-events.md#A10.5.2)).

<!-- zdroj: app:src/godparents.ts:42 RECURRING_THRESHOLD, :188 recurringParticipants, :270 siblingGroupCount, :300 godparentLeads · src/validation.ts:1034 checkPlaceSpellings, checkRecurringGodparents · strings.ts treeManager.valRecurringGodparent, valRecurringGodparentDetail, valPlaceSpelling, leadsSkipped -->

<a id="A5.5.1"></a>
### A5.5.1 Jak rozpoznaje się tego samego chrzestnego

- Osobę połączoną z drzewem rozpoznaje się po rekordzie. Tylko zapisane imię i nazwisko porównuje się jako tekst,
  wiersz ma wtedy „dopasowanie według imienia”.
- Z zapisu bierze się imię i nazwisko do pierwszego przecinka, małej litery lub cyfry. Tytuły i zwroty grzecznościowe
  (kmotr, pan, Mgr. …) się pomija, partykuły (von, de …) zostają, tekst w nawiasie to uwaga. Porównuje się bez
  znaków diakrytycznych i wielkości liter.
- Imię i nazwisko musi mieć co najmniej 2 słowa. Samo imię nigdy nie daje zgodności.
- Nie zgłasza się tego, kto jest przy zdarzeniu z urzędu: udzielającego ślubu, akuszerki i duchownego (farář, kaplan,
  Pfarrer, parochus …). Duchowny zapisany jako chrzestny jest zgłaszany.

<!-- zdroj: app:src/godparents.ts:48 NAME_PARTICLES, :54 NAME_PREFIXES, :80 participantName, :117 CLERGY_WORDS, :121 MIDWIFE_WORDS, :134 attendsByOffice · strings.ts treeManager.valRecurringGodparentByName -->

<a id="A5.6"></a>
## A5.6 Możliwy duplikat osoby

Dwie osoby to być może ta sama, gdy mają to samo nazwisko i to samo imię i urodziły się w tych samych latach.
Porównuje się bez wielkości liter i znaków diakrytycznych. Wynik jest we **Wskazówkach** w grupie **Możliwy duplikat
osoby**.

- **Granice:**
  - Rok urodzenia: data urodzenia; bez niej chrzest (rok chrztu lub rok przed nim); bez niego zgon lub pochówek
    z wiekiem w chwili zgonu. Jeśli oba lata są z urodzenia, muszą się nakładać. W przeciwnym razie mogą być od
    siebie o 2 lata.
  - Gdy u jednej osoby brakuje imienia, wystarczy nazwisko i lata.
  - Osoby bez daty łączy się w pary tylko przy dokładnie tym samym imieniu i nazwisku. Osoby z datą nie łączy się
    w parę z osobą bez daty.
  - Nie zgłasza się: osób zastępczych i bez imienia i nazwiska, niezgodnej płci, rodzica i dziecka oraz par, w których
    jedna osoba na pewno zmarła przed urodzeniem (lub chrztem) drugiej.
- **Obsługa:** **To dwie różne osoby** ([A5.7](#A5.7)); przy werdykcie badania **Scal…** ([A5.6.1](#A5.6.1)).
- **Obowiązuje od:** aplikacja 1.9.9; lata z chrztu i zgonu 3.17.0
- Scalenie dwóch osób jednego drzewa to coś innego niż scalenie dwóch drzew albo import drzewa genealogicznego do
  drzewa ([A8](A8-merging-trees.md)): to prowadzi kreator i można je cofnąć ([A8.12](A8-merging-trees.md#A8.12)).

<!-- zdroj: app:src/validation.ts:1084 birthYears, :1127 checkPossibleDuplicates STAND_IN_YEARS_SLACK · strings.ts treeManager.valGroupPossibleDuplicate, twoPeople · odkaz na A8: spec 134 (dokumentace „A5.6 odkaz“) -->

<a id="A5.6.1"></a>
### A5.6.1 Werdykt badania

Przy drzewie z badania aplikacja po otwarciu kontroli pyta badanie o wszystkie pary. Kontrola na odpowiedź nie czeka.
Badanie ocenia tylko osoby, które mają jego numer (P…). Rozstrzyga pierwsza reguła, która obowiązuje:

| Kolejność | Badanie ustaliło | Werdykt w aplikacji |
|---|---|---|
| 1 | nie zna osoby | brak |
| 2 | osoby już scaliło | **Scalono w badaniu** |
| 3–9 | dwie osoby oznaczone przez człowieka; inna płeć; rodzic i dziecko; urodzenie lub chrzest ponad 3 lata od siebie; jedna osoba zmarła, zanim druga się urodziła; rodzeństwo (drugie dziecko dostało imię zmarłego); inni rodzice | **Dwie osoby** |
| 10 | imiona i nazwiska różnią się w badaniu | **Niepewne** |
| 11–12 | ci sami rodzice i znane lata; ten sam zapis w źródle u obu | **Prawdopodobnie ta sama osoba** |
| 13–14 | bliskie lata i nic więcej; u jednej osoby brak daty | **Niepewne** |

- **Granice:**
  - Pary z werdyktem **Prawdopodobnie ta sama osoba** i **Scalono w badaniu** idą na górę, potem **Niepewne**, potem
    bez werdyktu.
  - Pary **Dwie osoby** idą na bok do wiersza **Rozróżnione przez badanie: n** i nie są liczone.
  - Werdykt, który przyjdzie do otwartej grupy, tylko dodaje etykietę. Kolejność zmieni się dopiero przy kolejnym
    otwarciu.
  - Pod grupą jest **Badanie ocenia…** lub **Ocenione przez badanie**. Gdy nie działa badanie, które oceniało przy
    ostatnim połączeniu: „Bez oceny badania – badanie nie działa.” Badania, które oceniać nie umie, się nie wymienia.
- **Obsługa:** przy werdykcie **Scal…** (scalenie osób) lub **Wczytaj nową wersję** · terminal:
  `strom person compare P… P…`, dla wielu par `--pairs-from`. Połączenie z badaniem:
  [S1](S1-connecting-app-and-research.md).
- **Obowiązuje od:** aplikacja 3.17.0 (badanie 1.22.0)

<!-- zdroj: app:src/duplicate-verdicts.ts:18 MAX_JUDGE_PAIRS, :54 issueResearchPair, :142 verdictRank, :154 verdictsMode, :192 verdictReasonText · src/quality-bridge.ts:172 postDuplicates · strings.ts treeManager.verdict*, reason* · research:src/core/duplicates.ts judge YEARS_CLOSE · src/core/live.ts:168-192 · src/commands/quality.ts person compare -->

<a id="A5.6.2"></a>
### A5.6.2 Podpowiedź przy wpisywaniu osoby

Przy wpisywaniu nowej osoby aplikacja pokaże najwyżej 3 podobne osoby („Podobne osoby już istnieją:”). Porównuje
inaczej niż [A5.6](#A5.6): wynikiem podobieństwa jak przy scalaniu, nigdy z niezgodną płcią.
- **Obsługa:** **Przejdź do osoby**, **Użyj istniejącej** · wyłączenie **Ustawienia → Powiadomienia → Podpowiedzi
  duplikatów**.
- **Obowiązuje od:** aplikacja 1.4.0

<!-- zdroj: app:src/ui/duplicate-suggest.ts:22 MAX_SUGGESTIONS, :75 runDuplicateCheck · findSimilarPersons SIMILAR_PERSON_THRESHOLD · strings.ts duplicateSuggest.settingLabel, useExisting -->

<a id="A5.7"></a>
## A5.7 To nie błąd

Wynik, który nie jest błędem, się oznacza. Potem nie jest już zgłaszany, nawet gdy drzewo zostanie sprawdzone
ponownie.
Oznaczenie to zmiana drzewa: ma krok wstecz i wpis w historii zmian. Przy możliwym duplikacie przycisk nazywa się
**To dwie różne osoby**.

- **Granice:**
  - Ten sam wynik aplikacja rozpoznaje po rodzaju, osobach i przedmiocie. Przedmiot to rok przy zdarzeniu lub ślubie
    po zgonie, imię i nazwisko przy chrzestnym i najczęstszy zapis przy miejscu. Gdy coś z tego się zmieni, wynik
    pokaże się ponownie.
  - Przy drzewie z badania oznaczenie trafia do badania, gdy wszystkie osoby wyniku mają numer badania (najwyżej 20
    osób). Plik GEDCOM z badania oznaczeń nie niesie; przy wczytaniu nowej wersji przejmuje się je ze starej wersji
    drzewa.
  - Badanie respektuje oznaczenia przy zdarzeniu i ślubie po zgonie: `strom check` ich nie zgłasza, a agent ich nie
    bada.
  - Stan oznaczenia: **Wysłano do badania**, **Czeka na badanie** (badanie nie działa, wyśle się przy następnym
    połączeniu), **Tylko w aplikacji** (badanie go nie przyjęło albo osoby nie mają numeru; ponownie się nie
    wysyła), **Oznaczono w badaniu**.
  - Oznaczenie przy miejscu nie ma osób, dlatego do badania się go nie wysyła. Przy wydzieleniu części drzewa zostają
    tylko oznaczenia, których wszystkie osoby zostają.
  - Oznaczenie zapisane w badaniu aplikacja zna tylko przy otwartym drzewie z badania, gdy badanie działa.
  - **Od aplikacji 3.27.0:** przedmiot przy **Ślub w wieku poniżej 16 lat** to rok ślubu, przy **Zapisany wiek różni
    się o więcej niż 2 lata** dana (urodzenie, ślub, zgon), a przy ślubie jego rok. Oznaczony wynik widok Tabela
    pokazuje jako **nietypowe** i stamtąd można go też oznaczyć i przywrócić ([A6.7.5](A6-views.md#A6.7.5)).
- **Obsługa:** w wierszu wyniku **To nie błąd** / **To dwie różne osoby**, przez 6 s propozycja **Cofnij**. Lista
  **Oznaczono jako „to nie błąd”: n** pod wynikami (od aplikacji 3.33.0 na końcu **Błędy w danych** w raporcie
  [A5.1](#A5.1)), przy każdym oznaczeniu data lub **Oznaczono w badaniu**, przycisk

  **Przywróć** · terminal: `strom quality list`, `strom quality dismiss possibleDuplicate P… P…`,
  `strom quality dismiss eventAfterDeath P… --subject 1861`, `strom quality undo …`. Oznaczenie zapisuje tylko
  człowiek, nigdy agent.
- **Obowiązuje od:** aplikacja 3.17.0 (badanie 1.22.0)

<!-- zdroj: app:src/validation.ts:1415 qualityFinding (3.27.0: marriageUnder16 rok, recordedAgeMismatch field + rok) · src/ui/table-view/table-bubble.ts · src/quality-dismiss.ts:47 sanitizeQualityDismissed, :152 dismissalFor, :186 dismissBody, mergeResearchMarks, carryOverTreeDecisions, dismissalsWithin · src/quality-bridge.ts:74 dismissReply · src/ui/quality-ui.ts:155 flushQuality, :257 readQualityMarks · src/data.ts:1674 dismissQualityFinding · src/ui/tree-stats.ts:104 DISMISS_TOAST_MS (3.33.0: app:988b0f86 src/ui/tree-health-errors-ui.ts DISMISS_TOAST_MS, qualityDismissedHtml) · strings.ts treeManager.notAnError, twoPeople, dismissedRow, sentToResearch, waitingForResearch, appOnly, markedInResearch · research:src/commands/quality.ts PERSON · src/core/afterdeath.ts -->

<a id="A5.8"></a>
## A5.8 Przegląd drzewa → Jakość danych

Sekcja podsumowuje kontrolę i kompletność drzewa. Liczy tak samo jak **Błędy w danych** ([A5.1](#A5.1)), bez
oznaczonych wyników i bez par, które badanie rozróżniło.

| Blok | Co pokazuje |
|---|---|
| **Kontrola drzewa** | „Ostatnio 12.3.2025 · 3 zalecane kroki” albo „Jeszcze nie przeprowadzono”; **Raport ›** (ostatni raport całego drzewa), **Sprawdź drzewo…** ([A5.1.2](#A5.1.2)); tylko drzewo z osobami |
| **Spójność** | podsumowanie („2 błędy, 1 do sprawdzenia, 3 wskazówki.”), 5 najpoważniejszych błędów i wyników do sprawdzenia, „i jeszcze n…”, wiersz „n wskazówek ›” |
| **Kompletność danych** | udział osób z **Data urodzenia**, **Data zgonu (u zmarłych)**, **Miejsce urodzenia**, **Zdjęcie**; poniżej 50 % wyróżnione; „Zawartość drzewa:” (zdjęcia, zdarzenia, źródła, załączniki) |
| **Pewność danych z badania**, **Gdzie brakuje dowodów** | udokumentowanie, zob. [R3.8](R3-verification-and-citation.md#R3.8) i [A3](A3-evidence-in-the-app.md) |
| **Struktura** | liczba związków; niepołączone części albo „Wszystkie osoby są połączone w jedną rodzinę.” |
| **Szybkie działania** | **Błędy w danych ›**, **Usuń osierocone miejsca (n)**, **Podziel na rodziny** |

- **Granice:**
  - Powyżej 10 MB zdjęć i załączników dochodzi powiadomienie („Media zajmują ponad 10 MB. Plik drzewa wolniej się
    zapisuje i udostępnia.”). Osierocone miejsce to miejsce, do którego nic się nie odwołuje.
  - Niepołączona część nie ma drogi do głównej rodziny; można ją wydzielić (**Wydziel niepołączone części**).
  - Karta w **Na czym się skupić** pokazuje liczbę błędów i najczęstszy rodzaj. Ma przycisk **Popraw** (otwarte
    drzewo) lub **Błędy w danych ›**; oba otwierają raport na **Błędy w danych**.
  - **Sprawdź drzewo…** działa tylko w otwartym drzewie. **Raport ›** jest, gdy drzewo ma raport całego drzewa.
  - **Od aplikacji 3.33.0:** blok **Kontrola drzewa**; **Błędy w danych ›** i wiersz „n wskazówek ›” otwierają raport
    (wcześniej **Szczegóły walidacji** i okno **Walidacja drzewa**).
- **Obsługa:** **Przegląd drzewa → Jakość danych**; w menu drzewa także bezpośrednio **Jakość danych**.
  Działania, które zmieniają dane, są możliwe tylko w otwartym drzewie.
- **Obowiązuje od:** aplikacja 3.13.0; wskazówki i oznaczenia 3.17.0; „do sprawdzenia” zamiast „ostrzeżenie” 3.27.0;
  blok **Kontrola drzewa** 3.33.0

<!-- zdroj: app:src/ui/tree-overview.ts:101 TOP_ISSUES, :108 LOW_SHARE, :1882 treeOverviewQualityHtml, :925 selectFocusCards · src/ui/tree-actions.ts:191 overview-quality · strings.ts treeOverview.consistencyTitle, completenessTitle, field*, contentLabel, mediaWarning, structureTitle, allConnected, quickActions, actValidation, actCleanPlaces, actSplitFamilies, cardValidation · 3.33.0: app:988b0f86 src/ui/tree-overview.ts blok check (q.persons === 0 → bez bloku, last = healthReports scope tree, lastRun, stepsCount, notRun, report, checkTree jen st.active, disabledHint), akce health, health-report, validation, validation-leads · strings.ts health.title, lastRun, notRun, report, checkTree, treeOverview.actValidation „Chyby v datech ›“ -->

<a id="A5.9"></a>
## A5.9 `strom health` w terminalu

`strom health` wypisuje wbudowaną część kontroli drzewa tak, jak zna ją badanie. To ta sama część, którą badanie
wysyła do raportu w aplikacji ([A5.1.4](#A5.1.4)). Niczego nie zmienia.

| Wiersz wyjścia | Co pokazuje |
|---|---|
| „Kontrola drzewa · całe drzewo · …” | zakres i stan historii badania |
| „Kontrola danych: w porządku” / „Kontrola danych: PROBLEM” | stan `strom check`: błędy, ostrzeżenia, osoby bez dowodu |
| „Przybyło w ciągu 30 dni: …” | nowe osoby, fakty i źródła |
| „Linie: …”, „Kolejka: otwarte 4, odłożone 1” | linie (w kolejce, czeka, STOI) i kolejka („PUSTA”) |
| „Wysłane i długo bez odpowiedzi: …” | prośby wysłane ponad 30 dni temu |
| „Czeka na decyzję: 3”, „Czekające poprawki strom: …” | decyzje i poprawki Stromu |
| „Dane do weryfikacji: 5” | dane do weryfikacji z oryginałem, według linii |
| „Końce gałęzi nigdy nieprzeszukane: 6” | końce gałęzi; wymienia najwyżej 8 osób |
| „Materiał czekający na posortowanie: 4” | materiał bez osoby i otwarte partie |
| „Zadania, które nie czekają tak, jak strom potrzebuje: 1” | zadania z ustaleniem audytu |
| „Cytaty oryginałów: bez strony 2, bez skanu 7” | cytaty bez strony i bez skanu |
| „Następne kroki:” | najwyżej 10 kroków, każdy z poleceniem („1. kolejka jest pusta → strom run”) |

| Krok | Polecenie |
|---|---|
| kontrola danych znalazła błędy | `strom check` |
| linia stoi, czekające zadania / nic w jej kolejce | `strom task list --research G… --state waiting` / `strom run --research G…` |
| prośby długo bez odpowiedzi | `strom task list --state waiting` |
| czeka na decyzję | `strom status` |
| kolejka jest pusta | `strom run` |
| poprawka strom | `strom fixes show …` |
| dane do weryfikacji w linii | `strom verify bulk --scope line --of G… --dry-run` |
| końce gałęzi nigdy nieprzeszukane | `strom edge` |
| materiał czekający na posortowanie | `strom input list` |

- **Granice:**
  - Kolejność kroków: spójność badania, linie, które stoją, stare prośby, decyzje, pusta kolejka, poprawki Stromu,
    weryfikacja według linii (najwięcej danych najpierw), końce gałęzi, materiał.
  - Linia stoi, gdy jest aktywna i nie ma w kolejce żadnego zadania. Pusta kolejka jest krokiem tylko przy aktywnej
    linii.
  - Archiwum i badanie przykładowe pomijają linie, kolejkę, prośby, weryfikację, końce gałęzi i czekanie zadań.
  - Wyjście jest w języku badania, z `--lang` w innym.
- **Obsługa:** terminal:
  - `strom health` całe drzewo; `--scope line:G…` jedna linia, `--scope person:P…` jedna osoba;
  - `--json` wyjście dla programów;
  - `--save` zapisuje wyjście jako raport C… (stan „zapisano”);
  - `strom health list` zapisane raporty od najnowszego, 10 najnowszych (`--all` wszystkie);
    bez raportu „jeszcze brak raportu …”;
  - `strom health show C…` jeden raport.
- **Obowiązuje od:** badanie 1.38.0

<!-- zdroj: research:d8742230, 3f541f54, 818a015b src/commands/health.ts (register health, health list, health show; builtinLines; stepWords → příkazy; „  1. {what} → {command}“; edges.people.slice(0, 8)) · src/core/health.ts builtin (archive), stepsOf (pořadí, stuck, queue-empty), SENT_OLD_DAYS 30, STEPS_MAX 10, EDGE_PEOPLE_MAX 50 · src/core/live.ts GET /health/builtin · assets/lang/cs.json ui.health.head, check.ok, check.problem, growth, lines, line.*, queue, queue.empty, sent, decide, fixes, verify, edges, material, batches, tasks, citations, steps, step.*, saved, list.none, run.state.built · help: strom help health, health list, health show · CHANGELOG.cs.md 1.38.0 „Kontrola stromu“ -->
