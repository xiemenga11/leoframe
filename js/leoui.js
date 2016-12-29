(function(w){
	var diag = l(".leo-ui-diag-box");
	if(!diag.length){
		var dw = parseFloat(diag.css("width")),
			dh = parseFloat(diag.css("height")),
			sw = screen.width,
			sh = screen.height;
		
		diag.css({
			left:(sw-dw)/2+"px",
			top:(sh-dh)/2+"px"
		})		
		drag(diag)
	}else{
		diag.each(function(i){
			this.style.zIndex = i;
			drag(this);
		})
	}
	function drag(obj){
		obj.onmousedown = function(e){
			this.style.position = "fixed";
			this.style.zIndex +=2;
			var e = e || event;
			var sx = e.clientX,
				sy = e.clientY,
				dx = this.offsetLeft,
				dy = this.offsetTop,
				This = this;
			document.onmousemove = function(e){
				var e = e || event;
				This.style.left = dx + e.clientX - sx + "px";
				This.style.top = dy + e.clientY - sy + "px";
			}
		}
		obj.onmouseup = function(){
			document.onmousemove = null;
		}
	}
}(window))