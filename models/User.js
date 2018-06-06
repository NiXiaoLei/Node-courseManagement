const mongoose = require("mongoose")

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name:{
        type: String,
        // 是不是必须为String 
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        // 自动获取一个当前的时间
        default: Date.now
    }
})

// 发布模型
module.exports =  User = mongoose.model('User',UserSchema)