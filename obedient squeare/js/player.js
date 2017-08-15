class Player extends Square {
    constructor(x, y, game) {
        super(x, y, game)
        this.ctx = game.sence.ctx
        this.setup()
    }

    setup() {
        this.reg = 0
        this.cmds = []
        this.currCmdNum = -1

        Object.defineProperty(this, 'animating', {
            set: function(animating) {
                if (animating == false) {
                    this.game.textarea.numColor(this.currCmdNum, "green")
                    this.currCmdNum += 1
                    this.game.textarea.numColor(this.currCmdNum, "yellow")
                    if (this.cmds.length != 0) {
                        this.run()
                        this.animating = true
                    }
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
        this.ctx.fillStyle = "#020181"
        this.ctx.fillRect(-24, -24, 48, 8)
        this.ctx.restore()
    }

    run() {
        var aCmd = this.cmds.shift()
        if (!aCmd) return false
        var cmd = aCmd[0]
        var self = this
        if (cmd == "tun" || cmd == "tra" || cmd == "mov") {
            var dir = aCmd[1]
            var times = aCmd[2] || 1
            self[cmd](dir, times).then(function() {
                self.animating = false
            })
        } else if (cmd == "go") {
            var times = aCmd[1] || 1
            self[cmd](times).then(function() {
                self.animating = false
            })
        } else if (cmd == "move to") {
            var aim = aCmd[1]
            this.moveTo(aim)
        } else if (cmd == "build") {
            var o = self.faceTo()
            self.game.build(o)
            self.animating = false
        } else if (cmd == "bru") {
            var o = self.faceTo()
            var color = aCmd[1]
            self.game.bru(o, color)
            self.animating = false
        }

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

    faceTo() {
        var reg = this.reg,
            x = this.x,
            y = this.y,
            y
        if (reg === 0) {
            y--
        } else if (reg === 90) {
            x++
        } else if (reg === 180) {
            y++
        } else if (reg === 270) {
            x--
        }

        return { x: x, y: y }
    }

    go(times) {
        var reg = this.reg
        var dir = null
        if (reg === 0) {
            dir = "top"
        } else if (reg === 90) {
            dir = "rig"
        } else if (reg === 180) {
            dir = "bot"
        } else if (reg === 270) {
            dir = "lef"
        }
        var self = this
        return new Promise(function(resolve, reject) {
            self.tra(dir, times).then(resolve)
        })
    }

    tun(dir, times) {
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
        return new Promise(function(resolve, reject) {
            self.rotate(targetReg).then(resolve)
        })
    }

    tra(dir, times) {
        var x = this.x,
            y = this.y,
            targetX = x,
            targetY = y
        if (dir == "lef") {
            targetX = (x - 1 * times) >= 1 ? (x - 1 * times) : 1
        } else if (dir == "top") {
            targetY = (y - 1 * times) >= 1 ? (y - 1 * times) : 1
        } else if (dir == "rig") {
            targetX = (x + 1 * times) <= 10 ? (x + 1 * times) : 10
        } else if (dir == "bot") {
            targetY = (y + 1 * times) <= 10 ? (y + 1 * times) : 10
        }

        var self = this
        var self = this
        return new Promise(function(resolve, reject) {
            self.move(targetX, targetY).then(resolve)
        })
    }

    mov(dir, times) {
        var targetReg = null,
            x = this.x,
            y = this.y,
            targetX = x,
            targetY = y
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
        return new Promise(function(resolve, reject) {
            if (times == 0) {
                resolve()
                return false
            }
            self.rotate(targetReg)
                .then(function() {
                    return self.move(targetX, targetY)
                })
                .then(resolve)
        })
    }

    moveTo(aim) {
        let path = this.game.search(this, aim)
        let self = this
        let p = new Promise(function(resolve, reject) {
            resolve()
        })
        var run = "p"
        for (let i = 0; i < path.length; i++) {
            p = p.then(function() {
                return self.to(path[i])
            })
            if (i == path.length - 1) {
                p = p.then(function() {
                    self.animating = false
                })
            }
        }
    }

    to(aim) {
        log(aim)
        var x = aim.x - this.x
        var y = aim.y - this.y

        var dirX = (x > 0) ? "rig" : "lef"
        var dirY = (y > 0) ? "bot" : "top"

        x = Math.abs(x)
        y = Math.abs(y)

        var self = this
        return new Promise(function(resolve, reject) {
            self.mov(dirY, y)
                .then(function() {
                    return self.mov(dirX, x)
                })
                .then(resolve)
        })
    }
}