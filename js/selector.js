(function(w){
	//new   selector
	function _l(obj){
		this.parent = document;
		this.extend = {
			each:function(callback){
					for(var i = 0; i < this.length; i++){
						callback.call(this[i],i);
					}
				}
		};


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

		for(var i in this.extend){
			this.dom[i] = this.extend[i];
		}
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
		extends:function(obj){
			for(var i in obj){
				this.extend[i] = obj[i];
			}
		}
	}

	
	function l(obj){
		var obj = obj || document;
		return new _l(obj);
	}
	window.l = l;
}(window))