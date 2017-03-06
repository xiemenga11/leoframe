(function(){
	var picBox = l("#picBox"),
		myFocus = l("#myFocus"),
		FWid = myFocus.css('width').toInt(),
		ctrs = l("#ctrBox a"),
		prev = l("#arrowL"),
		next = l("#arrowR"),
		interval = 30,
		timer,
		mainLoop,
		speed = 100	


	mainLoop = setInterval(function(){
		flip(1)
	},3000)
	myFocus.hover(function(){
		clearInterval(mainLoop)
	}).out(function(){
		mainLoop = setInterval(function(){
			flip(1)
		},3000)
	})
	function flip(d,ind){
		var newLeft = d > 0 ? picBox.css("left").toInt() - FWid : picBox.css("left").toInt() + FWid
		if(ind || l.isNumber(ind)){
			newLeft = -1 * (ind + 1) * FWid
		}
		timer = setInterval(function(){
			var dir = d > 0 ? picBox.css('left').toInt() > newLeft : picBox.css('left').toInt() < newLeft
			if(dir){
				picBox.css({
					left:picBox.offset('left') - speed * d + 'px'
				})
			}else{
				if(newLeft <= -5000){
					picBox.css({left:'-1000px'})
				}else if(newLeft >= 0){
					picBox.css({left:'-4000px'})
				}else{
					picBox.css({left:newLeft + 'px'})
				}
				var ind = Math.abs(picBox.css('left').toInt() / FWid)
				index(ind-1)
				clearInterval(timer)
			}
		},interval)
	}

	//指针
	function index(index){
		var Cls
		ctrs.each(function(i){
			if(i == index){
				Cls = 'ctr-active'
			}else{
				Cls = 'ctr'
			}
			l(this).attr({
				className:Cls
			})
		})
	}
	ctrs.each(function(i){
		this.index = i
		l(this).click(function(){
			var dir = Math.abs(picBox.css('left').toInt() / FWid) > i ? -1 : 1
			index(this.index)
			flip(dir,this.index)
		})
	})
	next.click(function(){
		flip(1)
	})
	prev.click(function(){
		flip(-1)
	})
})()