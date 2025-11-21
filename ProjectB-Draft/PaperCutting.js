// Usage: Press and drag within the red paper to draw a polygon. Once you reach near the starting point, release the button to "cut off" this area.

// Press Z to undo the previous step, press C to clear, and press S to save the screenshot.

let paperLayer;                 // red p5.Graphics layer
let rectX, rectY, rectW, rectH; // red rectangle

let pointX = [];                // x-coordinates of vertices
let pointY = [];                //  y-coordinates of vertices
let closeThreshold = 15;        // closing distance threshold (px)

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  //red rectangle layer
  rectX = 100
  rectY = 50;
  rectW = width - 200;
  rectH = height - 100;

  paperLayer = createGraphics(width, height);
  paperLayer.noStroke();
  paperLayer.fill(210, 20, 32);
  paperLayer.rect(rectX, rectY, rectW, rectH, 24);
}

function draw() {
  background(255);
  image(paperLayer, 0, 0);

  if (pointX.length > 0) {
    // Mouse trail, preview the drawing
    noFill();
    stroke(255);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < pointX.length; i++) {
      vertex(pointX[i], pointY[i]);
    }
    endShape();

    //show the beginning point & closing prompt
    let d = dist(mouseX, mouseY, pointX[0], pointY[0]);
    noStroke();
    fill(255)
    circle(pointX[0], pointY[0], 6);
    if (d < closeThreshold && pointX.length >= 3) {
      fill(0, 150, 0);
      textAlign(CENTER, CENTER);
      textSize(20)
      text('Release to cut the area', pointX[0], pointY[0] - 18);
    }
  }

  //red rect stroke
  noFill();
  stroke(160);
  strokeWeight(2);
  rect(rectX, rectY, rectW, rectH, 24);

}


//Only draw within the red rect
function insidePaper(x, y) {
  if (x >= rectX && x <= rectX + rectW &&
    y >= rectY && y <= rectY + rectH) {
    return true;
  } else {
    return false;
  }
}

function mousePressed() {
  if (insidePaper(mouseX, mouseY)) {
    //beginning point is the first (mouseX,mouseY)
    pointX = [mouseX];
    pointY = [mouseY];
  }
}

//Move the mouse, add new (mouseX,mouseY) as new points
function mouseDragged() {
  const lastX = pointX[pointX.length - 1]
  const lastY = pointY[pointY.length - 1];
  const dx = mouseX - lastX, dy = mouseY - lastY;
  //compare the distance between mouse and last point, if large enough, take the mouseXY as new/next point
  if (dx * dx + dy * dy >= 9) {
    pointX.push(mouseX); pointY.push(mouseY);
  }
}


//close the shape
function mouseReleased() {
  // close the shape when mouse is near the beginning point, 
  if (pointX.length >= 3) {
    let d = dist(mouseX, mouseY, pointX[0], pointY[0]);
    if (d < closeThreshold) {
      cutPolygon(pointX, pointY);
    }
  }
  //clear current polygon points
  pointX = [];
  pointY = [];
}


//fill a white polygon on the red paper layer (visual "cut out")
function cutPolygon(x, y) {
  paperLayer.push();
  paperLayer.noStroke();
  paperLayer.fill(255);
  paperLayer.beginShape();
  for (let i = 0; i < x.length; i++) {
    paperLayer.vertex(x[i], y[i]);
  }
  paperLayer.endShape(CLOSE);
  paperLayer.pop();
}


