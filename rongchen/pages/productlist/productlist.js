// pages/productlist/productlist.js

import {shineidataList} from '../../utils/classify.js';
import {shiwaidataList} from '../../utils/classify.js';
import {yuanlindataList} from '../../utils/classify.js';
import {yuanyidataList} from '../../utils/classify.js';
import {duoroudataList} from '../../utils/classify.js';

Page({
  data: {
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
      url: `../../pages/detail/detail?item=${JSON.stringify(detail)}`
    })
  },
  //改变激活态
  chageActive:function(event){
    let itemNumber = event.currentTarget.dataset.itemnum;
    console.log(event.currentTarget.dataset.itemnum);
    this.setData({
      activeitem: itemNumber
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
    //向后台请求数据
    wx.request({
      url: 'localhost/wxtest.php', 
      
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log("从后台获取");
        console.log(res);
      }
    });

    // 页面初始化 options为页面跳转所带来的参数
    let data = JSON.parse(options.item);
     this.setData({
      datalist:data
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