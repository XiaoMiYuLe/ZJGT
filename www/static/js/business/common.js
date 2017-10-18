; (function ($) {
    $.fn.extend({
        //placeholder
        placeholder: function () {
            return this.each(function () {
                if (!('placeholder' in document.createElement('input'))) {
                    var input = $(this),
                        parent = input.parent(),
                        text = input.attr('placeholder'),
                        height = input.outerHeight(),
                        width = input.outerWidth(),
                        placeholder = $('<span class="phTips">' + text + '</span>');

                    if (text) {
                        if (parent.css("position") != "absolute") {
                            parent.css({ "position": "relative" });
                        }
                        var tipsPosition = input.offset(),
                            parentPosition = parent.offset();
                        var diffPosition = {
                            left: tipsPosition.left - parentPosition.left,
                            top: tipsPosition.top - parentPosition.top
                        }

                        placeholder.css({
                            'margin-left': '8px',
                            'width': width,
                            'height': height,
                            'line-height': height + "px",
                            'text-align': "left",
                            'position': 'absolute',
                            'color': "#cecfc9",
                            'font-size': "12px",
                            "left": diffPosition.left,
                            "top": diffPosition.top
                        });
                        placeholder.click(function () {
                            input.focus();
                        });
                        if (input.val() != "") {
                            placeholder.css({ display: 'none' });
                        } else {
                            placeholder.css({ display: 'inline' });
                        }
                        placeholder.insertAfter(input);
                        input.on("keyup blur", function () {
                            if ($(this).val() != "") {
                                placeholder.css({ display: 'none' });
                            } else {
                                placeholder.css({ display: 'inline' });
                            }
                        });
                    }
                }
            })
        }

    })
})(jQuery);

//城市二级联动菜单
function citymap(option) {
    var map = window.mapdata;
    var $pro = option.$province;
    var $city = option.$city;
    if (!map || !$pro || !$city || $pro.length == 0 || $city.length == 0) { return; }
    var _tpl = '<option value="{mapid}" {selected}>{mapname}</option>';
    var _pro = "";
    var _city = "";
    var $proid = 1;

    if (option.init) {
        var $initProName = option.init[0];
        var $initCityName = option.init[1];
    }

    $.each(map.province, function (index, value) {
        var selected = "";
        if ($initProName && $initProName == value.ProName) {
            selected = "selected=\"selected\"";
            $proid = value.ProID;
        }
        _pro += _tpl.replace("{mapid}", value.ProID).replace("{mapname}", value.ProName).replace("{selected}", selected);
    });
    $pro.html(_pro);

    $.each(map.city, function (index, value) {
        if (value.ProID == $proid) {
            var selected = "";
            if ($initCityName && $initCityName == value.CityName) {
                selected = "selected=\"selected\"";
            }
            _city += _tpl.replace("{mapid}", value.CityID).replace("{mapname}", value.CityName).replace("{selected}", selected);
        }
    });
    $city.html(_city);

    $pro.off("change").on("change", function () {
        var $proid = $(this).val();
        _city = "";

        $.each(map.city, function (index, value) {
            if (value.ProID == $proid) {
                _city += _tpl.replace("{mapid}", value.CityID).replace("{mapname}", value.CityName).replace("{selected}", "");
            }
        });

        $city.html(_city);
    });
}


//获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//选项卡切换
var tabChange = function (options) {
    var self = this, opts = [];
    this.init = function () {
        opts = {
            tab: options.tab,
            con: options.con,
            current: options.current,
            mouseEvent: options.mouseEvent == undefined ? "click" : options.mouseEvent.toLowerCase()
        }
        opts.tab.on(opts.mouseEvent, function () {
            var that = this;
            function extendFun() {
                self.changeCon(that)
            }
            if (opts.mouseEvent !== "click") {
                var timeDelay = setTimeout(extendFun, 200);
                $(that).mouseleave(function () { clearTimeout(timeDelay) })
            } else {
                extendFun()
            }
        })
    }
    this.changeCon = function (obj) {
        var index = opts.tab.index($(obj));
        opts.tab.removeClass(opts.current)
        $(obj).addClass(opts.current);
        opts.con.hide().eq(index).show();
    }
    this.init();
}
//按钮选中
var btnFocus = function (options) {
    var opts = [];
    this.init = function () {
        opts = {
            btn: options.btn,
            current: options.current,
            multiple: options.multiple || false
        }
        opts.btn.click(function () {
            if (opts.multiple) {
                $(this).toggleClass(opts.current);
            } else {
                opts.btn.removeClass(opts.current);
                $(this).addClass(opts.current);
            }
        })
    }
    this.init();
}

$(function () {
    $(":input[placeholder]").placeholder();

    $(".side-menu dl > dt").on("click", function () {
        var $this = $(this);
        var $wrap = $this.parents("dl");
        var $item = $this.siblings("dd");

        if ($wrap.hasClass("cur")) { return; }
        $wrap.siblings("dl.cur").find("dd").slideUp();
        $wrap.addClass("cur").siblings("dl").removeClass("cur");
        $item.slideToggle();
    });
    $(".side-menu dd").each(function () {
        var $this = $(this);
        if ($this.hasClass("cur")) {
            $this.closest("dl").find("dt").trigger("click");
            return;
        }
    });
});