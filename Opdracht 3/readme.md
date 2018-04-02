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


## 2. Tweede versie
Bij de [tweede versie](https://lucasberghoef.github.io/Frontend-voor-Designers/Opdracht%203/V2/) heb ik zelf grote afbeeldingen op het internet gezocht om te als achtergrond afbeeldingen te gebruiken. Dit was nodig omdat de afbeeldingen van de database van Dennis niet toegankelijk zijn, hierdoor werden deze niet weergegeven. Ook heb ik in de tweede versie de caroussel van opdracht 2 toegepast, echter dit keer horizontaal i.p.v. verticaal. Dit maal moest ik alleen de inhoud van de slides uit de data halen, de data bepaald ook hoeveel slides er worden aangemaakt.



# License

MIT © Lucas Berghoef
