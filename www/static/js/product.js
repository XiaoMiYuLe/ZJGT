$(function () {

    // 投资框
    (function () {

        var invest = $("#invest-window");
        var txtMaxLilv = $("#txtMaxLilv");                      // 年化收益
        var hidLendLeast = $("#hidLendLeast").val();            // 起投金额
        var hidIncreaseMoney = $("#hidIncreaseMoney").val();    // 递增金额
        var txtInvestMoney = $("#txtInvestMoney");              // 投资金额框
        var txtProductResidualAmount = $("#txtProductResidualAmount").text();       // 剩余金额
        if ($("#syDanWei").html() == "&nbsp;&nbsp;万元") {
            txtProductResidualAmount *= 10000;
        }

        var spnErrByInvestMoney = $("#spnErrByInvestMoney");    // 状态提示
        var text_a = spnErrByInvestMoney.find(".text-a");       // 收益提示
        var text_b = spnErrByInvestMoney.find(".text-b");       // 错误信息提示
        var sp_b = spnErrByInvestMoney.find(".sp-b");           // 投资金额
        var sp_c = spnErrByInvestMoney.find(".sp-c");           // 收益


        var moneys = 0;                                         // 输入投资额
        var days = parseInt($("#hidMaxDay").val());             // 默认最大天数
        var bool_money = false;                                 // 金额是否勾选
        var bool_day = true;                                    // 已给默认天数
        var json = {};


        invest.find(".days a:last").addClass("tick");
        txtInvestMoney.val(10000);
        checkTypeInvestMoney();


        // 1. 天数选择
        invest.find(".days").on("click", "a", function () {
            var oval = days = parseInt($(this).text());

            txtMaxLilv.text($("#hid" + days).val());

            $("#iMax").remove();    // 当选择天数时移除最高文字

            if (!$(this).is(".tick")) {
                $(this).addClass("tick").siblings().removeClass("tick");
                bool_day = true;
            }
            else {
                $(this).removeClass("tick")
                bool_day = false;
            }
            bool_day && text_b.text("");
            checkTypeInvestMoney();
            fmoney();
            fnEarnings();

        });


        // 2. 文本框输入
        txtInvestMoney.keyup(function () {
            checkTypeInvestMoney();
        });


        // 3. 立即投资
        $("#invest-submit").click(function () {
            if (!bool_day) {
                spnErrByInvestMoney.show();
                text_b.text("请选择天数！");
            }
            else if (!bool_money) {
                spnErrByInvestMoney.show();
                text_b.text("请填写投资数额！");
            }
            else {
                text_b.text("");
                $.ajax({
                    type: "POST",
                    url: "RequestData.ashx",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(GetJsonData()),
                    dataType: "json",
                    success: function (message) {
                        if (message > 0) {
                            alert("请求已提交！我们会尽快与您取得联系");
                        }
                    },
                    error: function (message) {
                        $("#request-process-patent").html("提交数据失败！");
                    }
                });
                function GetJsonData() {
                    var json = {
                        "投资天数": days,
                        "投资数额": moneys
                    };
                    return json;
                }
            }
        });


        // 4. 投资金额加减按钮
        (function () {

            var investment = $(".investment");
            var aBtns = investment.find(".butn");

            aBtns.click(function () {

                var money = parseInt(txtInvestMoney.val() == "" ? 0 : txtInvestMoney.val());

                if ($(this).is(".minus")) {
                    money <= parseInt(hidIncreaseMoney) ? txtInvestMoney.val(0) : txtInvestMoney.val(money - parseInt(hidIncreaseMoney));
                }
                else {
                    txtInvestMoney.val(money + parseInt(hidIncreaseMoney));
                }

                checkTypeInvestMoney();

            });

        })();


        // 条件判断
        function checkTypeInvestMoney() {

            try {
                var oval = txtInvestMoney.val().replace(/\D/g, '');
                txtInvestMoney.val(oval);


                if (!bool_day) {
                    text_a.hide();
                    text_b.show().text("请选择天数！");
                }
                else if (oval == '') {
                    text_a.hide();
                    text_b.show().text("最少" + hidLendLeast + "元起投，递增金额为" + hidIncreaseMoney + "的整数倍！");
                }
                else if (oval < parseFloat(hidLendLeast)) {

                    text_a.hide();
                    text_b.show().text("最低投标金额：￥" + hidLendLeast + "元！");
                    oval = 0;
                }
                else if (oval > parseFloat(txtProductResidualAmount)) {

                    text_a.hide();
                    text_b.show().text("超过剩余金额：￥" + fmoney(txtProductResidualAmount) + "元！");
                    oval = 0;
                }
                else if (parseFloat(oval) % parseInt(hidIncreaseMoney) != 0) {

                    text_a.hide();
                    text_b.show().text("必须以金额：￥" + hidIncreaseMoney + "元递增！");
                    oval = 0;
                }
                else {
                    text_b.hide().text("");
                    text_a.show();

                    moneys = oval;
                    bool_money = true;
                    sp_b.text(fmoney(oval));
                    fnEarnings();

                }
            } catch (e) {

            }
            


        }

        // 利率计算
        function fnEarnings() {
            sp_c.text((parseFloat(moneys) * parseFloat(txtMaxLilv.text()) / 100 * parseFloat(days) / 360).toFixed(2));
        }

        // 金额分割
        function fmoney(s, n) {
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
            t = "";
            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        }


    })();


    //弹窗
    var pop = $("#pro-popop");
    var img = $(".pro-cont .img");
    var oUl = pop.find(".img-container ul");
    var prev = pop.find(".prev");
    var next = pop.find(".next");
    var close = pop.find(".pop-close");

    img.on("click", "span", function () {

        pop.show();
        var oParent = $(this).parent();
        var aImg = oParent.find("img");
        var sStr = "";
        var aSrc = [];

        for (var i = 0; i < aImg.length; i++) aSrc.push(aImg.eq(i).attr("src"));
        for (var i = 0; i < aImg.length; i++) sStr += "<li><img src='" + aSrc[i] + "'></li>";
        oUl.html(sStr);
        var index = $(this).index();
        var bigLi = oUl.find("li");
        var bigImgWidth = bigLi.width();
        oUl.width(bigImgWidth * bigLi.length);
        oUl.css("left", -index * bigImgWidth);

        next.click(function () {
            index++;
            index > bigLi.length - 1 && (index = 0);
            oUl.stop().animate({ left: -index * bigImgWidth }, "slow");
        });

        prev.click(function () {
            index--;
            index < 0 && (index = bigLi.length - 1);
            oUl.stop().animate({ left: -index * bigImgWidth }, "slow");
        });

        close.click(function () {
            pop.hide();
            oUl.html("");
        });
    });

});