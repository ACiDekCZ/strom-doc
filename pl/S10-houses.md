<a id="S10"></a>
# S10 Domy

Dom to miejscowość i numer domu. Aplikacja składa domy z zapisów drzewa: z urodzeń, ślubów, spisów, miejsc
zamieszkania i zgonów, przy których jest numer domu. Badanie na żądanie ustala historię domu: numery w czasie,
położenie, co się z domem działo, właścicieli, mieszkańców i wygląd, każde twierdzenie ze źródłem i pewnością. Wynik
jest w aplikacji w oknie **Domy** i na stronie domu, w księdze i na stronach rodu. Rozdział opisuje aplikację Strom
3.33.0 i badania 1.38.0.

| Co | Aplikacja | Terminal |
|---|---|---|
| domy drzewa | okno **Domy** ([S10.2](#S10.2)), strona domu ([S10.3](#S10.3)) | `strom house list`, `strom house show` |
| historia jednego domu | **Ustal historię domu…** ([S10.4](#S10.4)) | `strom house request` ([S10.4.1](#S10.4.1)) |
| domy same | **Badanie dla drzewa › Historia domów** ([S10.5.1](#S10.5.1)) | **Ustawienia › Historia domów w tym badaniu** |
| własna kwerenda domu | **Przejmij kwerendę z pliku…** ([S10.8](#S10.8)) | `strom house import` |
| rozmowa o domu | **Omów z agentem** ([S10.9](#S10.9)) | `strom chat --house` |
| opowieść o domu | ⋯ **Napisz opowieść o domu** ([S10.14](#S10.14)) | `strom house story` |
| księga i strony | wybór **Dom**, rozdział **Domy** ([S10.10](#S10.10)) | – |

<!-- zdroj: dirigent:spec/030-historie-domu, spec/145-rozsireni-domu (T1, T2, T5, T6, T7) · app:src/houses.ts, src/ui/houses-ui.ts, src/house-page.ts · research:src/core/houses.ts, src/core/houseauto.ts, src/commands/house.ts, assets/method/house.md · CHANGELOG.cs.md aplikace 3.33.0, výzkum 1.38.0 „Historie domů“, „Výzkum domu“ -->

<a id="S10.1"></a>
## S10.1 Dom: miejscowość i numer

Dom rozpoznaje się po miejscowości i numerze domu. Aplikacja domów nie zapisuje, składa je z zapisów drzewa. Do domu
należy osoba, która ma w nim urodzenie, ślub, spis, miejsce zamieszkania lub zgon. Zapisuje się tylko to, co o domu
powiedział człowiek: nazwa domu, połączenie i rozdzielenie domów, położenie i wydarzenia odkryte dla wyników.

- **Dom z historią:** w domu mieszkały co najmniej **2 pokolenia** (rodzic i dziecko) **lub** zapisy domu obejmują co
  najmniej **30 lat**. Partnerzy to jedno pokolenie. „Jedna rodzina N lat” to najdłuższy okres jednej połączonej
  rodziny (co najmniej dwie osoby).
- Przy domu widać ciąg nazwisk mężczyzn w czasie („Horák → Vlk → Horák”) i etykiety **wżenił się** / **wżeniła się**:
  osoba nie urodziła się w domu i jest partnerem kogoś z domu. Przy osobie o nieznanej płci etykiety nie ma.
- Badanie prowadzi dom jako zapis `A…` (`A0001`). Zapis powstaje z pierwszym wpisem lub zadaniem. Do tego czasu dom jest
  tylko w faktach drzewa.
- **Granice:**
  - okno **Domy** i wszystko wokół domów jest tylko w drzewie, które ma co najmniej jeden dom z numerem;
  - zastępcy osób (osoby bez danych, tylko na miejsce) nie liczą się do domu;
  - w badaniu miejscowość domu musi być miejscem badania ([R4](R4-places.md)), inaczej badanie nic do domu nie zapisze
    i doradzi `strom place add`.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:src/houses.ts houseOfFact, collectHouses, LIVED_FACT_KINDS, houseIdOf, isOverThreshold (HOUSE_THRESHOLD_GENERATIONS 2, HOUSE_THRESHOLD_YEARS 30), generationsOf, familyYearsOf, marriedInOf, hasNumberedHouse · StromData.houses (datová verze 27) · dirigent:spec/030 rozhodnutí 26. 11. · research:src/core/model.ts House (A…), src/core/houses.ts recordOf (house.town), townRecord · commity app 94ed2240, research dea67112, 54ed35c7 -->

<a id="S10.1.1"></a>
### S10.1.1 Jak odczytuje się numer domu

Numer domu bierze się z miejsca faktu i pola numeru domu lub adresu. Oznaczenia przed numerem się nie liczą: „16”,
„čp. 16”, „č. p. 16”, „č.p.16”, „Nr. 16”, „Haus Nr. 16”, „House No. 16” i „nr domu 16” to ten sam dom.

- „Bělokamen čp. 16” to miejscowość Bělokamen i dom 16; „Bělokamen, Kopřivná 12” to dom według ulicy; „Lhota, okres
  Horní, čp. 3” to miejscowość „Lhota, okres Horní”. Gołe „Bělokamen 16” jest domem tylko tam, gdzie goły numer
  proponuje także okno **Miejsca**; „Praha 5” domem nie jest (numer należy do nazwy miejscowości).
- Ulica jest porównywana bez znaków diakrytycznych i wielkości liter. „13/2” to jeden numer.
- Domy w miejscowości idą po kolei: numery (4, 12, 12a, 13/2, 100), potem domy według ulicy, potem pozostałe.
- **Granice:**
  - bez numeru („mlýn”, „Kopřivná”) dom nie powstaje;
  - „12a” i „12 a” to dwa domy; łączy je człowiek ([S10.1.2](#S10.1.2));
  - numer ewidencyjny nie ma własnej serii: „č. ev. 5” to ten sam dom co „čp. 5”.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0
- **Od badania 1.38.0:** domy zapisane wcześniej na dwa sposoby porządkuje `strom fixes house-numbers`
  ([S10.12](#S10.12)).

<!-- zdroj: app:src/places.ts townOfPlace, houseKey, houseOrder, compareHouses (466–545) · research:src/core/house.ts houseKey, HOUSE_WORDS · nález: ev. č. bez vlastní řady (app), „12a“ ≠ „12 a“ -->

<a id="S10.1.2"></a>
### S10.1.2 Numery w czasie, połączenie i nazwa domu

Numery domów w przeszłości się zmieniały. Dom ma więc listę numerów: z zapisów drzewa i z badania. Starszy numer jest
pokazywany w nawiasie („(dawniej 12)”). Zapisy sprzed potwierdzonej zmiany numeracji są tylko prawdopodobne.

- **Zmianę numeracji** badanie tylko proponuje („propozycja badań: ten sam dom przed zmianą numeracji”). Potwierdza ją
  człowiek (**Potwierdź**) albo odrzuca (**To nie ten sam dom**). Odpowiedź „to nie ten sam dom” nie jest już nigdy
  ponownie wysyłana do badania.
- **Połącz z innym domem…** łączy dwa zapisy jednego domu (proponuje domy tej samej miejscowości). **To inny dom…**
  oddziela numer, który do domu nie należy; z badaniem, które to umie, można od razu wysłać do badania odpowiedź „to
  nie ten sam dom”. Połączenie dotyczy tylko spisu domów i strony domu; dane osób się nie zmieniają. Każde połączenie
  i rozdzielenie to jeden krok **Cofnij** i trafia do historii zmian.
- **Nazwę domu** (najwyżej 80 znaków) wpisuje się na stronie domu. Nazwy od człowieka badanie nie nadpisuje.
- **Granice:**
  - zmianę numeracji, położenie i „to nie ten sam dom” potwierdza tylko człowiek (w aplikacji, w terminalu lub w oknie
    systemu), nigdy agent;
  - danej, którą człowiek potwierdził lub podał, badanie nie nadpisuje; nowa dana badania trafia obok;
  - przy scalaniu drzew słowo człowieka o domach jest przenoszone; do GEDCOM trafia tylko nazwa domu i połączenie
    ([S10.11](#S10.11)).
- **Obsługa:** aplikacja: strona domu → **Numery w czasie** → **Potwierdź** / **To nie ten sam dom**; ⋯ domu →
  **Połącz z innym domem…**, **To inny dom…**, **Nazwa domu…**. Terminal:
  `strom house confirm <dom> renumber|location|not-same`.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:src/houses.ts withResearchNumbers · src/ui/houses-ui.ts merge, split (houses.splitSend jen s house.confirm) · DataManager.setHousesUserData (Zpět, záznam změn) · src/ui/house-page-ui.ts startHouseNameEdit (80 znaků) · src/ged-houses.ts keepHouses · strings.ts houses.was, merge, mergeNote, split, splitSend, farmName · research:src/core/houses.ts confirmHouse (HOUSE_CONFIRMS renumber, location, notSame), replaceHouseItem (house.confirmed) · src/commands/house.ts confirm (člověk, STROM_FOR_APP) · commit app 94ed2240 -->

<a id="S10.2"></a>
## S10.2 Okno Domy

Okno **Domy** pokazuje domy drzewa według miejscowości. Na górze jest zdanie „Domy według zapisów w drzewie. Numery
domów w przeszłości się zmieniały; zapisy sprzed potwierdzonej zmiany numeracji są tylko prawdopodobne.” i przycisk
**Pojęcia** ze słowniczkiem (gospodarstwo, chałupnik, wymowa (dożywocie), komornik, czeladź, nr domu).

- **Pasek:** wyszukiwanie **Szukaj miejscowości, numeru, nazwiska** (numer zapisany jakkolwiek znajduje dom, nazwiska
  także rodowe i po ślubie, bez znaków diakrytycznych); chip miejscowości **Miejscowość: …**; **Tylko z historią**;
  **Zbadane** (tylko z badaniem, które wysyła domy); **Sortuj**: **Numer**, **Najstarsze**, **Najwięcej osób**,
  **Ostatnio zbadane** (tylko z badaniem). Podsumowanie „{N} domów w {M} miejscowościach”.
- **Miejscowości** idą według liczby domów, potem według nazwy; przy miejscowości powiat (z miejsc badania), liczba
  domów z historią, numerów domów i osób.
- **Wiersz domu:** numer (i starszy numer), nazwa domu, lata, ciąg nazwisk, „N osób · N pokoleń”, etykiety wżenienia
  i stan badania ([S10.4](#S10.4)). Domy z historią ([S10.1](#S10.1)) są na górze; pozostałe w grupie **Pozostałe
  domy (N)** („poniżej progu 2 pokoleń lub 30 lat”). Wczytuje się po 40 domów (**Pokaż więcej**).
- **Rozwinięty dom:** ciekawostki (jedna rodzina N lat, liczba numerów, najstarszy zapis), zapisy osób (8, potem „i N
  kolejnych zapisów…”) i **Strona domu ›**. Kliknięcie osoby zamyka okno i pokazuje osobę w drzewie.
- **⋯ przy domu:** **Strona domu**, **Na mapie**; działania badania ([S10.4](#S10.4), [S10.9](#S10.9)), także przy
  domu poniżej progu; **Połącz z innym domem…** i **To inny dom…** ([S10.1.2](#S10.1.2)).
- **Granice:** puste wybory mówią dlaczego („Żaden dom nie ma historii 2 pokoleń lub 30 lat.”, „Żaden dom nie został
  jeszcze zbadany.”).
- **Obsługa:** aplikacja: **Akcje › Drzewo › Domy…** i w **Zarządzaniu drzewami** ⋯ przy otwartym drzewie (za
  Miejscami); **Domy ›** w **Badanie dla drzewa**; **Domy w miejscowości ›** w oknie **Miejsca** i w dymku domu na
  mapie (otwiera okno z chipem miejscowości); **‹ Domy** ze strony domu.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/ui/houses-ui.ts (lišta, obce, řádek, HOUSES_BATCH 40, openHouseRowMenu, akce výzkumu i pod prahem 96c78f0a) · src/houses-view.ts (hledání) · src/ui/tree-actions.ts housesRows (isActive && hasNumberedHouse, 0c97014e) · strings.ts houses.menu, intro, terms, searchPh, townOnly, onlyHistory, researchedOnly (169c35b0), sortLabel, sortNumber, sortOldest, sortPeople, sortResearched, count, townMeta, more, moreWhy, emptyHistory, emptyResearched, townHouses, pageItem · nález N3: okno i u adresy s ulicí a číslem -->

<a id="S10.3"></a>
## S10.3 Strona domu

Strona domu ma postać strony osoby: **‹ Domy**, **Zapisz HTML**, ⋯ i zamknij. Od trzech sekcji ma spis treści.

- **Sekcje w kolejności:** nagłówek (miejscowość i numer, nazwa domu, miejscowość z powiatem, parafia, „W drzewie”:
  lata, pokolenia, osoby; „Badania”: stan) · **W skrócie** · **Opowieść** ([S10.14](#S10.14)) · **Numery w czasie** · **Oś czasu** · **Właściciele
  i mieszkańcy** · **Wygląd domu** ([S10.7](#S10.7)) · **Mapa** ([S10.3.1](#S10.3.1)) · **Czego nie wiemy**
  (z **Odpowiedz**) · **Co przeszukano** (z **Tylko w czytelni**) · **Źródła i materiały**.
- **Oś czasu** ma przy wierszu pochodzenie: **z badań**, **z własnej kwerendy**, **przypuszczenie**,
  **prawdopodobne**.
  Wiersze z zapisów drzewa opisuje [S10.3.3](#S10.3.3).
- **Właściciele i mieszkańcy** są rozdzieleni: „Mieszkaniec to nie to samo co właściciel.” Luki pokazują
  „nieustalone · zob. Czego nie wiemy”, osoby spoza drzewa mają „spoza drzewa”.
- **Stan zbadano:** ✓ i dzień („gotowe 12.03.2026”) w nagłówku, w oknie **Domy** i w dymku na mapie.
- **Bez wyniku badania** strona ma nagłówek, **W skrócie**, **Numery w czasie**, **Oś czasu**, **Mieszkańców
  z drzewa**, **Mapę** i zdanie, skąd jest („Strona jest zbudowana z zapisów w drzewie.” albo że dom jest w kolejce).
- **⋯ strony:** **Zapisz HTML** ([S10.3.2](#S10.3.2)) · **Otwórz w książce…** ([S10.10](#S10.10)) · **Na mapie** ·
  **Nazwa domu…** · działania badania ([S10.4](#S10.4)) · **Napisz opowieść o domu** ([S10.14](#S10.14)) ·
  **Omów z agentem** ([S10.9](#S10.9)) · **Dołącz
  materiał…** · **Przejmij kwerendę z pliku…** ([S10.8](#S10.8)) · **Połącz…** · **To inny dom…**
- **Obsługa:** aplikacja: **Strona domu ›** w oknie **Domy**, w dymku domu na mapie i przy linku do domu na stronie
  osoby ([S10.11](#S10.11)).
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/house-page.ts buildHousePage (houses.page.sec.* kicker, sum, numbers, timeline, people, look, map, unknown, passed, archiveOnly, sources; treeResidents, page.queued, page.treeOnly, page.noResearch, origin.*, notOwner) · src/ui/house-page-ui.ts toggleHousePageMenu · strings.ts houses.st.done, houses.page.* · commity 53d23b9f, 6cbffa3b, 169c35b0 · nález N4: pořadí proti spec 030 K3.1 (V kostce, Podoba, Mapa, Co se prošlo navíc) -->

<a id="S10.3.1"></a>
### S10.3.1 Mapa i położenie domu

Sekcja **Mapa** pokazuje dom (przybliżenie 17) albo miejscowość, gdy położenie domu nie jest znane (przybliżenie 14).
Zdanie pod mapą mówi, skąd jest położenie.

| Zdanie | Kiedy |
|---|---|
| **Położenie ustawione ręcznie** | punkt przesunął człowiek |
| **Położenie potwierdzone** | punkt badania potwierdził człowiek |
| **Położenie według dzisiejszego numeru domu · wysoka pewność** | badanie znalazło dom w dzisiejszym rejestrze adresów |
| **Położenie według badań · wysoka pewność** | inny pewny punkt badania (kataster, stara mapa, opis) |
| **Położenie niepewne (numer mógł się zmienić)** | punkt badania bez wysokiej pewności |
| **Położenie domu nie jest znane; pokazano miejscowość.** | bez punktu |

- **Warstwa mapy:** **Dziś** i warstwy, które badanie dostarczyło dla miejsca domu: **Ortofotomapa dziś** i **Zdjęcia
  lotnicze lat 50.** (Czechy). Bez nich „Tylko dzisiejsza mapa; badania nie dostarczyły innych warstw dla tego kraju.”
- **Potwierdź położenie** jest tylko przy niepewnym punkcie badania, do którego człowiek jeszcze nic nie powiedział.
  **Przesuń punkt** przesuwa punkt przeciąganiem. Jedno i drugie zapisuje się w drzewie (jeden krok **Cofnij**),
  a z badaniem, które to umie, także w badaniu jako słowo człowieka.
- **Otwórz gdzie indziej:** OpenStreetMap, Mapy.com, Mapy Google, Street View i dzisiejszy widok, z uwagą „Położenie
  i zdjęcia są dzisiejsze; historyczny numer domu może się nie zgadzać.”
- **Granice:**
  - położenia, które potwierdził człowiek, badanie nie nadpisuje;
  - **Otwórz gdzie indziej** jest tylko przy domu z własnym punktem;
  - księga, zapisana strona domu i strony rodu pokazują położenie tylko przy domu bez osób z mniej więcej ostatnich
    100 lat, jako wycinek mapy ([S10.3.4](#S10.3.4)).
- **Obsługa:** aplikacja: strona domu → **Mapa** → **Warstwa mapy**, **Potwierdź położenie**, **Przesuń punkt**,
  **Ukryj położenie w wynikach** ([S10.3.4](#S10.3.4));
  terminal `strom house confirm <dom> location`.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:src/house-map.ts (zoom 17/14, min 12, max 18), src/ui/house-map-ui.ts (page.map.layers today, ortho, aerial, onlyToday; posManual, posConfirmed, posHigh, posSure, posUnsure, noPos; confirmPos, move, saveHousePoint s house.confirm; Otevřít jinde) · commity 90c54cc6, 307c3a8f, bc1833b9 · research:assets/maplayers.json cz-ortho, cz-ortho-1950 · src/core/houses.ts confirmHouse location (jistota high, původ user), house add location odmítnuto po potvrzení -->

<a id="S10.3.2"></a>
### S10.3.2 Zapisana strona domu i ochrona osób

**Zapisz HTML** zapisuje stronę domu jako jeden plik (np. `belokamen-cp-16.html`) bez kafelków mapy z sieci; położenie
jest wycinkiem mapy wprost w pliku ([S10.3.4](#S10.3.4)), zdjęcia domu i miejscowości wczytują się z internetu albo są
tylko linkiem ([S10.7.1](#S10.7.1)). Zapisana strona domu, księga i strony rodu chronią osoby z mniej więcej ostatnich
100 lat.

- **Nigdy:** dzisiejsi właściciele; imiona i nazwiska żyjących; nazwisko świadka.
- **Osoby z mniej więcej ostatnich 100 lat** tylko z imienia, nazwiska i roli, bez lat.
- **Wydarzenia badania z mniej więcej ostatnich 100 lat i wydarzenia wrażliwe** (konfiskata, wysiedlenie) są
  pomijane, dopóki człowiek ich nie odkryje (**Pokaż w wynikach**).
- **Położenie** tylko przy domu bez osób z mniej więcej ostatnich 100 lat i tylko bez ręcznego ukrycia
  ([S10.3.4](#S10.3.4)); nazwy domu przy domu z takimi osobami też nie.
- **Opowieść o domu** zawsze w całości, zatwierdzona albo szkic, bez etykiety szkicu. Osoby z mniej więcej ostatnich
  100 lat ani pozycje, które strona ukrywa, jej nie pomijają ([S10.14.2](#S10.14.2)).
- Strona domu mówi, czego brakuje w wynikach i dlaczego: „W wynikach (HTML, książka) N wydarzeń i położenie domu nie są
  pokazywane (ludzie ostatnich ~100 lat).”, „… N wydarzeń nie jest pokazywanych; położenie domu jest ukryte ręcznie.”
- **Obsługa:** aplikacja: strona domu → **Zapisz HTML**; przy wydarzeniu **Pokaż w wynikach**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/house-privacy.ts, src/privacy.ts RECENT_YEARS 100, buildHousePageDocument, housePageFileName · strings.ts houses.reveal, houses.hiddenSummary, houses.page.save · commit 6f8a9d88 · T3: app:438de916 src/house-privacy.ts houseOutputFilter (locationBy recent|manual), strings.ts houses.hiddenSummary · T4: app:3473602e src/house-privacy.ts houseStoryForOutput · T8: app:45d99711 src/house-privacy.ts houseStoryForOutput (draft s příznakem), src/house-page.ts storyHtml, pictureImg (webPhotos) · 1128: app:28099151 src/house-privacy.ts houseStoryForOutput (bez podmínky recent a skrytých položek), src/house-page.ts shownStory (storyLiving jen z hromadného výstupu), storyHtml (štítek jen c.app) -->

<a id="S10.3.3"></a>
### S10.3.3 Oś czasu z zapisów drzewa

Wiersze **Osi czasu** z zapisów drzewa idą według lat, jeden na zapis; wspólny zapis pary to jeden wiersz. Co mówi
już jeden wiersz, się nie powtarza.

- **Urodzenie i chrzest** tej samej osoby w tym samym roku to jeden wiersz „urodzony” / „urodzona”. Chrzest bez
  urodzenia ma wiersz „ochrzczony” / „ochrzczona”.
- **Zamieszkanie:** kilka zamieszkań tej samej osoby w tym samym roku to jeden wiersz „zamieszkanie”. Zamieszkania
  partnerów w tym samym roku to także jeden wiersz, z oboma imionami, jak ślub.
- Zgony, śluby, spisy ludności i zapisy badania zostają wierszem na zapis.
- **Granice:**
  - zamieszkania bez roku się nie łączą;
  - ani drzewo, ani badanie się nie zmienia: łączą się tylko wiersze, które pokazuje oś czasu;
  - tak samo powstają wiersze na stronie domu, w zapisanej stronie ([S10.3.2](#S10.3.2)) i w książce domów
    ([S10.10](#S10.10)).
- **Obsługa:** aplikacja: strona domu → **Oś czasu**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:3dc5647c src/house-page.ts houseTreeRows → joinRepeatedRows (narození jedné osoby a roku jednou, narození před křtem; bydliště s rokem a sdílenou osobou nebo partnery partnersIn), factLabel isBaptism (událost baptism → baptizedM/F) · src/book-houses.ts houseTreeRows · strings.ts houses.ev.bornM, bornF, baptizedM, baptizedF, residence · src/__tests__/house-page.test.ts · dirigent:prace/1127-app-147-materialy (Přibaleno, schválená tabulka) -->

<a id="S10.3.4"></a>
### S10.3.4 Położenie domu w wynikach

Księga rodu, zapisana strona domu i strony rodu pokazują położenie domu jako obraz: wycinek dzisiejszej mapy z punktem
i numerem domu. Pod nim są współrzędne, jak pewna jest zgodność numeru, i atrybucja mapy. Wynik pokazuje więc położenie
także bez sieci.

- **Kiedy położenie się pokazuje:** tylko przy domu z punktem (ustawionym ręcznie lub przez badanie) i tylko gdy
  zachodzi jedno i drugie:
  - w domu nie ma osób z mniej więcej ostatnich 100 lat: żyjących, osób drzewa z tych lat, zapisów domu z tych lat ani
    właścicieli i mieszkańców z latami w tym czasie (także osób, których drzewo nie zna);
  - człowiek nie ukrył położenia (**Ukryj położenie w wynikach**).
- **Pewność:** „Dzisiejsze położenie · zgodność numeru potwierdzona”, gdy punkt ustawił lub potwierdził człowiek
  (w aplikacji lub w badaniu); w przeciwnym razie „Dzisiejsze położenie · zgodność numeru zakładana”.
- **Obraz:** dzisiejsza mapa OpenStreetMap z atrybucją „© współtwórcy OpenStreetMap, licencja ODbL”. HTML (zapisana
  strona domu, strony rodu, także w ZIP-ie i w prezencie) dodaje jako kolejny obraz warstwę historyczną, którą badanie
  dostarczyło dla miejsca domu ([S10.3.1](#S10.3.1)); księga daje tylko dzisiejszą mapę i nie dzieli wycinka między
  strony.
- **Bez sieci:** wycinek powstaje raz i aplikacja zachowuje go w tej przeglądarce; kolejna księga, PDF czy prezent
  bierze zachowany. Bez sieci i bez zachowanego wycinka albo dopóki mapa nie jest dozwolona (**Pokaż mapę**), wynik
  daje tylko współrzędne i pewność, bez błędu. Na jeden obraz czeka się najwyżej 10 s.
- **Strona domu**, sekcja **Mapa:** przy domu, którego położenie wyniki by pokazały, wiersz „Wyniki (HTML, książka)
  pokazują położenie domu.” i **Ukryj położenie w wynikach**. Po ukryciu „W wynikach (HTML, książka) położenie domu
  jest ukryte ręcznie.” i **Pokaż położenie w wynikach**. Jedno i drugie to jeden krok **Cofnij**.
- **Księga:** opcja **Położenie domów** (domyślnie włączona, zapamiętywana): „Wycinek dzisiejszej mapy z punktem domu
  bez ludzi ostatnich ~100 lat; wyłączone: tylko miejscowość.” Jest tylko z częścią **Domy** i tylko gdy księga ma
  dom, którego położenie można pokazać. Przypis rozdziału brzmi wtedy „Wydarzenia po <rok> r. i położenie domu
  z ludźmi tych lat nie są podawane w książce.”
- **Granice:**
  - osoby z mniej więcej ostatnich 100 lat mają pierwszeństwo: ręczne **Pokaż położenie w wynikach** ich nie
    przebija, a przy takim domu nie ma wiersza ani przycisku; dlaczego położenia brakuje, mówi strona
    ([S10.3.2](#S10.3.2));
  - ręczne ukrycie jest tylko w drzewie aplikacji (plik JSON), nie trafia do badania ani do GEDCOM;
  - drzewo tylko do odczytu pokazuje tylko stan, bez przycisku.
- **Obsługa:** aplikacja: strona domu → **Mapa** → **Ukryj położenie w wynikach** / **Pokaż położenie w wynikach**;
  eksport **Księga rodu** → **Położenie domów**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:438de916 src/house-privacy.ts houseOutputFilter (location jen bez recentPeople a bez hideLocation; locationBy recent|manual; locationSure confirmed: user.location nebo research.location.confirmed), src/house-map-shot.ts (HOUSE_SHOT_TIMEOUT_MS 10 000, today = OSM dlaždice, vrstvy výzkumu jen HTML, ShotCache), src/ui/house-map-shots.ts (IndexedDB strom-map-shots, tilesAllowed: isMapTilesAcknowledged), src/book-houses.ts (figure, houseCoordsText, houseSureText), src/book-options.ts bookHouseMaps (výchozí zapnuto), src/book-memory.ts houseMaps, src/ui/book-ui.ts book-house-maps, src/types.ts HouseUserData.hideLocation (ne v ged-houses.ts) · strings.ts houses.page.map.outShown, outHidden, hideOut, showOut, sureConfirmed, sureAssumed, osmAttribution; book.dlg.houseMaps, houseMapsHint; book.houseChapterProtected; map.tilesNoticeOk · dirigent:spec/145 T3 · prace/1127-app-145-vypraveni-poloha Výsledek -->

<a id="S10.4"></a>
## S10.4 Zamówić historię domu

Historię jednego domu można zamówić zawsze, czy **Historia domów** ([S10.5](#S10.5)) jest włączona, czy nie.
Zamówiony dom trafia na początek kolejki badania.

- **Stan domu** przy wierszu, na stronie, w dymku na mapie i w oknie **Miejsca**: **niezbadany**, **w kolejce**,
  **w badaniu**, **gotowe <dzień>**, **czeka na odpowiedź** (z **Odpowiedz**), **odłożone**, **własna kwerenda czeka
  na przejęcie**, **w kolejce: wygląd domu**.
- **Działania według stanu:** niezbadany i odłożone → **Ustal historię domu…**, z włączoną Historią domów **Na
  początek kolejki**; w kolejce → z włączoną Historią domów **Na początek kolejki**; gotowe → **Zleć ponownie…**;
  w badaniu i czeka na odpowiedź → nic.
- **Okno Historia domu <numer>, <miejscowość>:** czego się szuka („Przeszukiwane są księgi metrykalne, kroniki, mapy
  i inne dozwolone źródła.”, przy zamówionym ponownie „Przeszukane źródła nie są przeszukiwane ponownie; tylko nowe
  i jeszcze nieprzeszukane.”); szacunek „Jedna sesja badań, około <czas>. Korzysta z subskrypcji AI agenta badań.”;
  **Sąsiednie domy rodziny w miejscowości zostaną opracowane razem** (najwyżej 3 domy, wstępnie wybrane domy
  z historią); **Dołącz materiał… (opcjonalnie)**; **Anuluj** / **Ustal historię**.
- **Szacunek:** mediana zmierzonych sesji domów w tym badaniu; dopóki nie są zmierzone co najmniej 3, to 30 minut na
  dom i 20 minut na szkielet miejscowości, a cena nie jest pokazywana.
- **Którędy to idzie:** z włączoną Historią domów dom idzie przez most od razu na początek kolejki, bez terminala („Dom
  trafi przez most na początek kolejki badań, bez okna terminala.”; potem „Dom <numer> jest na początku kolejki
  badań.”). Z wyłączoną aplikacja otwiera terminal badania i słowo daje się tam ([S10.4.1](#S10.4.1)); działanie ma
  oznaczenie **AI + terminal** ([S4.5.1](S4-research-from-the-app.md#S4.5.1)).
- **W kolejce:** zadanie domu jest zamówione i nigdy nie jest odkładane. Szkielet miejscowości ([S10.5](#S10.5)), gdy
  miejscowość jeszcze go nie ma, idzie przed dom. Dom czeka na szkielet swojej miejscowości także po przesunięciu na
  początek. Żywe zadanie jest tylko przesuwane i dochodzą do niego sąsiedzi. Gotowy dom jest szukany ponownie tylko
  w nowych źródłach.
- **Granice:**
  - tylko dom, w którym mieszkał ktoś z drzewa, i miejscowość, która jest miejscem badania; sąsiednie domy tylko z tej
    samej miejscowości;
  - sąsiedzi nie są proponowani przy domu w kolejce, w badaniu lub czekającym i przy zamówionym ponownie;
  - nie w Archiwum Strom ani przy badaniu, które czeka na agenta;
  - **Ustal historię domu…** z wyłączoną Historią domów tylko tam, gdzie aplikacja umie otworzyć terminal badania;
  - odmowa (badanie zajęte, zablokowane, pełny dysk, bez połączenia) podaje powód i niczego nie zmienia.
- **Obsługa:** aplikacja: stan domu lub ⋯ przy domu w oknie **Domy**, na stronie domu, w dymku na mapie, w oknie
  **Miejsca** (**Historia domu <numer>**); terminal: [S10.4.1](#S10.4.1).
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:src/ui/house-state-ui.ts (houses.st.*), src/ui/house-request-ui.ts houseActionOf, dialog houses.req.* (HOUSE_REQUEST_WITH_MAX 2, HOUSE_DEFAULT_MINUTES 30 + 20), POST /houses/request, houseSearchLink · src/research-link.ts RESEARCH_LINK_MARKS.house · commity a79b53aa, 96c78f0a · research:src/core/houseauto.ts askHouse (queueAt next, asked, kostra před dům), houseEstimate (HOUSE_MEASURED_MIN 3, HOUSE_MINUTES 30, TOWN_MINUTES 20), src/core/houses.ts houseChain, src/commands/offline.ts 222–226 · src/core/live.ts houseRequestWrite (403 house.link při vypnuté, 404 house.unknown, 400 house.body/house.town, 409 house.archive, 503 research.busy) · commity f325b1c1, abc8331d, 0002cfb4 · nález: cena až po 3 změřených sezeních (spec 030 K6.4) -->

<a id="S10.4.1"></a>
### S10.4.1 Zamówienie w terminalu i z linku

W terminalu dom zamawia się poleceniem `strom house request <dom> [--with <dom>,<dom>]`. Badanie wypisuje szacunek
(„Około N minut pracy agenta; zajmuje czas agenta i wykorzystuje limit planu.”, cena tylko zmierzona) i pyta
**Szukać historii domu <dom> (jedna sesja agenta)?** (Enter = nie). Po tak: „Historia domu <dom> będzie pierwsza
w kolejce przy najbliższej sesji badania.”

- **Z aplikacji** (z wyłączoną Historią domów) link otwiera terminal z nagłówkiem **Prośba z aplikacji Strom:**
  „szukać historii domu <dom> – numerów, właścicieli i mieszkańców, tego, co się z nim działo”. Terminal najpierw
  sprawdza, czy agent jest na komputerze, pokazuje szacunek i pyta. Potem „Historia domu <dom> jest pierwsza
  w kolejce.” i **Uruchomić pracę agenta od razu?**
- **Bez potwierdzenia:** przy uruchamianiu agenta z aplikacji bez potwierdzenia
  ([S4.5.5](S4-research-from-the-app.md#S4.5.5)) wypisuje szacunek jednym wierszem, także z ceną, i uruchamia pracę
  bez pytania.
- **Granice:**
  - agent sam domu nie zamawia, to słowo człowieka; bez terminala polecenie wymaga `--yes`;
  - dom bez osób drzewa, miejscowość, która nie jest miejscem badania, lub sąsiedzi z innej miejscowości: „Nic nie
    zrobiono.” z powodem;
  - potwierdzenie z telefonu tylko bez ceny; z ceną pyta komputer;
  - `strom house request` nie ma w pomocy `strom help house`; wywołuje go link z aplikacji.
- **Obsługa:** terminal: `strom house request A0001`, `strom house request "Lhota 16" --with "Lhota 17"`.
- **Obowiązuje od:** badanie 1.38.0

<!-- zdroj: research:src/commands/house.ts request (hidden, L232; ui.house.ask, ui.house.minutes, ui.house.usd, ui.house.asked, ui.house.again, ui.house.kept, --yes) · src/cli/menu-links.ts 436–482 (ui.link.asks, ui.link.what.house.search, ui.link.house.none/with/town, ui.link.noconfirm, ui.link.house.done, ui.link.house.now → strom run --task) · src/core/links.ts 525–546 · src/commands/links.ts 164–176 · commit 226f86e1 (K6.3a) · nález: house request skrytý v helpu -->

<a id="S10.5"></a>
## S10.5 Historia domów: domy same

Z włączoną **Historią domów** badanie samo zakłada zadania domów. Domyślnie jest wyłączona; włączyć ją może tylko
człowiek.

- **Który dom:** ma zapis co najmniej jednego **bezpośredniego przodka**; mieszkały w nim **2 pokolenia lub** zapisy
  obejmują **30 lat**; najstarszy zapis jest **starszy niż 100 lat**; miejscowość jest miejscem badania. Najpierw domy
  z największą liczbą przodków, potem najstarsze.
- **Ile naraz:** najwyżej **3** otwarte grupy zadań domów. Grupa to dom i sąsiednie domy tej samej miejscowości ze
  wspólnym nazwiskiem, najwyżej 3 domy.
- **Szkielet miejscowości:** raz na miejscowość, przed jej domami: dobra i majątek, parafia, obręb katastralny, dawne
  nazwy, gdzie są księgi gruntowe i arkusze spisowe. Domy miejscowości na niego czekają.
- **Łańcuch:** szkielet miejscowości → dom → wygląd domu ([S10.7](#S10.7)).
- **Kolejność w kolejce:** zadania domów powstałe same dopiero po badaniu rodziny; `strom queue` to mówi. Zamówione
  domy idą na początek ([S10.4](#S10.4)).
- **Granice:**
  - dom bez żywego zadania, jeszcze niezbadany; zadanie, które człowiek odrzucił, samo nie powstaje ponownie;
  - nie w Archiwum Strom ani przy badaniu, które czeka na agenta;
  - gotowe zadanie domu lub szkieletu agent zamyka tylko wtedy, gdy jest zapisane, co zadanie ma mieć
    ([S10.6](#S10.6)).
- **Obowiązuje od:** badanie 1.38.0
- **Pilnuje kod:** wybór domów, liczba grup, szkielet i łańcuch.

<!-- zdroj: research:src/core/houseauto.ts qualifies (přímý předek, HOUSE_SPAN 30, HOUSE_AGE 100, obec = místo), raiseHouseTasks (HOUSE_AUTO_OPEN 3, HOUSE_GROUP_MAX 3), townTask, createTownTask/createHouseTask/createLookTask (priorita 1, enrich, původ house:town:L…, house:A…, house:look:A…) · src/core/houses.ts houseChain · src/core/queue.ts houseOrder, 493, 546–548 · src/core/config.ts houses (nenastaveno = off) · cs.json house.town.what/why, house.research.what/why · commity 80bd90e2, f325b1c1, 1abbdd7f · dirigent:spec/030 rozhodnutí 26. 11. -->

<a id="S10.5.1"></a>
### S10.5.1 Włączanie i wyłączanie Historii domów

**Historia domów** i **Wygląd domów** to ustawienia badania: dla wszystkich badań na komputerze albo dla jednego
drzewa (wartość drzewa wygrywa). Historia domów jest domyślnie wyłączona, Wygląd domów włączony.

- **W aplikacji:** **Badanie dla drzewa › Źródła › Historia domów** pod **Spisy ludności**: „Badania same opracują
  domy bezpośrednich przodków, w których rodzina mieszkała co najmniej dwa pokolenia lub 30 lat, a najstarszy zapis ma
  ponad 100 lat. Pozostałe domy tylko na żądanie.” Wyłączona pokazuje szacunek („Zadanie obejmie N domów
  w M miejscowościach · około <czas> pracy agenta · korzysta z subskrypcji AI”). Włączenie pyta (**Włączyć historię
  domów?**), wyłączenie także (**Wyłączyć historię domów?**: „Oczekujące zadania domów zostaną odłożone, gotowe wyniki
  zostają.”). Włączona pokazuje „Włączone · N domów: N gotowe, N w badaniu, N w kolejce” i **Domy ›**, oraz **Także
  wygląd domów: włączone** / **wyłączone** (zmienia się w terminalu). Zapis idzie przez most, bez terminala: to decyzja
  człowieka w aplikacji.
- **W terminalu:** **Ustawienia › Historia domów w tym badaniu** (włączone, „włączone, bez wyglądu domów”, wyłączone,
  „wyłączone, odłożone N zadań domów”). Przed włączeniem mówi, co badanie będzie robić („Pojedynczy dom można zawsze
  zamówić.”), liczbę domów i szacunek („N domów w M miejscowościach, łącznie około N minut pracy agenta”) i pyta
  (Enter = nie). Włączona proponuje **Także wygląd domów** i **Wyłączyć historię domów**.
- **Wyłączenie** odkłada tylko oczekujące zadania domów, które powstały same (szkielet, dom, wygląd). Zamówione,
  rozpoczęte, odłożone przez człowieka, przejęcie kwerendy i zadania z materiałem zostają. Po włączeniu odłożone
  wracają; gotowe wyniki zostają. `strom task list` oznacza je „held: houses off”; nie czekają na człowieka.
- **Wygląd domów wyłączony:** zadanie domu zapisuje tylko krótki wygląd, zadanie wyglądu nie następuje.
- **Granice:**
  - włączyć może tylko człowiek: w terminalu, w menu, w oknie systemu lub w aplikacji; gdy spróbuje agent, pyta okno
    systemu, którego agent nie widzi; wyłączyć może każdy;
  - w aplikacji wiersza nie ma przy Archiwum Strom ani przy badaniu, które czeka na agenta;
  - **Domy ›** jest tylko przy otwartym drzewie.
- **Obsługa:** aplikacja: **Badanie → Więcej → Badanie dla tego drzewa… → Źródła → Historia domów**; terminal:
  **Ustawienia › Historia domów w tym badaniu**, `strom config set houses on|off --for-tree`,
  `strom config set houses.look on|off --for-tree`.
- **Obowiązuje od:** badanie 1.38.0, aplikacja 3.33.0
- **Pilnuje kod:** włączenie tylko przez człowieka; co wyłączenie odkłada.

<!-- zdroj: research:src/core/config.ts houses (housesSwitch, nenastaveno off), houses.look (housesLook, nenastaveno on) · src/commands/setup.ts housesDecision 1679–1697 (requireHuman, okno systému, STROM_FOR_APP; vypnout kdokoli), ui.consent.houses(.tree) · src/cli/menu-settings.ts housesLabel/housesStep 253–297 (ui.settings.houses*, --for-tree) · src/core/live.ts housesWrite POST /houses (409 house.archive) · src/core/houses.ts houseHeld (jen vzniklé samy, af7194c5) · src/commands/tasks.ts 979–1045 (held: houses off) · src/core/waiting.ts 458–460 · app:src/ui/research-tree-settings-ui.ts renderResearchHousesRow (house.auto, researchHousesShown: ne archiv, ne čekající na agenta), src/ui/houses-auto-view.ts · strings.ts houses.auto.* · commity app 3ea32837, research 80bd90e2, 3c9e4853, 9242429a · nález: vypnutí odkládá jen úkoly vzniklé samy (spec 030 K6.1) -->

<a id="S10.6"></a>
## S10.6 Jak agent bada dom

Zadanie domu dostaje od badania opis: osoby drzewa w domu z latami i faktami, szkielet miejscowości, co przejrzano,
co jest do ręcznego przejrzenia, czego nie wiadomo, przejęte dane do przeczytania ([S10.6.2](#S10.6.2)), dotychczasowy
wygląd, materiał, sąsiednie domy i listę źródeł według kraju ([S10.6.1](#S10.6.1)). Lista to robocza lista agenta;
do domu trafiają tylko znaleziska ze źródłem i jeden wiersz „przejrzano” z listą.

1. **Który dom i gdzie:** najpierw zidentyfikować dom. Dzisiejszy numer według rejestru adresów; wsie numerację
   zwykle zachowały, miasta zmieniały numerację mniej więcej w latach 1805–1815 i 1884. Zmianę numeracji agent tylko
   proponuje, potwierdza ją człowiek ([S10.1.2](#S10.1.2)). Gdy domu nie da się zidentyfikować, zadanie czeka na
   odpowiedź i agent dalej nie szuka.
2. **Lista źródeł z opisu:** rejestr adresów, nazwy terenowe, cieki wodne, ortofotomapa dziś i stare zdjęcia lotnicze,
   topografia ze szkieletu, lokalne strony. Przy szczególnej budowli (młyn, gospoda, kuźnia, plebania, szkoła) także
   inne budowle tego samego rodzaju w miejscowości, ciek wodny i młynówka oraz skąd przyszedł właściciel.
3. **Oś czasu, właściciele, mieszkańcy:** spisy według numerów domów (gdzie ma je dozwolone archiwum), metryki według
   numerów, księgi gruntowe. Właściciele (od–do, jak nabyli dom) osobno od mieszkańców (gospodarz, wymownik, komornik,
   czeladź, najemca). Spis wymienia właściciela tylko w 1910 i 1921. Osoby spoza drzewa są mieszkańcami, nigdy nowymi
   osobami drzewa.
4. **Krótki wygląd** zawsze ([S10.7](#S10.7)); warstwa mapy z nazwy.
5. **Koniec:** czego nie wiadomo, co jest tylko w czytelni, co jest do ręcznego przejrzenia, i kontrola wyglądu. Kroki
   ręczne i czytelnia to lista dla człowieka, nigdy nowe zadanie. Dom zamówiony ponownie uzupełnia tylko brakujące.

- **Gotowe zadanie:** agent zamyka zadanie domu lub szkieletu tylko wtedy, gdy jest zapisane: wiersz „przejrzano”
  z listą; przy domu krótki wygląd albo to, że o wyglądzie nic nie wiadomo; z Wyglądem domów kontrola wyglądu; żadna
  nieprzeczytana przejęta dana z sieci. U agentów, których wyszukiwania badanie widzi (Claude, Grok), dodatkowo co
  najmniej 3 wyszukiwania i strony. Inaczej „zadanie nie jest jeszcze gotowe – lista źródeł domu nie została
  przejrzana”.
- **Pewność** każdej danej: **pewne**, **prawdopodobne**, **przypuszczenie** (przy numerze dodatkowo **zapewne**);
  agent nigdy jej nie podwyższa. Pochodzenie: badanie, z własnej kwerendy, wpisano ręcznie.
- **Granice:**
  - kontrolę gotowego zadania ma zadanie domu i szkieletu, nie zadanie wyglądu; działa tylko wtedy, gdy zadanie
    zamyka agent;
  - z listy nie powstają nowe zadania ani pytania.
- **Obowiązuje od:** badanie 1.38.0
- **Pilnuje kod:** kontrola gotowego zadania, propozycja zmiany numeracji tylko jako propozycja. **Tylko metodyka:**
  kroki 1–5.

<!-- zdroj: research:assets/method/house.md (house-research, house-town) · src/core/houseauto.ts houseBrief, houseDoneLacks (HOUSE_CHECK_MIN 3, claude a grok) · src/commands/tasks.ts 425–431 (house.checklist, isAgent) · src/core/model.ts HOUSE_CERTAINTIES, RESIDENT_ROLES · cs.json ui.house.certainty.*, ui.house.origin.*, house.research.done · commity 8561e5b1, 202c0927, 8a2d4dd6 · dirigent:spec/145 T5 · nález: počet hledání jen u claude a grok, úkol podoby bez kontroly -->

<a id="S10.6.1"></a>
### S10.6.1 Źródła domu i co nie wychodzi na zewnątrz

Lista źródeł jest według kraju, według punktu miejscowości: część ogólna i część dla obszaru. Tylko publiczne źródła
i archiwa dozwolone w badaniu ([R9](R9-archives.md)).

- **Czechy:** miejscowość – topografia Schaller (1785–1791) i Sommer (1833–1849), nazwy terenowe ČÚZK, strona,
  kronika i Wikipedia miejscowości, wolne obrazy (Wikimedia Commons, wolne dzieła w Krameriusie, Europeana); ręcznie
  Památkový katalog, mapy katastru stabilnego, księgi gruntowe online. Dom – rejestr adresów RÚIAN, nazwa terenowa
  przy punkcie, cieki wodne, ortofotomapa dziś i z lat 50., topografia ze szkieletu, lokalne strony; ręcznie szkic
  indykacyjny, zabytki, księgi gruntowe. Młyny ręcznie vodnimlyny.cz.
- **Austria:** kataster franciszkański (1817–1861), Tyrol, Hofnamen Górnej Austrii. **Bawaria:** Häuserbuch,
  Urkataster 1812 i odnowienie 1861/62.
- **Warstwy mapy:** Ortofoto ČR (dziś) i Letecké snímky ČR (lata 50.); są proponowane, gdy warstwa obejmuje miejsce
  domu, i tylko z hostów dozwolonych w badaniu.
- **Co nie wychodzi na zewnątrz:** tylko miejscowość, numer domu, współrzędne i imiona i nazwiska osób zmarłych ponad
  100 lat temu. Nic nie jest logowane, kupowane, zamawiane ani wysyłane. Strona, której warunki zabraniają AI, tylko
  jako link do ręcznego przejrzenia. Pobierane są tylko dzieła z wolną licencją, inaczej link.
- **Dzisiejsze osoby:** dzisiejszych właścicieli i mieszkańców się nie szuka ani nie zapisuje. Wrażliwe wydarzenie
  XX wieku (konfiskata, wysiedlenie) zapisuje się jako wrażliwe ([S10.3.2](#S10.3.2)).
- **Granice:**
  - badanie odrzuca właściciela lub mieszkańca bez końca, który zaczyna się w ostatnich 100 latach, jeśli to nie jest
    osoba drzewa;
  - świadek z nazwiska tylko za zgodą;
  - obraz przy wyglądzie domu i obraz miejscowości tylko z wolną licencją (CC0, CC BY, CC BY-SA, wolne dzieło, GFDL,
    Free Art License, OGL; nie NC, ND, „wszelkie prawa zastrzeżone”).
- **Obsługa:** terminal: `strom house sources <dom>`, `--town <miejscowość>`, `--look`.
- **Obowiązuje od:** badanie 1.38.0
- **Pilnuje kod:** dzisiejsi właściciele i mieszkańcy (tylko ta część w Granicach), świadek, licencje obrazów.
  **Tylko metodyka:** co wychodzi na zewnątrz, warunki stron, wrażliwe wydarzenia, pozostała ochrona dzisiejszych osób.

<!-- zdroj: research:src/core/housesources.ts, assets/housesources.json (cz, at, by; town, house, special, look) · assets/maplayers.json (cz-ortho, cz-ortho-1950, CC BY 4.0) · assets/method/house.md (Prameny, never out) · src/commands/house.ts notToday 416–419 (HOUSE_RECENT 100, --person), material --witness --witness-consent 809–830, notFree 344 · src/core/houses.ts freeLicence 875 · commity 3c9e4853, c96eb4e8, 648b7f1b · nálezy: ochrana dnešních lidí hlídaná jen částečně (spec 030 K1.4a, K6.7), licence materiálu nehlídá kód (K8.5), robots.txt přes strom net web --check neověřeno -->

<a id="S10.6.2"></a>
### S10.6.2 Przejęte dane ze źródłem w sieci

Dana domu (oś czasu, właściciele, mieszkańcy, numery, położenie), której źródłem jest tylko adres w sieci i której nikt
nie czytał, to **nieprzeczytana przejęta dana**. Zwykle przyszła z własnej kwerendy ([S10.8](#S10.8)). Agent
w następnym zadaniu domu czyta ją pod adresem i daną potwierdza, uściśla lub poprawia, z miejscem w źródle (strona,
sekcja).

- Pewność według rodzaju źródła: historia miejscowości i kronika najwyżej **prawdopodobne**.
- Po przeczytaniu jeden wiersz „przejrzano”. Dokument nie jest zapisywany, adres zostaje.
- Niedostępny adres: tylko wiersz w „przejrzano”, dana zostaje taka, jaka była.
- **Granice:**
  - nieprzeczytana dana nie pozwala agentowi zamknąć zadania domu lub szkieletu ([S10.6](#S10.6));
  - dana od człowieka nigdy nie jest zastępowana, nowe źródło trafia obok;
  - nie powstaje z tego zadanie ani pytanie.
- **Obowiązuje od:** badanie 1.38.0
- **Pilnuje kod:** co jest nieprzeczytane, zamknięcie zadania. **Tylko metodyka:** czytanie i pewność.

<!-- zdroj: research:src/core/houseunread.ts (pramen S… s webovou adresou, bez obrázků, záznamu a výřezu, bez přepisu a čtení, ne v prošlo se, nečetlo sezení) · assets/method/house.md „Taken over, never read“ · src/core/houses.ts replaceHouseItem (--replaces jen u položek výzkumu) · commit e4ec6ff8 · dirigent:spec/145 T7 -->

<a id="S10.7"></a>
## S10.7 Wygląd domu

Zadanie domu zapisuje zawsze **krótki wygląd** domu (opis z pewnością i źródłem, ewentualnie obraz) albo jednorazowo
„wygląd: automatycznie więcej się nie da – <dlaczego>”. Potem mówi, czy o wyglądzie jest co znaleźć: **materiał do
przeczytania**, **zdjęcie miejscowości**, na którym dom prawdopodobnie jest, **źródło pod ręką**, które opisuje
budynek, albo **automatycznie nic więcej**.

- **Zadanie wyglądu** („Wygląd domu <dom>”) następuje po zadaniu domu tylko tam, gdzie jest co znaleźć, i tylko
  z włączonym Wyglądem domów ([S10.5.1](#S10.5.1)). Agent czyta w nim tylko materiał, obraz, źródło pod ręką i stare
  zdjęcie lotnicze przy punkcie domu; to, co da się tylko ręcznie (np. szkic indykacyjny), zapisuje do ręcznego
  przejrzenia.
- **Obrazy miejscowości** i **nazwy terenowe** zapisuje szkielet miejscowości raz dla wszystkich domów miejscowości;
  obrazy tylko z wolną licencją, z licencją i autorem.
- **W aplikacji:** sekcja **Wygląd domu** na stronie domu: opis z pewnością i pochodzeniem, obrazy domu z licencją,
  **Obrazy miejscowości**, **Nazwy terenowe** (ta przy tym domu pierwsza). Gdy nic nie wiadomo: „Nie wiadomo, jak dom
  wyglądał.”, ręczny sposób i **Dołącz materiał…**. Stan **w kolejce: wygląd domu**.
- **Materiał do gotowego domu** (z włączoną Historią domów i Wyglądem domów) zakłada zadanie wyglądu („po badaniu domu
  dodano do niego materiał”).
- **W wynikach:** wygląd jest też na zapisanej stronie domu, w rozdziale **Domy** księgi i na stronach rodu; obrazy
  domu z licencją i obrazy miejscowości według ustawienia **Zdjęcia z internetu w wynikach** ([S10.7.1](#S10.7.1)).
- **Granice:**
  - zadanie wyglądu po zamówionym domu jest też zamówione (nie jest odkładane), ale nie idzie na początek kolejki;
  - z wyłączonym Wyglądem domów zostaje tylko krótki wygląd;
  - **Dołącz materiał…** pod nieznanym wyglądem tylko w drzewie, które można edytować.
- **Obsługa:** aplikacja: strona domu → **Wygląd domu**; terminal: `strom house show <dom>` (**Wygląd**, **Więcej
  o wyglądzie**, **Obrazy**, **Nazwy miejscowe**), ustawienia [S10.5.1](#S10.5.1).
- **Obowiązuje od:** badanie 1.38.0, aplikacja 3.33.0
- **Pilnuje kod:** zadanie wyglądu tylko tam, gdzie jest co znaleźć, licencje obrazów, jedno „automatycznie więcej się
  nie da”.

<!-- zdroj: research:src/core/houseauto.ts houseTaskDone 334, createLookTask (asked bez top), houseTaskForMaterial 484 (house.look.material) · src/commands/house.ts look, look-check (--next material|picture|source|none, house.look.unknown), picture, field-name · cs.json ui.house.look, lookCheck, lookNext.*, pictures, fieldNames, house.look.what/why/done · assets/method/house.md house-look · app:src/house-page.ts sec.look, lookUnknown · strings.ts houses.st.queuedLook · commity research 8561e5b1, 202c0927, 9242429a, app 21584d89 · dirigent:spec/145 T1 · nález: úkol podoby vyžádaný, ale ne na vršek -->

<a id="S10.7.1"></a>
### S10.7.1 Zdjęcia domu i miejscowości w wynikach

Zapisana strona domu ([S10.3.2](#S10.3.2)), rozdział **Domy** w księdze i strony domów na stronach rodu
([S10.10](#S10.10)) pokazują obrazy domu na wolnej licencji i **Obrazy miejscowości** ([S10.7](#S10.7)). Każdy obraz
ma podpis: co przedstawia (przy obrazie miejscowości), autor, licencja i link do jego adresu w internecie.

- **Ustawienie Zdjęcia z internetu w wynikach** dotyczy wszystkich trzech wyników i zapamiętuje je ta przeglądarka:
  - **Wczytaj z internetu** (domyślnie): plik po otwarciu wczytuje obraz z jego adresu w internecie, nad podpisem
    z linkiem;
  - **Tylko odnośnik**: tylko podpis i link.
- **Okno Księga i strony** ma przełącznik **Zdjęcia domów z internetu** (włączony = **Wczytaj z internetu**). To samo
  ustawienie: przełączenie w oknie zmienia też Ustawienia. Pokazuje się tylko, gdy dom wyboru ma obraz:
  - księga: w sekcji **Części księgi** pod **Położenie domów**, tylko z częścią **Domy**;
  - strony rodu: przy opcji **Domy**, tylko z **W stronach rodzinnych, powiązane z osobami**.
- **Zapisz HTML** na stronie domu nie ma przełącznika, działa według ustawienia.
- **Bez sieci** obraz w pliku nie zajmuje miejsca i zostaje podpis z linkiem.
- **Granice:**
  - obraz domu tylko z licencją; obrazy domu i miejscowości tylko z adresem `http` lub `https`;
  - księga daje każdy obraz raz: obraz miejscowości, który już stoi przy wcześniejszym domu rozdziału, się nie
    powtarza;
  - plik nie wczytuje z zewnątrz skryptów, czcionek ani ramek; obraz wczytuje się bez informacji, skąd plik jest
    otwierany;
  - w oknie aplikacji obrazy wczytują się zawsze; ustawienie dotyczy tylko plików.
- **Obsługa:** aplikacja: **Ustawienia → Dane i prywatność → Zdjęcia z internetu w wynikach** (**Wczytaj z internetu** /
  **Tylko odnośnik**); okno **Księga i strony** → **Zdjęcia domów z internetu**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:45d99711 src/settings.ts isOutputWebPhotos (výchozí true), setOutputWebPhotos · index.html output-web-photos-setting (settings.groupData) · src/ui/misc.ts output-web-photos · src/house-page.ts housePicturesOf, webPictures (c.app vždy), pictureImg (alt "", referrerpolicy no-referrer, bez onerror), look.images jen s license, town.pictures safeHttpUrl · src/book-houses.ts picturesHtml (seen: obrázek jednou za kapitolu, P.lookPictures) · src/ui/book-ui.ts book-house-photos (kniha: avail.houses && parts.houses && housePicturesOf; stránky: houses === 'pages'), data-switch webPhotos → SettingsManager · src/ui/house-page-ui.ts webPhotos z nastavení · strings.ts outputWebPhotos.setting, load, link, settingHint, bookSwitch, bookSwitchHint; book.dialogTitle, dlg.parts, dlg.houseMaps · dirigent:spec/145 T8, prace/1128-app-dum-export-navrh-fotky -->

<a id="S10.8"></a>
## S10.8 Własna kwerenda i materiał do domu

Własną kwerendę domu (notatki, wypisy, linki) można przekazać badaniu. Tekst zostaje zapisany bez zmian jako materiał
„własna kwerenda”, a zadanie przejęcia wpisuje go do domu bez ponownego szukania.

- **Co przyjmuje:** `.md`, `.markdown`, `.txt`, plik lub folder. Dom rozpoznaje po pierwszym nagłówku, inaczej po
  nazwie pliku; dwa numery to dwa domy. Ten sam plik drugi raz: „już przejęto”.
- **Niejasne** (miejscowość nie jest miejscem badania, kilka miejsc o tej samej nazwie, domu nie ma w drzewie) pyta
  w terminalu („Który dom?”, **dodać dom …**, **nie przejmować pliku**); niczego nie zgaduje.
- **Linki w tekście** są oznaczane jako przejrzane; linki w sekcji z nagłówkiem „ručně” lub „badatelna” zostają do
  ręcznego przejrzenia.
- **Zadanie przejęcia** („Przejąć kwerendę domu <dom>”): jedno na dom, kolejny plik jest dodawany. Agent niczego nie
  szuka, pewność daje taką, jaką daje tekst (nigdy wyższą), zmianę numeracji tylko jako propozycję. Dane ze źródłem
  w sieci czyta dopiero zadanie domu ([S10.6.2](#S10.6.2)). Stan domu **własna kwerenda czeka na przejęcie**.
- **Materiał do domu** (plik lub wspomnienie): **Dołącz materiał…**. Świadek z nazwiska tylko za zgodą. Z włączoną
  Historią domów zakłada zadanie domu (przy gotowym domu zadanie wyglądu, [S10.7](#S10.7)); z wyłączoną jest tylko
  zapisywany.
- **Plik, który badanie już ma:** partia z domu nie wysyła go do badania ponownie. Po zamknięciu partii aplikacja sama
  dołącza go do domu, najwyżej po 500 plików naraz. Gdy dom plików nie przyjmie, mówi to koniec partii: „To, co badanie
  już miało, nie jest dołączone do domu <dom>: <powód>”. Partia, w której nie ma nic nowego, kończy się „Już
  w Materiałach” z tytułem pliku i „Dołączony do domu <dom>.” ([A3.5](A3-evidence-in-the-app.md#A3.5)).
- **Plik z Materiałów:** plik badania można dołączyć do domu także w oknie **Materiały**: **Połącz z…** → **Dom**
  ([A3.5.4](A3-evidence-in-the-app.md#A3.5.4)). Wtedy jest w **Materiały domu** przy domu w oknie **Domy** i w **Gdzie
  użyto** przy pliku ([A3.5.3](A3-evidence-in-the-app.md#A3.5.3)).
- **Granice:**
  - `.html`, `.htm` i plików w podfolderach nie przyjmuje, tylko je wypisuje;
  - zadanie przejęcia przy wyłączonej Historii domów nie jest odkładane;
  - agent bez terminala niejasnego pliku nie przejmie, zwraca polecenia do uzupełnienia;
  - załączniki (obrazy, dane map) tylko z wolną licencją.
- **Obsługa:** aplikacja: ⋯ przy domu → **Przejmij kwerendę z pliku…** (otwiera terminal), **Dołącz materiał…**;
  okno **Materiały** → **Połącz z…** → **Dom**; terminal: `strom house import <plik|folder> [--house <plik>=<dom>] [--skip <plik>]`,
  `strom house add material <dom> --input I…` lub `--memory "<tekst>"`.
- **Obowiązuje od:** badanie 1.38.0, aplikacja 3.33.0
- **Pilnuje kod:** pytanie o niejasne, zgoda świadka, zadanie przejęcia. **Tylko metodyka:** pewność z tekstu,
  licencje załączników.

<!-- zdroj: research:src/commands/house.ts import 927, material 809–830 · src/core/houseimport.ts · assets/terms/houses.json (ručně, badatelna) · cs.json ui.house.import.*, house.takeover(.why), ui.link.what.house.import · src/core/houseauto.ts houseTaskForMaterial (top false) · assets/method/house.md house-takeover · app:strings.ts houses.st.takeover, takeoverNote · commity 5703ae19, 4a6869fd, f766c63f · nálezy: materiál k domu nejde na vršek (komentář × kód), licence materiálu jen metodika · 1128: app:fc290355 src/ui/batch-ui.ts noteHad (media/known, PUT /media, batch/done known, zip known), batchHadToHouse (POST /houses/material po 500, house.material, hadHouseFailed), batchNothingNew, batchHadHtml · strings.ts batch.hadTitle, hadOne, hadHouse, hadHouseFailed · app:7389ceb2 src/ui/material-attach-ui.ts (záložka Dům) · src/ui/house-material-ui.ts renderHouseMaterialsHtml (houses.materials) · app:f527db12 src/ui/material-uses-ui.ts materialHouseRow -->

<a id="S10.9"></a>
## S10.9 Omówić dom z agentem

**Omów z agentem** otwiera rozmowę z agentem o jednym domu. Agent najpierw wczytuje dom, szkielet miejscowości, metodę
domów i listę źródeł; zapisuje tylko to, co ustali, ze źródłem, a zadanie następcze zakłada tylko wtedy, gdy człowiek
o nie poprosi.

- Przed startem terminal pyta: „rozmowa z agentem (<agent>) o domu <dom>: co znajdzie, zapisze przy domu.” i mówi, że
  agent pracuje w ramach subskrypcji lub kredytu AI.
- **Granice:**
  - tylko z badaniem, w którym pracuje agent: nie w Archiwum Strom, przy badaniu, które czeka na agenta, ani przy
    przykładzie ([S9.4](S9-trying-the-sample.md#S9.4));
  - dom musi mieć zapis lub osoby drzewa.
- **Obsługa:** aplikacja: ⋯ przy domu w oknie **Domy** i ⋯ strony domu → **Omów z agentem** (oznaczenie **AI +
  terminal**); terminal: `strom chat --house <dom>`.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:src/ui/house-material-ui.ts houseChatPossible, houseChatLink (do=chat) · strings.ts houses.discuss · commit 955323be · research:src/core/links.ts 525–546 (chat bez with), src/cli/menu-links.ts houseChat, src/commands/start.ts 165–235 (strom chat --house, ui.chat.house.say) · cs.json ui.link.what.chat.house, ui.link.cost · src/core/live.ts AGENT_FEATURES house.chat, forDemo · commity 8561e5b1, 9242429a · dirigent:spec/145 T2 · nález N5: ve stromu jen ke čtení akce zůstává, když ji výzkum dovolí -->

<a id="S10.10"></a>
## S10.10 Domy w księdze i na stronach

- **Księga domu:** wybór **Dom** („rodzina domu przez pokolenia”) daje księgę o jednym domu: wszyscy z zapisem w domu,
  według urodzenia, z rodzinami („Rodzina domu przez pokolenia: N osób z lat …–…, z małżonkami i dziećmi urodzonymi
  w domu.”). Domyślnie dom osoby w centrum, inaczej dom z historią z największą liczbą osób; **Wybierz dom** proponuje
  **Domy z historią** i **Pozostałe domy**. Opcja **Ostatnie 100 lat tylko z nazwiska** (domyślnie włączona): osoby
  z mniej więcej ostatnich 100 lat tylko z imienia, nazwiska i roli, bez dat. Ze strony domu **Otwórz w książce…**
  otwiera księgę na tym domu.
- **Rozdział Domy** w księdze: domy osób księgi z historią ([S10.1](#S10.1)) lub z gotową historią z badania; przy
  domu opowieść ([S10.14.2](#S10.14.2)), nazwa, wygląd z obrazami domu i miejscowości ([S10.7.1](#S10.7.1)), numery
  w czasie, oś czasu, właściciele,
  mieszkańcy, osobliwości, położenie ([S10.3.4](#S10.3.4)) i źródła jako numerowane przypisy. Domyślnie włączony, tylko gdy drzewo ma co najmniej jeden dom z gotową historią. **Indeks domów** tylko
  z rozdziałem Domy.
- **Strony rodu i Strony drzewa** ([A7.5](A7-book-pages-and-export.md#A7.5)): opcja **Domy**: **W stronach
  rodzinnych, powiązane z osobami** (domyślnie; domy z historią z okresem i pokoleniami, **Indeks domów** za
  miejscowościami i strona każdego domu), **Tylko wzmianka o domu, bez jego stron**, **Bez domów**. Jest proponowana,
  gdy osoby wyboru mieszkały w domu z historią. Oś czasu rodu ma chip **Domy ⌂** ([S10.11](#S10.11)).
- **Granice:**
  - księga podaje położenie tylko z opcją **Położenie domów** i tylko przy domu bez osób z mniej więcej ostatnich
    100 lat ([S10.3.4](#S10.3.4)); w przeciwnym razie „Wydarzenia po <rok> r. i położenie domu nie są podawane
    w książce.”; wydarzenia wrażliwe i wydarzenia badania z mniej więcej ostatnich 100 lat pomija ([S10.3.2](#S10.3.2));
  - strony nie podają o domach niczego z mniej więcej ostatnich 100 lat, poza opowieścią o domu;
  - opowieść z żyjącą osobą księga i strony pomijają tylko przy wyłączonym **Opowieści o domach z żyjącymi osobami**
    ([S10.14.2](#S10.14.2));
  - strony biorą domy z historią według progu ([S10.1](#S10.1)), księga także domy z gotową historią z badania;
  - wybór **Dom** tylko w drzewie z domem z numerem i tylko dla księgi; prezent
    ([A7.9](A7-book-pages-and-export.md#A7.9)) i obraz domów nie mają.
- **Obsługa:** aplikacja: eksport **Księga rodu** → **Dom**, część **Domy**, **Indeks domów**, **Położenie domów**,
  **Zdjęcia domów z internetu**, **Opowieści o domach z żyjącymi osobami**; Strony rodu i Strony drzewa → **Domy**,
  **Zdjęcia domów z internetu**, **Opowieści o domach z żyjącymi osobami**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:src/book-options.ts (book.dlg.kind.house, kindHint.house, chooseHouse, housesHistory, housesOther, dlg.houseScope, houseRecent, bookHouseRecent, parts.houses, parts.houseIndex, bookHouseDefaults, unavailable.houses, unavailable.houseIndexChapter, unavailable.houseIndex), src/book-houses.ts, src/book.ts houseOutputFilter, book.houseIndexProtected, src/lineage.ts case 'house' · src/family-pages.ts 709 outputHouses (overThreshold), src/ui/book-ui.ts 521 familyPages.housesRow, housesOpt.pages/mention/none · page.openInBook · commity 26a28e96, ffc93153, a9f8f9cd, d7db62b4, 5b4d880a, 230afefd, f5b46c5b, 8d93f0d5 · dirigent:spec/145 T6 · T3 poloha v knize: app:438de916 (book.houseChapterProtected) · T4 vyprávění v knize: app:d7f65e13 src/book-houses.ts · T8 koncept a fotky: app:45d99711 src/book-houses.ts picturesHtml, src/book.ts webPhotos, src/family-pages.ts webPhotos · nález N10 (výstupy podle prahu × kniha i s hotovou historií) · 1128: app:28099151 src/book.ts houseStoryForOutput (houseStoriesLiving), src/family-pages-html.ts setStoryHouses, src/ui/book-ui.ts book-house-stories -->

<a id="S10.11"></a>
## S10.11 Domy w innych miejscach aplikacji

| Gdzie | Co |
|---|---|
| strona osoby | adres wydarzenia w domu to link do domu; w **Miejscach** wiersz **Domy** z „Dom <numer> ›” i latami osoby w domu |
| oś czasu | dymek wydarzenia podaje dom |
| oś czasu rodu | chip **Domy ⌂**: wżenienie, wyjście z domu, ostatni w domu |
| mapa | warstwa **Domy rodu** (domyślnie włączona, tylko gdy któryś dom ma punkt); dom bliżej niż 30 px od punktu miejscowości zostaje w miejscowości, dopóki mapa się nie przybliży; w migracji domów nie ma |
| okno **Miejsca** | przy miejscowości **Domy rodu** z listą; **Domy w miejscowości ›**; pozycja **Historia domu <numer>** |
| Tabela | kolumna **Dom** (dom urodzenia lub wydarzenia, link do strony, starszy numer w nawiasie) |
| listy osób | reguła **Mieszkał(a) w domu** (także w latach), według urodzenia, ślubu, spisu, miejsca zamieszkania i zgonu ([A11](A11-lists-of-people.md)) |
| Statystyki | temat **Domy**; najdłużej jedna rodzina, wżenienie ([A13](A13-tree-statistics.md)) |
| wyszukiwanie | grupa **Domy** nad osobami (najwyżej 5); przy osobie znalezionej po numerze domu **Dom ›** |
| kolejka i **Czeka na załatwienie** | zadania **Historia domu <numer>, <miejscowość>**, **Przejmij kwerendę domu <numer>**, **Szkielet miejscowości <miejscowość> dla domów**; **Strona domu ›**; pytanie domu z „Dom <numer> ›”; nowa wersja opowieści „Opowieść o domu <numer> czeka na zatwierdzenie” ([S10.14](#S10.14)) |
| okno **Materiały** | **Połącz z…** → **Dom** dołącza plik badania do domu ([A3.5.4](A3-evidence-in-the-app.md#A3.5.4)); **Gdzie użyto** ma wiersz **Dom** z linkiem do strony domu ([A3.5.3](A3-evidence-in-the-app.md#A3.5.3)) |
| opowieść osoby | w aplikacji link **Dom <numer> ›** do domu z zatwierdzoną opowieścią ([S10.14](#S10.14)); w księdze i na stronach rodu także do szkicu ([S10.14.2](#S10.14.2)) |
| GEDCOM | zapis `_HOUSE` tylko dla domu z nazwą lub połączonego (miejscowość, numery z datą, nazwa, „ten sam dom”); rozdzielenie, położenie, ręczne ukrycie położenia i odkryte wydarzenia tylko w JSON; opowieści o domu GEDCOM nie przenosi |

- **Badanie i `_HOUSE`:** `strom sync` czyta domy z GEDCOM aplikacji jako słowo człowieka: nazwę, brakujący numer
  i „ten sam dom”. Niczego nie usuwa; miejscowość, która nie jest miejscem badania, tylko zgłasza. Badanie nie zapisuje
  `_HOUSE` do pliku.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:src/person-page.ts, src/person-houses.ts (integration.ppHouses, 4bb8b52e) · src/rod-timeline.ts, src/house-events.ts (integration.chip, f5b46c5b) · src/map-houses.ts, src/ui/map-houses-ui.ts (houses.mapLayer, 30 px, mapMigOff; 20f6ef91, 31130150, cef1ed0f) · src/ui/house-request-ui.ts familyHouses.* (fa5df8fb) · Tabulka integration.tableCol (fc7aced0) · ruleLivedIn, ruleYears (9cfd8ef1) · src/ui/tree-stats-ui.ts statsHouses, statsLongest, statsMarriedIn (6acc0762) · src/house-search.ts searchGroup, searchHouse (dfe6c13d) · src/house-tasks.ts taskHouse, taskImport, taskSkeleton (4e322dec) · src/ged-houses.ts (d3fd1e86) · research:src/core/housesync.ts planHouses, applyHouseChange (3fbde6b7), ui.sync.house.* · nález: _HOUSE jen jedním směrem · 1128: app:7389ceb2 src/ui/material-attach-ui.ts (attachTarget.house), app:f527db12 src/ui/material-uses-ui.ts materialHouseRow, app:28099151 src/book.ts storyHouses, src/ui/house-page-ui.ts houseHasStory (status final) -->

<a id="S10.12"></a>
## S10.12 Polecenia `strom house`

| Polecenie | Co robi |
|---|---|
| `strom house list [--town <miejscowość>]` | domy drzewa, z zapisem i tylko z faktów: dom, miejscowość, numer, nazwa, osoby, lata, stan |
| `strom house show <dom>` / `--town <miejscowość>` | cały dom / szkielet miejscowości |
| `strom house sources <dom>` | lista źródeł zadania ([S10.6.1](#S10.6.1)) |
| `strom house add <miejscowość> <numer> [--name]` | nowy dom, także bez osób drzewa |
| `strom house add <rodzaj> <dom> …` | wpis do domu: wydarzenie, właściciel, mieszkaniec, numer (`--proposed`), położenie, przejrzano, do ręcznego przejrzenia, nie wiadomo, tylko w czytelni, wygląd, kontrola wyglądu, obraz, nazwa terenowa, mapa, podsumowanie, materiał, nazwa |
| `strom house confirm <dom> renumber\|location\|not-same` | słowo człowieka ([S10.1.2](#S10.1.2)) |
| `strom house import` | własna kwerenda ([S10.8](#S10.8)) |
| `strom house request` | zamówienie domu ([S10.4.1](#S10.4.1)) |
| `strom house story <dom>` | zamówienie opowieści o domu ([S10.14.1](#S10.14.1)) |
| `strom fixes house-numbers` | domy zapisane na dwa sposoby |

- **Odwołanie do domu:** `A0001`, klucz (`lhota|16`), `L12 16` lub `Lhota 16`. Niejednoznaczne odwołanie badanie
  odrzuca.
- **Źródło** wpisu: `--source S… --locator … --url … --from I…`; `--replaces <id>` zastępuje tylko pozycję badania.
- **`strom fixes house-numbers`** porządkuje domy zapisane przed badaniem 1.38.0 tak, że z jednego domu powstały dwa:
  notatka, która jest tylko numerem domu („čp. 13”), trafia do pola domu (notatka zostaje); oznaczenie przed numerem
  („čp. 16” → „16”) i przed ulicą („čp. Dlouhá 12” → „Dlouhá 12”) znika. Notatka z kilkoma numerami zostaje, a badanie
  mówi dlaczego. Na słowo człowieka, bezpłatnie, także w Archiwum Strom; cofnąć można `strom fixes undo house-numbers`
  ([R13](R13-reporting-a-problem.md)).
- **Granice:** przy szkielecie miejscowości (`--town`) tylko przejrzano, do ręcznego przejrzenia, nie wiadomo, tylko
  w czytelni, mapa, podsumowanie, obraz, nazwa terenowa; podsumowanie, obraz i nazwa terenowa tylko przy miejscowości.
- **Obowiązuje od:** badanie 1.38.0

<!-- zdroj: research:100aee43 src/commands/house.ts house story · research:src/commands/house.ts list 152, show 181, sources 203, add 280/367, confirm 868, import 927, request 232 (hidden) · src/core/houses.ts findHouse 359 (house.unknown, house.ambiguous) · src/core/housenumberfix.ts, src/commands/fixes.ts 1106–1111, ui.fixes.house-numbers.name · cs.json ui.house.head · strom help house (přes guard) · commity 3c69f16c, bd81894a -->

<a id="S10.13"></a>
## S10.13 Drzewo tylko do odczytu i przykład

- **Drzewo tylko do odczytu** (śledzone drzewo, zablokowane drzewo, podgląd): okno **Domy** można otworzyć (jedyny
  wiersz w grupie ustawień drzewa), a domy, strony i mapy można przeglądać. Brakuje: **Połącz z innym domem…**, **To
  inny dom…**, nazwy domu, **Pokaż w wynikach**, **Potwierdź** / **To nie ten sam dom**, **Przesuń punkt**,
  **Potwierdź położenie** i **Dołącz materiał…** pod nieznanym wyglądem. Działania badania (zamówienie, **Omów
  z agentem**, **Dołącz materiał…**) zostają takie, jakie proponuje badanie.
- **Przykład ze strony** ([S9.1.3](S9-trying-the-sample.md#S9.1.3)): działania domów są ukryte.
- **Przykładowe badanie `strom demo`** ([S9.4](S9-trying-the-sample.md#S9.4)): bez zamówienia domu, przejęcia
  kwerendy, rozmowy o domu i opowieści o domu; domy, strony domów i ustawienia można przeglądać.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: app:src/data.ts 2549 housesReadOnly (isReadOnly || isTreeLocked) · src/ui/tree-actions.ts housesRows (read-only: jediný řádek skupiny, 1127) · src/research-link.ts SHOWCASE_ALLOWS house: 'hide' · research:src/core/live.ts forDemo (bez house.request, house.import, house.chat, house.story – AGENT_FEATURES; house, house.material, house.confirm, house.auto, house.look zůstávají) · nálezy N5 (Probrat s agentem ve stromu jen ke čtení), N6 (řádek Historie domů se nejspíš nabídne i u strom demo, neověřeno) -->

<a id="S10.14"></a>
## S10.14 Opowieść o domu

Opowieść o domu to ciągły tekst dla rodziny: właściciele i rodziny w domu przez pokolenia, co działo się z domem,
numery w czasie i gdzie dom stał, jego wygląd i z czego żyła miejscowość. Pisze ją agent badania tylko z tego, co
badanie ustaliło o domu i jego miejscowości; niczego nie szuka od nowa. Tak jak opowieść osoby
([A7.8](A7-book-pages-and-export.md#A7.8)) nie jest źródłem: tylko opowiada to, co udokumentowało badanie.

- **Pilnuje kod:**
  - opowieść zachowuje, na czym się opiera: pozycje domu (numery, wydarzenia, właściciele, mieszkańcy) i dane osób
    drzewa w domu;
  - jest szkicem, dopóki nie zatwierdzi jej człowiek; zatwierdzona opowieść jest zablokowana i nigdy nie zostaje
    nadpisana. Nowa wersja powstaje obok niej, a zatwierdzony tekst obowiązuje, dopóki człowiek nie zdecyduje
    ([R6.3.2](R6-awaiting-action.md#R6.3.2));
  - zatwierdzić albo odrzucić nową wersję może tylko człowiek ([R6.6](R6-awaiting-action.md#R6.6)).
- **Tylko metodyka:**
  - to, co badanie zna tylko ze średnią pewnością, jako przypuszczenie lub wskazówkę, tekst podaje jako niepewne
    („najpewniej”, „według rejestru jeszcze niesprawdzonego”); numer, który nie jest tym samym domem, pomija; czego
    nie znaleziono, mówi;
  - osoby z ostatnich stu lat tylko z imienia i roli w domu (bez choroby, sądu, rozwodu). O tym, co z żyjących pokazać
    lub udostępnić, decyduje aplikacja ([S10.14.2](#S10.14.2));
  - życie osoby należy do jej opowieści; w opowieści o domu osoba ma jedno zdanie z latami w domu.
- **Strona domu**, sekcja **Opowieść** zaraz za **W skrócie**:
  - zatwierdzony tekst z nagłówkiem i źródłami;
  - szkic z etykietą „szkic, czeka na zatwierdzenie” i przyciskiem **Zatwierdź w badaniu** (link do terminala);
    etykieta i przycisk są tylko w aplikacji, wyniki podają szkic bez nich ([S10.14.2](#S10.14.2));
  - nowa wersja obok zatwierdzonej: „Nowa wersja opowieści (dzień) czeka na zatwierdzenie; strona pokazuje
    zatwierdzony tekst.” z **Porównaj**;
  - dopóki się pisze, stan zadania: „Opowieść o domu czeka w kolejce badań.”, „Opowieść o domu jest właśnie
    pisana.”, „Zadanie opowieści jest w badaniach odłożone.”, „Zadanie opowieści czeka w badaniach na odpowiedź.”
- **Czeka na załatwienie:** tylko nowa wersja obok zatwierdzonej: w aplikacji „Opowieść o domu <numer> czeka na
  zatwierdzenie” z linkiem **Dom <numer> ›** do sekcji **Opowieść**, w terminalu „Nowa wersja opowieści o domu <dom> –
  do czasu decyzji obowiązuje wersja zatwierdzona”. Pierwszego szkicu tam nie ma: zatwierdza się go na stronie domu
  albo `strom story approve A…`.
- **Opowieść osoby**, która w domu mieszkała, ma w aplikacji pod tekstem link **Dom <numer> ›** do opowieści domu,
  tylko gdy dom ma zatwierdzoną opowieść; tekst domu się nie powtarza. W księdze i na stronach rodu zob.
  [S10.14.2](#S10.14.2).
- **Granice:** aplikacja bierze opowieść o domu tylko z mostu badania (GEDCOM jej nie przenosi); bez połączenia
  z badaniem nie ma sekcji ani linku.
- **Obsługa:** aplikacja: strona domu → **Opowieść**, **Zatwierdź w badaniu**, **Porównaj**; terminal:
  `strom story show A…`, `strom story approve A…`, `strom story discard A…`, menu **Co czeka**.
- **Obowiązuje od:** aplikacja 3.33.0, badanie 1.38.0

<!-- zdroj: research:100aee43 src/core/housestory.ts (House.story jako Story osoby; facts n…, e…, h…, r…, E…; draft vedle final), src/core/storykeep.ts, src/commands/story.ts (approve|discard A…, person only), src/core/waiting.ts (kind story s house jen pro novou verzi; APP_SHOWS_HOUSE_STORY), assets/method/narrate.md „for house-story“ · cs.json ui.waiting.story.house · app:3473602e src/house-page.ts storyHtml (sec.story za sum; storyDraft, storyNew, storyTask), src/ui/house-page-ui.ts (research.approveStory, story.compare, story?house=&do=final|keep), src/ui/research-overview-ui.ts houses.storyWaiting · app:3080a121 src/person-page.ts storyHousesHtml (houseLink) · zadání aplikace ↔ výzkum ZADANI_VYZKUM_145-domy.md „T4 vyprávění o domě“, „Odpověď stromu k T4“ (první koncept bez položky Co čeká – záměr) -->

<a id="S10.14.1"></a>
### S10.14.1 Kiedy powstaje opowieść: sama i na żądanie

- **Sama:** przy włączonych opowieściach (ustawienie `stories`, domyślnie włączone), po ostatnim kroku badania domu
  (badanie domu, ewentualnie jego wygląd, [S10.7](#S10.7)), gdy dom mówi dość: **2 pokolenia drzewa** w domu (rodzic
  i dziecko) albo **3 właścicieli i mieszkańców ze źródłami**. Kolejna wersja tylko wtedy, gdy dom od ostatniej wersji
  przyniósł co najmniej **2 nowe dane**.
- **Na żądanie:** ⋯ na stronie domu lub w oknie **Domy** → **Napisz opowieść o domu** (gdy opowieść już jest,
  **Napisz nową wersję opowieści**); w terminalu `strom house story <dom>` (zapyta, `--yes` bez pytania). Zadanie
  trafia na początek kolejki badań i weźmie je najbliższa sesja `strom run`; agent się przez to nie uruchamia. Działa
  niezależnie od progu i od ustawienia `stories`. Zadanie, które już jest, tylko się przesuwa: „Zadanie już istniało;
  przesunęło się na początek kolejki badań.”
- **Granice:**
  - tylko dom, o którym badanie już coś zapisało; w przeciwnym razie „W badaniach nie ma jeszcze nic o tym domu;
    opowieść powstaje z jego badań.” (najpierw historia domu, [S10.4](#S10.4));
  - tylko badanie z własnym agentem: w Archiwum Strom, w badaniu, które czeka na agenta, i w `strom demo`
    ([S10.13](#S10.13)) nie jest proponowana;
  - zadanie opowieści idzie kolejką jak inne opowieści ([R2.2.2](R2-lines-and-queue.md#R2.2.2)); nie zmienia stanu
    domu, a wyłączona Historia domów ([S10.5.1](#S10.5.1)) go nie odkłada;
  - zadanie, które człowiek porzucił, samo nie powstaje ponownie (aż do nowej wersji nie).
- **Obsługa:** aplikacja: ⋯ strony domu lub okna **Domy**; terminal: `strom house story <dom>`,
  `strom config set stories no` (wyłącza opowieści same z siebie).
- **Obowiązuje od:** badanie 1.38.0, aplikacja 3.33.0

<!-- zdroj: research:100aee43 src/core/housestory.ts HOUSE_STORY_GENERATIONS 2, HOUSE_STORY_PEOPLE 3, houseStoryReach, houseStoryDue (STORY_NEW_FACTS 2 ze src/core/stories.ts; dropped od posledního textu → nic), raiseHouseStories (stories on, ne actsAsArchive, row.state done), askHouseStory (queueAt next, parked → open, house.story.none, house.archive), createStoryTask level narrate · src/commands/house.ts house story (--yes, NeedsInputError) · src/core/live.ts AGENT_FEATURES house.story, POST /houses/story · src/core/config.ts stories (yes výchozí) · strom help house story · app:3473602e strings.ts houses.writeStory, writeStoryAgain, storyAsked, storyMoved, errStoryNone -->

<a id="S10.14.2"></a>
### S10.14.2 Opowieść w wynikach i ochrona osób

- Księga rodu (część **Domy**), zapisana strona domu i strony rodu podają zatwierdzony tekst. Dopóki opowieść nie jest
  zatwierdzona, podają szkic tak samo jak zatwierdzony tekst: bez etykiety „szkic, czeka na zatwierdzenie”, bez innego
  wyglądu i bez przycisków. Etykieta, **Zatwierdź w badaniu** i **Porównaj** są tylko w aplikacji. Przy nowej wersji
  obok zatwierdzonej do pliku trafia zatwierdzony tekst, nowa wersja nie. W księdze opowieść stoi przed sekcjami domu,
  a jej źródła są wśród numerowanych przypisów rozdziału.
- Opowieść trafia do wyniku w całości albo wcale; tekst nie jest przerabiany. Osoby z mniej więcej ostatnich 100 lat,
  osoby badania, których drzewo nie zna, ani pozycje domu, które wynik ukrywa ([S10.3.2](#S10.3.2)), jej nie pomijają.
  Pozostała ochrona domu obowiązuje dalej.
- **Zapisana strona domu** zawiera opowieść zawsze.
- **Księga rodu i strony rodu** mają przełącznik **Opowieści o domach z żyjącymi osobami** (domyślnie włączony,
  zapamiętywany z pozostałymi opcjami okna): „Włączone: trafia każda opowieść o domu. Wyłączone: opowieść, w której
  występuje żyjąca osoba, zostaje pominięta.”
  - żyjąca osoba to osoba drzewa, którą aplikacja uważa za żyjącą ([A7.1](A7-book-pages-and-export.md#A7.1)); osoba
    badania, której drzewo nie zna, nie liczy się jako żyjąca;
  - przełącznik działa niezależnie od ustawienia ochrony żyjących i pomija tylko taką opowieść, nic więcej;
  - księga: w sekcji **Części księgi** pod **Położenie domów** i **Zdjęcia domów z internetu**, tylko z częścią **Domy**;
    strony rodu: przy opcji **Domy**, tylko z **W stronach rodzinnych, powiązane z osobami**;
  - jest proponowany tylko wtedy, gdy dom wyboru ma opowieść, w której występuje żyjąca osoba. Wyniki domów z badania
    okno wczytuje zaraz po otwarciu.
- **Prezent** ([A7.9](A7-book-pages-and-export.md#A7.9)) nie zawiera opowieści o domach: nie czyta wyników domów
  z badania.
- Link **Dom <numer> ›** z opowieści osoby do domu jest w księdze i na stronach rodu tylko wtedy, gdy wynik pokazuje
  opowieść domu, także gdy jest to szkic.
- **Obsługa:** aplikacja: eksport **Księga rodu** → część **Domy**, **Opowieści o domach z żyjącymi osobami**; strona
  domu → **Zapisz HTML**; strony rodu → **Domy**, **Opowieści o domach z żyjącymi osobami**.
- **Obowiązuje od:** aplikacja 3.33.0

<!-- zdroj: app:3473602e src/house-privacy.ts houseStoryForOutput · app:d7f65e13 src/book-houses.ts (vyprávění před oddíly, prameny v poznámkách kapitoly) · app:3080a121 src/family-pages-html.ts setStoryHouses · research:src/core/housestory.ts houseStoryView people {id, died} · T8: app:45d99711 src/house-privacy.ts houseStoryForOutput (nová verze vedle final → final) · 1128: app:28099151 src/house-privacy.ts houseStoryForOutput (bez recent, osob bez úmrtí a skrytých položek; leaveOutLiving), houseStoryNamesLiving (personOfRef a ctx.living, osoba mimo strom ne), src/book-houses.ts (bez book-house-story-tag), src/house-page.ts storyHtml (štítek a Schválit jen c.app), shownStory (storyLiving), src/book.ts (opts.houseStoriesLiving), src/book-options.ts housesStoryWithLiving, bookHouseStoriesLiving (výchozí zapnuto), src/book-memory.ts houseStoriesLiving (kniha i PagesChoices), src/ui/book-ui.ts book-house-stories (kniha: parts.houses a chapterHouses; stránky: houses pages), readDialogHouses, src/family-pages-html.ts setStoryHouses (houseStoriesLiving) · strings.ts book.dlg.houseStoriesLiving, houseStoriesLivingHint · src/gift-package.ts (bez houseResearch) · dirigent:prace/1128-app-dum-vypraveni-ochrana Výsledek (dárek vyprávění domů nenese; osoba mimo strom bez úmrtí není žijící) -->
