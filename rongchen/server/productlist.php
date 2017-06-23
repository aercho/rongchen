<?php
	header("Content-type：text/json");

switch ($_GET["classitem"]) {
	case 'shineidata':
		$classitem = "室内";
		break;
	case 'shiwaidata':
		$classitem = "室外";
		break;
	case 'yuanlindata':
		$classitem = "园林";
		break;
	case 'yuanyidata':
		$classitem = "园艺";
		break;
	case 'duoroudata':
		$classitem = "多肉";
		break;
}

switch ($_GET["orderby"]) {
	case '0':
		$order = "name";
		break;
	case '1':
		$order = "value";
		break;
	case '2':
		$order = "salenumber";
		break;
	case '3':
		$order = "level";
		break;
}

	$mysqli = mysqli_connect("localhost", "root", "12345678", "rongchen");
	if(mysqli_connect_errno()) {
		printf("connect failed: %s\n", mysqli_connect_error());
		exit();
	}else{
		//判断结果是否排序
		if($_GET["des"] == "0"){
			$sql = "SELECT id,name,value,good,bad,imgsrc,salenumber,level FROM products WHERE belongtoclass LIKE '%".$classitem."%' ORDER BY ".$order."";
		}else{
			$sql = "SELECT id,name,value,good,bad,imgsrc,salenumber,level FROM products WHERE belongtoclass LIKE '%".$classitem."%' ORDER BY ".$order." DESC";
		}
		
		$res = mysqli_query($mysqli, $sql);
		$jarr = array();

		if($res){
			while($rows = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        unset($rows[$i]);
    		array_push($jarr,$rows);
			}
			// print_r($jarr);
			// echo "<br>";
			// echo '编码后的json字符串：<br>';
			$str=json_encode($jarr, JSON_UNESCAPED_UNICODE);//将数组进行json编码
			echo $str;
			// $arr=json_decode($str);//再进行json解码echo '解码后的数组：';
			// echo "json解码后:<br>";
			// print_r($arr);//打印解码后的数组，数据存储在对象数组中

		}
		mysqli_close($mysqli);
	}
?>