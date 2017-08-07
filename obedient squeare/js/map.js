class Map {
    constructor(game) {
        this.rows = 10;
        this.cols = 10;
        this.ctx = game.sence.ctx;
    }

    drawGrid() {
        var ctx = this.ctx
        ctx.fillStyle = "black"
        for (var i = 1; i <= this.rows + 1; i++) {
            ctx.beginPath()
            ctx.moveTo(50, i * 50)
            ctx.lineTo(550, i * 50)
            ctx.stroke()
        }

        for (var i = 1; i <= this.cols + 1; i++) {
            ctx.beginPath()
            ctx.moveTo(i * 50, 50)
            ctx.lineTo(i * 50, 550)
            ctx.stroke()
        }
    }

    drawCoordinate() {
        var ctx = this.ctx
        ctx.fillStyle = "black"
        for (var i = 1; i <= this.rows; i++) {
            ctx.fillText(i, i * 50 + 20, 25)
        }

        for (var i = 1; i <= this.cols; i++) {
            ctx.fillText(i, 25, i * 50 + 30)
        }
    }

    draw() {
        this.drawCoordinate()
        this.drawGrid()
    }
}