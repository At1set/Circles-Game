const canv = document.getElementById('screen');
const c = canv.getContext("2d")
canv.width = window.innerWidth
canv.height = window.innerHeight

class Circle {
  constructor(x, y, ax, ay, radius, color) {
    this.x = x
    this.y = y
    this.ax = ax
    this.ay = ay
    this.radius = radius
    this.color = color
  }
  build() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 2 * Math.PI, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()

    this.update()
  }
  update() {
    if (this.x > (window.innerWidth - this.radius) || this.x < this.radius) {
      this.ax *= -1
    }
    if (this.y > (window.innerHeight - this.radius) || this.y < this.radius) {
      this.ay *= -1
    }
    this.x += this.ax
    this.y += this.ay
  }
}






function getRandomColor() {
  var letters = "0123456789ABCDEF"
  var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 22)]
  }
  return color
}


let circleArr = []

for (let i = 0; i < 1; i++) {
  let radius = 20
  let x = Math.floor(Math.random() * (window.innerWidth - radius * 2) + radius)
  let ax = (Math.random() - 0.5) * 10
  let y = Math.floor(Math.random() * (window.innerHeight - radius * 2) + radius)
  let ay = (Math.random() - 0.5) * 10
  let color = getRandomColor()
  circleArr.push(new Circle(x, y, ax, ay, radius, color))
}


function anym() {
  requestAnimationFrame(anym);
  c.clearRect(0, 0, canv.width, canv.height)
  for (let i = 0; i < circleArr.length-1; i++) {
    circleArr[i].build();
  }
}

anym()

const input = document.querySelector('input')
input.value = 0
input.addEventListener("input", function (e) {
  count = this.value * 5
  for (let i = 0; i < count; i++) {
    if (circleArr.length < count) {
      let radius = 20
      let x = Math.floor(
        Math.random() * (window.innerWidth - radius * 2) + radius
      )
      let ax = (Math.random() - 0.5) * 10
      let y = Math.floor(
        Math.random() * (window.innerHeight - radius * 2) + radius
      )
      let ay = (Math.random() - 0.5) * 10
      let color = getRandomColor()
      circleArr.push(new Circle(x, y, ax, ay, radius, color))
    } else {
      circleArr.pop()
    }
  }
})



