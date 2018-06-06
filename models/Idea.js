const mongoose = require("mongoose")

const Schema = mongoose.Schema;

let IdeaSchema = new Schema({
    title:{
        type: String,
        // 是不是必须为String 
        required: true
    },
    user:{
        type:String,
        required:true
    },
    details:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        // 自动获取一个当前的时间
        default: Date.now
    }
})

// 发布模型
module.exports =  Idea = mongoose.model('Idea',IdeaSchema)