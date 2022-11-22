const canv = document.getElementById("screen")
const c = canv.getContext("2d")
canv.width = window.innerWidth
canv.height = window.innerHeight

class Circle {
  //Класс шарика
  constructor(x, y, ax, ay, radius, color) {
    this.x = x
    this.y = y
    this.ax = ax
    this.ay = ay
    this.radius = radius
    this.color = color
  }
  build() {
    inputRadius
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 2 * Math.PI, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()

    this.update()
  }
  update() {
    if (this.x > window.innerWidth - this.radius || this.x < this.radius) {
      this.ax *= -1
    }
    if (this.y > window.innerHeight - this.radius || this.y < this.radius) {
      this.ay *= -1
    }
    this.x += this.ax
    this.y += this.ay
  }
  destroy(i) {
    let destroyInterval = setInterval(() => {
      this.radius--
      if (this.radius < 2) {
        clearInterval(destroyInterval)
        circleArr.splice(i, 1)
      }
    }, 10)
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
const menu = document.querySelector(".menu")
const menu_icon = document.querySelector(".menu-icon")
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const input_count = document.getElementById("count")
const input_weight = document.getElementById("weight")
const input_speed = document.getElementById("speed")
const input_respawn = document.getElementById("respawn")
const input_respawn__title = document.querySelector(".time-to-resp")
let uploadCirclesCooldown = 0
const score = document.querySelector(".score")
let count = input_count.value
let inputRadius = 20
let speed = 1
let start = false

input_count.value = 0
input_respawn.value = 0
input_weight.value = 20

function uploadCirclesCount() {
  setTimeout(() => {
    if (start == true) {
      uploadCirclesCount()
    }
  }, uploadCirclesCooldown)

  if (circleArr.length < input_count.value && uploadCirclesCooldown !== 0) {
    let radius = +inputRadius
    let x = Math.floor(
      Math.random() * (window.innerWidth - radius * 2) + radius
    )
    let ax = (Math.random() - 0.5) * speed
    let y = Math.floor(
      Math.random() * (window.innerHeight - radius * 2) + radius
    )
    let ay = (Math.random() - 0.5) * speed
    circleArr.push(new Circle(x, y, ax, ay, radius, getRandomColor()))
    count++
    score.textContent = `Count: ${count}`
  }
}


// menu.addEventListener('change', () => {
//   if (menu.style.left == "0") {
//     menu_icon.style.display = "none";
//   } else {
//     menu_icon.style.display = "block"
//   }
// })

let buffer = []

input_speed.addEventListener("input", function () {
  speed = input_speed.value 
  let k = 10
  if (speed == 0) {
    for (let i = 0; i < circleArr.length; i++) {
      circleArr[i].ax = 0
      circleArr[i].ay = 0
    }
  }
  for (let i = 0; i < circleArr.length; i++) {
    if (i == 0) {
      circleArr[i].ax = buffer[i] * (speed/k)
      circleArr[i].ay = buffer[i+1] * (speed/k)
    } else {
      circleArr[i].ax = buffer[i+1] * (speed/k)
      circleArr[i].ay = buffer[i+2] * (speed/k)
    }
  }
  return speed = (speed/k)
})

input_weight.addEventListener("input", function () {
  inputRadius = input_weight.value
  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].radius = +inputRadius
  }
  return +inputRadius
})

input_count.addEventListener("input", function () {
  count = this.value
  score.textContent = `Count: ${count}`
  if (start == false) {
    count--
    start = true
    uploadCirclesCount()
  }
  if (circleArr.length < count) {
    while (count > circleArr.length) {
      let radius = inputRadius
      let x = Math.floor(
        Math.random() * (window.innerWidth - radius * 2) + radius
      )
      let ax = (Math.random() - 0.5) * speed
      let y = Math.floor(
        Math.random() * (window.innerHeight - radius * 2) + radius
      )
      let ay = (Math.random() - 0.5) * speed
      circleArr.push(new Circle(x, y, ax, ay, radius, getRandomColor()))
    }
  } else {
    while (circleArr.length > count) {
      circleArr.pop()
    }
  }

  for (let i = 0; i < circleArr.length; i++) {
    let buffAx = circleArr[i].ax
    let buffAy = circleArr[i].ay
    buffer.push(buffAx, buffAy)
  }
})

function anym() {
  requestAnimationFrame(anym)
  c.clearRect(0, 0, canv.width, canv.height)
  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].build()
  }
  if (count < 0) {
    score.textContent = `Count: ${0}`
  }
}

anym()

document.addEventListener("click", (e) => {
  let x = e.clientX
  let y = e.clientY
  for (let i = 0; i < circleArr.length; i++) {
    let startXPos = circleArr[i].x - inputRadius
    let endXPos = +circleArr[i].x + +inputRadius
    let startYPos = circleArr[i].y - inputRadius
    let endYPos = +circleArr[i].y + +inputRadius
    if (startXPos <= x && x <= endXPos && startYPos <= y && y <= endYPos) {
      circleArr[i].destroy(i)
      count--
      score.textContent = `Count: ${count}`
      continue
    }
    if (circleArr[i].radius < 2) {
      circleArr.splice(i, 1)
      count--
    }
  }
})

input_respawn.addEventListener('input', () => {
  uploadCirclesCooldown = input_respawn.value*1000
  input_respawn__title.textContent = `Time to respawn circles(${input_respawn.value} s):`
  if (input_respawn.value == 0) {
    input_respawn__title.textContent = "Time to respawn circles(disabled):"
  }
})
