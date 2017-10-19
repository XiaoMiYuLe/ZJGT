$(function(){


	//四大优势
	$(".h-advantage li").mouseover(function(){
		$(this).find(".floor-one").stop().animate({"top":"80px"},400);
		$(this).find(".floor-two").stop().animate({"top":"0"},400);
	}).mouseout(function(){
		$(this).find(".floor-one").stop().animate({"top":"0"},400);
		$(this).find(".floor-two").stop().animate({"top":"80px"},400);
	});


	$(".in-main .content-a .cont-l").hover(function(){
		$(this).find(".arrow").stop().animate({"right":"10px"},"fast");
	},function(){
		$(this).find(".arrow").stop().animate({"right":"20px"},"fast");
	});

	//媒体报道
	$(".in-tab .tab-btn").on("click", "span", function () {
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".tab-cont li").eq(index).show().siblings().hide();
	});


	//投资排行
	var sdTabBtn = $(".slide-c .sd-tab-btn");
	var sdTabCont = $(".slide-c .sd-tab-cont");
	var moveDiv = sdTabBtn.find("div");


	sdTabBtn.on("click","span",function(){
	    var index = $(this).index();

	    if (index == 0) {
	        moveDiv.stop(false, true).animate({ "left": "0" }, "fast");
	    } else {
	        moveDiv.stop(false, true).animate({ "left": "50%" }, "fast");
	    }
		
		$(this).addClass("on").siblings().removeClass("on");
		sdTabCont.find('li').eq(index).show().siblings().hide();
	});


    //展开全部
	$(".pub-title .look-all").click(function () {
	    $(this).hide();
	    $(".in-partner .box").css("height", "auto");
	});


});
