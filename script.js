const canv = document.getElementById('screen');
const c = canv.getContext("2d")
canv.width = window.innerWidth
canv.height = window.innerHeight

class Circle { //Класс шарика
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
    if (this.x > (window.innerWidth - this.radius) || this.x < this.radius) {
      this.ax *= -1
    }
    if (this.y > (window.innerHeight - this.radius) || this.y < this.radius) {
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
    }, 10);
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


function anym() {
  requestAnimationFrame(anym);
  c.clearRect(0, 0, canv.width, canv.height)
  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].build();
  }
}

anym()
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const menu = document.querySelector(".menu")
const input_count = document.getElementById("count")
const input_weight = document.getElementById("weight")
const input_speed = document.getElementById("speed")
const score = document.querySelector(".score")
let count = input_count.value
let inputRadius = 20
let speed = 1
let start = false

input_count.value = 0
input_weight.value = 20
input_weight.value = 1

function uploadCirclesCount() {
  setTimeout(() => {
    if (start == true) {
      uploadCirclesCount()
    }
  }, 2000);
  if (circleArr.length < input_count.value) {
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
input_speed.addEventListener('input', function() {
  speed = (input_speed.value/1000)
  buffer.push(speed)
  if (buffer.length > 5) {
    buffer = []
  }
  console.log(buffer)
  for (let b = 0; b < buffer.length; b++) {
    if (speed == 0) {
      for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].ax = 0
        circleArr[i].ay = 0
      } 
    } else if (buffer[b] < buffer[b-1] && buffer.length > 2) {
      for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].ax -= speed
        circleArr[i].ay -= speed
      } 
    } else if (buffer[b] > buffer[b-1] && buffer.length > 2) {
      for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].ax += speed
        circleArr[i].ay += speed
      } 
    }
  } 
  return speed
})

input_weight.addEventListener('input', function() {
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
      let x = Math.floor(Math.random() * (window.innerWidth - radius * 2) + radius)
      let ax = (Math.random() - 0.5) * speed
      let y = Math.floor(Math.random() * (window.innerHeight - radius * 2) + radius)
      let ay = (Math.random() - 0.5) * speed
      circleArr.push(new Circle(x, y, ax, ay, radius, getRandomColor()))
    }
  } else {
    while (circleArr.length > count) {
      circleArr.pop()
    }
  }
})

document.addEventListener('click', (e) => {
  let x = e.clientX
  let y = e.clientY
  for (let i = 0; i < circleArr.length; i++) {
    let startXPos = (circleArr[i].x - inputRadius)
    let endXPos = (+circleArr[i].x + +inputRadius)
    let startYPos = (circleArr[i].y - inputRadius)
    let endYPos = (+circleArr[i].y + +inputRadius)
    if (startXPos <= x && x <= endXPos && startYPos <= y && y <= endYPos) {
      circleArr[i].destroy(i)
      score.textContent = `Count: ${count}`
      count--
      return
    }
    if (circleArr[i].radius < 2) {
      circleArr.splice(i, 1)
      count--
    }
    count = circleArr.length
    score.textContent = `Count: ${count}`
  }
})