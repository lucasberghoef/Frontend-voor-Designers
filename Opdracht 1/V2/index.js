'use strict'

/*  SOURCE:
    Dit is een voorbeeld van een bron die ik heb gebruikt: https://github.com/deldersveld/topojson
*/

var collapsedClass = 'collapsed' // Maakt var voor naam vd class aan omdat deze 3 keer wordt gebruikt

function attachEventListener() {
  var buttons = document.querySelectorAll('.expand')
  for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i]
      button.addEventListener('click', handleClick)
  }
}

function handleClick(event) {
  event.preventDefault(); // Voorkomt dat de link functioneert als een link (naar boven scrollt in dit geval)

  var button = event.currentTarget
  var description = document.querySelector(button.dataset.target) // #Huis1 .description

  // Gebruik `contains` om de 'state van de class op 1 plek te houden'
  if (description.classList.contains(collapsedClass)) {
      description.classList.remove(collapsedClass)
      button.innerHTML = button.dataset.expanded
  } else {
      description.classList.add(collapsedClass)
      button.innerHTML = button.dataset.collapsed
  }
}

window.onload = function(){
  attachEventListener();
};
