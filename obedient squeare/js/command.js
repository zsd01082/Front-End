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
            return txt.trim()
        })

        var vaild = true
        var cmds = []

        var reg1 = new RegExp(/^tun\s(?:lef|rig|bac)(?:\s[0-9])?$/, "i"),
            reg2 = new RegExp(/^(tra|mov)\s(lef|top|rig|bot)(\s[0-9])?$/, "i"),
            reg3 = new RegExp(/^go(?:\s[0-9])?$/, "i")
        for (var i in txts) {
            var txt = txts[i]
            var cmd = reg1.exec(txt) || reg2.exec(txt) || reg3.exec(txt)
            if (cmd) {
                cmd = cmd[0].toLowerCase().split(" ")
                cmds.push(cmd)
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