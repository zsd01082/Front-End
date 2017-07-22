var initButton = function() {
    var vaildationButton = document.getElementById("vaildation");
    var formInput = document.getElementById("formText");
    var result = document.getElementById("result");
    formInput.onclick = function() {
        formInput.style.borderColor = "#7b9cd3";
        result.style.color = "#acacac";
        result.innerText = "必填，长度为4~16个字符";
        return true;
    }
    vaildationButton.onclick = function() {
        var formText = formInput.value.trim();
        if (!formText) {
            formInput.style.borderColor = "#dd0007";
            result.style.color = "#dd0007";
            result.innerText = "名称不能为空！！！";
            return false;
        };
        var reg = formText.match(/^[A-Za-z0-9\u4E00-\u9FA5]+$/);
        if (!reg) {
            formInput.style.borderColor = "#dd0007";
            result.style.color = "#dd0007";
            result.innerText = "名称不合法，请重新输入！！！";
            return false;
        }
        if (reg[0].length < 4 || reg[0].length > 16) {
            formInput.style.borderColor = "#dd0007";
            result.style.color = "#dd0007";
            result.innerText = "名称长度不符合要求，请重新输入！！！";
            return false;
        };
        formInput.style.borderColor = "#85cb73";
        result.style.color = "#85cb73";
        result.innerText = "名称格式正确";
        return true;
    };
};

window.onload = function() {
    initButton();
};