<?php 
	// foreach($_POST as $k => $v){
	// 	echo $k.":".$v."<br/>";
	// }
	if(isset($_POST)){
		$time=time().".jpg";
		foreach ($_POST as $key => $value) {
			echo $key.":".$value;
			echo "<img src='save/$time'>";
		}
		var_dump($_FILES);
		foreach ($_FILES as $key => $value) {
			move_uploaded_file($_FILES[$key]['tmp_name'], "save/".mt_rand().$time);
		}
	}
 ?>