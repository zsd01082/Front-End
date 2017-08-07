class Player extends Square {
    constructor(x, y, game) {
        super(x, y, game)
        this.ctx = game.sence.ctx
        this.setup()
    }

    setup() {
        this.reg = 0
        this.animating = false
        this.cmds = []
        var self = this
        setInterval((function() {
            //当方块没有任务正在进行且有新任务时，运行新任务
            if ((!self.animating) && self.cmds.length != 0) {
                var cmd = Object.keys(self.cmds[0])[0]
                var times = self.cmds[0][cmd]
                self[cmd](times)
                self.cmds.shift()
                if (self.cmds.length == 0) {
                    setTimeout((self.game.haveCmds = false), 1000)
                }
            }
        }), 10)
    }

    draw() {
        var reg = this.reg * Math.PI / 180

        var x = this.x * 50 + 25
        var y = this.y * 50 + 25

        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.rotate(reg)
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(-24, -24, 48, 48)
        this.ctx.fillStyle = "#acacac"
        this.ctx.fillRect(-24, -24, 48, 8)
        this.ctx.restore()
    }

    rotate(targetReg) {
        var reg = this.reg
        var self = this
        requestAnimationFrame(function timer() {
            reg += (targetReg - reg) / 10
            self.reg = reg
            if (!approx(reg, targetReg, 1)) {
                requestAnimationFrame(timer)
            } else {
                self.animating = false
                self.reg = (targetReg > 0) ? targetReg % 360 : (targetReg + 360) % 360
                log(self.reg)
            }
        })
    }

    move(targetX, targetY) {
        var x = this.x
        var y = this.y
        var self = this
        requestAnimationFrame(function timer() {
            x += ((targetX - x) / 10)
            y += ((targetY - y) / 10)
            self.x = x
            self.y = y
            if (!approx(x, targetX, 0.01) || !approx(y, targetY, 0.01)) {
                requestAnimationFrame(timer)
            } else {
                self.animating = false
                self.x = targetX
                self.y = targetY
                log(self.x, self.y)
            }
        })
    }

    recivecmds(cmds) {
        this.game.haveCmds = true
        this.cmds = this.cmds.concat(cmds)
    }

    go(times) {
        var reg = this.reg
        if (reg === 0) {
            this.traTop(times)
        } else if (reg === 90) {
            this.traRig(times)
        } else if (reg === 180) {
            this.traBot(times)
        } else if (reg === 270) {
            this.traLef(times)
        }
    }

    tunLef(times) {
        if (this.animating == true) return false

        this.animating = true

        var reg = this.reg
        var targetReg = reg - 90 * times
        this.rotate(targetReg)
    }

    tunRig(times) {
        if (this.animating == true) return false

        this.animating = true

        var reg = this.reg
        var targetReg = reg + 90 * times
        this.rotate(targetReg)
    }

    tunBac(times) {
        if (this.animating == true) return false

        this.animating = true

        var reg = this.reg
        var targetReg = reg + 180 * times
        this.rotate(targetReg)
    }

    traLef(times) {
        if (this.animating == true) return false
        if (this.x <= 1) return false

        this.animating = true

        var x = this.x
        var targetX = (x - 1 * times) >= 1 ? (x - 1 * times) : 1
        this.move(targetX, this.y)
    }

    traTop(times) {
        if (this.animating == true) return false
        if (this.y <= 1) return false

        this.animating = true

        var y = this.y
        var targetY = (y - 1 * times) >= 1 ? (y - 1 * times) : 1
        this.move(this.x, targetY)
    }

    traRig(times) {
        if (this.animating == true) return false
        if (this.x >= 10) return false

        this.animating = true

        var x = this.x
        var targetX = (x + 1 * times) <= 10 ? (x + 1 * times) : 10
        this.move(targetX, this.y)
    }

    traBot(times) {
        if (this.animating == true) return false
        if (this.y >= 10) return false

        this.animating = true

        var y = this.y
        var targetY = (y + 1 * times) <= 10 ? (y + 1 * times) : 10
        this.move(this.x, targetY)
    }

    movLef(times) {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 270) {
            this.traLef(times)
            return
        }

        this.animating = true
        if (reg < 90 || reg > 270) {
            var dir = -1
        } else {
            var dir = 1
        }

        var self = this
        requestAnimationFrame(function timer() {
            reg += dir
            if (reg < 0) {
                reg += 360
            }
            self.direction = reg
            if (reg == 270) {
                self.animating = false
                self.traLef(times)
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    movTop(times) {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 0) {
            this.traTop(times)
            return
        }

        this.animating = true
        if (reg < 180) {
            var dir = -1
        } else {
            var dir = 1
        }

        var self = this
        requestAnimationFrame(function timer() {
            reg += dir
            if (reg >= 360) {
                reg -= 360
            }
            self.direction = reg
            if (reg == 0) {
                self.animating = false
                self.traTop(times)
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    movRig(times) {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 90) {
            this.traRig(times)
            return
        }

        this.animating = true
        if (reg < 270 && reg > 90) {
            var dir = -1
        } else {
            var dir = 1
        }

        var self = this
        requestAnimationFrame(function timer() {
            reg += dir
            if (reg >= 360) {
                reg -= 360
            }
            self.direction = reg
            if (reg == 90) {
                self.animating = false
                self.traRig(times)
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    movBot(times) {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 180) {
            this.traBot(times)
            return
        }

        this.animation()
        if (reg > 180) {
            var dir = -1
        } else {
            var dir = 1
        }

        var self = this
        requestAnimationFrame(function timer() {
            reg += dir
            self.direction = reg
            if (reg == 180) {
                self.animating = false
                self.traBot(times)
            } else {
                requestAnimationFrame(timer)
            }
        })
    }
}