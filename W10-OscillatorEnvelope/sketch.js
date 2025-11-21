let osc, envelope

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  //Triangle Oscillator
  osc = new p5.TriOsc();
  //sinOsc, SqrOsc, SawOsc
  osc.start();

  //envelope
  envelope = new p5.Env()
  //envelope ADSR, Attack time /Decay time /Sustain radio /Release
  envelope.setADSR(0.01, 0.5, 0.1, 0.5)

}

function draw() {
  background(220);
  // if (mouseIsPressed) {

  //   fill(0)
  //   circle(mouseX, mouseY, 100)

  //   //oscillator frequency map
  //   let f = map(mouseX, 0, width, 80, 800)
  //   osc.freq(f)

  //   //oscillator amplitude(value,transition like lerp)
  //   osc.amp(1, 0.1);

  // } else {
  //   osc.amp(0, 0.1)
  // }

}

function mousePressed() {
  fill(0)
  circle(mouseX, mouseY, 100)

  //oscillator frequency map
  let f = map(mouseX, 0, width, 80, 800)
  osc.freq(f)

  osc.start()
  envelope.play(osc)

}
