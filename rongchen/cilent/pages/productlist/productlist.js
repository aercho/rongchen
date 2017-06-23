

var classdata;
Page({
  data: {
    // 初始状态除了第一个，全为降序
    orderitem:["0","1","1","1"],
    activeitem: 0,
    datalist: {},
    scrollTop: {  
      scroll_top: 0,  
      goTop_show: false  
    }
  },
  //跳转详细页
  getDetail: function(event){
    let detail = event.currentTarget.dataset.detail || {};
    wx.navigateTo({
      url: `../../pages/detail/detail?item=${detail}`
    })
  },
  //改变排序按钮激活态,并排序状态反转
  chageActive:function(event){
    var that = this;
    let itemNumber = event.currentTarget.dataset.itemnum;
    var itemOrder = this.data.orderitem[Number(itemNumber)];
    //itemOrder要改，因为等下要传值，orderitem也要改，因为这里才是规定排序状态的根本原因
    var neworderitem = ["1","1","1","1"];
    if(itemOrder == "1"){
      itemOrder = "0";
      neworderitem[itemNumber] = "0";
      this.setData({
        orderitem: neworderitem
      });
    }else{
      itemOrder = "1";
      this.setData({
        orderitem: neworderitem
      });
    }
    
    this.setData({
      activeitem: itemNumber
    });
    //向后台请求数据,重新渲染页面
    wx.request({
      url: 'http://localhost:80/rongchen/server/productlist.php', 
      //后台以相应的_GET["class"]或_POST["class"]拿取值
      data:{
        class: classdata,
        orderby: itemNumber,
        des: itemOrder
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          datalist: res.data
        })
      }
    });
  },
  //返回顶部
  scrollTopFun: function(e){  
    // console.log("触发滚动条事件");
    // console.log(e.detail);  
    if(e.detail.scrollTop > 50){//触发gotop的显示条件  
      this.setData({  
        'scrollTop.goTop_show': true  
      });  
      console.log(e.detail.scrollTop)  
    }else{  
      this.setData({  
        'scrollTop.goTop_show': false  
      });  
    }  
  },  
  goTopFun: function(e){  
    // var _top=this.data.scrollTop.scroll_top;//发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断  
    // if(_top==1){  
    //   _top=0;  
    // }else{  
    //   _top=1;  
    // }  
    this.setData({  
      'scrollTop.scroll_top': 0  
    });  
    console.log("----");  
    console.log(this.data.scrollTop)  
  },
  onLoad:function(options){
    var that = this;
    // classdata为页面跳转url传来的字符串
    classdata = options.item;
    //向后台请求数据
    wx.request({
      url: 'http://localhost:80/productlist.php', 
      //后台以相应的_GET["classitem"]，_GET["classitem"]拿取值
      data:{
        // 3个参数分别是分类，按哪项排序，排序规则是升序还是降序
        classitem: classdata,
        orderby: "0",
        des: "0"
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          datalist: res.data
        })
      }
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})