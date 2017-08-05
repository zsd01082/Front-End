class Square {
    constructor(x, y, game) {
        this.game = game
        this.x = x
        this.y = y
        this.setup()
    }

    setup() {
        this.direction = 0
        this.animating = false
        this.cmds = []
        var self = this
        setInterval((function() {
            //当方块没有任务正在进行且有新任务时，运行新任务
            if ((!self.animating) && self.cmds.length != 0) {
                var cmd = self.cmds[0]
                self[cmd]()
                self.cmds.shift()
                if (self.cmds.length == 0) {
                    setTimeout((self.game.haveCmds = false), 1000)
                }
            }
        }), 10)
    }

    recivecmd(cmd) {
        this.game.haveCmds = true
        this.cmds.push(cmd)
    }

    go() {
        var reg = this.direction
        switch (reg) {
            case 0:
                this.traTop()
                break
            case 90:
                this.traRig()
                break
            case 180:
                this.traBot()
                break
            case 270:
                this.traLef()
                break
        }
    }

    tunLef() {
        if (this.animating == true) return false

        this.animating = true

        var i = 0
        var self = this
        var reg = self.direction
        requestAnimationFrame(function timer() {
            reg--
            i++
            if (reg < 0) {
                reg += 360
            }
            self.direction = reg
            if (i == 90) {
                self.animating = false
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    tunRig() {
        if (this.animating == true) return false

        this.animating = true

        var i = 0
        var self = this
        var reg = self.direction
        requestAnimationFrame(function timer() {
            reg++
            i++
            if (reg >= 360) {
                reg -= 360
            }
            self.direction = reg
            if (i == 90) {
                self.animating = false
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    tunBac() {
        if (this.animating == true) return false

        this.animating = true

        var i = 0
        var self = this
        var reg = self.direction
        requestAnimationFrame(function timer() {
            reg++
            i++
            if (reg >= 360) {
                reg -= 360
            }
            self.direction = reg
            if (i == 180) {
                self.animating = false
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    traLef() {
        if (this.animating == true) return false
        if (this.x <= 75) return false

        this.animating = true

        var i = 0
        var self = this
        requestAnimationFrame(function timer() {
            self.x -= 1
            i += 1
            if (i == 50) {
                self.animating = false
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    traTop() {
        if (this.animating == true) return false
        if (this.y <= 75) return false

        this.animating = true

        var i = 0
        var self = this
        requestAnimationFrame(function timer() {
            self.y -= 1
            i += 1
            if (i == 50) {
                self.animating = false
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    traRig() {
        if (this.animating == true) return false
        if (this.x >= 525) return false

        this.animating = true

        var i = 0
        var self = this
        requestAnimationFrame(function timer() {
            self.x += 1
            i += 1
            if (i == 50) {
                self.animating = false
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    traBot() {
        if (this.animating == true) return false
        if (this.y >= 525) return false

        this.animating = true

        var i = 0
        var self = this
        requestAnimationFrame(function timer() {
            self.y += 1
            i += 1
            if (i == 50) {
                self.animating = false
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    movLef() {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 270) {
            this.traLef()
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
                self.traLef()
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    movTop() {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 0) {
            this.traTop()
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
                self.traTop()
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    movRig() {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 90) {
            this.traRig()
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
                self.traRig()
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

    movBot() {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 180) {
            this.traBot()
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
                self.traBot()
            } else {
                requestAnimationFrame(timer)
            }
        })
    }

}