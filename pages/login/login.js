// logs.js
const util = require("../../utils/util.js")
import {
  request
} from '../../utils/request.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    msg: "66",
  },
  handleParent() {
    console.log("bb")
  },
  handleChild() {
    console.log("kid")
  },
  /**
   * 登录事件（保存token至缓存）
   */
  handleLogin() {
    // 登录接口
    request({
      url: '/system/login',
      method: "POST",
      data: {
        username: "admin",
        password: "admin123",
      },
    }).then(res => {
      try {
        // 存储token
        wx.setStorageSync("token", res.data)
        // 前往部门页面
        this.handlePage()
      } catch (e) {
        console.log(e);
      }
    }).catch(err => {
      wx.showToast({
        title: `登录失败！！${err.message}`,
      })
      console.log(err);
    })
  },
  handlePage() {
    wx.navigateTo({
      url: "/pages/dept/dept",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(this)
    // 修改msg的状态数据，语法：this.data
    console.log(this.data.msg)
    this.setData({
      msg: "修改之后的值",
    })
    console.log(this.data.msg)
    this.setData({
      logs: (wx.getStorageSync("logs") || []).map((log) => {
        return util.formatTime(new Date(log))
      }),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log(this)
  },
})