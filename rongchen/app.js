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
    wx.setStorageSync('logs', logs)
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