// logs.js
const util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    msg:'66'
  },
handleParent(){
  console.log('bb');
},
handleChild(){
  console.log('kid');
},
handleClick(){
wx.request({
  // url: 'https://121.40.228.54:8124/login',
  // url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
  method:"GET",
  success:(res)=>{
    console.log(res,22222);
  }
})
},
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad() {
    console.log(this);
    // 修改msg的状态数据，语法：this.data
    console.log(this.data.msg);
    this.setData({
      msg:'修改之后的值'
    })
    console.log(this.data.msg);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady(){
console.log(this);
}
})
