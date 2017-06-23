//index.js

//获取数据
import {qianggouList} from '../../utils/index_subject.js';
import {tuijianList} from '../../utils/index_subject.js';
//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls: ['../../images/scroll-view/1.jpg',
    '../../images/scroll-view/2.jpg',
    '../../images/scroll-view/3.jpg',
    '../../images/scroll-view/4.jpg',
    '../../images/scroll-view/5.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    //抢购数据
    PurList: {},
    //店长推荐数据
    RecList: {}
  },
  navigateToSearch: function(){
    wx.navigateTo({
      url: `../../pages/search/search`
    })
  },
  getDetail: function(event) {
    // 注意用currentTarget而不是target
    let detail = event.currentTarget.dataset.detail || {};
    // 保留当前页面，跳转到应用内的某个页面  wx.navigateTo(OBJECT)
    wx.navigateTo({
      url: `../../pages/detail/detail?item=${detail}`
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //进首页的时候若发现缓存为undefine,设置一下缓存为空数组
    var app = getApp(); //获取APP实例
    //拿全局变量,判断是否为undefine
    if(!app.globalData.g_selectedproducts){
      app.globalData.g_selectedproducts = [];
    }

    //向后台请求抢购和推荐数据
    wx.request({
      url: 'http://localhost:80/rongchen/server/qianggou.php', 
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          PurList: res.data
        })
      }
    });
    wx.request({
      url: 'http://localhost:80/rongchen/server/tuijian.php', 
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          RecList: res.data
        })
      }
    });
    
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '分享到朋友圈',
      path: '/pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
