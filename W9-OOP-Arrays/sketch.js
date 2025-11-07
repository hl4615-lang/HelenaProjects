let c = []
//let c2
let n = 5
function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100)
  for (let i = 0; i < n; i++) {
    c[i] = new Cloud(random(-width, -width * 0.1), random(height * 0.1, height * 0.8), random(30, 100))

    //height * 0.1, height * 0.8 - constrain the object in the canvas

    //c2 = new Cloud(width / 4, height / 4, 50)
  }
}

function draw() {
  background(220);
  for (let i = 0; i < n; i++) {
    c[i].display()
    c[i].move()
    c[i].moveback()
  }

  //c2.display()
  //c2.move()
}

class Cloud {
  //constructor is like the setup
  constructor(x, y, s) {
    this.x = x
    this.y = y
    this.s = s;
    this.speedX = map(this.s, 30, 100, 3, 0.5)//small fater, large slower

    this.y0 = y
    // //store the initial value of y; this.y0 is a constant value; this.y is a changing value; useful in move()

    this.h = random(0, 100)
  }

  //methods are the functions
  display() {
    push();
    translate(this.x, this.y);

    //Left arm
    beginShape();
    let lineLength = this.s * 0.5;
    noFill();
    for (let i = -lineLength * 2; i <= lineLength; i += lineLength / 20) {
      strokeWeight(this.s * 0.1);
      let v = this.s * 0.1 * sin(frameCount * 0.1 - i / (this.s * 0.1));
      vertex(i, v);
    }
    endShape();

    //Right arm
    push()
    scale(-1, 1)
    beginShape();
    noFill();
    for (let i = -lineLength * 2; i <= lineLength; i += lineLength / 20) {
      strokeWeight(this.s * 0.1);
      let v = this.s * 0.1 * sin(PI + frameCount * 0.1 - i / (this.s * 0.1));
      vertex(i, v);
    }
    endShape();
    pop()

    //main body
    fill(this.h, 30, 100)
    noStroke();
    circle(0, 0, this.s);

    //circles around the body
    for (let a = 0; a < 2 * PI; a += PI / 6) {
      push();
      rotate(a);
      circle(this.s * 0.5, this.s * 0.3, this.s * 0.5);
      pop();
    }
    //face
    fill(0);
    circle(-this.s * 0.3, 0, this.s * 0.05);
    circle(this.s * 0.3, 0, this.s * 0.05);
    arc(0, 0, this.s * 0.3, this.s * 0.3, 0, PI);
    pop();
  }
  move() {
    // this.x = this.x0 + 100 * cos(frameCount * 0.05)
    // this.y = this.y0 + 100 * sin(frameCount * 0.05)
    // this.s = map(sin(frameCount * 0.05), -1, 1, this.s0 * 0.7, this.s0)

    this.x = this.x + this.speedX
    this.y = this.y0 + this.s * sin(frameCount * 0.01)
  }

  moveback() {
    if (this.x > width) {
      this.x = random(-width, -width * 0.1)
      this.y = random(height)
    }
  }
}