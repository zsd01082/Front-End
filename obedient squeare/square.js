var Square = function() {
    var o = {
        x: 6,
        y: 6,
        direction: 0,
    }

    o.actions = function(command) {
        var action = {
            go: o.go,
            left: o.left,
            right: o.right,
            back: o.back,
        }
        action[command]()
    }

    o.go = function() {
        var reg = o.direction

        if (reg == 0) {
            o.y--
        } else if (reg == 90) {
            o.x++
        } else if (reg == 180) {
            o.y++
        } else if (reg == 270) {
            o.x--
        }

        if (o.x < 1) o.x = 1
        if (o.x > 10) o.x = 10
        if (o.y < 1) o.y = 1
        if (o.y > 10) o.y = 10

    }

    o.left = function() {
        var reg = o.direction
        reg -= 90
        if (reg < 0) {
            reg += 360
        }
        o.direction = reg
    }

    o.right = function() {
        var reg = o.direction
        reg += 90
        if (reg >= 360) {
            reg -= 360
        }
        o.direction = reg
    }

    o.back = function() {
        var reg = o.direction
        reg += 180
        if (reg > 360) {
            reg -= 360
        }
        o.direction = reg
    }

    return o
}