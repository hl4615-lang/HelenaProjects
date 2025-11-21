let img
let cam

function preload() {
  img = loadImage("assets/hokusai.jpg")

}

function setup() {
  let canvas = createCanvas(600, 400, WEBGL);
  //WEBGL for 3D effect,z Coordinate
  canvas.parent("p5-canvas-container");
  cam = createCapture(VIDEO)
  cam.hide()
}

let s = 10
function draw() {

  img.loadPixels();//very important
  cam.loadPixels(); //very important

  // //Images rect pixels
  //background(0)
  // for (let y = 0; y < height; y += s) {
  //   for (let x = 0; x < width; x += s) {
  //     //pixel's index = x + y*width
  //     let i = (y * width + x) * 4
  //     let r = img.pixels[i + 0]
  //     let g = img.pixels[i + 1]
  //     let b = img.pixels[i + 2]
  //     fill(r, g, b)
  //     noStroke()
  //     rect(x, y, s)
  //   }
  // }

  //   //Images random pixels
  // for(let n=0;n<100;n++){
  //   //for loop accelerate
  //   let x = floor(random(img.width))
  //   let y = int(random(img.height))
  // //floor=int same effect
  //   let s = random(5, 30)
  //   let i = (y * width + x) * 4
  //   let r = img.pixels[i + 0]
  //   let g = img.pixels[i + 1]
  //   let b = img.pixels[i + 2]
  //   noStroke()
  //   fill(r, g, b)
  //   circle(x, y, s)
  // }


  // //Camera random pixels
  // for (let n = 0; n < 100; n++) {
  //   //for loop accelerate
  //   let x = floor(random(cam.width))
  //   let y = int(random(cam.height))
  //   //floor=int same effect
  //   let s = random(5, 30)
  //   let i = (y * cam.width + x) * 4
  //   let r = cam.pixels[i + 0]
  //   let g = cam.pixels[i + 1]
  //   let b = cam.pixels[i + 2]
  //   noStroke()
  //   fill(r, g, b)
  //   circle(x, y, s)
  // }


  // //Image 3D effect
  // for (let y = 0; y < img.height; y += s) {
  //   for (let x = 0; x < img.width; x += s) {
  //     let i = (y * img.width + x) * 4
  //     let r = img.pixels[i + 0]
  //     let g = img.pixels[i + 1]
  //     let b = img.pixels[i + 2]
  //     //pixels that are more blue, move toward the cam
  //     let z = map(b, 0, 255, mouseY, 0)
  //     push()
  //     // //translate the center if use WEBGL
  //     // translate(-width / 2, -height / 2)

  //     translate(-width / 2, -height / 2, z)

  //     noStroke()
  //     fill(r, g, b)
  //     rect(x, y, s)

  //     pop()
  //   }
  // }


  // //Cam 3D effect
  // for (let y = 0; y < cam.height; y += s) {
  //   for (let x = 0; x < cam.width; x += s) {
  //     let i = (y * cam.width + x) * 4
  //     let r = cam.pixels[i + 0]
  //     let g = cam.pixels[i + 1]
  //     let b = cam.pixels[i + 2]

  //     let brightness = (r + g + b) / 3
  //     let z = map(brightness, 0, 255, mouseY, 0)
  //     push()
  //     // //translate the center if use WEBGL
  //     // translate(-width / 2, -height / 2)
  //     translate(-width / 2, -height / 2, z)

  //     noStroke()
  //     fill(r, g, b)
  //     rect(x, y, s)

  //     pop()
  //   }
  // }


  image(cam, 0, 0)
  findColor(cam, colorToTrack)
}

//how to track the color
function mousePressed() {
  loadPixels();
  colorToTrack = cam.get(mouseX, mouseY);

}

function findColor(input, c) {
  //colorRed,colorGreen,colorBlue
  let cr = c[0];
  let cg = c[1];
  let cb = c[2];
  let cx = 0
  let cy = 0
  input.loadPixels()
  //draw all the pixels from cam
  for (let y = 0; y < cam.height; y += s) {
    for (let x = 0; x < cam.width; x += s) {
      let i = (y * cam.width + x) * 4
      let r = cam.pixels[i + 0]
      let g = cam.pixels[i + 1]
      let b = cam.pixels[i + 2]

      //if find the color in the cam
      if (
        r > cr && r < cr &&
        g > cg && g < cg &&
        b > cb && b < cb
      ) {
        cx = x;
        cy = y;
        fill(colorToTrack)
        circle(cx, cy, 30)
      }

    }
  }
}