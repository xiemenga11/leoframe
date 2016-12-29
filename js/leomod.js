(function(w) {
	var doms = l("body").children,
		domsLength = doms.length,
		reg = {
			app: /\{\{\$\S+\}\}/ig
		},
		app = [],
		mod = {},
		domApp = {};
	for(var i = 0; i < domsLength; i++){
		if(doms[i].dataset.app){
			var mod = doms[i].dataset.mod || "";
			doms[i].innerHTML = doms[i].innerHTML.replace(reg.app,mod);
			domApp[doms[i].dataset.app] = doms[i];
		}
	}
	// alert(l("#xie") instanceof Object);
	 
	
	// alert(l("#xie").dataset.app)
	// alert(l("#xie").innerHTML.match(reg.app));
	
	// var xie = l("#xie");
	
	// alert(att)
	// for (var i in att) {
	// 	document.write(i + ":" + att[i] + "<br>");
	// }
	// for (var i in xie) {
	// 	document.write(i + ":" + xie[i] + "<br>");
	// }
}(window))