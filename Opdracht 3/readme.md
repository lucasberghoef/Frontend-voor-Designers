# Frontend voor Designers - Opdracht 3 - Lucas Berghoef

In deze derde opdracht van Frontend voor Designers heb ik een user interface ontworpen.

Hierbij heb ik de volgende voorbeelden gebruikt:
* Self invoking function:  https://sarfraznawaz.wordpress.com/2012/01/26/javascript-self-invoking-functions/
* Event listeners (passive): https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
* Scroll event: https://developer.mozilla.org/en-US/docs/Web/Events/wheel
* Javascript indicators:  https://stackoverflow.com/questions/12622465/creating-a-div-element-inside-a-div-element-in-javascript

* Principles van User Interface Design: https://codepen.io/KoopReynders/pen/KdEagB?editors=0010

![Voorvertoning van de film site](preview.png)

# Functies

* [`document.querySelector()`](https://developer.mozilla.org/nl/docs/Web/API/Document/querySelector)- Geeft het eerste element in het document dat overeenkomt met de opgegeven selector, of groep van selectors, of null als er geen overeenkomsten zijn gevonden.
* [`.addEventListener('click', handleClick)`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener)- The EventListener interface represents an object that can handle an event dispatched by an EventTarget object.


# Mijn proces

Na het ontvangen van de opdracht ben ik begonnen met de Html te schrijven. Ik heb gekozen voor het maken van de website voor desktop en deze test ik in Safari.

## 1. Eerste versie
Ik ben begonnen met het opzetten van de html en vervolgens heb ik de data ingeladen van de website van Dennis. Omdat de https verbinding van Github Pages geen verbinding wil maken met de http van de site `http://dennistel.nl/movies` heb ik de data zelf op github gezet in een JSON zodat de Github Pages wel werkt. Dit is te zien in de [eerste versie](https://lucasberghoef.github.io/Frontend-voor-Designers/Opdracht%203/V1/).

Vervolgens heb ik zelf grote afbeeldingen op het internet gezocht om als achtergrond afbeeldingen te gebruiken. Dit was nodig omdat de afbeeldingen van de database van Dennis niet toegankelijk zijn (deze kunnen alleen via een directe link worden bekeken en niet door externe website worden gebruikt), hierdoor werden deze niet weergegeven. Ook heb ik de caroussel van opdracht 2 toegepast, echter dit keer horizontaal i.p.v. verticaal. Dit maal moest ik alleen de inhoud van de slides uit de data halen, de data bepaald ook hoeveel slides er worden aangemaakt.

Verder heb ik ook de indicators van opdracht 2 gebruikt. Ook heb ik alvast Google Fonts ingeladen om de tekst vorm te geven in mijn gewenste lettertypen. Door middel van de 'More spoilers' en 'Less spoilers' knop kan de gebruiker het uitgebreidere of kortere plot van de films zien.

UI stack: Ik heb de loading state en de ideal state vormgegeven, wanneer de data nog wordt geladen is er 'Loading...' midden in het scherm te zien, zodra deze klaar is wordt de ideal state getoond.


## 2. Tweede versie
Bij de [tweede versie](https://lucasberghoef.github.io/Frontend-voor-Designers/Opdracht%203/V2/) heb ik het ontwerp verbeterd gebasseerd op de feedback die ik kreeg van klasgenoten en vrienden/familie bij het testen van het eerste ontwerp.

* Feedback: Het ziet er nog niet uit als een website. - Verbetering: Door het toevoegen van een header met daarin het 'logo' van de website en een burger menu icon heb ik het ontwerp een kenmerkend aspect van de meeste website gegeven.
* Feedback: De animatie voelt niet soepel aan. - Verbetering: Ik heb de animatie iets versneld en getweakd, ik heb de "in" animatie versneld en uitgesteld, zodat deze pas later gebeurt bij het wisselen van de carrousel.
* Feedback: de animatie hapert. - Verbetering: Door 3d acceleratie heb ik de animatie smoother gemaakt, dit heb ik gedaan door `translate: Z` toe te voegen aan de code, hierdoor wordt de animatie beter gerenderd. 
* Feedback: De 'More spoilers' knop ziet er nog niet genoeg als een knop uit, dit moet volgens principle 9 "Appearance follows behavior" wel - Verbetering: Ik heb voor de knop een hover state ingesteld waarbij `curser: pointer` en een pulserende animatie de gebruiker bij het hoveren duidelijk maken dat het een knop is.
* Feedback: Volgens principle 4 "Keep users in control" moet je soms het overduidelijke toch vertellen, dit mist bij het gebruiken van het toetsenbord. - Verbetering: Door de gebruiker een uitleg te tonen (na dat alle andere content al getoond is, zodat hier de aandacht op wordt gefocust) dat de website met het toetsenbord kan worden bediend kan elke gebruiker zien dat de website zo kan worden bediend.

Zelf heb ik na het toevoegen van de header geconstateerd dat principle 11 "Strong visual hierarchies work best" minder duidelijk werd omdat het 'logo' van de website hetzelfde lettergrootte en font was als de titels van de films. Daarom heb ik de titels van de films groter gemaakt en lowercase i.p.v. uppercase, en het 'logo' een dunner font en letter spacing gegeven zodat deze duidelijk anders is. Zo is de hierachy nog duidelijker.


# License

MIT © Lucas Berghoef
