
class Rain {
    constructor(x, y, h) {
        //for mousepressed
        this.x = x + random(-30, 30)
        this.y = y
        this.s = 5
        this.h = h
    } S

    display() {
        fill(this.h, 20, 100)
        noStroke()
        circle(this.x, this.y, this.s)

    }

    update() {
        this.y += 8
    }

    // isOut() {
    //   if (this.y > height + 5) {
    //     return true//outside canvas
    //   } else {
    //     return false//inside canvas
    //   }
    // }
}