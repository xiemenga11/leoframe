(function(){
	/*
	config可配置的各个参数及属性
	stylename:各个属性的名称映射
	*/
	var styleName = {
		style:{
			fill:"fillStyle",//绘制线条的样式
			stroke:"strokeStyle"//填充路径的样式
		},
		shadow:{
			color:"shadowColor",//阴影的颜色
			blur:"shadowBlur"//阴影的模糊度
		},
		line:{
			cap:"lineCap",//线端点样式
			join:"lineJoin",//线转角样式
			width:"lineWidth",//线宽
			limit:"miterLimit"//转角为miter时的最长长度
		},
		font:{
			font:"font",//字体大小及其它配置
			align:"textAlign",//文字在位置上的左右对齐方式
			baseline:"textBaseline"//文字在位置上的上下对齐方式
		},
		global:{
			alpha:"globalAlpha",//当前画布的透明度
			operation:"globalCompositeOperation"//画布的层叠方式
		}
	}
	// var con={
	// 	style:{
	// 		fill:"black",
	// 		stroke:"black"
	// 	},
	// 	shadow:{
	// 		color:"black",
	// 		blur:0,
	// 		position:[0,0]
	// 	},
	// 	line:{
	// 		cap:"butt",
	// 		join:"miter",
	// 		width:1,
	// 		limit:10
	// 	},
	// 	font:{
	// 		font:"16px Arial",
	// 		align:"start",
	// 		baseline:"alphabetic"
	// 	}
	// }
	function _C(obj){
		this.obj    = document.getElementById(obj);
		this.height = this.obj.height;
		this.width  = this.obj.width;
		this.can    = this.obj.getContext("2d");
		return this;
	}
	_C.prototype = {
		version:"leo",
		/*
		save:保存画布当前配置状态
		*/
		save:function(){
			this.can.save();
			return this;
		},
		/*
		init:将画布配置返回到上一状态
		*/
		init:function(){
			this.can.restore();
			return this;
		},
		/*
		config:配置画布的各个参数和属性
		*/
		config:function(config){
			for(var i in config){
				for(var j in config[i]){
					this.can[styleName[i][j]] = config[i][j];
				}
			}
			if(config.shadow && config.shadow.position){
				this.can.shadowOffsetX = config.shadow.position[0];
				this.can.shadowOffsetY = config.shadow.position[1];
			}
			return this;
		},
		moveTo:function(x,y){
			this.can.moveTo(x,y);
			return this;
		},
		lineTo:function(x,y){
			this.can.lineTo(x,y);
			return this;
		},
		/*
		bezierTo:创建二次元曲线
		x:int 结束点X坐标
		y:int 结束点Y坐标
		control:[int,int] 控制杆坐标（可选，默认[0,0]）
		*/
		bezierTo:function(x,y,control){
			var control = control || [x,y];
			this.can.quadraticCurveTo(control[0],control[1],x,y);
			return this;
		},
		bezier2To:function(x,y,control){
			var control = control || [[x,y],[x,y]];
			this.can.bezierCurveTo(control[0][0],control[0][1],control[1][0],control[1][1],x,y);
			return this;
		},
		/*
		arcTo:在两条直线夹角中生成曲线
		config:{
			start:[int,int] 起始线结束坐标
			end:[int,int] 结束线结束坐标
			r:半径
		}
		*/
		arcTo:function(config){
			this.can.arcTo(config.start[0],config.start[1],config.end[0],config.end[1],config.r);
			return this;
		},
		/*
		arc:创建曲线或圆形路径
		config{
			center:[int,int] 圆心坐标
			r:圆的半径
			start:float (0-2) 开始点;默认0
			end:float (0-2) 结束点;默认2
			desc:boolean 顺时针或逆时针;默认顺时针false
		}
		*/
		arc:function(config){
			var s = config.start || 0;
			var e = config.end || 2;
			var d = config.desc || false;
			this.can.arc(config.center[0],config.center[1],config.r,s*Math.PI,e*Math.PI,d);
			return this;
		},
		/*
		rec:创建矩形路径
		config{
			start:[int,int] 起始点坐标
			size:[int,int] 矩形尺寸
		}
		*/
		rec:function(config){
			this.can.rect(config.start[0],config.start[1],config.size[0],config.size[1])
			return this;
		},
		/*
		srec:直接绘制填充矩形
		config{
			start:[int,int] 起始点坐标
			size:[int,int] 矩形尺寸
		}
		*/
		frec:function(config){
			this.can.fillRect(config.start[0],config.start[1],config.size[0],config.size[1])
			return this;
		},
		/*
		srec:直接绘制无填充矩形
		config{
			start:[int,int] 起始点坐标
			size:[int,int] 矩形尺寸
		}
		*/
		srec:function(config){
			this.can.strokeRect(config.start[0],config.start[1],config.size[0],config.size[1])
			return this;
		},
		/*
		rrec:创建圆角矩形路径
		config{
			start:[int,int] 起始点坐标
			r:int 圆角半径
			size:[int,int] 矩形尺寸
		}
		*/
		rrec:function(config){
			this.moveTo(config.start[0]+config.r,config.start[1])
			.lineTo(config.size[0]+config.start[0]-config.r,config.start[1])
			.arcTo({
				start:[config.size[0]+config.start[0],config.start[1]],
				end:[config.size[0]+config.start[0],config.start[1]+config.r],
				r:config.r
			})
			.lineTo(config.size[0]+config.start[0],config.size[1]+config.start[1]-config.r)
			.arcTo({
				start:[config.size[0]+config.start[0],config.size[1]+config.start[1]],
				end:[config.size[0]+config.start[0]-config.r,config.size[1]+config.start[1]],
				r:config.r
			})
			.lineTo(config.start[0]+config.r,config.start[1]+config.size[1])
			.arcTo({
				start:[config.start[0],config.start[1]+config.size[1]],
				end:[config.start[0],config.start[1]+config.size[1]-config.r],
				r:config.r
			})
			.lineTo(config.start[0],config.start[1]+config.r)
			.arcTo({
				start:[config.start[0],config.start[1]],
				end:[config.start[0]+config.r,config.start[1]],
				r:config.r
			})
			return this;
		},
		/*
		stroke:绘制当前路径
		*/
		stroke:function(){
			this.can.stroke();
			return this;
		},
		/*
		fill:填充当前路径
		*/
		fill:function(){
			this.can.fill();
			return this;
		},
		/*
		begin:开始一条新路径
		*/
		begin:function(){
			this.can.beginPath();
			return this;
		},
		/*
		close:闭合路径，从当前点回到起始点
		*/
		close:function(){
			this.can.closePath();
			return this;
		},
		/*
		clear:清除指定矩形内的像素
		config{
			start:[int,int] 起始点坐标
			size:[int,int] 矩形尺寸
		}
		*/
		clear:function(config){
			this.can.clearRect(config.start[0],config.start[1],config.size[0],config.size[1]);
			return this;
		},
		/*
		l_gradient:线性渐变
		config{
			start:[int,int] 起始点坐标
			end:[int,int] 结束点坐标
			stop:[
				[float,color],
				[float,color]
			] 渐变的颜色
		}
		return:创建的渐变
		*/
		l_gradient:function(config){
			var gra=this.can.createLinearGradient(config.start[0],config.start[1],config.end[0],config.end[1]);
			for(var i = 0; i<config.stop.length; i++){
				gra.addColorStop(config.stop[i][0],config.stop[i][1]);
			}
			return gra;
		},
		/*
		r_gradient:圆形一放射渐变
		config{
			center:[int,int] 渐变的圆心
			sr:int 起始圆的半径
			br:int 放射范围的半径
			stop:[
				[float,color]
			] 渐变的颜色
		}
		return:创建的渐变
		*/
		r_gradient:function(config){
			var gra=this.can.createRadialGradient(config.center[0],config.center[1],config.sr,config.center[0],config.center[1],config.br);
			for(var i = 0; i<config.stop.length; i++){
				gra.addColorStop(config.stop[i][0],config.stop[i][1]);
			}
			return gra;
		},
		pattern:function(data,dir){
			return this.can.createPattern(data,dir);
		},
		/*
		clip:使用当前路径剪切后绘制的图
		*/
		clip:function(){
			this.can.clip();
			return this;
		},
		/*
		inPath:检测点是否要当前路径内
		x:int 检测点的X坐标
		y:int 检测点的Y坐标
		callback:func 检测的回调函数
		*/
		inPath:function(x,y,callback){
			var isin = this.can.isPointInPath(x,y);
			callback(isin);
			return this;
		},
		/*
		translate:重新定义圆点
		x:int 圆点X
		y:int 圆点Y
		*/
		translate:function(x,y){
			this.can.translate(x,y);
			return this;
		},
		/*
		spin:旋转画布
		degress:int 角度 0－360
		*/
		spin:function(degress){
			this.can.rotate(degress*Math.PI/180);
			return this;
		},
		/*
		scale:缩放画布
		scalex:float 缩放宽
		scaley:float 缩放高
		*/
		scale:function(scalex,scaley){
			this.can.scale(scalex,scaley);
			return this;
		},
		/*
		ftext:绘制描边字
		config{
			text:string 要绘制的字符串
			position:[int,int] 绘制字符串的坐标
		}
		*/
		stext:function(config){
			this.can.strokeText(config.text,config.position[0],config.position[1]);
			return this;
		},
		/*
		ftext:绘制填充字
		config{
			text:string 要绘制的字符串
			position:[int,int] 绘制字符串的坐标
		}
		*/
		ftext:function(config){
			this.can.fillText(config.text,config.position[0],config.position[1]);
			return this;
		},
		/*
		drawImg
		config{
			data:图像，画布，视频
			start:[int,int];开始的坐标
			size:[int,int];图像的缩放大小（可选）
			clip:{ 剪切图像（可选）
				start:[int,int];剪切开始的坐标
				size:[int,int];剪切的尺寸
			}
		}
		*/
		drawImg:function(config){
			// console.log("drawImg");
			if(config.size&&config.clip){
				// console.log("size&&clip")
				this.can.drawImage(config.data,config.clip.start[0],config.clip.start[1],config.clip.size[0],config.clip.size[1],config.start[0],config.start[1],config.size[0],config.size[1]);
			}else if(config.size){
				// console.log("size")
				this.can.drawImage(config.data,config.start[0],config.start[1],config.size[0],config.size[1]);	
			}else{
				// console.log("no")
				this.can.drawImage(config.data,config.start[0],config.start[1]);
			}
			
			return this;
		},
		/*
		copy:复制指定矩形内的像素
		config{
			start:[int,int] 复制矩形的起始点
			size:[int,int] 复制矩形的尺寸
		}
		return 返回复制的imageData
		*/
		copy:function(config){
			return this.can.getImageData(config.start[0],config.start[1],config.size[0],config.size[1]);
		},
		/*
		paste:将imageData粘贴到画布上
		config{
			data:imageData对象
			start:[int,int] 放置的左上角坐标
			clip:{//剪切imageData对象（可选）
				start:[int,int] 剪切的起始点
				size:[int,int] 剪切的尺寸
			}
		}
		*/
		paste:function(config){
			if(config.clip){
				this.can.putImageData(config.data,config.start[0],config.start[1],config.clip.start[0],config.clip.start[1],config.clip.size[0],config.clip.size[1]);
			}else{
				this.can.putImageData(config.data,config.start[0],config.start[1]);
			}
			return this;
		},
		/*
		makeFile:创建URL图片
		type:图片格式，默认png
		quality:0-1 图片质量，仅在格式为jpeg时有效
		return:返回创建好的图片
		*/
		makeFile:function(type,quality){
			var q=quality||1;
			var type=type||"png";
			return this.obj.toDataURL("image/"+type,quality)
		},
		/*--------------------图形-----------------------*/
		/*
		polygen:多边形
		config{
			r:int 半径
			center:[int,int] 圆心
			line:int 边数
			fill:bool 是否填充
		}
		*/
		polygen:function (config){
			var r=config.r;
			var center=config.center;
			var line=config.line;
			var start = Math.cos(360*Math.PI/180)*config.r;
			var end = Math.sin(360*Math.PI/180)*config.r;
			var spin = config.spin+270||270;
			this
			.save()
			.begin()
			.translate(center[0],center[1])
			.spin(spin)
			.begin()
			.moveTo(start,end)
			for(var i = 0 ; i <=line ; i++){
				this.lineTo(Math.cos((360/line)*i*Math.PI/180)*r,Math.sin((360/line)*i*Math.PI/180)*r)
				.stroke()
			}
			if(config.fill){
				this.fill()
			}
			this.init()
			return this;
		}
	}
	var C=window.C=function(obj){
		return new _C(obj);
	}
}())