// Space: On/off Auto dance/Mouse control
// A/D: lower/higher auto speed
//L: On/off the dancer & lantern 
//C: On/off the colorful particles 
// R: Reset

let stage, dragon, confetti;

function setup() {
    let c = createCanvas(900, 540);
    c.parent("p5-canvas-container");

    colorMode(HSB, 100, 100, 100, 100);
    rectMode(CENTER);

    // Stage (center point XY, width and height, rounded corners)
    stage = new Stage(width / 2, height / 2, 740, 420, 24);
    // Dragon (number of segments, segment spacing)
    dragon = new Dragon(120, 8);
    //Colorful particles (Quantity)
    confetti = new ConfettiSystem(160);
}

function draw() {
    background(14);


    stage.draw(); // draw the stage
    confetti.draw();
    dragon.draw();   //draw the dragon(body+head+tail+people and latterns)
    drawHUD();

    // Auto target/mouse control dance
    if (dragon.autoDance) {
        dragon.autoTarget();//set the target
        dragon.follow(dragon.autoTargetX, dragon.autoTargetY);//make the dragon follow the auto target
    } else {
        dragon.follow(stage.clampX(mouseX), stage.clampY(mouseY)); //manual mouse mode, clamp within the stage
    }
}




class Stage {
    //centerX, centerY, width, height,round coner
    constructor(cx, cy, w, h, r) {
        this.cx = cx;
        this.cy = cy;
        this.w = w;
        this.h = h;
        this.r = r;
    }

    draw() {
        noStroke();
        fill(13, 30, 98);
        rect(this.cx, this.cy, this.w, this.h, this.r);

        //ellipse light
        for (let d = 740; d > 0; d -= 20) {
            const bri = map(d, 0, 740, 100, 40);
            fill(13, 25, bri, 9);
            ellipse(this.cx, this.cy, d * 1.1, d * 0.85);
        }

        //edge of the stage
        noFill();
        stroke(13, 40, 30);
        strokeWeight(6);
        rect(this.cx, this.cy, this.w, this.h, this.r);
    }

    //constrain the movement inside the stage (10px to each side)
    clampX(x) {
        const minX = this.cx - this.w / 2 + 10;
        const maxX = this.cx + this.w / 2 - 10;
        return constrain(x, minX, maxX);
    }
    clampY(y) {
        const minY = this.cy - this.h / 2 + 10;
        const maxY = this.cy + this.h / 2 - 10;
        return constrain(y, minY, maxY);
    }
}

class Dragon {
    constructor(N, segLen) {
        this.stage = stage;

        //variables for body part
        this.N = N;                 // Number of body segments
        this.segLen = segLen;       // The space between two adjacent sections
        this.a = [];// rotation angle)
        this.x = [];                // x of each part
        this.y = [];                // y of each part
        this.blinkTimer = 0

        //variables for target
        this.t = 0;                 //time parameter for auto target
        this.tSpeed = 0.02;         // speed parameter
        this.autoTargetX = 0;
        this.autoTargetY = 0;


        this.autoDance = true;
        this.showPeople = true;
        this.reset();
    }



    // Generate an automatic target and store the result in this.autoTargetX/Y (with boundary clamped)
    autoTarget() {
        this.t += this.tSpeed;
        const cx = this.stage.cx;              // stage center x
        const cy = this.stage.cy;              // stage center y
        const rx = this.stage.w * 0.38;        // amplitude of x
        const ry = this.stage.h * 0.35;        // amplitude of y

        // Target point (sin trajectory + noise)
        let tx = cx + rx * sin(2.1 * this.t) + 24 * (noise(this.t));
        let ty = cy + ry * sin(3.0 * this.t + PI / 3) + 18 * (noise(100 + this.t));

        // Boundary clamping within stage (leaving 10px on each side)
        this.autoTargetX = this.stage.clampX(tx);
        this.autoTargetY = this.stage.clampY(ty);
    }


    follow(targetX, targetY) {
        //Let Section 0 (the dragon head) approach the target (mouseX,Y)
        this.x[0] = lerp(this.x[0], targetX, 0.18);
        this.y[0] = lerp(this.y[0], targetY, 0.18);

        //Align the first segment with the head 
        const dx0 = this.x[1] - this.x[0];
        const dy0 = this.y[1] - this.y[0];
        this.a[0] = atan2(dy0, dx0);

        // Subsequent segments: space a fixed segLen distance, along the direction of the previous section
        // 后续各段：沿着上一段的方向，space固定的 segLen 距离
        for (let i = 1; i < this.N; i++) {
            const dx = this.x[i - 1] - this.x[i]
            const dy = this.y[i - 1] - this.y[i]
            let d = sqrt(dx * dx + dy * dy);
            if (d < 0.1) { d = 1 }
            // 切向量 Tangent vector (cos, sin)
            const tx = dx / d
            const ty = dy / d;
            this.x[i] = this.x[i - 1] - tx * this.segLen;
            this.y[i] = this.y[i - 1] - ty * this.segLen;
            this.a[i] = atan2(dy, dx);
        }

    }

    reset() {
        // Initialize the entire dragon as a horizontal straight line on the left side of the stage
        for (let i = 0; i < this.N; i++) {
            this.x[i] = this.stage.cx - this.stage.w * 0.2 - i * this.segLen;
            this.y[i] = this.stage.cy;
            this.a[i] = 0
        }
        // Initial auto target = head position
        this.autoTargetX = this.x[0];
        this.autoTargetY = this.y[0];
        this.blinkTimer = 0;
    }


    // Draw the entire dragon (body + head + tail + dancer/lantern)
    draw() {
        this.drawBody();
        this.drawHead();
        this.drawTail();
        if (this.showPeople == true) { this.drawPerformers() }
    }


    //Draw the dragon's body (connected by sections of trapezoids)
    drawBody() {
        for (let i = this.N - 1; i >= 1; i--) {
            const hue = map(i, 0, this.N - 1, 3, 17);
            const sat = map(i, 0, this.N - 1, 80, 90);
            const bri = map(i, 0, this.N - 1, 95, 85);

            // connecting center point of two quad
            const x1 = this.x[i]
            const y1 = this.y[i];
            const x2 = this.x[i - 1]
            const y2 = this.y[i - 1];

            const dx = this.x[i - 1] - this.x[i]
            const dy = this.y[i - 1] - this.y[i]
            let d = sqrt(dx * dx + dy * dy);

            if (d < 0.1) { d = 1 }//avoid d being 0
            const tx = dx / d, ty = dy / d;
            // 切向量 tangent vector(cos, sin)
            const nx = -ty, ny = tx;
            // 法向量 tangent vector rotate 90 degrees (-sin, cos)

            const baseW = map(i, 0, this.N - 1, 24, 6);
            //width of quad
            const w = baseW * (1 + 0.2 * sin(i * 0.25 + frameCount * 0.05));


            //points for trapezoid
            noStroke();
            fill(hue, sat, bri, 100);
            quad(
                x1 + nx * w, y1 + ny * w,
                x1 - nx * w, y1 - ny * w,
                x2 - nx * w * 0.88, y2 - ny * w * 0.88,
                x2 + nx * w * 0.88, y2 + ny * w * 0.88
            );

            // Draw a triangle scale decoration every six sections
            if (i % 6 === 0) {
                fill(hue, sat - 15, bri + 20, 100);
                const Ax = x1 + nx * w
                const Ay = y1 + ny * w
                const Bx = x1 + nx * w * 2;
                const By = y1 + ny * w * 2;
                const Cx = x2 + tx * w;
                const Cy = y2 + ty * w;

                triangle(Ax, Ay, Bx, By, Cx, Cy);
            }
        }
    }

    drawHead() {
        push();
        translate(this.x[0], this.y[0]);
        rotate(this.a[0]);

        //head
        noStroke();
        fill(4, 95, 98);
        ellipse(-5, 0, 85, 60);

        //nose
        fill(14, 90, 95, 90);
        ellipse(-30, 3, 6, 3)
        ellipse(-30, -3, 6, 3)

        //blink
        this.blinkTimer = (this.blinkTimer + 1) % 110;//the frequency of blinking
        const blink = (this.blinkTimer < 30);
        //the real blinking time

        if (!blink) {
            fill(0, 0, 100);
            ellipse(8, -7, 20, 10);
            ellipse(8, 7, 20, 10);
            // pupil
            fill(0, 0, 10);
            ellipse(8, -7 + 1.5 * sin(frameCount * 0.07), 8, 8);
            ellipse(8, 7 + 1.5 * sin(frameCount * 0.07), 8, 8);

        } else {
            noFill()
            stroke(0, 0, 100)
            strokeWeight(3)
            arc(8, -7, 9, 9, -PI / 2, PI / 2);
            arc(8, 7, 9, 9, -PI / 2, PI / 2);

        }


        //long horn
        noFill()
        stroke(13, 100, 100, 90);
        strokeWeight(4);
        bezier(26, -4, 46, -12, 74, -22, 100 + 7 * sin(frameCount * 0.20), -28);
        bezier(26, 4, 46, 12, 74, 22, 100 + 7 * sin(frameCount * 0.20 + 1.2), 28);

        //short horn
        stroke(13, 70, 100, 80);
        strokeWeight(2);
        bezier(22, -2, 40, -10, 64, -18, 90 + 9 * sin(frameCount * 0.23), -18);
        bezier(22, 2, 40, 10, 64, 18, 90 + 9 * sin(frameCount * 0.23 + 1.2), 18);


        //circle ring on head
        noStroke();
        for (let i = 0; i < 14; i++) {
            const angle = i * TWO_PI / 14 + frameCount * 0.03;
            const R = 12 + 2 * sin(frameCount * 0.06);
            const x = 100 + R * cos(angle);
            const y = 0 + R * sin(angle);

            fill(14, 100, 100, 85);
            ellipse(x, y, 3.2, 3.2);
            fill(14, 90, 95, 30);
            ellipse(x, y, 7.5, 7.5);
        }

        pop();
    }


    drawTail() {
        const n = this.N - 1;
        push();
        translate(this.x[n], this.y[n]);
        rotate(this.a[n] + PI);

        //tail, made of many rotating bars, the length each varies over time
        for (let i = 0; i < 15; i++) {
            const len = 18 + 10 * sin((i / 9) * PI + frameCount * 0.05);
            push();
            translate(6 + i * 5, 0);
            rotate(0.2 * sin(frameCount * 0.03 + i));
            fill(map(i, 0, 9, 8, 18), 85, 100, 85);

            rect(0, 0, 6, len, 3);
            pop();
        }

        pop();
    }


    // Dancers and Lanterns
    drawPerformers() {
        for (let i = 10; i < this.N; i += 20) {
            const px = this.x[i], py = this.y[i]
            //people
            push();
            translate(px, py);
            rotate(this.a[i] + PI / 2);
            noStroke(); fill(0, 0, 10, 85);
            ellipse(0, 14, 10, 16);
            rect(0, 28, 6, 16, 3);
            rect(0, 30, 18, 3);
            pop();

            //stick
            push();
            translate(px, py);
            rotate(this.a[i] + PI / 2);
            stroke(35, 60, 50); strokeWeight(3);
            line(0, 0, 0, -26);
            pop();

            //lattern
            push();
            translate(px, py);
            rotate(this.a[i] + PI / 2);
            noStroke(); fill(3, 90, 95, 95);
            ellipse(0, -34, 18, 24);
            stroke(13, 90, 90);
            line(0, -22, 0, -16);
            pop();
        }
    }



}

class ConfettiSystem {
    constructor(count) {
        this.stage = stage;
        this.count = count;   //particle number
        this.enabled = true;
        this.p = [];
        this.reset();
    }

    reset() {
        this.p = [];
        for (let i = 0; i < this.count; i++) {
            let x = random(0, width);
            let y = random(0, height);
            let vx = random(-0.5, 0.5);//x movement
            let vy = random(0.3, 1.4);//y falling movement
            let c = color(random(0, 100), 85, 100);
            let r = random(2, 4);//size

            this.p.push([x, y, vx, vy, c, r]);
        }
    }
    draw() {
        if (this.enabled) {
            for (let i = 0; i < this.p.length; i++) {
                let q = this.p[i];
                let x = q[0];
                let y = q[1];
                let vx = q[2];
                let vy = q[3];
                let c = q[4];
                let r = q[5];

                fill(c);
                noStroke();
                rect(x, y, r, r);

                x += vx;
                y += vy;
                //After hitting the bottom, drops back from the top
                if (y > height) {
                    y = -10;
                    x = random(0, width);
                }

                //Insert the new values back into q[0], q[1]
                q[0] = x;
                q[1] = y;

            }
        }
    }

}

//Instruction
function drawHUD() {
    fill(0, 0, 100);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text(
        "Space: Auto/Mouse  A/D: Speed down/up  L: Dancers  C: Confetti  R: Reset", 100, 20);
}

function keyPressed() {
    if (key === ' ') { dragon.autoDance = !dragon.autoDance }
    if (key === 'L' || key === 'l') { dragon.showPeople = !dragon.showPeople }
    if (key === 'C' || key === 'c') { confetti.enabled = !confetti.enabled }
    if (key === 'A' || key === 'a') { dragon.tSpeed = max(0.005, dragon.tSpeed - 0.005) };
    if (key === 'D' || key === 'd') { dragon.tSpeed = min(0.06, dragon.tSpeed + 0.005) }
    if (key === 'R' || key === 'r') {
        dragon.reset();
        confetti.reset();
    }
}
