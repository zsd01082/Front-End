class Textarea {
    constructor(id, game) {
        this.game = game
        this.square = this.game.square
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

    check() {
        this.vaild = true
        var cmds = this.dealcmds()
        var keys = Object.keys(cmds)
        for (var i in keys) {
            var cmd = keys[i]
            if (!this.square[cmd]) {
                this.numColor(i, "red")
                this.vaild = false
            }
        }
        if (this.vaild == true) {
            this.game.sendcmd(cmds)
        }
    }

    scollWith() {
        this.previousElementSibling.scrollTop = this.scrollTop
    }

    //textarea内容无误后，处理内容后将内容传给square
    dealcmds() {
        var txts = this.textarea.value.split("\n").map(function(txt) {
            return txt.trim()
        })
        var cmds = {}
        for (var i in txts) {
            var time = txts[i].match(/[0-9]+$/) ? txts[i].match(/[0-9]+$/)[0] : 1
            var cmd = txts[i].match(/(^\w{3}\s\w{3})|(^go)/i) ? txts[i].match(/(^\w{3}\s\w{3})|(^go)/i)[0] : undefined
            if (cmd) {
                cmd = cmd.toLowerCase()
                cmd = cmd.replace(/\s\w/, function(rs) {
                    return rs.toUpperCase().trim()
                })
            }
            cmds[cmd] = time
        }
        return cmds
    }

    numColor(i, color) {
        var nums = this.numBar.getElementsByClassName("num")
        nums[i].style.backgroundColor = color
    }

}