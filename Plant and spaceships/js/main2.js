/**
 * 部署飞船按钮绑定事件
 */
var launchButton = function() {

    var currSystem = {
        dynamicSystem: null,
        powerSystem: null
    };

    //添加部署飞船按钮点击事件
    var buttonOnclick = function() {
        if (!document.getElementById("launchSpaceship")) return false;
        var button = document.getElementById("launchSpaceship");
        button.onclick = function() {
            var system = launchButton().getCurrSystem();
            console.log(system);
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
                    currSystem[systems[key]] = radios[i].value;
                    break;
                };
            };
        };
        return currSystem;
    };

    return {
        buttonOnclick: buttonOnclick,
        getCurrSystem: getCurrSystem,
    };
};

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

window.onload = function() {
    launchButton().buttonOnclick();
};