// app.js
App({
    onLaunch() {
        wx.cloud.init({
            env: "hlc-utga0"
        })
        this.getOpenid();
    },
    // 获取openid
    getOpenid() {
        wx.cloud.callFunction({
            name: 'getOpenId',
            success(res) {
                wx.setStorageSync('openid', res.result.openid)
            },
            fail(res) {
                console.log(res);
            }
        })
    },
    globalData: {
        userInfo: {
            openid: wx.getStorageSync('openid')
        }
    }
})