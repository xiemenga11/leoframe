//------------version 1.0-------------
// var F = function(id) {
// 	this.element=document.getElementById(id);
// };
// F.prototype.hide = function() {
//     this.element.style.display = "none";
// };

// new F("changeBox").hide();

//-----------version 1.1--------------
// var F=function(id){
// 	this.byId(id);
// }
// F.prototype.byId=function(id){
// 	this.element=document.getElementById(id);
// 	return this;
// }
// F.prototype.hide=function(){
// 	this.element.style.display="none";
// }
// new F("btn").hide();

//-----------version 1.2--------------
// var $=function(id){
// 	return new F(id);
// }
// var F=function(id){
// 	this.byId(id);
// }
// F.prototype.byId=function(id){
// 	this.element=document.getElementById(id);
// 	return this;
// }
// F.prototype.hide=function(){
// 	this.element.style.display="none";
// }
// $("btn").hide();
// var ind=$("changeBox");

//-----------version 1.3--------------
// var $=function(id){
// 	return new F(id);
// }
// var F=function(selector,context){
// 	this.query(selector,context);
// }
// F.prototype.byId=function(id){
// 	this.element=document.getElementById(id);
// 	return this;
// }
// F.prototype.query=function(selector,context){
// 	var context=context||document;
// 	this.element=context.querySelectorAll(selector,context);
// 	return this;
// }
// F.prototype.hide=function(){
// 	for(var i = 0 ; i < this.element.length ; i++){
// 		this.element[i].style.display="none";
// 	}
// }
// $("div").hide();

//-----------version 1.4--------------
// var $=function(id){
// 	return new F(id);
// }
// var F=function(selector,context){
// 	this.query(selector,context);
// }
// F.prototype.byId=function(id){
// 	this.element=document.getElementById(id);
// 	return this;
// }
// F.prototype.query=function(selector,context){
// 	var context=context||document;
// 	this.element=context.querySelectorAll(selector,context);
// 	return this;
// }
// F.prototype.hide=function(){
// 	this.each(function(i,obj){
// 		obj.style.display="none";
// 	})
// }
// F.prototype.each=function(callback){
// 	for(var i = 0; i<this.element.length; i++){
// 		callback.call(this.element[i],i,this.element[i]);
// 	}
// }

//-----------version 1.5--------------
// var $=function(id){
// 	return new F(id);
// }
// var F=function(selector,context){
// 	this.init(selector,context);
// }
// F.prototype.init=function(selector,context){
// 	var context=context||document;
// 	var Doms=context.querySelectorAll(selector);
// 	this.length=Doms.length;
// 	for(var i = 0; i<this.length; i++){
// 		this[i]=Doms[i];
// 	}
// 	return this;
// }
// F.prototype.hide=function(){
// 	this.each(function(i){
// 		this.style.display="none";
// 	})
// }
// F.prototype.each=function(callback){
// 	for(var i = 0; i<this.length; i++){
// 		callback.call(this[i],i,this[i]);
// 	}
// }

//-----------version 1.6--------------
// var $=function(id){
// 	return new F(id);
// }
// var F=function(selector,context){
// 	this.init(selector,context);
// }
// $.fn=F.prototype;
// $.fn.init=function(selector,context){
// 	var context=context||document;
// 	var Doms=context.querySelectorAll(selector);
// 	this.length=Doms.length;
// 	for(var i = 0; i<this.length; i++){
// 		this[i]=Doms[i];
// 	}
// 	return this;
// }
// $.fn.hide=function(){
// 	this.each(function(i){
// 		this.style.display="none";
// 	})
// }
// $.fn.each=function(callback){
// 	for(var i = 0; i<this.length; i++){
// 		callback.call(this[i],i,this[i]);
// 	}
// }

//-----------version 1.7--------------
var $=function(selector,context){
	return new $.fn.init(selector,context);
}
$.fn=$.prototype;
$.fn.init=function(selector,context){
	var context=context||document;
	var Doms=context.querySelectorAll(selector);
	this.length=Doms.length;
	for(var i = 0; i<this.length; i++){
		this[i]=Doms[i];
	}
	return this;
}
$.fn.hide=function(){
	this.each(function(i){
		this.style.display="none";
	})
}
$.fn.each=function(callback){
	for(var i = 0; i<this.length; i++){
		callback.call(this[i],i,this[i]);
	}
}
$.fn.html = function(){
	alert(this[0].innerHTML)
}
$.fn.init.prototype=$.fn;

//-----------version 1.8--------------
// var l=function(selector,context){
// 	return new l.fn.init(selector,context);
// }
// // l.fn=l.prototype;
// l.fn={
// 	init:function(selector,context){
// 		var context=context||document;
// 		var Doms=context.querySelectorAll(selector);
// 		this.length=Doms.length;
// 		for(var i = 0; i<this.length; i++){
// 			this[i]=Doms[i];
// 		}
// 		return this;
// 	},
// 	hide:function(){
// 		this.each(function(i){
// 			this.style.display="none";
// 		})
// 	},
// 	each:function(callback){
// 		for(var i = 0; i<this.length; i++){
// 			callback.call(this[i],i,this[i]);
// 		}
// 	},
// 	listen:function(type,callback){
// 		this[0].addEventListener(type,callback)
// 	},
// 	html:function(){
// 		return this[0].innerHTML;
// 	}
// }
// l.fn.extend=function(data){
// 	for(var i in data){
// 		l.fn[i]=data[i];
// 	}
// }
// l.fn.init.prototype=l.fn;
// // l("#changeBox").hide();
// l().extend({
// 	show:function(){
// 		this.each(function(i){
// 			this.style.display="block";
// 		})
// 	}
// })
// l("#changeBox").show();
// l("#btn").value = "leoxie"

