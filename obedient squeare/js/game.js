class Game {
    constructor() {
        this.square = new Square(325, 325)
        this.map = new Map()

        var self = this
        var runButton = document.getElementById("id-run")
        runButton.onclick = function() {
            var command = document.getElementById("id-command").value
            self.square[command]()
        }

    }
}