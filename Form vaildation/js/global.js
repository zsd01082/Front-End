var Form = function(id, tip, reg, necessity) {
    this.id = id;
    this.tip = tip;
    this.reg = reg;
    this.necessity = necessity;
};

var vaildation = function(form) {
    var input = document.getElementById(form.id);
    var tip = input.nextElementSibling;
    input.onfocus = function() {
        input.style.borderColor = "#7b9cd3";
        tip.style.color = "#acacac";
        tip.innerHTML = form.tip;
    };
    input.onblur = function() {
        var text = input.value.trim()
        if (!text) {
            if (form.necessity == true) {
                input.style.borderColor = "#dd0007";
                tip.style.color = "#dd0007";
                tip.innerHTML = "内容不能为空！！！";
                return false;
            } else {
                input.style.borderColor = "#acacac";
                tip.innerHTML = "";
                return true;
            }
        };
        if (text.search(form.reg) == -1) {
            input.style.borderColor = "#dd0007";
            tip.style.color = "#dd0007";
            tip.innerHTML = "格式错误，请重新填写！！！";
            return false;
        };
        input.style.borderColor = "#85cb73";
        tip.style.color = "#85cb73";
        tip.innerHTML = "格式正确！！！";
        return true;
    };
};

var passwordVaildation = function() {
    var input = document.getElementById("ppassword");
    var tip = input.nextElementSibling;
    input.onfocus = function() {
        var password = document.getElementById("password").value.trim();
        if (!password) {
            input.style.borderColor = "orange";
            tip.style.color = "orange";
            tip.innerHTML = "请先填写密码";
            return false;
        };
        input.style.borderColor = "#7b9cd3";
        tip.style.color = "#acacac";
        tip.innerHTML = "必填，与密码一致";
        return true;
    };
    input.onblur = function() {
        var password = document.getElementById("password").value.trim();
        var text = input.value.trim()
        if (!text) {
            input.style.borderColor = "#dd0007";
            tip.style.color = "#dd0007";
            tip.innerHTML = "内容不能为空！！！";
            return false;
        };
        if (text != password) {
            input.style.borderColor = "#dd0007";
            tip.style.color = "#dd0007";
            tip.innerHTML = "密码错误，请重新填写！！！";
            return false;
        };
        input.style.borderColor = "#85cb73";
        tip.style.color = "#85cb73";
        tip.innerHTML = "密码正确！！！";
        return true;
    };
};

var vaildationButton = function() {
    var button = document.getElementById("vaildation");
    var form = document.getElementsByTagName("form")[0];
    button.onclick = function() {
        for (var i in form) {
            if (i == form.length - 1) {
                alert("提交成功！！！");
                return true;
            };
            if (!form[i].onblur()) {
                alert("提交失败 ，请重新填写！！！");
                return false;
            };
        };
    };
};

window.onload = function() {
    var name = new Form("name", "必填，长度为4~16个字符", /^[A-Za-z0-9\u4e00-\u9fa5]{4,16}$/, true);
    var password = new Form("password", "必填，密码由大小写字母、数字组成", /^[A-Za-z0-9]+$/, true);
    var phone = new Form("phone", "选填，仅支持国内手机号", /^[0-9]{11}$/, false);
    var email = new Form("email", "选填", /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, false);
    vaildation(name);
    vaildation(password);
    vaildation(phone);
    vaildation(email);
    passwordVaildation();
    vaildationButton();
};