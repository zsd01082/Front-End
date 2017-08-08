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
        this.currCmdNum = -1
        var self = this
        setInterval((function() {
            //当方块没有任务正在进行且有新任务时，运行新任务
            if ((!self.animating) && self.cmds.length != 0) {
                var cmd = Object.keys(self.cmds[0])[0]
                var times = self.cmds[0][cmd]
                self.currCmdNum += 1
                self.game.textarea.numColor(self.currCmdNum, "yellow")
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

    rotate(targetReg, callback) {
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
                callback && callback()
            }
        })
    }

    move(targetX, targetY, callback) {
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
                callback && callback()
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

    //重复代码过多，因抽象简化
    tunLef(times) {
        if (this.animating == true) return false

        this.animating = true

        var reg = this.reg
        var targetReg = reg - 90 * times
        var self = this
        this.rotate(targetReg, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
        })
    }


    tunRig(times) {
        if (this.animating == true) return false

        this.animating = true

        var reg = this.reg
        var targetReg = reg + 90 * times
        var self = this
        this.rotate(targetReg, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
        })
    }

    tunBac(times) {
        if (this.animating == true) return false

        this.animating = true

        var reg = this.reg
        var targetReg = reg + 180 * times
        var self = this
        this.rotate(targetReg, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
        })
    }

    traLef(times) {
        if (this.animating == true) return false
        if (this.x <= 1) return false

        this.animating = true

        var x = this.x
        var targetX = (x - 1 * times) >= 1 ? (x - 1 * times) : 1
        var self = this
        this.move(targetX, this.y, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
        })
    }

    traTop(times) {
        if (this.animating == true) return false
        if (this.y <= 1) return false

        this.animating = true

        var y = this.y
        var targetY = (y - 1 * times) >= 1 ? (y - 1 * times) : 1
        var self = this
        this.move(this.x, targetY, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
        })
    }

    traRig(times) {
        if (this.animating == true) return false
        if (this.x >= 10) return false

        this.animating = true

        var x = this.x
        var targetX = (x + 1 * times) <= 10 ? (x + 1 * times) : 10
        var self = this
        this.move(targetX, this.y, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
        })
    }

    traBot(times) {
        if (this.animating == true) return false
        if (this.y >= 10) return false

        this.animating = true

        var y = this.y
        var targetY = (y + 1 * times) <= 10 ? (y + 1 * times) : 10
        var self = this
        this.move(this.x, targetY, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
        })
    }

    movLef(times) {
        if (this.animating == true) return false

        this.animating = true

        var self = this
        if (this.reg < 90) {
            this.rotate(-90, function() {
                self.traLef(times)
            })
        } else {
            this.rotate(270, function() {
                self.traLef(times)
            })
        }
    }

    movTop(times) {
        if (this.animating == true) return false

        this.animating = true

        var self = this
        if (this.reg < 180) {
            this.rotate(0, function() {
                self.traTop(times)
            })
        } else {
            this.rotate(360, function() {
                self.traTop(times)
            })
        }
    }

    movRig(times) {
        if (this.animating == true) return false

        this.animating = true

        var self = this
        if (this.reg > 270) {
            this.rotate(450, function() {
                self.traRig(times)
            })
        } else {
            this.rotate(90, function() {
                self.traRig(times)
            })
        }
    }

    movBot(times) {
        if (this.animating == true) return false

        this.animating = true

        var self = this
        this.rotate(180, function() {
            self.traBot(times)
        })
    }
}