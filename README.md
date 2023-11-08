# Shift.mg
Projekt inżynierski, który zaowocował stworzeniem aplikacji internetowej do skutecznego zarządzania wolontariuszami, podczas wszelkiego rodzaju wydarzeń.

1. Autoryzacja użytkowników
2. Panel użytkownika
3. System powiadomień
4. Obsługa wydarzeń w aplikacji
   * Dostępne metody prezentacji aktywnych wydarzeń
   * Tworzenie wydarzeń
   * Zarządzanie wydarzeniem
   * Zarządzanie wolontariuszami i rolami w obrębie wydarzenia


## **1. Autoryzacja użytkowników**
Logowanie w aplikacji wyzwalane jest z poziomu okna logowania, pojawiającego się w przypadku próby wejścia niezalogowanego użytkownika na adres aplikacji. 
Po naciśnięciu przycisku „Login with Google”, otwiera się okno logowania za pomocą konta Google.


## **2. Panel użytkownika**
Panel użytkownika umiejscowiony jest na pasku bocznym, w jego dolnej części. 
W obrębie panelu użytkownika znajduje się ikona użytkownika, której naciśnięcie otwiera menu, z którego można przejść do okna ustawień, albo wylogować się z aplikacji. 
Pod ikoną użytkownika znajduje się również ikona dzwonka, będąca częścią systemu powiadomień, oraz ikona zmiany motywu aplikacji.


## **3. System powiadomień**
Powiadomienia przechowywane są po stronie API i dostępne po wykonaniu zapytania GET z id użytkownika na endpoint „/notifications/{id_użytkownika}”.
Aplikacja webowa regularnie co 5 sekund odpytuje ten endpoint w celu aktualizacji lokalnego stanu powiadomień. W przypadku wykrycia przez aplikację webową nowego powiadomienia, użytkownik informowany jest o tym na panelu bocznym aplikacji, w formie małej liczby nowych powiadomień, w kole przy ikonie dzwonka. Naciśnięcie na ikonę dzwonka otwiera panel powiadomień, w którym widoczne są nowe powiadomienia. 
System powiadomień obsługuje jedynie informowanie na temat nowych zaproszeń do wydarzeń. Wciśnięcie powiadomienia w panelu powiadomień przenosi użytkownika na stronę akceptacji zaproszenia do wydarzenia.

W oknie zaproszenia użytkownikowi przedstawiana jest nazwa wydarzenia, do którego został zaproszony oraz informacja, jaką rolę będzie pełnił na tym wydarzeniu. Decyzja użytkownika wysyłana jest do API. W przypadku akceptacji, użytkownik zostaje przeniesiony na stronę wydarzenia. Odrzucenie zaproszenia przenosi użytkownika na stronę główną. Niezależnie od decyzji powiadomienie z zaproszeniem zostaje oznaczone jako przeczytane i nie wyświetla się w panelu powiadomień, ani przy ikonie powiadomień.


## **4. Obsługa wydarzeń w aplikacji**
### **Dostępne metody prezentacji aktywnych wydarzeń**
Użytkownikowi aplikacji udostępniane są trzy metody prezentacji wydarzeń
w jakich bierze udział:
- Widok kafelków – pierwszy z dwóch widoków, dostępny z poziomu strony wydarzeń – „events”. Widok przedstawia wydarzenia w formie kafelków. Kafelek zawiera podstawowe informacje na temat wydarzenia, takie jak: nazwa wydarzenia, data rozpoczęcia, krótki opis. Każdy kafelek stylowany jest kolorem i oznaczony jest ikoną, wybraną przez użytkownika podczas tworzenia wydarzenia dla ułątwienia rozróżnienia kafelków.
- Widok listy – drugi widok dostępny na stronie wydarzeń. Przedstawia wydarzenia w formie tabeli, dającej użytkownikowi inny zestaw informacji o wydarzeniu niż w przypadku kafelków. Wydarzenie w widoku listy opisane jest nazwą, datą rozpoczęcia, zakończenia, lokalizacją – wskazaniem gdzie się odbywa oraz informacją czy wydarzenie jest publiczne, czy prywatne.
- Kalendarz – dostępny pod osobną stroną „calendar”. Wydarzenia przedstawione w formie zdarzeń w kalendarzu, utworzonym przy wykorzystaniu komponentu kalendarza udostępnionego w bibliotece „react-big-calendar”. Widok ten dostarcza takie informacje, jak czas trwania wydarzenia i jego nazwa. Użytkownik w tym widoku może w łatwy sposób zarządzać swym czasem dzięki rozłożeniu wydarzeń w kalendarzu, oznaczaniu kolorem i nakładaniu się wydarzeń odbywających się w tych samych dniach.

W każdym z dostępnych widoków, kliknięcie przez użytkownika w wydarzenie, kafelek bądź wiersz listy, przenosi na stronę szczegółów tego wydarzenia.


### **Tworzenie wydarzeń**
Tworzenie wydarzeń odbywa się z poziomu formularza. Formularz zaimplementowany został z wykorzystaniem biblioteki „react-hook-form”. Na potrzeby
ułatwienia implementacji, napisane zostały własne komponenty dla elementów do wprowadzania danych w formularzu. Każdy komponent został napisany tak aby na wejściu, przyjmować ustandaryzowane informacje w formie atrybutów dla wszystkich komponentów formularza. 
Atrybuty komponentu formularza:
- name – przyjmuje nazwę, do której możliwe będzie późniejsze odwołanie się w kodzie, by uzyskać wartość wpisaną przez użytkownika
- label – przyjmuje tekst etykiety wyświetlanej użytkownikowi przy komponencie

Zastosowanie komponentów formularza ułatwiło tworzenie formularzy w kodzie, zwiększyło jego przejrzystość i ustandaryzowało styl wszystkich formularzy w aplikacji W aplikacji stworzono 8 typów komponentu do wprowadzenia danych:

- TextInput – komponent przyjmujący tekst
- CheckBoxInput – komponent przyjmujący wartość tak/nie w formie obiektu do zaznaczenia przez użytkownika
- RadioSelectInput – komponent pozwalający na wybór jednej z podanych do komponentu opcji. Opcje przekazywane są w formie tabeli obiektów. Każdy obiekt zawiera nazwę wewnętrzną, która zostanie zwrócona do kodu oraz nazwę wyświetlaną użytkownikowi.
- ColorPickerInput – komponent do wyboru koloru. Użytkownikowi udostępnia otwieralne okno dialogowe z paletą kolorów. Zaimplementowane zostało za pomocą biblioteki „react-colorful”
- DateInput – komponent dla wybierania daty. Użytkownikowi udostępnia otwieralne okno dialogowe z kalendarzem, dla zaznaczenia daty. Zaimplementowano za pomocą biblioteki „materialui-daterange-picker”
- DateRangeInput – komponent bazujący na komponencie DateInput. Umożliwia wybranie daty rozpoczęcia i zakończenia
- FileInput – komponent dla dodawania plików przez użytkownika. Zaimplementowano go za pomocą biblioteki „material-ui-dropzone”
- IconPickerInput – komponent wyboru ikony z dostępnych piktogramów w aplikacji. Udostępnia użytkownikowi otwieralne okno dialogowe zawierające ikony do wyboru. Ikony zaciągane są z API i prezentowane w formie siatki. Naciśnięcie na ikonę powoduje jej wybór.

Wykorzystując przedstawione wyżej rozwiązanie, utworzony został formularz tworzenia wydarzenia, dostępny po naciśnięciu przycisku „create” na stronie wydarzeń.


### **Zarządzanie wydarzeniem**
Zarządzanie wydarzeniami odbywa się z poziomu widoku szczegółów wydarzenia. Widok ten otwiera się po wybraniu wydarzenia w jednym z dostępnych widoków. 
Aplikacja pozwala właścicielowi i osobom uprawnionym przez rolę z uprawnieniami edycji szczegółów wydarzenia. 
Edycja odbywa się w ramach formularza tworzenia wydarzenia, który na etapie ładowania widoku edycji wypełniany jest aktualnymi informacjami na temat wydarzenia. Aplikacja pozwala również na usunięcie takiego wydarzenia.


### **Zarządzanie wolontariuszami i rolami w obrębie wydarzenia**
Widok szczegółów wydarzenia pozwala również na zarzadzanie wolontariuszami, zmianami oraz rolami im przypisanymi. 
Odbywa się to w obrębie modułu, poniżej pola szczegółów wydarzenia. Moduł ten udostępnia wewnątrz siebie 3 dynamiczne widoki:

- Members – do zarządzania listą osób biorących udział w wydarzeniu wraz z przypisaną im rolą
- Roles – do zarządzania dostępnymi rolami i uprawnieniami przypisanymi do roli
- Shifts – do zarządzania zmianami i przypisywania do nich wolontariuszy

Każdy z widoków pozwala na dodawanie, edycję oraz usuwanie istniejących członków, ról i zmian. 
Dodawanie dostępne jest za pomocą przycisku znajdującego się w prawym górnym rogu modułu. Edycja i usuwanie dostępne są w tym samym miejscu, ale dopiero po zaznaczeniu rekordów na liście.

Aplikacja udostępnia możliwość zapraszania osób posiadających konto w aplikacji, ale również tych, którzy go nie posiadają, poprzez podanie adresu e-mail takiej osoby.
Proces dołączania do wydarzenia różni się nieco w zależności od tego czy zapraszana osoba ma już konto na platformie, czy nie. Wybranie opcji „Invite” w widoku „Members” wyświetli okienko, w którym możliwe jest zaproszenie osób. Wybiera się tam zapraszaną osobę z listy wpisując w pole „Email Address”. Możliwe jest aby jednoczesnie zaprosić kilka osób, wystarczy po wybraniu pierwszej osoby wybrać kolejną na tej samej zasadzie, podając jej adres w tym samym polu. Po wpisaniu adresu nieprzypisanego do żadnego z użytkowników platformy – pojawi się możliwość zaproszenia użytkownika za pomocą e-maila. W oknie zaproszeń dostępna jest również możliwość wskazania, jaka rola zostanie przydzielona zaproszonym użytkownikom.
Użytkownik posiadający konto na platformie o nowym zaproszeniu jest informowany z pomocą panelu powiadomień. Opisane to zostało w rozdziale dotyczącym systemu powiadomień. Zaproszona osoba nieposiadająca konta zostanie poinformowana o zaproszeniu drogą mailową. W treści maila znajduje się link do logowania w aplikacji wraz z numerem zaproszenia. Użytkownik po zalogowaniu się z tego linku zostaje od razu przeniesiony do widoku zaproszenia.

