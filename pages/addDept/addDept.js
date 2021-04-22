// pages/addDept/addDept.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deptName: "信息332",
    email: "1234516@qq.com",
    leader: "洪涛",
    orderNum: 0,
    parentId: "225",
    phone: "18268044521",
    status: "1",

  },
  // 新增部门
  addDept() {
    // 获取token
    let value = wx.getStorageSync("userInfo")
    wx.request({
      url: 'http://121.40.228.54:8083/system/dept',
      method: 'POST',
      header: {
        Authorization: `Bearer ${value.data}`,
      },
      data: {
        deptName: this.data.deptName,
        email: this.data.email,
        leader: this.data.leader,
        orderNum: this.data.orderNum,
        parentId: this.data.parentId,
        phone: this.data.phone,
        status: this.data.status,
      }
    })
  },
/**
 * 表单提交
 */
  formSubmit(e){
console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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