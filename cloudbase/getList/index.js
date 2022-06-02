// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
        // 只获取当前自己用户的
        return await db.collection('Pedigree').where({
            _openid: event._openid
        }).get()
    },
    exports.all = async (event, context) => {
        let that = this;
        let count = await db.collection('Pedigree').count();
        await db.collection('Pedigree').skip(event.pageIndex).limit(event.numbers).get();
    }