(function(w){
	//new   selector
	function _l(obj){
		this.parent = document;
		this.extend = {
			each:function(callback){
					for(var i = 0; i < this.length; i++){
						callback.call(l(this[i]),i);
					}
				},
			html:function(text){
				if(text){
					this.innerHTML = text;
					return this;
				}else{
					return this.innerHTML;
				}
			},
			css:function(css){
				if(typeof css === "string"){
					
					return this.currentStyle?this.currentStyle[css]:window.getComputedStyle(this,false)[css];
					
				}else{
					for(var i in css){
						this.style[i] = css[i];
					}
					return this;
				}
			},
			drag:function(){
				this.onmousedown = function(e){
					this.style.position = "fixed";
					this.style.cursor = "move";
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
				this.onmouseup = function(){
					document.onmousemove = null;
				}
				return this;
			}
		}


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

		//继承extend上写的方法
		this.ex();
		

		return this.dom;
	}
	_l.prototype = {
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
		ex:function(){
			for(var i in this.extend){
				this.dom[i] = this.extend[i];
			}
		}
	}

	//selector的工厂函数
	var l = function (obj){
		var obj = obj || document;

		obj = new _l(obj);

		for(var i in l.extend){
			obj[i] = l.extend[i];
		}

		return obj;
	}
	l.extend = {};
	l.extends = function(obj){
		for(var i in obj){
			l.extend[i] = obj[i];
		}
	}
	window.l = l;
}(window))