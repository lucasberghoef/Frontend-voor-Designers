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

    if (event.target.dataset.direction == "up") {
      if (this.position > 0) {
        newPosition--
      }
    } else if (event.target.dataset.direction == "down") {
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
      this.el.style.top = `${-100 * newPosition}%`

      this.setFrameState(newPosition)
      this.setIndicatorState(newPosition)

      setTimeout(() => {
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
    var upButton = document.querySelector('.js-scroll-button[data-direction="up"]')
    var downButton = document.querySelector('.js-scroll-button[data-direction="down"]')

    if (this.position == 0) {
      upButton.classList.add('disabled')
    } else if (this.position == (this.frames.length - 1)) {
      downButton.classList.add('disabled')
    } else {
      upButton.classList.remove('disabled')
      downButton.classList.remove('disabled')
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

(function(){
  new Scroll('.js-scroll-container')
})();
