/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Stanley(width / 2, height / 2);

}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();

}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Stanley {
  constructor(startX, startY) {
    this.baseX = startX;
    this.baseY = startY;
    this.baseScale = 1.00;

    this.colWhite = "#fffbf0";
    this.colBrown = "#c6b6ac"
    this.colRed = "#fb3310"

    this.armsY = [0, 0, 22, 22]
    this.armsScaleX = [1, -1, 1, -1]
    //left upper arm, right upper arm, left bottom arm, right bottom arm


    this.legSwingSpeed = 0
    this.armSwingSpeed = 0
    this.blinkTimer = 0;
    this.t = 0
    this.heartSize = 10
    this.moveSpeed = 0

  }


  upperPaws() {
    fill("#c6b6ac");
    for (let angle = PI / 6; angle < PI; angle += PI / 3) {
      const x = 9 * cos(angle);
      const y = 9 * sin(angle);
      circle(x, y, 7);
    }
    circle(0, 0, 10)
  }

  bottomPaws() {
    fill("#c6b6ac");
    for (let angle = PI / 6; angle < PI; angle += PI / 3) {
      const x = 9 * cos(angle);
      const y = 9 * sin(angle);
      circle(x, y, 8);
    }
    circle(0, 0, 10)

  }

  upperArms(a = 0) {
    //left upper arm
    stroke(this.colWhite);
    strokeWeight(8);
    fill(this.colWhite)
    push()
    rotate(-PI / 8 + a);
    ellipse(-23, 5, 20, 3);
    rotate(PI / 4 + a * 0.2);
    ellipse(-33, 28, 25, 5);

    //let upper paw
    noStroke()
    fill(this.colBrown)
    push();
    translate(-45, 28);
    rotate(PI / 1.5);
    this.upperPaws();
    pop();

    pop()
  }

  bottomArms(a = 0) {
    //left bottom arm
    stroke(this.colWhite);
    strokeWeight(8);
    fill(this.colWhite)
    push()
    rotate(-PI / 8 + a);
    ellipse(-30, 3, 30, 4);
    rotate(PI / 4 + a * 0.2);
    ellipse(-45, 33, 35, 5);

    //left bottom paw
    noStroke()
    fill(this.colBrown)
    push();
    translate(-60, 33);
    rotate(PI / 1.5);
    this.bottomPaws();
    pop();

    pop()
  }




  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    scale(this.s)

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    //Main body
    noStroke();
    fill(this.colWhite);
    rect(-5, -10, 10, 20)
    ellipse(0, 24, 25, 55);//body

    //Head

    push()
    translate(0, -15);
    rotate(this.headSwing);
    translate(0, 15);
    if (mouseIsPressed) {
      colorMode(HSB, 100)
      const h = map(sin(this.t * 0.5), -1, 1, 0, 100)
      fill(h, 80, 100)
    } else {
      fill(this.colRed)
    }

    beginShape();
    curveVertex(0, -15);
    curveVertex(12, -8);
    curveVertex(48, -15);
    curveVertex(35, -70);
    curveVertex(0, -90);
    curveVertex(-35, -70);
    curveVertex(-48, -15);
    curveVertex(-12, -8);
    curveVertex(0, -15);
    endShape();

    //eyes
    noStroke()
    fill(255)
    if (!this.blink) {
      ellipse(-10, -30, 6, 12);
      ellipse(10, -30, 8, 15);
    } else {
      noFill()
      stroke(255)
      strokeWeight(3)
      arc(-10, -30, 6, 12, -PI, 0,);
      arc(10, -30, 8, 15, -PI, 0);
    }

    //Patten on head
    fill(255)
    noStroke()
    push()
    translate(10, -65)
    rotate(PI / 6)
    ellipse(0, 0, 15, 12);
    pop()

    push()
    translate(-18, -70)
    rotate(-PI / 4.5)
    ellipse(0, 0, 45, 25);
    pop()

    push()
    translate(25, -73)
    rotate(PI / 4)
    ellipse(0, 0, 30, 10);
    pop()


    pop()

    //upper arms
    for (let i = 0; i < 2; i++) {
      const sx = this.armsScaleX[i]
      const a = this.upperArmsSwing;
      push();
      scale(sx, 1)
      this.upperArms(a);
      pop();
    }

    //bottom arms
    for (let i = 2; i < 4; i++) {
      const y = this.armsY[i]
      const sx = this.armsScaleX[i]
      const a = this.bottomArmsSwing;
      push();
      translate(0, y);
      scale(sx, 1)
      this.bottomArms(a);
      pop();
    }


    //left leg
    noStroke();
    fill(this.colWhite);
    push();
    translate(-8, 55);
    rotate(-1 * this.leftLegSwing);
    this.leftLength = map(sin(this.t * 5), -1, 1, 62, 52)
    ellipse(0, 10, 16, this.leftLength);
    pop();

    //right leg
    noStroke();
    fill(this.colWhite);
    push();
    translate(8, 55);
    rotate(this.rightLegSwing);
    this.rightLength = map(sin(this.t * 5), -1, 1, 52, 62)
    ellipse(0, 10, 16, this.rightLength);
    pop();


    //Heart
    if (mouseIsPressed) {
      colorMode(HSB, 100)
      const h = map(sin(this.t * 0.5), -1, 1, 0, 100)
      fill(h, 80, 100)
    } else {
      fill(this.colRed)
    }
    arc(-3, 12, 4 + this.heartSize, 4 + this.heartSize, 3 * PI / 4, 7 * PI / 4)
    arc(3, 12, 4 + this.heartSize, 4 + this.heartSize, 5 * PI / 4, PI / 4)
    push()
    translate(0, 15)
    rotate(PI / 4)
    rectMode(CENTER)
    rect(0, 0, 4 + this.heartSize, 4 + this.heartSize)
    pop()

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.

    //this.drawReferenceShapes()

    pop();
  }

  // drawReferenceShapes() {
  //   noFill();
  //   strokeWeight(1)
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }


  update() {
    this.t += 0.03

    //leg
    if (keyIsPressed) {
      this.legSwingSpeed = 5
    } else {
      this.legSwingSpeed = 1
    }
    this.leftLegSwing = 0.2 * sin(this.legSwingSpeed * this.t + 5
    );
    this.rightLegSwing = 0.2 * sin(this.legSwingSpeed * this.t
    )
    //arm
    if (keyIsPressed) {
      this.armSwingSpeed = 5
    } else {
      this.armSwingSpeed = 1
    }
    this.upperArmsSwing = 0.4 * sin(this.armSwingSpeed * this.t);
    this.bottomArmsSwing = 0.2 * sin(this.armSwingSpeed * this.t);
    this.headSwing = 0.18 * sin(this.t * 1.2);

    //blink
    this.blinkTimer = (this.blinkTimer + 1) % 110;//the frequency of blinking
    this.blink = (this.blinkTimer < 30);
    //the real blinking time

    this.heartSize = map(sin(this.t), -1, 1, 5, 9)


    //overall
    if (keyIsPressed) {
      this.moveSpeed = 5
    } else {
      this.moveSpeed = 1
    }
    this.x = this.baseX + 30 * sin(this.moveSpeed * this.t * 0.6);
    this.y = this.baseY + 15 * sin(this.moveSpeed * this.t * 1.2 + PI / 2);
    this.s = this.baseScale + -0.3 * sin(this.t * 1.1);

  }
  // update properties here to achieve
  // your dancer's desired moves and behaviour





}


/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/