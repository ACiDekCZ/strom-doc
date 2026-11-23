<a id="A8"></a>
# A8 Scalanie drzew

Jak aplikacja Strom scala dwa drzewa genealogiczne: plik GEDCOM z drzewem, dwa drzewa albo widok z drzewem. Opisuje
aplikację 3.21.2; zmiany z nowszej wersji mają przy sobie jej numer. Od aplikacji 3.32.0 każde scalenie prowadzi
kreator **Scalanie drzew** w sześciu krokach ([A8.5](#A8.5) do [A8.13](#A8.13)). Scalenie zduplikowanej osoby
wewnątrz jednego drzewa to inna sprawa ([A5.6](A5-tree-check.md#A5.6)).

<a id="A8.1"></a>
## A8.1 Scalenie zawsze zakłada nowe drzewo

Nie obowiązuje od aplikacji 3.32.0, zastępuje ją [A8.5](#A8.5): kreator zapisuje do wybranego drzewa albo zakłada nowe.

Wynik scalenia zapisuje się jako **nowe drzewo**. Oba pierwotne drzewa i plik zostają bez zmian.

| Skąd | Obsługa |
|---|---|
| plik GEDCOM | **Import → Import GEDCOM → Scal z istniejącym** |
| inne drzewo | zarządzanie drzewami, przy drzewie **Scal drzewo** → **Wybierz drzewo docelowe** → **Rozpocznij scalanie** |
| osoby właśnie wyświetlone w widoku | **Scal ten widok z…** i wybór innego drzewa |

- Przed zapisem aplikacja pyta o **Nazwa scalonego drzewa:** (domyślnie „cel + źródło”). Po scaleniu pokazuje liczbę
  scalonych i dodanych osób i proponuje przełączenie na nowe drzewo.
- **Granice:** pustego widoku nie da się scalić; widok scala się tylko z innym drzewem.
- **Obowiązuje od:** aplikacja 1.0.0; Scal ten widok z… aplikacja 1.19.0

<!-- zdroj: app:src/merge/ui.ts:1421 newTreeNamePrompt, :1447 TreeManager.createTree · src/ui/merge-ui.ts:595 mergeViewInto · strings.ts merge.newTreeNamePrompt, merge.switchToNewTree, merge.mergeViewInto, merge.mergeViewEmpty, merge.mergeViewNoTarget, treeManager.mergeSourceTree, treeManager.selectTargetTree, treeManager.startMerge, importDialog.mergeExisting · git v1.19.0 (cf43bde) -->

<a id="A8.2"></a>
## A8.2 Łączenie osób w pary

Aplikacja dla każdej osoby ze scalanego źródła szuka osoby w drzewie docelowym i parze nadaje wynik dopasowania.

- Wynik liczy się z podobieństwa imienia i nazwiska, daty i miejsca urodzenia, daty zgonu oraz ze zgodności rodziców
  i partnerów. Płeć nie może być sprzeczna.
- **Wysoka** to dopasowanie 85 i więcej, **Średnia** 55 i więcej, w przeciwnym razie **Niska**. Osoba bez
  dopasowania jest **Nowa**.
- Kreator podaje przy dopasowaniu powód (na przykład „Imię i nazwisko oraz rok urodzenia”, „Dziecko dopasowanej
  osoby”).
- **Granice:** osób zastępczych (puste miejsce dla nieznanego rodzica) nie łączy się w pary. Osoba bez imienia
  połączona w parę przez krewnego idzie zawsze do sprawdzenia.
- **Obowiązuje od:** aplikacja 1.0.0
- **Od aplikacji 3.26.0:** osoby paruje się także według identyfikatora programu (`_UID` = `UID`, `_FSFTID` = `EXID`
  z adresem familysearch.org), z powodem **Ten sam identyfikator w pliku**. Takie dopasowanie jest pewne tylko przy
  podobnym imieniu i nazwisku, płci nie mężczyzna wobec kobiety, latach urodzenia najwyżej 3 od siebie i bez różnego
  globalnego identyfikatora; w przeciwnym razie to propozycja z wynikiem najwyżej 79. Oznaczenie rekordu i `RIN` dodają
  do zgodności imion i nazwisk 25 punktów tylko przy plikach tego samego programu. Rodzin według identyfikatora się nie
  paruje ([S6.7](S6-tree-from-another-program.md#S6.7)).
- **Od aplikacji 3.27.0:** identyfikator programu (`_UID`, `UID`, `_FSFTID`, `AFN`, `EXID`), który w drzewie
  ma więcej niż jedna osoba, nie mówi, która to jest: sam dopasowania nie tworzy, tylko je proponuje.
- **Od aplikacji 3.32.0:** kreator pokazuje wynik jako procenty („N %”) i dzieli pary na **Ci sami** (wynik 80
  i więcej) i **Może ci sami** (niższy wynik); osoba bez dopasowania jest wśród **Nowi** ([A8.7](#A8.7)). Oznaczenia
  **Wysoka**, **Średnia** i **Niska** już się nie pokazują.

<!-- zdroj: app:src/merge/matching.ts:318 findMatches, :781 (85 high, 55 medium), :790 calculateMatchScore, :618 UNKNOWN_NAME_MATCH_SCORE · strings.ts merge.highConfidence, merge.mediumConfidence, merge.lowConfidence, merge.matchReasons · 3.27.0: app:b5595ca1 src/merge/matching.ts idNamesSeveral (víc osob stromu se stejným silným ID → jen idCandidate), findDirectMatches · src/merge/id-match.ts STRONG_TAGS · CHANGELOG.cs.md 3.27.0 · spec 066 K3.2 -->

<a id="A8.3"></a>
## A8.3 Co rozstrzyga człowiek

Kreator **Scalanie danych** pokazuje dopasowania, konflikty i nowe osoby. Każde dopasowanie można rozstrzygnąć.

| Opcja | Co dzieje się z osobą ze źródła |
|---|---|
| **Potwierdź** | scala się z osobą drzewa |
| **Odrzuć** | zostaje dodana jako nowa osoba |
| **Pomiń** | nie zostaje przeniesiona wcale |
| **Przypisz do istniejącej** | scala się z ręcznie wybraną osobą |

- Nierozstrzygnięte dopasowanie z wynikiem 50 i więcej przy scaleniu potwierdza się samo; nierozstrzygnięte poniżej
  50 zostaje dodane jako nowa osoba. Jeśli zostają nierozstrzygnięte niepewne dopasowania, aplikacja pyta przed
  scaleniem.
- **Tylko uzupełnianie istniejących osób (bez dodawania nowych)** uzupełnia osoby połączone w pary i nie dodaje żadnej
  nowej osoby.
- Dana, którą obie strony mają inaczej, to konflikt: **Zachowaj istniejące** lub **Użyj z importu**; dokładniejsza
  data lub pełniejsza wartość jest **proponowana**. Przy parze rozstrzyga się tak stan relacji, datę i miejsce ślubu
  i datę końca. Dana tylko po jednej stronie zostaje uzupełniona.
- Rozpoczęte scalanie można przy zamknięciu **Zapisz na później**; wraca jako **Niedokończone scalania**.
- **Obowiązuje od:** aplikacja 1.0.0; konflikty pary aplikacja 3.0.0; Pomiń i Tylko uzupełnianie istniejących osób
  aplikacja 1.19.0
- **Od aplikacji 3.26.0:** nierozstrzygnięte dopasowanie potwierdza się samo dopiero od wyniku 80 (w kreatorze
  z góry potwierdzone, ✓). Dopasowanie 50–79 jest tylko proponowane (?) i bez decyzji człowieka zostaje dodane jako
  nowa osoba: zdublowaną osobę można scalić później, błędnego scalenia cofnąć się nie da.
- **Od aplikacji 3.32.0:** rozstrzyga się w kreatorze: pary w kroku **Kto jest kim** ([A8.7](#A8.7)), różniące się
  dane w kroku **Kto ma rację** ([A8.9](#A8.9)). Miejsce opcji **Potwierdź**, **Odrzuć**, **Pomiń** i **Tylko
  uzupełnianie istniejących osób** zajmują **Ta sama osoba**, **Nowa osoba**, **Nie dodawaj** i zakres **d) Tylko
  uzupełnij istniejące osoby**. Ponadto obowiązuje:
  - para z wynikiem poniżej 80 nie połączy się bez decyzji człowieka; pozostałe nierozstrzygnięte można naraz dodać
    jako nowe albo pominąć ([A8.7](#A8.7)). Każda osoba importu kończy dokładnie raz: połączona, dodana albo pominięta
    wyraźnym wyborem;
  - propozycja importu jest tylko radą: różniąca się dana bez wyboru człowieka zostawia wartość drzewa;
  - scalenie, przy którym coś by się zgubiło, nie zapisuje się: przed zapisem sprawdza się sumy osób, par, powiązań,
    źródeł, zdjęć i plików oraz odwołania; gdy się nie zgadzają, mówi „Sumy się nie zgadzają: nic nie zapisano.” i co
    się nie zgadza;
  - źródło importu z identyfikatorem, który drzewo ma już dla innego źródła, przychodzi jako nowe źródło;
  - sukces zgłasza się dopiero po rzeczywistym zapisie do pamięci.

<!-- zdroj: app:src/merge/executor.ts:78 AUTO_CONFIRM_SCORE, :110 detectPartnershipConflicts, :302 toAdd (updateOnly, skip, reject), :792 mergePersonData · src/merge/ui.ts:1408 pendingGate · strings.ts merge.confirm, merge.reject, merge.skip, merge.manualMatch, merge.updateOnlyLabel, merge.keepExisting, merge.useImport, merge.suggestedPrecise, merge.partnershipFields, merge.closeSave, merge.pendingMerges · git v3.0.0 (2218cea), v1.19.0 (cf43bde) -->

<a id="A8.4"></a>
## A8.4 Co przechodzi z drzewem

Poza osobami i relacjami scala się też listy, które należą do całego drzewa.

- **Źródła:** to samo źródło (ta sama sygnatura, w przeciwnym razie ten sam opis) się nie podwaja; cytaty przechodzą
  na zachowane źródło, a brakująca transkrypcja i data zostają uzupełnione.
- **Od aplikacji 3.27.0:** źródło, które od zachowanego różni się tylko domyślną wiarygodnością, jest tym samym
  źródłem i się nie podwaja; przeniesione cytaty zachowują swoją wiarygodność
  ([A2.6.1](A2-loading-a-family-tree.md#A2.6.1)). Inna data zapisu albo inne wiersze cytatu nadal dają osobne źródło.
- **Miejsca:** współrzędne, rekordy miejsc i inne nazwy miejsc się ujednolica; gdzie oba drzewa znają to samo
  miejsce, obowiązuje drzewo docelowe.
- **Formy nazwiska** ([A4.5](A4-surnames-and-families.md#A4.5)) się ujednolica; grupy, które się nakładają, się łączy.
- Nowe drzewo zaczyna bez domyślnej osoby i widoku ([A6.1.1](A6-views.md#A6.1.1)).
- Aplikacja przed scaleniem mówi, ile problemów kontroli mają oba drzewa, a po scaleniu proponuje kontrolę, gdy
  scalenie przyniosło nowe ([A5](A5-tree-check.md)).
- **Granice:** ponowny import pliku badania do drzewa badania omawia [S1](S1-connecting-app-and-research.md).
- **Obowiązuje od:** aplikacja 1.0.0; zgłaszanie problemów kontroli aplikacja 1.19.0
- **Od aplikacji 3.26.0:** notatki osoby, relacji i źródła przy scaleniu się nie podwajają. Przed scaleniem zapisuje
  się kopia zapasowa drzewa ([S6.5](S6-tree-from-another-program.md#S6.5)). Po scaleniu pliku innego programu aplikacja
  pokazuje kartę **Co dalej** ([S6.4](S6-tree-from-another-program.md#S6.4)). Ręczne scalenie dwóch osób
  ([A5.6](A5-tree-check.md#A5.6)) notatek nie łączy.
- **Od aplikacji 3.28.0:** wspólne wydarzenia ([A10.1](A10-shared-events.md#A10.1)) się nie podwajają: parują się
  z wydarzeniami drzewa docelowego i przejmują jego wspólne wydarzenie; własne wydarzenie „Census” paruje się ze
  spisem ludności. Podsumowanie „Wspólne wydarzenia: n połączono” ([A10.6](A10-shared-events.md#A10.6)).
- **Od aplikacji 3.32.0:**
  - kopię zapasową **Przed scaleniem** kreator robi ze wszystkich wejść i zawsze, także przy wyłączonych
    automatycznych kopiach zapasowych ([A8.10](#A8.10), [S6.5](S6-tree-from-another-program.md#S6.5));
  - rozpoczęte scalanie zapisane na później rozpoznaje, że drzewo w międzyczasie się zmieniło: propozycje zostają
    przeliczone, rozstrzygnięte pary zostają ([A8.5](#A8.5));
  - karta **Co dalej** pokazuje się tylko po scaleniu, które zakłada nowe drzewo; po scaleniu do istniejącego drzewa
    sprawdzanie danych jest w kroku **Co się stało** (**Sprawdź drzewo**, [A8.11](#A8.11));
  - drzewo pamięta zapis swoich scaleń (wersja danych 26); starsze wersje aplikacji otwierają takie drzewo tylko do
    odczytu.

<!-- zdroj: app:src/merge/executor.ts:211 executeMerge (mergeSourceCatalogs, places, mergePlaceRecords, mergePlaceAliases, addSurnameGroup, delete defaultPersonId/defaultView) · src/merge/ui.ts countNewMergeIssues · strings.ts merge.preValidationWarning, merge.newIssues · git v1.19.0 (00e5d38) · 3.27.0: app:dde0151a src/merge/executor.ts sourceKey bez quality, takeCitationQuality, remapCitations; app:5721b016 unionCitations · 3.28.0: app:80c2ffb9 src/merge/* (shareId, Census ↔ census), strings.ts merge.sharedJoined -->

<a id="A8.5"></a>
## A8.5 Kreator Scalanie drzew

Każdy import drzewa genealogicznego do drzewa i każde scalenie dwóch drzew prowadzi jeden kreator w sześciu krokach.
Do drzewa nic się nie zapisuje, dopóki zapis nie zostanie potwierdzony w kroku **Co się stanie**.

| Skąd | Kreator | Obsługa |
|---|---|---|
| plik GEDCOM | **Import drzewa** | **Import → Import GEDCOM**; z Zarządzania drzewami zaczyna się opcją **Nowe drzewo** |
| inne drzewo | **Scalanie drzew** | Zarządzanie drzewami, ⋯ przy drzewie → **Scal z innym drzewem…** (celem jest otwarte drzewo) |
| osoby właśnie wyświetlone w widoku | **Scalanie drzew** | działania drzewa → **Scal widok z…** |
| zmiany wysłane z innego Stromu | **Otrzymane zmiany** | podgląd otrzymanych zmian → **Przejrzyj szczegółowo** |

- **Kroki:** **Co z tym** ([A8.6](#A8.6)), **Kto jest kim** ([A8.7](#A8.7)), **Kogo dodać** ([A8.8](#A8.8)), **Kto
  ma rację** ([A8.9](#A8.9)), **Co się stanie** ([A8.10](#A8.10)), **Co się stało** ([A8.11](#A8.11)). Krok, który
  dla wybranej drogi niczego nie rozstrzyga, zostaje pominięty, a kreator mówi to przy nim.
- Nad krokami stoją bieżące liczby osób importu: **Połączeni**, **Nowi**, **Niedodani** i **Do decyzji**; ich suma
  to liczba osób importu.
- Porównanie dużego drzewa pokazuje postęp i szacunek czasu. **Przerwij** nic nie gubi: wybory z kroku 1 zostają,
  a porównanie można uruchomić ponownie.
- Kreator zamknięty przed zapisem mówi „Jeszcze nic nie zapisano.”, a decyzje można **Zapisz na później**. Zapisane
  scalanie czeka w Zarządzaniu drzewami w **Niedokończone scalania**. Gdy drzewo docelowe w międzyczasie się
  zmieniło, kreator mówi to przy kontynuacji; propozycje zostają przeliczone, rozstrzygnięte pary zostają.
- Scalenie, które ostatnio się nie zakończyło (zamknięte okno, awaria), aplikacja zgłasza przy następnym otwarciu:
  drzewo i plik są bez zmian.
- **Granice:** plik GEDCOM do pustego drzewa nadal wstawia się przez **Wstaw do drzewa** bez kreatora
  ([A2](A2-loading-a-family-tree.md)). Scalenie dwóch osób jednego drzewa to inna sprawa
  ([A5.6](A5-tree-check.md#A5.6)).
- **Obowiązuje od:** aplikacja 3.32.0; wcześniej scalenie zawsze zakładało nowe drzewo ([A8.1](#A8.1))

<!-- zdroj: app:debf50cc (3.32.0) src/merge/ui.ts startMerge, repeatLine, resume, step6Env · src/merge/wizard-steps.ts stepInfo (přeskočené kroky) · src/merge/wizard-ui.ts title (titleImport, titleTrees, titleShare, titleCompare) · src/ui/import-export.ts openGedcomGuide (prázdný strom → showGedcomResultDialog), src/ui/merge-ui.ts (crashed, pendingMergeFound) · src/ui/share-ui.ts reviewChangePacketInMerge · strings.ts mergeWizard.steps, cntJoined, cntNew, cntSkipped, cntPending, cntTotal, comparing, comparingNote, stop, closeMsg, savedLater, resumeChanged, crashed, treeManager.mergeInto, menu.mergeViewInto, shareDiff.reviewDetail, merge.pendingMerges · CHANGELOG.cs.md 3.32.0 · dirigent:spec/134-bezpecne-slouceni-stromu §1–§13 · dirigent:test/vysledek-1123-scenare-app.md -->

<a id="A8.6"></a>
## A8.6 Krok 1: Co z tym

W pierwszym kroku wybiera się, co zrobić z importem, do którego drzewa i co stanie się z osobą, która już jest
w drzewie.

| Opcja | Co się dzieje |
|---|---|
| **Nowe drzewo** | powstaje nowe drzewo z osobami importu; nie będzie połączone z badaniem; istniejące drzewa zostają bez zmian |
| **Dodaj do drzewa** | osoby importu zostają dodane do wybranego drzewa (**Do którego drzewa**) |
| **Tylko porównaj** | przechodzi się te same kroki, ale nic się nie zapisuje; zestawienie można na końcu zapisać |
| **Zapisz jako JSON** | **Pobierz JSON** pobiera przekonwertowane dane jako plik `.json`; do drzewa nic się nie zapisuje |

- **Co z osobą, która już jest w drzewie** (przy **Dodaj do drzewa**):

  | Zakres | Przy połączonych osobach | Nowe osoby |
  |---|---|---|
  | **a) Tylko brakujące osoby** | nic się nie zmienia | zostają dodane |
  | **b) Brakujące osoby i puste dane** | uzupełniają się tylko puste dane | zostają dodane |
  | **c) Decyzja dana po danej** | różnice wybiera się w kroku 4 ([A8.9](#A8.9)) | zostają dodane |
  | **d) Tylko uzupełnij istniejące osoby** | dane według kroku 4 | nikt nowy nie zostaje dodany |

- **Drzewo nie przejmie:** to, czego aplikacja z pliku nie przejmie, jest wymienione z liczbą i przykładem; **Zapisz
  listę…** zapisuje listę. Nic z tego nie zginie po cichu.
- **Zamień** przy dwóch drzewach odwraca, co do czego się dodaje.
- Ten sam plik scalony do drzewa ponownie kreator rozpoznaje i mówi, ile osób jest nowych; osoby połączone ostatnio
  się nie podwajają. Dodają się więc tylko osoby, które ostatnio pominięto.
- **Granice:** celem nie może być drzewo zablokowane (odblokować można w Zarządzaniu drzewami) ani drzewo z nowszej
  wersji aplikacji. Drzewo, na którym właśnie działa śledzenie badania na żywo (◎ **Śledź agenta w drzewie**), jest
  tylko do odczytu; kreator proponuje przy nim **Wyłącz śledzenie i scal tutaj**: przed zapisem zapisze się kopia
  zapasowa, wysyłanie do badania zostanie wstrzymane, a zmiany trafią tam dopiero po wyborze w ostatnim kroku. Kopia
  drzewa badania i drzewo bez badania mogą być celem, nawet gdy gdzie indziej śledzi się na żywo. Z drzewa otwartego
  tylko do odczytu import jest możliwy tylko jako **Nowe drzewo**.
- **Obowiązuje od:** aplikacja 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step1-what.ts (mode, scope, notTaken, swap, repeat), src/merge/ui.ts repeatLine (isRepeatOf podle otisku souboru, importedBefore), src/merge/plan.ts:715–717 (d: updateOnly, a: joinedDetails none, b: empty) · strings.ts mergeWizard.modeNew, modeNewDesc, modeAdd, modeAddDesc, modeCompare, modeCompareDesc, modeJson, modeJsonDesc, btnJson, whichTree, existingWhat, scopeA–scopeD, scopeADesc–scopeDDesc, notTaken, notTakenNote, saveList, swap, repeat, blockLive, blockLiveAction, blockLocked, blockReadOnly, blockNewer · app:166fbffd, 5c4bcc0c (1123-134 bod 10: blokuje jen strom s běžícím sledováním, kopie stromu výzkumu jde; nabídka Vypnout sledování a sloučit sem) src/live-follow-block.ts · CHANGELOG.cs.md 3.32.0 („tentýž soubor sloučený znovu přidá jen osoby, které se minule vynechaly“) · spec 134 K0.7 -->

<a id="A8.7"></a>
## A8.7 Krok 2: Kto jest kim

Krok 2 pokazuje osoby importu w trzech grupach, a o każdej parze rozstrzyga człowiek. Połączenie, które się zapisze,
jest zawsze widoczne i można je cofnąć.

- **Grupy:** **Może ci sami** (wynik poniżej 80), **Ci sami** (wynik 80 i więcej, połączeni z góry) i **Nowi** (bez
  dopasowania). Wynik i powody dopasowania opisuje [A8.2](#A8.2).
- **Para:** osoba importu i osoba drzewa obok siebie w wierszach **Imię**, **Urodzenie**, **Zgon**, **Rodzice**,
  **Partnerzy**, **Dzieci** i **Dokumenty**, z **Dlaczego tak:** i **Co przeczy:**.
- **Decyzja:** **Ta sama osoba** (T), **Nowa osoba** (N), **Inna osoba…** (I, połączyć z inną osobą drzewa) i **Nie
  dodawaj** (X); ↑ ↓ przechodzi do następnej pary.
- Decyzja przelicza propozycje u krewnych; rozstrzygnięte pary się nie zmieniają.
- **Powtórne scalenie:** scalenie tego samego źródła drugi raz rozpoznaje osoby, które wniosło lub połączyło
  wcześniejsze, niecofnięte scalenie. Są w **Ci sami** z powodem „Już wcześniej scalono z tego źródła” i nic się
  nie dubluje.
- **Dlaczego tak** wymienia tylko to, co dają oba zapisy: „Dokładne imię i nazwisko oraz data urodzenia” tylko przy
  tej samej dacie urodzenia po obu stronach, przy zgodności samego roku „Imię i nazwisko oraz rok urodzenia”,
  w przeciwnym razie „Dokładne imię i nazwisko”.
- **Pozostałe nierozstrzygnięte** można załatwić naraz: **Dodaj jako nowe** (kreator ostrzega, że może to zdublować
  osoby, które już są w drzewie) albo **Nie dodawaj**. Dopóki zostaje nierozstrzygnięta para, kreator nie puszcza
  dalej.
- **Granice:** przy **Nowe drzewo** krok zostaje pominięty: wszystkie osoby są nowe.
- **Obowiązuje od:** aplikacja 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step2-who.ts pairRows (AUTO_CONFIRM_SCORE → same, jinak maybe), decisions, recalc, rest · src/merge/executor.ts AUTO_CONFIRM_SCORE = 80 · src/merge/wizard-steps.ts stepInfo (step2 skip newTree, person-pending blokuje) · strings.ts mergeWizard.grpMaybe, grpSame, grpNew, rows, whyYes, whyNo, decSame, decNew, decOther, decSkip, decKeys, keysHint, recalc, restLabel, restAdd, restSkip, restAddWarn, sameNote · spec 134 §4 · app:1046e99b (1123-134 N1, N3) strings.ts merge.matchReasons.merged_before, exact_name, exact_name_gender_birthdate, name_gender_birthyear -->

<a id="A8.8"></a>
## A8.8 Krok 3: Kogo dodać

Krok 3 wybiera, które nowe osoby zostaną dodane. Nowa osoba, której nic nie łączy z drzewem, nie zostanie dodana bez
decyzji.

- **Kogo bierze wybór:** **Wszyscy nowi**, **Tylko połączeni, do N kroków** (tylko osoby połączone z drzewem przez
  najwyżej N krewnych), **Przodkowie osoby…**, **Potomkowie osoby…** (z liczbą pokoleń), **Ród / nazwisko…**
  i **Ręcznie**. Wybór przodków, potomków albo rodu odznacza pozostałych nowych.
- **Nowi połączeni:** lista nowych osób ze ścieżką do drzewa („połączy się przez osobę …”), wyszukiwaniem, **Filtry**
  (**Nazwisko**, **Lata**, **Miejsce**, **Ze źródłem**, **Łączący**, **Żyjący**), **Pomiń żyjących (N)**
  i **Podglądem** gałęzi.
- Odznaczenie osoby, przez którą z drzewem łączą się inni, pyta: **Pomiń też ich**, **Zostaw jako niepołączonych**,
  **Zostaw osobę …** albo **Zostaw jako „?”** (w jej miejscu zostanie łączące „?” bez danych, a krewni zostaną
  połączeni).
- **Niepołączone grupy:** osoby bez ścieżki do osób drzewa, według rodów. Każda grupa wymaga decyzji: **Połącz
  z osobą…** (osoba grupy jest rodzicem, dzieckiem albo partnerem osoby drzewa), **Dodaj niepołączonych**, **Osobne
  drzewo** (po zapisie własne drzewo) albo **Nie dodawaj**. Nierozstrzygnięta grupa wstrzymuje zapis.
- **Granice:** powiązanie, które dałoby dziecku trzeciego rodzica, się nie zapisze. Zakres **d)** nikogo nowego nie
  dodaje i krok pomija. Przy **Nowe drzewo** krok bierze wszystkie osoby.
- **Obowiązuje od:** aplikacja 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step3-whom.ts, step3-model.ts, src/merge/plan-select.ts (scope d → 'scope', :392), src/merge/wizard-steps.ts (step3 skip allNew, group-pending) · strings.ts mergeWizard.vAll, vLinked, vAnc, vDesc, vRod, vManual, variants, pickAnc, pickDesc, pickRod, generations, tabLinked, tabGroups, linksVia, skipLiving, s3Tools, fSurname, fYears, fPlace, fSource, fLinking, fLiving, previewBtn, branchPreview, unlinkTitle, unlinkAll, unlinkLoose, unlinkKeep, unlinkQ, unlinkQDesc, groupsLead, gConnect, gLoose, gOwn, gSkip, relParent, relChild, relPartner, connectThird, groupsWhy · spec 134 §5, §6 -->

<a id="A8.9"></a>
## A8.9 Krok 4: Kto ma rację

Krok 4 rozstrzyga dane, które połączone osoby mają inaczej. Bez wyboru człowieka obowiązuje drzewo.

- **Reguły:** **Obowiązuje moje drzewo** (domyślnie), **Obowiązuje import**, **Zachowaj oba** (wartość importu
  zapisuje się obok, „Import podaje: …”), **Dokładniejsze, jeśli nie przeczy** i **Decyduj pojedynczo**.
- Regułę można nadać całemu scaleniu, rodzajowi danej (**Imię**, **Urodzenie**, **Zgon**, **Miejsca**, **Wydarzenia**,
  **Notatki**, **Zdjęcia**, **Płeć**, **Ślub**), osobie i jednej wartości. Węższa reguła ma pierwszeństwo: całość →
  rodzaj danej → osoba → wartość. Przy każdej regule widać, ile różnic zostanie, zmieni się albo zapisze obok.
- **Dane chronione:** danej w drzewie oznaczonej „udokumentowane”, „potwierdzone” albo „z badań” wybór zbiorczy nie
  zmieni; można ją zmienić tylko pojedynczo. Nadpisanie udokumentowanej danej pyta **Nadpisać udokumentowaną
  daną?**; po zapisie dana jest „Z drzewa”, a dokument zostaje przy osobie jako źródło.
- **Sprzeczności powiązań** (inni rodzice, drugi partner, inny ślub, trzeci rodzic, pętla przodek–potomek)
  rozstrzyga się zawsze pojedynczo: **Zostaw moje**, **Z importu** albo **Oba**. Pętla nigdy się nie zapisze.
- **Granice:** przy zakresie **a)** i **b)** krok zostaje pominięty; gdy są sprzeczności powiązań, pokazuje tylko je.
  Przy **Nowe drzewo** zostaje pominięty zawsze.
- **Obowiązuje od:** aplikacja 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step4-rules.ts (relOnly, s4SkippedTitle, protected), src/merge/plan.ts:438 relationConflicts, :534 (scope a), :542 (scope b jen prázdné) · src/merge/wizard-steps.ts step4 (newTree, scope a/b skip) · strings.ts mergeWizard.ruleAll, ruleOrder, rMine, rImport, rBoth, rPrecise, rEach, rDefault, importSays, kinds, protectedLine, protKinds, protTitle, protText, protAfter, relConf, relKinds, relAlways, keepMine, fromImport, both, loopNever, step4Skipped, s4SkippedTitle, relOnly · spec 134 §7, K0.3 -->

<a id="A8.10"></a>
## A8.10 Krok 5: Co się stanie i zapis

Krok 5 pokazuje całe zestawienie zmian według grup. Zapisuje się dopiero jego przyciskiem i tylko to, co pokazuje
zestawienie.

- **Zestawienie:** **Nowi**, **Połączeni**, **Zmiany danych**, **Pary i powiązania**, **Źródła**, **Miejsca**,
  **Zdjęcia i pliki**, **Niedodani** (przy każdej osobie dlaczego: krok i wybór) i **Nie zostanie przejęte**. Pozycję
  można odznaczyć. **Zapisz zestawienie…** zapisuje je do pliku.
- **Gdzie zapisać:** **Zapisz do …** albo **Zapisz do nowego drzewa** (kopia drzewa docelowego z importem; drzewo
  docelowe zostaje bez zmian).
- **Kopia zapasowa:** przed zapisem do drzewa powstaje kopia **Przed scaleniem**, zawsze, także przy wyłączonych
  automatycznych kopiach zapasowych. Zostaje, dopóki scalenie można cofnąć; rotacja kopii jej nie usunie. Gdyby nie
  było na nią miejsca, kreator pyta (**Zostaw obie (ponad limit)** albo **Usuń najstarszą inną kopię**). Bez kopii nic
  się nie zapisze: „Kopia się nie udała, więc nic nie zapisano.”
- **Zabezpieczenia:** gdy drzewo docelowe w międzyczasie się zmieniło, zestawienie zostaje przeliczone i nic nie
  zapisuje się na ślepo. Przed zapisem sprawdza się sumy i odwołania; gdy się nie zgadzają: „Sumy się nie zgadzają:
  nic nie zapisano.” Zamknięcie okna w trakcie zapisu niczego nie zepsuje: zapis się dokończy albo nic się nie zapisze.
- Zapis to jeden krok **Cofnij**.
- **Granice:** przy **Tylko porównaj** nic się nie zapisuje; zestawienie można zapisać. Kontrola nie liczy do **Zmiany
  danych** pustych danych uzupełnionych zakresem **b)**.
- **Obsługa:** przycisk „Dodaj N osób, zmień M danych”, przy nowym drzewie „Utwórz drzewo z N osobami”.
- **Obowiązuje od:** aplikacja 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step5-plan.ts (skupiny, retentionAsk, targetChanged), src/merge/write.ts (backupBeforeMerge keepFor, storageFull, badTotals, one undo step strings.undo.mergeTrees) · src/data.ts:2047 backupBeforeMerge (bez ohledu na automatické zálohy, keepFor mimo rotaci) · src/snapshots.ts planRetention (keepFor se nesmaže) · strings.ts mergeWizard.gNew, gJoined, gFields, gLinks, gSources, gPlaces, gMedia, gSkipped, gNotTaken, skipWhy, whereTo, writeInto, writeNew, writeNewDesc, backupLine, savePlan, btnWrite, btnNewTree, backupFailed, retentionAsk, keepBoth, dropOldest, targetChanged, replanned, writingSafe, badTotals · dirigent:test/vysledek-1123-scenare-app.md N1 (doplněná prázdná pole se v kroku 5 nepočítají) · spec 134 §8, K0.2, K0.4, K0.5 -->

<a id="A8.11"></a>
## A8.11 Krok 6: Co się stało i Historia scaleń

Po zapisie krok 6 mówi, co się stało, a scalenie zostaje w drzewie jako zapis, do którego można później wrócić.

- **Co się stało:** „Zapisano do drzewa …” i „Sumy się zgadzają: N osób w imporcie = połączone + nowe + niedodane”;
  kopia **Przed scaleniem** jest w Kopiach zapasowych.
- **Działania:** **Pokaż w drzewie**, **Zapisz jako listę osób** ([A11](A11-lists-of-people.md)), **Sprawdź drzewo**
  ([A5](A5-tree-check.md)) i **Cofnij scalenie…** ([A8.12](#A8.12)).
- Po scaleniu pliku innego programu do istniejącego drzewa karta **Co dalej** się nie pokazuje; sprawdzanie danych
  jest tutaj. Nowe drzewo z pliku innego programu kartę dostaje ([S6.4](S6-tree-from-another-program.md#S6.4)).
- **Historia scaleń:** każde scalenie do drzewa z datą, źródłem, liczbami (nowe, połączone, dane) i stanem
  **obowiązuje**, **częściowo cofnięte** albo **cofnięte**. Przy scaleniu **Otwórz zestawienie** i **Cofnij…**; w oknie
  także **Kopie…** i **Historia zmian…**. Całe drzewo przywracają kopie zapasowe; tu można cofnąć tylko to, co wniosło
  jedno scalenie.
- **Granice:** zapis scaleń drzewo nosi od wersji danych 26; starsze wersje aplikacji otwierają takie drzewo tylko do
  odczytu. Scaleń sprzed aplikacji 3.32.0 w historii nie ma.
- **Obsługa:** działania drzewa → **Historia scaleń…** (tylko przy drzewie, które ma scalenia); Zarządzanie drzewami,
  ⋯ przy drzewie → **Historia scaleń…**.
- **Obowiązuje od:** aplikacja 3.32.0

<!-- zdroj: app:debf50cc src/merge/steps/step6-done.ts (notes inHistory, noNextCard), src/merge/ui.ts step6Env (noNextCard = !newTree && gedcom) · src/ui/tree-actions.ts:199 menuHistory (jen se záznamy) · src/ui/merge-history-ui.ts · strings.ts mergeWizard.doneTitle, doneTotals, doneBackup, showInTree, saveAsList, checkTree, undoMerge, inHistory, noNextCard, menuHistory, histTitle, histLead, stValid, stPartial, stUndone, histCounts, openList, undoEllipsis, histBackups, histChanges · CHANGELOG.cs.md 3.32.0 (datová verze 26) · spec 134 §9 -->

<a id="A8.12"></a>
## A8.12 Cofnięcie scalenia

**Cofnij scalenie** bierze z powrotem tylko to, co wniosło jedno scalenie. Praca wykonana po scaleniu nie znika.

- **Co się cofa:** **Zostaną usunięte** nowe osoby scalenia z jego parami, źródłami, miejscami i plikami; **Zostaną
  przywrócone** zmienione dane do wartości sprzed scalenia; **Połączenia zostaną cofnięte**: osoby drzewa zostaną,
  tylko bez danych z importu.
- **Zostanie, bo od tego czasu się zmieniło:** osoba lub dana edytowana po scaleniu, dana potwierdzona, osoba z nowym
  krewnym, rzecz, na której opiera się późniejsze scalenie, i rzecz, którą cytuje coś, co zostaje. Przy każdej pozycji
  można wybrać **Zostaw** albo **Cofnij**.
- Obraz, który scalenie zastąpiło, przywraca tylko kopia **Przed scaleniem**. Kreator pokazuje też różnicę wobec
  przywrócenia kopii: kopia cofnęłaby też wszystko inne, co od scalenia stało się w drzewie.
- **Cofnij wszystko** albo **Wybierz tylko niektóre…** (cofa się tylko to, co jest zaznaczone). Częściowo cofnięte
  scalenie można cofać dalej. Cofnięcie robi kopię zapasową, jest w historii zmian i można je odwrócić (**Przywróć
  scalenie**).
- **Granice:** zablokowane drzewo można cofnąć po odblokowaniu w Zarządzaniu drzewami; drzewo tylko do odczytu, gdy
  będzie można je edytować. Gdy na scaleniu opiera się późniejsze scalenie, kreator to mówi. Cofnięcie scalenia, które
  jest już w badaniu, opisuje [A8.13](#A8.13).
- **Obsługa:** krok 6 → **Cofnij scalenie…**; **Historia scaleń…** → **Cofnij…**; przycisk „Usuń N osób”.
- **Obowiązuje od:** aplikacja 3.32.0

<!-- zdroj: app:debf50cc src/merge/undo-plan.ts, src/merge/undo-view.ts, src/ui/merge-history-ui.ts (zápis se zálohou write.ts writeUndo, AuditLogManager, toast s redo) · strings.ts mergeWizard.undoTitle, undoLead, uRemove, uRestore, uUnjoin, uRemoveDesc, uRestoreDesc, uUnjoinDesc, uKeepHead, uEdited, uProven, uRelative, uLaterMerge, uUsed, uPicture, segKeep, segUndo, vsBackup, pickSome, pickAll, pickLead, btnUndo, builtOn, partlyDone, lockedUndo, undoReadOnly, undoNothing, undone, redo · spec 134 §10 -->

<a id="A8.13"></a>
## A8.13 Scalenie do drzewa z badaniem

Do drzewa połączonego z badaniem scalenie zapisuje się w aplikacji, a do badania nic nie trafia samo. O wysłaniu
rozstrzyga człowiek w kroku 6.

- Połączenie drzewa z badaniem zostaje. Nowe osoby i powiązania czekają w aplikacji („niewysłane do badań · N osób”),
  dopóki nie zostanie wybrane **Wyślij do badań…** albo **Na razie zostaw w aplikacji**.
- Do badania dane trafiają jako „Z drzewa (niezweryfikowane)”, nigdy jako udokumentowane. Osoby badania zachowują
  numery, stan danych i cytaty. Badanie dostaje zmiany przez most; agent nie jest uruchamiany. Gdy agent właśnie
  pracuje, wysłanie czeka na koniec jego kroku.
- Badanie w starszej wersji nie zna wysyłania po scaleniu: całe drzewo wysyła się przez **Co zostanie wysłane**
  ([S1](S1-connecting-app-and-research.md)).
- **Cofnięcie przed wysłaniem:** badanie nic nie dostaje. **Po wysłaniu:** badanie samo osób nie usuwa. Aplikacja
  cofa od razu i podaje krok w terminalu badania (`strom sync undo I…` z **Kopiuj**) albo odsyła do pomocy **Osoba
  usunięta w aplikacji** ([S2.6](S2-edits-from-the-app.md#S2.6)). Do tego czasu badanie przy następnej wersji
  przywróci osoby, a aplikacja zaproponuje ich usunięcie.
- **Granice:**
  - **Nowe drzewo** z importu nie będzie połączone z badaniem;
  - gdy z badaniem jest połączone źródło, a cel nie, połączenie nie przechodzi do celu; kreator proponuje **Zamień**;
  - gdy połączone są oba drzewa, powiązanie ani numery źródła nie przechodzą, a osoby źródła są w badaniu celu nowe;
  - gdy te same osoby są też w innym drzewie połączonym z badaniem, kreator na to zwraca uwagę.
- **Obowiązuje od:** aplikacja 3.32.0

<!-- zdroj: app:debf50cc src/merge/ui.ts step6Research (mergeHold, unsentMerges), src/merge/research-hold.ts, research-marks.ts, same-people.ts · strings.ts mergeWizard.researchKept, resStep5, resPending, sendRes, keepLocal, notSent, resSendLead, resSendNote, resSent, resUndoStep, resUndoHelp, resUndoHelpLink, resComesBack, copy, resAgent, resOld, resNewTree, resSwap, resSwapBtn, resTwo, resSamePeople, modeNewDesc · src/help/topics.ts:38 HELP_LINKS.mergeUndoResearch = 'S2.6' · undoResearchStep (jen záznam I\d+) · research:src/commands/sync.ts:627 sync undo · spec 134 K9.1–K9.6 -->
