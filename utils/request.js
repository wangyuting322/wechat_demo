import {
  baseUrl
} from './configs.js'
export function request(requestData) {
  let {
    url,
    method = 'GET',
    data = {}
  } = {
    ...requestData
  }
  // 获取token
  let token = wx.getStorageSync("token")
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      data,
      header: token ? {
        'Authorization': `Bearer ${token}`,
      } : null,
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        console.log(err);
        reject(err)
      }
    })
  })

}