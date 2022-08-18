// components/uploadFile/uploadFile.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    files: {
      type: Array,
      value: []
    },
    // 最多上传几个
    maxNum: {
      type: Number,
      value: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 上传文件
     */
    addFile() {
      let {
        maxNum,
        files
      } = this.data
      wx.chooseMedia({
        mediaType: 'mix',
        count: maxNum - files.length,
        success: (res) => {
          let data = []
          if (Array.isArray(res)) {
            data = res[0].tempFiles
          } else {
            data = res.tempFiles
          }
          console.log(data);
          this.triggerEvent('change',[...files,...data])
        }
      })
    },
    /**
     * 删除文件
     */
    delFile(e) {
      console.log(e);
      let index=e.target.dataset.index
      let file = [...this.data.files]
      file.splice(index, 1)
      this.triggerEvent('change', file)
    },
    /**
     * 预览文件
     */
    preview(e){
      let fileIndex=e.target.dataset.index
      console.log(this.data.files);
      wx.previewMedia({
        sources:this.data.files.map(item=>{
          return {
            url:item.tempFilePath,
            type:item.fileType,
            poster:item.thumbTempFilePath
          }
        }),
        current:fileIndex,
        success:(res)=>{
          console.log(res);
        },
        fail:(err)=>{
          console.log(err);
        }
      })
    }
  }
})