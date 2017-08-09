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
                var cmd = self.cmds[0][0]
                if (cmd == "tun" || cmd == "tra" || cmd == "mov") {
                    var dir = self.cmds[0][1]
                    var times = self.cmds[0][2] || 1
                    self[cmd](dir, times)
                } else if (cmd == "mov to") {
                    var des = self.cmds[0][1]
                    self[cmd](dir)
                } else if (cmd == "go") {
                    var times = self.cmds[0][1] || 1
                    self[cmd](times)
                }
                self.currCmdNum += 1
                self.game.textarea.numColor(self.currCmdNum, "yellow")
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
        this.cmds = cmds
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

    //重复代码过多，应抽象简化
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
        } else {
            return false
        }

        var self = this
        this.rotate(targetReg, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
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
        } else {
            return false
        }

        var self = this
        this.move(targetX, targetY, function() {
            self.game.textarea.numColor(self.currCmdNum, "green")
        })
    }

    mov(dir, times) {
        this.animating = true

        var targetReg
        if (dir == "lef") {
            if (this.reg < 90) {
                targetReg = -90
            } else {
                targetReg = 270
            }
        } else if (dir == "top") {
            if (this.reg < 180) {
                targetReg = 0
            } else {
                targetReg = 360
            }
        } else if (dir == "rig") {
            if (this.reg < 270) {
                targetReg = 90
            } else {
                targetReg = 450
            }
        } else if (dir == "bot") {
            targetReg = 180
        } else {
            return false
        }

        var self = this
        this.rotate(targetReg, function() {
            self.tra(dir, times)
        })
    }
}