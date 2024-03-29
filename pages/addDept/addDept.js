// pages/addDept/addDept.js
import {
  request
} from '../../utils/request.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 所有部门数据 - 下拉框选择项
    deptList: [],
    // 所有状态数据 - 下拉框选择项
    statusList: [],
    // 表单关联数据
    formData: {
      deptName: "",
      email: "",
      leader: "",
      orderNum: 0,
      phone: "",
      parentId: 0, //index
      status: 0, //index
    },
    // 表单规则
    rules: [{
      name: 'deptName',
      rules: [{
        required: true,
        message: '部门名称必填'
      }]
    }, {
      name: "orderNum",
      rules: [{
        requried: true,
        message: '显示排序必填'
      }, {
        validator: (rule, value) => {
          let reg = /^[0-9]/;
          if (!reg.test(value)) {
            return rule.message
          }
        },
        message: '显示排序请输入数字'
      }]
    }, {
      name: 'phone',
      rules: [{
        validator: (rule, value) => {
          let reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])d{8}$/;
          if (value && !reg.test(value)) {
            return rule.message
          }
        },
        message: '请输入正确的手机号'
      }]
    }, {
      name: 'email',
      rules: [{
        validator: (rule, value) => {
          let reg = /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/;
          if (value && !reg.test(value)) {
            return rule.message
          }
        },
        message: '请输入正确的邮箱'
      }]
    }],
    error: ""
  },
  /**
   * 获取所有部门列表（作为上级部门的可选项）
   */
  getDeptList() {
    request({
      url: '/system/dept/list',
      data: {
        current: 1,
        size: 100000,
      }
    }).then(res => {
      let deptList = res.data.records.map(item => {
        return {
          id: Number(item.deptId),
          name: item.deptName
        }
      })
      deptList.unshift({
        id: 0,
        name: '主类目'
      })
      console.log(deptList);
      this.setData({
        deptList,
      })
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 获取所有状态
   */
  getStatusList() {
    request({
      url: "/system/dict/data/type/sys_normal_disable"
    }).then(res => {
      let statusList = res.data.map(item => {
        return {
          id: Number(item.dictValue),
          name: item.dictLabel,
        }
      })
      this.setData({
        statusList,
      })
    })
  },
  /**
   * 下拉框改变事件
   */
  changeSelect(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  /**
   * 输入框改变事件
   */
  changeInput(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  /**
   * 提交
   */
  submitForm(e) {
   // 显示加载中，含触摸蒙层
   wx.showLoading({
    title: '加载中',
    mask: true,
  })
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        this.setData({
          error: errors[0].message
        })
      } else {
        let {
          formData,
          deptList,
          statusList
        } = this.data
        request({
          url: '/system/dept',
          method: 'POST',
          data: {
            ...formData,
            parentId: deptList[formData.parentId].id,
            status: statusList[formData.status].id,
          }
        }).then(res => {
          // 返回上一页
          wx.navigateBack({
            delta: 1,
          })
        }).catch(err => {
          console.error(err);
          wx.showToast({
            title: err.message,
            mask:true,
            icon: 'none',
            duration:2000
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDeptList()
    this.getStatusList()
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