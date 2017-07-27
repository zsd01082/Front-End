var Game = function() {
    var g = {}

    var canvas = document.getElementById("id-canvas")
    var ctx = canvas.getContext("2d")

    g.square = new Square

    g.drawSquare = function() {
        var o = g.square

        ctx.beginPath()
        ctx.rect(o.x * 50 + 50, o.y * 50 + 50, 50, 50)
        ctx.fillStyle = "red"
        ctx.fill()

        ctx.beginPath()
        ctx.rect(o.x * 50 + 50, o.y * 50 + 50, 50, 10)
        ctx.fillStyle = "blue"
        ctx.fill()
    }

    return g
}