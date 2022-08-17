// pages/map/map.js
var config = require('../../libs/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 地图组件配置
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: false,
      showScale: false,
      subKey: '',
      layerStyle: 1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    // 当前定位
    currentLocation: {
      latitude: "22.773672",
      longitude: "113.922775",
    },
    // 标记点
    markers: [{
      id: 0,
      latitude: "22.773672",
      longitude: "113.922775",
      callout: {
        content: '当前定位点',
        display: 'ALWAYS',
        textAlign: "center",
        fontSize: 14,
        padding: 5,
        borderRadius: 5,
        bgColor: '#f54555'
      }
      // iconPath: "/static/images/marker.png"
    }],
  },
  /**
   * 获取定位
   */
  getLocation() {
    wx.showLoading({
      title: '加载中',
    })
    wx.getLocation({
      // type: 'wgs84',
      type: 'gcj02',
      isHighAccuracy: true,
      success: (res) => {
        console.log(res);
        let markers = [...this.data.markers]
        markers[0].latitude = res.latitude
        markers[0].longitude = res.longitude
        this.setData({
          currentLocation: {
            ...res,
          },
          markers: markers,
        })
        wx.hideLoading()
      },
      fail: (err) => {
        console.log(err);
        wx.hideLoading({
          title: "获取定位失败"
        })
      }
    })
  },
  /**
   * 选择位置
   */
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        let markers = [...this.data.markers]
        let {
          address,
          longitude,
          latitude,
          name
        } = res
        markers.push({
          id: 1,
          callout: {
            content: name,
            display: 'ALWAYS',
            textAlign: "center",
            fontSize: 14,
            padding: 5,
            borderRadius: 5
          },
          latitude,
          longitude
        })
        this.setData({
          markers: markers,
        })
        console.log(res);
      }
    })
  },
  /**
   * 点击地图
   */
  tapMap(e) {
    console.log(e);
    let {
      latitude,
      longitude
    } = e.detail
    let markers = [...this.data.markers]
    markers[1] = {
      latitude,
      longitude
    }
    this.setData({
      markers: markers
    })
  },
  /**
   * 逆解析
   */
  nijiexi(e) {
    wx.getLocation({
      type: 'gcj02',
      //  type: 'wgs84',
      success: (res) => {
        let {
          latitude,
          longitude
        } = res
        let key=config.Config.txKey
        wx.request({
          // url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=QTABZ-ENBKI-6HGGF-5KNXZ-LG3YZ-IABGX`,
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`,
          success(res) {
            console.log(res)
          }
        })
      }
    })
  },
  /**
   * 开启路线规划 - 腾讯
   */
  gotoLocation() {
    let plugin = requirePlugin('routePlan');
    let key = 'S32BZ-VRGWU-VAKV3-BZYNI-YOGKO-LCF4Q'; //使用在腾讯位置服务申请的key
    let referer = 'wechat_demo'; //调用插件的app的名称
    let endPoint = JSON.stringify({ //终点
      // 'name': '请输入地址',
      // 'latitude': 39.89631551,
      // 'longitude': 116.323459711
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})