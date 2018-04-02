class App {
  constructor(el) {
    this.el = document.querySelector(el)
    this.url = 'http://dennistel.nl/movies.json'

    this.backgrounds = [
      'https://i.ytimg.com/vi/gizo8gXsgOc/maxresdefault.jpg',
      'https://i.ytimg.com/vi/8jRRZPGa3fU/maxresdefault.jpg',
      'https://hips.hearstapps.com/esqnl.h-cdn.co/assets/16/29/1469010057-the-godfather-1.jpg',
      'http://www.indiewire.com/wp-content/uploads/2016/07/samuel-l-jackson-in-pulp-fiction.jpg',
      'http://dailygrindhouse.com/wp-content/uploads/2016/07/maxresdefault.jpg',
      'https://utahvalley360.com/wp-content/uploads/2014/12/fight-club.jpg',
    ]

    this.loadData = this.loadData.bind(this)
    this.handleLoad = this.handleLoad.bind(this)

    this.loadData()
  }

  loadData() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = (event) => {
        if (event.target.readyState == 4 && event.target.status == 200) {
            this.data = JSON.parse(event.target.responseText)
            this.handleLoad()
        }
    }
    xmlhttp.open("GET", this.url, true)
    xmlhttp.send()
  }

  handleLoad() {
    this.el.innerHTML = ''
    for (let [index, data] of this.data.entries()) {
      var background = this.backgrounds[index]
      this.el.appendChild(new Movie(data, background).el)
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
    const html = `
      <div class="movie__inner">
        <h5>${this.data.genres.map(genre => ` ${genre}`)}</h5>
        <h2>${this.data.title}</h2>
        <h4>${this.data.release_date}</h4>
        <dl>
          <dt>Director(s)</dt>
          <dd>${this.data.directors.map(director => ` ${director.name}`)}</dd>
          <dt>Actor(s)</dt>
          <dd>${this.data.actors.map(actor => ` ${actor.actor_name}`)}</dd>
        </dl>
        <input class="show_plot" id="show_plot_${this.data.id}" type="checkbox">
        <label for="show_plot_${this.data.id}">spoilers</label>
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

    if (event.currentTarget.dataset.direction == "left") {
      if (this.position > 0) {
        newPosition--
      }
    } else if (event.currentTarget.dataset.direction == "right") {
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
    if (!this.animating && newPosition !== null && newPosition !== this.position) {
      this.animating = true
      this.el.style.left = `${-100 * newPosition}%`

      this.setFrameState(newPosition)
      this.setIndicatorState(newPosition)

      setTimeout(() => {
        this.position = newPosition
        this.animating = false

        this.setButtonState()
      }, 500)
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

    for (var i = 0; i < this.frames.length; i++) {
      var indicator = document.createElement('li')
      indicator.classList.add('indicator')

      if (i === 0) {
        indicator.classList.add('active')
      }

      this.indicators.push(indicator)
      indicators.appendChild(indicator)
    }
  }

  setIndicatorState(newPosition) {
    for (var i = 0; i < this.indicators.length; i++) {
      var indicator = this.indicators[i]
      if (i === newPosition) {
        indicator.classList.add('active')
      } else {
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
