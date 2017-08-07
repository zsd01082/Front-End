class Textarea {
    constructor(id, game) {
        this.game = game
        this.player = this.game.player
        this.textarea = document.getElementById(id)
        this.setup()
    }

    setup() {
        this.numBar = null
        this.vaild = false
        this.createNumBar(this.id)
        this.textarea.oninput = this.lineCount
        this.textarea.onclick = this.lineCount
        this.textarea.onscroll = this.scollWith
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

    //textarea内容无误后，处理内容后将内容传给player
    check() {
        this.vaild = true
        var cmds = this.dealcmds()
        for (var i = 0; i < cmds.length; i++) {
            var cmd = Object.keys(cmds[i])[0]
            if (!this.player[cmd]) {
                this.numColor(i, "red")
                this.vaild = false
            }
        }
        if (this.vaild == true) {
            this.player.recivecmds(cmds)
        }
    }

    scollWith() {
        this.previousElementSibling.scrollTop = this.scrollTop
    }

    dealcmds() {
        var txts = this.textarea.value.split("\n").map(function(txt) {
            return txt.trim()
        })
        var cmds = []
        for (var i in txts) {
            var time = txts[i].match(/[0-9]+$/) ? txts[i].match(/[0-9]+$/)[0] : 1
            var cmd = txts[i].match(/(^\w{3}\s\w{3})|(^go)/i) ? txts[i].match(/(^\w{3}\s\w{3})|(^go)/i)[0] : undefined
            if (cmd) {
                cmd = cmd.toLowerCase()
                cmd = cmd.replace(/\s\w/, function(rs) {
                    return rs.toUpperCase().trim()
                })
            }
            cmds[i] = {}
            cmds[i][cmd] = time
        }
        return cmds
    }

    numColor(i, color) {
        var nums = this.numBar.getElementsByClassName("num")
        if (!nums[i]) {
            return false
        }
        nums[i].style.backgroundColor = color
    }

}