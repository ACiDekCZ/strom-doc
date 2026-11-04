<a id="R2"></a>
# R2 Linie i kolejka

Na podstawie czego agent badania wybiera, nad czym będzie pracować. Opisuje badanie 1.25.2 i aplikację
Strom 3.21.2. Zmiany z nowszej wersji mają przy sobie jej numer.

<a id="R2.1"></a>
## R2.1 Linia wyznacza, co badanie bada

Linia badania to jeden cel: przodkowie osoby, potomkowie osoby albo jedno pytanie. Każde zadanie należy do którejś
linii, a agent pracuje nad zadaniami linii.

- **Obsługa:** aplikacja: panel badania, sekcja **Linie · aktywne: {n}** · terminal: menu **Rozszerz badanie →
  Nowa linia badania**, polecenie `strom research new`
- **Obowiązuje od:** badanie 1.0.0

<!-- zdroj: research:src/core/model.ts DIRECTIONS, RESEARCH_STATES · research:src/commands/research.ts · app:strings.ts live.dirTitle -->

<a id="R2.1.1"></a>
### R2.1.1 Rodzaje linii i ograniczenia

- **Przodkowie osoby**, najwyżej podana liczba pokoleń albo tylko przodkowie urodzeni przed podanym rokiem.
- **Potomkowie osoby.**
- **Jedno pytanie** (zmyślony przykład: „Kto był ojcem Marie Vlkovej?”).
- **Przegląd osoby** powstaje z przeglądu osoby, nie z oferty nowej linii.
- **Obsługa:** terminal: `strom research new --direction ancestors|descendants --generations <n> --before <rok>
  --question "<otázka>"`. Aplikacja: **+ Nowa linia**, z ograniczeniami **Najwyżej pokoleń** i **Tylko przed rokiem**
  (aplikacja 3.22.0 z badaniem 1.26.0).
- **Obowiązuje od:** badanie 1.0.0

<!-- zdroj: research:src/commands/research.ts:79 · assets/lang/cs.json ui.research.kind · app:src/ui/research-directions-ui.ts DIRECTIONS_WRITE_SINCE -->

<a id="R2.1.2"></a>
### R2.1.2 Linia wstrzymana i zakończona

- **Wstrzymana:** jej zadania czekają poza kolejką, agent bierze zadania innych linii.
- **Zakończona:** jej zadania znikają z kolejki. Nic nie jest usuwane i linię można uruchomić ponownie.
- **Obsługa:** terminal: **Rozszerz badanie → Linie badania: wstrzymaj, zakończ lub uruchom ponownie**,
  `strom research pause|done|resume`. Aplikacja: sekcja Linie, działania **Wstrzymaj**, **Zakończ**, **Uruchom
  ponownie**. W aplikacji 3.21.2 działanie potwierdza się w terminalu badania, od aplikacji 3.22.0 bezpośrednio
  w panelu.
- **Obowiązuje od:** badanie 1.8.0

<!-- zdroj: research:src/commands/research.ts:168-175 · src/cli/menu-research.ts:233-263 · app:v3.21.2 research-directions-ui.ts:554 -->

<a id="R2.1.3"></a>
### R2.1.3 Kto należy do linii

- Linia przodków: osoba, jej przodkowie w granicach linii oraz mąż lub żona przodka.
- Linia z pytaniem: osoba, której dotyczy pytanie.
- Zadanie bez określonej linii należy do najwęższej linii, do której należą jego ludzie.
- **Obowiązuje od:** badanie 1.0.0. Małżonkowie i osoba pytania od 1.26.0.

<!-- zdroj: research:src/core/frontier.ts:159-194 researchPeople/linePeople · src/core/directions.ts:75-82 directionOf · CHANGELOG.cs.md 1.26.0 -->

<a id="R2.2"></a>
## R2.2 Kolejka wyznacza, które zadanie przychodzi na kolej

Otwarte zadania wszystkich trwających linii tworzą jedną kolejkę. Agent zawsze bierze pierwsze zadanie. Zadanie
rozpoczęte idzie przed wszystkimi.

- **Granice:** kolejność wyznaczają te klucze, każdy następny tylko przy zgodności poprzednich:
  1. zadanie rozpoczęte;
  2. ręczny wybór **od razu** / **na koniec** ([R2.3.1](#R2.3.1));
  3. zadania historii miejsc idą za pozostałymi, we własnej kolejności; gdy historia jest na kolei, jej pierwsze
     zadanie idzie naprzód;
  4. praca poza liniami ([R2.3](#R2.3));
  5. krótka praca naprzód: łączenie wariantów hipotez z osobami drzewa oraz miejsca, o których identyfikację
     poprosił człowiek;
  6. opowieść: gdy jest na kolei, idzie pierwsza ([R2.2.2](#R2.2.2)), w przeciwnym razie dopiero po badaniu;
  7. zadanie, które można wykonać od razu, przed zadaniem, które czeka na skany pobrane przez człowieka;
  8. strategia kolejki ([R2.2.1](#R2.2.1));
  9. rodzaj zadania: materiały → gdzie są akty → potwierdzenie powiązania → weryfikacja → wzbogacenie osoby →
     wniosek do archiwum → opowieść;
  10. wiek zadania.
- **Obsługa:** terminal: `strom task list`, `strom task next`. Aplikacja: sekcja **Kolejka**.
- **Obowiązuje od:** badanie 1.0.0 (klucze 1, 7–10). Klucz 6 od 1.1.0, łączenie hipotez od 1.17.0, klucz 3 od 1.22.0,
  klucz 4 i miejsca na prośbę od 1.25.0. Klucz 2 od 1.26.0.

<!-- zdroj: research:src/core/queue.ts rankTasks (řazení :374-396), LEVEL_ORDER :52, linksFirst (hypolinks.ts:453), placesFirst · verze klíčů: git log -S na „a.blocked - b.blocked“ (v1.0.0), „a.story - b.story“ (v1.1.0), „a.first - b.first“ (v1.17.0), „a.hist - b.hist“ (v1.22.0), „a.offLine - b.offLine“ a placesFirst (v1.25.0) -->

<a id="R2.2.1"></a>
### R2.2.1 Strategia kolejki

- **balanced** (domyślna): przeplata linie. Wyżej stawia wyższy priorytet linii, bliższe pokolenie i linię, nad
  którą nie pracowano w ostatnich 4 sesjach. Niżej stawia zadanie, które już się nie powiodło.
- **depth:** trzyma się linii, nad którą właśnie trwa praca.
- **priority:** według priorytetu linii (1–5, domyślnie 3), potem według pokolenia.
- **Obsługa:** terminal: `strom config set queue.strategy balanced|depth|priority`, priorytet linii
  `strom research new … --priority <1–5>`.
- **Obowiązuje od:** badanie 1.0.0

<!-- zdroj: research:src/core/queue.ts:294-299, RECENT=4 :58 · src/core/config.ts queue.strategy · model.ts priority -->

<a id="R2.2.2"></a>
### R2.2.2 Opowieść na kolei

Opowieść w przeciwnym razie czeka, aż badanie nie ma nic do zrobienia. Po 5 sesjach bez opowieści jedna czekająca
opowieść przychodzi jednak na kolej jako pierwsza (przy samodzielnej pracy agenta). Przy strategii priority to nie
obowiązuje.

- **Obowiązuje od:** badanie 1.1.0

<!-- zdroj: research:src/core/queue.ts STORY_EVERY=5 :61 -->

<a id="R2.2.3"></a>
### R2.2.3 Zadania, które czekają poza kolejką

Zadania nie bierze się, dopóki:
- jego linia jest wstrzymana lub zakończona ([R2.1.2](#R2.1.2));
- dotyczy tylko ludzi, których z drzewem nie łączy żadne powiązanie rodzinne. Najpierw trzeba udokumentować
  powiązanie z drzewem, potem bada się dalej. Zadanie, które to powiązanie weryfikuje, się bierze;
- brakuje skanów księgi, którą ma czytać, i czeka się na decyzję, jak je zdobyć;
- archiwum, z którego czyta, jest chwilowo niedostępne;
- jest poza liniami z wyborem **nigdy** ([R2.3](#R2.3)).

Materiały (zadanie typu materiały) i zadanie rozpoczęte nie czekają nigdy.

- **Obsługa:** terminal: `strom task list --off-tree` (zadania poza drzewem).
- **Obowiązuje od:** badanie 1.9.0 (poza drzewem); pozostałe powody według wersji w przywołanych zasadach.

<!-- zdroj: research:src/core/queue.ts:205-210 waits · src/core/kin.ts:98 offTree · assets/method/core.md „The tree first, then above it“ -->

<a id="R2.3"></a>
## R2.3 Praca poza liniami

W badaniu z wieloma liniami **praca poza liniami** to zadanie o ludziach, do których nie sięga żadna linia (siostra
przodka i jej rodzina), które nie pomaga żadnej linii. Taka praca idzie **dopiero po pracy nad liniami**.

- **Granice:** zadanie pomaga linii, a więc nie jest poza liniami, gdy wymienia hipotezę lub sprzeczność linii,
  łączy ludzi z drzewem albo agent zapisał, jak pomaga linii (rodzeństwo przodka jako chrzestny lub świadek, ten sam
  dom, nazwisko przodka). Własna rodzina rodzeństwa linii nie pomaga.
- **Opcje:** **na końcu, dopiero po liniach** (domyślnie) · **normalnie, jak praca linii** · **nigdy** (zadań się nie
  bierze, nic nie jest usuwane).
- **Obsługa:** terminal: **Ustawienia → Samodzielna praca agenta → Praca poza liniami**,
  `strom config set queue.offLine last|normal|never`. Aplikacja 3.21.2 pokazuje przy zadaniu **Czeka do zakończenia
  pracy linii · nie pomaga żadnej linii**.
- **Obowiązuje od:** badanie 1.25.0
- **Od badania 1.26.0:** nowa opcja domyślna **czasem, raz na jakiś czas**: jedno zadanie poza liniami na 10 sesji
  (`queue.offLineShare`), z najbliższej gałęzi. Do pracy poza liniami należy też mąż lub żona przodka
  ([R2.1.3](#R2.1.3)).

<!-- zdroj: research:v1.25.2 src/core/config.ts:278 queue.offLine (popis), :715 výchozí last · HEAD model.ts OFF_LINE_CHOICES, config.ts OFF_LINE_SHARE=10 · assets/method/core.md „The lines first“ · app:strings.ts research.queueOffLast -->

<a id="R2.3.1"></a>
### R2.3.1 Wybór dla jednej gałęzi i jednego zadania

Oprócz wyboru dla całego badania własny wybór może mieć jedna gałąź (także „dodać do linii”) i jedno zadanie
(**od razu** / **na koniec**). Węższy wybór wygrywa: zadanie przed gałęzią, gałąź przed badaniem.

- **Obsługa:** terminal: `strom offline set`, `strom task order T… --next|--last|--default`. Aplikacja 3.22.0:
  **Zrób jako następne**, **Na koniec**.
- **Obowiązuje od:** badanie 1.26.0

<!-- zdroj: research:src/commands/offline.ts:101,171 · quality/offline.json -->

<a id="R2.3.2"></a>
### R2.3.2 Rosnąca gałąź dostaje propozycję linii

Gdy gałąź poza liniami urośnie do 10 otwartych zadań lub 5 osób, w **Czeka na decyzję** pojawia się pytanie: dodać
do linii, założyć linię, zostawić bez zmian albo nie badać. Po odpowiedzi „zostawić” propozycja wraca dopiero przy
dwukrotnej wielkości. Gałąź z własnym wyborem i wybór **nigdy** propozycji nie dostają.

- **Obsługa:** terminal: **Proponować linie dla rosnących gałęzi** (włączyć/wyłączyć), `strom offline answer`,
  `strom config set queue.suggestTasks|queue.suggestPersons <n>`.
- **Obowiązuje od:** badanie 1.26.0

<!-- zdroj: research:src/core/offline.ts:449-455 grows · config.ts SUGGEST_TASKS=10, SUGGEST_PERSONS=5 · cs.json ui.wait.branch.done.keep -->

<a id="R2.4"></a>
## R2.4 Dlaczego zadanie stoi tam, gdzie stoi

Każde zadanie w kolejce podaje powód swojego miejsca: w linii, pomaga linii (i jak), poza liniami (i w jakiej
gałęzi), ręczny wybór albo czeka, bo linia jest wstrzymana.

- **Obsługa:** aplikacja 3.22.0: sekcja **Kolejka**, wiersz przy zadaniu (np. „pomaga linii {n} · {jak}”).
- **Obowiązuje od:** badanie 1.26.0

<!-- zdroj: research:src/core/queue.ts:312-349 · app:strings.ts live.qWhyLine, qWhyHelps, qWhyOut, qWhyManualNext, qWhyPaused -->
