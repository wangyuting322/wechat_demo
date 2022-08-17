// index.js
// 获取应用实例
const app = getApp()


// 注册当前页面的实例
Page({
  /**
   * 页面的初始化数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    // 非tab页面的跳转（不会销毁前面的页面，会有记录）
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
    // 非tab页面的跳转（会销毁前面的页面，只能回到主页）
    wx.redirectTo({
      url: '/pages/logs/logs',
    })
    // tab页面跳转
    wx.switchTab({
      url: '/pages/logs/logs',
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onReady() {
    console.log('onready');
    // wx.authorize({scope:'scope.userLocation'})
    // wx.authorize({scope: 'scope.userLocationBackground'})
  },
  onShow() {
    console.log('onshow');
  },
  onHide() {
    console.log('onhide');
  },
  onUnload() {
    console.log('obunload');
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res, 55)
        this.setData({
          userInfo: res.userInfo,
          // hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
})