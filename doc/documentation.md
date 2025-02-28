# Einführung und Ziele

Der Technologie-Radar ist ein passendes Werkzeug für Technologie-Management in einem Unternehmen, für ein Produkte-Team oder auch für sich als Software Architekt oder Software Engineer. Es gibt bereits verschiedene Umsetzungen von Technologie-Radare. Das prominenteste Beispiel ist der Technology Radar von ThoughtWorks.

Dabei werden die einzelnen Technologien jeweils in sogenannten vier Quadranten eingeordnet (Kategorien wie z.B. Techniques, Tools, Platforms, Languages & Frameworks). Die Maturität wird über sogn. Ringe eingestuft (Assess, Trial, Adopt, Hold).

## Aufgabenstellung
Als Software-Anbieter möchten Sie den Technologie-Radar als Software as a Service anbieten. Der Technologie-Radar besteht aus zwei elementaren Teilen:

* einer Technologie-Radar-Administration, in welcher die Technologien vom CTO oder einm Tech-Lead verwaltet werden können
* einem Technologie-Radar-Viewer, auf welcher der Technologie-Radar resp. die Technologien allen Mitarbeiter eingesehen werden können.

Optionaler Teil (nicht Teil der Aufgabenstellung):

* einer System-Administration, in welche neue Unternehmen resp. Mandanten erfasst und Personen eingeladen werden können.


## Qualitätsziele

Das Projekt hat in der Aufgebenstellung drei Qualitätsziele definiert:
* Der Technologie-Radar-Viewer soll neben der Desktop-Ansicht, auch für die Mobile-Ansicht optimiert sein.
* Der Technologie-Radar-Viewer soll innert 1s geladen sein.
* Sämtliche Anmeldungen an die Technologie-Radar-Administration werden aufgezeichnet.

# Randbedingungen
In der Gestaltung (UI) ist der Techradar frei umzusetzen. Die Darstellung der Techniken kann mittels eines Kreises, Quadranten oder Tabelle erfolgen.

Die einzige Bedingung ist die Verwendung von JavaScript für die Frontend- und Backendentwicklung.

# Kontextabgrenzung

Die Benutzer können im Grundsatz alles lesen. Ausgenommen davon sind Technologien, die noch nicht veröffentlicht sind. Diese Technologien sind nur für Administratoren sichtbar. Administratoren können alle Technologien lesen und bearbeiten. Weiter kann der Administrator Ringe und Kategorien erfassen. 

![Kontextdiagramm](images/Kontextdiagramm.png)


Im Techradar gibt es zwei Benutzerrollen:
* Benutzer (user)
* Adminstator (admin)

> [!NOTE]  
> Aktuell können Benutzerrollen nur in der Datenbank vergeben werden. Ein neuer Benutzer hat Standardmässig die Benutzer-Rolle zugeteilt. Ein Administrator kann die Benutzer-Rolle in der Datenbank auf Administrator ändern.

### Frontend

Alle Eingaben der Benutzer und Benutzer und Administratoren erfolgen über das Frontend. Das Frontend leitet die Befehle an das Backend weiter. Das Backend verarbeitet die Befehle und speichert die Daten in der Datenbank. Die Entscheidung, ob ein Benutzer genügend Rechte hat, um eine Aktion auszuführen, wird im Backend entschieden.

### Backend

Im Backend erfolgen alle Aufrufe mittels REST. Die Aufrufe wurden wo sinnvoll, nach CRUD (Create, Read, Update, Delete) gestaltet. Das Backend enthält jegliche Logik und Schnittstellen zur Datenbank.

## Fachlicher Kontext 

Die Daten werden mittels DTOs zwischen dem Frontend und dem Backend hin und her gegeben. Die DTOs sind in der Datenbank gespeichert. Die DTOs werden im Backend in Entities umgewandelt und in der Datenbank gespeichert. Die DTOs werden im Frontend entsprechend umgewandelt und dargestellt.


Die Kommunikation zwischen Frontend und Backend erfolgt mittels REST. Die REST-Aufrufe werden im Backend verarbeitet und in der Datenbank gespeichert. Die REST-Aufrufe werden im Frontend entsprechend verarbeitet und dargestellt.

## Technischer Kontext 

### Frontend
Das Frontend enthält keine veröffentlichten Schnittstellen. Der Benutzer kann lediglich mit dem GUI mit dem System interagieren. 

### Backend

Das Backend enthält REST-Schnittstellen. Folgende Endpunkte sind verfügbar:

#### Kategorien
````
* GET /technologies
````
  | Parameter | Type      | Description    |
  |:----------|:----------|:---------------|
  | `request` | `request` | **Required**.  |
````
* GET /technologies/{id}
````
| Parameter | Type      | Description                                       |
|:----------|:----------|:--------------------------------------------------|
| `request` | `request` | **Required**.                                     |
| `id`      | `string`  | **Required**. The id of the requested technology. |

````
* POST /technologies
````
| Parameter               | Type            | Description                                   |
|:------------------------|:----------------|:----------------------------------------------|
| `request`               | `request`       | **Required**.                                 |
| `CreateTechnologiesDTO` | `string`        | **Required**. The DTO to create a technology. |
````
* PATCH /technologies/{id}
````
| Parameter               | Type            | Description                                   |
|:------------------------|:----------------|:----------------------------------------------|
| `request`               | `request`       | **Required**.                                 |
| `UpdateTechnologiesDTO` | `string`        | **Required**. The DTO to update a technology. |
````
* DELETE /technologies/{id}
````
| Parameter        | Type      | Description                                       |
|:-----------------|:----------|:--------------------------------------------------|
| `request`        | `request` | **Required**.                                     |
| `technologiesID` | `string`  | **Required**. The id of the technology to delete. |

##### DTOs
CreateTechnologiesDTO:
```
{
  "name": "string",
  "fk_ring": "string",
  "fk_category": "string",
  "description": "string",
  "description_categorisation": "string",
  "published": true
}
```

UpdateTechnologiesDTO:
```
{
  "name": "string",
  "fk_ring": "string",
  "fk_category": "string",
  "description": "string",
  "description_categorisation": "string",
  "published": true
}
```
#### Ringe
````
* GET /rings
````
| Parameter | Type      | Description    |
|:----------|:----------|:---------------|
| `request` | `request` | **Required**.  |
````
* GET /rings/{id}
````
| Parameter | Type      | Description                                 |
|:----------|:----------|:--------------------------------------------|
| `request` | `request` | **Required**.                               |
| `id`      | `string`  | **Required**. The id of the requested ring. |
````
* POST /rings
````
| Parameter       | Type            | Description                             |
|:----------------|:----------------|:----------------------------------------|
| `request`       | `request`       | **Required**.                           |
| `CreateRingDTO` | `string`        | **Required**. The DTO to create a ring. |
````
* PATCH /rings/{id}
````
| Parameter       | Type            | Description                             |
|:----------------|:----------------|:----------------------------------------|
| `request`       | `request`       | **Required**.                           |
| `UpdateRingDTO` | `string`        | **Required**. The DTO to update a ring. |
````
* DELETE /rings/{id}
````
| Parameter | Type      | Description                                 |
|:----------|:----------|:--------------------------------------------|
| `request` | `request` | **Required**.                               |
| `ringsID` | `string`  | **Required**. The id of the ring to delete. |

##### DTOs
CreateRingDto:
````
{
  "name": "string",
  "description": "string",
  "level": 0
}
````
> [!NOTE]  
> Das Level darf maximal einmal vorhanden sein. Es braucht eine Einmaligkeit, um die Sortierung zu gewährleisten! Dies wird im Backendservice geprüft.

UpdateRingDto:
````
{
  "name": "string",
  "description": "string",
  "level": 0
}
````
> [!NOTE]  
> Das Level darf maximal einmal vorhanden sein. Es braucht eine Einmaligkeit, um die Sortierung zu gewährleisten! Dies wird im Backendservice geprüft.

#### Kategorien
````
* GET /categories
````
| Parameter | Type      | Description    |
|:----------|:----------|:---------------|
| `request` | `request` | **Required**.  |
````
* GET /categories/{id}
````
| Parameter | Type      | Description                                     |
|:----------|:----------|:------------------------------------------------|
| `request` | `request` | **Required**.                                   |
| `id`      | `string`  | **Required**. The id of the requested category. |
````
* POST /categories
````
| Parameter           | Type            | Description                                 |
|:--------------------|:----------------|:--------------------------------------------|
| `request`           | `request`       | **Required**.                               |
| `CreateCategoryDTO` | `string`        | **Required**. The DTO to create a category. |
````
* PATCH /categories/{id}
````
| Parameter           | Type            | Description                                 |
|:--------------------|:----------------|:--------------------------------------------|
| `request`           | `request`       | **Required**.                               |
| `UpdateCategoryDTO` | `string`        | **Required**. The DTO to update a category. |
````
* DELETE /categories/{id}
````
| Parameter    | Type      | Description                                     |
|:-------------|:----------|:------------------------------------------------|
| `request`    | `request` | **Required**.                                   |
| `categoryId` | `string`  | **Required**. The id of the category to delete. |

##### DTOs
CreateCategoryDto:
````
{
  "name": "string",
  "description": "string"
}
````
UpdateCategoryDto:
````
{
  "name": "string",
  "description": "string"
}
````

#### Logs
`````
* GET /logs
`````
| Parameter | Type      | Description    |
|:----------|:----------|:---------------|
| `request` | `request` | **Required**.  |
`````
* GET /logs/public
`````
| Parameter | Type      | Description    |
|:----------|:----------|:---------------|
| `request` | `request` | **Required**.  |
`````
* POST /logs
`````
| Parameter      | Type            | Description                            |
|:---------------|:----------------|:---------------------------------------|
| `request`      | `request`       | **Required**.                          |
| `CreateLogDTO` | `string`        | **Required**. The DTO to create a log. |

##### DTOs
CreateLogDTO:
````
{
  "service": "Auth service",
  "severity": "debug",
  "description": "string",
  "public": true,
  "user": "string"
}
````
#### Authentifizierung
````
* POST /auth/login
````
| Parameter   | Type            | Description                                        |
|:------------|:----------------|:---------------------------------------------------|
| `request`   | `request`       | **Required**.                                      |
| `SignInDto` | `string`        | **Required**. The DTO to create a sign in request. |
````
* GET /auth/profile
````
| Parameter   | Type            | Description                                        |
|:------------|:----------------|:---------------------------------------------------|
| `request`   | `request`       | **Required**.                                      |

````
* GET /auth/validate-token
````
| Parameter   | Type            | Description                                        |
|:------------|:----------------|:---------------------------------------------------|
| `request`   | `request`       | **Required**.                                      |

##### DTOs
SignInDto:
`````
{
    "username": "MyUsername",
    "password": "MySecretPassword"
}
`````

#### Benutzer

````
* GET /users
````
| Parameter   | Type            | Description                                        |
|:------------|:----------------|:---------------------------------------------------|
| `request`   | `request`       | **Required**.                                      |

````
* GET /users/{username}
````
| Parameter   | Type            | Description                                        |
|:------------|:----------------|:---------------------------------------------------|
| `request`   | `request`       | **Required**.                                      |
| `username`  | `string`        | **Required**. The username of the requested user.  |

````
* POST /users
````
| Parameter       | Type         | Description                                   |
|:----------------|:-------------|:----------------------------------------------|
| `request`       | `request`    | **Required**.                                 |
| `CreateUserDTO` | `string`     | **Required**. The DTO to create a user.       |

````
* PATCH /users/{id}
````
| Parameter       | Type      | Description                              |
|:----------------|:----------|:-----------------------------------------|
| `request`       | `request` | **Required**.                            |
| `UpdateUserDTO` | `string`  | **Required**. The DTO to update a user.  |

`````
* DELETE /users/{id}
`````
| Parameter | Type      | Description                                 |
|:----------|:----------|:--------------------------------------------|
| `request` | `request` | **Required**.                               |
| `userId`  | `string`  | **Required**. The id of the user to delete. |

##### DTOs
CreateUserDTO:
````
{
  "username": "string",
  "password": "string",
  "mail": "user@example.com",
  "roles": [
    "user"
  ]
}
````

UpdateUserDto:
````
{
  "username": "string",
  "password": "string",
  "mail": "user@example.com",
  "roles": [
    "string"
  ]
}
````
#### Passwörter
````
* POST /passwords/hash
````
| Parameter            | Type      | Description                                      |
|:---------------------|:----------|:-------------------------------------------------|
| `request`            | `request` | **Required**.                                    |
| `CreatePasswordHash` | `string`  | **Required**. The DTO to create a password hash. |

````
* POST /passwords/compare
````
| Parameter             | Type      | Description                                       |
|:----------------------|:----------|:--------------------------------------------------|
| `request`             | `request` | **Required**.                                     |
| `ComparePasswordHash` | `string`  | **Required**. The DTO to compare a password hash. |

##### DTOs
CreatePasswordHash:
````
{
  "plainTextPassword": "string"
}
````

ComparePasswordHash:
````
{
  "plainTextPassword": "string",
  "hashedPassword": "string"
}
````

# Lösungsstrategie
Das System wurde in drei Teile unterteilt. Dies umfasst folgende Teile:

* Datenbank
* Backend
* Frontend

Als Datenbank wird eine MongoDB-Datenbank verwendet. Diese kann in einem Docker-Container oder lokal betrieben werden.

Das Backend und Frontend wird in je seperaten Docker Containern betrieben und basiert auf [NPM](https://www.npmjs.com) und [TypeScript](https://www.typescriptlang.org). Das Backend ist in [NestJS](https://nestjs.com) geschrieben. Die Entscheidung für das Backend ist auf NestJS gefallen, da das Framework viele Integrationen besitzt. Dazu gehören Integrationen wie Authentifizierung, OpenAPI und rollenbasierter Zugriff. Das Frontend basiert auf einem Template von [PrimeNG](https://primeng.org). Bei PrimeNG handelt es sich um eine UI-Suite für Angular.

Die Idee der Dockerisierung kam schon relativ zu Beginn auf. Der Hintergedanke ist dabei die einfache Bereitstellung des Systems. Durch die Dockerisierung kann das System einfach auf einem Server bereitgestellt werden. Dabei ist es egal, ob es sich um einen Server in der Cloud oder lokal handelt.

Die Entscheidung für TypeScript ist auf die Typsicherheit zurückzuführen. TypeScript ist eine Erweiterung von JavaScript und bietet die Möglichkeit, Typen zu definieren. Dies erleichtert die Entwicklung und verhindert Fehler.

Die Entscheidung für MongoDB ist auf die Flexibilität zurückzuführen. MongoDB ist eine NoSQL-Datenbank und speichert Daten in Dokumenten. Dies ermöglicht eine flexible Speicherung von Daten. Dabei ist es egal, ob die Datenstruktur sich ändert. MongoDB ist in der Lage, die Daten flexibel zu speichern.

Die Entscheidung für NestJS ist auf die Integrationen zurückzuführen. NestJS bietet viele Integrationen, die die Entwicklung erleichtern. Dazu gehören Authentifizierung, OpenAPI und rollenbasierter Zugriff. Diese Integrationen sind für das System notwendig.

Die Entscheidung für PrimeNG ist auf die UI-Komponenten zurückzuführen. PrimeNG bietet viele UI-Komponenten, die die Entwicklung erleichtern. Dazu gehören Tabellen, Formulare und Dialoge. Diese Komponenten sind für das System notwendig.

Die Entscheidung für NPM ist auf die Paketverwaltung zurückzuführen. NPM ist der Paketmanager für JavaScript und bietet viele Pakete. Diese Pakete können einfach in das System integriert werden.

# Bausteinsicht

Das Gesamtsystem kann in drei Teile unterteilt werden. Dabei handelt es sich um drei verschiedene Container. Es werden folgende Container benötigt, um das System zu verwenden:
* Datenbank (MongoDB)
* Backend (NestJS)
* Frontend (Angular)

![Gesamtsystem](images/Bausteinsicht.png)

::: formalpara-title
**Inhalt**
:::

Die Bausteinsicht zeigt die statische Zerlegung des Systems in Bausteine
(Module, Komponenten, Subsysteme, Klassen, Schnittstellen, Pakete,
Bibliotheken, Frameworks, Schichten, Partitionen, Tiers, Funktionen,
Makros, Operationen, Datenstrukturen, ...) sowie deren Abhängigkeiten
(Beziehungen, Assoziationen, ...)

Diese Sicht sollte in jeder Architekturdokumentation vorhanden sein. In
der Analogie zum Hausbau bildet die Bausteinsicht den *Grundrissplan*.

::: formalpara-title
**Motivation**
:::

Behalten Sie den Überblick über den Quellcode, indem Sie die statische
Struktur des Systems durch Abstraktion verständlich machen.

Damit ermöglichen Sie Kommunikation auf abstrakterer Ebene, ohne zu
viele Implementierungsdetails offenlegen zu müssen.

::: formalpara-title
**Form**
:::

Die Bausteinsicht ist eine hierarchische Sammlung von Blackboxen und
Whiteboxen (siehe Abbildung unten) und deren Beschreibungen.

![Hierarchie in der Bausteinsicht](images/05_building_blocks-DE.png)

**Ebene 1** ist die Whitebox-Beschreibung des Gesamtsystems, zusammen
mit Blackbox-Beschreibungen der darin enthaltenen Bausteine.

**Ebene 2** zoomt in einige Bausteine der Ebene 1 hinein. Sie enthält
somit die Whitebox-Beschreibungen ausgewählter Bausteine der Ebene 1,
jeweils zusammen mit Blackbox-Beschreibungen darin enthaltener
Bausteine.

**Ebene 3** zoomt in einige Bausteine der Ebene 2 hinein, usw.

Siehe [Bausteinsicht](https://docs.arc42.org/section-5/) in der
online-Dokumentation (auf Englisch!).

## Whitebox Gesamtsystem {#_whitebox_gesamtsystem}

An dieser Stelle beschreiben Sie die Zerlegung des Gesamtsystems anhand
des nachfolgenden Whitebox-Templates. Dieses enthält:

-   Ein Übersichtsdiagramm

-   die Begründung dieser Zerlegung

-   Blackbox-Beschreibungen der hier enthaltenen Bausteine. Dafür haben
    Sie verschiedene Optionen:

    -   in *einer* Tabelle, gibt einen kurzen und pragmatischen
        Überblick über die enthaltenen Bausteine sowie deren
        Schnittstellen.

    -   als Liste von Blackbox-Beschreibungen der Bausteine, gemäß dem
        Blackbox-Template (siehe unten). Diese Liste können Sie, je nach
        Werkzeug, etwa in Form von Unterkapiteln (Text), Unter-Seiten
        (Wiki) oder geschachtelten Elementen (Modellierungswerkzeug)
        darstellen.

-   (optional:) wichtige Schnittstellen, die nicht bereits im
    Blackbox-Template eines der Bausteine erläutert werden, aber für das
    Verständnis der Whitebox von zentraler Bedeutung sind. Aufgrund der
    vielfältigen Möglichkeiten oder Ausprägungen von Schnittstellen
    geben wir hierzu kein weiteres Template vor. Im schlimmsten Fall
    müssen Sie Syntax, Semantik, Protokolle, Fehlerverhalten,
    Restriktionen, Versionen, Qualitätseigenschaften, notwendige
    Kompatibilitäten und vieles mehr spezifizieren oder beschreiben. Im
    besten Fall kommen Sie mit Beispielen oder einfachen Signaturen
    zurecht.

***\<Übersichtsdiagramm>***

Begründung

:   *\<Erläuternder Text>*

Enthaltene Bausteine

:   *\<Beschreibung der enthaltenen Bausteine (Blackboxen)>*

Wichtige Schnittstellen

:   *\<Beschreibung wichtiger Schnittstellen>*

Hier folgen jetzt Erläuterungen zu Blackboxen der Ebene 1.

Falls Sie die tabellarische Beschreibung wählen, so werden Blackboxen
darin nur mit Name und Verantwortung nach folgendem Muster beschrieben:

+-----------------------+-----------------------------------------------+
| **Name**              | **Verantwortung**                             |
+=======================+===============================================+
| *\<Blackbox 1>*       |  *\<Text>*                                    |
+-----------------------+-----------------------------------------------+
| *\<Blackbox 2>*       |  *\<Text>*                                    |
+-----------------------+-----------------------------------------------+

Falls Sie die ausführliche Liste von Blackbox-Beschreibungen wählen,
beschreiben Sie jede wichtige Blackbox in einem eigenen
Blackbox-Template. Dessen Überschrift ist jeweils der Namen dieser
Blackbox.

### \<Name Blackbox 1> {#__name_blackbox_1}

Beschreiben Sie die \<Blackbox 1> anhand des folgenden
Blackbox-Templates:

-   Zweck/Verantwortung

-   Schnittstelle(n), sofern diese nicht als eigenständige
    Beschreibungen herausgezogen sind. Hierzu gehören eventuell auch
    Qualitäts- und Leistungsmerkmale dieser Schnittstelle.

-   (Optional) Qualitäts-/Leistungsmerkmale der Blackbox, beispielsweise
    Verfügbarkeit, Laufzeitverhalten o. Ä.

-   (Optional) Ablageort/Datei(en)

-   (Optional) Erfüllte Anforderungen, falls Sie Traceability zu
    Anforderungen benötigen.

-   (Optional) Offene Punkte/Probleme/Risiken

*\<Zweck/Verantwortung>*

*\<Schnittstelle(n)>*

*\<(Optional) Qualitäts-/Leistungsmerkmale>*

*\<(Optional) Ablageort/Datei(en)>*

*\<(Optional) Erfüllte Anforderungen>*

*\<(optional) Offene Punkte/Probleme/Risiken>*

### \<Name Blackbox 2> {#__name_blackbox_2}

*\<Blackbox-Template>*

### \<Name Blackbox n> {#__name_blackbox_n}

*\<Blackbox-Template>*

### \<Name Schnittstelle 1> {#__name_schnittstelle_1}

...

### \<Name Schnittstelle m> {#__name_schnittstelle_m}

## Ebene 2 {#_ebene_2}

Beschreiben Sie den inneren Aufbau (einiger) Bausteine aus Ebene 1 als
Whitebox.

Welche Bausteine Ihres Systems Sie hier beschreiben, müssen Sie selbst
entscheiden. Bitte stellen Sie dabei Relevanz vor Vollständigkeit.
Skizzieren Sie wichtige, überraschende, riskante, komplexe oder
besonders volatile Bausteine. Normale, einfache oder standardisierte
Teile sollten Sie weglassen.

### Whitebox *\<Baustein 1>* {#_whitebox_emphasis_baustein_1_emphasis}

...zeigt das Innenleben von *Baustein 1*.

*\<Whitebox-Template>*

### Whitebox *\<Baustein 2>* {#_whitebox_emphasis_baustein_2_emphasis}

*\<Whitebox-Template>*

...

### Whitebox *\<Baustein m>* {#_whitebox_emphasis_baustein_m_emphasis}

*\<Whitebox-Template>*

## Ebene 3 {#_ebene_3}

Beschreiben Sie den inneren Aufbau (einiger) Bausteine aus Ebene 2 als
Whitebox.

Bei tieferen Gliederungen der Architektur kopieren Sie diesen Teil von
arc42 für die weiteren Ebenen.

### Whitebox \<\_Baustein x.1\_\> {#_whitebox_baustein_x_1}

...zeigt das Innenleben von *Baustein x.1*.

*\<Whitebox-Template>*

### Whitebox \<\_Baustein x.2\_\> {#_whitebox_baustein_x_2}

*\<Whitebox-Template>*

### Whitebox \<\_Baustein y.1\_\> {#_whitebox_baustein_y_1}

*\<Whitebox-Template>*

# Laufzeitsicht {#section-runtime-view}

::: formalpara-title
**Inhalt**
:::

Diese Sicht erklärt konkrete Abläufe und Beziehungen zwischen Bausteinen
in Form von Szenarien aus den folgenden Bereichen:

-   Wichtige Abläufe oder *Features*: Wie führen die Bausteine der
    Architektur die wichtigsten Abläufe durch?

-   Interaktionen an kritischen externen Schnittstellen: Wie arbeiten
    Bausteine mit Nutzern und Nachbarsystemen zusammen?

-   Betrieb und Administration: Inbetriebnahme, Start, Stop.

-   Fehler- und Ausnahmeszenarien

Anmerkung: Das Kriterium für die Auswahl der möglichen Szenarien (d.h.
Abläufe) des Systems ist deren Architekturrelevanz. Es geht nicht darum,
möglichst viele Abläufe darzustellen, sondern eine angemessene Auswahl
zu dokumentieren.

::: formalpara-title
**Motivation**
:::

Sie sollten verstehen, wie (Instanzen von) Bausteine(n) Ihres Systems
ihre jeweiligen Aufgaben erfüllen und zur Laufzeit miteinander
kommunizieren.

Nutzen Sie diese Szenarien in der Dokumentation hauptsächlich für eine
verständlichere Kommunikation mit denjenigen Stakeholdern, die die
statischen Modelle (z.B. Bausteinsicht, Verteilungssicht) weniger
verständlich finden.

::: formalpara-title
**Form**
:::

Für die Beschreibung von Szenarien gibt es zahlreiche
Ausdrucksmöglichkeiten. Nutzen Sie beispielsweise:

-   Nummerierte Schrittfolgen oder Aufzählungen in Umgangssprache

-   Aktivitäts- oder Flussdiagramme

-   Sequenzdiagramme

-   BPMN (Geschäftsprozessmodell und -notation) oder EPKs
    (Ereignis-Prozessketten)

-   Zustandsautomaten

-   ...

Siehe [Laufzeitsicht](https://docs.arc42.org/section-6/) in der
online-Dokumentation (auf Englisch!).

## *\<Bezeichnung Laufzeitszenario 1>* {#__emphasis_bezeichnung_laufzeitszenario_1_emphasis}

-   \<hier Laufzeitdiagramm oder Ablaufbeschreibung einfügen>

-   \<hier Besonderheiten bei dem Zusammenspiel der Bausteine in diesem
    Szenario erläutern>

## *\<Bezeichnung Laufzeitszenario 2>* {#__emphasis_bezeichnung_laufzeitszenario_2_emphasis}

...

## *\<Bezeichnung Laufzeitszenario n>* {#__emphasis_bezeichnung_laufzeitszenario_n_emphasis}

...

# Verteilungssicht {#section-deployment-view}

::: formalpara-title
**Inhalt**
:::

Die Verteilungssicht beschreibt:

1.  die technische Infrastruktur, auf der Ihr System ausgeführt wird,
    mit Infrastrukturelementen wie Standorten, Umgebungen, Rechnern,
    Prozessoren, Kanälen und Netztopologien sowie sonstigen
    Bestandteilen, und

2.  die Abbildung von (Software-)Bausteinen auf diese Infrastruktur.

Häufig laufen Systeme in unterschiedlichen Umgebungen, beispielsweise
Entwicklung-/Test- oder Produktionsumgebungen. In solchen Fällen sollten
Sie alle relevanten Umgebungen aufzeigen.

Nutzen Sie die Verteilungssicht insbesondere dann, wenn Ihre Software
auf mehr als einem Rechner, Prozessor, Server oder Container abläuft
oder Sie Ihre Hardware sogar selbst konstruieren.

Aus Softwaresicht genügt es, auf die Aspekte zu achten, die für die
Softwareverteilung relevant sind. Insbesondere bei der
Hardwareentwicklung kann es notwendig sein, die Infrastruktur mit
beliebigen Details zu beschreiben.

::: formalpara-title
**Motivation**
:::

Software läuft nicht ohne Infrastruktur. Diese zugrundeliegende
Infrastruktur beeinflusst Ihr System und/oder querschnittliche
Lösungskonzepte, daher müssen Sie diese Infrastruktur kennen.

::: formalpara-title
**Form**
:::

Das oberste Verteilungsdiagramm könnte bereits in Ihrem technischen
Kontext enthalten sein, mit Ihrer Infrastruktur als EINE Blackbox. Jetzt
zoomen Sie in diese Infrastruktur mit weiteren Verteilungsdiagrammen
hinein:

-   Die UML stellt mit Verteilungsdiagrammen (Deployment diagrams) eine
    Diagrammart zur Verfügung, um diese Sicht auszudrücken. Nutzen Sie
    diese, evtl. auch geschachtelt, wenn Ihre Verteilungsstruktur es
    verlangt.

-   Falls Ihre Infrastruktur-Stakeholder andere Diagrammarten
    bevorzugen, die beispielsweise Prozessoren und Kanäle zeigen, sind
    diese hier ebenfalls einsetzbar.

Siehe [Verteilungssicht](https://docs.arc42.org/section-7/) in der
online-Dokumentation (auf Englisch!).

## Infrastruktur Ebene 1 {#_infrastruktur_ebene_1}

An dieser Stelle beschreiben Sie (als Kombination von Diagrammen mit
Tabellen oder Texten):

-   die Verteilung des Gesamtsystems auf mehrere Standorte, Umgebungen,
    Rechner, Prozessoren o. Ä., sowie die physischen Verbindungskanäle
    zwischen diesen,

-   wichtige Begründungen für diese Verteilungsstruktur,

-   Qualitäts- und/oder Leistungsmerkmale dieser Infrastruktur,

-   Zuordnung von Softwareartefakten zu Bestandteilen der Infrastruktur

Für mehrere Umgebungen oder alternative Deployments kopieren Sie diesen
Teil von arc42 für alle wichtigen Umgebungen/Varianten.

***\<Übersichtsdiagramm>***

Begründung

:   *\<Erläuternder Text>*

Qualitäts- und/oder Leistungsmerkmale

:   *\<Erläuternder Text>*

Zuordnung von Bausteinen zu Infrastruktur

:   *\<Beschreibung der Zuordnung>*

## Infrastruktur Ebene 2 {#_infrastruktur_ebene_2}

An dieser Stelle können Sie den inneren Aufbau (einiger)
Infrastrukturelemente aus Ebene 1 beschreiben.

Für jedes Infrastrukturelement kopieren Sie die Struktur aus Ebene 1.

### *\<Infrastrukturelement 1>* {#__emphasis_infrastrukturelement_1_emphasis}

*\<Diagramm + Erläuterungen>*

### *\<Infrastrukturelement 2>* {#__emphasis_infrastrukturelement_2_emphasis}

*\<Diagramm + Erläuterungen>*

...

### *\<Infrastrukturelement n>* {#__emphasis_infrastrukturelement_n_emphasis}

*\<Diagramm + Erläuterungen>*

# Querschnittliche Konzepte {#section-concepts}

::: formalpara-title
**Inhalt**
:::

Dieser Abschnitt beschreibt übergreifende, prinzipielle Regelungen und
Lösungsansätze, die an mehreren Stellen (=*querschnittlich*) relevant
sind.

Solche Konzepte betreffen oft mehrere Bausteine. Dazu können vielerlei
Themen gehören, beispielsweise:

-   Modelle, insbesondere fachliche Modelle

-   Architektur- oder Entwurfsmuster

-   Regeln für den konkreten Einsatz von Technologien

-   prinzipielle --- meist technische --- Festlegungen übergreifender
    Art

-   Implementierungsregeln

::: formalpara-title
**Motivation**
:::

Konzepte bilden die Grundlage für *konzeptionelle Integrität*
(Konsistenz, Homogenität) der Architektur und damit eine wesentliche
Grundlage für die innere Qualität Ihrer Systeme.

Manche dieser Themen lassen sich nur schwer als Baustein in der
Architektur unterbringen (z.B. das Thema „Sicherheit").

::: formalpara-title
**Form**
:::

Kann vielfältig sein:

-   Konzeptpapiere mit beliebiger Gliederung,

-   übergreifende Modelle/Szenarien mit Notationen, die Sie auch in den
    Architektursichten nutzen,

-   beispielhafte Implementierung speziell für technische Konzepte,

-   Verweise auf „übliche" Nutzung von Standard-Frameworks
    (beispielsweise die Nutzung von Hibernate als Object/Relational
    Mapper).

::: formalpara-title
**Struktur**
:::

Eine mögliche (nicht aber notwendige!) Untergliederung dieses
Abschnittes könnte wie folgt aussehen (wobei die Zuordnung von Themen zu
den Gruppen nicht immer eindeutig ist):

-   Fachliche Konzepte

-   User Experience (UX)

-   Sicherheitskonzepte (Safety und Security)

-   Architektur- und Entwurfsmuster

-   Unter-der-Haube

-   Entwicklungskonzepte

-   Betriebskonzepte

![Possible topics for crosscutting
concepts](images/08-concepts-DE.drawio.png)

Siehe [Querschnittliche Konzepte](https://docs.arc42.org/section-8/) in
der online-Dokumentation (auf Englisch).

## *\<Konzept 1>* {#__emphasis_konzept_1_emphasis}

*\<Erklärung>*

## *\<Konzept 2>* {#__emphasis_konzept_2_emphasis}

*\<Erklärung>*

...

## *\<Konzept n>* {#__emphasis_konzept_n_emphasis}

*\<Erklärung>*

# Architekturentscheidungen {#section-design-decisions}

::: formalpara-title
**Inhalt**
:::

Wichtige, teure, große oder riskante Architektur- oder
Entwurfsentscheidungen inklusive der jeweiligen Begründungen. Mit
\"Entscheidungen\" meinen wir hier die Auswahl einer von mehreren
Alternativen unter vorgegebenen Kriterien.

Wägen Sie ab, inwiefern Sie Entscheidungen hier zentral beschreiben,
oder wo eine lokale Beschreibung (z.B. in der Whitebox-Sicht von
Bausteinen) sinnvoller ist. Vermeiden Sie Redundanz. Verweisen Sie evtl.
auf Abschnitt 4, wo schon grundlegende strategische Entscheidungen
beschrieben wurden.

::: formalpara-title
**Motivation**
:::

Stakeholder des Systems sollten wichtige Entscheidungen verstehen und
nachvollziehen können.

::: formalpara-title
**Form**
:::

Verschiedene Möglichkeiten:

-   ADR ([Documenting Architecture
    Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions))
    für jede wichtige Entscheidung

-   Liste oder Tabelle, nach Wichtigkeit und Tragweite der
    Entscheidungen geordnet

-   ausführlicher in Form einzelner Unterkapitel je Entscheidung

Siehe [Architekturentscheidungen](https://docs.arc42.org/section-9/) in
der arc42 Dokumentation (auf Englisch!). Dort finden Sie Links und
Beispiele zum Thema ADR.

# Qualitätsanforderungen {#section-quality-scenarios}

::: formalpara-title
**Inhalt**
:::

Dieser Abschnitt enthält möglichst alle Qualitätsanforderungen als
Qualitätsbaum mit Szenarien. Die wichtigsten davon haben Sie bereits in
Abschnitt 1.2 (Qualitätsziele) hervorgehoben.

Nehmen Sie hier auch Qualitätsanforderungen geringerer Priorität auf,
deren Nichteinhaltung oder -erreichung geringe Risiken birgt.

::: formalpara-title
**Motivation**
:::

Weil Qualitätsanforderungen die Architekturentscheidungen oft maßgeblich
beeinflussen, sollten Sie die für Ihre Stakeholder relevanten
Qualitätsanforderungen kennen, möglichst konkret und operationalisiert.

::: formalpara-title
**Weiterführende Informationen**
:::

Siehe [Qualitätsanforderungen](https://docs.arc42.org/section-10/) in
der online-Dokumentation (auf Englisch!).

## Qualitätsbaum {#_qualit_tsbaum}

::: formalpara-title
**Inhalt**
:::

Der Qualitätsbaum (à la ATAM) mit Qualitätsszenarien an den Blättern.

::: formalpara-title
**Motivation**
:::

Die mit Prioritäten versehene Baumstruktur gibt Überblick über
die --- oftmals zahlreichen --- Qualitätsanforderungen.

-   Baumartige Verfeinerung des Begriffes „Qualität", mit „Qualität"
    oder „Nützlichkeit" als Wurzel.

-   Mindmap mit Qualitätsoberbegriffen als Hauptzweige

In jedem Fall sollten Sie hier Verweise auf die Qualitätsszenarien des
folgenden Abschnittes aufnehmen.

## Qualitätsszenarien {#_qualit_tsszenarien}

::: formalpara-title
**Inhalt**
:::

Konkretisierung der (in der Praxis oftmals vagen oder impliziten)
Qualitätsanforderungen durch (Qualitäts-)Szenarien.

Diese Szenarien beschreiben, was beim Eintreffen eines Stimulus auf ein
System in bestimmten Situationen geschieht.

Wesentlich sind zwei Arten von Szenarien:

-   Nutzungsszenarien (auch bekannt als Anwendungs- oder
    Anwendungsfallszenarien) beschreiben, wie das System zur Laufzeit
    auf einen bestimmten Auslöser reagieren soll. Hierunter fallen auch
    Szenarien zur Beschreibung von Effizienz oder Performance. Beispiel:
    Das System beantwortet eine Benutzeranfrage innerhalb einer Sekunde.

-   Änderungsszenarien beschreiben eine Modifikation des Systems oder
    seiner unmittelbaren Umgebung. Beispiel: Eine zusätzliche
    Funktionalität wird implementiert oder die Anforderung an ein
    Qualitätsmerkmal ändert sich.

::: formalpara-title
**Motivation**
:::

Szenarien operationalisieren Qualitätsanforderungen und machen deren
Erfüllung mess- oder entscheidbar.

Insbesondere wenn Sie die Qualität Ihrer Architektur mit Methoden wie
ATAM überprüfen wollen, bedürfen die in Abschnitt 1.2 genannten
Qualitätsziele einer weiteren Präzisierung bis auf die Ebene von
diskutierbaren und nachprüfbaren Szenarien.

::: formalpara-title
**Form**
:::

Entweder tabellarisch oder als Freitext.

# Risiken und technische Schulden {#section-technical-risks}

::: formalpara-title
**Inhalt**
:::

Eine nach Prioritäten geordnete Liste der erkannten Architekturrisiken
und/oder technischen Schulden.

> Risikomanagement ist Projektmanagement für Erwachsene.
>
> ---  Tim Lister Atlantic Systems Guild

Unter diesem Motto sollten Sie Architekturrisiken und/oder technische
Schulden gezielt ermitteln, bewerten und Ihren Management-Stakeholdern
(z.B. Projektleitung, Product-Owner) transparent machen.

::: formalpara-title
**Form**
:::

Liste oder Tabelle von Risiken und/oder technischen Schulden, eventuell
mit vorgeschlagenen Maßnahmen zur Risikovermeidung, Risikominimierung
oder dem Abbau der technischen Schulden.

Siehe [Risiken und technische
Schulden](https://docs.arc42.org/section-11/) in der
online-Dokumentation (auf Englisch!).

# Glossar {#section-glossary}

::: formalpara-title
**Inhalt**
:::

Die wesentlichen fachlichen und technischen Begriffe, die Stakeholder im
Zusammenhang mit dem System verwenden.

Nutzen Sie das Glossar ebenfalls als Übersetzungsreferenz, falls Sie in
mehrsprachigen Teams arbeiten.

::: formalpara-title
**Motivation**
:::

Sie sollten relevante Begriffe klar definieren, so dass alle Beteiligten

-   diese Begriffe identisch verstehen, und

-   vermeiden, mehrere Begriffe für die gleiche Sache zu haben.

Zweispaltige Tabelle mit \<Begriff> und \<Definition>.

Eventuell weitere Spalten mit Übersetzungen, falls notwendig.

Siehe [Glossar](https://docs.arc42.org/section-12/) in der
online-Dokumentation (auf Englisch!).

+-----------------------+-----------------------------------------------+
| Begriff               | Definition                                    |
+=======================+===============================================+
| *\<Begriff-1>*        | *\<Definition-1>*                             |
+-----------------------+-----------------------------------------------+
| *\<Begriff-2*         | *\<Definition-2>*                             |
+-----------------------+-----------------------------------------------+
