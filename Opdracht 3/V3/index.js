class App {
  constructor(el) { // #app
    this.el = document.querySelector(el)
    this.url = '/Frontend-voor-Designers/Opdracht%203/V3/data.json'

    /*
      Omdat IMDB toegang blokkeert moet ik zelf afbeeldingen definieren.
      Dit doen we in een array, zodat ik later de afbeelding door middel van de
      index weer op kan halen.
    */
    this.backgrounds = [
      'https://i.ytimg.com/vi/gizo8gXsgOc/maxresdefault.jpg',
      'https://i.ytimg.com/vi/8jRRZPGa3fU/maxresdefault.jpg',
      'https://hips.hearstapps.com/esqnl.h-cdn.co/assets/16/29/1469010057-the-godfather-1.jpg',
      'http://www.indiewire.com/wp-content/uploads/2016/07/samuel-l-jackson-in-pulp-fiction.jpg',
      'http://dailygrindhouse.com/wp-content/uploads/2016/07/maxresdefault.jpg',
      'https://utahvalley360.com/wp-content/uploads/2014/12/fight-club.jpg',
    ]

    // Bind `this` aan de functies, zodat `App` in de functie toegankelijk is.
    this.loadData = this.loadData.bind(this)
    this.handleLoad = this.handleLoad.bind(this)

    this.loadData()
  }

  loadData() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = (event) => {
        /*
          `event.target` is in dit geval het `XMLHttpRequest`.
          De "veroorzaker" van het event.
          Ik gebruik een arrow functie omdat dit de scope binnen de functies
          niet veranderd. Hierdoor kan ik de binnengehaalde data aan de `App`
          toevoegen, voor later gebruik.
        */
        if (event.target.readyState === 4 && event.target.status === 200) {
            // Zet de `responseText` om naar een object.
            this.data = JSON.parse(event.target.responseText)
            this.handleLoad()
        }
    }

    xmlhttp.open("GET", this.url, true)
    xmlhttp.send()
  }

  handleLoad() {
    // Verwijder het "Loading..." tekstje.
    this.el.innerHTML = ''

    for (let i = 0; i < this.data.length; i++) {
      // Haal de movie op uit de `data` array.
      const movie = this.data[i]
      // Haal de afbeelding op uit de `backgrounds` array.
      const background = this.backgrounds[i]
      /*
        Maak een nieuwe Movie aan en apppend het daarin gemaakte element
        in `#app`.
      */
      this.el.appendChild(new Movie(movie, background).el)
    }

    this.el.querySelectorAll('.movie')[0].classList.add('active')

    new Scroll('.js-scroll-container')
  }
}


class Movie {
  constructor(data, background) {
    this.data = data
    this.background = background

    this.initialize = this.initialize.bind(this)
    this.render = this.render.bind(this)

    this.initialize()
  }

  initialize() {
    this.el = document.createElement('div')
    this.el.classList.add('movie', 'frame', 'js-frame')
    this.el.style.backgroundImage = `url('${this.background}')`

    this.render()
  }

  render() {
    /*
      Gebruik 'string interpolation' om variabelen en functies direct binnen
      de template (string) uit te voeren.
    */
    const html = `
      <div class="movie__inner">
        <h5>${this.data.genres.join(', ')}</h5>
        <h2>${this.data.title}</h2>
        <h4>${this.data.release_date}</h4>
        <dl>
          <dt>Director(s)</dt>
          <dd>${this.data.directors.map(director => ` ${director.name}`)}</dd>
          <dt>Actor(s)</dt>
          <dd>${this.data.actors.map(actor => ` ${actor.actor_name}`)}</dd>
        </dl>
        <input class="show_plot" id="show_plot_${this.data.id /* maakt hem uniek */}" type="checkbox">
        <label for="show_plot_${this.data.id /* verwijst naar input */}">spoilers</label>
        <div class="plot plot--simple">
          <p>${this.data.simple_plot}</p>
        </div>
        <div class="plot plot--full">
          <p>${this.data.plot}</p>
        </div>
      </div>
    `
    this.el.innerHTML = html
  }
}


class Scroll {
  constructor(el) {
    this.el = document.querySelector(el)
    this.frames = this.el.querySelectorAll('.js-frame')
    this.indicators = []

    this.position = 0
    this.animating = false

    this.handleScroll = this.handleScroll.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.animatePosition = this.animatePosition.bind(this)
    this.setFrameState = this.setFrameState.bind(this)
    this.setButtonState = this.setButtonState.bind(this)
    this.createIndicators = this.createIndicators.bind(this)
    this.setIndicatorState = this.setIndicatorState.bind(this)

    /*
      Gebruik de passive modus zodat scrollen niet te veel performance impact
      heeft.
    */
    window.addEventListener('wheel', this.handleScroll, { passive: true })
    window.addEventListener('keydown', this.handlePress)

    for (var button of document.querySelectorAll('.js-scroll-button')) {
      button.addEventListener('click', this.handleClick)
    }

    this.createIndicators()
  }


  handleScroll(event) {
    event.preventDefault()

    var newPosition = this.position

    if (event.deltaY < 0) {
      if (this.position > 0) {
        newPosition--
      }
    } else if (event.deltaY > 0) {
      if (this.position < (this.frames.length - 1)) {
        newPosition++
      }
    } else {
      console.log(event)
    }

    this.animatePosition(newPosition)
  }

  handleClick(event) {
    event.preventDefault()

    var newPosition = this.position

    if (event.currentTarget.dataset.direction === "left") {
      if (this.position > 0) {
        newPosition--
      }
    } else if (event.currentTarget.dataset.direction === "right") {
      if (this.position < (this.frames.length - 1)) {
        newPosition++
      }
    } else {
      console.log(event)
    }

    this.animatePosition(newPosition)
  }

  handlePress(event) {
    event.preventDefault()

    var newPosition = this.position

    /*
      Omdat er veel vergelijkingen gedaan moeten worden was dit een
      overzichtelijkere manier om hier doorheen te lopen.
    */
    switch (event.keyCode) {
      case 37:
      case 38:
        if (this.position > 0) {
          newPosition--
        }
        break
      case 39:
      case 40:
        if (this.position < (this.frames.length - 1)) {
          newPosition++
        }
        break
      default:
        console.log(event)
        break
    }

    this.animatePosition(newPosition)
  }

  animatePosition(newPosition) {
    /*
      Controleer of de benodigde gegevens voorzien zijn, en de nieuwe animatie
      zinnig is (werkelijk nodig is).
    */
    if (!this.animating && newPosition !== null && newPosition !== this.position) {
      this.animating = true
      this.el.style.left = `${-100 * newPosition}%`

      this.setFrameState(newPosition)
      this.setIndicatorState(newPosition)

      setTimeout(() => {
        // Reset de variabelen na 1 seconde. Stel nieuwe positie in.
        this.position = newPosition
        this.animating = false

        this.setButtonState()
      }, 1000)
    }
  }

  setFrameState(newPosition) {
    for (var i = 0; i < this.frames.length; i++) {
      var frame = this.frames[i]
      if (i === newPosition) {
        frame.classList.add('active')
      } else {
        frame.classList.remove('active')
      }
    }
  }

  setButtonState() {
    var leftButton = document.querySelector('.js-scroll-button[data-direction="left"]')
    var rightButton = document.querySelector('.js-scroll-button[data-direction="right"]')

    if (this.position == 0) {
      leftButton.classList.add('disabled')
    } else if (this.position == (this.frames.length - 1)) {
      rightButton.classList.add('disabled')
    } else {
      leftButton.classList.remove('disabled')
      rightButton.classList.remove('disabled')
    }
  }

  createIndicators() {
    var indicators = document.querySelector('.js-position-indicator')

    // Maak een indicator aan voor elk frame.
    for (var i = 0; i < this.frames.length; i++) {
      var indicator = document.createElement('li')
      indicator.classList.add('indicator')

      if (i === 0) {
        // Markeer de eerste indicator als 'actief'.
        indicator.classList.add('active')
      }

      // Voeg toe aan array zodat ik er later nog bij kan.
      this.indicators.push(indicator)

      // Voeg toe aan DOM.
      indicators.appendChild(indicator)
    }
  }

  setIndicatorState(newPosition) {
    // Loop door alle indicators heen.
    for (var i = 0; i < this.indicators.length; i++) {
      var indicator = this.indicators[i]
      if (i === newPosition) {
        /*
          Als de index hetzelfde is als de variabele `newPosition`,
          markeer actief
        */
        indicator.classList.add('active')
      } else {
        /*
          Verwijder anders de actieve markering.
        */
        indicator.classList.remove('active')
      }
    }
  }
}


document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        new App('#app')
    }
 }
