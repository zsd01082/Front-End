var Square = function() {
    var o = {
        x: 325,
        y: 325,
        direction: 0,
    }

    o.actions = function(command) {
        var action = {
            go: o.go,
            tunLef: o.tunLef,
            tunRig: o.tunRig,
            tunBac: o.tunBac,
            traLef: o.traLef,
            traTop: o.traTop,
            traRig: o.traRig,
            traBot: o.traBot,
            movLef: o.movLef,
            movTop: o.movTop,
            movRig: o.movRig,
            movBot: o.movBot,
        }
        action[command]()
    }

    o.go = function() {
        var reg = o.direction
        switch (reg) {
            case 0:
                o.traTop()
                break
            case 90:
                o.traRig()
                break
            case 180:
                o.traBot()
                break
            case 270:
                o.traLef()
                break
        }
    }

    o.tunLef = function() {
        if (o.animating == true) return false

        var i = 0
        o.animating = true

        o.timer = setInterval((function() {
            var reg = o.direction
            reg--
            i++
            if (reg < 0) {
                reg += 360
            }
            o.direction = reg
            if (i == 90) {
                clearInterval(o.timer)
                o.animating = false
            }
            log(o.timer)
        }), 1000 / 120)
    }

    o.tunRig = function() {
        if (o.animating == true) return false

        var i = 0
        o.animating = true

        o.timer = setInterval((function() {
            var reg = o.direction
            reg++
            i++
            if (reg >= 360) {
                reg -= 360
            }
            o.direction = reg
            if (i == 90) {
                clearInterval(o.timer)
                o.animating = false
            }
            log(o.timer)
        }), 1000 / 120)
    }

    o.tunBac = function() {
        if (o.animating == true) return false

        var i = 0
        o.animating = true

        o.timer = setInterval((function() {
            var reg = o.direction
            reg++
            i++
            if (reg >= 360) {
                reg -= 360
            }
            o.direction = reg
            if (i == 180) {
                clearInterval(o.timer)
                o.animating = false
            }
            log(o.timer)
        }), 1000 / 120)
    }

    o.traLef = function() {
        if (o.animating == true) return false
        if (o.x <= 75) return false

        var i = 0
        o.animating = true

        o.timer = setInterval((function() {
            o.x--
                i++
                if (i == 50) {
                    clearInterval(o.timer)
                    o.animating = false
                }
        }), 1000 / 120)
    }

    o.traTop = function() {
        if (o.animating == true) return false
        if (o.y <= 75) return false

        var i = 0
        o.animating = true

        o.timer = setInterval((function() {
            o.y--
                i++
                if (i == 50) {
                    clearInterval(o.timer)
                    o.animating = false
                }
        }), 1000 / 120)
    }

    o.traRig = function() {
        if (o.animating == true) return false
        if (o.x >= 525) return false

        var i = 0
        o.animating = true

        o.timer = setInterval((function() {
            o.x++
                i++
                if (i == 50) {
                    clearInterval(o.timer)
                    o.animating = false
                }
        }), 1000 / 120)
    }

    o.traBot = function() {
        if (o.animating == true) return false
        if (o.y >= 525) return false

        var i = 0
        o.animating = true

        o.timer = setInterval((function() {
            o.y++
                i++
                if (i == 50) {
                    clearInterval(o.timer)
                    o.animating = false
                }
        }), 1000 / 120)
    }

    o.traTop = function() {
        if (o.animating == true) return false
        if (o.y <= 75) return false

        var i = 0
        o.animating = true

        o.timer = setInterval((function() {
            o.y--
                i++
                if (i == 50) {
                    clearInterval(o.timer)
                    o.animating = false
                }
        }), 1000 / 120)
    }

    o.movLef = function() {
        if (o.animating == true) return false

        var reg = o.direction
        if (reg == 270) {
            o.traLef()
            return
        }

        o.animating = true
        if (reg < 90 || reg > 270) {
            var dir = -1
        } else {
            var dir = 1
        }
        o.timer = setInterval((function() {
            reg += dir
            if (reg < 0) {
                reg += 360
            }
            o.direction = reg
            if (reg == 270) {
                clearInterval(o.timer)
                o.animating = false
                o.traLef()
            }
        }), 1000 / 120)
    }

    o.movTop = function() {
        if (o.animating == true) return false

        var reg = o.direction
        if (reg == 0) {
            o.traTop()
            return
        }

        o.animating = true
        if (reg < 180) {
            var dir = -1
        } else {
            var dir = 1
        }
        o.timer = setInterval((function() {
            reg += dir
            if (reg >= 360) {
                reg -= 360
            }
            o.direction = reg
            if (reg == 0) {
                clearInterval(o.timer)
                o.animating = false
                o.traTop()
            }
        }), 1000 / 120)
    }

    o.movRig = function() {
        if (o.animating == true) return false

        var reg = o.direction
        if (reg == 90) {
            o.traRig()
            return
        }

        o.animating = true
        if (reg < 270 && reg > 90) {
            var dir = -1
        } else {
            var dir = 1
        }
        o.timer = setInterval((function() {
            reg += dir
            if (reg >= 360) {
                reg -= 360
            }
            o.direction = reg
            if (reg == 90) {
                clearInterval(o.timer)
                o.animating = false
                o.traRig()
            }
        }), 1000 / 120)
    }

    o.movBot = function() {
        if (o.animating == true) return false

        var reg = o.direction
        if (reg == 180) {
            o.traBot()
            return
        }

        o.animating = true
        if (reg > 180) {
            var dir = -1
        } else {
            var dir = 1
        }
        o.timer = setInterval((function() {
            reg += dir
            o.direction = reg
            if (reg == 180) {
                clearInterval(o.timer)
                o.animating = false
                o.traBot()
            }
        }), 1000 / 120)
    }

    return o
}