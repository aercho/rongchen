<?php
    //拿取获得的code，构造https接口
		$wxserviceurl = "https://api.weixin.qq.com/sns/jscode2session?appid=wx96d4b1116a8c25e0&secret=36bfca387f793a2ec33b6463daffd173&js_code=".$_GET[code]."&grant_type=authorization_code";
		//初始化
    $curl = curl_init();
    //设置抓取的url
    curl_setopt($curl, CURLOPT_URL, $wxserviceurl);
    //设置头文件的信息作为数据流输出
    // curl_setopt($curl, CURLOPT_HEADER, 1);
    //设置获取的信息以文件流的形式返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    //这个是重点。当请求https的数据时，会要求证书，这时候，加上下面这两个参数，规避ssl的证书检查
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    //执行命令
    $data = curl_exec($curl);
    //关闭URL请求
    curl_close($curl);
    //显示获得的数据
    print_r($data);
?>