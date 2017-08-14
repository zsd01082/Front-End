class Textarea {
    constructor(id, game) {
        this.game = game
        this.player = this.game.player
        this.textarea = document.getElementById(id)
        this.setup()
    }

    setup() {
        this.numBar = null
        this.createNumBar(this.id)
        this.textarea.onscroll = this.scollWith
        this.textarea.oninput = this.lineCount
        this.textarea.oninput()
    }

    createNumBar() {
        var bar = document.createElement("div")
        bar.id = "id-lineNum"
        this.textarea.parentElement.insertBefore(bar, this.textarea)
        this.numBar = bar
    }

    lineCount(textarea) {
        var nums = ""
        var lineNum = this.value.match(/\n/g)
        if (!lineNum) {
            var len = 1
        } else {
            var len = lineNum.length + 1
        }
        for (var i = 1; i <= len; i++) {
            nums += "<div class = \"num\">" + i + " </div>"
        }
        this.previousSibling.innerHTML = nums
    }

    scollWith() {
        this.previousElementSibling.scrollTop = this.scrollTop
    }

    //检查并处理textarea内容，无误后传给player
    dealcmds() {
        var txts = this.textarea.value.split("\n").map(function(txt) {
            return txt.trim().toLowerCase()
        })

        var vaild = true
        var cmds = []
        var regs = []

        regs[0] = new RegExp(/^(tun) (lef|rig|bac)( [0-9]+)?$/, "i")
        regs[1] = new RegExp(/^(tra|mov) (lef|top|rig|bot)( [0-9]+)?$/, "i")
        regs[2] = new RegExp(/^(go)( [0-9]+)?$/, "i")
        regs[3] = new RegExp(/^(move to) ((?:[1-9]|10),(?:[1-9]|10))$/, "i")
        regs[4] = new RegExp(/^(build)$/, "i")
        regs[5] = new RegExp(/^(bru) (.+)$/, "i")

        for (var i in txts) {
            var txt = txts[i]
            var cmd
            for (var j = 0; j < regs.length; j++) {
                cmd = cmd || regs[j].exec(txt)
            }
            cmd && cmd.shift()

            //命令为 move to 时，特殊处理
            if (cmd && cmd[0] == "move to") {
                var aim = cmd[1].split(",")
                var x = aim[0]
                var y = aim[1]
                aim = { x: x, y: y }
                origin = this.game.player
                var path = this.game.search(origin, aim)

                //检查是否可达到目的地
                if (path.length == 0) {
                    this.numColor(i, "red")
                    vaild = false
                } else {
                    cmd = ["move to", path]
                    cmds.push(cmd)
                    cmd = null
                }

            } else if (cmd) {
                cmds.push(cmd)
                cmd = null
            } else {
                this.numColor(i, "red")
                vaild = false
            }
        }
        if (vaild == true) {
            this.player.cmds = cmds
            this.player.animating = false
        }
    }

    numColor(i, color) {
        var nums = this.numBar.getElementsByClassName("num")
        if (!nums[i]) {
            return false
        }
        nums[i].style.backgroundColor = color
    }

}