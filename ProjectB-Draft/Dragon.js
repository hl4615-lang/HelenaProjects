
// 鼠标：手动拖头（自动关闭时）
// 空格：开/关自动舞步   A/D：调自动速度
// H：高亮龙头   L：开/关舞者灯笼   C：开/关彩纸   R：重置

let stage, dragon, confetti;

function setup() {
    let c = createCanvas(900, 540);
    c.parent("p5-canvas-container");

    colorMode(HSB, 100, 100, 100, 100);
    rectMode(CENTER);

    // Stage (center point + width and height + rounded corners
    stage = new Stage(width / 2, height / 2, 740, 420, 24);
    // Dragon (number of segments, segment spacing, stage)
    dragon = new Dragon(120, 8);
    // 彩纸粒子系统（数量、舞台：仅用于初始分布）
    confetti = new ConfettiSystem(160);
}

function draw() {
    background(14);
    stage.draw(); // 画舞台

    // 选择“目标点”并让龙头跟随一次（每帧一次）
    if (dragon.autoDance) {
        dragon.autoTarget(); // 计算自动目标 & 内部完成边界夹紧
        dragon.follow(dragon.autoTargetX, dragon.autoTargetY); // 跟随自动目标
    } else {
        // 手动模式：用鼠标，分别用舞台的 clampX/Y 夹紧
        dragon.follow(stage.clampX(mouseX), stage.clampY(mouseY));
    }

    confetti.draw(); // 画彩纸
    dragon.draw();   // 画龙（身体/头/表演者）

    drawHUD(dragon); // 左上角说明
}


//prompt
function drawHUD(dragon) {
    fill(0, 0, 100); noStroke(); textSize(14); textAlign(LEFT, TOP);
    text(
        "舞龙 — 空格:自动/手控  A/D:速度   L:舞者  C:彩纸  R:重置", 24, 16);
}

function keyPressed() {
    if (key === ' ') { dragon.autoDance = !dragon.autoDance }      // 开关自动
    if (key === 'L' || key === 'l') { dragon.showPeople = !dragon.showPeople }// 人
    if (key === 'C' || key === 'c') { confetti.enabled = !confetti.enabled }         // 彩纸
    if (key === 'A' || key === 'a') { dragon.tSpeed = max(0.005, dragon.tSpeed - 0.005) }; // 自动速度慢一点
    if (key === 'D' || key === 'd') { dragon.tSpeed = min(0.06, dragon.tSpeed + 0.005) } // 自动速度快一点
    if (key === 'R' || key === 'r') { // 重置龙和彩纸
        dragon.reset();
        confetti.reset();
    }
}

class Dragon {
    constructor(N, segLen) {
        this.stage = stage;         // 引用舞台用于边界与居中

        //body
        this.N = N;                 // 身体段数
        this.segLen = segLen;       // 相邻两段的固定间距
        this.x = [];                // 每段的 x
        this.y = [];                // 每段的 y

        //target
        this.t = 0;                 // 自动运动的时间参数
        this.tSpeed = 0.02;         // 自动运动的速度
        this.autoTargetX = 0;       // 自动目标 x（缓存）
        this.autoTargetY = 0;       // 自动目标 y（缓存）


        //方向
        this.a = [];


        this.blinkTimer = 0
        this.autoDance = true;      // 是否自动舞动
        this.showPeople = true;   // 是否显示舞者灯笼

        this.reset();               // 初始化位置
    }



    follow(targetX, targetY) {
        //Let Section 0 (the dragon head) approach the target (mouseX,Y)
        this.x[0] = lerp(this.x[0], targetX, 0.18);
        this.y[0] = lerp(this.y[0], targetY, 0.18);


        // 后续各段：沿着上一段的方向，回退固定的 segLen 距离
        for (let i = 1; i < this.N; i++) {
            const dx = this.x[i - 1] - this.x[i]
            const dy = this.y[i - 1] - this.y[i]
            let d = sqrt(dx * dx + dy * dy);
            if (d < 0.1) { d = 1 }
            const tx = dx / d, ty = dy / d;    // 切向量 (cos, sin)
            this.x[i] = this.x[i - 1] - tx * this.segLen;
            this.y[i] = this.y[i - 1] - ty * this.segLen;

            //更新 aX[i], aY[i]
            this.a[i] = atan2(dy, dx);
        }

        // 龙头朝向对齐第 1 段
        const dx0 = this.x[1] - this.x[0];
        const dy0 = this.y[1] - this.y[0];

        this.a[0] = atan2(dy0, dx0);
    }


    // 生成自动目标，并把结果存到 this.autoTargetX/Y（内部已做边界夹紧）
    autoTarget() {
        this.t += this.tSpeed;                 // 时间推进（控制正弦和噪声）
        const cx = this.stage.cx;              // 舞台中心 x
        const cy = this.stage.cy;              // 舞台中心 y
        const rx = this.stage.w * 0.38;        // 自动运动在 x 的幅度
        const ry = this.stage.h * 0.35;        // 自动运动在 y 的幅度

        // 目标点（正弦轨迹 + 少量噪声抖动）
        let tx = cx + rx * sin(2.1 * this.t) + 24 * (noise(this.t));
        let ty = cy + ry * sin(3.0 * this.t + PI / 3) + 18 * (noise(100 + this.t));

        // 边界夹紧（四周各留 10px）
        this.autoTargetX = this.stage.clampX(tx);
        this.autoTargetY = this.stage.clampY(ty);

    }

    reset() {
        // 把整条龙初始化为舞台左侧的一条水平直线
        for (let i = 0; i < this.N; i++) {
            this.x[i] = this.stage.cx - this.stage.w * 0.2 - i * this.segLen;
            this.y[i] = this.stage.cy;
            this.a[i] = this.a[0]
        }
        // 初始自动目标 = 龙头位置
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
            const tx = dx / d, ty = dy / d;    // 切向量 (cos, sin)
            const nx = -ty, ny = tx;          // 法向量 (-sin, cos)

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
        //head towards angle a
        rotate(this.a[0]);

        // ====== 头骨与上颚 ======
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


        //龙角horn
        //long
        noFill()
        stroke(13, 100, 100, 90);
        strokeWeight(4);
        bezier(26, -4, 46, -12, 74, -22, 100 + 7 * sin(frameCount * 0.20), -28);
        bezier(26, 4, 46, 12, 74, 22, 100 + 7 * sin(frameCount * 0.20 + 1.2), 28);

        //short
        stroke(13, 70, 100, 80);
        strokeWeight(2);
        bezier(22, -2, 40, -10, 64, -18, 90 + 9 * sin(frameCount * 0.23), -18);
        // 左下副须
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

        // 画 10 片尾羽：长度随时间呼吸 + 轻微摆动
        for (let i = 0; i < 15; i++) {
            // 长度呼吸与分片相位
            const len = 18 + 10 * sin((i / 9) * PI + frameCount * 0.05);

            push();
            // 从根部向后排布（x 正方向是“身后”）
            translate(6 + i * 5, 0);
            // 轻微摆动（每片加一点相位差）
            rotate(0.2 * sin(frameCount * 0.03 + i));
            fill(map(i, 0, 9, 8, 18), 85, 100, 85);
            // 小羽片（圆角矩形，竖向延展）
            rect(0, 0, 6, len, 3);
            pop();
        }

        pop();
    }


    // 画舞者与灯笼（隔段布置）
    drawPerformers() {
        for (let i = 10; i < this.N; i += 20) {
            const px = this.x[i], py = this.y[i]
            // 人影
            push();
            translate(px, py);
            rotate(this.a[i] + PI / 2);
            noStroke(); fill(0, 0, 10, 85);
            ellipse(0, 14, 10, 16);
            rect(0, 28, 6, 16, 3);
            rect(0, 30, 18, 3);
            pop();

            // 竿
            push();
            translate(px, py);
            rotate(this.a[i] + PI / 2);
            stroke(35, 60, 50); strokeWeight(3);
            line(0, 0, 0, -26);
            pop();

            // 灯笼
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
        this.stage = stage;   // 仅用于开场分布参考，可全画布随机
        this.count = count;   // 粒子数量
        this.enabled = true;  // 是否启用
        this.p = [];          // 粒子数组
        this.reset();         // 生成初始粒子
    }

    reset() {
        this.p = [];
        for (let i = 0; i < this.count; i++) {
            this.p.push({
                x: random(0, width),               // 全画布随机
                y: random(0, height),
                vx: random(-0.5, 0.5),             // 轻微水平漂移
                vy: random(0.3, 1.4),              // 缓慢下落
                c: color(random(0, 100), 85, 100), // 随机彩色
                r: random(2, 4)                    // 小方片
            });
        }
    }

    draw() {
        if (this.enabled) {
            for (let i = 0; i < this.p.length; i++) {
                const q = this.p[i];
                fill(q.c);
                noStroke();
                rect(q.x, q.y, q.r, q.r); // 画小方片
                q.x += q.vx;
                q.y += q.vy;              // 速度积分
                if (q.y > height) {       // 出底后从顶端重新掉落
                    q.y = -10;
                    q.x = random(0, width);
                }
            }
        }
    }
}


class Stage {
    // cx, cy 为中心点；w,h 宽高；r 圆角
    constructor(cx, cy, w, h, r) {
        this.cx = cx; this.cy = cy; this.w = w; this.h = h; this.r = r;
    }

    draw() {
        // 幕布（居中矩形）
        noStroke();
        fill(13, 30, 98);
        rect(this.cx, this.cy, this.w, this.h, this.r);

        // 暖色光斑（由大到小叠加椭圆，营造舞台灯光）
        for (let D = 740; D > 0; D -= 20) {
            const bri = map(D, 0, 740, 100, 40);
            fill(13, 25, bri, 9);
            ellipse(this.cx, this.cy, D * 1.1, D * 0.85);
        }

        // 外边框
        noFill(); stroke(13, 40, 30); strokeWeight(6);
        rect(this.cx, this.cy, this.w, this.h, this.r);
    }

    // 将任意 x 夹在舞台内（四周各留 10px）
    clampX(x) {
        const minX = this.cx - this.w / 2 + 10;
        const maxX = this.cx + this.w / 2 - 10;
        if (x < minX) x = minX;
        else if (x > maxX) x = maxX;
        return x;
    }

    // 将任意 y 夹在舞台内（四周各留 10px）
    clampY(y) {
        const minY = this.cy - this.h / 2 + 10;
        const maxY = this.cy + this.h / 2 - 10;
        if (y < minY) y = minY;
        else if (y > maxY) y = maxY;
        return y;
    }
}

