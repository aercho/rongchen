//获取数据
import {dataList} from '../../utils/data.js';
import {shineidataList} from '../../utils/classify.js';
import {shiwaidataList} from '../../utils/classify.js';
import {yuanlindataList} from '../../utils/classify.js';
import {yuanyidataList} from '../../utils/classify.js';
import {duoroudataList} from '../../utils/classify.js';

var app = getApp()  
Page( {  
  data: {  
    /** 
        * 页面配置 
        */  
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,
    datalist: dataList,
    shineidata: shineidataList,
    shiwaidata: shiwaidataList,
    yuanlindata: yuanlindataList,
    yuanyidata: yuanyidataList,
    duoroudata: duoroudataList
  },  
  onLoad: function() {  
    var that = this;  
  
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo( {  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  

    });  
  },  
 

  getDetail: function(event) {
    wx.navigateTo({
      url: `../../pages/productlist/productlist?item=${JSON.stringify(event.currentTarget.dataset.datadetail)}`
    })
  },
})  