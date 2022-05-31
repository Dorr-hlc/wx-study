// pages/login/mine.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

    login() {
        wx.getUserProfile({
            desc: '获取用户信息',
            success: res => {
                //设置全局用户信息
                app.globalData.userInfo = res.userInfo;
                wx.setStorageSync('userinfo', res.userInfo);
                this.data.orLogin = true;
                wx.cloud.callFunction({
                    name: 'login',
                    data: {
                        _openid: wx.getStorageSync('opneid'),
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl
                    }
                }).then(res => {
                    wx.showToast({
                        title: '登录成功',
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 1,
                        })
                    }, 1000)
                })
            }
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {


    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})