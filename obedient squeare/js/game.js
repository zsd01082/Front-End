class Game {
    constructor() {
            this.square = new Square(325, 325, this)
            this.map = new Map()
            this.textarea = new Textarea("id-command", this)
            this.haveCmds = false

            var self = this
            var runButton = document.getElementById("id-run")
            runButton.onclick = function() {
                //如果没有队列在执行，执行新队列
                if (!self.haveCmds) {
                    self.textarea.check()
                }
            }
        }
        //接收cmds后依次发给square
    sendcmd(cmds) {
        for (var cmd in cmds) {
            var time = cmds[cmd]
            for (var i = 0; i < time; i++) {
                this.square.recivecmd(cmd)
            }
        }
    }
}