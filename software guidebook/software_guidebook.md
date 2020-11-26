# Software guidebook

Aangezien het lezen van de code van de LaterLezer niet het hele verhaal verteld en de redenatie achter het design van LaterLezen niet in code te beschrijven is, is ervoor gekozen om een software guidebook te schrijven. Dit maakt het gemakkelijk voor de programmeurs die verder willen bouwen op de bestaande applicatie. In dit software guidebook staat dan ook beschreven hoe de LaterLezer applicatie in elkaar steekt. 

## Table of Contents
1. [Context](#Context)
2. [Functioneel-overzicht](#Functioneel-overzicht)
3. [Kwaliteitsattributen](#Kwaliteitsattributen)
4. [Beperkingen](#Beperkingen)
5. [Principes](#Principes)
6. [Software-architectuur](#Software-architectuur)
7. [Infrastructuur-architectuur](#Infrastructuur-architectuur)
8. [Deployment](#Deployment)
9. [Werking en ondersteuning](#Werking-en-ondersteuning)
10.[Keuze onderbouwing](#Keuze-onderbouwing)

- Opslaan van artikelen
- Verwijderen van artikelen
- Lezen van artikelen
- Aanmaken van tags voor artikelen
- Eerder gebruikte tags aan gebruiker koppelen


## Context

De opdrachtgever is als onderzoeker bij ons langsgekomen met de vraag of wij een reader-app voor hem willen ontwikkelen. De bestaande reader-apps voldoen niet aan de eisen die hij stelt. Hij denkt dat het waard is om een nieuwe reader-app te laten maken die wel aan zijn eisen voldoen. De eisen zijn beschreven in de hoofdstuk Functioneel Overzicht. Deze reader-app is bedoeld om hem en andere onderzoekers te ondersteunen met het opslaan van wetenschappelijke artikelen zodat zij deze later kunnen lezen.

Met deze reader-app hoopt de opdrachtgever dat deze app wel aan zijn eisen voldoet, en dat andere onderzoekers naar deze reader-app overstappen. Dit betekent dat de Laterlezer een concurrent wordt voor de andere reader-apps, zoals instapaper, raindrop, pocket etc. Laterlezer heeft als doel om meer wetenschappelijke artikelen op te slaan, dus Laterlezer is bedoeld voor een ander doelgroep dan de hiervoor genoemde reader-apps.

## Functioneel-overzicht

De Laterlezer app bestaat uit een mobiele webapplicatie waarin de gebruiker zijn artikelen op kan slaan en kan lezen. Daarnaast bestaat Laterlezer uit een extensie, waarmee gebruikers artikelen snel op kan slaan op een andere website.

De Laterlezer app slaat (wetenschappelijke) artikelen op die vanuit andere websites zijn gehaald. Elk artikel heeft een URL waarvan de artikel vandaan komt, en optioneel een aantal tags om het artikel snel terug te vinden m.b.v. het filtersysteem voor tags. Bij het lezen van een artikel kan de gebruiker een aantal functies gebruiken om het lezen makkelijker te maken, bijvoorbeeld het groter maken van tekst, of het veranderen van de achtergrondskleur. Om een artikel bij een gebruiker, moet deze natuurlijk ook kunnen registreren en inloggen. 

Zonder deze basisfunctionaliteit kan de applicatie niet werken. Het is van belang dat deze functies als eerst zijn uitgevoerd voordat we verder kunnen met de extra functies. De opdrachtgever wilt dat wij een aantal extra functionaliteiten implementeren zodat de app daadwerkelijk zijn eigen functies heeft. Deze extra functionaliteiten zijn beschreven in de Plan van aanpak. Welke functionaliteiten wij implementeren, hangt af van wat de opdrachtgever wilt en hoeveel tijd wij ervoor nodig hebben om dat te realiseren.

De belangrijkste gebruikers voor de Laterlezer app zijn de onderzoekers. Doordat zij gebruik maken van Laterlezer, kunnen zij wetenschappelijke artikelen makkelijker opslaan en lezen door de extra functionaliteiten die de andere reader-apps niet hebben.

## Kwaliteitsattributen

1. Wat zijn de kwaliteits attributen waaraan het product moet voldoen?

voorbeelden staan in het software guidebook
(side note probeer de attributen smart te definiëren)

- Laterlezer is 99.9% van de tijd online. Onderhoud kan plaatsvinden, waardoor Laterlezer voor een bepaalde(hoeveel?) tijd niet beschikbaar is.

## Beperkingen

1. Wat waren de beperkingen die ontstonden bij het maken van het eindproduct?

ook hier staan voorbeelden in de guidebook

- Het team heeft 3 sprints om aan Laterlezer te werken. 1 sprint is 2 weken.
- Het team bestaat uit 5 man
- Ieder teamlid werkt tijdens het project ook aan zijn leerdoelen
- Het team ontwikkelt Laterlezer d.m.v. Node, Express, MongoDB/Mongoose en React omdat het team daarmee de meeste kennis heeft.
- Het team maakt gebruik van onbekende technieken, zoals ontwikkeling van extensies en login met oAuth
- De server stuurt en ontvangt berichten van de client in de vorm van JSON


## Principes
1. Wat zijn de best practices die gebruikt zijn?


(beantwoord de vragen in het software guidebook)

## Software-architectuur
1. Maak duidelijk hoe de software architectuur er uit ziet.

(beantwoord de vragen in het software guidebook)
## Infrastructuur-architectuur
(beantwoord de vragen in het software guidebook)
## Deployment
(beantwoord de vragen in het software guidebook)
## Werking en ondersteuning
(beantwoord de vragen in het software guidebook)

## Keuze onderbouwing
onderbouw hier onze keuzes tijdens het maken van de app. 
