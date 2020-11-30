# Software Guidebook

Aangezien het lezen van de code van de LaterLezer niet het hele verhaal verteld en de redenatie achter het design van LaterLezen niet in code te beschrijven is, is ervoor gekozen om een software guidebook te schrijven. Dit maakt het gemakkelijk voor de programmeurs die verder willen bouwen op de bestaande applicatie. In dit software guidebook staat dan ook beschreven hoe de LaterLezer applicatie in elkaar steekt. 

## Table of Contents
[TOC]


## Context

De opdrachtgever is als onderzoeker bij ons langsgekomen met de vraag of wij een reader-app voor hem willen ontwikkelen. De bestaande reader-apps voldoen niet aan de eisen die hij stelt. Hij denkt dat het waard is om een nieuwe reader-app te laten maken die wel aan zijn eisen voldoen. De eisen zijn beschreven in de hoofdstuk Functioneel Overzicht. Deze reader-app is bedoeld om hem en andere onderzoekers te ondersteunen met het opslaan van wetenschappelijke artikelen zodat zij deze later kunnen lezen.

Met deze reader-app hoopt de opdrachtgever dat deze app wel aan zijn eisen voldoet, en dat andere onderzoekers naar deze reader-app overstappen. Dit betekent dat de Laterlezer een concurrent wordt voor de andere reader-apps, zoals Instapaper, Raindrop, Pocket.io, etc. De oprachtgever heeft als doel om een reader-app te ontwikkelen die meer gebruikersvriendelijk is voor lezers die frequent (wetenschappelijke) artikelen opslaan, dus Laterlezer is bedoeld voor een ander doelgroep dan de hiervoor genoemde reader-apps.

## Functioneel Overzicht

De Laterlezer app bestaat uit een mobiele webapplicatie waarin de gebruiker zijn artikelen op kan slaan en kan lezen. Daarnaast bestaat Laterlezer uit een extensie, waarmee gebruikers artikelen snel op kan slaan op een andere website.

De Laterlezer app slaat (wetenschappelijke) artikelen op die vanuit andere websites zijn gehaald. Elk artikel heeft een URL waarvan de artikel vandaan komt, en optioneel een aantal tags om het artikel snel terug te vinden m.b.v. het filtersysteem voor tags. Bij het lezen van een artikel kan de gebruiker een aantal functies gebruiken om het lezen makkelijker te maken, bijvoorbeeld het groter maken van tekst, of het veranderen van de achtergrond kleur. Om een artikel bij een gebruiker, moet deze natuurlijk ook kunnen registreren en inloggen. 

Zonder deze basisfunctionaliteit kan de applicatie niet werken. Het is van belang dat deze functies als eerst zijn uitgevoerd voordat we verder kunnen met de extra functies. De opdrachtgever wilt dat wij een aantal extra functionaliteiten implementeren zodat de app daadwerkelijk zijn eigen functies heeft. Deze functionaliteiten zijn als volgt:

- Pay-walls omzeilen
- Hiërarchische tags
- Opslaan van PDF's
- Metadata ophalen
- Importeer data van andere reader-apps
- Ondersteuning grotere teksten

Voor meer verduidelijking over deze functionaliteiten wordt het Plan van Aanpak geraadpleegd. Welke functionaliteiten wij implementeren, hangt af van wat de opdrachtgever wilt en hoeveel tijd wij ervoor nodig hebben om dat te realiseren. 

Met deze extra functionaliteiten hopen wij onze doelgroep, de onderzoekers, tevreden zijn met onze reader-app, en hierdoor artikelen makkelijker kunnen opslaan en lezen vergeleken met de andere reader-apps.

## Kwaliteitsattributen
Natuurlijk zijn er tijdens de ontwikkeling van een app ook niet functionele eisen, deze worden ook wel de kwaliteitsattributen genoemd. Om te zorgen dat onze reader-app in de toekomst nog steeds onderhoudbaar blijft, moet de app voldoen aan een aantal kwaliteitsattributen. Deze attributen zijn als volgt:

- Prestatie: om de app te laten draaien moeten de servers van de app voortdurend online zijn. Hierdoor kunnen gebruikers altijd nieuwe artikelen opslaan en hun eigen artikelen ophalen. 

- Beveiliging: natuurlijk moeten de gegevens van de gebruiker beveiligd zijn opgeslagen in de database van de app. Daarom versleutelen we gegevens zoals de wachtwoorden, als er toch ooit iemand onbevoegd toegang krijgt tot de database, kunnen ze niet bij de daadwerkelijke wachtwoorden van onze gebruikers komen.

  Daarnaast willen wij ten alle koste inbraken zoals SQL Injectie voorkomen, dit doen we door middel van meerdere RegEx controles uitvoeren voordat de invoer verstuurd naar de server. Behalve de Front-end bevat de Back-end ook een aantal controles.

- Compatibiliteit: de LaterLezer app wordt uiteindelijk ook een web-extensie. Daarom moet deze extensie beschikbaar zijn voor alle browsers. Hiernaast willen wij het ook mogelijk maken dat alle artikelen toegevoegd kunnen worden bij onze app.

- Gebruikersvriendelijkheid: om alle gebruikers tevreden te houden moet de app gebruikersvriendelijk zijn. Dit doen met een menu waarin je jouw voorkeur kan aangeven tijdens het lezen van een artikel. Denk hierbij aan de achtergrond kleur, het lettertype en lettergrootte. Daarnaast zullen de gebruikers een mogelijkheid hebben om een van de vaste thema's te kiezen die LaterLezen aanbied.
- Efficiëntie: natuurlijk wilt een gebruiker niet teveel tijd en moeite insteken tijdens het toevoegen van een artikel. Daarom houdt LaterLezen het erg compact en makkelijk. De gebruiker hoeft eenvoudig een URL van het artikel in te voeren en eventueel een of meerdere tags.

Aan de hand van deze kwaliteitsattributen hoopt de opdrachtgever een reader-app te kunnen ontwikkelen die uitstraalt vergeleken met de andere reader-apps

## Beperkingen

Tijdens het ontwikkelen van de app zijn er een aantal beperkingen, deze beperkingen worden hieronder genoemd:

- Het team heeft 3 sprints om aan Laterlezer te werken. (1 sprint is 2 weken)
- Het team bestaat uit 5 man.
- Ieder teamlid werkt tijdens het project ook aan zijn leerdoelen.
- Het team ontwikkelt de app d.m.v. Node, Express, MongoDB/Mongoose en React omdat het team daarmee de meeste kennis heeft.
- Het team maakt gebruik van onbekende technieken, zoals ontwikkeling van extensies en login met oAuth
- De server stuurt en ontvangt berichten van de client in de vorm van JSON

Een beperkingen hoeft niet altijd meteen negatief te zijn, kijk hierbij naar de grootte van ons team, met een klein groepje van 5 is het makkelijker om samen te werken en het overzicht van het gehele team te behouden. Ook is het hierdoor simpeler om gebruik te maken van elkaars sterke punten.


## Principes
Wij hebben op dit moment niet over bepaalde principes nagedacht tijdens het ontwerpen en het bouwen van de Laterlezer app.

## Software-architectuur
Door het lezen van dit hoofdstuk krijg je een beter beeld van hoe de structuur van de software eruit ziet. Deze schetsen zijn gebaseerd op het C4 model.

1. The big picture (system context)

    Dit is het beginpunt van onze applicatie, hierbij wordt de interactie tussen de gebruiker en de reader-app weergeven.

    

    ![system_context_diagram.png](system_context_diagram.png)

    

2. Container view

    Dit is een verdiepende schets van wat er nou precies afspeelt wanneer de gebruiker een actie uitvoert.

    

    ![Container.png](Container.png)

    

3. Component views

    Hierna kunnen we vergroten tot de component view per container. Deze worden opgedeeld in de API component, app component en extension component.

    ### API component view
    ![API_component.png](Api_component.png)

    ### LaterLezer app view
    ![Component_Laterlezer_app.png](Component_Laterlezer_app.png)

    ### Extension view
    ![Component_extension.png](Component_extension.png)



## Infrastructuur-architectuur
(beantwoord de vragen in het software guidebook)
## Deployment
(beantwoord de vragen in het software guidebook)
## Werking en ondersteuning
(beantwoord de vragen in het software guidebook)
