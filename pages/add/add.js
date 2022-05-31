// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgList: [],
        coverurl: '',
        info: {
            openid: '',
            name: '',
            musical: '',
            auth: '',
            type: '',
            cover: [],
            urlList: [],
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 选择图片封装
    chooseImageFunction(num, localurl, dataurl) {
        let that = this;
        wx.chooseImage({
            count: num,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: res => {
                wx.showLoading({
                    title: '上传中',
                })
                setTimeout(function () {
                    wx.hideLoading()
                }, 2000)
                //    让选择图片展示在页面上，方便用户预览
                // tempFilePath可以作为 img 标签的 src 属性显示图片
                const tempFilePaths = res.tempFilePaths;
                this.setData({
                    [localurl]: tempFilePaths
                })
                for (let i = 0; i < tempFilePaths.length; i++) {
                    let imgurl = tempFilePaths[i];
                    // 指定云数据库中的文件夹以及文件名
                    const cloudPath = 'guitar/' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000) + tempFilePaths[i].match(/\.[^.]+?$/)
                    that.uploadimg(imgurl, cloudPath, dataurl)
                }
            }
        })
    },
    // 上传图片函数
    uploadimg(filePath, cloudPath, dataurl) {
        wx.cloud.uploadFile({
            cloudPath, // 上传至云端的路径
            filePath, // 小程序临时文件路径
            success: res => {
                wx.showToast({
                    title: '上传成功',
                })
                // 获取云存储中的图片地址
                dataurl.push(res.fileID);
            },
            fail: console.error
        })
    },
    // 上传曲谱
    chooseImage() {
        this.chooseImageFunction(9, 'imgList', this.data.info.urlList)
    },
    // 上传封面
    upcoverimg() {
        this.chooseImageFunction(1, 'coverurl', this.data.info.cover)
    },
    // 
    // 获取输入框的值
    getname(event) {
        this.data.info.name = event.detail.value
    },
    getmusical(event) {
        this.data.info.musical = event.detail.value
    },
    getauth(event) {
        this.data.info.auth = event.detail.value
    },
    gettype(event) {
        this.data.info.type = event.detail.value
    },

    upinfo() {
        if (this.data.info.name != '' && this.data.info.musical != '') {
            const info = this.data.info
            wx.cloud.database().collection('Pedigree').add({
                data: {
                    auth: info.auth,
                    name: info.name,
                    cover: info.cover,
                    type: info.type,
                    imgList: info.urlList
                }
            }).then(res => {
                wx.showToast({
                    title: '添加成功',
                })
                setTimeout(function () {
                    wx.navigateTo({
                        url: '/pages/charts/charts',
                    })
                }, 1000)
            }).catch(err => {
                wx.showToast({
                    title: '添加失败',
                })
            })
        } else {
            wx.showToast({
                title: '请填写必填项',
            })
        }
    },
})