var timer1;

function changeToolTip(idx, msga) {
    $("#" + idx).removeClass("valid");
    $("#" + idx).removeClass("valid-error");

    if (arguments.length > 2 && arguments[2].length > 0) {
        $("#" + idx).addClass("valid");
        $("#" + idx).css("color", arguments[2]);
    } else {
        $("#" + idx).addClass("valid-error");
        $("#" + idx).css("color", "Red");
    }
    $("#" + idx).html(msga);
    $("#" + idx).show();
};

function valUserName(reg_userName) {

    var count = 1;

    //var reg1 = /^[A-Za-z]\w+$/; 
    var reg1 = /[^\u4E00-\u9FA5^a-z^A-Z^0-9]/g; // /[^a-zA-Z0-9u4E00-\u9FA5]/g;
    if (reg_userName.length == 0) {
        if (arguments[1] != '0') {
            changeToolTip('spanUserName', "请填写用户名");
        } else {
            aBox("请填写用户名");
        }
        count = 1;
    } else if (reg_userName.length < 5) {
        if (arguments[1] != '0') {
            changeToolTip('spanUserName', "用户名需由5-15个数字和字母以及中文字符组成");
        } else {
            aBox("用户名需由5-15个数字和字母以及中文字符组成");
        }
        count = 1;
    } else if (reg1.test(reg_userName)) {
        if (arguments[1] != '0') {
            changeToolTip('spanUserName', "用户名需由5-15个数字和字母以及中文字符组成");
        } else {
            aBox("用户名需由5-15个数字和字母以及中文字符组成");
        }
        count = 1;
    } else {
        $.ajax({
            url: "Inc/Users.ashx",
            type: "POST",
            data: "abc=ExistsUserName&UserName=" + escape(reg_userName),
            async: false,
            success: function (msg) {
                if (msg == "True") {
                    if (valUserName.arguments[1] != '0') {

                        changeToolTip('spanUserName', "用户名已存在");
                    } else {
                        aBox("用户名已存在");
                    }
                    count = 1;
                } else {
                    if (valUserName.arguments[1] != '0') {
                        changeToolTip('spanUserName', "用户名注册成功不能修改", "#000000");
                    } else {
                        aBox("用户名注册成功不能修改");
                    }
                    count = 0;
                }
            }
        });
    }
    if (count == 0) {
        return true;
    } else {
        return false;
    }
}

function aBox(msg) {
    if (typeof dialogBoxRoot != 'undefined') {
        dialogBoxRoot('温馨提示', msg);
    }
}

function valMobile(reg_tel) {
    var count = 0;

    var reg1 = /^1[3,4,5,7,8,9]\d{9}$/g;
    var reg2 = /^15[8,9]\d{8}$/g;
    if (reg_tel.length == 0) {
        if (arguments[1] != '0') {
            changeToolTip('spantel', "请填写手机号码");
        } else {
            aBox("请填写手机号码");
        }
        count = 1;
    } else if (!reg1.test(reg_tel) && !(reg2.test(reg_tel))) {
        if (arguments[1] != '0') {
            changeToolTip('spantel', "请正确输入手机号码");
        } else {
            aBox("请正确输入手机号码");
        }
        count = 1;
    } else {
        $.ajax({
            url: "/Inc/Users.ashx",
            type: "POST",
            data: "abc=ExistsMobile&moblie=" + reg_tel,
            async: false,
            success: function (msg) {
                //callbackMobile(msg);
                if (msg == "True") {
                    if (valMobile.arguments[1] != '0') {
                        changeToolTip('spantel', "手机号码已存在");
                    } else {
                        aBox("手机号码已存在");
                    }
                    count = 1;
                } else {
                    if (valMobile.arguments[1] != '0') {
                        changeToolTip('spantel', "该手机号码可用", '#000000');
                    }
                    count = 0;
                }
            }
        });
    }

    if (count == 0) {
        return true;
    } else {
        return false;
    }
}

function callbackMobile(msg) {
    if (msg == "True") {
        if (valMobile.arguments[1] != '0') {
            changeToolTip('spantel', "手机号码已存在");
        } else {
            aBox("手机号码已存在");
        }
        count = 1;
    } else {
        if (valMobile.arguments[1] != '0') {
            changeToolTip('spantel', "该手机号码可用", '#000000');
        }

        count = 0;
    }

}

function valRecommCode(reg_RecommCode) {
    var count = 0;
    $.ajax({
        url: "/Inc/Users.ashx",
        type: "POST",
        data: "abc=ExistsRecommCode&RecommCode=" + reg_RecommCode,
        async: false,
        success: function (msg) {
            if (msg == "True") {
                if (valRecommCode.arguments[1] != '0') {
                    changeToolTip('spanRecommCode', "该推荐码可用", '#000000');
                }
                count = 0;
            } else {
                if (valRecommCode.arguments[1] != '0') {
                    changeToolTip('spanRecommCode', "推荐码不正确");
                } else {
                    aBox("推荐码不正确");
                }
                count = 1;
            }
        }
    });
    if (count == 0) {
        return true;
    } else {
        return false;
    }
}


function valPasswd(reg_pw, spnErrObj) {
    var count = 0;
    if (reg_pw.length < 6) {
        if (arguments[1] != '0') {
            spnErrObj.removeClass("valid");
            spnErrObj.removeClass("valid-error");
            spnErrObj.addClass("valid-error");
            spnErrObj.css("color", "Red");
            spnErrObj.html("密码长度不够");
            spnErrObj.show();
        } else {
            aBox("密码长度不够");
        }
        count = 1;
    } else if (/^\d+$/g.test(reg_pw)) {
        if (arguments[1] != '0') {
            spnErrObj.removeClass("valid");
            spnErrObj.removeClass("valid-error");
            spnErrObj.addClass("valid-error");
            spnErrObj.css("color", "Red");
            spnErrObj.html("密码必须是数字加字符形式");
            spnErrObj.show();
        } else {
            aBox("密码必须是数字加字符形式");
        }
        count = 1;
    } else {
        if (/[a-zA-Z]+/.test(reg_pw) && /[0-9]+/.test(reg_pw) && /\W+\D+/.test(reg_pw)) {
            if (arguments[1] != '0') {
                spnErrObj.removeClass("valid");
                spnErrObj.removeClass("valid-error");
                spnErrObj.addClass("valid");
                spnErrObj.css("color", "#000000");
                spnErrObj.html("密码强度很强");
                spnErrObj.show();
            } else {
                aBox("密码强度很强");
            }
            count = 0;
        } else if (/[a-zA-Z]+/.test(reg_pw) || /[0-9]+/.test(reg_pw) || /\W+\D+/.test(reg_pw)) {
            if (/[a-zA-Z]+/.test(reg_pw) && /[0-9]+/.test(reg_pw)) {
                if (arguments[1] != '0') {
                    spnErrObj.removeClass("valid");
                    spnErrObj.removeClass("valid-error");
                    spnErrObj.addClass("valid");
                    spnErrObj.css("color", "#000000");
                    spnErrObj.html("密码强度一般");
                    spnErrObj.show();
                } else {
                    aBox("密码强度一般");
                }
                count = 0;
            } else if (/\[a-zA-Z]+/.test(reg_pw) && /\W+\D+/.test(reg_pw)) {
                if (arguments[1] != '0') {
                    spnErrObj.removeClass("valid");
                    spnErrObj.removeClass("valid-error");
                    spnErrObj.addClass("valid");
                    spnErrObj.css("color", "#000000");
                    spnErrObj.html("密码强度一般");
                    spnErrObj.show();
                } else {
                    aBox("密码强度一般");
                }
                count = 0;
            } else if (/[0-9]+/.test(reg_pw) && /\W+\D+/.test(reg_pw)) {
                if (arguments[1] != '0') {
                    spnErrObj.removeClass("valid");
                    spnErrObj.removeClass("valid-error");
                    spnErrObj.addClass("valid");
                    spnErrObj.css("color", "#000000");
                    spnErrObj.html("密码强度一般");
                    spnErrObj.show();
                } else {
                    aBox("密码强度一般");
                }
                count = 0;
            } else {
                if (arguments[1] != '0') {
                    spnErrObj.removeClass("valid");
                    spnErrObj.removeClass("valid-error");
                    spnErrObj.addClass("valid");
                    spnErrObj.css("color", "#000000");
                    spnErrObj.html("密码强度很弱");
                    spnErrObj.show();
                } else {
                    aBox("密码强度很弱");
                }
                count = 0;
            }
        }
    }

    if (count == 0) {
        return true;
    } else {
        return false;
    }
}

function valPasswdRepeat(reg_pw_original, reg_pw_current) {
    var count;
    if (reg_pw_current.length == 0) {
        if (arguments[2] != '0') {
            changeToolTip('spanRelPass', "请输入密码");
        } else {
            aBox("请输入密码");
        }
        count = 1;
    } else if (reg_pw_original == reg_pw_current) {
        if (arguments[2] != '0') {
            $("#spanRelPass").removeClass("valid");
            $("#spanRelPass").removeClass("valid-error");
            $("#spanRelPass").addClass("valid");
            $("#spanRelPass").html("&nbsp;");
            $("#spanRelPass").show();
        }

        count = 0;
    } else {
        if (arguments[2] != '0') {
            $("#spanRelPass").removeClass("valid");
            $("#spanRelPass").removeClass("valid-error");
            $("#spanRelPass").addClass("valid-error");
            $("#spanRelPass").css("color", "Red");
            $("#spanRelPass").html("您输入的密码不一致");
            $("#spanRelPass").show();
        } else {
            aBox("您输入的密码不一致");
        }
        count = 1;
    }

    if (count == 0) {
        return true;
    } else {
        return false;
    }
}

function valVerification(reg_verification) {
    var count;

    if (reg_verification.length == 0) {
        if (arguments[1] != '0') {
            $("#spanCode").removeClass("valid");
            $("#spanCode").removeClass("valid-error");
            $("#spanCode").addClass("valid-error");
            $("#spanCode").css("color", "Red");
            $("#spanCode").html("请填写验证码");
            $("#spanCode").show();
        } else {
            aBox("请填写验证码");
        }
        count = 1;
    } else if (reg_verification == getCookie("code")) {
        if (arguments[1] != '0') {
            $("#spanCode").removeClass("valid");
            $("#spanCode").removeClass("valid-error");
            $("#spanCode").addClass("valid");
            $("#spanCode").html("&nbsp;");
            $("#spanCode").show();
        }
        count = 0;
    } else {
        if (arguments[1] != '0') {
            $("#spanCode").removeClass("valid");
            $("#spanCode").removeClass("valid-error");
            $("#spanCode").addClass("valid-error");
            $("#spanCode").css("color", "Red");
            //WTZ
            //$("#spanCode").html("验证码错误3");
            $("#spanCode").html("验证码错误");
            $("#spanCode").show();
            $("#reg_verification_img").attr("src", "http://www.zjgt.com/Inc/CheckCode.aspx?id=" + Math.random());
        } else {
            aBox("验证码错误");
        }
        count = 1;
    }

    if (count == 0) {
        return true;
    } else {
        return false;
    }
}

function valValidateCode() {
    var count = 1;

    var mobile = $('#reg_tel2').text();
    var reg_input = $("#reg_verification2").val();
    if (reg_input.length == 0) {
        $("#spnVerification").removeClass("valid");
        $("#spnVerification").removeClass("valid-error");
        $("#spnVerification").addClass("valid-error");
        $("#spnVerification").css("color", "Red");
        //WTZ
        //$("#spnVerification").html("验证码错误01");
        $("#spnVerification").html("验证码错误");
        $("#spnVerification").show();
        count = 1;
    } else {
        $.ajax({
            type: "POST",
            url: "http://www.zjgt.com/ashx/GetSmsHandler.ashx?type=getchecksms",
            data: {
                'mobile': mobile,
                'code': reg_input
            },
            async: false,
            success: function (data) {
                if (data == "1") {
                    $("#spnVerification").removeClass("valid");
                    $("#spnVerification").removeClass("valid-error");
                    $("#spnVerification").addClass("valid");
                    $("#spnVerification").html("&nbsp;");
                    $("#spnVerification").show();
                    count = 0;
                } else {
                    $("#spnVerification").removeClass("valid");
                    $("#spnVerification").removeClass("valid-error");
                    $("#spnVerification").addClass("valid-error");
                    $("#spnVerification").css("color", "Red");
                    //WTZ
                    //$("#spnVerification").html("验证码错误1");
                    $("#spnVerification").html("验证码错误");
                    $("#spnVerification").show();
                    count = 1;
                }
            }
        });
    }

    if (count == 0) {
        return true;
    } else {
        return false;
    }
}

$(function () {
    $("#aValidateCode").click(function () {

        var e = window.event || arguments[0];
        e.preventDefault ? e.preventDefault() : e.returnValue = false

        var reg1 = /^1[3,4,5,7,8]\d{9}$/g;
        var reg2 = /^15[8,9]\d{8}$/g;

        var mobileObj = $(this).attr("obj1");
        var sf = $(this).attr("obj2");
        var ac = $(this).attr("obj3");
        if (mobileObj.length < 4) {
            return false;
        }
        if (!reg1.test(mobileObj) && !reg2.test(mobileObj)) {
            return false;
        } else {
            $("#aValidateCode").hide("slow");
            $("#spnValidateCodeTime").show("slow");
            $("#spnValidateCodeTime").html("1分钟重新获取");
            $("#spnValidateCodeTime").attr("obj", "60");
            timer1 = setInterval(ChangeTime, 1000);
            $("#spnValidateCodeMsg").show("slow");
            $("#spnValidateCodeMsg").html("验证码已发送到您的手机，请查收");

            $.ajax({
                type: "POST",
                url: $(this).attr("obj"),
                contentType: "application/json; charset=utf-8",
                data: "{'mobile':'" + $(this).attr("obj1") + "','sf':'" + sf + "','ac':'" + ac + "'}",
                async: true,
                dataType: "json",
                success: function (data) {
                    if (data.d != "0") {
                        //$("#reg_verification2").val(data.d);
                        $("#hdIds").val(data.d);
                    }
                }
            });
        }
    });

    //$("#ServiceAgreementDiv").dialog({
    //    autoOpen: false,
    //    minHeight: 460,
    //    width: 880,
    //    modal: true,
    //    closeOnEscape: true
    //});

    //$("#reg_clause").click(function () {
    //    $("#ifmAgreement").attr("src", "safety/register_saft.aspx");
    //    $("#ServiceAgreementDiv").dialog("open");
    //});
});

function ChangeTime() {
    var second = parseInt($("#spnValidateCodeTime").attr("obj"));
    if (second > 0) {
        second = second - 1;
        $("#spnValidateCodeTime").html(second + "秒重新获取");
        $("#spnValidateCodeTime").attr("obj", second);
    }

    if (second <= 20) {
        $("#spnValidateCodeMsg").hide("slow");
    }

    if (second == 0) {
        $("#aValidateCode").show("slow");
        $("#spnValidateCodeTime").hide("slow");
        clearInterval(timer1);
    }
}