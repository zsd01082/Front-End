class Sence {
    constructor() {
        var canvas = document.getElementById("id-canvas")
        this.ctx = canvas.getContext("2d")

        this.game = new Game()


        var self = this
        requestAnimationFrame(function timer() {
            self.clear()
            self.draw()
            requestAnimationFrame(timer)
        })
    }


    draw() {
        this.game.map.drawCoordinate()
        this.game.map.drawGrid()

        var o = this.game.square
        var dir = o.direction * Math.PI / 180

        var x = o.x
        var y = o.y
        this.ctx.translate(x, y)
        this.ctx.rotate(dir)
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(-24, -24, 48, 48)
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(-24, -24, 48, 8)
        this.ctx.rotate(-dir)
        this.ctx.translate(-x, -y)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
    }

}