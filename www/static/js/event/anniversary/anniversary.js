$(function () {

    var popup = $('#popup');
    var inScroll = $(".invest-scroll");
    var inList = inScroll.find("ul");
    var timer = null;
    
    // 抽奖记录滚动模块
    var fnRolling = function () {
        
        $.ajax({
            url: "/ashx/Account/AnniversaryAshx.aspx?method=GetAwardList",
            method: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                
                clearInterval(timer);
                inList.html("").css("top", 0);

                for (var i = 0; i < data.length; i++) {
                    inList.append("<li>" + data[i].userName + "摇到了" + data[i].awardMoney + "元 </li>");
                }

                timer = setInterval(function () {
                    inList.animate({ 'top': -inScroll.height() }, 300, function () {
                        inList.append(inList.find("li:first-child"));
                        inList.css("top", 0);
                    });
                }, 2500);
            }
        });

        return arguments.callee;
    }();


    // 抽奖模块
    (function () {

        var isBegin = false;
        var inBtn = $('.invest-button');      
        var investP = $(".invest-p");         
        var userCont = null;                  // 用户总抽奖次数  

        // 点击状态
        inBtn.mousedown(function () { $(this).addClass('invest-button-on') });
        inBtn.mouseup(function () { $(this).removeClass('invest-button-on') });

        // 页面加载时判断总抽奖次数，显示投资字段
        $.ajax({
            url: "/ashx/Account/AnniversaryAshx.aspx?method=getLuckyDrawCount",
            method: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    data.totalCount != 10 ? investP.find(".sp-l").show() : investP.find(".sp-l").hide()
                    investP.find(".sp-n").text(data.count);
                    userCont = data.totalCount;
                }
                else {
                    investP.find(".sp-l").show();
                }
            }
        });

        inBtn.click(function () {

            // 是否登录
            if (IsLogin == "F") {
                alert('您未登录，请先登录后再进行抽奖，确定要立即登录吗？');
                window.parent.location.href = "/Login.aspx?returnurl=/Event/AnniversaryAct.aspx";
            }
            else {

                // 投资数到顶，并且抽奖次数已用完
                if (userCont == 10 && investP.find(".sp-n").text() == 0) {
                    popup.find(".pop_sorry").show().siblings().hide();
                    popup.fadeIn("fast");
                }
                // 投资次数未到顶，并且投资次数已用完
                else if (userCont < 10 && investP.find(".sp-n").text() == 0) {
                    popup.find(".pop_not").show().siblings().hide();
                    popup.fadeIn("fast");
                }
                // 投资次数未用完
                else {

                    if (isBegin) return false;
                    isBegin = true;

                    var u = 160;
                    var result = {}

                    $.ajax({
                        url: "/ashx/Account/AnniversaryAshx.aspx?method=doLuckyDraw",
                        method: "post",
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            switch (data.checkStatus) {
                                case "0":
                                case "6":
                                case "7":
                                    result = data;
                                    break;
                                case "1":
                                case "4":
                                case "5":
                                    alert("网络错误,请刷新后重试！");
                                    break;
                                case "2":
                                    window.parent.location.href = "/Login.aspx?returnurl=/Event/AnniversaryAct.aspx";
                                case "8":
                                    alert("抱歉，该活动不在活动时间内！");
                                    break;
                                default:
                                    alert("网络错误,请刷新后重试！");
                                    break;
                            }
                        }
                    });

                    var num_arr = result.awardMoney.toString().split('');

                    popup.find(".yuan").text(parseInt(result.awardMoney));
                    popup.find(".bfh").text(result.luckIndex + "%");

                    if (result.luckIndex == 100) {
                        popup.find(".text_b").hide().prevAll(".text_a").show();
                    }
                    else {
                        popup.find(".text_b").show().prevAll(".text_a").hide();
                    }

                    

                    $(".num-m").css('backgroundPositionY', 0);

                    $(".num-m").each(function (index) {
                        var _num = $(this);
                        setTimeout(function () {
                            _num.animate({
                                backgroundPositionY: (u * 60) - (u * num_arr[index])
                            }, {
                                duration: 6000 + index * 3000,
                                easing: "easeInOutCirc",
                                complete: function () {
                                    if (index == 3) {
                                        isBegin = false;
                                        popup.find(".pop_success").show().siblings().hide();
                                        popup.fadeIn("fast");
                                        investP.find(".sp-n").text(result.surplusCount);
                                    }
                                }
                            });
                        }, index * 300);
                    });

                }
            }
        });


    })();


    // 侧边栏
    (function () {
        var aA = [$('.anCont-3').offset().top, $('.anCont-4').offset().top];
        var slide = $('.anSlide');

        $(window).on("load scroll", function () {
            var win = $(window);
            win.scrollTop() > win.height() / 1.5 ? slide.fadeIn('fast') : slide.fadeOut('fast');
        });

        slide.on('click', 'li', function () {
            $('html,body').animate({ 'scrollTop': aA[$(this).index()] }, 300);
        });

        slide.find('li:last-child').css('border-bottom', 0);
    })();
    

    // 弹窗关闭 && 更新中奖纪录
    (function () {
        popup.find(".jsBtn").click(function () { popup.fadeOut('fast'); fnRolling(); });
    })();
    

});

