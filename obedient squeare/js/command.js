class Textarea {
    constructor(id) {
        this.textarea = document.getElementById(id)
        this.numBar = null
        this.createNumBar(id)
        this.textarea.oninput = this.lineCount
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
            nums += (i + "\r")
        }
        log(this, nums)
        this.previousSibling.innerHTML = nums
    }

}

/* var command = function(id) {
    var t = document.getElementById(id)

    var lineBar = function() {
        var bar = document.createElement("div")
        bar.id = "id-lineNum"
        t.parentElement.insertBefore(bar, t)
    }

    var newNum = function(lineNum) {
        var bar = document.getElementById("id-lineNum")
        log(lineNum)
        if (!lineNum) {
            len = 1
        } else {
            len = lineNum.length + 1
        }
        for (var i = 1; i <= len; i++) {
            bar.innerHTML += (i + "\r")
        }
    }

    t.oninput = function() {
        var lineNum = t.value.match(/\n/g)
        reset()
        newNum(lineNum)
    }

    var reset = function() {
        var bar = document.getElementById("id-lineNum")
        bar.innerHTML = null
    }

    return {
        lineBar: lineBar,
        newNum: newNum,
        reset: reset,
    }
}

var o = command("id-command")
o.lineBar() */