class Player extends Square {
    constructor(x, y, game) {
        super(x, y, game)
        this.ctx = game.sence.ctx
        this.setup()
    }

    setup() {
        this.reg = 0
        this.cmds = []
        this.currCmdNum = 0

        Object.defineProperty(this, 'animating', {
            set: function(animating) {
                if (animating == false && this.cmds.length != 0) {
                    this.game.textarea.numColor(this.currCmdNum, "yellow")
                    this.run()
                }
            },

            get: function() {
                return this.animating
            }
        })
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

    recivecmds(cmds) {
        this.cmds = cmds
        this.animating = false
    }

    run() {
        var aCmd = this.cmds[0]
        var cmd = aCmd[0]
        if (cmd == "tun" || cmd == "tra" || cmd == "mov") {
            var dir = aCmd[1]
            var times = aCmd[2] || 1
            this[cmd](dir, times)
        } else if (cmd == "mov to") {
            var des = aCmd[1]
            this[cmd](dir)
        } else if (cmd == "go") {
            var times = aCmd[1] || 1
            this[cmd](times)
        }
        this.cmds.shift()
    }

    rotate(targetReg) {
        var self = this
        return new Promise(function(resolve, reject) {
            requestAnimationFrame(function timer() {
                if (!approx(self.reg, targetReg, 1)) {
                    self.reg += (targetReg - self.reg) / 10
                    requestAnimationFrame(timer)
                } else {
                    self.reg = (targetReg > 0) ? targetReg % 360 : (targetReg + 360) % 360
                    resolve()
                }
            })
        })
    }

    move(targetX, targetY) {
        var self = this
        return new Promise(function(resolve, reject) {
            requestAnimationFrame(function timer() {
                self.x += ((targetX - self.x) / 10)
                self.y += ((targetY - self.y) / 10)
                if (!approx(self.x, targetX, 0.01) || !approx(self.y, targetY, 0.01)) {
                    requestAnimationFrame(timer)
                } else {
                    self.x = targetX
                    self.y = targetY
                    resolve()
                }
            })
        })
    }

    go(times) {
        var reg = this.reg
        if (reg === 0) {
            this.tra("top", times)
        } else if (reg === 90) {
            this.tra("rig", times)
        } else if (reg === 180) {
            this.tra("bot", times)
        } else if (reg === 270) {
            this.tra("lef", times)
        }
    }

    tun(dir, times) {
        this.animating = true

        var reg = this.reg
        var targetReg = 0
        if (dir == "lef") {
            targetReg = reg - 90 * times
        } else if (dir == "rig") {
            targetReg = reg + 90 * times
        } else if (dir == "bac") {
            targetReg = reg + 180 * times
        }
        var self = this
        this.rotate(targetReg)
            .then(function() {
                self.game.textarea.numColor(self.currCmdNum, "green")
                self.currCmdNum += 1
                self.animating = false
            })
    }

    tra(dir, times) {
        this.animating = true

        var x = this.x,
            y = this.y,
            targetX,
            targetY
        if (dir == "lef") {
            targetX = (x - 1 * times) >= 1 ? (x - 1 * times) : 1
            targetY = y
        } else if (dir == "top") {
            targetX = x
            targetY = (y - 1 * times) >= 1 ? (y - 1 * times) : 1
        } else if (dir == "rig") {
            targetX = (x + 1 * times) <= 10 ? (x + 1 * times) : 10
            targetY = y
        } else if (dir == "bot") {
            targetX = x
            targetY = (y + 1 * times) <= 10 ? (y + 1 * times) : 10
        }

        var self = this
        this.move(targetX, targetY)
            .then(function() {
                self.game.textarea.numColor(self.currCmdNum, "green")
                self.currCmdNum += 1
                self.animating = false
            })
    }

    mov(dir, times) {
        this.animating = true

        var targetReg = null,
            x = this.x,
            y = this.y,
            targetX = this.x,
            targetY = this.y
        if (dir == "lef") {
            if (this.reg < 90) {
                targetReg = -90
            } else {
                targetReg = 270
            }
            targetX = (x - 1 * times) >= 1 ? (x - 1 * times) : 1
        } else if (dir == "top") {
            if (this.reg < 180) {
                targetReg = 0
            } else {
                targetReg = 360
            }
            targetY = (y - 1 * times) >= 1 ? (y - 1 * times) : 1
        } else if (dir == "rig") {
            if (this.reg < 270) {
                targetReg = 90
            } else {
                targetReg = 450
            }
            targetX = (x + 1 * times) <= 10 ? (x + 1 * times) : 10
        } else if (dir == "bot") {
            targetReg = 180
            targetY = (y + 1 * times) <= 10 ? (y + 1 * times) : 10
        }

        var self = this
        self.rotate(targetReg)
            .then(function() {
                return self.move(targetX, targetY)
            })
            .then(function() {
                self.game.textarea.numColor(self.currCmdNum, "green")
                self.currCmdNum += 1
                self.animating = false
            })

    }
}