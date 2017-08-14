class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.sence = new Sence(this)
        this.player = new Player(6, 6, this)
        this.map = new Map(this)
        this.textarea = new Textarea("id-command", this)
        this.walls = {}

        var self = this
        var runButton = document.getElementById("id-run")
        runButton.onclick = function() {
            //如果没有队列在执行，执行新队列
            if (self.player.cmds.length == 0) {
                self.player.currCmdNum = -1
                self.textarea.dealcmds()
            }
        }

        var createWallButton = document.getElementById("id-create-wall")
        createWallButton.onclick = function() {
            var x = randommMathBetween(1, 10),
                y = randommMathBetween(1, 10),
                coordinate = x + "," + y,
                wall = new Wall(x, y, self)
            self.walls[coordinate] = wall
        }
    }

    build(coordinate) {
        var x = coordinate.substr(0, 1)
        var y = coordinate.substr(-1)

        var wall = new Wall(x, y, this)
        this.walls[coordinate] = wall
    }


    search(origin, aim) {
        var startX = origin.x,
            startY = origin.y,
            endX = aim.x,
            endY = aim.y,
            openList = [],
            closeList = [],
            result = [],
            resultIndex

        openList.push({ x: startX, y: startY, g: 0 })

        do {
            var currPoint = openList.shift()
            closeList.push(currPoint)
            var surroundPoints = this.findSurroundPoint(currPoint)
            for (var i = 0; i < surroundPoints.length; i++) {
                var surroundPoint = surroundPoints[i]
                if (!this.isWall(surroundPoint) && !this.existList(surroundPoint, closeList)) {
                    var g = currPoint.g + 10
                    if (!this.existList(surroundPoint, openList)) {
                        surroundPoint.g = g
                        surroundPoint.h = (Math.abs(endX - surroundPoint.x) + Math.abs(endY - surroundPoint.y)) * 10
                        surroundPoint.f = surroundPoint.g + surroundPoint.h
                        surroundPoint.parent = currPoint
                        openList.push(surroundPoint)
                    } else {
                        var index = this.existList(surroundPoint, openList)
                        if (g < openList[index].g) {
                            openList[index].parent = currPoint
                            openList[index].g = g
                            openList[index].f = g + openList[index].h
                        }
                    }
                }
            }
            if (openList.length == 0) {
                break
            }
            openList.sort(function(a, b) {
                return (a.f - b.f)
            })
        } while (!(resultIndex = this.existList({ x: endX, y: endY }, openList)))
        if (!resultIndex) {
            result = [];
        } else {
            var currentObj = openList[resultIndex];
            do {
                //把路劲节点添加到result当中
                result.unshift({
                    x: currentObj.x,
                    y: currentObj.y
                })
                currentObj = currentObj.parent;
            } while (currentObj.x != startX || currentObj.y != startY);

        }
        return result
    }


    bru(coordinate, color) {
        var wall = this.walls[coordinate]
        var oldColor = wall.color
        if (wall == undefined) {
            log("there is no wall!!!")
            return false
        }
        wall.color = color

    }

    findSurroundPoint(point) {
        var surroundPoints = [],
            x = point.x,
            y = point.y

        surroundPoints.push({ x: x - 1, y: y })
        surroundPoints.push({ x: x + 1, y: y })
        surroundPoints.push({ x: x, y: y + 1 })
        surroundPoints.push({ x: x, y: y - 1 })
        return surroundPoints
    }

    isWall(point) {
        var coordinate = point.x + "," + point.y

        if (this.walls[coordinate]) {
            return true
        } else if (point.x > 10 || point.x < 1) {
            return true
        } else if (point.y > 10 || point.y < 1) {
            return true
        } else {
            return false
        }
    }

    existList(point, list) {
        for (var i in list) {
            if (point.x == list[i].x && point.y == list[i].y) {
                return i
            }
        }
        return false
    }
}