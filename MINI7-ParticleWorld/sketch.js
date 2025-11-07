// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 6; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 30; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 100)
  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  gradientSky()

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.display();
    p.move();
    p.moveback()

    for (let j = 0; j < particles.length; j++) {
      if (i != j) {
        particles[i].checkCollision(particles[j])
      }
    }

  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY))
}

function gradientSky() {
  for (let i = 0; i < height; i++) {
    const t = i / (height - 1);
    const bri = lerp(100, 40, t);
    stroke(60, 60, bri);
    line(0, i, width, i);
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.x0 = startX;
    this.y0 = startY;
    this.s = random(0.5, 1.2)


    this.baseHue = 0;
    this.baseSat = 0;
    this.hue = this.baseHue;
    this.sat = this.baseSat
    this.cooldown = 0

    this.colWhite = color(this.baseHue, this.baseSat, 100)
    this.colGold = color(12, 90, 100)

    this.speedX = map(this.s, 0.3, 1.2, -0.1, 0.04);
    this.speedY = map(this.s, 0.3, 1.2, 4, 1);

    this.ringR = 0;
    this.ringSat = 0;
  }

  //single wing
  wing() {
    noStroke()
    fill(this.colWhite)
    for (let i = 0; i < 40; i++) {
      let s = map(i, 0, 40, 20, 70) * this.s; //smaller to bigger
      let x = map(i, 0, 40, 150, 0) * this.s; //how long
      let y = this.s * 20 * sin(frameCount * 0.03 + i * 0.1);
      circle(x, y, s);
    }
  }


  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);

    //wings
    for (let i = 0; i < 2; i++) {
      const wingScaleX = [-1, 1]
      const sx = wingScaleX[i]
      push();
      scale(sx, 1)
      this.wing();
      pop();
    }

    //tail
    rectMode(CENTER)
    noStroke()
    fill(this.colWhite)
    const ty = 35 * sin(frameCount * 0.03 + 40 * 0.1)
    rect(0, this.s * (80 + ty), this.s * 15, this.s * 150, this.s * 10);

    //head
    rectMode(CENTER);
    noStroke()
    fill(this.colGold)
    const y = 20 * sin(frameCount * 0.03 + 40 * 0.1)

    //gold square
    beginShape();
    vertex(0, this.s * (y - 35));
    vertex(this.s * -25, this.s * (y - 15));
    vertex(0, this.s * (1.2 * y + 15))
    vertex(this.s * 25, this.s * (y - 15));
    endShape();

    //white square
    noStroke()
    fill(this.colWhite)
    beginShape();
    vertex(0, this.s * (y - 20));
    vertex(this.s * -10, this.s * (y - 10));
    vertex(0, this.s * (1.2 * y + 10));
    vertex(this.s * 10, this.s * (y - 10));
    endShape();

    //tail square
    noStroke()
    fill(this.colWhite)
    const x = 3 * sin(frameCount * 0.03 + 40 * 0.1)
    beginShape();
    vertex(0, this.s * (y + 20));
    vertex(this.s * (x - 20), this.s * (y + 40));
    vertex(0, this.s * (y + 80));
    vertex(this.s * (-x + 20), this.s * (y + 40));
    endShape();

    //tail ellipse
    noStroke()
    fill(this.colWhite)
    ellipse(0, this.s * (170 + ty), this.s * (25 + (-1.5 * x)), this.s * 60)
    noStroke()
    fill(this.colGold)
    ellipse(0, this.s * (190 + ty), this.s * (15 + (-1.5 * x)), this.s * 30)

    pop()

  }


  move() {
    this.y = this.y - this.speedY
    this.x = lerp(this.x, this.x0 + 50 * this.s * sin(frameCount * this.speedX), 0.1)


    this.hue = lerp(this.hue, this.baseHue, 0.02);
    this.sat = lerp(this.sat, this.baseSat, 0.02);
    this.colWhite = color(this.hue, this.sat, 100);
    //avoid color flash
    if (this.cooldown < 30) { this.cooldown++ }

  }

  moveback() {
    if (this.y < this.s * 2 - 200) {
      this.y = random(height * 1.2, height * 1.5);
      this.x = random(width);
    }
  }

  checkCollision(other) {
    let d = dist(this.x, this.y, other.x, other.y)
    if (d < (this.s * 100 + other.s * 100) && this.cooldown >= 30) {
      this.hue = random(100)
      this.sat = random(10, 40)
      this.cooldown = 0;
    }
  }
}