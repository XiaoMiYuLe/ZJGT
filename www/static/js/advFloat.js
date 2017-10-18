var D = new Function('obj', 'return document.getElementById(obj);')
function htmlbody() {
    return (
     document.documentElement.clientHeight <= document.body.clientHeight
     && document.documentElement.clientHeight != 0
    )
    ? document.documentElement : document.body;
}
//浏览器滚动条位置
function scrollLeft() { return (!window.pageYOffset) ? htmlbody().scrollLeft : window.pageXOffset; }
function scrollTop() { return (!window.innerHeight) ? htmlbody().scrollTop : window.pageYOffset; }

//实际应距左距离
function getleft(strobjs, strLeftType, strleft) {
    var temp_getleft = 0;
    if (strLeftType == "left") {
        temp_getleft = scrollLeft() * 1 + strleft * 1;
    } else if (strLeftType == "mid") {
        (strleft * 1 < 0)
        ? temp_getleft = scrollLeft() * 1 + strleft * 1
        + htmlbody().clientWidth * 1 / 2 - strobjs.offsetWidth * 1
        : temp_getleft = (scrollLeft() * 1 + strleft * 1 + htmlbody().clientWidth * 1 / 2);
    } else if (strLeftType == "right") {
        temp_getleft
        = scrollLeft() * 1 + htmlbody().clientWidth * 1
        - strleft * 1 - strobjs.offsetWidth * 1;
    }
    return temp_getleft;
}

function moveTips(strobj, theTop, theLeft, theLeftType) {
    var old, nowobj = D(strobj);
    var nowleft = nowobj.style.left.replace("px", "") * 1;//返回在改变窗口大小或移动横滚动条前的距左部距离（数值）
    var temp_left = getleft(nowobj, theLeftType, theLeft);//实际应距左距离
    var re_theTop = theTop;
    if (temp_left != nowleft) {//横向递增
        (Math.abs(temp_left - nowleft) > 3 && Math.abs(temp_left - nowleft) < 600)
         ? ((temp_left > nowleft) ? nowleft += Math.abs(temp_left - nowleft) / 5
         : nowleft -= Math.abs(temp_left - nowleft) / 5)
         : nowleft = temp_left;
        nowobj.style.left = nowleft + "px";
    }
    if (!openweb) { old = re_theTop; var openweb; }/*这是默认高度*/;
    var pos, tt = 50;
    pos = scrollTop() * 1 - nowobj.offsetTop * 1 + re_theTop * 1;
    pos = nowobj.offsetTop + pos / 10;//纵向开始递增
    if (pos < re_theTop) pos = re_theTop;
    if (pos != old) { nowobj.style.top = pos + "px"; tt = 5; }
    old = pos;
    setTimeout("moveTips('" + strobj + "','" + theTop + "','" + theLeft + "','" + theLeftType + "')", tt);
}