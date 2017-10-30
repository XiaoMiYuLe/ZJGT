// JScript 文件
function my$(obj) {
    return document.getElementById(obj);
}
function HideMessage(obj)  //隐藏弹出层
{
    var rootobj = my$(obj);
    if (rootobj != null)
        rootobj.style.display = "none";
}
function PropDiv(strURL, defaultwidth, defaultheight)//弹出层:数据源页面地址，初始宽度，初始高度；如果为0则自动调整大小
{
    var rootdiv = document.createElement('div');
    rootdiv.id = "rootdiv";
    rootdiv.style.position = "absolute";
    rootdiv.style.top = "0";
    rootdiv.style.left = "0";

    //  Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
    rootdiv.style.width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
    rootdiv.style.height = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
    //   rootdiv.style.width=Math.max(window.screen.width,document.body.clientWidth)+"px";
    //   rootdiv.style.height=Math.max(window.screen.height,document.documentElement.clientHeight)+"px";
    rootdiv.style.filter = "Alpha(opacity=50)";
    rootdiv.style.MozOpacity = '0.5';
    rootdiv.style.display = "block";
    rootdiv.style.backgroundColor = "#000000";
    rootdiv.style.zIndex = "1000";

    document.body.appendChild(rootdiv);

    var aa = document.createElement('div'); //onload=\"setSise('_iframe')\"
    aa.id = "showdiv";
    var iframe = "<iframe id='_iframe'  frameborder='0' scrolling='auto'  onload=\"setSise('_iframe'," + defaultwidth + "," + defaultheight + ")\"  src=\"" + strURL + "\"   ></iframe>";
    aa.innerHTML = iframe; //"<a hreft=\"#\" onclick=\"HidPropDiv()\" >test now</a>";
    document.body.appendChild(aa);
    aa.style.position = "absolute";

    // aa.style.left=(document.body.scrollWidth/2-aa.offsetWidth)+"px";
    aa.style.left = (document.body.scrollWidth - defaultwidth) / 2 + "px";
    aa.style.top = "100px";
    aa.style.backgroundColor = "#FFFFFF";
    aa.style.zIndex = rootdiv.style.zIndex + 1;
    aa.style.display = "block";
    aa.style.border = "solid 2px #ACD6EB";
    aa.style.padding = "0px";
    iereload("_iframe");
    HidSelect();
}
///自适应iframe尺寸
function setSise(id, w, h) {
    var obj = my$(id);
    if (obj != null) {
        obj.width = obj.contentWindow.document.body.scrollWidth;
        obj.height = obj.contentWindow.document.body.scrollHeight;


        if (w > 0)
            obj.width = w;
        if (h > 0)
            obj.height = h;

        //alert(obj.width+","+obj.contentWindow.document.body.scrollWidth);
        //alert(obj.height+","+obj.contentWindow.document.body.scrollHeight);
    }
    //obj.id=obj.id+"___";
}

function Estop(id) {
    if (document.getElementById("Estop")) {
        var objEstop = document.getElementById("Estop");
        objEstop.style.display = "";
        objEstop.style.width = document.documentElement.scrollWidth + 'px';
        objEstop.style.height = document.documentElement.scrollHeight + 'px';
    }
    else {
        var str = document.createElement("div");
        str.id = "Estop";
        str.style.position = "absolute";
        str.style.width = document.documentElement.scrollWidth + 'px';
        str.style.height = document.documentElement.scrollHeight + 'px';
        str.style.backgroundColor = "Black";
        str.style.zIndex = 10;
        str.style.top = "0";
        str.style.left = "0";
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            str.style.filter = "alpha(opacity=60)";
        }
        else {
            str.style.opacity = 0.6;
        }
        // document.body.appendChild(str);
        document.body.insertBefore(str, document.getElementById("aspnetForm"));
    }
    var obj = document.getElementById(id);
    var objTemp = obj;

    var width = obj.style.width;
    width = width.substr(0, width.length - 2);
    objTemp.id = id;
    objTemp.style.position = "absolute";
    objTemp.style.left = ((document.body.scrollWidth - width) / 2) + "px";
    objTemp.style.top = (document.documentElement.scrollTop + 150) + "px";
    objTemp.style.display = "block";
    obj.parentNode.removeChild(obj);
    HidSelect();
    document.getElementById("aspnetForm").appendChild(objTemp);

}

function removeEstop(id) {
    if (document.getElementById("Estop")) document.getElementById("Estop").style.display = "none";

    if (document.getElementById(id) != null) document.getElementById(id).style.display = "none";
    ShowSelect();
}

function HidSelect() {
    var selList = document.getElementsByTagName("SELECT");
    if (selList.length > 0) {
        for (var i = 0; i < selList.length; i++) {

            selList[i].style.display = "none";
        }
    }
}
function ShowSelect() {
    var selList = document.getElementsByTagName("SELECT");
    if (selList.length > 0) {
        for (var i = 0; i < selList.length; i++) {
            selList[i].style.display = "";
        }
    }
}
function HidPropDiv() {
    document.body.removeChild(my$("showdiv"));
    document.body.removeChild(my$("rootdiv"));
    ShowSelect();
}
function iereload(obj)//刷新iframe
{
    try {
        if (document.all) {
            my$(obj).contentWindow.location.reload();
        }
    } catch (ex) {
        alert(ex.description);
    }
}
function SetObjValue(Obj, txtvalue) {
    try {
        my$(Obj).value = txtvalue; //默认文本框
    } catch (e) {
        // alert(e.message);
    }
}
function setListboxValue(Obj, arrayvalue)//列表框
{
    var items = arrayvalue;
    var lboxInvoiceNume = document.getElementById(Obj);
    lboxInvoiceNume.options.length = 0;
    for (i = 0; i < items.length; i++) {
        lboxInvoiceNume.options.add(new Option(items[i], items[i], true, true));
    }

}
function freshshopcar(obj)//刷新购物车
{
    document.getElementById(obj).contentWindow.location.reload();
}

function SetHidentValue(hidobj, selectobj)//隐藏字段赋值
{
    var obj = my$(selectobj);
    my$(hidobj).value = "";
    for (i = 0; i < obj.options.length; i++) {
        if (obj.options[i].selected)
            my$(hidobj).value = my$(hidobj).value + obj.options[i].value + ",";
    }
    if (my$(hidobj).value.length > 0)
        my$(hidobj).value = my$(hidobj).value.substring(0, my$(hidobj).value.length - 1);
}

//////////////////
var G_StafferList; //联想出销售人员
var G_ClientList; //联想出客户

function Set_G_ClientList(oo) {
}
function Set_G_UserList(oo) {
}
function HideList()//隐藏列表
{
}

//带有updatapanel的弹出层chuli
function up_prop(id) {
    if (document.getElementById("Estop2")) {
        var objEstop = document.getElementById("Estop2");
        objEstop.style.display = "";
        objEstop.style.width = document.documentElement.scrollWidth + 'px';
        objEstop.style.height = document.documentElement.scrollHeight + 'px';
    }
    else {
        var str = document.createElement("div");
        str.id = "Estop2";
        str.style.position = "absolute";
        str.style.width = document.documentElement.scrollWidth + 'px';
        str.style.height = document.documentElement.scrollHeight + 'px';
        str.style.backgroundColor = "Black";
        str.style.zIndex = 10;
        str.style.top = "0";
        str.style.left = "0";
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            str.style.filter = "alpha(opacity=60)";
        }
        else {
            str.style.opacity = 0.6;
        }
        // document.body.appendChild(str);
        document.body.insertBefore(str, document.getElementById("aspnetForm"));
    }
    //my$(id).style.left=((document.body.offsetWidth-400)/2) + "px"; 
    var obj = my$(id);
    var objTemp = obj;

    var width = objTemp.style.width;
    width = width.substr(0, width.length - 2);
    objTemp.style.left = ((document.body.scrollWidth - width) / 2) + "px";
    objTemp.style.top = (document.documentElement.scrollTop + 150) + "px";
    objTemp.style.display = "block";
    obj.parentNode.removeChild(obj);
    HidSelect();
    document.getElementById("aspnetForm").appendChild(objTemp);

}
function rm_prop(id) {
    if (my$("Estop2") != null) my$("Estop2").style.display = "none";
    if (my$(id) != null) { my$(id).style.display = "none"; }
    ShowSelect();
}