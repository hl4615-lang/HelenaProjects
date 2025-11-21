
let osc, envelope
let b = [];
let n = 30;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  // for (let i = 0; i < n; i++) {
  //   b[i] = new Bubble()
  // }
}

function draw() {
  background(0, 0, 255);

  //ensure to check condition for each element in the array
  for (let i = b.length - 1; i >= 0; i--) {
    if (b[i].isOut() == true) {
      b.splice(i, 1)
    }
  }

  for (let i = 0; i < b.length; i++) {
    b[i].display();
    b[i].update();
    b[i].playSound();
  }

  if (mouseIsPressed) {
    b.push(new Bubble(mouseX, mouseY))
  }
}


class Bubble {
  constructor(x, y) {
    // this.x = random(width)
    // this.y = random(height * 2)

    //for mousepressed
    this.x = x
    this.y = y
    this.s = random(5, 50)
    this.speedY = map(this.s, 5, 100, 5, 1);

    this.osc = new p5.SinOsc();
    this.f = map(this.s, 5, 50, 2000, 40)
    this.osc.freq(this.f)


    let t1 = 0.01//attack time in seconds
    let t2 = 0.05//attack level 0.0 to 1.0
    let t3 = 0.3//decay time in seconds
    let t4 = 0.01//decay level 0.0 to 1.0
    this.envelope = new p5.Envelope(t1, t2, t3, t4)
    //this.envelope.setADSR(t1, t2, t3, t4)
  }

  display() {
    fill(255, 100)
    noStroke()
    circle(this.x, this.y, this.s)
  }

  update() {
    this.y -= this.speedY
  }

  playSound() {
    if (this.y < this.s / 2) {
      this.osc.start()
      this.envelope.play(this.osc)
    }
  }

  isOut() {
    if (this.y < this.s / 2) {
      return true//outside canvas
    } else {
      return false//inside canvas
    }
  }
}