let r = [];
let c = [];

let n = 3;
let mic;
let sound;
function preload() {
  sound = loadSound("assets/thunder.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100);
}

function mousePressed() {
  c.push(new Cloud(mouseX, mouseY, random(50, 100)));
}

function draw() {
  background(220);

  // limit the number of objects
  while (r.length > 80) {
    r.splice(0, 1); //(index, quantity)
  }

  // for (let i = r.length - 1; i >= 0; i--) {
  //   if (r[i].isOut() == true) {
  //     r.splice(i, 1)
  //   }
  // }

  for (let i = 0; i < r.length; i++) {
    r[i].display();
    r[i].update();
  }

  // if (mouseIsPressed) {
  //   r.push(new Rain(mouseX, mouseY))
  // }
  // //console.log(r.length)


  //cloud
  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < c.length; j++) {
      if (i != j) {
        c[i].checkCollision(c[j]);
        if (c[i].isRaining == true) {
          r.push(new Rain(c[i].x, c[i].y, c[i].h))

        }
      }
    }
    c[i].display();
    c[i].move();
    //c[i].moveback();
    if (c[i].isOut()) {
      c.splice(i, 1);
    }

  }
}

