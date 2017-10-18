jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
//获取当前url参数值
function getUrlPara(paraName) {

    var _cpath = window.location.href;
    var _css = _cpath.indexOf('?');
    var url = "";
    if (_css > -1) { url = _cpath.substring(_css + 1); }
    var _jw = url.lastIndexOf('#');
    if (_jw > -1) { url = url.substring(0, _jw); }

    var sUrl = "?" + url;
    if (sUrl.indexOf(paraName) > -1) {
        var sReg = "(?:\\?|&){1}" + paraName + "=([^&]*)"
        var re = new RegExp(sReg, "gi");
        re.exec(sUrl);
        return RegExp.$1;
    }
    return "";
}