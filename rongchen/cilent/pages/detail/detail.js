// pages/detail/detail.js
import {usrcomment} from "../../utils/usercomment-data.js";
import {usercommentDetail} from "../../utils/usercomment-data.js";

Page({
  data:{
    selectedProduct: {}, //选中的商品,js对象,新增选中数量属性,可能写入缓存
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    detailData:{},
    cargoNumber: 0,
    collectedGood:false,
    collectedBad:false,
    scrollTop: 0,     //竖向滚动条的位置
    goodNumber: 0,
    badNumber: 0,
    selectedValue: 0,   //选中规格对应的价格
    SpendMoney: 0,  //将要花费
    currentTab: 0, //初始激活tab为0
    size: 1,    //初始尺寸为中
    usrComment: usrcomment, //评论
    usrCommentDetail: usercommentDetail  //详细评论
  },
  // 更改商品尺寸
  setBigValue: function(){
    this.setData({size:0,selectedValue:this.data.detailData.bigvalue});//改大小
  },
  setNormalValue: function(){
    this.setData({size:1,selectedValue:this.data.detailData.value});//改大小
  },
  setSmallValue: function(){
    this.setData({size:2,selectedValue:this.data.detailData.smallvalue});//改大小
  },
  /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
    
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  },
  // 点击商品介绍中的详情切换和好评切换
  setCurrentTab: function(e){
    var tabvalue = e.currentTarget.dataset.tabvalue;
    this.setData({
      currentTab: tabvalue,
      scrollTop: 0
    });
    console.log(this.data.scrollTop);
    
  },
  onGoodTap: function(event){
    //判断是否已是激活态
    if(!this.data.collectedGood){
      this.setData({goodNumber: this.data.goodNumber+1, collectedGood:true});
    }else{
      this.setData({goodNumber: this.data.goodNumber-1, collectedGood:false});
    }
  },
  onBadTap: function(event){
    //判断是否已是激活态
    if(!this.data.collectedBad){
      this.setData({badNumber: this.data.badNumber+1, collectedBad:true});
    }else{
      this.setData({badNumber: this.data.badNumber-1, collectedBad:false});
    }
  },
  // 增减货物
  addcargo: function(){
    var cargoNumber = this.data.cargoNumber+1;
    var SpendMoney = (Number(this.data.selectedValue)*cargoNumber);
    this.setData({cargoNumber: cargoNumber, SpendMoney:SpendMoney});
    //selectedProduct新对象的selectedNumber,selectedValue,size属性也要响应变化
    var temp = this.data.selectedProduct;
    temp.selectedNumber += 1;
    temp.selectedValue = this.data.selectedValue;
    temp.size = this.data.size;
    this.setData({selectedProduct: temp});
  },
  reducecargo: function(){
    if(this.data.cargoNumber > 0){
      var cargoNumber = this.data.cargoNumber-1;
      var SpendMoney = (Number(this.data.selectedValue)*cargoNumber);
      this.setData({cargoNumber: cargoNumber, SpendMoney:SpendMoney});
      //selectedProduct新对象的selectedNumber,selectedValue,size属性也要响应变化
      var temp = this.data.selectedProduct;
      temp.selectedNumber -= 1;
      temp.selectedValue = this.data.selectedValue;
      temp.size = this.data.size;
      this.setData({selectedProduct: temp});
    }
  },
  // 点击加入购物车
  addToCart: function(){
    //有选中商品的情况下，才写入缓存
    
    if(this.data.SpendMoney != 0){
      var app = getApp();
      //将该商品的selectedProduct对象存入数组
      app.globalData.g_selectedproducts.push(this.data.selectedProduct);
      
    }
    try {
      console.log("写入到缓存selected-products中");
      wx.setStorageSync("selected-products", app.globalData.g_selectedproducts);
      console.log(wx.getStorageSync("selected-products"));
    } catch (e) {  
      console.log("设置缓存失败！");  
    }
  },

  onLoad:function(options){
    var that = this;
    let data = options.item;
    var itemdatadetail;
    //用传过来的data(即商品id)查询详细商品信息
    wx.request({
      url: 'http://localhost:80/rongchen/server/detail.php',
      data: {
        id : data
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log("响应信息:");
        console.log(res.data[0]);
        itemdatadetail = res.data[0];
        itemdatadetail["detailimg"] = itemdatadetail["detailimg"].split(",");
        that.setData({
          detailData: itemdatadetail,
          //选中规格对应的价格
          selectedValue: itemdatadetail.value
        })
      }
    });
    
    // //将传来的data对象赋给selectedProduct,购买时会上添加一个selectedNumber属性和selectedValue属性表示被购物车选取的数量,和该规格对应的价格
    // itemdatadetail.selectedNumber = 0;
    // this.setData({
    //   selectedProduct: itemdatadetail
    // })
    
  }
})
