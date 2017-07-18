//飞船参数设定
var spaceshipSpeed = 50; //飞船飞行速度
var spaceshipSize = 50; //飞船大小
var spaceshipMaxNum = 4; //飞船数量上限
var spaceshipChargeRate = 0.05; //飞船太阳能充电速率
var spaceshipDischargeRate = 0.09; //飞船飞行耗电速率
//电量显示条参数设定
var powerbarPosOffset = 11; //电量条偏移量
var powerbarHeight = 2; //电量条粗细
var powerbarWidth = 30; //电量条总长度
var powerbarGoodColor = "#70ed3f"; //电量良好时电量条颜色
var powerbarMedium = 50; //电量一般时百分比
var powerbarMediumColor = "#fccd1f"; //电量一般时电量条颜色
var powerbarBad = 15; //电量不足时百分比
var powerbarBadColor = "#fb0000"; //电量不足时电量条颜色
//轨道及飞船初始位置参数设定
var spaceshipOffsetBottom = 17; //飞船初始位置y轴偏移量
var spaceshipOffsetLeft = 22; //飞船初始位置X轴偏移量
var orbitRadius = 50; //各轨道之间间距
var orbitNum = 4; //轨道数量
//信息发送参数设定
var failureRate = 0.3 //信息发送失败几率
var sendTime = 500; //信息发送耗时

/**
 * 飞船初始设定
 */
var Spaceship = function(id) {
    this.id = id; //飞船ID
    this.power = 100; //飞船电量百分比，初始为100
    this.powerBarColor = powerbarGoodColor;
    this.currState = "stop"; //飞船当前状态，初始为停止
    this.Yoffset = spaceshipOffsetBottom + "px"; //飞船Y轴初始位置
    this.Xoffset = spaceshipOffsetLeft + id * orbitRadius + "px"; //飞船X轴初始位置
    this.deg = 0; //飞船角度，初始为0
    this.timer = null; //飞船计时器
    this.chanrgeTimer = null; //飞船充电计时器
    this.dischanrgeTimer = null; //飞船放电计时器
}

/**
 * 飞船动力系统
 */
Spaceship.prototype.dynamicSystem = function() {
    var self = this;

    var fly = function() {
        clearInterval(self.timer);
        self.timer = setInterval((function() {
            self.deg -= spaceshipSpeed / parseFloat(self.Xoffset);
            if (self.deg <= -360) self.deg = 0; //如果飞船角度大于360，重置角度
            draw.spaceshipRotate(self.id, self.deg);
        }), 10);
        consoleDisplay.show("spaceship No." + self.id + "已经起飞！！！");
    };

    var stop = function() {
        clearInterval(self.timer);
        consoleDisplay.show("spaceship No." + self.id + "已经停止！！！");
    }

    var destroy = function() {
        clearInterval(self.timer);
        consoleDisplay.show("spaceship No." + self.id + "已被摧毁！！！");
    }

    return {
        fly: fly,
        stop: stop,
        destroy: destroy
    };
};

/**
 * 飞船能源系统
 */
Spaceship.prototype.powerSystem = function() {
    var self = this;

    var charge = function() {
        clearInterval(self.chargeTimer);
        self.chargeTimer = setInterval((function() {
            //若飞船被摧毁时，停止充电
            if (self.currState == "destroyed") {
                clearInterval(self.chargeTimer);
                return false;
            };
            self.power += spaceshipChargeRate;
            if (self.power >= 100) self.power = 100; //电量最高为100
            draw.powerBar(self.id, self.power);
            return true;
        }), 10);
    };

    var disCharge = function() {
        clearInterval(self.dischargeTimer);
        self.dischargeTimer = setInterval((function() {
            //若飞船停止或被摧毁时，停止放电
            if (self.currState == "stop" || self.currState == "destroyed") {
                clearInterval(self.dischargeTimer);
                return false;
            };

            self.power -= spaceshipDischargeRate;
            if (self.power <= 0) {
                self.power = 0; //电量最低为0
                self.stateSystem().changeState("stop"); //电量不足时停止飞行
            };
            draw.powerBar(self.id, self.power);
            return true;
        }), 10);
    };

    return {
        charge: charge,
        disCharge: disCharge
    }
}

/**
 * 飞船状态改变系统
 */
Spaceship.prototype.stateSystem = function() {
    var self = this;

    var states = {
        fly: function() {
            self.currState = "fly";
            self.dynamicSystem().fly();
            self.powerSystem().disCharge();
        },
        stop: function() {
            self.currState = "stop";
            self.dynamicSystem().stop();
        },
        destroy: function() {
            self.currState = "destroyed";
            self.dynamicSystem().destroy();
        },
    };

    var changeState = function(state) {
        states[state]();
    };

    return {
        changeState: changeState
    }
}

/**
 * 飞船信号接收处理系统
 */
Spaceship.prototype.msgSystem = function(id, command) {
    if (this.id != id) return false;
    this.stateSystem().changeState(command);
}

/**
 * MEDIATOR广播介质
 */
var Mediator = function() {
    var spaceships = [];
    //接受信息
    var send = function(msg) {
        //信息发送有一定概率丢包
        if (Math.random() < failureRate) {
            consoleDisplay.show("信息发送失败，请重试！！！");
            return false;
        } else if (msg.command == "register") {
            this.register(msg.id);
        } else if (msg.command == "fly" || msg.command == "stop") {
            if (spaceships[msg.id] == undefined) {
                consoleDisplay.show("spaceship No." + msg.id + "不存在，请部署后再进行操作！！！");
                return false;
            }
            for (var i in spaceships) {
                if (spaceships[i] == undefined) continue;
                spaceships[i].msgSystem(msg.id, msg.command);
            }
        } else if (msg.command == "destroy") {
            for (var i in spaceships) {
                if (spaceships[i] == undefined) continue;
                spaceships[i].msgSystem(msg.id, msg.command);
            }
            this.remove(msg.id);
        };
    };

    var register = function(id) {
        if (spaceships[id] !== undefined) {
            consoleDisplay.show("spaceship No." + id + "已存在！！！");
            return false;
        };
        var spaceship = new Spaceship(id);
        spaceships[id] = spaceship;
        launchSpaceship.launch(spaceship); //部署飞船
        spaceship.powerSystem().charge(); //自动开始太阳能充电
        consoleDisplay.show("spaceship No." + id + "成功部署!!!");
        return true;
    };

    var remove = function(id) {
        if (spaceships[id] == undefined) {
            consoleDisplay.show("spaceship No." + id + "不存在！！！");
            return false;
        }
        spaceships[id] = undefined;
        destroySpaceship.destroy(id);
        consoleDisplay.show("spaceship No." + id + "成功摧毁!!!");
        return true;
    };

    var getSpaceships = function() {
        return spaceships;
    }

    return {
        send: send,
        register: register,
        remove: remove,
        getSpaceships: getSpaceships
    }
}

/**
 * 部署飞机
 */
var launchSpaceship = (function() {
    var galaxy = document.getElementById("galaxy");
    var launch = function(spaceship) {
        //创建飞船
        var spaceshipBody = document.createElement("img");
        spaceshipBody.src = "img/space.png";
        spaceshipBody.style.width = spaceshipSize + "px";
        spaceshipBody.style.position = "absolute";
        //创建电量条
        var powerBar = document.createElement("div");
        powerBar.style.width = powerbarWidth + "px";
        powerBar.style.height = powerbarHeight + "px";
        powerBar.style.marginLeft = powerbarPosOffset + "px";
        powerBar.style.backgroundColor = spaceship.powerBarColor;
        powerBar.style.position = "absolute";
        //将飞船与电量条添加进页面
        var spaceshipDiv = document.createElement("div");
        spaceshipDiv.appendChild(powerBar);
        spaceshipDiv.appendChild(spaceshipBody);
        galaxy.appendChild(spaceshipDiv);
        spaceshipDiv.id = spaceship.id;
        spaceshipDiv.style.position = "absolute";
        spaceshipDiv.style.bottom = spaceship.Yoffset;
        spaceshipDiv.style.left = spaceship.Xoffset;
        spaceshipDiv.style.transformOrigin = "-" + spaceship.Xoffset + " " + spaceship.Yoffset;
    }
    return {
        launch: launch
    }

})();

/**
 * 摧毁飞船
 */
var destroySpaceship = (function() {

    var destroy = function(id) {
        var spaceship = document.getElementById(id);
        spaceship.parentElement.removeChild(spaceship);
    }

    return {
        destroy: destroy
    }

})();

/**
 * 控制台信息显示
 */
var consoleDisplay = (function() {
    var consolePanel = document.getElementById("console");
    var show = function(info) {
        var infomation = document.createElement("p");
        var infomationText = document.createTextNode(info);
        infomation.appendChild(infomationText);
        consolePanel.appendChild(infomation);
    };

    return {
        show: show
    };

})();

/**
 * 画图函数
 */
var draw = (function() {
    var spaceshipRotate = function(id, deg) {
        var spaceship = document.getElementById(id);
        spaceship.style.transform = "rotate(" + deg + "deg)";
    }

    var powerBar = function(id, power) {
        var powerDiv = document.getElementById(id).firstElementChild;
        powerDiv.style.width = powerbarWidth * (power / 100) + "px";
        if (power > powerbarMedium) {
            powerDiv.style.backgroundColor = powerbarGoodColor;
        } else if (power > powerbarBad) {
            powerDiv.style.backgroundColor = powerbarMediumColor;
        } else {
            powerDiv.style.backgroundColor = powerbarBadColor;
        }
    }

    return {
        spaceshipRotate: spaceshipRotate,
        powerBar: powerBar
    }

})();

/**
 * 给所有按钮绑定事件
 */
function initbutton(mediator) {
    //部署飞船按钮
    var buttonId = ["register", "fly", "stop", "destroy"];
    var buttons, button;
    for (var key in buttonId) {
        buttons = document.getElementsByName(buttonId[key]);
        for (var i in buttons) {
            button = buttons[i];
            button.onclick = function() {
                var msg = {
                    id: this.parentElement.id.substr(-1),
                    command: this.name
                };
                consoleDisplay.show("消息发送中...")
                setTimeout((function() {
                    mediator.send(msg);
                }), sendTime);
            };
        };
    };
}

/**
 * 初始化
 */
window.onload = function() {
    var mediator = new Mediator;
    initbutton(mediator);
}