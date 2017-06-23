<?php
	header("Content-type：text/json");

	$mysqli = mysqli_connect("localhost", "root", "12345678", "rongchen");
	if(mysqli_connect_errno()) {
		printf("connect failed: %s\n", mysqli_connect_error());
		exit();
	}else{
		$sql = "SELECT id,name,value,imgsrc,oldvalue FROM products WHERE level=5 LIMIT 3";
		
		$res = mysqli_query($mysqli, $sql);
		$jarr = array();

		if($res){
			while($rows = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        unset($rows[$i]);
    		array_push($jarr,$rows);
			}
			$str=json_encode($jarr, JSON_UNESCAPED_UNICODE);//将数组进行json编码
			echo $str;
		}
		mysqli_close($mysqli);
	}

?>