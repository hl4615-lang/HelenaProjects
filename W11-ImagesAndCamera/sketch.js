let img1, img2, img3
let f = []
let vid
let cam

function preload() {
  img1 = loadImage("assets/hokusai.jpg")
  img2 = loadImage("assets/Facepalm.png")
  img3 = loadImage("assets/sprite.png")
  vid = createVideo("assets/videoweb2.mp4")
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");

  //hide the mouse
  noCursor()

  vid.loop()
  vid.hide()

  cam = createCapture(VIDEO)
  //avoid repetition
  cam.hide()

  background(0)
}

function draw() {

  // //set the image mode
  //imageMode(CENTER)

  // //(put the image,positionX,postionY,width,height stretched)
  //image(img1, width / 2, height / 2, width, height)
  //image(img2, mouseX, mouseY, 50, 50)
  //image(vid, 0, 0)
  //image(cam, 0, 0)


  //get the color of the image,making pixel
  //let c = img1.get(mouseX, mouseY)
  //background(c)

  // for (let i = 0; i < 100; i++) {
  //   let x = random(cam.width)
  //   let y = random(cam.height)
  //   let s = random(2, 20)
  //   //let c = img1.get(x, y)
  //   //let c = vid.get(x, y)
  //   //let c = cam.get(x, y)
  //   fill(c)
  //   noStroke()
  //   circle(x, y, s)
  // }


  let s = 20
  background(0)
  for (let x = s / 2; x < cam.width; x += s) {
    for (let y = s / 2; y < cam.height; y += s) {
      let c = cam.get(x, y)

      let d = dist(mouseX, mouseY, x, y)
      let maxValue = dist(0, 0, width, height)
      let newS = map(d, 0, maxValue, 1, s)

      fill(c)
      noStroke()
      //rect(x, y, s, s)
      circle(x, y, newS)
    }
  }

  //arrays for images
  for (let i = 0; i < f.length; i++) {
    f[i].update()
    f[i].display()
  }
  if (mouseIsPressed) {
    f.push(new Face(mouseX, mouseY))
  }
}



class Face {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speedX = random(-3, 3)
    this.speedY = random(-3, 3)
    this.s = random(2, 50)
  }
  display() {


    push()
    blendMode(ADD)
    tint(220, 120, 10, 48)

    //imageMode(CENTER)
    //image(img2, this.x, this.y, 50, 50)
    image(img3, this.x, this.y, this.s, this.s)

    // //add filter
    //filter(INVERT)
    pop()
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
  }
}