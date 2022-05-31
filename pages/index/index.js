const db = wx.cloud.database()
Page({
    data: {
        imgList: []
    },
    onLoad: function (options) {
        this.getBanner()
    },
    // 获取首页banner图
    getBanner() {
        wx.cloud.callFunction({
            name: 'getBanner',
            success:(res)=>{
                console.log(res);
                this.setData({
                    imgList: res.result.data
                })
            },
            fail:res=> {
                console.log('读取失败', res);
            }
        })
    },
  
})