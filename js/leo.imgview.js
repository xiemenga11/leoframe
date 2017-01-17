l.imgview = function(imgs){
	var index = 0,
		imgList = [],
		imgs = imgs || "img";
	l(imgs).each(function(i){
		imgList[i] = this.src;
		this.index = i;
		this.listen("click",function(){
			l("body").css({overflow:"hidden"});
			index = this.index; 
			var css = {
					   		backgroundColor:"rgba(0,0,0,0.5)",
					   		color:"white",
					   		color:"white",
					   		fontSize:"30px",
					   		fontWeight:"bold",
					   		padding:"0 20px",
					   		cursor:"pointer",
					   		position:"fixed",
					   		top:0
					   },
				mask = l("body").mask({
					inner:"",
					event:{
						click:function(){
							this.parent.css({overflow:"scroll"})
							this.parent.removeChild(this)
						}
					}
				}),
				img = mask.addElement("img")
					  .attr({
					  	src:this.src
					  })
					  .css({
					  	height:l.hei+"px",
					  	maxWidth:l.wid+"px"
					  }),
				btnL = mask.addElement("div")
					   .css(css)
					   .css({left:0})
					   .html("<")
					   .listen("click",function(e){
					   		// var e = e || event;
					   		l.noBubble(e);
					   		if(index > 0){
					   			index--;
					   		}
					   		img.src = imgList[index];
					   })
				btnR = mask.addElement("div")
					   .css(css)
					   .css({right:0})
					   .html(">")
					   .listen("click",function(e){
					   		// var e = e || event;
					   		l.noBubble(e);//阻止冒泡
					   		if(index < imgList.length-1){
					   			index++;
					   		}
					   		img.src = imgList[index];
					   })
			
		})
	})
}