class Square {
    constructor(x, y, game) {
        this.game = game
        this.x = x
        this.y = y
        this.ctx = this.game.sence.ctx
    }

}

class Wall extends Square {
    constructor(x, y, game) {
        super(x, y, game)
        this.ctx = this.game.sence.ctx
        this.color = "#000"
    }

    draw() {
        var x = this.x * 50 + 25
        var y = this.y * 50 + 25

        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(-24, -24, 48, 48)
        this.ctx.restore()
    }
}