class Sence {
    constructor(game) {
        var canvas = game.canvas
        this.ctx = canvas.getContext("2d")
        this.game = game
        var self = this
        requestAnimationFrame(function timer() {
            self.clear()
            self.draw()
            requestAnimationFrame(timer)
        })
    }


    draw() {
        var ctx = this.ctx
        this.game.map.draw()
        var walls = this.game.walls
        for (var i in this.game.walls) {
            walls[i] && walls[i].draw()
        }
        this.game.player.draw()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
    }

}