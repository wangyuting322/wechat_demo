// pages/wang/wang.js
Page({
  /**
   * 组件的初始数据
   */
  data: {
    deptList: [],
  },

  onLoad() {
    // 获取token
    let value = wx.getStorageSync("userInfo")
    // console.log(value,'王页面');
    // 获取部门列表
    wx.request({
      url: "http://1214534534354:8083/system/dept/list",
      data: {
        current: 1,
        size: 10,
      },
      header: {
        Authorization: `Bearer ${value.data}`,
      },
      method: "GET",
      success: (res) => {
        console.log(res)
        this.setData({
          deptList: res.data.data.records,
        })
      },
      fail: (err) => {
        console.log(err)
      },
    })
  },
})
