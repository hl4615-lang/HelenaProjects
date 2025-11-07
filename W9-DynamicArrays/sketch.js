let c = [];
let n = 3;
let sound

function preload() {
  sound = loadSound("assets/song.mp3")
}

function setup() {
  //createCanvas(400, 400);
  colorMode(HSB, 100);
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");
  // for (let i = 0; i < n; i++) {
  //   c[i] = new Cloud(random(width), random(height), random(50, 100));
  // }

  mic = new p5.AudioIn()
  mic.start()

}

function mousePressed() {
  c.push(new Cloud(mouseX, mouseY, random(50, 100)))
}

function draw() {
  background(220);
  for (let i = 0; i < c.length; i++) {
    c[i].display();
    c[i].move();

    for (let j = 0; j < c.length; j++) {
      if (i != j) {
        c[i].checkCollision(c[j])
      }
    }

    //c[i].moveback();
    if (c[i].isOut() == true) {
      c.splice(i, 1)
    }
  }

  // if (mouseIsPressed) {
  //   c.push(new Cloud(mouseX, mouseY, random(50, 100)))
  // }
}



