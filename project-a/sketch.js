/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")
  colorMode(HSB, 100);
  rectMode(CENTER);
}

function draw() {
  backGround();

  //back to white if not overlap
  edgeSat = lerp(edgeSat, 0, 0.02);
  bottomEdge(0, height - 80);
  cloud(width / 2, height / 2);

  //center of cloud(width/2+ x1, height/2+ y1)
  senseLines(width / 2 + x1, height / 2 + y1);
  pulse(width / 2 + x1, height / 2 + y1, frameCount * 0.5);
}

let x1 = 0;
let y1 = 0;
let dx = 0;
let dy = 0;
let scatterSizeNoise = 0; //each scatter circle size variation
let angularNoise = 0; //Each scatter angular variation
let rotationNoise = 0; //entire cloud rotation
let R = 0; //R=cloud rdius
let r = 0; //r=cloud radius variation+scatter circle size variation
let edgeHue = 0;
let edgeSat = 0;

function mouseReleased() {
  // When not pressed,follows the mouse with curiosity
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    x1 = lerp(x1, mouseX - width / 2, 0.008);
    y1 = lerp(y1, mouseY - height / 2, 0.008);
  }

  //When not pressed,slow motion
  if (frameCount % 30 == 0) {
    dx = random(-2, 2);
    dy = random(-2, 2);
  }
}

function cloud(x, y) {
  push();
  translate(x, y);
  mouseReleased();

  for (let R = 50; R <= 250; R += 50) {
    for (let angle = 0; angle < 2 * PI; angle += PI / 6) {
      //When pressed,fast motion
      if (frameCount % 30 == 0 && mouseIsPressed == true) {
        dx = random(-8, 8);
        dy = random(-8, 8);
      }

      //lerp() for smooth motion+random direction
      x1 = lerp(x1, x1 + dx, 0.01);
      y1 = lerp(y1, y1 + dy, 0.01);

      //cloud radius variation+scatter circle size variation+rotation
      if (mouseIsPressed) {
        scatterSizeNoise = R;
        rotationNoise = map(noise(frameCount * 0.01), 0, 1, -PI, PI);
      } else {
        scatterSizeNoise = angle * 0.2;
      }
      r = R * noise(frameCount * 0.01 + scatterSizeNoise);

      //cloud pattern
      if (keyIsPressed == true && key == " ") {
        x =
          x1 +
          r * cos(angle + angularNoise + rotationNoise + frameCount * 0.02);
        y =
          y1 +
          r * sin(angle + angularNoise + rotationNoise + frameCount * 0.05);
      } else {
        x =
          x1 +
          r * cos(angle + angularNoise + rotationNoise + frameCount * 0.01);
        y =
          y1 +
          r * sin(angle + angularNoise + rotationNoise + frameCount * 0.01);
      }
      //circle size
      let s1 = map(angle, 0, 2 * PI, 5, 30);
      let s2 = map(R, 0, 300, 1, 25);
      let s = s1 + s2;

      //color
      let baseH = map(angle, 0, 2 * PI, 0, 100);
      let h = baseH;
      let baseSat = map(R, 0, 300, 10, 100);
      let sat = baseSat;

      //Interaction combination
      //1 & z
      if ((keyIsDown(49) && keyIsDown(90)) || keyIsDown(122)) {
        h = (baseH + frameCount * 2) % 100;
        angularNoise = map(noise(frameCount * 0.01 + angle), 0, 1, -PI, PI); //angular noise
      }
      //2 & z
      if ((keyIsDown(50) && keyIsDown(90)) || keyIsDown(122)) {
        h = (baseH + frameCount * 2) % 100;
        baseSat = map(R, 300, 0, 10, 100);
        sat = (baseSat + frameCount * 2) % 100;
        angularNoise = map(noise(frameCount * 0.01 + angle), 0, 1, -PI, PI); //angular noise
      }

      //flash when keypress
      if (keyIsPressed == true && key == "1") {
        h = (baseH + frameCount * 2) % 100;
      }
      if (keyIsPressed == true && key == "2") {
        h = (baseH + frameCount * 2) % 100;
        baseSat = map(R, 300, 0, 10, 100);
        sat = (baseSat + frameCount * 2) % 100;
      }

      //When press a angular change
      if ((keyIsPressed == true && key == "z") || key == "Z") {
        angularNoise = map(noise(frameCount * 0.01 + angle), 0, 1, -PI, PI); //angular noise
      }

      //mouseXY interaction
      mouseX = constrain(mouseX, 0, width);
      mouseY = constrain(mouseY, 0, height);

      let d = dist(mouseX, mouseY, width / 2 + x1, height / 2 + y1);
      let dia = dist(0, 0, width, height);
      //max dist between mouseXY & xy

      let sizeNoise = map(d, 0, dia, 1, 5);
      //modify factor for size
      let strokeNoise = map(d, 0, dia, 3, 30);

      //1 & x
      if ((keyIsDown(49) && keyIsDown(88)) || keyIsDown(120)) {
        h = (baseH + frameCount * 2) % 100;
        rotate(angle);
      }
      //1 & c
      if ((keyIsDown(49) && keyIsDown(67)) || keyIsDown(99)) {
        h = (baseH + frameCount * 2) % 100;
        rotationAngle = map(d, 0, dia, 0, PI);
        rotate(rotationAngle * 0.1);
      }

      //2 & x
      if ((keyIsDown(50) && keyIsDown(88)) || keyIsDown(120)) {
        h = (baseH + frameCount * 2) % 100;
        baseSat = map(R, 300, 0, 10, 100);
        sat = (baseSat + frameCount * 2) % 100;
        rotate(angle);
      }
      //2 & c
      if ((keyIsDown(50) && keyIsDown(67)) || keyIsDown(99)) {
        h = (baseH + frameCount * 2) % 100;
        baseSat = map(R, 300, 0, 10, 100);
        sat = (baseSat + frameCount * 2) % 100;
        rotationAngle = map(d, 0, dia, 0, PI);
        rotate(rotationAngle * 0.1);
      }

      //Spread follow mouse
      if ((keyIsPressed == true && key == "x") || key == "X") {
        rotate(angle);
      }
      if ((keyIsPressed == true && key == "c") || key == "C") {
        rotationAngle = map(d, 0, dia, 0, PI);
        rotate(rotationAngle * 0.1);
      }

      //circle & rect
      if ((keyIsPressed == true && key == "s") || key == "S") {
        noFill();
        stroke(h, sat, 100);
        strokeWeight(strokeNoise);
        rect(x, y, (s - 20) * sizeNoise);
      } else {
        fill(h, sat, 100);
        noStroke();

        x = constrain(x, -width / 2, width / 2);
        y = constrain(y, -height / 2, height / 2);
        circle(x, y, s);
        edgeCollision(x, y);
      }
    }
  }

  pop();
}

function pulse(x, y, t) {
  push();
  stroke(100);
  strokeWeight(5);
  let pulseSize = map(sin(t * 0.1), -1, 1, 20, 40);
  fill(t % 100, 80, 100);
  circle(x, y, pulseSize);
  pop();
}

function senseLines(x, y) {
  let d = dist(mouseX, mouseY, width / 2 + x1, height / 2 + y1);
  if (d < 130) {
    push();
    stroke(map(d, 0, 150, 100, 0), 10, 100);
    strokeWeight(20);
    line(x, y, mouseX, mouseY);
    pop();
  }
}
function bottomEdge(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(edgeHue, edgeSat, 100);
  beginShape();
  for (let i = 0; i <= width; i += width / 600) {
    let v = 40 * sin(frameCount * 0.1 - 100000 * i);
    vertex(i, v);
  }
  endShape();
  pop();
}

//if overlap,change edge color
function edgeCollision(x, y) {
  let edgeY = height - 40 + 40 * sin(frameCount * 0.1 - 100000 * x);
  if (abs(y - edgeY) <= 250 && frameCount % 100 == 0) {
    edgeHue = random(100);
    edgeSat = 100;
  }
}

function backGround() {
  colorMode(HSB, 100);
  if (mouseIsPressed) {
    let h = map(sin(frameCount * 0.01), -1, 1, 0, 30);
    let sat = 10;
    background(h, sat);
  } else {
    let h = map(sin(frameCount * 0.01), -1, 1, 0, 30);
    let sat = 20;
    background(h, sat);
  }

  //squares
  rectMode(CENTER);
  noFill();
  let s = 40;
  for (let x = s / 2; x < width+40; x += s) {
    for (let y = s / 2; y < height+40; y += s) {
      let d = dist(width / 2 + x1, height / 2 + y1, x, y);
      let Diagonal = dist(s / 2, s / 2, width, height);
      //max dist between center & each rect xy
      let f = map(d, 0, Diagonal, 0.05, 5);
      //modify factor for size
      angle = map(d, 0, Diagonal, 0, 2 * PI);
      h = map(d, 0, Diagonal, 0, 100);
      sw = map(d, 0, Diagonal, 0, 20);

      push();
      translate(x, y);
      stroke(h, 30, 30);
      strokeWeight(sw);
      rotate(angle);
      rect(0, 0, s * f);
      pop();
    }
  }
}
