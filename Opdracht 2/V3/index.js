class Scroll {
  constructor(el) {
    this.el = document.querySelector(el)
    this.frames = this.el.querySelectorAll('.js-frame')

    this.position = 0
    this.animating = false

    this.handleScroll = this.handleScroll.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.animatePosition = this.animatePosition.bind(this)
    this.setButtonState = this.setButtonState.bind(this)
    
    window.addEventListener('wheel', this.handleScroll)

    for (var button of document.querySelectorAll('.js-scroll-button')) {
      button.addEventListener('click', this.handleClick)
    }
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

  animatePosition(newPosition) {
    if (!this.animating && newPosition !== null && newPosition !== this.position) {
      this.animating = true
      this.el.style.top = `${-100 * newPosition}%`

      setTimeout(() => {
        this.position = newPosition
        this.animating = false

        this.setButtonState()
      }, 1000)
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
}

(function(){
  new Scroll('.js-scroll-container')
})();
