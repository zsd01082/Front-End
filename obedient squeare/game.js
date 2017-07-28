var Game = function() {
    var g = {}

    var canvas = document.getElementById("id-canvas")
    var ctx = canvas.getContext("2d")

    g.square = new Square

    g.drawSquare = function() {
        var o = g.square
        var dir = o.direction * Math.PI / 180

        //旋转原点
        var x = o.x * 50 + 25
        var y = o.y * 50 + 25
        ctx.translate(x, y)
        ctx.rotate(dir)
        ctx.fillStyle = "red"
        ctx.fillRect(-24, -24, 48, 48)
        ctx.fillStyle = "blue"
        ctx.fillRect(-24, -24, 48, 8)
        ctx.rotate(-dir)
        ctx.translate(-x, -y)
    }

    var runButton = document.getElementById("id-run")
    runButton.onclick = function() {
        g.clear()
        var command = document.getElementById("id-command").value
        g.square.actions(command)
        g.drawSquare()
    }

    g.clear = function() {
        var o = g.square
        var dir = o.direction * Math.PI / 180

        //旋转原点
        var x = o.x * 50 + 25
        var y = o.y * 50 + 25
        ctx.translate(x, y)
        ctx.rotate(dir)
        ctx.clearRect(-24, -24, 48, 48)
        ctx.rotate(-dir)
        ctx.translate(-x, -y)
    }

    return g
}