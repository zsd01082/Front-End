var __main = function() {
    var canvas = document.getElementById("id-canvas")
    var game = new Game(canvas)
}

var log = console.log.bind()

/**
 * 计算两个数字是否相等
 */
var approx = function(a, b, num) {
    var m = Math.abs(a - b)
    if (m <= num) {
        return true
    } else {
        return false
    }
}

/**
 * 在[minNum,maxNum]生成一个随机随
 */
var randommMathBetween = function(minNum, maxNum) {
    return math = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

__main()