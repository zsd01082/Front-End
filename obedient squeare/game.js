var Game = function() {
    var g = {}

    var canvas = document.getElementById("id-canvas")
    var ctx = canvas.getContext("2d")

    g.square = new Square

    g.map = new Map()

    g.draw = function() {
        g.map.drawCoordinate()
        g.map.drawGrid()

        var o = g.square
        var dir = o.direction * Math.PI / 180

        //旋转原点
        var x = o.x
        var y = o.y
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
        var command = document.getElementById("id-command").value
        g.square.actions(command)
    }

    g.clear = function() {
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight)
    }

    setInterval((function() {
        g.clear()
        g.draw()
    }), 10)

    return g
}