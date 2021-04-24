// pages/editDept/editDept.js
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
    // 当前的部门id
    deptId: '0',
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
    return new Promise((resolve, reject) => {
      request({
        url: '/system/dept/list',
        data: {
          current: 1,
          size: 1000,
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
        this.setData({
          deptList,
        })
        resolve(deptList)
      }).catch(err => {
        console.log(err);
        reject(err)
      })
    })

  },
  /**
   * 获取所有状态
   */
  getStatusList() {
    return new Promise((resolve, reject) => {
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
        resolve(statusList)
      }).catch(err => {
        console.log(err);
        reject(err)
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
    wx.showToast({
      icon: 'loading'
    })
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        this.setData({
          error: errors[0].message
        })
      } else {
        let {
          deptId,
          formData,
          deptList,
          statusList
        } = this.data
        request({
          url: '/system/dept',
          method: 'PUT',
          data: {
            ...formData,
            deptId,
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
            icon: 'none',
            duration: 2000
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 显示加载中，含触摸蒙层
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    // 等待部门和状态的下拉框数据获取
    Promise.all([this.getDeptList(), this.getStatusList()]).then(res => {
      console.log(res);
      const eventChannel = this.getOpenerEventChannel()
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.on('acceptDeptInfo', ({
        deptInfo
      }) => {
        let {
          parentId,
          status
        } = {
          ...deptInfo
        }
        let {
          deptList,
          statusList
        } = {
          ...this.data
        }
        this.setData({
          formData: {
            ...deptInfo,
            parentId: deptList.findIndex(item => item.id == parentId),
            status: statusList.findIndex(item => item.id == status),
          }
        })
      })
      this.setData({
        deptId: options.deptId,
      })
      // 加载完成
      wx.hideLoading()
    }).catch(err => {
      // 加载完成
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        mask: true,
        icon: 'none',
        duration: 2000
      })
      console.log(err);
    })
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