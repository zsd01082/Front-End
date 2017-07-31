var Map = function() {
    var m = {
        rows: 10,
        cols: 10,
    }

    var canvas = document.getElementById("id-canvas")
    var ctx = canvas.getContext("2d")


    m.drawGrid = function() {
        ctx.fillStyle = "black"
        for (var i = 1; i <= m.rows + 1; i++) {
            ctx.beginPath()
            ctx.moveTo(50, i * 50)
            ctx.lineTo(550, i * 50)
            ctx.stroke()
        }

        for (var i = 1; i <= m.cols + 1; i++) {
            ctx.beginPath()
            ctx.moveTo(i * 50, 50)
            ctx.lineTo(i * 50, 550)
            ctx.stroke()
        }

    }

    m.drawCoordinate = function() {
        ctx.fillStyle = "black"
        for (var i = 1; i <= m.rows; i++) {
            ctx.fillText(i, i * 50 + 20, 25)
        }

        for (var i = 1; i <= m.cols; i++) {
            ctx.fillText(i, 25, i * 50 + 30)
        }
    }

    return m
}