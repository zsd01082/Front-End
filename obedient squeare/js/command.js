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

        regs[0] = new RegExp(/^(tun) (lef|rig|bac)( [1-9])?$/, "i")
        regs[1] = new RegExp(/^(tra|mov) (lef|top|rig|bot)( [1-9])?$/, "i")
        regs[2] = new RegExp(/^(go)( [1-9])?$/, "i")
        regs[3] = new RegExp(/^(move to) ([1-9],[1-9])$/, "i")
        regs[4] = new RegExp(/^(build)$/, "i")

        for (var i in txts) {
            var txt = txts[i]
            var cmd
            for (var j = 0; j < regs.length; j++) {
                cmd = cmd || regs[j].exec(txt)
            }
            if (cmd) {
                cmd.shift()
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