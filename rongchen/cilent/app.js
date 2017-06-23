//app.js
App({
  globalData:{
    //尝试拿取购物车缓存
    g_selectedproducts: wx.getStorageSync("selected-products"),
    userInfo:null
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    
    console.log(this.globalData.g_selectedproducts);//undefine
    if(this.globalData.g_selectedproducts){
      console.log("有缓存");
      console.log(this.globalData.g_selectedproducts);
    }else{
      console.log("没有缓存");
    }

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    //获取登录凭证code
    wx.login({
      success: function(res) {
        if (res.code) {
          var code = res.code;
          //获取用户信息
          wx.getUserInfo({
            success: function (info) {
              console.log(info);
              //不包括敏感信息的原始数据字符串，用于计算签名。
              var rawData = info['rawData'];
              //使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。
              var signature = info['signature'];
              //包括敏感数据在内的完整用户信息的加密数据
              var encryptData = info['encryptData'];
              var encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData...坑啊
              // 加密算法的初始向量
              var iv = info['iv'];

              //发起网络请求
              wx.request({
                //将code和用户信息发送到开发者的服务器
                url: 'http://localhost:80/rongchen/server/wxLogin.php',
                data: {
                  "code": code,
                  "rawData" : rawData,
                  "signature" : signature,
                  'iv' : iv,
                  'encryptData': encryptData,
                  'encryptedData': encryptedData
                },
                success: function(res){
                  //开发者服务器用code去微信服务器换取openid和session_key,并返回回来
                  console.log(res.data);
                  if(res.statusCode != 200) {
                    wx.showModal({
                        title: '登录失败'
                    });
                  }
                }
              })
            }
          }); 

          
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });



  },
  
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }
})