
Page({
  data:{
    userInfo:{},
    img_bg:"../../images/scroll-view/5.jpg",
    other_list:["推荐有奖","意见反馈","客服热线","荣成林园"],
    isTure:"true",
    order_gaid:[
      {
        state:"待付款",
        img:"../../images/img/baoxian.png",
        id:1
      },
      {
        state:"待发货",
        img:"../../images/img/cart.png",
        id:2
      },
      {
        state:"待收货",
        img:"../../images/img/juhuic.png",
        id:3
      },
      {
        state:"已完成",
        img:"../../images/img/shiming.png",
        id:4
      },
    ]
  },
  onLoad:function(options){
    var that = this;
     wx.getUserInfo({
      success: function(res) {
        that.setData({
          userInfo:res.userInfo
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log(this.data.userInfo)
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})