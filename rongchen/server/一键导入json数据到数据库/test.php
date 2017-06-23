
<!-- 导入json数据至MySQL -->
<?php

	header("Content-type：text/json");

	$mysqli = mysqli_connect("localhost", "root", "12345678", "rongchen");
	if(mysqli_connect_errno()) {
		printf("connect failed: %s\n", mysqli_connect_error());
		exit();
	}else{
		//连库成功
		//PHP中post过来的json数据不能通过$_POST[]拿取，但可以通过"php://input"
		$data = file_get_contents( "php://input");
		//将json数组解析为php对象形式,(这也是仅知的PHP中类似js的对象字面量形式创建对象的方法)
		$dataobj = json_decode($data);
		
		//循环插入数据
		for ($i=0; $i < sizeof($dataobj); $i++) { 
			$sql = "INSERT INTO products (name,anotherName,value,bigvalue,smallvalue,oldvalue,oldbigvalue,oldsmallvalue,genus,habit,technology,detailtext,imgsrc,detailimg,belongtoclass,level,salenumber,good,bad,inventory) VALUES ('".$dataobj[$i]->name."','".$dataobj[$i]->anotherName."','".$dataobj[$i]->value."','".$dataobj[$i]->bigvalue."','".$dataobj[$i]->smallvalue."','".$dataobj[$i]->oldvalue."','".$dataobj[$i]->oldbigvalue."','".$dataobj[$i]->oldsmallvalue."','".$dataobj[$i]->genus."','".$dataobj[$i]->habit."','".$dataobj[$i]->technology."','".$dataobj[$i]->detailText."','".$dataobj[$i]->imgSrc."','".$dataobj[$i]->detailImg."','".$dataobj[$i]->belongToClass."','".$dataobj[$i]->level."','".$dataobj[$i]->saleNumber."','".$dataobj[$i]->good."','".$dataobj[$i]->bad."','".$dataobj[$i]->inventory."')";
			$res = mysqli_query($mysqli, $sql);
			if($res == TRUE){
				echo "一条记录已经被插入！";
			}else{
				printf("插入不成功：%s\n", mysqli_error($mysqli));
			}
		}
		//断开连接
		mysqli_close($mysqli);
	}
?>