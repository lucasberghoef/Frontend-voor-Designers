class Scroll {
  constructor(el) {
    this.el = document.querySelector(el)
    this.frames = this.el.querySelectorAll('.js-frame')

    this.position = 0
    this.animating = false

    this.handleScroll = this.handleScroll.bind(this)

    window.addEventListener('wheel', this.handleScroll)
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

      if (!this.animating && newPosition !== this.position) {
          this.animating = true
          this.el.style.top = `${-100 * newPosition}%`

          setTimeout(() => {
              this.position = newPosition
              this.animating = false
          }, 1000)
      }
  }
}

(function(){
    new Scroll('.js-scroll-container')
})();
