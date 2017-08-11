class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.sence = new Sence(this)
        this.player = new Player(6, 6, this)
        this.map = new Map(this)
        this.textarea = new Textarea("id-command", this)

        var self = this
        var runButton = document.getElementById("id-run")
        runButton.onclick = function() {
            //如果没有队列在执行，执行新队列
            if (self.player.cmds.length == 0) {
                self.player.currCmdNum = -1
                self.textarea.dealcmds()
            }
        }
    }
}