/**
 * leo.js
 * @author  leoxie
 * @mail    xiemenga11@126.com
 * @version 1.0.0
 */
(function(w){
	var l = function (obj,parent){
		var obj = obj || document,
			parent = parent ? parent : false;

		return new l.init(obj,parent);
	}
	l.init = function (obj,parent){
		this.parent = parent || document;
		if(typeof obj ==="string"){
			this.objStrArr = obj.match(this.regs.objs);
			for(var i = 0 ; i < this.objStrArr.length ; i++){
				if(i !== 0){
					this.parent = this.dom;
				}
				if(this.parent.length){
					var o = [];

					for(var j = 0; j < this.parent.length; j++){
						
						this.findDom(this.objStrArr[i],this.parent[j])
						
						if(this.dom.length){
							o.push(this.dom);
						}
					
					}

					this.dom = [];
					for(var x = 0; x < o.length; x++){
						for(var y = 0; y < o[x].length ; y ++){
							if(o[x][y]){
								this.dom.push(o[x][y]);
							}
						}
					}

				}else{
					this.findDom(this.objStrArr[i],this.parent);
				}
			}
		}else{
			this.dom = obj;
		}

		if(this.dom.length == 1){
			this.dom =  this.dom[0];
		}
		return this;
	}
	l.fn = l.prototype
	l.fn = {
		/**
		 * 找到指定的DOM元素
		 * @param  {string} obj    dom元素的string描述
		 * @param  {obj} parent    指定要找到parent下的元素
		 * @return {[type]}        [description]
		 */
		findDom:function(obj,parent){
			var parent = parent||document;
			if(obj.match(this.regs.id)){
				
				// by id
 
				this.dom = parent.getElementById(this.trimFlag(obj));
			}else if(obj.match(this.regs.class)){
				
				// by class

				var index;

				if(obj.match(this.regs.index)){

					//如果有[1,2,3]

					var range;

					index = obj.match(this.regs.index)[0];
					obj = obj.replace(this.regs.index,"");
					index = index.replace(/[\[\]]/g,"");
					if(range = index.match(/\d+\-\d+/g)){
						for(var i = 0 ; i < range.length; i++){
							index = index.replace(range[i],this.range(range[i]));
						}
					}
					index = index.split(",");
					var iLength = index.length;
					this.dom = [];
					var d = parent.getElementsByClassName(this.trimFlag(obj));
					for(var i = 0; i < iLength ; i++){
						this.dom.push(d[index[i]]);
					}
				}else{
					this.dom = parent.getElementsByClassName(this.trimFlag(obj));
				}

			}else{

				// by tag

				var index;

				if(obj.match(this.regs.index)){

					//如果有[1,2,3]

					var range;

					index = obj.match(this.regs.index)[0];
					obj = obj.replace(this.regs.index,"");
					index = index.replace(/[\[\]]/g,"");
					if(range = index.match(/\d+\-\d+/g)){
						for(var i = 0 ; i < range.length; i++){
							index = index.replace(range[i],this.range(range[i]));
						}
					}
					index = index.split(",");
					var iLength = index.length;
					this.dom = [];
					var d = parent.getElementsByTagName(this.trimFlag(obj));
					for(var i = 0; i < iLength ; i++){
						this.dom.push(d[index[i]]);
					}
				}else{
					this.dom = parent.getElementsByTagName(this.trimFlag(obj));
				}
			}
		},
		regs:{
				"id":/^#\S+/i,
				"class":/^\.\S+/i,
				"index":/\[\S+\]/i,
				"objs":/[#\.]?\S+/ig,
				"flag":/[#\.]?/
			},
		/**
		 * 去掉obj string的 # 和 .	
		 * @param  {string} str 要去#.的obj string
		 * @return {string}     去掉#.后的obj string
		 */
		trimFlag:function(str){
			return str.replace(this.regs.flag,"");
		},
		/**
		 * 找到obj string 指定的[1,2,5-8]元素
		 * @param  {string} range [1,2,5-8]等范围
		 * @return {string}       返回处理好的范围
		 */
		range:function(range){
			var range = range.split("-");
			var str = [];
			var j = 0;
			for(var i = range[0]; i <= range[1]; i++){
				str[j] = i;
				j++;
			}
			return str.join(",");
		},
		click:function(callback){
				this.dom.onclick = callback;
				return this;
			},
		hover:function(callback){
			this.dom.onmouseover = callback;
			return this;
		},
		out:function(callback){
			this.dom.onmouseout = callback;
			return this;
		},
		val:function(value){
			if(value || value == 0){
				this.dom.value = value;
				return this;
			}else{
				return this.dom.value;
			}
		},
		html:function(text){
			if(text){
				this.dom.innerHTML = text;
				return this;
			}else{
				return this.dom.innerHTML;
			}
		},
		css:function(css){
			if(typeof css === "string"){
				
				return this.dom.currentStyle?this.dom.currentStyle[css]:window.getComputedStyle(this.dom,false)[css];
				
			}else{
				for(var i in css){
					this.dom.style[i] = css[i];
				}
				return this;
			}
		},
		listen:function(event,callback){
			if(this.dom.addEventListener){
				this.dom.addEventListener(event,callback);
			}else{
				this.dom.attachEvent("on"+event, callback);
			}
			return this;
		},
		unListen:function(event,callback){
			if(this.dom.removeEventListener){
				this.dom.removeEventListener(event,callback);
			}else{
				this.dom.detachEvent("on"+event, callback);
			}
			return this;
		},
		getData:function(key){
			return this.dom.dataset[key];
		},
		attr:function(attr){
			if(typeof attr === "string"){
				return this.dom[attr];
			}else{
				for(var i in attr){
					this.dom[i]=attr[i]
				}
				return this;
			}
		},
		offset:function(attr){
			return this.dom["offset"+attr.firstUpper()];
		},
		each:function(callback){
			for(var i = 0; i < this.dom.length; i++){
				callback.call(this.dom[i],i);
			}
		},
		addElement:function(tag){
			var ele = "";
			if(l.isString(tag)){
				ele = l().dom.createElement(tag);
			}else{
				ele = tag;
			}
			if(l.isArray(ele)||ele.length){
				for(var i = 0; i < ele.length; i++){
					this.dom.appendChild(ele[i]);
				}
			}else{
				this.dom.appendChild(ele);
			}
			ele.parent = this.dom;
			return ele;
		},
		insertElement:function(ele,i){
			var i = i || 0;
			alert(i)
			this.dom.inserBefore(ele,this.dom.childNodes[i])
			return this
		},
		/**
		 * 遮罩层
		 * @param  {obj} data 遮罩层配置
		 * @return {dom}      [description]
		 */
		mask:function(data){
			var H = this.offset("height"),
				W = this.offset("width"),
				L = this.offset("left"),
				T = this.offset("top"),
			    child = this.addElement("div")
				.css({
					backgroundColor:"rgba(0,0,0,0.3)",
					color:"white",
					height:H + "px",
					width:W + "px",
					position:"fixed",
					top:T + "px",
					left:L + "px",
					textAlign:"center",
					lineHeight:H + "px"
				})
				if(data.css){
					child.css(data.css);
				}
				if(data.event){
					for(var i in data.event){
						child.listen(i,data.event[i]);
					}
				}
				if(l.isString(data.inner)){
					child.html(data.inner);
				}else{
					child.addElement(data.inner);
				}
				return child;
		},
		swipe:function (direction,callback){
			var sx,sy,ex,ey,status;
			this.listen("mousedown",function(e){
				var e  = e || event ;
				status = false;
				sx     = e.clientX ;
				sy     = e.clientY ;
				l(this).listen("mousemove",move)
			})
			this.listen("mouseup",function(e){
				l(this).notListen("mousemove",move)
				if(status && status == direction){
					callback.call(this)
				}
			})
			function move(e){
				var ev = e || event;
				ex     = sx-ev.clientX
				ey     = sy-ev.clientY
				if(Math.abs(ex) > 100 || Math.abs(ey) > 100){
					if(Math.abs(ex) > Math.abs(ey)){
						status = ex < 0 ? "right" : "left" ;
					}else{
						status = ey < 0 ? "down" : "up" ;
					}
				}
			}
			return this;
		},
		/*
		移除元素
		obj:domobject 是移除的子元素
		如果传了obj则移除当前元素的子元素obj,如果不传则移除当前元素自身
		
		<--BUG-->不能移除自身
		*/
		// remove:function(obj){
		// 	if(obj){
		// 		this.dom.removeChild(obj);
		// 		return this;
		// 	}else{
		// 		this.dom.parentNode.removeChild(this.obj);
		// 	}
		// }
		
		/*
		克隆元素
		deep:bool||string  true克隆元素和它的内容,false只克隆元素不克隆内容；不传则默认为false||如果传入string，则克隆元素并将内容替换为deep
		return:克隆后的元素
		*/
		clone:function(deep){
			if(typeof deep==="string"){
				var o=this.dom.cloneNode(deep);
				l(o).html(deep);
				return o;
			}else{
				return this.dom.cloneNode(deep);
			}
		} 
		

	}
	l.fn.extend = function(data){
		for(var i in data){
			l.fn[i] = data[i];
		}
	}
	l.init.prototype = l.fn
	//selector的工厂函数
	
	l.author = "leoxie";
	l.version = "1.0.0";
	l.mail = "xiemenga11@126.com";

	l.isString = function(data){
		return (typeof data === "string");
	}
	l.isObject = function(data){
		return ((data instanceof Object) && !(data instanceof Array));
	}
	l.isArray = function(data){
		return ((data instanceof Object) && (data instanceof Array));
	}
	l.isFunction = function(data){
		return (typeof data === "function");
	}
	l.isDom = function(data){
		return ((typeof data === "object") && (data instanceof Object) && ("tagName" in data))
	}
	l.isNumber = function(data){
		return (typeof data === "number");
	}
	l.isBool = function(data){
		return (typeof data === "boolean");
	}
	l.getType = function(data){
		return (typeof data);
	}
	l.url = function(url){
			if(url){
				window.location.href=url;
			}else{
				return window.location.href;
			}
		}
	//防止事件冒泡
	l.noBubble = function(e){
		//在之前要获得var e = e || event
		// if(e.stopPropagation){
		// 	e.stopPropagation();
		// }else{
		// 	e.cancelBubble = true;
		// }
		window.event? window.event.cancelBubble = true : e.stopPropagation();
	}
	// 将字符串转换为JSON对象
	/*
	str: string 要转换的字符串
	return : 转换后得到的对象
	*/
	l.strToJson = function (str){
		if(window.JSON){
			return JSON.parse(str);
		}else{
			return (new Function("return"+str))()
		}
	}
	l.load = function(callback){
		l(window).listen("load",callback);
	}
	l.getScrollTop = function(){
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	}
	l.exe = function(str){
		return (new Function(str))()
	}
	l.ajax = function(config){
		var xml,
			data = config.data ? config.data : null;
		if(window.XMLHttpRequest){
			xml = new XMLHttpRequest()
		}else{
			xml = new ActiveXObject("Microsoft.XMLHTTP")
		}
		xml.onreadystatechange = function(){
			if(xml.readyState == 4 && xml.status == 200){
				config.callback.call(xml.responseText)
			}
		}
		if(config.method.toLowerCase()=="post"){
			xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		}
		xml.open(config.method,config.url,true)
		xml.send(data)
	}
	//窗口宽高
	l.wid = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	l.hei = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	//屏幕宽高
	l.screenHei = screen.availHeight;
	l.screenWid = screen.availWidth;

	window.l = l;
	//原型方法
	String.prototype.alt = function(){
		alert(this);
		return this;
	}
	String.prototype.log = function(){
		console.log(this);
		return this;
	}
	String.prototype.inArr = function(obj){
		for(var i in obj){
			if(this == obj[i]){
				return true;
			}
		}
		return false;
	}
	String.prototype.inKey = function(obj){
		return (this in obj);
	}
	//首字母大写
	String.prototype.firstUpper = function(){
		return this.replace(this[0],this[0].toUpperCase());
	}
	String.prototype.toJson = function(){
		return l.strToJson(this);
	}
	// 删除字符串的空白字符
	String.prototype.trim=function(){
		var reg=/\s/g;
		return this.replace(reg,"");
	}
	//将字符串转换为int
	String.prototype.toInt=function(){
		return parseInt(this);
	}
	//将字符串转换为float
	String.prototype.toFloat=function(){
		return parseFloat(this);
	}
	Boolean.prototype.alt = String.prototype.alt;
	Number.prototype.alt = String.prototype.alt;
	Number.prototype.log = String.prototype.log;
	Number.prototype.inArr = String.prototype.inArr;
	// 将float转换到四舍五入到指定位数
	Number.prototype.fixed=function(point){
		var point=point||1;
		return this.toFixed(point)*1;
	}
	// 将boolean和number转换为string
	Boolean.prototype.toStr=Number.prototype.toStr=function(){
		return String(this);
	}
	Array.prototype.each = function(callback){
		var len = this.length;
		for(var i = 0; i < len; i++){
			callback.call(this[i],i);
		}
	}
	Object.prototype.each = function(callback){
		for(var i in this){
			if(i == "each"){
				continue;
			}
			callback.call(this[i],i);
		}
	}
}(window))





// this.extend = {
			
			
// 			drag:function(){
// 				this.onmousedown = function(e){
// 					this.css({
// 						position:"fixed",
// 						cursor:"move",
// 						zIndex:999
// 					})
// 					var e = e || event;
// 					var sx = e.clientX,
// 						sy = e.clientY,
// 						dx = this.offsetLeft,
// 						dy = this.offsetTop,
// 						This = this;
// 					document.onmousemove = function(e){
// 						var e = e || event;
// 						This.style.left = dx + e.clientX - sx + "px";
// 						This.style.top = dy + e.clientY - sy + "px";
// 					}
// 				}
// 				this.dom.listen("mouseup",function(){
// 					document.onmousemove = null;
// 				})
// 				return this;
// 			}
			
// 		}