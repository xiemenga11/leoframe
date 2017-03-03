(function(w){
	var leoFocus = {};
	leoFocus.construct = function(focusbox){
		var imgs = l(focusbox+" .imgBox[0] img"),
			imgBox = l(focusbox+" .imgBox[0]"),
			focusBox = l(focusbox),
			focusBoxWid = focusBox.offset("width");
			//图片盒子宽度
			imgBox.css({
				width : imgs.dom.length * focusBoxWid + "px"
			})
			//图片宽度
			imgs.each(function(){
				l(this).css({
					width : focusBoxWid + "px"
				})
			})	
	}
	leoFocus.construct("#leoFocus")
}(window))