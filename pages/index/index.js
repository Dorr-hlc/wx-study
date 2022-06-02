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
            success: (res) => {
                this.setData({
                    imgList: res.result.data
                })
            },
            fail: res => {
                console.log('读取失败', res);
            }
        })
    },
    // nav跳转
    gocharts() {
        wx.navigateTo({
            url: '/pages/charts/charts',
        })
    },
    gotype() {
        wx.showToast({
            title: '功能上线中',
            icon: 'none'
        })
    },
    goadd() {
        wx.switchTab({
            url: '/pages/add/add',
        })
    },
    govideo() {
        wx.navigateTo({
            url: '/pages/video/video',
        })
    },
    //   获取推荐
    getall() {
        
    }
})