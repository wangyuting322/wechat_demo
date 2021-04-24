import { request } from "../../utils/request.js"

Page({
  /**
   * 组件的初始数据
   */
  data: {
    // 所有部门列表数据
    deptList: [],
    // 是否下拉刷新中
    isRefresh: false,
    // 查询参数
    params: {
      current: 1,
      size: 10,
      deptName: "",
    },
    // 数据库全部数据条数
    total: 0,
    // 延时器
    timer: null,
    // 竖向滚动条位置
    scrollTop: 0,
    slideButtons: [
      {
        type: "warn",
        text: "删除",
        extClass: "test",
        src: "/page/weui/cell/icon_del.svg", // icon的路径
      },
    ],
  },
  /**
   * 获取部门信息
   */
  getDeptList() {
    let { current, size, deptName } = {
      ...this.data.params,
    }
    return new Promise((resolve, reject) => {
      // 获取部门列表
      request({
        url: "/system/dept/list",
        data: {
          current: 1,
          size: size * current,
          deptName,
        },
      })
        .then((res) => {
          console.log(res)
          this.setData({
            deptList: res.data.records,
            total: res.data.total,
          })
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject()
        })
    })
  },
  /**
   * 防抖函数
   */
  debounce(func, time = 500) {
    if (this.data.timer) {
      clearTimeout(this.data.timer)
      this.setData({
        timer: null,
      })
    }
    this.setData({
      timer: setTimeout(() => {
        func()
      }, time),
    })
  },
  /**
   * 获取更多
   */
  getMore(e) {
    this.debounce(() => {
      this.setData({
        params: {
          ...this.data.params,
          current: this.data.params.current + 1,
        },
      }),
        this.getDeptList()
    }, 500)
  },
  /**
   * 返回顶部
   */
  totop() {
    // 整个页面到顶部
    // wx.pageScrollTo({
    //   duration: 1,
    //   scrollTop: 0,
    // })
    this.setData({
      scrollTop: 0,
    })
  },
  /**
   * 刷新
   */
  refresh(e) {
    this.setData({
      params: {
        ...this.data.params,
        current: 1,
        size: 10,
      },
    }),
      this.getDeptList()
    // 500ms后刷新结束
    setTimeout(() => {
      this.setData({
        isRefresh: false,
      })
    }, 500)
  },
  /**
   * 下拉刷新结束
   */
  stopRefresh() {
    wx.showToast({
      title: "刷新完成",
    })
  },
  /**
   * 搜索
   */
  search(e) {
    this.debounce(() => {
      let deptName = e.detail.value
      this.setData({
        params: {
          ...this.data.params,
          deptName: deptName,
        },
      })
      this.getDeptList()
    }, 500)
  },
  /**
   * 添加部门
   */
  pageTo(e) {
    let type = e.currentTarget.dataset.type
    if (type === "add") {
      wx.navigateTo({
        url: "/pages/addDept/addDept",
      })
    } else if (type === "edit") {
      let { deptid: deptId, info: deptInfo } = {
        ...e.currentTarget.dataset,
      }
      wx.navigateTo({
        url: `/pages/editDept/editDept?deptId=${deptId}`,
        // 携带参数
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDeptInfo: (data) => {
            console.log(data)
          },
        },
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit("acceptDeptInfo", {
            deptInfo: deptInfo,
          })
        },
      })
    }
  },
  /**
   * 删除部门
   */
  deleteDept(e) {
    let deptId = e.currentTarget.dataset.deptid
    request({
      url: "/system/dept",
      method: "DELETE",
      data: deptId,
    })
      .then((res) => {
        this.refresh()
        // this.totop()
        wx.showToast({
          title: "删除成功",
        })
      })
      .catch((err) => {
        wx.showToast({
          title: err.message,
        })
      })
  },
  onLoad() {
    wx.showLoading({
      title: "加载中",
    })
    this.getDeptList()
      .then(() => {
        wx.hideLoading()
      })
      .catch((err) => {
        wx.hideLoading()
        wx.showToast({
          title: "加载失败",
          icon: "error",
        })
      })
  },
})
