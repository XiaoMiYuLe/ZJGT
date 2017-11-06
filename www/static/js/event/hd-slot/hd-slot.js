/* 新手标促复投 抽奖代码 20160408 */
var slot = window.slot || {};
slot = {
    data: {
        total: totaltimes,
        surplus: surpluscount,
        result :{},
        $ele : {},
        itemLenght : 0,
        start : 1,
        step : 1,
        end : null,
        stop : null,
        lock: false,
        blink : true,
        url : {
            get_times : "",
            lottery: "/ashx/Account/LotteryAshx.aspx?method=getlotterydata"
        },
        award : {
            "HB30"  : {    //30元红包
                item : 9,
                type : "redenv",
                value : 30
            },
            "HB50"  : {    //50元红包
                item : 2,
                type : "redenv",
                value : 50
            },
            "HB180" : {    //180元红包
                item : 5,
                type : "redenv",
                value : 180
            },
            "HB380" : {   //380元红包
                item : 12,
                type : "redenv",
                value : 380
            },
            "JXQ" : {    //加息券+0.5%
                item : 7,
                type : "voucher",
                value : 0.5
            },
            "JXQ1"  : {   //加息券+1%
                item : 10,
                type : "voucher",
                value : 1
            },
            "JXQ2"  : {    //加息券+1.5%
                item : 3,
                type : "voucher",
                value : 1.5
            },
            "HF10"  : {    //10元话费
                item : 6,
                type : "real",
                value : "10元话费",
                src : "/static/img/event/hd-slot/award/award-hf.png"
            },
            "SH"    : {    //小米手环
                item : 8,
                type : "real",
                value : "小米手环",
                src : "/static/img/event/hd-slot/award/award-sh.png"
            },
            "XJ"    : {    //富士拍立得
                item : 4,
                type : "real",
                value : "富士拍立得",
                src : "/static/img/event/hd-slot/award/award-xj.png"
            },
            "JHQ"   : {    //小米空气净化器
                item : 1,
                type : "real",
                value : "小米空气净化器",
                src : "/static/img/event/hd-slot/award/award-jhq.png"
            },
            "GWK"   : {    //京东购物卡100元
                item : 11,
                type : "real",
                value : "京东购物卡100元",
                src : "/static/img/event/hd-slot/award/award-gwk.png"
            }
        }
    },
    init : function (option) {
        if(!option){option = {};}

        slot.data.$ele.$wrap = option.$wrap ||  $(".hd-slot");
        slot.data.$ele.$item = option.$item ||  $(".hd-slot .item");
        slot.data.$ele.$btnGo = option.$btn || $(".hd-slot .btn-go");
        slot.data.$ele.$times = option.$times || $(".hd-slot .times");
        slot.data.$ele.$neonLight = option.$neon ||  $(".hd-slot .light");

        slot.data.itemLenght = slot.data.$ele.$item.length;

        this.bindEvent();
        this.neonLights();
    },
    bindEvent : function () {
        $(document).on("click", ".alert-slot .btn-close", function () {
            if ($(".alert-slot:visible").length == 1) {
                $(".alert-slot-mask").hide();
            }
            $(this).closest(".alert-slot").remove();
        });

        $(".hd-slot .btn-go").on("click", function () {
            if(slot.data.lock){return;}
            slot.run();

            slot.getResult();
            //setTimeout(function () {
            //    slot.data.result = {
            //        item: "HB30"
            //    }
            //    slot.stop(slot.data.result.item, function () {
            //        console.log("Animation is over");
            //        var result = slot.data.award[slot.data.result.item];
            //        result.times = "first";
            //        $(template("alert-win", result)).show().appendTo("body");
            //    })
            //}, 0);
        });
    },
    neonLights : function () {
        function loop(){
            slot.data.$ele.$neonLight.toggleClass("active");
            setTimeout(loop, 500);
        }
        loop();
    },
    getResult : function(){
        $.ajax({
            url: slot.data.url.lottery,
            timeout: 4 * 1000,
            cache: false,
            method: "POST",
            dataType: "json",
            success: function (data) {
                if (data && typeof data === "object") {
                    slot.data.total = parseInt(data.TotalCount, 10);
                    slot.data.surplus = parseInt(data.SurplusCount, 10);
                    slot.data.result.status = parseInt(data.checkstatus, 10);
                    slot.data.result.item = data.CodeType;

                    if (slot.data.result.status == 0) {
                        slot.data.blink = true;

                        slot.stop(slot.data.result.item, function () {
                            var result = slot.data.award[slot.data.result.item];
                            if (slot.data.total == 1) {
                                result.times = "first";
                            }

                            slot.data.$ele.$times.text(slot.data.surplus);

                            $(".alert-slot-mask").show();
                            $(template("alert-win", result)).appendTo("body");
                        });
                    } else {
                        slot.data.blink = false;
                        slot.data.result.item = null;

                        slot.stop(slot.data.result.item, function () {
                            slot.data.$ele.$item.removeClass("c");

                            slot.alert();
                        });
                    }
                }
            },
            error: function () {
                slot.data.blink = false;
                slot.data.result.item = null;

                slot.stop(slot.data.result.item, function () {
                    slot.data.$ele.$item.removeClass("c");

                    slot.alert();
                });
            }
        });
    },
    run : function () {
        var speed = 0;
        slot.data.lock = true;

        function loop() {
            slot.slotAni()
            speed = slot.aniSpeed();

            slot.data.step ++;
            if(!slot.data.end || slot.data.step <= slot.data.end) {
                slot.data.aniTimer = setTimeout(loop, speed);
            }else{
                slot.blink();
            }
        }
        loop();
    },
    stop: function (enditem, callback) {
        if (!enditem) {
            if (typeof callback === "function") {
                callback();
            }
            slot.reset();
            slot.data.start = slot.data.step = 1;
            return;
        }

        var end = slot.data.award[enditem].item;
        var diff = 0;
        var cur = slot.data.step % slot.data.itemLenght;

        if(cur >= end){
            diff = slot.data.itemLenght - (cur - end);
        }else{
            diff = end - cur;
        }

        slot.data.end = diff + slot.data.itemLenght * 2 + slot.data.step;
        if(typeof callback === "function"){
            slot.data.stop = callback;
        }
    },
    reset : function () {
        slot.data.start = slot.data.step = slot.data.end % slot.data.itemLenght;
        slot.data.end = null;
        slot.data.stop = null;
        slot.data.lock = false;
        slot.data.result = {};
        slot.data.blink = true;
        slot.data.$ele.$item.removeClass("c");
        clearTimeout(slot.data.aniTimer);
    },
    blink : function () {
        var step = 0;
        var index = slot.data.end % slot.data.itemLenght - 1;
        var $item = slot.data.$ele.$item.eq(index);

        slot.data.$ele.$item.removeClass("c");
        function loop() {
            $item.toggleClass("c");
            step ++;
            if(step < 40){
                setTimeout(loop, 30);
            }else{
                $item.addClass("c");
                slot.data.stop();
                slot.reset();
            }
        }
        if (slot.data.blink) {
            loop();
        } else {
            slot.data.stop();
            slot.reset();
        }
    },
    slotAni : function () {
        var index = slot.data.step % slot.data.itemLenght;
        index = index - 1;

        if(index < 0){
            index = slot.data.itemLenght - 1;
        }

        slot.data.$ele.$item.removeClass("c").eq(index).addClass("c");
    },
    aniSpeed : function () {
        var speed = 0;
        var step = slot.data.step - slot.data.start;

        switch (step){
            case 0:
                speed = 600;
                break;
            case 1:
                speed = 500;
                break;
            case 2:
                speed = 400;
                break;
            case 3:
                speed = 300;
                break;
            case 4:
                speed = 200;
                break;


            case slot.data.end - slot.data.start - 4:
                speed = 200;
                break;
            case slot.data.end - slot.data.start - 3:
                speed = 400;
                break;
            case slot.data.end - slot.data.start - 2:
                speed = 500;
                break;
            case slot.data.end - slot.data.start - 1:
                speed = 600;
                break;

            default:
                speed = 50;
        }
        return speed;
    },
    alert: function () {
        $(".alert-slot-mask").show();
        switch (slot.data.result.status) {
            case 1://失败
                $(template("alert-error", { title: " 啊哦~出错了！", message: "麻烦您稍后再来试试~" })).appendTo("body");
                break;
            case 2://未登录
                location.href = "/Login.aspx?returnurl=/Event/LotteryActivityShow.aspx";
                break;
            case 3://未开始
                $(template("alert-error", { title: "抱歉！", message: "活动还未开始哦~" })).appendTo("body");
                break;
            case 4://已结束
                $(template("alert-error", { title: "抱歉！", message: "活动已结束！" })).appendTo("body");
                break;
            case 5://投定期送2次机会
                $(template("alert-gettime", {})).appendTo("body");
                break;
            case 6://没机会
                if (slot.data.total == 0) {
                    $(template("alert-error", { title: "很抱歉！", message: "您不符合本次活动的参与条件哦~" })).appendTo("body");
                } else {
                    $(template("alert-error", { title: "抱歉！", message: "您的抽奖机会已经用尽~" })).appendTo("body");
                }
                break;
            case 7://配置错误
                $(template("alert-error", { title: " 啊哦~出错了！", message: "麻烦您稍后再来试试~" })).appendTo("body");
                break;
            case 8://送红包或加息券失败
                $(template("alert-error", { title: " 啊哦~出错了！", message: "麻烦您稍后再来试试~" })).appendTo("body");
                break;
            default://网络错误
                $(template("alert-error", { title: "抱歉！", message: "网络错误，请稍后重试~" })).appendTo("body");
        }
    },
}
