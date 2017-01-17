l.extends({
	switchBtn:function(data){
		this.status = false;
		this.value = data.value;
		var handle = this.css({
			position:"relative",
			border:"none",
			height:"30px",
			width:"50px",
			backgroundColor:"#DDD",
			borderRadius:"15px",
			border:"2px solid white"
		})
		.html(" ")
		.addElement("div")
		.css({
			position:"absolute",
			height:"30px",
			width:"30px",
			borderRadius:"15px",
			backgroundColor:"white",
			boxShadow:"2px 2px 2px rgba(0,0,0,0.3)",
			top:"-2px",
			left:"-2px"
		})
		this.listen("click",function(){
			var color = "",
				left = "-2px",
				timer;
			if(this.status === true){
				color = "#DDD";
				// left = "-2px";
			}else{
				color = "#0F0";
				// left = "20px";
			}
			this.css({
				backgroundColor:color
			})
			var This = this
			timer = setInterval(function(){
				console.log(handle.offset("left"));
				if(!This.status){
					if(handle.offset("left") < 20){
						handle.css({
							left:handle.offset("left")+1+"px"
						})
					}else{
						This.status = !This.status;
						if(data.callback){
							data.callback({
								status:This.status,
								value:This.value
							});
						}
						clearInterval(timer);
					}
				}else{
					if(handle.offset("left") > -2){
						handle.css({
							left:handle.offset("left")-1+"px"
						})
					}else{
						This.status = !This.status;
						if(data.callback){
							data.callback({
								status:This.status,
								value:This.value
							});
						}
						clearInterval(timer);
					}
				}
			},20)
		})
	}
})