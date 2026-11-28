<a id="S11"></a>
# S11 Ochrona osób żyjących

Dane osób żyjących opuszczają drzewo w plikach, na papierze i w udostępnieniach. Aplikacja i badanie rozróżniają dwa
rodzaje wyników. Wynik **na zewnątrz** (plik lub papier, który wychodzi z rąk, do innej osoby lub do innego programu)
zawsze przechodzi przez jedną ochronę osób żyjących: tę samą regułę, kto żyje, te same tryby w tej samej kolejności
i ten sam tryb domyślny z Ustawień. Wynik **dla siebie** (kopia zapasowa, przeniesienie, własny program
genealogiczny) celowo zawiera pełne dane i mówi o tym jednym zdaniem. Rozdział opisuje aplikację Strom 3.33.0
i badanie 1.38.0.

| Wynik | Rodzaj | Gdzie |
|---|---|---|
| **Aplikacja z danymi (HTML)**, **GEDCOM › Do udostępnienia innym**, **Tabela osób (CSV)** | na zewnątrz | [S11.4](#S11.4), [A7.7](A7-book-pages-and-export.md#A7.7), [S6.6](S6-tree-from-another-program.md#S6.6) |
| **Wyślij rodzinie** i paczka zmian | na zewnątrz | [S11.4](#S11.4) |
| **Plakat** | na zewnątrz | [S11.4](#S11.4) |
| **Księga rodu**, **Połączone strony** | na zewnątrz | [A7.4](A7-book-pages-and-export.md#A7.4), [A7.5](A7-book-pages-and-export.md#A7.5) |
| okno **Strony rodu** i jego wydruk | na zewnątrz | [S11.4](#S11.4) |
| **Strona osoby**: okno, wydruk, **Zapisz jako HTML** | na zewnątrz | [S11.4](#S11.4), [A7.6](A7-book-pages-and-export.md#A7.6) |
| **Zapisz stronę domu** | na zewnątrz | [S10.3.2](S10-houses.md#S10.3.2) |
| eksport Tabeli (CSV, XLSX), CSV listy | na zewnątrz | [A6.7.9](A6-views.md#A6.7.9), [A11.9](A11-lists-of-people.md#A11.9) |
| **Podarować rodowód** | na zewnątrz | [A7.9.2](A7-book-pages-and-export.md#A7.9.2) |
| badanie: `strom export gedcom --living` | na zewnątrz | [S11.7](#S11.7) |
| **Kopia zapasowa danych (JSON)**, **Zapisz do pliku**, **Kopie zapasowe** | dla siebie | [S11.5](#S11.5), [S6.5](S6-tree-from-another-program.md#S6.5) |
| **GEDCOM › Z powrotem do {program}**, GEDCOM dla badania | dla siebie | [S11.5](#S11.5), [S6.6](S6-tree-from-another-program.md#S6.6) |
| badanie: `output/tree.ged`, `strom pack` | dla siebie | [S11.5](#S11.5) |

- **Granice:** kanały wewnętrzne nie są wynikiem i ochrona ich nie dotyczy: most między aplikacją a badaniem, telefon
  w sieci i agenci badania.

<!-- zdroj: dirigent:spec/151-soukromi-zijicich-ve-vystupech (Princip 1–4, Kde se to ukáže) · app:61f9b492, 11d35186, 47500acc, fe52bfb2, bda4fd2c, fbc447a0, 355a550d, 51223455, 0ad8f5e9 (ověřeno na 988b0f86) · src/privacy.ts applyOutputPrivacy · src/ui/privacy-block.ts privacyBlockHtml · strings.ts privacy.label · CHANGELOG.pl.md aplikace 3.33.0 · research:ccfe4110, 8a0fed12 src/gedcom/privacy.ts, src/commands/output.ts · CHANGELOG.pl.md výzkumu 1.38.0 -->

<a id="S11.1"></a>
## S11.1 Kto jest osobą żyjącą

Dla wszystkich wyników aplikacji i badania obowiązuje jedna reguła. Rozstrzyga w tej kolejności:

1. Osoba oznaczona ręcznie jako zmarła (**Nie żyje**) jest zmarła. Osoba, której ręcznie odznaczono **Nie żyje**,
   jest żyjąca.
2. Osoba z zapisem o śmierci jest zmarła: data, miejsce, adres, przyczyna lub wiek w chwili śmierci, albo pogrzeb
   lub kremacja. Pogrzeb lub kremacja bez daty śmierci oznacza więc osobę zmarłą.
3. Osoba bez żadnej wskazówki co do roku urodzenia jest żyjąca (bezpieczny wybór).
4. W przeciwnym razie jest żyjąca, gdy od jej najpóźniejszego możliwego roku urodzenia minęło mniej niż 110 lat.

- **Najpóźniejszy możliwy rok urodzenia:**
  - każda data liczy się według najpóźniejszego roku, jaki może oznaczać: przedział według swojego końca, „po roku X”
    nie daje granicy;
  - własne daty i wydarzenia osoby;
  - początek związku i jego wydarzenia (zapowiedzi, spis mieszkańców): co najmniej 14 lat wcześniej. Koniec związku
    (wniesiony rozwód, unieważnienie) się nie liczy;
  - dzieci: rodzic jest co najmniej 12 lat starszy od dziecka, przez wszystkie pokolenia.
- **Badanie** ocenia tak samo według pełnego pliku GEDCOM całego drzewa: śmiercią jest każdy wiersz `DEAT`, `BURI`
  lub `CREM`; wskazówkami są datowane fakty osoby (oprócz `CHAN` i własnych tagów `_`), fakty rodziny `FAM` (oprócz
  `DIV`, `DIVF`, `ANUL`) i dzieci. Ręczne **Nie żyje** trafia do pliku jako śmierć; ręcznie odznaczonego **Nie żyje**
  plik nie zawiera. Aplikacja i badanie mają w testach wspólną tabelę przypadków.
- **Granice:**
  - znak † przy osobie w drzewie to inna reguła (przypuszczalnie zmarła po 120 latach) i nie steruje ochroną;
  - badanie ma do sterowania własną pracą (osób żyjących się nie bada) własną regułę 100 lat; do wyników się nie
    stosuje;
  - osoba zastępcza nie liczy się do osób żyjących.
- **Obsługa:** pole **Nie żyje** przy edycji osoby; przy dodawaniu krewnego zaznacza się samo po wypełnieniu daty lub
  miejsca śmierci. Pomoc bloku ochrony streszcza regułę.
- **Obowiązuje od:** aplikacja 1.2.0 (wcześniej jako [A7.1](A7-book-pages-and-export.md#A7.1)); pogrzeb i kremacja
  jako śmierć, przedziały dat według końca i badanie: aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:61f9b492 src/privacy.ts isLivingPerson (isDeceased true/false, hasDeathRecord, bez meze = žijící, ASSUMED_MAX_AGE 110), inferBirthUpperBounds (latestYearOf, UNION_END_EVENTS, MIN_MARRIAGE_AGE 14, MIN_PARENT_AGE 12, fixpoint), countLivingPersons (bez isPlaceholder), presumedDeceasedSet · src/ui/person-modal.ts:2118 (deceasedToggled → isDeceased) · src/ged-exporter.ts:1892 (isDeceased true) · strings.ts privacy.who, person.deceased · research:ccfe4110 src/gedcom/privacy.ts ASSUMED_MAX_AGE, MIN_PARENT_AGE, MIN_MARRIAGE_AGE, latestYear, OWN_FACT, ENDS, livingOf · src/core/review.ts livingBorn, DEATH_AFTER_YEARS (beze změny) · test/fixtures/living-rule-cases.json (obě repa) -->

<a id="S11.2"></a>
## S11.2 Tryby ochrony

Każdy wynik na zewnątrz oferuje te same cztery tryby w tej samej kolejności.

| Tryb | Imię i nazwisko osoby żyjącej | Co zostaje |
|---|---|---|
| **Pełne dane** | bez zmian | wszystko |
| **Inicjały + rok urodzenia** | inicjały imienia i nazwiska; nazwisko po ślubie tylko jako inicjał | rok urodzenia |
| **Tylko nazwisko** | „Osoba żyjąca” i nazwisko | – |
| **Ukryj imiona i nazwiska** | „Osoba żyjąca” bez nazwiska | – |

- **Co tryb inny niż Pełne dane zabiera osobom żyjącym:** daty, miejsca, adresy, wiek i przyczynę; notatki,
  opowieści, zdjęcie i oryginał portretu; wydarzenia, cytaty, warianty imion, tytuły, nazwiska po ślubie, otwarte
  pytanie, e-maile, REFN, dane badania i zapis o dodaniu i zmianach.
- **Pary:** związek, w którym żyje co najmniej jeden z partnerów, traci daty, miejsce, adres, wiek, notatkę,
  świadków, opowieści, cytaty, wydarzenia i zdjęcie pary. Inicjały zachowują rok początku związku.
- **Zmarli:** zostają w całości we wszystkich wynikach i przy każdym trybie, także ze źródłami, cytatami
  i załącznikami. Źródło cytowane tylko przez osobę żyjącą odpada; załączniki osób żyjących i ich związków odpadają.
- **Dalej:** historia scaleń nie trafia do chronionego wyniku; dom, w którym mieszkali ludzie z ostatnich ok. 100 lat,
  traci swoją nazwę ([S10.3.2](S10-houses.md#S10.3.2)).
- **Granice:** struktura zostaje zawsze: osoby, pokrewieństwa i płeć. Tekst opowieści nie jest przepisywany: opowieść
  osoby żyjącej odpada razem z jej danymi, opowieścią o domu steruje przełącznik wyniku
  ([S10.14.2](S10-houses.md#S10.14.2)).
- **Obsługa:** blok **Ochrona osób żyjących** w oknie dialogowym wyniku: nagłówek, skąd pochodzi tryb
  ([S11.3](#S11.3)), pomoc **?**, cztery wybory i zdanie trybu z „Zmarli pozostają w całości, także ze źródłami.” Na
  telefonie wybory mają krótkie nazwy (**Pełne dane**, **Inicjały**, **Nazwisko**, **Bez imion**).
- **Obowiązuje od:** aplikacja 1.2.0 (wcześniej jako [A7.2](A7-book-pages-and-export.md#A7.2)); jednolite nazwy,
  kolejność i źródła zmarłych we wszystkich wynikach aplikacja 3.33.0

<!-- zdroj: app:61f9b492 src/privacy.ts PRIVACY_ORDER, privacyModeLabel, stripDetails, stripPartnershipDetails, applyLivingPrivacy (merges, house name, keepDeceasedSources) · fe52bfb2 applyOutputPrivacy (keepDeceasedSources: true všude) · src/ui/privacy-block.ts privacyBlockHtml, privacyDescText · strings.ts privacy.label, modeFull, modeInitials, modeMinimal, modeAnonymous, short, desc.*, deceasedStay, livingPerson · dirigent:spec/151 K1.2, K1.4, Mimo rozsah (vyprávění) -->

<a id="S11.3"></a>
## S11.3 Domyślna ochrona z Ustawień

Wszystkie wyniki na zewnątrz mają jeden tryb domyślny: **Ustawienia › Dane i prywatność › Ochrona osób żyjących
w eksportach**, domyślnie **Inicjały + rok urodzenia**. Wybór w oknie dialogowym dotyczy tego jednego wyniku.

- **Wstępnie go wypełnia** eksport (HTML, GEDCOM do udostępnienia, CSV), **Wyślij rodzinie**, plakat, eksport Tabeli
  i zapis strony domu. Blok mówi wtedy przy nagłówku „domyślnie z Ustawień” z linkiem do Ustawień; po zmianie ręcznej
  to znika.
- **Wybór dla każdego drzewa pamiętają** księga rodu i połączone strony (wspólnie), strona osoby i prezent. Gdy
  drzewo nie ma jeszcze wyboru, księga, strony i strona osoby biorą tryb domyślny z Ustawień. Zapamiętany wybór ma
  przy nagłówku „ostatnio dla tego drzewa”.
- **Okno Strony rodu** zaczyna od wyboru księgi i stron drzewa, w przeciwnym razie od trybu domyślnego z Ustawień.
  Zmiana w oknie dotyczy tylko okna i nie jest zapisywana z powrotem.
- **Plakat** przy pierwszym otwarciu bierze tryb domyślny z Ustawień, a potem trzyma ostatni wybór, dopóki strona
  jest otwarta.
- **Prezent** zawsze zaczyna od **Inicjały + rok urodzenia** (nie z Ustawień) i pamięta wybór przy osobie lub parze
  na tym urządzeniu ([A7.9](A7-book-pages-and-export.md#A7.9)).
- **Bez osób żyjących:** gdy w wyniku nie ma żadnej osoby żyjącej, blok jest zwinięty do zdania „W tym eksporcie nie
  ma osób żyjących.” i wynik idzie z pełnymi danymi. Strona osoby bez osób żyjących zaczyna od Pełne dane.
- **Granice:** kopie zapasowe i przeniesienia zostają pełne, Ustawienia nimi nie sterują ([S11.5](#S11.5)). Położenie
  domów ma własne ustawienie **Położenie domów w wynikach** ([S10.3.4](S10-houses.md#S10.3.4)).
- **Obsługa:** **Ustawienia › Dane i prywatność › Ochrona osób żyjących w eksportach**; link „Ustawień” w bloku
  ochrony.
- **Obowiązuje od:** aplikacja 3.33.0; tryby domyślne według wyniku wcześniej w
  [A7.2.1](A7-book-pages-and-export.md#A7.2.1)

<!-- zdroj: app:61f9b492 src/settings.ts getOutputPrivacy (výchozí initials), index.html output-privacy-setting · src/ui/privacy-block.ts originHtml (settings | tree), noLiving · strings.ts privacy.settingTitle, settingDesc, originSettings, originSettingsLink, originTree, noLiving · src/ui/encryption-ui.ts exportPresetPrivacy, exportPrivacyTouched · bda4fd2c src/ui/share-ui.ts, src/ui/export-image-ui.ts posterPrivacyChoice, src/ui/gift-tree-ui.ts (defaultGiftPrivacy others initials, originTree) · 355a550d src/ui/book-ui.ts:1262 (strom.book.{treeId}, jinak Nastavení), src/ui/family-pages-ui.ts windowPagesPrivacyPreset, src/ui/person-page-ui.ts:718, src/person-page.ts personPageExportPrivacy · 51223455 src/ui/house-page-ui.ts:578 · fbc447a0 src/ui/table-view/table-ui.ts showTableExport -->

<a id="S11.4"></a>
## S11.4 Wyniki na zewnątrz

Każdy wynik na zewnątrz ma blok **Ochrona osób żyjących** ([S11.2](#S11.2)) z trybem domyślnym według
[S11.3](#S11.3). Szczegóły okien dialogowych są przy wynikach; tu tylko to, co się gdzie różni.

- **Eksport:** **Aplikacja z danymi (HTML)**, także **Eksportuj jako aplikację** dla wszystkich drzew, **GEDCOM › Do
  udostępnienia innym** i **Tabela osób (CSV)**. Osoby żyjące liczy się w zakresie eksportu (całe drzewo, widok,
  lista, rodowód osoby). Wybór ręczny zostaje także po zmianie formatu ([A7.7](A7-book-pages-and-export.md#A7.7),
  [S6.6](S6-tree-from-another-program.md#S6.6)).
- **Wyślij rodzinie:** tryb domyślny z Ustawień przy każdym otwarciu; osoby żyjące liczy się w zakresie (całe drzewo,
  gałąź, osoba). Zakres **Tylko zmiany od ostatniego udostępnienia** nie ma wyboru: paczka zmian idzie z tą samą
  ochroną co pierwotne udostępnienie („Zmiany są udostępniane z tą samą ochroną co pierwotne udostępnienie:
  {tryb}.”). Gdy pierwotna ochrona nie jest znana (udostępnienie ze starszej wersji), obowiązuje tryb domyślny
  z Ustawień i okno to mówi.
- **Plakat:** okno **Eksport jako plakat** (SVG, PNG, Drukuj / PDF). Osoby żyjące liczy się wśród osób plakatu. Znak
  † i kolory linii rodowych pochodzą z chronionych danych: † mają tylko osoby, które reguła [S11.1](#S11.1) uważa za
  zmarłe.
- **Księga rodu** i **Połączone strony:** osoby żyjące liczy się w całym drzewie. Okładka chronionej księgi mówi
  „Dane osób żyjących są skrócone.”; przy Pełne dane strony ostrzegają, że będą zawierać dane osób żyjących
  ([A7.4](A7-book-pages-and-export.md#A7.4), [A7.5](A7-book-pages-and-export.md#A7.5)).
- **Okno Strony rodu:** wybór w pasku okna **Ochrona: {tryb} ▾** (na telefonie pierwsza pozycja **⋯**), tylko gdy
  w oknie są osoby żyjące. Okno i wydruk pokazują według niego strony.
- **Strona osoby:** okno ma ten sam wybór w pasku przed **Drukuj**; okno i wydruk za nim idą („Okno i wydruk z okna
  według tego wyboru. Wstępnie z zapisu strony osoby.”). **Zapisz jako HTML** ma blok za nazwą pliku, a pod nim
  wiersz, kogo dotyczy („Dotyczy tylko osób żyjących: …”) ([A7.6](A7-book-pages-and-export.md#A7.6)).
- **Drukuj** z okna Strony rodu i ze strony osoby ma pod chronionymi stronami stopkę „… · chronione: {tryb} ·
  strona N”, tylko gdy są na nich osoby żyjące.
- **Zapisz stronę domu:** imiona i nazwiska osób żyjących i ludzi z ostatnich ok. 100 lat według trybu
  ([S10.3.2](S10-houses.md#S10.3.2)).
- **Eksport Tabeli** (CSV, XLSX) i **CSV listy:** wiersz osoby żyjącej zostaje; ma imię i nazwisko według trybu, rok
  urodzenia tylko przy Inicjałach i kolumny **#** i **Gotowe**, pozostałe kolumny są puste („Osoby żyjące: imię
  według ochrony, pozostałe kolumny puste.”). Chroniony XLSX nie ma kolorów ani komentarzy ustaleń. Tabela na ekranie
  się nie zmienia ([A6.7.9](A6-views.md#A6.7.9), [A11.9](A11-lists-of-people.md#A11.9)).
- **Podarować rodowód:** te same nazwy i ta sama kolejność trybów dla **Pozostali żyjący**; gospodarstwo domowe
  obdarowanego i wyjątki idą w całości ([A7.9.2](A7-book-pages-and-export.md#A7.9.2)).
- **Chroniony plik** (HTML, JSON, GEDCOM) nosi oznaczenie, ilu osób żyjących chroni ([S11.6](#S11.6)).
- **Granice:** bez osób żyjących w wyniku wszystko idzie z pełnymi danymi i nie ma oznaczenia.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:11d35186, fe52bfb2 src/ui/encryption-ui.ts exportPresetPrivacy, exportLivingCount, src/ui/import-export.ts:589 (applyLivingPrivacy, privacyMarkFor) · bda4fd2c src/ui/share-ui.ts (getBaselinePrivacy ?? Nastavení), strings.ts share.samePrivacy, share.privacyUnknown, share.scopeChanges · src/ui/export-image-ui.ts posterPrivacyMode, :475 (deceased = !living) · 355a550d src/ui/book-ui.ts, strings.ts book.coverProtected, familyPages.privacyWarn · src/ui/family-pages-ui.ts winPrivacy, windowSetLiving · src/ui/person-page-ui.ts pv-compact, strings.ts privacy.compactPrefix, windowLine, personPage.privacyWho · 0ad8f5e9 src/ui/privacy-block.ts windowPrintFooterCss, privacy.printProtected, printPage · 51223455 src/ui/house-page-ui.ts · fbc447a0 src/ui/table-view/table-privacy.ts protectTableExport (LIVING_KEPT, checks null), table-ui.ts exportPersonListCsv, strings.ts table.exportPrivacyWhat, exportListTitle · src/ui/gift-tree-ui.ts (PRIVACY_ORDER, privacyModeLabel) -->

<a id="S11.5"></a>
## S11.5 Wyniki dla siebie

Wyniki do kopii zapasowej i przeniesienia zawierają pełne dane wszystkich osób, także żyjących. Gdy drzewo ma osoby
żyjące, mówią to jednym zdaniem: „Zawiera wszystkie dane osób żyjących – do własnej kopii lub przeniesienia, nie do
udostępniania.”

- **Kopia zapasowa danych (JSON)** i **Eksportuj wszystkie drzewa › Eksportuj jako JSON:** zaczynają od **Pełne
  dane** bez pochodzenia i ze zdaniem; blok można zmienić. Chroniona kopia zapasowa nosi oznaczenie
  ([S11.6](#S11.6)).
- **Kopie zapasowe** (okno **Historia kopii zapasowych**): zdanie pod oknem, gdy drzewo ma osoby żyjące
  ([S6.5](S6-tree-from-another-program.md#S6.5)).
- **GEDCOM › Z powrotem do {program}:** bez bloku ochrony; zamiast niego zdanie i liczba: „Plik zawiera dane N
  żyjących osób. Należy tylko do własnego programu.” ([S6.6](S6-tree-from-another-program.md#S6.6)).
- **GEDCOM dla badania:** **Wysyłanie zmian do badania › Eksportuj GEDCOM** ma zdanie w potwierdzeniu.
- **Zapisz do pliku** (szybki zapis, Ctrl+S) się nie zmienia: pełny JSON bez bloku i bez zdania
  ([S8.1](S8-where-the-data-are.md#S8.1)).
- **Badanie:** `strom export gedcom` zapisuje pełny `output/tree.ged` (i plik dla aplikacji Strom) jak dotąd
  i wypisuje zdanie; `strom pack` wypisuje zdanie także. Mówi to pomoc obu poleceń.
- **Granice:** w aplikacji zdanie pojawia się tylko przy drzewie z osobami żyjącymi; badanie wypisuje je przy każdym
  pełnym pliku.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:47500acc src/ui/encryption-ui.ts isSelfFormat (json, all), exportPresetPrivacy (full, origin null), :853 self · src/ui/export-gedcom-ui.ts:196 export-back-living (selfOnly + exportGed.livingNote) · index.html:40323 snapshots-self, src/ui/snapshots-ui.ts:76 · src/ui/research-ui.ts:3388 offerResearchGedcom selfLine · strings.ts privacy.selfOnly, exportGed.livingNote, research.sendHowTitle, sendExportGedcom · research:ccfe4110 src/commands/output.ts (ui.living.all u plného souboru), src/commands/pack.ts, assets/lang/pl.json ui.living.all · dirigent:spec/151 K3.1 -->

<a id="S11.6"></a>
## S11.6 Chroniony plik i jego import

Plik z ochroną osób żyjących mówi, jakim trybem powstał i ilu osób żyjących chroni. Taki plik nigdy nie jest źródłem
zmian drzewa: brakujące dane osób żyjących wyglądałyby na usunięte.

- **Oznaczenie:** GEDCOM w nagłówku `1 _STROM_PRIVACY initials|surname|hidden` i `2 _LIVING N`; JSON i dane pliku HTML
  pole `privacy` (`mode`, `living`). W pliku tryby nazywają się jak w badaniu: Tylko nazwisko `surname`, Ukryj imiona
  i nazwiska `hidden`. Pełne dane i wynik bez osób żyjących nie mają oznaczenia. Chroniony plik nigdy nie zawiera
  połączenia z badaniem.
- **Import w aplikacji:**
  - podsumowanie importu GEDCOM, **Importuj jako nowe drzewo** i krok 1 kreatora scalania mówią: „Plik jest chroniony
    ({tryb}): brakuje w nim danych N osób żyjących.”;
  - kreator zaczyna od wyboru **Nowe drzewo**; nowe drzewo nazywa się „{plik} (kopia chroniona)”;
  - przy **Dodaj do drzewa** krok 1 dodaje „Osoby żyjące zostaną dodane jako chronione (bez danych).” Połączona
    chroniona osoba nie nadpisuje w drzewie imion, nazwisk ani dat;
  - połączenie pliku JSON z badaniem nie jest przejmowane;
  - chroniony plik badania nigdy nie otwiera się jako drzewo badania ani go nie aktualizuje, a śledzenie na żywo go
    odrzuca; trafia tylko do kreatora importu ([A2.1.1](A2-loading-a-family-tree.md#A2.1.1),
    [A8.6](A8-merging-trees.md#A8.6)).
- **Badanie:**
  - `strom sync` odrzuca chroniony GEDCOM i JSON aplikacji z polem `privacy`: „{plik} to plik z ochroną osób żyjących
    ({tryb}): brakuje w nim danych N osób żyjących — nigdy źródło zmian”, z radą, by wziąć pełny eksport z aplikacji;
  - `strom intake` odkłada go tylko jako materiał i nie przejmuje go do drzewa.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:47500acc src/privacy.ts PrivacyMark, PRIVACY_MARK_FIELD, privacyFileMode, parsePrivacyFileMode, readPrivacyMark, privacyMarkFor, privacyMarkJson, protectedPersonIds · src/ged-exporter.ts _STROM_PRIVACY, _LIVING · src/ged-parser.ts:5661 privacyMarkOf · src/ui/import-export.ts:607 (bez research), :818 openGedcomGuide protectedImport, :977 gedcom-protected, :1436 pendingImportPrivacy (bez research), :1500 protectedCopyName, :1930 import-tree-protected · src/merge/ui.ts:233 (initialMode new), :726 protectedIds · src/merge/plan.ts:306, :496 · src/merge/write.ts:106 newTreeName · src/merge/steps/step1-what.ts merge-s1-protected, merge-s1-protected-merge · src/ui/research-ui.ts:2869, :4394, :4990 header.protected · strings.ts privacy.importProtected, importProtectedMerge, protectedCopyName · research:ccfe4110 src/gedcom/privacy.ts jsonPrivacyOf, treeFilePrivacyOf · src/core/sync.ts:1738 tree.protected · src/commands/intake.ts:328 ui.intake.protected · assets/lang/pl.json ui.error.tree.protected -->

<a id="S11.7"></a>
## S11.7 Ochrona w plikach badania

`strom export gedcom` zapisuje jak dotąd pełne pliki do `output/`. Plik do udostępnienia z ochroną osób żyjących
powstaje z opcją `--living` lub według ustawienia `gedcom.living`.

- **Tryby:** `--living initials` (inicjały + rok urodzenia), `surname` (tylko nazwisko), `hidden` (ukryte imiona
  i nazwiska), `full` (pełne dane); działają też nazwy aplikacji `minimal` i `anonymous`. Samo `--living` bierze
  ustawienie `gedcom.living`, a gdy jest pełne, `initials`. Nieznany tryb jest błędem.
- **Co zawiera chroniony plik:**
  - osoba żyjąca imię i nazwisko według trybu, płeć i powiązania; przy Inicjałach rok urodzenia;
  - rodzina z żyjącym partnerem partnerów, dzieci i fakt ślubu lub rozwodu; przy Inicjałach rok ślubu;
  - na osobę żyjącą nie wskazuje żaden inny rekord; źródło cytowane tylko przez osoby żyjące jest pomijane;
  - zmarli są tacy, jacy byli;
  - nagłówek ma oznaczenie ([S11.6](#S11.6)) i nie ma połączenia z badaniem.
- **Dokąd trafia:**
  - bez `--out`: `output/tree-<tryb>.ged` (z `--research G…` `output/G…-<tryb>.ged`, dla aplikacji
    `…-strom-<tryb>.ged`). Takie pliki są w `.gitignore` i nigdy nie trafiają do historii badania;
  - `--out <plik>` poza folder badania; chroniony plik w inne miejsce folderu badania jest błędem („plik z ochroną
    osób żyjących trafia do folderu badania tylko jako {file} (nigdy do historii)”). Ścieżka do własnego pliku
    w `output/` w innym zapisie (wielkie litery, link) jest zapisywana jako ten plik.
- **Ustawienie `gedcom.living`** („Ochrona osób żyjących w plikach GEDCOM na zewnątrz”, domyślnie pełne dane):
  - `--out` bez `--living` zapisuje według niego;
  - gdy nie jest pełne, `strom export gedcom` bez `--out` i `--living` zapisuje obok pełnych plików także chroniony.
- **Wypis:** przy chronionym pliku „chronione: N osób żyjących ({tryb})”. Przy pełnym pliku zdanie z [S11.5](#S11.5)
  i wskazówka „→ plik do udostępnienia z ochroną osób żyjących: strom export gedcom --living”, gdy chroniony nie
  powstał.
- **`--research G…`** daje tylko osoby jednego badania: osobę centralną, jej przodków i partnerów. Pomija rodzeństwo
  i boczne gałęzie. Osoby żyjące chroni tylko `--living`; obie opcje działają razem.
- **Granice:** `output/tree.ged` zostaje pełny i w historii jak dotąd. Aplikacja niczego z tego nie wywołuje; dotyczy
  to tylko terminala.
- **Obsługa:** terminal: `strom export gedcom --living [tryb]`, `--out`; `strom config set gedcom.living <tryb>`
  (także `--for-tree`, zmienna `STROM_GEDCOM_LIVING`); przykłady `strom export gedcom --living --out
  ~/Desktop/horakovi.ged` i `strom export gedcom --for standard --living surname`.
- **Obowiązuje od:** badanie 1.38.0

<!-- zdroj: research:ccfe4110 src/gedcom/privacy.ts LIVING_MODES, MODE_ALIASES, livingModeOf, protectGedcom · src/commands/output.ts gedFile (-<režim>), IGNORE (output/*-<režim>.ged), export gedcom (setting, living, beside, holdsPath, pathForms, export.living.in-tree, export.living.mode, inTree bez living, ui.export.living, ui.living.all, ui.export.living.hint), help --research, --living, --out · 8a0fed12 (vlastní soubor output/ pod jiným zápisem, odkazy) · src/core/config.ts:376 gedcom.living (STROM_GEDCOM_LIVING, tree, výchozí full) · src/core/phrases.ts log.setting.name.gedcom.living · assets/lang/pl.json ui.living.mode.*, ui.error.export.living.in-tree · strom help export gedcom -->
