let mySound1;//global variable
let mySound2
function preload() {
  mySound1 = loadSound("assets/beat.mp3");
  mySound2 = loadSound("assets/kick.mp3");
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

let x = 25
let speedX = 5

function draw() {
  background(220);
  fill(0)
  let f = map(mouseY, 0, height, 1, 3)
  circle(x, height / 2, 50);
  x = x + speedX * f;
  if (x > width - 25) {
    speedX = -speedX;
    mySound1.play();
  }
  if (x < 25) {
    speedX = -speedX;
    mySound2.play();
  }
}

// function mousePressed() {
//   if (mySound.isPlaying() == false) {
//     mySound1.play();
//     mySound2.play();
//   } else {
//     mySound1.stop();
//     mySound2.play();
//   }
// }
