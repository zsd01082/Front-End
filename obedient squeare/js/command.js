class Textarea {
    constructor(id, square) {
        this.square = square
        this.textarea = document.getElementById(id)
        this.setup()
    }

    setup() {
        this.numBar = null
        this.vaild = false
        this.cmds = []
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
        var commands = []
        var txts = this.textarea.value.split("\n").map(function(txt) {
            return txt.trim()
        })
        var nums = document.getElementsByClassName("num")
        for (var i = 0; i < txts.length; i++) {
            var txt = txts[i].match(/^[A-Za-z]+/)
            if (!this.square[txt]) {
                nums[i].style.backgroundColor = "red"
                this.vaild = false
            }
        }
        if (this.vaild == true) {
            this.cmds = txts
            this.dealcmds()
        }
    }

    scollWith() {
        this.previousElementSibling.scrollTop = this.scrollTop
    }

    //textarea内容无误后，处理内容后将内容传给square
    dealcmds() {
        var cmds = this.cmds
        for (var i in cmds) {
            var time = cmds[i].match(/[0-9]+$/) || 1
            var cmd = cmds[i].match(/^[A-Za-z]+/)
            log(time, cmd)
        }
    }

}