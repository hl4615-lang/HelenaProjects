function setup() {
  createCanvas(400, 400);
  let canvas =createCanvas(400, 400);
canvas.parent(“p5-canvas-containor”)

  }



function draw() {
  background('#FFCCCC');
  
//BACKGROUND DECORATION
  fill('#FF99CC ')
  noStroke()
  circle(400,400,140)
  fill('#FFCCFF ')
  stroke('#FFFF99')
  strokeWeight(15)
  circle(300,220,150) 
  fill('#FF33CC ')
  noStroke()
  circle(350,100,220)  
  fill('#CCCCFF ')
  noStroke()
  circle(50,100,90) 
  fill('#CCCCFF ')
  stroke('#9966CC')
  strokeWeight(15)
//HAIR
  fill('#0746fe')
  stroke('#0746fe')
  beginShape();
  curveVertex(140,350)
  curveVertex(260,350)
  curveVertex(260,135)
  curveVertex(200, 80)
  curveVertex(140,135)
  curveVertex(130,250)
  endShape(CLOSE);
  
  stroke('#CCFFFF')
  strokeWeight(30)
  line(183,150,183,190)
  stroke('#0099CC')
  strokeWeight(15)
  line(155,150,155,190)
  stroke('#CCCCFFF')
  strokeWeight(6)
  line(165,150,165,190)
  stroke('#336699')
  strokeWeight(15)
  line(195,100,195,190)
  stroke('#6699FF')
  strokeWeight(20)
  line(205,100,205,190)
  stroke('#66CCFF')
  strokeWeight(15)
  line(243,100,243,190)

//CURVE TRIANGLE HAT
  fill('#996633')
  stroke('#663300')
  strokeWeight(12)
  beginShape();
  curveVertex(155,35)
  curveVertex(150,35)
  curveVertex(20, 220)
  curveVertex(380,25)
  endShape(CLOSE);
  
//Decoration
  fill('#FFFF00')
  noStroke()
  circle(30,205,10)
  circle(60,190,12)
  circle(100,170,14)
  circle(140,150,16)
  circle(180,128,18)
  circle(220,106,20)
  circle(260,82,22)
  circle(300,58,24)
  circle(340,32,26)
  
//HAT TIP
  fill('#f47d00 ')
  stroke('#FFFF99')
  strokeWeight(20)
  triangle(125, 115, 135, 20, 230, 55);
  

  
//NECK
  fill('#fff2cc ')
  noStroke()
  rect(200,250,20,40)
  rectMode(CENTER);
  
//EAR
  fill('#fff2cc ')
  noStroke()
  arc(155,198,28,28,0,11*PI/8)
  arc(245,198,28,28,13*PI/8,PI/2)
  
  fill('#0746fe')
  stroke('#CCFF99')
  strokeWeight(4)
  ellipse(250,220,15,30)
  fill('#0746fe')
  stroke('#CCFF99')
  strokeWeight(4)
  ellipse(150,220,15,30)
  
  
//FACE SHAPE
  fill('#fff2cc ')
  noStroke()
  arc(200,185,105,120,0,PI);
  
  
//BODY
  fill('#CCFFCC ')
  ellipse(200,400,100,280)
  fill('#FF6666')
  beginShape();
  vertex(200, 320);
  vertex(180, 340);
  vertex(200,360);
  vertex(220,340);
  endShape()
  arc(191,331,28,28,3*PI/4,7*PI/4)
  arc(209,331,28,28,5*PI/4,PI/4)
  
  
//EYES
  fill('#333333')
  noStroke()
  ellipse(180,190,17,25)
  ellipse(220,190,17,25)
  fill('#ffffff')
  circle(182,186,9)
  circle(222,186,9)
  
//NOSE
  stroke('#0746fe')
  strokeWeight(3)
  line(200,200,196,207)
  line(196,207,200,210)
  
//MOUSE
  fill('#FF6666')
  noStroke()
  stroke('#0746fe')
  strokeWeight(3)
  arc(210,220,35,35,15*PI/8,7*PI/8)
  line(194,225,225,212)
  arc(210,220,35,35,15*PI/8,7*PI/8)
  fill('#ffffff')
  stroke('#0746fe')
  strokeWeight(2)
  beginShape();
  vertex(221, 215);
  vertex(220,225);
  vertex(208,230);
  vertex(198,225)
  endShape()
 

//NECKLACE
 noFill()
 stroke('#0746fe')
 strokeWeight(3)
 arc(200,250,30,70,0,PI);
 fill('#FFFF00')
 stroke('#0746fe')
 strokeWeight(2)
 circle(200,296,20)
 fill('#CCFFCC ')
 circle(200,296,8)
  
  
//PUPPY EARS
  fill('#FF9900')
  noStroke()
  ellipse(40,350,40,200)
  ellipse(80,350,40,200)
  fill('#663300')
  noStroke()
  ellipse(40,350,20,150)
  ellipse(80,350,20,150)
  

//PUPPY BODY
  fill('#FFFFFF ')
  noStroke()
  circle(60,340,80)
  rect(60,380,80,80)
  fill('#FF9900')
  circle(43,328,40)
  
//PUPPY NOSE 
  fill('#333333')
  noStroke()
  ellipse(60,360,35,20)
  circle(45,330,20)

  
//PUPPY EYES 
  fill('#FFFFFF ')
  stroke('#333333')
  strokeWeight(2)
  circle(45,330,20)
  fill('#333333')
  circle(47,332,15)
  fill('#FFFFFF ')
  circle(45,330,8)
  
  fill('#FFFFFF ')
  stroke('#333333')
  strokeWeight(2)
  circle(75,330,20)
  fill('#333333')
  circle(73,332,15)
  fill('#FFFFFF ')
  circle(72,330,8)
  
//PUPPY MOUTH
  fill('#FF6666')
  noStroke()
  ellipse(50,388,15,25)
  fill('#FFFFFF ')
  stroke('#333333')
  strokeWeight(3)
  arc(55,375,25,20,PI/4,PI);
  strokeWeight(2)
  
//PUPPY PAW
  fill('#FFFFFF ')
  noStroke()
  circle(120,370,23)
  rect(120,410,23,80)
  fill('#FF6666')
  noStroke()
  ellipse(120,378,19,15)
  circle(120,365,8)
  circle(113,368,6)
  circle(127,368,6)
  
  
  
}
