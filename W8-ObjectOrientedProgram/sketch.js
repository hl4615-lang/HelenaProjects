// let x, y;
let c;//A variable store the code of cloud
function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  // x = width / 2;
  // y = height / 2;
  c = new Cloud()
}

function draw() {
  background(220);
  // drawCloud(x, y, 100);
  // move()
  c.display()
  c.move()
}

class Cloud {
  //constructor is like the setup
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.s = 100;
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
    fill(255)
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
    //this.y = height * noise(frameCount * 0.01)    
    this.x = width / 2 + 100 * cos(frameCount * 0.05)
    this.y = height / 2 + 100 * sin(frameCount * 0.05)
    this.s = map(sin(frameCount * 0.05), -1, 1, 50, 150)
  }
}

// function move() {
//   y = height * noise(frameCount * 0.01)
// }

// function drawCloud(u, v, s) {
//   push();
//   translate(u, v);
//   noStroke();
//   circle(0, 0, s);
//   //circles around the body
//   for (let a = 0; a < 2 * PI; a += PI / 6) {
//     push();
//     rotate(a);
//     circle(s * 0.5, s * 0.3, s * 0.5);
//     pop();
//   }
//   //face
//   fill(0);
//   circle(-s * 0.3, 0, s * 0.05);
//   circle(s * 0.3, 0, s * 0.05);
//   arc(0, 0, s * 0.3, s * 0.3, 0, PI);
//   pop();
// }


