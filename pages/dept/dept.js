import {
  request
} from '../../utils/request.js'

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
      deptName: ''
    },
    // 数据库全部数据条数
    total: 0,
    // 延时器
    timer: null,
    // 竖向滚动条位置
    topNum: 0,
  },
  /**
   * 获取部门信息
   */
  getDeptList() {
    let {
      current,
      size,
      deptName
    } = {
      ...this.data.params
    }
    console.log(deptName);
    // 获取部门列表
    return request({
      url: '/system/dept/list',
      data: {
        current: 1,
        size: size * current,
        deptName,
      }
    }).then(res => {
      this.setData({
        deptList: res.data.records,
        total: res.data.total,
      })
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 防抖函数
   */
  debounce(func, time = 500) {
    if (this.data.timer) {
      clearTimeout(this.data.timer)
      this.setData({
        timer: null
      })
    }
    this.setData({
      timer: setTimeout(() => {
        console.log(7);
        func()
      }, time)
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
            current: this.data.params.current + 1
          }
        }),
        this.getDeptList()
    }, 500)
  },
  /**
   * 返回顶部 
   */
  // totop() {
  //   // 整个页面到顶部
  //   wx.pageScrollTo({
  //     duration: 1,
  //     scrollTop: 0,
  //   })
  // },
  /**
   * 刷新
   */
  refresh(e) {
    this.setData({
        params: {
          current: 1,
          size: 10,
        }
      }),
      this.getDeptList()
    setTimeout(() => {
      this.setData({
        isRefresh: false
      })
    }, 500)
  },
  /**
   * 下拉刷新结束
   */
  stopRefresh() {
    wx.showToast({
      title: '刷新完成',
    })
  },
  /**
   * 搜索
   */
  search(e) {
    this.debounce(() => {
      let deptName = e.detail.value
      this.setData({
       params:{
        ...this.data.params,
        deptName:deptName,
       }
      })
        this.getDeptList()
    },1000)
  },
  /**
   * 添加部门
   */
  addDept() {
    wx.navigateTo({
      url: '/pages/addDept/addDept',
    })
  },
  onLoad() {
    this.getDeptList()
  },
})