let x = [];
let y = [];
let s = [];
let speedX = [];
//let n = 10;//number of cloud
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // for (let i = 0; i < n; i++) {
  //   x[i] = random(width)
  //   y[i] = random(height)
  //   s[i] = random(50, 150)
  //   speedX[i] = map(s[i], 50, 150, 10, 0.5)
  //   //fast small cloud,slow big cloud
  // }

}

function draw() {
  background(220);
  for (let i = 0; i < x.length; i++) {
    drawCloud(x[i], y[i], s[i])
  }
  move()
  console.log(x.length)
  //Not define the number of element in the array, using the length, which is a number one higher than the highest index in the array.
}

function drawCloud(x, y, s) {
  fill(255, 230);
  push();
  noStroke();
  translate(x, y);
  //main circle
  circle(0, 0, s);
  //add circles around
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    let s2 = map(noise(angle), 0, 1, s * 0.1, s)
    circle(s2, 0, s2);
    //circle(s*0.5, 0, s*0.5);
    pop();
  }
  pop();
}

function move() {
  for (let i = 0; i < x.length; i++) {
    x[i] = x[i] + speedX[i]
    //x = x % (width + 100)
    if (x[i] > width + 100) {
      x[i] = random(-width * 0.3, -width)
    }
    //f = map(sin(frameCount * 0.1), -1, 1, -50, 50)
    //y = height / 2 + f
    y[i] = height * noise(frameCount * 0.003)
  }
}

function mousePressed() {
  x.push(mouseX);
  y.push(mouseY);
  s.push(random(50, 150));
  speedX.push(map(100, 50, 150, 10, 0.5))
}