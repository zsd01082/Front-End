/**
 * 飞船
 */
var Spaceship = function(id, speed, disCharge, charge) {
    this.id = id; //飞船ID
    this.power = 100; //飞船电量百分比，初始为100
    this.powerBarColor = "#70ed3f";
    this.currState = "stop"; //飞船当前状态，初始为停止
    this.Yoffset = 17 + "px"; //飞船Y轴初始位置
    this.Xoffset = 22 + id * 50 + "px"; //飞船X轴初始位置
    this.deg = 0; //飞船角度，初始为0
    this.speed = speed //飞船飞行速度
    this.disCharge = disCharge //飞船耗电速率(百分比)
    this.charge = charge //飞船充电速率(百分比)
    this.timer = null; //飞船飞行计时器
    this.chanrgeTimer = null; //飞船充电计时器
    this.dischanrgeTimer = null; //飞船放电计时器
    this.DCtimer = null;
}

/**
 * 飞船接受信息
 */
Spaceship.prototype.recive = function(binaryMsg) {
    var jsonMsg = this.adapter().binaryToJson(binaryMsg);
    if (this.id != jsonMsg.id) return false;
    this.stateSystem().changeState(jsonMsg.command);
}

/**
 * 飞船发送信息
 */
Spaceship.prototype.send = function() {
    var binaryMsg = this.adapter().jsonToBinary();
    DC().recive(binaryMsg);
}

/**
 * adapter 模块
 */
Spaceship.prototype.adapter = function() {
    var self = this;

    var binaryToJson = function(binaryMsg) {
        var spaceshipId, command;
        switch (binaryMsg.substr(0, 4)) {
            case "0001":
                spaceshipId = 1;
                break;
            case "0010":
                spaceshipId = 2;
                break;
            case "0100":
                spaceshipId = 3;
                break;
            case "1000":
                spaceshipId = 4;
                break;
        };
        switch (binaryMsg.substr(4, 8)) {
            case "0001":
                command = "fly";
                break;
            case "0010":
                command = "stop";
                break;
            case "1100":
                command = "destroy";
                break;
        };
        var jsonMsg = {
            id: spaceshipId,
            command: command
        };
        return jsonMsg;
    };

    var jsonToBinary = function() {
        var msg = "";
        switch (self.id) {
            case "1":
                msg += "0001";
                break;
            case "2":
                msg += "0010";
                break;
            case "3":
                msg += "0100";
                break;
            case "4":
                msg += "1000";
                break;
        };
        switch (self.speed) {
            case 30:
                msg += "0001";
                break;
            case 50:
                msg += "0010";
                break;
            case 80:
                msg += "0100";
                break;
        };
        switch (self.currState) {
            case "fly":
                msg += "0001";
                break;
            case "stop":
                msg += "0010";
                break;
            case "destroyed":
                msg += "0100";
                break;
        };
        msg += (parseInt(self.power).toString(2));
        return msg;
    }

    return {
        binaryToJson: binaryToJson,
        jsonToBinary: jsonToBinary
    };
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
            self.powerSystem().disChargeSystem();
        },
        stop: function() {
            self.currState = "stop";
            self.dynamicSystem().stop();
        },
        destroy: function() {
            self.currState = "destroyed";
            clearInterval(self.timer);
            render().remove(self);
            orbit[self.id] = "empty";
            clearInterval(self.DCtimer);
            self.send();
        }
    };

    var changeState = function(state) {
        if (state == self.currState) return false;
        states[state]();
    };

    return {
        changeState: changeState
    }
}

/**
 * 飞船能源系统
 */
Spaceship.prototype.powerSystem = function() {
    var self = this;

    var chargeSystem = function() {
        clearInterval(self.chargeTimer);
        self.chargeTimer = setInterval((function() {
            //若飞船被摧毁时，停止充电
            if (self.currState == "destroyed") {
                clearInterval(self.chargeTimer);
                return false;
            };
            self.power += self.charge * 0.01;
            if (self.power >= 100) self.power = 100; //电量最高为100
            render().powerBar(self);
            return true;
        }), 10);
    };

    var disChargeSystem = function() {
        clearInterval(self.dischargeTimer);
        self.dischargeTimer = setInterval((function() {
            //若飞船停止或被摧毁时，停止放电
            if (self.currState == "stop" || self.currState == "destroyed") {
                clearInterval(self.dischargeTimer);
                return false;
            };

            self.power -= self.disCharge * 0.01;
            if (self.power <= 0) {
                self.power = 0; //电量最低为0
                self.stateSystem().changeState("stop"); //电量不足时停止飞行
            };
            render().powerBar(self);
            return true;
        }), 10);
    };

    return {
        chargeSystem: chargeSystem,
        disChargeSystem: disChargeSystem
    }
};

/**
 * 飞船动力系统
 */
Spaceship.prototype.dynamicSystem = function() {
    var self = this;

    var fly = function() {
        clearInterval(self.timer);
        self.timer = setInterval((function() {
            self.deg -= self.speed / parseFloat(self.Xoffset);
            if (self.deg <= -360) self.deg = 0; //如果飞船角度大于360，重置角度
            render().spaceshipRotate(self);
        }), 10);
        consoleDisplay("spaceship No." + self.id + "已经起飞！！！");
    };

    var stop = function() {
        clearInterval(self.timer);
        consoleDisplay("spaceship No." + self.id + "已经停止！！！");
    }

    return {
        fly: fly,
        stop: stop,
    };
};

/**
 * 轨道，单例对象用于储存各个轨道飞船信息
 */
var orbit = {
    1: "empty",
    2: "empty",
    3: "empty",
    4: "empty"
};

/**
 * 指挥官 ，单例对象，发送以及获取信息，绑定DOM
 */
var commander = {
    id: null,
    command: null,
    dynamicSystem: null,
    powerSystem: null,

    //将信息传递给BUS
    sendToBUS: function() {
        var msg = {
            id: this.id,
            command: this.command,
            dynamicSystem: this.dynamicSystem,
            powerSystem: this.powerSystem
        }
        BUS.recive(msg);
    }
};

/**
 * BUS介质
 */
var BUS = {
    //接受信息
    recive: function(msg) {
        setTimeout((function() {
            if (Math.random() < 0.1) {
                consoleDisplay("消息传送失败，正在重试...");
                BUS.recive(msg);
            } else {
                BUS.send(msg);
            }
        }), 300);
    },

    //处理发送信息
    send: function(msg) {
        if (msg.command == "launch") {
            if (orbit[msg.id] != "empty") return false;
            var speed, disCharge, charge;
            switch (msg.dynamicSystem) {
                case "1":
                    speed = 30;
                    disCharge = 5;
                    break;
                case "2":
                    speed = 50;
                    disCharge = 7;
                    break;
                case "3":
                    speed = 80;
                    disCharge = 9;
                    break;
            };
            switch (msg.powerSystem) {
                case "1":
                    charge = 2;
                    break;
                case "2":
                    charge = 3;
                    break;
                case "3":
                    charge = 4;
                    break;
            };
            var spaceship = new Spaceship(msg.id, speed, disCharge, charge);
            orbit[msg.id] = spaceship;
            spaceship.powerSystem().chargeSystem();
            controlPanel(spaceship);
            render().create(spaceship);
            spaceship.DCtimer = setInterval((function() {
                spaceship.send();
            }), 10);
            consoleDisplay("spaceship No." + spaceship.id + "成功部署，位于轨道" + spaceship.id + "!!!");
        };
        if (msg.command == "fly" || msg.command == "stop" || msg.command == "destroy") {
            msg = this.adapter(msg);
            for (var i in orbit) {
                if (orbit[i] != "empty") {
                    orbit[i].recive(msg);
                };
            };
        };
        /* if (msg.command == "destroy") {
            clearInterval(orbit[msg.id].timer);
            clearInterval(orbit[msg.id].chargeTimer);
            clearInterval(orbit[msg.id].dischargeTimer);
            render().remove(orbit[msg.id]);
            orbit[msg.id] = "empty";
        }; */
    },

    //将json格式转化为2进制格式
    adapter: function(msg) {
        var sMsg = "";
        switch (msg.id) {
            case "1":
                sMsg += "0001";
                break;
            case "2":
                sMsg += "0010";
                break;
            case "3":
                sMsg += "0100";
                break;
            case "4":
                sMsg += "1000";
                break;
        };
        switch (msg.command) {
            case "fly":
                sMsg += "0001";
                break;
            case "stop":
                sMsg += "0010";
                break;
            case "destroy":
                sMsg += "1100";
                break;
        };
        return sMsg;
    },
}

//部署飞船按钮点击事件
var buttonOnclick = function() {
    if (!document.getElementById("launchSpaceship")) return false;
    var button = document.getElementById("launchSpaceship");
    button.onclick = function() {
        for (var i in orbit) {
            if (orbit[i] == "empty") {
                commander.id = i;
                break;
            } else if (i >= 4) {
                consoleDisplay("没有足够的轨道放置飞船！！！");
                return false;
            };
        };
        commander.command = "launch";
        getCurrSystem();
        commander.sendToBUS();
    };
};

//获取用户选择的系统
var getCurrSystem = function() {
    if (!document.getElementById("launchPanel")) return false;
    var systems = ["dynamicSystem", "powerSystem"];
    for (var key in systems) {
        var radios = document.getElementsByName(systems[key]);
        for (var i in radios) {
            if (radios[i].checked) {
                commander[systems[key]] = radios[i].value;
                break;
            };
            if (i >= 4) {
                consoleDisplay("请选择飞船的" + systems[key] + "!!!");
                return false;
            }
        };
    };
};

//添加飞船操作按钮
var controlPanel = function(spaceship) {
    var commandPanel = document.getElementById("commandPanel");
    var spaceshipControl = document.createElement("div");
    spaceshipControl.id = "spaceship No." + spaceship.id;
    var spaceshipName = document.createTextNode("spaceship No." + spaceship.id);
    var flyButton = document.createElement("button");
    flyButton.innerHTML = "启动";
    flyButton.name = "fly";
    flyButton.onclick = function() {
        commander.id = this.parentElement.id.substr(-1);
        commander.command = this.name;
        commander.sendToBUS();
    };
    var stopButton = document.createElement("button");
    stopButton.innerHTML = "停止";
    stopButton.name = "stop";
    stopButton.onclick = function() {
        commander.id = this.parentElement.id.substr(-1);
        commander.command = this.name;
        commander.sendToBUS();
    };
    var destroyButton = document.createElement("button");
    destroyButton.innerHTML = "摧毁";
    destroyButton.name = "destroy";
    destroyButton.onclick = function() {
        commander.id = this.parentElement.id.substr(-1);
        commander.command = this.name;
        commander.sendToBUS();
    };
    spaceshipControl.appendChild(spaceshipName);
    spaceshipControl.appendChild(flyButton);
    spaceshipControl.appendChild(stopButton);
    spaceshipControl.appendChild(destroyButton);
    if (document.getElementById("spaceship No." + (parseInt(spaceship.id) + 1))) {
        commandPanel.insertBefore(spaceshipControl, document.getElementById("spaceship No." + (parseInt(spaceship.id) + 1)))
    } else {
        commandPanel.appendChild(spaceshipControl);
    };
}

/**
 * 渲染飞船
 */
var render = function() {
    var create = function(spaceship) {
        //创建飞船
        var spaceshipBody = document.createElement("img");
        spaceshipBody.src = "img/space.png";
        spaceshipBody.style.width = "50px";
        spaceshipBody.style.position = "absolute";
        //创建电量条
        var powerBar = document.createElement("div");
        powerBar.style.width = "30px";
        powerBar.style.height = "2px";
        powerBar.style.marginLeft = "11px";
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
    };

    var spaceshipRotate = function(spaceship) {
        var spaceshipBody = document.getElementById(spaceship.id);
        spaceshipBody.style.transform = "rotate(" + spaceship.deg + "deg)";
    };

    var powerBar = function(spaceship) {
        var powerDiv = document.getElementById(spaceship.id).firstElementChild;
        powerDiv.style.width = 30 * (spaceship.power / 100) + "px";
        if (spaceship.power > 50) {
            powerDiv.style.backgroundColor = "#70ed3f";
        } else if (spaceship.power > 15) {
            powerDiv.style.backgroundColor = "#fccd1f";
        } else {
            powerDiv.style.backgroundColor = "#fb0000";
        };

    };

    var remove = function(spaceship) {
        var spaceshipDiv = document.getElementById(spaceship.id);
        spaceshipDiv.parentElement.removeChild(spaceshipDiv);
        var spaceshipPanel = document.getElementById("spaceship No." + spaceship.id);
        spaceshipPanel.parentElement.removeChild(spaceshipPanel);
    }

    return {
        create: create,
        spaceshipRotate: spaceshipRotate,
        powerBar: powerBar,
        remove: remove
    }
}

/**
 * DC 用于接收飞船信息并显示
 */
var DC = function() {
    var self = DC;

    var displayTable = document.getElementById("spaceshipInfo");

    var create = function(msg) {
        var tr = document.createElement("tr");
        tr.id = "table" + msg.id;
        var tdContent = ["id", "speed", "currState", "power"];
        for (var i in tdContent) {
            var td = document.createElement("td");
            td.innerHTML = msg[tdContent[i]];
            tr.appendChild(td);
        };
        if (document.getElementById("table" + (msg.id + 1))) {
            displayTable.insertBefore(tr, document.getElementById("table" + (msg.id + 1)));
        } else {
            displayTable.appendChild(tr);
        };
    };

    var recive = function(binaryMsg) {
        var msg = self().adapter(binaryMsg);
        var tr = displayTable.getElementsByTagName("tr");
        if (!document.getElementById("table" + msg.id)) self().create(msg);
        if (msg.currState == "destroyed") {
            self().del(msg.id);
            return false;
        };
        self().update(msg);
    };

    var del = function(id) {
        var tr = document.getElementById("table" + id);
        displayTable.removeChild(tr);
    }

    var update = function(msg) {
        var tr = document.getElementById("table" + msg.id);
        var td = tr.getElementsByTagName("td");
        td[2].innerHTML = msg.currState;
        td[3].innerHTML = msg.power;
    };

    var adapter = function(binaryMsg) {
        var msg = {};
        switch (binaryMsg.substr(0, 4)) {
            case "0001":
                msg.id = 1;
                break;
            case "0010":
                msg.id = 2;
                break;
            case "0100":
                msg.id = 3;
                break;
            case "1000":
                msg.id = 4;
                break;
        };
        switch (binaryMsg.substr(4, 4)) {
            case "0001":
                msg.speed = 30;
                break;
            case "0010":
                msg.speed = 50;
                break;
            case "0100":
                msg.speed = 80;
                break;
        };
        switch (binaryMsg.substr(8, 4)) {
            case "0001":
                msg.currState = "fly";
                break;
            case "0010":
                msg.currState = "stop";
                break;
            case "0100":
                msg.currState = "destroyed";
                break;
        };
        msg.power = parseInt((binaryMsg.substr(12)), 2);
        return msg;
    };
    return {
        create: create,
        adapter: adapter,
        recive: recive,
        update: update,
        del: del
    };
};

/**
 * 控制台信息显示
 */
var consoleDisplay = function(info) {
    var consolePanel = document.getElementById("console");
    var infomation = document.createElement("p");
    var infomationText = document.createTextNode(info);
    infomation.appendChild(infomationText);
    consolePanel.appendChild(infomation);
};

window.onload = function() {
    buttonOnclick();
    render();
    DC();
};