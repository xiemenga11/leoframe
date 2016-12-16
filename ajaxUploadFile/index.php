<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>AJAX上传文件</title>
</head>
<body>
	<form action="" method="POST">
		<input type="text" id="text">
		<input type="file" multiple="multiple" id="file">
		<input type="button" id="btn" value="upload">
	</form>
	<div id="result"></div>
<script>
	var arr={};
	var btn=document.getElementById("btn");
	var inputs=document.getElementsByTagName("input");
	var file=document.getElementById("file");
	var result=document.getElementById("result");
	btn.onclick=function(){
		for(var i=0; i<inputs.length; i++){
			arr[inputs[i].id]=inputs[i].value;
		}
		// ajax({
		// 	url:'back.php',
		// 	method:'post',
		// 	data:ajaxData(arr),
		// 	callback:function(ret){
		// 		result.innerHTML+=ret;
		// 	}
		// })
		ajaxFile();
	}

	function ajaxData(arr){
		var arr2=[];
		var j=0;
		for(var i in arr){
			arr2[j]=i+"="+arr[i];
			j++;
		}
		return arr2.join("&")
	}

	// console.log(file)
	// console.log(file.value)
	// console.log(file.files[0]);
	function ajaxFile(){
		var form = new FormData();
		var xhr = new XMLHttpRequest();
		form.append("author","leoxie");
		for(var i = 0 ; i < file.files.length ; i++){
			form.append("file"+i,file.files[i]);
		}
		xhr.open("post","back.php",true);
		// xhr.onload=function(){
		// 	result.innerHTML+=xhr.responseText;
		// }
		xhr.send(form);
	}
	function ajax(data){
		var xml;
		if(window.XMLHttpRequest){
			xml=new XMLHttpRequest();
		}else{
			xml=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xml.onreadystatechange=function(){
			if(xml.readyState==4&&xml.status==200){
				data.callback(xml.responseText);
				
			}else{
				console.log(xml.readyState+":"+xml.status);
			}
		}
		
		xml.open(data.method,data.url,true);
		if(data.method.toLowerCase()=="post"){
			xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		}
		xml.send(data.data);
	}
</script>
</body>
</html>