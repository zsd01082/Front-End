class Game {
    constructor() {
        this.square = new Square(325, 325)
        this.map = new Map()
        this.textarea = new Textarea("id-command", this.square)

        var self = this
        var runButton = document.getElementById("id-run")
        runButton.onclick = function() {
            self.textarea.check()
        }
    }

}