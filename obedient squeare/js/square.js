class Square {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.direction = 0
        this.animating = false
        var self = this
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

        var i = 0
        this.animating = true

        var self = this
        this.timer = setInterval((function() {
            var reg = self.direction
            reg--
            i++
            if (reg < 0) {
                reg += 360
            }
            self.direction = reg
            if (i == 90) {
                clearInterval(self.timer)
                self.animating = false
            }
        }), 1000 / 120)
    }

    tunRig() {
        if (this.animating == true) return false

        var i = 0
        this.animating = true

        var self = this
        this.timer = setInterval((function() {
            var reg = self.direction
            reg++
            i++
            if (reg >= 360) {
                reg -= 360
            }
            self.direction = reg
            if (i == 90) {
                clearInterval(self.timer)
                self.animating = false
            }
        }), 1000 / 120)
    }

    tunBac() {
        if (this.animating == true) return false

        var i = 0
        this.animating = true

        var self = this
        this.timer = setInterval((function() {
            var reg = self.direction
            reg++
            i++
            if (reg >= 360) {
                reg -= 360
            }
            self.direction = reg
            if (i == 180) {
                clearInterval(self.timer)
                self.animating = false
            }
        }), 1000 / 120)
    }

    traLef() {
        if (this.animating == true) return false
        if (this.x <= 75) return false

        var i = 0
        this.animating = true

        var self = this
        this.timer = setInterval((function() {
            self.x--
                i++
                if (i == 50) {
                    clearInterval(self.timer)
                    self.animating = false
                }
        }), 1000 / 120)
    }

    traTop() {
        if (this.animating == true) return false
        if (this.y <= 75) return false

        var i = 0
        this.animating = true

        var self = this
        this.timer = setInterval((function() {
            self.y--
                i++
                if (i == 50) {
                    clearInterval(self.timer)
                    self.animating = false
                }
        }), 1000 / 120)
    }

    traRig() {
        if (this.animating == true) return false
        if (this.x >= 525) return false

        var i = 0
        this.animating = true

        var self = this
        this.timer = setInterval((function() {
            self.x++
                i++
                if (i == 50) {
                    clearInterval(self.timer)
                    self.animating = false
                }
        }), 1000 / 120)
    }

    traBot() {
        if (this.animating == true) return false
        if (this.y >= 525) return false

        var i = 0
        this.animating = true

        var self = this
        this.timer = setInterval((function() {
            self.y++
                i++
                if (i == 50) {
                    clearInterval(self.timer)
                    self.animating = false
                }
        }), 1000 / 120)
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
        this.timer = setInterval((function() {
            reg += dir
            if (reg < 0) {
                reg += 360
            }
            self.direction = reg
            if (reg == 270) {
                clearInterval(self.timer)
                self.animating = false
                self.traLef()
            }
        }), 1000 / 120)
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
        this.timer = setInterval((function() {
            reg += dir
            if (reg >= 360) {
                reg -= 360
            }
            self.direction = reg
            if (reg == 0) {
                clearInterval(self.timer)
                self.animating = false
                self.traTop()
            }
        }), 1000 / 120)
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
        this.timer = setInterval((function() {
            reg += dir
            if (reg >= 360) {
                reg -= 360
            }
            self.direction = reg
            if (reg == 90) {
                clearInterval(self.timer)
                self.animating = false
                self.traRig()
            }
        }), 1000 / 120)
    }

    movBot() {
        if (this.animating == true) return false

        var reg = this.direction
        if (reg == 180) {
            this.traBot()
            return
        }

        this.animating = true
        if (reg > 180) {
            var dir = -1
        } else {
            var dir = 1
        }

        var self = this
        this.timer = setInterval((function() {
            reg += dir
            self.direction = reg
            if (reg == 180) {
                clearInterval(self.timer)
                self.animating = false
                self.traBot()
            }
        }), 1000 / 120)
    }
}